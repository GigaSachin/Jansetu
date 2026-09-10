import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';

export interface UseTextToSpeechOptions {
  lang?: Language | string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export interface UseTextToSpeechReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  speak: (text: string, options?: UseTextToSpeechOptions) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  currentText: string | null;
  voices: SpeechSynthesisVoice[];
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const { language: currentAppLanguage } = useLanguage();
  const [isSupported] = useState<boolean>(() => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  });
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        return window.speechSynthesis.getVoices();
      } catch {
        return [];
      }
    }
    return [];
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const activeCallbacksRef = useRef<{ onEnd?: () => void; onError?: (error: any) => void }>({});

  // Clean and prepare voices
  useEffect(() => {
    if (!isSupported) return;

    const updateVoices = () => {
      try {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      } catch {
        // Ignore voice fetch error
      }
    };

    updateVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      // Safe cleanup on hook unmount
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [isSupported]);

  const selectBestVoice = useCallback((targetLang: string, availableVoices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    if (!availableVoices || availableVoices.length === 0) return null;

    const isHindi = targetLang.toLowerCase().startsWith('hi');

    if (isHindi) {
      // 1. Exact Hindi voice
      const exactHindi = availableVoices.find(v => 
        v.lang === 'hi-IN' || 
        v.lang.toLowerCase().startsWith('hi') || 
        v.name.toLowerCase().includes('hindi') ||
        v.name.toLowerCase().includes('lekha')
      );
      if (exactHindi) return exactHindi;

      // 2. Indian English voice as natural cultural fallback for Hinglish/Jharkhand context
      const inEnglish = availableVoices.find(v => 
        v.lang === 'en-IN' || 
        v.name.toLowerCase().includes('india')
      );
      if (inEnglish) return inEnglish;
    } else {
      // English requested
      // 1. Preferred Indian English voice
      const inEnglish = availableVoices.find(v => 
        v.lang === 'en-IN' || 
        v.name.toLowerCase().includes('india') ||
        v.name.toLowerCase().includes('rishi')
      );
      if (inEnglish) return inEnglish;

      // 2. Standard English voices
      const standardEnglish = availableVoices.find(v => 
        v.lang.startsWith('en') || 
        v.name.toLowerCase().includes('english')
      );
      if (standardEnglish) return standardEnglish;
    }

    // Default system voice
    return availableVoices[0] || null;
  }, []);

  const sanitizeTextForSpeech = (rawText: string): string => {
    if (!rawText) return '';
    return rawText
      .replace(/<[^>]*>/g, '') // remove html tags
      .replace(/[*_~`#|]/g, '') // remove markdown symbols
      .replace(/[\u2022\u25CF\u2713\u26A1]/gu, '') // bullet & symbols
      .replace(/\p{Extended_Pictographic}/gu, '') // remove all emoji glyphs cleanly
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();
  };

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentText(null);
    utteranceRef.current = null;
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSpeaking && !isPaused) {
      try {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } catch {
        // ignore
      }
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSpeaking && isPaused) {
      try {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } catch {
        // ignore
      }
    }
  }, [isSpeaking, isPaused]);

  const speak = useCallback((textToSpeak: string, options?: UseTextToSpeechOptions) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const cleanText = sanitizeTextForSpeech(textToSpeak);
    if (!cleanText) return;

    // Cancel any ongoing speech immediately before starting new one
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const targetLang = (options?.lang || currentAppLanguage || 'en') as string;
    const isHindi = targetLang.startsWith('hi');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    utterance.rate = options?.rate || (isHindi ? 0.95 : 1.0);
    utterance.pitch = options?.pitch || 1.0;

    // Pick appropriate voice
    const voice = selectBestVoice(targetLang, voices);
    if (voice) {
      utterance.voice = voice;
    }

    activeCallbacksRef.current = {
      onEnd: options?.onEnd,
      onError: options?.onError
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentText(cleanText);
      if (options?.onStart) options.onStart();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText(null);
      utteranceRef.current = null;
      if (activeCallbacksRef.current.onEnd) {
        activeCallbacksRef.current.onEnd();
      }
    };

    utterance.onerror = (e) => {
      // Ignore canceled error which happens on manual stop
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        if (activeCallbacksRef.current.onError) {
          activeCallbacksRef.current.onError(e);
        }
      }
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText(null);
      utteranceRef.current = null;
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsSpeaking(false);
    }
  }, [currentAppLanguage, voices, selectBestVoice]);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    speak,
    pause,
    resume,
    stop,
    currentText,
    voices
  };
};

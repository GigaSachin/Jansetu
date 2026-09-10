import React, { useState } from 'react';
import { Volume2, Pause, Play, Square, AlertCircle, Globe } from 'lucide-react';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useLanguage, Language } from '../../context/LanguageContext';

export interface SpeakButtonProps {
  /** The text content or plain summary to be spoken out loud */
  text: string;
  /** Custom button label (default: "Listen" / "सुने") */
  label?: string;
  /** Explicit target language code ('en' | 'hi' | 'en-IN' | 'hi-IN') */
  lang?: Language | string;
  /** Show an inline quick language switcher [EN | हिन्दी] */
  showLangSwitch?: boolean;
  /** Button sizing tokens */
  size?: 'xs' | 'sm' | 'md';
  /** Button visual style */
  variant?: 'subtle' | 'primary' | 'outline' | 'pill';
  /** Optional custom container CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional contextual title to prefix in spoken output */
  contextTitle?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  label,
  lang,
  showLangSwitch = false,
  size = 'sm',
  variant = 'outline',
  className = '',
  ariaLabel,
  disabled = false,
  contextTitle
}) => {
  const { language: currentAppLanguage } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<Language>(() => {
    if (lang) {
      return (lang.toString().startsWith('hi') ? 'hi' : 'en') as Language;
    }
    return currentAppLanguage;
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeLang = selectedLang || currentAppLanguage;
  const isHindi = activeLang === 'hi';

  const {
    isSupported,
    isSpeaking,
    isPaused,
    speak,
    pause,
    resume,
    stop,
    currentText
  } = useTextToSpeech();

  // 1. Browser Support Check
  if (!isSupported) {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs cursor-not-allowed select-none ${className}`}
        title="Text-to-Speech is not supported in this browser"
        aria-label="Text-to-Speech is not supported in this browser"
      >
        <Volume2 className="w-3.5 h-3.5 opacity-40" />
        <span className="text-[11px] font-medium">TTS Unavailable</span>
      </div>
    );
  }

  // Sanitize text target for matching active speech
  const cleanTarget = (contextTitle ? `${contextTitle}. ${text}` : text)
    .replace(/<[^>]*>/g, '')
    .replace(/[*_~`#|]/g, '')
    .replace(/[\u2022\u25CF\u2713\u26A1]/gu, '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

  const isThisButtonSpeaking = isSpeaking && (currentText === cleanTarget);

  const defaultLabel = isHindi ? 'सुने' : 'Listen';
  const displayLabel = label || defaultLabel;

  // Handle Listen / Play / Pause
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setErrorMessage(null);

    if (disabled) return;

    if (isThisButtonSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(cleanTarget, {
        lang: isHindi ? 'hi-IN' : 'en-IN',
        onError: (err: any) => {
          console.warn('Speech error:', err);
          setErrorMessage(isHindi ? 'ऑडियो चलाने में असमर्थ।' : 'Unable to play speech.');
          setTimeout(() => setErrorMessage(null), 3500);
        }
      });
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    stop();
  };

  const toggleLanguage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const nextLang: Language = isHindi ? 'en' : 'hi';
    setSelectedLang(nextLang);
    if (isThisButtonSpeaking) {
      stop();
      speak(cleanTarget, { lang: nextLang === 'hi' ? 'hi-IN' : 'en-IN' });
    }
  };

  // Sizing tokens
  const sizeClasses = {
    xs: 'px-2.5 py-1 text-[11px] gap-1 rounded-lg min-h-[32px]',
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-xl min-h-[38px]',
    md: 'px-4 py-2 text-sm gap-2 rounded-xl min-h-[44px]'
  }[size];

  // Base Classes
  const baseClasses = "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 select-none active:scale-98";

  // Variant styles for Idle State
  const variantClasses = {
    outline: 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-brand-700 hover:border-brand-300 shadow-2xs',
    subtle: 'bg-slate-100/80 hover:bg-brand-50 border border-transparent hover:border-brand-200 text-slate-700 hover:text-brand-800',
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs',
    pill: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 rounded-full'
  }[variant];

  // If currently speaking: Render Active Controller [Pause/Resume] + [Stop]
  if (isThisButtonSpeaking) {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-brand-50 border border-brand-200 text-brand-900 shadow-xs animate-in fade-in duration-150 ${className}`}
        role="region"
        aria-live="polite"
        aria-label={ariaLabel || (isHindi ? "ऑडियो विवरण नियंत्रक" : "Audio narration controls")}
      >
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPaused 
            ? (isHindi ? "ऑडियो जारी रखें" : "Resume speech") 
            : (isHindi ? "ऑडियो रोकें" : "Pause speech")
          }
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-xs focus:ring-2 focus:ring-brand-500"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isHindi ? 'जारी रखें' : 'Resume'}</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{isHindi ? 'बोल रहे हैं...' : 'Speaking...'}</span>
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleStop}
          aria-label={isHindi ? "ऑडियो बंद करें" : "Stop speech"}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
          title={isHindi ? "बंद करें" : "Stop"}
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>

        {showLangSwitch && (
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={isHindi ? "अंग्रेजी में सुनें" : "हिन्दी में सुनें"}
            className="px-2 py-1 rounded-md text-[10px] font-bold bg-white text-slate-600 hover:text-brand-600 border border-slate-200 transition"
          >
            {isHindi ? 'EN' : 'हिन्दी'}
          </button>
        )}
      </div>
    );
  }

  // Idle Listen Button
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleTogglePlay}
        aria-label={ariaLabel || (isHindi ? `${displayLabel} - जोर से सुनें` : `${displayLabel} - Listen out loud`)}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Volume2 className="w-3.5 h-3.5 text-brand-600 shrink-0 group-hover:scale-105 transition-transform" />
        <span>{displayLabel}</span>
      </button>

      {/* Optional Language Switcher Pill */}
      {showLangSwitch && (
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={isHindi ? "भाषा बदलकर अंग्रेजी करें" : "Switch audio language to Hindi"}
          title={isHindi ? "Switch to English audio" : "हिन्दी ऑडियो पर स्विच करें"}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <Globe className="w-3 h-3 text-slate-400" />
          <span>{isHindi ? 'हिन्दी' : 'EN'}</span>
        </button>
      )}

      {errorMessage && (
        <span 
          role="alert"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 animate-in fade-in"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
};

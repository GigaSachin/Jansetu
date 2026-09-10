import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useSpeechToText } from '../../hooks/useSpeechToText';
import { useLanguage } from '../../context/LanguageContext';

export interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  placeholder?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  label,
  size = 'sm',
  className = ''
}) => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const {
    isSupported,
    isListening,
    startListening,
    stopListening
  } = useSpeechToText();

  if (!isSupported) {
    return null;
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isListening) {
      stopListening();
    } else {
      startListening({
        lang: isHindi ? 'hi-IN' : 'en-IN',
        onResult: (text) => {
          if (text) {
            onTranscript(text);
          }
        }
      });
    }
  };

  const defaultLabel = isHindi ? 'बोलकर लिखें' : 'Speak to Type';
  const displayLabel = label || defaultLabel;

  if (isListening) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isHindi ? "आवाज पहचान रोकें" : "Stop listening"}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold shadow-xs animate-pulse ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
        <Mic className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
        <span>{isHindi ? 'सुन रहा है... (रोकने के लिए क्लिक करें)' : 'Listening... (Tap to stop)'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isHindi ? `${displayLabel} - माइक्रोफोन चालू करें` : `${displayLabel} - Start voice dictation`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-600 hover:text-brand-700 text-xs font-semibold transition active:scale-95 shadow-2xs ${className}`}
    >
      <Mic className="w-3.5 h-3.5 text-brand-600" />
      <span>{displayLabel}</span>
    </button>
  );
};

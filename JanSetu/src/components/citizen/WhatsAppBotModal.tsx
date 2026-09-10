import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  Mic, 
  Camera, 
  MapPin, 
  Sparkles, 
  CheckCheck, 
  Bot, 
  QrCode, 
  Printer, 
  Share2 
} from 'lucide-react';

interface WhatsAppBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppBotModal: React.FC<WhatsAppBotModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bot' | 'qr'>('bot');
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; badge?: string }>>([
    {
      sender: 'bot',
      text: '🙏 *Johar! Welcome to JanSetu Jharkhand Civic Resolution Bot.*\n\nAap apni samasya (Pani, Sadak, Bijli, School, Hospital) Hindi ya English me likhein, ya Photo/Voice message bhejein.',
      time: '10:30 AM'
    },
    {
      sender: 'user',
      text: 'हमारे रामगढ़ वार्ड 12 सरकारी स्कूल के सामने बहुत पानी भर गया है, बच्चे स्कूल नहीं जा पा रहे हैं।',
      time: '10:31 AM'
    },
    {
      sender: 'bot',
      text: '📍 *GPS Location Auto-Detected:* Ramgarh Cantonment, Ward 12 (Jharkhand)\n\n🤖 *JanSetu AI Triage Completed:*\n• *Category:* Water & Sanitation\n• *Severity:* HIGH (School Catchment Impact)\n• *Matched University:* BIT Mesra, Civil Hydrology Lab (96% Match)\n\n🎫 *Issue Registered:* #JS-JH-2026-622576\n\nAapki complaint zila prashasan aur BIT Mesra ko forward kar di gayi hai. Live track karein: https://jansetu-two.vercel.app/problems/JS-JH-2026-622576',
      time: '10:31 AM',
      badge: 'TICKET GENERATED'
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botReply = {
        sender: 'bot' as const,
        text: `✅ *JanSetu AI Receipt:*\n\n"Aapka sandesh darj kar liya gaya hai."\n• *Auto-Extracted Intent:* Civic Grievance\n• *Priority:* Monitored for immediate engineering response.\n• *Issue ID:* #JS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-emerald-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border-2 border-emerald-500">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">JanSetu WhatsApp Civic Bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              </div>
              <span className="text-[11px] text-emerald-200 block">Grassroots WhatsApp & QR Channel • Jharkhand</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('bot')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'bot' 
                ? 'border-emerald-600 text-emerald-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Interactive WhatsApp Bot Simulation</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'qr' 
                ? 'border-emerald-600 text-emerald-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Panchayat QR Kiosk Poster</span>
          </button>
        </div>

        {/* Body Content */}
        {activeTab === 'bot' ? (
          <div className="flex-1 flex flex-col bg-[#efeae2] p-4 overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs shadow-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-xs'
                        : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200/60'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.time}</span>
                      {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-sky-500" />}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/80 w-fit text-[11px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce delay-200" />
                  <span>JanSetu AI is analyzing...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="pt-3 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type in Hindi/English or describe problem..."
                className="flex-1 bg-white rounded-full px-4 py-2.5 text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* QR Poster View */
          <div className="p-6 overflow-y-auto space-y-4 text-center">
            <div className="p-6 bg-slate-50 border-2 border-dashed border-emerald-400 rounded-3xl space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                GOVERNMENT OF JHARKHAND • CIVIC INNOVATION KIOSK
              </span>
              <h3 className="text-base font-black text-slate-900">
                Panchayat / Ward Civic Grievance Scan-Point
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Place this poster at Bus Stands, Panchayat Bhavans, and Schools for app-less citizen problem reporting in under 30 seconds.
              </p>

              {/* QR Code SVG / Visual */}
              <div className="w-36 h-36 mx-auto bg-white p-3 rounded-2xl border border-slate-300 shadow-md flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <QrCode className="w-28 h-28 text-slate-900" />
                  <span className="text-[8px] font-mono text-emerald-700 font-bold mt-1">JANSETU.ORG</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 font-semibold">
                Scan with any Smartphone Camera • Direct WhatsApp Bridge
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official QR Poster</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

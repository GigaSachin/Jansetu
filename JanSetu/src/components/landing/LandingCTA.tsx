import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PlusCircle, Search, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const LandingCTA: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#edf4f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0a2337] via-[#0d3b53] to-[#08423b] p-8 sm:p-16 text-white shadow-2xl overflow-hidden border border-emerald-900/40">
          
          {/* Subtle Ambient Light Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Small Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 border border-white/15 text-xs font-black tracking-wide uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hi' ? 'नागरिक सशक्तिकरण' : 'JANSETU • JHARKHAND RESOLUTION'}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {language === 'hi' 
                ? 'आपका समुदाय समस्या जानता है। जनसेतु समाधान से जोड़ता है।' 
                : 'Your community knows the problem. JanSetu helps connect the solution.'
              }
            </h2>

            {/* Subtext */}
            <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              {language === 'hi'
                ? 'एक स्थानीय चुनौती दर्ज करें और सहयोगी समाधान की दिशा में इसकी पारदर्शी यात्रा शुरू करें।'
                : 'Report a local challenge and start its journey toward a collaborative solution.'
              }
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/citizen/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-lg shadow-teal-950/40 transition transform hover:-translate-y-0.5 active:scale-95 group"
              >
                <PlusCircle className="w-5 h-5 text-emerald-100" />
                <span>{language === 'hi' ? 'समस्या रिपोर्ट करें' : 'Report a Problem'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm sm:text-base border border-white/20 transition active:scale-95"
              >
                <Search className="w-4 h-4 text-slate-300" />
                <span>{language === 'hi' ? 'समस्याएं देखें' : 'Explore Problems'}</span>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4" /> 100% Free & Open Citizen Platform
              </span>
              <span>•</span>
              <span>Built for Jharkhand • Designed to scale</span>
              <span>•</span>
              <span>Direct Link to Capstone Labs</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

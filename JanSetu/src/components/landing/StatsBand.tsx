import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  GraduationCap, 
  Layers, 
  MapPin, 
  Network
} from 'lucide-react';

export const StatsBand: React.FC = () => {
  const { language } = useLanguage();

  const metrics = [
    {
      value: '12+',
      label: language === 'hi' ? 'संभावित झारखंड संस्थान मिलान' : 'Potential Jharkhand Institution Matches',
      sub: language === 'hi' ? 'बीआईटी, आईआईटी, एनआईटी व स्थानीय लैब्स' : 'BIT Mesra, IIT ISM, NIT JSR & faculty labs',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
      value: '14',
      label: language === 'hi' ? 'नागरिक समस्या क्षेत्र' : 'Civic Problem Domains',
      sub: language === 'hi' ? 'जल, सड़क, अपशिष्ट, प्रकाश, स्वास्थ्य' : 'Water, roads, waste, power & accessibility',
      icon: Layers,
      color: 'text-brand-600 bg-brand-50 border-brand-100'
    },
    {
      value: '24',
      label: language === 'hi' ? 'झारखंड ज़िले' : 'Jharkhand Districts',
      sub: language === 'hi' ? 'राँची से साहिबगंज तक सभी ज़िले' : 'Ranchi to Sahibganj & rural blocks',
      icon: MapPin,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      value: '01',
      label: language === 'hi' ? 'एकीकृत समाधान मंच' : 'Connected Resolution Platform',
      sub: language === 'hi' ? 'नागरिक • सरकार • संस्थान • सीएसआर' : 'Citizens • Govt • Universities • Industry',
      icon: Network,
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    }
  ];

  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8">
        
        {/* Prototype Honesty Banner */}
        <div className="mb-6 pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 font-black text-[10px] tracking-wider border border-brand-200">
              JHARKHAND-FIRST PROTOTYPE
            </span>
            <span className="font-semibold text-slate-700">
              {language === 'hi' ? 'प्रोटोटाइप डेटा • 24 ज़िलों के लिए मॉडल' : 'Prototype Data • Validated across 24 Districts'}
            </span>
          </div>
          <span className="text-slate-500 text-[11px] font-medium">
            {language === 'hi' ? 'झारखंड से शुरुआत • पूरे भारत में विस्तार योग्य' : 'Built for Jharkhand • Designed to scale'}
          </span>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx > 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-xl ${m.color} border flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {m.value}
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-800 leading-snug">
                  {m.label}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {m.sub}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

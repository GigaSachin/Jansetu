import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SpeakButton } from '../common/SpeakButton';
import { SpeechFormatters } from '../../utils/speechFormatters';
import { 
  FileEdit, 
  BrainCircuit, 
  Sparkles, 
  Users2, 
  Trophy,
  CheckCircle2
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: '01',
      title: language === 'hi' ? 'नागरिक रिपोर्ट' : 'People Report',
      subtitle: language === 'hi' ? 'फोटो व जीपीएस के साथ 2 मिनट में' : '1-click photo & verified GPS report',
      desc: language === 'hi'
        ? 'नागरिक स्थानीय भाषा में अपने गाँव या शहर की समस्या दर्ज करते हैं।'
        : 'Citizens submit geo-tagged observations with photos or voice notes in under 2 minutes.',
      icon: FileEdit,
      badge: 'Step 1'
    },
    {
      num: '02',
      title: language === 'hi' ? 'जनसेतु विश्लेषण' : 'JanSetu Understands',
      subtitle: language === 'hi' ? 'डोमेन वर्गीकरण व गंभीरता' : 'Domain classification & severity triage',
      desc: language === 'hi'
        ? 'जनसेतु एआई समस्या की गंभीरता और आवश्यक इंजीनियरिंग कौशल का विश्लेषण करता है।'
        : 'JanSetu AI extracts civic intent, detects duplicate issues, and identifies required engineering skills.',
      icon: BrainCircuit,
      badge: 'Step 2'
    },
    {
      num: '03',
      title: language === 'hi' ? 'एआई मिलान' : 'AI Finds a Match',
      subtitle: language === 'hi' ? 'आईआईटी, बीआईटी व एनआईटी से जुड़ाव' : 'Matched with BIT, IIT ISM, NIT Labs',
      desc: language === 'hi'
        ? 'समस्या को पास के उपयुक्त विश्वविद्यालय शोध दल व संकाय मेंटर से जोड़ा जाता है।'
        : 'Algorithms rank nearest engineering faculties & student capstone labs capable of building the solution.',
      icon: Sparkles,
      badge: 'Step 3'
    },
    {
      num: '04',
      title: language === 'hi' ? 'संस्थान सहयोग' : 'Institutions Collaborate',
      subtitle: language === 'hi' ? 'छात्र, सीएसआर व प्रशासन' : 'Students, CSR funding & municipal teams',
      desc: language === 'hi'
        ? 'प्रोटोटाइप का निर्माण और ज़मीनी स्तर पर नगर पालिका के सहयोग से परीक्षण।'
        : 'Capstones develop cost-effective blueprints funded by CSR partners and approved by civic authorities.',
      icon: Users2,
      badge: 'Step 4'
    },
    {
      num: '05',
      title: language === 'hi' ? 'समाधान व प्रभाव' : 'Solution Creates Impact',
      subtitle: language === 'hi' ? 'स्थायी समाधान व पारदर्शी ऑडिट' : 'Audited outcomes & open reuse blueprints',
      desc: language === 'hi'
        ? 'सत्यापित जीवन सुधार और समाधान को अन्य ज़िलों में दोहराने के लिए ओपन ब्लूप्रिंट।'
        : 'Permanent community resolution is verified by citizens, and blueprints are made reusable across Jharkhand.',
      icon: Trophy,
      badge: 'Step 5'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-brand-50 text-brand-800 border border-brand-200 tracking-wide uppercase">
              <span>{language === 'hi' ? 'जनसेतु कार्यप्रणाली' : 'HOW JANSETU WORKS'}</span>
            </div>
            <SpeakButton 
              text={SpeechFormatters.howItWorks(language)} 
              label={language === 'hi' ? 'कार्यप्रणाली सुनें' : 'Listen to How It Works'} 
              size="sm" 
              variant="pill" 
            />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            {language === 'hi' ? 'नागरिक की समस्या से' : 'From citizen report to'}{' '}
            <span className="text-brand-600">{language === 'hi' ? 'सत्यापित प्रभाव तक।' : 'measured impact.'}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {language === 'hi'
              ? 'एक सहज 5-चरणीय यात्रा जो नागरिकों, कृत्रिम बुद्धिमत्ता, विश्वविद्यालयों और सीएसआर को जोड़ती है।'
              : 'A connected 5-step journey that turns raw civic observations into engineered, funded, and verified solutions.'
            }
          </p>
        </div>

        {/* Connected Journey (Desktop Horizontal / Mobile Vertical Timeline) */}
        <div className="relative">
          
          {/* Connecting Track (Desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[3px] bg-slate-200 z-0">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-600 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Journey Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <div
                  key={st.num}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive 
                      ? 'bg-white border-2 border-brand-500 shadow-xl -translate-y-2' 
                      : isPassed
                      ? 'bg-white/90 border border-emerald-200/80 shadow-xs hover:border-slate-300'
                      : 'bg-white/80 border border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Step Pill & Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 ${
                        isActive 
                          ? 'bg-gradient-to-br from-brand-600 to-brand-800 ring-4 ring-brand-100' 
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className={`w-6 h-6 ${isActive || isPassed ? 'text-white' : 'text-slate-700'}`} />
                      </div>

                      <span className={`text-xl font-black tracking-tighter ${
                        isActive ? 'text-brand-600' : isPassed ? 'text-emerald-600' : 'text-slate-300'
                      }`}>
                        {st.num}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-black text-slate-950 mb-1 leading-snug">
                      {st.title}
                    </h3>

                    {/* Step Subtitle */}
                    <div className="text-xs font-bold text-brand-700 mb-3 leading-tight">
                      {st.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {st.desc}
                    </p>
                  </div>

                  {/* Bottom Active Status Indicator */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <span className={
                      isActive 
                        ? 'text-brand-600 flex items-center gap-1' 
                        : isPassed 
                        ? 'text-emerald-600 flex items-center gap-1' 
                        : 'text-slate-400'
                    }>
                      {isPassed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete</span>
                        </>
                      ) : isActive ? (
                        <span>● Active Step</span>
                      ) : (
                        <span>Next</span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{st.badge}</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

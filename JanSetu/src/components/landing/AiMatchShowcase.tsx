import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  BrainCircuit, 
  GraduationCap, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Zap,
  SearchCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AiMatchShowcase: React.FC = () => {
  const { language } = useLanguage();

  const matches = [
    {
      institution: 'BIT Mesra, Ranchi',
      dept: 'Department of Civil & Environmental Engineering',
      score: 91,
      skills: ['Hydraulic Drainage', 'Porous Pavement', 'Urban Runoff'],
      lead: 'Dr. A. Verma (Hydro Lab)',
      recommended: true
    },
    {
      institution: 'IIT (ISM) Dhanbad',
      dept: 'Environmental Science & Engineering Centre',
      score: 84,
      skills: ['Catchment Siltation', 'Sediment Trapping'],
      lead: 'Prof. K. Sinha',
      recommended: false
    },
    {
      institution: 'NIT Jamshedpur',
      dept: 'Structural & Water Resources Division',
      score: 79,
      skills: ['Precast Modular Culverts', 'Flow Dynamics'],
      lead: 'Dr. R. Soren',
      recommended: false
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Soft Atmosphere */}
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-gradient-to-l from-indigo-100/30 via-brand-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Explanatory Product Story */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'hi' ? 'स्मार्ट एआई मैचिंग इंजन' : 'AI-POWERED MATCHING ENGINE'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              {language === 'hi' ? 'समस्या को समझने वाला' : 'AI that understands the problem'}{' '}
              <span className="text-indigo-600 block">
                {language === 'hi' ? 'एआई, सही लोगों से जोड़ता है।' : 'before finding the people.'}
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {language === 'hi'
                ? 'अधिकांश नागरिक शिकायतें इसलिए अनसुलझी रह जाती हैं क्योंकि वे सही तकनीकी क्षमता तक नहीं पहुँच पातीं। जनसेतु एआई हर रिपोर्ट का विश्लेषण कर झारखंड के प्रमुख इंजीनियरिंग संस्थानों और रिसर्च लैब्स से तुरंत मिलान करता है।'
                : 'Traditional portals simply file complaints into a backlog. JanSetu AI understands the problem context, estimates technical complexity, matches identical patterns across districts, and automatically routes the challenge to university engineering labs ready to build solutions.'
              }
            </p>

            {/* Key Differentiator Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'hi' ? 'डोमेन एवं कौशल वर्गीकरण' : 'Semantic Domain Triage'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'hi' ? 'जल, सड़क, अपशिष्ट आदि श्रेणियों में स्वचालित विभाजन' : 'Extracts technical disciplines, material constraints & urgency.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'hi' ? 'झारखंड संस्थान ज्ञान आधार' : 'Jharkhand HEI Capability Index'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'hi' ? 'बीआईटी, आईआईटी धनबाद, एनआईटी की शोध क्षमताओं से सीधा संपर्क' : 'Ranks capstone labs at BIT Mesra, IIT (ISM) Dhanbad, NIT Jamshedpur.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 group"
              >
                <span>{language === 'hi' ? 'एआई आर्किटेक्चर के बारे में जानें' : 'Learn how AI Matching works'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: AI Match Product Feature Showcase */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative">
              
              {/* Top Bar: Problem Analysis Header */}
              <div className="pb-5 border-b border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30">
                    PROBLEM
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> Ramgarh, Jharkhand
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  "Waterlogging near school entrance during monsoon"
                </h3>
              </div>

              {/* AI Analysis Row with Similar Problem Discovery */}
              <div className="py-4 border-b border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">AI Analysis</span>
                  <span className="text-xs font-black text-sky-400">Water & Sanitation</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">Severity</span>
                  <span className="text-xs font-black text-amber-400">HIGH Severity</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">Similar Problem</span>
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                    <SearchCheck className="w-3.5 h-3.5" /> 87% Similar Match
                  </span>
                </div>
              </div>

              {/* Potential Matches Subhead */}
              <div className="my-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-indigo-400" />
                  POTENTIAL MATCHES
                </span>
                <span className="text-indigo-300 text-[11px] font-mono">
                  Target: Capstone 2026
                </span>
              </div>

              {/* Institution Match Cards */}
              <div className="space-y-3">
                {matches.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-4 transition-all duration-300 border ${
                      item.recommended
                        ? 'bg-gradient-to-r from-indigo-900/60 to-slate-900/80 border-indigo-500/60 ring-1 ring-indigo-500/30 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          item.recommended ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">
                              {item.institution}
                            </h4>
                            {item.recommended && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5" /> AI Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">
                            {item.dept}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.skills.map((s, sIdx) => (
                              <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] font-medium border border-slate-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="text-right shrink-0">
                        <div className={`text-2xl font-black ${
                          item.recommended ? 'text-emerald-400' : 'text-slate-300'
                        }`}>
                          {item.score}%
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold block">
                          Potential Match
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Showcase Micro-Status */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Automated Faculty & Student Lab Notification Ready
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  Prototype Data
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const JanSetuBridge: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      id: 'citizen',
      name: language === 'hi' ? 'नागरिक एवं समुदाय' : 'Citizens & Communities',
      tagline: language === 'hi' ? 'ज़मीनी समस्या के प्रत्यक्षदर्शी' : 'The Ground Truth & Observers',
      roleDescription: language === 'hi'
        ? 'अपने गाँव, कस्बे या वार्ड की समस्या दर्ज करें, फोटो अपलोड करें और पूरी पारदर्शिता के साथ प्रगति देखें।'
        : 'Spot the issue in your village or street, upload photos, and track the journey with total transparency.',
      icon: Users,
      color: 'from-sky-500 to-brand-600',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      bullets: [
        language === 'hi' ? 'जीपीएस ऑटो-डिटेक्ट के साथ 2 मिनट में रिपोर्ट करें' : 'Report in under 2 minutes with GPS auto-detect',
        language === 'hi' ? 'हर चरण पर वास्तविक समय में स्थिति अपडेट' : 'Real-time status notifications at every stage',
        language === 'hi' ? 'स्थानीय इंजीनियरिंग छात्रों से सीधा जुड़ाव' : 'Direct connection to student problem solvers'
      ]
    },
    {
      id: 'government',
      name: language === 'hi' ? 'सरकारी प्राधिकरण एवं नगर निकाय' : 'Government Authorities',
      tagline: language === 'hi' ? 'सक्षमकर्ता एवं क्रियान्वयन' : 'The Enablers & Implementers',
      roleDescription: language === 'hi'
        ? 'ज़मीनी समस्याओं का सत्यापन करें, प्रशासनिक अनुमति दें और छात्रों द्वारा तैयार समाधानों को लागू करें।'
        : 'Verify field issues, grant right-of-way permissions, and implement validated student solutions on the ground.',
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-600',
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      bullets: [
        language === 'hi' ? 'ज़िला स्तरीय समस्या प्रबंधन डैशबोर्ड' : 'Centralized district-level issue triage dashboard',
        language === 'hi' ? 'शैक्षणिक प्रोटोटाइप से नगर निगम बजट की बचत' : 'Save municipal budget by piloting academic prototypes',
        language === 'hi' ? 'सत्यापित प्रभाव प्रमाण पत्र एवं नागरिक रेटिंग' : 'Verified impact certificates & citizen satisfaction scores'
      ]
    },
    {
      id: 'university',
      name: language === 'hi' ? 'विश्वविद्यालय एवं शोध संस्थान' : 'Universities & Students',
      tagline: language === 'hi' ? 'नवाचारकर्ता एवं शोध दल' : 'The Innovators & Researchers',
      roleDescription: language === 'hi'
        ? 'स्थानीय समस्याओं को वित्तपोषित प्रोजेक्ट्स, लैब प्रयोगों और शोध में बदलें।'
        : 'Turn real community problems into funded capstone projects, lab experiments, and measurable research papers.',
      icon: GraduationCap,
      color: 'from-indigo-600 to-purple-600',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      bullets: [
        language === 'hi' ? 'बीआईटी, आईआईटी व एनआईटी जैसे संस्थानों के साथ एआई मैचिंग' : 'AI skill-matched local problem repository (BIT, IIT, NIT)',
        language === 'hi' ? 'सीएसआर मार्गदर्शन एवं सामग्री सहायता' : 'Industry mentorship and material grant access',
        language === 'hi' ? 'नागरिक प्रोटोटाइप के लिए प्लेसमेंट में विशेष वरीयता' : 'Pre-placement recognition for civic prototypes'
      ]
    },
    {
      id: 'industry',
      name: language === 'hi' ? 'उद्योग एवं सीएसआर पार्टनर' : 'Industry & CSR Partners',
      tagline: language === 'hi' ? 'संसाधन एवं प्रभाव विस्तार' : 'The Resource & Scale Multipliers',
      roleDescription: language === 'hi'
        ? 'सीएसआर फंड, तकनीकी विशेषज्ञता और उपकरण उच्च प्रभाव वाले स्थानीय प्रोजेक्ट्स में लगाएं।'
        : 'Direct CSR funds, technical expertise, and equipment into high-impact, verified local community projects.',
      icon: Building2,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      bullets: [
        language === 'hi' ? 'पारदर्शी चरण-आधारित अनुदान वितरण' : 'Transparent milestone-based grant disbursement',
        language === 'hi' ? 'वास्तविक डेटा के साथ ऑडिट-रेडी ईएसजी प्रभाव' : 'Audit-ready ESG & CSR impact metrics with real data',
        language === 'hi' ? 'स्थानीय परिचालन क्षेत्रों में प्रत्यक्ष जन विश्वास' : 'Direct brand goodwill in local operational catchments'
      ]
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'बहु-हितधारक नागरिक सेतु' : 'The Multi-Stakeholder Ecosystem'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'एक समस्या से जुड़ सकते हैं' : 'One problem can bring the'}{' '}
            <span className="gradient-text">{language === 'hi' ? 'सभी सही सहयोगी।' : 'right people together.'}</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'जनसेतु झारखंड के 4 प्रमुख स्तंभों को एक पारदर्शी डिजिटल सेतु पर साथ लाता है।'
              : 'JanSetu creates a seamless civic bridge connecting 4 foundational pillars to convert unsolved community challenges into deployed reality.'
            }
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Pillar Tabs Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? `${pillar.bgColor} ${pillar.borderColor} shadow-card translate-x-1.5`
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br ${pillar.color} shadow-xs`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {pillar.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? `${pillar.textColor} translate-x-1` : 'text-slate-300 group-hover:text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Selected Pillar Feature Display Card */}
          <div className="lg:col-span-7">
            {(() => {
              const current = pillars[selectedPillar];
              const CurrentIcon = current.icon;
              return (
                <div className="h-full bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Accent Glow */}
                  <div className={`absolute -right-20 -top-20 w-72 h-72 bg-gradient-to-br ${current.color} opacity-20 rounded-full blur-3xl pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-extrabold tracking-wider uppercase border border-white/10 text-brand-300">
                        <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
                        <span>{current.name}</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        <CurrentIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                      {current.tagline}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                      {current.roleDescription}
                    </p>

                    <div className="space-y-3.5 pt-6 border-t border-slate-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-saffron-400 mb-2">
                        {language === 'hi' ? 'मुख्य भूमिका एवं लाभ' : 'Core Capabilities on JanSetu:'}
                      </div>
                      {current.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-8 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{language === 'hi' ? 'खुला एवं सुरक्षित मंच' : 'Decentralized Civic Innovation'}</span>
                    <span className="font-semibold text-brand-400">JanSetu Bridge Protocol</span>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};

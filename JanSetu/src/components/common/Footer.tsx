import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ShieldCheck, 
  Globe, 
  Mail, 
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronDown,
  PlusCircle,
  Search,
  Check
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (key: string) => {
    setOpenMobileSection(openMobileSection === key ? null : key);
  };

  return (
    <footer className="relative bg-[#020810] text-slate-300 border-t border-slate-800/50 pt-16 pb-12 overflow-hidden select-none">
      
      {/* Deep Dark Atmospheric Glows — Very subtle */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-sky-600/[0.07] via-brand-700/[0.04] to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-600/[0.06] to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/[0.05] to-indigo-900/[0.04] rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />

      {/* Stylized Jharkhand Watermark Silhouette in Background */}
      <div className="absolute right-[-80px] bottom-[-40px] opacity-[0.04] pointer-events-none select-none">
        <svg width="650" height="650" viewBox="0 0 1100 850" fill="none" stroke="currentColor">
          <path
            d="M 190,240 C 260,180 390,170 500,150 C 610,130 750,90 870,140 C 940,170 980,260 940,350 C 900,410 870,480 850,560 C 820,640 780,730 690,750 C 610,770 530,810 450,790 C 360,770 270,730 220,640 C 160,550 130,440 150,340 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* TOP CTA: SITS NATURALLY INSIDE THE DARK FOOTER AREA */}
        {/* ============================================================ */}
        <div className="mb-14 pb-12 border-b border-slate-800">
          <div className="rounded-3xl bg-gradient-to-r from-[#0a1929]/95 via-[#0d2540]/90 to-[#0a1929]/95 p-8 sm:p-12 border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="text-center md:text-left space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950 text-sky-400 border border-brand-800 text-[10px] font-black tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>JANSETU • JHARKHAND</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {language === 'hi' ? 'क्या आपके समुदाय में कोई समस्या है?' : 'Have a problem in your community?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
                {language === 'hi'
                  ? 'जनसेतु पर रिपोर्ट दर्ज करें और इसे ऐसे लोगों से जोड़ें जो इसका वास्तविक समाधान बना सकते हैं।'
                  : 'Report it on JanSetu and help connect it with people who can build a solution.'
                }
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <Link
                to="/citizen/report"
                className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-950/40 transition"
              >
                <PlusCircle className="w-4 h-4 text-brand-200" />
                <span>{language === 'hi' ? 'समस्या रिपोर्ट करें' : 'Report a Problem'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/explore"
                className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition"
              >
                <Search className="w-4 h-4 text-slate-300" />
                <span>{language === 'hi' ? 'समस्याएं देखें' : 'Explore Problems'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN 5-COLUMN DESKTOP LAYOUT */}
        {/* ============================================================ */}
        <div className="hidden lg:grid grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* COLUMN 1 — JANSETU BRAND (Col 1-4) */}
          <div className="col-span-4 space-y-4">
            <Logo size="md" variant="white" showTagline={false} />

            <p className="text-sm font-bold text-sky-400 tracking-tight">
              "{t('tagline', 'Jan Ki Baat, Solution Ke Saath.')}"
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              {language === 'hi'
                ? 'नागरिकों, संस्थानों, सरकार और संभावित समाधान भागीदारों को जोड़कर पूरे झारखंड में स्थानीय समस्याओं को मापने योग्य प्रभाव में बदलना।'
                : 'Connecting citizens, institutions, government and potential solution partners to turn local problems into measurable impact across Jharkhand.'
              }
            </p>

            {/* Small Badge: BUILT FOR JHARKHAND */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/90 border border-brand-800/90 text-sky-300 font-extrabold text-[10px] tracking-wider uppercase">
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>BUILT FOR JHARKHAND</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-800/90 text-emerald-300 font-extrabold text-[10px] tracking-wider uppercase">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>OPEN PROTOTYPE</span>
              </span>
            </div>
          </div>

          {/* COLUMN 2 — PLATFORM (Col 5-6) */}
          <div className="col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              {t('footer_platform', 'Platform')}
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-white transition">
                  {t('nav_how_it_works', 'How It Works')}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-slate-400 hover:text-white transition">
                  {t('nav_explore', 'Explore Problems')}
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-white transition">
                  {t('nav_solutions', 'Solutions')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-slate-400 hover:text-white transition">
                  {t('nav_impact', 'Impact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — FOR YOU (Col 7-8) */}
          <div className="col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              {language === 'hi' ? 'आपके लिए' : 'For You'}
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link to="/login/citizen" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'नागरिक (Citizens)' : 'Citizens'}
                </Link>
              </li>
              <li>
                <Link to="/login/government" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'सरकार (Government)' : 'Government'}
                </Link>
              </li>
              <li>
                <Link to="/login/university" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'विश्वविद्यालय (Universities)' : 'Universities'}
                </Link>
              </li>
              <li>
                <Link to="/login/industry" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'उद्योग / सीएसआर (Industry / CSR)' : 'Industry / CSR'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — SUPPORT (Col 9-10) */}
          <div className="col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              {language === 'hi' ? 'सहायता' : 'Support'}
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'सहायता केंद्र' : 'Help Center'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'प्रतिक्रिया' : 'Feedback'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  {language === 'hi' ? 'सुलभता' : 'Accessibility'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5 — LANGUAGE + CONNECT (Col 11-12) */}
          <div className="col-span-2 space-y-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>{language === 'hi' ? 'भाषा' : 'Language'}</span>
              </h4>
              
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {language === 'en' && <Check className="w-3 h-3" />}
                  <span>English</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    language === 'hi'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {language === 'hi' && <Check className="w-3 h-3" />}
                  <span>हिन्दी</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">
                {language === 'hi' ? 'जुड़े रहें' : 'Stay Connected'}
              </h4>
              <span className="text-slate-300 font-semibold flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate text-[11px]">contact@jansetu.in</span>
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* MOBILE ACCORDION LAYOUT (< lg) */}
        {/* ============================================================ */}
        <div className="lg:hidden space-y-6 pb-10 border-b border-slate-800">
          
          {/* Brand section */}
          <div className="space-y-3">
            <Logo size="md" variant="white" showTagline={false} />
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {language === 'hi'
                ? 'नागरिकों, संस्थानों और सरकार को जोड़कर झारखंड में समस्याओं का समाधान।'
                : 'Connecting citizens, institutions and government across Jharkhand.'
              }
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-950 text-sky-300 text-[10px] font-bold border border-brand-800">
                BUILT FOR JHARKHAND
              </span>
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className="space-y-2">
            {[
              {
                id: 'platform',
                title: 'Platform',
                links: [
                  { to: '/how-it-works', label: 'How It Works' },
                  { to: '/explore', label: 'Explore Problems' },
                  { to: '/solutions', label: 'Solutions' },
                  { to: '/impact', label: 'Impact' },
                ]
              },
              {
                id: 'for_you',
                title: 'For You',
                links: [
                  { to: '/login/citizen', label: 'Citizens' },
                  { to: '/login/government', label: 'Government' },
                  { to: '/login/university', label: 'Universities' },
                  { to: '/login/industry', label: 'Industry / CSR' },
                ]
              },
              {
                id: 'support',
                title: 'Support',
                links: [
                  { to: '/about', label: 'Help Center' },
                  { to: '/about', label: 'Contact Us' },
                  { to: '/about', label: 'Feedback' },
                  { to: '/about', label: 'Accessibility' },
                ]
              }
            ].map(sec => (
              <div key={sec.id} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <button
                  onClick={() => toggleMobileSection(sec.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-white text-left"
                >
                  <span>{sec.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openMobileSection === sec.id ? 'rotate-180' : ''}`} />
                </button>
                {openMobileSection === sec.id && (
                  <div className="px-4 pb-3 space-y-2 border-t border-slate-800 pt-2">
                    {sec.links.map((l, lIdx) => (
                      <Link key={lIdx} to={l.to} className="block text-xs text-slate-400 hover:text-white py-1">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Language selector on mobile */}
          <div className="pt-2">
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Language / भाषा</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex-1 text-center border ${
                  language === 'en' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                🌐 English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex-1 text-center border ${
                  language === 'hi' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* FOOTER BOTTOM BAR */}
        {/* ============================================================ */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Left: Copyright */}
          <div>
            <span>© 2026 JanSetu</span>
          </div>

          {/* Center: Mission & Tiny Network Watermark detail */}
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Built for Jharkhand • Designed to scale</span>
          </div>

          {/* Right: Policy Links */}
          <div className="flex items-center gap-4 font-medium">
            <Link to="/about" className="hover:text-white transition">
              {language === 'hi' ? 'गोपनीयता' : 'Privacy'}
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition">
              {language === 'hi' ? 'नियम' : 'Terms'}
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition">
              {language === 'hi' ? 'सुलभता' : 'Accessibility'}
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HeroVisual } from '../components/landing/HeroVisual';
import { StatsBand } from '../components/landing/StatsBand';
import { HowItWorks } from '../components/landing/HowItWorks';
import { AiMatchShowcase } from '../components/landing/AiMatchShowcase';
import { ExplorePreview } from '../components/landing/ExplorePreview';
import { SolutionReusability } from '../components/landing/SolutionReusability';
import { ImpactOverview } from '../components/landing/ImpactOverview';
import { 
  PlusCircle, 
  Search, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900">
      
      {/* ============================================================ */}
      {/* SECTION A: HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-[680px] lg:min-h-[740px] pt-28 pb-14 lg:pt-32 lg:pb-16 bg-gradient-to-b from-[#f8fafc] via-[#f0f6fc] to-[#fbfcfd] overflow-hidden flex items-center">
        
        {/* Layered Organic Light Atmospheric Glows */}
        <div className="absolute top-10 right-0 w-[720px] h-[720px] bg-gradient-to-br from-sky-200/35 via-indigo-100/30 to-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-28 left-4 w-[520px] h-[520px] bg-gradient-to-tr from-brand-100/30 via-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
        
        {/* Subtle Dotted Connection Texture */}
        <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />
        
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column (56%): Original Editorial Message */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs text-brand-800 text-xs font-black tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                <span>JANSETU • JHARKHAND CIVIC RESOLUTION ENGINE</span>
              </div>

              {/* Main Headline */}
              <h1 
                className="font-black text-slate-950 tracking-tight max-w-[740px]"
                style={{
                  fontSize: 'clamp(44px, 4.8vw, 74px)',
                  lineHeight: '1.02'
                }}
              >
                {language === 'hi' ? 'जन की बात,' : 'Jan Ki Baat,'}{' '}
                <span className="text-brand-600">
                  {language === 'hi' ? 'सॉल्यूशन' : 'Solution'}
                </span>{' '}
                {language === 'hi' ? 'के साथ।' : 'Ke Saath.'}
              </h1>

              {/* Product Description */}
              <div className="space-y-2.5 max-w-[650px]">
                <p className="text-lg sm:text-[19px] text-slate-600 leading-[1.62] font-normal">
                  {language === 'hi'
                    ? 'स्थानीय समस्या दर्ज करें। जनसेतु इसे समझेगा, सही विशेषज्ञता तलाशेगा, और उन लोगों को जोड़ेगा जो इसका समाधान बना सकते हैं।'
                    : 'Report a local problem. Let JanSetu understand it, find the right expertise, and connect the people who can turn it into a solution.'
                  }
                </p>
                <p className="text-sm sm:text-base font-extrabold text-brand-700 tracking-wide">
                  {language === 'hi' ? 'झारखंड के लिए बनाया गया • विस्तार के लिए डिज़ाइन किया गया।' : 'Built for Jharkhand • Designed to scale.'}
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/citizen/report"
                  className="h-[54px] min-h-[54px] inline-flex items-center justify-center gap-2.5 px-8 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-800 to-navy-900 hover:from-brand-800 hover:to-navy-950 text-white font-black text-sm sm:text-base shadow-lg shadow-brand-900/25 hover:shadow-xl transition transform hover:-translate-y-0.5 active:scale-95 group"
                >
                  <PlusCircle className="w-5 h-5 text-brand-300" />
                  <span>{language === 'hi' ? 'समस्या रिपोर्ट करें' : 'REPORT A PROBLEM'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/explore"
                  className="h-[54px] min-h-[54px] inline-flex items-center justify-center gap-2 px-7 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-xs hover:shadow-sm transition transform hover:-translate-y-0.5 active:scale-95"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>{language === 'hi' ? 'समस्याएं देखें' : 'EXPLORE PROBLEMS'}</span>
                </Link>
              </div>

              {/* Lightweight Inline Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>{language === 'hi' ? 'झारखंड केंद्रित' : 'Jharkhand Focused'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'hi' ? 'एआई-पावर्ड मैचिंग' : 'AI-Powered Matching'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'संभावित CSR सहयोग' : 'Potential CSR Support'}</span>
                </div>
              </div>

            </div>

            {/* Right Column (44%): Network Visual */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center w-full">
              <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION B: IMPACT & NETWORK STRIP */}
      {/* ============================================================ */}
      <StatsBand />

      {/* ============================================================ */}
      {/* SECTION C: HOW JANSETU WORKS (5-STEP CONNECTED JOURNEY) */}
      {/* ============================================================ */}
      <HowItWorks />

      {/* ============================================================ */}
      {/* SECTION D: AI MATCHING SHOWCASE */}
      {/* ============================================================ */}
      <AiMatchShowcase />

      {/* ============================================================ */}
      {/* SECTION E: EXPLORE JHARKHAND CHALLENGES */}
      {/* ============================================================ */}
      <ExplorePreview />

      {/* ============================================================ */}
      {/* SECTION F: SOLUTION REUSABILITY */}
      {/* ============================================================ */}
      <SolutionReusability />

      {/* ============================================================ */}
      {/* SECTION G: AUDITED IMPACT & OUTCOMES */}
      {/* ============================================================ */}
      <ImpactOverview />

    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  ArrowRight,
  Target,
  Compass
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जनसेतु का उद्देश्य' : 'The JanSetu Genesis'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {language === 'hi' ? 'स्थानीय समस्याओं और वास्तविक समाधानों के बीच' : 'Building the bridge between'}{' '}
            <span className="gradient-text">{language === 'hi' ? 'एक मज़बूत सेतु।' : 'everyday problems and real solutions.'}</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'जन = लोग। सेतु = पुल। जनसेतु झारखंड से शुरू होकर पूरे भारत के लिए निर्मित एक ओपन नागरिक समाधान इंजन है जो नागरिकों, नगर पालिकाओं, शैक्षणिक संस्थानों और सीएसआर भागीदारों को जोड़ता है।'
              : 'Jan = People. Setu = Bridge. Starting with Jharkhand, JanSetu is an open-access collaborative civic resolution engine uniting citizens, municipal bodies, academic researchers (BIT Mesra, IIT ISM, NIT JSR), and CSR sponsors.'
            }
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'नागरिक शिकायतों को फाइलों में बंद रहने के बजाय उन्हें वित्तपोषित विश्वविद्यालय कैपस्टोन प्रोजेक्ट्स और ज़मीनी बुनियादी ढांचे में बदलना।'
                : 'To eliminate chronic local societal challenges by converting unaddressed citizen grievances into funded, mentored university capstone projects and deployed community infrastructure in Jharkhand.'
              }
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{language === 'hi' ? 'हमारा विज़न' : 'Our Vision'}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'झारखंड के 24 ज़िलों से शुरुआत, पूरे भारत में विस्तार। एक ऐसा भविष्य जहाँ हर इंजीनियरिंग कॉलेज अपने स्थानीय क्षेत्र की समस्याओं को हल करने में सक्रिय हो।'
                : 'Built for Jharkhand, designed to scale across India. A future where every engineering college, polytechnic, and CSR foundation is actively improving the living conditions of their local communities.'
              }
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card mb-16 space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'hi' ? 'जनसेतु के 4 मूल सिद्धांत' : 'The 4 Core Guiding Tenets'}
          </h2>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
              <div>
                <strong>{language === 'hi' ? 'केवल शिकायत पेटी नहीं:' : 'Not a mere complaint box:'}</strong>{' '}
                {language === 'hi' ? 'पारंपरिक पोर्टल केवल शिकायतें एकत्र करते हैं। जनसेतु वास्तविक भौतिक और तकनीकी समाधान तैयार करता है।' : 'Traditional grievance portals collect frustration. JanSetu builds practical physical and digital solutions.'}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
              <div>
                <strong>{language === 'hi' ? 'पूर्ण पारदर्शिता:' : 'Radical Transparency:'}</strong>{' '}
                {language === 'hi' ? 'हर मील का पत्थर, अनुदान आवंटन और प्रयोगशाला परीक्षण परिणाम जनता के लिए खुला और पारदर्शी है।' : 'Every milestone, financial grant allocation, and laboratory test result is openly accessible.'}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
              <div>
                <strong>{language === 'hi' ? 'छात्र प्रतिभा का सम्मान:' : 'Dignity of Student Talent:'}</strong>{' '}
                {language === 'hi' ? 'हम छात्रों की इंजीनियरिंग क्षमता पर भरोसा करते हैं कि वे नगर पालिकाओं के बजट की बचत करने वाले मॉडल बना सकें।' : 'We trust student engineers and scholars to design scalable, frugal prototypes that save municipal budgets.'}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center shrink-0 mt-0.5">4</div>
              <div>
                <strong>{language === 'hi' ? 'सत्यापित ज़मीनी परिणाम:' : 'Audited Outcomes:'}</strong>{' '}
                {language === 'hi' ? 'सफलता केवल दर्ज रिपोर्टों से नहीं, बल्कि जलभराव-मुक्त सड़कों, स्वच्छ पेयजल और सुलभ अस्पतालों से मापी जाती है।' : 'Success is not measured in reports filed, but in flood-free roads, safe drinking water, and accessible clinics.'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Join Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-black mb-2">{language === 'hi' ? 'जनसेतु अभियान का हिस्सा बनें।' : 'Be part of the JanSetu story.'}</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
            {language === 'hi' ? 'नागरिक, शोधकर्ता, नगर निगम अधिकारी या सीएसआर भागीदार के रूप में जुड़ें।' : 'Join as a citizen observer, university faculty, municipal engineer or corporate CSR leader today.'}
          </p>
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-md transition"
          >
            <span>{language === 'hi' ? 'अपनी भूमिका चुनें' : 'Select Your Role'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

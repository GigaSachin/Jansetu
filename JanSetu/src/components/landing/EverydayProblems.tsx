import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Droplets, 
  Construction, 
  Trash2, 
  LightbulbOff, 
  Accessibility, 
  Sprout, 
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export const EverydayProblems: React.FC = () => {
  const { language } = useLanguage();

  const problems = [
    {
      id: 'waterlogging',
      title: language === 'hi' ? 'जलभराव एवं स्थिर गंदा पानी' : 'Waterlogging & Stagnant Stormwater',
      category: language === 'hi' ? 'जल एवं स्वच्छता' : 'Water & Sanitation',
      location: 'Ramgarh, Ward 12, Jharkhand',
      explanation: language === 'hi'
        ? 'अवरुद्ध प्राकृतिक जल निकासी से मच्छरों के प्रजनन और मानसून में प्राथमिक स्कूलों में पानी भर जाने की समस्या।'
        : 'Blocked natural drainage creates mosquito breeding pools and shuts down primary schools for weeks during monsoons.',
      icon: Droplets,
      bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
      borderColor: 'hover:border-blue-300',
      iconColor: 'bg-blue-500 text-white',
      tag: 'Ramgarh Pilot'
    },
    {
      id: 'waste',
      title: language === 'hi' ? 'दैनिक हाट सब्जी कचरा निस्तारण' : 'Open Market Bio-Waste Accumulation',
      category: language === 'hi' ? 'कचरा प्रबंधन' : 'Waste Management',
      location: 'Kanke Daily Haat, Ranchi',
      explanation: language === 'hi'
        ? 'प्रतिदिन 1.8 टन सड़ी सब्जियों के कचरे से भूजल प्रदूषण और बदबू की गंभीर समस्या।'
        : '1.8 tonnes of rotting vegetable pulp dumped in open vats causing leachate contamination and unhygienic vending.',
      icon: Trash2,
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'hover:border-emerald-300',
      iconColor: 'bg-emerald-600 text-white',
      tag: '160 Vendors'
    },
    {
      id: 'accessibility',
      title: language === 'hi' ? 'सदर अस्पताल की अत्यधिक ढलान वाली रैंप' : 'Steep Inaccessible Hospital Ramps',
      category: language === 'hi' ? 'सुलभता एवं स्वास्थ्य' : 'Accessibility & Health',
      location: 'Sadar Hospital, Hazaribagh',
      explanation: language === 'hi'
        ? '18 डिग्री की फिसलन भरी रैंप से बुजुर्गों और व्हीलचेयर मरीजों को ओपीडी तक पहुंचने में भारी कठिनाई।'
        : '18-degree slippery ramps prevent senior citizens and wheelchair patients from independently entering OPD wards.',
      icon: Accessibility,
      bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'hover:border-purple-300',
      iconColor: 'bg-purple-600 text-white',
      tag: '600 Daily Patients'
    },
    {
      id: 'lighting',
      title: language === 'hi' ? 'ग्रामीण विद्यालय मार्ग पर अंधेरा' : 'Unlit Rural School Transit Corridors',
      category: language === 'hi' ? 'सार्वजनिक सुरक्षा' : 'Public Safety',
      location: 'Bundu Bypass, Ranchi',
      explanation: language === 'hi'
        ? 'शाम के समय कोचिंग से लौटने वाली छात्राओं के लिए 2.2 किमी अंधेरा मार्ग सुरक्षा के लिए गंभीर खतरा।'
        : '2.2km pitch-black stretch creating severe vulnerability for girl students commuting from evening classes.',
      icon: LightbulbOff,
      bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'hover:border-amber-300',
      iconColor: 'bg-amber-500 text-white',
      tag: '300+ Girls'
    },
    {
      id: 'agriculture',
      title: language === 'hi' ? 'नहर गाद से धान के खेतों में जलभराव' : 'Canal Silt Inundating Fertile Farmland',
      category: language === 'hi' ? 'कृषि एवं ग्रामीण' : 'Agriculture & Rural',
      location: 'Ranishwar Catchment, Dumka',
      explanation: language === 'hi'
        ? 'क्षतिग्रस्त पुलिया व गाद जमाव के कारण बारिश में 120 एकड़ उपजाऊ धान फसल पर 6 इंच गाद जमा होना।'
        : 'Collapsed sluice culverts deposit 6 inches of unfertile silt on paddy acreage during sudden cloudbursts.',
      icon: Sprout,
      bgGradient: 'from-lime-500/10 via-emerald-500/5 to-transparent',
      borderColor: 'hover:border-lime-300',
      iconColor: 'bg-lime-600 text-white',
      tag: '120 Acres'
    },
    {
      id: 'roads',
      title: language === 'hi' ? 'औद्योगिक परिवहन मार्ग पर खतरनाक गड्ढे' : 'Pothole Clusters on Transport Routes',
      category: language === 'hi' ? 'सड़क एवं परिवहन' : 'Roads & Infrastructure',
      location: 'Katras-Sindri Corridor, Dhanbad',
      explanation: language === 'hi'
        ? 'भारी वाहनों के आवागमन से बने गहरे गड्ढों के कारण ऑटो व दोपहिया वाहनों की दुर्घटनाओं का जोखिम।'
        : 'Unmaintained heavy transport potholes cause spine injuries to auto commuters and delivery vehicles.',
      icon: Construction,
      bgGradient: 'from-rose-500/10 via-red-500/5 to-transparent',
      borderColor: 'hover:border-rose-300',
      iconColor: 'bg-rose-500 text-white',
      tag: 'High Risk Zone'
    }
  ];

  return (
    <section className="py-20 bg-slate-50/60 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100/80 text-brand-800 border border-brand-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'झारखंड की ज़मीनी हकीकत' : 'Jharkhand Ground Realities'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {language === 'hi' ? 'हर समस्या को चाहिए' : 'Everyday problems deserve'}{' '}
              <span className="gradient-text">{language === 'hi' ? 'एक ठोस समाधान।' : 'better solutions.'}</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'ये सिर्फ फाइलों में दबी रहने वाली शिकायतें नहीं हैं। ये विश्वविद्यालय के छात्रों व सीएसआर के लिए वास्तविक शोध और समाधान के अवसर हैं।'
                : "These aren't just complaints for an endless grievance queue. They are actionable engineering, design, and policy challenges ready for our top universities and CSR innovators."
              }
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-brand-700 hover:text-brand-900 font-bold text-sm transition self-start md:self-end group"
          >
            <span>{language === 'hi' ? 'सभी समस्याएं देखें' : 'Explore All Real-World Issues'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.id}
                className={`bg-white rounded-3xl border border-slate-200 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between ${prob.borderColor} group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${prob.iconColor} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {prob.tag}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-brand-700 mb-1 uppercase tracking-wider">
                    {prob.category}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-800 transition">
                    {prob.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {prob.explanation}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prob.location}</span>
                  </div>

                  <Link
                    to="/explore"
                    className="font-bold text-brand-700 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'hi' ? 'देखें' : 'View'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

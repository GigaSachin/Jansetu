import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ProgressBar } from '../common/ProgressBar';
import { 
  MapPin, 
  ThumbsUp, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Search,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ExplorePreview: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [upvotes, setUpvotes] = useState<Record<string, number>>({
    'JH-RAM-01': 142,
    'JH-HAZ-02': 89,
    'JH-GUM-03': 114,
    'JH-RAN-04': 76,
    'JH-DUM-05': 98
  });
  const [hasUpvoted, setHasUpvoted] = useState<Record<string, boolean>>({});

  const toggleUpvote = (id: string) => {
    setHasUpvoted(prev => {
      const isUp = !!prev[id];
      setUpvotes(u => ({ ...u, [id]: (u[id] || 0) + (isUp ? -1 : 1) }));
      return { ...prev, [id]: !isUp };
    });
  };

  const featuredChallenges = [
    {
      id: 'JH-RAM-01',
      title: language === 'hi' ? 'प्राथमिक विद्यालय के पास वर्षा जलभराव' : 'Waterlogging near school entrance during monsoon',
      description: language === 'hi' ? 'भारी वर्षा के दौरान 400 से अधिक छात्रों को जलभराव के कारण स्कूल जाने में कठिनाई होती है।' : 'Monsoon runoff accumulation blocks safe access for 400+ primary school students and daily commuters.',
      location: 'Ramgarh',
      district: 'Ramgarh, Jharkhand',
      category: 'Water & Sanitation',
      status: 'In Resolution',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      peopleAffected: 1200,
      progress: 65,
      matchedTeam: {
        teamName: 'EcoHydro Capstone Lab',
        institution: 'BIT Mesra, Ranchi',
        matchScore: 91
      }
    },
    {
      id: 'JH-HAZ-02',
      title: language === 'hi' ? 'सदर अस्पताल ब्लॉक में पेयजल संकट' : 'Drinking water shortage & pipeline contamination',
      description: language === 'hi' ? 'पेयजल आपूर्ति लाइन में रिसाव के कारण 3 मोहल्लों में स्वच्छ पेयजल की भारी कमी।' : 'Corroded delivery line causing intermittent drinking water supply across 3 residential wards.',
      location: 'Hazaribagh',
      district: 'Hazaribagh, Jharkhand',
      category: 'Water & Sanitation',
      status: 'Verified',
      statusColor: 'bg-sky-50 text-sky-800 border-sky-200',
      peopleAffected: 2400,
      progress: 40,
      matchedTeam: {
        teamName: 'HydroPure Initiative',
        institution: 'BIT Sindri, Dhanbad',
        matchScore: 88
      }
    },
    {
      id: 'JH-GUM-03',
      title: language === 'hi' ? 'ग्रामीण संपर्क सड़क पुलिया का कटाव' : 'Rural road damage & culvert erosion',
      description: language === 'hi' ? 'बरसात में मिट्टी कटाव के कारण मुख्य मार्ग से गाँव का संपर्क बाधित।' : 'Eroded culvert approach disconnects tribal farming hamlets from the block weekly market during rain.',
      location: 'Gumla',
      district: 'Gumla, Jharkhand',
      category: 'Infrastructure & Roads',
      status: 'In Resolution',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      peopleAffected: 850,
      progress: 55,
      matchedTeam: {
        teamName: 'Rural Struct Capstone',
        institution: 'NIT Jamshedpur',
        matchScore: 84
      }
    },
    {
      id: 'JH-RAN-04',
      title: language === 'hi' ? 'सब्जी मंडी में जैविक कचरा प्रबंधन' : 'Waste management & bio-waste accumulation',
      description: language === 'hi' ? 'दैनिक मंडी से निकलने वाले जैविक कचरे के उचित निपटान और खाद निर्माण की आवश्यकता।' : 'Daily vegetable market produces 1.8 tons of unsegregated organic waste requiring local aerobic composting.',
      location: 'Ranchi',
      district: 'Ranchi, Jharkhand',
      category: 'Waste Management',
      status: 'Solved & Audited',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      peopleAffected: 3200,
      progress: 100,
      matchedTeam: {
        teamName: 'Green Ranchi Lab',
        institution: 'Ranchi University & IIM Ranchi CSR',
        matchScore: 92
      }
    },
    {
      id: 'JH-DUM-05',
      title: language === 'hi' ? 'सिंचाई नहर में गाद जमाव की समस्या' : 'Irrigation canal desiltation & waterflow challenge',
      description: language === 'hi' ? 'नहर में गाद जमाव के कारण निचले खेतों तक सिंचाई का पानी नहीं पहुँच पा रहा है।' : 'Sediment deposition in minor irrigation canal reduces critical waterflow to 120 hectares of paddy fields.',
      location: 'Dumka',
      district: 'Dumka, Jharkhand',
      category: 'Agriculture & Rural',
      status: 'AI Triage',
      statusColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      peopleAffected: 1600,
      progress: 25,
      matchedTeam: {
        teamName: 'AgriHydro Team',
        institution: 'IIT (ISM) Dhanbad',
        matchScore: 86
      }
    }
  ];

  const categories = ['All', 'Water & Sanitation', 'Infrastructure & Roads', 'Waste Management', 'Agriculture & Rural'];

  const filteredChallenges = selectedCategory === 'All'
    ? featuredChallenges
    : featuredChallenges.filter(c => c.category === selectedCategory);

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-brand-50 text-brand-800 border border-brand-200 mb-3 tracking-wide uppercase">
              <Search className="w-3.5 h-3.5 text-brand-600" />
              <span>{language === 'hi' ? 'झारखंड नागरिक चुनौतियां' : 'EXPLORE JHARKHAND CHALLENGES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
              {language === 'hi' ? 'सत्यापित नागरिक समस्याएं,' : 'Live community challenges,'}{' '}
              <span className="text-brand-600">{language === 'hi' ? 'सक्रिय समाधान प्रक्रिया में।' : 'actively being resolved.'}</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl font-normal">
              {language === 'hi'
                ? 'झारखंड भर की सत्यापित नागरिक चुनौतियां देखें, जो विश्वविद्यालयों व सीएसआर टीमों के साथ जुड़ रही हैं।'
                : 'Real challenges reported by citizens across Jharkhand, verified by authorities, and matched with engineering institutes.'
              }
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black shadow-sm transition self-start md:self-end"
          >
            <span>{language === 'hi' ? 'सभी चुनौतियां देखें' : 'Explore All Challenges'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top bar: ID, Location Pill & Upvotes */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-slate-400">
                      {issue.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 border border-slate-200">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {issue.location}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleUpvote(issue.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition ${
                      hasUpvoted[issue.id]
                        ? 'bg-brand-50 text-brand-700 border border-brand-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted[issue.id] ? 'fill-brand-600' : ''}`} />
                    <span>{upvotes[issue.id] || 0}</span>
                  </button>
                </div>

                {/* Status & Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${issue.statusColor}`}>
                    {issue.status}
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {issue.category}
                  </span>
                </div>

                {/* Title */}
                <Link
                  to={`/explore/${issue.id}`}
                  className="text-base font-black text-slate-900 group-hover:text-brand-600 transition line-clamp-2 mb-2 block leading-snug"
                >
                  {issue.title}
                </Link>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {issue.description}
                </p>

                {/* Matched Team Callout */}
                {issue.matchedTeam && (
                  <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 mb-5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <div>
                        <span className="font-bold text-indigo-950 block text-[11px]">{issue.matchedTeam.teamName}</span>
                        <span className="text-indigo-700 text-[10px]">{issue.matchedTeam.institution}</span>
                      </div>
                    </div>
                    <span className="font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200 shrink-0 text-[11px]">
                      {issue.matchedTeam.matchScore}%
                    </span>
                  </div>
                )}
              </div>

              {/* Progress & Bottom Info */}
              <div className="pt-3 border-t border-slate-100">
                <ProgressBar progress={issue.progress} label={language === 'hi' ? 'समाधान प्रगति' : 'Resolution Progress'} size="sm" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {issue.peopleAffected.toLocaleString()} citizens
                  </span>
                  <Link
                    to={`/explore/${issue.id}`}
                    className="text-xs font-black text-brand-700 hover:text-brand-800 flex items-center gap-1 group/btn"
                  >
                    <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '../context/IssuesContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { WhatsAppBotModal } from '../components/citizen/WhatsAppBotModal';
import { PredictiveRiskRadar } from '../components/ai/PredictiveRiskRadar';
import { Issue } from '../types';
import { 
  Search, 
  MapPin, 
  ThumbsUp, 
  Users, 
  ArrowRight, 
  Sparkles,
  Building2,
  GraduationCap,
  MessageCircle
} from 'lucide-react';

const JHARKHAND_DISTRICTS = [
  'All Districts',
  'Ramgarh',
  'Ranchi',
  'Hazaribagh',
  'Dhanbad',
  'Bokaro',
  'East Singhbhum (Jamshedpur)',
  'West Singhbhum (Chaibasa)',
  'Saraikela-Kharsawan',
  'Deoghar',
  'Dumka',
  'Giridih',
  'Gumla',
  'Lohardaga',
  'Khunti',
  'Palamu',
  'Garhwa',
  'Simdega',
  'Sahibganj',
  'Pakur',
  'Godda',
  'Koderma',
  'Jamtara',
  'Chatra',
  'Latehar'
];

export const ExploreProblemsPage: React.FC = () => {
  const { issues, toggleUpvote } = useIssues();
  const { language, t } = useLanguage();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  const categories = [
    'All',
    'Water & Sanitation',
    'Accessibility & Inclusion',
    'Roads & Transport',
    'Healthcare Access',
    'Electricity & Lighting',
    'Waste Management',
    'Education Infrastructure',
    'Agriculture & Rural'
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All Districts' || issue.location.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || issue.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'All' || issue.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesDistrict && matchesStatus && matchesSeverity;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* WhatsApp & Panchayat QR Modal */}
        <WhatsAppBotModal 
          isOpen={showWhatsAppModal} 
          onClose={() => setShowWhatsAppModal(false)} 
        />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'झारखंड ओपन नागरिक रजिस्ट्री' : 'Jharkhand Open Civic Registry'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'hi' ? 'समस्याएं हमारे आसपास।' : 'Problems around us.'}{' '}
            <span className="gradient-text">{language === 'hi' ? 'समाधान के नए अवसर।' : 'Opportunities to solve them.'}</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {language === 'hi'
              ? 'झारखंड भर की सत्यापित नागरिक चुनौतियां देखें, जो विश्वविद्यालयों (बीआईटी मेसरा, आईआईटी धनबाद आदि) व सीएसआर टीमों के साथ जुड़ रही हैं।'
              : 'Explore verified civic challenges across Jharkhand open for university capstones, potential CSR support, and collaborative execution.'
            }
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowWhatsAppModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'व्हाट्सएप बॉट व क्यूआर कियोस्क टेस्ट करें' : 'Test WhatsApp Bot & QR Kiosk'}</span>
            </button>
          </div>
        </div>

        {/* Standout Feature: AI Predictive Weather & Flood Radar */}
        <PredictiveRiskRadar />

        {/* Search & Filter Command Center */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-card">
          
          {/* Main Search Bar */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'कीवर्ड, शहर, ज़िला या ट्रैकिंग आईडी खोजें (उदा. JS-2026-001245)...' : 'Search by keyword, city, district or tracking ID (e.g. JS-2026-001245)...'}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="All">{language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              {JHARKHAND_DISTRICTS.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="All">{language === 'hi' ? 'सभी चरण' : 'All Stages'}</option>
              <option value="REPORTED">{t('status_reported', 'Reported')}</option>
              <option value="VERIFIED">{t('status_verified', 'Verified by Govt')}</option>
              <option value="MATCHED">{t('status_matched', 'Matched with Team')}</option>
              <option value="COLLABORATING">{t('status_collaborating', 'In Collaboration')}</option>
              <option value="PROTOTYPING">{t('status_prototyping', 'Prototyping')}</option>
              <option value="DEPLOYED">{t('status_deployed', 'Deployed')}</option>
              <option value="IMPACT_VERIFIED">{t('status_impact_verified', 'Impact Verified')}</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="All">{language === 'hi' ? 'सभी गंभीरता स्तर' : 'All Severities'}</option>
              <option value="HIGH">HIGH Priority</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

        </div>

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {language === 'hi' ? 'कुल चुनौतियां:' : 'Showing Challenges:'} <strong className="text-slate-800">{filteredIssues.length}</strong> (Jharkhand Pilot Data)
          </span>
          <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200">
            Open for Academic Capstones & CSR Support
          </span>
        </div>

        {/* Issue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Header Info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                      {issue.id}
                    </span>
                    <StatusBadge status={issue.status} size="sm" />
                  </div>

                  <button
                    onClick={() => toggleUpvote(issue.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
                      issue.hasUpvoted
                        ? 'bg-brand-50 text-brand-700 border border-brand-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-brand-600' : ''}`} />
                    <span>{issue.upvotesCount}</span>
                  </button>
                </div>

                {/* Category Pill */}
                <div className="text-[11px] font-bold text-brand-700 uppercase tracking-wider mb-1">
                  {issue.category}
                </div>

                {/* Title */}
                <Link
                  to={`/explore/${issue.id}`}
                  className="text-base font-bold text-slate-900 hover:text-brand-700 transition line-clamp-2 mb-2 block"
                >
                  {issue.title}
                </Link>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {issue.description}
                </p>

                {/* Location & Beneficiaries */}
                <div className="space-y-1 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span className="truncate">{issue.location.locality}, {issue.location.city}, {issue.location.district}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{issue.estimatedPeopleAffected.toLocaleString()} {language === 'hi' ? 'नागरिक प्रभावित' : 'people affected'}</span>
                  </div>
                </div>

                {/* AI Matched Team preview if any */}
                {issue.matchedTeam && (
                  <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 mb-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-indigo-950 block truncate">{issue.matchedTeam.institutionName.split('(')[0]}</span>
                        <span className="text-indigo-700 text-[10px]">{issue.matchedTeam.teamName}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-indigo-700 bg-white px-1.5 py-0.5 rounded text-[10px] border border-indigo-200 shrink-0">
                      {issue.matchedTeam.matchScore}% Match
                    </span>
                  </div>
                )}

              </div>

              {/* Card Footer: Progress & Action */}
              <div className="pt-4 border-t border-slate-100">
                <ProgressBar progress={issue.progressPercent} label={language === 'hi' ? 'समाधान प्रगति' : 'Resolution Journey'} size="sm" />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {new Date(issue.reportedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                  <Link
                    to={`/explore/${issue.id}`}
                    className="text-xs font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 group"
                  >
                    <span>{language === 'hi' ? 'विवरण देखें' : 'View Challenge'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

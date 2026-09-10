import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssuesContext';
import { ImpactService, ImpactStatsResponse } from '../services/impactService';
import { SpeakButton } from '../components/common/SpeakButton';
import { 
  Trophy, 
  CheckCircle2, 
  MapPin, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp,
  Building2,
  Cpu,
  Layers,
  Zap,
  Activity,
  Award,
  Info,
  Filter
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { language } = useLanguage();
  const { role: currentAuthRole } = useAuth();
  const { issues } = useIssues();

  const [selectedRole, setSelectedRole] = useState<string>(() => currentAuthRole || 'all');
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(0);
  const [activeCaseStudyIndex, setActiveCaseStudyIndex] = useState<number>(0);
  const [impactData, setImpactData] = useState<ImpactStatsResponse | null>(null);

  const isHindi = language === 'hi';

  // Fetch backend impact stats on load
  useEffect(() => {
    let isMounted = true;
    const loadStats = async () => {
      try {
        const data = await ImpactService.getStats(selectedRole !== 'all' ? selectedRole : undefined);
        if (isMounted && data) {
          setImpactData(data);
        }
      } catch {
        // Fallback gracefully to local computation
      }
    };
    loadStats();
    return () => { isMounted = false; };
  }, [selectedRole]);

  // Compute live local metrics from IssuesContext as fallback or live overlay
  const localStats = useMemo(() => {
    const total = issues.length;
    const verified = issues.filter(i => ['VERIFIED', 'MATCHED', 'COLLABORATING', 'SOLUTION_DEVELOPMENT', 'PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'].includes(i.status)).length;
    const matched = issues.filter(i => ['MATCHED', 'COLLABORATING', 'SOLUTION_DEVELOPMENT', 'PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'].includes(i.status)).length;
    const inDev = issues.filter(i => ['COLLABORATING', 'SOLUTION_DEVELOPMENT', 'PROTOTYPING'].includes(i.status)).length;
    const resolved = issues.filter(i => ['DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'].includes(i.status)).length;
    
    return {
      problemsReported: Math.max(total, impactData?.metrics?.problemsReported || 142),
      problemsVerified: Math.max(verified, impactData?.metrics?.problemsVerified || 118),
      aiMatched: Math.max(matched, impactData?.metrics?.aiMatched || 94),
      solutionsInDevelopment: Math.max(inDev, impactData?.metrics?.solutionsInDevelopment || 38),
      problemsResolved: Math.max(resolved, impactData?.metrics?.problemsResolved || 56),
      citizensImpacted: impactData?.metrics?.citizensImpacted || 85200
    };
  }, [issues, impactData]);

  // 7-Stage Visual Impact Pipeline definition
  const pipelineStages = [
    {
      id: 1,
      title: isHindi ? '1. नागरिक समस्या रिपोर्ट' : '1. Problems Reported',
      subtitle: isHindi ? 'नागरिकों द्वारा फ़ील्ड से समस्या दर्ज' : 'Grassroots reporting by citizens',
      icon: Users,
      color: 'blue',
      description: isHindi
        ? 'झारखंड के नागरिक जियो-लोकेशन और साक्ष्य के साथ जलभराव, सड़क या स्वास्थ्य संबंधी समस्याएं दर्ज करते हैं।'
        : 'Citizens across Jharkhand submit localized civic, water, road, and healthcare issues with geo-evidence.',
      stat: `${localStats.problemsReported}+`,
      statusTag: 'REPORTED'
    },
    {
      id: 2,
      title: isHindi ? '2. एआई विश्लेषण' : '2. AI Analysed',
      subtitle: isHindi ? 'nlp द्वारा वर्गीकरण व प्राथमिकता' : 'NLP severity & domain classification',
      icon: Cpu,
      color: 'purple',
      description: isHindi
        ? 'फास्टएपीआई एआई इंजन विवरण की गंभीरता, तात्कालिकता और तकनीकी डोमेन का विश्लेषण करता है।'
        : 'FastAPI AI Engine computes severity score, urgency level, and matches technical problem domain.',
      stat: '100% Triaged',
      statusTag: 'AI_ANALYZED'
    },
    {
      id: 3,
      title: isHindi ? '3. सरकारी सत्यापन' : '3. Government Verified',
      subtitle: isHindi ? 'ज़िला अधिकारियों द्वारा निरीक्षण' : 'District administrative review',
      icon: ShieldCheck,
      color: 'emerald',
      description: isHindi
        ? 'ज़िला प्रशासन (जैसे रामगढ़, रांची नगर निगम) रिपोर्ट की सत्यता और प्राथमिकता को सत्यापित करता है।'
        : 'Municipal and district officials audit the report, authenticate ground validity, and approve for action.',
      stat: `${localStats.problemsVerified} Verified`,
      statusTag: 'VERIFIED'
    },
    {
      id: 4,
      title: isHindi ? '4. शैक्षणिक संस्थान मिलान' : '4. Institution Matched',
      subtitle: isHindi ? 'आरएंडडी लैब्स व संकाय मिलान' : 'Academic lab & faculty matching',
      icon: GraduationCap,
      color: 'indigo',
      description: isHindi
        ? 'बीआईटी मेसरा, आईआईटी धनबाद या एनआईटी जमशेदपुर की संबंधित लैब्स को समाधान विकसित करने हेतु जोड़ा जाता है।'
        : 'Relevant engineering departments at BIT Mesra, IIT ISM Dhanbad, or NIT JSR are paired to build prototypes.',
      stat: `${localStats.aiMatched} Matched`,
      statusTag: 'MATCHED'
    },
    {
      id: 5,
      title: isHindi ? '5. सीएसआर / सहायता' : '5. Support Received',
      subtitle: isHindi ? 'संसाधन व सामग्री अनुदान' : 'Industry grants & resources',
      icon: Building2,
      color: 'amber',
      description: isHindi
        ? 'टाटा स्टील सीएसआर या स्थानीय उद्योग पायलट टेस्टिंग हेतु कच्चा माल और संसाधन अनुदान प्रदान करते हैं।'
        : 'Corporate CSR partners (e.g. Tata Steel CSR) supply pilot equipment, seed grants, and raw materials.',
      stat: '₹48.5L Seed Grants',
      statusTag: 'COLLABORATING'
    },
    {
      id: 6,
      title: isHindi ? '6. समाधान विकास' : '6. Solution Development',
      subtitle: isHindi ? 'प्रोटोटाइप निर्माण व परीक्षण' : 'Prototyping & field deployment',
      icon: Zap,
      color: 'orange',
      description: isHindi
        ? 'छात्र और शोधकर्ता ज़मीनी स्थिति के अनुसार किफ़ायती प्रोटोटाइप का निर्माण और फ़ील्ड टेस्ट करते हैं।'
        : 'Student innovators and faculty build and bench-test modular, low-cost engineering solutions on ground.',
      stat: `${localStats.solutionsInDevelopment} Active`,
      statusTag: 'SOLUTION_DEVELOPMENT'
    },
    {
      id: 7,
      title: isHindi ? '7. प्रमाणित सामाजिक प्रभाव' : '7. Societal Impact',
      subtitle: isHindi ? 'सत्यापित समाधान व जन-लाभ' : 'Audited lives positively affected',
      icon: Trophy,
      color: 'emerald',
      description: isHindi
        ? 'समाधान सफलतापूर्वक लागू होने के बाद नागरिकों का जीवन सुगम होता है और प्रभाव का ऑडिट होता है।'
        : 'Permanent civic resolution verified by ground inspection, benefiting thousands of residents.',
      stat: `${localStats.problemsResolved} Resolved`,
      statusTag: 'IMPACT_VERIFIED'
    }
  ];

  // Category Impact Data
  const categoriesList = [
    { name: 'Water & Sanitation', nameHi: 'जल और स्वच्छता', reported: 46, inDev: 14, resolved: 22, color: 'bg-cyan-500' },
    { name: 'Roads & Transport', nameHi: 'सड़क एवं परिवहन', reported: 38, inDev: 11, resolved: 16, color: 'bg-blue-500' },
    { name: 'Healthcare Access', nameHi: 'स्वास्थ्य सेवा पहुंच', reported: 24, inDev: 6, resolved: 9, color: 'bg-rose-500' },
    { name: 'Education Infrastructure', nameHi: 'शिक्षा अवसंरचना', reported: 18, inDev: 4, resolved: 7, color: 'bg-indigo-500' },
    { name: 'Agriculture & Rural', nameHi: 'कृषि एवं ग्रामीण विकास', reported: 14, inDev: 3, resolved: 5, color: 'bg-emerald-500' },
    { name: 'Environment & Greenery', nameHi: 'पर्यावरण एवं हरियाली', reported: 12, inDev: 2, resolved: 4, color: 'bg-teal-500' },
    { name: 'Public Safety', nameHi: 'सार्वजनिक सुरक्षा', reported: 10, inDev: 2, resolved: 3, color: 'bg-amber-500' },
    { name: 'Waste Management', nameHi: 'कचरा प्रबंधन', reported: 9, inDev: 2, resolved: 3, color: 'bg-purple-500' },
    { name: 'Electricity & Lighting', nameHi: 'बिजली एवं प्रकाश व्यवस्था', reported: 8, inDev: 1, resolved: 3, color: 'bg-yellow-500' }
  ];

  // Priority Jharkhand Districts Impact Data
  const districtImpactList = [
    {
      district: 'Ramgarh',
      state: 'Jharkhand',
      reported: 36,
      inDev: 12,
      resolved: 18,
      beneficiaries: '28,400+ Citizens',
      partnerInstitutions: 'BIT Mesra & BIT Sindri',
      topSector: 'Waterlogging & Urban Runoff'
    },
    {
      district: 'Ranchi',
      state: 'Jharkhand',
      reported: 48,
      inDev: 16,
      resolved: 24,
      beneficiaries: '34,200+ Citizens',
      partnerInstitutions: 'BIT Mesra, IIIT Ranchi & BAU',
      topSector: 'Public Health & Rural Power'
    },
    {
      district: 'Hazaribagh',
      state: 'Jharkhand',
      reported: 22,
      inDev: 7,
      resolved: 11,
      beneficiaries: '18,900+ Citizens',
      partnerInstitutions: 'VBU Hazaribagh & BIT Sindri',
      topSector: 'Rural Road Safety & Solar PHC'
    },
    {
      district: 'Bokaro',
      state: 'Jharkhand',
      reported: 26,
      inDev: 8,
      resolved: 12,
      beneficiaries: '21,500+ Citizens',
      partnerInstitutions: 'BIT Sindri & NIT Jamshedpur',
      topSector: 'Industrial Effluent & Drainage'
    },
    {
      district: 'Dhanbad',
      state: 'Jharkhand',
      reported: 32,
      inDev: 9,
      resolved: 15,
      beneficiaries: '22,100+ Citizens',
      partnerInstitutions: 'IIT (ISM) Dhanbad & BIT Sindri',
      topSector: 'Groundwater Quality & Mining Dust'
    },
    {
      district: 'East Singhbhum (Jamshedpur)',
      state: 'Jharkhand',
      reported: 29,
      inDev: 8,
      resolved: 14,
      beneficiaries: '26,000+ Citizens',
      partnerInstitutions: 'NIT Jamshedpur & XLRI',
      topSector: 'Solid Waste & Storm Drainage'
    }
  ];

  // Case Studies
  const caseStudies = impactData?.caseStudies && impactData.caseStudies.length > 0 
    ? impactData.caseStudies 
    : [
      {
        id: 'CS-RAMGARH-01',
        title: 'Waterlogging & Drainage Solution near Government High School',
        titleHi: 'सरकारी विद्यालय के निकट जलभराव और जल निकासी समाधान',
        district: 'Ramgarh',
        state: 'Jharkhand',
        locality: 'Chitarpur Block, Near Govt High School',
        affectedCitizens: '250+ Students & Residents',
        category: 'Water & Sanitation',
        currentStatus: 'SOLUTION_DEVELOPMENT',
        statusLabel: 'Solution Development',
        aiMatchedInstitution: 'BIT Mesra (Civil & Environmental Engineering)',
        leadInnovator: 'Dr. A. Verma & Student Innovation Cohort',
        supportingPartner: 'Tata Steel CSR & Ramgarh District Administration',
        solutionSummary: 'Engineered interlocking permeable pavers with localized subsurface percolation trenches to divert seasonal monsoon waterlogging.',
        isPrototypeCaseStudy: true,
        pipelineStages: [
          { stage: 'Reported', completed: true, detail: 'Citizen report logged with geotagged photo evidence' },
          { stage: 'AI Analysed', completed: true, detail: 'Priority: High • Sector: Urban Drainage & Safety' },
          { stage: 'Govt Verified', completed: true, detail: 'Ramgarh Municipal Council inspection verified on ground' },
          { stage: 'Institution Matched', completed: true, detail: 'BIT Mesra matched (94% domain match)' },
          { stage: 'Support Received', completed: true, detail: 'CSR micro-pilot grant of ₹1.2L sanctioned for material' },
          { stage: 'Solution Dev', completed: true, detail: 'Interlocking paver modules cast and bench-tested' },
          { stage: 'Impact', completed: false, detail: 'Scheduled deployment targeting 250+ student beneficiaries' }
        ]
      },
      {
        id: 'CS-RANCHI-02',
        title: 'Solar Micro-Grid with IoT Health Monitor for Rural PHC',
        titleHi: 'ग्रामीण प्राथमिक स्वास्थ्य केंद्र के लिए सौर ऊर्जा माइक्रो-ग्रिड',
        district: 'Ranchi',
        state: 'Jharkhand',
        locality: 'Angara Block, Primary Health Sub-Centre',
        affectedCitizens: '1,400+ Rural Patients',
        category: 'Healthcare Access',
        currentStatus: 'DEPLOYED',
        statusLabel: 'Deployed & Operational',
        aiMatchedInstitution: 'IIIT Ranchi (IoT & Embedded Systems Lab)',
        leadInnovator: 'Renewable Tech Innovation Cohort',
        supportingPartner: 'Jharkhand Renewable Energy Dev Agency (JREDA)',
        solutionSummary: 'Automated solar battery backup system preventing cold-chain vaccine spoilage during rural power outages.',
        isPrototypeCaseStudy: true,
        pipelineStages: [
          { stage: 'Reported', completed: true, detail: 'Reported by local health worker' },
          { stage: 'AI Analysed', completed: true, detail: 'Categorized under Healthcare Power Resilience' },
          { stage: 'Govt Verified', completed: true, detail: 'District Health Officer authorized priority action' },
          { stage: 'Institution Matched', completed: true, detail: 'IIIT Ranchi embedded electronics group matched' },
          { stage: 'Support Received', completed: true, detail: 'Seed pilot equipment supported via State CSR consortium' },
          { stage: 'Solution Dev', completed: true, detail: 'Smart inverter unit fabricated and bench-tested' },
          { stage: 'Impact', completed: true, detail: 'Zero vaccine spoilage across 14 months of operation' }
        ]
      }
    ];

  const currentStudy = caseStudies[activeCaseStudyIndex] || caseStudies[0];

  // Speech summary text for TTS
  const speechSummaryText = isHindi
    ? `जनसेतु प्रभाव इंटेलिजेंस डैशबोर्ड। कुल दर्ज समस्याएं: ${localStats.problemsReported}, सत्यापित समस्याएं: ${localStats.problemsVerified}, एआई मिलान: ${localStats.aiMatched}, विकासाधीन समाधान: ${localStats.solutionsInDevelopment}, हल की गई समस्याएं: ${localStats.problemsResolved}, लाभान्वित नागरिक: ${localStats.citizensImpacted} से अधिक। प्रमुख ज़िला रामगढ़ में बीआईटी मेसरा द्वारा सरकारी विद्यालय जलभराव समाधान प्रोटोटाइप विकास में है।`
    : `JanSetu Impact Intelligence Dashboard. Total problems reported: ${localStats.problemsReported}, verified problems: ${localStats.problemsVerified}, AI matches: ${localStats.aiMatched}, solutions in development: ${localStats.solutionsInDevelopment}, problems resolved: ${localStats.problemsResolved}, citizens potentially impacted: over ${localStats.citizensImpacted}. Featured prototype case study in Ramgarh is addressing school waterlogging with BIT Mesra.`;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. HEADER & PROTOTYPE METRICS NOTICE */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>{isHindi ? 'प्रभाव इंटेलिजेंस • झारखंड' : 'Impact Intelligence • Jharkhand'}</span>
                </span>

                {/* Explicit Prototype Metrics Label */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isHindi ? 'प्रोटोटाइप मेट्रिक्स / डेमो डेटा' : 'Prototype Metrics / Demo Data'}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  <span>DB Sync: Active</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {isHindi ? 'समस्या से' : 'From Problem to'}{' '}
                <span className="gradient-text">{isHindi ? 'समाधान व ज़मीनी प्रभाव।' : 'Verified Societal Impact.'}</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {isHindi
                  ? 'जनसेतु झारखंड में नागरिकों की समस्याओं को एआई विश्लेषण, सरकारी सत्यापन, विश्वविद्यालय सहयोग और उद्योग सहायता के माध्यम से स्थायी समाधान में परिवर्तित करता है।'
                  : 'JanSetu measures and communicates the complete civic journey: converting citizen complaints into academic R&D challenges, verified field pilots, and audited public benefit across Jharkhand.'
                }
              </p>
            </div>

            {/* Listen Action */}
            <div className="shrink-0 flex items-center gap-3">
              <SpeakButton 
                text={speechSummaryText} 
                size="md" 
                variant="outline"
                label={isHindi ? 'डैशबोर्ड सुनें' : 'Listen Overview'}
              />
            </div>
          </div>

          {/* Role Perspective Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>{isHindi ? 'भूमिका अनुसार प्रभाव दृश्य:' : 'View Impact by Stakeholder Perspective:'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              {[
                { id: 'all', label: isHindi ? 'समग्र पारिस्थितिकी तंत्र' : 'All Perspectives' },
                { id: 'citizen', label: isHindi ? 'नागरिक (Citizen)' : 'Citizen' },
                { id: 'government', label: isHindi ? 'प्रशासन (Government)' : 'Government' },
                { id: 'university', label: isHindi ? 'विश्वविद्यालय (University)' : 'University' },
                { id: 'industry', label: isHindi ? 'उद्योग / CSR (Industry)' : 'Industry / CSR' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedRole === r.id
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. IMPACT OVERVIEW METRICS GRID (6 Core Cards) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isHindi ? 'प्रमुख प्रभाव संकेतक' : 'Core Impact Indicators'}
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              {isHindi ? 'झारखंड पायलट मेट्रिक्स' : 'Jharkhand Pilot Metrics'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {/* 1. Problems Reported */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'दर्ज समस्याएं' : 'Reported'}
                </span>
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{localStats.problemsReported}</div>
              <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
                {isHindi ? 'नागरिक रिपोर्ट' : 'Citizen submissions'}
              </span>
            </div>

            {/* 2. Problems Verified */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'सत्यापित' : 'Verified'}
                </span>
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">{localStats.problemsVerified}</div>
              <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                {isHindi ? 'प्रशासन द्वारा स्वीकृत' : 'Govt authenticated'}
              </span>
            </div>

            {/* 3. AI Matched */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card hover:border-purple-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'एआई मिलान' : 'AI Matched'}
                </span>
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-purple-700">{localStats.aiMatched}</div>
              <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
                {isHindi ? 'संस्थानों से लिंक' : 'Institution matches'}
              </span>
            </div>

            {/* 4. Solutions in Development */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'विकास में' : 'In Dev'}
                </span>
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-700">{localStats.solutionsInDevelopment}</div>
              <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
                {isHindi ? 'सक्रिय प्रोटोटाइप' : 'Active prototypes'}
              </span>
            </div>

            {/* 5. Problems Resolved */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card hover:border-brand-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'हल की गई' : 'Resolved'}
                </span>
                <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-700">{localStats.problemsResolved}</div>
              <span className="text-[11px] text-brand-700 font-semibold mt-1 block">
                {isHindi ? 'ज़मीनी समाधान' : 'Audited resolutions'}
              </span>
            </div>

            {/* 6. Citizens Potentially Impacted */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'प्रभावित जन' : 'Beneficiaries'}
                </span>
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {localStats.citizensImpacted >= 1000 ? `${(localStats.citizensImpacted / 1000).toFixed(1)}k+` : localStats.citizensImpacted}
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                {isHindi ? 'संभावित नागरिक लाभ' : 'Estimated reach'}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. IMPACT PIPELINE (7-Stage Visual Journey) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-black text-slate-900">
                  {isHindi ? 'जनसेतु प्रभाव पाइपलाइन (7-चरणीय यात्रा)' : 'JanSetu End-to-End Impact Pipeline'}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isHindi 
                  ? 'समस्या दर्ज होने से लेकर नागरिक प्रभाव तक की निर्बाध व पारदर्शी प्रक्रिया' 
                  : 'From grassroots problem report to verified societal impact — click each stage for details.'}
              </p>
            </div>

            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 self-start sm:self-auto">
              Problem → AI → Match → Solution → Impact
            </span>
          </div>

          {/* Visual Step Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = selectedPipelineStep === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedPipelineStep(idx)}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between gap-3 ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 rounded-xl ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-white text-brand-600 shadow-2xs'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}>
                      {idx + 1} / 7
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-bold line-clamp-1">{stage.title}</div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {stage.stat}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Drawer */}
          {pipelineStages[selectedPipelineStep] && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded bg-brand-100 text-brand-900">
                      Stage {selectedPipelineStep + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {pipelineStages[selectedPipelineStep].title} — {pipelineStages[selectedPipelineStep].subtitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
                    {pipelineStages[selectedPipelineStep].description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                    Current Volume: {pipelineStages[selectedPipelineStep].stat}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. PROTOTYPE IMPACT STORIES (Case Study Showcase) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isHindi ? 'प्रभाव गाथाएं • प्रोटोटाइप केस स्टडी' : 'Impact Stories • Case Studies'}
              </h2>
            </div>
            
            {/* Required Disclaimer */}
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHindi ? 'प्रोटोटाइप केस स्टडी (प्रदर्शन हेतु)' : 'Prototype Case Study (Demonstration Only)'}</span>
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
            {/* Case Study Switcher Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-100">
              {caseStudies.map((cs, idx) => (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setActiveCaseStudyIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeCaseStudyIndex === idx
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{cs.district}: {cs.category}</span>
                </button>
              ))}
            </div>

            {/* Active Case Study Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    Prototype Case Study
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {currentStudy.district}, {currentStudy.state}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {currentStudy.statusLabel}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {isHindi && currentStudy.titleHi ? currentStudy.titleHi : currentStudy.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentStudy.solutionSummary}
                </p>

                {/* Key Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Citizens Potentially Affected</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-600" />
                      {currentStudy.affectedCitizens}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Matched Institution</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      {currentStudy.aiMatchedInstitution}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Supporting Partner</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      {currentStudy.supportingPartner || 'District Administration & CSR'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lead Innovator / Cohort</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      {currentStudy.leadInnovator || 'Academic R&D Faculty Lab'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-tight">
                  <strong>Notice:</strong> This narrative is a structured prototype case study to illustrate the 
                  JanSetu end-to-end impact framework. Institutional names represent simulated matches for SIH PS 26043 demonstration.
                </div>
              </div>

              {/* Step Progression Visual for this Case Study */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-600" />
                  <span>Case Study Journey Milestones</span>
                </h4>

                <div className="space-y-2.5">
                  {currentStudy.pipelineStages.map((ps, sidx) => (
                    <div key={sidx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className={`p-1 rounded-full mt-0.5 ${
                        ps.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{ps.stage}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            ps.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {ps.completed ? 'Complete' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{ps.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. CATEGORY IMPACT DISTRIBUTION & 6. DISTRICT IMPACT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Category Impact Breakdown */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-600" />
                  <span>{isHindi ? 'श्रेणी अनुसार प्रभाव वितरण' : 'Impact by Problem Category'}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Distribution across core civic & infrastructure sectors</p>
              </div>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                9 Categories
              </span>
            </div>

            <div className="space-y-4">
              {categoriesList.map((cat, idx) => {
                const totalInCat = cat.reported;
                const percentResolved = Math.round((cat.resolved / totalInCat) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        {isHindi ? cat.nameHi : cat.name}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        <strong className="text-slate-900">{cat.reported}</strong> reported • <strong className="text-emerald-700">{cat.resolved}</strong> resolved
                      </span>
                    </div>

                    {/* Multi-segment progress bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentResolved}%` }}
                        title={`${percentResolved}% Resolved`}
                      />
                      <div 
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: `${Math.round((cat.inDev / totalInCat) * 100)}%` }}
                        title={`${cat.inDev} in Development`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolved</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> In Development</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-200" /> Reported</span>
              </div>
              <span>Prototype Metrics</span>
            </div>
          </div>

          {/* District Impact Table (Jharkhand Focus) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  <span>{isHindi ? 'झारखंड ज़िला प्रभाव वितरण' : 'Jharkhand District Impact'}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Prioritized administrative and academic innovation corridors</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Top 6 Districts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-2 font-semibold">District</th>
                    <th className="pb-2 font-semibold">Reported</th>
                    <th className="pb-2 font-semibold">In Dev</th>
                    <th className="pb-2 font-semibold">Resolved</th>
                    <th className="pb-2 font-semibold text-right">Beneficiaries</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {districtImpactList.map((dist, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 font-bold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          <span>{dist.district}</span>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-slate-600">{dist.reported}</td>
                      <td className="py-3 font-semibold text-amber-700">{dist.inDev}</td>
                      <td className="py-3 font-bold text-emerald-700">{dist.resolved}</td>
                      <td className="py-3 font-bold text-slate-900 text-right">{dist.beneficiaries}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Leading Jharkhand academic partners: <strong>BIT Mesra, IIT (ISM) Dhanbad, NIT JSR</strong></span>
              <span className="text-[10px] font-bold text-slate-400">Demo Registry</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 7. INTERACTIVE JHARKHAND 24-DISTRICT GIS HEATMAP & INNOVATION EXPLORER */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <MapPin className="w-5 h-5" />
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isHindi ? 'झारखंड 24-ज़िला जीआईएस हीटमैप व नवाचार कॉरिडोर' : 'Jharkhand 24-District GIS Heatmap & Resolution Index'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isHindi 
                  ? 'झारखंड के सभी 24 ज़िलों में दर्ज समस्याएं, संबद्ध उच्च शिक्षण संस्थान और समाधान दर देखें।' 
                  : 'Real-time interactive civic density, paired Higher Education Institutions (HEIs), and resolution indices across all 24 districts of Jharkhand.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                24 Districts Active
              </span>
            </div>
          </div>

          {/* Interactive 24-District Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Ranchi', reported: 42, resolved: 28, hei: 'BIT Mesra / CUJ', heat: 'high' },
              { name: 'Ramgarh', reported: 31, resolved: 18, hei: 'BIT Mesra Pilot', heat: 'high' },
              { name: 'Dhanbad', reported: 38, resolved: 24, hei: 'IIT (ISM) Dhanbad', heat: 'high' },
              { name: 'East Singhbhum', reported: 29, resolved: 19, hei: 'NIT Jamshedpur', heat: 'high' },
              { name: 'Bokaro', reported: 22, resolved: 14, hei: 'BVS & Polytech', heat: 'medium' },
              { name: 'Hazaribagh', reported: 19, resolved: 11, hei: 'Vinoba Bhave Univ', heat: 'medium' },
              { name: 'Deoghar', reported: 16, resolved: 9, hei: 'AIIMS & Tech Hub', heat: 'medium' },
              { name: 'Dumka', reported: 14, resolved: 7, hei: 'SKMU Dumka', heat: 'medium' },
              { name: 'Giridih', reported: 12, resolved: 6, hei: 'Birsa Agri Wing', heat: 'medium' },
              { name: 'West Singhbhum', reported: 11, resolved: 5, hei: 'Kolhan University', heat: 'low' },
              { name: 'Saraikela', reported: 13, resolved: 8, hei: 'NIT JSR Corridor', heat: 'medium' },
              { name: 'Palamu', reported: 15, resolved: 7, hei: 'NPU Medininagar', heat: 'medium' },
              { name: 'Garhwa', reported: 9, resolved: 4, hei: 'Palamu Cluster', heat: 'low' },
              { name: 'Latehar', reported: 8, resolved: 4, hei: 'Tribal Eco Labs', heat: 'low' },
              { name: 'Chatra', reported: 7, resolved: 3, hei: 'VBU Extension', heat: 'low' },
              { name: 'Gumla', reported: 9, resolved: 5, hei: 'BAU Agro Wing', heat: 'low' },
              { name: 'Simdega', reported: 6, resolved: 3, hei: 'Hydrology Cell', heat: 'low' },
              { name: 'Lohardaga', reported: 8, resolved: 4, hei: 'Mining Runoff Lab', heat: 'low' },
              { name: 'Khunti', reported: 10, resolved: 6, hei: 'Solar Microgrid Lab', heat: 'low' },
              { name: 'Koderma', reported: 11, resolved: 6, hei: 'Mica Reclamation', heat: 'low' },
              { name: 'Jamtara', reported: 7, resolved: 4, hei: 'Digital Literacy Hub', heat: 'low' },
              { name: 'Sahibganj', reported: 9, resolved: 5, hei: 'Ganga Basin Unit', heat: 'low' },
              { name: 'Pakur', reported: 6, resolved: 3, hei: 'Stone Basin Study', heat: 'low' },
              { name: 'Godda', reported: 8, resolved: 4, hei: 'Rural Power Lab', heat: 'low' },
            ].map((d, i) => (
              <div 
                key={i} 
                className={`p-3.5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${
                  d.heat === 'high' 
                    ? 'bg-rose-50/50 border-rose-200 hover:border-rose-400' 
                    : d.heat === 'medium' 
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400' 
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-extrabold text-xs text-slate-900 truncate" title={d.name}>
                    {d.name}
                  </span>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    d.heat === 'high' ? 'bg-rose-500 animate-pulse' : d.heat === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                </div>
                <div className="text-[11px] text-slate-600 font-semibold flex items-center justify-between">
                  <span>{d.reported} Reported</span>
                  <span className="text-emerald-700 font-bold">{d.resolved} Solved</span>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-200/60 text-[10px] text-brand-700 font-medium truncate" title={d.hei}>
                  🎓 {d.hei}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High Activity Innovation Corridors</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Developing Prototype Zones</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Stable Resolution Network</span>
            </div>
            <span className="font-semibold text-slate-700">Covering 100% of Jharkhand Municipal & Tribal Blocks</span>
          </div>
        </div>

      </div>
    </div>
  );
};

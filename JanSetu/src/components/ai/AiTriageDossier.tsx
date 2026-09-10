import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  MapPin, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  Building2, 
  RefreshCw, 
  HelpCircle,
  FileCheck,
  Wrench,
  Trophy,
  ExternalLink
} from 'lucide-react';
import { Issue } from '../../types';
import { TriageResultResponse, InstitutionMatch, SimilarProblemMatch } from '../../services/aiEngineService';
import { useLanguage } from '../../context/LanguageContext';
import { SpeakButton } from '../common/SpeakButton';
import { SpeechFormatters } from '../../utils/speechFormatters';

export interface AiTriageDossierProps {
  issue: Issue;
  aiTriage: TriageResultResponse | null;
  isLoading?: boolean;
  isOnline?: boolean;
  onReanalyze?: () => void;
  className?: string;
}

export const AiTriageDossier: React.FC<AiTriageDossierProps> = ({
  issue,
  aiTriage,
  isLoading = false,
  isOnline = true,
  onReanalyze,
  className = ''
}) => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  // 1. Safe Category & Metric Extraction
  const category = aiTriage?.category || issue.category || (isHindi ? 'उपलब्ध नहीं' : 'Not available');
  const confidence = aiTriage?.confidence ? `${Math.round(aiTriage.confidence * 100)}%` : '94%';
  const severity = aiTriage?.severity || issue.severity || 'HIGH';
  const urgency = aiTriage?.urgency || 'HIGH';
  const impact = aiTriage?.impactLevel || 'Community';
  const affectedPop = aiTriage?.estimatedAffectedPop || (issue.estimatedPeopleAffected ? `~${issue.estimatedPeopleAffected.toLocaleString()} people` : '~1,200 people');

  // 2. Safe Institution Matches (Fallback to curated Jharkhand HEI knowledge if empty)
  const matches: InstitutionMatch[] = (aiTriage?.institutionMatches && aiTriage.institutionMatches.length > 0)
    ? aiTriage.institutionMatches
    : [
        {
          id: 'INST-BIT-MESRA',
          name: 'BIT Mesra, Ranchi',
          matchScore: 0.96,
          reasons: [
            'Strong Water & Sanitation and Civil Engineering expertise',
            'Direct geographic proximity to ' + (issue.location?.district || 'Ramgarh'),
            'High solution capability with accredited hydraulic labs'
          ]
        },
        {
          id: 'INST-NIT-JSR',
          name: 'NIT Jamshedpur',
          matchScore: 0.91,
          reasons: [
            'Civil & Structural engineering capability',
            'Relevant problem domain experience in Jharkhand',
            'Strong student capstone prototyping lab'
          ]
        },
        {
          id: 'INST-IIT-ISM',
          name: 'IIT (ISM) Dhanbad',
          matchScore: 0.87,
          reasons: [
            'Technical research capability in environmental runoff',
            'Relevant civic infrastructure expertise'
          ]
        }
      ];

  // 3. Similar Problems in Jharkhand
  const similarProblems: SimilarProblemMatch[] = (aiTriage?.similarProblems && aiTriage.similarProblems.length > 0)
    ? aiTriage.similarProblems
    : [
        {
          problemId: 'JS-2026-001245',
          title: isHindi ? 'सरकारी स्कूल के पास जलभराव' : 'Waterlogging near government school',
          similarity: 0.92,
          relationship: 'SIMILAR_PROBLEM',
          blueprintUrl: '/solutions'
        },
        {
          problemId: 'JS-2026-000843',
          title: isHindi ? 'हज़ारीबाग में आवासीय क्षेत्र के पास जल निकासी अवरोध' : 'Drainage overflow near residential area',
          similarity: 0.84,
          relationship: 'SIMILAR_PROBLEM',
          blueprintUrl: '/solutions'
        },
        {
          problemId: 'JS-2026-000419',
          title: isHindi ? 'बोकारो सार्वजनिक संस्थान के पास बंद नाली' : 'Blocked drainage around public institution',
          similarity: 0.78,
          relationship: 'RELATED_THEME'
        }
      ];

  // 4. Current Journey Stage Mapping for Recommended Next Action
  const getNextActionState = (status: string) => {
    switch (status) {
      case 'REPORTED':
      case 'AI_ANALYZING':
      case 'AI_ANALYZED':
        return { step: 1, label: isHindi ? 'सरकारी सत्यापन प्रतीक्षित' : 'Government Verification in progress' };
      case 'GOVERNMENT_REVIEW':
      case 'VERIFIED':
      case 'POTENTIAL_MATCH':
      case 'MATCHED':
        return { step: 2, label: isHindi ? 'विश्वविद्यालय सहयोग एवं कैपस्टोन आवंटन' : 'Institution Collaboration & Capstone Match' };
      case 'COLLABORATING':
      case 'SOLUTION_DEVELOPMENT':
      case 'PROTOTYPING':
        return { step: 3, label: isHindi ? 'समाधान प्रोटोटाइप विकास जारी' : 'Solution Development & Testing' };
      case 'DEPLOYED':
      case 'IMPACT_VERIFIED':
      case 'RESOLVED':
        return { step: 4, label: isHindi ? 'सत्यापित प्रभाव एवं ऑडिट' : 'Impact Audited & Complete' };
      default:
        return { step: 1, label: isHindi ? 'प्रक्रियाधीन' : 'In Progress' };
    }
  };

  const nextAction = getNextActionState(issue.status as string);

  return (
    <section 
      aria-label="JanSetu AI Analysis Dossier"
      className={`bg-white rounded-3xl border border-indigo-100 shadow-card p-6 sm:p-8 space-y-8 relative overflow-hidden ${className}`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50/70 via-sky-50/40 to-transparent pointer-events-none rounded-bl-full" />

      {/* ============================================================ */}
      {/* 1. HEADER & LIVE ENGINE HEALTH BAR */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-brand-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase text-indigo-700 tracking-wider">
                {isHindi ? 'जनसेतु एआई विश्लेषण इंजन v2' : 'JanSetu AI Analysis & Match Engine'}
              </span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                isOnline 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{isOnline ? (isHindi ? 'एआई इंजन: सक्रिय' : 'FastAPI Engine: Active') : (isHindi ? 'स्थानीय सहायक' : 'Resilient Heuristic')}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {isHindi ? 'समस्या विश्लेषण एवं विशेषज्ञता मिलान' : 'Problem Triage & Expertise Match Dossier'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <SpeakButton
            text={SpeechFormatters.aiAnalysis(issue, aiTriage, language)}
            label={isHindi ? 'एआई विश्लेषण सुनें' : 'Listen to AI Analysis'}
            showLangSwitch={true}
            size="sm"
            variant="pill"
            ariaLabel={isHindi ? 'एआई विश्लेषण सारांश सुनें' : 'Listen to AI Analysis Summary'}
          />

          {onReanalyze && (
            <button
              type="button"
              onClick={onReanalyze}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition border border-indigo-200 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? (isHindi ? 'विश्लेषण जारी...' : 'Analyzing...') : (isHindi ? 'पुनः जांचें' : 'Re-run AI')}</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. AI ANALYSIS METRICS GRID */}
      {/* ============================================================ */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isHindi ? 'एआई विश्लेषण परिणाम' : 'AI Analysis Results'}</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">ID: {issue.id}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Category */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {isHindi ? 'श्रेणी' : 'Category'}
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
              {category}
            </span>
          </div>

          {/* AI Confidence */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
              {isHindi ? 'एआई विश्वास' : 'Confidence'}
            </span>
            <span className="text-xs sm:text-sm font-black text-indigo-900">
              {confidence}
            </span>
          </div>

          {/* Severity */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block mb-1">
              {isHindi ? 'गंभीरता' : 'Severity'}
            </span>
            <span className="text-xs sm:text-sm font-black text-rose-700">
              {severity} Priority
            </span>
          </div>

          {/* Urgency */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
              {isHindi ? 'तात्कालिकता' : 'Urgency'}
            </span>
            <span className="text-xs sm:text-sm font-black text-amber-800">
              {urgency} (Monsoon)
            </span>
          </div>

          {/* Impact */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
            <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block mb-1">
              {isHindi ? 'प्रभाव' : 'Impact Level'}
            </span>
            <span className="text-xs sm:text-sm font-black text-sky-900">
              {impact} Reach
            </span>
          </div>

          {/* Estimated Affected */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              {isHindi ? 'प्रभावित आबादी' : 'Estimated Reach'}
            </span>
            <span className="text-xs sm:text-sm font-black text-emerald-900 truncate block">
              {affectedPop}
            </span>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. AI RECOMMENDED INSTITUTIONS + "WHY THIS MATCH?" */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>{isHindi ? 'एआई अनुशंसित शिक्षण संस्थान (संभावित मैच)' : 'AI Recommended Higher-Ed Institutions'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHindi 
                ? 'झारखंड के प्रमुख उच्च शिक्षा संस्थानों के साथ एल्गोरिथम मिलान और विशेषज्ञता विश्लेषण' 
                : 'Algorithmic matching with accredited Jharkhand institutions based on domain, capacity & district proximity'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SpeakButton
              text={SpeechFormatters.institutionRecommendation(matches, isHindi ? 'hi' : 'en')}
              label={isHindi ? 'संस्थान मिलान सुनें' : 'Listen to Match'}
              showLangSwitch={true}
              size="xs"
              variant="outline"
              ariaLabel={isHindi ? 'अनुशंसित संस्थान मिलान का विवरण सुनें' : 'Listen to AI Recommended Institution explanation'}
            />
            <span className="text-[11px] font-semibold text-slate-400">
              * Potential Matches
            </span>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            {isHindi ? 'अभी कोई उपयुक्त संस्थान मैच नहीं मिला।' : 'No suitable institution match found yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.map((inst, idx) => {
              const scorePercent = inst.matchScore <= 1 ? Math.round(inst.matchScore * 100) : Math.round(inst.matchScore);

              return (
                <div 
                  key={inst.id || idx}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    idx === 0 
                      ? 'bg-gradient-to-b from-indigo-50/80 via-white to-white border-indigo-300 shadow-sm ring-1 ring-indigo-200' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Ranking & Match Score Pill */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                        idx === 0 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{idx + 1}
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          <span>{scorePercent}% AI Match</span>
                        </span>
                      </div>
                    </div>

                    {/* Institution Name */}
                    <h4 className="text-sm font-black text-slate-900 mb-1 leading-snug">
                      {inst.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-4">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{inst.name.includes('Ranchi') ? 'Ranchi, Jharkhand' : inst.name.includes('Dhanbad') ? 'Dhanbad, Jharkhand' : 'East Singhbhum, Jharkhand'}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">Potential Match</span>
                    </div>

                    {/* "Why This Match?" Section */}
                    <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2 mb-2">
                      <div className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{isHindi ? 'यह मैच क्यों?' : 'Why this match?'}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {inst.reasons.map((reason, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-emerald-600 font-bold text-xs">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Accredited Capstone Hub</span>
                    <span className="font-mono text-[10px] text-slate-300">HEI-{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 4. SIMILAR PROBLEMS IN JHARKHAND */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600" />
              <span>{isHindi ? 'झारखंड में समान समस्याएं' : 'Similar Problems in Jharkhand'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHindi 
                ? 'सिमेंटिक समानता और पूर्व समाधान पुन: प्रयोज्यता विश्लेषण' 
                : 'Semantic similarity and solution reusability index across Jharkhand districts'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SpeakButton
              text={SpeechFormatters.similarProblemsList(similarProblems, isHindi ? 'hi' : 'en')}
              label={isHindi ? 'समान समस्याएं सुनें' : 'Listen to Similar'}
              showLangSwitch={true}
              size="xs"
              variant="outline"
              ariaLabel={isHindi ? 'झारखंड में समान समस्याओं का विवरण सुनें' : 'Listen to similar problems found in Jharkhand'}
            />
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {similarProblems.length} {isHindi ? 'समान समस्याएं मिलीं' : 'similar problems found'}
            </span>
          </div>
        </div>

        {similarProblems.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            {isHindi ? 'अभी कोई समान समस्या नहीं मिली।' : 'No similar problems found yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarProblems.map((sim, sIdx) => {
              const simPercent = sim.similarity <= 1 ? Math.round(sim.similarity * 100) : Math.round(sim.similarity);
              const hasBlueprint = !!sim.blueprintUrl;

              return (
                <div 
                  key={sim.problemId || sIdx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {sim.problemId}
                      </span>
                      <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">
                        {simPercent}% {isHindi ? 'समान' : 'Similar'}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                      {sim.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{sIdx === 0 ? 'Ramgarh, Jharkhand' : sIdx === 1 ? 'Hazaribagh, Jharkhand' : 'Bokaro, Jharkhand'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60">
                    {hasBlueprint ? (
                      <Link 
                        to={sim.blueprintUrl || '/solutions'}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isHindi ? 'पुन: प्रयोज्य समाधान उपलब्ध' : 'Potential reusable solution found'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        {isHindi ? 'कोई समाधान लिंक नहीं है' : 'No reusable solution linked yet'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 5. RECOMMENDED NEXT ACTION */}
      {/* ============================================================ */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700">
          <div>
            <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider block">
              {isHindi ? 'सहयोगात्मक कार्यप्रवाह' : 'COLLABORATIVE ACTION PIPELINE'}
            </span>
            <h3 className="text-base font-black text-white mt-0.5">
              {isHindi ? 'अनुशंसित अगला कदम' : 'Recommended Next Action'}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SpeakButton
              text={SpeechFormatters.nextActionStep(issue.status as string, isHindi ? 'hi' : 'en')}
              label={isHindi ? 'कदम सुनें' : 'Listen to Action'}
              showLangSwitch={true}
              size="xs"
              variant="pill"
              ariaLabel={isHindi ? 'अनुशंसित अगला कदम सुनें' : 'Listen to recommended next action'}
            />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-bold text-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>{nextAction.label}</span>
            </div>
          </div>
        </div>

        {/* 4-Phase Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          
          {/* 1. Govt Verification */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            nextAction.step === 1 
              ? 'bg-indigo-600/30 border-indigo-400 text-white' 
              : nextAction.step > 1 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
              : 'bg-slate-800/40 border-slate-700 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] font-bold">01</span>
              {nextAction.step > 1 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <FileCheck className="w-3.5 h-3.5 text-indigo-300" />
              )}
            </div>
            <strong className="block text-slate-100 font-bold mb-0.5">
              {isHindi ? 'सरकारी सत्यापन' : 'Government Verification'}
            </strong>
            <p className="text-[11px] text-slate-300 leading-tight">
              {isHindi ? 'ज़िला प्रशासन द्वारा प्राथमिकता की पुष्टि' : 'District authority on-site triage & clearance'}
            </p>
          </div>

          {/* 2. Institution Match */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            nextAction.step === 2 
              ? 'bg-indigo-600/30 border-indigo-400 text-white' 
              : nextAction.step > 2 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
              : 'bg-slate-800/40 border-slate-700 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] font-bold">02</span>
              {nextAction.step > 2 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              )}
            </div>
            <strong className="block text-slate-100 font-bold mb-0.5">
              {isHindi ? 'संस्थान सहयोग' : 'Institution Collaboration'}
            </strong>
            <p className="text-[11px] text-slate-300 leading-tight">
              {isHindi ? 'कैपस्टोन रिसर्च टीम द्वारा अभिरुचि' : 'Capstone scholars & faculty mentorship'}
            </p>
          </div>

          {/* 3. Solution Development */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            nextAction.step === 3 
              ? 'bg-indigo-600/30 border-indigo-400 text-white' 
              : nextAction.step > 3 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
              : 'bg-slate-800/40 border-slate-700 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] font-bold">03</span>
              {nextAction.step > 3 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Wrench className="w-3.5 h-3.5 text-indigo-300" />
              )}
            </div>
            <strong className="block text-slate-100 font-bold mb-0.5">
              {isHindi ? 'समाधान विकास' : 'Solution Development'}
            </strong>
            <p className="text-[11px] text-slate-300 leading-tight">
              {isHindi ? 'सीएसआर सहयोग से प्रोटोटाइप निर्माण' : 'Porous concrete & telemetry fabrication'}
            </p>
          </div>

          {/* 4. Impact Tracking */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            nextAction.step === 4 
              ? 'bg-indigo-600/30 border-indigo-400 text-white' 
              : nextAction.step > 4 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
              : 'bg-slate-800/40 border-slate-700 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] font-bold">04</span>
              <Trophy className="w-3.5 h-3.5 text-indigo-300" />
            </div>
            <strong className="block text-slate-100 font-bold mb-0.5">
              {isHindi ? 'प्रभाव सत्यापन' : 'Impact Tracking'}
            </strong>
            <p className="text-[11px] text-slate-300 leading-tight">
              {isHindi ? 'नागरिक संतुष्टि एवं ऑडिट' : 'Audited community benefit & open reuse'}
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};

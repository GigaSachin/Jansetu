import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIssues } from '../context/IssuesContext';
import { useLanguage } from '../context/LanguageContext';
import { IssueJourneyTimeline } from '../components/citizen/IssueJourneyTimeline';
import { StatusBadge } from '../components/common/StatusBadge';
import { SpeakButton } from '../components/common/SpeakButton';
import { SpeechFormatters } from '../utils/speechFormatters';
import { AiTriageDossier } from '../components/ai/AiTriageDossier';
import { EvidenceFile } from '../types';
import { aiEngineService, TriageResultResponse } from '../services/aiEngineService';
import { 
  ChevronLeft, 
  MapPin, 
  ThumbsUp, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Calendar,
  BrainCircuit,
  RefreshCw
} from 'lucide-react';

export const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIssueById, toggleUpvote } = useIssues();
  const { language } = useLanguage();

  const issue = getIssueById(id || 'JS-2026-001245');

  const [aiTriage, setAiTriage] = useState<TriageResultResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [engineHealth, setEngineHealth] = useState<{ isOnline: boolean; status: string; engine: string }>({
    isOnline: false,
    status: 'CHECKING',
    engine: 'JanSetu AI Engine v2'
  });

  useEffect(() => {
    aiEngineService.checkHealth().then(setEngineHealth);

    if (issue) {
      aiEngineService.analyzeProblem({
        problemId: issue.id,
        text: `${issue.title}. ${issue.description}`,
        district: issue.location.district,
        latitude: issue.location.coordinates?.lat,
        longitude: issue.location.coordinates?.lng
      }).then(setAiTriage);
    }
  }, [issue]);

  const handleReanalyze = async () => {
    if (!issue) return;
    setIsAnalyzing(true);
    const result = await aiEngineService.analyzeProblem({
      problemId: issue.id,
      text: `${issue.title}. ${issue.description}`,
      district: issue.location.district,
      latitude: issue.location.coordinates?.lat,
      longitude: issue.location.coordinates?.lng
    });
    setAiTriage(result);
    setIsAnalyzing(false);
  };

  if (!issue) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Challenge Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">The requested challenge is not registered in the civic index.</p>
          <Link to="/explore" className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
            Explore All Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" /> {language === 'hi' ? 'सभी चुनौतियां' : 'Back to All Challenges'}
          </Link>

          <button
            onClick={() => toggleUpvote(issue.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition ${
              issue.hasUpvoted
                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-brand-600' : ''}`} />
            <span>{issue.upvotesCount} {language === 'hi' ? 'समर्थन' : 'Upvotes'}</span>
          </button>
        </div>

        {/* Problem Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                {issue.id}
              </span>
              <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200">
                {issue.category}
              </span>
              <StatusBadge status={issue.status} size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <SpeakButton 
                text={SpeechFormatters.problemDetails(issue, language)}
                label={language === 'hi' ? 'समस्या सुनें' : 'Listen'}
                showLangSwitch={true}
                size="sm"
                variant="outline"
              />
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reported on {new Date(issue.reportedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
            {issue.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600 mb-6">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              {issue.location.locality}, {issue.location.city}, {issue.location.district}, {issue.location.state}
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Challenge Statement</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{issue.description}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Severity</span>
              <span className="text-sm font-black text-rose-600">{issue.severity}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Affected Reach</span>
              <span className="text-sm font-black text-brand-700">{issue.estimatedPeopleAffected}+ Citizens</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Stage</span>
              <span className="text-sm font-black text-slate-900">{issue.status}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Resolution Path</span>
              <span className="text-sm font-black text-emerald-700">HEI + CSR Pilot</span>
            </div>
          </div>
        </div>

        {/* Complete AI Triage & Match Dossier */}
        <div className="mb-8">
          <AiTriageDossier
            issue={issue}
            aiTriage={aiTriage}
            isLoading={isAnalyzing}
            isOnline={engineHealth.isOnline}
            onReanalyze={handleReanalyze}
          />
        </div>

        {/* Journey Timeline */}
        <div className="space-y-8">
          <IssueJourneyTimeline issue={issue} />

          {/* Collaborative Stakeholders Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Govt */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Government Authority</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {issue.govtAuthority?.department || 'Ramgarh Municipal Council & PWD'}
              </h4>
              <p className="text-xs text-slate-500">
                {issue.govtAuthority?.statusNote || 'Enabling administrative clearance and field deployment.'}
              </p>
            </div>

            {/* University */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Match</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {issue.matchedTeam?.institutionName || 'BIT Mesra Civil Cohort'}
              </h4>
              <p className="text-xs text-slate-500">
                {issue.matchedTeam ? `${issue.matchedTeam.teamName} (${issue.matchedTeam.matchScore}% Match • Potential Match)` : 'Open for student capstone teams.'}
              </p>
            </div>

            {/* CSR */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Industry & CSR</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {issue.industryPartner?.name || 'Potential CSR Support'}
              </h4>
              <p className="text-xs text-slate-500">
                {issue.industryPartner?.commitment || 'Open for material and financial co-sponsorship.'}
              </p>
            </div>

          </div>

          {/* Evidence Photos */}
          {issue.evidence && issue.evidence.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4">Ground Evidence & Photos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {issue.evidence.map((ev: EvidenceFile) => (
                  <div key={ev.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                    {ev.type === 'image' && (
                      <img src={ev.url} alt={ev.name} className="w-full h-44 object-cover" />
                    )}
                    <div className="p-3 text-xs font-semibold text-slate-700 truncate">
                      {ev.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

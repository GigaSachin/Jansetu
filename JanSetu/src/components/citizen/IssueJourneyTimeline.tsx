import React from 'react';
import { Issue, IssueStatus } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { SpeakButton } from '../common/SpeakButton';
import { SpeechFormatters } from '../../utils/speechFormatters';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Users, 
  Building2, 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Trophy,
  GraduationCap
} from 'lucide-react';

interface IssueJourneyTimelineProps {
  issue: Issue;
}

export const IssueJourneyTimeline: React.FC<IssueJourneyTimelineProps> = ({ issue }) => {
  const { language } = useLanguage();
  const pipelineStages = [
    { stage: 'REPORTED', title: 'Citizen Reported', subtitle: 'Problem observation registered by citizen on JanSetu network.', icon: CheckCircle2 },
    { stage: 'VERIFIED', title: 'Official Government Verification', subtitle: 'Authority assessment confirms priority on-ground.', icon: ShieldCheck },
    { stage: 'MATCHED', title: 'AI Match & University Assigned', subtitle: 'Academic capstone & faculty lab matched with problem domain.', icon: GraduationCap },
    { stage: 'COLLABORATING', title: 'CSR & Mentorship Alignment', subtitle: 'Industry partner pledges grant or material sponsorship.', icon: Building2 },
    { stage: 'PROTOTYPING', title: 'Solution Lab Prototyping', subtitle: 'Fabricating practical solution & stress testing in lab.', icon: Wrench },
    { stage: 'DEPLOYED', title: 'Civic Field Deployment', subtitle: 'On-ground civil installation with municipal right-of-way.', icon: Truck },
    { stage: 'IMPACT_VERIFIED', title: 'Audited Community Impact', subtitle: 'Independent survey verifies resolution & beneficiary impact.', icon: Trophy }
  ];

  const getStageIndex = (status: string): number => {
    switch (status) {
      case 'REPORTED': return 0;
      case 'AI_ANALYZING': return 0;
      case 'AI_ANALYZED':
      case 'POTENTIAL_MATCH': return 1;
      case 'GOVERNMENT_REVIEW':
      case 'VERIFIED': return 1;
      case 'MATCHED': return 2;
      case 'COLLABORATING': return 3;
      case 'SOLUTION_DEVELOPMENT':
      case 'PROTOTYPING': return 4;
      case 'DEPLOYED': return 5;
      case 'IMPACT_VERIFIED':
      case 'RESOLVED': return 6;
      case 'REJECTED': return -1;
      default: return 0;
    }
  };

  const currentIdx = getStageIndex(issue.status as string);
  const progressPercent = Math.min(100, Math.max(15, Math.round(((currentIdx + 1) / 7) * 100)));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shared Problem Journey</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Journey Timeline • {issue.id}
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SpeakButton
            text={SpeechFormatters.journey(issue, language)}
            label={language === 'hi' ? 'यात्रा विवरण सुनें' : 'Listen to Journey'}
            showLangSwitch={true}
            size="sm"
            variant="outline"
          />

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Overall Progress</span>
            <span className="text-lg font-black text-brand-700">{progressPercent}%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center font-black text-brand-700 text-sm">
            {currentIdx + 1}/7
          </div>
        </div>
      </div>

      {/* Matched Spotlight Box if Available */}
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-sky-50/50 to-white border border-indigo-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-indigo-900 uppercase tracking-wider">
                Innovation Cohort & Collaboration Hub
              </span>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                94% AI Match
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              BIT Mesra, Ranchi (Civil & Hydraulic Engg Lab)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Faculty Lead: <span className="font-semibold text-slate-800">Prof. Arvind K. Mishra</span> • Student Cohort (18 Scholars)
            </p>
          </div>
        </div>

        <div className="bg-white px-3.5 py-2.5 rounded-xl border border-indigo-100 text-xs shrink-0 max-w-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">CSR Supporter (Potential)</span>
          <span className="font-bold text-slate-900 block">Tata Steel CSR Foundation</span>
          <span className="text-[11px] text-emerald-700 font-medium">Permeable Paver Materials & ₹4.5L Seed Grant</span>
        </div>
      </div>

      {/* 7-Stage Timeline Visual */}
      <div className="relative pl-6 sm:pl-8 space-y-8 my-6">
        
        {/* Continuous Connecting Vertical Track */}
        <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-1 bg-slate-100 rounded-full">
          <div
            className="w-full bg-gradient-to-b from-brand-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-700"
            style={{ height: `${Math.min(100, ((currentIdx + 1) / pipelineStages.length) * 100)}%` }}
          />
        </div>

        {pipelineStages.map((stg, idx) => {
          const Icon = stg.icon;
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isUpcoming = idx > currentIdx;

          // Find any relevant update for this stage
          const stageUpdate = issue.updates?.find(u => {
            const uStageIdx = getStageIndex(u.stage as string);
            return uStageIdx === idx;
          });

          return (
            <div key={stg.stage} className="relative flex items-start gap-4 sm:gap-6 group">
              
              {/* Timeline Pin Node */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center -ml-6 sm:-ml-8 shrink-0 z-10 transition-all shadow-xs ${
                  isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100 scale-110 shadow-md'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-300 border-2 border-slate-200'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-spin" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Stage Content */}
              <div
                className={`flex-1 p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-brand-50/50 border-brand-200 shadow-sm'
                    : isDone
                    ? 'bg-slate-50/50 border-slate-200'
                    : 'bg-white border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
                      STAGE 0{idx + 1}
                    </span>
                    <h3 className={`text-sm sm:text-base font-bold ${isCurrent ? 'text-brand-900' : 'text-slate-900'}`}>
                      {stg.title}
                    </h3>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-600 text-white animate-pulse">
                      In Active Progress
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Completed ✓</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stg.subtitle}
                </p>

                {/* Specific Log Note if available */}
                {stageUpdate && (
                  <div className="mt-2.5 p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    <div className="font-bold text-slate-900 flex items-center justify-between gap-2 mb-0.5">
                      <span>{stageUpdate.authorName} ({stageUpdate.authorRole.toUpperCase()})</span>
                      <span className="text-[10px] font-normal text-slate-400">{stageUpdate.timestamp.split('T')[0]}</span>
                    </div>
                    <p className="text-slate-600">{stageUpdate.content}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};

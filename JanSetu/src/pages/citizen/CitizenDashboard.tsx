import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssuesContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  PlusCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  AlertCircle,
  TrendingUp,
  ThumbsUp
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, toggleUpvote } = useIssues();

  // Filter issues reported or relevant
  const myIssues = issues;
  
  const metrics = {
    reported: myIssues.length,
    underReview: myIssues.filter(i => i.status === 'REPORTED' || i.status === 'VERIFIED').length,
    inProgress: myIssues.filter(i => i.status === 'MATCHED' || i.status === 'COLLABORATING' || i.status === 'PROTOTYPING').length,
    resolved: myIssues.filter(i => i.status === 'DEPLOYED' || i.status === 'IMPACT_VERIFIED').length,
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* WELCOME & PRIMARY CTA HEADER */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-2">
              <span>Citizen Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Good morning, {user?.name?.split(' ')[0] || 'Pooja'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Here's what is happening with your reported problems and community initiatives.
            </p>
          </div>

          <Link
            to="/citizen/report"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 text-white font-bold text-sm shadow-md shadow-brand-900/10 transition transform hover:-translate-y-0.5 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            <span>REPORT A PROBLEM</span>
          </Link>
        </div>

        {/* ============================================================ */}
        {/* KEY METRICS GRID */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Problems Reported</span>
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{metrics.reported}</div>
            <span className="text-[11px] text-slate-400 mt-1">Total submissions</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Under Review</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-blue-700">{metrics.underReview}</div>
            <span className="text-[11px] text-slate-400 mt-1">Authority triage</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-700">{metrics.inProgress}</div>
            <span className="text-[11px] text-slate-400 mt-1">University prototyping</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resolved & Impact</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-700">{metrics.resolved}</div>
            <span className="text-[11px] text-slate-400 mt-1">Ground verified</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN ACTIVITY: MY PROBLEMS LIST */}
        {/* ============================================================ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                My Reported Problems
              </h2>
              <p className="text-xs text-slate-500">Track resolution milestones and collaborate with university solvers</p>
            </div>
            <span className="text-xs font-bold text-brand-700">Showing {myIssues.length} active issues</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {myIssues.map((issue) => {
              const latestUpdate = issue.updates?.[0];
              return (
                <div
                  key={issue.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                        {issue.id}
                      </span>
                      <StatusBadge status={issue.status} size="sm" />
                      <span className="text-xs font-bold text-brand-700">{issue.category}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{issue.location.locality}, {issue.location.city}</span>
                      </div>
                      <button
                        onClick={() => toggleUpvote(issue.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                          issue.hasUpvoted ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-brand-600' : ''}`} />
                        <span>{issue.upvotesCount}</span>
                      </button>
                    </div>
                  </div>

                  {/* Problem Body */}
                  <div className="py-4">
                    <Link
                      to={`/citizen/issues/${issue.id}`}
                      className="text-lg sm:text-xl font-bold text-slate-900 hover:text-brand-700 transition block mb-2"
                    >
                      {issue.title}
                    </Link>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>

                  {/* Matched Team Callout if any */}
                  {issue.matchedTeam && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-brand-50/40 border border-indigo-100 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block">
                            Matched: {issue.matchedTeam.teamName} ({issue.matchedTeam.institutionName.split('(')[0]})
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            Led by {issue.matchedTeam.leaderName}
                          </span>
                        </div>
                      </div>
                      <span className="font-extrabold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 self-start sm:self-auto">
                        {issue.matchedTeam.matchScore}% Match Index
                      </span>
                    </div>
                  )}

                  {/* Latest Update & Journey Progress */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-7">
                      <ProgressBar progress={issue.progressPercent} label="Journey Progress" size="sm" />
                      {latestUpdate && (
                        <p className="text-xs text-slate-500 mt-2 truncate">
                          <strong className="text-slate-700">Latest update:</strong> "{latestUpdate.content}"
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-5 flex justify-end">
                      <Link
                        to={`/citizen/issues/${issue.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-xs transition"
                      >
                        <span>View Problem Journey</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

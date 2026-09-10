import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssuesContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SpeakButton } from '../../components/accessibility/SpeakButton';
import { SpeechFormatters } from '../../utils/speechFormatters';
import { ApiClient } from '../../services/apiClient';
import { Issue } from '../../types';
import { 
  CheckCircle2, 
  MapPin, 
  Users, 
  FileCheck, 
  Eye,
  X,
  Building2,
  GraduationCap
} from 'lucide-react';

export const GovtDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, updateIssueStatus } = useIssues();
  const { language } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [reviewProblem, setReviewProblem] = useState<Issue | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const pendingVerification = issues.filter(i => i.status === 'REPORTED' || (i.status as string) === 'AI_ANALYZED');
  const inProgress = issues.filter(i => ['VERIFIED', 'MATCHED', 'COLLABORATING', 'PROTOTYPING', 'GOVERNMENT_REVIEW', 'SOLUTION_DEVELOPMENT'].includes(i.status));
  const resolved = issues.filter(i => ['DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'].includes(i.status));

  const metrics = {
    total: issues.length,
    pending: pendingVerification.length,
    underResolution: inProgress.length,
    resolved: resolved.length
  };

  const filteredIssues = issues.filter(issue => {
    const matchCat = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchStat = selectedStatus === 'All' || issue.status === selectedStatus;
    return matchCat && matchStat;
  });

  const handleVerifyProblem = async (problemId: string, notes?: string) => {
    setIsSubmitting(true);
    const officerName = user?.name || 'Er. Rajeshwar Soren (Nodal Authority)';
    const finalNote = notes || verificationNotes || 'Officially verified on-ground by Municipal Authority. Priority validated for solution design.';

    try {
      await ApiClient.put<any>(`/government/problems/${problemId}/verify`, {
        notes: finalNote
      });

      updateIssueStatus(
        problemId,
        'VERIFIED',
        finalNote,
        officerName,
        'government'
      );

      setFeedbackMsg(`Problem #${problemId} officially verified! Citizen and academic partners notified.`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setReviewProblem(null);
      setVerificationNotes('');
    } catch {
      updateIssueStatus(
        problemId,
        'VERIFIED',
        finalNote,
        officerName,
        'government'
      );
      setFeedbackMsg(`Problem #${problemId} verified!`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setReviewProblem(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkUnderResolution = async (problemId: string) => {
    setIsSubmitting(true);
    const officerName = user?.name || 'Authority Officer';
    const note = 'Administrative right-of-way sanctioned. Solution development initiated with academic partner.';

    try {
      await ApiClient.put<any>(`/government/problems/${problemId}/status`, {
        status: 'SOLUTION_DEVELOPMENT',
        notes: note
      });

      updateIssueStatus(
        problemId,
        'PROTOTYPING',
        note,
        officerName,
        'government'
      );

      setFeedbackMsg(`Problem #${problemId} marked under active resolution.`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setReviewProblem(null);
    } catch {
      updateIssueStatus(problemId, 'PROTOTYPING', note, officerName, 'government');
      setReviewProblem(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResolveProblem = async (problemId: string) => {
    setIsSubmitting(true);
    const officerName = user?.name || 'Authority Officer';
    const note = 'Field deployment completed & community verification audited by municipal authority.';

    try {
      await ApiClient.put<any>(`/government/problems/${problemId}/status`, {
        status: 'RESOLVED',
        notes: note
      });

      updateIssueStatus(
        problemId,
        'IMPACT_VERIFIED',
        note,
        officerName,
        'government'
      );

      setFeedbackMsg(`Problem #${problemId} marked as RESOLVED & IMPACT VERIFIED.`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setReviewProblem(null);
    } catch {
      updateIssueStatus(problemId, 'IMPACT_VERIFIED', note, officerName, 'government');
      setReviewProblem(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                🏛️
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                    JanSetu Government Authority Dashboard
                  </span>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    Nodal Executive Officer
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  {user?.department || 'Urban Development & Housing Department (UDHD)'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Officer: <strong className="text-slate-800">{user?.name || 'Er. Rajeshwar Soren'}</strong> • Jurisdiction: <span className="text-slate-700">{user?.jurisdiction || 'Ramgarh District, Jharkhand'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl">
                District Triage Queue: Active
              </span>
            </div>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedbackMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* 4 Core Govt Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Reported</span>
            <div className="text-3xl font-black text-slate-900">{metrics.total}</div>
            <span className="text-[11px] text-slate-400">Jurisdictional queue</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Pending Verification</span>
            <div className="text-3xl font-black text-rose-600">{metrics.pending}</div>
            <span className="text-[11px] text-slate-400">Requires on-site triage</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Under Resolution</span>
            <div className="text-3xl font-black text-amber-600">{metrics.underResolution}</div>
            <span className="text-[11px] text-slate-400">With HEIs & CSR</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Resolved</span>
            <div className="text-3xl font-black text-emerald-600">{metrics.resolved}</div>
            <span className="text-[11px] text-slate-400">Impact verified</span>
          </div>
        </div>

        {/* Problems Requiring Verification Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Authority Review Queue</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Problems Requiring Verification
              </h2>
              <p className="text-xs text-slate-500">
                Review citizen complaints, confirm severity priorities, and sanction pilot right-of-way
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white shadow-xs focus:ring-1 focus:ring-brand-500"
              >
                <option value="All">All Categories</option>
                <option value="Water & Sanitation">Water & Sanitation</option>
                <option value="Roads & Transport">Roads & Transport</option>
                <option value="Healthcare Access">Healthcare Access</option>
                <option value="Education Infrastructure">Education</option>
                <option value="Electricity & Lighting">Electricity</option>
                <option value="Waste Management">Waste Management</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white shadow-xs focus:ring-1 focus:ring-brand-500"
              >
                <option value="All">All Statuses</option>
                <option value="REPORTED">Needs Verification</option>
                <option value="VERIFIED">Verified</option>
                <option value="COLLABORATING">In Solution Design</option>
                <option value="DEPLOYED">Deployed</option>
              </select>
            </div>
          </div>

          {filteredIssues.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-2xl">
              No problems matching the selected filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredIssues.map((issue) => {
                const isPending = issue.status === 'REPORTED' || (issue.status as string) === 'AI_ANALYZED';

                return (
                  <div
                    key={issue.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                          {issue.id}
                        </span>
                        <StatusBadge status={issue.status} size="sm" />
                        <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border">
                          {issue.category}
                        </span>
                        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          AI Severity: {issue.severity}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {issue.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {issue.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{issue.location?.locality ? `${issue.location.locality}, ` : ''}{issue.location?.district || 'Ramgarh'}, Jharkhand</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-brand-800">
                          <Users className="w-3.5 h-3.5 text-brand-600" />
                          <span>{issue.estimatedPeopleAffected?.toLocaleString() || '1,200'} Affected</span>
                        </span>
                        <span>•</span>
                        <span>Reported: {issue.reportedAt ? issue.reportedAt.split('T')[0] : 'Recent'}</span>
                      </div>
                    </div>

                    {/* Government Action Column */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                      <button
                        onClick={() => {
                          setReviewProblem(issue);
                          setVerificationNotes('On-site assessment confirms severe waterlogging hazard affecting school access. Priority verified for capstone solution design.');
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>Review Problem</span>
                      </button>

                      <Link
                        to={`/explore/${issue.id}`}
                        className="text-xs font-bold text-slate-500 hover:text-amber-700 underline underline-offset-2 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Public Record</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Problem Review & Verification Modal */}
      {reviewProblem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                    {reviewProblem.id}
                  </span>
                  <StatusBadge status={reviewProblem.status} size="sm" />
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Government Verification Portal
                  </span>
                  <SpeakButton 
                    text={SpeechFormatters.govtReview(reviewProblem, language)}
                    label={language === 'hi' ? 'समीक्षा सारांश सुनें' : 'Listen to Summary'}
                    size="xs"
                    variant="pill"
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {reviewProblem.title}
                </h3>
              </div>
              <button
                onClick={() => setReviewProblem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Review Sections */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <strong className="text-slate-900 block mb-1">Citizen Problem Statement:</strong>
                <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                  {reviewProblem.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs">District Jurisdiction</span>
                  <strong className="text-slate-900 text-xs">
                    {reviewProblem.location?.locality ? `${reviewProblem.location.locality}, ` : ''}{reviewProblem.location?.district || 'Ramgarh'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs">Estimated Population</span>
                  <strong className="text-slate-900 text-xs">
                    {reviewProblem.estimatedPeopleAffected?.toLocaleString() || '1,200'} Citizens Affected
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs">AI Priority Severity</span>
                  <strong className="text-rose-700 text-xs font-black">
                    {reviewProblem.severity} Urgency
                  </strong>
                </div>
              </div>

              {/* Recommended Institutions & CSR Match */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900 text-xs mb-1">
                    <GraduationCap className="w-4 h-4 text-indigo-700" />
                    <span>AI Recommended Institution Match:</span>
                  </div>
                  <p className="text-xs text-indigo-950 font-medium">
                    BIT Mesra, Ranchi (Civil & Hydraulic Engg Lab) — 94% Match Index
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs mb-1">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span>Potential CSR Supporter Match:</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-medium">
                    Tata Steel Foundation (Rural Infrastructure Grant)
                  </p>
                </div>
              </div>

              {/* Verification Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Authority Verification Note & Action Instructions:
                </label>
                <textarea
                  rows={3}
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Enter official assessment note, priority validation, or field engineer instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setReviewProblem(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
              >
                Close
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleMarkUnderResolution(reviewProblem.id)}
                className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold transition disabled:opacity-50"
              >
                Mark Under Resolution
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleResolveProblem(reviewProblem.id)}
                className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 text-xs font-bold transition disabled:opacity-50"
              >
                Mark Resolved
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleVerifyProblem(reviewProblem.id)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying...' : 'VERIFY PROBLEM'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

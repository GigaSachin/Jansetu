import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIssues } from '../../context/IssuesContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  ChevronLeft, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  FlaskConical,
  Send,
  Wrench
} from 'lucide-react';

export const UniversityWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIssueById, addIssueUpdate, toggleMilestoneStatus, updateIssueStatus } = useIssues();
  const { user } = useAuth();

  const issue = getIssueById(id || 'JS-2026-001245');

  const [activeTab, setActiveTab] = useState<'workspace' | 'prototype' | 'milestones' | 'mentor-chat'>('workspace');
  const [prototypeSummary, setPrototypeSummary] = useState(issue?.solutionSummary || 'Porous concrete blocks made of 60% fly-ash');
  const [updateMsg, setUpdateMsg] = useState('');
  const [submittingPilot, setSubmittingPilot] = useState(false);

  if (!issue) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Project Not Found</h2>
          <Link to="/university/dashboard" className="text-indigo-600 font-bold text-xs">
            Return to University Hub
          </Link>
        </div>
      </div>
    );
  }

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateMsg.trim()) return;

    addIssueUpdate(issue.id, {
      authorName: user?.name || 'Prof. Rajesh Kumar Sinha',
      authorRole: 'university',
      authorOrganization: user?.institution || 'BIT Mesra',
      content: updateMsg.trim(),
      stage: issue.status
    });

    setUpdateMsg('');
  };

  const handleAdvanceStage = () => {
    updateIssueStatus(
      issue.id,
      'PROTOTYPING',
      'University cohort submitted pilot prototype for lab and field stress evaluation.',
      user?.name || 'Prof. Rajesh Kumar Sinha',
      'university'
    );
    setSubmittingPilot(true);
    setTimeout(() => setSubmittingPilot(false), 2000);
  };

  const lifecycleStages = ['Research', 'Prototype', 'Testing', 'Pilot', 'Deployment'];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/university/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" /> Back to University Hub
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Active Project Workspace
            </span>
          </div>
        </div>

        {/* Project Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
                {issue.id}
              </span>
              <StatusBadge status={issue.status} size="md" />
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                {issue.category}
              </span>
            </div>

            <button
              onClick={handleAdvanceStage}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <FlaskConical className="w-4 h-4" />
              <span>{submittingPilot ? 'Advancing Stage...' : 'Submit Prototype for Pilot Testing'}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            {issue.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl mb-6">
            {issue.description}
          </p>

          {/* Academic Lifecycle Bar */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 block mb-2">
              Academic Innovation Lifecycle
            </span>
            <div className="flex items-center justify-between gap-2 text-xs font-bold">
              {lifecycleStages.map((stg, i) => (
                <div key={stg} className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    i <= 2 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={i <= 2 ? 'text-indigo-950 font-bold' : 'text-slate-400'}>{stg}</span>
                  {i < lifecycleStages.length - 1 && <span className="text-slate-300 hidden sm:inline">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex rounded-2xl bg-white border border-slate-200 p-1.5 mb-8 text-xs font-bold max-w-md shadow-xs">
          {[
            { id: 'workspace', label: 'Solution Specs' },
            { id: 'milestones', label: 'Milestones & Tasks' },
            { id: 'mentor-chat', label: 'Updates & Mentor Log' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === 'workspace' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    Proposed Technical Solution & CAD Architecture
                  </h3>
                  <textarea
                    rows={4}
                    value={prototypeSummary}
                    onChange={(e) => setPrototypeSummary(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-slate-200 text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => alert('Updated solution blueprint!')}
                    className="mt-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
                  >
                    Save Technical Specs
                  </button>
                </div>

                {/* AI Cost, Timeline & CSR Grant Estimator */}
                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-black text-indigo-900 uppercase tracking-wider">
                        AI Capstone Cost & CSR Grant Feasibility Estimator
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200">
                      Automated Feasibility
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                      <span className="text-slate-500 text-[11px] block">Estimated Prototype Budget</span>
                      <strong className="text-slate-900 text-sm">₹1,25,000</strong>
                      <span className="text-[10px] text-emerald-600 block mt-0.5">Lab material + Pavers</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                      <span className="text-slate-500 text-[11px] block">CSR Grant Readiness</span>
                      <strong className="text-emerald-700 text-sm">₹2,00,000</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Tata Steel CSR aligned</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                      <span className="text-slate-500 text-[11px] block">Deployment Timeline</span>
                      <strong className="text-indigo-700 text-sm">6-8 Weeks</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Academic Semester Cohort</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                      <span className="text-slate-500 text-[11px] block">Carbon & Silt Reduction</span>
                      <strong className="text-amber-700 text-sm">3.8 Tons CO₂</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">60% Recycled fly-ash</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Lab Test Parameters & Results
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      ✓ Lab Passed
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block">Compressive Strength:</span>
                      <strong className="text-slate-900 text-sm">24.2 MPa (Target 20 MPa)</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block">Percolation Rate:</span>
                      <strong className="text-slate-900 text-sm">180 mm/hr flow</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
                <h3 className="text-lg font-black text-slate-900 mb-4">Milestone Tracker</h3>
                <div className="space-y-3">
                  {issue.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestoneStatus(issue.id, m.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        m.status === 'COMPLETED' ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                        m.status === 'COMPLETED' ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                      }`}>
                        {m.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mentor-chat' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
                <h3 className="text-lg font-black text-slate-900 mb-4">Mentor Updates & Log</h3>
                
                <form onSubmit={handlePostUpdate} className="mb-6">
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={updateMsg}
                      onChange={(e) => setUpdateMsg(e.target.value)}
                      placeholder="Post a technical lab log or request mentor tooling feedback..."
                      className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Log</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  {issue.updates?.map(upd => (
                    <div key={upd.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>{upd.authorName} ({upd.authorOrganization})</span>
                        <span className="text-[10px] text-slate-400">{new Date(upd.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-700">{upd.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Area: Multi-Stakeholder Liaison Team */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Collaborative Taskforce
              </h4>

              {/* Faculty Mentor */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 mb-3">
                <div className="flex items-center gap-2.5 text-xs">
                  <GraduationCap className="w-4 h-4 text-indigo-700" />
                  <div>
                    <span className="font-bold text-indigo-950 block">Faculty Lead</span>
                    <span className="text-slate-700">{issue.matchedTeam?.leaderName || 'Prof. Ananya Tripathy'}</span>
                  </div>
                </div>
              </div>

              {/* Industry Partner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 mb-3">
                <div className="flex items-center gap-2.5 text-xs">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <div>
                    <span className="font-bold text-emerald-950 block">CSR Sponsor</span>
                    <span className="text-slate-700">{issue.industryPartner?.name || 'Tata Steel CSR'}</span>
                    <span className="text-[11px] text-emerald-800 block">{issue.industryPartner?.commitment}</span>
                  </div>
                </div>
              </div>

              {/* Govt Officer */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <div>
                    <span className="font-bold text-amber-950 block">Municipal Contact</span>
                    <span className="text-slate-700">{issue.govtAuthority?.officerName || 'Er. Rajeshwar Soren (PWD)'}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

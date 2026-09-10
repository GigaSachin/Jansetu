import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIssues } from '../../context/IssuesContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { IssueJourneyTimeline } from '../../components/citizen/IssueJourneyTimeline';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AiTriageDossier } from '../../components/ai/AiTriageDossier';
import { SpeakButton } from '../../components/accessibility/SpeakButton';
import { SpeechFormatters } from '../../utils/speechFormatters';
import { aiEngineService, TriageResultResponse } from '../../services/aiEngineService';
import { 
  ChevronLeft, 
  MapPin, 
  ThumbsUp, 
  Share2, 
  Send, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  Calendar,
  Users,
  Building2,
  Printer,
  Download,
  MessageCircle
} from 'lucide-react';

export const CitizenIssueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIssueById, toggleUpvote, addIssueUpdate, toggleMilestoneStatus } = useIssues();
  const { user, role } = useAuth();
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [aiTriage, setAiTriage] = useState<TriageResultResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [engineHealth, setEngineHealth] = useState<{ isOnline: boolean; status: string }>({
    isOnline: true,
    status: 'READY'
  });

  const issue = getIssueById(id || 'JS-2026-001245');

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
    const res = await aiEngineService.analyzeProblem({
      problemId: issue.id,
      text: `${issue.title}. ${issue.description}`,
      district: issue.location.district,
      latitude: issue.location.coordinates?.lat,
      longitude: issue.location.coordinates?.lng
    });
    setAiTriage(res);
    setIsAnalyzing(false);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    if (!issue) return;
    const shareUrl = window.location.href;
    const text = 
      `🚨 *JanSetu Civic Escalation Alert*\n\n` +
      `📋 *Issue ID:* ${issue.id}\n` +
      `📍 *Location:* ${issue.location.locality}, ${issue.location.city}, ${issue.location.district} (Jharkhand)\n` +
      `🏷️ *Category:* ${issue.category} | *Severity:* ${issue.severity}\n` +
      `📌 *Title:* ${issue.title}\n` +
      `🤖 *AI Match:* ${aiTriage?.institutionMatches?.[0]?.name || 'Jharkhand HEI Consortium'}\n\n` +
      `🔗 *Track live civic resolution:* ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!issue) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Problem Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">The requested issue ID could not be located in the open registry.</p>
          <Link to="/explore" className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
            Explore All Problems
          </Link>
        </div>
      </div>
    );
  }

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addIssueUpdate(issue.id, {
      authorName: user?.name || 'Citizen Community Member',
      authorRole: role || 'citizen',
      authorOrganization: user?.organizationName || user?.institution || 'JanSetu Citizen Network',
      content: commentText.trim(),
      stage: issue.status
    });

    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/citizen/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
              title="Escalate via WhatsApp to MLA or Ward Commissioner"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isHindi ? 'व्हाट्सएप शेयर' : 'WhatsApp Share'}</span>
            </button>
            <button
              onClick={handlePrintDossier}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition"
              title="Download/Print formatted Official Grievance Dossier PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>{isHindi ? 'पीडीएफ डॉसियर' : 'Print / PDF Dossier'}</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
            <button
              onClick={() => toggleUpvote(issue.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition ${
                issue.hasUpvoted
                  ? 'bg-brand-50 text-brand-700 border border-brand-200'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-brand-600' : ''}`} />
              <span>{issue.upvotesCount} Upvotes</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ISSUE HEADER CARD */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              {issue.id}
            </span>
            <StatusBadge status={issue.status} size="md" />
            <span className="text-xs font-bold text-brand-700 px-2.5 py-0.5 rounded-md bg-brand-50 border border-brand-200">
              {issue.category}
            </span>
            <span className="text-xs font-bold text-rose-700 px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200">
              Severity: {issue.severity}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {issue.title}
            </h1>
            <SpeakButton
              text={SpeechFormatters.problemDetails(issue, isHindi ? 'hi' : 'en')}
              label={isHindi ? 'समस्या सुनें' : 'Listen to Problem'}
              showLangSwitch={true}
              size="sm"
              variant="outline"
              ariaLabel={isHindi ? 'दर्ज समस्या विवरण सुनें' : 'Listen to submitted problem description'}
            />
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl mb-6">
            {issue.description}
          </p>

          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" />
              <div>
                <span className="text-slate-400 block">Location</span>
                <span className="font-bold text-slate-800">{issue.location.locality}, {issue.location.city}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-slate-400 block">Community Impact</span>
                <span className="font-bold text-slate-800">{issue.estimatedPeopleAffected.toLocaleString()} People Affected</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="text-slate-400 block">Reported Date</span>
                <span className="font-bold text-slate-800">
                  {new Date(issue.reportedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis, Why This Match, Similar Problems & Recommended Next Action */}
        <div className="mb-8">
          <AiTriageDossier
            issue={issue}
            aiTriage={aiTriage}
            isLoading={isAnalyzing}
            isOnline={engineHealth.isOnline}
            onReanalyze={handleReanalyze}
          />
        </div>

        {/* ============================================================ */}
        {/* TWO COLUMN WORKSPACE: JOURNEY TIMELINE + STAKEHOLDERS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 7-Stage Signature Timeline */}
          <div className="lg:col-span-8 space-y-8">
            <IssueJourneyTimeline issue={issue} />

            {/* Milestones Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Project Milestones & Deliverables
                  </h3>
                  <p className="text-xs text-slate-500">Track task completion between student innovators and municipal engineers</p>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {issue.milestones.filter(m => m.status === 'COMPLETED').length} / {issue.milestones.length} Done
                </span>
              </div>

              <div className="space-y-3">
                {issue.milestones.map((m) => {
                  const isDone = m.status === 'COMPLETED';
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestoneStatus(issue.id, m.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isDone ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                        isDone ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white'
                      }`}>
                        {isDone && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                            {m.title}
                          </h4>
                          {m.assignedTo && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                              {m.assignedTo}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {m.description}
                        </p>
                        {m.completedAt && (
                          <span className="text-[10px] font-bold text-emerald-700 mt-1 block">
                            ✓ Completed on {m.completedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Updates & Discussion Stream */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
              <h3 className="text-lg font-black text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Live Resolution Updates ({issue.updates?.length || 0})
              </h3>

              {/* Post an update form */}
              <form onSubmit={handlePostUpdate} className="mb-6">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Post a field observation or technical update as ${user?.name || 'Citizen'}...`}
                    className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Update</span>
                  </button>
                </div>
              </form>

              {/* Activity Timeline Feed */}
              <div className="space-y-4">
                {issue.updates?.map((upd) => (
                  <div key={upd.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{upd.authorName}</span>
                        {upd.authorOrganization && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border text-slate-600">
                            {upd.authorOrganization}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(upd.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {upd.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Stakeholders & Attached Media */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Government Authority Card */}
            {issue.govtAuthority && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      Enabling Authority
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{issue.govtAuthority.department}</h4>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div><strong>Nodal Officer:</strong> {issue.govtAuthority.officerName}</div>
                  <div><strong>Status Note:</strong> {issue.govtAuthority.statusNote}</div>
                </div>
              </div>
            )}

            {/* University Innovation Hub Card */}
            {issue.matchedTeam && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                      Academic Lab Partner
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{issue.matchedTeam.institutionName}</h4>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                  <div><strong>Cohort:</strong> {issue.matchedTeam.teamName}</div>
                  <div><strong>Lead:</strong> {issue.matchedTeam.leaderName}</div>
                  <div><strong>Team:</strong> {issue.matchedTeam.membersCount} Scholars</div>
                </div>
              </div>
            )}

            {/* Industry & CSR Card */}
            {issue.industryPartner && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      CSR & Grant Partner
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{issue.industryPartner.name}</h4>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                  <div><strong>Support:</strong> {issue.industryPartner.supportType}</div>
                  <div><strong>Commitment:</strong> {issue.industryPartner.commitment}</div>
                </div>
              </div>
            )}

            {/* Evidence & Ground Photos */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Ground Evidence Files ({issue.evidence?.length || 0})
              </h4>
              <div className="space-y-3">
                {issue.evidence?.map((ev) => (
                  <div key={ev.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                    {ev.type === 'image' && (
                      <img src={ev.url} alt={ev.name} className="w-full h-36 object-cover" />
                    )}
                    <div className="p-3 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 truncate">{ev.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {(ev.size / (1024 * 1024)).toFixed(1)}MB
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

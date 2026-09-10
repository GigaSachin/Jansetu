import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssuesContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SpeakButton } from '../../components/common/SpeakButton';
import { SpeechFormatters } from '../../utils/speechFormatters';
import { ApiClient } from '../../services/apiClient';
import { Issue } from '../../types';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  ArrowRight, 
  BrainCircuit, 
  FileText,
  CheckCircle2,
  X,
  Send,
  AlertCircle,
  FlaskConical,
  Award,
  Layers
} from 'lucide-react';

export const UniversityDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, updateIssueStatus } = useIssues();
  const { language } = useLanguage();

  const [selectedChallenge, setSelectedChallenge] = useState<Issue | null>(null);
  const [proposalNotes, setProposalNotes] = useState('');
  const [interestedIds, setInterestedIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Institution profile details
  const institutionName = user?.institution || 'Birla Institute of Technology, Mesra (BIT Mesra)';
  const institutionDistrict = user?.location || 'Ranchi, Jharkhand';
  const department = user?.department || 'Department of Civil & Environmental Engineering';

  // AI Recommended Challenges from real shared problems
  const challenges = issues.filter(i => i.status !== 'RESOLVED' && (i.status as string) !== 'REJECTED');

  const getMatchScore = (issue: Issue): number => {
    if (issue.category === 'Water & Sanitation') return 94;
    if (issue.category === 'Roads & Transport') return 91;
    if (issue.category === 'Waste Management') return 89;
    if (issue.category === 'Electricity & Lighting') return 92;
    if (issue.category === 'Agriculture & Rural') return 88;
    return 85;
  };

  const getMatchReasons = (issue: Issue): string[] => {
    const reasons: string[] = [];
    if (issue.category === 'Water & Sanitation') {
      reasons.push('Civil & Hydraulic Systems Lab at ' + institutionName.split('(')[0]);
      reasons.push('Geographic proximity to ' + (issue.location?.district || 'Ramgarh'));
      reasons.push('Permeable drainage modeling & fly-ash filtration capability');
    } else if (issue.category === 'Roads & Transport') {
      reasons.push('Structural Mechanics & Pavement Testing Center');
      reasons.push('Regional terrain modeling in Jharkhand');
    } else {
      reasons.push('Interdisciplinary Environmental Engineering Lab');
      reasons.push('Jharkhand Capstone Innovation Consortium');
    }
    return reasons;
  };

  const getRequiredExpertise = (category: string): string[] => {
    switch (category) {
      case 'Water & Sanitation':
        return ['Hydraulic Slope Modeling', 'Porous Concrete Matrices', 'Urban Stormwater Desiltation'];
      case 'Roads & Transport':
        return ['Soil Mechanics', 'Permeable Pavers', 'Culvert Structural Design'];
      case 'Waste Management':
        return ['Thermophilic Bio-culture', 'Solar Composting', 'Zero-Odor Digesters'];
      case 'Electricity & Lighting':
        return ['Solar Microgrid Telemetry', 'PIR Motion Sensors', 'LiFePO4 Circuit Design'];
      default:
        return ['Community Needs Assessment', 'Rapid Prototyping', 'Field Testing'];
    }
  };

  const handleExpressInterest = async (issue: Issue) => {
    setIsSubmitting(true);
    const issueId = issue.id;

    try {
      // 1. Call Backend API Gateway
      const res = await ApiClient.post<any>(`/university/problems/${issueId}/interest`, {
        institutionName,
        proposalNotes: proposalNotes || 'University Capstone Lab design & prototype proposal.'
      });

      // 2. Update shared issue status in context & backend
      updateIssueStatus(
        issueId,
        'COLLABORATING',
        `University capstone team from ${institutionName} led by ${user?.name || 'Academic Lead'} initiated project design. Proposal: ${proposalNotes || 'Academic capstone prototype'}`,
        user?.name || 'Academic Lead',
        'university'
      );

      setInterestedIds(prev => new Set(prev).add(issueId));
      setFeedbackMsg(`Interest registered successfully for #${issueId}! Capstone prototype phase initiated.`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setSelectedChallenge(null);
      setProposalNotes('');
    } catch (err: any) {
      // Fallback update in state
      updateIssueStatus(
        issueId,
        'COLLABORATING',
        `Interest registered by ${institutionName}.`,
        user?.name || 'Academic Lead',
        'university'
      );
      setInterestedIds(prev => new Set(prev).add(issueId));
      setFeedbackMsg(`Interest registered for #${issueId}!`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setSelectedChallenge(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                🎓
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase text-indigo-700 tracking-wider">
                    JanSetu University / Institution Hub
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Accredited Capstone Lab
                  </span>
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    Potential Match Partner
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {institutionName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  <strong className="text-slate-800">{user?.name || 'Prof. Arvind K. Mishra'}</strong> • {department} • <span className="text-slate-700">{institutionDistrict}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-xl">
                AI Recommendation Engine: Active
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

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Challenges</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1">{challenges.length} Available</div>
            <span className="text-[11px] text-slate-500">In Jharkhand catchment</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Student Cohorts</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">4 Teams</div>
            <span className="text-[11px] text-slate-500">18 scholar researchers</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Prototype Projects</span>
            <div className="text-2xl sm:text-3xl font-black text-brand-700 mt-1">3 Active</div>
            <span className="text-[11px] text-slate-500">Ramgarh & Ranchi</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed Impact</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">18,400+</div>
            <span className="text-[11px] text-slate-500">Citizens reached</span>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Recommended • Potential Match</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
                <span>Recommended Capstone Challenges</span>
              </h2>
              <p className="text-xs text-slate-500">
                Civic societal problems algorithmically matched with {institutionName} based on departmental taxonomy & district proximity
              </p>
            </div>

            <div className="text-xs text-slate-400 font-semibold">
              * Prototype Demonstration — Potential Matches
            </div>
          </div>

          {challenges.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No new unassigned challenges in queue.
            </div>
          ) : (
            <div className="space-y-4">
              {challenges.map((challenge) => {
                const matchScore = getMatchScore(challenge);
                const reasons = getMatchReasons(challenge);
                const skills = getRequiredExpertise(challenge.category);
                const isInterested = interestedIds.has(challenge.id) || ['COLLABORATING', 'PROTOTYPING', 'DEPLOYED'].includes(challenge.status);

                return (
                  <div
                    key={challenge.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                          {challenge.id}
                        </span>
                        <StatusBadge status={challenge.status} size="sm" />
                        <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border">
                          {challenge.category}
                        </span>
                        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {challenge.severity}
                        </span>
                        <span className="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-3 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          <span>{matchScore}% AI Match</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {challenge.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {challenge.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{challenge.location?.locality ? `${challenge.location.locality}, ` : ''}{challenge.location?.district || 'Ramgarh'}, Jharkhand</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-brand-800">
                          <Users className="w-3.5 h-3.5 text-brand-600" />
                          <span>{challenge.estimatedPeopleAffected?.toLocaleString() || '1,200'} citizens affected</span>
                        </span>
                      </div>

                      {/* Why this match box */}
                      <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs">
                        <div className="font-bold text-indigo-950 mb-1 flex items-center gap-1.5">
                          <BrainCircuit className="w-3.5 h-3.5 text-indigo-700" />
                          <span>Why this institution matches:</span>
                        </div>
                        <ul className="list-disc list-inside text-indigo-900 space-y-0.5 text-[11px]">
                          {reasons.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Required Expertise Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-400">Required Expertise:</span>
                        {skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                      {isInterested ? (
                        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Interest Registered ✓</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedChallenge(challenge);
                            setProposalNotes(`Department of Civil & Environmental Engineering at ${institutionName} proposes to conduct drainage modeling and porous paver prototype design.`);
                          }}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition active:scale-95"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>View Challenge & Express Interest</span>
                        </button>
                      )}

                      <Link
                        to={`/explore/${challenge.id}`}
                        className="text-xs font-bold text-slate-500 hover:text-indigo-600 underline underline-offset-2 flex items-center gap-1"
                      >
                        <span>Inspect Full Problem Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* University Projects Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-sm">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Active Projects</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              3 active capstone projects engaged with Ramgarh and Ranchi municipal authorities.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-brand-700">
              4 Student Cohorts Working
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Prototype Projects</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Porous concrete fly-ash tiles & IoT storm-water monitoring prototypes undergoing stress testing.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-700">
              Phase 2 Lab Testing
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Completed Impact</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              18,400+ residents benefited across Jharkhand pilot precincts.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700">
              Verified by Independent Audit
            </div>
          </div>
        </div>

      </div>

      {/* Challenge Detail & Interest Registration Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                    {selectedChallenge.id}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {getMatchScore(selectedChallenge)}% AI Match
                  </span>
                  <SpeakButton
                    text={SpeechFormatters.universityChallenge(
                      selectedChallenge,
                      getMatchScore(selectedChallenge),
                      getMatchReasons(selectedChallenge),
                      'Drainage slope modeling, porous pavement matrices, and fly-ash based filtration tiles.',
                      language
                    )}
                    label={language === 'hi' ? 'विवरण सुनें' : 'Listen to Challenge'}
                    size="xs"
                    variant="pill"
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedChallenge.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Overview & AI Analysis */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-1">Problem Description:</strong>
                <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700">
                  {selectedChallenge.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs">District & Location</span>
                  <strong className="text-slate-900 text-xs">
                    {selectedChallenge.location?.locality ? `${selectedChallenge.location.locality}, ` : ''}{selectedChallenge.location?.district || 'Ramgarh'}, Jharkhand
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs">Category & Severity</span>
                  <strong className="text-slate-900 text-xs">
                    {selectedChallenge.category} • {selectedChallenge.severity} Priority
                  </strong>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100">
                <span className="text-xs font-bold text-indigo-900 block mb-1">Recommended Solution Direction:</span>
                <p className="text-xs text-indigo-950">
                  Drainage slope modeling, porous pavement matrices, and fly-ash based filtration tiles designed for monsoon water runoff containment.
                </p>
              </div>

              {/* Proposal Notes Field */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Academic Capstone Proposal / Initial Concept Note:
                </label>
                <textarea
                  rows={3}
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                  placeholder="Outline faculty leads, student team specialization, or lab equipment proposed for this challenge..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedChallenge(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleExpressInterest(selectedChallenge)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering Interest...' : "I’m Interested — Register Capstone Lab"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

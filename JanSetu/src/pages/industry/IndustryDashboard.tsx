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
  Building2, 
  Sparkles, 
  MapPin, 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  HeartHandshake,
  X,
  Eye,
  Send
} from 'lucide-react';

export const IndustryDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, addIssueUpdate } = useIssues();
  const { language } = useLanguage();

  const [selectedFocus, setSelectedFocus] = useState('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Issue | null>(null);
  const [supportType, setSupportType] = useState<'Funding' | 'Materials' | 'Mentorship' | 'Equipment'>('Funding');
  const [commitmentNote, setCommitmentNote] = useState('₹4,50,000 CSR Capstone Grant pledged for permeable paver fabrication and field instrumentation.');
  const [supportedIds, setSupportedIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const companyName = user?.organizationName || 'Tata Steel CSR & Sustainability Foundation';
  const partnerLead = user?.name || 'Sunil Sen (CSR Lead)';
  const focusAreas = ['All', 'Water & Sanitation', 'Roads & Transport', 'Waste Management', 'Electricity & Lighting', 'Agriculture & Rural'];

  const opportunities = issues.filter(issue => {
    const matchCat = selectedFocus === 'All' || issue.category === selectedFocus;
    return matchCat && issue.status !== 'RESOLVED' && (issue.status as string) !== 'REJECTED';
  });

  const getInstitutionMatchName = (category: string): string => {
    switch (category) {
      case 'Water & Sanitation': return 'BIT Mesra (Civil & Hydrology Lab)';
      case 'Roads & Transport': return 'NIT Jamshedpur (Structural Engg)';
      case 'Waste Management': return 'Birsa Agricultural University (Bio-Tech)';
      case 'Electricity & Lighting': return 'IIIT Ranchi (IoT Smart Sensors)';
      default: return 'Jharkhand HEI Consortium';
    }
  };

  const getPotentialSupportReq = (category: string): string => {
    switch (category) {
      case 'Water & Sanitation': return 'Permeable Concrete Materials, Civil Equipment & ₹4.5 Lakhs Grant';
      case 'Roads & Transport': return 'Soil Stabilization Polymers & Earthmoving Logistics';
      case 'Waste Management': return 'Solar Aerobic Composter Kits & Enzyme Culture';
      case 'Electricity & Lighting': return 'Solar PV Panels, LiFePO4 Battery Banks & PIR Telemetry';
      default: return 'CSR Technical Mentorship & Seed Capital';
    }
  };

  const handleSupportProblem = async (issue: Issue) => {
    setIsSubmitting(true);
    const problemId = issue.id;

    try {
      await ApiClient.post<any>(`/csr/problems/${problemId}/interest`, {
        companyName,
        supportType,
        commitmentAmountOrNote: commitmentNote
      });

      addIssueUpdate(problemId, {
        authorName: companyName,
        authorRole: 'industry',
        authorOrganization: companyName,
        content: `Industry Partner "${companyName}" pledged ${supportType} support. Details: ${commitmentNote}`,
        stage: issue.status
      });

      setSupportedIds(prev => new Set(prev).add(problemId));
      setFeedbackMsg(`CSR Support Interest successfully pledged for #${problemId}! Citizen and university partners notified.`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setSelectedOpportunity(null);
    } catch {
      addIssueUpdate(problemId, {
        authorName: companyName,
        authorRole: 'industry',
        authorOrganization: companyName,
        content: `Industry Partner "${companyName}" pledged ${supportType} support.`,
        stage: issue.status
      });
      setSupportedIds(prev => new Set(prev).add(problemId));
      setFeedbackMsg(`CSR Support Interest registered for #${problemId}!`);
      setTimeout(() => setFeedbackMsg(null), 5000);
      setSelectedOpportunity(null);
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
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                🏢
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                    JanSetu Industry & CSR Impact Hub
                  </span>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Corporate ESG Partner
                  </span>
                  <span className="text-[10px] font-bold text-teal-900 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-200">
                    Potential CSR Supporter
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  {companyName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Partner Lead: <strong className="text-slate-800">{partnerLead}</strong> • Focus Catchment: <span className="text-slate-700">East Singhbhum, Ranchi & Ramgarh</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
                CSR Portfolio: Active
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

        {/* CSR Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Impact Opportunities</span>
            <div className="text-3xl font-black text-slate-900">{opportunities.length}</div>
            <span className="text-[11px] text-slate-400">Awaiting sponsorship</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Supported Pilots</span>
            <div className="text-3xl font-black text-emerald-700">5 Active</div>
            <span className="text-[11px] text-slate-400">With HEI laboratories</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Pledged Grants (Demo)</span>
            <div className="text-3xl font-black text-teal-700">₹28.5L</div>
            <span className="text-[11px] text-slate-400">Milestone-linked</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Beneficiaries Reached</span>
            <div className="text-3xl font-black text-purple-700">84,000+</div>
            <span className="text-[11px] text-slate-400">Community audit</span>
          </div>
        </div>

        {/* Impact Opportunities Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Impact Opportunities • Potential CSR Support</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                High-Impact CSR Investment Opportunities
              </h2>
              <p className="text-xs text-slate-500">
                Civic societal problems that will achieve accelerated field deployment with CSR grant or material sponsorship
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
              {focusAreas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedFocus(area)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedFocus === area
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {opportunities.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-2xl">
              No opportunities matching the selected focus area.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {opportunities.map((issue) => {
                const uniMatch = getInstitutionMatchName(issue.category);
                const supportReq = getPotentialSupportReq(issue.category);
                const isSupported = supportedIds.has(issue.id) || !!issue.industryPartner;

                return (
                  <div
                    key={issue.id}
                    className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                            {issue.id}
                          </span>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            {issue.category}
                          </span>
                          <StatusBadge status={issue.status} size="sm" />
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {issue.severity}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            <span>94% AI Match</span>
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        {issue.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {issue.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block text-[11px] font-semibold">Matched University Lab</span>
                          <strong className="text-indigo-950 font-bold flex items-center gap-1 mt-0.5">
                            <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>{uniMatch}</span>
                          </strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block text-[11px] font-semibold">Location Catchment</span>
                          <strong className="text-slate-900 font-bold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{issue.location?.locality ? `${issue.location.locality}, ` : ''}{issue.location?.district || 'Ramgarh'}</span>
                          </strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block text-[11px] font-semibold">Estimated Impact</span>
                          <strong className="text-emerald-700 font-black flex items-center gap-1 mt-0.5">
                            <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{issue.estimatedPeopleAffected?.toLocaleString() || '1,200'} Citizens</span>
                          </strong>
                        </div>
                      </div>

                      {/* Potential support required */}
                      <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs my-2">
                        <span className="font-bold text-emerald-950 block mb-0.5">Potential Support Required:</span>
                        <p className="text-emerald-900">{supportReq}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-xs text-slate-400 italic">
                        * Prototype Opportunity — Potential CSR Support
                      </span>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/explore/${issue.id}`}
                          className="text-xs font-bold text-slate-600 hover:text-emerald-700 underline flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Problem</span>
                        </Link>

                        {isSupported ? (
                          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Support Pledged ✓</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedOpportunity(issue)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
                          >
                            <HeartHandshake className="w-4 h-4" />
                            <span>Support This Problem</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Support Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {selectedOpportunity.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Potential CSR Support
                  </span>
                  <SpeakButton
                    text={SpeechFormatters.csrOpportunity(
                      selectedOpportunity,
                      getInstitutionMatchName(selectedOpportunity.category),
                      getPotentialSupportReq(selectedOpportunity.category),
                      language
                    )}
                    label={language === 'hi' ? 'अवसर विवरण सुनें' : 'Listen to Opportunity'}
                    size="xs"
                    variant="pill"
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedOpportunity.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <strong className="text-slate-900 block mb-1">Problem & Context:</strong>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                  {selectedOpportunity.description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Select CSR Support Pillar:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Funding', 'Materials', 'Mentorship', 'Equipment'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSupportType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                        supportType === type
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Pledged Support Details / Grant Note:
                </label>
                <textarea
                  rows={3}
                  value={commitmentNote}
                  onChange={(e) => setCommitmentNote(e.target.value)}
                  placeholder="e.g. ₹4,50,000 grant for permeable drainage tiles and faculty testing equipment..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <strong>Demo Note:</strong> Pledging registers support intent in the prototype problem journey. No real financial transaction will occur.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSupportProblem(selectedOpportunity)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering...' : 'Pledge CSR Support'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

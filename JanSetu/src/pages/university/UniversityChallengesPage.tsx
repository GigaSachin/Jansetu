import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '../../context/IssuesContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  GraduationCap, 
  Sparkles, 
  Search, 
  MapPin, 
  Users, 
  ArrowRight, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronLeft 
} from 'lucide-react';

export const UniversityChallengesPage: React.FC = () => {
  const { issues } = useIssues();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const deptCategories = [
    'All',
    'Water Resource & Hydrology',
    'Civil & Infrastructure',
    'Biotechnology & Waste',
    'Sensors, IoT & Electrical',
    'Ergonomics & Biomedical'
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/university/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Back to University Hub
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AI Match Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Regional Challenges for Student Capstones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified municipal problems open for academic proposals, faculty grants, and student thesis cohorts.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search challenges by engineering domain, city or problem..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            {deptCategories.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-slate-400">{issue.id}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    {issue.matchedTeam?.matchScore || 92}% AI Match
                  </span>
                </div>

                <div className="text-[11px] font-bold text-brand-700 uppercase tracking-wider mb-1">
                  {issue.category}
                </div>

                <Link
                  to={`/university/projects/${issue.id}`}
                  className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-700 transition block mb-2"
                >
                  {issue.title}
                </Link>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {issue.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 mb-4">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{issue.location.locality}, {issue.location.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>{issue.estimatedPeopleAffected.toLocaleString()} potential beneficiaries</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <StatusBadge status={issue.status} size="sm" />
                <Link
                  to={`/university/projects/${issue.id}`}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

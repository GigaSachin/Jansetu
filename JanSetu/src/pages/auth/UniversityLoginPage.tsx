import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_INSTITUTIONS } from '../../data/mockData';
import { Institution } from '../../types';
import { 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Building, 
  Mail, 
  Lock, 
  UserCheck, 
  ChevronLeft 
} from 'lucide-react';

export const UniversityLoginPage: React.FC = () => {
  const { selectedInstitution, setSelectedInstitution, loginAsRole } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'select-institution' | 'login'>(
    selectedInstitution ? 'login' : 'select-institution'
  );
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const [loginForm, setLoginForm] = useState({
    name: 'Prof. Rajesh Kumar Sinha',
    email: 'rksinha.civil@bitmesra.ac.in',
    password: 'univpassword123',
    department: 'Civil & Environmental Engineering',
    academicRole: 'Faculty' as 'Student' | 'Faculty' | 'Researcher' | 'Admin'
  });

  const filteredInstitutions = MOCK_INSTITUTIONS.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'All' || inst.state === selectedState;
    const matchesType = selectedType === 'All' || inst.type === selectedType;
    return matchesSearch && matchesState && matchesType;
  });

  const handleSelectInstitution = (inst: Institution) => {
    setSelectedInstitution(inst);
    setStep('login');
  };

  const handleUniversityLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('university', {
      name: loginForm.name,
      email: loginForm.email,
      institution: selectedInstitution?.name || 'Birla Institute of Technology, Mesra (BIT Mesra)',
      department: loginForm.department,
      academicRole: loginForm.academicRole,
      location: `${selectedInstitution?.city || 'Ranchi'}, ${selectedInstitution?.state || 'Jharkhand'}`
    });
    navigate('/university/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        {step === 'select-institution' ? (
          /* STEP 1: FIND YOUR INSTITUTION */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10">
            
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200">
                <GraduationCap className="w-4 h-4" />
                <span>Academic & Innovation Network • Jharkhand</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Find your institution
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Select your Jharkhand university, IIT, NIT or engineering college to access live community challenges and lab grants.
              </p>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by university name, short code or city (e.g. BIT Mesra, Dhanbad, Ranchi)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white"
              >
                <option value="All">All Regions</option>
                <option value="Jharkhand">Jharkhand (Default)</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white"
              >
                <option value="All">All Types</option>
                <option value="IIT">IITs</option>
                <option value="NIT">NITs</option>
                <option value="State University">State Universities</option>
                <option value="Autonomous Institute">Autonomous Institutes</option>
              </select>
            </div>

            {/* Institutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInstitutions.map((inst) => (
                <div
                  key={inst.id}
                  onClick={() => handleSelectInstitution(inst)}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 shadow-xs hover:shadow-card transition-all cursor-pointer flex items-start gap-4 group"
                >
                  <div className="text-3xl p-2 rounded-xl bg-slate-100 group-hover:bg-white shrink-0 shadow-xs">
                    {inst.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-700 transition truncate">
                        {inst.shortName}
                      </h3>
                      {inst.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
                          <ShieldCheck className="w-3 h-3 text-indigo-600" />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                      {inst.name}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {inst.city}, {inst.state}
                      </span>
                      <span className="font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* STEP 2: UNIVERSITY LOGIN FOR SELECTED INSTITUTION */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Institution Profile Badge */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-8 text-white flex flex-col justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('select-institution')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-white mb-6"
                >
                  <ChevronLeft className="w-4 h-4" /> Change Institution
                </button>

                <div className="text-4xl mb-3">{selectedInstitution?.logo}</div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 mb-2">
                  <ShieldCheck className="w-3 h-3" /> Verified Institute Member
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedInstitution?.name}
                </h2>
                <p className="text-xs text-indigo-200 mt-1">
                  {selectedInstitution?.city}, {selectedInstitution?.state}
                </p>

                <div className="mt-6 pt-6 border-t border-indigo-800/80 space-y-2 text-xs text-indigo-200">
                  <div className="flex justify-between">
                    <span>Active Challenge Teams:</span>
                    <span className="font-bold text-white">{selectedInstitution?.activeProjectsCount} Cohorts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Solutions Deployed:</span>
                    <span className="font-bold text-emerald-400">{selectedInstitution?.solvedCount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-[11px] text-indigo-300/80">
                Connected with Central Academic Problem-Solving Protocol.
              </div>
            </div>

            {/* Right Credentials Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Institutional Login
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Log in to access your capstone proposals and AI matching hub.
                </p>
              </div>

              <form onSubmit={handleUniversityLogin} className="space-y-4">
                
                {/* Account Type Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Account Role
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
                    {(['Faculty', 'Student', 'Researcher', 'Admin'] as const).map((accRole) => (
                      <button
                        key={accRole}
                        type="button"
                        onClick={() => setLoginForm({ ...loginForm, academicRole: accRole })}
                        className={`py-1.5 rounded-lg transition ${
                          loginForm.academicRole === accRole
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {accRole}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="scholar@vssut.ac.in"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department / Lab</label>
                  <input
                    type="text"
                    required
                    value={loginForm.department}
                    onChange={(e) => setLoginForm({ ...loginForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition active:scale-95"
                >
                  <span>Enter University Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

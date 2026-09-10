import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Shield, 
  Mail, 
  Lock, 
  Building, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export const GovernmentLoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Er. Rajeshwar Soren',
    email: 'r.soren.pwd@jharkhand.gov.in',
    password: 'govpassword',
    department: 'Urban Development & Housing Department (UDHD)',
    designation: 'Executive Engineer, Urban Infrastructure',
    jurisdiction: 'Ramgarh & Hazaribagh District, Jharkhand'
  });

  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('government', {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      governmentDesignation: formData.designation,
      jurisdiction: formData.jurisdiction,
      location: formData.jurisdiction
    });
    navigate('/government/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-100/60 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Formal Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-navy-950 to-slate-950 p-8 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Institutional Government Portal</span>
              </div>

              <h2 className="text-2xl font-bold text-white leading-tight">
                JanSetu Administrative Authority Access
              </h2>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Empowering district collectors, municipal engineers, and department heads to verify on-ground challenges, allocate university cohorts, and approve civic pilot deployments.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                  Government accounts require institutional email verification (*.gov.in / *.nic.in) or district nodal credentials.
                </span>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Government Officer Login
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Access jurisdictional issue queue and municipal resolution pipeline.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Email / Gov ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="officer@state.gov.in"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Directorate
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Urban Development / PWD"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Region / Jurisdiction State
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                    placeholder="e.g. Ramgarh District, Jharkhand"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-95"
              >
                <span>Authenticate Government Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-500">
                Need to onboard a new municipal body? <a href="#nodal" className="font-bold text-brand-700 underline">Request Nodal Setup</a>
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

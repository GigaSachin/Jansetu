import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Mail, 
  Lock, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Plus
} from 'lucide-react';

export const IndustryLoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Siddharth Sengupta',
    email: 'siddharth.s@tatasteelcsr.com',
    password: 'industrypassword123',
    organizationName: 'Tata Steel CSR & Sustainability Foundation',
    industrySector: 'Heavy Infrastructure & Materials',
    csrFocusAreas: ['Rural Infrastructure', 'Clean Water & Sanitation', 'STEM Education']
  });

  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('industry', {
      name: formData.name,
      email: formData.email,
      organizationName: formData.organizationName,
      industrySector: formData.industrySector,
      csrFocusAreas: formData.csrFocusAreas,
      location: 'Jamshedpur & Ramgarh'
    });
    navigate('/industry/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Corporate Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 p-8 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold mb-6">
                <Building2 className="w-3.5 h-3.5" />
                <span>Industry & CSR Impact Hub</span>
              </div>

              <h2 className="text-2xl font-black text-white leading-tight">
                Direct Corporate Impact with Transparent ROI
              </h2>

              <p className="mt-3 text-sm text-emerald-100 leading-relaxed">
                Fund verified student prototypes, sponsor technical equipment, and fulfill mandatory CSR requirements with audited open community impact.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-800/80 space-y-2 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Real-time milestone-based grant tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ministry compliance & ESG audit reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct co-branding on physical deployments</span>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-900">
                {isRegistering ? 'Register CSR / Corporate Partner' : 'Industry Partner Login'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRegistering
                  ? 'Connect your CSR mandate with high-impact community projects.'
                  : 'Enter work credentials to access your sponsored projects.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {isRegistering && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Foundation Name</label>
                    <input
                      type="text"
                      required
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      placeholder="e.g. Tata Steel Foundation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
                    <input
                      type="text"
                      required
                      value={formData.industrySector}
                      onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                      placeholder="e.g. Manufacturing / Technology / Energy"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="partner@enterprise.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-xs sm:text-sm"
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
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition active:scale-95"
              >
                <span>{isRegistering ? 'Register Organization' : 'Access Impact Hub'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                {isRegistering ? 'Already registered?' : 'New CSR sponsor?'}
              </span>
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-bold text-emerald-700 hover:text-emerald-800 underline"
              >
                {isRegistering ? 'Sign In' : 'Register Organization'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

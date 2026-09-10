import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CitizenLoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const [formData, setFormData] = useState({
    name: 'Pooja Verma',
    phone: '9876543210',
    email: 'pooja.verma@example.in',
    location: 'Ramgarh, Jharkhand',
    password: 'password123'
  });

  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('citizen', {
      name: formData.name,
      email: formData.email,
      phone: `+91 ${formData.phone}`,
      location: formData.location
    });
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Warm Graphic Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 p-8 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-bold mb-6">
                <Users className="w-3.5 h-3.5" />
                <span>Citizen Portal</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                "Your voice can start a real solution."
              </h2>

              <p className="mt-3 text-sm text-brand-100 leading-relaxed">
                Connect directly with engineering universities, civic authorities, and CSR sponsors who want to fix problems in your neighborhood.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 space-y-2.5 text-xs text-brand-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No complex government paperwork</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>SMS updates on problem progress</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% free and open for every citizen</span>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-900">
                {isRegistering ? 'Create Citizen Account' : 'Welcome to JanSetu'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRegistering
                  ? 'Join as a verified citizen to report and follow local issues.'
                  : 'Enter your credentials to continue to your dashboard.'}
              </p>
            </div>

            {/* Auth Method Switcher (OTP vs Password) */}
            {!isRegistering && (
              <div className="flex rounded-xl bg-slate-100 p-1 mb-6 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('otp'); setOtpSent(false); }}
                  className={`flex-1 py-2 rounded-lg transition ${
                    authMethod === 'otp' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Quick Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`flex-1 py-2 rounded-lg transition ${
                    authMethod === 'password' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Email + Password
                </button>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {isRegistering && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Pooja Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              )}

              {authMethod === 'otp' && !isRegistering ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm font-bold text-slate-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono"
                    />
                  </div>
                  
                  {otpSent ? (
                    <div className="mt-3">
                      <label className="block text-xs font-bold text-emerald-700 mb-1">Enter 6-Digit OTP (Mock: 123456)</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-mono tracking-widest text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setOtpSent(true); setOtp('123456'); }}
                      className="mt-2 text-xs font-bold text-brand-700 hover:text-brand-800"
                    >
                      Send OTP via SMS →
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="citizen@example.in"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
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
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {isRegistering && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location / District</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Ramgarh, Jharkhand"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 text-white font-bold text-sm shadow-md transition active:scale-95"
              >
                <span>{isRegistering ? 'Register & Continue' : 'Sign In as Citizen'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Signin / Register */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-bold text-brand-700 hover:text-brand-800 underline"
              >
                {isRegistering ? 'Sign In' : 'Register as Citizen'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

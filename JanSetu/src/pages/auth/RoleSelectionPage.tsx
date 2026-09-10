import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      tagline: 'Report problems and follow their journey.',
      path: '/login/citizen',
      demoPath: '/citizen/dashboard',
      icon: Users,
      color: 'from-sky-500 to-brand-600',
      badge: 'Human & Simple',
      features: ['2-minute GPS photo reporting', 'Live timeline updates', 'Community upvoting']
    },
    {
      id: 'government',
      title: 'Government Authority',
      tagline: 'Verify, coordinate and enable solutions.',
      path: '/login/government',
      demoPath: '/government/dashboard',
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-600',
      badge: 'Structured & Operational',
      features: ['District-wide issue triage', 'Approve academic pilots', 'Verify completed impact']
    },
    {
      id: 'university',
      title: 'University / Institution',
      tagline: 'Turn real-world challenges into projects and solutions.',
      path: '/login/university',
      demoPath: '/university/dashboard',
      icon: GraduationCap,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Innovative & Collaborative',
      features: ['94% AI skill matching', 'Capstones & research grants', 'Industry co-mentorship']
    },
    {
      id: 'industry',
      title: 'Industry / CSR Partner',
      tagline: 'Bring expertise, technology, mentorship and resources.',
      path: '/login/industry',
      demoPath: '/industry/dashboard',
      icon: Building2,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Professional & Impact-Focused',
      features: ['Transparent ESG funding', 'Direct technology sponsorship', 'Measurable community ROI']
    }
  ];

  const handleInstantDemo = (roleId: any, demoPath: string) => {
    switchRole(roleId);
    navigate(demoPath);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Your Perspective</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How do you want to be part of <span className="gradient-text">JanSetu?</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Choose your stakeholder role to access tailored dashboards, workflows, and collaboration tools.
          </p>
        </div>

        {/* 4 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {r.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {r.tagline}
                  </p>

                  {/* Features List */}
                  <div className="mt-5 space-y-2">
                    {r.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleInstantDemo(r.id, r.demoPath)}
                    className="text-xs font-bold text-brand-700 hover:text-brand-800 underline underline-offset-2"
                  >
                    Instant Demo View
                  </button>

                  <Link
                    to={r.path}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 group-hover:bg-brand-600 text-white text-xs sm:text-sm font-bold shadow-sm transition"
                  >
                    <span>Continue as {r.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Return to JanSetu Home
          </Link>
        </div>

      </div>
    </div>
  );
};

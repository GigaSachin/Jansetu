import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { ShieldAlert, ArrowRight, RefreshCw } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { role, isAuthenticated, switchRole } = useAuth();

  if (!isAuthenticated || !role) {
    // Redirect to role selection if not authenticated
    return <Navigate to="/roles" replace />;
  }

  if (!allowedRoles.includes(role)) {
    const roleDashboardMap: Record<Role, string> = {
      citizen: '/citizen/dashboard',
      government: '/government/dashboard',
      university: '/university/dashboard',
      industry: '/industry/dashboard'
    };

    const targetRole = allowedRoles[0];

    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mx-auto mb-4">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-black text-slate-900">
              Access Restricted
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              This dashboard is intended for <strong className="text-slate-800 uppercase">{targetRole}</strong> role users. You are currently signed in as <strong className="text-amber-700 uppercase">{role}</strong>.
            </p>

            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => switchRole(targetRole)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Switch to {targetRole.toUpperCase()} View</span>
              </button>

              <Link
                to={roleDashboardMap[role]}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
              >
                <span>Go to My {role.toUpperCase()} Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

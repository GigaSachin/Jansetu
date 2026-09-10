import React from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '../../context/IssuesContext';
import { 
  Bell, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Trophy 
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useIssues();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">Notifications & Activity</h1>
                <p className="text-xs text-slate-500">Real-time alerts on your reported problems and collaborative milestones</p>
              </div>
            </div>

            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-bold text-brand-700 hover:text-brand-800 underline"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                n.read
                  ? 'bg-white border-slate-200/80 shadow-xs'
                  : 'bg-brand-50/70 border-brand-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  n.type === 'IMPACT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : n.type === 'MATCH_FOUND'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-brand-100 text-brand-800'
                }`}>
                  {n.type === 'IMPACT' ? (
                    <Trophy className="w-4 h-4" />
                  ) : n.type === 'MATCH_FOUND' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(n.timestamp).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {n.targetUrl && (
                <Link
                  to={n.targetUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-800 shrink-0 self-center"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

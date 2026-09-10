import React, { useState } from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Bot, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export const PredictiveRiskRadar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const handlePreemptiveDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 4000);
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-card relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0 shadow-md animate-pulse">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                PROACTIVE AI WEATHER RADAR • JHARKHAND
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> 48-Hour Monsoon Surge Alert
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Heavy Rainfall Forecast (75-110 mm) across Ramgarh, Ranchi & Dhanbad
            </h3>
            
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              JanSetu Predictive AI has flagged <strong>14 vulnerable school catchments</strong> with historical waterlogging risks. Automated pre-clearance task is queued for the <strong>BIT Mesra Civil Hydrology squad</strong> & Ramgarh District Administration.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handlePreemptiveDispatch}
            disabled={dispatched}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{dispatched ? '✓ Pre-emption Protocol Dispatched' : 'Dispatch Pre-emptive Clearance'}</span>
          </button>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

      </div>

      {/* Expanded Predictive Details */}
      {expanded && (
        <div className="mt-5 pt-4 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-fade-in">
          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Risk Zone</span>
            <strong className="text-slate-900 text-xs mt-0.5 block flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-600" /> Ramgarh Ward 12 & NH-33 Junction
            </strong>
            <span className="text-[10px] text-slate-500">Water depth projection: 1.2 ft</span>
          </div>

          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned HEI Response Lab</span>
            <strong className="text-indigo-900 text-xs mt-0.5 block flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> BIT Mesra Student Squad #4
            </strong>
            <span className="text-[10px] text-emerald-600 font-semibold">Pre-fabricated fly-ash sumps ready</span>
          </div>

          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prevented Disruption</span>
            <strong className="text-emerald-900 text-xs mt-0.5 block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ~2,500 School Students Safe
            </strong>
            <span className="text-[10px] text-slate-500">Zero school closures estimated</span>
          </div>
        </div>
      )}
    </div>
  );
};

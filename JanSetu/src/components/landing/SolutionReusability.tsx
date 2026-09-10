import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CopyCheck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Share2,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SolutionReusability: React.FC = () => {
  const { language } = useLanguage();

  const deployments = [
    {
      district: 'Ramgarh',
      status: 'Original Pilot (Verified)',
      match: '100% (Baseline)',
      saving: 'Original Blueprint',
      color: 'border-emerald-500 bg-emerald-50/40 text-emerald-800'
    },
    {
      district: 'Bokaro',
      status: 'Adopted in Industrial Sector 4',
      match: '94% Geo-Suitability',
      saving: '68% Lower Cost',
      color: 'border-blue-500 bg-blue-50/40 text-blue-800'
    },
    {
      district: 'Dhanbad',
      status: 'Adapted for Mining Runoff',
      match: '88% Geo-Suitability',
      saving: '75% Faster Deployment',
      color: 'border-indigo-500 bg-indigo-50/40 text-indigo-800'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-slate-50/80 border-t border-slate-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3 tracking-wide uppercase">
            <CopyCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'पुनः प्रयोज्य ओपन ब्लूप्रिंट' : 'ONE BLUEPRINT → MULTIPLE COMMUNITIES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            {language === 'hi' ? 'एक समाधान,' : 'Solve once,'}{' '}
            <span className="text-emerald-600">{language === 'hi' ? 'अनेक समुदायों का कल्याण।' : 'deploy everywhere.'}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {language === 'hi'
              ? 'जब कोई विश्वविद्यालय टीम किसी समस्या का सफल प्रोटोटाइप बनाती है, तो वह ओपन ब्लूप्रिंट बन जाता है जिसे झारखंड का कोई भी ज़िला अपना सकता है।'
              : 'Every successful capstone pilot generates an open-access civic blueprint, allowing other Jharkhand municipalities and CSR partners to replicate proven solutions with fraction of the cost and zero reinventing.'
            }
          </p>
        </div>

        {/* Visual Blueprint Reusability Diagram */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Blueprint Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-navy-950 rounded-2xl p-6 text-white border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  OPEN CIVIC BLUEPRINT #BP-084
                </span>
                <span className="text-xs text-slate-400 font-mono">MIT Open License</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Modular Permeable Runoff Filter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Low-cost aggregate bio-filter designed using local fly ash and gravel to prevent monsoon waterlogging near schools and village roads.
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Origin Team:</span>
                  <span className="font-bold text-white">BIT Mesra (Civil Eng)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Avg Cost per Unit:</span>
                  <span className="font-bold text-emerald-400">₹14,500 (vs ₹60,000 RCC)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Fabrication Time:</span>
                  <span className="font-bold text-white">3 Days</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Field Validated
                </span>
                <Link to="/solutions" className="text-sky-300 hover:text-sky-200 font-bold flex items-center gap-1">
                  View Blueprint <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Middle Flow Indicator */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2 shadow-xs">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Cross-District
              </span>
              <span className="text-[11px] text-slate-500">Replication Engine</span>
            </div>

            {/* Right Replication Targets */}
            <div className="lg:col-span-5 space-y-3">
              {deployments.map((dep, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${dep.color}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-700" />
                      <h4 className="text-sm font-black text-slate-900">{dep.district}, Jharkhand</h4>
                    </div>
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 shadow-2xs">
                      {dep.match}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200/60">
                    <span>{dep.status}</span>
                    <span className="font-bold text-emerald-700">{dep.saving}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

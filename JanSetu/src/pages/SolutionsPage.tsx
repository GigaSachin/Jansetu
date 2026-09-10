import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Lightbulb, Users, Download, Sparkles } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { language } = useLanguage();

  const workingPrototypes = [
    {
      id: 'SOL-01',
      title: language === 'hi' ? 'मॉड्यूलर पारगम्य फ्लाई-ऐश ड्रेनेज टाइल्स' : 'Modular Porous Fly-Ash Permeable Drainage Tiles',
      category: 'Water & Sanitation',
      designedBy: 'BIT Mesra Civil & Hydraulic Engineering Cohort',
      partner: 'Tata Steel CSR (Demo Partner)',
      deployedAt: 'Ramgarh Ward 12 & Suburbs, Jharkhand',
      cost: '₹420 / sq.meter (70% cheaper than concrete culverts)',
      impact: '2,400+ Residents Free from Floodwaters',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
      status: 'Field Pilot & Open Sourced'
    },
    {
      id: 'SOL-02',
      title: language === 'hi' ? 'विकेंद्रीकृत सोलर एरोबिक बायो-कंपोस्ट रिएक्टर' : 'Decentralized Solar Aerobic Bio-Digestion Reactor',
      category: 'Waste Management',
      designedBy: 'Birsa Agricultural University (BAU Ranchi)',
      partner: 'Jindal Steel Sustainability (Demo Partner)',
      deployedAt: 'Kanke Daily Vegetable Mandi, Ranchi',
      cost: '₹1.8 Lakhs / 2-Tonne unit',
      impact: '1.8 Tonnes organic waste converted daily into bio-fertilizer',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
      status: 'Open Blueprint'
    },
    {
      id: 'SOL-03',
      title: language === 'hi' ? 'अस्पताल सुलभता मॉड्यूलर रैंप प्रणाली' : 'Ergonomic 1:12 Modular Hospital Mobility Ramps',
      category: 'Accessibility & Inclusion',
      designedBy: 'BIT Sindri Ergonomics & Mechanical Team',
      partner: 'Central Coalfields Limited (CCL) CSR Demo',
      deployedAt: 'Hazaribagh Sadar Hospital, Jharkhand',
      cost: '₹1,200 / running meter',
      impact: '600+ Outpatients & Wheelchair Users Daily',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
      status: 'State Standard Pilot'
    },
    {
      id: 'SOL-04',
      title: language === 'hi' ? 'सोलर नैनो-फ़िल्ट्रेशन फ्लोराइड उपचार संयंत्र' : 'Zero-Chemical Solar Activated Alumina De-Fluoridator',
      category: 'Clean Drinking Water',
      designedBy: 'Central University of Jharkhand (CUJ Ranchi)',
      partner: 'Tata Trusts & CSR Demo Support',
      deployedAt: 'Bishunpur Basti, Gumla, Jharkhand',
      cost: '₹0.15 / liter maintenance',
      impact: '4,800 Villagers with Safe Water (Fluoride 0.4 mg/L)',
      image: 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?w=600&auto=format&fit=crop&q=80',
      status: '100% Impact Verified'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-brand-600" />
            <span>{language === 'hi' ? 'ओपन नागरिक समाधान कैटलॉग' : 'Jharkhand Civic Solution Catalog'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'hi' ? 'सत्यापित कम लागत वाले समाधान,' : 'Verified low-cost solutions,'}{' '}
            <span className="gradient-text">{language === 'hi' ? 'स्केल के लिए निर्मित।' : 'built for scale.'}</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {language === 'hi'
              ? 'झारखंड के विश्वविद्यालयों द्वारा विकसित हर सफल प्रोटोटाइप को पूरे राज्य में विस्तार के लिए एक ओपन-एक्सेस ब्लूप्रिंट के रूप में संकलित किया जाता है।'
              : 'Every successful university prototype in Jharkhand is documented as an open-access civic technology blueprint for replication across districts.'
            }
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workingPrototypes.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                    {sol.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-[11px] font-extrabold shadow-sm">
                    {sol.status}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {sol.title}
                  </h3>

                  <div className="space-y-2.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Innovating Lab:</span>
                      <strong className="text-indigo-950 font-bold">{sol.designedBy}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">CSR Sponsor:</span>
                      <strong className="text-emerald-800 font-bold">{sol.partner}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Benchmark Unit Cost:</span>
                      <strong className="text-brand-800 font-bold">{sol.cost}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <Users className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Impact:</strong> {sol.impact}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Location: {sol.deployedAt}
                </span>
                <button
                  onClick={() => alert(`Downloaded Open CAD & Bill of Materials for ${sol.title}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'ब्लूप्रिंट डाउनलोड करें' : 'Download Blueprint'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

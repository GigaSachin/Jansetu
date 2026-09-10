import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Building2, 
  Award, 
  PieChart
} from 'lucide-react';

export const ImpactOverview: React.FC = () => {
  const { language } = useLanguage();

  const categoriesImpact = [
    { name: language === 'hi' ? 'जल एवं स्वच्छता' : 'Water & Sanitation', percent: 36, count: '52 Pilots', color: 'bg-blue-500' },
    { name: language === 'hi' ? 'सुलभता एवं स्वास्थ्य' : 'Accessibility & Health', percent: 24, count: '34 Pilots', color: 'bg-purple-500' },
    { name: language === 'hi' ? 'कचरा प्रबंधन' : 'Waste Management', percent: 22, count: '31 Pilots', color: 'bg-emerald-500' },
    { name: language === 'hi' ? 'ग्रामीण एवं कृषि' : 'Rural & Agriculture', percent: 18, count: '25 Pilots', color: 'bg-amber-500' }
  ];

  const highlights = [
    {
      title: language === 'hi' ? 'रामगढ़ पारगम्य जल निकासी पायलट' : 'Ramgarh Permeable Drainage Pilot',
      stat: '2,400+ Residents',
      sub: language === 'hi' ? 'जलभराव में 100% कमी और सुरक्षित स्कूल पहुंच' : 'Zero stagnant floodwater & safe school access',
      tag: 'BIT Mesra + Tata Steel CSR Demo',
      location: 'Ramgarh, Jharkhand',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80'
    },
    {
      title: language === 'hi' ? 'हजारीबाग सदर अस्पताल सुलभता रैंप' : 'Hazaribagh Hospital Accessibility Ramp',
      stat: '600+ Patients/Day',
      sub: language === 'hi' ? 'सुरक्षित एवं स्वतंत्र व्हीलचेयर आवागमन' : 'Slip-free independent wheelchair mobility',
      tag: 'BIT Sindri + CCL CSR Demo',
      location: 'Hazaribagh, Jharkhand',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-24 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'प्रोटोटाइप एवं पायलट परिणाम' : 'Audited Pilot Outcomes • Jharkhand'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'जब लोग मिलकर काम करते हैं,' : 'See what happens when'}{' '}
            <span className="gradient-text">{language === 'hi' ? 'तो समाधान मुमकिन है।' : 'people work together.'}</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {language === 'hi'
              ? 'झारखंड के 24 ज़िलों में परीक्षण किए जा रहे प्रोटोटाइप, नागरिक संतुष्टि और सत्यापित लाभ के पारदर्शी आंकड़े।'
              : 'Open, verifiable telemetry on deployed prototypes, citizen satisfaction benchmarks, and pilot beneficiaries across 24 Jharkhand districts.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Category Distribution Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === 'hi' ? 'श्रेणी अनुसार समाधान' : 'Solutions by Category'}
                  </h3>
                  <p className="text-xs text-slate-500">140+ total prototypes in pipeline</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <PieChart className="w-5 h-5" />
                </div>
              </div>

              {/* Progress Stack */}
              <div className="space-y-4 mb-6">
                {categoriesImpact.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800">{item.name}</span>
                      <span className="text-slate-500">{item.count} ({item.percent}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Open Pilot Benchmark
              </span>
              <span>Avg 34 days to prototype</span>
            </div>
          </div>

          {/* Right: Featured Verified Case Studies */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-800 shadow-xs">
                      {item.location}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-extrabold text-brand-700 uppercase tracking-wider mb-1">
                      {item.tag}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <div className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                      {item.stat}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.sub}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sample Pilot Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

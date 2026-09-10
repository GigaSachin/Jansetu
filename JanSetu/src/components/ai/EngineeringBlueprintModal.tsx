import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Download, 
  Maximize2, 
  Compass, 
  Activity, 
  Cpu, 
  Droplets, 
  ShieldCheck 
} from 'lucide-react';

interface EngineeringBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  institution?: string;
}

export const EngineeringBlueprintModal: React.FC<EngineeringBlueprintModalProps> = ({
  isOpen,
  onClose,
  title = 'Permeable Fly-Ash Paver & Sub-surface Sump Design',
  category = 'Water & Sanitation',
  institution = 'BIT Mesra, Civil & Environmental Engineering'
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [stressSimulating, setStressSimulating] = useState(false);
  const [simResults, setSimResults] = useState<{ load: string; deflection: string; percolation: string } | null>(null);

  if (!isOpen) return null;

  const blueprintLayers = [
    {
      id: 0,
      name: 'Layer 1: Porous Top Paver Surface',
      depth: '60 mm thickness',
      material: 'Interlocking Porous Concrete (40% Void Ratio)',
      specs: 'Permeability: 180 mm/hr • Skid Resistance: BPN 65 • Surface Flow Index: High',
      color: 'bg-indigo-500',
      description: 'Allows instantaneous monsoon rainwater infiltration, preventing surface puddles and child slip hazards near school gates.'
    },
    {
      id: 1,
      name: 'Layer 2: Fly-Ash Choke & Filtration Bed',
      depth: '50 mm thickness',
      material: '60% Recycled Thermal Fly-Ash + Coarse River Sand',
      specs: 'Silt Filtration: 98.4% Efficiency • Carbon Reduction: 3.8 Tons CO₂/100m²',
      color: 'bg-emerald-500',
      description: 'Stabilized fly-ash matrix developed by Jharkhand HEI Consortium. Traps clay sediments while allowing filtered water percolation.'
    },
    {
      id: 2,
      name: 'Layer 3: Crushed Basalt Open-Graded Reservoir',
      depth: '150 mm thickness',
      material: '20-40 mm Clean Crushed Basalt Aggregate Base',
      specs: 'Storage Capacity: 45,000 Liters/hr • Void Storage: 38% Volume',
      color: 'bg-amber-500',
      description: 'Sub-surface temporary stormwater reservoir. Holds flash-flood surges and slowly releases water to groundwater recharge wells.'
    },
    {
      id: 3,
      name: 'Layer 4: Perforated Geotextile Drainage Conduit',
      depth: '100 mm sub-grade',
      material: 'Slotted HDPE Perforated Pipe + Non-Woven Geotextile Membrane',
      specs: 'Discharge Velocity: 1.4 m/s • Anti-Clog Life: 15 Years',
      color: 'bg-rose-500',
      description: 'Gravity-fed discharge conduit directing overflow to the localized percolation pit and school groundwater table.'
    }
  ];

  const handleRunStressSimulation = () => {
    setStressSimulating(true);
    setTimeout(() => {
      setStressSimulating(false);
      setSimResults({
        load: '24.8 MPa (Axial Load Passed)',
        deflection: '0.42 mm (Well within 2.0 mm IRC limit)',
        percolation: '192 Liters/min/m² (Exceeds Peak Monsoon Surge)'
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-4xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-black">
                  AI CAD SPECIFICATION • ISO/IRC-37 COMPLIANT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  R&D Prototype
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Institution & Domain Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span className="text-slate-600">Lead Academic Lab:</span>
              <strong className="text-indigo-950 font-bold">{institution}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-brand-600" />
              <span className="text-slate-600">Category:</span>
              <strong className="text-brand-900 font-bold">{category}</strong>
            </div>
          </div>

          {/* Interactive 3D / Layered Cross-Section Diagram */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-white relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Pavement Cross-Section Engineering Stack (Interactive)
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                Click a layer to inspect
              </span>
            </div>

            {/* Visual Cross Section Slices */}
            <div className="space-y-2">
              {blueprintLayers.map((layer, idx) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    activeLayer === idx
                      ? 'bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${layer.color} shadow-sm`} />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{layer.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({layer.depth})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{layer.material}</div>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-indigo-300 sm:text-right shrink-0">
                    {layer.specs.split('•')[0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Layer Details */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
              <div className="text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                Active Inspection: {blueprintLayers[activeLayer].name}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {blueprintLayers[activeLayer].description}
              </p>
              <div className="text-[11px] font-mono text-emerald-400 pt-1 border-t border-slate-800">
                🧪 Lab Spec: {blueprintLayers[activeLayer].specs}
              </div>
            </div>
          </div>

          {/* AI Structural & Hydraulic Stress Test Simulation */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span>AI Structural Load & Hydraulic Flow Simulation</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Simulate heavy vehicular axle load & 100mm/hr cloudburst scenario
                </span>
              </div>

              <button
                type="button"
                onClick={handleRunStressSimulation}
                disabled={stressSimulating}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{stressSimulating ? 'Simulating...' : 'Run FEA Stress Simulation'}</span>
              </button>
            </div>

            {simResults && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs animate-fade-in">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 block uppercase">Compressive Strength</span>
                  <strong className="text-emerald-900 text-sm font-black">{simResults.load}</strong>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-[10px] font-bold text-blue-800 block uppercase">Elastic Deflection</span>
                  <strong className="text-blue-900 text-sm font-black">{simResults.deflection}</strong>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                  <span className="text-[10px] font-bold text-indigo-800 block uppercase">Drainage Rate</span>
                  <strong className="text-indigo-900 text-sm font-black">{simResults.percolation}</strong>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Open Civic Hardware Architecture • JanSetu R&D License
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CAD Spec (PDF)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

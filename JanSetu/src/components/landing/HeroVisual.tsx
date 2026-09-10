import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Layers,
  Shield,
  Building2,
  Cpu,
  ExternalLink
} from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const { language } = useLanguage();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Center hub coordinates
  const cx = 500;
  const cy = 420;

  // Nodes arranged radially around center hub
  const nodes = [
    {
      id: 'citizen',
      type: 'citizen',
      label: language === 'hi' ? 'नागरिक' : 'Citizen',
      sublabel: language === 'hi' ? 'रिपोर्ट' : 'Report',
      x: 220,
      y: 260,
      icon: AlertCircle,
      color: '#f59e0b',
      dotColor: '#f59e0b'
    },
    {
      id: 'government',
      type: 'government',
      label: language === 'hi' ? 'सरकार' : 'Government',
      sublabel: language === 'hi' ? 'कार्यवाही' : 'Acts',
      x: 740,
      y: 190,
      icon: Shield,
      color: '#10b981',
      dotColor: '#10b981'
    },
    {
      id: 'impact',
      type: 'impact',
      label: language === 'hi' ? 'प्रभाव' : 'Impact',
      sublabel: language === 'hi' ? 'मापा गया' : 'Measured',
      x: 800,
      y: 380,
      icon: CheckCircle2,
      color: '#10b981',
      dotColor: '#10b981'
    },
    {
      id: 'university',
      type: 'institution',
      label: language === 'hi' ? 'विश्वविद्यालय' : 'University',
      sublabel: language === 'hi' ? 'अनुसंधान' : 'Researches',
      x: 770,
      y: 570,
      icon: GraduationCap,
      color: '#3b82f6',
      dotColor: '#3b82f6'
    },
    {
      id: 'solution',
      type: 'solution',
      label: language === 'hi' ? 'समाधान' : 'Solution',
      sublabel: language === 'hi' ? 'आकार लेता है' : 'Takes shape',
      x: 540,
      y: 700,
      icon: Layers,
      color: '#f59e0b',
      dotColor: '#f59e0b'
    },
    {
      id: 'csr',
      type: 'industry',
      label: 'CSR',
      sublabel: language === 'hi' ? 'सहयोग' : 'Supports',
      x: 230,
      y: 520,
      icon: Building2,
      color: '#0d9488',
      dotColor: '#0d9488'
    }
  ];

  // Connection paths from nodes to center hub
  const connections = nodes.map(n => ({
    from: [n.x, n.y],
    to: [cx, cy],
    color: n.color
  }));

  return (
    <div className="relative w-full max-w-[680px] xl:max-w-[780px] mx-auto flex flex-col items-center select-none">
      
      {/* Resolution Network Label */}
      <div className="flex items-center gap-3 mb-4 self-start text-[11px] tracking-[0.25em] uppercase">
        <span className="text-slate-400 font-bold">RESOLUTION NETWORK</span>
        <span className="text-blue-600 font-black">01—06</span>
      </div>

      {/* Main SVG Network Canvas */}
      <div className="relative w-full aspect-[1/1] overflow-visible">
        
        <svg
          viewBox="0 0 1000 880"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Central hub glow */}
            <radialGradient id="hubGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#1e3a5f" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
            </radialGradient>
            
            {/* Subtle background radial */}
            <radialGradient id="bgRadial2" cx="50%" cy="48%" r="55%">
              <stop offset="0%" stopColor="#e8f4fd" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#eef6fc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background subtle radial fill */}
          <circle cx={cx} cy={cy} r="420" fill="url(#bgRadial2)" />

          {/* Concentric orbit rings */}
          {[160, 260, 360].map((r, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth={i === 0 ? "1.2" : "0.8"}
              strokeOpacity={i === 0 ? "0.35" : "0.2"}
              strokeDasharray={i === 2 ? "4 6" : "none"}
            />
          ))}

          {/* Radial guide lines from center (like compass spokes) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = cx + Math.cos(rad) * 380;
            const y2 = cy + Math.sin(rad) * 380;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="#e2e8f0"
                strokeWidth="0.5"
                strokeOpacity="0.4"
                strokeDasharray="3 8"
              />
            );
          })}

          {/* Animated pulse wave from center */}
          <circle cx={cx} cy={cy} r="80" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.15">
            <animate attributeName="r" values="60;200;300" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.08;0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r="80" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.1">
            <animate attributeName="r" values="60;200;300" dur="4s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.05;0" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>

          {/* Connection lines from each node to center */}
          {connections.map((c, idx) => {
            const midX = (c.from[0] + c.to[0]) / 2 + (idx % 2 === 0 ? 20 : -20);
            const midY = (c.from[1] + c.to[1]) / 2 + (idx % 2 === 0 ? -15 : 15);
            const pathD = `M ${c.from[0]},${c.from[1]} Q ${midX},${midY} ${c.to[0]},${c.to[1]}`;
            return (
              <g key={idx}>
                {/* Base dotted line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  strokeDasharray="4 6"
                />
                {/* Animated flowing particles */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="2.5"
                  strokeDasharray="5 30"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="70;0"
                    dur={`${2.5 + (idx % 3) * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            );
          })}

          {/* Central Hub Glow */}
          <circle cx={cx} cy={cy} r="110" fill="url(#hubGlow2)" />

          {/* Central Hub Circle — Dark navy large disk */}
          <motion.circle
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            cx={cx}
            cy={cy}
            r="68"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="2"
          />
          {/* Inner ring decoration */}
          <circle cx={cx} cy={cy} r="58" fill="none" stroke="#1e3a5f" strokeWidth="1" strokeOpacity="0.5" />

          {/* Hub icon placeholder — Sparkle */}
          <g transform={`translate(${cx - 12}, ${cy - 30})`}>
            <Sparkles className="w-6 h-6 text-sky-400" />
          </g>

          {/* Hub text: JANSETU AI */}
          <text
            x={cx}
            y={cy + 2}
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fill="white"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.08em"
          >
            JANSETU AI
          </text>
          <text
            x={cx}
            y={cy + 22}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#64748b"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.1em"
          >
            UNDERSTANDS • CONNECTS
          </text>

          {/* Render all outer nodes */}
          {nodes.map((node) => {
            const isHovered = activeNode === node.id;
            const Icon = node.icon;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Outer halo on hover */}
                <circle
                  r="28"
                  fill="transparent"
                  stroke={node.color}
                  strokeWidth={isHovered ? '2.5' : '1'}
                  strokeOpacity={isHovered ? 0.8 : 0.15}
                  className="transition-all duration-300"
                />

                {/* Solid colored dot */}
                <circle
                  r="10"
                  fill={node.dotColor}
                  stroke="white"
                  strokeWidth="3"
                />

                {/* Label text (always visible) */}
                <text
                  x="0"
                  y="36"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="800"
                  fill="#1e293b"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {node.label}
                </text>
                {/* Sub-label (always visible) */}
                <text
                  x="0"
                  y="52"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#94a3b8"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontStyle="italic"
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}

          {/* Traveling dot animation along path */}
          <circle r="5" fill="#3b82f6" opacity="0.8">
            <animateMotion
              path={`M 220,260 Q 360,340 ${cx},${cy} Q 620,530 540,700`}
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#10b981" opacity="0.7">
            <animateMotion
              path={`M 740,190 Q 620,300 ${cx},${cy} Q 650,480 770,570`}
              dur="7s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* ===== Floating Glass Cards ===== */}

        {/* AI MATCH Card — Top Right */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute top-[2%] right-[2%] bg-white/97 backdrop-blur-lg rounded-2xl px-4 py-3.5 shadow-xl border border-slate-200/80 text-left w-[170px] z-20"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">AI MATCH</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="font-extrabold text-slate-900 text-base leading-tight">BIT Mesra</div>
          <div className="flex items-center gap-2.5 mt-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '91%' }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              />
            </div>
            <span className="text-sm font-black text-blue-700">91%</span>
          </div>
        </motion.div>

        {/* RAMGARH Report Card — Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-[6%] left-[0%] bg-white/97 backdrop-blur-lg rounded-2xl px-4 py-3.5 shadow-xl border border-slate-200/80 text-left max-w-[240px] z-20"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            RAMGARH, JHARKHAND
          </div>
          <div className="font-bold text-slate-900 text-sm leading-snug">
            Waterlogging near school
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1.5">
            AI recommended · prototype data
          </div>
        </motion.div>

        {/* SAMPLE IMPACT Card — Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-[18%] right-[0%] bg-white/97 backdrop-blur-lg rounded-2xl px-4 py-3.5 shadow-xl border border-slate-200/80 text-left max-w-[200px] z-20"
        >
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-0.5">
            SAMPLE IMPACT
          </div>
          <div className="font-bold text-slate-900 text-sm leading-snug">
            Safer school access
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            pathway tracked
          </div>
          <div className="text-[9px] text-slate-400 font-medium mt-1">
            23.63° N / 85.02° E
          </div>
        </motion.div>

        {/* Hover tooltip */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-slate-700 shadow-2xl text-xs z-30 pointer-events-none min-w-[160px]"
            >
              {(() => {
                const n = nodes.find((item) => item.id === activeNode);
                if (!n) return null;
                return (
                  <div className="text-center">
                    <strong className="text-white text-sm block font-bold">{n.label}</strong>
                    <span className="text-slate-300 text-[11px] mt-0.5 block">{n.sublabel}</span>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  showTagline = false,
  size = 'md',
  to = '/',
  className = ''
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', tagline: 'text-[10px]' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', tagline: 'text-xs' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', tagline: 'text-sm' }
  };

  const isWhite = variant === 'white' || variant === 'dark';

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Signature Bridge Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 via-brand-700 to-navy-900 shadow-md ${sizeClasses[size].icon}`}>
        {/* Dynamic Bridge SVG */}
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4/5 h-4/5">
          {/* Base Anchor Left (People) */}
          <circle cx="9" cy="27" r="3.5" fill="#38BDF8" />
          {/* Base Anchor Right (Solutions) */}
          <circle cx="31" cy="27" r="3.5" fill="#F49160" />
          {/* Apex Node (Bridge / JanSetu) */}
          <circle cx="20" cy="12" r="3" fill="#FFFFFF" />
          
          {/* Bridge Connecting Arcs */}
          <path d="M9 27C12 18 16 12 20 12C24 12 28 18 31 27" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 0" />
          <path d="M12 27H28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
          {/* Center upward beacon */}
          <path d="M20 12V24" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`flex items-baseline tracking-tight font-extrabold leading-none ${isWhite ? 'text-white' : 'text-slate-900'}`}>
          <span>Jan</span>
          <span className={`${isWhite ? 'text-sky-400' : 'text-brand-600'} ml-[1px]`}>Setu</span>
          <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 ml-1 mb-0.5"></span>
        </div>
        <span className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 select-none ${isWhite ? 'text-slate-400' : 'text-slate-500'}`}>
          Jharkhand • People • Solutions
        </span>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block transition-transform hover:opacity-95 active:scale-[0.98]">
        {content}
      </Link>
    );
  }

  return content;
};

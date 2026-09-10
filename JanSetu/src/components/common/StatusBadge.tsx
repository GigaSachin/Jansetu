import React from 'react';
import { IssueStatus } from '../../types';
import { 
  FileText, 
  CheckCircle2, 
  Network, 
  Users, 
  Wrench, 
  Truck, 
  Sparkles, 
  XCircle,
  Clock,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const configs: Record<IssueStatus, { label: string; bg: string; text: string; border: string; icon: any }> = {
    REPORTED: {
      label: 'Reported',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      icon: FileText
    },
    AI_ANALYZING: {
      label: 'AI Analysing',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: Clock
    },
    AI_ANALYZED: {
      label: 'AI Analysed',
      bg: 'bg-indigo-50',
      text: 'text-indigo-800 font-semibold',
      border: 'border-indigo-200',
      icon: BrainCircuit
    },
    POTENTIAL_MATCH: {
      label: 'Potential Match',
      bg: 'bg-sky-50',
      text: 'text-sky-800 font-semibold',
      border: 'border-sky-200',
      icon: Sparkles
    },
    GOVERNMENT_REVIEW: {
      label: 'Govt Review',
      bg: 'bg-amber-50',
      text: 'text-amber-800 font-semibold',
      border: 'border-amber-200',
      icon: ShieldCheck
    },
    VERIFIED: {
      label: 'Government Verified ✓',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800 font-bold',
      border: 'border-emerald-200',
      icon: CheckCircle2
    },
    MATCHED: {
      label: 'HEI Matched',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: Network
    },
    COLLABORATING: {
      label: 'In Collaboration',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: Users
    },
    SOLUTION_DEVELOPMENT: {
      label: 'Solution Development',
      bg: 'bg-blue-50',
      text: 'text-blue-800 font-semibold',
      border: 'border-blue-200',
      icon: Wrench
    },
    PROTOTYPING: {
      label: 'Prototyping & Pilot',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      icon: Wrench
    },
    DEPLOYED: {
      label: 'Solution Deployed',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: Truck
    },
    IMPACT_VERIFIED: {
      label: 'Impact Verified',
      bg: 'bg-emerald-100',
      text: 'text-emerald-900 font-bold',
      border: 'border-emerald-300',
      icon: Sparkles
    },
    RESOLVED: {
      label: 'Resolved ✓',
      bg: 'bg-emerald-100',
      text: 'text-emerald-900 font-bold',
      border: 'border-emerald-300',
      icon: CheckCircle2
    },
    REJECTED: {
      label: 'Closed / Out of Scope',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: XCircle
    }
  };

  const config = configs[status] || configs.REPORTED;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { HowItWorks } from '../components/landing/HowItWorks';
import { JanSetuBridge } from '../components/landing/JanSetuBridge';
import { LandingCTA } from '../components/landing/LandingCTA';
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Users2, 
  Wrench, 
  Truck, 
  Trophy,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Collaborative Innovation Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How <span className="gradient-text">JanSetu</span> turns local problems into real solutions.
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Conventional complaint portals leave citizen grievances stuck in endless bureaucratic backlogs. JanSetu connects every verified problem to student engineering talent, municipal funding, and CSR sponsorship.
          </p>
        </div>

      </div>

      {/* 7-Stage Visual Pipeline */}
      <HowItWorks />

      {/* The 4-Pillar Bridge */}
      <JanSetuBridge />

      {/* Deep-Dive FAQ / Principles Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why JanSetu Works Differently
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Engineered for accountability, academic empowerment, and transparent civic impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">No Lost Complaints</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every problem is assigned a persistent cryptographic tracking ID with open status visibility for all stakeholders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Real Engineering Labs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Problems become funded university capstones and student thesis prototypes rather than theoretical textbook exercises.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Milestone Tied Grants</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                CSR funds are disbursed transparently only upon verified field deployment and third-party beneficiary health audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <LandingCTA />
    </div>
  );
};

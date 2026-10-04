'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  ShieldAlert, 
  Key, 
  Cpu, 
  History, 
  ArrowRight, 
  UserCheck, 
  Search, 
  Lock, 
  CheckCircle2,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, loadDemoScenario } = useApp();

  const handleLoginAs = (selectedRole: UserRole, targetRoute = '/dashboard') => {
    setRole(selectedRole);
    if (selectedRole === 'INVESTIGATOR') {
      router.push('/investigate');
    } else if (selectedRole === 'RECIPIENT') {
      router.push('/documents');
    } else {
      router.push(targetRoute);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 cyber-grid">
      {/* Top Banner Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">LeakTrace</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/40">PQ</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Smart India Hackathon 2026 • Problem Statement SIH26237</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Post-Quantum Cryptography Ready
          </span>
          <button
            onClick={() => {
              loadDemoScenario();
              handleLoginAs('ADMIN', '/dashboard');
            }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-lg shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
          >
            <Zap className="w-4 h-4 fill-cyan-300" /> Quick Demo Mode
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto w-full text-center my-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-6 shadow-inner">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>BLOCKCHAIN & CYBERSECURITY THEME</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          Trace. Detect. <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Investigate.</span>
        </h1>

        <h2 className="text-lg sm:text-xl font-medium text-slate-300 mb-6">
          AI-Assisted Document Traceability & Leak Investigation Platform
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          AI-assisted document traceability and leak investigation using cryptographic attribution, invisible watermarking, semantic content matching and tamper-evident audit logs.
        </p>

        {/* Console Entry Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => handleLoginAs('ADMIN', '/dashboard')}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-cyan-500/25 flex items-center gap-3 transition transform hover:-translate-y-0.5"
          >
            <ShieldAlert className="w-5 h-5 text-slate-950" />
            Enter Investigation Console
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
          {/* Card 1 */}
          <div className="bg-[#0f172a]/90 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/40 transition group">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
              Cryptographic Attribution
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unique Trace ID generated for every recipient-specific document copy using <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">HMACk(DID || CID || N)</code>.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0f172a]/90 border border-slate-800 rounded-xl p-6 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
              AI Leak Detection
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detect modified, renamed and recreated copies using multi-vector semantic embedding similarity search and OCR.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0f172a]/90 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition">
              <History className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
              Immutable Audit Trail
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Record document access and decryption events using a tamper-evident SHA-256 hash-chained provenance ledger.
            </p>
          </div>
        </div>

        {/* Demo Role Selection Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <UserCheck className="w-4 h-4" /> Role Selection Demo
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Choose Role to Launch Demo Console</h3>
          <p className="text-xs text-slate-400 mb-6">Select a persona to test full authority operations, forensic investigation pipelines, or recipient access.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Authority / Admin */}
            <button
              onClick={() => handleLoginAs('ADMIN', '/dashboard')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900 text-left transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-white mb-1">Authority (Admin)</div>
                <p className="text-[11px] text-slate-400">Upload master docs, issue recipient copies, inspect full ledger & system metrics.</p>
              </div>
              <div className="mt-4 text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                Enter Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Investigator */}
            <button
              onClick={() => handleLoginAs('INVESTIGATOR', '/investigate')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/60 hover:bg-slate-900 text-left transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-3">
                  <Search className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-white mb-1">Forensic Investigator</div>
                <p className="text-[11px] text-slate-400">Upload suspected leaked files, extract watermarks, correlation scores & reports.</p>
              </div>
              <div className="mt-4 text-xs text-rose-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                Launch Leak Center <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Recipient */}
            <button
              onClick={() => handleLoginAs('RECIPIENT', '/documents')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900 text-left transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-white mb-1">Document Recipient</div>
                <p className="text-[11px] text-slate-400">Simulate authorized recipient document view and decryption event generation.</p>
              </div>
              <div className="mt-4 text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                Access Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-mono">
        <div>LeakTrace PQ • Smart India Hackathon 2026 Prototype</div>
        <div className="flex items-center gap-4">
          <span>Trace ID Engine</span>
          <span>•</span>
          <span>Hash-Chained Ledger</span>
          <span>•</span>
          <span>AI Embedding Matching</span>
        </div>
      </footer>
    </div>
  );
}

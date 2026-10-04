'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  UploadCloud, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Loader2, 
  ShieldAlert, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function InvestigateCenterPage() {
  const router = useRouter();
  const { runLeakAnalysis, loadDemoScenario } = useApp();

  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const pipelineSteps = [
    '1. File received & metadata validated',
    '2. SHA-256 binary digest calculated',
    '3. Spatial/frequency domain watermark scan',
    '4. Optical Character Recognition (OCR) / Text extraction',
    '5. Multi-vector semantic embedding generated',
    '6. Vector similarity search across protected master repository',
    '7. Chronological audit log correlation',
    '8. Evidence correlation score calculated (E = w1W + w2H + w3S + w4A)',
    '9. Originating document copy & recipient identified!'
  ];

  const handleStartAnalysis = async (fileNameToAnalyze?: string) => {
    const fileToUse = fileNameToAnalyze || selectedFileName || 'budget_final_updated.pdf';
    setSelectedFileName(fileToUse);
    setIsAnalyzing(true);
    setCurrentStep(0);

    // Progressive pipeline step advancement
    for (let i = 0; i < pipelineSteps.length; i++) {
      await new Promise(res => setTimeout(res, 350));
      setCurrentStep(i + 1);
    }

    // Run leak analysis in state store
    const inv = await runLeakAnalysis(fileToUse);

    setTimeout(() => {
      router.push(`/investigate/${inv.caseId}`);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Leak Investigation Center</h1>
            <span className="bg-rose-500/20 text-rose-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-rose-500/30 animate-pulse">
              FORENSIC SUITE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Upload a suspected leaked document to identify its originating copy, recipient, and attribution chain.</p>
        </div>

        <button
          onClick={() => {
            loadDemoScenario();
            handleStartAnalysis('budget_final_updated.pdf');
          }}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-rose-900/30 flex items-center gap-2 transition"
        >
          <Zap className="w-4 h-4 fill-white" /> Quick Demo Case Analysis
        </button>
      </div>

      {!isAnalyzing ? (
        <div className="space-y-6">
          {/* Main Upload Box */}
          <div className="bg-[#0f172a] border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-8 sm:p-12 text-center transition group bg-slate-900/40">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition shadow-lg shadow-cyan-500/10">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h2 className="text-lg font-bold text-white mb-1">Drag & Drop Suspected Document</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
              Supports modified PDFs, re-saved DOCX files, scanned image leaks (PNG/JPG), and reformatted text documents.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
              <input
                type="text"
                value={selectedFileName}
                onChange={(e) => setSelectedFileName(e.target.value)}
                placeholder="Or type filename (e.g. budget_final_updated.pdf)"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleStartAnalysis(selectedFileName || 'budget_final_updated.pdf')}
                className="px-8 py-3.5 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-xl shadow-rose-900/30 flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                START FORENSIC ANALYSIS
              </button>
            </div>

            <div className="mt-6 text-[11px] font-mono text-slate-500 flex items-center justify-center gap-4">
              <span>Accepted Formats: PDF, DOCX, TXT, PNG, JPG</span>
              <span>•</span>
              <span>Multi-Vector Evidence Correlator</span>
            </div>
          </div>

          {/* Preset Demo Scenarios */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">Or Select Demo Leak Cases for Presentation:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleStartAnalysis('budget_final_updated.pdf')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-lg text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-rose-400 transition">budget_final_updated.pdf</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Leaked Finance Report • Text edits & re-saved</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
              </button>

              <button
                onClick={() => handleStartAnalysis('defense_infra_scan_leak.png')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-lg text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-amber-400 transition">defense_infra_scan_leak.png</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Scanned Image Leak • OCR text extraction</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Progressive Analysis Pipeline Animation */
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center animate-spin">
                <Loader2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Forensic Analysis Pipeline Running...</h2>
                <p className="text-xs text-slate-400 font-mono">Processing: {selectedFileName}</p>
              </div>
            </div>

            <div className="text-xs font-mono text-cyan-400 font-bold">
              Step {currentStep} of {pipelineSteps.length}
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {pipelineSteps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep - 1;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                    isCompleted
                      ? 'bg-slate-900/90 border-emerald-500/30 text-emerald-300'
                      : isCurrent
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md'
                      : 'bg-slate-950/40 border-slate-800 text-slate-600'
                  }`}
                >
                  <span className="font-semibold">{step}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-slate-800 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

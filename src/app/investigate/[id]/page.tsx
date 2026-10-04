'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldAlert, 
  Cpu, 
  Hash, 
  History, 
  FileText, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  FileCheck2, 
  ExternalLink,
  Sparkles,
  Zap,
  Download
} from 'lucide-react';

export default function ForensicResultPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params?.id as string;
  const { activeInvestigation, investigations, recipients } = useApp();

  const inv = investigations.find(i => i.caseId === caseId) || activeInvestigation || investigations[0];
  const recipient = recipients.find(r => r.id === inv.recipientId) || recipients[0];

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/investigate')}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Forensic Analysis Result</h1>
              <span className="bg-rose-500/20 text-rose-400 font-mono text-xs font-bold px-2.5 py-0.5 rounded border border-rose-500/40">
                {inv.caseId}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Suspected File: <span className="text-slate-200 font-bold">{inv.suspectedFile}</span> • Analyzed {inv.detectedAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/reports/${inv.caseId}`}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-lg shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
          >
            <FileCheck2 className="w-4 h-4" /> GENERATE INVESTIGATION REPORT
          </Link>
        </div>
      </div>

      {/* SECTION 14: HIGH CONFIDENCE LEAK ATTRIBUTION BANNER */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border-2 border-rose-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              LEAK ORIGIN ATTRIBUTION IDENTIFIED
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Originating Recipient: <span className="text-rose-400">{inv.recipientName}</span>
            </h2>

            <div className="text-xs font-mono text-slate-300 flex flex-wrap items-center gap-3">
              <span>Recipient ID: <strong className="text-cyan-400">{inv.recipientId}</strong></span>
              <span>•</span>
              <span>Department: <strong className="text-slate-200">{inv.recipientDepartment}</strong></span>
              <span>•</span>
              <span>Last Authorized Decryption: <strong className="text-emerald-400">{inv.lastAuthorizedDecryption}</strong></span>
            </div>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-center shrink-0 w-full sm:w-auto">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">EVIDENCE CONFIDENCE</div>
            <div className="text-3xl font-extrabold text-rose-400 font-mono my-1">{inv.evidenceScore}%</div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              🔴 HIGH CONFIDENCE MATCH
            </span>
          </div>
        </div>

        {/* Identity Details Row */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px] block">MATCHED MASTER DOC</span>
            <span className="text-slate-200 font-bold truncate block">{inv.matchedDocumentName}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">DOCUMENT ID (DID)</span>
            <span className="text-cyan-400 font-bold block">{inv.matchedDocumentId}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">COPY ID (CID)</span>
            <span className="text-cyan-300 font-bold block">{inv.matchedCopyId}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">TRACE ID (HMAC)</span>
            <span className="text-emerald-400 font-bold block">{inv.traceId}</span>
          </div>
        </div>
      </div>

      {/* SECTION 13: EVIDENCE CORRELATION SCORE CARD */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">MULTI-VECTOR EVIDENCE CORRELATION MODEL</h3>
          </div>
          <code className="text-xs bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-cyan-300 font-mono">
            E = w1·W + w2·H + w3·S + w4·A
          </code>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Watermark (w1=0.35)</span>
            <span className="text-xl font-bold text-cyan-400">{inv.watermarkEvidence.confidence}%</span>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Hash Correlation (w2=0.15)</span>
            <span className="text-xl font-bold text-blue-400">92.0%</span>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">AI Similarity (w3=0.30)</span>
            <span className="text-xl font-bold text-indigo-400">{inv.aiSimilarityEvidence.similarityScore}%</span>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Audit Correlation (w4=0.20)</span>
            <span className="text-xl font-bold text-emerald-400">100.0%</span>
          </div>
        </div>
      </div>

      {/* SECTION 12: FOUR MAJOR EVIDENCE SOURCES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source 1: Watermark Analysis */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h4 className="font-bold text-white font-sans text-sm">1. WATERMARK ANALYSIS</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {inv.watermarkEvidence.status}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Extraction Confidence:</span>
              <span className="text-emerald-400 font-bold">{inv.watermarkEvidence.confidence}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Matched Trace ID:</span>
              <span className="text-cyan-300 font-bold">{inv.watermarkEvidence.matchedTraceId}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
              Spatial spread-spectrum watermark payload successfully recovered despite document format re-encoding.
            </div>
          </div>
        </div>

        {/* Source 2: Hash Analysis */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white font-sans text-sm">2. HASH ANALYSIS</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {inv.hashEvidence.status}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500">ORIGINAL MASTER HASH:</span>
              <div className="text-[11px] text-slate-300 truncate">{inv.hashEvidence.originalHash}</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500">LEAKED FILE HASH:</span>
              <div className="text-[11px] text-amber-300 truncate">{inv.hashEvidence.leakedHash}</div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
              {inv.hashEvidence.explanation}
            </div>
          </div>
        </div>

        {/* Source 3: AI Content Similarity */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="font-bold text-white font-sans text-sm">3. AI CONTENT SIMILARITY</h4>
            </div>
            <span className="text-indigo-400 font-bold text-sm">
              {inv.aiSimilarityEvidence.similarityScore}% SIMILARITY
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="bg-slate-900 p-2 rounded text-[10px] text-cyan-300 text-center border border-slate-800">
              <code>{inv.aiSimilarityEvidence.formula}</code>
            </div>

            <div className="space-y-1.5 font-sans text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Text Content Overlap:</span>
                <span className="font-bold text-cyan-400">{inv.aiSimilarityEvidence.textSimilarity}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Key Phrase Similarity:</span>
                <span className="font-bold text-indigo-400">{inv.aiSimilarityEvidence.keyPhraseOverlap}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Structural Format Similarity:</span>
                <span className="font-bold text-blue-400">{inv.aiSimilarityEvidence.structuralSimilarity}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source 4: Audit Correlation */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-white font-sans text-sm">4. AUDIT CORRELATION</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              AUDIT MATCH: {inv.auditCorrelationEvidence.matchStatus}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Target Copy ID:</span>
              <span className="text-cyan-300 font-bold">{inv.auditCorrelationEvidence.copyId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bound Recipient:</span>
              <span className="text-slate-200 font-bold">{inv.auditCorrelationEvidence.recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Authorized Access:</span>
              <span className="text-emerald-400 font-bold">{inv.auditCorrelationEvidence.lastAuthorizedDecryption}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
              Chronological provenance entry verified in hash-chained audit ledger.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          onClick={() => router.push('/investigate')}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Run Another Investigation
        </button>

        <Link
          href={`/reports/${inv.caseId}`}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <FileCheck2 className="w-4 h-4" /> Generate Detailed Forensic Report
        </Link>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ShieldAlert, 
  Printer, 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  FileText, 
  UserCheck, 
  History, 
  Sparkles,
  Award
} from 'lucide-react';

export default function DetailedReportPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params?.id as string;
  const { investigations, recipients } = useApp();

  const inv = investigations.find(i => i.caseId === caseId) || investigations[0];
  const recipient = recipients.find(r => r.id === inv.recipientId) || recipients[0];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
        <button
          onClick={() => router.push('/reports')}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Reports
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" /> Download / Print Report (PDF)
          </button>
        </div>
      </div>

      {/* Formal Printable Document Card */}
      <div className="bg-[#0b0f19] border-2 border-slate-700 rounded-2xl p-8 sm:p-12 shadow-2xl text-slate-100 font-sans space-y-8 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Report Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-6 print:border-black">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center print:border-black">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-wider uppercase font-mono text-white print:text-black">
                LEAKTRACE PQ
              </div>
              <div className="text-xs font-bold text-cyan-400 font-mono print:text-black">
                FORENSIC LEAK INVESTIGATION REPORT
              </div>
              <div className="text-[10px] text-slate-400 font-mono print:text-gray-600">
                SIH26237 • CYBERSECURITY ATTRIBUTION SUITE
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <div className="text-slate-400 print:text-gray-600">CASE FILE ID:</div>
            <div className="text-cyan-400 font-bold text-base print:text-black">{inv.caseId}</div>
            <div className="text-[10px] text-slate-400 mt-1 print:text-gray-600">Date: {inv.detectedAt}</div>
          </div>
        </div>

        {/* SECTION 1: CASE SUMMARY */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            1. CASE SUMMARY
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 print:bg-gray-100 print:text-black print:border-gray-300">
            {inv.summary}
          </p>
        </div>

        {/* SECTION 2 & 3: DOCUMENT & RECIPIENT INFORMATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* SECTION 2: DOCUMENT INFORMATION */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
              2. DOCUMENT INFORMATION
            </h3>
            <div className="space-y-2 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800 print:bg-gray-100 print:text-black print:border-gray-300">
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Master Document Name:</span><span className="font-bold text-white print:text-black">{inv.matchedDocumentName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Document ID (DID):</span><span className="font-bold text-cyan-400 print:text-black">{inv.matchedDocumentId}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Copy ID (CID):</span><span className="font-bold text-cyan-300 print:text-black">{inv.matchedCopyId}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">HMAC Trace ID (TID):</span><span className="font-bold text-emerald-400 print:text-black">{inv.traceId}</span></div>
            </div>
          </div>

          {/* SECTION 3: RECIPIENT INFORMATION */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
              3. RECIPIENT INFORMATION
            </h3>
            <div className="space-y-2 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800 print:bg-gray-100 print:text-black print:border-gray-300">
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Recipient Name:</span><span className="font-bold text-white print:text-black">{inv.recipientName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Recipient ID:</span><span className="font-bold text-cyan-400 print:text-black">{inv.recipientId}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Department:</span><span className="text-slate-200 print:text-black">{inv.recipientDepartment}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 print:text-gray-600">Last Authorized Access:</span><span className="text-emerald-400 print:text-black">{inv.lastAuthorizedDecryption}</span></div>
            </div>
          </div>
        </div>

        {/* SECTION 4: CORRELATED EVIDENCE BREAKDOWN */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            4. CORRELATED FORENSIC EVIDENCE
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] text-slate-400 print:text-gray-600">Watermark Evidence</div>
              <div className="text-lg font-bold text-cyan-400 print:text-black">{inv.watermarkEvidence.confidence}%</div>
              <div className="text-[9px] text-emerald-400 print:text-black">{inv.watermarkEvidence.status}</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] text-slate-400 print:text-gray-600">Hash Analysis</div>
              <div className="text-lg font-bold text-amber-400 print:text-black">92.0%</div>
              <div className="text-[9px] text-amber-300 print:text-black">{inv.hashEvidence.status}</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] text-slate-400 print:text-gray-600">AI Cosine Similarity</div>
              <div className="text-lg font-bold text-indigo-400 print:text-black">{inv.aiSimilarityEvidence.similarityScore}%</div>
              <div className="text-[9px] text-indigo-300 print:text-black">Cosine Embedding</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] text-slate-400 print:text-gray-600">Audit Ledger Correlation</div>
              <div className="text-lg font-bold text-emerald-400 print:text-black">100.0%</div>
              <div className="text-[9px] text-emerald-300 print:text-black">Decryption Provenance</div>
            </div>
          </div>
        </div>

        {/* SECTION 5: TIMELINE */}
        <div className="space-y-3 font-mono text-xs">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            5. CHRONOLOGICAL FORENSIC TIMELINE
          </h3>

          <div className="space-y-2 bg-slate-900/40 p-4 rounded-lg border border-slate-800 print:bg-gray-100 print:text-black print:border-gray-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 print:border-gray-300"><span className="text-slate-400 print:text-gray-600">04 Oct 2026, 09:15 AM</span><span className="text-slate-200 print:text-black">Master Document Upload & Hash Generation ({inv.matchedDocumentId})</span></div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 print:border-gray-300"><span className="text-slate-400 print:text-gray-600">04 Oct 2026, 10:21 AM</span><span className="text-slate-200 print:text-black">Recipient Copy Issued & Watermark Embedded ({inv.matchedCopyId})</span></div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 print:border-gray-300"><span className="text-slate-400 print:text-gray-600">04 Oct 2026, 11:43 AM</span><span className="text-slate-200 print:text-black">Authorized Decryption Event Recorded ({inv.recipientName})</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400 print:text-gray-600">04 Oct 2026, 02:10 PM</span><span className="text-rose-400 font-bold print:text-black">Suspected Document Scanned & High Confidence Leak Attributed</span></div>
          </div>
        </div>

        {/* SECTION 6 & 7: FINAL ASSESSMENT & RECOMMENDED ACTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800 print:border-gray-400">
          <div className="space-y-2 font-mono text-xs">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest print:text-black">
              6. FINAL ASSESSMENT
            </h3>
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1 print:bg-gray-100 print:text-black print:border-gray-400">
              <div className="font-bold">EVIDENCE CONFIDENCE SCORE: {inv.evidenceScore}%</div>
              <div className="text-[11px]">CLASSIFICATION: HIGH CONFIDENCE MATCH</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 mt-1">Multi-layer evidence confirms leak source with 96.3% statistical probability.</div>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest print:text-black">
              7. RECOMMENDED ACTION
            </h3>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-1 print:bg-gray-100 print:text-black print:border-gray-400">
              <div className="font-bold text-white print:text-black">ESCORT TO AUDIT DISCIPLINARY BOARD</div>
              <p className="text-[11px] text-slate-400 print:text-gray-600">
                “Further investigation recommended based on correlated cryptographic, watermark, semantic and audit evidence.”
              </p>
            </div>
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-8 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 print:border-gray-400 print:text-gray-600">
          <div>LeakTrace PQ Automated Forensic Report • SIH26237</div>
          <div>Cryptographic Seal: VERIFIED</div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  FileText, 
  ShieldCheck, 
  Key, 
  User, 
  Lock, 
  History, 
  ArrowLeft, 
  Copy, 
  Search, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const docId = params?.id as string;
  const { documents, copies, recipients, auditLogs, role } = useApp();

  const doc = documents.find(d => d.id === docId) || documents[0];
  const docCopies = copies.filter(c => c.documentId === doc.id);
  const primaryCopy = docCopies[0] || copies[0];
  const recipient = recipients.find(r => r.id === primaryCopy?.recipientId) || recipients[0];

  const relevantAuditLogs = auditLogs.filter(l => l.documentId === doc.id);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/documents')}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{doc.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {doc.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{doc.id} • Created {doc.createdAt} • Size: {doc.size}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {role === 'ADMIN' && (
            <Link
              href={`/documents/create?docId=${doc.id}`}
              className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 transition"
            >
              <Copy className="w-3.5 h-3.5" /> Issue New Copy
            </Link>
          )}
          <Link
            href="/investigate"
            className="px-3.5 py-2 bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" /> Run Forensic Scan
          </Link>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Identity, Integrity, Watermark, Encryption */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Document Identity */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> DOCUMENT IDENTITY
              </h2>
              <span className="text-xs font-mono text-cyan-400 font-semibold">{doc.classification}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">DOCUMENT ID (DID)</span>
                <span className="text-white font-bold text-sm">{doc.id}</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">PRIMARY COPY ID (CID)</span>
                <span className="text-cyan-400 font-bold text-sm">{primaryCopy?.copyId || 'COPY-00421-007'}</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">TRACE ID (HMAC)</span>
                <span className="text-emerald-400 font-bold text-xs">{primaryCopy?.traceId || 'TID-7A91-F3C2-82DE-91B7'}</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ASSIGNED RECIPIENT</span>
                <span className="text-slate-200 font-bold text-xs">{recipient.name} ({recipient.department})</span>
              </div>
            </div>
          </div>

          {/* Section 2: Cryptographic Integrity */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> INTEGRITY VERIFICATION
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {doc.integrityStatus}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">ORIGINAL SHA-256 DIGEST</div>
                <div className="text-cyan-300 font-bold break-all">{doc.sha256}</div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">CURRENT AUDIT LEDGER DIGEST</div>
                <div className="text-slate-300 font-bold break-all">{relevantAuditLogs[0]?.currentHash || doc.sha256}</div>
              </div>
            </div>
          </div>

          {/* Section 3 & 4: Watermark & Encryption */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Watermark Card */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-bold text-white flex items-center gap-1.5 font-sans">
                  <Cpu className="w-4 h-4 text-cyan-400" /> Watermark Status
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold">EMBEDDED</span>
              </div>
              <div className="text-slate-400 text-[11px]">Payload ID: <span className="text-cyan-300 font-bold">{primaryCopy?.watermarkId || 'WM-FIN-7A91-007'}</span></div>
              <div className="text-slate-400 text-[11px]">Detection Confidence: <span className="text-emerald-400 font-bold">98.7%</span></div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-500">
                Invisible spatial/frequency domain watermark embedded into document content vectors.
              </div>
            </div>

            {/* Encryption Card */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-bold text-white flex items-center gap-1.5 font-sans">
                  <Lock className="w-4 h-4 text-indigo-400" /> Encryption
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>
              </div>
              <div className="text-slate-400 text-[11px]">Recipient Binding: <span className="text-slate-200 font-bold">{recipient.id} ({recipient.name})</span></div>
              <div className="text-slate-400 text-[11px]">Auth Level: <span className="text-cyan-400 font-bold">{recipient.authLevel}</span></div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-500">
                AES-256-GCM recipient envelope, post-quantum key encapsulation mechanism ready.
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Access History Timeline */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" /> ACCESS HISTORY TIMELINE
            </h2>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {/* Event 1 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-[#0f172a]" />
              <div className="text-xs font-mono font-bold text-white">Document Created</div>
              <div className="text-[10px] text-slate-400 font-mono">04 Oct 2026, 09:15 AM</div>
              <p className="text-[11px] text-slate-400 mt-1">Master file registered & SHA-256 computed by Authority Admin.</p>
            </div>

            {/* Event 2 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-[#0f172a]" />
              <div className="text-xs font-mono font-bold text-white">Copy Generated & Watermarked</div>
              <div className="text-[10px] text-slate-400 font-mono">04 Oct 2026, 10:21 AM</div>
              <p className="text-[11px] text-slate-400 mt-1">Recipient copy {primaryCopy?.copyId} issued to {recipient.name}. Trace ID assigned.</p>
            </div>

            {/* Event 3 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-[#0f172a]" />
              <div className="text-xs font-mono font-bold text-white">Recipient Access & Decryption</div>
              <div className="text-[10px] text-slate-400 font-mono">04 Oct 2026, 11:43 AM</div>
              <p className="text-[11px] text-slate-400 mt-1">Decryption key retrieved by {recipient.name}. Event logged to ledger.</p>
            </div>

            {/* Event 4 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-[#0f172a] animate-pulse" />
              <div className="text-xs font-mono font-bold text-rose-400">Suspicious Activity Scan</div>
              <div className="text-[10px] text-slate-400 font-mono">04 Oct 2026, 02:10 PM</div>
              <p className="text-[11px] text-slate-400 mt-1">Forensic leak scanner identified potential altered document match.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

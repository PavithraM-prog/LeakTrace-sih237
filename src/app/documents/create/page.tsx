'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Copy, 
  ShieldCheck, 
  Key, 
  User, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText,
  Cpu,
  Layers,
  Check
} from 'lucide-react';
import { generateTraceID } from '@/lib/utils';

function CreateCopyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { documents, recipients, createCopy } = useApp();

  const docIdParam = searchParams.get('docId');
  const [selectedDocId, setSelectedDocId] = useState<string>(docIdParam || documents[0]?.id || 'DID-2026-00421');
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>(recipients[0]?.id || 'R-1092');

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];
  const selectedRecipient = recipients.find(r => r.id === selectedRecipientId) || recipients[0];

  // Calculated IDs
  const [copyId, setCopyId] = useState('COPY-00421-007');
  const [traceId, setTraceId] = useState('TID-7A91-F3C2-82DE-91B7');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdResult, setCreatedResult] = useState<any | null>(null);

  useEffect(() => {
    if (selectedDoc && selectedRecipient) {
      const cid = `COPY-${selectedDoc.id.replace('DID-2026-', '')}-${String(Math.floor(Math.random() * 90 + 10)).padStart(3, '0')}`;
      const tid = generateTraceID(selectedDoc.id, cid);
      setCopyId(cid);
      setTraceId(tid);
    }
  }, [selectedDocId, selectedRecipientId, selectedDoc, selectedRecipient]);

  const handleCreateCopy = async () => {
    setIsSubmitting(true);
    setTimeout(async () => {
      const result = await createCopy(selectedDocId, selectedRecipientId);
      setIsSubmitting(false);
      setCreatedResult(result);
    }, 900);
  };

  return (
    <div>
      {!createdResult ? (
        <div className="space-y-6">
          {/* Document Picker Banner */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Target Confidential Document</label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-100 text-xs font-bold rounded-md px-3 py-1.5 focus:outline-none focus:border-cyan-500 block mt-1"
                >
                  {documents.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.id}) - [{d.classification}]
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-right text-xs font-mono">
              <div className="text-slate-400">SHA-256 Digest:</div>
              <div className="text-cyan-400 font-bold truncate max-w-[220px]">{selectedDoc.sha256}</div>
            </div>
          </div>

          {/* 7-Step Configuration Cards */}
          <div className="space-y-4">
            {/* Step 1: Select Recipient */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-white">Select Recipient</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Target Recipient Persona</label>
                  <select
                    value={selectedRecipientId}
                    onChange={(e) => setSelectedRecipientId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-lg p-2.5 focus:outline-none focus:border-cyan-500 font-medium"
                  >
                    {recipients.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.id}) - {r.department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Recipient ID:</span>
                    <span className="text-cyan-400 font-bold">{selectedRecipient.id}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Department:</span>
                    <span className="text-slate-200">{selectedRecipient.department}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Email Address:</span>
                    <span className="text-slate-300">{selectedRecipient.email}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Authorization:</span>
                    <span className="text-emerald-400 font-bold">{selectedRecipient.authLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 & 3: Copy ID & Trace ID Generation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 2: Copy ID */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="font-bold text-sm text-white">Generate Copy ID (CID)</h3>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono">
                  <div className="text-[10px] text-slate-400 uppercase">UNIQUE COPY IDENTIFIER</div>
                  <div className="text-lg font-bold text-cyan-400 tracking-wider mt-1">{copyId}</div>
                  <p className="text-[10px] text-slate-500 mt-1">Binds specific issuance instance to {selectedRecipient.name}.</p>
                </div>
              </div>

              {/* Step 3: Trace ID & Formula */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="font-bold text-sm text-white">Generate Trace ID (TID)</h3>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono">
                  <div className="text-[10px] text-slate-400 uppercase">HMAC ATTRIBUTION TRACE ID</div>
                  <div className="text-base font-bold text-emerald-400 tracking-wider mt-1">{traceId}</div>
                  <div className="mt-2 text-[10px] bg-slate-950 p-2 rounded border border-slate-800 text-cyan-300">
                    <code>TID = HMAC<sub>k</sub>(DID || CID || N)</code>
                    <div className="text-slate-400 mt-1 text-[9px]">
                      DID = {selectedDoc.id} | CID = {copyId} | N = Nonce
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps 4, 5, 6, 7 Verification Checklist */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3 font-mono text-xs">
              <h3 className="font-bold text-sm text-white font-sans border-b border-slate-800 pb-2">Cryptographic Pipeline Verification</h3>

              {/* Step 4 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-bold text-[10px] flex items-center justify-center">4</span>
                  <div>
                    <span className="text-slate-200 font-bold">Document Integrity Digest SHA-256(F)</span>
                    <div className="text-[10px] text-slate-400 truncate max-w-[300px]">{selectedDoc.sha256}</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED
                </span>
              </div>

              {/* Step 5 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-bold text-[10px] flex items-center justify-center">5</span>
                  <div>
                    <span className="text-slate-200 font-bold">Invisible Spatial Watermark</span>
                    <div className="text-[10px] text-slate-400">Embedding non-perceptible payload WM-{selectedRecipient.department.substring(0,3)}-{traceId.substring(4,8)}</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> EMBEDDED
                </span>
              </div>

              {/* Step 6 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-bold text-[10px] flex items-center justify-center">6</span>
                  <div>
                    <span className="text-slate-200 font-bold">Recipient-Specific Encryption</span>
                    <div className="text-[10px] text-slate-400">Bound to recipient key pair ({selectedRecipient.authLevel})</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> ENABLED
                </span>
              </div>

              {/* Step 7 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-bold text-[10px] flex items-center justify-center">7</span>
                  <div>
                    <span className="text-slate-200 font-bold">Audit Ledger Provenance Record</span>
                    <div className="text-[10px] text-slate-400">Creating block entry in hash-chained audit ledger</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> RECORDED
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCreateCopy}
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl shadow-cyan-500/25 flex items-center gap-3 transition transform hover:-translate-y-0.5"
            >
              <Copy className="w-5 h-5" />
              {isSubmitting ? 'GENERATING PROTECTED COPY...' : 'CREATE PROTECTED COPY'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Protected Copy Successfully Created</h2>
            <p className="text-xs text-slate-400 mt-1">Document is watermarked, encrypted, and bound to recipient identity.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-xs max-w-xl mx-auto text-left space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Document ID (DID):</span>
              <span className="text-white font-bold">{createdResult.documentId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Copy ID (CID):</span>
              <span className="text-cyan-400 font-bold">{createdResult.copyId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Trace ID (TID):</span>
              <span className="text-emerald-400 font-bold">{createdResult.traceId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Bound Recipient:</span>
              <span className="text-slate-200">{createdResult.recipientName} ({createdResult.recipientDepartment})</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Watermark Payload ID:</span>
              <span className="text-cyan-300">{createdResult.watermarkId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Encryption Status:</span>
              <span className="text-emerald-400 font-bold">RECIPIENT BOUND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">SHA-256 Hash:</span>
              <span className="text-slate-400 truncate max-w-[200px]">{createdResult.sha256}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCreatedResult(null);
              }}
              className="px-5 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold rounded-lg text-xs"
            >
              Issue Another Copy
            </button>
            <button
              onClick={() => router.push('/activity')}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2"
            >
              View Audit Ledger Entry <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateCopyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Traceable Document Copy</h1>
          <span className="bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-cyan-500/30">
            ATTRIBUTION ENGINE
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Generate recipient-bound, watermarked and encrypted copies with HMAC Trace ID provenance.</p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs font-mono">Loading Attribution Configurator...</div>}>
        <CreateCopyForm />
      </Suspense>
    </div>
  );
}

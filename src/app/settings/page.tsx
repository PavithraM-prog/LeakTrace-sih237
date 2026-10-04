'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Server,
  FileCode2
} from 'lucide-react';

export default function SecuritySettingsPage() {
  const securityFeatures = [
    { title: 'SHA-256 Integrity Verification', status: 'ACTIVE', desc: 'Computes cryptographic binary hash digests of all uploaded master documents to ensure zero untracked modifications.' },
    { title: 'HMAC-based Trace ID Engine', status: 'ACTIVE', desc: 'Generates deterministic recipient-bound Trace IDs via HMAC-SHA256(DID || CID || Nonce) for unambiguous leak attribution.' },
    { title: 'Recipient-Specific Document Copies', status: 'ACTIVE', desc: 'Isolates issuance instances into unique copies (CID) mapped to recipient authorization levels.' },
    { title: 'Invisible Spatial Watermarking', status: 'ACTIVE', desc: 'Embeds spread-spectrum frequency payloads containing Trace ID signatures into document assets.' },
    { title: 'Post-Quantum Cryptography Ready', status: 'ARCHITECTURE READY', desc: 'Designed to support lattice-based Kyber/Dilithium key encapsulation mechanisms (ML-KEM/ML-DSA).' },
    { title: 'Role-Based Access Control (RBAC)', status: 'ACTIVE', desc: 'Enforces strict privilege boundaries between Security Authority, Forensic Investigator, and Recipient personas.' },
    { title: 'Tamper-Evident Audit Ledger', status: 'ACTIVE', desc: 'Stores decryption provenance events in a SHA-256 hash-chained immutable audit log.' },
    { title: 'Secure Object Storage Envelope', status: 'ACTIVE', desc: 'AES-256-GCM symmetric document payload encryption bound to recipient key pairs.' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Security & Post-Quantum Architecture</h1>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-cyan-500/30">
              CYBERSECURITY DEFENSE SUITE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Cryptographic verification standards, post-quantum readiness specifications, and system parameters.</p>
        </div>
      </div>

      {/* Post-Quantum Architecture Section */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Post-Quantum Cryptography Integration</h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                PQ Crypto Integration — Architecture Ready / Prototype Simulation
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Each recipient receives a uniquely attributable protected copy. The LeakTrace PQ platform architecture is designed to support post-quantum cryptographic algorithms for secure document distribution against future quantum decryption threats.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-300">ML-KEM-768 (CRYSTALS-Kyber) Key Exchange</span>
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-blue-300">ML-DSA-65 (CRYSTALS-Dilithium) Signatures</span>
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-300">HMAC-SHA256 Attribution Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features Checklist */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> SYSTEM SECURITY & INTEGRITY MATRIX
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feat, idx) => (
            <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {feat.title}
                </span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                  feat.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {feat.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono pl-6">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

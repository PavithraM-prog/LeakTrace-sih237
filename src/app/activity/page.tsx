'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  History, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Search, 
  Database,
  RefreshCw,
  Cpu
} from 'lucide-react';

export default function ActivityLedgerPage() {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log => 
    log.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.copyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.traceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Tamper-Evident Audit Ledger</h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> LEDGER INTEGRITY: VERIFIED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Cryptographic hash-chained event log ensuring immutable decryption provenance and audit attribution.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Blocks: {auditLogs.length}</span>
          </div>
        </div>
      </div>

      {/* Visual Hash-Chain Representation */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> HASH-CHAIN PROVENANCE ARCHITECTURE
          </h2>
          <span className="text-[11px] font-mono text-slate-400">SHA-256 Block Chaining</span>
        </div>

        {/* Blocks Horizontal Scroll */}
        <div className="overflow-x-auto py-2">
          <div className="flex items-center gap-4 min-w-max">
            {auditLogs.slice().reverse().map((log, idx) => (
              <React.Fragment key={log.eventId}>
                {idx > 0 && (
                  <div className="flex flex-col items-center justify-center text-cyan-400">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">prev_hash</span>
                  </div>
                )}

                <div className="w-64 bg-slate-900/90 border border-slate-800 rounded-xl p-4 font-mono text-xs hover:border-cyan-500/50 transition shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-cyan-400 font-bold">BLOCK 00{idx + 1}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      log.eventType === 'LEAK_DETECTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {log.eventType}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-slate-300 font-sans font-semibold truncate">{log.documentName}</div>
                    <div className="text-slate-400 text-[10px]">Actor: {log.actor}</div>
                    <div className="text-slate-400 text-[10px]">{log.timestamp}</div>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <div className="text-[9px] text-slate-500">PREV HASH:</div>
                      <div className="text-[9px] text-slate-400 truncate">{log.previousHash}</div>
                      <div className="text-[9px] text-slate-500">CURR HASH:</div>
                      <div className="text-[9px] text-cyan-300 font-bold truncate">{log.currentHash}</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#0f172a] border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-full sm:w-96 focus-within:border-cyan-500/60">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search event type, actor, document, Trace ID..."
            className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
          />
        </div>
        <span className="text-xs font-mono text-slate-400 hidden sm:block">
          Audit Records: <span className="text-cyan-400 font-bold">{filteredLogs.length}</span>
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Copy ID</th>
                <th className="py-3 px-4">Trace ID</th>
                <th className="py-3 px-4">Previous Hash</th>
                <th className="py-3 px-4">Current Hash</th>
                <th className="py-3 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.eventId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>

                  <td className="py-3 px-4 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.eventType === 'LEAK_DETECTED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      log.eventType === 'DOCUMENT_DECRYPTED' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      log.eventType === 'COPY_CREATED' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {log.eventType}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-sans font-semibold text-slate-200">{log.actor}</td>

                  <td className="py-3 px-4 font-sans text-slate-300 truncate max-w-[160px]">{log.documentName}</td>

                  <td className="py-3 px-4 text-cyan-400 font-bold">{log.copyId}</td>

                  <td className="py-3 px-4 text-slate-300 text-[11px]">{log.traceId}</td>

                  <td className="py-3 px-4 text-slate-500 text-[10px] truncate max-w-[100px]">{log.previousHash}</td>

                  <td className="py-3 px-4 text-cyan-300 text-[10px] truncate max-w-[100px]">{log.currentHash}</td>

                  <td className="py-3 px-4 text-right font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.integrity === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {log.integrity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  Search, 
  Key, 
  FileText, 
  History, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { Recipient } from '@/types';

export default function RecipientsPage() {
  const { recipients, copies, auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);

  const filteredRecipients = recipients.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recipientCopies = selectedRecipient ? copies.filter(c => c.recipientId === selectedRecipient.id) : [];
  const recipientLogs = selectedRecipient ? auditLogs.filter(l => l.actor.includes(selectedRecipient.name) || l.copyId.includes(selectedRecipient.id)) : [];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Recipient Identity & Access Directory</h1>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-cyan-500/30">
              RECIPIENTS ({recipients.length})
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Authorized personas, assigned document Trace IDs, decryption event logs, and risk profiles.</p>
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
            placeholder="Search recipient name, R-109..., department..."
            className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
          />
        </div>
        <span className="text-xs font-mono text-slate-400 hidden sm:block">
          Active Personas: <span className="text-cyan-400 font-bold">{filteredRecipients.length}</span>
        </span>
      </div>

      {/* Recipient Directory Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Recipient ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Authorization</th>
                <th className="py-3 px-4">Assigned Docs</th>
                <th className="py-3 px-4">Last Access</th>
                <th className="py-3 px-4">Risk Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredRecipients.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-bold text-cyan-400">{rec.id}</td>

                  <td className="py-3 px-4 font-sans font-semibold text-slate-100 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0">
                      {rec.name.charAt(0)}
                    </div>
                    <div>
                      <div>{rec.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{rec.email}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-sans text-slate-300">{rec.department}</td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                      {rec.authLevel}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-200">{rec.assignedDocsCount} documents</td>

                  <td className="py-3 px-4 text-slate-400">{rec.lastAccess}</td>

                  <td className="py-3 px-4 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.riskStatus === 'High Risk' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      rec.riskStatus === 'Flagged' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {rec.riskStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedRecipient(rec)}
                      className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-[11px] font-semibold transition"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recipient Profile Modal */}
      {selectedRecipient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold flex items-center justify-center text-sm">
                  {selectedRecipient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{selectedRecipient.name}</h2>
                  <p className="text-xs text-slate-400 font-mono">{selectedRecipient.id} • {selectedRecipient.department} • {selectedRecipient.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecipient(null)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Assigned Trace IDs */}
            <div className="space-y-3 font-mono text-xs">
              <h3 className="font-bold text-sm text-white font-sans flex items-center gap-2 border-b border-slate-800 pb-2">
                <Key className="w-4 h-4 text-cyan-400" /> Assigned Document Copies & Trace IDs
              </h3>

              {recipientCopies.length > 0 ? (
                <div className="space-y-2">
                  {recipientCopies.map((copy) => (
                    <div key={copy.copyId} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-sans font-semibold text-slate-200">{copy.documentName}</div>
                        <div className="text-[10px] text-cyan-400 font-bold">{copy.copyId}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold">{copy.traceId}</div>
                        <div className="text-[10px] text-slate-500">Issued: {copy.createdAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-900 rounded-lg text-slate-400 text-center">
                  No active copies issued to this recipient persona.
                </div>
              )}
            </div>

            {/* Access & Decryption History */}
            <div className="space-y-3 font-mono text-xs">
              <h3 className="font-bold text-sm text-white font-sans flex items-center gap-2 border-b border-slate-800 pb-2">
                <History className="w-4 h-4 text-emerald-400" /> Audit Decryption History
              </h3>

              <div className="space-y-2">
                {recipientLogs.map((log) => (
                  <div key={log.eventId} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-cyan-300 font-bold">{log.eventType}</span>
                      <span className="text-slate-400 ml-2 font-sans">{log.documentName}</span>
                    </div>
                    <span className="text-slate-400">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecipient(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

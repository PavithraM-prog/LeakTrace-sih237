'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FileCheck2, Search, ExternalLink, Printer, ShieldAlert } from 'lucide-react';

export default function ReportsListPage() {
  const { investigations } = useApp();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Forensic Investigation Reports</h1>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-cyan-500/30">
              REPORTS ARCHIVE ({investigations.length})
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Official forensic evidence briefs generated for authority escalation.</p>
        </div>

        <Link
          href="/investigate"
          className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs rounded-lg shadow-lg flex items-center gap-2"
        >
          <Search className="w-3.5 h-3.5" /> Start New Leak Analysis
        </Link>
      </div>

      {/* Reports Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Suspected File</th>
                <th className="py-3 px-4">Originating Recipient</th>
                <th className="py-3 px-4">Trace ID</th>
                <th className="py-3 px-4">Evidence Score</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {investigations.map((inv) => (
                <tr key={inv.caseId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-bold text-cyan-400">{inv.caseId}</td>
                  <td className="py-3 px-4 font-sans text-slate-200 font-semibold">{inv.suspectedFile}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">{inv.recipientName} ({inv.recipientDepartment})</td>
                  <td className="py-3 px-4 text-emerald-400 text-[11px]">{inv.traceId}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-rose-400">{inv.evidenceScore}% Confidence</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{inv.detectedAt}</td>
                  <td className="py-3 px-4 text-right font-sans">
                    <Link
                      href={`/reports/${inv.caseId}`}
                      className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-[11px] font-semibold inline-flex items-center gap-1.5 transition"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" /> Open Report
                    </Link>
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

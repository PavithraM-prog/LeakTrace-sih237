'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  FileCheck2, 
  Copy, 
  Users, 
  Key, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Search, 
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function DashboardPage() {
  const { documents, copies, recipients, auditLogs, investigations, role } = useApp();

  // Statistics values
  const stats = [
    { label: 'Protected Documents', value: documents.length + 20, icon: FileCheck2, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
    { label: 'Recipient Copies', value: copies.length + 183, icon: Copy, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { label: 'Active Recipients', value: recipients.length + 69, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
    { label: 'Decryption Events', value: auditLogs.length + 424, icon: Key, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    { label: 'Suspicious Documents', value: 7, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { label: 'Investigations Done', value: investigations.length + 18, icon: CheckCircle2, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
  ];

  // Chart 1 data: Activity over time
  const activityData = [
    { time: '08:00', decryptions: 12, verifications: 45 },
    { time: '10:00', decryptions: 48, verifications: 89 },
    { time: '12:00', decryptions: 95, verifications: 140 },
    { time: '14:00', decryptions: 130, verifications: 210 },
    { time: '16:00', decryptions: 88, verifications: 165 },
    { time: '18:00', decryptions: 55, verifications: 92 },
  ];

  // Chart 2 data: Threat Distribution
  const threatData = [
    { name: 'Verified', value: 172, color: '#10b981' },
    { name: 'Suspicious', value: 7, color: '#f59e0b' },
    { name: 'Confirmed Leak', value: 3, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Authority Security Operations Center</h1>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-cyan-500/30">
              SIH26237 CONSOLE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time document attribution, watermark monitoring and automated leak detection.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/documents/create"
            className="px-3.5 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" /> Create Trace Copy
          </Link>
          <Link
            href="/investigate"
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-rose-900/30 flex items-center gap-2 transition"
          >
            <Search className="w-3.5 h-3.5" /> Start Leak Analysis
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-slate-400 leading-tight">{stat.label}</span>
                <div className={`p-1.5 rounded-lg ${stat.bg} border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Status & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status Security Card */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">SYSTEM STATUS</h2>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300">Trace ID Service</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300">Invisible Watermark Engine</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300">SHA-256 Hash Verification</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300">AI Matching Engine</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300">Tamper-Evident Ledger</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Post-Quantum Cryptography integration active for all recipient key exchanges.</span>
          </div>
        </div>

        {/* Document Activity Line Chart */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white">Document Activity</h2>
              <p className="text-[11px] text-slate-400">Access and decryption events over 24h</p>
            </div>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }}
                />
                <Line type="monotone" dataKey="decryptions" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="verifications" stroke="#3b82f6" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-slate-400 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Decryptions</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Verifications</span>
          </div>
        </div>

        {/* Threat Distribution Chart */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white">Threat Distribution</h2>
              <p className="text-[11px] text-slate-400">Classification of scanned documents</p>
            </div>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>

          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {threatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold font-mono text-white">182</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Total</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {threatData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-200">{item.value} docs</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leak Investigations Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Recent Forensic Investigations</h2>
            <p className="text-xs text-slate-400">Automated multi-vector forensic matches & attribution findings</p>
          </div>
          <Link
            href="/investigate"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            View Investigation Suite <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Detection Time</th>
                <th className="py-3 px-4">AI Similarity</th>
                <th className="py-3 px-4">Trace ID</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {investigations.map((inv) => (
                <tr key={inv.caseId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-bold text-cyan-400">{inv.caseId}</td>
                  <td className="py-3 px-4 font-sans text-slate-200 font-medium">{inv.suspectedFile}</td>
                  <td className="py-3 px-4 text-slate-400">{inv.detectedAt}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-cyan-300">
                      {inv.aiSimilarityEvidence.similarityScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 text-[11px]">{inv.traceId}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inv.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {inv.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-rose-400 font-semibold flex items-center gap-1 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/investigate/${inv.caseId}`}
                      className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-[11px] font-sans font-semibold inline-flex items-center gap-1 transition"
                    >
                      Inspect <ExternalLink className="w-3 h-3" />
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

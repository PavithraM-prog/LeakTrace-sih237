'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  FileText, 
  Users, 
  History, 
  Search, 
  FileCheck, 
  Shield, 
  UserCheck, 
  PlusCircle,
  Cpu
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole, loadDemoScenario } = useApp();

  // Hide sidebar on landing page `/`
  if (pathname === '/') return null;

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'INVESTIGATOR', 'RECIPIENT'] },
    { label: 'Documents', href: '/documents', icon: FileText, roles: ['ADMIN', 'INVESTIGATOR', 'RECIPIENT'] },
    { label: 'Create Copy', href: '/documents/create', icon: PlusCircle, roles: ['ADMIN'] },
    { label: 'Recipients', href: '/recipients', icon: Users, roles: ['ADMIN', 'INVESTIGATOR'] },
    { label: 'Audit Ledger', href: '/activity', icon: History, roles: ['ADMIN', 'INVESTIGATOR', 'RECIPIENT'] },
    { label: 'Investigate Leak', href: '/investigate', icon: Search, roles: ['ADMIN', 'INVESTIGATOR'], highlight: true },
    { label: 'Reports', href: '/reports', icon: FileCheck, roles: ['ADMIN', 'INVESTIGATOR'] },
    { label: 'Security & PQ', href: '/settings', icon: Shield, roles: ['ADMIN', 'INVESTIGATOR'] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-[#0b0f19] border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b0f19] rounded-[7px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-wider text-white">LeakTrace</span>
              <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-cyan-500/30">PQ</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">ENTERPRISE SECURITY PLATFORM</p>
          </div>
        </div>

        {/* Demo Preset Action */}
        <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-900/40">
          <button
            onClick={() => {
              loadDemoScenario();
              alert('Loaded realistic demo scenario!');
            }}
            className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 rounded-md border border-cyan-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Load Demo Scenario
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href) && item.href !== '/documents/create');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? item.highlight 
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm'
                      : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : item.highlight
                      ? 'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (item.highlight ? 'text-rose-400' : 'text-cyan-400') : 'text-slate-400'}`} />
                <span className="flex-1">{item.label}</span>
                {item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Switcher Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Active Role</span>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live SOC
          </span>
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="w-full bg-[#0b0f19] border border-slate-700 text-slate-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-medium"
        >
          <option value="ADMIN">Authority (Admin)</option>
          <option value="INVESTIGATOR">Forensic Investigator</option>
          <option value="RECIPIENT">Document Recipient</option>
        </select>
        <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 font-mono">
          <UserCheck className="w-3 h-3 text-cyan-400" />
          <span>{role === 'ADMIN' ? 'Full Authority Console' : role === 'INVESTIGATOR' ? 'Forensic Suite Only' : 'Recipient Decryption Portal'}</span>
        </div>
      </div>
    </aside>
  );
};

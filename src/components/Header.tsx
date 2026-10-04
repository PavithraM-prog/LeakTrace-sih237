'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, Bell, ShieldCheck, User, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { role } = useApp();

  if (pathname === '/') return null;

  // Breadcrumb generator
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return [{ label: 'Console', href: '/dashboard' }];

    return parts.map((part, index) => {
      const href = '/' + parts.slice(0, index + 1).join('/');
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === 'dashboard') label = 'Dashboard';
      if (part === 'documents') label = 'Documents';
      if (part === 'create') label = 'Create Copy';
      if (part === 'activity') label = 'Audit Ledger';
      if (part === 'investigate') label = 'Leak Center';
      if (part === 'reports') label = 'Reports';
      if (part === 'recipients') label = 'Recipients';
      if (part === 'settings') label = 'Security Settings';
      return { label, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-mono">SOC</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
            <span
              onClick={() => router.push(crumb.href)}
              className={`cursor-pointer font-medium ${
                idx === breadcrumbs.length - 1 ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-3.5 py-1.5 w-72 focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/30 transition-all">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search DID, Trace ID, Recipient..."
          className="bg-transparent border-none text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
        />
      </div>

      {/* Right: Security Status & User Profile */}
      <div className="flex items-center gap-4">
        {/* System Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ledger & Watermark Engine: ONLINE</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </button>

        {/* User Role Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-200">
              {role === 'ADMIN' ? 'Authority Admin' : role === 'INVESTIGATOR' ? 'Senior Forensic Lead' : 'Arun Kumar (Recipient)'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {role === 'ADMIN' ? 'Role: Security Admin' : role === 'INVESTIGATOR' ? 'Role: Investigator' : 'Role: Document Recipient'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

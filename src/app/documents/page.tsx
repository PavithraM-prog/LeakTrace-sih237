'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  FileText, 
  UploadCloud, 
  Search, 
  ShieldCheck, 
  Copy, 
  History, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { calculateSHA256 } from '@/lib/utils';

export default function DocumentsPage() {
  const { documents, addDocument, role } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Upload form state
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadClassification, setUploadClassification] = useState<'TOP SECRET' | 'CONFIDENTIAL' | 'RESTRICTED' | 'INTERNAL ONLY'>('CONFIDENTIAL');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessDoc, setUploadSuccessDoc] = useState<any | null>(null);

  const filteredDocs = documents.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.classification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    setIsUploading(true);
    const mockHash = await calculateSHA256(uploadFileName + Date.now());
    
    setTimeout(async () => {
      const createdDoc = await addDocument({
        name: uploadFileName.endsWith('.pdf') || uploadFileName.endsWith('.docx') ? uploadFileName : `${uploadFileName}.pdf`,
        classification: uploadClassification,
        sha256: mockHash,
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      });

      setIsUploading(false);
      setUploadSuccessDoc(createdDoc);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Protected Master Documents</h1>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-cyan-500/30">
              INVENTORY ({documents.length})
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Master confidential repository with cryptographic SHA-256 integrity verification.</p>
        </div>

        {role === 'ADMIN' && (
          <button
            onClick={() => {
              setUploadSuccessDoc(null);
              setUploadFileName('');
              setShowUploadModal(true);
            }}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Upload Master Document
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#0f172a] border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-full sm:w-96 focus-within:border-cyan-500/60">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search document name, DID-2026-..., classification..."
            className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
          />
        </div>

        <div className="text-xs font-mono text-slate-400 hidden md:block">
          Showing <span className="text-cyan-400 font-bold">{filteredDocs.length}</span> documents
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Document ID</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Copies</th>
                <th className="py-3 px-4">Recipients</th>
                <th className="py-3 px-4">Integrity (SHA-256)</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-sans font-medium text-slate-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">{doc.name}</div>
                      <div className="text-[10px] text-slate-500">{doc.size} • Created {doc.createdAt}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-cyan-400 font-bold">{doc.id}</td>

                  <td className="py-3 px-4 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doc.classification === 'TOP SECRET' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      doc.classification === 'CONFIDENTIAL' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {doc.classification}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-200">{doc.copyCount} Copies</td>

                  <td className="py-3 px-4 text-slate-200">{doc.recipientCount} Recipients</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{doc.integrityStatus}</span>
                    </div>
                    <div className="text-[9px] text-slate-500 truncate max-w-[120px]">{doc.sha256}</div>
                  </td>

                  <td className="py-3 px-4 text-slate-400">{doc.lastActivity}</td>

                  <td className="py-3 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1 font-sans">
                    <Link
                      href={`/documents/${doc.id}`}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-[11px] inline-flex items-center gap-1 transition"
                    >
                      View
                    </Link>
                    {role === 'ADMIN' && (
                      <Link
                        href={`/documents/create?docId=${doc.id}`}
                        className="px-2 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-[11px] font-semibold inline-flex items-center gap-1 transition"
                      >
                        <Copy className="w-3 h-3" /> Create Copy
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Master Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">Upload Confidential Document</h2>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {!uploadSuccessDoc ? (
              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Document File Name</label>
                  <input
                    type="text"
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    placeholder="e.g. Cabinet_Policy_Report_2026.pdf"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Classification Level</label>
                  <select
                    value={uploadClassification}
                    onChange={(e: any) => setUploadClassification(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                  >
                    <option value="TOP SECRET">TOP SECRET</option>
                    <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                    <option value="RESTRICTED">RESTRICTED</option>
                    <option value="INTERNAL ONLY">INTERNAL ONLY</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-400 space-y-1">
                  <div className="font-mono text-[11px] text-cyan-400">Automated Pipeline Operations:</div>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-400">
                    <li>Compute SHA-256 cryptographic digest</li>
                    <li>Generate Master Document Identifier (DID)</li>
                    <li>Register initial provenance block in audit ledger</li>
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg flex items-center gap-2"
                  >
                    {isUploading ? 'Registering...' : 'Register Master Document'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">Master Document Registered</h3>
                    <p className="text-xs text-emerald-300">Cryptographic hash calculated and added to tamper-evident audit ledger.</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Document Name:</span>
                    <span className="text-white font-bold">{uploadSuccessDoc.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Document ID (DID):</span>
                    <span className="text-cyan-400 font-bold">{uploadSuccessDoc.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SHA-256 Digest:</span>
                    <span className="text-slate-300 truncate max-w-[200px]">{uploadSuccessDoc.sha256}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">File Size:</span>
                    <span className="text-slate-300">{uploadSuccessDoc.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Integrity Status:</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 text-xs font-semibold"
                  >
                    Close
                  </button>
                  <Link
                    href={`/documents/create?docId=${uploadSuccessDoc.id}`}
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Issue Recipient Copy
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

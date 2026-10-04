'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, DocumentItem, Recipient, DocumentCopy, AuditEvent, Investigation } from '@/types';
import { INITIAL_DOCUMENTS, INITIAL_RECIPIENTS, INITIAL_COPIES, INITIAL_AUDIT_LOGS, DEMO_INVESTIGATION } from '@/lib/mockData';
import { generateTraceID, calculateSHA256, calculateEvidenceScore } from '@/lib/utils';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  documents: DocumentItem[];
  recipients: Recipient[];
  copies: DocumentCopy[];
  auditLogs: AuditEvent[];
  investigations: Investigation[];
  activeInvestigation: Investigation | null;
  setActiveInvestigation: (inv: Investigation | null) => void;
  
  // Actions
  addDocument: (doc: Omit<DocumentItem, 'id' | 'createdAt' | 'status' | 'copyCount' | 'recipientCount' | 'integrityStatus' | 'lastActivity'>) => Promise<DocumentItem>;
  createCopy: (documentId: string, recipientId: string) => Promise<DocumentCopy>;
  recordDecryptionEvent: (copyId: string, actor: string) => void;
  runLeakAnalysis: (fileName: string, fileContent?: string) => Promise<Investigation>;
  loadDemoScenario: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [recipients, setRecipients] = useState<Recipient[]>(INITIAL_RECIPIENTS);
  const [copies, setCopies] = useState<DocumentCopy[]>(INITIAL_COPIES);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);
  const [investigations, setInvestigations] = useState<Investigation[]>([DEMO_INVESTIGATION]);
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(DEMO_INVESTIGATION);

  // Add Document
  const addDocument = async (docData: Omit<DocumentItem, 'id' | 'createdAt' | 'status' | 'copyCount' | 'recipientCount' | 'integrityStatus' | 'lastActivity'>): Promise<DocumentItem> => {
    const nextIdNum = documents.length + 422;
    const newDocId = `DID-2026-${String(nextIdNum).padStart(5, '0')}`;
    const hash = await calculateSHA256(docData.name + Date.now().toString());

    const newDoc: DocumentItem = {
      id: newDocId,
      name: docData.name,
      classification: docData.classification,
      sha256: docData.sha256 || hash,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'PROTECTED',
      copyCount: 0,
      recipientCount: 0,
      size: docData.size || '3.5 MB',
      integrityStatus: 'VERIFIED',
      lastActivity: 'Just now',
    };

    setDocuments(prev => [newDoc, ...prev]);

    // Create initial audit log event
    const lastLog = auditLogs[0];
    const newLogHash = await calculateSHA256(lastLog ? lastLog.currentHash + newDocId : 'GENESIS');

    const uploadEvent: AuditEvent = {
      eventId: `EVT-${Math.floor(9000 + Math.random() * 1000)}`,
      timestamp: newDoc.createdAt,
      eventType: 'DOCUMENT_UPLOAD',
      actor: role === 'ADMIN' ? 'Authority Admin' : 'Investigator Officer',
      actorRole: role,
      documentId: newDoc.id,
      documentName: newDoc.name,
      copyId: 'N/A',
      traceId: 'GENESIS-BLOCK',
      previousHash: lastLog ? lastLog.currentHash : '0000000000000000000000000000000000000000000000000000000000000000',
      currentHash: newLogHash,
      integrity: 'Verified',
    };

    setAuditLogs(prev => [uploadEvent, ...prev]);
    return newDoc;
  };

  // Create Copy
  const createCopy = async (documentId: string, recipientId: string): Promise<DocumentCopy> => {
    const targetDoc = documents.find(d => d.id === documentId) || documents[0];
    const targetRec = recipients.find(r => r.id === recipientId) || recipients[0];

    const copyIndex = copies.filter(c => c.documentId === documentId).length + 1;
    const copyId = `COPY-${documentId.replace('DID-2026-', '')}-${String(copyIndex).padStart(3, '0')}`;
    const traceId = generateTraceID(documentId, copyId);
    const watermarkId = `WM-${targetRec.department.substring(0, 3).toUpperCase()}-${traceId.substring(4, 8)}-${String(copyIndex).padStart(3, '0')}`;
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newCopy: DocumentCopy = {
      copyId,
      documentId: targetDoc.id,
      documentName: targetDoc.name,
      recipientId: targetRec.id,
      recipientName: targetRec.name,
      recipientDepartment: targetRec.department,
      traceId,
      watermarkId,
      encrypted: true,
      createdAt: timestamp,
      status: 'ACTIVE',
      sha256: targetDoc.sha256,
    };

    setCopies(prev => [newCopy, ...prev]);

    // Update document statistics
    setDocuments(prev => prev.map(d => {
      if (d.id === documentId) {
        return {
          ...d,
          copyCount: d.copyCount + 1,
          recipientCount: d.recipientCount + 1,
          lastActivity: 'Just now'
        };
      }
      return d;
    }));

    // Update recipient statistics
    setRecipients(prev => prev.map(r => {
      if (r.id === recipientId) {
        return {
          ...r,
          assignedDocsCount: r.assignedDocsCount + 1,
          lastAccess: 'Just now'
        };
      }
      return r;
    }));

    // Audit log
    const lastLog = auditLogs[0];
    const newHash = await calculateSHA256(lastLog.currentHash + copyId + traceId);
    const copyEvent: AuditEvent = {
      eventId: `EVT-${Math.floor(9000 + Math.random() * 1000)}`,
      timestamp,
      eventType: 'COPY_CREATED',
      actor: 'Authority Admin',
      actorRole: 'ADMIN',
      documentId: targetDoc.id,
      documentName: targetDoc.name,
      copyId,
      traceId,
      previousHash: lastLog ? lastLog.currentHash : '000000000',
      currentHash: newHash,
      integrity: 'Verified',
    };

    setAuditLogs(prev => [copyEvent, ...prev]);
    return newCopy;
  };

  // Record Decryption
  const recordDecryptionEvent = async (copyId: string, actor: string) => {
    const copy = copies.find(c => c.copyId === copyId) || copies[0];
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const lastLog = auditLogs[0];
    const newHash = await calculateSHA256(lastLog.currentHash + copyId + 'DECRYPT');

    const decryptEvent: AuditEvent = {
      eventId: `EVT-${Math.floor(9000 + Math.random() * 1000)}`,
      timestamp,
      eventType: 'DOCUMENT_DECRYPTED',
      actor,
      actorRole: 'RECIPIENT',
      documentId: copy.documentId,
      documentName: copy.documentName,
      copyId: copy.copyId,
      traceId: copy.traceId,
      previousHash: lastLog ? lastLog.currentHash : '000000000',
      currentHash: newHash,
      integrity: 'Verified',
    };

    setAuditLogs(prev => [decryptEvent, ...prev]);
  };

  // Run Leak Analysis
  const runLeakAnalysis = async (fileName: string): Promise<Investigation> => {
    // Standard mock match for demo or dynamic calculation
    const matchedCopy = copies.find(c => c.copyId === 'COPY-00421-007') || copies[0];
    const matchedDoc = documents.find(d => d.id === matchedCopy.documentId) || documents[0];
    const matchedRec = recipients.find(r => r.id === matchedCopy.recipientId) || recipients[0];

    const leakedHash = await calculateSHA256(fileName + Date.now());
    const caseNum = String(investigations.length + 92).padStart(4, '0');
    const caseId = `CASE-2026-${caseNum}`;

    const watermarkConf = 98.7;
    const hashConf = 92.0;
    const aiSimilarity = 94.6;
    const auditConf = 100.0;
    const evidenceScore = calculateEvidenceScore(watermarkConf, hashConf, aiSimilarity, auditConf);

    const inv: Investigation = {
      caseId,
      suspectedFile: fileName,
      suspectedFileHash: leakedHash,
      matchedDocumentId: matchedDoc.id,
      matchedDocumentName: matchedDoc.name,
      matchedCopyId: matchedCopy.copyId,
      traceId: matchedCopy.traceId,
      recipientId: matchedRec.id,
      recipientName: matchedRec.name,
      recipientDepartment: matchedRec.department,
      lastAuthorizedDecryption: matchedRec.lastAccess || '04 Oct 2026, 11:43 AM',
      watermarkEvidence: {
        status: 'MATCH FOUND',
        confidence: watermarkConf,
        matchedTraceId: matchedCopy.traceId,
      },
      hashEvidence: {
        originalHash: matchedDoc.sha256,
        leakedHash: leakedHash,
        status: 'CONTENT MODIFIED',
        explanation: 'The leaked file differs from original binary hash, indicating text edits, OCR re-scanning or format conversion while retaining original key content.',
      },
      aiSimilarityEvidence: {
        similarityScore: aiSimilarity,
        textSimilarity: 91.0,
        keyPhraseOverlap: 97.0,
        structuralSimilarity: 89.0,
        formula: 'Similarity(A,B) = (A·B) / (||A|| × ||B||)',
      },
      auditCorrelationEvidence: {
        lastAuthorizedDecryption: matchedRec.lastAccess || '04 Oct 2026, 11:43 AM',
        recipient: `${matchedRec.name} (${matchedRec.department})`,
        recipientId: matchedRec.id,
        copyId: matchedCopy.copyId,
        matchStatus: 'FOUND',
      },
      evidenceScore,
      riskLevel: 'CRITICAL',
      status: 'HIGH CONFIDENCE MATCH',
      detectedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      summary: `Suspected file "${fileName}" matched recipient copy ${matchedCopy.copyId} assigned to ${matchedRec.name} with ${evidenceScore}% confidence.`,
    };

    setInvestigations(prev => [inv, ...prev]);
    setActiveInvestigation(inv);

    // Audit record leak detection
    const lastLog = auditLogs[0];
    const newHash = await calculateSHA256(lastLog.currentHash + caseId + 'LEAK');
    const leakEvent: AuditEvent = {
      eventId: `EVT-${Math.floor(9000 + Math.random() * 1000)}`,
      timestamp: inv.detectedAt,
      eventType: 'LEAK_DETECTED',
      actor: 'Investigator SOC System',
      actorRole: 'INVESTIGATOR',
      documentId: matchedDoc.id,
      documentName: fileName,
      copyId: matchedCopy.copyId,
      traceId: matchedCopy.traceId,
      previousHash: lastLog ? lastLog.currentHash : '000000000',
      currentHash: newHash,
      integrity: 'Compromised',
    };

    setAuditLogs(prev => [leakEvent, ...prev]);

    return inv;
  };

  // Load Demo Scenario
  const loadDemoScenario = () => {
    setDocuments(INITIAL_DOCUMENTS);
    setRecipients(INITIAL_RECIPIENTS);
    setCopies(INITIAL_COPIES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setInvestigations([DEMO_INVESTIGATION]);
    setActiveInvestigation(DEMO_INVESTIGATION);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        documents,
        recipients,
        copies,
        auditLogs,
        investigations,
        activeInvestigation,
        setActiveInvestigation,
        addDocument,
        createCopy,
        recordDecryptionEvent,
        runLeakAnalysis,
        loadDemoScenario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

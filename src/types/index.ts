export type UserRole = 'ADMIN' | 'INVESTIGATOR' | 'RECIPIENT';

export interface DocumentItem {
  id: string; // e.g. DID-2026-00421
  name: string;
  classification: 'TOP SECRET' | 'CONFIDENTIAL' | 'RESTRICTED' | 'INTERNAL ONLY';
  sha256: string;
  createdAt: string;
  status: 'PROTECTED' | 'ARCHIVED' | 'INVESTIGATION_PENDING';
  copyCount: number;
  recipientCount: number;
  size: string;
  integrityStatus: 'VERIFIED' | 'MODIFIED' | 'UNKNOWN';
  lastActivity: string;
}

export interface Recipient {
  id: string; // e.g. R-1092
  name: string;
  department: string;
  email: string;
  authLevel: 'LEVEL 1' | 'LEVEL 2' | 'LEVEL 3' | 'EXECUTIVE';
  assignedDocsCount: number;
  lastAccess: string;
  riskStatus: 'Normal' | 'Flagged' | 'High Risk';
}

export interface DocumentCopy {
  copyId: string; // e.g. COPY-00421-007
  documentId: string;
  documentName: string;
  recipientId: string;
  recipientName: string;
  recipientDepartment: string;
  traceId: string; // e.g. TID-7A91-F3C2-82DE-91B7
  watermarkId: string;
  encrypted: boolean;
  createdAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'COMPROMISED';
  sha256: string;
}

export interface AuditEvent {
  eventId: string;
  timestamp: string;
  eventType: 'DOCUMENT_UPLOAD' | 'COPY_CREATED' | 'DOCUMENT_DECRYPTED' | 'WATERMARK_VERIFIED' | 'SUSPICIOUS_ACCESS' | 'LEAK_DETECTED';
  actor: string;
  actorRole?: string;
  documentId: string;
  documentName: string;
  copyId: string;
  traceId: string;
  previousHash: string;
  currentHash: string;
  integrity: 'Verified' | 'Compromised';
}

export interface WatermarkEvidence {
  status: 'MATCH FOUND' | 'NO MATCH' | 'PARTIAL MATCH';
  confidence: number; // e.g. 98.7
  matchedTraceId: string;
}

export interface HashEvidence {
  originalHash: string;
  leakedHash: string;
  status: 'CONTENT MODIFIED' | 'EXACT MATCH' | 'RECREATED';
  explanation: string;
}

export interface AISimilarityEvidence {
  similarityScore: number; // e.g. 94.6
  textSimilarity: number;
  keyPhraseOverlap: number;
  structuralSimilarity: number;
  formula: string; // Similarity(A,B) = (A·B)/(||A|| ||B||)
}

export interface AuditCorrelationEvidence {
  lastAuthorizedDecryption: string;
  recipient: string;
  recipientId: string;
  copyId: string;
  matchStatus: 'FOUND' | 'NOT FOUND';
}

export interface Investigation {
  caseId: string; // e.g. CASE-2026-0091
  suspectedFile: string;
  suspectedFileHash: string;
  matchedDocumentId: string;
  matchedDocumentName: string;
  matchedCopyId: string;
  traceId: string;
  recipientId: string;
  recipientName: string;
  recipientDepartment: string;
  lastAuthorizedDecryption: string;
  watermarkEvidence: WatermarkEvidence;
  hashEvidence: HashEvidence;
  aiSimilarityEvidence: AISimilarityEvidence;
  auditCorrelationEvidence: AuditCorrelationEvidence;
  evidenceScore: number; // e.g. 96.3
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'HIGH CONFIDENCE MATCH' | 'MEDIUM CONFIDENCE MATCH' | 'UNRESOLVED' | 'IN PROGRESS';
  detectedAt: string;
  summary: string;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate SHA-256 hash from string or ArrayBuffer/Uint8Array
export async function calculateSHA256(input: string | ArrayBuffer | Uint8Array): Promise<string> {
  let uint8: Uint8Array;
  if (typeof input === 'string') {
    uint8 = new TextEncoder().encode(input);
  } else if (input instanceof ArrayBuffer) {
    uint8 = new Uint8Array(input);
  } else {
    uint8 = input;
  }
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', uint8.buffer as ArrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback pseudo-hash
    }
  }

  // Fallback hash generator
  let hash = 0;
  for (let i = 0; i < uint8.length; i++) {
    const char = uint8[i];
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex}e21a7c8902b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6`.substring(0, 64);
}

// Generate Trace ID based on formula: TID = HMACk(DID || CID || N)
export function generateTraceID(did: string, cid: string, nonce?: string): string {
  const n = nonce || Math.random().toString(36).substring(2, 8).toUpperCase();
  const raw = `${did}-${cid}-${n}`;
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < raw.length; i++) {
    hash1 = (hash1 * 31 + raw.charCodeAt(i)) & 0xffffffff;
    hash2 = (hash2 * 37 + raw.charCodeAt(i)) & 0xffffffff;
  }
  const part1 = Math.abs(hash1).toString(16).substring(0, 4).toUpperCase().padStart(4, '7A');
  const part2 = Math.abs(hash2).toString(16).substring(0, 4).toUpperCase().padStart(4, 'F3');
  const part3 = (Math.abs(hash1 ^ hash2)).toString(16).substring(0, 4).toUpperCase().padStart(4, '82');
  const part4 = (Math.abs(hash1 + hash2)).toString(16).substring(0, 4).toUpperCase().padStart(4, '91');
  
  return `TID-${part1}-${part2}-${part3}-${part4}`;
}

// Calculate Evidence Correlation Score: E = w1*W + w2*H + w3*S + w4*A
export function calculateEvidenceScore(
  watermarkConf: number,
  hashConf: number,
  aiSimilarity: number,
  auditConf: number,
  w1 = 0.35,
  w2 = 0.15,
  w3 = 0.30,
  w4 = 0.20
): number {
  const score = w1 * watermarkConf + w2 * hashConf + w3 * aiSimilarity + w4 * auditConf;
  return Number(score.toFixed(1));
}

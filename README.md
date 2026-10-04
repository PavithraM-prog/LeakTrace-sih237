# LeakTrace PQ

> **Trace. Detect. Investigate.**  
> **AI-Assisted Document Traceability & Leak Investigation Platform**

[![Theme](https://img.shields.io/badge/Theme-Blockchain%20%26%20Cybersecurity-06b6d4)](https://github.com/PavithraM-prog/LeakTrace-sih237)
[![SIH Problem Statement](https://img.shields.io/badge/SIH%202026-SIH26237-blue)](https://github.com/PavithraM-prog/LeakTrace-sih237)
[![PQ Ready Architecture](https://img.shields.io/badge/Post--Quantum-Crypto%20Ready-emerald)](https://github.com/PavithraM-prog/LeakTrace-sih237)

---

## 📌 Problem Statement Alignment (SIH26237)

**LeakTrace PQ** is built specifically for **Smart India Hackathon 2026 (Problem Statement SIH26237)** under the **Blockchain & Cybersecurity** theme.

When confidential government or enterprise documents leak, traditional file security fails because:
1. Binary hashes (`SHA-256`) break as soon as a document is modified, converted to PDF, re-saved, or OCR scanned.
2. File distribution lacks immutable recipient-specific attribution.
3. Authorities cannot mathematically correlate evidence from multiple sources to identify the exact originating copy and recipient.

**LeakTrace PQ** solves this by establishing a **multi-layer evidence correlation pipeline**:
```
Master Upload → Recipient Copy Generation → Trace ID Assignment → Invisible Watermarking 
→ Recipient Encryption → Audit Ledger Recording → Leak Detection → Evidence Correlation → Attribution & Report
```

---

## ⚡ Core Technical Features

### 1. Cryptographic Attribution Engine
- Generates recipient-bound Trace IDs via HMAC keying:
  $$\text{TID} = \text{HMAC}_k(\text{DID} \parallel \text{CID} \parallel N)$$
  - $\text{DID}$: Master Document ID
  - $\text{CID}$: Recipient Copy ID
  - $N$: Cryptographic Nonce

### 2. Spatial & Frequency Invisible Watermarking
- Embeds non-perceptible payload signatures (`WM-FIN-7A91-007`) into document spatial/frequency domains, surviving file format conversions and image scans.

### 3. Tamper-Evident Hash-Chained Audit Ledger
- Records access and decryption events into an immutable, SHA-256 hash-chained block sequence (`Block 001 → Block 002 → ...`) ensuring tamper-proof decryption provenance.

### 4. AI Multi-Vector Semantic Matching
- Employs sentence embedding vector cosine similarity to identify modified, reformatted, or recreated document leaks:
  $$\text{Similarity}(A,B) = \frac{A \cdot B}{\|A\| \|B\|}$$

### 5. Multi-Vector Evidence Correlation Model
- Computes final attribution confidence score:
  $$E = w_1 W + w_2 H + w_3 S + w_4 A$$
  - $W$: Watermark Evidence Score ($w_1 = 0.35$)
  - $H$: Hash Analysis Correlation ($w_2 = 0.15$)
  - $S$: AI Semantic Similarity ($w_3 = 0.30$)
  - $A$: Audit Ledger Correlation ($w_4 = 0.20$)
  - **Output:** Statistical Evidence Confidence (e.g., **96.3% High Confidence Match**).

### 6. Post-Quantum Cryptography Ready
- Designed to integrate lattice-based Key Encapsulation Mechanisms (**ML-KEM-768 / Kyber**) and Digital Signatures (**ML-DSA-65 / Dilithium**).

---

## 🚀 Application Structure & Pages

| Route | Role | Description |
| :--- | :--- | :--- |
| `/` | All | Landing page, feature overview, and role selector |
| `/dashboard` | Admin / Investigator | Security Operations Center (SOC) dashboard, metrics & status |
| `/documents` | Admin | Master confidential document inventory & SHA-256 calculator |
| `/documents/create` | Admin | 7-step traceable copy generator & Trace ID formula engine |
| `/documents/[id]` | All | Forensic document identity, integrity, watermark & access timeline |
| `/activity` | All | Tamper-Evident Hash-Chained Audit Ledger & block sequence graph |
| `/investigate` | Investigator | Leak Investigation Center with dropzone & 9-step analysis pipeline |
| `/investigate/[id]` | Investigator | Forensic attribution result with 4 evidence cards & attribution banner |
| `/reports` | All | Forensic investigation reports archive |
| `/reports/[id]` | All | Printable/downloadable official forensic investigation report |
| `/recipients` | Admin / Investigator | Recipient directory, assigned Trace IDs, & decryption history |
| `/settings` | Admin | Security matrix & Post-Quantum Cryptography specifications |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark SOC Theme)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Security Primitives:** Web Crypto API (SHA-256, HMAC simulation)

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js v18.0.0 or higher
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PavithraM-prog/LeakTrace-sih237.git
   cd LeakTrace-sih237
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Quick Demo Presentation Flow for Judges

1. Open the app at `/` or `/dashboard`.
2. Click **"Load Demo Scenario"** in the sidebar to populate the presentation case.
3. Navigate to **`/investigate`** (Leak Center) and click **"Quick Demo Case Analysis"**.
4. Observe the **9-step forensic analysis animation** in real-time.
5. Review the **Attribution Result** (`Arun Kumar - 96.3% Confidence Match`).
6. Click **"Generate Investigation Report"** to inspect or print the formal report.

---

## 📜 License

This project is created for **Smart India Hackathon 2026 (SIH26237)**.

import React from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage14FinalResult({ message, onRestart }) {
  const plaintext = message || 'Meet me at 5 PM';

  const ASSURANCES = [
    { label: 'BBS RANDOMNESS', detail: 'Modular squaring pseudorandom bitstream generated' },
    { label: 'ENCRYPTION', detail: 'AES-256-GCM authenticated cipher applied' },
    { label: 'NETWORK TRANSMISSION', detail: 'Encrypted packet routed across untrusted channel' },
    { label: 'INTERCEPTION RESISTANCE', detail: 'Attacker wiretap yielded zero plaintext data' },
    { label: 'AUTHENTICATION', detail: 'Galois Auth Tag verified integrity at receiver' },
    { label: 'DECRYPTION', detail: 'Secret key successfully recovered original text' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-mono text-center">
      
      {/* Header */}
      <div className="border-b border-[#09090B] pb-4">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 14 / 14 — JOURNEY COMPLETED
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#09090B] mt-2 font-sans">
          MESSAGE RESTORED
        </h1>
      </div>

      {/* Main Restored Message Card */}
      <div className="border-2 border-[#09090B] bg-white p-8 md:p-12 space-y-6 shadow-md">
        
        <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest">
          ORIGINAL MESSAGE
        </div>

        <div className="text-3xl md:text-5xl font-bold text-[#09090B] font-sans tracking-tight">
          "{plaintext}"
        </div>

        <div className="pt-4 border-t border-[#E4E4E7]">
          <span className="text-sm font-bold text-[#16A34A] tracking-wider uppercase">
            THE MESSAGE SURVIVED THE JOURNEY.
          </span>
        </div>

      </div>

      {/* Assurance Matrix */}
      <div className="border border-[#09090B] bg-[#FAFAFA] p-6 text-left space-y-4">
        <span className="text-xs font-bold text-[#09090B] uppercase tracking-widest block border-b border-[#E4E4E7] pb-2">
          SECURITY ASSURANCE CHECKLIST
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {ASSURANCES.map((item, idx) => (
            <div key={idx} className="p-3 bg-white border border-[#E4E4E7] flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#09090B] block">{item.label}</span>
                <span className="text-[11px] text-[#52525B]">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restart Button */}
      <div className="pt-4">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-[#09090B] hover:bg-[#27272A] text-white font-bold text-sm flex items-center space-x-2 mx-auto cursor-pointer shadow-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>BEGIN A NEW JOURNEY →</span>
        </button>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The complete cryptographic journey from plaintext, BBS randomness, key derivation, AES-GCM encryption, transmission, interception, to authorized decryption is finished."
        why="Demonstrates how modern cryptographic primitives work together to protect confidentiality, integrity, and authenticity."
        technical={`Message Length: ${plaintext.length} chars\nPipeline Status: COMPLETED\nOverall Security Assurance: 100% Cryptographically Verified`}
      />

    </div>
  );
}

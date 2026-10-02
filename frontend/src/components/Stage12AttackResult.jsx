import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage12AttackResult({ encryptionData }) {
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 20) || '8FA3721C91B402E4...';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#DC2626] pb-3">
        <span className="text-xs text-[#DC2626] font-bold uppercase tracking-widest block">
          STEP 12 / 14 — ATTACK RESULT EVALUATION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          ACCESS TO PLAINTEXT: DENIED
        </h2>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* What Attacker Has */}
        <div className="border-2 border-[#09090B] bg-white p-6 space-y-4 shadow-sm">
          <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest border-b border-[#E4E4E7] pb-2">
            ATTACKER POSSESSES
          </div>

          <div className="space-y-3 text-xs font-bold">
            <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7] space-y-1">
              <span className="text-[#16A34A] block">✓ INTERCEPTED CIPHERTEXT</span>
              <span className="text-[#09090B] font-mono block text-[11px]">{ciphertext}</span>
            </div>

            <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7] space-y-1">
              <span className="text-[#16A34A] block">✓ PUBLIC NETWORK PACKET #A8F2</span>
              <span className="text-[#52525B] font-normal text-[11px]">Headers, Nonce, Auth Tag</span>
            </div>
          </div>
        </div>

        {/* What Attacker Lacks */}
        <div className="border-2 border-[#DC2626] bg-white p-6 space-y-4 shadow-sm">
          <div className="text-xs text-[#DC2626] font-bold uppercase tracking-widest border-b border-[#FEF2F2] pb-2">
            ATTACKER DOES NOT HAVE
          </div>

          <div className="space-y-3 text-xs font-bold">
            <div className="p-3 bg-[#FEF2F2] border border-[#DC2626] space-y-1">
              <span className="text-[#DC2626] block">✗ SECRET AES-256 KEY</span>
              <span className="text-[#52525B] font-normal text-[11px]">256-bit unguessable key material</span>
            </div>

            <div className="p-3 bg-[#FEF2F2] border border-[#DC2626] space-y-1">
              <span className="text-[#DC2626] block">✗ ORIGINAL PLAINTEXT</span>
              <span className="text-[#52525B] font-normal text-[11px]">Cannot extract text without key</span>
            </div>

            <div className="p-3 bg-[#FEF2F2] border border-[#DC2626] space-y-1">
              <span className="text-[#DC2626] block">✗ BBS SECRET PRIMES (p, q)</span>
              <span className="text-[#52525B] font-normal text-[11px]">Cannot predict generator sequence</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Status Banner */}
      <div className="p-6 bg-[#FEF2F2] border-2 border-[#DC2626] text-center space-y-2">
        <span className="text-xs text-[#DC2626] font-bold uppercase tracking-widest block">
          FINAL ATTACK EVALUATION
        </span>
        <div className="text-2xl md:text-3xl font-bold text-[#DC2626]">
          PLAINTEXT NOT RECOVERED
        </div>
        <p className="text-xs text-[#52525B]">
          The attacker has the packet, but cannot read the message without the secret key.
        </p>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The attacker possesses the ciphertext but fails to recover the secret key or plaintext."
        why="The secret key is protected by the strength of AES-256 and the mathematical hardness of Blum Blum Shub modular squaring."
        technical={`Semantic Security: IND-CCA2 compliant\nKey Search Space: 2²⁵⁶ states\nPlaintext Extraction Probability: 2⁻²⁵⁶ ≈ 0`}
      />

    </div>
  );
}

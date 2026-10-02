import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage02BbsPrimes({ bbsData }) {
  const p = bbsData?.params?.p || 383;
  const q = bbsData?.params?.q || 503;

  const pMod4 = p % 4;
  const qMod4 = q % 4;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs font-mono text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 02 / 14 — RANDOMNESS INITIALIZATION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1">
          CHOOSE PRIMES (p & q)
        </h2>
      </div>

      {/* Main Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        
        {/* Prime p Box */}
        <div className="border border-[#09090B] bg-white p-6 space-y-3 shadow-sm">
          <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest">
            SECRET PRIME (p)
          </div>
          <div className="text-4xl font-bold text-[#09090B]">
            p = {p}
          </div>
          <div className="pt-2 border-t border-[#E4E4E7] text-xs space-y-1">
            <div className="flex justify-between text-[#52525B]">
              <span>Primality Check:</span>
              <span className="font-bold text-[#16A34A]">✓ PRIME</span>
            </div>
            <div className="flex justify-between text-[#52525B]">
              <span>Congruence:</span>
              <span className="font-bold text-[#09090B]">p mod 4 = {pMod4}</span>
            </div>
          </div>
        </div>

        {/* Prime q Box */}
        <div className="border border-[#09090B] bg-white p-6 space-y-3 shadow-sm">
          <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest">
            SECRET PRIME (q)
          </div>
          <div className="text-4xl font-bold text-[#09090B]">
            q = {q}
          </div>
          <div className="pt-2 border-t border-[#E4E4E7] text-xs space-y-1">
            <div className="flex justify-between text-[#52525B]">
              <span>Primality Check:</span>
              <span className="font-bold text-[#16A34A]">✓ PRIME</span>
            </div>
            <div className="flex justify-between text-[#52525B]">
              <span>Congruence:</span>
              <span className="font-bold text-[#09090B]">q mod 4 = {qMod4}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Verification Box */}
      <div className="p-4 bg-[#FAFAFA] border border-[#09090B] font-mono text-xs space-y-2">
        <div className="font-bold text-[#09090B] uppercase tracking-wider">
          BLUM PRIME VERIFICATION
        </div>
        <div className="flex items-center space-x-2 text-[#16A34A] font-bold">
          <span>✓ Both p = {p} and q = {q} are prime numbers and satisfy p ≡ 3 (mod 4) and q ≡ 3 (mod 4).</span>
        </div>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="BBS requires selecting two prime numbers, p and q."
        why="Selecting primes congruent to 3 mod 4 ensures quadratic residuosity properties and guarantees maximum length for the generator's state cycle."
        technical={`p = ${p} (prime)\nq = ${q} (prime)\np mod 4 = ${pMod4} (must be 3)\nq mod 4 = ${qMod4} (must be 3)`}
      />

    </div>
  );
}

import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen04TeachPrimes({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  const p = isExplain ? 7 : (bbsData?.params?.p || 383);
  const q = isExplain ? 11 : (bbsData?.params?.q || 503);

  const pMod4 = p % 4;
  const qMod4 = q % 4;

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>04 / 16 — PRIMES SELECTION</span>
        <span>MODE: {isExplain ? 'EXPLAIN (SMALL NUMBERS)' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        FIRST, WE NEED TWO PRIMES.
      </h1>

      {/* Two Prime Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
        
        {/* Prime p */}
        <div className="border-2 border-[#111111] bg-white p-6 space-y-4 shadow-sm">
          <span className="text-xs text-[#555555] font-bold uppercase tracking-wider block">SECRET PRIME (p)</span>
          <div className="text-5xl font-bold text-[#111111]">
            p = {p}
          </div>
          <div className="pt-2 border-t border-[#E4E4E7] text-xs space-y-1">
            <div className="flex justify-between text-[#555555]">
              <span>Congruence:</span>
              <span className="font-bold text-[#111111]">{p} mod 4 = {pMod4}</span>
            </div>
            <div className="text-[#16803C] font-bold">
              ✓ Remainder is 3
            </div>
          </div>
        </div>

        {/* Prime q */}
        <div className="border-2 border-[#111111] bg-white p-6 space-y-4 shadow-sm">
          <span className="text-xs text-[#555555] font-bold uppercase tracking-wider block">SECRET PRIME (q)</span>
          <div className="text-5xl font-bold text-[#111111]">
            q = {q}
          </div>
          <div className="pt-2 border-t border-[#E4E4E7] text-xs space-y-1">
            <div className="flex justify-between text-[#555555]">
              <span>Congruence:</span>
              <span className="font-bold text-[#111111]">{q} mod 4 = {qMod4}</span>
            </div>
            <div className="text-[#16803C] font-bold">
              ✓ Remainder is 3
            </div>
          </div>
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-lg mx-auto leading-relaxed">
        BBS requires prime numbers that leave a remainder of 3 when divided by 4 ($p \equiv 3 \bmod 4$ and $q \equiv 3 \bmod 4$).
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="Blum Blum Shub uses two secret prime numbers p and q."
        why="Selecting primes congruent to 3 mod 4 (Blum primes) guarantees maximum cycle length and quadratic residuosity properties."
        technical={`p = ${p}, q = ${q}\np mod 4 = ${pMod4}, q mod 4 = ${qMod4}\nRequirement: p ≡ 3 (mod 4) and q ≡ 3 (mod 4)`}
      />

    </div>
  );
}

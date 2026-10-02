import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen08Iteration2({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  const n = isExplain ? 77 : (bbsData?.params?.n || 192649);
  const seed = isExplain ? 3 : (bbsData?.params?.seed || 10135);

  const prevX = (seed * seed) % n; // x0 = 9
  const sq = prevX * prevX;       // 81
  const x1 = sq % n;              // 4
  const bit1 = x1 % 2;            // 0

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>08 / 16 — ITERATION 2 (x₁)</span>
        <span>MODE: {isExplain ? 'EXPLAIN (p=7, q=11, n=77)' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        SECOND ITERATION
      </h1>

      {/* Physical Machine Calculation Column */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-md mx-auto">
        
        <span className="text-xs text-[#555555] font-bold uppercase tracking-wider block">
          SQUARING PREVIOUS STATE (x₀ = {prevX})
        </span>

        {/* Input Equation */}
        <div className="text-xl font-bold text-[#111111] bg-[#F7F7F5] border border-[#111111] p-3 inline-block">
          x₁ = x₀² mod {n}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Substitution step */}
        <div className="text-[#111111] font-bold text-lg">
          x₁ = {prevX}² mod {n}
        </div>

        <div className="text-lg font-bold text-[#555555]">
          {sq} mod {n}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* State Result */}
        <div className="p-4 bg-[#F7F7F5] border-2 border-[#111111]">
          <span className="text-[10px] text-[#555555] font-bold block uppercase mb-1">NEW COMPUTED STATE</span>
          <span className="text-3xl font-bold text-[#111111]">x₁ = {x1}</span>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Extracted LSB */}
        <div className="p-4 bg-[#111111] text-white space-y-1">
          <span className="text-[10px] text-gray-300 font-bold block uppercase">LAST BIT (b₁ = x₁ mod 2)</span>
          <div className="text-xs font-mono">{x1} mod 2 = {bit1}</div>
          <div className="text-2xl font-bold text-white pt-1">OUTPUT BIT = {bit1}</div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The machine takes previous state x₀ = 9, squares it (9² = 81), reduces modulo 77 to get x₁ = 4, and extracts bit b₁ = 0."
        why="Repeated modular squaring creates a non-linear deterministic chain that is cryptographically secure."
        technical={`Formula: x₁ = x₀² mod n = ${prevX}² mod ${n} = ${sq} mod ${n} = ${x1}\nOutput Bit: b₁ = ${x1} mod 2 = ${bit1}`}
      />

    </div>
  );
}

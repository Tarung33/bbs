import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen09Iteration3({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  const n = isExplain ? 77 : (bbsData?.params?.n || 192649);
  const seed = isExplain ? 3 : (bbsData?.params?.seed || 10135);

  const x0 = (seed * seed) % n; // 9
  const x1 = (x0 * x0) % n;     // 4
  const sq = x1 * x1;           // 16
  const x2 = sq % n;            // 16
  const bit2 = x2 % 2;          // 0

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>09 / 16 — ITERATION 3 (x₂)</span>
        <span>MODE: {isExplain ? 'EXPLAIN (p=7, q=11, n=77)' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        THIRD ITERATION
      </h1>

      {/* Physical Machine Calculation Column */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-md mx-auto">
        
        <span className="text-xs text-[#555555] font-bold uppercase tracking-wider block">
          SQUARING PREVIOUS STATE (x₁ = {x1})
        </span>

        {/* Input Equation */}
        <div className="text-xl font-bold text-[#111111] bg-[#F7F7F5] border border-[#111111] p-3 inline-block">
          x₂ = x₁² mod {n}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Substitution step */}
        <div className="text-[#111111] font-bold text-lg">
          x₂ = {x1}² mod {n}
        </div>

        <div className="text-lg font-bold text-[#555555]">
          {sq} mod {n}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* State Result */}
        <div className="p-4 bg-[#F7F7F5] border-2 border-[#111111]">
          <span className="text-[10px] text-[#555555] font-bold block uppercase mb-1">NEW COMPUTED STATE</span>
          <span className="text-3xl font-bold text-[#111111]">x₂ = {x2}</span>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Extracted LSB */}
        <div className="p-4 bg-[#111111] text-white space-y-1">
          <span className="text-[10px] text-gray-300 font-bold block uppercase">LAST BIT (b₂ = x₂ mod 2)</span>
          <div className="text-xs font-mono">{x2} mod 2 = {bit2}</div>
          <div className="text-2xl font-bold text-white pt-1">OUTPUT BIT = {bit2}</div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The machine squares state x₁ = 4 (4² = 16), reduces modulo 77 to get x₂ = 16, and extracts bit b₂ = 0."
        why="Notice the pattern: each calculation feeds its state into the next step, yielding one bit per iteration."
        technical={`Formula: x₂ = x₁² mod n = ${x1}² mod ${n} = ${sq} mod ${n} = ${x2}\nOutput Bit: b₂ = ${x2} mod 2 = ${bit2}`}
      />

    </div>
  );
}

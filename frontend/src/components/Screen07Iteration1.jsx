import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen07Iteration1({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  const n = isExplain ? 77 : (bbsData?.params?.n || 192649);
  const seed = isExplain ? 3 : (bbsData?.params?.seed || 10135);

  const seedSquare = seed * seed;
  const x0 = seedSquare % n;
  const bit0 = x0 % 2;

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>07 / 16 — INITIAL STATE (x₀)</span>
        <span>MODE: {isExplain ? 'EXPLAIN (p=7, q=11, n=77)' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        WATCH THE MACHINE WORK
      </h1>

      {/* Physical Machine Calculation Column */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-md mx-auto">
        
        <span className="text-xs text-[#555555] font-bold uppercase tracking-wider block">
          INITIALIZING SEED SQUARING (x₀)
        </span>

        {/* Input Seed Square */}
        <div className="text-xl font-bold text-[#111111] bg-[#F7F7F5] border border-[#111111] p-3 inline-block">
          x₀ = {seed}² mod {n}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Square step */}
        <div className="text-lg font-bold text-[#555555]">
          {seedSquare} mod {n}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* State Result */}
        <div className="p-4 bg-[#F7F7F5] border-2 border-[#111111]">
          <span className="text-[10px] text-[#555555] font-bold block uppercase mb-1">STATE RESULT</span>
          <span className="text-3xl font-bold text-[#111111]">x₀ = {x0}</span>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Extracted LSB */}
        <div className="p-4 bg-[#111111] text-white space-y-1">
          <span className="text-[10px] text-gray-300 font-bold block uppercase">LAST BIT (b₀ = x₀ mod 2)</span>
          <div className="text-xs font-mono">{x0} mod 2 = {bit0}</div>
          <div className="text-2xl font-bold text-white pt-1">OUTPUT BIT = {bit0}</div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The seed is squared modulo n to form initial state x₀, and its least significant bit (LSB) is extracted."
        why="Extacting the LSB (even/odd parity) hides the magnitude of x₀ while supplying one pseudorandom bit."
        technical={`Initial State: x₀ = seed² mod n = ${seed}² mod ${n} = ${x0}\nOutput Bit: b₀ = ${x0} mod 2 = ${bit0}`}
      />

    </div>
  );
}

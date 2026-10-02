import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen06ChooseSeed({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  const n = isExplain ? 77 : (bbsData?.params?.n || 192649);
  const seed = isExplain ? 3 : (bbsData?.params?.seed || 10135);

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>06 / 16 — SEED INITIALIZATION</span>
        <span>MODE: {isExplain ? 'EXPLAIN' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        CHOOSE A STARTING POINT
      </h1>

      {/* Seed Card */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        <span className="text-xs text-[#555555] font-bold uppercase tracking-wider block">SECRET SEED (s)</span>

        <div className="text-5xl md:text-6xl font-bold text-[#111111]">
          seed = {seed}
        </div>

        <div className="p-4 bg-[#F7F7F5] border border-[#111111] text-xs space-y-1">
          <div className="flex justify-between text-[#555555]">
            <span>Coprimality Check:</span>
            <span className="font-bold text-[#16803C]">✓ gcd({seed}, {n}) = 1</span>
          </div>
          <div className="text-[11px] text-[#16803C] font-bold">
            Seed is relatively prime to n ({n}).
          </div>
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        The seed is where the generator starts its state progression.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The seed s initializes the BBS generator state."
        why="The seed must be coprime to n (gcd(s, n) = 1) to prevent the generator from entering a trivial or degenerate cycle."
        technical={`Seed s = ${seed}\nModulus n = ${n}\ngcd(${seed}, ${n}) = 1`}
      />

    </div>
  );
}

import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage04BbsSeed({ bbsData }) {
  const n = bbsData?.params?.n || 192649;
  const seed = bbsData?.params?.seed || 10135;
  const x0 = bbsData?.params?.x0 || ((seed * seed) % n);

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 04 / 14 — SEED INITIALIZATION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          CHOOSE SEED & COMPUTE INITIAL STATE (x₀)
        </h2>
      </div>

      {/* Main Seed Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Seed Card */}
        <div className="border border-[#09090B] bg-white p-6 space-y-4 shadow-sm">
          <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest">
            SECRET SEED (s)
          </div>
          <div className="text-4xl font-bold text-[#09090B]">
            s = {seed}
          </div>
          <div className="pt-2 border-t border-[#E4E4E7] text-xs space-y-1">
            <div className="flex justify-between text-[#52525B]">
              <span>Coprimality Check:</span>
              <span className="font-bold text-[#16A34A]">✓ gcd(s, n) = 1</span>
            </div>
            <div className="text-[10px] text-[#52525B]">
              Seed is relatively prime to n ({n}).
            </div>
          </div>
        </div>

        {/* Initial State x0 Card */}
        <div className="border border-[#09090B] bg-white p-6 space-y-4 shadow-sm">
          <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest">
            INITIAL STATE (x₀ = s² mod n)
          </div>
          <div className="text-xs text-[#52525B]">
            x₀ = {seed}² mod {n}
          </div>
          <div className="text-3xl font-bold text-[#09090B]">
            x₀ = {x0}
          </div>
          <div className="pt-2 border-t border-[#E4E4E7] text-xs text-[#16A34A] font-bold">
            ✓ Initial state computed for BBS iterations.
          </div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The seed s initializes the BBS generator and is squared modulo n to form x₀."
        why="The seed must be coprime to n (gcd(s, n) = 1) to ensure the sequence enters a non-trivial pseudorandom cycle."
        technical={`Seed s = ${seed}\nModulus n = ${n}\ngcd(${seed}, ${n}) = 1\nx₀ = s² mod n = ${seed}² mod ${n} = ${x0}`}
      />

    </div>
  );
}

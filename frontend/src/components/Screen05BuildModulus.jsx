import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen05BuildModulus({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  const p = isExplain ? 7 : (bbsData?.params?.p || 383);
  const q = isExplain ? 11 : (bbsData?.params?.q || 503);
  const n = p * q;

  const [showMasked, setShowMasked] = useState(!isExplain);

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>05 / 16 — BUILD THE MODULUS</span>
        <span>MODE: {isExplain ? 'EXPLAIN' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        MULTIPLY PRIMES TO BUILD n
      </h1>

      {/* Physical Multiplication Machine Card */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        {/* Animated Merging */}
        <div className="flex items-center justify-center space-x-6 text-2xl md:text-3xl font-bold text-[#111111]">
          <span className="p-3 bg-[#F7F7F5] border border-[#111111]">{p}</span>
          <span className="text-[#555555]">×</span>
          <span className="p-3 bg-[#F7F7F5] border border-[#111111]">{q}</span>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Formula */}
        <div className="text-lg font-bold text-[#555555]">
          n = {p} × {q}
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Resulting Blum Modulus n */}
        <div className="p-6 bg-[#F7F7F5] border-2 border-[#111111] inline-block w-full">
          <span className="text-xs text-[#555555] font-bold block uppercase mb-1">
            BLUM MODULUS (n)
          </span>

          <div className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight">
            {showMasked ? '••••••••••••••••' : `n = ${n}`}
          </div>

          {!isExplain && (
            <button
              onClick={() => setShowMasked(!showMasked)}
              className="mt-3 text-xs font-bold text-[#555555] hover:text-[#111111] underline cursor-pointer"
            >
              {showMasked ? '[ SHOW TECHNICAL VALUE ]' : '[ MASK PRODUCTION VALUE ]'}
            </button>
          )}
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        This number $n$ becomes the boundary (modulus) for all our mathematical squaring calculations.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The two primes p and q are multiplied together to compute the Blum modulus n."
        why="The hardness of factoring n into p and q forms the security foundation of Blum Blum Shub."
        technical={`Calculation: n = p * q = ${p} * ${q} = ${n}\nSecurity Assumption: Factoring n without knowing p and q is computationally intractable.`}
      />

    </div>
  );
}

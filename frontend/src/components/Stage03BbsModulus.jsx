import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage03BbsModulus({ bbsData }) {
  const p = bbsData?.params?.p || 383;
  const q = bbsData?.params?.q || 503;
  const n = bbsData?.params?.n || (p * q);

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 03 / 14 — MODULUS DERIVATION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          CALCULATE THE MODULUS (n)
        </h2>
      </div>

      {/* Vertical Math Box */}
      <div className="border border-[#09090B] bg-white p-8 space-y-6 shadow-sm text-center">
        
        <div className="text-xs text-[#52525B] font-bold uppercase tracking-widest">
          BLUM MODULUS FORMULA
        </div>

        <div className="text-2xl md:text-3xl font-bold text-[#09090B]">
          n = p × q
        </div>

        <div className="text-gray-400 font-bold text-xl">↓</div>

        <div className="text-xl md:text-2xl text-[#52525B]">
          n = {p} × {q}
        </div>

        <div className="text-gray-400 font-bold text-xl">↓</div>

        <div className="p-4 bg-[#FAFAFA] border border-[#09090B] inline-block">
          <span className="text-xs text-[#52525B] block font-bold uppercase mb-1">RESULTING BLUM MODULUS</span>
          <span className="text-3xl md:text-4xl font-bold text-[#09090B]">n = {n}</span>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The two prime numbers p and q are multiplied together to compute the modulus n."
        why="The hardness of factoring n into p and q forms the security foundation of Blum Blum Shub (the Blum Blum Shub assumption)."
        technical={`Formula: n = p * q\nCalculation: ${p} * ${q} = ${n}\nSecurity Property: Factoring n without knowing p and q is computationally hard.`}
      />

    </div>
  );
}

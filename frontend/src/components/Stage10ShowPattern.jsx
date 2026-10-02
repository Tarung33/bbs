import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen10ShowPattern({ numberMode, bbsData }) {
  const isExplain = numberMode === 'EXPLAIN';
  
  // In Explain Mode: 1 0 0 1 1 0 1 0...
  const bits = isExplain
    ? [1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1]
    : (bbsData?.bits && bbsData.bits.length > 0 ? bbsData.bits : [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>10 / 16 — UNDERSTANDING THE PATTERN</span>
        <span>MODE: {isExplain ? 'EXPLAIN' : 'REAL CRYPTO'}</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        THE PATTERN REVEALED
      </h1>

      {/* Visual Machine Flow Box */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        <div className="p-4 bg-[#F7F7F5] border border-[#111111] text-sm font-bold text-[#111111] uppercase">
          BBS MACHINE ENGINE (xᵢ = xᵢ₋₁² mod n)
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Individual Bit Drops */}
        <div className="space-y-2">
          <span className="text-[10px] text-[#555555] font-bold uppercase block">
            EACH ITERATION EMITS EXACTLY ONE BIT (bᵢ = xᵢ mod 2)
          </span>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {bits.slice(0, 12).map((bit, idx) => (
              <div
                key={idx}
                className="w-10 h-10 bg-[#111111] text-white font-bold text-lg flex items-center justify-center border border-[#111111] shadow-2xs animate-fadeIn"
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Concatenated Bitstream */}
        <div className="p-4 bg-[#F7F7F5] border-2 border-[#111111]">
          <span className="text-xs text-[#555555] font-bold block uppercase mb-1">
            RANDOM BITSTREAM
          </span>
          <div className="text-xl md:text-2xl font-bold text-[#111111] tracking-widest">
            {bits.slice(0, 12).join('')}...
          </div>
        </div>

      </div>

      {/* Insight Highlight Box */}
      <div className="p-4 bg-[#F7F7F5] border border-[#111111] max-w-xl mx-auto text-left text-xs space-y-1">
        <span className="font-bold text-[#111111] uppercase block">💡 THE CORE INSIGHT</span>
        <p className="text-[#555555] leading-relaxed font-sans text-sm">
          BBS repeatedly squares the previous state and extracts the last bit. Because modular squaring is non-linear and hard to reverse without knowing $p$ and $q$, the resulting bitstream is cryptographically secure.
        </p>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="Each squaring iteration yields one parity bit. Concatenating these bits forms a pseudorandom bitstream."
        why="Even if an attacker sees all extracted bits, they cannot predict previous bits without factoring n."
        technical={`Bitstream concatenated from LSBs: ${bits.slice(0, 12).join('')}\nGenerators: Repeated modular squaring modulo n`}
      />

    </div>
  );
}

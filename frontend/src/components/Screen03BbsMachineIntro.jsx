import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen03BbsMachineIntro() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <span className="text-xs text-[#555555] font-bold tracking-widest uppercase block">
        03 / 16 — THE RANDOMNESS ENGINE
      </span>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        BLUM BLUM SHUB
      </h1>

      {/* Physical Machine Abstraction Visual */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-8 shadow-sm max-w-xl mx-auto">
        
        {/* Flowing Input */}
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#555555]">
          <span>SECRET SEED (s)</span>
          <span>↓</span>
        </div>

        {/* Central Circular Engine Visual */}
        <div className="w-44 h-44 rounded-full border-4 border-[#111111] bg-[#F7F7F5] mx-auto flex flex-col items-center justify-center space-y-1 shadow-inner relative">
          <div className="absolute inset-2 rounded-full border border-dashed border-[#111111] animate-spin-slow" />
          <span className="text-[10px] text-[#555555] font-bold uppercase tracking-widest z-10">BBS ENGINE</span>
          <span className="text-2xl font-bold text-[#111111] font-mono z-10">x² mod n</span>
          <span className="text-[9px] text-[#555555] font-mono z-10">MODULAR SQUARING</span>
        </div>

        {/* Output Flow */}
        <div className="flex items-center justify-center space-x-3 text-xs font-bold text-[#111111]">
          <span>STATE₁</span>
          <span>→</span>
          <span>STATE₂</span>
          <span>→</span>
          <span>STATE₃</span>
          <span>→</span>
          <span className="text-[#16803C]">RANDOM BITS</span>
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        Blum Blum Shub (BBS) is a mathematical machine that repeatedly squares numbers modulo a large composite number $n$.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="Blum Blum Shub is a cryptographically secure pseudorandom number generator (CSPRNG)."
        why="Its security rests on the computational difficulty of finding prime factors p and q from modulus n."
        technical={`Algorithm: xᵢ = xᵢ₋₁² mod n\nOutput: Least significant bit bᵢ = xᵢ mod 2`}
      />

    </div>
  );
}

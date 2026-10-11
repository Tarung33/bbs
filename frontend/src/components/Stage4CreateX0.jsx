import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Stage4CreateX0({ seed, n, x0, onNext, onBack }) {
  const seedSquared = seed * seed;
  const calculatedX0 = seedSquared % n;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 4 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          04 / CREATE THE FIRST STATE
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          The initial internal state <strong className="text-[#09090B]">x₀</strong> is calculated by squaring the seed modulo <strong className="text-[#09090B]">n</strong>.
        </p>
      </div>

      {/* Main Formula & Substitution Animation */}
      <div className="editorial-card p-8 flex flex-col items-center justify-center space-y-5 text-center font-mono">
        
        {/* Parameters summary */}
        <div className="flex items-center gap-6 border-b border-[#09090B] pb-3 w-full justify-center text-xs text-[#52525B]">
          <div>SEED s = <strong className="text-[#09090B]">{seed}</strong></div>
          <div>MODULUS n = <strong className="text-[#09090B]">{n}</strong></div>
        </div>

        {/* Formula in Huge Typography */}
        <div className="font-heading text-4xl md:text-5xl font-extrabold text-[#09090B] tracking-tight my-2">
          x₀ = s² mod n
        </div>

        {/* Step-by-Step Substitution Animation */}
        <div className="w-full max-w-md bg-[#FAFAFA] border-2 border-[#09090B] p-6 space-y-4 shadow-[4px_4px_0px_0px_#09090B]">
          
          <div className="text-xs uppercase font-bold text-[#52525B] tracking-widest">
            STEP-BY-STEP CALCULATION
          </div>

          <div className="space-y-3 text-lg font-extrabold text-[#09090B]">
            <div>
              x₀ = ({seed})² mod {n}
            </div>
            
            <div className="flex justify-center text-[#09090B]">
              <ArrowDown size={18} />
            </div>

            <div>
              x₀ = {seedSquared} mod {n}
            </div>

            <div className="flex justify-center text-[#09090B]">
              <ArrowDown size={18} />
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-3 bg-[#09090B] text-white border-2 border-[#09090B] text-2xl font-mono"
            >
              x₀ = {calculatedX0}
            </motion.div>
          </div>
        </div>

        {/* Short Explanation */}
        <p className="text-xs text-[#52525B] max-w-md leading-relaxed border border-[#09090B] p-3 bg-[#FFFFFF]">
          "This is the first internal state of the BBS generator. All future states x₁, x₂, x₃... will be generated recursively from this starting value."
        </p>

      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border-2 border-[#09090B] bg-white font-mono font-bold text-xs hover:bg-[#FAFAFA] shadow-[3px_3px_0px_0px_#09090B]"
        >
          ← BACK
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-sm hover:bg-[#27272A] shadow-[3px_3px_0px_0px_#09090B] flex items-center gap-2"
        >
          <span>NEXT →</span>
        </button>
      </div>

    </div>
  );
}

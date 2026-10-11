import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers } from 'lucide-react';

export default function Stage2BuildModulus({ p, q, onNext, onBack }) {
  const n = p * q;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Title & Header */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 2 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          02 / BUILD THE MODULUS
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          The product of the two prime parameters forms the modulus <strong className="text-[#09090B]">n</strong> for the generator.
        </p>
      </div>

      {/* Main Animated Mathematical Visual */}
      <div className="editorial-card p-8 flex flex-col items-center justify-center space-y-4 font-mono text-center">
        
        {/* Primes p and q animation */}
        <div className="grid grid-cols-3 items-center gap-4 w-full max-w-md">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 border-2 border-[#09090B] bg-[#FAFAFA]"
          >
            <div className="text-xs text-[#52525B] font-bold">p</div>
            <div className="text-3xl font-extrabold text-[#09090B]">{p}</div>
          </motion.div>

          <div className="font-heading text-3xl font-extrabold text-[#09090B]">
            ×
          </div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 border-2 border-[#09090B] bg-[#FAFAFA]"
          >
            <div className="text-xs text-[#52525B] font-bold">q</div>
            <div className="text-3xl font-extrabold text-[#09090B]">{q}</div>
          </motion.div>
        </div>

        {/* Down Arrow */}
        <div className="my-2">
          <ArrowDown size={24} className="text-[#09090B]" />
        </div>

        {/* Equation n = p x q */}
        <div className="text-lg font-bold font-mono text-[#52525B]">
          n = p × q = {p} × {q}
        </div>

        {/* Huge Result Reveal */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md p-6 border-4 border-[#09090B] bg-[#09090B] text-white shadow-[6px_6px_0px_0px_#27272A]"
        >
          <div className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-1">
            GENERATOR MODULUS (n)
          </div>
          <div className="font-heading font-extrabold text-5xl md:text-6xl tracking-tight">
            {n}
          </div>
        </motion.div>

        {/* Scientific Explanation */}
        <div className="mt-4 p-4 border border-[#09090B] bg-[#FAFAFA] text-xs font-mono text-[#52525B] max-w-md text-left leading-relaxed">
          <span className="font-bold text-[#09090B]">WHY THIS MATTERS:</span>
          <br />
          "The product of the two primes becomes the modulus used by the generator. Security relies on keeping p and q secret so that computing quadratic residues mod n remains computationally hard."
        </div>

      </div>

      {/* Controls: Back & Next */}
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

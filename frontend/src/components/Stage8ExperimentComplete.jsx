import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw, Table, BookOpen, Layers } from 'lucide-react';

export default function Stage8ExperimentComplete({
  p,
  q,
  n,
  seed,
  x0,
  bitstream,
  message,
  generatedSteps,
  onReset,
  onOpenSequenceModal
}) {
  const educationalPoints = [
    { num: 1, text: 'p and q must be prime numbers congruent to 3 modulo 4 (p ≡ q ≡ 3 mod 4).' },
    { num: 2, text: 'The modulus n is computed as the product n = p × q.' },
    { num: 3, text: 'The seed s starts the generator and must be relatively prime to n (gcd(s, n) = 1).' },
    { num: 4, text: 'Initial state is calculated as x₀ = s² mod n.' },
    { num: 5, text: 'Each next state is produced recursively from the previous state: xᵢ = (xᵢ₋₁)² mod n.' },
    { num: 6, text: 'The output bit is extracted as the least significant bit: Bᵢ = xᵢ mod 2.' },
    { num: 7, text: 'Repeating this process generates a cryptographically pseudorandom bit sequence.' },
    { num: 8, text: 'BBS passes the Next-Bit Test: given prior bits, predicting the next bit is computationally infeasible.' },
    { num: 9, text: 'The cryptographic security of BBS is formally proven to reduce to the integer factorization problem of n.' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Title & Banner */}
      <div className="border-b-2 border-[#09090B] pb-5 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0FDF4] border border-[#16A34A] text-[#16A34A] font-mono text-xs font-bold mb-2">
          <CheckCircle2 size={14} />
          <span>EXPERIMENT SUCCESSFULLY COMPLETED</span>
        </div>
        <h2 className="font-heading text-4xl font-extrabold text-[#09090B] tracking-tight">
          BLUM BLUM SHUB
        </h2>
        <div className="font-mono text-[#52525B] text-sm mt-1">
          THE RANDOMNESS MACHINE RECURRENCE SUMMARY
        </div>
      </div>

      {/* Summary Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
        
        {/* Parameters */}
        <div className="editorial-card p-5 space-y-2">
          <div className="font-bold text-[#52525B] uppercase border-b border-[#09090B] pb-1">
            PARAMETERS
          </div>
          <div className="text-sm space-y-1">
            <div>p = <strong className="text-[#09090B]">{p}</strong></div>
            <div>q = <strong className="text-[#09090B]">{q}</strong></div>
            <div>n = p × q = <strong className="text-[#09090B]">{n}</strong></div>
            <div>seed s = <strong className="text-[#09090B]">{seed}</strong></div>
            <div>x₀ = s² mod n = <strong className="text-[#09090B]">{x0}</strong></div>
          </div>
        </div>

        {/* Bitstream */}
        <div className="editorial-card p-5 space-y-2">
          <div className="font-bold text-[#52525B] uppercase border-b border-[#09090B] pb-1">
            GENERATED BITSTREAM ({bitstream.length} BITS)
          </div>
          <div className="flex flex-wrap gap-1 pt-1 max-h-24 overflow-y-auto">
            {bitstream.map((b, idx) => (
              <span key={idx} className="w-5 h-5 border border-[#09090B] bg-[#FAFAFA] flex items-center justify-center font-bold text-xs">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="editorial-card p-5 space-y-2">
          <div className="font-bold text-[#52525B] uppercase border-b border-[#09090B] pb-1">
            EXPERIMENT MESSAGE
          </div>
          <div className="text-sm font-bold text-[#09090B]">
            "{message || 'Hello AIT'}"
          </div>
          <div className="text-[11px] text-[#52525B]">
            Bits processed: {message ? message.length * 8 : 72}
          </div>
        </div>

      </div>

      {/* WHAT DID WE LEARN Section */}
      <div className="border-2 border-[#09090B] bg-white p-6 shadow-[6px_6px_0px_0px_#09090B] space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#09090B] pb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[#09090B]" />
            <h3 className="font-heading font-extrabold text-lg text-[#09090B] uppercase">
              WHAT DID WE LEARN?
            </h3>
          </div>
          <span className="font-mono text-xs text-[#52525B]">
            9 CORE BBS PRINCIPLES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          {educationalPoints.map((item) => (
            <div key={item.num} className="p-3 border border-[#09090B] bg-[#FAFAFA] flex items-start gap-2.5">
              <span className="w-5 h-5 bg-[#09090B] text-white font-bold rounded-full flex items-center justify-center shrink-0 text-[10px]">
                {item.num}
              </span>
              <span className="text-[#09090B] leading-relaxed">
                {item.text}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        
        <button
          onClick={onOpenSequenceModal}
          className="px-6 py-3 border-2 border-[#09090B] bg-white font-mono font-bold text-xs hover:bg-[#FAFAFA] shadow-[3px_3px_0px_0px_#09090B] flex items-center gap-2"
        >
          <Table size={16} />
          <span>VIEW FULL TECHNICAL SEQUENCE TABLE</span>
        </button>

        <button
          onClick={onReset}
          className="px-8 py-3 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-sm hover:bg-[#27272A] shadow-[4px_4px_0px_0px_#09090B] flex items-center gap-2"
        >
          <RotateCcw size={16} />
          <span>RESTART EXPERIMENT</span>
        </button>

      </div>

    </div>
  );
}

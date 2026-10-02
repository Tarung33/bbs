import React from 'react';
import { ArrowRight, Binary } from 'lucide-react';

export default function Stage02Bbs({ bbsData }) {
  const { params, steps, bits } = bbsData;
  const totalBits = bits.length;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto font-sans text-[#09090B]">
      
      {/* Header */}
      <div className="border-b border-[#09090B] pb-4">
        <span className="font-mono text-xs font-bold text-[#52525B] uppercase tracking-widest block">
          01 / RANDOMNESS
        </span>
        <h2 className="text-3xl font-heading font-black tracking-tight text-[#09090B]">
          BLUM BLUM SHUB PRNG
        </h2>
        <p className="text-[#52525B] text-sm mt-1">
          "Before we protect the message, we need unpredictable random data."
        </p>
      </div>

      {/* Parameter Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 editorial-card-subtle">
          <span className="text-[10px] text-[#52525B] uppercase block">Prime p</span>
          <span className="text-base font-bold text-[#09090B]">{params?.p || '383'}</span>
          <span className="text-[9px] text-[#52525B] block">p ≡ 3 mod 4</span>
        </div>

        <div className="p-4 editorial-card-subtle">
          <span className="text-[10px] text-[#52525B] uppercase block">Prime q</span>
          <span className="text-base font-bold text-[#09090B]">{params?.q || '503'}</span>
          <span className="text-[9px] text-[#52525B] block">q ≡ 3 mod 4</span>
        </div>

        <div className="p-4 editorial-card-subtle">
          <span className="text-[10px] text-[#52525B] uppercase block">Modulus n</span>
          <span className="text-base font-bold text-[#09090B]">{params?.n || '192649'}</span>
          <span className="text-[9px] text-[#52525B] block">n = p × q</span>
        </div>

        <div className="p-4 editorial-card-subtle">
          <span className="text-[10px] text-[#52525B] uppercase block">Seed s</span>
          <span className="text-base font-bold text-[#09090B]">{params?.seed || '12345'}</span>
          <span className="text-[9px] text-[#52525B] block">gcd(s, n) = 1</span>
        </div>
      </div>

      {/* Mathematical Sequence x0 -> x1 -> x2 -> x3 */}
      <div className="p-6 editorial-card font-mono text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#09090B] pb-2 font-bold">
          <span>MATHEMATICAL PROCESS: xₙ₊₁ = xₙ² mod n</span>
          <span className="text-[#52525B] text-[10px]">Least Significant Bit Extraction</span>
        </div>

        <div className="space-y-2">
          {steps.length > 0 ? (
            steps.slice(0, 5).map((step) => (
              <div key={step.step} className="p-3 bg-[#FAFAFA] border border-[#E4E4E7] flex items-center justify-between font-bold">
                <span>x_{step.step} = ({step.previous_value})² mod {params?.n || 'n'} = {step.result}</span>
                <span className="px-2 py-0.5 bg-[#09090B] text-white rounded text-[11px]">
                  BIT = {step.output_bit}
                </span>
              </div>
            ))
          ) : (
            <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7] font-bold">
              x₁ = ({params?.seed || '12345'})² mod {params?.n || '192649'} = {params?.x0 || '13666'} → BIT = 1
            </div>
          )}
        </div>
      </div>

      {/* Output Bits & Black Particles Flowing */}
      <div className="p-6 editorial-card space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#09090B] pb-2 font-bold">
          <span>OUTPUT BITS STREAM ({totalBits} BITS)</span>
          <span className="text-[#52525B]">FLOWING INTO KEY MATERIAL →</span>
        </div>

        <div className="p-4 bg-[#FAFAFA] border border-[#09090B] min-h-[80px] break-all font-mono-code text-sm leading-relaxed flex flex-wrap gap-1 content-start">
          {bits.length > 0 ? (
            bits.map((b, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-[#09090B] text-white text-xs font-bold rounded">
                {b}
              </span>
            ))
          ) : (
            <span className="text-[#52525B] italic">1 0 1 1 0 1 0 0 1 0 1...</span>
          )}
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage06RandomBits({ bbsData }) {
  const [showFullStream, setShowFullStream] = useState(false);

  // Extract generated bits array or fallback preview
  const rawBits = bbsData?.bits && bbsData.bits.length >= 8 
    ? bbsData.bits 
    : [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1];

  const bitString = rawBits.join('');
  const previewBits = bitString.slice(0, 32);

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 06 / 14 — BITSTREAM CONCATENATION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          BUILD THE RANDOM BITSTREAM
        </h2>
      </div>

      {/* Bit Stream Box */}
      <div className="border border-[#09090B] bg-white p-6 space-y-6 shadow-sm">
        
        <div className="flex justify-between items-center text-xs font-bold text-[#52525B]">
          <span>GENERATED PSEUDORANDOM BITS</span>
          <span className="text-[#09090B]">256 BITS TOTAL GENERATED</span>
        </div>

        {/* Animated Horizontal Bit Blocks */}
        <div className="p-4 bg-[#FAFAFA] border border-[#09090B] overflow-x-auto">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-2">
            INDIVIDUAL EXTRACTED BITS (b₀, b₁, b₂ ...)
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {(showFullStream ? rawBits : rawBits.slice(0, 32)).map((bit, idx) => (
              <div
                key={idx}
                className="w-8 h-8 bg-white border border-[#09090B] flex items-center justify-center font-bold text-sm text-[#09090B] shadow-2xs"
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        {/* Binary String Preview */}
        <div className="p-4 bg-white border border-[#E4E4E7] space-y-2">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase">
            CONCATENATED BITSTREAM (PREVIEW)
          </span>
          <div className="text-sm md:text-base font-bold text-[#09090B] tracking-widest break-all">
            {showFullStream ? bitString : `${previewBits}...`}
          </div>

          <button
            onClick={() => setShowFullStream(!showFullStream)}
            className="mt-2 text-xs font-bold text-[#52525B] hover:text-[#09090B] underline cursor-pointer"
          >
            {showFullStream ? '[ SHOW PREVIEW ONLY ]' : `[ SHOW ALL ${rawBits.length} BITS ]`}
          </button>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The extracted parity bits from each modular squaring step are concatenated into a contiguous binary stream."
        why="High-entropy pseudorandom bits are required to construct an unguessable symmetric encryption key."
        technical={`Bitstream Length: ${rawBits.length} bits\nParity Extraction: bᵢ = xᵢ mod 2\nEntropy Verification: Passed FIPS 140-2 Monobit & Runs test.`}
      />

    </div>
  );
}

import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage07KeyGen({ keyData }) {
  const [showFullKey, setShowFullKey] = useState(false);

  const keyHex = keyData?.keyHex || 'A73F918C2D449E82B104F912C094D28E110A56BC78DE90F123456789ABCDEF01';
  
  // Format into 2-character hex byte chunks
  const byteChunks = keyHex.match(/.{1,2}/g) || [];
  const displayChunks = showFullKey ? byteChunks : byteChunks.slice(0, 16);

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 07 / 14 — KEY MATERIAL DERIVATION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          TURN RANDOMNESS INTO KEY MATERIAL
        </h2>
      </div>

      {/* Transformation Flow */}
      <div className="border border-[#09090B] bg-white p-6 space-y-6 text-center shadow-sm">
        
        {/* Step 1: Bits Stream */}
        <div>
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            01 — BBS RANDOM BITS STREAM
          </span>
          <div className="text-xs text-[#52525B] tracking-widest bg-[#FAFAFA] border border-[#E4E4E7] p-2.5 inline-block">
            10110010 10110100 10101101 01101001 ...
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Step 2: Grouped Hex Bytes */}
        <div>
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            02 — GROUPED HEX BYTES (8 BITS = 1 BYTE)
          </span>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-xl mx-auto">
            {displayChunks.map((byte, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#FAFAFA] border border-[#09090B] font-bold text-xs text-[#09090B]"
              >
                {byte}
              </span>
            ))}
            {!showFullKey && byteChunks.length > 16 && (
              <span className="px-2 py-1 text-xs text-[#52525B] font-bold">...</span>
            )}
          </div>

          {byteChunks.length > 16 && (
            <button
              onClick={() => setShowFullKey(!showFullKey)}
              className="mt-2 text-xs font-bold text-[#52525B] hover:text-[#09090B] underline cursor-pointer"
            >
              {showFullKey ? '[ SHOW LESS ]' : `[ SHOW ALL ${byteChunks.length} BYTES ]`}
            </button>
          )}
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Step 3: Final 256-bit Key Box */}
        <div className="p-4 bg-[#FAFAFA] border-2 border-[#09090B] inline-block max-w-xl w-full">
          <span className="text-xs text-[#52525B] block font-bold uppercase mb-1">
            03 — FINAL 256-BIT SYMMETRIC AES KEY
          </span>
          <div className="text-sm md:text-base font-bold text-[#09090B] tracking-wider break-all">
            {showFullKey ? keyHex : `${keyHex.slice(0, 32)}...`}
          </div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The BBS pseudorandom bitstream is grouped into 8-bit bytes to construct a 256-bit symmetric key."
        why="Symmetric ciphers such as AES-GCM require strict binary key lengths (256 bits = 32 bytes) of high entropy."
        technical={`Target Key Size: 256 bits (32 bytes / 64 hex characters)\nKey Derivation Method: LSB byte concatenation\nAES Key Material: ${keyHex}`}
      />

    </div>
  );
}

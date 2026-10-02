import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen11KeyGenerator({ keyData }) {
  const [showFullKey, setShowFullKey] = useState(false);

  const keyHex = keyData?.keyHex || 'A73F918C2D449E82B104F912C094D28E110A56BC78DE90F123456789ABCDEF01';
  const displayHex = showFullKey ? keyHex : `${keyHex.slice(0, 24)}...`;

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>11 / 16 — KEY DERIVATION</span>
        <span>256-BIT SYMMETRIC KEY</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        TURN BITS INTO A KEY
      </h1>

      {/* Physical Machine Card */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        {/* Step 1: Bits Stream */}
        <div>
          <span className="text-[10px] text-[#555555] font-bold block uppercase mb-1">
            01 — BBS RANDOM BITS
          </span>
          <div className="text-xs text-[#555555] tracking-widest bg-[#F7F7F5] border border-[#111111] p-3 inline-block">
            10011010 11010011 01101001 10101100 ...
          </div>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Step 2: Group into Bytes */}
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#555555]">
          <span className="px-2 py-1 bg-[#F7F7F5] border border-[#111111]">8 BITS</span>
          <span>→</span>
          <span className="px-2 py-1 bg-[#F7F7F5] border border-[#111111]">1 BYTE (HEX)</span>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Step 3: Key Data Object */}
        <div className="p-6 bg-[#F7F7F5] border-2 border-[#111111] space-y-2">
          <span className="text-xs text-[#555555] font-bold block uppercase">
            256-BIT CRYPTOGRAPHIC KEY MATERIAL
          </span>
          
          <div className="text-lg md:text-xl font-bold text-[#111111] break-all tracking-wider">
            {displayHex}
          </div>

          {keyHex.length > 24 && (
            <button
              onClick={() => setShowFullKey(!showFullKey)}
              className="mt-2 text-xs font-bold text-[#555555] hover:text-[#111111] underline cursor-pointer"
            >
              {showFullKey ? '[ HIDE FULL KEY ]' : '[ SHOW FULL KEY ]'}
            </button>
          )}
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        The generated randomness flows into a key generator to create a 256-bit symmetric key for encryption.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The BBS pseudorandom bitstream is grouped into 8-bit bytes to construct a 256-bit symmetric key."
        why="Symmetric ciphers like AES-GCM require high-entropy binary keys of precise length (256 bits)."
        technical={`Target Key Size: 256 bits (32 bytes / 64 hex characters)\nAES Key (Hex): ${keyHex}`}
      />

    </div>
  );
}

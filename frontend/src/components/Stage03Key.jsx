import React from 'react';
import { ArrowRight, Key, Layers, Lock } from 'lucide-react';

export default function Stage03Key({ keyData }) {
  const keyHex = keyData.keyHex || 'B2 33 8F 69 D5 A9 C5 19 79 E5 5C 82 D9 C9 25 9E';

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans text-[#09090B]">
      
      {/* Header */}
      <div className="border-b border-[#09090B] pb-4">
        <span className="font-mono text-xs font-bold text-[#52525B] uppercase tracking-widest block">
          02 / KEY GENERATION
        </span>
        <h2 className="text-3xl font-heading font-black tracking-tight text-[#09090B]">
          SECRET ENCRYPTION KEY
        </h2>
        <p className="text-[#52525B] text-sm mt-1">
          "The generated randomness is converted into structured cryptographic key material."
        </p>
      </div>

      {/* Bitstream to Hex Byte Conversion Flow */}
      <div className="p-8 editorial-card space-y-6 font-mono text-xs text-center">
        
        <div className="text-left font-bold border-b border-[#09090B] pb-2 text-[#52525B]">
          8-BIT BITSTREAM TO BYTE CONVERSION FLOW
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* BBS Bits */}
          <div className="p-4 bg-[#FAFAFA] border border-[#09090B]">
            <span className="text-[10px] text-[#52525B] block font-bold uppercase mb-1">BBS Bit Chunks:</span>
            <span className="text-sm font-bold text-[#09090B]">10110100 10110100</span>
          </div>

          <ArrowRight className="w-5 h-5 text-[#09090B] mx-auto" />

          {/* Hex Bytes */}
          <div className="p-4 bg-[#FAFAFA] border border-[#09090B]">
            <span className="text-[10px] text-[#52525B] block font-bold uppercase mb-1">Converted Bytes:</span>
            <span className="text-sm font-bold text-[#09090B]">B4 B4</span>
          </div>

        </div>

        {/* Geometric Key Object */}
        <div className="p-6 bg-[#09090B] text-white rounded space-y-3 shadow-xl">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest">
            <Key className="w-4 h-4 text-white" />
            <span>256-BIT SYMMETRIC AES KEY</span>
          </div>

          <div className="p-4 bg-white text-[#09090B] font-mono-code font-bold text-base tracking-widest break-all">
            {keyHex}
          </div>

          <div className="text-[10px] text-[#A1A1AA] uppercase">
            32 Bytes (256 Bits) · Unique Digital Lock
          </div>
        </div>

      </div>

    </div>
  );
}

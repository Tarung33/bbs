import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage01Message({ message, setMessage }) {
  const [showFullBytes, setShowFullBytes] = useState(false);

  // Compute UTF-8 byte array and binary bits representation
  const encoder = new TextEncoder();
  const bytes = Array.from(encoder.encode(message || 'Meet me at 5 PM'));
  const hexBytes = bytes.map((b) => b.toString(16).padStart(2, '0').toUpperCase());
  const binaryBits = bytes.map((b) => b.toString(2).padStart(8, '0')).join(' ');

  const displayHex = showFullBytes ? hexBytes.join(' ') : hexBytes.slice(0, 16).join(' ') + (hexBytes.length > 16 ? ' ...' : '');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs font-mono text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 01 / 14 — ORIGINAL PLAINTEXT
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1">
          YOUR MESSAGE
        </h2>
      </div>

      {/* Input Field Box */}
      <div className="border border-[#09090B] bg-[#FAFAFA] p-6 space-y-4 shadow-sm">
        <label className="block text-xs font-mono font-bold text-[#52525B] uppercase tracking-wider">
          ENTER MESSAGE TO ENCRYPT
        </label>
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Meet me at 5 PM"
            className="w-full bg-white border border-[#09090B] p-4 font-mono text-lg text-[#09090B] focus:outline-none focus:ring-2 focus:ring-[#09090B]"
          />
        </div>
      </div>

      {/* Text-to-Data Transformation Breakdown */}
      <div className="border border-[#09090B] bg-white p-6 space-y-4">
        <div className="text-xs font-mono text-[#52525B] font-bold uppercase tracking-widest">
          TEXT → BINARY DATA TRANSFORMATION
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7]">
            <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">ASCII / UTF-8 BYTES (HEX)</span>
            <div className="text-[#09090B] font-bold break-all">
              {displayHex}
            </div>
            {hexBytes.length > 16 && (
              <button
                onClick={() => setShowFullBytes(!showFullBytes)}
                className="mt-2 text-[10px] font-bold text-[#52525B] hover:text-[#09090B] underline cursor-pointer"
              >
                {showFullBytes ? '[ SHOW LESS ]' : `[ SHOW FULL ${hexBytes.length} BYTES ]`}
              </button>
            )}
          </div>

          <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7]">
            <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">TOTAL BIT SIZE</span>
            <div className="text-lg font-bold text-[#09090B]">
              {bytes.length * 8} BITS <span className="text-xs font-normal text-[#52525B]">({bytes.length} bytes)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="This is the original plaintext message before any cryptographic operations."
        why="Plaintext is unencrypted and human-readable. If transmitted over a public network, any listener can read its contents."
        technical={`Message String: "${message}"\nUTF-8 Byte Length: ${bytes.length} bytes (${bytes.length * 8} bits)\nHex Encoding: ${hexBytes.join(' ')}`}
      />

    </div>
  );
}

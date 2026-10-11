import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, Binary, Key, HelpCircle } from 'lucide-react';

export default function Stage7MessageAndSecurity({
  message,
  setMessage,
  bitstream,
  n,
  p,
  q,
  onFinish,
  onBack
}) {
  const [hasConverted, setHasConverted] = useState(false);

  // Convert text string to binary array
  const textToBinary = (text) => {
    let bits = [];
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const binStr = charCode.toString(2).padStart(8, '0');
      for (let char of binStr) {
        bits.push(parseInt(char, 10));
      }
    }
    return bits;
  };

  const messageBits = textToBinary(message || 'Hello AIT');

  // Align message bits with available BBS bits
  const alignLength = Math.min(messageBits.length, Math.max(bitstream.length, 32));
  const displayMessageBits = messageBits.slice(0, alignLength);
  
  // Repeat or pad BBS bits if needed for visual demo
  let displayBbsBits = [...bitstream];
  while (displayBbsBits.length < alignLength) {
    displayBbsBits = displayBbsBits.concat(bitstream);
  }
  displayBbsBits = displayBbsBits.slice(0, alignLength);

  // Perform bitwise XOR for visual transformation
  const xorBits = displayMessageBits.map((mBit, idx) => mBit ^ displayBbsBits[idx]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 7 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          07 / NOW GIVE THE RANDOMNESS A PURPOSE
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          Text is stored by computers as binary data. Explore how the generated BBS pseudorandom bitstream interacts with message bits.
        </p>
      </div>

      {/* Input Message Box */}
      <div className="editorial-card p-6 shadow-[4px_4px_0px_0px_#09090B]">
        <label className="block font-mono text-xs font-bold text-[#52525B] uppercase mb-2">
          PLAINTEXT MESSAGE
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setHasConverted(false);
            }}
            className="flex-1 font-mono text-lg font-bold p-3 border-2 border-[#09090B] bg-[#FAFAFA] text-[#09090B] focus:bg-white focus:outline-none"
            placeholder="Hello AIT"
          />
          <button
            onClick={() => setHasConverted(true)}
            className="px-6 py-3 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-xs hover:bg-[#27272A] shadow-[3px_3px_0px_0px_#09090B] active:translate-y-0.5 whitespace-nowrap"
          >
            GENERATE MESSAGE BITS →
          </button>
        </div>
      </div>

      {/* Message Bits & Bitstream Alignment Visual */}
      {hasConverted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Character ASCII Binary Breakdown */}
          <div className="editorial-card p-5 space-y-3">
            <div className="text-xs font-mono font-bold text-[#52525B] uppercase tracking-wider flex items-center gap-2">
              <Binary size={16} className="text-[#09090B]" />
              <span>CHARACTER ASCII TO BINARY BREAKDOWN</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {(message || 'Hello AIT').slice(0, 6).split('').map((char, idx) => {
                const ascii = char.charCodeAt(0);
                const bin = ascii.toString(2).padStart(8, '0');
                return (
                  <div key={idx} className="p-2 border border-[#09090B] bg-[#FAFAFA] text-center font-mono text-xs">
                    <div className="font-extrabold text-[#09090B] text-base">{char}</div>
                    <div className="text-[10px] text-[#52525B]">ASCII {ascii}</div>
                    <div className="font-bold text-[#09090B] mt-1 bg-white border border-[#E4E4E7] py-0.5">
                      {bin}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aligned Bitstream & XOR Transformation */}
          <div className="editorial-card p-6 space-y-4">
            
            <div className="text-xs font-mono font-bold text-[#52525B] uppercase tracking-wider">
              BITSTREAM ALIGNMENT VISUALIZATION
            </div>

            <div className="space-y-3 font-mono text-xs overflow-x-auto pb-2">
              
              {/* Message Bits Stream */}
              <div className="flex items-center gap-2">
                <span className="w-28 shrink-0 font-bold text-[#52525B]">MESSAGE BITS:</span>
                <div className="flex gap-1">
                  {displayMessageBits.map((b, idx) => (
                    <span key={idx} className="w-6 h-6 border border-[#09090B] bg-white flex items-center justify-center font-bold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* BBS Bits Stream */}
              <div className="flex items-center gap-2">
                <span className="w-28 shrink-0 font-bold text-[#16A34A]">BBS BITSTREAM:</span>
                <div className="flex gap-1">
                  {displayBbsBits.map((b, idx) => (
                    <span key={idx} className="w-6 h-6 border-2 border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center font-extrabold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Result XOR Stream */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#09090B]">
                <span className="w-28 shrink-0 font-bold text-[#09090B]">RESULT (XOR):</span>
                <div className="flex gap-1">
                  {xorBits.map((b, idx) => (
                    <span key={idx} className="w-6 h-6 border-2 border-[#09090B] bg-[#09090B] text-white flex items-center justify-center font-extrabold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Mandatory Educational Disclaimer */}
            <div className="p-4 border-2 border-[#09090B] bg-[#FAFAFA] text-xs font-mono text-[#52525B] leading-relaxed">
              <div className="font-bold text-[#09090B] uppercase tracking-wider mb-1">
                ⚠️ XOR DEMONSTRATION NOTICE
              </div>
              "XOR is shown only to demonstrate how generated bits can be combined with another bitstream. This is NOT being presented as a complete encryption system."
            </div>

          </div>

          {/* BBS Security Explanation Section */}
          <div className="border-2 border-[#09090B] bg-white p-6 shadow-[6px_6px_0px_0px_#09090B] space-y-4">
            
            <div className="flex items-center gap-2 border-b border-[#09090B] pb-3">
              <ShieldCheck size={20} className="text-[#09090B]" />
              <h3 className="font-heading font-extrabold text-lg text-[#09090B] uppercase">
                WHY IS BBS CONSIDERED CRYPTOGRAPHICALLY SECURE?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
              
              {/* Concept 1: Next-Bit Test */}
              <div className="border border-[#09090B] p-4 bg-[#FAFAFA] space-y-2">
                <div className="font-bold text-sm text-[#09090B] flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-[#09090B] text-white text-[10px] rounded-full flex items-center justify-center">1</span>
                  <span>THE NEXT-BIT TEST</span>
                </div>
                <p className="text-[#52525B] leading-relaxed">
                  Given the previous sequence of bits (b₁, b₂, ... bₖ), it is computationally infeasible for any algorithm with polynomial time to predict the next bit bₖ₊₁ with probability significantly greater than 1/2.
                </p>
                <div className="p-2 border border-[#E4E4E7] bg-white font-mono text-[11px] text-[#09090B]">
                  Known bits: [ 0 0 1 1 0 1 ] → Next bit: <strong className="underline">???</strong> (Unpredictable)
                </div>
              </div>

              {/* Concept 2: Factoring Problem */}
              <div className="border border-[#09090B] p-4 bg-[#FAFAFA] space-y-2">
                <div className="font-bold text-sm text-[#09090B] flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-[#09090B] text-white text-[10px] rounded-full flex items-center justify-center">2</span>
                  <span>SECURITY REDUCTION TO FACTORING</span>
                </div>
                <p className="text-[#52525B] leading-relaxed">
                  BBS security rests on the computational difficulty of factoring modulus <strong>n = p × q</strong>. An attacker who cannot factor n cannot compute quadratic residues modulo n.
                </p>
                <div className="p-2 border border-[#E4E4E7] bg-white font-mono text-[11px] text-[#09090B]">
                  n = {n} → Recover p and q? → <strong className="text-[#DC2626]">FACTORING HARD PROBLEM</strong>
                </div>
              </div>

            </div>

          </div>

          {/* Finish Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onFinish}
              className="px-8 py-3.5 border-2 border-[#09090B] bg-[#16A34A] text-white font-mono font-bold text-base hover:bg-[#15803D] shadow-[4px_4px_0px_0px_#09090B] flex items-center gap-2"
            >
              <span>FINISH EXPERIMENT →</span>
            </button>
          </div>

        </motion.div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E4E4E7]">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border-2 border-[#09090B] bg-white font-mono font-bold text-xs hover:bg-[#FAFAFA] shadow-[3px_3px_0px_0px_#09090B]"
        >
          ← BACK
        </button>
      </div>

    </div>
  );
}

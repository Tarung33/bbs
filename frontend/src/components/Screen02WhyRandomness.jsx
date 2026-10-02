import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen02WhyRandomness({ message }) {
  const text = message || 'Meet me at 5 PM';

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <span className="text-xs text-[#555555] font-bold tracking-widest uppercase block">
        02 / 16 — THE CRYPTOGRAPHIC PROBLEM
      </span>

      {/* Large Editorial Heading */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans leading-tight">
        WE NEED SOMETHING UNPREDICTABLE.
      </h1>

      {/* Visual Contrast Box */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        <div className="flex items-center justify-around gap-4 text-center">
          
          {/* Message Side */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#555555] font-bold block uppercase">READABLE MESSAGE</span>
            <div className="p-3 bg-[#F7F7F5] border border-[#111111] text-base font-bold text-[#111111] font-sans">
              "{text}"
            </div>
          </div>

          <div className="text-2xl font-bold text-[#111111]">+</div>

          {/* Randomness Side */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#555555] font-bold block uppercase">SECRET RANDOMNESS</span>
            <div className="w-16 h-12 bg-[#111111] text-white flex items-center justify-center text-2xl font-bold font-mono mx-auto">
              ?
            </div>
          </div>

        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-lg mx-auto leading-relaxed">
        Cryptography needs unpredictable values to create secure encryption keys. Without true randomness, keys can be guessed.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="Before encrypting, we need an unpredictable sequence of random bits."
        why="If random numbers are predictable, an attacker can generate the key and decrypt the message easily."
        technical={`Entropy Requirement: High-entropy pseudorandom bitstream (PRNG)`}
      />

    </div>
  );
}

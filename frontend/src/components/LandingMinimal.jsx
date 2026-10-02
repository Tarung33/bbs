import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

export default function LandingMinimal({ message, setMessage, onBeginJourney }) {
  return (
    <div className="min-h-[75vh] flex flex-col justify-between py-12 px-4 max-w-4xl mx-auto font-sans">
      
      {/* Top Header & Large Editorial Typography */}
      <div className="space-y-6 text-left">
        
        <div className="inline-block px-3 py-1 bg-[#09090B] text-white font-mono text-[10px] font-bold tracking-widest uppercase">
          MUSEUM & RESEARCH EXHIBITION
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-black text-[#09090B] tracking-tighter leading-none">
          CRYPTOVISOR
        </h1>

        <p className="text-xl md:text-2xl font-heading font-bold text-[#52525B] tracking-tight">
          SEE ENCRYPTION. UNDERSTAND SECURITY.
        </p>

        <p className="text-sm md:text-base text-[#52525B] max-w-xl leading-relaxed font-sans">
          An interactive visualization of how cryptographic randomness, encryption and network interception transform a simple message.
        </p>

      </div>

      {/* Message Input Box & Begin Journey Button */}
      <div className="my-10 p-8 editorial-card space-y-6">
        <label className="block text-xs font-mono font-bold text-[#09090B] uppercase tracking-widest">
          YOUR MESSAGE:
        </label>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Meet me at 5 PM"
          className="w-full bg-[#FAFAFA] border-2 border-[#09090B] p-4 text-xl font-mono-code font-bold text-[#09090B] focus:outline-none"
        />

        <button
          onClick={onBeginJourney}
          className="w-full py-4 bg-[#09090B] hover:bg-[#27272A] text-white font-heading font-black text-sm tracking-widest uppercase flex items-center justify-center space-x-3 transition-colors cursor-pointer"
        >
          <span>BEGIN THE JOURNEY</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Tiny Bottom Timeline */}
      <div className="pt-6 border-t border-[#09090B] flex flex-wrap items-center justify-between text-[10px] font-mono text-[#52525B] tracking-widest uppercase gap-2">
        <span>01 MESSAGE</span>
        <span>·</span>
        <span>02 RANDOMNESS</span>
        <span>·</span>
        <span>03 KEY</span>
        <span>·</span>
        <span>04 ENCRYPT</span>
        <span>·</span>
        <span>05 NETWORK</span>
        <span>·</span>
        <span>06 INTERCEPT</span>
        <span>·</span>
        <span>07 DECRYPT</span>
      </div>

    </div>
  );
}

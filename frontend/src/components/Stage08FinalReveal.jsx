import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function Stage08FinalReveal({ message, onRestart }) {
  return (
    <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto font-sans text-[#09090B] py-6 text-center">
      
      {/* Stage Subtitle */}
      <div className="font-mono text-xs font-bold text-[#52525B] uppercase tracking-widest">
        07 / MESSAGE RESTORED
      </div>

      {/* Huge Restored Message Typography */}
      <div className="p-12 editorial-card-green space-y-4">
        <div className="text-4xl md:text-6xl font-mono-code font-black text-[#16A34A] tracking-wide">
          "{message || 'Meet me at 5 PM'}"
        </div>

        <div className="font-heading font-black text-xl tracking-widest text-[#09090B] uppercase pt-4 border-t border-[#16A34A]/40">
          THE MESSAGE SURVIVED THE JOURNEY.
        </div>
      </div>

      {/* Checklist Table */}
      <div className="max-w-xl mx-auto p-6 editorial-card font-mono text-xs space-y-3 text-left">
        <div className="font-bold text-[#52525B] border-b border-[#09090B] pb-2 uppercase text-[11px]">
          END-TO-END CRYPTOGRAPHIC RECOVERY CHECKLIST
        </div>

        <div className="flex justify-between items-center"><span className="text-[#09090B]">BBS RANDOMNESS</span> <span className="text-[#16A34A] font-bold">✓</span></div>
        <div className="flex justify-between items-center"><span className="text-[#09090B]">AES-256-GCM ENCRYPTION</span> <span className="text-[#16A34A] font-bold">✓</span></div>
        <div className="flex justify-between items-center"><span className="text-[#09090B]">NETWORK TRANSMISSION</span> <span className="text-[#16A34A] font-bold">✓</span></div>
        <div className="flex justify-between items-center"><span className="text-[#09090B]">ATTACKER INTERCEPTION</span> <span className="text-[#16A34A] font-bold">✓</span></div>
        <div className="flex justify-between items-center"><span className="text-[#09090B]">AUTHENTICATION TAG VERIFICATION</span> <span className="text-[#16A34A] font-bold">✓</span></div>
        <div className="flex justify-between items-center"><span className="text-[#09090B]">PLAINTEXT DECRYPTION</span> <span className="text-[#16A34A] font-bold">✓</span></div>
      </div>

      {/* Action Button & Brand Footer */}
      <div className="space-y-6 pt-4">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-[#09090B] hover:bg-[#27272A] text-white font-heading font-black text-xs uppercase tracking-widest inline-flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESTART THE JOURNEY</span>
        </button>

        <div className="space-y-1">
          <div className="font-heading font-black text-lg tracking-widest text-[#09090B]">
            CRYPTOVISOR
          </div>
          <div className="font-mono text-[10px] text-[#52525B] tracking-widest uppercase">
            SEE ENCRYPTION. UNDERSTAND SECURITY.
          </div>
        </div>
      </div>

    </div>
  );
}

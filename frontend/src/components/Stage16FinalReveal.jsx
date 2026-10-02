import React from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen16FinalReveal({ message, onRestart }) {
  const text = message || 'Meet me at 5 PM';

  const MILESTONES = [
    { title: 'BBS', desc: 'Generated unpredictable pseudorandomness' },
    { title: 'AES-GCM', desc: 'Protected confidentiality & calculated auth tag' },
    { title: 'NETWORK', desc: 'Carried ciphertext across untrusted channel' },
    { title: 'ATTACK', desc: 'Intercepted wire traffic but failed key recovery' },
    { title: 'DECRYPTION', desc: 'Verified tag and cleanly restored original text' }
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-12 text-center font-mono">
      
      {/* Step Counter */}
      <span className="text-xs text-[#555555] font-bold tracking-widest uppercase block">
        16 / 16 — JOURNEY REVEAL
      </span>

      {/* Huge Editorial Title */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] font-sans">
        THE MESSAGE MADE IT BACK.
      </h1>

      {/* Restored Message Display */}
      <div className="border-2 border-[#111111] bg-white p-8 md:p-12 space-y-4 shadow-sm max-w-xl mx-auto">
        <span className="text-xs text-[#555555] font-bold block uppercase tracking-wider">RESTORED PLAINTEXT</span>
        
        <div className="text-3xl md:text-5xl font-bold text-[#111111] font-sans tracking-tight">
          "{text}"
        </div>

        <div className="pt-4 border-t border-[#E4E4E7] text-xs font-bold text-[#16803C] uppercase tracking-wider">
          ✓ MESSAGE RESTORED & CRYPTOGRAPHICALLY VERIFIED
        </div>
      </div>

      {/* Milestone Breakdown */}
      <div className="border border-[#111111] bg-[#F7F7F5] p-6 max-w-xl mx-auto text-left space-y-3">
        <span className="text-xs font-bold text-[#111111] uppercase tracking-widest block border-b border-[#111111] pb-2">
          JOURNEY MILESTONES RECAP
        </span>

        <div className="space-y-2 text-xs font-mono">
          {MILESTONES.map((m, idx) => (
            <div key={idx} className="p-2.5 bg-white border border-[#E4E4E7] flex items-center justify-between">
              <span className="font-bold text-[#111111] w-24">{m.title}</span>
              <span className="text-[#555555] flex-1 text-right">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Restart Button */}
      <div className="pt-4">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white font-bold text-sm flex items-center space-x-2 mx-auto cursor-pointer shadow-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>BEGIN A NEW JOURNEY →</span>
        </button>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The message completed its cryptographic lifecycle from plaintext to ciphertext and back."
        why="Mathematical hardness and AEAD encryption guarantee privacy and integrity across open networks."
        technical={`Status: JOURNEY COMPLETE\nOverall Security: 100% Cryptographically Assurance`}
      />

    </div>
  );
}

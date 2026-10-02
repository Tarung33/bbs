import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

const ATTACK_STEPS = [
  { id: 1, title: '01 / INSPECT CIPHERTEXT', desc: 'Attacker inspects hex data. Result: Uniform random distribution. No text structure.' },
  { id: 2, title: '02 / ANALYZE PATTERNS', desc: 'Attacker runs frequency tests. Result: Entropy = 7.98 bits/byte. No repeating patterns.' },
  { id: 3, title: '03 / ATTEMPT KEY RECOVERY', desc: 'Attacker runs 2²⁵⁶ key space search. Result: 1.15 × 10⁷⁷ operations required. Impossible.' },
  { id: 4, title: '04 / ATTEMPT BBS PREDICTION', desc: 'Attacker tries state prediction. Result: Requires factoring n = p × q without p and q.' }
];

export default function Screen14Attack({ encryptionData }) {
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 20) || '8FA3721C91B402E4...';
  const [stepIdx, setStepIdx] = useState(0);

  const currentAtk = ATTACK_STEPS[stepIdx];

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#E53935] font-bold tracking-widest uppercase">
        <span>14 / 16 — THREAT INTERCEPTION</span>
        <span>ATTACK SIMULATION</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        PACKET INTERCEPTED
      </h1>

      {/* Interrupted Red Line Container */}
      <div className="border-2 border-[#E53935] bg-white p-6 space-y-6 shadow-sm max-w-xl mx-auto">
        
        {/* Red Warning Banner */}
        <div className="p-3 bg-[#FFEBEE] border border-[#E53935] text-[#E53935] font-bold text-xs">
          ⚠️ RED LINE INTERRUPTION: ATTACKER INTERCEPTED PACKET #A8F2
        </div>

        {/* Attacker Inventory */}
        <div className="grid grid-cols-2 gap-3 text-xs text-left font-bold">
          
          <div className="p-3 bg-[#F7F7F5] border border-[#111111] space-y-1">
            <span className="text-[10px] text-[#16803C] block uppercase font-bold">✓ ATTACKER HAS</span>
            <div className="text-[#111111] font-mono">{ciphertext}</div>
          </div>

          <div className="p-[#FFEBEE] p-3 bg-[#FFEBEE] border border-[#E53935] space-y-1">
            <span className="text-[10px] text-[#E53935] block uppercase font-bold">? ATTACKER WANTS</span>
            <div className="text-[#E53935]">Plaintext & Secret Key</div>
          </div>

        </div>

        {/* Attack Step Simulation Box */}
        <div className="p-4 bg-[#FFEBEE] border-2 border-[#E53935] text-left space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#E53935]">
            <span>{currentAtk.title}</span>
            <span>STATUS: DENIED</span>
          </div>

          <p className="text-xs text-[#111111] font-sans font-medium">
            {currentAtk.desc}
          </p>
        </div>

        {/* Attack Stepper Buttons */}
        <div className="grid grid-cols-4 gap-2 text-[10px]">
          {ATTACK_STEPS.map((atk, idx) => (
            <button
              key={atk.id}
              onClick={() => setStepIdx(idx)}
              className={`p-2 border font-bold cursor-pointer transition-colors ${
                idx === stepIdx
                  ? 'bg-[#E53935] text-white border-[#E53935]'
                  : idx < stepIdx
                  ? 'bg-[#FFEBEE] text-[#E53935] border-[#E53935]'
                  : 'bg-white text-[#555555] border-[#E4E4E7]'
              }`}
            >
              0{atk.id} {idx <= stepIdx ? '✕ DENIED' : 'PENDING'}
            </button>
          ))}
        </div>

        {/* Big Denied Box */}
        <div className="p-3 bg-[#E53935] text-white font-bold text-sm tracking-widest uppercase">
          ACCESS TO PLAINTEXT: DENIED
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="An attacker wiretap captures the ciphertext packet but fails all cryptanalytic attacks."
        why="Without the 256-bit AES key or prime factors p and q, ciphertext is mathematically unreadable."
        technical={`Intercepted Data: Ciphertext (${ciphertext})\nAttack Result: All key discovery operations DENIED`}
      />

    </div>
  );
}

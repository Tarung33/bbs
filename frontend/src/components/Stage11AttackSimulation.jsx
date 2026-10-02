import React, { useState } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import ExplanationPanel from './ExplanationPanel';

const ATTACKS = [
  {
    id: 1,
    title: '01 / 04 — INSPECT CIPHERTEXT',
    method: 'Direct Inspection & Hex Analysis',
    status: 'DENIED',
    result: 'Ciphertext appears as uniform random bytes. No human-readable structure or ASCII patterns exist.',
    math: 'H(X) = 7.989 bits/byte (High Entropy)'
  },
  {
    id: 2,
    title: '02 / 04 — ANALYZE BIT PATTERNS',
    method: 'Frequency Analysis & Autocorrelation Test',
    status: 'DENIED',
    result: 'Monobit test passed (equal 0s and 1s). Chi-square p-value > 0.05. No repeating frequency anomalies.',
    math: 'χ² test = 0.42 (Statistically Random)'
  },
  {
    id: 3,
    title: '03 / 04 — ATTEMPT KEY RECOVERY',
    method: 'Brute-Force Key Space Enumeration',
    status: 'DENIED',
    result: 'Searching 2²⁵⁶ keys requires > 1.15 × 10⁷⁷ operations. Exceeds computing power of all supercomputers combined.',
    math: 'Complexity: O(2²⁵⁶) operations'
  },
  {
    id: 4,
    title: '04 / 04 — ATTEMPT BBS PREDICTION',
    method: 'Backward State Prediction & Quadratic Residuosity',
    status: 'DENIED',
    result: 'Predicting previous BBS states from output bits requires finding prime factors p & q from modulus n.',
    math: 'Equivalent to Integer Factorization Problem (IFP)'
  }
];

export default function Stage11AttackSimulation() {
  const [attackIndex, setAttackIndex] = useState(0);

  const currentAttack = ATTACKS[attackIndex];

  const handleNextAttack = () => {
    if (attackIndex < ATTACKS.length - 1) {
      setAttackIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setAttackIndex(0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#DC2626] pb-3 flex flex-wrap justify-between items-end gap-2">
        <div>
          <span className="text-xs text-[#DC2626] font-bold uppercase tracking-widest block">
            STEP 11 / 14 — CRYPTANALYSIS SIMULATION
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
            ATTEMPTING RECOVERY ({attackIndex + 1} OF 4)
          </h2>
        </div>

        {/* Attack Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-[#FAFAFA] border border-[#09090B] text-xs font-bold text-[#09090B] flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          {attackIndex < ATTACKS.length - 1 && (
            <button
              onClick={handleNextAttack}
              className="px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <span>NEXT ATTACK ATTEMPT →</span>
            </button>
          )}
        </div>
      </div>

      {/* SINGLE ATTACK SIMULATION CARD */}
      <div className="border-2 border-[#DC2626] bg-white p-6 space-y-6 shadow-md">
        
        {/* Card Header */}
        <div className="flex justify-between items-center text-xs border-b border-[#FEF2F2] pb-3">
          <span className="font-bold text-[#DC2626] uppercase">{currentAttack.title}</span>
          <span className="px-2.5 py-1 bg-[#FEF2F2] border border-[#DC2626] font-bold text-[#DC2626]">
            STATUS: {currentAttack.status}
          </span>
        </div>

        {/* Method */}
        <div className="space-y-1">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase">
            ATTACK METHOD / TECHNIQUE
          </span>
          <div className="text-base font-bold text-[#09090B]">
            {currentAttack.method}
          </div>
        </div>

        {/* Result Breakdown */}
        <div className="p-4 bg-[#FEF2F2] border border-[#DC2626] space-y-2">
          <span className="text-[10px] text-[#DC2626] font-bold block uppercase">
            SIMULATION RESULT
          </span>
          <div className="text-sm font-bold text-[#09090B] leading-relaxed">
            {currentAttack.result}
          </div>
          <div className="text-xs font-bold text-[#DC2626] pt-1 border-t border-[#DC2626]">
            TECHNICAL METRIC: {currentAttack.math}
          </div>
        </div>

        {/* Attacker Progress Tracker */}
        <div className="grid grid-cols-4 gap-2 text-[10px] text-center pt-2">
          {ATTACKS.map((atk, idx) => (
            <button
              key={atk.id}
              onClick={() => setAttackIndex(idx)}
              className={`p-2 border font-bold cursor-pointer transition-colors ${
                idx === attackIndex
                  ? 'bg-[#DC2626] text-white border-[#DC2626]'
                  : idx < attackIndex
                  ? 'bg-[#FAFAFA] text-[#DC2626] border-[#DC2626]'
                  : 'bg-white text-[#52525B] border-[#E4E4E7]'
              }`}
            >
              0{atk.id} {idx <= attackIndex ? '✕ DENIED' : 'PENDING'}
            </button>
          ))}
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The attacker executes standard cryptanalytic attacks (inspection, pattern analysis, brute-force key search, and BBS state prediction)."
        why="Demonstrates why AES-256 and Blum Blum Shub modulo squaring resist ciphertext-only attacks."
        technical={`Attack Step: ${currentAttack.title}\nComplexity: ${currentAttack.math}\nOutcome: ${currentAttack.status}`}
      />

    </div>
  );
}

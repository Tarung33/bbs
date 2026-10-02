import React, { useState } from 'react';
import { ShieldAlert, XCircle, EyeOff, Zap } from 'lucide-react';

export default function Stage06Interception({ message, encryptionData }) {
  const [attempted, setAttempted] = useState(false);
  const [running, setRunning] = useState(false);

  const ciphertext = encryptionData.ciphertextHex?.slice(0, 24) || '8F A3 72 1C 91 4B 8A';

  const handleRunAttack = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setAttempted(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto font-sans text-[#09090B]">
      
      {/* Header */}
      <div className="border-b-2 border-[#DC2626] pb-4">
        <span className="font-mono text-xs font-bold text-[#DC2626] uppercase tracking-widest block">
          05 / INTERCEPTION
        </span>
        <h2 className="text-3xl font-heading font-black tracking-tight text-[#DC2626]">
          PACKET INTERCEPTED
        </h2>
        <p className="text-[#52525B] text-sm mt-1">
          "An attacker node intercepts the packet in transit. The attacker holds ciphertext but has no secret key."
        </p>
      </div>

      {/* Interrupted Red Network Line */}
      <div className="w-full journey-line-red relative my-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FEF2F2] border border-[#DC2626] px-3 py-1 text-[10px] font-bold text-[#DC2626]">
          ⚠ TRANSMISSION INTERRUPTED BY ADVERSARY
        </div>
      </div>

      {/* Visual Comparison: Attacker Sees vs Attacker Does Not Have */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        
        {/* Attacker Sees */}
        <div className="p-6 editorial-card-subtle space-y-3">
          <span className="font-bold text-[#09090B] uppercase block">01 / ATTACKER SEES (CIPHERTEXT):</span>
          <div className="p-4 bg-white border border-[#09090B] font-mono-code font-bold text-xs break-all">
            {ciphertext}...
          </div>
        </div>

        {/* Attacker Does Not Have */}
        <div className="p-6 editorial-card-red space-y-3">
          <span className="font-bold text-[#DC2626] uppercase block">02 / ATTACKER DOES NOT HAVE:</span>
          <div className="space-y-2 font-bold text-[#DC2626]">
            <div className="p-2 bg-white border border-[#DC2626] flex justify-between">
              <span>SECRET KEY:</span> <span>??????????</span>
            </div>
            <div className="p-2 bg-white border border-[#DC2626] flex justify-between">
              <span>PLAINTEXT:</span> <span>??????????</span>
            </div>
          </div>
        </div>

      </div>

      {/* Attack Simulation Action & Result Box */}
      <div className="p-8 editorial-card space-y-6 text-center font-mono">
        <div className="font-bold text-xs text-[#09090B] uppercase">
          EDUCATIONAL ATTACK VECTOR SIMULATION
        </div>

        <button
          onClick={handleRunAttack}
          disabled={running}
          className="px-8 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          {running ? 'EXECUTING SIMULATION...' : '[ ⚡ TRY TO READ MESSAGE ]'}
        </button>

        {attempted && (
          <div className="p-6 editorial-card-red space-y-3 text-left animate-fadeIn">
            <div className="font-bold text-xs border-b border-[#DC2626] pb-2 text-[#DC2626]">
              SIMULATION EXECUTION RESULTS:
            </div>
            <div className="text-xs space-y-1 font-bold text-[#DC2626]">
              <div>01 — INSPECT CIPHERTEXT ... DONE</div>
              <div>02 — ANALYZE PATTERNS ... FAILED (Entropy = 7.98 bits/byte)</div>
              <div>03 — ATTEMPT KEY RECOVERY ... FAILED (Keyspace 2^256 infeasible)</div>
              <div>04 — ATTEMPT BBS PREDICTION ... FAILED (Requires factoring n)</div>
            </div>

            <div className="p-4 bg-[#DC2626] text-white font-orbitron font-black text-center text-sm tracking-widest uppercase mt-4">
              ACCESS TO PLAINTEXT: DENIED
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

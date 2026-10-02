import React from 'react';
import { StepForward, Layers, CheckCircle2, Play } from 'lucide-react';

const MICRO_STEPS = [
  { id: 1, title: 'STEP 01: GENERATE PRIMES p & q', desc: 'Select Blum primes p ≡ 3 mod 4 and q ≡ 3 mod 4.' },
  { id: 2, title: 'STEP 02: CALCULATE MODULUS n', desc: 'Compute modulus n = p × q.' },
  { id: 3, title: 'STEP 03: GENERATE BBS SEQUENCE', desc: 'Iterate x(i+1) = x(i)² mod n and extract LSB bits.' },
  { id: 4, title: 'STEP 04: GENERATE AES KEY', desc: 'Group 8 bits per byte into a 256-bit symmetric key.' },
  { id: 5, title: 'STEP 05: AES-256-GCM ENCRYPTION', desc: 'Encrypt UTF-8 bytes into Ciphertext and 128-bit Auth Tag.' },
  { id: 6, title: 'STEP 06: TRANSMIT NETWORK PACKET', desc: 'Encapsulate into network packet and send through tunnel.' },
  { id: 7, title: 'STEP 07: ATTACK SIMULATION', desc: 'Adversary intercepts packet and attempts brute-force/BBS prediction.' },
  { id: 8, title: 'STEP 08: RECEIVER DECRYPTION & AUTH', desc: 'Authenticate GCM Auth Tag MAC and recover plaintext.' },
];

export default function StepByStepManager({ activeStep, setActiveStep, stepByStep, onStepNext }) {
  if (!stepByStep) return null;

  const currentMicro = MICRO_STEPS[Math.min(activeStep - 1, MICRO_STEPS.length - 1)];

  return (
    <div className="cyber-glass rounded-2xl p-5 border border-[#7C3AED]/40 mb-8 glow-purple font-mono text-xs animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/40">
            <Layers className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-[#718096] uppercase font-bold">STEP-BY-STEP ACADEMIC INSPECTION MODE</div>
            <h4 className="text-sm font-bold text-[#E6F7FF]">{currentMicro.title}</h4>
            <p className="text-[11px] text-[#718096] font-sans">{currentMicro.desc}</p>
          </div>
        </div>

        <button
          onClick={onStepNext}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#00F0FF] text-[#05070D] font-orbitron font-extrabold text-xs tracking-wider shadow-lg hover:opacity-95 transition-all glow-purple cursor-pointer active:scale-95"
        >
          <StepForward className="w-4 h-4 fill-current" />
          <span>NEXT STEP [0{Math.min(activeStep + 1, 8)}]</span>
        </button>

      </div>
    </div>
  );
}

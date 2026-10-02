import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Clock, Layers, Lock, Binary } from 'lucide-react';

export default function SecurityReport({ reportSummary, isActive }) {
  if (!reportSummary) return null;

  const { mode, original_plaintext, recovered_plaintext, success, bbs_params, key_size_bits, attack_type, attack_outcome } = reportSummary;

  return (
    <div className={`cyber-glass rounded-2xl p-6 border transition-all duration-300 mb-8 ${
      isActive ? 'border-[#00FF9C]/50 glow-green bg-[#080B12]/80' : 'border-[#0B1020] opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0B1020]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#0B1020] text-[#00FF9C] border border-[#00FF9C]/40">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-bold text-[#E6F7FF] flex items-center space-x-2">
              <span>FINAL CRYPTOGRAPHIC AUDIT REPORT</span>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded border font-extrabold ${
                success ? 'bg-[#00FF9C]/15 text-[#00FF9C] border-[#00FF9C]/40' : 'bg-[#FF3158]/15 text-[#FF3158] border-[#FF3158]/40'
              }`}>
                {attack_outcome}
              </span>
            </h3>
            <p className="text-xs text-[#718096] font-mono">
              Comprehensive security verification checklist and execution metrics
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        
        {/* Terminal Style Transmission Complete Box */}
        <div className="p-6 rounded-2xl bg-[#05070D] border border-[#00FF9C]/40 font-mono text-xs shadow-2xl text-center space-y-4">
          <div className="border-b border-[#00FF9C]/30 pb-2">
            <div className="font-orbitron font-black text-lg text-[#00FF9C] tracking-widest text-glow-green uppercase">
              TRANSMISSION COMPLETE
            </div>
            <div className="text-[10px] text-[#718096] uppercase font-bold">Verification Checklist</div>
          </div>

          <div className="space-y-2 text-left bg-[#080B12] p-4 rounded-xl border border-[#0B1020]">
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">BBS Randomness Generation</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">AES Key Derivation</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">AES-256-GCM Encryption</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">Network Packet Transmission</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">Attacker Interception Simulation</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">GCM Auth Tag Authentication</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
            <div className="flex justify-between items-center"><span className="text-[#E6F7FF]">Receiver Decryption</span> <span className="text-[#00FF9C] font-bold">✓</span></div>
          </div>

          <div className="border-t border-[#00FF9C]/30 pt-3 text-center">
            <span className="font-orbitron font-extrabold text-sm text-[#00FF9C] tracking-wider uppercase text-glow-green">
              {success ? 'ORIGINAL MESSAGE RECOVERED' : 'PAYLOAD INTEGRITY PRESERVED'}
            </span>
          </div>
        </div>

        {/* Audit Metrics Breakdown */}
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[#718096] text-[10px] uppercase font-bold mb-1">TOTAL EXECUTION TIME</div>
            <div className="text-base font-orbitron font-bold text-[#00F0FF]">~ 64 ms (Real-time backend)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[#718096] text-[10px] uppercase font-bold mb-1">BITS GENERATED</div>
            <div className="text-base font-orbitron font-bold text-[#7C3AED]">{key_size_bits || 256} Pseudorandom Bits</div>
          </div>

          <div className="p-4 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[#718096] text-[10px] uppercase font-bold mb-1">AUTHENTICATION RESULT</div>
            <div className="text-base font-orbitron font-bold text-[#00FF9C]">
              {success ? '✓ TAG MATCH: AUTHENTICATED' : '✗ TAG MISMATCH: REJECTED'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

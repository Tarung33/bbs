import React from 'react';
import { Unlock, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, FileText, ArrowRight } from 'lucide-react';

export default function DecryptionVisualizer({ decryptionData, isActive }) {
  const { status, success, recoveredPlaintext, details } = decryptionData;
  const isCompleted = status === 'COMPLETED';

  return (
    <div className={`cyber-glass rounded-2xl p-6 border transition-all duration-300 ${
      isActive
        ? success
          ? 'border-[#00FF9C]/50 glow-green bg-[#080B12]/80'
          : 'border-[#FF3158]/50 glow-danger bg-[#080B12]/80'
        : 'border-[#0B1020] opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0B1020]">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl border ${
            success
              ? 'bg-[#00FF9C]/15 text-[#00FF9C] border-[#00FF9C]/40'
              : success === false
              ? 'bg-[#FF3158]/15 text-[#FF3158] border-[#FF3158]/40'
              : 'bg-[#0B1020] text-[#718096] border-[#0B1020]'
          }`}>
            <Unlock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-bold text-[#E6F7FF] flex items-center space-x-2">
              <span>SECURE DECRYPTION & GCM TAG AUTHENTICATION</span>
              {isCompleted && (
                <span className={`text-xs font-mono px-2.5 py-0.5 rounded border font-extrabold ${
                  success
                    ? 'bg-[#00FF9C]/15 text-[#00FF9C] border-[#00FF9C]/40'
                    : 'bg-[#FF3158]/15 text-[#FF3158] border-[#FF3158]/40'
                }`}>
                  {success ? 'TAG MATCH: VERIFIED ✓' : 'TAG MISMATCH: REJECTED ✗'}
                </span>
              )}
            </h3>
            <p className="text-xs text-[#718096] font-mono">
              Receiver authenticates Galois/Counter Mode Auth Tag before releasing decrypted plaintext
            </p>
          </div>
        </div>
      </div>

      {/* Reverse Process Flow Diagram */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-[#05070D] border border-[#0B1020] mb-6 font-mono text-xs gap-2">
        <div className="flex items-center space-x-2 text-[#00F0FF] font-bold">
          <span>CIPHERTEXT</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#718096]" />
        
        <div className="flex items-center space-x-2 text-[#FFB020] font-bold">
          <span>AUTHENTICATION</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#718096]" />

        <div className="flex items-center space-x-2 text-[#7C3AED] font-bold">
          <span>AES-GCM ENGINE</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#718096]" />

        <div className="flex items-center space-x-2 text-[#00FF9C] font-bold">
          <span>PLAINTEXT REVEAL</span>
        </div>
      </div>

      {/* Auth Tag Verification Progress Bar */}
      <div className="p-5 rounded-xl bg-[#05070D] border border-[#0B1020] mb-6 font-mono">
        <div className="flex justify-between text-xs text-[#718096] mb-2 font-bold uppercase">
          <span>VERIFYING AUTHENTICATION TAG (MAC)...</span>
          <span className={success ? 'text-[#00FF9C]' : 'text-[#FF3158]'}>
            {success ? '✓ AUTHENTICATION SUCCESSFUL' : '✗ TAG MISMATCH'}
          </span>
        </div>
        <div className="w-full bg-[#0B1020] h-3 rounded-full overflow-hidden border border-[#0B1020]">
          <div
            className={`h-full transition-all duration-500 ${
              success ? 'bg-[#00FF9C]' : 'bg-[#FF3158]'
            }`}
            style={{ width: isCompleted ? '100%' : '50%' }}
          />
        </div>
      </div>

      {/* Message Recovered Card */}
      {isCompleted ? (
        <div className="p-6 rounded-2xl bg-[#05070D] border border-[#00FF9C]/40 text-center space-y-4 glow-green font-mono">
          <div className="inline-flex p-3 rounded-full bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/30">
            {success ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8 text-[#FF3158]" />}
          </div>

          <div>
            <div className="font-orbitron font-black text-xl text-[#00FF9C] tracking-wider uppercase text-glow-green">
              {success ? 'MESSAGE RECOVERED' : 'DECRYPTION REJECTED'}
            </div>
            <div className="text-xs text-[#718096] uppercase font-bold mt-1">
              {success ? 'Payload Authenticated & Restored' : 'Authentication Tag Failed Verification'}
            </div>
          </div>

          {success ? (
            <div className="p-4 rounded-xl bg-[#080B12] border border-[#00FF9C]/40 text-[#00FF9C] font-mono-code font-extrabold text-lg tracking-wide shadow-inner">
              "{recoveredPlaintext}"
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#1E080F] border border-[#FF3158]/50 text-[#FF3158] font-mono-code font-bold text-sm">
              ❌ TAMPERING DETECTED IN TRANSIT. PAYLOAD DISCARDED.
            </div>
          )}

          <div className="text-[11px] text-[#00FF9C] font-bold tracking-widest uppercase">
            {success ? '✓ VERIFIED' : '✗ UNVERIFIED'}
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-[#05070D] border border-[#0B1020] text-center font-mono text-[#718096] text-xs italic">
          Awaiting packet arrival at receiver...
        </div>
      )}

    </div>
  );
}

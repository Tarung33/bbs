import React from 'react';
import { ArrowRight, CheckCircle2, Lock, Unlock, Server } from 'lucide-react';

export default function Stage07Receiver({ message, decryptionData, encryptionData }) {
  const isCompleted = decryptionData.status === 'COMPLETED';
  const success = decryptionData.success !== false;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto font-sans text-[#09090B]">
      
      {/* Header */}
      <div className="border-b border-[#09090B] pb-4">
        <span className="font-mono text-xs font-bold text-[#52525B] uppercase tracking-widest block">
          06 / RECEIVER
        </span>
        <h2 className="text-3xl font-heading font-black tracking-tight text-[#09090B]">
          RECEIVER AUTHENTICATION & DECRYPTION
        </h2>
        <p className="text-[#52525B] text-sm mt-1">
          "The packet arrives at Bob. Bob authenticates the tag and uses the matching secret key to decrypt the payload."
        </p>
      </div>

      {/* Auth Tag Verification Card */}
      <div className="p-6 editorial-card-green space-y-4 font-mono text-xs text-center">
        <div className="font-bold text-[#16A34A] uppercase text-xs">
          01 / AUTHENTICATION TAG VERIFICATION
        </div>

        <div className="p-3 bg-white border border-[#16A34A] font-bold text-[#16A34A]">
          ✓ AUTH TAG VALID: INTEGRITY AND AUTHENTICITY CONFIRMED
        </div>
      </div>

      {/* Decryption Flow */}
      <div className="p-8 editorial-card space-y-6 font-mono text-xs">
        <div className="font-bold border-b border-[#09090B] pb-2 text-[#52525B] uppercase">
          02 / DECRYPTION FLOW
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
          <div className="p-4 bg-[#FAFAFA] border border-[#09090B]">
            <span className="text-[10px] text-[#52525B] block uppercase font-bold">CIPHERTEXT</span>
            <span className="text-xs font-bold break-all mt-1 block">
              {encryptionData.ciphertextHex?.slice(0, 16) || '8F A3 72 1C...'}
            </span>
          </div>

          <div className="text-[#16A34A] font-bold text-xs">
            <ArrowRight className="w-5 h-5 mx-auto mb-1 text-[#09090B]" />
            <span>+ SECRET KEY</span>
          </div>

          <div className="p-4 bg-[#F0FDF4] border border-[#16A34A]">
            <span className="text-[10px] text-[#16A34A] block uppercase font-bold">PLAINTEXT RESTORED</span>
            <span className="text-sm font-bold text-[#16A34A] mt-1 block">
              "{message || 'Meet me at 5 PM'}"
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

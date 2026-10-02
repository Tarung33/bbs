import React from 'react';
import { ArrowRight, Lock, FileText, Cpu, CheckCircle2 } from 'lucide-react';

export default function Stage04Encryption({ message, encryptionData, keyData }) {
  const ciphertext = encryptionData.ciphertextHex || '8F A3 72 1C 91 4B 8A 20';

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto font-sans text-[#09090B]">
      
      {/* Header */}
      <div className="border-b border-[#09090B] pb-4">
        <span className="font-mono text-xs font-bold text-[#52525B] uppercase tracking-widest block">
          03 / ENCRYPTION
        </span>
        <h2 className="text-3xl font-heading font-black tracking-tight text-[#09090B]">
          AES-256-GCM ENCRYPTION
        </h2>
        <p className="text-[#52525B] text-sm mt-1">
          "Encryption transforms readable data into unreadable ciphertext using the secret key."
        </p>
      </div>

      {/* Split Screen Transformation Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono text-xs">
        
        {/* LEFT: Plaintext */}
        <div className="p-6 editorial-card space-y-3 h-56 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#52525B] uppercase font-bold block mb-1">01 / READABLE PLAINTEXT</span>
            <div className="text-base font-bold text-[#09090B] p-3 bg-[#FAFAFA] border border-[#09090B]">
              "{message || 'Meet me at 5 PM'}"
            </div>
          </div>
          <div className="text-[10px] text-[#52525B] uppercase">Representation: UTF-8 Strings</div>
        </div>

        {/* CENTER: Key & AES Engine */}
        <div className="p-6 editorial-card-subtle space-y-4 text-center h-56 flex flex-col justify-between border-2 border-[#09090B]">
          <div className="font-bold text-[#09090B] uppercase">02 / MATHEMATICAL TRANSFORM</div>
          
          <div className="p-2.5 bg-[#09090B] text-white text-[11px] font-bold">
            AES-256-GCM AEAD
          </div>

          <ArrowRight className="w-5 h-5 text-[#09090B] mx-auto animate-pulse" />

          <div className="text-[10px] text-[#52525B] uppercase">96-bit Nonce & 128-bit Auth Tag</div>
        </div>

        {/* RIGHT: Ciphertext */}
        <div className="p-6 editorial-card space-y-3 h-56 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#52525B] uppercase font-bold block mb-1">03 / ENCRYPTED CIPHERTEXT</span>
            <div className="text-xs font-bold text-[#09090B] p-3 bg-[#FAFAFA] border border-[#09090B] break-all font-mono-code">
              {ciphertext}
            </div>
          </div>
          <div className="text-[10px] text-[#52525B] uppercase">Representation: Garbled Ciphertext</div>
        </div>

      </div>

      {/* Footer Explanation Note */}
      <div className="p-6 bg-[#FAFAFA] border border-[#09090B] space-y-2 text-xs">
        <div className="font-mono font-bold text-[#09090B] uppercase text-[11px]">WHAT CHANGED?</div>
        <p className="text-[#52525B] leading-relaxed font-sans text-sm">
          "Only the representation changed. The underlying information is protected by the cryptographic key."
        </p>
      </div>

    </div>
  );
}

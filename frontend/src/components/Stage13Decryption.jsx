import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage13Decryption({ message, decryptionData, encryptionData }) {
  const plaintext = message || decryptionData?.recoveredPlaintext || 'Meet me at 5 PM';
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 20) || '8FA3721C91B402E4...';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#16A34A] pb-3">
        <span className="text-xs text-[#16A34A] font-bold uppercase tracking-widest block">
          STEP 13 / 14 — AUTHORIZED DECRYPTION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          RECEIVER DECRYPTION
        </h2>
      </div>

      {/* Main Process Box */}
      <div className="border-2 border-[#16A34A] bg-white p-6 space-y-6 text-center shadow-sm">
        
        {/* Step 1: Packet Arrival & Auth Check */}
        <div className="p-4 bg-[#F0FDF4] border border-[#16A34A] space-y-2 inline-block w-full max-w-lg">
          <span className="text-[10px] text-[#16A34A] font-bold block uppercase">
            01 — AUTHENTICATION CHECK
          </span>
          <div className="text-lg font-bold text-[#16A34A]">
            ✓ AUTH TAG VALID
          </div>
          <div className="text-[11px] text-[#52525B]">
            AES-GCM tag matches computed checksum. Ciphertext has not been tampered with.
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Step 2: Decryption Formula */}
        <div className="p-4 bg-white border border-[#09090B] space-y-2 inline-block w-full max-w-lg">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase">
            02 — DECRYPTION OPERATION
          </span>
          <div className="text-xs text-[#52525B] font-bold">
            CIPHERTEXT + SECRET AES KEY
          </div>
          <div className="text-sm font-bold text-[#09090B] pt-1">
            AES-GCM-Decrypt(Key, Nonce, Ciphertext)
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Step 3: Recovered Message */}
        <div className="p-4 bg-[#FAFAFA] border-2 border-[#09090B] inline-block w-full max-w-lg">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            03 — RECOVERED PLAINTEXT
          </span>
          <div className="text-2xl font-bold text-[#09090B] font-sans">
            "{plaintext}"
          </div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The authorized receiver uses the matching secret key to decrypt the packet and recover the original plaintext."
        why="Only the party holding the secret key can decrypt the ciphertext. AES-GCM verifies authentication before yielding plaintext."
        technical={`Auth Check: Passed (Tag verified)\nDecryption Input: Ciphertext (${ciphertext}), AES-256 Key\nRecovered Output: "${plaintext}"`}
      />

    </div>
  );
}

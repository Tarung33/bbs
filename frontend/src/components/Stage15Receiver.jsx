import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen15Receiver({ message, decryptionData, encryptionData }) {
  const text = message || decryptionData?.recoveredPlaintext || 'Meet me at 5 PM';
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 16) || '8FA3721C91B402E4...';

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#16803C] font-bold tracking-widest uppercase">
        <span>15 / 16 — RECEIVER PROCESSING</span>
        <span>AUTHENTICATED DECRYPTION</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        RECEIVER DECRYPTION
      </h1>

      {/* Process Machine Card */}
      <div className="border-2 border-[#16803C] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        {/* Step 1: Packet Arrival & Verification */}
        <div className="p-4 bg-[#F0FDF4] border border-[#16803C] text-xs font-bold space-y-1">
          <span className="text-[10px] text-[#16803C] block uppercase">01 — PACKET RECEIVED</span>
          <div className="text-sm text-[#16803C]">✓ AUTHENTICATION TAG VERIFIED</div>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Step 2: Decryption Transformation */}
        <div className="p-4 bg-white border border-[#111111] text-xs space-y-1">
          <span className="text-[10px] text-[#555555] font-bold block uppercase">02 — DECRYPTION REVERSAL</span>
          <div className="font-bold text-[#111111]">{ciphertext} + SECRET KEY</div>
          <div className="text-[10px] text-[#555555]">CIPHERTEXT → BYTES → ASCII LETTERS</div>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Step 3: Restored Plaintext */}
        <div className="p-6 bg-[#F7F7F5] border-2 border-[#111111] space-y-2">
          <span className="text-xs text-[#555555] font-bold block uppercase">03 — RECOVERED PLAINTEXT</span>
          <div className="text-2xl md:text-3xl font-bold text-[#111111] font-sans">
            "{text}"
          </div>
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        The legitimate receiver uses the secret key to verify authentication and decrypt the message back into readable text.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The receiver verifies the AES-GCM tag and uses the matching key to reverse the ciphertext."
        why="Only the party with the secret key can decrypt the ciphertext and verify message authenticity."
        technical={`Auth Check: Passed\nDecryption Formula: P = AES-GCM-Decrypt(Key, Nonce, Ciphertext)\nResult: "${text}"`}
      />

    </div>
  );
}

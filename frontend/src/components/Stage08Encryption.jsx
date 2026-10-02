import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage08Encryption({ message, encryptionData, keyData }) {
  const [showFullCiphertext, setShowFullCiphertext] = useState(false);

  const plaintext = message || encryptionData?.plaintext || 'Meet me at 5 PM';
  const ciphertextHex = encryptionData?.ciphertextHex || '8FA3721C91B402E4F982A1B7C9D0E3F4567890123456789ABCDEF';
  const nonceHex = encryptionData?.nonceHex || '1234567890ABCDEF12345678';
  const authTagHex = encryptionData?.authTagHex || 'E4F982A1B7C9D0E3F456789012345678';
  const keyHex = keyData?.keyHex || 'A73F918C2D449E82B104F912C094D28E110A56BC78DE90F123456789ABCDEF01';

  const displayCiphertext = showFullCiphertext ? ciphertextHex : `${ciphertextHex.slice(0, 24)}...`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 08 / 14 — SYMMETRIC CIPHER ENCRYPTION
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          ENCRYPT THE MESSAGE (AES-256-GCM)
        </h2>
      </div>

      {/* Process Card */}
      <div className="border border-[#09090B] bg-white p-6 space-y-6 text-center shadow-sm">
        
        {/* Step 1: Plaintext */}
        <div className="p-4 bg-[#FAFAFA] border border-[#09090B] inline-block w-full max-w-lg">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            ORIGINAL PLAINTEXT
          </span>
          <div className="text-xl font-bold text-[#09090B] font-sans">
            "{plaintext}"
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Step 2: AES Engine */}
        <div className="p-4 bg-white border-2 border-[#09090B] space-y-2 inline-block w-full max-w-lg">
          <span className="text-xs text-[#52525B] font-bold uppercase block">
            AES-256-GCM ENCRYPTION ENGINE
          </span>
          <div className="text-xs text-[#52525B] font-bold flex flex-wrap justify-center gap-3 pt-1">
            <span className="px-2 py-1 bg-[#FAFAFA] border border-[#E4E4E7]">BBS KEY (256-bit)</span>
            <span className="px-2 py-1 bg-[#FAFAFA] border border-[#E4E4E7]">NONCE (96-bit)</span>
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Step 3: Ciphertext Output */}
        <div className="p-4 bg-[#FAFAFA] border-2 border-[#09090B] inline-block w-full max-w-lg">
          <span className="text-xs text-[#52525B] font-bold block uppercase mb-1">
            AUTHENTICATED CIPHERTEXT (HEX)
          </span>
          <div className="text-sm md:text-base font-bold text-[#09090B] break-all tracking-wider">
            {displayCiphertext}
          </div>

          <div className="mt-3 pt-3 border-t border-[#E4E4E7] grid grid-cols-2 gap-2 text-[10px] text-[#52525B]">
            <div>
              <span className="block font-bold uppercase">NONCE:</span>
              <span className="font-mono">{nonceHex.slice(0, 12)}...</span>
            </div>
            <div>
              <span className="block font-bold uppercase">AUTH TAG:</span>
              <span className="font-mono">{authTagHex.slice(0, 12)}...</span>
            </div>
          </div>

          {ciphertextHex.length > 24 && (
            <button
              onClick={() => setShowFullCiphertext(!showFullCiphertext)}
              className="mt-3 text-xs font-bold text-[#52525B] hover:text-[#09090B] underline cursor-pointer"
            >
              {showFullCiphertext ? '[ SHOW LESS ]' : `[ SHOW FULL CIPHERTEXT ]`}
            </button>
          )}
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="AES-256-GCM transforms readable plaintext into unreadable ciphertext using the BBS key and generates an authentication tag."
        why="Encryption protects confidentiality so eavesdroppers cannot read the message. The Galois Counter Mode (GCM) auth tag protects integrity so tampering is detected immediately."
        technical={`Cipher Algorithm: AES-256-GCM\nPlaintext: "${plaintext}"\nKey (Hex): ${keyHex.slice(0, 16)}...\nNonce: ${nonceHex}\nAuth Tag: ${authTagHex}\nCiphertext: ${ciphertextHex}`}
      />

    </div>
  );
}

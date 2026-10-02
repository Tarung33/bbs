import React, { useState } from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen12Encryption({ message, encryptionData, keyData }) {
  const [showFullCiphertext, setShowFullCiphertext] = useState(false);

  const text = message || encryptionData?.plaintext || 'Meet me at 5 PM';
  const ciphertextHex = encryptionData?.ciphertextHex || '8FA3721C91B402E4F982A1B7C9D0E3F4567890123456789ABCDEF';
  const nonceHex = encryptionData?.nonceHex || '1234567890ABCDEF12345678';
  const authTagHex = encryptionData?.authTagHex || 'E4F982A1B7C9D0E3F456789012345678';

  const displayCiphertext = showFullCiphertext ? ciphertextHex : `${ciphertextHex.slice(0, 24)}...`;

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>12 / 16 — AES-256-GCM ENCRYPTION</span>
        <span>TRANSFORMATION STAGE</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        ENCRYPT THE MESSAGE
      </h1>

      {/* Process Machine */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-6 shadow-sm max-w-xl mx-auto">
        
        {/* Step 1: Plaintext */}
        <div className="p-4 bg-[#F7F7F5] border border-[#111111]">
          <span className="text-[10px] text-[#555555] font-bold block uppercase mb-1">
            ORIGINAL PLAINTEXT
          </span>
          <div className="text-xl md:text-2xl font-bold text-[#111111] font-sans">
            "{text}"
          </div>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Step 2: AES Engine */}
        <div className="p-4 bg-white border-2 border-[#111111] space-y-2">
          <span className="text-xs text-[#555555] font-bold block uppercase">
            AES-256-GCM ENCRYPTION ENGINE
          </span>
          <div className="text-xs font-bold text-[#111111] flex justify-center space-x-3 pt-1">
            <span className="px-2 py-1 bg-[#F7F7F5] border border-[#111111]">KEY + NONCE</span>
          </div>
        </div>

        <div className="text-[#111111] font-bold text-xl">↓</div>

        {/* Step 3: Ciphertext */}
        <div className="p-6 bg-[#F7F7F5] border-2 border-[#111111] space-y-2">
          <span className="text-xs text-[#555555] font-bold block uppercase">
            AUTHENTICATED CIPHERTEXT
          </span>
          
          <div className="text-lg md:text-xl font-bold text-[#111111] break-all tracking-wider">
            {displayCiphertext}
          </div>

          <div className="pt-2 border-t border-[#E4E4E7] grid grid-cols-2 gap-2 text-[10px] text-[#555555]">
            <div>NONCE: {nonceHex.slice(0, 10)}...</div>
            <div>TAG: {authTagHex.slice(0, 10)}...</div>
          </div>

          {ciphertextHex.length > 24 && (
            <button
              onClick={() => setShowFullCiphertext(!showFullCiphertext)}
              className="mt-2 text-xs font-bold text-[#555555] hover:text-[#111111] underline cursor-pointer"
            >
              {showFullCiphertext ? '[ HIDE FULL CIPHERTEXT ]' : '[ SHOW FULL CIPHERTEXT ]'}
            </button>
          )}
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        Plaintext has been transformed into ciphertext using the BBS key and AES-GCM encryption.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="AES-256-GCM transforms readable plaintext into unreadable ciphertext and computes a Galois auth tag."
        why="Ciphertext protects content privacy across public networks while the auth tag guarantees data integrity."
        technical={`Algorithm: AES-256-GCM\nPlaintext: "${text}"\nCiphertext: ${ciphertextHex}`}
      />

    </div>
  );
}

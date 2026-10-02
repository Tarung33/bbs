import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage10Interception({ encryptionData }) {
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 24) || '8FA3721C91B402E4F982A1B7...';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#DC2626] pb-3">
        <span className="text-xs text-[#DC2626] font-bold uppercase tracking-widest block">
          STEP 10 / 14 — THREAT INTERCEPT
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          PACKET INTERCEPTED
        </h2>
      </div>

      {/* Network Interruption View */}
      <div className="border-2 border-[#DC2626] bg-white p-6 space-y-6 shadow-sm">
        
        {/* Interception Header */}
        <div className="flex justify-between items-center text-xs font-bold p-3 bg-[#FEF2F2] border border-[#DC2626] text-[#DC2626]">
          <span>⚠️ ALERT: UNTRUSTED WIRE TAP DETECTED</span>
          <span>PACKET #A8F2 INTERCEPTED</span>
        </div>

        {/* Visual Line Interruption */}
        <div className="relative py-4 flex items-center justify-center">
          <div className="w-full h-0.5 bg-[#DC2626]" />
          
          {/* Central Attacker Node */}
          <div className="absolute p-4 bg-white border-2 border-[#DC2626] shadow-md text-center text-xs space-y-2 max-w-md w-full">
            <div className="flex justify-between items-center text-[10px] text-[#DC2626] font-bold border-b border-[#FEF2F2] pb-1">
              <span>ATTACKER NODE (EAVESDROPPER)</span>
              <span>INTERCEPTED STATE</span>
            </div>

            <div className="p-2.5 bg-[#FEF2F2] border border-[#DC2626] text-left text-xs space-y-1">
              <span className="text-[10px] font-bold text-[#DC2626] block uppercase">
                ATTACKER SEES (INTERCEPTED CIPHERTEXT):
              </span>
              <div className="font-bold text-[#09090B] break-all">
                {ciphertext}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-left pt-1">
              <div className="p-2 bg-[#FAFAFA] border border-[#E4E4E7]">
                <span className="block font-bold text-[#DC2626] uppercase">SECRET KEY:</span>
                <span className="font-bold text-[#52525B]">NOT AVAILABLE (?)</span>
              </div>
              <div className="p-2 bg-[#FAFAFA] border border-[#E4E4E7]">
                <span className="block font-bold text-[#DC2626] uppercase">PLAINTEXT:</span>
                <span className="font-bold text-[#52525B]">NOT AVAILABLE (?)</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="An eavesdropper on the network intercepts the encrypted packet in transit."
        why="Security systems assume the attacker can capture all network traffic (Kerckhoffs's principle). Confidentiality relies entirely on cryptographic strength, not path secrecy."
        technical={`Intercepted Data: Ciphertext (8FA3721C...)\nMissing Prerequisites: Secret AES Key, BBS Prime Factors (p, q)`}
      />

    </div>
  );
}

import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage09Network({ networkData, encryptionData }) {
  const packetId = networkData?.packet?.packet_id || '#A8F2';
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 16) || '8FA3721C91B402E4...';
  const nonce = encryptionData?.nonceHex?.slice(0, 12) || '1234567890AB';
  const authTag = encryptionData?.authTagHex?.slice(0, 12) || 'E4F982A1B7C9';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3">
        <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
          STEP 09 / 14 — TRANSMISSION CHANNEL
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
          NETWORK TRANSMISSION
        </h2>
      </div>

      {/* Spacious Network Flow */}
      <div className="border border-[#09090B] bg-white p-8 space-y-8 shadow-sm">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Sender Node */}
          <div className="w-full md:w-1/4 p-4 border border-[#09090B] bg-[#FAFAFA] text-center space-y-1">
            <span className="text-[10px] text-[#52525B] font-bold uppercase block">ORIGIN</span>
            <div className="text-lg font-bold text-[#09090B]">SENDER NODE</div>
            <div className="text-[10px] text-[#16A34A] font-bold">● ONLINE</div>
          </div>

          {/* Network Transmission Path & Animated Packet */}
          <div className="flex-1 w-full space-y-3">
            <div className="text-[10px] text-[#52525B] font-bold text-center uppercase tracking-widest">
              PUBLIC UNTRUSTED NETWORK CHANNEL
            </div>

            {/* Line with moving packet */}
            <div className="relative py-6 flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#09090B]" />
              
              {/* Central Packet Card */}
              <div className="absolute p-3 bg-white border-2 border-[#09090B] shadow-md text-center text-xs space-y-1 max-w-xs w-full">
                <div className="flex justify-between items-center text-[10px] text-[#52525B] font-bold border-b border-[#E4E4E7] pb-1">
                  <span>PACKET {packetId}</span>
                  <span className="text-[#09090B]">AES-256-GCM</span>
                </div>
                <div className="text-[11px] font-bold text-[#09090B] pt-1">
                  CIPHERTEXT: {ciphertext}
                </div>
                <div className="text-[9px] text-[#52525B] flex justify-between">
                  <span>NONCE: {nonce}</span>
                  <span>TAG: {authTag}</span>
                </div>
                <div className="text-[9px] font-bold text-[#16A34A] pt-0.5">
                  ✓ NO PLAINTEXT EXPOSED
                </div>
              </div>
            </div>
          </div>

          {/* Receiver Node */}
          <div className="w-full md:w-1/4 p-4 border border-[#09090B] bg-[#FAFAFA] text-center space-y-1">
            <span className="text-[10px] text-[#52525B] font-bold uppercase block">DESTINATION</span>
            <div className="text-lg font-bold text-[#09090B]">RECEIVER NODE</div>
            <div className="text-[10px] text-[#52525B] font-bold">WAITING...</div>
          </div>

        </div>

      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The encrypted packet travels across an unencrypted public network from sender to receiver."
        why="Networks pass packets through multiple routers and switches where raw wire data can be logged or sniffed. Encrypting the payload ensures privacy across untrusted hops."
        technical={`Packet Identifier: ${packetId}\nNetwork Payload: { nonce, ciphertext, auth_tag }\nPlaintext Exposure: 0 bytes`}
      />

    </div>
  );
}

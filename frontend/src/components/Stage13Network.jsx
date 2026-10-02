import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen13Network({ encryptionData, networkData }) {
  const packetId = networkData?.packet?.packet_id || '#A8F2';
  const ciphertext = encryptionData?.ciphertextHex?.slice(0, 16) || '8FA3721C91B402E4...';

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8 text-center font-mono">
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-xs text-[#555555] font-bold tracking-widest uppercase">
        <span>13 / 16 — TRANSMISSION CHANNEL</span>
        <span>NETWORK ROUTING</span>
      </div>

      {/* Large Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
        NETWORK TRANSMISSION
      </h1>

      {/* Clean Network Line */}
      <div className="border-2 border-[#111111] bg-white p-8 space-y-8 shadow-sm max-w-2xl mx-auto">
        
        <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
          <div className="p-3 bg-[#F7F7F5] border border-[#111111]">
            <span>SENDER NODE</span>
            <span className="text-[10px] text-[#16803C] block font-normal">● ONLINE</span>
          </div>

          <div className="flex-1 px-4 relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-[#111111]" />
            
            {/* Moving Packet Card */}
            <div className="absolute p-3 bg-white border-2 border-[#111111] shadow-md text-center text-xs space-y-1">
              <span className="text-[10px] text-[#555555] font-bold block uppercase">PACKET {packetId} 🔐</span>
              <div className="font-bold text-[#111111]">{ciphertext}</div>
              <span className="text-[9px] text-[#16803C] font-bold block">✓ ENCRYPTED PAYLOAD</span>
            </div>
          </div>

          <div className="p-3 bg-[#F7F7F5] border border-[#111111]">
            <span>RECEIVER NODE</span>
            <span className="text-[10px] text-[#555555] block font-normal">WAITING...</span>
          </div>
        </div>

      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        The encrypted packet travels across a public, untrusted network. The payload contains zero plaintext data.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="The encrypted packet travels across an unencrypted network from sender to receiver."
        why="Networks route data through public switches where wire traffic can be sniffed. Encrypting payload guarantees privacy."
        technical={`Packet Header: ${packetId}\nPayload: AES-GCM Ciphertext + Nonce + Auth Tag`}
      />

    </div>
  );
}

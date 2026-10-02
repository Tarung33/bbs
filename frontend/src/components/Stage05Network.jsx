import React from 'react';
import { ArrowRight, Lock, Server } from 'lucide-react';

export default function Stage05Network({ networkData, encryptionData }) {
  const packetId = networkData.packet?.packet_id || 'PKT #A8F2';
  const ciphertext = encryptionData.ciphertextHex?.slice(0, 20) || '8F A3 72 1C 91 4B';

  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto font-sans text-[#09090B]">
      
      {/* Header */}
      <div className="border-b border-[#09090B] pb-4">
        <span className="font-mono text-xs font-bold text-[#52525B] uppercase tracking-widest block">
          04 / TRANSMISSION
        </span>
        <h2 className="text-3xl font-heading font-black tracking-tight text-[#09090B]">
          NETWORK CHANNEL TRANSMISSION
        </h2>
        <p className="text-[#52525B] text-sm mt-1">
          "The encrypted packet travels slowly across open network channels to Bob."
        </p>
      </div>

      {/* Spacious Network Transit Diagram */}
      <div className="p-10 editorial-card space-y-8 font-mono text-xs">
        
        <div className="flex items-center justify-between font-bold text-xs">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-[#09090B]" />
            <span>SENDER (ALICE)</span>
          </div>

          <span className="text-[#52525B] font-mono text-[10px]">SECURE TRANSIT TUNNEL</span>

          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-[#09090B]" />
            <span>RECEIVER (BOB)</span>
          </div>
        </div>

        {/* Thin Black Network Channel Line */}
        <div className="w-full journey-line relative my-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 border border-[#09090B] py-1 text-[10px] font-bold">
            NO PLAINTEXT ON WIRE
          </div>
        </div>

        {/* Moving Encrypted Packet Card */}
        <div className="p-6 bg-[#09090B] text-white rounded space-y-3 max-w-md mx-auto shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-2 text-[11px] font-bold">
            <span className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5" />
              <span>PACKET {packetId}</span>
            </span>
            <span className="text-[#16A34A] text-[10px]">AES-256-GCM</span>
          </div>

          <div className="space-y-1 text-left text-[11px]">
            <span className="text-[#A1A1AA] text-[10px] block">PAYLOAD (CIPHERTEXT):</span>
            <div className="p-2 bg-[#27272A] text-white font-mono-code text-[11px] break-all">
              {ciphertext}...
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Shield, Eye, EyeOff, X, Code, FileText, Lock, Network, Binary, Key } from 'lucide-react';

export default function CryptoInspectorDrawer({ activeStep, bbsData, keyData, encryptionData, networkData, attackData, decryptionData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);

  return (
    <div className="fixed top-24 right-4 z-40">
      
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#080B12] hover:bg-[#0B1020] text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-bold shadow-xl glow-cyan"
        >
          <Code className="w-4 h-4" />
          <span>CRYPTO INSPECTOR</span>
        </button>
      )}

      {/* Expandable Right Drawer */}
      {isOpen && (
        <div className="w-80 md:w-96 cyber-glass rounded-2xl p-5 border border-[#00F0FF]/40 shadow-2xl glow-cyan animate-fadeIn text-xs font-mono text-[#E6F7FF]">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#0B1020] mb-4">
            <div className="flex items-center space-x-2 text-[#00F0FF] font-bold">
              <Shield className="w-4 h-4" />
              <span>CRYPTO INSPECTOR</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSensitive(!showSensitive)}
                className="text-[10px] bg-[#0B1020] px-2 py-1 rounded text-[#00FF9C] border border-[#00FF9C]/30 font-bold"
              >
                {showSensitive ? 'HIDE DETAILS' : 'SHOW DETAILS'}
              </button>

              <button onClick={() => setIsOpen(false)} className="text-[#718096] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Stage Technical Data Breakdown */}
          <div className="space-y-4">
            
            {/* Stage 1: BBS */}
            <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
              <div className="flex items-center justify-between font-bold text-[#00F0FF] mb-1.5">
                <span className="flex items-center space-x-1.5">
                  <Binary className="w-3.5 h-3.5" />
                  <span>BBS Generator State</span>
                </span>
                <span className="text-[10px] text-[#718096]">{bbsData.bits?.length || 0} bits</span>
              </div>

              <div className="space-y-1 text-[11px] text-[#718096]">
                <div>Modulus n: <span className="text-[#E6F7FF] font-bold">{bbsData.params?.n || '192649'}</span></div>
                <div>Seed s: <span className="text-[#FFB020] font-bold">{showSensitive ? bbsData.params?.seed : '••••••'}</span></div>
                <div>State x₀: <span className="text-[#00FF9C] font-bold">{bbsData.params?.x0 || 'N/A'}</span></div>
              </div>
            </div>

            {/* Stage 2: Key */}
            <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
              <div className="flex items-center justify-between font-bold text-[#7C3AED] mb-1.5">
                <span className="flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5" />
                  <span>Symmetric Key Material</span>
                </span>
                <span className="text-[10px] text-[#718096]">{keyData.keySizeBits || 256} bits</span>
              </div>

              <div className="space-y-1 text-[11px] text-[#718096]">
                <div>Algorithm: <span className="text-[#E6F7FF]">AES-{keyData.keySizeBits || 256}-GCM</span></div>
                <div>Derived Key Hex:</div>
                <div className="p-1.5 rounded bg-[#080B12] text-[#00FF9C] break-all text-[10px] border border-[#0B1020]">
                  {showSensitive ? (keyData.keyHex || 'A7 3F 91 8C 2D 44...') : '•••• •••• •••• •••• •••• ••••'}
                </div>
              </div>
            </div>

            {/* Stage 3: Encryption */}
            <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
              <div className="flex items-center justify-between font-bold text-[#00FF9C] mb-1.5">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>AES-GCM Ciphertext</span>
                </span>
                <span className="text-[10px] text-[#718096]">AEAD</span>
              </div>

              <div className="space-y-1 text-[11px] text-[#718096]">
                <div>Nonce (96-bit): <span className="text-[#7C3AED]">{encryptionData.nonceHex || '74 19 37 16...'}</span></div>
                <div>Auth Tag (128-bit MAC): <span className="text-[#00FF9C]">{encryptionData.authTagHex || 'A3 68 51 81...'}</span></div>
                <div>Ciphertext Payload:</div>
                <div className="p-1.5 rounded bg-[#080B12] text-[#00F0FF] break-all text-[10px] border border-[#0B1020]">
                  {encryptionData.ciphertextHex || 'N/A'}
                </div>
              </div>
            </div>

            {/* Stage 4: Network Packet */}
            <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
              <div className="flex items-center justify-between font-bold text-[#00F0FF] mb-1.5">
                <span className="flex items-center space-x-1.5">
                  <Network className="w-3.5 h-3.5" />
                  <span>Network Transit Packet</span>
                </span>
                <span className="text-[10px] text-[#718096]">{networkData.packet?.packet_id || 'PKT-8A92'}</span>
              </div>

              <div className="space-y-1 text-[11px] text-[#718096]">
                <div>Source: <span className="text-[#E6F7FF]">Alice (192.168.1.10)</span></div>
                <div>Destination: <span className="text-[#E6F7FF]">Bob (192.168.1.50)</span></div>
                <div>Checksum: <span className="text-[#FFB020]">{networkData.packet?.header?.checksum || '225287D0'}</span></div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

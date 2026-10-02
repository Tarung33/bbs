import React from 'react';
import { Lock, ArrowRight, Cpu, Key, FileText, CheckCircle2 } from 'lucide-react';

export default function EncryptionSplitVisualizer({ encryptionData, keyData }) {
  const { plaintext, plaintextHex, nonceHex, authTagHex, ciphertextHex, isEncrypted } = encryptionData;

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-[#00F0FF]/30 mb-8 glow-cyan">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0B1020]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#0B1020] text-[#00F0FF] border border-[#00F0FF]/40">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-bold text-[#E6F7FF]">
              ENCRYPTION ENGINE (SPLIT TRANSFORM VISUALIZER)
            </h3>
            <p className="text-xs text-[#718096] font-mono">
              Live data block transformation from plaintext bytes into authenticated ciphertext
            </p>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center font-mono text-xs">
        
        {/* LEFT: Plaintext */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#05070D] border border-[#00F0FF]/40 flex flex-col justify-between h-56 shadow-xl">
          <div>
            <div className="flex items-center space-x-2 text-[#00F0FF] font-bold text-xs mb-2">
              <FileText className="w-4 h-4" />
              <span>PLAINTEXT INPUT</span>
            </div>
            <div className="text-slate-500 text-[10px] mb-1 uppercase font-bold">Raw Text:</div>
            <div className="p-3 rounded-lg bg-[#080B12] text-[#E6F7FF] font-bold text-sm border border-[#0B1020]">
              "{plaintext || 'Confidential message from AIT'}"
            </div>
          </div>

          <div>
            <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">UTF-8 Hex Bytes:</div>
            <div className="p-2 rounded bg-[#080B12] text-[#00F0FF] text-[11px] break-all border border-[#0B1020]">
              {plaintextHex || '48 65 6C 6C 6F...'}
            </div>
          </div>
        </div>

        {/* CENTER: AES-256-GCM Engine & Animated Data Flow */}
        <div className="lg:col-span-3 p-5 rounded-xl bg-[#0B1020]/90 border border-[#7C3AED]/50 flex flex-col justify-between h-56 shadow-xl text-center relative overflow-hidden">
          
          <div className="flex items-center justify-center space-x-2 text-[#7C3AED] font-bold">
            <Cpu className="w-5 h-5 animate-spin" />
            <span>AES-256-GCM ENGINE</span>
          </div>

          {/* Key & Nonce Parameters */}
          <div className="space-y-2 py-2">
            <div className="p-2 rounded bg-[#05070D] border border-[#7C3AED]/40 text-[11px] flex justify-between">
              <span className="text-[#718096]">BBS KEY:</span>
              <span className="text-[#00FF9C] font-bold">{keyData.keyHex ? keyData.keyHex.slice(0, 16) + '...' : 'A7 3F 91 8C...'}</span>
            </div>

            <div className="p-2 rounded bg-[#05070D] border border-[#7C3AED]/40 text-[11px] flex justify-between">
              <span className="text-[#718096]">NONCE (96-bit):</span>
              <span className="text-[#7C3AED] font-bold">{nonceHex || '74 19 37 16...'}</span>
            </div>
          </div>

          {/* Block Motion Indicator */}
          <div className="flex items-center justify-center space-x-2 text-[#00FF9C] font-bold text-xs animate-pulse">
            <ArrowRight className="w-4 h-4" />
            <span>ENCRYPTING DATA BLOCKS</span>
            <ArrowRight className="w-4 h-4" />
          </div>

        </div>

        {/* RIGHT: Ciphertext */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#05070D] border border-[#00FF9C]/40 flex flex-col justify-between h-56 shadow-xl">
          <div>
            <div className="flex items-center space-x-2 text-[#00FF9C] font-bold text-xs mb-2">
              <Lock className="w-4 h-4" />
              <span>CIPHERTEXT OUTPUT</span>
            </div>
            <div className="text-slate-500 text-[10px] mb-1 uppercase font-bold">Encrypted Payload:</div>
            <div className="p-3 rounded-lg bg-[#080B12] text-[#00F0FF] font-bold text-xs break-all border border-[#0B1020]">
              {ciphertextHex || '9F A3 72 1C 88 42...'}
            </div>
          </div>

          <div>
            <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">GCM Auth Tag (MAC):</div>
            <div className="p-2 rounded bg-[#080B12] text-[#00FF9C] text-[11px] break-all border border-[#0B1020]">
              {authTagHex || 'A3 68 51 81...'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

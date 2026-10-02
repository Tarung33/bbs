import React from 'react';
import { Lock, FileText, Cpu, ShieldCheck, Hash, ArrowDown, Code } from 'lucide-react';
import Tooltip from './Tooltip';

export default function AesVisualizer({ encryptionData, isActive, showInternalProcess }) {
  const { plaintext, plaintextHex, nonceHex, authTagHex, ciphertextHex, isEncrypted } = encryptionData;

  return (
    <div className={`glass-panel rounded-2xl p-6 border transition-all duration-300 ${
      isActive ? 'border-teal-500/50 glow-emerald bg-slate-900/80' : 'border-slate-800/60 opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-950 text-teal-400 border border-teal-700/50">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <span>AES-256-GCM AUTHENTICATED ENCRYPTION ENGINE</span>
              <Tooltip
                title="AES-GCM (AEAD)"
                content="Galois/Counter Mode provides simultaneous confidentiality (via CTR mode) and integrity authentication (via Galois Field GHASH tag)."
              >
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                  AEAD Mode
                </span>
              </Tooltip>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Galois/Counter Mode: Simultaneous confidentiality and cryptographic integrity authentication
            </p>
          </div>
        </div>
      </div>

      {/* Internal Technical Details Panel (Shown when SHOW INTERNAL PROCESS is active) */}
      {showInternalProcess && (
        <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/60 mb-6 font-mono text-xs text-teal-200 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 font-bold text-teal-400 border-b border-teal-900/60 pb-1">
            <Code className="w-4 h-4" />
            <span>AES-256-GCM MATHEMATICAL & PROTOCOL SPECIFICATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div>• <span className="text-slate-400">CTR Mode Encryption:</span> C_i = P_i ⊕ AES_K(Nonce || i)</div>
            <div>• <span className="text-slate-400">GHASH Auth Tag:</span> Auth Tag = GHASH_H(Ciphertext || Lengths) ⊕ E_K(J0)</div>
            <div>• <span className="text-slate-400">Nonce Size:</span> 96 bits (12 bytes) guarantees non-repeating counter block</div>
            <div>• <span className="text-slate-400">Tag Length:</span> 128 bits (16 bytes) MAC guarantees forgery resilience</div>
          </div>
        </div>
      )}

      {/* Conceptual Stages Flow Grid */}
      <div className="space-y-4 font-mono text-xs">
        
        {/* Stage 1: Plaintext & UTF-8 Bytes */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-300 font-bold mb-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>STAGE 1: PLAINTEXT & UTF-8 BYTE REPRESENTATION</span>
            <Tooltip title="UTF-8 Plaintext Bytes" content="Original text encoded into raw byte array before entering AES block cipher." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Raw Plaintext:</span>
              <span className="text-sm font-bold text-slate-100">{plaintext || 'Awaiting input...'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">UTF-8 Hex Bytes:</span>
              <span className="text-sm font-bold text-cyan-400 break-all">{plaintextHex || '48 65 6C 6C 6F...'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-5 h-5 text-teal-400 animate-bounce" />
        </div>

        {/* Stage 2: Nonce / IV Generation */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-300 font-bold mb-2">
            <Hash className="w-4 h-4 text-purple-400" />
            <span>STAGE 2: UNIQUE NONCE (INITIALIZATION VECTOR) GENERATION</span>
            <Tooltip title="Nonce / IV" content="Number used once. Ensures two identical messages yield different ciphertexts under the same key." />
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-500 block">96-Bit Random Nonce (12 Bytes):</span>
              <span className="text-sm font-bold text-purple-300 break-all">{nonceHex || 'A1 B2 C3 D4 E5 F6 78 90 12 34 56 78'}</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded">Prevents Replay</span>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-5 h-5 text-teal-400 animate-bounce" />
        </div>

        {/* Stage 3: AES-GCM Core Execution Result */}
        <div className="p-4 rounded-xl bg-slate-950 border border-teal-900/60">
          <div className="flex items-center space-x-2 text-teal-300 font-bold mb-3">
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>STAGE 3: CIPHERTEXT & AUTHENTICATION TAG GENERATION</span>
            <Tooltip title="Auth Tag (MAC)" content="A 16-byte message authentication code used by receiver to verify payload integrity." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">Encrypted Ciphertext:</span>
              <div className="p-2.5 rounded bg-slate-950 text-cyan-300 font-bold break-all text-xs border border-cyan-900/40">
                {ciphertextHex || 'Waiting for AES encryption...'}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">128-Bit GCM Authentication Tag (MAC):</span>
              <div className="p-2.5 rounded bg-slate-950 text-emerald-300 font-bold break-all text-xs border border-emerald-900/40">
                {authTagHex || 'Waiting for Tag calculation...'}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

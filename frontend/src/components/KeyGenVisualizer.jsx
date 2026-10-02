import React, { useState } from 'react';
import { Key, Eye, EyeOff, Layers, ShieldCheck, ArrowRight, Code } from 'lucide-react';
import Tooltip from './Tooltip';

export default function KeyGenVisualizer({ keyData, isActive, showInternalProcess }) {
  const [showKey, setShowKey] = useState(false);
  const { keySizeBits, keyHex, byteGroupings, isKeyReady } = keyData;

  const displayKeyHex = showKey
    ? keyHex || 'A7 3F 91 8C 2D 44 8E 10 99 AA BB CC DD EE FF 00 ...'
    : '•• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• •• ••';

  return (
    <div className={`glass-panel rounded-2xl p-6 border transition-all duration-300 ${
      isActive ? 'border-purple-500/50 glow-purple bg-slate-900/80' : 'border-slate-800/60 opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-700/50">
            <Key className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <span>BBS-BASED KEY DERIVATION PIPELINE</span>
              <Tooltip
                title="Key Derivation"
                content="Groups 8 bits from the BBS stream into a byte (MSB first). 32 bytes assemble a 256-bit symmetric AES key."
              >
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  {keySizeBits}-BIT AES KEY
                </span>
              </Tooltip>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Converting raw BBS pseudorandom bitstream into cryptographically structured bytes
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowKey(!showKey)}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-200 text-xs font-mono transition-colors"
        >
          {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showKey ? 'Hide Secret Key' : 'Show Secret Key'}</span>
        </button>
      </div>

      {/* Conceptual Pipeline Flow diagram */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-slate-950/90 border border-slate-800 mb-6 font-mono text-xs gap-2">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold">
          <span>BBS Bitstream</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
        
        <div className="flex items-center space-x-2 text-purple-400 font-bold">
          <Layers className="w-4 h-4" />
          <span>8-Bit Grouping</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />

        <div className="flex items-center space-x-2 text-teal-400 font-bold">
          <span>Byte Conversion</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />

        <div className="flex items-center space-x-2 text-amber-400 font-bold">
          <span>Key Material</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />

        <div className="flex items-center space-x-2 text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>AES-256 Key</span>
        </div>
      </div>

      {/* Technical Internal Details (Shown when SHOW INTERNAL PROCESS is active) */}
      {showInternalProcess && (
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/60 mb-6 font-mono text-xs text-purple-200 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 font-bold text-purple-400 border-b border-purple-900/60 pb-1">
            <Code className="w-4 h-4" />
            <span>BIT-TO-BYTE CONVERSION TECHNICAL SPECIFICATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div>• <span className="text-slate-400">Byte Assembly:</span> byte_val = ∑ (bit_i × 2^(7-i)) for i = 0..7</div>
            <div>• <span className="text-slate-400">Key Length:</span> {keySizeBits} bits = {keySizeBits / 8} bytes = {keySizeBits / 4} hex characters</div>
            <div>• <span className="text-slate-400">Keyspace Complexity:</span> 2^{keySizeBits} possible secret keys</div>
            <div>• <span className="text-slate-400">Formatting:</span> Standard uppercase space-delimited hex notation</div>
          </div>
        </div>
      )}

      {/* Derived Key Hex Display */}
      <div className="p-5 rounded-xl bg-slate-950 border border-purple-900/50 mb-6 font-mono">
        <div className="flex items-center justify-between mb-2 text-xs text-purple-300 font-bold">
          <span>DERIVED ENCRYPTION KEY (HEXADECIMAL REPRESENTATION)</span>
          <span>{keySizeBits / 8} BYTES / {keySizeBits} BITS</span>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-sm font-bold tracking-widest text-emerald-400 break-all select-all">
          {displayKeyHex}
        </div>
      </div>

      {/* Bit Grouping Table */}
      <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-slate-300 border-b border-slate-800 pb-2">
          <span>BIT-TO-BYTE GROUPING BREAKDOWN</span>
          <span className="text-slate-500">{byteGroupings.length} / {keySizeBits / 8} Bytes Processed</span>
        </div>

        <div className="max-h-[220px] overflow-y-auto pr-1">
          {byteGroupings.length === 0 ? (
            <div className="text-slate-600 text-center py-8 italic font-mono text-xs">
              Awaiting BBS bits for key derivation...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-xs">
              {byteGroupings.map((g) => (
                <div
                  key={g.byte_index}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="text-slate-500 text-[10px] block">Byte #{g.byte_index}</span>
                    <span className="text-cyan-300 font-bold tracking-wider">{g.bits}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-purple-400 font-extrabold text-sm block">0x{g.converted_hex || g.hex}</span>
                    <span className="text-slate-400 text-[10px]">{g.decimal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

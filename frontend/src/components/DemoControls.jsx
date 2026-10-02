import React, { useState } from 'react';
import { Zap, Key, MessageSquare, ShieldAlert, Cpu, Sliders } from 'lucide-react';

export default function DemoControls({ onStart, pipelineState, wsConnected }) {
  const [message, setMessage] = useState('Confidential message from AIT');
  const [keySizeBits, setKeySizeBits] = useState(256);
  const [attackType, setAttackType] = useState('NONE');
  const [speedMs, setSpeedMs] = useState(40);

  const presets = [
    'Confidential message from AIT',
    'Meet at 0900 Hours',
    'Top Secret Cryptographic Payload 2026',
    'Blum Blum Shub PRNG Test Stream'
  ];

  const attackOptions = [
    { id: 'NONE', label: 'Clean Transmission', desc: 'No attack. Normal decryption.' },
    { id: 'PASSIVE_SNIFF', label: 'Passive Eavesdrop', desc: 'Attacker sniffs ciphertext in transit.' },
    { id: 'BIT_FLIP', label: 'Bit-Flip Tampering', desc: 'Flips bits in ciphertext. GCM Tag fails!' },
    { id: 'TAG_TAMPER', label: 'Tag Corruption', desc: 'Modifies Auth Tag. Tag validation fails!' },
    { id: 'KEY_MITM', label: 'MITM Key Mismatch', desc: 'Receiver decrypts with wrong key.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onStart({
      mode: 'DEMO',
      message: message.trim(),
      key_size_bits: keySizeBits,
      attack_type: attackType,
      speed_ms: speedMs
    });
  };

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-[#00F0FF]/30 mb-8 glow-cyan">
      <div className="flex items-center justify-between mb-4 border-b border-[#0B1020] pb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-[#00F0FF]" />
          <h2 className="text-base font-orbitron font-bold text-[#E6F7FF]">
            ENCRYPTION LAB
          </h2>
        </div>
        <span className="text-xs font-mono text-[#00FF9C] bg-[#00FF9C]/10 px-3 py-1 rounded-md border border-[#00FF9C]/30 font-bold">
          ● {pipelineState === 'RUNNING' ? 'PROCESSING ENCRYPTION' : 'WAITING FOR INPUT'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 font-mono">
        
        {/* Secret Message Input */}
        <div>
          <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <MessageSquare className="w-4 h-4 text-[#00F0FF]" />
            <span>ENTER SECRET MESSAGE</span>
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to encrypt..."
            className="w-full bg-[#05070D] border border-[#00F0FF]/30 rounded-xl px-4 py-3 text-sm text-[#E6F7FF] placeholder-[#718096] focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all font-mono-code"
            required
          />

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-[11px] text-[#718096] self-center">Presets:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setMessage(preset)}
                className="text-[11px] bg-[#0B1020] hover:bg-[#111827] text-[#718096] hover:text-[#00F0FF] px-3 py-1 rounded-lg border border-[#00F0FF]/20 transition-colors font-mono"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Key Size & Speed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Key Size Selector */}
          <div>
            <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Key className="w-4 h-4 text-[#7C3AED]" />
              <span>AES KEY SIZE</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[128, 256].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setKeySizeBits(size)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono font-extrabold border transition-all cursor-pointer ${
                    keySizeBits === size
                      ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#7C3AED] glow-purple'
                      : 'bg-[#05070D] border-[#0B1020] text-[#718096] hover:text-[#E6F7FF]'
                  }`}
                >
                  [{size}-BIT AES]
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Speed Slider */}
          <div>
            <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Sliders className="w-4 h-4 text-[#00FF9C]" />
                <span>ANIMATION SPEED</span>
              </span>
              <span className="font-mono text-[#00FF9C]">{speedMs} ms/step</span>
            </label>
            <input
              type="range"
              min="10"
              max="150"
              step="10"
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="w-full accent-[#00F0FF] bg-[#05070D] rounded-lg cursor-pointer h-2 mt-3"
            />
          </div>

        </div>

        {/* Attack Scenario Selector */}
        <div>
          <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-[#FFB020]" />
            <span>ATTACK / INTERCEPTION SCENARIO</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {attackOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAttackType(opt.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  attackType === opt.id
                    ? opt.id === 'NONE'
                      ? 'bg-[#00FF9C]/15 border-[#00FF9C] text-[#00FF9C] glow-green'
                      : 'bg-[#FFB020]/15 border-[#FFB020] text-[#FFB020] glow-warning'
                    : 'bg-[#05070D] border-[#0B1020] text-[#718096] hover:border-[#00F0FF]/30'
                }`}
              >
                <div className="text-xs font-bold mb-0.5">{opt.label}</div>
                <div className="text-[10px] text-[#718096] leading-tight">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* INITIATE ENCRYPTION Button */}
        <button
          type="submit"
          disabled={pipelineState === 'RUNNING' || !wsConnected}
          className={`w-full py-4 px-6 rounded-xl font-orbitron font-black text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 shadow-2xl cursor-pointer ${
            pipelineState === 'RUNNING'
              ? 'bg-[#0B1020] text-[#00F0FF] cursor-not-allowed border border-[#00F0FF]/50 animate-pulse'
              : !wsConnected
              ? 'bg-[#080B12] text-[#718096] cursor-not-allowed border border-[#0B1020]'
              : 'bg-gradient-to-r from-[#00F0FF] via-[#00FF9C] to-[#7C3AED] text-[#05070D] hover:opacity-95 glow-cyan active:scale-[0.99]'
          }`}
        >
          <Zap className="w-5 h-5 fill-current animate-bounce" />
          <span>
            {pipelineState === 'RUNNING'
              ? 'EXECUTING CRYPTOGRAPHIC PIPELINE...'
              : '⚡ INITIATE ENCRYPTION'}
          </span>
        </button>

      </form>
    </div>
  );
}

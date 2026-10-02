import React, { useRef, useEffect, useState } from 'react';
import { Terminal, Trash2, Pause, Play, X } from 'lucide-react';

export default function CyberTerminal({ eventsLog, showTerminal, setShowTerminal, onClear }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [eventsLog, autoScroll]);

  if (!showTerminal) return null;

  const formatLogLine = (ev) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const type = ev.type || 'SYSTEM_EVENT';

    switch (type) {
      case 'PIPELINE_STARTED':
        return { text: `[${time}] SYSTEM INITIALIZED: MODE=${ev.mode}, KEY_SIZE=${ev.key_size_bits}-BIT`, color: 'text-[#00F0FF]' };
      case 'BBS_INIT':
        return { text: `[${time}] BBS ENGINE READY: n=${ev.n}, s=${ev.seed}`, color: 'text-[#00F0FF]' };
      case 'BBS_STEP':
        return { text: `[${time}] GENERATING RANDOMNESS: Iteration #${ev.step} -> LSB Bit = ${ev.output_bit}`, color: 'text-[#7C3AED]' };
      case 'BBS_SUMMARY':
        return { text: `[${time}] RANDOMNESS STREAM COMPLETE: Total ${ev.total_bits} bits generated`, color: 'text-[#00FF9C]' };
      case 'KEY_READY':
        return { text: `[${time}] KEY MATERIAL DERIVED: AES-${ev.key_size_bits}-GCM Key Ready`, color: 'text-[#00FF9C]' };
      case 'ENCRYPTION_STARTED':
        return { text: `[${time}] AES ENCRYPTION STARTED: Algorithm=AES-256-GCM`, color: 'text-[#00F0FF]' };
      case 'CIPHERTEXT_GENERATED':
        return { text: `[${time}] CIPHERTEXT & AUTH TAG GENERATED: Payload Encrypted`, color: 'text-[#00FF9C]' };
      case 'PACKET_CREATED':
        return { text: `[${time}] NETWORK PACKET CREATED: ID=${ev.packet?.packet_id}`, color: 'text-[#00F0FF]' };
      case 'TRANSMISSION_STEP':
        return { text: `[${time}] PACKET TRANSIT: Hop #${ev.step} -> Node=${ev.current_node}`, color: 'text-[#FFB020]' };
      case 'ATTACK_SIMULATION_STARTED':
        return { text: `[${time}] ATTACK SIMULATION STARTED: Threat Vector = ${ev.attack_type}`, color: 'text-[#FF3158]' };
      case 'ATTACK_RESULT':
        return { text: `[${time}] ATTACK SIMULATION COMPLETED: Tampered=${ev.tampered}`, color: 'text-[#FF3158]' };
      case 'DECRYPTION_STARTED':
        return { text: `[${time}] RECEIVER DECRYPTION & AUTHENTICATION STARTED`, color: 'text-[#00F0FF]' };
      case 'DECRYPTION_COMPLETED':
        return {
          text: ev.success
            ? `[${time}] RECEIVER AUTHENTICATED: GCM Auth Tag Validated ✓ Plaintext Recovered`
            : `[${time}] SECURITY ALERT: Tag Mismatch ✗ Access Denied`,
          color: ev.success ? 'text-[#00FF9C]' : 'text-[#FF3158]'
        };
      default:
        return { text: `[${time}] EVENT: ${type}`, color: 'text-[#E6F7FF]' };
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg cyber-glass rounded-2xl border border-[#00F0FF]/40 shadow-2xl glow-cyan overflow-hidden animate-fadeIn">
      
      {/* Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#05070D] border-b border-[#0B1020] text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#00F0FF] font-bold">
          <Terminal className="w-4 h-4" />
          <span>CYBERTERMINAL REAL-TIME LOG</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
            {eventsLog.length} LOGS
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-1 rounded hover:bg-[#0B1020] transition-colors ${
              autoScroll ? 'text-[#00F0FF]' : 'text-[#718096]'
            }`}
            title={autoScroll ? 'Pause Scroll' : 'Auto Scroll'}
          >
            {autoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClear}
            className="p-1 rounded text-[#718096] hover:text-[#FF3158] transition-colors"
            title="Clear Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button onClick={() => setShowTerminal(false)} className="text-[#718096] hover:text-white px-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div
        ref={scrollRef}
        className="p-4 bg-[#05070D] text-[11px] font-mono-code h-60 overflow-y-auto space-y-1.5 leading-relaxed relative select-text"
      >
        <div className="cyber-grid-overlay" />

        {eventsLog.length === 0 ? (
          <div className="text-[#718096] italic py-10 text-center">
            &gt; System active. Waiting for backend WebSocket events...
            <span className="animate-pulse"> _</span>
          </div>
        ) : (
          eventsLog.map((ev, idx) => {
            const formatted = formatLogLine(ev);
            return (
              <div key={idx} className={`${formatted.color} font-bold break-all flex items-start space-x-1.5`}>
                <span className="text-[#718096] text-[10px] select-none font-normal">$</span>
                <span>{formatted.text}</span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

import React, { useRef, useEffect } from 'react';
import { Terminal, X, Trash2 } from 'lucide-react';

export default function BackendActivityDrawer({ eventsLog, showBackendDrawer, setShowBackendDrawer }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [eventsLog]);

  if (!showBackendDrawer) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-white border-2 border-[#09090B] shadow-2xl font-mono text-xs text-[#09090B] animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#09090B] text-white font-bold text-xs">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4" />
          <span>BACKEND ACTIVITY LOGS</span>
          <span className="text-[10px] bg-[#27272A] px-2 py-0.5 rounded text-white font-normal">
            {eventsLog.length} EVENTS
          </span>
        </div>

        <button onClick={() => setShowBackendDrawer(false)} className="text-white hover:text-[#A1A1AA]">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Log Stream Area */}
      <div
        ref={scrollRef}
        className="p-4 bg-[#FAFAFA] h-56 overflow-y-auto space-y-1.5 text-[11px] font-mono-code leading-relaxed border-t border-[#09090B]"
      >
        {eventsLog.length === 0 ? (
          <div className="text-[#52525B] italic py-8 text-center">
            Awaiting WebSocket backend activity...
          </div>
        ) : (
          eventsLog.map((ev, idx) => {
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            return (
              <div key={idx} className="flex space-x-2 border-b border-[#E4E4E7] pb-1">
                <span className="text-[#52525B] text-[10px]">[{time}]</span>
                <span className="font-bold text-[#09090B]">{formatEventMessage(ev)}</span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

function formatEventMessage(ev) {
  const type = ev.type || 'EVENT';
  switch (type) {
    case 'PIPELINE_STARTED': return `Pipeline initialized: Mode=${ev.mode}`;
    case 'BBS_INIT': return `BBS initialized: n=${ev.n}`;
    case 'BBS_STEP': return `Random bit generated: #${ev.step} -> Bit=${ev.output_bit}`;
    case 'BBS_SUMMARY': return `BBS sequence complete: ${ev.total_bits} bits`;
    case 'KEY_READY': return `Key material generated: 256-bit AES`;
    case 'ENCRYPTION_STARTED': return `Encryption started: AES-256-GCM`;
    case 'CIPHERTEXT_GENERATED': return `Ciphertext & Auth Tag generated`;
    case 'PACKET_CREATED': return `Packet created: ID=${ev.packet?.packet_id}`;
    case 'TRANSMISSION_STEP': return `Packet in transit: Node ${ev.current_node}`;
    case 'ATTACK_SIMULATION_STARTED': return `Packet intercepted by threat actor`;
    case 'ATTACK_RESULT': return `Attack simulation completed`;
    case 'DECRYPTION_STARTED': return `Packet received by Bob: Authenticating tag`;
    case 'DECRYPTION_COMPLETED': return ev.success ? `Packet authenticated & decrypted ✓` : `Auth tag check failed ✗`;
    default: return `Backend event: ${type}`;
  }
}

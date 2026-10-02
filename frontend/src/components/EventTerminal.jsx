import React, { useRef, useEffect, useState } from 'react';
import { Terminal, Trash2, ArrowDownCircle, Pause, Play } from 'lucide-react';

export default function EventTerminal({ eventsLog, showTerminal, setShowTerminal, onClear }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [eventsLog, autoScroll]);

  if (!showTerminal) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg glass-panel rounded-2xl border border-cyan-500/40 shadow-2xl glow-cyan overflow-hidden animate-fadeIn">
      
      {/* Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>CRYPTOVISOR LIVE WEBSOCKET CONSOLE</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            {eventsLog.length} EVENTS
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-1 rounded hover:bg-slate-800 transition-colors ${
              autoScroll ? 'text-cyan-400' : 'text-slate-500'
            }`}
            title={autoScroll ? 'Pause Auto-Scroll' : 'Enable Auto-Scroll'}
          >
            {autoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClear}
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowTerminal(false)}
            className="text-slate-400 hover:text-white text-base px-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Console Output Area */}
      <div
        ref={scrollRef}
        className="p-4 bg-[#060a12] text-xs font-mono h-64 overflow-y-auto space-y-2 font-light select-text"
      >
        {eventsLog.length === 0 ? (
          <div className="text-slate-600 italic py-8 text-center">
            Console active. Waiting for backend WebSocket events...
          </div>
        ) : (
          eventsLog.map((ev, idx) => (
            <div
              key={idx}
              className="p-2 rounded bg-slate-950/80 border border-slate-800/80 hover:border-cyan-800/50 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300 mb-1">
                <span>[{idx + 1}] EVENT: {ev.type}</span>
                <span className="text-slate-500 text-[9px]">{new Date().toLocaleTimeString()}</span>
              </div>
              <pre className="text-[10px] text-slate-300 whitespace-pre-wrap break-all leading-relaxed bg-slate-900/50 p-1.5 rounded">
                {JSON.stringify(ev, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, XCircle, Zap, RefreshCw } from 'lucide-react';

export default function AttackerHackerConsole({ attackType, packet, keySizeBits }) {
  const [consoleLines, setConsoleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!packet) return;

    // Reset lines & start terminal sequence
    const pktId = packet.packet_id || 'PKT-8A92';
    const ctHex = packet.payload?.ciphertext_hex?.slice(0, 20) || '9F A3 72 1C 88 42';

    const lines = [
      `$ intercept --packet ${pktId}`,
      `Packet intercepted at network transit node.`,
      `$ inspect payload`,
      `SOURCE: Alice (192.168.1.10) | DEST: Bob (192.168.1.50)`,
      `CIPHERTEXT: ${ctHex}...`,
      `NONCE: ${packet.payload?.nonce_hex?.slice(0, 16) || '74 19 37 16'}...`,
      `AUTH TAG: ${packet.payload?.auth_tag_hex?.slice(0, 16) || 'A3 68 51 81'}...`,
      ``,
      `$ attempt --method brute-force --keysize ${keySizeBits || 256}`,
      `Searching 2^${keySizeBits || 256} keyspace on distributed supercomputer...`,
      `Progress: [████████░░░░] 68%`,
      `[FAIL] BRUTE-FORCE TIMEOUT: Time required > 3.67 x 10^51 years.`,
      ``,
      `$ attempt --method pattern-analysis`,
      `Analyzing Shannon byte entropy... Entropy = 7.98 bits/byte (Max 8.0)`,
      `[FAIL] PATTERN INFERENCE DENIED: AES-GCM output is indistinguishable from random noise.`,
      ``,
      `$ attempt --method bbs-prediction`,
      `Attempting next-bit prediction on BBS sequence without factors p, q...`,
      `[FAIL] PREDICTION DENIED: Computational equivalence to Quadratic Residuosity Problem modulo n.`,
      ``,
      `----------------------------------------------------`,
      `FINAL STATUS: ACCESS TO PLAINTEXT DENIED`,
      `----------------------------------------------------`
    ];

    setConsoleLines([]);
    setProgress(0);

    // Stream lines into console
    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < lines.length) {
        setConsoleLines((prev) => [...prev, lines[lineIdx]]);
        lineIdx++;
        setProgress(Math.round((lineIdx / lines.length) * 100));
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [packet, attackType, keySizeBits]);

  return (
    <div className="rounded-xl bg-[#060a12] border border-amber-900/60 p-4 font-mono text-xs shadow-2xl text-slate-200">
      <div className="flex items-center justify-between border-b border-amber-900/40 pb-2 mb-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>ATTACKER INTERCEPTION CONSOLE</span>
        </div>
        <span className="text-[10px] text-amber-300 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
          THREAT DETECTED ({progress}%)
        </span>
      </div>

      <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px] leading-relaxed">
        {consoleLines.map((line, idx) => {
          if (line.includes("DENIED") || line.includes("FAIL")) {
            return <div key={idx} className="text-rose-400 font-bold">{line}</div>;
          }
          if (line.startsWith("$")) {
            return <div key={idx} className="text-amber-300 font-bold mt-1">{line}</div>;
          }
          if (line.includes("FINAL STATUS")) {
            return <div key={idx} className="text-rose-400 font-extrabold text-sm py-1">{line}</div>;
          }
          return <div key={idx} className="text-slate-400">{line}</div>;
        })}
      </div>
    </div>
  );
}

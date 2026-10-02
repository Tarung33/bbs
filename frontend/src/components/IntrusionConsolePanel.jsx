import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, Lock, XCircle, AlertTriangle } from 'lucide-react';

export default function IntrusionConsolePanel({ attackType, packet, keySizeBits }) {
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const pktId = packet?.packet_id || 'PKT-A8F2';
    const ctSample = packet?.payload?.ciphertext_hex?.slice(0, 18) || '9F A3 72 1C 88 42';

    const rawLogs = [
      `> intercept --packet ${pktId}`,
      `> analyzing payload...`,
      `> payload type: AES-${keySizeBits || 256}-GCM`,
      `> plaintext: UNKNOWN`,
      `> ciphertext sample: ${ctSample}...`,
      `> attempting key recovery...`,
      `> brute-force attack against 2^${keySizeBits || 256} keyspace...`,
      `> searching keys... [████████░░░░] 68%`,
      `> brute-force search failed: time required > 3.67 x 10^51 years.`,
      `> attempting BBS prediction...`,
      `> analyzing randomness state x_i...`,
      `> solving quadratic residues modulo n...`,
      `> BBS prediction failed: integer factorization required.`,
      `> analyzing payload Shannon entropy... H = 7.98 bits/byte`,
      `> plaintext pattern inference failed: indistinguishable from random noise.`
    ];

    setConsoleLogs([]);
    setProgress(0);

    let idx = 0;
    const timer = setInterval(() => {
      if (idx < rawLogs.length) {
        setConsoleLogs((prev) => [...prev, rawLogs[idx]]);
        idx++;
        setProgress(Math.round((idx / rawLogs.length) * 100));
      } else {
        clearInterval(timer);
      }
    }, 90);

    return () => clearInterval(timer);
  }, [packet, attackType, keySizeBits]);

  return (
    <div className="cyber-glass-red rounded-2xl p-6 border border-[#FF3158]/40 mb-8 font-mono shadow-2xl glow-danger">
      
      {/* Intrusion Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#FF3158]/30 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#1E080F] text-[#FF3158] border border-[#FF3158]/50 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-extrabold text-[#FF3158] flex items-center space-x-2 tracking-wider">
              <span>⚠ INTRUSION CONSOLE</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#FF3158]/20 text-[#FF3158] border border-[#FF3158]/40 font-bold">
                UNAUTHORIZED INTERCEPTION
              </span>
            </h3>
            <p className="text-xs text-[#718096]">
              Simulating adversary eavesdropping, pattern analysis, and prediction attacks
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3158] animate-ping" />
          <span className="text-[#FF3158] font-bold text-xs">● PACKET CAPTURED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Animated Typing Hacker Terminal */}
        <div className="lg:col-span-2 bg-[#05070D] rounded-xl p-4 border border-[#FF3158]/30 flex flex-col h-72">
          <div className="flex items-center justify-between text-xs text-[#FF3158] font-bold border-b border-[#FF3158]/20 pb-2 mb-2">
            <span className="flex items-center space-x-1.5">
              <Terminal className="w-4 h-4 text-[#FF3158]" />
              <span>ADVERSARY COMMAND TERMINAL</span>
            </span>
            <span className="text-[10px] text-[#718096]">Progress: {progress}%</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 text-[11px] font-mono-code text-[#E6F7FF] leading-relaxed pr-1">
            {consoleLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes("failed") || log.includes("UNKNOWN")
                    ? "text-[#FF3158] font-bold"
                    : log.startsWith(">")
                    ? "text-[#FFB020]"
                    : "text-[#718096]"
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* ACCESS DENIED Glitch Box */}
        <div className="bg-[#1E080F]/90 rounded-xl p-6 border border-[#FF3158] flex flex-col items-center justify-center text-center space-y-4 shadow-2xl animate-glitch">
          <div className="p-3 rounded-full bg-[#FF3158]/20 text-[#FF3158] border border-[#FF3158]">
            <XCircle className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <div className="font-orbitron font-black text-2xl text-[#FF3158] tracking-widest text-glow-red">
              ACCESS DENIED
            </div>
            <div className="text-[11px] text-[#718096] uppercase mt-1 font-bold">
              Cryptographic Safeguards Neutralized Attack
            </div>
          </div>

          <div className="w-full space-y-2 text-xs font-mono text-left bg-[#05070D]/80 p-3 rounded-lg border border-[#FF3158]/40">
            <div className="flex justify-between"><span className="text-[#718096]">PLAINTEXT:</span> <span className="text-[#FF3158] font-bold">NOT FOUND</span></div>
            <div className="flex justify-between"><span className="text-[#718096]">SECRET KEY:</span> <span className="text-[#FF3158] font-bold">NOT FOUND</span></div>
            <div className="flex justify-between"><span className="text-[#718096]">BBS STATE:</span> <span className="text-[#FF3158] font-bold">NOT RECOVERED</span></div>
          </div>
        </div>

      </div>

    </div>
  );
}

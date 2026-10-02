import React from 'react';
import { Play, Settings, Shield, Cpu, Lock, Network, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LandingHero({ onStartMission, onOpenLab, wsConnected, pipelineState }) {
  return (
    <div className="cyber-glass rounded-2xl p-8 border border-[#00F0FF]/30 mb-8 relative overflow-hidden glow-cyan">
      
      {/* Background Accent Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold tracking-widest uppercase mb-4">
          <Shield className="w-3.5 h-3.5 animate-pulse" />
          <span>CRYPTOGRAPHIC VISUALIZATION LAB</span>
        </div>

        {/* Large Heading */}
        <h1 className="text-3xl md:text-5xl font-orbitron font-black text-[#E6F7FF] tracking-tight leading-tight mb-4">
          SEE WHAT HAPPENS <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#00FF9C] to-[#7C3AED] bg-clip-text text-transparent text-glow-cyan">
            INSIDE ENCRYPTION.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-sm md:text-base text-[#718096] font-space leading-relaxed mb-6 max-w-2xl">
          An interactive cybersecurity command center powered by Blum Blum Shub (BBS) pseudorandom bit generation, AES-256-GCM authenticated encryption, and real-time network attack simulation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={onStartMission}
            disabled={pipelineState === 'RUNNING'}
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#00FF9C] to-[#00F0FF] text-[#05070D] font-orbitron font-black text-sm tracking-wider uppercase shadow-xl hover:opacity-95 transition-all glow-cyan active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START CRYPTO MISSION</span>
          </button>

          <button
            onClick={onOpenLab}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-[#0B1020] hover:bg-[#111827] text-[#E6F7FF] font-mono font-bold text-xs border border-[#00F0FF]/30 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#00F0FF]" />
            <span>OPEN LAB</span>
          </button>
        </div>

        {/* System Status Panel */}
        <div className="p-4 rounded-xl bg-[#080B12]/90 border border-[#0B1020] font-mono text-xs">
          <div className="text-[10px] text-[#718096] font-bold uppercase tracking-widest mb-3 border-b border-[#0B1020] pb-2">
            SYSTEM STATUS PANEL
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            
            <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-[#00F0FF]/20 flex items-center justify-between">
              <span className="text-[#718096] text-[11px]">CRYPTO ENGINE</span>
              <span className="text-[#00FF9C] font-bold text-[10px]">ONLINE</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-[#00F0FF]/20 flex items-center justify-between">
              <span className="text-[#718096] text-[11px]">BBS ENGINE</span>
              <span className="text-[#00F0FF] font-bold text-[10px]">READY</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-[#00F0FF]/20 flex items-center justify-between">
              <span className="text-[#718096] text-[11px]">AES ENGINE</span>
              <span className="text-[#00FF9C] font-bold text-[10px]">READY</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-[#00F0FF]/20 flex items-center justify-between">
              <span className="text-[#718096] text-[11px]">NETWORK</span>
              <span className={`font-bold text-[10px] ${wsConnected ? 'text-[#00FF9C]' : 'text-[#FF3158]'}`}>
                {wsConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0B1020]/80 border border-[#00F0FF]/20 flex items-center justify-between">
              <span className="text-[#718096] text-[11px]">ATTACK SIM</span>
              <span className="text-[#FFB020] font-bold text-[10px]">STANDBY</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

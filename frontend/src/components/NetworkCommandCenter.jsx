import React from 'react';
import { Network, Server, Router, ShieldCheck, ShieldAlert, ArrowRight, Activity, Lock } from 'lucide-react';

export default function NetworkCommandCenter({ networkData, attackData, isActive }) {
  const { packet, hops, status } = networkData;
  const { attackType } = attackData;
  const isAttackActive = attackType !== 'NONE';

  const currentHopName = hops.length > 0 ? hops[hops.length - 1].current_node : 'Awaiting packet dispatch';
  const progressPercent = hops.length > 0 ? hops[hops.length - 1].progress_percent : 0;

  return (
    <div className={`cyber-glass rounded-2xl p-6 border transition-all duration-300 ${
      isActive ? 'border-[#00F0FF]/50 glow-cyan bg-[#080B12]/80' : 'border-[#0B1020] opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0B1020]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#0B1020] text-[#00F0FF] border border-[#00F0FF]/40">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-bold text-[#E6F7FF] flex items-center space-x-2">
              <span>NETWORK COMMAND CENTER</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                Encrypted Channel Monitoring
              </span>
            </h3>
            <p className="text-xs text-[#718096] font-mono">
              Real-time multi-hop packet transmission and adversary intercept monitoring
            </p>
          </div>
        </div>

        {status && (
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-[#00F0FF] font-bold">STATUS: {status}</span>
          </div>
        )}
      </div>

      {/* Network Channel Topology Lines */}
      <div className="p-6 rounded-xl bg-[#05070D] border border-[#0B1020] mb-6 font-mono text-xs relative overflow-hidden">
        
        {/* Connection Tunnel Bar */}
        <div className="w-full bg-[#0B1020] h-1.5 rounded-full mb-8 relative overflow-hidden border border-[#00F0FF]/20">
          <div
            className="bg-gradient-to-r from-[#00F0FF] via-[#7C3AED] to-[#00FF9C] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Nodes Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          
          {/* Sender Node */}
          <div className="flex flex-col items-center p-3.5 rounded-xl bg-[#080B12] border border-[#00F0FF]/60 w-[150px] shadow-lg">
            <Server className="w-6 h-6 text-[#00F0FF] mb-1.5" />
            <span className="font-orbitron font-bold text-[#E6F7FF] text-xs">SENDER NODE</span>
            <span className="text-[10px] text-[#718096]">Alice (192.168.1.10)</span>
          </div>

          <ArrowRight className="w-5 h-5 text-[#00F0FF] animate-pulse" />

          {/* Secure Transit Channel */}
          <div className="flex flex-col items-center p-3.5 rounded-xl bg-[#080B12] border border-[#7C3AED]/60 w-[150px] shadow-lg">
            <Activity className="w-6 h-6 text-[#7C3AED] mb-1.5" />
            <span className="font-orbitron font-bold text-[#7C3AED] text-xs">SECURE CHANNEL</span>
            <span className="text-[10px] text-[#718096]">AES-256-GCM Transit</span>
          </div>

          <ArrowRight className="w-5 h-5 text-[#00F0FF] animate-pulse" />

          {/* Attacker Intercept Node */}
          <div className={`flex flex-col items-center p-3.5 rounded-xl border w-[150px] transition-all ${
            isAttackActive
              ? 'bg-[#1E080F] border-[#FF3158] text-[#FF3158] glow-danger animate-pulse'
              : 'bg-[#080B12] border-[#0B1020] text-[#718096]'
          }`}>
            <ShieldAlert className="w-6 h-6 mb-1.5" />
            <span className="font-orbitron font-bold text-xs">ATTACKER NODE</span>
            <span className="text-[10px]">{isAttackActive ? '⚠ INTERCEPTED' : 'Standby'}</span>
          </div>

          <ArrowRight className="w-5 h-5 text-[#00F0FF] animate-pulse" />

          {/* Receiver Node */}
          <div className={`flex flex-col items-center p-3.5 rounded-xl border w-[150px] transition-all ${
            status === 'DELIVERED' ? 'bg-[#00FF9C]/15 border-[#00FF9C] text-[#00FF9C] glow-green' : 'bg-[#080B12] border-[#0B1020] text-[#718096]'
          }`}>
            <Server className="w-6 h-6 mb-1.5" />
            <span className="font-orbitron font-bold text-xs">RECEIVER NODE</span>
            <span className="text-[10px]">Bob (192.168.1.50)</span>
          </div>

        </div>

      </div>

      {/* Animated Moving Encrypted Packet Card */}
      {packet ? (
        <div className="p-5 rounded-xl bg-[#05070D] border border-[#00F0FF]/40 font-mono text-xs shadow-2xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#0B1020]">
            <span className="font-orbitron font-bold text-[#00F0FF] uppercase tracking-wider flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>PACKET # {packet.packet_id}</span>
            </span>
            <span className="text-[10px] bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/30 px-2 py-0.5 rounded font-bold">
              STATUS: ENCRYPTED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-[#080B12] border border-[#0B1020]">
              <span className="text-[#718096] text-[10px] block">PAYLOAD ALGORITHM</span>
              <span className="text-[#E6F7FF] font-bold text-xs">{packet.header.protocol}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#080B12] border border-[#0B1020]">
              <span className="text-[#718096] text-[10px] block">CIPHERTEXT PAYLOAD (NO PLAINTEXT)</span>
              <div className="text-[#00F0FF] font-bold text-xs break-all mt-0.5">{packet.payload.ciphertext_hex}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#080B12] border border-[#0B1020]">
              <span className="text-[#718096] text-[10px] block">AUTHENTICATION TAG (MAC)</span>
              <div className="text-[#00FF9C] font-bold text-xs break-all mt-0.5">{packet.payload.auth_tag_hex}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-[#05070D] border border-[#0B1020] text-center font-mono text-[#718096] text-xs italic">
          No encrypted packets currently in transit...
        </div>
      )}

    </div>
  );
}

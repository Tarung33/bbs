import React from 'react';
import { Network, Server, Router, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export default function NetworkVisualizer({ networkData, isActive }) {
  const { packet, hops, status } = networkData;

  const currentHopName = hops.length > 0 ? hops[hops.length - 1].current_node : 'Awaiting packet dispatch';
  const progressPercent = hops.length > 0 ? hops[hops.length - 1].progress_percent : 0;

  return (
    <div className={`glass-panel rounded-2xl p-6 border transition-all duration-300 ${
      isActive ? 'border-cyan-500/50 glow-cyan bg-slate-900/80' : 'border-slate-800/60 opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-700/50">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <span>NETWORK TRANSMISSION ENGINE</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Encrypted Packet Transit
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Simulating packet encapsulation and multi-hop network routing between Sender & Receiver
            </p>
          </div>
        </div>

        {status && (
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-bold">{status}</span>
          </div>
        )}
      </div>

      {/* Network Nodes Topology Diagram */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 mb-6 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Sender Alice */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900 border border-cyan-700/60 w-[140px]">
            <Server className="w-6 h-6 text-cyan-400 mb-1" />
            <span className="font-bold text-slate-200 text-xs">Alice (Sender)</span>
            <span className="text-[10px] text-slate-500">192.168.1.10</span>
          </div>

          <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />

          {/* Hop 1 Gateway */}
          <div className={`flex flex-col items-center p-3 rounded-xl border w-[140px] transition-all ${
            hops.length >= 1 ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 glow-cyan' : 'bg-slate-900/60 border-slate-800 text-slate-600'
          }`}>
            <Router className="w-6 h-6 mb-1" />
            <span className="font-bold text-xs">Local Gateway</span>
            <span className="text-[10px]">192.168.1.1</span>
          </div>

          <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />

          {/* Encrypted Transit */}
          <div className={`flex flex-col items-center p-3 rounded-xl border w-[140px] transition-all ${
            hops.length >= 3 ? 'bg-purple-950/60 border-purple-500 text-purple-300 glow-purple' : 'bg-slate-900/60 border-slate-800 text-slate-600'
          }`}>
            <Activity className="w-6 h-6 mb-1" />
            <span className="font-bold text-xs">Encrypted Transit</span>
            <span className="text-[10px]">Backbone ISP</span>
          </div>

          <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />

          {/* Receiver Bob */}
          <div className={`flex flex-col items-center p-3 rounded-xl border w-[140px] transition-all ${
            status === 'DELIVERED' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 glow-emerald' : 'bg-slate-900 border-slate-800 text-slate-600'
          }`}>
            <Server className="w-6 h-6 mb-1" />
            <span className="font-bold text-xs">Bob (Receiver)</span>
            <span className="text-[10px]">192.168.1.50</span>
          </div>

        </div>

        {/* Transmission Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>CURRENT HOPS PROGRESS: {currentHopName}</span>
            <span className="font-bold text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Packet Inspector Card */}
      {packet ? (
        <div className="p-5 rounded-xl bg-slate-950 border border-cyan-900/50 font-mono text-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="font-bold text-cyan-300 uppercase tracking-wider">
              SIMULATED NETWORK PACKET INSPECTOR [{packet.packet_id}]
            </span>
            <span className="text-slate-400 text-[10px]">{packet.timestamp}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Header Metadata */}
            <div className="space-y-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">PACKET HEADER</div>
              <div className="flex justify-between"><span className="text-slate-500">Source:</span><span className="text-slate-200">{packet.header.source}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Destination:</span><span className="text-slate-200">{packet.header.destination}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Protocol:</span><span className="text-cyan-400 font-bold">{packet.header.protocol}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Checksum:</span><span className="text-slate-300">{packet.header.checksum}</span></div>
            </div>

            {/* Encrypted Payload */}
            <div className="space-y-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">ENCRYPTED PAYLOAD (NO PLAINTEXT EXPOSED)</div>
              <div>
                <span className="text-slate-500 text-[10px] block">Ciphertext Payload:</span>
                <div className="p-1.5 rounded bg-slate-950 text-cyan-300 text-[11px] break-all border border-cyan-950">{packet.payload.ciphertext_hex}</div>
              </div>
              <div className="flex justify-between gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] block">Nonce / IV:</span>
                  <span className="text-purple-300 text-[10px] break-all">{packet.payload.nonce_hex}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Auth Tag:</span>
                  <span className="text-emerald-300 text-[10px] break-all">{packet.payload.auth_tag_hex}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-slate-500 text-xs italic">
          Awaiting packet generation...
        </div>
      )}

    </div>
  );
}

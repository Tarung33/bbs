import React from 'react';
import { User, Binary, Activity, Key, Lock, Network, ShieldAlert, Server, Unlock } from 'lucide-react';

const PIPELINE_NODES = [
  { id: 1, name: 'SENDER', icon: User, desc: 'Alice Source' },
  { id: 2, name: 'BBS', icon: Binary, desc: 'xᵢ₊₁ = xᵢ² mod n' },
  { id: 3, name: 'RANDOMNESS', icon: Activity, desc: 'Bitstream' },
  { id: 4, name: 'KEY', icon: Key, desc: '256-Bit Key' },
  { id: 5, name: 'AES', icon: Lock, desc: 'AES-GCM AEAD' },
  { id: 6, name: 'NETWORK', icon: Network, desc: 'Transit Tunnel' },
  { id: 7, name: 'ATTACKER', icon: ShieldAlert, desc: 'Interception' },
  { id: 8, name: 'RECEIVER', icon: Server, desc: 'Bob Node' },
  { id: 9, name: 'DECRYPT', icon: Unlock, desc: 'Tag Auth' },
];

export default function PipelineStepper({ activeStep, setActiveStep, pipelineState, attackType }) {
  return (
    <div className="w-full cyber-glass rounded-2xl p-4 border border-[#00F0FF]/30 mb-8 glow-cyan">
      <div className="flex items-center justify-between overflow-x-auto pb-1 scrollbar-none gap-2">
        {PIPELINE_NODES.map((node, idx) => {
          const Icon = node.icon;
          const isActive = activeStep === node.id;
          const isCompleted = activeStep > node.id || pipelineState === 'COMPLETED';
          const isAttackerNode = node.id === 7;
          const isAttackActive = attackType !== 'NONE';

          let stateStyle = 'bg-[#080B12] border-[#0B1020] text-[#718096]';

          if (isActive) {
            stateStyle = isAttackerNode && isAttackActive
              ? 'bg-[#1E080F] border-[#FF3158] text-[#FF3158] glow-danger scale-105 animate-pulse'
              : 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] glow-cyan scale-105';
          } else if (isCompleted) {
            stateStyle = 'bg-[#00FF9C]/10 border-[#00FF9C]/50 text-[#00FF9C] hover:border-[#00FF9C]';
          }

          return (
            <React.Fragment key={node.id}>
              {/* Node Button */}
              <button
                onClick={() => setActiveStep(node.id)}
                className={`flex flex-col items-center min-w-[95px] p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${stateStyle}`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-orbitron font-extrabold">0{node.id}</span>
                </div>
                
                <span className="text-[11px] font-orbitron font-bold tracking-wider whitespace-nowrap">
                  {node.name}
                </span>

                <span className="text-[9px] text-[#718096] font-mono truncate w-full text-center">
                  {node.desc}
                </span>
              </button>

              {/* Connector Connector Arrow */}
              {idx < PIPELINE_NODES.length - 1 && (
                <div className={`h-[2px] min-w-[12px] flex-1 rounded transition-colors ${
                  activeStep > node.id ? 'bg-[#00FF9C]/60' : 'bg-[#0B1020]'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

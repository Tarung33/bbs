import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity } from 'lucide-react';

export default function SecurityHud({ attackType, pipelineState, attackData, decryptionData }) {
  const isAttackActive = attackType !== 'NONE';
  const isDecrypted = decryptionData.status === 'COMPLETED';
  const isSuccess = decryptionData.success;

  let threatLevel = 'LOW';
  let hudStatus = '● SECURE';
  let hudColor = 'border-[#00FF9C] text-[#00FF9C] glow-green';
  let Icon = ShieldCheck;

  if (isAttackActive && pipelineState === 'RUNNING') {
    threatLevel = 'HIGH';
    hudStatus = '⚠ ATTACK DETECTED';
    hudColor = 'border-[#FF3158] text-[#FF3158] glow-danger animate-pulse';
    Icon = ShieldAlert;
  } else if (isAttackActive && isDecrypted && !isSuccess) {
    threatLevel = 'MEDIUM';
    hudStatus = '✓ CHANNEL SECURED (ATTACK NEUTRALIZED)';
    hudColor = 'border-[#00FF9C] text-[#00FF9C] glow-green';
    Icon = ShieldCheck;
  } else if (pipelineState === 'RUNNING') {
    threatLevel = 'LOW';
    hudStatus = '⚡ PROCESSING ENCRYPTION';
    hudColor = 'border-[#00F0FF] text-[#00F0FF] glow-cyan';
    Icon = Activity;
  }

  return (
    <div className={`cyber-glass rounded-xl px-4 py-2 border font-mono text-xs shadow-xl transition-all duration-300 ${hudColor}`}>
      <div className="flex items-center space-x-3">
        <Icon className="w-4 h-4 animate-bounce" />
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-[#718096] uppercase font-bold">THREAT LEVEL:</span>
            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${
              threatLevel === 'HIGH' ? 'bg-[#FF3158]/20 border-[#FF3158] text-[#FF3158]' : 'bg-[#00FF9C]/20 border-[#00FF9C] text-[#00FF9C]'
            }`}>
              {threatLevel}
            </span>
          </div>
          <div className="font-bold text-xs tracking-wider uppercase mt-0.5">
            {hudStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

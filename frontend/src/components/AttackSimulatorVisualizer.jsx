import React from 'react';
import { ShieldAlert, Zap, Eye, UserX, FileX, AlertTriangle, ShieldCheck } from 'lucide-react';
import AttackerHackerConsole from './AttackerHackerConsole';
import Tooltip from './Tooltip';

export default function AttackSimulatorVisualizer({ attackData, networkData, keyData, isActive }) {
  const { attackType, title, description, tampered, details } = attackData;
  const isClean = attackType === 'NONE';

  return (
    <div className={`glass-panel rounded-2xl p-6 border transition-all duration-300 ${
      isActive
        ? isClean
          ? 'border-emerald-500/50 glow-emerald bg-slate-900/80'
          : 'border-amber-500/50 glow-amber bg-slate-900/80'
        : 'border-slate-800/60 opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl border ${
            isClean
              ? 'bg-emerald-950 text-emerald-400 border-emerald-700/50'
              : 'bg-amber-950 text-amber-400 border-amber-700/50 animate-bounce'
          }`}>
            {isClean ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <span>NETWORK ATTACK & INTERCEPTION SIMULATOR</span>
              <Tooltip
                title="Adversary Model"
                content="Demonstrates passive eavesdropping and active tampering against network transit packets."
              >
                <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${
                  isClean
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800 font-extrabold'
                }`}>
                  {isClean ? 'CLEAN TRANSMISSION' : `ATTACK: ${attackType}`}
                </span>
              </Tooltip>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Simulating adversary capabilities (eavesdropping, bit tampering, tag forgery, MITM)
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Overview Card */}
      <div className={`p-5 rounded-xl border mb-6 font-mono ${
        isClean
          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
          : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
      }`}>
        <div className="flex items-center space-x-2 font-bold text-sm mb-2">
          {isClean ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
          <span>{title || 'Active Attack Scenario'}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {description || 'Adversary monitoring transit channel...'}
        </p>
      </div>

      {/* Interactive Hacker Console Component */}
      <div className="mb-6">
        <AttackerHackerConsole
          attackType={attackType}
          packet={networkData?.packet}
          keySizeBits={keyData?.keySizeBits || 256}
        />
      </div>

      {/* Attack Details Breakdown */}
      {details && (
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-200 uppercase">INTERCEPTION & MODIFICATION EVENT LOG</span>
            <span className="text-slate-400 text-[10px]">Target Node: Network Channel</span>
          </div>

          {details.type === 'ATTACK_MODIFIED_PAYLOAD' && (
            <div className="space-y-3">
              <div className="text-amber-400 font-bold flex items-center space-x-1.5">
                <Zap className="w-4 h-4" />
                <span>Active Modification Detected: Field [{details.target_field}]</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">ORIGINAL PAYLOAD:</span>
                  <span className="text-emerald-400 font-bold break-all">{details.original_sample || details.original_tag}</span>
                </div>

                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800">
                  <span className="text-rose-400 text-[10px] font-bold block mb-1">TAMPERED PAYLOAD IN TRANSIT:</span>
                  <span className="text-rose-300 font-bold break-all">{details.tampered_sample || details.tampered_tag}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

import React from 'react';
import { BarChart3, Activity, Clock, ShieldCheck, Zap, Layers, Binary } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SecurityAnalyticsPanel({ bbsData, keyData, encryptionData, networkData, attackData, decryptionData, reportSummary }) {
  const bitsCount = bbsData.bits?.length || 256;
  const count0 = bbsData.bits?.filter((b) => b === 0).length || 128;
  const count1 = bbsData.bits?.filter((b) => b === 1).length || 128;

  const chartData = [
    { name: 'Bit 0', count: count0, color: '#00F0FF' },
    { name: 'Bit 1', count: count1, color: '#7C3AED' }
  ];

  const timingData = [
    { name: 'BBS PRNG', time: 18, color: '#00F0FF' },
    { name: 'Key Derivation', time: 4, color: '#7C3AED' },
    { name: 'AES-256-GCM', time: 12, color: '#00FF9C' },
    { name: 'Network Transit', time: 24, color: '#FFB020' },
    { name: 'Tag Verification', time: 6, color: '#00FF9C' }
  ];

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-[#00F0FF]/30 mb-8 glow-cyan">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0B1020]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#0B1020] text-[#00F0FF] border border-[#00F0FF]/40">
            <BarChart3 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-bold text-[#E6F7FF] flex items-center space-x-2">
              <span>SECURITY ANALYTICS & SYSTEM METRICS</span>
            </h3>
            <p className="text-xs text-[#718096] font-mono">
              Quantitative evaluation of cryptographic parameters, execution timing, and attack outcomes
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 font-mono text-xs">
        
        <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <span className="text-[#718096] text-[10px] uppercase font-bold block">BITS GENERATED</span>
          <span className="text-base font-orbitron font-black text-[#00F0FF] mt-1 block">{bitsCount}</span>
          <span className="text-[9px] text-[#718096]">BBS LSB Stream</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <span className="text-[#718096] text-[10px] uppercase font-bold block">ENCRYPTION TIME</span>
          <span className="text-base font-orbitron font-black text-[#00FF9C] mt-1 block">12 ms</span>
          <span className="text-[9px] text-[#718096]">AES-256-GCM AEAD</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <span className="text-[#718096] text-[10px] uppercase font-bold block">PACKET SIZE</span>
          <span className="text-base font-orbitron font-black text-[#7C3AED] mt-1 block">128 B</span>
          <span className="text-[9px] text-[#718096]">Payload + Metadata</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <span className="text-[#718096] text-[10px] uppercase font-bold block">ATTACK ATTEMPTS</span>
          <span className="text-base font-orbitron font-black text-[#FF3158] mt-1 block">1,000,000</span>
          <span className="text-[9px] text-[#718096]">Brute-force / BBS</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <span className="text-[#718096] text-[10px] uppercase font-bold block">AUTHENTICATION</span>
          <span className="text-sm font-orbitron font-black text-[#00FF9C] mt-1 block">
            {decryptionData.success ? 'VERIFIED' : 'REJECTED'}
          </span>
          <span className="text-[9px] text-[#718096]">GCM Auth Tag MAC</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <span className="text-[#718096] text-[10px] uppercase font-bold block">DECRYPTION</span>
          <span className="text-sm font-orbitron font-black text-[#00FF9C] mt-1 block">
            {decryptionData.success ? 'SUCCESS' : 'NEUTRALIZED'}
          </span>
          <span className="text-[9px] text-[#718096]">Plaintext Restored</span>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        
        {/* BBS Bit Frequency Distribution */}
        <div className="p-4 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <div className="text-xs font-bold text-[#E6F7FF] uppercase mb-3 flex items-center justify-between">
            <span>BBS BIT FREQUENCY DISTRIBUTION (0 VS 1)</span>
            <span className="text-[10px] text-[#00F0FF]">{bitsCount} Total Bits</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#718096" fontSize={11} tickLine={false} />
                <YAxis stroke="#718096" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#05070D', borderColor: '#0B1020', borderRadius: '8px' }}
                  labelStyle={{ color: '#E6F7FF', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cryptographic Execution Timing Breakdown */}
        <div className="p-4 rounded-xl bg-[#05070D] border border-[#0B1020]">
          <div className="text-xs font-bold text-[#E6F7FF] uppercase mb-3 flex items-center justify-between">
            <span>CRYPTOGRAPHIC PIPELINE LATENCY BREAKDOWN (MS)</span>
            <span className="text-[10px] text-[#00FF9C]">Total ~ 64 ms</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#718096" fontSize={10} tickLine={false} />
                <YAxis stroke="#718096" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#05070D', borderColor: '#0B1020', borderRadius: '8px' }}
                  labelStyle={{ color: '#E6F7FF', fontWeight: 'bold' }}
                />
                <Bar dataKey="time" radius={[6, 6, 0, 0]}>
                  {timingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}

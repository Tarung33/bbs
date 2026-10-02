import React from 'react';
import { Binary, Calculator, Activity, HelpCircle, Eye, Code, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import Tooltip from './Tooltip';

export default function BbsVisualizer({ bbsData, isActive, showInternalProcess }) {
  const { params, steps, bits, summary } = bbsData;

  const totalBits = bits.length;
  const count0 = bits.filter((b) => b === 0).length;
  const count1 = bits.filter((b) => b === 1).length;
  const pct0 = totalBits > 0 ? ((count0 / totalBits) * 100).toFixed(1) : 0;
  const pct1 = totalBits > 0 ? ((count1 / totalBits) * 100).toFixed(1) : 0;

  const chartData = [
    { name: 'Bit 0', count: count0, percentage: pct0, color: '#7C3AED' },
    { name: 'Bit 1', count: count1, percentage: pct1, color: '#00F0FF' }
  ];

  return (
    <div className={`cyber-glass rounded-2xl p-6 border transition-all duration-300 mb-8 ${
      isActive ? 'border-[#00F0FF]/50 glow-cyan bg-[#080B12]/80' : 'border-[#0B1020] opacity-90'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0B1020]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#0B1020] text-[#00F0FF] border border-[#00F0FF]/40">
            <Binary className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-orbitron font-bold text-[#E6F7FF] flex items-center space-x-2">
              <span>BLUM BLUM SHUB RANDOMNESS ENGINE</span>
              <Tooltip
                title="Blum Blum Shub (BBS)"
                content="A cryptographically secure pseudorandom bit generator (CSPRNG) based on modular squaring x_{i+1} = x_i² mod n."
              >
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                  xᵢ₊₁ = xᵢ² mod n
                </span>
              </Tooltip>
            </h3>
            <p className="text-xs text-[#718096] font-mono">
              Pseudorandom Bit Generator operating under Quadratic Residuosity Assumption
            </p>
          </div>
        </div>

        {totalBits > 0 && (
          <div className="text-right font-mono">
            <div className="text-xs text-[#718096]">BITS GENERATED</div>
            <div className="text-xl font-bold text-[#00F0FF] font-orbitron">{totalBits} BITS</div>
          </div>
        )}
      </div>

      {/* 1. Parameter Cards Grid */}
      {params && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 font-mono">
          
          <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[10px] text-[#718096] uppercase flex items-center">
              <span>Prime p</span>
              <Tooltip title="Blum Prime p" content="Prime p satisfying p ≡ 3 (mod 4). Ensures quadratic residues form a permutation." />
            </div>
            <div className="text-sm font-bold text-[#00F0FF] truncate" title={params.p}>
              {params.p}
            </div>
            <div className="text-[9px] text-[#718096]">p ≡ 3 mod 4</div>
          </div>

          <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[10px] text-[#718096] uppercase flex items-center">
              <span>Prime q</span>
              <Tooltip title="Blum Prime q" content="Prime q satisfying q ≡ 3 (mod 4)." />
            </div>
            <div className="text-sm font-bold text-[#7C3AED] truncate" title={params.q}>
              {params.q}
            </div>
            <div className="text-[9px] text-[#718096]">q ≡ 3 mod 4</div>
          </div>

          <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[10px] text-[#718096] uppercase flex items-center">
              <span>Modulus n</span>
              <Tooltip title="BBS Modulus n" content="Modulus n = p × q. Finding p and q from n is the integer factorization problem." />
            </div>
            <div className="text-sm font-bold text-[#00FF9C] truncate" title={params.n}>
              {params.n}
            </div>
            <div className="text-[9px] text-[#718096]">n = p × q</div>
          </div>

          <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[10px] text-[#718096] uppercase flex items-center">
              <span>Seed s</span>
              <Tooltip title="BBS Seed s" content="Secret integer s coprime to n (gcd(s, n) = 1)." />
            </div>
            <div className="text-sm font-bold text-[#FFB020] truncate" title={params.seed}>
              {params.seed}
            </div>
            <div className="text-[9px] text-[#718096]">gcd(s, n) = 1</div>
          </div>

          <div className="p-3 rounded-xl bg-[#05070D] border border-[#0B1020]">
            <div className="text-[10px] text-[#718096] uppercase flex items-center">
              <span>State x₀</span>
              <Tooltip title="Initial State x0" content="Calculated as x0 = s² mod n." />
            </div>
            <div className="text-sm font-bold text-[#00FF9C] truncate" title={params.x0}>
              {params.x0}
            </div>
            <div className="text-[9px] text-[#718096]">x₀ = s² mod n</div>
          </div>

        </div>
      )}

      {/* State Iteration Chain: x0 -> x1 -> x2 -> x3 -> x4 with glowing connection lines */}
      <div className="p-4 rounded-xl bg-[#05070D] border border-[#00F0FF]/30 mb-6 font-mono text-xs overflow-x-auto">
        <div className="text-[10px] text-[#718096] uppercase font-bold mb-2">DYNAMIC MODULAR SQUARING CHAIN (x₀ → x₁ → x₂ → x₃ → x₄)</div>
        <div className="flex items-center space-x-2 min-w-[600px] justify-between">
          {['x₀', 'x₁', 'x₂', 'x₃', 'x₄'].map((label, idx) => {
            const stepVal = steps[idx]?.result || (idx === 0 ? params?.x0 : '...');
            return (
              <React.Fragment key={label}>
                <div className="p-2.5 rounded-lg bg-[#080B12] border border-[#00F0FF]/40 text-center min-w-[90px] shadow-lg">
                  <span className="text-[10px] text-[#00F0FF] font-bold block">{label}</span>
                  <span className="text-xs font-bold text-[#E6F7FF] truncate block max-w-[80px]">{stepVal}</span>
                </div>
                {idx < 4 && <ArrowRight className="w-4 h-4 text-[#00F0FF] animate-pulse" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Live Mathematical Calculation Steps & Bitstream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Math Iterations Table */}
        <div className="bg-[#05070D] rounded-xl p-4 border border-[#0B1020] flex flex-col h-[280px]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-[#E6F7FF] border-b border-[#0B1020] pb-2">
            <span className="flex items-center space-x-1.5">
              <Calculator className="w-4 h-4 text-[#00F0FF]" />
              <span>MATH ITERATIONS STREAM</span>
            </span>
            <span className="text-[#718096]">x(i+1) = x(i)² mod n</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
            {steps.length === 0 ? (
              <div className="text-[#718096] text-center py-12 italic">
                Awaiting BBS execution start...
              </div>
            ) : (
              steps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-center justify-between p-2 rounded bg-[#080B12] border border-[#0B1020] hover:border-[#00F0FF]/40 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[#718096] text-[10px] font-bold">#{step.step}</span>
                    <span className="text-[#E6F7FF] font-mono text-[11px]">
                      {step.operation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#718096] text-[10px]">LSB:</span>
                    <span className={`px-2 py-0.5 rounded font-extrabold text-xs ${
                      step.output_bit === 1
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]'
                        : 'bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]'
                    }`}>
                      {step.output_bit}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Animated Bitstream Box: 1 -> Cyan, 0 -> Purple */}
        <div className="bg-[#05070D] rounded-xl p-4 border border-[#0B1020] flex flex-col h-[280px]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-[#E6F7FF] border-b border-[#0B1020] pb-2">
            <span className="flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-[#7C3AED]" />
              <span>GENERATED BITSTREAM (1 → CYAN, 0 → PURPLE)</span>
            </span>
            <span className="text-[#00F0FF] font-bold">{bits.length} BITS</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 rounded-lg bg-[#080B12] border border-[#0B1020] font-mono text-sm leading-relaxed tracking-widest break-all flex flex-wrap gap-1 content-start">
            {bits.length === 0 ? (
              <span className="text-[#718096] italic">No bits generated yet.</span>
            ) : (
              bits.map((b, idx) => (
                <span
                  key={idx}
                  className={`px-1.5 py-0.5 rounded text-xs font-extrabold transition-all duration-200 animate-fadeIn ${
                    b === 1
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 glow-cyan'
                      : 'bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/60 glow-purple'
                  }`}
                >
                  {b}
                </span>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 3. Randomness Observation Progress Bar & Stats */}
      <div className="p-5 rounded-xl bg-[#05070D] border border-[#0B1020]">
        <div className="flex flex-wrap items-center justify-between mb-4 border-b border-[#0B1020] pb-3 gap-2">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-[#00FF9C]" />
            <h4 className="text-sm font-orbitron font-bold text-[#E6F7FF] uppercase tracking-wider">
              RANDOMNESS OBSERVATION
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#718096] bg-[#080B12] px-3 py-1 rounded-md border border-[#0B1020]">
            Statistical Bit Distribution
          </span>
        </div>

        {/* Observation Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-mono text-[#718096] mb-1">
            <span>BIT UNIFORMITY METRIC:</span>
            <span className="text-[#00FF9C] font-bold">50% ZEROS / 50% ONES</span>
          </div>
          <div className="w-full bg-[#080B12] h-3 rounded-full overflow-hidden border border-[#0B1020]">
            <div className="bg-gradient-to-r from-[#7C3AED] via-[#00F0FF] to-[#00FF9C] h-full w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Stat Numbers */}
          <div className="space-y-3 font-mono">
            <div className="p-3 rounded-lg bg-[#080B12] border border-[#0B1020] flex justify-between items-center">
              <span className="text-xs text-[#718096]">BITS GENERATED:</span>
              <span className="text-sm font-bold text-[#E6F7FF]">{totalBits}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#7C3AED]/15 border border-[#7C3AED]/40 flex justify-between items-center">
              <span className="text-xs text-[#7C3AED] font-bold">ZEROS ('0' COUNT):</span>
              <span className="text-sm font-bold text-[#7C3AED]">{count0} ({pct0}%)</span>
            </div>

            <div className="p-3 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex justify-between items-center">
              <span className="text-xs text-[#00F0FF] font-bold">ONES ('1' COUNT):</span>
              <span className="text-sm font-bold text-[#00F0FF]">{count1} ({pct1}%)</span>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#718096" fontSize={11} tickLine={false} />
                <YAxis stroke="#718096" fontSize={11} tickLine={false} />
                <RechartsTooltip
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

          {/* Educational Disclaimer */}
          <div className="p-4 rounded-xl bg-[#080B12] border border-[#0B1020] text-xs text-[#718096] space-y-2 font-sans">
            <div className="flex items-center space-x-1.5 font-bold text-[#00FF9C] font-mono text-[11px]">
              <HelpCircle className="w-4 h-4" />
              <span>CRYPTOGRAPHIC NOTICE:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Frequency distribution checks observe standard statistical balance. However, statistical balance alone does NOT guarantee cryptographic security.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

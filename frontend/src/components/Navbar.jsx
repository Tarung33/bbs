import React from 'react';
import { Shield, Cpu, FlaskConical, Network, ShieldAlert, BarChart3, Terminal, Zap, Play, Layers } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  mode,
  setMode,
  wsConnected,
  showTerminal,
  setShowTerminal,
  stepByStep,
  setStepByStep,
  onPresentationMode,
  onOpenArchitecture,
  onOpenPrngComparison
}) {
  const navTabs = [
    { id: 'LAB', label: 'LAB', icon: FlaskConical },
    { id: 'NETWORK', label: 'NETWORK', icon: Network },
    { id: 'ATTACK', label: 'ATTACK SIMULATOR', icon: ShieldAlert },
    { id: 'ANALYTICS', label: 'ANALYTICS', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-50 cyber-glass border-b border-[#00F0FF]/20 bg-[#05070D]/90 backdrop-blur-xl px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & Stylized C Visor */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('LAB')}>
          <div className="relative p-2 rounded-xl bg-[#0B1020] border border-[#00F0FF]/40 text-[#00F0FF] glow-cyan">
            {/* Stylized C + Data Stream + Visor Eye Icon */}
            <div className="flex items-center justify-center w-7 h-7 font-orbitron font-black text-xl tracking-tighter text-[#00F0FF]">
              C<span className="text-[#7C3AED] text-sm font-sans">👁</span>
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-ping" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-extrabold text-xl tracking-widest text-[#E6F7FF] text-glow-cyan">
                CRYPTO<span className="text-[#00F0FF]">VISOR</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                v2.5 SOC
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-wider text-[#718096] uppercase">
              SEE ENCRYPTION. UNDERSTAND SECURITY.
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="flex items-center p-1 rounded-xl bg-[#080B12] border border-[#0B1020]">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00F0FF]/20 to-[#7C3AED]/20 text-[#00F0FF] border border-[#00F0FF]/50 shadow-lg glow-cyan'
                    : 'text-[#718096] hover:text-[#E6F7FF] hover:bg-[#0B1020]/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>[{tab.label}]</span>
              </button>
            );
          })}
        </nav>

        {/* Right System Controls & Status Indicators */}
        <div className="flex flex-wrap items-center space-x-2.5">
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#080B12] border border-[#0B1020] text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-[#00FF9C] animate-ping' : 'bg-[#FF3158]'}`} />
            <span className={`font-bold ${wsConnected ? 'text-[#00FF9C]' : 'text-[#FF3158]'}`}>
              {wsConnected ? '● SYSTEM ONLINE' : 'OFFLINE'}
            </span>
          </div>

          {/* Mode Switcher */}
          <button
            onClick={() => setMode(mode === 'DEMO' ? 'LAB' : 'DEMO')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0B1020] hover:bg-[#111827] text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-mono font-bold transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>[{mode} MODE]</span>
          </button>

          {/* Step-by-Step Toggle */}
          <button
            onClick={() => setStepByStep(!stepByStep)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors border ${
              stepByStep
                ? 'bg-[#7C3AED]/30 text-[#7C3AED] border-[#7C3AED] glow-purple'
                : 'bg-[#0B1020] text-[#718096] border-[#0B1020] hover:text-[#E6F7FF]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{stepByStep ? 'STEP-BY-STEP ON' : 'AUTO RUN'}</span>
          </button>

          {/* PRESENTATION MODE Button */}
          <button
            onClick={onPresentationMode}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#00F0FF] text-[#05070D] font-orbitron font-extrabold text-xs tracking-wider shadow-lg hover:opacity-90 transition-all glow-cyan"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PRESENTATION</span>
          </button>

          {/* PRNGs & Architecture Quick Buttons */}
          <button
            onClick={onOpenPrngComparison}
            className="p-1.5 rounded-lg bg-[#080B12] hover:bg-[#0B1020] text-[#7C3AED] border border-[#7C3AED]/40 transition-colors"
            title="Compare Random Generators"
          >
            <Zap className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenArchitecture}
            className="p-1.5 rounded-lg bg-[#080B12] hover:bg-[#0B1020] text-[#00F0FF] border border-[#00F0FF]/40 transition-colors"
            title="View Architecture"
          >
            <Network className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showTerminal ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]' : 'bg-[#080B12] text-[#718096] border-[#0B1020]'
            }`}
            title="Console Log"
          >
            <Terminal className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}

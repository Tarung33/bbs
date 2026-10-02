import React from 'react';
import { Shield, BookOpen, Cpu, Map, Activity } from 'lucide-react';

export default function EditorialNavbar({
  currentStage,
  setStage,
  numberMode,
  setNumberMode,
  showBackendDrawer,
  setShowBackendDrawer,
  onOpenJourneyMap,
  onOpenSequenceModal
}) {
  return (
    <header className="border-b border-[#111111] bg-[#FFFFFF] sticky top-0 z-40 font-mono text-xs text-[#111111] shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setStage(1)}
            className="flex items-center space-x-2 font-bold text-sm tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#111111] text-white flex items-center justify-center font-black text-xs">
              CV
            </div>
            <span className="font-bold text-base tracking-wider">CRYPTOVISOR</span>
          </button>
          
          <span className="hidden sm:inline text-[#555555] font-normal text-[11px] border-l border-[#111111] pl-3">
            SEE ENCRYPTION. UNDERSTAND SECURITY.
          </span>
        </div>

        {/* Center Mode Switcher: EXPLAIN MODE vs REAL CRYPTO MODE */}
        <div className="flex items-center bg-[#F7F7F5] border border-[#111111] p-0.5">
          <button
            onClick={() => setNumberMode('EXPLAIN')}
            className={`px-3 py-1 text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-colors ${
              numberMode === 'EXPLAIN'
                ? 'bg-[#111111] text-white'
                : 'text-[#555555] hover:text-[#111111]'
            }`}
            title="Use small numbers (p=7, q=11, n=77) so anyone can follow the math"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>EXPLAIN MODE (p=7, q=11)</span>
          </button>

          <button
            onClick={() => setNumberMode('REAL')}
            className={`px-3 py-1 text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-colors ${
              numberMode === 'REAL'
                ? 'bg-[#111111] text-white'
                : 'text-[#555555] hover:text-[#111111]'
            }`}
            title="Use production-sized parameters with masked values and technical drawers"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>REAL CRYPTO MODE</span>
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center space-x-3 text-[11px]">
          
          {/* Journey Map Modal trigger */}
          <button
            onClick={onOpenJourneyMap}
            className="flex items-center space-x-1 text-[#555555] hover:text-[#111111] font-bold cursor-pointer transition-colors"
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden md:inline">MAP</span>
          </button>

          {/* Table Modal trigger */}
          <button
            onClick={onOpenSequenceModal}
            className="flex items-center space-x-1 text-[#555555] hover:text-[#111111] font-bold cursor-pointer transition-colors"
          >
            <span className="hidden md:inline">TABLE</span>
          </button>

          {/* Backend Activity Toggle */}
          <button
            onClick={() => setShowBackendDrawer(!showBackendDrawer)}
            className={`px-2.5 py-1 border text-[10px] font-bold flex items-center space-x-1 cursor-pointer ${
              showBackendDrawer
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-[#111111] border-[#111111] hover:bg-[#F7F7F5]'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>LOGS</span>
          </button>

        </div>

      </div>
    </header>
  );
}

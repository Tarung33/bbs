import React from 'react';
import { Play, Pause, StepForward, RotateCcw, Eye, Presentation, Sliders } from 'lucide-react';

export default function StepControls({
  pipelineState,
  onStart,
  onPause,
  onStep,
  onReset,
  showInternalProcess,
  setShowInternalProcess,
  onPresentationMode,
  wsConnected
}) {
  const isRunning = pipelineState === 'RUNNING';

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
      
      {/* Primary Stepping Buttons */}
      <div className="flex flex-wrap items-center space-x-2">
        
        {/* START */}
        <button
          onClick={onStart}
          disabled={isRunning || !wsConnected}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
            isRunning
              ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 opacity-50 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 glow-cyan active:scale-95'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>START</span>
        </button>

        {/* PAUSE */}
        <button
          onClick={onPause}
          disabled={!isRunning}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono border transition-all ${
            isRunning
              ? 'bg-amber-950/80 border-amber-700 text-amber-200 hover:bg-amber-900 glow-amber'
              : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <Pause className="w-4 h-4" />
          <span>PAUSE</span>
        </button>

        {/* STEP */}
        <button
          onClick={onStep}
          disabled={!wsConnected}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/60 transition-all glow-purple active:scale-95"
          title="Advance single micro-step manually"
        >
          <StepForward className="w-4 h-4" />
          <span>STEP</span>
        </button>

        {/* RESET */}
        <button
          onClick={onReset}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET</span>
        </button>

      </div>

      {/* Toggles: Show Internal Process & Presentation Mode */}
      <div className="flex flex-wrap items-center space-x-3">
        
        {/* SHOW INTERNAL PROCESS TOGGLE */}
        <button
          onClick={() => setShowInternalProcess(!showInternalProcess)}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
            showInternalProcess
              ? 'bg-teal-950 text-teal-300 border-teal-500/60 glow-emerald'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>SHOW INTERNAL PROCESS</span>
          <span className={`w-2 h-2 rounded-full ${showInternalProcess ? 'bg-teal-400' : 'bg-slate-600'}`} />
        </button>

        {/* PRESENTATION MODE BUTTON */}
        <button
          onClick={onPresentationMode}
          disabled={!wsConnected}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg glow-purple active:scale-95"
        >
          <Presentation className="w-4 h-4" />
          <span>PRESENTATION MODE</span>
        </button>

      </div>

    </div>
  );
}

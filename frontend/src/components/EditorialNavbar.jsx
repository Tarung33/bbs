import React from 'react';
import { RotateCcw, Table, BookOpen, Sparkles } from 'lucide-react';

export default function EditorialNavbar({
  currentStep,
  mode,
  setMode,
  onReset,
  onOpenSequenceModal,
  setStep
}) {
  const steps = [
    { num: 1, label: 'PRIMES' },
    { num: 2, label: 'MODULUS' },
    { num: 3, label: 'SEED' },
    { num: 4, label: 'STATE x₀' },
    { num: 5, label: 'MACHINE' },
    { num: 6, label: 'BITSTREAM' },
    { num: 7, label: 'MESSAGE & SECURITY' },
    { num: 8, label: 'SUMMARY' },
  ];

  return (
    <header className="border-b-2 border-[#09090B] bg-[#FFFFFF] sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Title */}
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#09090B] inline-block"></span>
            <h1 className="font-heading font-extrabold text-xl tracking-tight text-[#09090B]">
              BLUM BLUM SHUB
            </h1>
            <span className="text-xs px-2 py-0.5 border border-[#09090B] font-mono font-bold bg-[#FAFAFA]">
              BBS PRNG
            </span>
          </div>
          <p className="text-xs text-[#52525B] font-mono">
            THE RANDOMNESS MACHINE • CNS / BCS703 VISUAL LAB
          </p>
        </div>

        {/* Mode Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Learn Mode / Preset Toggle */}
          <div className="flex border-2 border-[#09090B] bg-[#FAFAFA] p-0.5 text-xs font-mono">
            <button
              onClick={() => setMode('DEMO')}
              className={`px-3 py-1 font-bold transition-colors ${
                mode === 'DEMO'
                  ? 'bg-[#09090B] text-white'
                  : 'text-[#09090B] hover:bg-[#E4E4E7]'
              }`}
            >
              DEMO (7, 11)
            </button>
            <button
              onClick={() => setMode('NOTES')}
              className={`px-3 py-1 font-bold transition-colors ${
                mode === 'NOTES'
                  ? 'bg-[#09090B] text-white'
                  : 'text-[#09090B] hover:bg-[#E4E4E7]'
              }`}
            >
              NOTES EXAMPLE (383, 503)
            </button>
          </div>

          {/* Table Modal Button */}
          <button
            onClick={onOpenSequenceModal}
            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#09090B] text-xs font-mono font-bold bg-white hover:bg-[#FAFAFA] active:translate-y-0.5 shadow-[2px_2px_0px_0px_#09090B]"
            title="View Full Technical Sequence Table"
          >
            <Table size={14} />
            <span>FULL SEQUENCE</span>
          </button>

          {/* Reset Experiment */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#09090B] text-xs font-mono font-bold bg-white hover:bg-[#FEF2F2] hover:text-[#DC2626] hover:border-[#DC2626] active:translate-y-0.5 shadow-[2px_2px_0px_0px_#09090B]"
            title="Restart BBS Experiment"
          >
            <RotateCcw size={14} />
            <span>RESTART</span>
          </button>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="border-t border-[#09090B] bg-[#FAFAFA] overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-1 min-w-max">
          {steps.map((s) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;

            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num <= currentStep) setStep(s.num);
                }}
                disabled={s.num > currentStep}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono transition-all ${
                  isActive
                    ? 'font-bold bg-[#09090B] text-white'
                    : isCompleted
                    ? 'font-medium text-[#09090B] hover:bg-[#E4E4E7]'
                    : 'text-[#A1A1AA] cursor-not-allowed'
                }`}
              >
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {s.num}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

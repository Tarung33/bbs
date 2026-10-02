import React from 'react';

const BREADCRUMBS = [
  { id: 1, label: 'MESSAGE', minStep: 1, maxStep: 1 },
  { id: 2, label: 'BBS', minStep: 2, maxStep: 5 },
  { id: 3, label: 'RANDOMNESS', minStep: 6, maxStep: 6 },
  { id: 4, label: 'KEY', minStep: 7, maxStep: 7 },
  { id: 5, label: 'ENCRYPT', minStep: 8, maxStep: 8 },
  { id: 6, label: 'NETWORK', minStep: 9, maxStep: 9 },
  { id: 7, label: 'ATTACK', minStep: 10, maxStep: 12 },
  { id: 8, label: 'DECRYPT', minStep: 13, maxStep: 13 },
  { id: 9, label: 'RESTORED', minStep: 14, maxStep: 14 }
];

export default function MessageJourneyPath({ currentStage, setStage, isThreat }) {
  const formattedStep = String(currentStage).padStart(2, '0');

  return (
    <div className="w-full max-w-5xl mx-auto my-4 px-4 font-mono text-xs">
      
      {/* Top Bar Indicator */}
      <div className="flex justify-between items-center text-[11px] font-bold tracking-widest uppercase mb-3">
        <span className="text-[#09090B]">THE MESSAGE JOURNEY PATH</span>
        <span className="px-2.5 py-0.5 border border-[#09090B] bg-[#FAFAFA] text-[#09090B]">
          STEP {formattedStep} / 14
        </span>
      </div>

      {/* Thin Black Line Container */}
      <div className="relative py-3">
        
        {/* Continuous Thin Black Line */}
        <div className={`w-full ${isThreat ? 'journey-line-red' : 'journey-line'}`} />

        {/* Breadcrumb Nodes Grid */}
        <div className="flex items-center justify-between relative -mt-3.5">
          {BREADCRUMBS.map((b) => {
            const isActive = currentStage >= b.minStep && currentStage <= b.maxStep;
            const isPassed = currentStage > b.maxStep;

            return (
              <button
                key={b.id}
                onClick={() => setStage(b.minStep)}
                className="flex flex-col items-center group cursor-pointer"
                title={`Jump to ${b.label} (Step ${b.minStep})`}
              >
                {/* Node Circle */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 font-bold text-[9px] ${
                    isActive
                      ? isThreat
                        ? 'bg-[#DC2626] text-white border-[#DC2626] scale-110 shadow-sm'
                        : 'bg-[#09090B] text-white border-[#09090B] scale-110 shadow-sm'
                      : isPassed
                      ? 'bg-[#16A34A] text-white border-[#16A34A]'
                      : 'bg-white text-[#52525B] border-[#09090B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  {b.id}
                </div>

                {/* Node Label */}
                <span
                  className={`text-[9px] font-bold tracking-wider mt-1 uppercase ${
                    isActive
                      ? isThreat
                        ? 'text-[#DC2626]'
                        : 'text-[#09090B]'
                      : 'text-[#52525B]'
                  }`}
                >
                  {b.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}

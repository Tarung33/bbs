import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BbsMachineDiagram from './BbsMachineDiagram';
import { Play, ArrowRight } from 'lucide-react';

export default function Stage5WatchBbsGenerate({
  x0,
  n,
  onStateGenerated,
  onNext,
  onBack
}) {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [calculatedX1, setCalculatedX1] = useState(null);

  const handleGenerateNextState = () => {
    setIsAnimating(true);
    
    // Exact BBS formula: x1 = (x0)^2 mod n
    const x0Squared = x0 * x0;
    const x1 = x0Squared % n;

    setTimeout(() => {
      setCalculatedX1(x1);
      setIsAnimating(false);
      setHasGenerated(true);
      onStateGenerated(x1);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 5 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          05 / WATCH BBS GENERATE
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          Each state is obtained recursively by squaring the previous state modulo <strong className="text-[#09090B]">n = {n}</strong>.
        </p>
      </div>

      {/* Central Physical-Looking Machine Diagram */}
      <BbsMachineDiagram
        stepCount={hasGenerated ? 1 : 0}
        currentX={hasGenerated ? calculatedX1 : x0}
        previousX={hasGenerated ? x0 : null}
        n={n}
        calculatedNextX={calculatedX1}
        isAnimating={isAnimating}
      />

      {/* Interactive Controls Bar */}
      <div className="flex flex-col items-center space-y-4">
        
        {!hasGenerated ? (
          <button
            onClick={handleGenerateNextState}
            disabled={isAnimating}
            className="px-8 py-3.5 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-base hover:bg-[#27272A] shadow-[4px_4px_0px_0px_#09090B] active:translate-y-0.5 flex items-center gap-2"
          >
            <Play size={18} />
            <span>GENERATE NEXT STATE →</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl editorial-card-green p-4 font-mono text-center space-y-2"
          >
            <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              NEW STATE PRODUCED
            </div>
            <div className="text-2xl font-extrabold text-[#09090B]">
              x₁ = ({x0})² mod {n} = {x0 * x0} mod {n} = <span className="underline">{calculatedX1}</span>
            </div>
            <div className="text-xs text-[#52525B]">
              State x₁ is now active in the machine memory.
            </div>
          </motion.div>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E4E4E7]">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border-2 border-[#09090B] bg-white font-mono font-bold text-xs hover:bg-[#FAFAFA] shadow-[3px_3px_0px_0px_#09090B]"
        >
          ← BACK
        </button>

        {hasGenerated && (
          <button
            onClick={onNext}
            className="px-6 py-2.5 border-2 border-[#09090B] bg-[#16A34A] text-white font-mono font-bold text-sm hover:bg-[#15803D] shadow-[3px_3px_0px_0px_#09090B] flex items-center gap-2"
          >
            <span>NEXT →</span>
          </button>
        )}
      </div>

    </div>
  );
}

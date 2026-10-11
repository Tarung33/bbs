import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, ChevronRight, Layers } from 'lucide-react';
import BbsMachineDiagram from './BbsMachineDiagram';

export default function Stage6ExtractBit({
  p,
  q,
  n,
  seed,
  x0,
  generatedSteps,
  setGeneratedSteps,
  bitstream,
  setBitstream,
  onNext,
  onBack
}) {
  const [currentX, setCurrentX] = useState(x0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // Initialize first bit extraction if empty
  useEffect(() => {
    if (generatedSteps.length === 0) {
      // Step 1 calculation
      const x1 = (x0 * x0) % n;
      const b1 = x1 % 2;
      const firstStep = {
        step: 1,
        previous_x: x0,
        operation: `(${x0})² mod ${n}`,
        current_x: x1,
        bit: b1
      };
      setGeneratedSteps([firstStep]);
      setBitstream([b1]);
      setCurrentX(x1);
      setStepIndex(1);
    } else {
      const last = generatedSteps[generatedSteps.length - 1];
      setCurrentX(last.current_x);
      setStepIndex(last.step);
    }
  }, []);

  // Handle single next bit generation
  const handleGenerateNextBit = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const prevX = currentX;
    const nextX = (prevX * prevX) % n;
    const nextBit = nextX % 2;
    const nextStepNum = stepIndex + 1;

    setTimeout(() => {
      const newStep = {
        step: nextStepNum,
        previous_x: prevX,
        operation: `(${prevX})² mod ${n}`,
        current_x: nextX,
        bit: nextBit
      };

      setGeneratedSteps((prev) => [...prev, newStep]);
      setBitstream((prev) => [...prev, nextBit]);
      setCurrentX(nextX);
      setStepIndex(nextStepNum);
      setIsAnimating(false);
    }, 400);
  };

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (autoPlay && stepIndex < 16) {
      timer = setTimeout(() => {
        handleGenerateNextBit();
      }, 700);
    } else if (stepIndex >= 16) {
      setAutoPlay(false);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, stepIndex, currentX]);

  const currentStepData = generatedSteps[generatedSteps.length - 1] || null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 6 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          06 / EXTRACT THE BIT
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          "BBS does not output the entire state. We take only the least significant bit (x<sub>i</sub> mod 2)."
        </p>
      </div>

      {/* Main Machine View for Bit Extraction */}
      <BbsMachineDiagram
        stepCount={stepIndex}
        currentX={currentX}
        previousX={currentStepData ? currentStepData.previous_x : x0}
        n={n}
        lastBit={currentStepData ? currentStepData.bit : null}
        isAnimating={isAnimating}
        highlightBit={true}
      />

      {/* Interactive Controls Bar */}
      <div className="editorial-card p-5 space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <button
            onClick={handleGenerateNextBit}
            disabled={isAnimating || autoPlay}
            className="px-6 py-3 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-sm hover:bg-[#27272A] shadow-[3px_3px_0px_0px_#09090B] active:translate-y-0.5 flex items-center gap-2 disabled:opacity-50"
          >
            <Play size={16} />
            <span>GENERATE NEXT BIT →</span>
          </button>

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-4 py-3 border-2 border-[#09090B] font-mono font-bold text-xs flex items-center gap-2 shadow-[2px_2px_0px_0px_#09090B] ${
              autoPlay ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-white hover:bg-[#FAFAFA]'
            }`}
          >
            {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            <span>{autoPlay ? 'PAUSE AUTO' : 'AUTO PLAY'}</span>
          </button>

          <div className="font-mono text-xs text-[#52525B]">
            GENERATED: <strong className="text-[#09090B] text-sm font-bold">{bitstream.length} BITS</strong>
          </div>

        </div>

        {/* Live Output Bitstream Container */}
        <div className="border-2 border-[#09090B] p-4 bg-[#FAFAFA] space-y-2">
          <div className="text-xs font-mono font-bold text-[#52525B] uppercase tracking-wider flex items-center justify-between">
            <span>ACCUMULATED PSEUDORANDOM BITSTREAM</span>
            <span className="text-[10px] text-[#52525B]">LSB BITS</span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[3.25rem] items-center p-2 bg-white border border-[#09090B]">
            {bitstream.map((b, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="bit-badge"
              >
                {b}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Recursive Timeline View */}
        <div className="border-t border-[#09090B] pt-4 space-y-2">
          <div className="text-xs font-mono font-bold text-[#52525B] uppercase">
            RECURSIVE STATE &amp; BIT TIMELINE
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 min-w-full">
            <div className="flex flex-col items-center p-2 border border-[#09090B] bg-white text-xs font-mono min-w-[4rem]">
              <span className="text-[#52525B]">x₀</span>
              <span className="font-bold">{x0}</span>
              <span className="text-[10px] text-[#A1A1AA]">SEED</span>
            </div>

            {generatedSteps.slice(-8).map((st) => (
              <React.Fragment key={st.step}>
                <ChevronRight size={14} className="text-[#09090B] shrink-0" />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center p-2 border border-[#09090B] bg-white text-xs font-mono min-w-[4.5rem] shadow-[2px_2px_0px_0px_#09090B]"
                >
                  <span className="text-[#52525B]">x<sub>{st.step}</sub></span>
                  <span className="font-extrabold text-[#09090B]">{st.current_x}</span>
                  <span className="mt-1 px-2 py-0.5 bg-[#09090B] text-white font-bold text-[10px]">
                    LSB: {st.bit}
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E4E4E7]">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border-2 border-[#09090B] bg-white font-mono font-bold text-xs hover:bg-[#FAFAFA] shadow-[3px_3px_0px_0px_#09090B]"
        >
          ← BACK
        </button>

        {bitstream.length >= 4 && (
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

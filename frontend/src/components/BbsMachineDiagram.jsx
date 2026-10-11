import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, RefreshCw, Layers } from 'lucide-react';

export default function BbsMachineDiagram({
  stepCount = 0,
  currentX = 9,
  previousX = null,
  n = 77,
  calculatedNextX = null,
  lastBit = null,
  isAnimating = false,
  highlightBit = false
}) {
  return (
    <div className="w-full max-w-xl mx-auto my-6 border-2 border-[#09090B] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_0px_#09090B] relative">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-[#09090B] pb-3 mb-6">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[#09090B]" />
          <span className="font-heading font-extrabold text-sm tracking-wider uppercase">
            BBS MATHEMATICAL RECURRENCE MACHINE
          </span>
        </div>
        <div className="font-mono text-xs text-[#52525B]">
          n = <strong className="text-[#09090B] font-bold">{n}</strong>
        </div>
      </div>

      {/* Machine Core Diagram */}
      <div className="flex flex-col items-center justify-center space-y-3 font-mono text-sm relative">
        
        {/* Input / Previous State Box */}
        <div className="text-center w-full max-w-xs">
          <div className="text-xs uppercase font-bold text-[#52525B] mb-1">
            {stepCount === 0 ? 'INITIAL SEED STATE' : `PREVIOUS STATE (x${stepCount - 1})`}
          </div>
          <motion.div
            key={`prev-${previousX !== null ? previousX : currentX}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="p-3 border-2 border-[#09090B] bg-[#FAFAFA] font-mono font-bold text-lg text-[#09090B] shadow-[2px_2px_0px_0px_#09090B]"
          >
            {previousX !== null ? previousX : currentX}
          </motion.div>
        </div>

        {/* Down Arrow */}
        <div className="flex flex-col items-center text-[#09090B]">
          <ArrowDown size={20} className={isAnimating ? 'animate-bounce text-[#16A34A]' : ''} />
        </div>

        {/* Mathematical Processor Box (SQUARE MOD n) */}
        <motion.div
          animate={isAnimating ? { borderColor: ['#09090B', '#16A34A', '#09090B'], scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.8, repeat: isAnimating ? Infinity : 0 }}
          className={`w-full max-w-sm border-2 border-[#09090B] p-4 text-center relative shadow-[4px_4px_0px_0px_#09090B] ${
            isAnimating ? 'bg-[#F0FDF4] border-[#16A34A]' : 'bg-[#FFFFFF]'
          }`}
        >
          <div className="text-xs uppercase tracking-widest font-extrabold text-[#52525B] mb-2 border-b border-[#E4E4E7] pb-1">
            MODULAR SQUARING ENGINE
          </div>

          <div className="text-lg font-extrabold font-mono text-[#09090B] my-1">
            x<sub>i</sub> = (x<sub>i-1</sub>)² mod n
          </div>

          {isAnimating && previousX !== null ? (
            <div className="text-xs font-mono text-[#16A34A] font-bold mt-2 animate-pulse">
              ({previousX})² mod {n} = {previousX * previousX} mod {n}
            </div>
          ) : (
            <div className="text-xs font-mono text-[#52525B] mt-1">
              Squaring input state & reducing modulo {n}
            </div>
          )}

          {/* Machine Mechanical Gears Accent */}
          <div className="absolute -right-3 -top-3 w-6 h-6 border border-[#09090B] bg-white flex items-center justify-center">
            <RefreshCw size={12} className={isAnimating ? 'animate-spin text-[#16A34A]' : 'text-[#09090B]'} />
          </div>
        </motion.div>

        {/* Down Arrow to State */}
        <div className="flex flex-col items-center text-[#09090B]">
          <ArrowDown size={20} />
        </div>

        {/* Calculated Next State Box */}
        <div className="text-center w-full max-w-xs">
          <div className="text-xs uppercase font-bold text-[#52525B] mb-1">
            CURRENT STATE (x<sub>{stepCount}</sub>)
          </div>
          <motion.div
            key={`current-${currentX}`}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-3 border-2 font-mono font-extrabold text-xl shadow-[3px_3px_0px_0px_#09090B] ${
              calculatedNextX !== null || stepCount > 0
                ? 'border-[#09090B] bg-[#09090B] text-white'
                : 'border-[#09090B] bg-[#FAFAFA] text-[#09090B]'
            }`}
          >
            x<sub>{stepCount}</sub> = {currentX}
          </motion.div>
        </div>

        {/* LSB Extraction Node */}
        {lastBit !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs mt-4 pt-4 border-t-2 border-dashed border-[#09090B] flex flex-col items-center"
          >
            <div className="text-xs uppercase font-bold text-[#52525B] mb-1 flex items-center gap-1">
              <span>LEAST SIGNIFICANT BIT (LSB)</span>
            </div>
            
            <div className="flex items-center gap-3 bg-[#FAFAFA] p-2 border-2 border-[#09090B] w-full justify-center shadow-[2px_2px_0px_0px_#09090B]">
              <span className="font-mono text-xs text-[#52525B]">
                {currentX} mod 2 =
              </span>
              <motion.span
                animate={highlightBit ? { scale: [1, 1.3, 1] } : {}}
                className="font-mono text-lg font-extrabold px-3 py-0.5 bg-[#09090B] text-white border border-[#09090B]"
              >
                {lastBit}
              </motion.span>
            </div>
          </motion.div>
        )}

      </div>

      {/* Recurrence Feedback Loop Indicator */}
      <div className="mt-6 pt-3 border-t border-[#09090B] text-center text-xs font-mono text-[#52525B]">
        ↺ RECURSIVE FEEDBACK: Each generated state x<sub>i</sub> becomes the input for x<sub>i+1</sub>
      </div>
    </div>
  );
}

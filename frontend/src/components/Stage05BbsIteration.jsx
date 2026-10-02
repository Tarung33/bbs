import React, { useState } from 'react';
import { RefreshCw, Play, ArrowRight } from 'lucide-react';
import ExplanationPanel from './ExplanationPanel';

export default function Stage05BbsIteration({ bbsData }) {
  const n = bbsData?.params?.n || 192649;
  const seed = bbsData?.params?.seed || 10135;
  const initialX0 = bbsData?.params?.x0 || ((seed * seed) % n);

  // If backend steps exist, use them; otherwise generate on the fly
  const backendSteps = bbsData?.steps && bbsData.steps.length > 0 ? bbsData.steps : null;

  // Local iteration state
  const [iterIndex, setIterIndex] = useState(0);

  // Fallback step calculation logic if backend steps are partial
  const getStepAt = (index) => {
    if (backendSteps && backendSteps[index]) {
      return backendSteps[index];
    }

    // Compute step manually for demo/manual navigation
    let currentX = initialX0;
    let prevX = initialX0;
    let bit = 0;

    for (let k = 0; k <= index; k++) {
      prevX = currentX;
      currentX = (currentX * currentX) % n;
      bit = currentX % 2;
    }

    return {
      step_index: index + 1,
      prev_x: prevX,
      current_x: currentX,
      output_bit: bit,
      formula: `x_${index + 1} = (${prevX}²) mod ${n} = ${currentX}`
    };
  };

  const currentStep = getStepAt(iterIndex);

  // Accumulated bits up to iterIndex
  const accumulatedBits = [];
  for (let k = 0; k <= iterIndex; k++) {
    accumulatedBits.push(getStepAt(k).output_bit);
  }

  const handleNextIteration = () => {
    if (iterIndex < 20) {
      setIterIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIterIndex(0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      
      {/* Step Header */}
      <div className="border-b border-[#09090B] pb-3 flex flex-wrap justify-between items-end gap-2">
        <div>
          <span className="text-xs text-[#52525B] font-bold uppercase tracking-widest block">
            STEP 05 / 14 — STEP-BY-STEP MODULAR SQUARING
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] mt-1 font-sans">
            BBS STATE ITERATION (x_{currentStep.step_index})
          </h2>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-[#FAFAFA] hover:bg-[#F4F4F5] border border-[#09090B] text-xs font-bold text-[#09090B] flex items-center space-x-1 cursor-pointer"
            title="Reset to Iteration 1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
          
          <button
            onClick={handleNextIteration}
            className="px-5 py-2 bg-[#09090B] hover:bg-[#27272A] text-white text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>GENERATE NEXT ITERATION →</span>
          </button>
        </div>
      </div>

      {/* SINGLE VERTICAL BBS STATE CARD */}
      <div className="border-2 border-[#09090B] bg-white p-6 space-y-6 shadow-md text-center max-w-2xl mx-auto">
        
        <div className="flex justify-between items-center text-xs border-b border-[#E4E4E7] pb-3 text-[#52525B] font-bold">
          <span>CURRENT BBS STATE</span>
          <span className="text-[#09090B]">ITERATION i = {currentStep.step_index}</span>
        </div>

        {/* Previous State */}
        <div>
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            PREVIOUS STATE (x_{currentStep.step_index - 1})
          </span>
          <div className="text-xl md:text-2xl font-bold text-[#52525B]">
            x_{currentStep.step_index - 1} = {currentStep.prev_x}
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Squaring Equation */}
        <div className="p-3 bg-[#FAFAFA] border border-[#09090B] space-y-1">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase">
            MODULAR SQUARING EQUATION
          </span>
          <div className="text-base md:text-lg font-bold text-[#09090B]">
            x_{currentStep.step_index} = x_{currentStep.step_index - 1}² mod n
          </div>
          <div className="text-xs text-[#52525B]">
            x_{currentStep.step_index} = ({currentStep.prev_x}²) mod {n}
          </div>
        </div>

        <div className="text-[#09090B] font-bold text-lg">↓</div>

        {/* Resulting State */}
        <div>
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            NEW COMPUTED STATE (x_{currentStep.step_index})
          </span>
          <div className="text-3xl font-bold text-[#09090B]">
            x_{currentStep.step_index} = {currentStep.current_x}
          </div>
        </div>

        {/* Output Bit */}
        <div className="pt-4 border-t border-[#E4E4E7] flex flex-col items-center">
          <span className="text-[10px] text-[#52525B] font-bold block uppercase mb-1">
            OUTPUT BIT (b_{currentStep.step_index} = x_{currentStep.step_index} mod 2)
          </span>
          <div className="w-12 h-12 bg-[#09090B] text-white flex items-center justify-center font-bold text-xl rounded-none shadow-sm">
            {currentStep.output_bit}
          </div>
        </div>

      </div>

      {/* Accumulated Bits Progress Bar */}
      <div className="p-4 bg-white border border-[#09090B] space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-[#52525B]">
          <span>ACCUMULATED BITSTREAM PREVIEW ({accumulatedBits.length} BITS GENERATED)</span>
          <span className="text-[#09090B]">CLICK 'GENERATE NEXT ITERATION' FOR MORE</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {accumulatedBits.map((b, idx) => (
            <div
              key={idx}
              className={`w-7 h-7 flex items-center justify-center border font-bold text-xs ${
                idx === accumulatedBits.length - 1
                  ? 'bg-[#09090B] text-white border-[#09090B]'
                  : 'bg-[#FAFAFA] text-[#09090B] border-[#E4E4E7]'
              }`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="Each iteration squares the previous state modulo n to calculate a new pseudorandom state and extracts the least significant bit (LSB)."
        why="Repeated modular squaring generates unpredictable bits. Without knowing the prime factors p and q, predicting previous or future bits is as hard as factoring n."
        technical={`Formula: xᵢ = xᵢ₋₁² mod n\nCurrent Iteration: i = ${currentStep.step_index}\nComputation: ${currentStep.prev_x}² mod ${n} = ${currentStep.current_x}\nExtracted Bit: bᵢ = ${currentStep.current_x} mod 2 = ${currentStep.output_bit}`}
      />

    </div>
  );
}

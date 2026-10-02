import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw, HelpCircle, Table as TableIcon } from 'lucide-react';

import Screen01Message from './Screen01Message';
import Screen02WhyRandomness from './Screen02WhyRandomness';
import Screen03BbsMachineIntro from './Screen03BbsMachineIntro';
import Screen04TeachPrimes from './Screen04TeachPrimes';
import Screen05BuildModulus from './Screen05BuildModulus';
import Screen06ChooseSeed from './Screen06ChooseSeed';
import Screen07Iteration1 from './Screen07Iteration1';
import Screen08Iteration2 from './Stage08Iteration2';
import Screen09Iteration3 from './Stage09Iteration3';
import Screen10ShowPattern from './Stage10ShowPattern';
import Screen11KeyGenerator from './Stage11KeyGenerator';
import Screen12Encryption from './Stage12Encryption';
import Screen13Network from './Stage13Network';
import Screen14Attack from './Stage14Attack';
import Screen15Receiver from './Stage15Receiver';
import Screen16FinalReveal from './Stage16FinalReveal';

import WhySidePanel from './WhySidePanel';
import JourneyMapArchitectureModal from './JourneyMapArchitectureModal';
import SequenceTableModal from './SequenceTableModal';

const STEP_TITLES = [
  'MESSAGE', 'RANDOM', 'BBS MACHINE', 'PRIMES', 'MODULUS', 'SEED',
  'ITERATION 1', 'ITERATION 2', 'ITERATION 3', 'BITS PATTERN', 'KEY GEN',
  'ENCRYPTION', 'NETWORK', 'ATTACK', 'RECEIVER', 'REVEAL'
];

export default function CryptoStoryContainer({
  storyStep,
  setStoryStep,
  message,
  setMessage,
  onStartPipeline,
  numberMode,
  setNumberMode,
  pipelineState,
  bbsData,
  keyData,
  encryptionData,
  networkData,
  attackData,
  decryptionData,
  isSequenceModalOpen,
  setIsSequenceModalOpen
}) {
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isJourneyMapOpen, setIsJourneyMapOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // Auto Play Mode (Optional auto step progression every 7 seconds)
  useEffect(() => {
    if (autoPlay && storyStep > 0 && storyStep < 16) {
      const timer = setTimeout(() => {
        setStoryStep((prev) => prev + 1);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, storyStep, setStoryStep]);

  const handleNext = () => {
    if (storyStep < 16) {
      setStoryStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (storyStep > 1) {
      setStoryStep((prev) => prev - 1);
    }
  };

  const isThreat = storyStep === 14;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Step Counter Header & Micro Breadcrumbs */}
      <div className="w-full bg-white border border-[#111111] p-3 font-mono text-xs flex flex-wrap justify-between items-center gap-2 shadow-2xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#111111] bg-[#F7F7F5] border border-[#111111] px-2 py-0.5">
            STEP {String(storyStep).padStart(2, '0')} / 16
          </span>
          <span className="font-bold text-[#111111] hidden sm:inline">
            {STEP_TITLES[storyStep - 1] || 'JOURNEY'}
          </span>
        </div>

        {/* Quick Node Navigation Dots */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
          {Array.from({ length: 16 }, (_, i) => i + 1).map((stepNum) => (
            <button
              key={stepNum}
              onClick={() => setStoryStep(stepNum)}
              className={`w-5 h-5 rounded-none font-bold text-[9px] flex items-center justify-center border cursor-pointer transition-colors ${
                stepNum === storyStep
                  ? stepNum === 14
                    ? 'bg-[#E53935] text-white border-[#E53935]'
                    : 'bg-[#111111] text-white border-[#111111]'
                  : stepNum < storyStep
                  ? 'bg-[#F7F7F5] text-[#111111] border-[#111111]'
                  : 'bg-white text-[#555555] border-[#E4E4E7] hover:border-[#111111]'
              }`}
              title={`Jump to Screen ${stepNum}: ${STEP_TITLES[stepNum - 1]}`}
            >
              {stepNum}
            </button>
          ))}
        </div>
      </div>

      {/* Main Experience Display */}
      <div className="bg-white border border-[#111111] p-4 md:p-8 min-h-[460px] relative shadow-sm">
        {storyStep === 1 && <Screen01Message message={message} setMessage={setMessage} />}
        {storyStep === 2 && <Screen02WhyRandomness message={message} />}
        {storyStep === 3 && <Screen03BbsMachineIntro />}
        {storyStep === 4 && <Screen04TeachPrimes numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 5 && <Screen05BuildModulus numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 6 && <Screen06ChooseSeed numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 7 && <Screen07Iteration1 numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 8 && <Screen08Iteration2 numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 9 && <Screen09Iteration3 numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 10 && <Screen10ShowPattern numberMode={numberMode} bbsData={bbsData} />}
        {storyStep === 11 && <Screen11KeyGenerator keyData={keyData} />}
        {storyStep === 12 && <Screen12Encryption message={message} encryptionData={encryptionData} keyData={keyData} />}
        {storyStep === 13 && <Screen13Network encryptionData={encryptionData} networkData={networkData} />}
        {storyStep === 14 && <Screen14Attack encryptionData={encryptionData} />}
        {storyStep === 15 && <Screen15Receiver message={message} decryptionData={decryptionData} encryptionData={encryptionData} />}
        {storyStep === 16 && <Screen16FinalReveal message={message} onRestart={() => setStoryStep(1)} />}
      </div>

      {/* Bottom Sticky Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#111111] font-mono text-xs shadow-sm">
        
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrev}
            disabled={storyStep === 1}
            className={`px-4 py-2 border text-[#111111] font-bold flex items-center space-x-1 transition-colors ${
              storyStep === 1
                ? 'bg-[#F7F7F5] border-[#E4E4E7] text-[#555555] cursor-not-allowed'
                : 'bg-[#F7F7F5] hover:bg-[#E4E4E7] border-[#111111] cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← BACK</span>
          </button>

          {storyStep < 16 ? (
            <button
              onClick={handleNext}
              className={`px-6 py-2 text-white font-bold flex items-center space-x-1.5 cursor-pointer shadow-sm transition-colors ${
                isThreat ? 'bg-[#E53935] hover:bg-[#C62828]' : 'bg-[#111111] hover:bg-[#333333]'
              }`}
            >
              <span>NEXT →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setStoryStep(1)}
              className="px-5 py-2 bg-[#111111] hover:bg-[#333333] text-white font-bold flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART JOURNEY</span>
            </button>
          )}

          {/* Auto Play Toggle */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-3 py-2 border text-xs font-bold flex items-center space-x-1.5 cursor-pointer ${
              autoPlay
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-[#F7F7F5] text-[#111111] border-[#111111] hover:bg-[#E4E4E7]'
            }`}
            title="Toggle optional automatic 7-second progression"
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoPlay ? 'AUTO PLAYING' : 'AUTO PLAY'}</span>
          </button>
        </div>

        {/* Auxiliary Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSequenceModalOpen(true)}
            className="px-3.5 py-2 bg-[#F7F7F5] hover:bg-[#E4E4E7] border border-[#111111] text-[#111111] font-bold flex items-center space-x-1.5 cursor-pointer"
            title="View full sequence table reference"
          >
            <TableIcon className="w-4 h-4" />
            <span className="hidden sm:inline">TABLE</span>
          </button>

          <button
            onClick={() => setIsWhyOpen(true)}
            className="px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white font-bold flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-white" />
            <span>WHY?</span>
          </button>
        </div>

      </div>

      {/* WHY Side Panel */}
      <WhySidePanel
        isOpen={isWhyOpen}
        onClose={() => setIsWhyOpen(false)}
        currentStage={storyStep}
      />

      {/* Journey Map Modal */}
      <JourneyMapArchitectureModal
        isOpen={isJourneyMapOpen}
        onClose={() => setIsJourneyMapOpen(false)}
        setStage={setStoryStep}
      />

      {/* Sequence Table Modal */}
      <SequenceTableModal
        isOpen={isSequenceModalOpen}
        onClose={() => setIsSequenceModalOpen(false)}
        bbsData={bbsData}
        numberMode={numberMode}
      />

    </div>
  );
}

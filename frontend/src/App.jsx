import React, { useState, useEffect } from 'react';
import EditorialNavbar from './components/EditorialNavbar';
import Stage1ChoosePrimes from './components/Stage1ChoosePrimes';
import Stage2BuildModulus from './components/Stage2BuildModulus';
import Stage3ChooseSeed from './components/Stage3ChooseSeed';
import Stage4CreateX0 from './components/Stage4CreateX0';
import Stage5WatchBbsGenerate from './components/Stage5WatchBbsGenerate';
import Stage6ExtractBit from './components/Stage6ExtractBit';
import Stage7MessageAndSecurity from './components/Stage7MessageAndSecurity';
import Stage8ExperimentComplete from './components/Stage8ExperimentComplete';
import SequenceTableModal from './components/SequenceTableModal';

export default function App() {
  const [mode, setMode] = useState('DEMO'); // 'DEMO' | 'NOTES'
  const [currentStep, setCurrentStep] = useState(1);

  // Core BBS Parameters
  const [p, setP] = useState(7);
  const [q, setQ] = useState(11);
  const [n, setN] = useState(77);
  const [seed, setSeed] = useState(3);
  const [x0, setX0] = useState(9);
  const [message, setMessage] = useState('Hello AIT');

  // Generator State
  const [generatedSteps, setGeneratedSteps] = useState([]);
  const [bitstream, setBitstream] = useState([]);

  // Modal State
  const [isSequenceModalOpen, setIsSequenceModalOpen] = useState(false);

  // Sync mode changes (DEMO vs NOTES)
  useEffect(() => {
    if (mode === 'DEMO') {
      setP(7);
      setQ(11);
      setN(77);
      setSeed(3);
      setX0((3 * 3) % 77); // 9
      setGeneratedSteps([]);
      setBitstream([]);
      setCurrentStep(1);
    } else if (mode === 'NOTES') {
      const pNotes = 383;
      const qNotes = 503;
      const nNotes = pNotes * qNotes; // 192649
      const sNotes = 10135;
      const x0Notes = (sNotes * sNotes) % nNotes; // 36308
      setP(pNotes);
      setQ(qNotes);
      setN(nNotes);
      setSeed(sNotes);
      setX0(x0Notes);
      setGeneratedSteps([]);
      setBitstream([]);
      setCurrentStep(1);
    }
  }, [mode]);

  // Handle Primes Validation (Step 1 -> Step 2)
  const handlePrimesValidated = (newP, newQ) => {
    setP(newP);
    setQ(newQ);
    const calculatedN = newP * newQ;
    setN(calculatedN);
    // Recalculate seed default if seed exceeds n
    if (seed >= calculatedN) {
      setSeed(3);
    }
  };

  // Handle Seed Validation (Step 3 -> Step 4)
  const handleSeedValidated = (newSeed) => {
    setSeed(newSeed);
    const calculatedX0 = (newSeed * newSeed) % n;
    setX0(calculatedX0);
  };

  // Handle Restart
  const handleReset = () => {
    setGeneratedSteps([]);
    setBitstream([]);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#09090B] flex flex-col font-sans selection:bg-[#09090B] selection:text-white relative overflow-x-hidden">
      
      {/* Editorial Navbar */}
      <EditorialNavbar
        currentStep={currentStep}
        mode={mode}
        setMode={setMode}
        onReset={handleReset}
        onOpenSequenceModal={() => setIsSequenceModalOpen(true)}
        setStep={setCurrentStep}
      />

      {/* Main Laboratory Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 relative z-10">
        
        {currentStep === 1 && (
          <Stage1ChoosePrimes
            p={p}
            setP={setP}
            q={q}
            setQ={setQ}
            onValidatedSuccess={handlePrimesValidated}
            onNext={() => setCurrentStep(2)}
            mode={mode}
            setMode={setMode}
          />
        )}

        {currentStep === 2 && (
          <Stage2BuildModulus
            p={p}
            q={q}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Stage3ChooseSeed
            seed={seed}
            setSeed={setSeed}
            n={n}
            onValidatedSuccess={handleSeedValidated}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Stage4CreateX0
            seed={seed}
            n={n}
            x0={x0}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <Stage5WatchBbsGenerate
            x0={x0}
            n={n}
            onStateGenerated={(x1) => {
              // Store step 1 state
            }}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && (
          <Stage6ExtractBit
            p={p}
            q={q}
            n={n}
            seed={seed}
            x0={x0}
            generatedSteps={generatedSteps}
            setGeneratedSteps={setGeneratedSteps}
            bitstream={bitstream}
            setBitstream={setBitstream}
            onNext={() => setCurrentStep(7)}
            onBack={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 7 && (
          <Stage7MessageAndSecurity
            message={message}
            setMessage={setMessage}
            bitstream={bitstream}
            n={n}
            p={p}
            q={q}
            onFinish={() => setCurrentStep(8)}
            onBack={() => setCurrentStep(6)}
          />
        )}

        {currentStep === 8 && (
          <Stage8ExperimentComplete
            p={p}
            q={q}
            n={n}
            seed={seed}
            x0={x0}
            bitstream={bitstream}
            message={message}
            generatedSteps={generatedSteps}
            onReset={handleReset}
            onOpenSequenceModal={() => setIsSequenceModalOpen(true)}
          />
        )}

      </main>

      {/* Technical Sequence Modal */}
      <SequenceTableModal
        isOpen={isSequenceModalOpen}
        onClose={() => setIsSequenceModalOpen(false)}
        p={p}
        q={q}
        n={n}
        seed={seed}
        x0={x0}
        generatedSteps={generatedSteps}
      />

      {/* Footer */}
      <footer className="border-t-2 border-[#09090B] py-6 bg-[#FAFAFA] text-center font-mono text-xs text-[#52525B]">
        BLUM BLUM SHUB • THE RANDOMNESS MACHINE • CNS / BCS703 VISUAL EXHIBITION
      </footer>

    </div>
  );
}

import React, { useState } from 'react';
import EditorialNavbar from './components/EditorialNavbar';
import CryptoStoryContainer from './components/CryptoStoryContainer';
import BackendActivityDrawer from './components/BackendActivityDrawer';
import JourneyMapArchitectureModal from './components/JourneyMapArchitectureModal';

import { useCryptoPipeline } from './hooks/useCryptoPipeline';

export default function App() {
  const [storyStep, setStoryStep] = useState(1); // 1 to 16 Screens
  const [message, setMessage] = useState('Meet me at 5 PM');
  const [numberMode, setNumberMode] = useState('EXPLAIN'); // EXPLAIN (p=7,q=11) vs REAL (production crypto)
  const [showBackendDrawer, setShowBackendDrawer] = useState(false);

  // Modals
  const [isJourneyMapOpen, setIsJourneyMapOpen] = useState(false);
  const [isSequenceModalOpen, setIsSequenceModalOpen] = useState(false);

  const {
    wsConnected,
    pipelineState,
    eventsLog,
    bbsData,
    keyData,
    encryptionData,
    networkData,
    attackData,
    decryptionData,
    errorDetails,
    startPipeline
  } = useCryptoPipeline();

  const handleStartPipeline = (config) => {
    startPipeline(config);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white relative overflow-x-hidden">
      
      {/* Editorial Navbar */}
      <EditorialNavbar
        currentStage={storyStep}
        setStage={setStoryStep}
        numberMode={numberMode}
        setNumberMode={setNumberMode}
        showBackendDrawer={showBackendDrawer}
        setShowBackendDrawer={setShowBackendDrawer}
        onOpenJourneyMap={() => setIsJourneyMapOpen(true)}
        onOpenSequenceModal={() => setIsSequenceModalOpen(true)}
      />

      {/* Main Scientific Exhibition View */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 relative z-10">
        
        {/* Error Alert Banner */}
        {errorDetails && (
          <div className="p-4 bg-[#FFEBEE] border-2 border-[#E53935] text-[#E53935] mb-6 font-mono text-xs font-bold">
            <div>⚠️ BACKEND PIPELINE NOTICE: {errorDetails.error || JSON.stringify(errorDetails.details)}</div>
          </div>
        )}

        {/* Physical Cryptographic Machine Container */}
        <CryptoStoryContainer
          storyStep={storyStep}
          setStoryStep={setStoryStep}
          message={message}
          setMessage={setMessage}
          onStartPipeline={handleStartPipeline}
          numberMode={numberMode}
          setNumberMode={setNumberMode}
          pipelineState={pipelineState}
          bbsData={bbsData}
          keyData={keyData}
          encryptionData={encryptionData}
          networkData={networkData}
          attackData={attackData}
          decryptionData={decryptionData}
          isSequenceModalOpen={isSequenceModalOpen}
          setIsSequenceModalOpen={setIsSequenceModalOpen}
        />

      </main>

      {/* Journey Map Architecture Modal */}
      <JourneyMapArchitectureModal
        isOpen={isJourneyMapOpen}
        onClose={() => setIsJourneyMapOpen(false)}
        setStage={setStoryStep}
      />

      {/* Backend Activity Collapsible Log Drawer */}
      <BackendActivityDrawer
        eventsLog={eventsLog}
        showBackendDrawer={showBackendDrawer}
        setShowBackendDrawer={setShowBackendDrawer}
      />

      {/* Scientific Exhibition Footer */}
      <footer className="border-t border-[#111111] py-6 text-center text-xs text-[#555555] font-mono">
        CRYPTOVISOR • SEE ENCRYPTION. UNDERSTAND SECURITY.
      </footer>

    </div>
  );
}

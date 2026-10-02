import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code } from 'lucide-react';

export default function TechnicalDetailsDrawer({ currentStage, bbsData, keyData, encryptionData, networkData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto my-4 font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-4 bg-white hover:bg-[#FAFAFA] border border-[#09090B] text-[#09090B] font-bold flex items-center justify-between transition-colors cursor-pointer"
      >
        <span className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-[#09090B]" />
          <span>SHOW TECHNICAL DETAILS</span>
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-6 bg-[#FAFAFA] border-x border-b border-[#09090B] space-y-4 animate-fadeIn text-[#09090B]">
          
          <div className="font-bold text-xs uppercase border-b border-[#09090B] pb-2 text-[#52525B]">
            UNDERLYING BACKEND TECHNICAL DATA STREAM
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
            
            {/* BBS Parameters */}
            <div className="p-3 bg-white border border-[#09090B] space-y-1">
              <div className="font-bold text-[#09090B] border-b border-[#E4E4E7] pb-1">BBS GENERATOR</div>
              <div>p = <span className="font-bold">{bbsData.params?.p || '383'}</span></div>
              <div>q = <span className="font-bold">{bbsData.params?.q || '503'}</span></div>
              <div>n = p × q = <span className="font-bold">{bbsData.params?.n || '192649'}</span></div>
              <div>seed s = <span className="font-bold">{bbsData.params?.seed || '12345'}</span></div>
              <div>Initial x₀ = <span className="font-bold">{bbsData.params?.x0 || '13666'}</span></div>
            </div>

            {/* Encryption Parameters */}
            <div className="p-3 bg-white border border-[#09090B] space-y-1">
              <div className="font-bold text-[#09090B] border-b border-[#E4E4E7] pb-1">AES-256-GCM</div>
              <div>Algorithm = <span className="font-bold">AES-GCM</span></div>
              <div>Key Size = <span className="font-bold">{keyData.keySizeBits || 256} bits</span></div>
              <div>Nonce (96-bit) = <span className="font-bold break-all">{encryptionData.nonceHex?.slice(0, 16) || '74 19 37 16...'}</span></div>
              <div>Auth Tag (128-bit) = <span className="font-bold break-all">{encryptionData.authTagHex?.slice(0, 16) || 'A3 68 51 81...'}</span></div>
            </div>

            {/* Network Packet */}
            <div className="p-3 bg-white border border-[#09090B] space-y-1">
              <div className="font-bold text-[#09090B] border-b border-[#E4E4E7] pb-1">NETWORK PACKET</div>
              <div>Packet ID = <span className="font-bold">{networkData.packet?.packet_id || 'PKT-8A92'}</span></div>
              <div>Checksum = <span className="font-bold">{networkData.packet?.header?.checksum || '225287D0'}</span></div>
              <div>Source = <span className="font-bold">192.168.1.10</span></div>
              <div>Destination = <span className="font-bold">192.168.1.50</span></div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

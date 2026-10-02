import React from 'react';
import { X, Network, ArrowRight } from 'lucide-react';

const JOURNEY_NODES = [
  { id: 1, name: '01 / MESSAGE', desc: 'Original Plaintext Input ("Meet me at 5 PM")' },
  { id: 2, name: '02 / BBS RANDOMNESS', desc: 'Modular Squaring CSPRNG (xᵢ₊₁ = xᵢ² mod n)' },
  { id: 3, name: '03 / KEY DERIVATION', desc: 'Grouping BBS bits into 256-bit AES Key' },
  { id: 4, name: '04 / ENCRYPTION', desc: 'AES-256-GCM Authenticated Encryption' },
  { id: 5, name: '05 / TRANSMISSION', desc: 'Multi-hop Network Encrypted Tunnel' },
  { id: 6, name: '06 / INTERCEPTION', desc: 'Adversary Packet Intercept & Failed Recovery' },
  { id: 7, name: '07 / DECRYPTION & RECOVERY', desc: 'GCM Auth Tag Verification & Plaintext Restoration' }
];

export default function JourneyMapArchitectureModal({ isOpen, onClose, setStage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090B]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-[#09090B] shadow-2xl max-w-2xl w-full p-8 font-sans text-[#09090B]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#09090B] mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-[#09090B] text-white flex items-center justify-center font-heading font-black text-xs">
              JM
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-[#09090B] uppercase tracking-wider">
                MESSAGE JOURNEY MAP (ARCHITECTURE)
              </h3>
              <p className="text-xs text-[#52525B] font-mono">
                Click any stage node to jump directly to that point in the journey
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded hover:bg-[#F4F4F5] text-[#09090B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tree Journey Map */}
        <div className="space-y-3 font-mono text-xs">
          {JOURNEY_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => {
                setStage(node.id);
                onClose();
              }}
              className="w-full text-left p-3.5 bg-[#FAFAFA] hover:bg-white border border-[#09090B] flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div>
                <span className="font-bold text-[#09090B] text-sm block">{node.name}</span>
                <span className="text-[11px] text-[#52525B] font-sans">{node.desc}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#09090B] group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

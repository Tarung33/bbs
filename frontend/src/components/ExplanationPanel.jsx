import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code } from 'lucide-react';

export default function ExplanationPanel({ what, why, technical }) {
  const [showTech, setShowTech] = useState(false);

  return (
    <div className="mt-6 border border-[#09090B] bg-[#FAFAFA] p-4 text-xs font-mono space-y-3 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-bold text-[#09090B] block text-[10px] tracking-widest uppercase mb-1">
            [ WHAT? ]
          </span>
          <p className="text-[#27272A] leading-relaxed">{what}</p>
        </div>
        <div>
          <span className="font-bold text-[#09090B] block text-[10px] tracking-widest uppercase mb-1">
            [ WHY? ]
          </span>
          <p className="text-[#27272A] leading-relaxed">{why}</p>
        </div>
      </div>

      {technical && (
        <div className="border-t border-[#E4E4E7] pt-2">
          <button
            onClick={() => setShowTech(!showTech)}
            className="text-[10px] font-bold text-[#52525B] hover:text-[#09090B] flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <Code className="w-3 h-3 text-[#09090B]" />
            <span>{showTech ? '[-] HIDE TECHNICAL DETAILS' : '[+] SHOW TECHNICAL DETAILS'}</span>
            {showTech ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {showTech && (
            <div className="mt-2 p-3 bg-white border border-[#09090B] text-[#09090B] font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {technical}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

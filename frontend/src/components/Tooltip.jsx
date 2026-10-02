import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function Tooltip({ title, content, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="ml-1 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none"
        title="What is this?"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-slate-950 border border-cyan-500/50 shadow-2xl text-xs font-sans text-slate-200 glow-cyan animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-cyan-300 font-mono text-[11px] mb-1.5 pb-1 border-b border-slate-800">
            <span>ⓘ {title}</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="leading-relaxed text-[11px] text-slate-300">
            {content}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-950" />
        </div>
      )}
    </span>
  );
}

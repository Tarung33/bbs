import React from 'react';
import ExplanationPanel from './ExplanationPanel';

export default function Screen01Message({ message, setMessage }) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-12 text-center font-mono">
      
      {/* Step Counter */}
      <span className="text-xs text-[#555555] font-bold tracking-widest uppercase block">
        01 / 16 — THE STARTING POINT
      </span>

      {/* Large Typography Title */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] font-sans">
        YOUR MESSAGE
      </h1>

      {/* Input Box */}
      <div className="max-w-xl mx-auto border-2 border-[#111111] bg-white p-6 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider text-left">
          ENTER MESSAGE
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Meet me at 5 PM"
          className="w-full bg-[#F7F7F5] border border-[#111111] p-4 font-mono text-xl text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
        />
      </div>

      <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
        This message is readable. Let's see what happens when we protect it across a journey.
      </p>

      {/* Explanation Panel */}
      <ExplanationPanel
        what="This is your raw plaintext message before any cryptographic processing."
        why="Plaintext is vulnerable because anyone on a network path can read its unencrypted text."
        technical={`Raw Input: "${message}"\nEncoding: UTF-8 Binary Stream`}
      />

    </div>
  );
}

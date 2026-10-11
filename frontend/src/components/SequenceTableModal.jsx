import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Table, Download } from 'lucide-react';

export default function SequenceTableModal({
  isOpen,
  onClose,
  p,
  q,
  n,
  seed,
  x0,
  generatedSteps
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="editorial-card w-full max-w-4xl max-h-[85vh] flex flex-col bg-white shadow-[8px_8px_0px_0px_#09090B] relative overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-4 border-b-2 border-[#09090B] flex items-center justify-between bg-[#FAFAFA]">
            <div className="flex items-center gap-2">
              <Table size={18} className="text-[#09090B]" />
              <h3 className="font-heading font-extrabold text-base text-[#09090B] uppercase">
                BBS TECHNICAL SEQUENCE TABLE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 border border-[#09090B] hover:bg-[#09090B] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Metadata Sub-header */}
          <div className="p-4 border-b border-[#09090B] bg-white font-mono text-xs text-[#52525B] flex flex-wrap gap-4">
            <div>p = <strong className="text-[#09090B]">{p}</strong></div>
            <div>q = <strong className="text-[#09090B]">{q}</strong></div>
            <div>n = <strong className="text-[#09090B]">{n}</strong></div>
            <div>seed s = <strong className="text-[#09090B]">{seed}</strong></div>
            <div>x₀ = <strong className="text-[#09090B]">{x0}</strong></div>
          </div>

          {/* Table Content Container */}
          <div className="flex-1 overflow-y-auto p-4">
            {generatedSteps.length === 0 ? (
              <div className="py-12 text-center font-mono text-xs text-[#52525B]">
                No iterations generated yet. Move through the BBS machine steps to build the sequence!
              </div>
            ) : (
              <div className="border-2 border-[#09090B] overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#09090B] text-white uppercase text-[11px]">
                    <tr>
                      <th className="p-2.5 border-r border-[#27272A] w-16 text-center">i</th>
                      <th className="p-2.5 border-r border-[#27272A]">Prev x<sub>i-1</sub></th>
                      <th className="p-2.5 border-r border-[#27272A]">Recurrence Formula (x<sub>i-1</sub>)² mod n</th>
                      <th className="p-2.5 border-r border-[#27272A]">State x<sub>i</sub></th>
                      <th className="p-2.5 text-center w-24">Bit B<sub>i</sub> (LSB)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E7]">
                    
                    {/* Step 0 Row */}
                    <tr className="bg-[#FAFAFA] font-bold">
                      <td className="p-2.5 border-r border-[#E4E4E7] text-center">0</td>
                      <td className="p-2.5 border-r border-[#E4E4E7]">s = {seed}</td>
                      <td className="p-2.5 border-r border-[#E4E4E7]">x₀ = s² mod n</td>
                      <td className="p-2.5 border-r border-[#E4E4E7]">{x0}</td>
                      <td className="p-2.5 text-center text-[#52525B]">-</td>
                    </tr>

                    {/* Generated Steps */}
                    {generatedSteps.map((st) => (
                      <tr key={st.step} className="hover:bg-[#F4F4F5] transition-colors">
                        <td className="p-2.5 border-r border-[#E4E4E7] text-center font-extrabold">{st.step}</td>
                        <td className="p-2.5 border-r border-[#E4E4E7]">{st.previous_x}</td>
                        <td className="p-2.5 border-r border-[#E4E4E7] text-[#52525B]">{st.operation}</td>
                        <td className="p-2.5 border-r border-[#E4E4E7] font-bold text-[#09090B]">{st.current_x}</td>
                        <td className="p-2.5 text-center">
                          <span className="inline-block px-2 py-0.5 border border-[#09090B] bg-[#09090B] text-white font-extrabold">
                            {st.bit}
                          </span>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t-2 border-[#09090B] bg-[#FAFAFA] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-xs hover:bg-[#27272A]"
            >
              CLOSE WINDOW
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}

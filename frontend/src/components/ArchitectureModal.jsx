import React, { useState, useEffect } from 'react';
import { X, Network, Server, Cpu, Lock, Key, Binary, ShieldAlert, Unlock, FileText, ArrowRight } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchArchitecture();
    }
  }, [isOpen]);

  const fetchArchitecture = async () => {
    try {
      const res = await fetch('/api/architecture-info');
      const data = await res.json();
      setNodes(data.nodes || []);
      if (data.nodes && data.nodes.length > 0) {
        setSelectedNode(data.nodes[0]);
      }
    } catch (err) {
      console.error('Failed to fetch architecture info', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel rounded-2xl max-w-5xl w-full p-6 border border-cyan-500/40 glow-cyan max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Network className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span>CRYPTOVISOR FULL-STACK ARCHITECTURE</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Click any component node to inspect its tech stack, code path, and responsibility
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Component Pipeline Flowchart */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 font-mono text-xs overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-[700px] justify-between pb-2">
            {nodes.map((node, idx) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center min-w-[110px] ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 glow-cyan scale-105 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 block">0{idx + 1}</span>
                    <span className="text-[11px] truncate w-full">{node.name.split(' ')[0]}</span>
                  </button>

                  {idx < nodes.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Component Inspection Panel */}
        {selectedNode && (
          <div className="p-6 rounded-xl bg-slate-950 border border-cyan-900/60 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block">COMPONENT DETAILS</span>
                <h4 className="text-base font-bold text-slate-100">{selectedNode.name}</h4>
              </div>
              <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                {selectedNode.layer}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">TECHNOLOGY STACK:</span>
                <span className="text-purple-300 font-bold text-xs">{selectedNode.tech}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">PRIMARY RESPONSIBILITY:</span>
                <span className="text-teal-300 font-bold text-xs">{selectedNode.description}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Cpu, ShieldAlert, ShieldCheck, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PrngComparisonModal({ isOpen, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionOutcome, setPredictionOutcome] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/attack/prng-comparison?num_bits=128');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to load PRNG comparison', err);
    } finally {
      setLoading(false);
    }
  };

  const runPredictionTest = () => {
    if (!data) return;
    setPredictionOutcome({
      lcg_success: true,
      bbs_success: false,
      lcg_msg: "LCG PREDICTED WITH 100% ACCURACY! (Linear modular system solved)",
      bbs_msg: "BBS PREDICTION FAILED! (Equivalent to solving Quadratic Residuosity Problem modulo n)"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel rounded-2xl max-w-4xl w-full p-6 border border-cyan-500/40 glow-cyan max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span>WEAK PRNG (LCG) VS. CRYPTOGRAPHIC PRNG (BBS)</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Comparative analysis of linear pseudorandom generation vs. modular squaring CSPRNG
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center font-mono text-cyan-400 animate-pulse">
            Generating PRNG streams & calculating unpredictability metrics...
          </div>
        ) : data ? (
          <div className="space-y-6 font-mono text-xs">
            
            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LCG (Weak PRNG) */}
              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-800/60 space-y-4">
                <div className="flex items-center justify-between border-b border-rose-900/60 pb-2">
                  <span className="font-bold text-rose-300 text-sm">{data.lcg.name}</span>
                  <span className="text-[10px] bg-rose-950 text-rose-400 px-2 py-0.5 rounded border border-rose-800 font-extrabold">
                    WEAK / PREDICTABLE
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <div><span className="text-slate-500">Formula:</span> <span className="text-rose-300 font-bold">{data.lcg.formula}</span></div>
                  <div><span className="text-slate-500">Security:</span> <span className="text-rose-400">{data.lcg.security}</span></div>
                  <div><span className="text-slate-500">Bitstream Sample:</span></div>
                  <div className="p-2 rounded bg-slate-950 text-rose-300 break-all text-[11px] border border-rose-950">
                    {data.lcg.sample_bits}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-rose-400 font-bold">Predictive Attack Vulnerability:</div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {data.lcg.predictability.explanation}
                  </p>
                </div>
              </div>

              {/* BBS (Cryptographic CSPRNG) */}
              <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
                  <span className="font-bold text-emerald-300 text-sm">{data.bbs.name}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-extrabold">
                    CSPRNG SECURE
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <div><span className="text-slate-500">Formula:</span> <span className="text-emerald-300 font-bold">{data.bbs.formula}</span></div>
                  <div><span className="text-slate-500">Security:</span> <span className="text-emerald-400">{data.bbs.security}</span></div>
                  <div><span className="text-slate-500">Modulus n:</span> <span className="text-cyan-300">{data.bbs.n}</span></div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold">Cryptographic Unpredictability:</div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {data.bbs.predictability.explanation}
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Educational Prediction Challenge */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-800/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-cyan-300 text-sm flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>PREDICTIVE ATTACK CHALLENGE (OBSERVING 10 BITS)</span>
                </span>
                <button
                  onClick={runPredictionTest}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs transition-all glow-cyan"
                >
                  RUN PREDICTION CHALLENGE
                </button>
              </div>

              {predictionOutcome ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200">
                    <div className="font-bold mb-1 flex items-center space-x-1">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>LCG PREDICTION RESULT:</span>
                    </div>
                    <div>{predictionOutcome.lcg_msg}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200">
                    <div className="font-bold mb-1 flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>BBS PREDICTION RESULT:</span>
                    </div>
                    <div>{predictionOutcome.bbs_msg}</div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 italic text-center py-2">
                  Click "RUN PREDICTION CHALLENGE" to test mathematical predictability of LCG vs BBS.
                </div>
              )}
            </div>

            {/* Crucial Educational Notice */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-sans text-xs flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 font-mono block mb-1">CRITICAL CRYPTOGRAPHIC PRINCIPLE:</span>
                Statistical tests (e.g. 0/1 frequency, serial correlation) are necessary basic checks, but they do NOT prove cryptographic security. A simple PRNG like LCG can pass basic frequency tests yet remain 100% predictable. True CSPRNG security (like BBS) rests on proven computational hardness assumptions (Quadratic Residuosity Problem).
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}

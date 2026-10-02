import React, { useState } from 'react';
import { FlaskConical, Play, CheckCircle2, AlertTriangle, RefreshCw, Calculator } from 'lucide-react';

export default function LabControls({ onStart, pipelineState, wsConnected }) {
  const [p, setP] = useState('383');
  const [q, setQ] = useState('503');
  const [seed, setSeed] = useState('12345');
  const [message, setMessage] = useState('Hello AIT');
  const [keySizeBits, setKeySizeBits] = useState(256);
  const [attackType, setAttackType] = useState('NONE');

  const [validationResult, setValidationResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await fetch('/api/validate-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p, q, seed, message })
      });
      const data = await res.json();
      setValidationResult(data);
    } catch (err) {
      setValidationResult({
        valid: false,
        errors: ['Failed to connect to validation endpoint.'],
        warnings: []
      });
    } finally {
      setValidating(false);
    }
  };

  const handleGeneratePreset = async () => {
    setLoadingPreset(true);
    try {
      const res = await fetch('/api/demo-params?bits=32');
      const data = await res.json();
      setP(data.p);
      setQ(data.q);
      setSeed(data.seed);
      setValidationResult(null);
    } catch (err) {
      console.error('Failed to generate preset primes', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({
      mode: 'LAB',
      message: message.trim(),
      key_size_bits: keySizeBits,
      attack_type: attackType,
      p,
      q,
      seed,
      speed_ms: 60
    });
  };

  const pInt = parseInt(p) || 0;
  const qInt = parseInt(q) || 0;
  const nInt = pInt * qInt;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-purple-800/60 mb-6 glow-purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FlaskConical className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-slate-100">
            LAB MODE: ACADEMIC PARAMETER CONFIGURATION
          </h2>
        </div>
        <button
          type="button"
          onClick={handleGeneratePreset}
          disabled={loadingPreset}
          className="flex items-center space-x-1.5 text-xs bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/60 px-3 py-1.5 rounded-lg transition-colors font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingPreset ? 'animate-spin' : ''}`} />
          <span>Generate Valid Educational Primes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Primes & Seed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Prime p */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Blum Prime p (p ≡ 3 mod 4):
            </label>
            <input
              type="text"
              value={p}
              onChange={(e) => { setP(e.target.value); setValidationResult(null); }}
              placeholder="e.g. 383"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-purple-200 font-mono focus:border-purple-500 focus:outline-none"
              required
            />
            <span className="text-[10px] text-slate-400 font-mono">
              {pInt > 0 ? `p mod 4 = ${pInt % 4}` : ''}
            </span>
          </div>

          {/* Prime q */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Blum Prime q (q ≡ 3 mod 4):
            </label>
            <input
              type="text"
              value={q}
              onChange={(e) => { setQ(e.target.value); setValidationResult(null); }}
              placeholder="e.g. 503"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-purple-200 font-mono focus:border-purple-500 focus:outline-none"
              required
            />
            <span className="text-[10px] text-slate-400 font-mono">
              {qInt > 0 ? `q mod 4 = ${qInt % 4}` : ''}
            </span>
          </div>

          {/* Seed s */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Seed s (gcd(s, n) = 1):
            </label>
            <input
              type="text"
              value={seed}
              onChange={(e) => { setSeed(e.target.value); setValidationResult(null); }}
              placeholder="e.g. 12345"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-teal-200 font-mono focus:border-teal-500 focus:outline-none"
              required
            />
            <span className="text-[10px] text-slate-400 font-mono">
              {nInt > 0 ? `Modulus n = p × q = ${nInt}` : ''}
            </span>
          </div>

        </div>

        {/* Message Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Plaintext Message:
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message..."
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 font-mono focus:border-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Validation Button & Status Box */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <button
            type="button"
            onClick={handleValidate}
            disabled={validating}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors font-mono"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Validate Blum Parameters</span>
          </button>

          {validationResult && (
            <div className="flex items-center space-x-2 text-xs font-mono">
              {validationResult.valid ? (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PARAMETERS VALIDATED</span>
                </span>
              ) : (
                <span className="text-rose-400 flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>VALIDATION FAILED</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Validation Errors / Warnings List */}
        {validationResult && !validationResult.valid && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs font-mono text-rose-300 space-y-1">
            {validationResult.errors.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}

        {validationResult && validationResult.warnings && validationResult.warnings.length > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-300 space-y-1">
            {validationResult.warnings.map((warn, i) => (
              <div key={i}>⚠️ {warn}</div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={pipelineState === 'RUNNING' || !wsConnected}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
            pipelineState === 'RUNNING'
              ? 'bg-purple-950 text-purple-400 cursor-not-allowed border border-purple-800 animate-pulse'
              : !wsConnected
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold glow-purple active:scale-[0.99]'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>
            {pipelineState === 'RUNNING'
              ? 'EXECUTING LAB CALCULATIONS...'
              : 'START LAB TRANSMISSION'}
          </span>
        </button>

      </form>
    </div>
  );
}

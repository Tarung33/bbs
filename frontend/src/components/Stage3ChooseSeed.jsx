import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Stage3ChooseSeed({
  seed,
  setSeed,
  n,
  onValidatedSuccess,
  onNext,
  onBack
}) {
  const [seedVal, setSeedVal] = useState(seed);
  const [hasChecked, setHasChecked] = useState(false);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    setSeedVal(seed);
    setHasChecked(false);
    setValidation(null);
  }, [seed]);

  // GCD utility
  const gcd = (a, b) => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  const handleCheckSeed = () => {
    const numSeed = parseInt(seedVal, 10);

    const checks = {
      validInt: !isNaN(numSeed) && numSeed > 1,
      gcdValue: 0,
      isCoprime: false,
      lessThanN: false,
      overallValid: false,
      errors: []
    };

    if (!checks.validInt) {
      checks.errors.push('Seed s must be a valid integer greater than 1.');
    } else {
      checks.gcdValue = gcd(numSeed, n);
      checks.isCoprime = checks.gcdValue === 1;
      checks.lessThanN = numSeed < n;

      if (!checks.isCoprime) {
        checks.errors.push(`gcd(s, n) = gcd(${numSeed}, ${n}) = ${checks.gcdValue} ≠ 1. Seed must be coprime to n.`);
      }
      if (numSeed <= 1 || numSeed >= n) {
        checks.errors.push(`Seed s must satisfy 1 < s < n (n = ${n}).`);
      }
    }

    checks.overallValid = checks.isCoprime && checks.lessThanN && checks.validInt;

    setValidation(checks);
    setHasChecked(true);

    if (checks.overallValid) {
      setSeed(numSeed);
      onValidatedSuccess(numSeed);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Title & Header */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 3 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          03 / CHOOSE THE STARTING POINT
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          The seed <strong className="text-[#09090B]">s</strong> initializes the generator sequence and must be relatively prime to modulus <strong className="text-[#09090B]">n = {n}</strong>.
        </p>
      </div>

      {/* Seed Input Box */}
      <div className="editorial-card p-6 shadow-[4px_4px_0px_0px_#09090B]">
        <label className="block font-mono text-xs font-bold text-[#52525B] uppercase mb-2">
          SEED VALUE (s)
        </label>
        <div className="flex items-center gap-3">
          <span className="font-heading font-extrabold text-2xl text-[#09090B]">s =</span>
          <input
            type="number"
            value={seedVal}
            onChange={(e) => {
              setSeedVal(e.target.value);
              setHasChecked(false);
            }}
            className="w-full font-mono text-2xl font-bold p-3 border-2 border-[#09090B] bg-[#FAFAFA] text-[#09090B] focus:bg-white focus:outline-none"
            placeholder="3"
          />
        </div>
        <div className="text-xs font-mono text-[#52525B] mt-2">
          Condition: <span className="font-bold text-[#09090B]">gcd(s, {n}) must equal 1</span>
        </div>
      </div>

      {/* Check Seed Button */}
      <div className="flex justify-start">
        <button
          onClick={handleCheckSeed}
          className="px-6 py-3 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-sm hover:bg-[#27272A] active:translate-y-0.5 shadow-[4px_4px_0px_0px_#09090B] transition-all"
        >
          CHECK SEED →
        </button>
      </div>

      {/* Validation Result Box */}
      {hasChecked && validation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 border-2 ${
            validation.overallValid ? 'editorial-card-green' : 'editorial-card-red'
          }`}
        >
          <div className="font-mono text-xs font-extrabold tracking-widest uppercase mb-3 flex items-center gap-2">
            {validation.overallValid ? (
              <>
                <Check size={16} className="text-[#16A34A]" />
                <span className="text-[#16A34A]">VALID SEED ✓</span>
              </>
            ) : (
              <>
                <AlertTriangle size={16} className="text-[#DC2626]" />
                <span className="text-[#DC2626]">INVALID SEED</span>
              </>
            )}
          </div>

          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className={validation.isCoprime ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.isCoprime ? '✓' : '✗'}
              </span>
              <span>
                gcd({seedVal}, {n}) = <strong>{validation.gcdValue}</strong> {validation.isCoprime ? '(= 1)' : '(≠ 1)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={validation.lessThanN ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.lessThanN ? '✓' : '✗'}
              </span>
              <span>
                1 &lt; {seedVal} &lt; {n}
              </span>
            </div>
          </div>

          {validation.errors.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#DC2626] text-xs font-mono text-[#DC2626]">
              {validation.errors.map((err, idx) => (
                <div key={idx}>• {err}</div>
              ))}
            </div>
          )}

          {validation.overallValid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 pt-3 border-t border-[#16A34A] flex justify-end"
            >
              <button
                onClick={onNext}
                className="px-6 py-2.5 bg-[#16A34A] text-white font-mono font-bold text-sm border-2 border-[#09090B] shadow-[3px_3px_0px_0px_#09090B] hover:bg-[#15803D] flex items-center gap-2"
              >
                <span>NEXT →</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E4E4E7]">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border-2 border-[#09090B] bg-white font-mono font-bold text-xs hover:bg-[#FAFAFA] shadow-[3px_3px_0px_0px_#09090B]"
        >
          ← BACK
        </button>
      </div>

    </div>
  );
}

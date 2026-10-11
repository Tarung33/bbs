import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export default function Stage1ChoosePrimes({
  p,
  setP,
  q,
  setQ,
  onValidatedSuccess,
  onNext,
  mode,
  setMode
}) {
  const [pVal, setPVal] = useState(p);
  const [qVal, setQVal] = useState(q);

  const [hasChecked, setHasChecked] = useState(false);
  const [validation, setValidation] = useState(null);

  // Sync state if props change from outside (e.g. preset button in nav)
  useEffect(() => {
    setPVal(p);
    setQVal(q);
    setHasChecked(false);
    setValidation(null);
  }, [p, q]);

  // Helper primality check
  const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const handleCheckPrimes = () => {
    const numP = parseInt(pVal, 10);
    const numQ = parseInt(qVal, 10);

    const checks = {
      pValidInt: !isNaN(numP) && numP > 1,
      qValidInt: !isNaN(numQ) && numQ > 1,
      pIsPrime: false,
      pMod4Is3: false,
      qIsPrime: false,
      qMod4Is3: false,
      distinct: false,
      overallValid: false,
      errors: []
    };

    if (!checks.pValidInt) {
      checks.errors.push('Parameter p must be a valid integer greater than 1.');
    } else {
      checks.pIsPrime = isPrime(numP);
      checks.pMod4Is3 = numP % 4 === 3;
      if (!checks.pIsPrime) checks.errors.push(`p = ${numP} is NOT a prime number.`);
      else if (!checks.pMod4Is3) checks.errors.push(`p = ${numP} is prime, but fails Blum condition (p mod 4 = ${numP % 4}, required 3).`);
    }

    if (!checks.qValidInt) {
      checks.errors.push('Parameter q must be a valid integer greater than 1.');
    } else {
      checks.qIsPrime = isPrime(numQ);
      checks.qMod4Is3 = numQ % 4 === 3;
      if (!checks.qIsPrime) checks.errors.push(`q = ${numQ} is NOT a prime number.`);
      else if (!checks.qMod4Is3) checks.errors.push(`q = ${numQ} is prime, but fails Blum condition (q mod 4 = ${numQ % 4}, required 3).`);
    }

    if (checks.pValidInt && checks.qValidInt) {
      checks.distinct = numP !== numQ;
      if (!checks.distinct) checks.errors.push('Primes p and q must be distinct (p ≠ q).');
    }

    checks.overallValid =
      checks.pIsPrime &&
      checks.pMod4Is3 &&
      checks.qIsPrime &&
      checks.qMod4Is3 &&
      checks.distinct;

    setValidation(checks);
    setHasChecked(true);

    if (checks.overallValid) {
      setP(numP);
      setQ(numQ);
      onValidatedSuccess(numP, numQ);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Title & Headline */}
      <div className="border-b-2 border-[#09090B] pb-4">
        <div className="font-mono text-xs text-[#52525B] font-bold uppercase tracking-widest">
          STEP 1 / 7
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-[#09090B] mt-1 tracking-tight">
          01 / CHOOSE THE PRIMES
        </h2>
        <p className="text-sm text-[#52525B] mt-2 font-mono">
          BBS requires two prime numbers that are congruent to 3 modulo 4:
          <span className="font-bold text-[#09090B] ml-1">p ≡ q ≡ 3 (mod 4)</span>
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center gap-3 bg-[#FAFAFA] p-3 border border-[#09090B]">
        <span className="text-xs font-mono font-bold text-[#52525B] uppercase">
          QUICK PRESETS:
        </span>
        <button
          onClick={() => {
            setMode('DEMO');
            setPVal(7);
            setQVal(11);
            setHasChecked(false);
          }}
          className="px-3 py-1 border border-[#09090B] text-xs font-mono font-bold bg-white hover:bg-[#09090B] hover:text-white transition-colors"
        >
          DEMO MODE (p = 7, q = 11)
        </button>
        <button
          onClick={() => {
            setMode('NOTES');
            setPVal(383);
            setQVal(503);
            setHasChecked(false);
          }}
          className="px-3 py-1 border border-[#09090B] text-xs font-mono font-bold bg-white hover:bg-[#09090B] hover:text-white transition-colors"
        >
          NOTES EXAMPLE (p = 383, q = 503)
        </button>
      </div>

      {/* Prime Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input p */}
        <div className="border-2 border-[#09090B] p-5 bg-white shadow-[4px_4px_0px_0px_#09090B]">
          <label className="block font-mono text-xs font-bold text-[#52525B] uppercase mb-1">
            PRIME NUMBER p
          </label>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#09090B]">p =</span>
            <input
              type="number"
              value={pVal}
              onChange={(e) => {
                setPVal(e.target.value);
                setHasChecked(false);
              }}
              className="w-full font-mono text-2xl font-bold p-2 border-2 border-[#09090B] bg-[#FAFAFA] text-[#09090B] focus:bg-white focus:outline-none"
              placeholder="7"
            />
          </div>
          <div className="text-xs font-mono text-[#52525B] mt-2">
            Blum condition: <span className="font-bold text-[#09090B]">{pVal} mod 4 = {pVal ? (pVal % 4) : '?'}</span>
          </div>
        </div>

        {/* Input q */}
        <div className="border-2 border-[#09090B] p-5 bg-white shadow-[4px_4px_0px_0px_#09090B]">
          <label className="block font-mono text-xs font-bold text-[#52525B] uppercase mb-1">
            PRIME NUMBER q
          </label>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#09090B]">q =</span>
            <input
              type="number"
              value={qVal}
              onChange={(e) => {
                setQVal(e.target.value);
                setHasChecked(false);
              }}
              className="w-full font-mono text-2xl font-bold p-2 border-2 border-[#09090B] bg-[#FAFAFA] text-[#09090B] focus:bg-white focus:outline-none"
              placeholder="11"
            />
          </div>
          <div className="text-xs font-mono text-[#52525B] mt-2">
            Blum condition: <span className="font-bold text-[#09090B]">{qVal} mod 4 = {qVal ? (qVal % 4) : '?'}</span>
          </div>
        </div>

      </div>

      {/* Check Primes Action Button */}
      <div className="flex justify-start">
        <button
          onClick={handleCheckPrimes}
          className="px-6 py-3 border-2 border-[#09090B] bg-[#09090B] text-white font-mono font-bold text-sm hover:bg-[#27272A] active:translate-y-0.5 shadow-[4px_4px_0px_0px_#09090B] transition-all"
        >
          CHECK PRIMES →
        </button>
      </div>

      {/* Progressive Validation Feedback Card */}
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
                <span className="text-[#16A34A]">VALID BBS PARAMETERS</span>
              </>
            ) : (
              <>
                <AlertTriangle size={16} className="text-[#DC2626]" />
                <span className="text-[#DC2626]">INVALID BBS PARAMETERS</span>
              </>
            )}
          </div>

          {/* Detailed Verification Lines */}
          <div className="space-y-2 font-mono text-sm">
            
            {/* p checks */}
            <div className="flex items-center gap-2">
              <span className={validation.pIsPrime ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.pIsPrime ? '✓' : '✗'}
              </span>
              <span>
                p = <strong>{pVal}</strong> is prime
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={validation.pMod4Is3 ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.pMod4Is3 ? '✓' : '✗'}
              </span>
              <span>
                {pVal} ÷ 4 → remainder <strong>{pVal % 4}</strong> {validation.pMod4Is3 ? '(p ≡ 3 mod 4)' : '(Requires 3)'}
              </span>
            </div>

            {/* q checks */}
            <div className="flex items-center gap-2">
              <span className={validation.qIsPrime ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.qIsPrime ? '✓' : '✗'}
              </span>
              <span>
                q = <strong>{qVal}</strong> is prime
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={validation.qMod4Is3 ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.qMod4Is3 ? '✓' : '✗'}
              </span>
              <span>
                {qVal} ÷ 4 → remainder <strong>{qVal % 4}</strong> {validation.qMod4Is3 ? '(q ≡ 3 mod 4)' : '(Requires 3)'}
              </span>
            </div>

            {/* Distinct check */}
            <div className="flex items-center gap-2">
              <span className={validation.distinct ? 'text-[#16A34A] font-bold' : 'text-[#DC2626] font-bold'}>
                {validation.distinct ? '✓' : '✗'}
              </span>
              <span>
                p ≠ q ({pVal} ≠ {qVal})
              </span>
            </div>

          </div>

          {/* Error messages if any */}
          {validation.errors.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#DC2626] text-xs font-mono text-[#DC2626]">
              {validation.errors.map((err, idx) => (
                <div key={idx}>• {err}</div>
              ))}
            </div>
          )}

          {/* Next Stage Button */}
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

    </div>
  );
}

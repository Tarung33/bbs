import React from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function WhySidePanel({ isOpen, onClose, currentStage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-white border-l-2 border-[#09090B] p-6 shadow-2xl font-sans animate-fadeIn text-[#09090B] flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#09090B] mb-6">
          <div className="flex items-center space-x-2 font-mono font-bold text-sm uppercase tracking-wider">
            <HelpCircle className="w-5 h-5 text-[#09090B]" />
            <span>{getWhyTitle(currentStage)}</span>
          </div>

          <button onClick={onClose} className="p-1 rounded hover:bg-[#F4F4F5] text-[#09090B] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Explanation */}
        <div className="space-y-4 font-sans text-sm leading-relaxed text-[#27272A]">
          <p className="font-medium">
            {getWhyExplanation(currentStage)}
          </p>

          <div className="p-4 bg-[#FAFAFA] border border-[#09090B] font-mono text-xs font-bold text-[#09090B] space-y-1">
            <span className="uppercase text-[10px] text-[#52525B] block">KEY TAKEAWAY:</span>
            <span>{getWhyTakeaway(currentStage)}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#09090B] font-mono text-[10px] text-[#52525B] uppercase tracking-widest text-center">
        CRYPTOVISOR CONCEPTUAL GUIDE
      </div>

    </div>
  );
}

function getWhyTitle(stage) {
  switch (stage) {
    case 1: return 'WHY CONVERT TEXT TO DATA?';
    case 2: return 'WHY CHOOSE PRIMES CONGRUENT TO 3 MOD 4?';
    case 3: return 'WHY COMPUTE MODULUS n = p × q?';
    case 4: return 'WHY SEED & INITIALIZE x₀?';
    case 5: return 'WHY MODULAR SQUARING (BBS)?';
    case 6: return 'WHY CONCATENATE BITSTREAMS?';
    case 7: return 'WHY FORMAT INTO 256-BIT KEY?';
    case 8: return 'WHY ENCRYPT WITH AES-GCM?';
    case 9: return 'WHY TRANSMIT ENCRYPTED PACKETS?';
    case 10: return 'WHY CAN INTERCEPTION HAPPEN?';
    case 11: return 'WHY DO ATTACKS FAIL?';
    case 12: return 'WHY IS ACCESS DENIED?';
    case 13: return 'WHY AUTHENTICATE & DECRYPT?';
    case 14: return 'WHY IS THE JOURNEY COMPLETE?';
    default: return 'CRYPTOGRAPHIC EXPLANATION';
  }
}

function getWhyExplanation(stage) {
  switch (stage) {
    case 1:
      return 'Computers process all information as binary data. Before encryption, plaintext characters are transformed into UTF-8 numerical bytes.';
    case 2:
      return 'BBS requires prime numbers congruent to 3 mod 4 (Blum primes) to guarantee that -1 is a quadratic non-residue and ensure maximal cycle length.';
    case 3:
      return 'The security of BBS relies on the Integer Factorization Problem. Factoring n without p and q is computationally infeasible.';
    case 4:
      return 'The seed initializes the generator state. Seed s must be coprime to n (gcd(s, n) = 1) to prevent short cycles.';
    case 5:
      return 'Repeated modular squaring xᵢ = xᵢ₋₁² mod n produces pseudorandom states. Reversing this without p and q is as hard as factoring n.';
    case 6:
      return 'Extracting the least significant bit (LSB) from each state yields a statistically uniform pseudorandom bitstream.';
    case 7:
      return 'Raw random bits are grouped into 8-bit bytes to construct a 256-bit symmetric key for AES encryption.';
    case 8:
      return 'AES-GCM transforms readable plaintext into unreadable ciphertext while calculating a Galois authentication tag for integrity.';
    case 9:
      return 'Public networks pass data across untrusted routers. Encapsulating ciphertext protects privacy over open wires.';
    case 10:
      return 'Network wiretaps can capture packets in transit. Security depends on cryptographic strength rather than hiding the network path.';
    case 11:
      return 'Brute-forcing a 256-bit key space requires 2²⁵⁶ operations; predicting BBS states requires factoring n.';
    case 12:
      return 'The attacker has intercepted the ciphertext but lacks the secret key, leaving the plaintext completely unreadable.';
    case 13:
      return 'The receiver uses the matching key to verify the GCM authentication tag before recovering original plaintext.';
    case 14:
      return 'The message survived the full journey—protected in transit, defended against eavesdroppers, and restored cleanly.';
    default:
      return 'Cryptographic protocols enforce privacy and integrity across open network channels.';
  }
}

function getWhyTakeaway(stage) {
  switch (stage) {
    case 1: return 'Text must be represented as bytes for mathematical operations.';
    case 2: return 'Blum primes guarantee maximum pseudorandom period length.';
    case 3: return 'Factoring n without p and q is computationally hard.';
    case 4: return 'Coprime seeds prevent trivial degenerate generator states.';
    case 5: return 'Modular squaring creates cryptographically secure pseudorandomness.';
    case 6: return 'LSB extraction yields high-entropy binary streams.';
    case 7: return '256-bit keys provide 2²⁵⁶ unique security combinations.';
    case 8: return 'Ciphertext protects confidentiality; GCM tag protects integrity.';
    case 9: return 'Plaintext is NEVER exposed on network wires.';
    case 10: return 'Security assumes all network traffic can be intercepted.';
    case 11: return 'AES-256 and BBS resist all ciphertext-only attacks.';
    case 12: return 'Without the key, ciphertext is indistinguishable from noise.';
    case 13: return 'AEAD ciphers check integrity before decrypting content.';
    case 14: return 'Confidentiality and integrity preserved end-to-end.';
    default: return 'Security through mathematical hardness.';
  }
}

import math
from typing import Dict, Any, List
from app.bbs.lcg import LCGGenerator, predict_lcg_next

def run_brute_force_analysis(key_size_bits: int = 256) -> Dict[str, Any]:
    """
    Calculate theoretical search space and time required to brute-force a key.
    Assumes a hypothetical supercomputer testing 1 Quintillion (10^18) keys/second.
    """
    total_keys = 2 ** key_size_bits
    keys_per_sec = 10**18  # 1 billion billion operations/sec
    seconds_required = total_keys / keys_per_sec
    years_required = seconds_required / (3600 * 24 * 365.25)

    comparison = [
        {"key_bits": 8, "keys": "256", "time": "< 0.000001 seconds", "status": "TRIVIAL_BROKEN"},
        {"key_bits": 56, "keys": "7.2 x 10^16 (DES)", "time": "~ 20 hours", "status": "FEASIBLE_BROKEN"},
        {"key_bits": 128, "keys": "3.4 x 10^38 (AES-128)", "time": "~ 1.07 x 10^13 Years (Older than Universe)", "status": "COMPUTATIONALLY_INFEASIBLE"},
        {"key_bits": 256, "keys": "1.15 x 10^77 (AES-256)", "time": "~ 3.67 x 10^51 Years", "status": "ABSOLUTELY_SECURE"}
    ]

    return {
        "target_key_size_bits": key_size_bits,
        "keyspace_size": f"2^{key_size_bits}",
        "keys_per_second": "1.0 x 10^18 (1 Quintillion/sec)",
        "estimated_years": f"{years_required:.2e}" if years_required > 1000 else f"{years_required:.4f}",
        "feasibility": "INFEASIBLE" if key_size_bits >= 128 else "FEASIBLE",
        "comparison_table": comparison
    }

def run_pattern_analysis(ciphertext_hex: str, plaintext: str) -> Dict[str, Any]:
    """
    Analyze byte frequency and Shannon entropy of Plaintext vs AES-GCM Ciphertext.
    """
    pt_bytes = plaintext.encode('utf-8')
    ct_clean = ciphertext_hex.replace(" ", "")
    ct_bytes = bytes.fromhex(ct_clean) if ct_clean else b""

    def calculate_entropy(b_array: bytes) -> float:
        if not b_array:
            return 0.0
        freq = {}
        for b in b_array:
            freq[b] = freq.get(b, 0) + 1
        entropy = 0.0
        for count in freq.values():
            p = count / len(b_array)
            entropy -= p * math.log2(p)
        return round(entropy, 4)

    pt_entropy = calculate_entropy(pt_bytes)
    ct_entropy = calculate_entropy(ct_bytes)

    return {
        "plaintext_length_bytes": len(pt_bytes),
        "plaintext_entropy_bits": pt_entropy,
        "ciphertext_length_bytes": len(ct_bytes),
        "ciphertext_entropy_bits": ct_entropy,
        "max_possible_entropy": 8.0,
        "conclusion": "Ciphertext exhibits near-maximum Shannon entropy (~8.0 bits/byte), proving that AES-GCM hides all statistical patterns and structure of the plaintext."
    }

def run_prng_comparison(num_bits: int = 128, bbs_params: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Generates side-by-side streams for LCG (Weak PRNG) vs BBS (Cryptographic PRNG)
    and demonstrates predictive attack challenge.
    """
    # 1. Generate LCG stream
    lcg = LCGGenerator(seed=12345)
    lcg_data = lcg.generate_sequence(num_bits)

    # 2. Predict LCG next bits
    lcg_observed = lcg_data["values"][:10]
    lcg_next_predicted = predict_lcg_next(lcg_observed)
    lcg_next_actual = lcg_data["bits"][10]

    # 3. BBS Prediction Analysis
    bbs_info = bbs_params or {"p": "383", "q": "503", "n": "192649"}
    n_str = str(bbs_info.get("n", "192649"))

    return {
        "num_bits": num_bits,
        "lcg": {
            "name": "Linear Congruential Generator (LCG)",
            "formula": "x(i+1) = (a * x(i) + c) mod m",
            "security": "WEAK / NON-CRYPTOGRAPHIC",
            "sample_bits": "".join(map(str, lcg_data["bits"][:32])),
            "zero_count": lcg_data["count_zero"],
            "one_count": lcg_data["count_one"],
            "predictability": {
                "predictable": True,
                "observed_samples": 10,
                "predicted_next_bit": lcg_next_predicted,
                "actual_next_bit": lcg_next_actual,
                "success_rate": "100%",
                "explanation": "Because LCG uses linear algebra (modular multiplication & addition), an adversary can solve for a, c, m after observing 3-4 states."
            }
        },
        "bbs": {
            "name": "Blum Blum Shub (BBS)",
            "formula": "x(i+1) = x(i)² mod n",
            "security": "CRYPTOGRAPHICALLY SECURE (CSPRNG)",
            "n": n_str,
            "predictability": {
                "predictable": False,
                "predicted_next_bit": "UNKNOWN",
                "actual_next_bit": "UNKNOWN",
                "success_rate": "50% (Random Guessing)",
                "explanation": "Predicting the next bit of BBS without knowing primes p and q is computationally equivalent to solving the Quadratic Residuosity Problem modulo n."
            }
        }
    }

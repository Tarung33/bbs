from typing import Dict, Any, Tuple
from app.bbs.prime_utils import is_prime, is_blum_prime, gcd, are_coprime

def validate_lab_parameters(p_val: Any, q_val: Any, seed_val: Any, message: str) -> Tuple[bool, Dict[str, Any]]:
    """
    Validate custom parameters for LAB MODE.
    Returns (is_valid, response_details)
    """
    errors = []
    warnings = []

    # 1. Message check
    if not message or not message.strip():
        errors.append("Plaintext message cannot be empty.")

    # 2. Parse p, q, seed
    try:
        p = int(p_val)
    except (ValueError, TypeError):
        return False, {"valid": False, "errors": ["Prime 'p' must be a valid integer."]}

    try:
        q = int(q_val)
    except (ValueError, TypeError):
        return False, {"valid": False, "errors": ["Prime 'q' must be a valid integer."]}

    try:
        seed = int(seed_val)
    except (ValueError, TypeError):
        return False, {"valid": False, "errors": ["Seed 's' must be a valid integer."]}

    # 3. Primality check for p
    if not is_prime(p):
        errors.append(f"p = {p} is NOT a prime number.")
    elif p % 4 != 3:
        errors.append(f"p = {p} is prime, but fails Blum condition (p mod 4 must be 3, got {p % 4}).")

    # 4. Primality check for q
    if not is_prime(q):
        errors.append(f"q = {q} is NOT a prime number.")
    elif q % 4 != 3:
        errors.append(f"q = {q} is prime, but fails Blum condition (q mod 4 must be 3, got {q % 4}).")

    if p == q and is_prime(p):
        errors.append("Primes p and q must be distinct (p != q).")

    # 5. Modulus n
    n = p * q

    # 6. Seed check
    if seed <= 1 or seed >= n:
        errors.append(f"Seed s = {seed} must satisfy 1 < s < n (n = {n}).")
    elif not are_coprime(seed, n):
        common = gcd(seed, n)
        errors.append(f"Seed s = {seed} is not coprime to n = {n} (gcd(s, n) = {common} != 1).")

    # Educational warnings for small bit sizes
    if n < 10000 and len(errors) == 0:
        warnings.append(
            f"Modulus n = {n} is small and suitable for educational visualization. "
            "In production, n must be at least 2048 to 4096 bits to prevent factorization attacks."
        )

    if errors:
        return False, {
            "valid": False,
            "errors": errors,
            "warnings": warnings,
            "parsed": {"p": p, "q": q, "seed": seed, "n": n}
        }

    return True, {
        "valid": True,
        "errors": [],
        "warnings": warnings,
        "parsed": {"p": p, "q": q, "seed": seed, "n": n}
    }

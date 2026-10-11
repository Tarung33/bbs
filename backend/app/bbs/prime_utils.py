import random
import sympy

def is_prime(n: int) -> bool:
    """Check if n is a prime number using sympy's Miller-Rabin / deterministic primality test."""
    if n <= 1:
        return False
    return sympy.isprime(n)

def is_blum_prime(p: int) -> bool:
    return is_prime(p) and (p % 4 == 3)

def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a

def are_coprime(a: int, b: int) -> bool:
    return gcd(a, b) == 1

def generate_blum_prime(bits: int = 512) -> int:
    """Generate a random prime p of size `bits` such that p ≡ 3 (mod 4)."""
    while True:
        # Generate random odd number of `bits` bit length
        candidate = random.getrandbits(bits)
        # Ensure correct bit length and odd
        candidate |= (1 << (bits - 1)) | 1
        # Force candidate ≡ 3 (mod 4)
        candidate = (candidate & ~3) | 3
        if is_prime(candidate):
            return candidate

def generate_seed(n: int) -> int:
    """Generate a random seed s such that 1 < s < n and gcd(s, n) == 1."""
    while True:
        # Generate random seed
        s = random.randint(2, n - 1)
        if are_coprime(s, n):
            return s

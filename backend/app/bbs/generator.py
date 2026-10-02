from typing import List, Dict, Any, Generator
from app.bbs.prime_utils import generate_blum_prime, generate_seed, is_blum_prime, are_coprime

class BBSGenerator:
    """
    Blum Blum Shub (BBS) Pseudorandom Bit Generator.
    Core Formula: x_{i+1} = (x_i)^2 mod n
    Modulus: n = p * q, where p ≡ 3 (mod 4) and q ≡ 3 (mod 4)
    """

    def __init__(self, p: int = None, q: int = None, seed: int = None, demo_bit_size: int = 512):
        if p is None or q is None:
            # Demo Mode: Generate valid Blum primes
            self.p = generate_blum_prime(demo_bit_size)
            self.q = generate_blum_prime(demo_bit_size)
            # Ensure p != q
            while self.p == self.q:
                self.q = generate_blum_prime(demo_bit_size)
        else:
            self.p = p
            self.q = q

        self.n = self.p * self.q

        if seed is None:
            self.seed = generate_seed(self.n)
        else:
            self.seed = seed

        # Initial seed calculation: x0 = seed^2 mod n
        self.x0 = pow(self.seed, 2, self.n)
        self.current_x = self.x0

    def get_parameters(self) -> Dict[str, Any]:
        """Return parameters metadata."""
        return {
            "p": str(self.p),
            "q": str(self.q),
            "n": str(self.n),
            "seed": str(self.seed),
            "x0": str(self.x0),
            "p_bits": self.p.bit_length(),
            "q_bits": self.q.bit_length(),
            "n_bits": self.n.bit_length()
        }

    def generate_bit_steps(self, num_bits: int) -> Generator[Dict[str, Any], None, List[int]]:
        """
        Generates `num_bits` bits while yielding step-by-step calculation events
        for live visualization.
        """
        bits = []
        x_prev = self.x0

        # Step 0 event: Initialization
        yield {
            "type": "BBS_INIT",
            "p": str(self.p),
            "q": str(self.q),
            "n": str(self.n),
            "seed": str(self.seed),
            "x0": str(self.x0),
            "formula_x0": f"x₀ = s² mod n = ({self.seed})² mod {self.n} = {self.x0}",
            "total_bits_needed": num_bits
        }

        for i in range(1, num_bits + 1):
            # Formula: x_i = (x_{i-1})^2 mod n
            x_next = pow(x_prev, 2, self.n)
            # Extract LSB (Least Significant Bit)
            extracted_bit = x_next & 1
            bits.append(extracted_bit)

            # Format calculation string (abbreviated if numbers are massive)
            if self.n.bit_length() > 64:
                str_prev = f"{str(x_prev)[:8]}...{str(x_prev)[-6:]}"
                str_next = f"{str(x_next)[:8]}...{str(x_next)[-6:]}"
                str_n = f"{str(self.n)[:8]}...{str(self.n)[-6:]}"
                op_str = f"x_{{{i}}} = ({str_prev})² mod {str_n}"
            else:
                str_prev = str(x_prev)
                str_next = str(x_next)
                op_str = f"x_{{{i}}} = ({x_prev})² mod {self.n} = {x_next}"

            yield {
                "type": "BBS_STEP",
                "step": i,
                "previous_value": str(x_prev),
                "previous_value_fmt": str_prev,
                "operation": op_str,
                "result": str(x_next),
                "result_fmt": str_next,
                "output_bit": extracted_bit,
                "extracted_bits_so_far": "".join(map(str, bits))
            }

            x_prev = x_next

        # Summary Metrics
        zeros = bits.count(0)
        ones = bits.count(1)
        pct_0 = round((zeros / num_bits) * 100, 2) if num_bits > 0 else 0.0
        pct_1 = round((ones / num_bits) * 100, 2) if num_bits > 0 else 0.0

        summary = {
            "type": "BBS_SUMMARY",
            "total_bits": num_bits,
            "count_zero": zeros,
            "count_one": ones,
            "percentage_zero": pct_0,
            "percentage_one": pct_1,
            "bitstream": "".join(map(str, bits)),
            "parameters": self.get_parameters()
        }
        
        yield summary
        return bits

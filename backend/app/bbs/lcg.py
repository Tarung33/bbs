import math
from typing import List, Dict, Any

class LCGGenerator:
    """
    Linear Congruential Generator (LCG) - A weak, predictable PRNG.
    Formula: x_{i+1} = (a * x_i + c) mod m
    Default parameters (e.g., standard educational parameters):
    a = 1103515245, c = 12345, m = 2**31
    """

    def __init__(self, seed: int = 12345, a: int = 1103515245, c: int = 12345, m: int = 2**31):
        self.seed = seed
        self.a = a
        self.c = c
        self.m = m
        self.current_x = seed

    def generate_sequence(self, num_outputs: int = 256) -> Dict[str, Any]:
        """Generate sequence of values and LSB bits."""
        values = []
        bits = []
        x = self.seed

        for _ in range(num_outputs):
            x = (self.a * x + self.c) % self.m
            values.append(x)
            bits.append(x & 1)

        zeros = bits.count(0)
        ones = bits.count(1)

        return {
            "type": "LCG",
            "parameters": {"a": self.a, "c": self.c, "m": self.m, "seed": self.seed},
            "values": values,
            "bits": bits,
            "total_bits": num_outputs,
            "count_zero": zeros,
            "count_one": ones,
            "percentage_zero": round((zeros / num_outputs) * 100, 2),
            "percentage_one": round((ones / num_outputs) * 100, 2),
            "predictable": True
        }

def predict_lcg_next(sequence: List[int], a: int = 1103515245, c: int = 12345, m: int = 2**31) -> int:
    """
    Given the last observed state x_k of LCG, predict the next state x_{k+1}.
    Since LCG states are fully linear, knowledge of a, c, m allows 100% accurate prediction.
    """
    if not sequence:
        return 0
    last_val = sequence[-1]
    next_val = (a * last_val + c) % m
    return next_val & 1

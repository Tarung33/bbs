from typing import List, Dict, Any, Generator

def bits_to_bytes(bits: List[int]) -> bytes:
    """Convert list of 0/1 bits into raw bytes (8 bits per byte, MSB first)."""
    byte_list = []
    for i in range(0, len(bits), 8):
        chunk = bits[i:i+8]
        # Pad with 0s if last chunk has less than 8 bits
        while len(chunk) < 8:
            chunk.append(0)
        byte_val = 0
        for bit in chunk:
            byte_val = (byte_val << 1) | bit
        byte_list.append(byte_val)
    return bytes(byte_list)

def bytes_to_hex_formatted(b: bytes) -> str:
    """Format bytes as space-separated uppercase hex strings (e.g., A7 3F 91 8C)."""
    return " ".join(f"{byte:02X}" for byte in b)

def derive_key_events(bits: List[int], target_key_size_bits: int = 256) -> Generator[Dict[str, Any], None, bytes]:
    """
    Derive AES key from BBS bits while yielding visual step events.
    """
    needed_bytes = target_key_size_bits // 8
    needed_bits = target_key_size_bits

    # Truncate or pad bits array to needed_bits
    usable_bits = bits[:needed_bits]
    while len(usable_bits) < needed_bits:
        usable_bits.append(0)

    yield {
        "type": "KEY_DERIVATION_STARTED",
        "target_key_size_bits": target_key_size_bits,
        "target_key_size_bytes": needed_bytes,
        "total_input_bits": len(bits),
        "used_bits_count": len(usable_bits)
    }

    # Group bits into bytes
    byte_groupings = []
    raw_byte_values = []
    
    for byte_idx in range(needed_bytes):
        chunk = usable_bits[byte_idx*8 : (byte_idx+1)*8]
        chunk_str = "".join(map(str, chunk))
        byte_val = int(chunk_str, 2)
        raw_byte_values.append(byte_val)
        
        hex_str = f"{byte_val:02X}"
        byte_groupings.append({
            "byte_index": byte_idx,
            "bits": chunk_str,
            "decimal": byte_val,
            "hex": hex_str
        })

        yield {
            "type": "KEY_GROUPING_STEP",
            "byte_index": byte_idx + 1,
            "total_bytes": needed_bytes,
            "bit_chunk": chunk_str,
            "converted_hex": hex_str,
            "partial_key_hex": " ".join(g["hex"] for g in byte_groupings)
        }

    key_bytes = bytes(raw_byte_values)
    full_hex = bytes_to_hex_formatted(key_bytes)

    yield {
        "type": "KEY_READY",
        "key_size_bits": target_key_size_bits,
        "key_size_bytes": needed_bytes,
        "key_hex": full_hex,
        "raw_hex_compact": key_bytes.hex().upper(),
        "byte_groupings": byte_groupings
    }

    return key_bytes

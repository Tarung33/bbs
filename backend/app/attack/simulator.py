import copy
import random
from typing import Dict, Any, Generator, Tuple

ATTACK_DESCRIPTIONS = {
    "NONE": {
        "title": "Clean Transmission (No Interception)",
        "icon": "ShieldCheck",
        "details": "Packet travels across the network securely without tampering or eavesdropping."
    },
    "PASSIVE_SNIFF": {
        "title": "Passive Eavesdropping (Packet Sniffing)",
        "icon": "Eye",
        "details": "An attacker sniffs packet payload in transit. However, because AES-256-GCM is computationally secure under valid BBS keying, the ciphertext reveals zero plaintext information!"
    },
    "BIT_FLIP": {
        "title": "Ciphertext Bit-Flipping Attack",
        "icon": "Zap",
        "details": "Attacker intercepts packet in transit and flips random bits in the ciphertext payload. AES-GCM Authentication Tag check WILL FAIL at receiver!"
    },
    "TAG_TAMPER": {
        "title": "Authentication Tag Corruption",
        "icon": "FileX",
        "details": "Attacker modifies the GCM Auth Tag. Receiver will detect payload forgery and reject the packet before returning decrypted plaintext!"
    },
    "KEY_MITM": {
        "title": "Man-In-The-Middle / Key Mismatch",
        "icon": "UserX",
        "details": "Attacker attempts to decrypt the intercepted packet using a guessed or wrong key. Decryption and tag verification fail completely."
    }
}

def simulate_attack_step(
    original_packet: Dict[str, Any],
    attack_type: str,
    original_key_bytes: bytes
) -> Tuple[Dict[str, Any], bytes, Generator[Dict[str, Any], None, None]]:
    """
    Simulate specified attack scenario on network packet.
    Returns (modified_packet, effective_key_for_receiver, event_generator)
    """
    tampered_packet = copy.deepcopy(original_packet)
    receiver_key_bytes = original_key_bytes
    
    def _gen_events():
        desc = ATTACK_DESCRIPTIONS.get(attack_type, ATTACK_DESCRIPTIONS["NONE"])
        yield {
            "type": "ATTACK_SIMULATION_STARTED",
            "attack_type": attack_type,
            "title": desc["title"],
            "description": desc["details"]
        }

        if attack_type == "NONE":
            yield {
                "type": "ATTACK_RESULT",
                "attack_type": "NONE",
                "tampered": False,
                "impact": "Packet arrives untouched. GCM Auth Tag valid."
            }

        elif attack_type == "PASSIVE_SNIFF":
            captured_ct = tampered_packet["payload"]["ciphertext_hex"]
            yield {
                "type": "ATTACK_INTERCEPTED",
                "attacker": "Malicious Node (Eve)",
                "action": "Intercepted packet payload.",
                "intercepted_ciphertext": captured_ct,
                "plaintext_visible": False,
                "explanation": "Eve holds the ciphertext but has no BBS seed/key. AES-GCM guarantees semantic security under chosen-ciphertext attack (IND-CCA2)."
            }
            yield {
                "type": "ATTACK_RESULT",
                "attack_type": "PASSIVE_SNIFF",
                "tampered": False,
                "impact": "Data secrecy maintained despite network eavesdropping."
            }

        elif attack_type == "BIT_FLIP":
            ct_hex = tampered_packet["payload"]["ciphertext_hex"]
            # Convert hex string back to byte array, alter first byte
            ct_clean_bytes = bytearray.fromhex(ct_hex.replace(" ", ""))
            if len(ct_clean_bytes) > 0:
                ct_clean_bytes[0] ^= 0xFF  # Flip all bits in first byte
                if len(ct_clean_bytes) > 2:
                    ct_clean_bytes[2] ^= 0xAA

            mod_ct_hex = " ".join(f"{b:02X}" for b in ct_clean_bytes)
            tampered_packet["payload"]["ciphertext_hex"] = mod_ct_hex
            tampered_packet["metadata"]["tampered"] = True
            tampered_packet["metadata"]["attack_type"] = "BIT_FLIP"

            yield {
                "type": "ATTACK_MODIFIED_PAYLOAD",
                "attacker": "Active Attacker (Eve)",
                "target_field": "ciphertext_hex",
                "original_sample": ct_hex[:20],
                "tampered_sample": mod_ct_hex[:20],
                "explanation": "Bits in ciphertext were modified in transit."
            }
            yield {
                "type": "ATTACK_RESULT",
                "attack_type": "BIT_FLIP",
                "tampered": True,
                "expected_outcome": "DECRYPTION_AUTH_FAILURE"
            }

        elif attack_type == "TAG_TAMPER":
            tag_hex = tampered_packet["payload"]["auth_tag_hex"]
            tag_bytes = bytearray.fromhex(tag_hex.replace(" ", ""))
            if len(tag_bytes) > 0:
                tag_bytes[-1] ^= 0xDE  # Corrupt last tag byte

            mod_tag_hex = " ".join(f"{b:02X}" for b in tag_bytes)
            tampered_packet["payload"]["auth_tag_hex"] = mod_tag_hex
            tampered_packet["metadata"]["tampered"] = True
            tampered_packet["metadata"]["attack_type"] = "TAG_TAMPER"

            yield {
                "type": "ATTACK_MODIFIED_PAYLOAD",
                "attacker": "Active Attacker (Eve)",
                "target_field": "auth_tag_hex",
                "original_tag": tag_hex,
                "tampered_tag": mod_tag_hex,
                "explanation": "Authentication Tag corrupted."
            }
            yield {
                "type": "ATTACK_RESULT",
                "attack_type": "TAG_TAMPER",
                "tampered": True,
                "expected_outcome": "DECRYPTION_AUTH_FAILURE"
            }

        elif attack_type == "KEY_MITM":
            # Receiver attempts decryption with a random fake key
            fake_key = bytes([random.randint(0, 255) for _ in range(len(original_key_bytes))])
            nonlocal receiver_key_bytes
            receiver_key_bytes = fake_key

            fake_key_hex = " ".join(f"{b:02X}" for b in fake_key)
            tampered_packet["metadata"]["tampered"] = True
            tampered_packet["metadata"]["attack_type"] = "KEY_MITM"

            yield {
                "type": "ATTACK_KEY_CORRUPTED",
                "attacker": "MITM Node",
                "action": "Injected wrong/corrupted key at receiver side.",
                "original_key_sample": " ".join(f"{b:02X}" for b in original_key_bytes[:8]) + "...",
                "fake_key_sample": fake_key_hex[:23] + "...",
                "explanation": "Receiver is given an unauthorized key."
            }
            yield {
                "type": "ATTACK_RESULT",
                "attack_type": "KEY_MITM",
                "tampered": True,
                "expected_outcome": "DECRYPTION_AUTH_FAILURE"
            }

    return tampered_packet, receiver_key_bytes, _gen_events()

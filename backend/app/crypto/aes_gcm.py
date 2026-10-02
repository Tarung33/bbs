import os
from typing import Generator, Dict, Any, Tuple
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from app.crypto.key_derivation import bytes_to_hex_formatted

def encrypt_aes_gcm_events(plaintext: str, key_bytes: bytes) -> Generator[Dict[str, Any], None, Dict[str, Any]]:
    """
    Encrypt message using AES-GCM (Authenticated Encryption)
    and yield real-time visual events.
    """
    yield {
        "type": "ENCRYPTION_STARTED",
        "plaintext_raw": plaintext,
        "algorithm": f"AES-{len(key_bytes)*8}-GCM",
        "mode": "Galois/Counter Mode (GCM)"
    }

    # Step 1: Plaintext to bytes
    pt_bytes = plaintext.encode('utf-8')
    pt_hex = bytes_to_hex_formatted(pt_bytes)

    yield {
        "type": "PLAINTEXT_CONVERTED",
        "plaintext_text": plaintext,
        "length_bytes": len(pt_bytes),
        "utf8_bytes_hex": pt_hex,
        "byte_array": list(pt_bytes)
    }

    # Step 2: Nonce / IV Generation (96-bit / 12-byte standard for GCM)
    nonce_bytes = os.urandom(12)
    nonce_hex = bytes_to_hex_formatted(nonce_bytes)

    yield {
        "type": "NONCE_GENERATED",
        "nonce_size_bits": 96,
        "nonce_size_bytes": 12,
        "nonce_hex": nonce_hex,
        "purpose": "Ensures identical plaintexts produce unique ciphertexts under the same key."
    }

    # Step 3: AES-GCM Encryption Execution
    aesgcm = AESGCM(key_bytes)
    # encrypt returns ciphertext + 16-byte authentication tag appended at the end
    encrypted_payload = aesgcm.encrypt(nonce_bytes, pt_bytes, associated_data=None)

    # In AES-GCM, the last 16 bytes are the Authentication Tag
    auth_tag_bytes = encrypted_payload[-16:]
    ciphertext_bytes = encrypted_payload[:-16]

    ct_hex = bytes_to_hex_formatted(ciphertext_bytes)
    tag_hex = bytes_to_hex_formatted(auth_tag_bytes)

    yield {
        "type": "ENCRYPTION_PROCESSING",
        "key_used_hex": bytes_to_hex_formatted(key_bytes),
        "nonce_hex": nonce_hex,
        "ciphertext_length_bytes": len(ciphertext_bytes),
        "auth_tag_length_bytes": len(auth_tag_bytes)
    }

    yield {
        "type": "CIPHERTEXT_GENERATED",
        "ciphertext_hex": ct_hex,
        "ciphertext_compact": ciphertext_bytes.hex().upper(),
        "auth_tag_hex": tag_hex,
        "auth_tag_compact": auth_tag_bytes.hex().upper()
    }

    encryption_result = {
        "plaintext": plaintext,
        "plaintext_hex": pt_hex,
        "key_hex": bytes_to_hex_formatted(key_bytes),
        "raw_key_bytes": key_bytes,
        "nonce_bytes": nonce_bytes,
        "nonce_hex": nonce_hex,
        "ciphertext_bytes": ciphertext_bytes,
        "ciphertext_hex": ct_hex,
        "auth_tag_bytes": auth_tag_bytes,
        "auth_tag_hex": tag_hex,
        "algorithm": f"AES-{len(key_bytes)*8}-GCM"
    }

    yield {
        "type": "ENCRYPTION_COMPLETED",
        "result": {
            "ciphertext_hex": ct_hex,
            "nonce_hex": nonce_hex,
            "auth_tag_hex": tag_hex
        }
    }

    return encryption_result

def decrypt_aes_gcm(
    ciphertext_bytes: bytes,
    auth_tag_bytes: bytes,
    nonce_bytes: bytes,
    key_bytes: bytes
) -> Tuple[bool, str, Dict[str, Any]]:
    """
    Attempt decryption using AES-GCM.
    Returns (success_flag, plaintext_or_error_msg, detail_dict)
    """
    aesgcm = AESGCM(key_bytes)
    # Combine ciphertext and auth tag as expected by cryptography library
    full_payload = ciphertext_bytes + auth_tag_bytes

    try:
        decrypted_pt_bytes = aesgcm.decrypt(nonce_bytes, full_payload, associated_data=None)
        recovered_str = decrypted_pt_bytes.decode('utf-8', errors='replace')
        return True, recovered_str, {
            "status": "AUTHENTICATED_AND_DECRYPTED",
            "auth_tag_match": True,
            "plaintext": recovered_str,
            "plaintext_hex": bytes_to_hex_formatted(decrypted_pt_bytes),
            "error": None
        }
    except Exception as e:
        return False, f"Decryption/Authentication Failure: {str(e)}", {
            "status": "INTEGRITY_VERIFICATION_FAILED",
            "auth_tag_match": False,
            "plaintext": None,
            "plaintext_hex": None,
            "error": "Authentication tag verification failed! Payload or tag has been tampered with or incorrect key used."
        }

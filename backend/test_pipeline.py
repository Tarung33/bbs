import asyncio
from app.bbs.generator import BBSGenerator
from app.bbs.validator import validate_lab_parameters
from app.crypto.key_derivation import derive_key_events
from app.crypto.aes_gcm import encrypt_aes_gcm_events, decrypt_aes_gcm
from app.network.packet import build_network_packet, packet_transmission_events
from app.attack.simulator import simulate_attack_step

def test_full_pipeline():
    print("--- 1. TESTING LAB VALIDATOR ---")
    valid, details = validate_lab_parameters(383, 503, 12345, "Hello AIT")
    print("Lab validation:", valid, details["parsed"])
    assert valid is True

    print("\n--- 2. TESTING BBS GENERATOR ---")
    bbs = BBSGenerator(p=383, q=503, seed=12345)
    print("BBS params:", bbs.get_parameters())
    
    events = list(bbs.generate_bit_steps(256))
    bits = [e["output_bit"] for e in events if e["type"] == "BBS_STEP"]
    print(f"Generated {len(bits)} bits.")
    assert len(bits) == 256

    print("\n--- 3. TESTING KEY DERIVATION ---")
    key_events = list(derive_key_events(bits, target_key_size_bits=256))
    key_ready_event = [e for e in key_events if e["type"] == "KEY_READY"][0]
    key_bytes = bytes.fromhex(key_ready_event["raw_hex_compact"])
    print("Derived Key Hex:", key_ready_event["key_hex"])
    assert len(key_bytes) == 32

    print("\n--- 4. TESTING AES-256-GCM ENCRYPTION ---")
    enc_events = list(encrypt_aes_gcm_events("Hello AIT", key_bytes))
    enc_completed = [e for e in enc_events if e["type"] == "ENCRYPTION_COMPLETED"][0]
    ct_hex = enc_completed["result"]["ciphertext_hex"]
    nonce_hex = enc_completed["result"]["nonce_hex"]
    tag_hex = enc_completed["result"]["auth_tag_hex"]
    print("Encrypted Ciphertext Hex:", ct_hex)
    print("Nonce Hex:", nonce_hex)
    print("Auth Tag Hex:", tag_hex)

    print("\n--- 5. TESTING NETWORK PACKET ---")
    pkt = build_network_packet(ct_hex, nonce_hex, tag_hex)
    print("Packet ID:", pkt["packet_id"])
    print("Checksum:", pkt["header"]["checksum"])

    print("\n--- 6. TESTING CLEAN DECRYPTION ---")
    ct_bytes = bytes.fromhex(ct_hex.replace(" ", ""))
    nonce_bytes = bytes.fromhex(nonce_hex.replace(" ", ""))
    tag_bytes = bytes.fromhex(tag_hex.replace(" ", ""))
    
    success, dec_msg, dec_details = decrypt_aes_gcm(ct_bytes, tag_bytes, nonce_bytes, key_bytes)
    print("Clean Decryption Success:", success, "Recovered Plaintext:", dec_msg)
    assert success is True
    assert dec_msg == "Hello AIT"

    print("\n--- 7. TESTING BIT-FLIP ATTACK SIMULATION ---")
    tampered_pkt, eff_key, atk_events = simulate_attack_step(pkt, "BIT_FLIP", key_bytes)
    t_events = list(atk_events)
    print("Tampered Payload Sample:", tampered_pkt["payload"]["ciphertext_hex"][:20])

    t_ct_bytes = bytes.fromhex(tampered_pkt["payload"]["ciphertext_hex"].replace(" ", ""))
    t_success, t_msg, t_details = decrypt_aes_gcm(t_ct_bytes, tag_bytes, nonce_bytes, eff_key)
    print("Tampered Decryption Success:", t_success, "Expected Failure Result!")
    assert t_success is False

    print("\n[SUCCESS] ALL PIPELINE TESTS PASSED CLEANLY!")

if __name__ == "__main__":
    test_full_pipeline()

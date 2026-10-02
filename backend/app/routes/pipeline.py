import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

from app.bbs.generator import BBSGenerator
from app.bbs.validator import validate_lab_parameters
from app.bbs.prime_utils import generate_blum_prime, generate_seed, is_prime, is_blum_prime
from app.crypto.key_derivation import derive_key_events
from app.crypto.aes_gcm import encrypt_aes_gcm_events, decrypt_aes_gcm
from app.network.packet import build_network_packet, packet_transmission_events
from app.attack.simulator import simulate_attack_step
from app.attack.simulations import run_brute_force_analysis, run_pattern_analysis, run_prng_comparison
from app.websocket.manager import ws_manager

router = APIRouter(prefix="/api", tags=["pipeline"])

class LabValidateRequest(BaseModel):
    p: Any
    q: Any
    seed: Any
    message: str

class BruteForceRequest(BaseModel):
    key_size_bits: int = 256

class PatternAnalysisRequest(BaseModel):
    ciphertext_hex: str
    plaintext: str

@router.post("/validate-lab")
def validate_lab(req: LabValidateRequest):
    """Validate lab mode parameters before starting pipeline."""
    is_valid, details = validate_lab_parameters(req.p, req.q, req.seed, req.message)
    return details

@router.get("/demo-params")
def get_demo_params(bits: int = 512):
    """Generate quick sample Blum primes and seed for lab mode pre-fill."""
    p = generate_blum_prime(bits // 2)
    q = generate_blum_prime(bits // 2)
    while p == q:
        q = generate_blum_prime(bits // 2)
    n = p * q
    seed = generate_seed(n)
    return {
        "p": str(p),
        "q": str(q),
        "n": str(n),
        "seed": str(seed),
        "message": "Confidential message from AIT"
    }

@router.post("/attack/brute-force")
def analyze_brute_force(req: BruteForceRequest):
    """Return theoretical brute-force estimation."""
    return run_brute_force_analysis(req.key_size_bits)

@router.post("/attack/pattern-analysis")
def analyze_pattern(req: PatternAnalysisRequest):
    """Return Shannon entropy and pattern analysis."""
    return run_pattern_analysis(req.ciphertext_hex, req.plaintext)

@router.get("/attack/prng-comparison")
def compare_prng(num_bits: int = 128):
    """Return comparison between weak LCG PRNG and BBS PRNG."""
    return run_prng_comparison(num_bits)

@router.get("/architecture-info")
def get_architecture_info():
    """Return systemic architecture metadata."""
    return {
        "title": "CRYPTOVISOR System Architecture",
        "nodes": [
            {
                "id": "react_frontend",
                "name": "React 19 Frontend",
                "layer": "User Interface",
                "tech": "React 19, Vite 8, Tailwind CSS v4, Framer Motion",
                "description": "Renders real-time visual progress, interactive step controls, packet transit, and hacker terminal."
            },
            {
                "id": "websocket_layer",
                "name": "WebSocket Stream",
                "layer": "Communication",
                "tech": "FastAPI WebSockets /ws/pipeline",
                "description": "Streams micro-step events from Python backend directly into UI state."
            },
            {
                "id": "fastapi_backend",
                "name": "FastAPI Engine",
                "layer": "Backend Application",
                "tech": "Python 3.13, Uvicorn, Pydantic",
                "description": "Coordinates full execution pipeline, parameter validation, and event streaming."
            },
            {
                "id": "bbs_engine",
                "name": "Blum Blum Shub (BBS) Generator",
                "layer": "Cryptographic PRNG",
                "tech": "Python custom BBS generator, SymPy",
                "description": "Generates x(i+1) = x(i)² mod n sequence and extracts LSB bitstream."
            },
            {
                "id": "key_derivation",
                "name": "Key Derivation Module",
                "layer": "Key Management",
                "tech": "Bit-Grouping (8 bits/byte)",
                "description": "Groups BBS bits into bytes to assemble 128-bit or 256-bit AES symmetric keys."
            },
            {
                "id": "aes_gcm_engine",
                "name": "AES-256-GCM Engine",
                "layer": "Symmetric Encryption",
                "tech": "python-cryptography (hazmat AESGCM)",
                "description": "Encrypts UTF-8 plaintext bytes into Ciphertext, 96-bit Nonce, and 128-bit Auth Tag (MAC)."
            },
            {
                "id": "network_simulator",
                "name": "Network Packet Transit",
                "layer": "Network Layer",
                "tech": "Simulated multi-hop router topology",
                "description": "Encapsulates ciphertext into network packet and animates transit from Alice to Bob."
            },
            {
                "id": "attack_simulator",
                "name": "Adversary Attack Node",
                "layer": "Security Assessment",
                "tech": "Bit-flipping, Tag corruption, MITM key injection",
                "description": "Intercepts packet in transit and attempts payload tampering or decryption."
            },
            {
                "id": "receiver_decryption",
                "name": "Receiver Decryption & Auth",
                "layer": "Receiver Authentication",
                "tech": "AES-GCM Auth Tag Verification",
                "description": "Authenticates GCM Auth Tag before decrypting ciphertext back to original plaintext."
            }
        ]
    }

async def run_pipeline_websocket_stream(websocket: WebSocket, payload: dict):
    """
    Executes the entire Cryptovisor cryptographic pipeline
    and streams events in real-time to the WebSocket client.
    """
    mode = payload.get("mode", "DEMO").upper()
    message = payload.get("message", "Confidential message from AIT").strip()
    key_size_bits = int(payload.get("key_size_bits", 256))
    attack_type = payload.get("attack_type", "NONE").upper()
    step_delay_ms = float(payload.get("speed_ms", 50))

    if not message:
        message = "Confidential message from AIT"

    # Step 0: Announce Pipeline Started
    await ws_manager.send_event(websocket, {
        "type": "PIPELINE_STARTED",
        "mode": mode,
        "message": message,
        "key_size_bits": key_size_bits,
        "attack_type": attack_type
    }, delay_ms=100)

    # 1. BBS Parameter Setup & Validation
    if mode == "LAB":
        p_val = payload.get("p")
        q_val = payload.get("q")
        seed_val = payload.get("seed")
        
        is_valid, val_details = validate_lab_parameters(p_val, q_val, seed_val, message)
        if not is_valid:
            await ws_manager.send_event(websocket, {
                "type": "PIPELINE_ERROR",
                "error_type": "LAB_VALIDATION_FAILED",
                "details": val_details
            })
            return

        p = val_details["parsed"]["p"]
        q = val_details["parsed"]["q"]
        seed = val_details["parsed"]["seed"]
        bbs = BBSGenerator(p=p, q=q, seed=seed)
    else:
        # DEMO MODE
        demo_bits = 512 if key_size_bits == 256 else 256
        bbs = BBSGenerator(demo_bit_size=demo_bits)

    # 2. BBS Bitstream Generation
    needed_bits = key_size_bits
    generated_bits = []

    for step_event in bbs.generate_bit_steps(needed_bits):
        if step_event["type"] == "BBS_STEP":
            generated_bits.append(step_event["output_bit"])
            delay = step_delay_ms if step_event["step"] <= 64 else 5
            await ws_manager.send_event(websocket, step_event, delay_ms=delay)
        else:
            await ws_manager.send_event(websocket, step_event, delay_ms=80)

    # 3. Key Derivation from BBS Bits
    key_bytes = None
    for key_event in derive_key_events(generated_bits, target_key_size_bits=key_size_bits):
        if key_event["type"] == "KEY_READY":
            key_bytes = bytes.fromhex(key_event["raw_hex_compact"])
        await ws_manager.send_event(websocket, key_event, delay_ms=80)

    # 4. AES-GCM Encryption
    for enc_event in encrypt_aes_gcm_events(message, key_bytes):
        await ws_manager.send_event(websocket, enc_event, delay_ms=100)

    # 5. Network Packet Assembly
    packet = build_network_packet(
        ciphertext_hex=enc_event["result"]["ciphertext_hex"],
        nonce_hex=enc_event["result"]["nonce_hex"],
        auth_tag_hex=enc_event["result"]["auth_tag_hex"],
        key_size_bits=key_size_bits
    )

    for pkt_event in packet_transmission_events(packet):
        await ws_manager.send_event(websocket, pkt_event, delay_ms=120)

    # 6. Attack Simulation
    tampered_packet, effective_key, attack_event_gen = simulate_attack_step(packet, attack_type, key_bytes)
    for atk_event in attack_event_gen:
        await ws_manager.send_event(websocket, atk_event, delay_ms=150)

    # 7. Receiver Decryption & Tag Verification
    await ws_manager.send_event(websocket, {
        "type": "DECRYPTION_STARTED",
        "receiver": tampered_packet["header"]["destination"],
        "received_packet_id": tampered_packet["packet_id"]
    }, delay_ms=100)

    recv_ct_bytes = bytes.fromhex(tampered_packet["payload"]["ciphertext_hex"].replace(" ", ""))
    recv_tag_bytes = bytes.fromhex(tampered_packet["payload"]["auth_tag_hex"].replace(" ", ""))
    recv_nonce_bytes = bytes.fromhex(tampered_packet["payload"]["nonce_hex"].replace(" ", ""))

    success, dec_msg, dec_details = decrypt_aes_gcm(
        recv_ct_bytes,
        recv_tag_bytes,
        recv_nonce_bytes,
        effective_key
    )

    await ws_manager.send_event(websocket, {
        "type": "DECRYPTION_COMPLETED",
        "success": success,
        "recovered_plaintext": dec_msg if success else None,
        "details": dec_details
    }, delay_ms=150)

    # 8. Security Summary Report Event
    await ws_manager.send_event(websocket, {
        "type": "PIPELINE_FINISHED",
        "summary": {
            "mode": mode,
            "original_plaintext": message,
            "recovered_plaintext": dec_msg if success else None,
            "success": success,
            "bbs_params": bbs.get_parameters(),
            "key_size_bits": key_size_bits,
            "attack_type": attack_type,
            "attack_outcome": "ATTACK_NEUTRALIZED_BY_AES_GCM" if (attack_type != "NONE" and not success) else ("SECURE_TRANSMISSION_SUCCESS" if success else "TRANSMISSION_FAILED")
        }
    }, delay_ms=100)

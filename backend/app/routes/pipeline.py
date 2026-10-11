import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from app.bbs.generator import BBSGenerator
from app.bbs.validator import validate_lab_parameters
from app.bbs.prime_utils import generate_blum_prime, generate_seed, is_prime, is_blum_prime, gcd
from app.websocket.manager import ws_manager

router = APIRouter(prefix="/api", tags=["bbs"])

class LabValidateRequest(BaseModel):
    p: Any
    q: Any
    seed: Any
    message: str = "Hello AIT"

class SingleStepRequest(BaseModel):
    p: int
    q: int
    current_x: int

class GenerateBitsRequest(BaseModel):
    p: int
    q: int
    seed: int
    num_bits: int = 12

@router.post("/validate-lab")
def validate_lab(req: LabValidateRequest):
    """
    Validate custom BBS parameters (p, q, seed).
    Checks:
    1. p is prime and p ≡ 3 (mod 4)
    2. q is prime and q ≡ 3 (mod 4)
    3. p != q
    4. n = p * q
    5. gcd(seed, n) == 1
    """
    is_valid, details = validate_lab_parameters(req.p, req.q, req.seed, req.message)
    return details

@router.get("/demo-params")
def get_demo_params():
    """Return default Demo Mode parameters (p=7, q=11, seed=3)."""
    return {
        "p": 7,
        "q": 11,
        "n": 77,
        "seed": 3,
        "x0": 9,
        "message": "Hello AIT"
    }

@router.get("/notes-example")
def get_notes_example():
    """
    Return exact example parameters from CNS/BCS703 notes:
    p = 383, q = 503, n = 192649, seed = 10135
    """
    p = 383
    q = 503
    n = p * q
    seed = 10135
    x0 = pow(seed, 2, n)
    
    # Precompute first 12 steps for notes reference
    steps = []
    x_prev = x0
    for i in range(1, 13):
        x_next = pow(x_prev, 2, n)
        bit = x_next & 1
        steps.append({
            "step": i,
            "previous_x": str(x_prev),
            "operation": f"({x_prev})² mod {n}",
            "current_x": str(x_next),
            "bit": bit
        })
        x_prev = x_next

    return {
        "p": p,
        "q": q,
        "n": n,
        "seed": seed,
        "x0": x0,
        "message": "Hello AIT",
        "precomputed_steps": steps
    }

@router.post("/bbs-step")
def calculate_bbs_step(req: SingleStepRequest):
    """Calculate single next state x_i = (x_{i-1})^2 mod n and LSB bit."""
    n = req.p * req.q
    x_next = pow(req.current_x, 2, n)
    bit = x_next & 1
    return {
        "n": n,
        "previous_x": req.current_x,
        "operation": f"({req.current_x})² mod {n}",
        "current_x": x_next,
        "bit": bit
    }

@router.post("/bbs-generate")
def generate_bbs_sequence(req: GenerateBitsRequest):
    """Generate num_bits bits and intermediate states for given p, q, seed."""
    bbs = BBSGenerator(p=req.p, q=req.q, seed=req.seed)
    n = req.p * req.q
    x0 = bbs.x0
    
    steps = []
    x_prev = x0
    bits = []
    for i in range(1, req.num_bits + 1):
        x_next = pow(x_prev, 2, n)
        bit = x_next & 1
        bits.append(bit)
        steps.append({
            "step": i,
            "previous_x": str(x_prev),
            "operation": f"({x_prev})² mod {n}",
            "current_x": str(x_next),
            "bit": bit
        })
        x_prev = x_next

    return {
        "p": req.p,
        "q": req.q,
        "n": n,
        "seed": req.seed,
        "x0": x0,
        "bitstream": "".join(map(str, bits)),
        "steps": steps
    }

async def run_pipeline_websocket_stream(websocket: WebSocket, payload: dict):
    """
    WebSocket stream for BBS bitstream generation.
    Emits BBS micro-steps step by step for live interactive display.
    """
    p_val = payload.get("p", 7)
    q_val = payload.get("q", 11)
    seed_val = payload.get("seed", 3)
    num_bits = int(payload.get("num_bits", 12))

    try:
        p = int(p_val)
        q = int(q_val)
        seed = int(seed_val)
    except (ValueError, TypeError):
        p, q, seed = 7, 11, 3

    bbs = BBSGenerator(p=p, q=q, seed=seed)

    await ws_manager.send_event(websocket, {
        "type": "PIPELINE_STARTED",
        "p": str(p),
        "q": str(q),
        "n": str(p * q),
        "seed": str(seed),
        "x0": str(bbs.x0)
    }, delay_ms=50)

    generated_bits = []
    for step_event in bbs.generate_bit_steps(num_bits):
        if step_event["type"] == "BBS_STEP":
            generated_bits.append(step_event["output_bit"])
            await ws_manager.send_event(websocket, step_event, delay_ms=100)
        else:
            await ws_manager.send_event(websocket, step_event, delay_ms=50)

    await ws_manager.send_event(websocket, {
        "type": "PIPELINE_FINISHED",
        "bitstream": "".join(map(str, generated_bits)),
        "parameters": bbs.get_parameters()
    }, delay_ms=50)

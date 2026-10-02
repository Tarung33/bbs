import uuid
import time
import hashlib
from typing import Dict, Any, Generator

def build_network_packet(
    ciphertext_hex: str,
    nonce_hex: str,
    auth_tag_hex: str,
    sender: str = "Alice (192.168.1.10)",
    receiver: str = "Bob (192.168.1.50)",
    key_size_bits: int = 256
) -> Dict[str, Any]:
    """Construct a simulated encrypted network packet."""
    packet_id = f"PKT-{str(uuid.uuid4())[:8].upper()}"
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
    
    # Calculate checksum over header + ciphertext
    header_data = f"{packet_id}{sender}{receiver}{timestamp}".encode('utf-8')
    checksum = hashlib.sha256(header_data + ciphertext_hex.encode('utf-8')).hexdigest()[:12].upper()

    packet = {
        "packet_id": packet_id,
        "timestamp": timestamp,
        "header": {
            "source": sender,
            "destination": receiver,
            "protocol": f"BBS-SEC-AES-{key_size_bits}-GCM",
            "checksum": checksum,
            "ttl": 64
        },
        "payload": {
            "ciphertext_hex": ciphertext_hex,
            "nonce_hex": nonce_hex,
            "auth_tag_hex": auth_tag_hex
        },
        "metadata": {
            "encrypted": True,
            "tampered": False,
            "attack_type": "NONE"
        }
    }
    return packet

def packet_transmission_events(packet: Dict[str, Any]) -> Generator[Dict[str, Any], None, None]:
    """Yield step events representing transmission across simulated network nodes."""
    yield {
        "type": "PACKET_CREATED",
        "packet": packet,
        "message": f"Packet {packet['packet_id']} assembled at Source node {packet['header']['source']}"
    }

    nodes = [
        "Local Gateway (192.168.1.1)",
        "ISP Backbone Edge Router (10.240.0.1)",
        "Encrypted Transit Channel (TLS/BBS)",
        "Destination Gateway (192.168.1.254)"
    ]

    for idx, node in enumerate(nodes, start=1):
        yield {
            "type": "TRANSMISSION_STEP",
            "step": idx,
            "total_hops": len(nodes),
            "current_node": node,
            "packet_id": packet["packet_id"],
            "progress_percent": round((idx / len(nodes)) * 100, 1),
            "ciphertext_sample": packet["payload"]["ciphertext_hex"][:16] + "..."
        }

    yield {
        "type": "TRANSMISSION_COMPLETED",
        "packet_id": packet["packet_id"],
        "destination": packet["header"]["destination"],
        "status": "DELIVERED"
    }

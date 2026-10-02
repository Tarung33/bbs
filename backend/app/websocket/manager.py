import json
import asyncio
from typing import List, Dict, Any
from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    """Manages WebSocket connections and streams real-time events."""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_event(self, websocket: WebSocket, event_data: Dict[str, Any], delay_ms: float = 0):
        """Send JSON event to a single WebSocket client with optional delay."""
        try:
            await websocket.send_text(json.dumps(event_data))
            if delay_ms > 0:
                await asyncio.sleep(delay_ms / 1000.0)
        except Exception:
            self.disconnect(websocket)

    async def broadcast(self, event_data: Dict[str, Any]):
        """Broadcast event to all connected clients."""
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(event_data))
            except Exception:
                disconnected.append(connection)
        for conn in disconnected:
            self.disconnect(conn)

ws_manager = ConnectionManager()

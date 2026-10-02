import json
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.routes.pipeline import router as pipeline_router, run_pipeline_websocket_stream
from app.websocket.manager import ws_manager

app = FastAPI(
    title="CRYPTOVISOR API",
    description="Interactive Cryptographic Visualization & Attack Simulation Engine using Blum Blum Shub & AES-256-GCM",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server (usually localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pipeline_router)

@app.get("/")
def read_root():
    return {
        "title": "CRYPTOVISOR API",
        "subtitle": "See Encryption. Understand Security.",
        "status": "SYSTEM_ONLINE",
        "endpoints": {
            "health": "/api/health",
            "validate_lab": "/api/validate-lab",
            "demo_params": "/api/demo-params",
            "websocket": "/ws/pipeline"
        }
    }

@app.get("/api/health")
def health_check():
    return {"status": "HEALTHY", "engine": "BBS + AES-256-GCM"}

@app.websocket("/ws/pipeline")
async def websocket_pipeline_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data_str = await websocket.receive_text()
            try:
                payload = json.loads(data_str)
                # Handle pipeline run request over websocket
                if payload.get("action") == "START_PIPELINE":
                    await run_pipeline_websocket_stream(websocket, payload)
                elif payload.get("action") == "PING":
                    await ws_manager.send_event(websocket, {"type": "PONG"})
            except Exception as e:
                await ws_manager.send_event(websocket, {
                    "type": "PIPELINE_ERROR",
                    "error": f"Invalid JSON or execution error: {str(e)}"
                })
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception as e:
        ws_manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

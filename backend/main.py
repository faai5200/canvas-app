from fastapi import FastAPI
import socketio
import asyncio


sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = FastAPI()
sio_app = socketio.ASGIApp(sio, other_asgi_app=app)

clients = set()
rectangles = []

async def broadcast_clients():
    await sio.emit("clients:update", {"count": len(clients)})

@sio.event
async def connect(sid, environ):
    print(f"[+] Client connected: {sid}")
    clients.add(sid)
    await broadcast_clients()

@sio.event
async def disconnect(sid):
    print(f"[-] Client disconnected: {sid}")
    clients.discard(sid)
    await broadcast_clients()


@sio.event
async def request_init(sid):
    print(f"[~] {sid} requested init")
    await sio.emit("init:state", rectangles, to=sid)

@sio.event
async def rectangle_add(sid, data):
    rectangles.append(data)
    await sio.emit("rectangle:add", data, skip_sid=sid)

@sio.event
async def rectangle_move(sid, data):
    rect_id = data.get("id")
    for rect in rectangles:
        if rect["id"] == rect_id:
            rect["x"] = data.get("x", rect["x"])
            rect["y"] = data.get("y", rect["y"])
            break
    await sio.emit("rectangle:move", data, skip_sid=sid)


@sio.event
async def rectangle_delete(sid, data):
    rect_id = data.get("id")
    global rectangles
    rectangles = [r for r in rectangles if r["id"] != rect_id]
    await sio.emit("rectangle:delete", {"id": rect_id}, skip_sid=sid)
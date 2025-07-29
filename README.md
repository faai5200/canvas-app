# canvas-app
Real time canvas/ multi user

---

## 🧪 Local Setup

### 🔹 1. Clone the Repo

```bash
git clone https://github.com/faai5200/realtime-canvas-app.git
cd realtime-canvas-app
```

### 🔹 2. Start the Backend (Python)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:sio_app --reload --port 8000
```

This will start the Socket.IO server at [http://localhost:8000](http://localhost:8000).

---

### 🔹 3. Start the Frontend (React)

In a new terminal tab:

```bash
cd frontend/canvas-frontend
npm install
npm run dev
```

The frontend will run at [http://localhost:5173](http://localhost:5173).

---

## 🚀 Try It Out

1. Open two browser tabs.
2. Add a rectangle in one tab — it appears in both.
3. Drag it — see it move live in both.
4. Click "X" on a rectangle — it disappears from all clients.

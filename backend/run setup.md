# Backend Run Setup

This guide explains how to run the FastAPI backend for Smart Explorer Mazhavarnadu.

## 1. Open Terminal at Project Root

Use this folder:

D:/M.Sc CS GAC (A) SLM - 7/Mazhavar Nadu Project/Mazhava App

## 2. Create Virtual Environment (if not created)

```powershell
python -m venv .venv
```

## 3. Activate Virtual Environment

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run once:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 4. Install Backend Dependencies

```powershell
python -m pip install -r backend/requirements.txt
```

## 5. Configure Environment Variables

Create a `.env` file in `backend` folder (copy from `.env.example`) with values like:

```env
MONGODB_URL=mongodb://localhost:27017
DB_NAME=smart_explorer
JWT_SECRET_KEY=replace_with_a_strong_secret
JWT_ALGORITHM=HS256
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinyllama
OLLAMA_TIMEOUT_SECONDS=20
QA_DATASET_PATH=backend/data/qa_dataset.json
```

## 6. Start MongoDB

Make sure MongoDB server is running before testing signup/login.

Default backend connection:

- Host: localhost
- Port: 27017

## 7. Run FastAPI Server

Recommended (works reliably on Windows):

```powershell
python backend/start_server.py
```

Note: this stable command runs without auto-reload to prevent uvloop-related worker crashes.

If terminal is at project root:

```powershell
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio
```

If terminal is inside `backend` folder:

```powershell
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio
```

Default port:

- Use 8000 unless it is already occupied.
- If 8000 is busy, run on another port (for example 8001) and update `VITE_API_BASE_URL` in `frontend/.env`.

## 8. Verify Server

- API Health: http://127.0.0.1:8000/
- Swagger Docs: http://127.0.0.1:8000/docs

For phone testing on same Wi-Fi, use your PC local IP (example `192.168.1.25`):

- API Health: `http://192.168.1.25:8000/`
- Swagger Docs: `http://192.168.1.25:8000/docs`

Get your local IP using:

```powershell
ipconfig
```

## 9. Common Errors and Fix

### Error: `Uvicorn ... unexpected extra arguments`

Cause:

- A log line like `Uvicorn running on ...` was typed as a command.

Fix:

- Run the real command:

```powershell
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Error: `localhost:27017 ... actively refused`

Cause:

- MongoDB is not running.

Fix:

- Start MongoDB service and retry.

### Error: `No module named 'uvloop'`

Cause:

- Uvicorn auto loop selection tries `uvloop`, which is unavailable in your current setup.

Fix:

- Run with asyncio loop:

```powershell
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio
```

- Or use:

```powershell
python backend/start_server.py
```

## 10. Test Auth Endpoints

Use Swagger at /docs:

1. `POST /signup`
2. `POST /login`
3. Copy `access_token`
4. Click Authorize and set `Bearer <token>`
5. Call `GET /me`


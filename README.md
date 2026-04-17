 SMART EXPLORE MAZHAVAR NADU

 This project is a Region-Specific Web Application empowered by an (AI) Chat-Bot, 
designed to showcase and guide users through the rich cultural, geographical, historical, and 
industrial landscape of Mazhavar Nadu a historically and geographically significant region 
comprising Salem, Dharmapuri, Krishnagiri, and Namakkal districts in Tamil Nadu. 
Strategically located between the Thondai Region, Kongu Region, and Karnataka, 
Mazhavar Nadu is a unique confluence of natural resources, traditional heritage, and 
modern development. The web application aims to digitally preserve and promote the 
identity of this region by integrating: 

Tech Tools:
React js + Vite js
Vennila CSS
Python 
chatbot Data Training Model: all-MiniLM-L6-v2
Network Tunel Google-Colab: 36WF42qRjJK2oCSTyev3idEULUg_22xthuhzm2t91dnAjRWnZ

Local Network Mobile Testing:
1. Start backend on all interfaces: `python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio` (or `python backend/start_server.py`)
2. Start frontend: `npm run dev` inside `frontend`.
3. Find your PC IP using `ipconfig` (example `192.168.1.25`).
<!-- 4. Open on mobile: `http://192.168.1.25:5173`. -->
5. Keep mobile and PC on same Wi-Fi.

Production deployment checklist:
1. Frontend (Vercel or Netlify)
	- Build command: npm run build
	- Publish directory: frontend/dist
	- Env: VITE_API_BASE_URL=https://<your-backend-domain>

2. Backend (Render or Railway)
	- Start command: uvicorn backend.main:app --host 0.0.0.0 --port $PORT
	- Install from backend/requirements.txt
	- Required env:
	  - MONGO_URI (or MONGODB_URL)
	  - JWT_SECRET_KEY
	  - QA_DATASET_PATH
	  - CORS_ALLOWED_ORIGINS=https://<your-frontend-domain>
	- Optional env:
	  - GEMINI_API_KEY
	  - ADMIN_EMAIL
	  - ADMIN_PASSWORD

3. Database (MongoDB Atlas)
	- Use Atlas connection string in MONGO_URI.
	- Allow backend host IP/network access.
	- Ensure collections exist: users, district_videos.

4. Security
	- Never commit .env files.
	- Rotate any previously exposed secrets before deployment.

Operational docs:
- Deployment env sets: docs/deployment-env.md
- Production runbook: docs/production-runbook.md
- Smoke test script: scripts/smoke_test.py
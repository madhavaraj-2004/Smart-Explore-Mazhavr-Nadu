# Production Environment Variable Sets

This document defines exact environment variable values for production deployment on:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Real Domains Used

- Frontend domain: `https://smart-explorer-mazhavarnadu.vercel.app`
- Backend domain: `https://smart-explorer-mazhavarnadu-api.onrender.com`

If your deployed service URL differs, update only the affected values below.

## Vercel (Frontend)

Set these in Vercel Project Settings -> Environment Variables:

- `VITE_API_BASE_URL=https://smart-explorer-mazhavarnadu-api.onrender.com`

## Render (Backend)

Set these in Render Service Settings -> Environment:

- `MONGO_URI=<YOUR_MONGODB_ATLAS_URI>`
- `MONGODB_URL=<YOUR_MONGODB_ATLAS_URI>`
- `DB_NAME=smart_explorer`
- `JWT_SECRET_KEY=<GENERATE_A_64_PLUS_CHAR_SECRET>`
- `JWT_ALGORITHM=HS256`
- `ADMIN_EMAIL=<YOUR_ADMIN_EMAIL>`
- `ADMIN_PASSWORD=<YOUR_STRONG_ADMIN_PASSWORD>`
- `CORS_ALLOWED_ORIGINS=https://smart-explorer-mazhavarnadu.vercel.app`
- `QA_DATASET_PATH=backend/data/qa_dataset.json`
- `GEMINI_API_KEY=`

Notes:
- `MONGO_URI` or `MONGODB_URL` is enough for runtime, but both are set here for compatibility.
- Keep `GEMINI_API_KEY` empty unless you integrate Gemini-powered responses.

## MongoDB Atlas

Atlas configuration required:

- Create database: `smart_explorer`
- Collections expected by app:
  - `users`
  - `district_videos`
- Network Access: allow Render egress IP or use `0.0.0.0/0` with strong credentials and least privilege.
- Database user should have access only to `smart_explorer` DB.

## Post-Deploy Verification

- Frontend opens with no CORS error.
- Backend health check responds at `/`.
- Login and `/ai/chat` requests succeed from frontend.

# Production Runbook

This runbook is for Smart Explorer Mazhavarnadu production operations.

## 1. Release Prerequisites

- Frontend build passes locally:
  - `cd frontend`
  - `npm run lint`
  - `npm run build`
- Backend tests pass locally:
  - `python -m unittest discover -s backend/tests -v`
- Production env variables are configured from `docs/deployment-env.md`.

## 2. Deploy Sequence

1. Deploy backend (Render) first.
2. Verify backend health endpoint:
   - `GET /`
   - Expected: `{"status":"ok","service":"auth-api"}`
3. Deploy frontend (Vercel) with `VITE_API_BASE_URL` pointing to backend.
4. Open production frontend and verify login screen and chatbot access.

## 3. Health Checks

Backend checks:

- `GET /` returns 200
- `POST /ai/chat` with `{"message":"Tell me about Salem"}` returns 200 and `reply`
- `GET /videos` returns 200 and array

Frontend checks:

- Home page loads and no blank screen
- Login modal opens and submits
- Protected routes redirect unauthenticated users to home
- Admin page requires admin role

## 4. Smoke Test Script

Run from repository root:

- `python scripts/smoke_test.py`
- Optional custom URL:
  - `python scripts/smoke_test.py --base-url https://your-backend.onrender.com`

Exit code:
- `0`: all checks passed
- `1`: one or more checks failed

## 5. Rollback Procedure

### Frontend rollback (Vercel)

1. Open Vercel project Deployments.
2. Select previous known-good deployment.
3. Click Promote to Production.
4. Re-run frontend sanity checks.

### Backend rollback (Render)

1. Open Render service Events/Deploys.
2. Redeploy previous successful commit.
3. Confirm env vars were not changed unexpectedly.
4. Run smoke test script against backend URL.

### Database rollback (MongoDB Atlas)

1. If schema/data issue is caused by a release, restore latest good snapshot or point-in-time backup.
2. Validate `users` and `district_videos` collection integrity.
3. Run smoke tests before reopening traffic.

## 6. Incident Checklist

- Capture timestamp and impacted endpoint/page.
- Check Render logs for 5xx spikes.
- Check browser console/network for CORS or auth errors.
- Verify CORS origin value exactly matches frontend production domain.
- Validate JWT secret and admin credentials are present in Render env.
- Run `python scripts/smoke_test.py --base-url <backend-url>`.

## 7. Post-Incident Actions

- Document root cause.
- Add a regression test (backend unit or frontend integration check).
- If secrets were exposed, rotate immediately:
  - MongoDB credentials
  - JWT secret
  - Admin password

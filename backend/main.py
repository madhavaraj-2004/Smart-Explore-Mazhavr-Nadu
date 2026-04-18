import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from backend.database import check_database_connection, ensure_indexes
    from backend.routes.ai import router as ai_router
    from backend.routes.admin import router as admin_router
    from backend.routes.auth import router as auth_router
    from backend.routes.compat import router as compat_router
    from backend.routes.district_posts import router as district_posts_router
    from backend.routes.videos import router as videos_router
except ModuleNotFoundError:
    from database import check_database_connection, ensure_indexes
    from routes.ai import router as ai_router
    from routes.admin import router as admin_router
    from routes.auth import router as auth_router
    from routes.compat import router as compat_router
    from routes.district_posts import router as district_posts_router
    from routes.videos import router as videos_router

logger = logging.getLogger('smart_explorer.main')

app = FastAPI(title='Smart Explorer Mazhavarnadu Auth API', version='1.0.0')


def _allowed_origins() -> list[str]:
    return [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'https://smart-explore-mazhavr-nadu-ufp9.vercel.app',
        '*'
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins(),
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event('startup')
def on_startup():
    connected, status_message = check_database_connection()
    if connected:
        logger.info(status_message)
    else:
        logger.warning(status_message)
    ensure_indexes()


@app.get('/')
def health():
    return {'status': 'ok', 'service': 'auth-api'}


app.include_router(auth_router)
app.include_router(district_posts_router)
app.include_router(admin_router)
app.include_router(ai_router)
app.include_router(videos_router)
app.include_router(compat_router)

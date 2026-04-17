import os
import logging
from pathlib import Path
from typing import Optional

import certifi
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from pymongo.errors import PyMongoError

logger = logging.getLogger('smart_explorer.database')

backend_dir = Path(__file__).resolve().parent
load_dotenv(dotenv_path=backend_dir / '.env')
load_dotenv()

MONGODB_URL = os.getenv('MONGO_URI') or os.getenv('MONGODB_URL')
MONGO_ATLAS_URI = os.getenv('MONGO_ATLAS_URI')
MONGO_LOCAL_URI = os.getenv('MONGO_LOCAL_URI', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'smart_explorer')

_client: Optional[MongoClient] = None
_database: Optional[Database] = None
_init_error: Optional[Exception] = None
_connected_uri: Optional[str] = None


def _build_uri_candidates() -> list[str]:
    ordered: list[str] = []
    for uri in [MONGO_LOCAL_URI, MONGODB_URL, MONGO_ATLAS_URI]:
        if uri and uri not in ordered:
            ordered.append(uri)
    return ordered


def _build_client(uri: str) -> MongoClient:
    is_atlas_uri = 'mongodb+srv://' in uri or 'mongodb.net' in uri
    client_kwargs = {
        'serverSelectionTimeoutMS': 5000,
        'connectTimeoutMS': 5000,
        'socketTimeoutMS': 5000,
    }
    if is_atlas_uri:
        client_kwargs['tls'] = True
        client_kwargs['tlsCAFile'] = certifi.where()

    return MongoClient(uri, **client_kwargs)


def _initialize_database() -> None:
    global _client, _database, _init_error, _connected_uri

    if _database is not None:
        return

    errors: list[str] = []
    for uri in _build_uri_candidates():
        try:
            client = _build_client(uri)
            client.admin.command('ping')
            _client = client
            _database = client[DB_NAME]
            _init_error = None
            _connected_uri = uri
            logger.info('MongoDB Connected Successfully (%s)', uri)
            return
        except Exception as exc:
            errors.append(f'{uri} -> {exc}')

    _client = None
    _database = None
    _connected_uri = None
    _init_error = RuntimeError('MongoDB connection attempts failed: ' + ' | '.join(errors))
    logger.error('MongoDB connection failed. %s', _init_error)


def get_database() -> Database:
    if _database is None:
        _initialize_database()

    if _database is None:
        message = 'MongoDB connection is unavailable. Check local MongoDB, then Atlas fallback settings.'
        if _init_error:
            raise RuntimeError(f'{message} Details: {_init_error}') from _init_error
        raise RuntimeError(message)

    return _database


def get_users_collection() -> Collection:
    return get_database()['users']


def get_district_posts_collection() -> Collection:
    return get_database()['district_posts']


def get_district_videos_collection() -> Collection:
    return get_database()['district_videos']


def ensure_indexes() -> None:
    try:
        users = get_users_collection()
        users.create_index('email', unique=True)
        posts = get_district_posts_collection()
        posts.create_index('district')
        posts.create_index('created_at')
        videos = get_district_videos_collection()
        videos.create_index('district', unique=True)
        videos.create_index('updated_at')
    except (RuntimeError, PyMongoError) as exc:
        # Keep API bootable even if MongoDB is currently offline.
        logger.warning('MongoDB index initialization skipped: %s', exc)


def check_database_connection() -> tuple[bool, str]:
    _initialize_database()
    if _database is not None:
        return True, f'Connected to MongoDB ({_connected_uri})'
    return False, f'MongoDB unavailable: {_init_error}'
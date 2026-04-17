import os
from datetime import date, datetime, timedelta, timezone

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import InvalidTokenError

try:
    from backend.database import get_users_collection
    from backend.models.user import UserPublic
except ModuleNotFoundError:
    from database import get_users_collection
    from models.user import UserPublic

load_dotenv()

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'change-this-in-production')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = 60

auth_scheme = HTTPBearer(auto_error=False)


def _dob_to_response(value: date | datetime | None) -> date:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    return datetime(2000, 1, 1, tzinfo=timezone.utc).date()


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
    except ValueError:
        return False


def create_access_token(user_id: str, email: str, role: str = 'user') -> str:
    expire_at = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        'sub': user_id,
        'email': email,
        'role': role,
        'exp': expire_at,
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token',
        ) from exc


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(auth_scheme),
) -> UserPublic:
    if credentials is None or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Authorization token is missing',
        )

    payload = decode_access_token(credentials.credentials)
    user_id = payload.get('sub')
    role = payload.get('role', 'user')
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token payload',
        )

    if role == 'admin':
        return UserPublic(
            id='admin-static-id',
            first_name='Admin',
            last_name='User',
            dob=datetime(2000, 1, 1, tzinfo=timezone.utc).date(),
            mobile='0000000000',
            email=payload.get('email', 'admin@gmail.com'),
            address='Admin Console',
            role='admin',
            created_at=datetime.now(timezone.utc),
        )

    users = get_users_collection()
    user_doc = users.find_one({'id': user_id})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User not found',
        )

    return UserPublic(
        id=user_doc['id'],
        first_name=user_doc.get('first_name') or user_doc.get('name', '').split(' ')[0] or 'User',
        last_name=user_doc.get('last_name') or 'Member',
        dob=_dob_to_response(user_doc.get('dob')),
        mobile=user_doc.get('mobile') or '0000000000',
        email=user_doc['email'],
        address=user_doc.get('address') or 'Not Provided',
        role=user_doc.get('role', 'user'),
        created_at=user_doc['created_at'],
    )
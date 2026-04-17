import os
from datetime import date, datetime, time, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.errors import DuplicateKeyError, PyMongoError

try:
    from backend.database import get_users_collection
    from backend.models.user import AuthResponse, MessageResponse, UserLogin, UserPublic, UserSignup
    from backend.utils.security import create_access_token, get_current_user, hash_password, verify_password
except ModuleNotFoundError:
    from database import get_users_collection
    from models.user import AuthResponse, MessageResponse, UserLogin, UserPublic, UserSignup
    from utils.security import create_access_token, get_current_user, hash_password, verify_password

router = APIRouter(tags=['Authentication'])

ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'admin@example.com').strip().lower()
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'change-this-admin-password')


def _dob_to_storage(value: date | datetime) -> datetime:
    if isinstance(value, datetime):
        return value.astimezone(timezone.utc) if value.tzinfo else value.replace(tzinfo=timezone.utc)
    return datetime.combine(value, time.min, tzinfo=timezone.utc)


def _dob_to_response(value: date | datetime | None) -> date:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    return datetime(2000, 1, 1, tzinfo=timezone.utc).date()


@router.post('/signup', response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: UserSignup):
    users = get_users_collection()
    email = payload.email.strip().lower()
    user_id = str(uuid4())

    user_doc = {
        '_id': user_id,
        'id': user_id,
        'first_name': payload.first_name.strip(),
        'last_name': payload.last_name.strip(),
        'dob': _dob_to_storage(payload.dob),
        'mobile': payload.mobile,
        'email': email,
        'address': payload.address.strip(),
        'role': 'user',
        'password': hash_password(payload.password),
        'created_at': datetime.now(timezone.utc),
    }

    try:
        users.insert_one(user_doc)
    except DuplicateKeyError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='Email is already registered',
        ) from exc
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Database write failed. Please try again.',
        ) from exc

    return MessageResponse(message='User registered successfully')


@router.post('/login', response_model=AuthResponse)
def login(payload: UserLogin):
    email = payload.email.strip().lower()

    if email == ADMIN_EMAIL and payload.password == ADMIN_PASSWORD:
        admin_id = 'admin-static-id'
        token = create_access_token(user_id=admin_id, email=email, role='admin')
        admin_user = UserPublic(
            id=admin_id,
            first_name='Admin',
            last_name='User',
            dob=datetime(2000, 1, 1, tzinfo=timezone.utc).date(),
            mobile='0000000000',
            email=email,
            address='Admin Console',
            role='admin',
            created_at=datetime.now(timezone.utc),
        )
        return AuthResponse(access_token=token, role='admin', user=admin_user)

    users = get_users_collection()

    try:
        user_doc = users.find_one({'email': email})
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Database read failed. Please try again.',
        ) from exc
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid email or password',
        )

    if not verify_password(payload.password, user_doc['password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid email or password',
        )

    first_name = user_doc.get('first_name') or user_doc.get('name', '').split(' ')[0] or 'User'
    last_name = user_doc.get('last_name') or 'Member'
    token = create_access_token(user_id=user_doc['id'], email=user_doc['email'], role='user')
    user = UserPublic(
        id=user_doc['id'],
        first_name=first_name,
        last_name=last_name,
        dob=_dob_to_response(user_doc.get('dob')),
        mobile=user_doc.get('mobile') or '0000000000',
        email=user_doc['email'],
        address=user_doc.get('address') or 'Not Provided',
        role=user_doc.get('role', 'user'),
        created_at=user_doc['created_at'],
    )

    return AuthResponse(access_token=token, role=user.role, user=user)


@router.get('/me', response_model=UserPublic)
def me(current_user: UserPublic = Depends(get_current_user)):
    return current_user
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from pymongo.errors import PyMongoError

try:
    from backend.database import get_district_videos_collection
    from backend.models.user import UserPublic
    from backend.utils.security import get_current_user
except ModuleNotFoundError:
    from database import get_district_videos_collection
    from models.user import UserPublic
    from utils.security import get_current_user

router = APIRouter(prefix='/api/videos', tags=['District Videos'])

ALLOWED_DISTRICTS = {'Salem', 'Dharmapuri', 'Krishnagiri', 'Namakkal'}


class DistrictVideoPayload(BaseModel):
    district: str = Field(min_length=2, max_length=40)
    video_url: str = Field(min_length=10, max_length=500)


class DistrictVideoResponse(BaseModel):
    district: str
    video_url: str


def _require_admin(current_user: UserPublic = Depends(get_current_user)) -> UserPublic:
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Admin access required')
    return current_user


def _serialize_video(doc: dict) -> dict[str, str]:
    return {
        'district': str(doc.get('district', '')).strip(),
        'video_url': str(doc.get('video_url', '')).strip(),
    }


@router.get('', response_model=list[DistrictVideoResponse])
def list_district_videos():
    collection = get_district_videos_collection()

    try:
        docs = collection.find({}, {'_id': 0, 'district': 1, 'video_url': 1}).sort('district', 1)
        return [_serialize_video(doc) for doc in docs]
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Failed to fetch district videos',
        ) from exc


@router.post('', response_model=DistrictVideoResponse)
def upsert_district_video(payload: DistrictVideoPayload, _: UserPublic = Depends(_require_admin)):
    district = payload.district.strip().title()
    video_url = payload.video_url.strip()

    if district not in ALLOWED_DISTRICTS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='District must be one of Salem, Dharmapuri, Krishnagiri, Namakkal',
        )

    collection = get_district_videos_collection()
    update_doc = {
        'district': district,
        'video_url': video_url,
        'updated_at': datetime.now(timezone.utc),
    }

    try:
        collection.update_one({'district': district}, {'$set': update_doc}, upsert=True)
        doc = collection.find_one({'district': district}, {'_id': 0, 'district': 1, 'video_url': 1})
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Failed to save district video',
        ) from exc

    if not doc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Saved video not found')

    return _serialize_video(doc)

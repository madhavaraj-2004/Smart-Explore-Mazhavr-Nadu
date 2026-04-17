from fastapi import APIRouter, Depends

try:
    from backend.models.user import UserPublic
    from backend.routes.admin import _require_admin, get_all_users
    from backend.routes.videos import (
        DistrictVideoPayload,
        DistrictVideoResponse,
        upsert_district_video,
        list_district_videos,
    )
except ModuleNotFoundError:
    from models.user import UserPublic
    from routes.admin import _require_admin, get_all_users
    from routes.videos import (
        DistrictVideoPayload,
        DistrictVideoResponse,
        upsert_district_video,
        list_district_videos,
    )

router = APIRouter(tags=['Compatibility'])


@router.get('/users')
def users_alias(current_user: UserPublic = Depends(_require_admin)):
    return get_all_users(current_user)


@router.get('/videos', response_model=list[DistrictVideoResponse])
def list_videos_alias():
    return list_district_videos()


@router.post('/videos', response_model=DistrictVideoResponse)
def upsert_videos_alias(payload: DistrictVideoPayload, current_user: UserPublic = Depends(_require_admin)):
    return upsert_district_video(payload, current_user)

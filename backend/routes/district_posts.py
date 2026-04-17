import base64
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from pymongo.errors import PyMongoError

try:
    from backend.database import get_district_posts_collection
    from backend.models.district_post import DistrictPost
except ModuleNotFoundError:
    from database import get_district_posts_collection
    from models.district_post import DistrictPost

router = APIRouter(prefix='/district-posts', tags=['District Posts'])

ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/webp'}
MAX_IMAGE_SIZE_BYTES = 3 * 1024 * 1024


def _make_data_url(mime_type: str, payload: bytes) -> str:
    encoded = base64.b64encode(payload).decode('utf-8')
    return f'data:{mime_type};base64,{encoded}'


def _parse_doc(doc: dict) -> DistrictPost:
    return DistrictPost(
        id=doc['id'],
        district=doc['district'],
        title=doc['title'],
        description=doc['description'],
        image_data_url=doc.get('image_data_url'),
        created_at=doc['created_at'],
        updated_at=doc['updated_at'],
    )


@router.post('', response_model=DistrictPost, status_code=status.HTTP_201_CREATED)
async def create_district_post(
    district: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile | None = File(default=None),
):
    now = datetime.now(timezone.utc)
    item_id = str(uuid4())

    image_data_url = None
    if image and image.filename:
        if image.content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Only JPG, PNG, and WEBP images are allowed')

        data = await image.read()
        if len(data) > MAX_IMAGE_SIZE_BYTES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Image must be 3MB or less')
        image_data_url = _make_data_url(image.content_type, data)

    doc = {
        '_id': item_id,
        'id': item_id,
        'district': district.strip(),
        'title': title.strip(),
        'description': description.strip(),
        'image_data_url': image_data_url,
        'created_at': now,
        'updated_at': now,
    }

    try:
        collection = get_district_posts_collection()
        collection.insert_one(doc)
        return _parse_doc(doc)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Database is unavailable') from exc
    except PyMongoError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create post') from exc


@router.get('', response_model=list[DistrictPost])
def list_district_posts(district: str | None = None):
    query = {}
    if district:
        query['district'] = district

    try:
        collection = get_district_posts_collection()
        docs = collection.find(query).sort('created_at', -1)
        return [_parse_doc(doc) for doc in docs]
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Database is unavailable') from exc
    except PyMongoError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to fetch posts') from exc


@router.get('/{post_id}', response_model=DistrictPost)
def get_district_post(post_id: str):
    try:
        collection = get_district_posts_collection()
        doc = collection.find_one({'id': post_id})
        if not doc:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Post not found')
        return _parse_doc(doc)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Database is unavailable') from exc
    except PyMongoError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to fetch post') from exc


@router.put('/{post_id}', response_model=DistrictPost)
async def update_district_post(
    post_id: str,
    district: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile | None = File(default=None),
):
    try:
        collection = get_district_posts_collection()
        existing = collection.find_one({'id': post_id})
        if not existing:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Post not found')

        image_data_url = existing.get('image_data_url')
        if image and image.filename:
            if image.content_type not in ALLOWED_MIME_TYPES:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Only JPG, PNG, and WEBP images are allowed')

            data = await image.read()
            if len(data) > MAX_IMAGE_SIZE_BYTES:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Image must be 3MB or less')
            image_data_url = _make_data_url(image.content_type, data)

        update_doc = {
            'district': district.strip(),
            'title': title.strip(),
            'description': description.strip(),
            'image_data_url': image_data_url,
            'updated_at': datetime.now(timezone.utc),
        }

        collection.update_one({'id': post_id}, {'$set': update_doc})
        updated = collection.find_one({'id': post_id})
        if not updated:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Post not found')
        return _parse_doc(updated)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Database is unavailable') from exc
    except PyMongoError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to update post') from exc


@router.delete('/{post_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_district_post(post_id: str):
    try:
        collection = get_district_posts_collection()
        result = collection.delete_one({'id': post_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Post not found')
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Database is unavailable') from exc
    except PyMongoError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to delete post') from exc

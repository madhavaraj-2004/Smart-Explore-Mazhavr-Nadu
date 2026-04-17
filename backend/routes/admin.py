import csv
import io
from datetime import date, datetime, time, timezone
from typing import Iterator

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from bson import ObjectId
from pymongo.errors import PyMongoError

try:
    from backend.database import get_users_collection
    from backend.models.user import UserPublic
    from backend.utils.security import get_current_user
except ModuleNotFoundError:
    from database import get_users_collection
    from models.user import UserPublic
    from utils.security import get_current_user

router = APIRouter(prefix='/admin', tags=['Admin'])


def _require_admin(current_user: UserPublic = Depends(get_current_user)) -> UserPublic:
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Admin access required')
    return current_user


def _serialize_user(user_doc: dict) -> dict:
    dob_value = user_doc.get('dob')
    if isinstance(dob_value, datetime):
        dob_value = dob_value.date().isoformat()
    elif dob_value is None:
        dob_value = ''
    else:
        dob_value = str(dob_value)

    created_at = user_doc.get('created_at')
    created_at_value = created_at.isoformat() if isinstance(created_at, datetime) else str(created_at or '')

    return {
        'id': str(user_doc.get('id') or user_doc.get('_id') or ''),
        'first_name': user_doc.get('first_name', ''),
        'last_name': user_doc.get('last_name', ''),
        'email': user_doc.get('email', ''),
        'mobile': user_doc.get('mobile', ''),
        'address': user_doc.get('address', ''),
        'district': user_doc.get('district', ''),
        'dob': dob_value,
        'role': user_doc.get('role', 'user'),
        'created_at': created_at_value,
    }


def _parse_date_range(from_date: str | None, to_date: str | None) -> dict:
    query: dict = {}
    created_at_filter: dict = {}

    if from_date:
        parsed_from = date.fromisoformat(from_date)
        created_at_filter['$gte'] = datetime.combine(parsed_from, time.min, tzinfo=timezone.utc)

    if to_date:
        parsed_to = date.fromisoformat(to_date)
        created_at_filter['$lte'] = datetime.combine(parsed_to, time.max, tzinfo=timezone.utc)

    if created_at_filter:
        query['created_at'] = created_at_filter

    return query


CSV_EXPORT_FIELDS = [
    'first_name',
    'last_name',
    'dob',
    'mobile',
    'email',
    'address',
    'role',
    'created_at',
]


def _csv_cell_value(value: object) -> str:
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.astimezone(timezone.utc).date().isoformat()
    if isinstance(value, date):
        return value.isoformat()
    if value is None:
        return ''
    return str(value)


def _csv_row_from_document(user_doc: dict, fieldnames: list[str]) -> list[str]:
    return [_csv_cell_value(user_doc.get(fieldname, '')) for fieldname in fieldnames]


def _stream_csv(cursor) -> Iterator[str]:
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(CSV_EXPORT_FIELDS)
    yield output.getvalue()
    output.seek(0)
    output.truncate(0)

    for user_doc in cursor:
        writer.writerow(_csv_row_from_document(user_doc, CSV_EXPORT_FIELDS))
        yield output.getvalue()
        output.seek(0)
        output.truncate(0)


@router.get('/users')
def get_all_users(_: UserPublic = Depends(_require_admin)):
    users = get_users_collection()
    try:
        docs = users.find({}, {'password': 0}).sort('created_at', -1)
        user_list = [_serialize_user(doc) for doc in docs]
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Failed to fetch users',
        ) from exc

    return {'users': user_list}


@router.get('/users/count')
def get_users_count(_: UserPublic = Depends(_require_admin)):
    users = get_users_collection()
    try:
        total = users.count_documents({})

        start_of_day = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        new_today = users.count_documents({'created_at': {'$gte': start_of_day}})
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Failed to fetch user count',
        ) from exc

    return {'total_users': total, 'new_users': new_today}


@router.get('/analytics')
def get_analytics(_: UserPublic = Depends(_require_admin)):
    users = get_users_collection()

    district_pipeline = [
        {
            '$project': {
                'district': {
                    '$ifNull': ['$district', {'$ifNull': ['$address', 'Unknown']}],
                }
            }
        },
        {'$group': {'_id': '$district', 'count': {'$sum': 1}}},
        {'$project': {'_id': 0, 'district': '$_id', 'count': 1}},
        {'$sort': {'count': -1}},
    ]

    age_group_pipeline = [
        {
            '$project': {
                'age': {
                    '$dateDiff': {
                        'startDate': '$dob',
                        'endDate': '$$NOW',
                        'unit': 'year',
                    }
                }
            }
        },
        {
            '$project': {
                'age_group': {
                    '$switch': {
                        'branches': [
                            {'case': {'$lt': ['$age', 18]}, 'then': 'Under 18'},
                            {'case': {'$lt': ['$age', 26]}, 'then': '18-25'},
                            {'case': {'$lt': ['$age', 36]}, 'then': '26-35'},
                            {'case': {'$lt': ['$age', 46]}, 'then': '36-45'},
                            {'case': {'$lt': ['$age', 61]}, 'then': '46-60'},
                        ],
                        'default': '60+',
                    }
                }
            }
        },
        {'$group': {'_id': '$age_group', 'count': {'$sum': 1}}},
        {'$project': {'_id': 0, 'age_group': '$_id', 'count': 1}},
    ]

    signup_trend_pipeline = [
        {
            '$project': {
                'signup_date': {
                    '$dateToString': {'format': '%Y-%m-%d', 'date': '$created_at'}
                }
            }
        },
        {'$group': {'_id': '$signup_date', 'count': {'$sum': 1}}},
        {'$project': {'_id': 0, 'date': '$_id', 'count': 1}},
        {'$sort': {'date': 1}},
    ]

    try:
        by_district = list(users.aggregate(district_pipeline))
        by_age_group = list(users.aggregate(age_group_pipeline))
        signups_by_date = list(users.aggregate(signup_trend_pipeline))
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Failed to fetch analytics',
        ) from exc

    return {
        'users_by_district': by_district,
        'users_by_age_group': by_age_group,
        'signup_count_by_date': signups_by_date,
    }


@router.get('/export')
def export_users_csv(
    _: UserPublic = Depends(_require_admin),
    from_date: str | None = Query(default=None),
    to_date: str | None = Query(default=None),
):
    users = get_users_collection()
    query = _parse_date_range(from_date, to_date)

    try:
        docs = users.find(
            query,
            {
                '_id': 0,
                'first_name': 1,
                'last_name': 1,
                'dob': 1,
                'mobile': 1,
                'email': 1,
                'address': 1,
                'role': 1,
                'created_at': 1,
                'password': 0,
            },
        ).sort('created_at', -1).batch_size(1000)
    except PyMongoError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Failed to export users',
        ) from exc

    return StreamingResponse(
        _stream_csv(iter(docs)),
        media_type='text/csv',
        headers={'Content-Disposition': 'attachment; filename=users.csv'},
    )

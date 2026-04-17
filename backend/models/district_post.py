from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class DistrictPostBase(BaseModel):
    district: str = Field(min_length=2, max_length=60)
    title: str = Field(min_length=2, max_length=120)
    description: str = Field(min_length=2, max_length=2000)


class DistrictPostCreate(DistrictPostBase):
    pass


class DistrictPostUpdate(BaseModel):
    district: Optional[str] = Field(default=None, min_length=2, max_length=60)
    title: Optional[str] = Field(default=None, min_length=2, max_length=120)
    description: Optional[str] = Field(default=None, min_length=2, max_length=2000)


class DistrictPost(DistrictPostBase):
    id: str
    image_data_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

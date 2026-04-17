from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UserSignup(BaseModel):
    first_name: str = Field(min_length=2, max_length=60)
    last_name: str = Field(min_length=1, max_length=60)
    dob: date
    mobile: str = Field(min_length=10, max_length=15)
    email: EmailStr
    address: str = Field(min_length=3, max_length=250)
    password: str = Field(min_length=6, max_length=128)

    @field_validator('mobile')
    @classmethod
    def validate_mobile(cls, value: str) -> str:
        digits_only = ''.join(char for char in value if char.isdigit())
        if len(digits_only) != 10:
            raise ValueError('Mobile number must contain exactly 10 digits')
        return digits_only


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class UserPublic(BaseModel):
    id: str
    first_name: str
    last_name: str
    dob: date
    mobile: str
    email: EmailStr
    address: str
    role: str = 'user'
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    role: str
    user: UserPublic


class MessageResponse(BaseModel):
    message: str
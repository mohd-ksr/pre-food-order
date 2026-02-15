from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    password: str

class LoginRequest(BaseModel):
    identifier: str   # phone or email
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    name: str
    role: str

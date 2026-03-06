from datetime import datetime

from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class VerifyRequest(BaseModel):
    payload: str


class VerifyResponse(BaseModel):
    verified: bool
    qr_id: str | None = None
    message: str
    failure_reason: str | None = None


class ScanHistoryItem(BaseModel):
    id: int
    qr_payload: str
    verification_result: str
    failure_reason: str | None
    scanned_at: datetime

    model_config = {"from_attributes": True}


class ScanHistoryResponse(BaseModel):
    scans: list[ScanHistoryItem]
    total: int


class MessageResponse(BaseModel):
    message: str


class PushTokenRequest(BaseModel):
    token: str

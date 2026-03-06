from fastapi import APIRouter, Depends

from ..auth import get_current_user
from ..models import User
from ..schemas import MessageResponse, PushTokenRequest

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])


@router.post("/register-token", response_model=MessageResponse)
def register_push_token(
    request: PushTokenRequest,
    current_user: User = Depends(get_current_user),
):
    # In production, store the token associated with the user for push notifications
    # via Firebase Cloud Messaging or APNs
    return MessageResponse(message="Push notification token registered successfully")

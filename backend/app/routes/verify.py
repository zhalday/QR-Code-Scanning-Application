from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_user
from ..database import get_db
from ..models import QRCode, ScanLog, User
from ..schemas import ScanHistoryResponse, VerifyRequest, VerifyResponse

router = APIRouter(prefix="/api", tags=["Verification"])


@router.post("/verify", response_model=VerifyResponse)
def verify_qr_code(
    request: VerifyRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not request.payload or not request.payload.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="QR code payload cannot be empty",
        )

    qr_code = db.query(QRCode).filter(QRCode.payload == request.payload).first()

    if qr_code and qr_code.is_valid:
        scan_log = ScanLog(
            user_id=current_user.id,
            qr_payload=request.payload,
            verification_result="valid",
        )
        db.add(scan_log)
        db.commit()
        return VerifyResponse(
            verified=True,
            qr_id=str(qr_code.id),
            message="QR code verified successfully",
        )

    failure_reason = "QR code not found in the system" if not qr_code else "QR code has been invalidated"
    scan_log = ScanLog(
        user_id=current_user.id,
        qr_payload=request.payload,
        verification_result="invalid",
        failure_reason=failure_reason,
    )
    db.add(scan_log)
    db.commit()
    return VerifyResponse(
        verified=False,
        message="QR code verification failed",
        failure_reason=failure_reason,
    )


@router.get("/scan-history", response_model=ScanHistoryResponse)
def get_scan_history(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    scans = (
        db.query(ScanLog)
        .filter(ScanLog.user_id == current_user.id)
        .order_by(ScanLog.scanned_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    total = db.query(ScanLog).filter(ScanLog.user_id == current_user.id).count()
    return ScanHistoryResponse(scans=scans, total=total)

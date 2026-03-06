from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class QRCode(Base):
    __tablename__ = "qr_codes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    payload: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    is_valid: Mapped[bool] = mapped_column(Boolean, default=True)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class ScanLog(Base):
    __tablename__ = "scan_logs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(nullable=False, index=True)
    qr_payload: Mapped[str] = mapped_column(Text, nullable=False)
    verification_result: Mapped[str] = mapped_column(String(50), nullable=False)
    failure_reason: Mapped[str | None] = mapped_column(String(500), nullable=True)
    scanned_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

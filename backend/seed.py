"""Seed script to create initial test data in the database."""

from app.auth import hash_password
from app.database import SessionLocal, engine
from app.models import Base, QRCode, User

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Create test user
if not db.query(User).filter(User.username == "admin").first():
    user = User(username="admin", hashed_password=hash_password("admin123"))
    db.add(user)

# Create sample QR codes
sample_codes = [
    QRCode(payload="QR-VALID-001", is_valid=True, description="Sample valid QR code 1"),
    QRCode(payload="QR-VALID-002", is_valid=True, description="Sample valid QR code 2"),
    QRCode(payload="QR-INVALID-001", is_valid=False, description="Sample invalidated QR code"),
]

for code in sample_codes:
    if not db.query(QRCode).filter(QRCode.payload == code.payload).first():
        db.add(code)

db.commit()
db.close()

print("Database seeded successfully.")

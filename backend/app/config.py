from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "mysql+pymysql://user:password@localhost:3306/qr_verification"
    SECRET_KEY: str = "change-this-to-a-secure-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    FIREBASE_CREDENTIALS_PATH: str = ""

    model_config = {"env_file": ".env"}


settings = Settings()

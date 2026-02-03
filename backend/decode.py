import os
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()
def create_token(user_id: int) -> str:
    secret = os.getenv("SECRET_KEY")
    if not secret:
        raise RuntimeError("SECRET_KEY manquante")

    algo = os.getenv("ALGORITHM", "HS256")

    payload = {
        "id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    return jwt.encode(payload, secret, algorithm=algo)

def decode_token(token: str) :
    secret = os.getenv("SECRET_KEY")
    if not secret:
        raise HTTPException(status_code=500, detail="SECRET_KEY manquante (env non chargé)")

    algorithm = os.getenv("ALGORITHM", "HS256")

    try:
        payload = jwt.decode(token, secret, algorithms=[algorithm])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials  # le texte après "Bearer "
    payload = decode_token(token)

    # ton token peut contenir "id" ou "user_id"
    user_id = payload.get("id") or payload.get("user_id")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Token sans id")

    return int(user_id)

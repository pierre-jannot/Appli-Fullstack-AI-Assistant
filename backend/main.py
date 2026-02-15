from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
import uvicorn
import database
import decode

from pathlib import Path
from dotenv import load_dotenv
from decode import create_token
from pydantic import BaseModel, Field, EmailStr
from ai_client import ask_ai

ENV_PATH = Path(__file__).resolve().parent.parent / ".env"  #chemin pour acceder au env 
load_dotenv(dotenv_path=ENV_PATH)

app=FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # ← accepte GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)

#Basemodel:

class LoginBody(BaseModel):
    email : EmailStr = Field(..., min_length=5, max_length=254)
    password : str = Field(..., min_length=12, max_length=72)

class RegisterBody(BaseModel):
    email : EmailStr = Field(..., min_length=5, max_length=254)
    password : str = Field(..., min_length=12, max_length=72)
    name : str = Field(..., min_length=3, max_length=50)
    surname : str = Field(..., min_length=3, max_length=50)

class ChatBody(BaseModel):
    prompt: str = Field(..., min_length=5, max_length=300)

@app.post("/login")
def login(body:LoginBody):
    try:
        user = database.verifyPassword(body)
        token = create_token(user["id"])
        return {"access_token": token}
    except:
        raise HTTPException(status_code=401, detail="L'email ou le mot de passe renseigné n'est pas valide.")

@app.post("/register")
def register(body: RegisterBody):
    try:
        user = database.addUser(body)
        token = create_token(user["id"])
        return {"access_token": token}
    except ValueError:
        raise HTTPException(status_code=409, detail="L'email renseigné est déjà utilisé")

@app.get("/check-token")
def checkToken(user_id: int = Depends(decode.get_current_user_id)):
    return user_id

@app.get("/history")
def getHistory(user_id: int = Depends(decode.get_current_user_id)):
    try:
        history = database.getHistory(user_id)
        return {"history": history}
    except ValueError:
        raise HTTPException(status_code=401, detail="L'id donné n'est pas affecté")

@app.post("/chat")
def chat(body: ChatBody, user_id: int = Depends(decode.get_current_user_id)):
    try:
        answer = ask_ai(body.prompt)
        database.addHistory(user_id, {"prompt":body.prompt,"answer":answer})
        return {"answer": answer}
    except ValueError:
        raise HTTPException(status_code=401, detail="L'id donné n'est pas affecté")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

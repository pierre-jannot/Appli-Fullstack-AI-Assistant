from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
import uvicorn

from pathlib import Path
from dotenv import load_dotenv
from decode import create_token
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"  #chemin pour acceder au env 
load_dotenv(dotenv_path=ENV_PATH)
from pydantic import BaseModel
from ai_client import ask_ai

#Basemodel:

class LoginBody(BaseModel):
    email : str
    password : str

class RegisterBody(BaseModel):
    email:str
    password:str
    name : str
    surname : str

class HistoryBody(BaseModel):
   
    prompt:str
    answer:str

class ChatBody(BaseModel):
    message: str


ENV_PATH = Path(__file__).resolve().parent.parent / ".env"  #chemin pour acceder au env 
load_dotenv(dotenv_path=ENV_PATH)

import database
import decode

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

@app.get("/")
def root():
    return {"salut"}

@app.post("/login")
def login(body:LoginBody):
    user = database.verifyPassword(body)

    if not user:
        raise HTTPException(status_code=401, detail="email ou mdp invalide")
    
    token = create_token(user["id"])
    return {"access_token": token}

@app.post("/register")
def register(body: RegisterBody):
    user = database.addUser(body)

    if not user:
        raise HTTPException(status_code=409, detail="email déja utilisé")
    
    token = create_token(user["id"])
    return {"access_token": token}
  
@app.post("/history")
def writeHistory(body:HistoryBody, user_id: int = Depends(decode.get_current_user_id)):
    user = database.addHistory(user_id, body)

@app.post("/chat")
def chat(body: ChatBody):
    try:
        answer = ask_ai(body.message)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

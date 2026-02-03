from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import uvicorn
from pathlib import Path
from dotenv import load_dotenv
from decode import create_token


ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

import database
import decode




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


app=FastAPI()

@app.get("/")
def root():
    return {"salut"}



@app.post("/login")
def login(body: LoginBody):
    user = database.verifyPassword(body.email,body.password)

    if not user:
        raise HTTPException(status_code=401, detail="email ou mdp invalide")
    
    token = create_token(user["id"])
    return {"access_token": token}


@app.post("/register")
def register(body: RegisterBody):
    user = database.addUser(email=body.email, password=body.password, name=body.name, surname=body.surname)

    if not user:
        raise HTTPException(status_code=409, detail="email déja utilisé")

    return ("l'utilisateur a été ajouté avec succès")

@app.post("/history")
def writeHistory(body:HistoryBody,  user_id: int = Depends(decode.get_current_user_id)):
    user = database.addHistory(user_id, prompt=body.prompt, answer=body.answer)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

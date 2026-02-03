from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
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

class JHistoryBody(BaseModel):
    prompt:str
    answer:str


app=FastAPI()

origins = [
    "http://localhost:5173"
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
def login(body: LoginBody):
    user = database.verifyPassword(body.email,body.password)

    if not user:
        raise HTTPException(status_code=401, detail="email ou mdp invalide")
    
    return {"id": user["id"],
            "email": user["email"],
            "name" : user["name"],
            "surname": user["surname"]
            }

@app.post("/register")
def register(body: RegisterBody):
    user = database.addUser(email=body.email, password=body.password, name=body.name, surname=body.surname)

    if not user:
        raise HTTPException(status_code=409, detail="email déja utilisé")

    return ("l'utilisateur a été ajouté avec succès")

# @app.post("/history")
# def writeHistory(body:historyBody):
#     user = database.addHistory(id=, prompt=body.prompt, answer=body.answer)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

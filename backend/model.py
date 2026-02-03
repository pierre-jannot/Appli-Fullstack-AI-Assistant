from pydantic import BaseModel



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

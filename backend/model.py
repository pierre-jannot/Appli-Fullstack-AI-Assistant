
#Basemodel:

class LoginBody:
    email : str
    password : str

class RegisterBody:
    email:str
    password:str
    name : str
    surname : str

class HistoryBody:
    prompt:str
    answer:str
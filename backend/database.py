from tinydb import TinyDB, Query
from datetime import datetime
import bcrypt
import uuid
import model
from fastapi import HTTPException
db = TinyDB('./database/database.json', indent=2)
users = db.table('users')
history = db.table('history')
User = Query()

# Fonction d'ajout d'utilisateur à la base de données
def addUser(body:model.RegisterBody):
    emailCheck = users.search(User.email == body.email)
    id = str(uuid.uuid4())
    if not emailCheck:
        users.insert(
            {
                "id":id,
                "email":body.email,
                "password":bcrypt.hashpw(body.password.encode('utf-8'),bcrypt.gensalt()).decode(),
                "name":body.name,
                "surname":body.surname
            }
        )
        return users.get(User.id == id)
    else:
        raise HTTPException(status_code=409, detail="L'email renseigné est déjà utilisé")
    
# Fonction d'ajout d'historique à la base de données
def addHistory(id,body:model.HistoryBody):
    userCheck = users.get(User.id == id)
    newPrompt = {
                "idprompt": 1,
                "prompt": body["prompt"],
                "answer": body["answer"],
                "time" : datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
    if userCheck:
        userHistory = history.get(User.id == id)
        if userHistory:
            newPrompt["idprompt"] = max(prompts["idprompt"] for prompts in userHistory["history"]) + 1
            updatedHistory = userHistory["history"] + [newPrompt]
            history.update({"history": updatedHistory}, User.id == id)
        else:
            history.insert({
                "id":id,
                "history": [newPrompt]
            })
    else:
        raise HTTPException(status_code=401, detail="L'id donné n'est pas affecté")
    
def getHistory(id):
    userCheck = users.get(User.id == id)
    if userCheck:
        userHistory = history.get(User.id == id)
        if userHistory:
            return userHistory["history"]
        else:
            return userHistory
    else:
        raise HTTPException(status_code=401, detail="L'id donné n'est pas affecté")

def verifyPassword(body:model.LoginBody):
    user = users.get(User.email == body.email)
    try:
        access_granted = bcrypt.checkpw(body.password.encode("utf-8"), user["password"].encode("utf-8"))
        if access_granted:
            return user
        else:
            raise ValueError
    except:
        raise Exception
    



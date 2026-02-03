from tinydb import TinyDB, Query
from datetime import datetime
import bcrypt
import uuid
import modele
db = TinyDB('./database/test-database.json', indent=2)


users = db.table('users')
history = db.table('history')
User = Query()

# Fonction d'ajout d'utilisateur à la base de données
def addUser(body:modele.RegisterBody):
    emailCheck = users.search(User.email == modele.RegisterBody.email)
    if not users.all():
        id = 1
    else:
        id = str(uuid.uuid4())
    if not emailCheck:
        users.insert(
            {
                "id":id,
                "email":modele.RegisterBody.email,
                "password":bcrypt.hashpw(modele.RegisterBody.password.encode('utf-8'),bcrypt.gensalt()).decode(),
                "name":modele.RegisterBody.name,
                "surname":modele.RegisterBody.surname
            }
        )
        print("User added successfully.")
        return True
    else:
        print("This email is already taken.")
        return False
    
# Fonction d'ajout d'historique à la base de données
def addHistory(id,body:modele.HistoryBody):
    userCheck = users.search(User.id == id)
    newPrompt = {
                "idprompt": 1,
                "prompt": modele.HistoryBody.prompt,
                "answer": modele.HistoryBody.answer,
                "time" : datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
    if userCheck:
        userHistory = history.search(User.id == id)
        if userHistory:
            userHistory = userHistory[0]
            newPrompt["idprompt"] = max(prompts["idprompt"] for prompts in userHistory["history"]) + 1
            updatedHistory = userHistory["history"] + [newPrompt]
            history.update({"history": updatedHistory}, User.id == id)
        else:
            history.insert({
                "id":id,
                "history": [newPrompt]
            })
        print("History added successfully.")
        return True
    else:
        print("No user with this id.")
        return False

def verifyPassword(body:modele.LoginBody):
    user = users.get(User.email == modele.LoginBody.email)
    if not user:
        return None

    if bcrypt.checkpw(modele.LoginBody.password.encode("utf-8"), user["password"].encode("utf-8")):
        return user   # OK
    return None     # no


#Commandes de test
# addUser("test","test","test","test")
# addUser("test","test","test","test")
# addUser("test2","test","test","test")
# addUser("test3","teste","test","test")
# addHistory(1,"prompt","answer")
# addHistory(1,"prompt2","answer2")
# addHistory(12,"prompt","answer")

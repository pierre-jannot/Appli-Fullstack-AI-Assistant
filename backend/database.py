from tinydb import TinyDB, Query

db = TinyDB('./backend/database/test-database.json', indent=2)

users = db.table('users')
history = db.table('history')
User = Query()

print(users.search(User.email=="test.emal@tinydb.com"))

def insertUser(email,password,name,surname):
    emailCheck = users.search(User.email == email)
    id = max(user['id'] for user in users.all()) + 1
    if not emailCheck:
        users.insert(
            {
                "id":id,
                "email":email,
                "password":password,
                "name":name,
                "surname":surname
            }
        )


# users.insert({
#     "id":1,
#     "email":"test.email@tinydb.com",
#     "password":"password",
#     "name":"Will",
#     "surname":"Smith"
#     })

# history.insert({
#     "id":1,
#     "history":
#     [
#         {
#             "idprompt":1,
#             "prompt":"Bonjour",
#             "answer":"Au revoir",
#             "time":"2026-02-02-11-40"
#         }
#     ]
# })

#db.table('users').remove(User.id == 1)
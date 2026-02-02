from tinydb import TinyDB, Query

db = TinyDB('./backend/database/test-database.json', indent=2)

users = db.table('users')
history = db.table('history')
User = Query()

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
        print("User added successfully.")
        return True
    else:
        print("This email is already taken.")
        return False
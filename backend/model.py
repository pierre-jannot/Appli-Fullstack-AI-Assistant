class User:
    def __init__(self, email, password_hash, name, surname):
        self.email = email
        self.password_hash = password_hash
        self.name = name
        self.surname = surname

class Login:
    def __init__(self, email, password):
        self.email = email
        self.password = password

class History:
    def __init__(self, prompt, answer):
        self.prompt = prompt
        self.answer = answer
# Appli-Fullstack-AI-Assistant

## Installation des dépendances

### React Vite - lancement dans frontend
npm install vite

### React Router Dom - lancement dans le frontend
npm install react-router-dom

### TinyDB
python -m pip install tinydb

### Bcrypt
python -m pip install bcrypt

## Lancement de React dans frontend :

npm run dev

## Structure du JSON :

Objet utilisateur :

[
    {
        "id":id,
        "email":email,
        "password":password,
        "name":name,
        "surname":surname
    }
]

Objet historique :

[
    {
        "id":id,
        "history":
        [
            {
                "idprompt":idprompt1,
                "prompt":prompt1,
                "answer":answer1,
                "time":time1
            },
            {
                "idprompt":idprompt2,
                "prompt":prompt2,
                "answer":answer2,
                "time":time2
            },...
        ]
    }
]
# Appli-Fullstack-AI-Assistant

## Installation des dépendances

### React Vite - lancement dans frontend
cd frontend
npm install

### React Router Dom - lancement dans le frontend
npm install react-router-dom

### TinyDB
python -m pip install tinydb

### Bcrypt
python -m pip install bcrypt

### JWT
python -m pip install jwt

### PYJWT
python -m pip install pyjwt

### LLM OPENAI
python -m pip install openai

## Variables environnement à stocker dans un fichier .env
Dans un fichier .env situé à la racine du projet, stocker les variables suivantes :
SECRET_KEY=value, value étant une chaîne de caractères hexadécimaux d'une longueur de 64 caractères (soit 256 bits)
OPENROUTER_API_KEY=value, value étant une API key générée sur https://openrouter.ai/ via la redirection "Get API Key"

## Lancement du projet

### Lancement de React dans frontend :
cd frontend
npm run dev

### Lancement de uvicorn dans le backend :
cd backend
python -m uvicorn main:app --reload

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
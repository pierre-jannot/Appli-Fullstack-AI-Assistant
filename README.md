# Appli-Fullstack-AI-Assistant

## Installation des dépendances

### TinyDB
python -m pip install tinydb

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
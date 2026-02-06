from pathlib import Path
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, select
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime

import bcrypt

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "app.db"

engine = create_engine(f"sqlite:///{DB_PATH}")
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)

class Conversation(Base):
    __tablename__ = 'conversations'
    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('users.id'), nullable=False)

class History(Base):
    __tablename__ = 'histories'
    id = Column(Integer, primary_key=True)
    conversationId = Column(Integer, ForeignKey('conversations.id'), nullable=False)
    prompt = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    time = Column(String, nullable=False)

Base.metadata.create_all(engine)

def addUser(email, password, name, surname):
    user = User(email=email, password=password, name=name, surname=surname)
    session.add(user)
    session.commit()

def addConversation(userId):
    conversation = Conversation(userId=userId)
    session.add(conversation)
    session.commit()

def addHistory(conversationId, prompt, answer, time):
    history = History(conversationId=conversationId, prompt=prompt, answer=answer, time=time)
    session.add(history)
    session.commit()

def verifyPassword(email,password):
    user = session.query(User).filter(User.email == email).first()
    if user.password == password:
        return True
    else:
        return False

def createBaseUser():
    addUser("pierre.jannot@isen.yncrea.fr","testtesttest","Pierre","Jannot")
    addConversation(1)
    addHistory(1,"Bonjour !","Au revoir !",datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

print(session.get(User,1).email)
print(verifyPassword("pierre.jannot@isen.yncrea.fr","testtesttest"))
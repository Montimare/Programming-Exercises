from ..Database import db_session
from User import User


def save_user(name, email):
    user = User(name=name, email=email)
    db_session.add(user)
    db_session.commit()
    return user


def get_user_by_id(user_id):
    return db_session.query(User).filter(User.id == user_id).first()


def get_user_list():
    return db_session.query(User).all()

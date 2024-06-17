from ..Database import db_session
from .User import User
from sqlalchemy.exc import IntegrityError


def save_user(name, email):
    user = User(name=name, email=email)
    try:
        db_session.add(user)
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Duplicate entry for User"
    return user


def get_user_by_id(user_id):
    return db_session.query(User).filter(User.id == user_id).first()


def get_user_list():
    return db_session.query(User).all()


def modify_user(user_id, name, email):
    user = db_session.query(User).filter(User.id == user_id).first()
    if user is None:
        return "Error: User not found"
    user.name = name
    user.email = email
    try:
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Integrity constraint violated"
    return user


def delete_user_by_id(user_id):
    user = db_session.query(User).filter(User.id == user_id).first()
    if user is None:
        return "Error: User not found"
    db_session.query(User).filter(User.id == user_id).delete()
    db_session.commit()
    return

from ..Database import db_session
from .Group import Group
from .User_Group import User_Group
from sqlalchemy.exc import IntegrityError


def save_group(name, admin_id):
    group = Group(name=name, admin_id=admin_id)
    try:
        db_session.add(group)
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Duplicate entry for Group"

    user_group = User_Group(user_id=admin_id, group_id=group.id)
    try:
        db_session.add(user_group)
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Duplicate entry for User_Group"

    return group


def get_group_by_id(group_id):
    return db_session.query(Group).filter(Group.id == group_id).first()


def get_group_list():
    return db_session.query(Group).all()


def add_user_to_group(user_id, group_id):
    user_group = User_Group(user_id=user_id, group_id=group_id)
    try:
        db_session.add(user_group)
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: User already in group or other Integrity constraint violated"
    return user_group


def modify_group(group_id, name, admin_id):
    group = db_session.query(Group).filter(Group.id == group_id).first()
    if group is None:
        return "Error: Group not found"
    group.name = name
    group.admin_id = admin_id
    try:
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Integrity constraint violated"
    return group


def delete_group_by_id(group_id):
    group = db_session.query(Group).filter(Group.id == group_id).first()
    if group is None:
        return "Error: Group not found"
    db_session.query(Group).filter(Group.id == group_id).delete()
    db_session.commit()
    return

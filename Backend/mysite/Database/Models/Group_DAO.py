from ..Database import db_session
from .Group import Group
from .User_Group import User_Group


def save_group(name, admin_id):
    group = Group(name=name, admin_id=admin_id)
    db_session.add(group)
    db_session.commit()
    user_group = User_Group(user_id=admin_id, group_id=group.id)
    db_session.add(user_group)
    db_session.commit()
    return group


def get_group_by_id(group_id):
    return db_session.query(Group).filter(Group.id == group_id).first()


def get_group_list():
    return db_session.query(Group).all()


def add_user_to_group(user_id, group_id):
    user_group = User_Group(user_id=user_id, group_id=group_id)
    db_session.add(user_group)
    db_session.commit()
    return user_group
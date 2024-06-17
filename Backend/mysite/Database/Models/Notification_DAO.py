from ..Database import db_session
from .Notification import Notification
from .Event import Event
from .User_Group import User_Group
from .Group_EventList import Group_EventList
from .Group import Group
from sqlalchemy.exc import IntegrityError


def save_notification(event_id, time):
    notification = Notification(event_id=event_id, time=time)
    try:
        db_session.add(notification)
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Duplicate entry for Notification"
    return notification


def get_notification_by_id(notification_id):
    return db_session.query(Notification).filter(Notification.id == notification_id).first()


def get_notifications_by_user_id(user_id):
    notifications = db_session.query(Notification).\
        join(Event, Event.id == Notification.event_id).\
        join(Group_EventList, Event.list_id == Group_EventList.event_list_id).\
        join(Group, Group.id == Group_EventList.group_id).\
        join(User_Group, Group.id == User_Group.group_id).\
        filter(User_Group.user_id == user_id).\
        all()
    return notifications


def get_notification_list():
    return db_session.query(Notification).all()


def get_notifications_by_event_id(event_id):
    return db_session.query(Notification).filter(Notification.event_id == event_id).all()


def delete_notification_by_id(notification_id):
    notification = db_session.query(Notification).filter(Notification.id == notification_id).first()
    if notification is None:
        return "Error: Notification not found"
    db_session.query(Notification).filter(Notification.id == notification_id).delete()
    db_session.commit()
    return


def modify_notification(notification_id, event_id, user_id, time):
    notification = db_session.query(Notification).filter(Notification.id == notification_id).first()
    if notification is None:
        return "Error: Notification not found"
    notification.event_id = event_id
    notification.user_id = user_id
    notification.time = time
    try:
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Integrity constraint violated"
    return notification

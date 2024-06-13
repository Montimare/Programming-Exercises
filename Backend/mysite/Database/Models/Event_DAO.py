from ..Database import db_session
from .Group_EventList import Group_EventList
from .User_Group import User_Group
from .Event import Event
from .Group import Group
from .User import User


def save_event(name, description, startTime, endTime, list_id):
    event = Event(name=name, description=description, startTime=startTime, endTime=endTime, list_id=list_id)
    db_session.add(event)
    db_session.commit()
    return event


def get_event_by_id(event_id):
    return db_session.query(Event).filter(Event.id == event_id).first()


def get_events_by_user_id(user_id):
    events = db_session.query(Event).\
        join(Group_EventList, Event.list_id == Group_EventList.event_list_id).\
        join(Group, Group.id == Group_EventList.group_id).\
        join(User_Group, Group.id == User_Group.group_id).\
        join(User, User.id == User_Group.user_id).\
        filter(User.id == user_id).\
        all()
    return events


def get_event_list():
    return db_session.query(Event).all()

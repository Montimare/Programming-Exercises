from ..Database import db_session
from .EventList import EventList
from .Group_EventList import Group_EventList


from .User_Group import User_Group


def save_event_list(name, admin_id, group_ids):
    eventList = EventList(name=name, admin_id=admin_id)
    db_session.add(eventList)
    db_session.commit()

    for group_id in group_ids:
        group_event_list = Group_EventList(group_id=group_id, event_list_id=eventList.id)
        db_session.add(group_event_list)
        db_session.commit()

    return eventList


def get_event_list_by_id(event_list_id):
    return db_session.query(EventList).filter(EventList.id == event_list_id).first()

def get_event_list_list():
    return db_session.query(EventList).all()

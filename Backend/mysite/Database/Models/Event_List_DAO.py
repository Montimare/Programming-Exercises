from ..Database import db_session
from .EventList import EventList
from .Group_EventList import Group_EventList
from sqlalchemy.exc import IntegrityError


def save_event_list(name, admin_id, group_ids):
    eventList = EventList(name=name, admin_id=admin_id)
    try:
        db_session.add(eventList)
        db_session.commit()
    except IntegrityError:
        db_session.rollback()
        return "Error: Duplicate entry"

    for group_id in group_ids:
        group_event_list = Group_EventList(group_id=group_id, event_list_id=eventList.id)
        try:
            db_session.add(group_event_list)
            db_session.commit()
        except IntegrityError:
            db_session.rollback()
            return "Error: Duplicate entry in Group_EventList"

    return eventList


def get_event_list_by_id(event_list_id):
    return db_session.query(EventList).filter(EventList.id == event_list_id).first()


def get_event_list_list():
    return db_session.query(EventList).all()


def delete_event_list_by_id(event_list_id):
    db_session.query(EventList).filter(EventList.id == event_list_id).delete()
    db_session.commit()
    return


def modify_event_list(event_list_id, name, admin_id):
    eventList = db_session.query(EventList).filter(EventList.id == event_list_id).first()
    eventList.name = name
    eventList.admin_id = admin_id
    db_session.commit()
    return eventList

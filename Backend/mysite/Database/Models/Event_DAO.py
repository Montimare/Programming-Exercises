from ..Database import db_session
from Event import Event


def save_event(name, description, startTime, endTime):
    event = Event(name=name, description=description, startTime=startTime, endTime=endTime)
    db_session.add(event)
    db_session.commit()
    return event


def get_event_by_id(event_id):
    return db_session.query(Event).filter(Event.id == event_id).first()


def get_event_list():
    return db_session.query(Event).all()

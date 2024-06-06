from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base

class Event_EventList(Base):
    __tablename__ = 'event_event_list'
    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey('event.id'), nullable=False)
    event_list_id = Column(Integer, ForeignKey('event_list.id'), nullable=False)

    event = relationship("Event", back_populates="event_lists")
    event_list = relationship("EventList", back_populates="events")

    def __init__(self, event_id, event_list_id, **kw):
        super().__init__(**kw)
        self.event_id = event_id
        self.event_list_id = event_list_id

    def __repr__(self):
        return f"<Event_EventList('{self.event_id}', '{self.event_list_id}')>"
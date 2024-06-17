from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base


class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), nullable=False)
    description = Column(String(256))
    startTime = Column(DateTime(timezone=True), nullable=False)
    endTime = Column(DateTime(timezone=True), nullable=False)
    list_id = Column(Integer, ForeignKey('event_list.id',ondelete='CASCADE'), nullable=False)

    notifications = relationship("Notification", back_populates="event")
    list = relationship("EventList", back_populates="events")

    def __init__(self, name, description, startTime, endTime, list_id, **kw):
        super().__init__(**kw)
        self.name = name
        self.description = description
        self.startTime = startTime
        self.endTime = endTime
        self.list_id = list_id

    def __repr__(self):
        return f"<Event('{self.name}', '{self.description}', '{self.startTime}', '{self.endTime}')>"

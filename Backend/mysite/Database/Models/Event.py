from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from ..Database import Base


class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), nullable=False)
    description = Column(String(256))
    startTime = Column(DateTime(timezone=True), nullable=False)
    endTime = Column(DateTime(timezone=True), nullable=False)

    event_lists = relationship("Event_EventList", back_populates="event")
    notifications = relationship("Notification", back_populates="event")

    def __init__(self, name, description, startTime, endTime, **kw):
        super().__init__(**kw)
        self.name = name
        self.description = description
        self.startTime = startTime
        self.endTime = endTime

    def __repr__(self):
        return f"<Event('{self.name}', '{self.description}', '{self.startTime}', '{self.endTime}')>"

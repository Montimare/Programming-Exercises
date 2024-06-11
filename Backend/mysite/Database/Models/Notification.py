from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from ..Database import Base


class Notification(Base):
    __tablename__ = 'notifications'
    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    time = Column(DateTime, nullable=False)

    event = relationship("Event", back_populates="notifications")

    def __init__(self, event_id, time, **kw):
        super().__init__(**kw)
        self.event_id = event_id
        self.time = time

    def __repr__(self):
        return f"<Notification('{self.event_id}', '{self.time}')>"

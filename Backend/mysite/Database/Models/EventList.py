from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base


class EventList(Base):
    __tablename__ = 'event_list'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), unique=True, nullable=False)
    admin_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    admin = relationship("User", back_populates="owned_lists")
    groups = relationship("Group_EventList", back_populates="event_list")
    events = relationship("Event", back_populates="list")

    def __init__(self, name, **kw):
        super().__init__(**kw)
        self.name = name

    def __repr__(self):
        return f"<EventList('{self.name}', admin_id='{self.admin.id}')>"

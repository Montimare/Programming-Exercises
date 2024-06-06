from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base

class User_EventList(Base):
    __tablename__ = 'user_event_list'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    event_list_id = Column(Integer, ForeignKey('event_list.id'), nullable=False)
    user = relationship("User", back_populates="event_lists")
    event_list = relationship("EventList", back_populates="users")

    def __init__(self, user_id, event_list_id, **kw):
        super().__init__(**kw)
        self.user_id = user_id
        self.event_list_id = event_list_id

    def __repr__(self):
        return f"<User_EventList('{self.user_id}', '{self.event_list_id}')>"
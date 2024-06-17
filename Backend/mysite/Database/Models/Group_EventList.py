from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base


class Group_EventList(Base):
    __tablename__ = 'group_event_list'
    id = Column(Integer, primary_key=True, autoincrement=True)
    group_id = Column(Integer, ForeignKey('group.id', ondelete='CASCADE'), nullable=False)
    event_list_id = Column(Integer, ForeignKey('event_list.id', ondelete='CASCADE'), nullable=False)

    group = relationship("Group", back_populates="event_lists")
    event_list = relationship("EventList", back_populates="groups")

    def __init__(self, group_id, event_list_id, **kw):
        super().__init__(**kw)
        self.group_id = group_id
        self.event_list_id = event_list_id

    def __repr__(self):
        return f"<Group_EventList('{self.group_id}', '{self.event_list_id}')>"
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..Database import Base


class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))

    event_lists = relationship("Group_EventList", back_populates="group")

    def __init__(self, name, **kw):
        super().__init__(**kw)
        self.name = name

    def __repr__(self):
        return '<Group %r>' % self.name

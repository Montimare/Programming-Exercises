from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base

class User_Group(Base):
    __tablename__ = 'user_group'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    group_id = Column(Integer, ForeignKey('group.id'), nullable=False)

    user = relationship("User", back_populates="event_lists")
    groups = relationship("Group", back_populates="users")

    def __init__(self, user_id, group_id, **kw):
        super().__init__(**kw)
        self.user_id = user_id
        self.group_id = group_id

    def __repr__(self):
        return f"<User_Group('{self.user_id}', '{self.group_id}')>"
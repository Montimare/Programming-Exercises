from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..Database import Base


class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), unique=True, nullable=False)
    admin_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    admin = relationship("User", back_populates="owned_groups")
    event_lists = relationship("Group_EventList", back_populates="group")
    users = relationship("User_Group", back_populates="group")

    def __init__(self, name, **kw):
        super().__init__(**kw)
        self.name = name

    def __repr__(self):
        member_ids = [str(user_group.user_id) for user_group in self.users]
        return '<Group id: %r, name: %r, Member IDs: %s>' % (self.id, self.name, ', '.join(member_ids))

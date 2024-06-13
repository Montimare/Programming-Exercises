from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..Database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), unique=True, nullable=False, index=True)
    email = Column(String(256), unique=True, nullable=False)

    owned_lists = relationship("EventList", back_populates="admin")
    groups = relationship("User_Group", back_populates="user")
    owned_groups = relationship("Group", back_populates="admin")

    def __init__(self, name, email, **kw):
        super().__init__(**kw)
        self.name = name
        self.email = email

    def __repr__(self):
        return '<User id: %r, name: %s>' % (self.id, self.name)

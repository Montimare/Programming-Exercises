from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..Database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), unique=True, nullable=False, index=True)
    email = Column(String(256), unique=True, nullable=False)
    phone = Column(String(256), unique=True, nullable=False)

    owned_groups = relationship("EventList", back_populates="admin")
    groups = relationship("User_Group", back_populates="user")

    def __init__(self, name, email, phone=None, **kw):
        super().__init__(**kw)
        self.name = name
        self.email = email
        self.phone = phone

    def __repr__(self):
        return '<User %r>' % self.name

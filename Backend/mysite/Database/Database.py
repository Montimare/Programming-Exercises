from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import URL


url_object = URL.create(
    "mysql",
    username="calendar_app",
    password="O0~p2ZF5;3j|CH@LGl+8VXi-N6#19=TO",  # plain (unescaped) text
    host="descus.de",
    port=3306,
    database="calendar_app"
)

engine = create_engine(url_object, echo=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

from . import Models


def init_db():
    Base.metadata.create_all(bind=engine)

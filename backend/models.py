from pickle import TRUE
from database import Base
from sqlalchemy import Column, Integer, String

class Study(Base):
    __tablename__="study"
    __table_args__ = {'extend_existing': True}
    study_id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    study_name = Column(String, index=True)
    study_description = Column(String, index=True)
    study_phase = Column(String, index=True)
    sponsor_name = Column(String, index=True,unique=True)




class Files(Base):
    __tablename__="files"
    __table_args__ = {'extend_existing': True}
    files_id = Column(Integer,primary_key=True)
    filesname = Column(String)

class FileTable(Base):
    __tablename__="file"
    id= Column(Integer,autoincrement=True,primary_key=True)
    files_id = Column(Integer)
    filesname = Column(String)

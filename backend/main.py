from fileinput import filename
from logging import exception
from venv import logger
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import FileTable, Study
from schema import Request
from fastapi.middleware.cors import CORSMiddleware
import uuid
import shutil
import os


Base.metadata.create_all(bind=engine)

app= FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
def health_check():
    return "Status healthy"

@app.post("/create_info")
def create_info(request: Request ,db:Session=Depends(get_db)):
    new_study=Study(study_name=request.study_name,study_description=request.study_description,study_phase=request.study_phase,sponsor_name=request.sponsor_name)
    db.add(new_study)
    db.commit()
    db.refresh(new_study)
    return new_study

@app.get("/get_info_all")
def retrieve_all(db:Session=Depends(get_db)):
    info=db.query(Study).all()
    return info


@app.get("/get_info_id/{id}")
def retrieve_id(id:int,db:Session=Depends(get_db)):
    new_info=db.query(Study).filter(Study.study_id==id).first()
    if not new_info:
        logger.info((f"No record found with id: {id}"))
    return new_info

@app.put("/update_info")
def update_info(id:int,request:Request,db:Session=Depends(get_db)):
    try:

        new_info=db.query(Study).filter(Study.study_id==id).first()
        new_info.study_name=request.study_name
        new_info.study_description=request.study_description
        new_info.study_phase=request.study_phase
        new_info.sponsor_name=request.sponsor_name
        db.commit()
        db.refresh(new_info)
        return new_info
    except exception:
        raise HTTPException(status_code=500,detail=f"Sponsor Id shud be unique")

@app.delete("/delete_info")
def delete_info(id:int,db:Session=Depends(get_db)):
    record=db.query(Study).filter(Study.study_id==id).first()
    if not record:
        logger.info((f"No record found with id: {id}")) 
    db.delete(record)
    db.commit()
    return record


@app.post("/upload_file")
def upload_files(id:int,files: list[UploadFile] = File(...),db:Session=Depends(get_db)):
    dir_name = f"./files/{uuid.uuid4()}/"
    os.makedirs(dir_name, exist_ok=True)
    for file in files: 
        file.file.seek(0)
        file_path = os.path.join(dir_name, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    print(file.filename)        
    new_file=FileTable(files_id=id,filesname=file.filename)
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    return files


@app.get("/files")
def get_files(uuid: str):
    dir_name = f"./files/{uuid}/"
    if not os.path.exists(dir_name):
        raise HTTPException(status_code=404, detail="Directory not found")
    files = os.listdir(dir_name)
    print(files)
    if not files:
        raise HTTPException(status_code=404, detail="No files found in this directory")
    return {"filename":files}

    
@app.get("/id_files")
def get_files_by_id(id: int, db: Session = Depends(get_db)):
    files = db.query(FileTable).filter(FileTable.files_id == id).all()
    if not files:
        raise HTTPException(status_code=404, detail="No files found with this id")
    return {"files": [{"filename": file.filesname} for file in files]}


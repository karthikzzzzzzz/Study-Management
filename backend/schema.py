from pydantic import BaseModel

class Request(BaseModel):
    study_name: str
    study_description: str
    study_phase: str
    sponsor_name: str

    
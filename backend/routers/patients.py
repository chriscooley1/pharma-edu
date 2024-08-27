from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_db
from exceptions import PatientNotFound
from models import Patient
from schemas import (
    PatientBasicInfo,
    PatientCreateRequest,
    PatientCreateResponse,
    PatientUpdateRequest
)

router = APIRouter()


@router.get("/patients/search")
async def search_patient(query: str, session: Session = Depends(get_db)):
    print(f"Received query: {query}, Type: {type(query)}")
    patient = session.query(Patient).filter(Patient.last_name.ilike(f"%{query}%")).first()
    if patient:
        return patient
    else:
        raise PatientNotFound(id=0)



@router.get("/patients/search")
async def search_patient(query: str, session: Session = Depends(get_db)):
    patient = session.query(Patient).filter(Patient.last_name.ilike(f"%{query}%")).first()
    if patient:
        return patient
    else:
        raise PatientNotFound(id=0)


@router.post("/patients")
async def create_patient(patient_create_request: PatientCreateRequest, session: Session = Depends(get_db)) -> PatientCreateResponse:
    patient: Patient = Patient.from_orm(patient_create_request)
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return PatientCreateResponse(patient_id=patient.id)


@router.patch("/patients/{patient_id}")
async def update_patient(patient_id: int, patient_update: PatientUpdateRequest, session: Session = Depends(get_db)):
    """ Update specific fields of a patient, but the patient needs to exist. All fields are optional. """
    patient: Patient | None = session.get(Patient, patient_id)
    if patient is None:
        raise PatientNotFound(id=patient_id)
    for attr, value in patient_update.model_dump(exclude_unset=True).items():
        setattr(patient, attr, value)
    session.add(patient)
    session.commit()
    session.refresh(patient)
    # TODO: Return a 204 or whatever


@router.delete("/patients/{patient_id}")
async def delete_patient(patient_id: int, session: Session = Depends(get_db)):
    patient: Patient | None = session.get(Patient, patient_id)
    if patient is None:
        raise PatientNotFound(id=patient_id)
    session.delete(patient)
    session.commit()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("", response_model=List[schemas.UserProfileResponse])
@router.get("/", response_model=List[schemas.UserProfileResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.UserProfile).all()

@router.get("/me", response_model=schemas.UserProfileResponse)
@router.get("/me/", response_model=schemas.UserProfileResponse)
def get_current_user_profile(db: Session = Depends(get_db)):
    user = db.query(models.UserProfile).first()
    if not user:
        raise HTTPException(status_code=404, detail="No user profile found")
    return user

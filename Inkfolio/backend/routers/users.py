from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas

router = APIRouter(prefix="/users", tags=["Users"])

def seed_mock_users_if_empty(db: Session):
    if db.query(models.UserProfile).count() == 0:
        sample_users = [
            models.UserProfile(
                name="Elena Vance",
                username="elenavance",
                email="elena@inkfolio.org",
                bio="Advocating for brutalist simplicity in an overcomplicated digital world. Editor in Chief at InkFolio.",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                is_author=True,
                is_verified=True,
                followers_count=14200,
                following_count=180
            ),
            models.UserProfile(
                name="Julian Thorne",
                username="jthorne",
                email="julian@inkfolio.org",
                bio="Architectural enthusiast & typography addict.",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                is_author=True,
                is_verified=True,
                followers_count=8900,
                following_count=210
            )
        ]
        db.add_all(sample_users)
        db.commit()

@router.get("/", response_model=List[schemas.UserProfileResponse])
def get_users(db: Session = Depends(get_db)):
    seed_mock_users_if_empty(db)
    return db.query(models.UserProfile).all()

@router.get("/me", response_model=schemas.UserProfileResponse)
def get_current_user_profile(db: Session = Depends(get_db)):
    seed_mock_users_if_empty(db)
    user = db.query(models.UserProfile).first()
    return user

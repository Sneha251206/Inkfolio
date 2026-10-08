from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict
from database import get_db
import models

router = APIRouter(prefix="/moderation", tags=["Moderation"])

@router.get("/queue")
@router.get("/queue/")
def get_moderation_queue(db: Session = Depends(get_db)):
    return db.query(models.ModerationItem).all()

@router.get("/payouts")
@router.get("/payouts/")
def get_payouts_summary(db: Session = Depends(get_db)):
    records = db.query(models.PayoutRecord).all()
    total_paid = sum(r.amount for r in records if r.status == "Completed")
    pending = sum(r.amount for r in records if r.status == "Pending")
    return {
        "pending_payouts": pending,
        "completed_this_month": total_paid,
        "authors_paid": len(set(r.author_name for r in records if r.status == "Completed")),
        "recent_transactions": records
    }

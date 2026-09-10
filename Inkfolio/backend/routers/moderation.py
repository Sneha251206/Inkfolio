from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict
from database import get_db

router = APIRouter(prefix="/moderation", tags=["Moderation"])

@router.get("/queue")
def get_moderation_queue(db: Session = Depends(get_db)):
    return [
        {"id": 1, "article_title": "Understanding Quantum Computing Paradigms", "author_name": "Marcus Vance", "reason": "Copyright Flag", "status": "Pending", "submitted_at": "2026-09-08T10:00:00"},
        {"id": 2, "article_title": "The Aesthetics of Urban Loneliness", "author_name": "Aria Chen", "reason": "Community Report", "status": "Under Review", "submitted_at": "2026-09-09T14:30:00"}
    ]

@router.get("/payouts")
def get_payouts_summary(db: Session = Depends(get_db)):
    return {
        "pending_payouts": 14250.00,
        "completed_this_month": 48900.50,
        "authors_paid": 128,
        "recent_transactions": [
            {"id": 101, "author": "Elena Vance", "amount": 1240.00, "status": "Processed", "date": "2026-09-01"},
            {"id": 102, "author": "Julian Thorne", "amount": 890.50, "status": "Processed", "date": "2026-09-01"},
            {"id": 103, "author": "Sarah Jenks", "amount": 2150.00, "status": "Processing", "date": "2026-09-05"}
        ]
    }

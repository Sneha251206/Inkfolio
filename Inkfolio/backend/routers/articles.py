from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas

router = APIRouter(prefix="/articles", tags=["Articles"])

@router.get("", response_model=List[schemas.ArticleResponse])
@router.get("/", response_model=List[schemas.ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    return db.query(models.Article).filter(models.Article.published == True).all()

@router.get("/{article_id}", response_model=schemas.ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article.views += 1
    db.commit()
    db.refresh(article)
    return article

@router.post("", response_model=schemas.ArticleResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=schemas.ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    db_article = models.Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

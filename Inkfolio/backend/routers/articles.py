from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas

router = APIRouter(prefix="/articles", tags=["Articles"])

# Initial mock data seeder helper
def seed_mock_articles_if_empty(db: Session):
    if db.query(models.Article).count() == 0:
        sample_articles = [
            models.Article(
                title="The Architecture of Deep Focus in the Digital Noise Age",
                subtitle="Why cognitive solitude is becoming the rarest intellectual currency of our century.",
                category="Deep Dive",
                content="Deep focus is no longer a luxury; it is the ultimate competitive advantage and intellectual sanctuary. In an era dominated by hyper-notification systems, infinite scroll feeds, and algorithmic dopamine loops, the capacity for sustained, uninterrupted cognition has become uniquely rare.\n\nTo construct an environment conducive to deep focus requires intentional boundaries. We must treat our attention not as a passive sponge, but as an active, highly curated gallery.",
                author_name="Elena Vance",
                author_role="Editor in Chief",
                author_avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                cover_image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
                read_time="8 min read",
                likes=1420,
                bookmarks=392,
                views=12400,
                published=True
            ),
            models.Article(
                title="Brutalist Design & The Return of Pure Typography",
                subtitle="Stripping away fluff to prioritize raw editorial narrative.",
                category="Design Culture",
                content="Minimalist editorial design is making a massive comeback. Clean serif headlines, structured grids, and thoughtful whitespace bring reading back to its fundamental essence.",
                author_name="Julian Thorne",
                author_role="Senior Design Critic",
                author_avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                cover_image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
                read_time="5 min read",
                likes=890,
                bookmarks=210,
                views=6700,
                published=True
            ),
            models.Article(
                title="Evidence-Based Narratives for an Intentional Life",
                subtitle="Exploring wellness through scientific rigor and slow journalism.",
                category="Health & Philosophy",
                content="Intentional living is not about doing less for the sake of it; it is about allocating your finite energy toward pursuits of lasting value.",
                author_name="Sarah Jenks",
                author_role="Health & Bioethics Contributor",
                author_avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
                cover_image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80",
                read_time="6 min read",
                likes=2150,
                bookmarks=640,
                views=18900,
                published=True
            )
        ]
        db.add_all(sample_articles)
        db.commit()

@router.get("/", response_model=List[schemas.ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    seed_mock_articles_if_empty(db)
    return db.query(models.Article).filter(models.Article.published == True).all()

@router.get("/{article_id}", response_model=schemas.ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    seed_mock_articles_if_empty(db)
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article.views += 1
    db.commit()
    db.refresh(article)
    return article

@router.post("/", response_model=schemas.ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    db_article = models.Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

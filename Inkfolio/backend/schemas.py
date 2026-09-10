from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ArticleBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    category: Optional[str] = "Essay"
    content: str
    author_name: Optional[str] = "Elena Vance"
    author_role: Optional[str] = "Staff Writer & Editor"
    author_avatar: Optional[str] = None
    cover_image: Optional[str] = None
    read_time: Optional[str] = "6 min read"
    published: Optional[bool] = True

class ArticleCreate(ArticleBase):
    pass

class ArticleResponse(ArticleBase):
    id: int
    likes: int = 0
    bookmarks: int = 0
    views: int = 0
    created_at: datetime

    class Config:
        from_attributes = True

class UserProfileBase(BaseModel):
    name: str
    username: str
    email: str
    bio: Optional[str] = None
    avatar: Optional[str] = None
    is_author: bool = False
    is_verified: bool = False

class UserProfileResponse(UserProfileBase):
    id: int
    followers_count: int = 0
    following_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True

class AnalyticsOverview(BaseModel):
    total_articles: int
    total_views: int
    total_likes: int
    monthly_earnings: float
    active_subscribers: int

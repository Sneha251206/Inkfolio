from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float
from datetime import datetime
from database import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    subtitle = Column(String(500), nullable=True)
    category = Column(String(100), default="Essay")
    content = Column(Text, nullable=False)
    author_name = Column(String(100), default="Author")
    author_role = Column(String(100), default="Contributor")
    author_avatar = Column(String(500), nullable=True)
    cover_image = Column(String(500), nullable=True)
    read_time = Column(String(50), default="5 min read")
    published = Column(Boolean, default=True)
    likes = Column(Integer, default=0)
    bookmarks = Column(Integer, default=0)
    views = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    token = Column(String(255), unique=True, index=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="author")
    bio = Column(Text, nullable=True)
    avatar = Column(String(500), nullable=True)
    is_author = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=True)
    followers_count = Column(Integer, default=0)
    following_count = Column(Integer, default=0)
    articles_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    bio = Column(Text, nullable=True)
    avatar = Column(String(500), nullable=True)
    is_author = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    followers_count = Column(Integer, default=0)
    following_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class ModerationItem(Base):
    __tablename__ = "moderation_items"

    id = Column(Integer, primary_key=True, index=True)
    article_title = Column(String(255), nullable=False)
    author_name = Column(String(100), nullable=False)
    reason = Column(String(255), nullable=False)
    status = Column(String(50), default="Pending")
    submitted_at = Column(DateTime, default=datetime.utcnow)

class PayoutRecord(Base):
    __tablename__ = "payout_records"

    id = Column(Integer, primary_key=True, index=True)
    author_name = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String(50), default="Completed")
    payout_date = Column(DateTime, default=datetime.utcnow)

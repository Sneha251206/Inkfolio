import hashlib
import hmac
import secrets
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from config import settings
from services.brevo_service import send_password_reset_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

def hash_password(password: str) -> str:
    """Hash password using PBKDF2-HMAC-SHA256 with 100,000 iterations and random 16-byte salt."""
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${key.hex()}"

def verify_password(plain_password: str, stored_hash: str) -> bool:
    """Verify plain password against PBKDF2 stored hash."""
    if not stored_hash or "$" not in stored_hash:
        return False
    try:
        salt, expected_hex = stored_hash.split("$", 1)
        key = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt.encode("utf-8"), 100000)
        return hmac.compare_digest(key.hex(), expected_hex)
    except Exception:
        return False

def generate_session_token(user_id: int) -> str:
    """Generate a lightweight bearer session token."""
    random_part = secrets.token_urlsafe(32)
    return f"inkfolio_tok_{user_id}_{random_part}"

@router.post("/register", response_model=schemas.UserAuthResponse, status_code=status.HTTP_201_CREATED)
@router.post("/register/", response_model=schemas.UserAuthResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: schemas.UserRegister, db: Session = Depends(get_db)):
    clean_email = user_data.email.strip().lower()
    if not clean_email or "@" not in clean_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A valid email address is required."
        )
    
    if len(user_data.password.strip()) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters long."
        )
        
    existing_user = db.query(models.User).filter(models.User.email == clean_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please log in instead."
        )
        
    base_username = (user_data.name or "user").strip().lower().replace(" ", "")
    candidate_username = base_username
    counter = 1
    while db.query(models.User).filter(models.User.username == candidate_username).first():
        candidate_username = f"{base_username}{counter}"
        counter += 1
        
    is_author_flag = user_data.role == "author" or bool(user_data.is_author)
    default_avatar = (
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        if is_author_flag
        else "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    )
    
    new_user = models.User(
        name=user_data.name.strip(),
        username=candidate_username,
        email=clean_email,
        hashed_password=hash_password(user_data.password.strip()),
        role="author" if is_author_flag else "reader",
        bio="Author & Contributor to InkFolio editorial." if is_author_flag else "Thoughtful reader exploring essays.",
        avatar=default_avatar,
        is_author=is_author_flag,
        is_verified=is_author_flag,
        followers_count=0,
        following_count=0,
        articles_count=0
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = generate_session_token(new_user.id)
    response_obj = schemas.UserAuthResponse.from_orm(new_user)
    response_obj.token = token
    return response_obj

@router.post("/login", response_model=schemas.UserAuthResponse)
@router.post("/login/", response_model=schemas.UserAuthResponse)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    clean_email = login_data.email.strip().lower()
    clean_password = login_data.password.strip()
    
    if not clean_email or not clean_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and password are both required."
        )
        
    user = db.query(models.User).filter(models.User.email == clean_email).first()
    
    if not user or not verify_password(clean_password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please verify your credentials."
        )
        
    token = generate_session_token(user.id)
    response_obj = schemas.UserAuthResponse.from_orm(user)
    response_obj.token = token
    return response_obj

@router.post("/forgot-password", response_model=schemas.MessageResponse)
@router.post("/forgot-password/", response_model=schemas.MessageResponse)
def forgot_password(req: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Generate password reset token and send transactional email via Brevo.
    """
    clean_email = req.email.strip().lower()
    if not clean_email or "@" not in clean_email:
        raise HTTPException(status_code=400, detail="A valid email address is required.")
        
    user = db.query(models.User).filter(models.User.email == clean_email).first()
    
    if user:
        # Invalidate previous unused tokens for this user
        db.query(models.PasswordResetToken).filter(
            models.PasswordResetToken.user_id == user.id,
            models.PasswordResetToken.used == False
        ).update({"used": True})
        
        token = secrets.token_urlsafe(32)
        expires_at = datetime.utcnow() + timedelta(hours=1)
        
        reset_record = models.PasswordResetToken(
            user_id=user.id,
            token=token,
            expires_at=expires_at,
            used=False
        )
        db.add(reset_record)
        db.commit()
        
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        send_password_reset_email(user.email, user.name, reset_url)
        
    return schemas.MessageResponse(
        message="If an account with that email exists, a password reset link has been sent.",
        success=True
    )

@router.post("/reset-password", response_model=schemas.MessageResponse)
@router.post("/reset-password/", response_model=schemas.MessageResponse)
def reset_password(req: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Validate reset token and update user password.
    """
    if len(req.new_password.strip()) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long.")
        
    reset_record = db.query(models.PasswordResetToken).filter(
        models.PasswordResetToken.token == req.token.strip(),
        models.PasswordResetToken.used == False
    ).first()
    
    if not reset_record:
        raise HTTPException(status_code=400, detail="Invalid or already used password reset link.")
        
    if reset_record.expires_at < datetime.utcnow():
        reset_record.used = True
        db.commit()
        raise HTTPException(status_code=400, detail="Password reset link has expired. Please request a new one.")
        
    user = db.query(models.User).filter(models.User.id == reset_record.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
        
    user.hashed_password = hash_password(req.new_password.strip())
    reset_record.used = True
    db.commit()
    
    return schemas.MessageResponse(
        message="Your password has been successfully reset. You can now log in with your new password.",
        success=True
    )

@router.get("/me", response_model=schemas.UserAuthResponse)
@router.get("/me/", response_model=schemas.UserAuthResponse)
def get_me(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user found.")
    response_obj = schemas.UserAuthResponse.from_orm(user)
    response_obj.token = generate_session_token(user.id)
    return response_obj

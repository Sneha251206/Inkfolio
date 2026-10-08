from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import engine, Base
from routers import articles, users, analytics, moderation, auth

# Initialize Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend REST API for InkFolio Editorial Platform",
    version="1.0.0",
    debug=settings.DEBUG
)

# CORS Configuration: explicitly allow origins and regex pattern for Cloudflare Workers & preview deployments
allowed_origins = list(set(settings.cors_origins_list + [
    "https://inkfolio.sneha251206.workers.dev",
    "https://inkfolio.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https://.*(\.workers\.dev|\.pages\.dev|\.onrender\.com)$|^http://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Register Routers
app.include_router(auth.router, prefix="/api")
app.include_router(articles.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(moderation.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
        "docs_url": "/docs"
    }

@app.get("/api/health")
@app.get("/api/health/")
def health_check():
    return {"status": "healthy"}

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

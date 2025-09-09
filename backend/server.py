import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio Backend")

# Allow your frontend (Netlify/Vercel) to call the API.
# After you deploy the frontend, set ALLOWED_ORIGINS to that URL (comma-separated if multiple).
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if ALLOWED_ORIGINS == ["*"] else ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/profile")
def profile():
    return {
        "name": "Your Name",        # ← (Optional) change to your name
        "role": "Your Role",        # ← (Optional) change to your role
        "location": "Your City",    # ← (Optional) change to your city
        "email": os.getenv("CONTACT_EMAIL", "your-email@example.com"),
        "socials": {
            "linkedin": "https://linkedin.com/in/yourprofile",  # ← (Optional)
            "github": "https://github.com/yourusername"          # ← (Optional)
        }
    }

@app.get("/api/projects")
def projects():
    return [
        {
            "title": "Project One",
            "description": "Short description of your project.",
            "link": "https://example.com/project-one",
            "tags": ["react", "api"]
        },
        {
            "title": "Project Two",
            "description": "Another project with a brief description.",
            "link": "https://example.com/project-two",
            "tags": ["python", "fastapi"]
        }
    ]

@app.get("/")
def root():
    return {"message": "Portfolio backend is running. Try /api/health"}


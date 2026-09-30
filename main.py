import os
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

BASE_DIR = Path(__file__).resolve().parent
app = FastAPI(title="JARVIS by JOSAM316")

# Set SESSION_SECRET in Replit Secrets before deploying. This is only a local-development fallback.
session_secret = os.getenv("SESSION_SECRET")
if not session_secret:
    session_secret = "local-dev-only-change-me"

app.add_middleware(
    SessionMiddleware,
    secret_key=session_secret,
    same_site="lax",
    https_only=os.getenv("COOKIE_HTTPS_ONLY", "false").lower() == "true",
)

app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")

@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"app_name": "JARVIS", "brand": "JOSAM316"},
    )

@app.get("/api/status")
async def status():
    # Dashboard-only prototype: these are demo values, not live phone telemetry.
    return JSONResponse({
        "assistant": "online",
        "phone": "not_paired",
        "mode": "demo",
        "message": "Dashboard prototype is running. No phone is connected."
    })

@app.get("/health")
async def health():
    return {"ok": True}

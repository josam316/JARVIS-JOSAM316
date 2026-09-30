# JARVIS by JOSAM316 — Dashboard Prototype

A responsive, holographic-style dashboard built with FastAPI, HTML, CSS and JavaScript.

## What works in this first milestone
- Responsive animated dashboard.
- Demo chat with safe text rendering.
- Demo phone connection panel.
- Activity log and interface glow control.
- `/api/status` and `/health` endpoints.
- No actual phone access, pairing, AI API or device commands yet.

## Run on Replit
1. Create a new **Python** Replit project.
2. Upload/extract this project into it, preserving `main.py`, `requirements.txt`, `templates/` and `static/`.
3. Replit should install packages from `requirements.txt`. If it does not, run `pip install -r requirements.txt` in the Shell.
4. Press **Run**. The app starts with Uvicorn on port 8000.
5. Open the web preview. Try the chat and **Set up phone connection** button; they are previews only.

## Local run (optional)
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```
Open `http://127.0.0.1:8000`.

## Secure deployment checklist
- Add a long random `SESSION_SECRET` in Replit Secrets.
- Set `COOKIE_HTTPS_ONLY=true` when deployed behind HTTPS.
- Never put AI API keys in `static/app.js` or any browser-visible file.
- Add authentication and authorization before exposing private dashboard data or device actions.
- Do not treat demo status values as real phone telemetry.
- Use HTTPS/WSS and short-lived pairing codes when the companion is introduced.
- Add rate limits, audit logs, input validation, session revocation and CSRF protections before production use.

The session middleware is included as groundwork; this prototype does **not** implement login or use sessions for authorization. Do not expose it as a production personal-control system until authentication and access control are added.

## Planned Android companion path
1. Build a native Android app in Kotlin using Android Studio or a compatible cloud Android build workflow.
2. First expose only a pairing screen and harmless status (e.g., battery level).
3. Pair through a short-lived one-time code or QR code; exchange it for a revocable device credential over HTTPS.
4. Use authenticated WebSockets for live status and commands.
5. Implement each capability separately using Android APIs and ask for the corresponding permission only when needed.
6. Keep an allowlist of commands; require user confirmation for sensitive actions. Never execute arbitrary AI-generated shell commands.
7. Test local Wi-Fi and remote access separately.

## Suggested next phase
Implement login, CSRF protection, rate limiting and a server-side AI chat endpoint. Then connect a native Android companion with secure pairing.

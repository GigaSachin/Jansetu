# JanSetu (जनसेतु) — Deployment & Production Guide
> **Smart India Hackathon (SIH PS 26043)**  
> *Bridging Citizens, Civic Authorities, Higher Education Institutions (HEIs), and CSR Partners for Real-World Problem Resolution.*

---

## 🏛️ System Architecture

```text
       ┌───────────────────────────────┐
       │   React + Vite + TypeScript   │ (Port 5173 / Static CDN)
       │    (Tailwind, Framer, TTS)    │
       └──────────────┬────────────────┘
                      │ REST API / CORS
                      ▼
       ┌───────────────────────────────┐
       │ Node.js + Express + TypeScript│ (Port 5000)
       │     (JWT, RBAC, Security)     │
       └───────┬──────────────┬────────┘
               │              │
        PostgreSQL        HTTP Bridge
        (Port 5432)       (Port 8000)
               │              │
               ▼              ▼
       ┌──────────────┐ ┌───────────────────────────────┐
       │  PostgreSQL  │ │       Python FastAPI          │
       │   Database   │ │   AI Engine (NLP, Triage,     │
       │ (10 Tables)  │ │      HEI Ranking & Match)     │
       └──────────────┘ └───────────────────────────────┘
```

---

## 🚀 Quick Start (Docker Compose — 1 Command)

The easiest way to start all services (PostgreSQL + AI Engine + Backend + Frontend) in a production-identical containerized environment:

```bash
docker compose up --build
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API Gateway**: `http://localhost:5000` (`http://localhost:5000/api/health`)
- **FastAPI AI Engine**: `http://localhost:8000` (`http://localhost:8000/health`)
- **PostgreSQL Database**: `localhost:5432` (Auto-initialized with `schema.sql`)

To stop services:
```bash
docker compose down
```

---

## 🛠️ Production Cloud Deployment Strategy

| Component | Recommended Free / Cloud Host | Build Command / Setup |
| :--- | :--- | :--- |
| **Frontend** | **Vercel** / **Netlify** / **Cloudflare Pages** | Build: `npm run build`, Output: `dist`, SPA Routing handled via `vercel.json` & `_redirects` |
| **Backend** | **Render** / **Railway** / **Fly.io** / **AWS EC2** | Build: `npm run build`, Start: `node dist/server.js` |
| **Database** | **Neon** / **Supabase** / **AWS RDS** (PostgreSQL 16) | Execute `server/src/database/schema.sql` |
| **AI Engine** | **Render** / **Railway** / **Fly.io** | Start: `uvicorn app.main:app --host 0.0.0.0 --port 8000` |

---

## 📋 Environment Variables

### 1. Frontend (`JanSetu/.env`)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Backend Express API Gateway URL | `http://localhost:5000/api` |
| `VITE_AI_ENGINE_URL` | FastAPI AI Engine Base URL | `http://localhost:8000` |

### 2. Backend (`server/.env`)
| Variable | Description | Production Example |
| :--- | :--- | :--- |
| `PORT` | Backend listening port | `5000` |
| `NODE_ENV` | Environment mode (`production` / `development`) | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/jansetu` |
| `JWT_SECRET` | Secret key for JWT session signing | `secure_32_char_random_secret_string` |
| `AI_ENGINE_URL` | FastAPI AI service URL | `http://localhost:8000` |
| `CORS_ORIGIN` | Allowed Frontend origins (comma-separated) | `https://jansetu.org,https://jansetu.vercel.app` |

### 3. AI Engine (`JanSetu/Ai-Engine-main/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Uvicorn port | `8000` |
| `NODE_BACKEND_URL` | Backend callback URL | `http://localhost:5000/api/v1/ai/triage-callback` |

---

## 📦 Manual Step-by-Step Local / Server Setup

### Step 1: PostgreSQL Database Setup
```bash
# Connect to PostgreSQL and create database
createdb -U postgres jansetu

# Execute the schema
psql -U postgres -d jansetu -f server/src/database/schema.sql
```
*(Note: If PostgreSQL is not running, the backend automatically activates a resilient in-memory seeded repository with zero crashes).*

### Step 2: FastAPI AI Engine Startup
```bash
cd JanSetu/Ai-Engine-main
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```
Health verification: `http://localhost:8000/health`

### Step 3: Node.js Backend API Gateway Startup
```bash
cd server
npm install
npm run build
npm start
```
Health verification: `http://localhost:5000/api/health`

### Step 4: React Frontend Startup
```bash
cd JanSetu
npm install
npm run dev
```
Access in browser: `http://localhost:5173`

---

## 🔒 Security & Production Hardening Features

- **Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Role-Based Access Control (RBAC)**: Enforced on `/api/government/*`, `/api/university/*`, and `/api/csr/*` endpoints.
- **Upload File Restriction**: Safe file validation allowing only `.jpg`, `.jpeg`, `.png`, `.webp`, `.pdf`. Executable extensions (`.exe`, `.sh`, `.bat`, `.js`, `.py`) are rejected.
- **Rate Limiting**: Integrated brute-force protection on auth endpoints and general rate limiting on all API routes.
- **Input Sanitization**: XSS defense stripping dangerous script tags from problem titles and descriptions.
- **Zero Stack Trace Leaks**: Production error handling returns sanitized codes (`INTERNAL_SERVER_ERROR`, `BAD_REQUEST`) with stack traces isolated to server logs.

---

## 🧑‍💼 Pre-Seeded Demo Accounts (Quick Login)

All demo accounts use password: `password123`

| Role | Email | District / Scope |
| :--- | :--- | :--- |
| **Citizen** | `citizen@demo.com` | Ranchi |
| **Government Admin** | `govt@demo.com` | Ranchi Municipal Corporation |
| **University Lead** | `univ@demo.com` | BIT Mesra, Ranchi |
| **CSR / Industry** | `csr@demo.com` | Tata Steel Rural Development Society |

---

## 🩺 System Health & Smoke Test

1. **Backend Health Check**:
   ```bash
   curl http://localhost:5000/api/health
   # Returns status 200 OK: {"success": true, "data": {"status": "HEALTHY", "aiEngine": {"status": "ONLINE"}}}
   ```
2. **AI Engine Health Check**:
   ```bash
   curl http://localhost:8000/health
   # Returns status 200 OK: {"status": "HEALTHY", "engine": "JanSetu-AI-v2", "active_institutions": 9}
   ```
3. **End-to-End Acceptance Tests**:
   ```bash
   cd server
   npx tsx tests/step5_security_acceptance.ts  # 15/15 tests passing
   npx tsx tests/phase5_acceptance.ts          # 7/7 tests passing
   ```

# JanSetu Backend — Phase 4 API Gateway

Node.js + Express + TypeScript + PostgreSQL API Gateway connecting the React Frontend with the FastAPI AI Engine.

---

## 🏛️ Architecture

```
React Frontend (Port 5173)
        ↓
Node.js + Express API Gateway (Port 5000)
        ↓
PostgreSQL / Repository Abstraction
        ↓
FastAPI AI Engine (Port 8000)
```

The frontend does NOT directly depend on the AI Engine. The backend acts as the single unified API gateway.

---

## 👤 Demo User Accounts (DEMO ONLY)

| Role | Email | Password | Organization / District |
| :--- | :--- | :--- | :--- |
| **Citizen** | `citizen@jansetu.in` | `Citizen@123` | Ramgarh, Jharkhand |
| **Government** | `government@jharkhand.gov.in` | `Gov@123` | Ranchi, Jharkhand |
| **University** | `dean@bitmesra.ac.in` | `Uni@123` | BIT Mesra, Ranchi |
| **Industry / CSR** | `csr@tatasteel.com` | `Csr@123` | Tata Steel Foundation |

> [!NOTE]
> All passwords are cryptographically hashed using `bcrypt` (salt rounds = 10). Plaintext passwords are never stored.

---

## 🚀 Quick Start

### 1. Install & Build
```bash
cd server
npm install
npm run build
```

### 2. Run Automated Test Suite
```bash
npm test
```

### 3. Start Backend Server
```bash
npm run dev
# or for production:
npm start
```

Backend will be available at: `http://localhost:5000/api`

---

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` — Register a new account
- `POST /api/auth/login` — Login with email and password
- `GET  /api/auth/me` — Retrieve current authenticated user profile

### 📋 Problems
- `POST /api/problems` — Submit a citizen problem (generates `JS-JH-2026-XXXXXX` and triggers async AI triage)
- `GET  /api/problems` — List all problems (with filters: `district`, `category`, `status`, `severity`, `search`)
- `GET  /api/problems/:id` — Retrieve problem details by ID or Issue ID
- `PUT  /api/problems/:id` — Update problem details
- `POST /api/problems/:id/status` — Update problem status (creates history record)
- `GET  /api/problems/:id/journey` — Retrieve lifecycle journey, status timeline, matches & AI result
- `GET  /api/problems/:id/ai` — Retrieve AI analysis, similarity, and HEI matches
- `GET  /api/problems/:id/matches` — Retrieve ranked Jharkhand institutions
- `POST /api/problems/:id/attachments` — Add evidence attachment

### 🏛️ Government Authority
- `GET  /api/government/problems` — Authority problem backlog
- `PUT  /api/government/problems/:id/verify` — Verify and validate problem priority
- `PUT  /api/government/problems/:id/status` — Update resolution status

### 🎓 Academic / University
- `GET  /api/university/challenges` — Available student/faculty capstone challenges
- `GET  /api/university/matches` — AI-matched problems for specific institution
- `POST /api/university/problems/:id/interest` — Express capstone project interest

### 💼 Industry & CSR
- `GET  /api/csr/opportunities` — CSR high-impact funding opportunities
- `POST /api/csr/problems/:id/interest` — Pledge CSR funding, tech, or equipment support

### 🏫 Institutions & Districts
- `GET  /api/institutions` — List seeded Jharkhand institutions
- `GET  /api/institutions/districts` — List all 24 Jharkhand districts
- `GET  /api/institutions/:id` — Get institution profile

### 🩺 System Health & Gateway
- `GET  /api/health` — Gateway status and FastAPI bridge health check

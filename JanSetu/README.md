# JanSetu — Jan Ki Baat, Solution Ke Saath

Connecting citizens, government authorities, universities, and industry partners to turn local societal problems into real, verified solutions with measurable impact.

---

## 🏛️ Platform Architecture

```
React Frontend (Port 5173)
        ↓
Node.js + Express API Gateway (Port 5000)
        ↓
PostgreSQL / Resilient Repository Layer
        ↓
FastAPI AI Engine (Port 8000)
```

---

## 👥 Demo Accounts (DEMO ONLY)

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Citizen** | `citizen@jansetu.in` | `Citizen@123` | Ramgarh, Jharkhand |
| **Government** | `government@jharkhand.gov.in` | `Gov@123` | Authority Officer, Ranchi |
| **University** | `dean@bitmesra.ac.in` | `Uni@123` | BIT Mesra, Ranchi |
| **Industry / CSR** | `csr@tatasteel.com` | `Csr@123` | Tata Steel Foundation |

---

## 🚀 Running JanSetu Services

### 1. Start Backend API Gateway (Port 5000)
```bash
cd server
npm install
npm run build
npm start
```

### 2. Start Frontend Web Client (Port 5173)
```bash
cd JanSetu
npm install
npm run build
npm start
```

### 3. Start AI Engine (Port 8000)
```bash
cd JanSetu/Ai-Engine-main
uvicorn app.main:app --reload --port 8000
```

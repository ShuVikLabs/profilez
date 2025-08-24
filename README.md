# Profilez — Verified Biodata Platform

A modern biodata website that starts simple (host a candidate’s biodata at a shareable URL) and evolves into a verified, AI-assisted talent platform.

**Tech stack**
- Backend: Java 21, Spring Boot 3.5.5
- Frontend: React 19.1.1

---

## ✨ Core Idea

1. **MVP** → One candidate profile, public URL, simple text + formatting.  
2. **Scale** → Multiple candidates, fuzzy search, recruiter registration, subscriptions.  
3. **Verification** → Online assessments/interviews to unlock **Verified** badges.  
4. **AI Search** → From keyword queries to **intent-driven** candidate discovery.  
5. **Monetization** → Paid themes, premium visibility, recruiter subscriptions.  

---

## 🧱 Repository Structure

```
profilez/
  ├─ backend/            # Java 21 + Spring Boot 3.5.5
  ├─ frontend/           # React 19.1.1
  ├─ docs/
  └─ README.md
```

---

## 🚀 Getting Started (Local)

### Prerequisites
- Java 21  
- Node.js ≥ 18  
- Maven (or Gradle)  

### Backend
```bash
cd backend
./mvnw spring-boot:run   # or ./gradlew bootRun
```
- Runs on: `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
- Runs on: `http://localhost:5173`

---

## 🗂️ Data Model (evolves by phase)

**MVP**
- Candidate → `id`, `slug`, `fullName`, `headline`, `summary`, `links`

**Later**
- Experience → `company`, `title`, `dates`, `highlights`  
- Project → `name`, `description`, `tech`, `links`  
- Skill → `name`, `level`, `years`  
- Recruiter, Subscription, Assessment, VerificationBadge  

---

## 🔌 API Sketch

**Base:** `/api/v1`

**MVP**
- `POST /candidates` → Create candidate  
- `PUT /candidates/{id}` → Update candidate  
- `GET /candidates/{slug}` → Public fetch by slug  
- `GET /health` → Health check  

**Later**
- Recruiter registration  
- Subscriptions  
- Search with fuzzy match  
- Verification endpoints  

---

## 🧭 Phased Roadmap

### Phase 0 — **Single-Candidate MVP**
- One candidate profile  
- Public biodata URL  
- Simple text & formatting  

### Phase 1 — **Multi-Candidate + Fuzzy Search**
- Multiple candidates  
- Fuzzy search  
- Basic filters  

### Phase 2 — **Recruiters & Subscriptions**
- Recruiter registration  
- Subscriptions on criteria  
- Notifications  

### Phase 3 — **Verification Pipeline**
- Assessments → Verification badges  
- Badge display on profile  

### Phase 4 — **AI-Assisted Search**
- Intent-aware candidate search  
- Semantic filters & reranking  

### Phase 5 — **Monetization & Polish**
- Paid templates & themes  
- Premium recruiter tools  
- Billing & limits  

---

## 🖥️ Frontend (React 19.1.1)

- React + Vite  
- Pages:
  - `ProfileEditor` → candidate view  
  - `PublicProfile` → shareable biodata  
  - `SearchPage` → recruiter search  
  - `RecruiterDashboard` → recruiter tools  

---

## ⚙️ Backend (Spring Boot 3.5.5)

- Modules:
  - Candidate management  
  - Search (fuzzy/semantic)  
  - Verification (assessments & badges)  
  - Notifications (email/webhooks)  

---

---
title: "Architecture"
weight: 3
---

# Architecture

## System Overview

Profilez is built as a modern, scalable web application with a clear separation between frontend and backend services.

### Technology Stack

- **Backend**: Java 21 with Spring Boot 3.5.5
- **Frontend**: React 19.1.1 with modern JavaScript
- **Build Tools**: Maven/Gradle for backend, npm for frontend

## Data Model

The data model evolves with each phase of development:

### MVP Phase

**Candidate Entity**
- `id` - Unique identifier
- `slug` - URL-friendly identifier for public profiles
- `fullName` - Candidate's full name
- `headline` - Professional headline
- `summary` - Professional summary
- `links` - Social media and portfolio links

### Later Phases

**Experience Entity**
- `company` - Company name
- `title` - Job title
- `dates` - Employment period
- `highlights` - Key achievements

**Project Entity**
- `name` - Project name
- `description` - Project description
- `tech` - Technologies used
- `links` - Project links (GitHub, live demo, etc.)

**Skill Entity**
- `name` - Skill name
- `level` - Proficiency level
- `years` - Years of experience

**Additional Entities (Future)**
- `Recruiter` - Recruiter profiles and authentication
- `Subscription` - Recruiter subscription management
- `Assessment` - Online assessment system
- `VerificationBadge` - Verification status and badges

## Frontend Architecture

### React Application Structure

The React frontend is organized into logical pages and components:

**Key Pages:**
- `ProfileEditor` - Candidate profile creation and editing interface
- `PublicProfile` - Shareable biodata display page
- `SearchPage` - Recruiter search interface
- `RecruiterDashboard` - Recruiter management tools

**Component Organization:**
- Reusable UI components
- Form components for data entry
- Display components for public profiles
- Search and filter components

## Backend Architecture

### Spring Boot Modules

The backend is organized into distinct modules:

**Core Modules:**
- **Candidate Management** - CRUD operations for candidate profiles
- **Search Engine** - Fuzzy and semantic search capabilities
- **Verification System** - Assessment and badge management
- **Notification Service** - Email and webhook notifications

**API Design:**
- RESTful endpoints following REST conventions
- Clear separation of concerns
- Comprehensive error handling
- Input validation and sanitization

## Deployment Architecture

### Development Environment
- Local development with hot reloading
- Frontend: Vite development server
- Backend: Spring Boot DevTools

### Production Environment
- Frontend: Static site deployment (Netlify, Vercel)
- Backend: Container deployment (Docker, Kubernetes)
- Database: PostgreSQL or similar RDBMS
- CDN: Static asset delivery

## Security Considerations

- Input validation and sanitization
- CORS configuration for cross-origin requests
- Authentication and authorization (future phases)
- Data privacy and GDPR compliance
- Secure API endpoints with rate limiting

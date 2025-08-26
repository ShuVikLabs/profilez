---
title: "Profilez Documentation"
weight: 1
bookCollapseSection: false
---

# Profilez — Verified Biodata Platform

A modern biodata website that starts simple (host a candidate's biodata at a shareable URL) and evolves into a verified, AI-assisted talent platform.

## Tech Stack

- **Backend**: Java 21, Spring Boot 3.5.5
- **Frontend**: React 19.1.1

---

## Core Idea

Profilez is designed to evolve through multiple phases:

1. **MVP** → One candidate profile, public URL, simple text + formatting.  
2. **Scale** → Multiple candidates, fuzzy search, recruiter registration, subscriptions.  
3. **Verification** → Online assessments/interviews to unlock **Verified** badges.  
4. **AI Search** → From keyword queries to **intent-driven** candidate discovery.  
5. **Monetization** → Paid themes, premium visibility, recruiter subscriptions.

---

## Repository Structure

```
profilez/
  ├─ backend/            # Java 21 + Spring Boot 3.5.5
  ├─ frontend/           # React 19.1.1
  ├─ docs/               # Hugo documentation site
  └─ README.md
```

---

## Quick Navigation

- [Getting Started]({{< relref "/docs/getting-started" >}}) - Setup and run locally
- [Architecture]({{< relref "/docs/architecture" >}}) - System design and data models
- [API Reference]({{< relref "/docs/api" >}}) - REST API endpoints
- [Roadmap]({{< relref "/docs/roadmap" >}}) - Development phases and features

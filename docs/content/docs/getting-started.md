---
title: "Getting Started"
weight: 2
---

# Getting Started

This guide will help you set up Profilez locally for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21** - Required for the backend
- **Node.js ≥ 18** - Required for the frontend
- **Maven** (or Gradle) - For building the backend

## Local Development Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run   # or ./gradlew bootRun
   ```

3. The backend will be available at: `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at: `http://localhost:5173`

## Verification

Once both services are running:

1. Open your browser to `http://localhost:5173`
2. Check that the frontend can communicate with the backend
3. Visit `http://localhost:8080/health` to verify the backend health check

## Next Steps

- Explore the [Architecture]({{< relref "/docs/architecture" >}}) to understand the system design
- Check out the [API Reference]({{< relref "/docs/api" >}}) for available endpoints
- Review the [Roadmap]({{< relref "/docs/roadmap" >}}) to see what's planned

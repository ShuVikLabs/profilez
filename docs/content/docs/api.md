---
title: "API Reference"
weight: 4
---

# API Reference

## Base URL

All API endpoints are prefixed with `/api/v1`

## Authentication

Currently, the MVP phase does not require authentication. Future phases will implement:
- JWT-based authentication
- Role-based access control (RBAC)
- API key management for recruiters

## MVP Endpoints

### Health Check

#### GET /health
Check the health status of the backend service.

**Response:**
```json
{
  "status": "UP",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Candidates

#### POST /candidates
Create a new candidate profile.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "headline": "Senior Software Engineer",
  "summary": "Experienced developer with 5+ years in full-stack development",
  "links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "portfolio": "https://johndoe.dev"
  }
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "slug": "john-doe",
  "fullName": "John Doe",
  "headline": "Senior Software Engineer",
  "summary": "Experienced developer with 5+ years in full-stack development",
  "links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "portfolio": "https://johndoe.dev"
  },
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

#### PUT /candidates/{id}
Update an existing candidate profile.

**Parameters:**
- `id` (path) - Candidate ID

**Request Body:** Same as POST /candidates

**Response:** Updated candidate object

#### GET /candidates/{slug}
Retrieve a candidate profile by slug for public viewing.

**Parameters:**
- `slug` (path) - URL-friendly candidate identifier

**Response:** Candidate object (same as POST response)

## Future Endpoints

The following endpoints will be implemented in later phases:

### Phase 1 - Multi-Candidate + Search

#### GET /candidates
Search and filter candidates.

**Query Parameters:**
- `q` - Search query (fuzzy search)
- `skills` - Comma-separated list of skills
- `experience` - Minimum years of experience
- `location` - Location filter
- `page` - Page number (pagination)
- `limit` - Results per page

#### GET /candidates/{id}/experience
Get candidate's work experience.

#### POST /candidates/{id}/experience
Add work experience to candidate profile.

#### GET /candidates/{id}/projects
Get candidate's projects.

#### POST /candidates/{id}/projects
Add project to candidate profile.

### Phase 2 - Recruiters & Subscriptions

#### POST /recruiters/register
Register a new recruiter account.

#### POST /recruiters/login
Authenticate recruiter login.

#### GET /recruiters/subscriptions
Get recruiter's search subscriptions.

#### POST /recruiters/subscriptions
Create a new search subscription.

### Phase 3 - Verification

#### GET /assessments
List available assessments.

#### POST /candidates/{id}/assessments
Submit assessment results.

#### GET /candidates/{id}/badges
Get verification badges for candidate.

### Phase 4 - AI Search

#### POST /search/semantic
Perform semantic search with natural language queries.

**Request Body:**
```json
{
  "query": "Find React developers with machine learning experience",
  "filters": {
    "experience_min": 3,
    "location": "Remote"
  }
}
```

## Error Handling

All endpoints follow standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "fullName",
        "message": "Full name is required"
      }
    ]
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Rate Limiting

Future implementations will include:
- Request rate limiting per IP/user
- Different limits for authenticated vs anonymous users
- Subscription-based rate limit tiers

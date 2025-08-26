# API-First Development Setup

This document explains the API-first development setup for the Profilez project, using OpenAPI specification for code generation in both backend (Java/Spring Boot) and frontend (TypeScript/React).

## Overview

The setup follows this streamlined workflow:

1. **Define API in OpenAPI Specification** → `api-spec/candidate-biodata-api.yaml`
2. **Run Standard Build Commands** → `./gradlew build` | `npm run build`
3. **Code Auto-Generated** → Interfaces, DTOs, and clients created automatically  
4. **Implement Required Methods** → Build fails until contracts are satisfied
5. **Type-Safe Development** → Full type safety and contract enforcement

## Project Structure

```
profilez/
├── api-spec/
│   └── candidate-biodata-api.yaml          # OpenAPI specification
├── backend/
│   ├── build.gradle                        # Gradle build with OpenAPI generator
│   ├── build/generated/                    # Generated Java code (gitignored)
│   └── src/main/java/com/shuviklabs/profilez/
│       └── controller/
│           └── CandidatesController.java   # Implementation of generated interfaces
└── frontend/
    ├── package.json                        # NPM with OpenAPI generator
    ├── src/api/                            # Generated TypeScript client (gitignored)
    └── src/components/
        └── CandidateList.tsx               # React component using generated client
```

## Backend Code Generation

### Configuration (build.gradle)

The backend uses the OpenAPI Generator Gradle plugin:

```gradle
plugins {
    id 'org.openapi.generator' version '7.10.0'
}

openApiGenerate {
    generatorName = "spring"
    inputSpec = "$rootDir/../api-spec/candidate-biodata-api.yaml"
    outputDir = "$buildDir/generated"
    apiPackage = "com.shuviklabs.profilez.api"
    modelPackage = "com.shuviklabs.profilez.model"
    configOptions = [
        interfaceOnly: "true",
        useBeanValidation: "true",
        // ... other options
    ]
}
```

### Generated Output

- **API Interfaces**: `com.shuviklabs.profilez.api.CandidatesApi`
- **Model Classes**: `com.shuviklabs.profilez.model.*`
- **Validation Annotations**: Bean validation included

### Implementation

Controllers implement the generated interfaces:

```java
@RestController
public class CandidatesController implements CandidatesApi {
    @Override
    public ResponseEntity<CandidateResponse> createCandidate(CreateCandidateRequest request) {
        // Implementation here
    }
}
```

### Commands

```bash
# Build (automatically generates code first)
./gradlew build

# Clean build (regenerates code from scratch)
./gradlew clean build
```

## Frontend Code Generation

### Configuration (package.json)

The frontend uses the OpenAPI Generator CLI:

```json
{
  "devDependencies": {
    "@openapitools/openapi-generator-cli": "^2.14.0"
  },
  "scripts": {
    "generate-api": "openapi-generator-cli generate -i ../api-spec/candidate-biodata-api.yaml -g typescript-axios -o src/api ...",
    "build": "npm run generate-api && react-scripts build"
  }
}
```

### Generated Output

- **API Classes**: `src/api/apis/CandidatesApi.ts`
- **Model Types**: `src/api/models/*.ts`
- **Configuration**: Type-safe Axios client

### Usage

React components use the generated client:

```typescript
import { CandidatesApi, Configuration } from '../api';

const api = new CandidatesApi(new Configuration({
  basePath: 'http://localhost:8080/api/v1'
}));

const candidates = await api.searchCandidates(0, 20);
```

### Commands

```bash
# Build (automatically generates code first)
npm run build

# Start development server (no generation needed)
npm start
```

## Development Workflow

### 1. Modify API Specification

Edit `api-spec/candidate-biodata-api.yaml` to add/modify endpoints:

```yaml
paths:
  /candidates/{candidateId}/skills:
    post:
      summary: Add skill to candidate
      # ... OpenAPI definition
```

### 2. Build Projects (Code Auto-Generated)

**Backend:**
```bash
cd backend
./gradlew build  # Automatically generates interfaces and compiles
```

**Frontend:**
```bash
cd frontend
npm run build    # Automatically generates client and builds
```

### 3. Update Implementation

The generated interfaces will now include the new methods, forcing you to implement them:

```java
// Backend - IDE will show compilation error until implemented
public class CandidatesController implements CandidatesApi {
    // Must implement addSkillToCandidate method
}
```

```typescript
// Frontend - TypeScript provides autocomplete for new methods
const result = await api.addSkillToCandidate(candidateId, skillRequest);
```

### 4. Benefits

- **Contract-First**: API contract is the single source of truth
- **Type Safety**: Full type safety in both backend and frontend
- **Auto-Completion**: IDEs provide full autocomplete support
- **Validation**: Automatic request/response validation
- **Documentation**: Interactive API docs via Swagger UI
- **Consistency**: Backend and frontend always in sync

## API Documentation

When the backend is running, Swagger UI is available at:
- **Local**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/v3/api-docs

## Development Tips

### 1. Ignore Generated Code in Git

Add to `.gitignore`:

```
# Backend generated code
backend/build/generated/

# Frontend generated code
frontend/src/api/
```

### 2. IDE Setup

- **IntelliJ**: Install OpenAPI Generator plugin for YAML validation
- **VS Code**: Install OpenAPI (Swagger) Editor extension

### 3. Validation

Run OpenAPI validation:

```bash
# Using openapi-generator-cli
npx @openapitools/openapi-generator-cli validate -i api-spec/candidate-biodata-api.yaml
```

### 4. Mock Server

Generate a mock server for frontend development:

```bash
npx @openapitools/openapi-generator-cli generate \
  -i api-spec/candidate-biodata-api.yaml \
  -g nodejs-express-server \
  -o mock-server
```

## Troubleshooting

### Backend Build Issues

1. **Clean and regenerate**:
   ```bash
   ./gradlew clean openApiGenerate build
   ```

2. **Check Java version**: Ensure Java 21 is being used

### Frontend Build Issues

1. **Clear and reinstall**:
   ```bash
   npm run clean-api
   rm -rf node_modules package-lock.json
   npm install
   npm run generate-api
   ```

2. **TypeScript errors**: Ensure all generated types are properly imported

### API Specification Issues

1. **Validate spec**:
   ```bash
   npx swagger-codegen-cli validate -i api-spec/candidate-biodata-api.yaml
   ```

2. **Check references**: Ensure all `$ref` references are correct

## CI/CD Integration

The build pipeline automatically triggers on API spec changes:

- **API Spec Changes**: Trigger both frontend and backend builds
- **Backend**: `./gradlew build` - Auto-generates and compiles
- **Frontend**: `npm run build` - Auto-generates and builds
- **Contract Enforcement**: Builds fail if implementations don't match the API contract

## Live Example

The project includes a working example that demonstrates contract enforcement:

1. **Added new endpoint**: `/candidates/{candidateId}/status` in the API spec
2. **Backend build failed**: Until `updateCandidateStatus` method was implemented
3. **Frontend gets types**: Automatic TypeScript types for the new endpoint
4. **CI catches issues**: Pipeline fails if API contracts are violated

## Next Steps

1. **Add Authentication**: Extend API spec with security schemes
2. **Add More Endpoints**: Job applications, interviews, etc.
3. **Database Integration**: Implement JPA entities and repositories
4. **Error Handling**: Standardize error responses
5. **Testing**: Generate test stubs from API spec

## Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Spring Boot OpenAPI](https://springdoc.org/)
- [TypeScript Axios Generator](https://openapi-generator.tech/docs/generators/typescript-axios/)

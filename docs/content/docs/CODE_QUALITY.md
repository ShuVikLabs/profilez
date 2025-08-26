# Code Quality Setup

This document describes the comprehensive code quality setup for the Profilez project, covering both Java/Spring Boot backend and React/TypeScript frontend.

## Overview

The project enforces code quality through multiple automated tools that run locally and in CI/CD:

### Backend (Java/Spring Boot)
- **PMD**: Static analysis for code quality and best practices
- **Checkstyle**: Code style and formatting standards
- **SpotBugs**: Bug detection and security analysis
- **JaCoCo**: Test coverage measurement

### Frontend (React/TypeScript)
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Jest**: Test coverage

## Backend Quality Tools

### PMD Configuration
- **Purpose**: Detects code smells, potential bugs, and best practice violations
- **Config**: `backend/config/pmd/pmd-rules.xml`
- **Rules**: Comprehensive ruleset optimized for Spring Boot applications
- **Exclusions**: Generated code, OpenAPI models/APIs

**Local Commands:**
```bash
cd backend
./gradlew pmdMain pmdTest  # Run PMD analysis
```

### Checkstyle Configuration
- **Purpose**: Enforces consistent code style and formatting
- **Config**: `backend/config/checkstyle/checkstyle.xml`
- **Standards**: Java best practices with Spring Boot adaptations
- **Line Length**: 120 characters max
- **Suppressions**: `backend/config/checkstyle/suppressions.xml`

**Local Commands:**
```bash
cd backend
./gradlew checkstyleMain checkstyleTest  # Run style checks
```

### SpotBugs Configuration
- **Purpose**: Finds potential bugs and security vulnerabilities
- **Effort**: Maximum (most thorough analysis)
- **Report Level**: Medium (balanced between noise and coverage)
- **Output**: HTML and XML reports

**Local Commands:**
```bash
cd backend
./gradlew spotbugsMain  # Run bug detection
```

### JaCoCo Coverage
- **Purpose**: Measures test coverage and enforces minimum thresholds
- **Minimum Coverage**: 70% overall, 60% per class
- **Exclusions**: Generated code, configuration classes, main application class
- **Reports**: HTML, XML formats

**Coverage Thresholds:**
- Overall project: 70%
- Individual classes: 60%
- Excludes: `*.config.*`, `*.model.*`, `*.api.*`, `*Application`

**Local Commands:**
```bash
cd backend
./gradlew jacocoTestReport  # Generate coverage report
./gradlew jacocoTestCoverageVerification  # Check thresholds
```

## Frontend Quality Tools

### ESLint Configuration
- **Purpose**: JavaScript/TypeScript linting and code quality
- **Config**: `frontend/.eslintrc.js`
- **Extends**: React App, TypeScript, React hooks, Import rules
- **Max Warnings**: 0 (all warnings must be fixed)

**Rules Highlights:**
- TypeScript strict mode
- React hooks rules
- Import ordering and organization
- Code complexity limits
- Consistent code style

**Local Commands:**
```bash
cd frontend
npm run lint        # Check for linting issues
npm run lint:fix    # Auto-fix linting issues
```

### Prettier Configuration
- **Purpose**: Consistent code formatting
- **Config**: `frontend/.prettierrc.js`
- **Settings**: 100 char line length, single quotes, trailing commas
- **Integration**: Works with ESLint via `eslint-plugin-prettier`

**Local Commands:**
```bash
cd frontend
npm run format:check  # Check formatting
npm run format        # Auto-format code
```

### TypeScript Configuration
- **Purpose**: Type checking and compilation
- **Config**: Uses existing `tsconfig.json`
- **Strict Mode**: Enabled for maximum type safety

**Local Commands:**
```bash
cd frontend
npm run type-check  # Run TypeScript compiler checks
```

### Jest Coverage
- **Purpose**: Test coverage measurement
- **Minimum Coverage**: 70% for branches, functions, lines, statements
- **Exclusions**: Generated API code, setup files, index files
- **Reports**: Text, LCOV, HTML formats

**Local Commands:**
```bash
cd frontend
npm run test:coverage  # Run tests with coverage
```

## CI/CD Integration

### Quality Gates in PR Pipeline

The GitHub Actions workflow automatically runs all quality checks:

**Frontend Quality Steps:**
1. Type checking (`npm run type-check`)
2. Linting (`npm run lint`)
3. Formatting (`npm run format:check`)
4. Tests with coverage (`npm run test:coverage`)
5. Build verification

**Backend Quality Steps:**
1. PMD analysis
2. Checkstyle verification
3. SpotBugs detection
4. Test execution with JaCoCo coverage
5. Build verification

### Quality Gate Enforcement

- **Automatic Failure**: PR fails if any quality check fails
- **Coverage Thresholds**: Must meet minimum coverage requirements
- **Zero Tolerance**: No warnings or errors allowed
- **Report Artifacts**: All reports uploaded for review

### Quality Summary

Each PR shows a quality gate summary with:
- ✅/❌ Status for frontend and backend
- Links to detailed reports
- Coverage metrics
- Quality trends

## Local Development Workflow

### Setup
```bash
# Backend
cd backend
./gradlew build  # Downloads and configures all tools

# Frontend  
cd frontend
npm install  # Installs ESLint, Prettier, and other tools
```

### Daily Development
```bash
# Before committing - run all quality checks
cd backend && ./gradlew qualityCheck
cd frontend && npm run quality

# Auto-fix common issues
cd frontend && npm run lint:fix && npm run format
```

### IDE Integration

**Recommended VSCode Extensions:**
- ESLint
- Prettier
- Java Extension Pack
- SonarLint
- GitLens

**IntelliJ IDEA Setup:**
- Enable PMD, Checkstyle, SpotBugs plugins
- Configure Prettier and ESLint integration
- Set up auto-format on save

## Quality Metrics & Thresholds

### Backend Thresholds
| Tool | Metric | Threshold |
|------|--------|-----------|
| JaCoCo | Line Coverage | ≥70% overall, ≥60% per class |
| PMD | Violations | 0 |
| Checkstyle | Style Issues | 0 |
| SpotBugs | Bug Reports | 0 high/medium priority |

### Frontend Thresholds
| Tool | Metric | Threshold |
|------|--------|-----------|
| Jest | Coverage | ≥70% (branches, functions, lines, statements) |
| ESLint | Warnings/Errors | 0 |
| TypeScript | Type Errors | 0 |
| Prettier | Format Issues | 0 |

## Customization

### Adding New Rules

**Backend (PMD/Checkstyle):**
1. Edit `backend/config/pmd/pmd-rules.xml`
2. Edit `backend/config/checkstyle/checkstyle.xml`
3. Test locally: `./gradlew qualityCheck`

**Frontend (ESLint):**
1. Edit `frontend/.eslintrc.js`
2. Test locally: `npm run lint`

### Excluding Files/Patterns

**Backend:**
- PMD: Add to `<exclude-pattern>` in `pmd-rules.xml`
- Checkstyle: Add to `suppressions.xml`
- JaCoCo: Add to `excludes` in `build.gradle`

**Frontend:**
- ESLint: Add to `ignorePatterns` in `.eslintrc.js`
- Prettier: Add to `.prettierignore`
- Jest: Add to `collectCoverageFrom` exclusions

## Troubleshooting

### Common Issues

**"PMD/Checkstyle rules too strict"**
- Gradually adjust rules in config files
- Add suppressions for specific cases
- Consider team discussion for rule changes

**"Coverage threshold not met"**
- Add unit tests for uncovered code
- Review if exclusions are appropriate
- Consider lowering threshold temporarily

**"ESLint/Prettier conflicts"**
- Ensure `eslint-config-prettier` is last in extends array
- Run `npm run lint:fix` to auto-resolve conflicts

**"Generated code causing issues"**
- Verify exclusion patterns in all tool configs
- Check that `src/api/` is properly ignored

### Performance Tips

**Faster Local Builds:**
```bash
# Skip quality checks for quick builds
./gradlew build -x pmd -x checkstyle -x spotbugsMain
npm run build  # Quality checks only run on explicit commands
```

**Incremental Checks:**
```bash
# Check only changed files
./gradlew pmdMain --continuous
npm run lint -- --cache
```

## Quality Reports

### Accessing Reports

**Local Development:**
- Backend: `backend/build/reports/`
- Frontend: `frontend/coverage/`

**CI/CD Artifacts:**
- Download from GitHub Actions artifacts
- View summaries in PR checks

### Report Types

**Backend:**
- PMD: HTML report with violations and explanations
- Checkstyle: HTML report with style issues
- SpotBugs: HTML report with potential bugs
- JaCoCo: HTML coverage report with line-by-line analysis

**Frontend:**
- Jest: HTML coverage report
- ESLint: Console output with error details

## Best Practices

### Writing Quality Code

1. **Follow Tool Suggestions**: Address all warnings/errors
2. **Write Tests**: Maintain high coverage
3. **Consistent Style**: Let Prettier handle formatting
4. **Type Safety**: Use TypeScript features fully
5. **Code Reviews**: Review quality reports in PRs

### Maintaining Quality Standards

1. **Regular Updates**: Keep tool versions current
2. **Rule Evolution**: Adjust rules based on team feedback
3. **Training**: Ensure team understands quality tools
4. **Monitoring**: Track quality trends over time

## Future Enhancements

### Planned Additions
- SonarQube integration for advanced analysis
- Security scanning with additional tools
- Performance testing integration
- Automated dependency vulnerability scanning
- Code complexity trend monitoring

---

This quality setup ensures high code standards, catches issues early, and maintains consistency across the entire codebase while integrating seamlessly with the development workflow.

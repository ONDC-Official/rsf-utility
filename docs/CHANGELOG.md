# Changelog

All notable changes to the RSF Utility project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation suite (docs-01 through docs-10)
- Contributing guidelines with submodule workflow
- Troubleshooting and diagnostics documentation
- Security implementation guide
- Operations and observability documentation

### Changed
- Improved project understanding documentation structure
- Enhanced API documentation with request/response examples

### Fixed
- Documentation consistency across parent and submodule repositories

## [1.0.0] - 2024-08-19

### Added
- **Core RSF Utility Architecture**
  - Microservice architecture with git submodules
  - Independent backend and frontend repositories
  - Parent repository for documentation orchestration

- **Backend Service (rsf-utility-backend)**
  - Node.js + Express + TypeScript REST API server
  - MongoDB integration with Mongoose ODM
  - JWT-based authentication with client-ID validation
  - ONDC payload validation and schema compliance
  - Settlement and reconciliation workflow automation
  - Comprehensive error handling and logging system
  - Prometheus metrics and health monitoring
  - Winston-based structured logging with Loki integration
  - Docker containerization with multi-stage builds
  - Jest testing framework with MongoDB Memory Server
  - API documentation with Swagger/OpenAPI

- **Frontend Service (rsf-utility-frontend)**
  - React 17 + TypeScript single-page application
  - Material-UI component library with custom theming
  - React Query for server state management and caching
  - React Hook Form for form state management
  - Axios HTTP client with automatic token refresh
  - Responsive design with sidebar navigation
  - Order management and settlement dashboards
  - File upload functionality for CSV bulk operations
  - Authentication flows with automatic session management
  - ESLint + Prettier code formatting with pre-commit hooks

- **Integration & Communication**
  - RESTful API contracts between frontend and backend
  - Standardized request/response format with error handling
  - File upload support for CSV and JSON configurations
  - Real-time data updates via HTTP polling
  - Cross-origin resource sharing (CORS) configuration

- **Infrastructure & DevOps**
  - Docker Compose for local development environment
  - Independent CI/CD pipelines for each service
  - GitHub Actions workflows for automated deployment
  - Environment-specific configuration management
  - Health check endpoints for monitoring
  - Database migration and seeding support

- **Documentation & Developer Experience**
  - Comprehensive architecture documentation
  - API endpoint documentation with examples
  - Development setup and workflow guides
  - Testing strategies and guidelines
  - Deployment procedures and troubleshooting
  - Contributing guidelines with code standards

### Technical Specifications

**Backend Technology Stack:**
- Runtime: Node.js 18+ with TypeScript 5.9
- Framework: Express 5.1 with middleware pipeline
- Database: MongoDB 8.17 with Mongoose ODM
- Authentication: JWT tokens with jsonwebtoken 9.0
- Validation: Zod 4.0 for schema validation, AJV for JSON Schema
- Testing: Jest 30.0 with Supertest for integration tests
- Logging: Winston 3.17 with daily rotate and Loki transport
- Monitoring: Prometheus client 15.1 for metrics collection
- File Processing: Multer 2.0 for uploads, csv-parse for CSV processing
- Cryptography: ONDC crypto SDK for signature verification

**Frontend Technology Stack:**
- Framework: React 17.0 with TypeScript 4.5
- UI Library: Material-UI 5.18 with emotion styling
- State Management: React Query 3.34 for server state, Context API for client state
- Forms: React Hook Form 7.62 with Hookform Resolvers 5.2
- HTTP Client: Axios 0.26 with request/response interceptors
- Routing: React Router DOM 6.30 for client-side navigation
- Build Tool: Create React App 5.0 with React Scripts
- Code Quality: ESLint 8.57, Prettier 2.8, Husky 7.0 for git hooks
- Testing: React Testing Library with Jest DOM matchers

**Infrastructure Components:**
- Containerization: Docker with multi-stage builds
- Orchestration: Docker Compose for service coordination
- CI/CD: GitHub Actions with EC2 deployment targets
- Monitoring: Prometheus metrics collection, Grafana Loki logging
- Database: MongoDB with connection pooling and health checks
- Security: JWT authentication, CORS policies, rate limiting

### Integration Points

**API Communication:**
- Base URL: Configurable via environment variables
- Authentication: Bearer token injection via Axios interceptors
- Error Handling: Standardized error response format with codes
- Data Transformation: Backend-to-frontend interface mapping
- File Operations: Multipart form data for uploads, JSON for responses

**Development Workflow:**
- Independent submodule development with separate CI/CD
- Parent repository coordination for documentation and releases
- Conventional commit standards with automated changelog generation
- Code quality enforcement with pre-commit hooks and linting
- Comprehensive testing with unit, integration, and end-to-end coverage

### Known Limitations

- WebSocket support not implemented (uses HTTP polling for real-time updates)
- Limited to ONDC network specification compliance
- Requires manual coordination for cross-service feature development
- MongoDB single-instance deployment (clustering not configured)

---

## Version Links

[Unreleased]: https://github.com/ONDC-Official/rsf-utility/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ONDC-Official/rsf-utility/releases/tag/v1.0.0

## Submodule Versions

### Current Submodule References

**Backend (rsf-utility-backend):**
- Current Commit: `3d6f75b6a68077f4cab93afcb95a1b33d89a8920`
- Package Version: `1.0.0`
- Repository: https://github.com/ONDC-Official/rsf-utility-backend

**Frontend (rsf-utility-frontend):**
- Current Commit: `0bb8e8f3104c32b65e085be2146909c36db6f574`
- Package Version: `0.1.0`
- Repository: https://github.com/ONDC-Official/rsf-utility-frontend

### Release Coordination

When creating releases, this parent repository coordinates specific versions of both submodules:

```bash
# Example coordinated release
v1.0.0 (parent) includes:
├── rsf-utility-backend@1.0.0 (commit: 3d6f75b)
└── rsf-utility-frontend@0.1.0 (commit: 0bb8e8f)
```

Each submodule maintains its own changelog and versioning in their respective repositories.

---

## Maintenance Notes

- **Automated Updates**: This changelog is maintained manually with structured format
- **Copilot Integration**: Documentation changes are coordinated with Copilot-maintained files
- **Release Process**: Follow semantic versioning with coordinated submodule releases
- **Breaking Changes**: Clearly document breaking changes with migration guides
- **Security Updates**: Document security patches and vulnerability fixes immediately

For detailed technical documentation, see the `/docs/` directory with comprehensive guides covering architecture, deployment, operations, and troubleshooting procedures.

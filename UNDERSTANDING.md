# Project Understanding Document – Root

**📚 Complete Documentation Hub:** See [docs/](docs/) directory for comprehensive system documentation including:
- [📖 Documentation Index](docs/README.md) - Role-based navigation and quick start guides
- [Architecture Overview](docs/01-architecture.md)
- [Component Details](docs/02-components.md) 
- [API Specifications](docs/04-apis.md)
- [Data Models](docs/05-data-models.md)
- [Deployment Guide](docs/06-deployment.md)
- [Operations & Observability](docs/07-operations-observability.md)

**🚀 Quick Start:** See [README.md](README.md) for project overview and quick start instructions.

This file is maintained by Copilot and provides a high-level technical overview of the current project state.

## High-Level Architecture
RSF (Reconciliation and Settlement Framework) Utility is a full-stack web application for ONDC (Open Network for Digital Commerce) network participants to manage order reconciliation and settlement processes. The system consists of two git submodules forming a complete microservice architecture.

**Technology Stack:**
- Backend: Node.js + Express + TypeScript + MongoDB
- Frontend: React 17 + TypeScript + Material-UI + React Query
- Infrastructure: Docker, Prometheus, Grafana Loki
- Testing: Jest, Supertest, MongoDB Memory Server

## Backend (Independent Submodule)
**Repository:** `https://github.com/ONDC-Official/rsf-utility-backend`
- **Entry Point:** `src/index.ts` → `src/server.ts`
- **Purpose:** RESTful API server for ONDC reconciliation and settlement operations
- **Port:** 3000 (configurable via PORT env variable)
- **Detailed Documentation:** See `rsf-utility-backend/UNDERSTANDING.md`

### Key Architecture Layers:
1. **Controller Layer** (`src/controller/`)
   - HTTP request handling, input validation, response formatting
   - Route separation: `/api/*` (external ONDC) vs `/ui/*` (internal operations)
   - Key controllers: auth, order, settle, recon, user, generate, trigger, payload

2. **Service Layer** (`src/services/`)
   - Business logic implementation and orchestration
   - Core services: OrderService, SettleDbManagementService, ReconDbService, UserService
   - Cross-cutting: AuthService, RsfOrchestratorService, TaxEngine

3. **Repository Layer** (`src/repositories/`)
   - Data access abstraction with Mongoose ODM
   - Repositories: order, settle, recon, user, rsf-payload, transaction

4. **Database Layer** (`src/db/`)
   - MongoDB connection management and schema definitions
   - Health monitoring and connection pooling

### Key Workflows:
1. **Startup**
   - Environment validation via `validateEnv()`
   - MongoDB connection establishment with health monitoring
   - Express server initialization with middleware stack
   - Graceful shutdown handlers (SIGTERM, SIGINT) registration
   - Health monitoring setup with Prometheus metrics

2. **Request Handling**
   - CORS enabled for cross-origin requests
   - JWT-based authentication (client-ID based, configurable)
   - Request/response logging with correlation IDs
   - Rate limiting and security middleware stack
   - Swagger API documentation at `/api-docs`
   - Route separation: `/api/*` (external) vs `/ui/*` (internal)

3. **Data Processing**
   - ONDC payload validation and schema compliance
   - Order lifecycle management with state transitions
   - Multi-participant settlement calculation with tax engine
   - Reconciliation workflow with discrepancy detection
   - File processing (CSV bulk imports, JSON configurations)
   - Transaction management with MongoDB transactions

4. **Core Services Architecture**
   ```
   Controller Layer → Service Layer → Repository Layer → Database
        ↓               ↓                ↓                ↓
   HTTP Handling   Business Logic   Data Access      MongoDB
   Input Validation  Orchestration   Abstraction     Persistence
   Response Format   Error Handling   Query Opt.     Transactions
   ```

### Service Components:
- **OrderService**: Order CRUD, state management, due date tracking
- **SettleDbManagementService**: Settlement calculation, preparation, validation
- **ReconDbService**: Reconciliation data management and workflow
- **UserService**: Network participant configuration and validation
- **TriggerService**: Workflow automation and external API orchestration
- **AuthService**: JWT token management and client authentication
- **RsfOrchestratorService**: Cross-service workflow coordination

### Architecture Patterns:
- **Dependency Injection**: Manual DI container in `src/di/container.ts`
- **Repository Pattern**: Data access abstraction with Mongoose ODM
- **Service Layer**: Business logic separation with transaction management
- **Controller Layer**: HTTP request handling with standardized responses
- **Middleware Pipeline**: Request correlation, logging, validation, auth

### Technical Implementation Patterns:
- **Request Correlation**: Automatic correlation ID generation for request tracking
- **Graceful Shutdown**: SIGTERM/SIGINT handlers for zero-downtime deployments
- **Health Monitoring**: `/health` endpoint with database connectivity checks
- **Schema Validation**: Multi-layer validation using Zod and AJV
- **Error Standardization**: Consistent error response format across all endpoints
- **Environment Configuration**: 12-factor app configuration with validation

## Frontend (Depends on Backend Submodule)
**Repository:** `https://github.com/ONDC-Official/rsf-utility-frontend`
- **Entry Point:** `src/index.tsx` → `src/App.tsx`
- **Purpose:** React-based dashboard for network participant settlement management
- **Port:** 3000 (default Create React App, typically served on 6500 in compose)
- **Detailed Documentation:** See `rsf-utility-frontend/UNDERSTANDING.md`

### Key Architecture Layers:
1. **Provider Hierarchy** (App.tsx)
   - ThemeProvider → BrowserRouter → QueryClientProvider → ToastProvider
   - LoaderProvider → AuthProvider → UserProvider → Application Routes

2. **Layout System** (`src/components/layout/`)
   - Sidebar navigation with route links
   - Navbar with user selection and branding
   - Content area with responsive Material-UI design

3. **Page Components** (`src/pages/`)
   - 8 main business feature pages: NetworkConfiguration, OrdersInProgress, OrdersReady
   - Settlement workflows: SettlementGenerator, SettlementDashboard, ReconciliationManager
   - Manual processes: MiscSettlements, NilSettlement

4. **State Management Architecture**
   - Server State: React Query for API data caching and synchronization
   - Client State: Context API for authentication, user selection, UI state
   - Form State: React Hook Form for complex form workflows

### Key Workflows:
1. **UI Rendering**
   - Material-UI based component system with responsive design
   - Hierarchical provider structure (Theme → Router → Query → Auth → User)
   - Layout system with sidebar navigation and content area
   - Form handling with react-hook-form and real-time validation
   - Data tables with pagination, sorting, and filtering capabilities

2. **API Calls to Backend**
   - Axios-based HTTP client with request/response interceptors
   - Automatic JWT token injection and refresh on 401 responses
   - React Query for intelligent caching, background updates, and optimistic UI
   - Standardized error handling with user-friendly notifications
   - Request correlation with loading states and error boundaries

3. **State Management Architecture**
   ```
   Server State (React Query) ← → Client State (Context API)
          ↓                              ↓
   API Data Caching              Global UI State Management
   Background Sync               Authentication & User Selection
   Optimistic Updates            Loading & Toast Notifications
   ```

4. **Core Feature Workflows**
   - **Configuration Flow**: User setup → Provider details → Validation → Persistence
   - **Settlement Flow**: Counterparty selection → Order selection → Generation → Trigger
   - **Reconciliation Flow**: Recon generation → Cross-participant communication → Review
   - **Order Management**: Listing → Filtering → Bulk operations → Status tracking

### Component Architecture:
- **Layout System**: Sidebar navigation + Navbar + Content area with ONDC branding
- **Page Components**: 8 main business feature pages with complex form workflows
- **Common Components**: Reusable UI elements (Table, Select, Button, Loader, etc.)
- **Context Providers**: Authentication, User management, Loading, Toast notifications
- **Custom Hooks**: API integration, form handling, and business logic abstraction

### Technology Integration:
- **React 17**: Core framework with hooks and functional components
- **TypeScript**: Strict typing for enhanced developer experience
- **Material-UI**: Component library with custom theming and responsive design
- **React Query**: Server state management with intelligent caching
- **React Hook Form**: Form state management with validation
- **React Router**: Client-side routing with protected routes

### Frontend Implementation Patterns:
- **Container/Presenter**: Logic/UI separation for maintainable components
- **Custom Hooks**: Reusable stateful logic for API integration
- **Context Consumers**: Global state access across component tree
- **Error Boundaries**: Component-level error handling and recovery
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Reference-Counted Loading**: Global loading state management
- **Automatic Token Refresh**: Seamless authentication with 401 retry logic

## Integration Points

### API Contracts
- **Base URL**: Configurable via `REACT_APP_BACKEND_URL` environment variable
- **Authentication**: JWT Bearer tokens via `/ui/auth/sign-token` endpoint
- **Request Format**: JSON with Content-Type application/json
- **Response Format**: Standardized success/error structure with data/message fields
- **Routes Structure**:
  - `/api/*` - External ONDC network payload processing (webhook endpoints)
  - `/ui/*` - Internal UI operations and data management (frontend APIs)

### Data Formats & Communication Patterns
- **Request/Response**: JSON with standardized success/error structure
  ```json
  Success: { "success": true, "data": {...}, "message": "..." }
  Error: { "success": false, "error": { "code": "...", "message": "..." } }
  ```
- **File Uploads**: Multipart form data for CSV bulk operations, JSON for configurations
- **ONDC Payloads**: Structured according to ONDC network specifications with Zod validation
- **Real-time Updates**: HTTP polling for status changes, no WebSocket implementation

### Frontend-Backend Integration Flow
```
Frontend Component → Custom Hook → React Query → Axios Instance → Backend API
      ↓                ↓             ↓              ↓              ↓
UI State Update ← Cache Update ← Response ← HTTP Response ← Business Logic
```

### Data Validation & Transformation Patterns

#### Backend Schema Validation
- **Zod Schemas**: Type-safe validation for API endpoints and database models
- **ONDC Compliance**: Retail schema validation (on_confirm, on_cancel, on_status, on_update)
- **RSF Protocol**: Settlement and reconciliation payload validation (settle, recon, report)
- **AJV Validation**: JSON Schema validation with RFC3339 datetime format support
- **Error Standardization**: Centralized error handling with consistent code mapping

#### Frontend Data Transformation
- **API Response Mapping**: Transform backend responses to frontend interfaces
- **Date Formatting**: Standardized date display (YYYY-MM-DD format)
- **Currency Formatting**: Consistent INR currency display with ₹ symbol
- **Number Formatting**: Two decimal place precision for financial calculations
- **Status Mapping**: Backend enums to frontend display labels

#### Type Safety & Interface Alignment
- **Backend Mongoose Models**: Database schema definitions with indexes and validation
  ```typescript
  // Order Model Structure
  order_id: String (indexed)
  user_id: String (indexed)
  bap_id/bpp_id: String (network participants)
  quote: { total_order_value: Number, breakup: Array }
  settle_status: Enum (READY, RECON, SETTLED)
  ```

- **Frontend TypeScript Interfaces**: API response type definitions
  ```typescript
  // Frontend Order Interface
  interface IOrder {
    id: string
    orderId: string
    collectorId: string
    receiverId: string
    totalOrderValue: number
    settle_status: string
  }
  ```

- **Data Flow Transformation**: Backend → Frontend mapping with type safety
  ```typescript
  // Transform function example
  const transformOrderData = (apiOrders: IOrderApiResponse[]): IOrder[] => 
    apiOrders.map(order => ({
      id: order._id,
      orderId: order.order_id,
      totalOrderValue: order.quote?.total_order_value || 0,
      dueDate: order.due_date ? formatDate(order.due_date) : null
    }))
  ```

### API Communication Patterns

#### REST API Design
- **Endpoint Structure**: RESTful URLs with resource-based naming
  ```
  GET /ui/orders/{userId}?status=READY - Fetch orders by status
  POST /ui/generate/{userId}/recon - Generate reconciliation
  PATCH /ui/settle/{userId} - Update settlement data
  ```

- **Query Parameters**: Filtering, pagination, and sorting support
- **Path Parameters**: User ID and action scoping for multi-tenant operations
- **Request Headers**: Content-Type, Authorization, and custom headers

#### Error Handling Integration
- **HTTP Status Codes**: Standard REST status code usage (200, 400, 401, 500)
- **Error Response Format**: Consistent error structure across all endpoints
- **Field Validation**: Detailed validation error messages for form feedback
- **Business Logic Errors**: Domain-specific error codes for application logic

### Authentication & Session Management
- **Client-ID based JWT authentication** with configurable expiration
- **Automatic token refresh** on 401 responses via Axios interceptors
- **Local storage persistence** for authentication state
- **Token injection** via request interceptors for all API calls
- **Logout/session cleanup** on authentication failures

### Error Handling Integration
- **HTTP Error Mapping**: Backend error codes to user-friendly messages
- **Validation Errors**: Field-level error display from backend validation
- **Network Errors**: Connection timeout and retry mechanisms
- **Global Error Boundary**: Unhandled error capture and user notification
- **Toast Notifications**: Consistent error/success message display

### Data Synchronization Patterns
- **React Query Cache**: Intelligent background refetching and stale data management
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Manual Cache Invalidation**: Explicit cache refresh after mutations
- **Polling Strategy**: Configurable intervals for real-time data updates
- **Offline Handling**: Graceful degradation when backend unavailable

## Submodules (Independent Git Repositories)

### Submodule Independence Analysis

Both submodules are **fully independent repositories** with their own:
- **Git History**: Separate commit histories and development timelines
- **CI/CD Pipelines**: Independent GitHub Actions workflows for deployment
- **Versioning**: Individual package.json versions and release cycles
- **Development Branches**: Separate branching strategies (backend: main only, frontend: main+develop+feature branches)
- **Infrastructure**: Independent Docker configurations and deployment targets
- **Documentation**: Each maintains its own UNDERSTANDING.md with detailed architecture
- **Documentation Synchronization**: Backend documentation harvested and synchronized to main repository `/docs/` folder

### Backend Submodule: `rsf-utility-backend`
- **Repository**: `https://github.com/ONDC-Official/rsf-utility-backend`
- **Independence Level**: **Fully Independent**
- **Current Commit**: `3d6f75b6a68077f4cab93afcb95a1b33d89a8920` (main branch)
- **Package Name**: `rsf-utility` (v1.0.0)
- **Development Status**: Active development with recent feature commits
- **CI/CD**: GitHub Actions workflow for deployment branch targeting EC2
- **Docker**: Standalone containerization with MongoDB service dependency
- **Documentation**: Comprehensive standalone documentation in `docs/` folder

**Independence Indicators:**
- ✅ Separate Git repository with own remote origin
- ✅ Independent CI/CD pipeline (`.github/workflows/deployment.yml`)
- ✅ Standalone package.json with own dependencies and scripts
- ✅ Independent Docker configuration and compose file
- ✅ Comprehensive documentation structure (`docs/` folder)
- ✅ Own development environment setup and testing framework
- ✅ Independent deployment workflow to EC2 infrastructure

### Frontend Submodule: `rsf-utility-frontend`
- **Repository**: `https://github.com/ONDC-Official/rsf-utility-frontend`
- **Independence Level**: **Fully Independent**
- **Current Commit**: `0bb8e8f3104c32b65e085be2146909c36db6f574` (main branch)
- **Package Name**: `ondc-rsf-adaptor` (v0.1.0)
- **Development Status**: Active with feature branch development (develop, fix/ui)
- **CI/CD**: GitHub Actions workflow for develop branch auto-deployment
- **Docker**: Standalone React build containerization with serve
- **Documentation**: Complete architectural understanding in UNDERSTANDING.md

**Independence Indicators:**
- ✅ Separate Git repository with own remote origin
- ✅ Independent CI/CD pipeline (`.github/workflows/rsf-utility.yml`)
- ✅ Standalone package.json with React ecosystem dependencies
- ✅ Independent Docker configuration for production builds
- ✅ Own development environment with Create React App tooling
- ✅ Independent deployment workflow targeting EC2
- ✅ Active feature branch development (develop, fix/ui branches)

### Submodule Integration Pattern

**Architecture Pattern**: **Microservice Architecture with Git Submodules**
```
Parent Repository (rsf-utility)
├── .gitmodules (submodule configuration)
├── rsf-utility-backend/ (independent service)
└── rsf-utility-frontend/ (independent client)
```

**Benefits of This Structure:**
1. **Independent Development Cycles**: Teams can develop and deploy services independently
2. **Versioning Isolation**: Each service maintains its own version and release schedule
3. **Technology Stack Flexibility**: Backend and frontend can evolve technologies independently
4. **Deployment Independence**: Services can be deployed to different infrastructure
5. **Team Autonomy**: Separate repositories allow for different access controls and workflows

**Coordination Mechanisms:**
- **Parent Repository**: Orchestrates overall project documentation and submodule versions
- **API Contracts**: Backend exposes REST APIs that frontend consumes
- **Environment Configuration**: Both services coordinate through environment variables
- **Deployment Coordination**: Parent repository can manage unified deployment if needed

### Development Workflow Impact

**Independent Development:**
- Each submodule can be developed, tested, and deployed independently
- Developers can work on backend without affecting frontend and vice versa
- Different teams can own different submodules with appropriate expertise

**Integration Points:**
- Backend exposes HTTP APIs that frontend consumes
- Environment variables coordinate configuration between services
- Docker networking enables local development with both services

### Version Management Strategy

**Parent Repository Role:**
- **Submodule Orchestration**: Pins specific commits from backend and frontend repositories
- **Documentation Hub**: Maintains comprehensive project overview and integration documentation
- **Release Coordination**: Can tag unified releases that include specific submodule versions
- **Development Coordination**: Provides workspace for developers working across both services

**Current Submodule Commits:**
```bash
# Backend: 3d6f75b6a68077f4cab93afcb95a1b33d89a8920 (heads/main)
# Frontend: 0bb8e8f3104c32b65e085be2146909c36db6f574 (heads/main)
```

**Integration Workflow:**
1. **Independent Development**: Each submodule develops in its own repository
2. **Submodule Updates**: Parent repository updates submodule references when ready for integration
3. **Unified Documentation**: Parent repository maintains overall project understanding
4. **Coordinated Releases**: Parent repository can create releases with specific submodule versions

**Benefits:**
- ✅ **Independent Teams**: Backend and frontend teams can work autonomously
- ✅ **Controlled Integration**: Parent repository controls when to integrate submodule changes
- ✅ **Version Stability**: Parent repository provides stable snapshots of working combinations
- ✅ **Documentation Coherence**: Single source of truth for project understanding
- ✅ **Deployment Flexibility**: Can deploy submodules independently or together

This architecture pattern is ideal for the RSF Utility project as it enables:
- **Team Autonomy**: Backend and frontend expertise can be specialized
- **Technology Evolution**: Services can adopt new technologies independently
- **Deployment Strategies**: Services can scale and deploy based on individual needs
- **Development Velocity**: Parallel development without blocking dependencies

## External Integrations

### Database & Persistence
- **MongoDB**: Primary database with Mongoose ODM, connection pooling, and health monitoring
- **Connection Management**: Automatic reconnection with circuit breaker patterns
- **Schema Validation**: Mongoose schemas with strict typing and validation
- **Transaction Support**: MongoDB transactions for data consistency
- **Indexing Strategy**: Optimized indexes for query performance

### ONDC Network Integration
- **Settlement Agency APIs**: External settlement processing and validation services
- **Network Participant Communication**: Cross-participant reconciliation workflows
- **Webhook Endpoints**: Real-time ONDC protocol event processing
- **Payload Validation**: Comprehensive ONDC specification compliance
- **Digital Signatures**: Cryptographic verification of network messages

### Observability & Monitoring
- **Prometheus**: Metrics collection, health monitoring, and performance tracking
- **Grafana Loki**: Centralized logging in production with structured JSON format
- **Winston Logger**: Structured logging with correlation IDs and metadata
- **Health Checks**: Multi-layer health monitoring (application, database, external APIs)
- **Request Tracing**: End-to-end request correlation across service boundaries

### Infrastructure & Deployment
- **Docker**: Containerized deployment with multi-stage builds and docker-compose orchestration
- **Kubernetes**: Production-ready orchestration with health checks and auto-scaling
- **NGINX**: Reverse proxy configuration for production deployments
- **SSL/TLS**: Certificate management and secure communication protocols

### Authentication & Security
- **JWT Authentication**: Client-ID based token system with configurable expiration
- **Rate Limiting**: API endpoint protection against abuse and DDoS
- **CORS Configuration**: Secure cross-origin request handling
- **Input Validation**: Multi-layer security validation (client, server, database)

## Testing Architecture

### Backend Testing Strategy
- **Unit Tests**: Service and utility function testing with Jest
- **Integration Tests**: API endpoint and database testing with Supertest
- **E2E Tests**: Multi-instance Docker testing with real database
- **Performance Tests**: Load and stress testing for settlement processing
- **Security Tests**: Authentication, authorization, and input validation testing
- **MongoDB Memory Server**: In-memory database for isolated testing

### Frontend Testing Strategy
- **Component Tests**: React component logic testing with React Testing Library
- **Hook Tests**: Custom hook behavior and state management testing
- **Integration Tests**: User interaction flows and API integration testing
- **Accessibility Tests**: ARIA compliance and keyboard navigation testing
- **Visual Regression**: UI consistency and responsive design testing

### Test Configuration & Tools
```typescript
Backend Testing Stack:
- Jest: Test runner with TypeScript support
- Supertest: HTTP endpoint testing
- MongoDB Memory Server: Isolated database testing
- Docker Compose: Multi-instance testing environment

Frontend Testing Stack:
- React Testing Library: Component testing
- Jest: Test runner and assertions
- User Event: User interaction simulation
- MSW: API mocking for isolated tests
```

## Performance & Optimization

### Backend Performance
- **Connection Pooling**: Optimized MongoDB connection management
- **Query Optimization**: Strategic database indexing and query patterns
- **Caching Strategy**: Redis integration for frequently accessed data
- **Resource Management**: Memory and CPU optimization for container deployment
- **Async Processing**: Non-blocking operations for settlement calculations

### Frontend Performance
- **React Optimization**: Component memoization with React.memo and useMemo
- **Bundle Optimization**: Code splitting and tree shaking for minimal bundle size
- **Caching Strategy**: React Query intelligent caching and background updates
- **Virtual Scrolling**: Efficient handling of large order datasets
- **Asset Optimization**: Image and font compression for faster loading

## Conventions

### Logging
- **Winston-based** structured logging with correlation IDs
- **Development**: Console output with colors and formatting
- **Production**: JSON format with Loki integration
- **Levels**: debug, info, warn, error with configurable LOG_LEVEL

### Error Handling
- **Standardized response format** with error codes and messages
- **Global error middleware** for unhandled exceptions
- **Graceful degradation** with health check endpoints
- **Validation errors** with detailed field-level feedback

### Code Style
- **TypeScript** strict mode for both frontend and backend
- **ESLint/Prettier** for code formatting consistency
- **Conventional commits** for changelog generation
- **Jest testing** with integration and unit test suites  

## Deployment Configurations

### Docker Compose Environments
```yaml
Available Configurations:
- docker-compose.yml: Production-ready stack with NGINX, observability
- docker-compose-scaffold.yml: Development stack with full observability
- docker-compose.dev.yml: Development environment with hot reload
```

### Container Architecture
```
Docker Network (rsf-network):
├── backend (rsf_backend:3000) - Node.js API server
├── frontend (rsf_frontend:6500) - React application
├── mongo (rsf_mongo:27017) - MongoDB database
├── loki (rsf_loki:3100) - Log aggregation
├── grafana (rsf_grafana:3001) - Monitoring dashboard
└── nginx (rsf_nginx:80/443) - Reverse proxy [optional]
```

### Production Considerations
- **Health Checks**: Kubernetes-ready health endpoints for all services
- **Resource Limits**: Memory and CPU constraints for container orchestration
- **Volume Management**: Persistent storage for database and logs
- **Network Security**: Service mesh integration and network policies
- **Secrets Management**: External secret stores for production credentials
- **SSL Termination**: Certificate management with Let's Encrypt integration

### Environment Configuration
```typescript
Critical Environment Variables:
Backend:
- NODE_ENV, PORT, MONGODB_URI
- JWT_SECRET, CLIENT_ID, CLIENT_SECRET
- ONDC_ENV, GATEWAY_*, REGISTRY_*
- SETTLEMENT_AGENCY_URL, LOG_LEVEL

Frontend:
- REACT_APP_BACKEND_URL
- PUBLIC_URL, GENERATE_SOURCEMAP

Observability:
- LOKI_HOST, GRAFANA_ADMIN_PASSWORD
- PROMETHEUS_PORT, METRICS_ENABLED
```

---

## Documentation Synchronization Protocol

### Copilot Sync Mechanism
This main repository UNDERSTANDING.md serves as the **canonical source of truth** for the entire RSF Utility system. When any submodule's UNDERSTANDING.md is updated, Copilot should:

1. **Ingest Changes**: Automatically detect changes in backend or frontend UNDERSTANDING.md files
2. **Reconcile Content**: Merge technical updates into this main document while preserving structure
3. **Update References**: Ensure cross-references between repositories remain accurate
4. **Maintain Consistency**: Keep architectural details synchronized across all documentation

### Documentation Hierarchy
```
Documentation Sources (Priority Order):
1. Main Repo UNDERSTANDING.md (this file) - Comprehensive system overview
2. Backend UNDERSTANDING.md - Technical implementation details
3. Frontend UNDERSTANDING.md - UI architecture and patterns
4. /docs/ Directory - Specialized documentation (APIs, deployment, etc.)
```

### Sync Triggers
- **Submodule Updates**: When submodule commits are updated in main repo
- **Architecture Changes**: When core system architecture is modified
- **New Features**: When new components or workflows are added
- **Integration Updates**: When external integrations are modified

This document is **continuously updated** whenever the parent repo, backend, frontend, or submodules change.  
Always refer here for the latest understanding.  

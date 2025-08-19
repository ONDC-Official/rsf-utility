# RSF Utility System Architecture

This document provides a comprehensive system-level view of the RSF (Reconciliation and Settlement Framework) Utility and how its components interact to enable ONDC network transaction processing.

## Table of Contents
- [System Overview](#system-overview)
- [High-Level Architecture](#high-level-architecture)
- [System Boundaries](#system-boundaries)
- [Component Architecture](#component-architecture)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Storage Architecture](#storage-architecture)
- [Integration Points](#integration-points)
- [Observability Stack](#observability-stack)

## System Overview

RSF Utility is a full-stack microservice application designed for ONDC (Open Network for Digital Commerce) network participants to manage order reconciliation and settlement operations. The system provides end-to-end transaction processing from order ingestion to settlement completion.

### Core Capabilities
- **Transaction Processing**: Ingestion and validation of ONDC protocol payloads with schema compliance
- **Settlement Management**: Multi-party settlement calculation, execution, and status tracking
- **Reconciliation**: Cross-participant transaction reconciliation with financial breakdown tracking
- **Administrative Interface**: Web-based management dashboard with role-based access control
- **Network Integration**: ONDC network protocol compliance with registry endpoints
- **Audit & Monitoring**: Comprehensive logging, observability, and health monitoring

### Key Business Features
- **Transaction payload ingestion** by network participants
- **Settlement interactions** with external Settlement Agency (SA)
- **Reconciliation workflows** with counterparty network participants
- **Intuitive UI** for operators (Finance team, Support team) and configuration management
- **Operational data persistence** in MongoDB with audit trails
- **Observability exposure** using Prometheus metrics and Grafana Loki logging
- **Secure API traffic** with JWT authentication and TLS encryption

### Technology Foundation
```typescript
interface TechnologyStack {
  backend: {
    runtime: "Node.js 18+ with TypeScript 5.9",
    framework: "Express.js 5.1 with middleware pipeline",
    database: "MongoDB 8.17 with Mongoose ODM",
    auth: "JWT-based authentication with client-ID validation",
    validation: "Zod 4.0 schemas + AJV JSON Schema validation",
    testing: "Jest 30.0 with MongoDB Memory Server"
  },
  frontend: {
    framework: "React 17.0 with TypeScript 4.5",
    ui: "Material-UI 5.18 with custom theming", 
    state: "React Query 3.34 + Context API",
    http: "Axios 0.26 with automatic token refresh",
    forms: "React Hook Form 7.62 with validation",
    testing: "React Testing Library with Jest DOM"
  },
  infrastructure: {
    containerization: "Docker with multi-stage builds",
    orchestration: "Docker Compose for service coordination",
    monitoring: "Prometheus 15.1 + Grafana Loki 6.1",
    deployment: "EC2 with GitHub Actions CI/CD workflows",
    security: "Rate limiting, CORS, JWT tokens"
  }
}
```

## High-Level Architecture

### System Overview Diagram
![RSF Utility High-Level Design](HLD.jpg)
*Comprehensive system architecture showing component interactions and data flow*

### Component Interaction Flow

```mermaid
graph TB
    subgraph "External Systems"
        ONDC[ONDC Network]
        SA[Settlement Agency]
        Registry[ONDC Registry]
    end
    
    subgraph "RSF Utility System"
        subgraph "Frontend Layer"
            UI[React Dashboard]
            Auth[Authentication]
        end
        
        subgraph "Backend Layer"
            API[API Gateway]
            Controller[Controllers]
            Service[Service Layer]
            Repository[Repository Layer]
        end
        
        subgraph "Data Layer"
            MongoDB[(MongoDB)]
            Cache[Redis Cache]
        end
        
        subgraph "Infrastructure"
            Docker[Docker Containers]
            Nginx[Load Balancer]
            Monitoring[Prometheus/Grafana]
        end
    end
    
    ONDC -->|Webhooks| API
    SA -->|Callbacks| API
    Registry -->|Lookup| API
    
    UI -->|HTTPS/REST| API
    API --> Controller
    Controller --> Service
    Service --> Repository
    Repository --> MongoDB
    
    Service -.->|Metrics| Monitoring
    API -.->|Logs| Monitoring
```

## System Boundaries

### 1. Admin Management Boundary
**Scope**: User configuration, network participant setup, system administration
- **Components**: User management, provider configuration, system settings
- **Interfaces**: Web UI, REST API endpoints (`/ui/*`)
- **Data**: User profiles, network configurations, access controls
- **Security**: JWT authentication, role-based access

### 2. Settlement Agency Interface Boundary  
**Scope**: External settlement processing and callback handling
- **Components**: Settlement request generation, callback processing
- **Interfaces**: HTTP APIs for settlement agencies
- **Data**: Settlement payloads, transaction references, status tracking
- **Protocols**: ONDC settlement protocol compliance

### 3. Network Interface Boundary
**Scope**: ONDC network communication and protocol compliance
- **Components**: Transaction ingestion, reconciliation processing
- **Interfaces**: ONDC webhook endpoints (`/api/*`)
- **Data**: Order transactions, reconciliation requests, network messages
- **Protocols**: ONDC transaction protocol (on_confirm, on_status, etc.)

### 4. Async Transaction Manager Boundary
**Scope**: Background transaction processing and state management
- **Components**: Transaction correlation, state machines, audit logging
- **Interfaces**: Internal service APIs, database transactions
- **Data**: Transaction state, correlation IDs, audit trails
- **Features**: Atomic operations, retry mechanisms, error handling

## Component Architecture

### Backend Service Architecture

```mermaid
graph TB
    subgraph "Middleware Layer"
        AM[Auth Middleware]
        RL[Rate Limiter]
        CL[CORS Middleware]
        RM[Request Logger]
        VM[Validation Middleware]
    end
    
    subgraph "Controller Layer"
        AC[Auth Controller]
        OC[Order Controller] 
        SC[Settle Controller]
        RC[Recon Controller]
        UC[User Controller]
        PC[Payload Controller]
        GC[Generate Controller]
        VC[Validation Controller]
        FC[File Validation Controller]
        TC[Trigger Controller]
    end
    
    subgraph "Service Layer"
        AS[Auth Service]
        OS[Order Service]
        SMS[Settlement DB Service]
        RMS[Recon DB Service]
        US[User Service]
        TS[Trigger Service]
        RSFO[RSF Orchestrator Service]
        VLS[Validation Service]
    end
    
    subgraph "Repository Layer"
        OR[Order Repository]
        SR[Settle Repository]
        RR[Recon Repository]
        UR[User Repository]
        TR[Transaction Repository]
        PR[RSF Payload Repository]
    end
    
    subgraph "Database Layer"
        MongoDB[(MongoDB)]
        HealthMonitor[Health Monitor]
    end
    
    subgraph "External Interfaces"
        ONDC[ONDC Network]
        SA[Settlement Agency]
        Registry[ONDC Registry]
    end
    
    AM --> AC
    RL --> OC
    CL --> SC
    RM --> RC
    VM --> UC
    
    AC --> AS
    OC --> OS
    SC --> SMS
    RC --> RMS
    UC --> US
    PC --> OS
    GC --> SMS
    VC --> VLS
    FC --> VLS
    TC --> TS
    
    OS --> OR
    SMS --> SR
    RMS --> RR
    US --> UR
    TS --> TR
    RSFO --> SMS
    RSFO --> RMS
    VLS --> PR
    
    OR --> MongoDB
    SR --> MongoDB
    RR --> MongoDB
    UR --> MongoDB
    TR --> MongoDB
    PR --> MongoDB
    
    HealthMonitor -.->|Monitors| MongoDB
    
    ONDC -.->|Webhooks| OC
    SC -.->|API Calls| SA
    TS -.->|Lookups| Registry
    RSFO --> RMS
    RSFO --> OS
    RSFO --> US
```

### Service Responsibilities

#### Core Services
- **OrderService**: Order CRUD operations, lifecycle management, due date tracking
- **SettleDbManagementService**: Settlement calculation, preparation, multi-party coordination
- **ReconDbService**: Reconciliation workflow, cross-participant communication
- **UserService**: Network participant configuration, provider management
- **TransactionService**: Transaction correlation, audit logging, state persistence
- **AuthService**: JWT token management, client authentication
- **RsfOrchestratorService**: Cross-service coordination, workflow automation

#### Repository Pattern
```typescript
interface RepositoryPattern {
  abstraction: "Data access layer isolation",
  implementation: "Mongoose ODM with MongoDB",
  features: [
    "Query optimization with indexes",
    "Transaction support for atomic operations", 
    "Connection pooling for performance",
    "Schema validation at database level"
  ]
}
```

### Frontend Component Architecture

```mermaid
graph TB
    subgraph "Application Layer"
        App[App.tsx]
        Router[React Router]
        Theme[Material-UI Theme]
    end
    
    subgraph "Provider Layer"
        QC[QueryClient Provider]
        AC[Auth Context Provider]
        UC[User Context Provider]
        LC[Loader Context Provider]
        TC[Toast Context Provider]
    end
    
    subgraph "Page Components"
        NetworkConfig[Network Configuration]
        OrdersReady[Orders Ready]
        OrdersInProgress[Orders In Progress]
        Settlement[Settlement Management]
        Reconciliation[Reconciliation]
    end
    
    subgraph "Common Components"
        Table[Data Table]
        Forms[Form Components]
        Layout[Layout System]
        UI[UI Components]
    end
    
    subgraph "Hooks Layer"
        API[API Hooks]
        State[State Hooks]
        Form[Form Hooks]
    end
    
    App --> Router
    Router --> Theme
    Theme --> QC
    QC --> AC
    AC --> UC
    UC --> LC
    LC --> TC
    
    TC --> NetworkConfig
    TC --> OrdersReady
    TC --> OrdersInProgress
    TC --> Settlement
    TC --> Reconciliation
    
    NetworkConfig --> Table
    OrdersReady --> Forms
    Settlement --> Layout
    Reconciliation --> UI
    
    Table --> API
    Forms --> State
    Layout --> Form
```

## Data Flow Diagrams

### 1. Transaction Processing Flow

```mermaid
sequenceDiagram
    participant ONDC as ONDC Network
    participant API as API Gateway
    participant Controller as Controller
    participant Service as Service Layer
    participant DB as MongoDB
    participant Audit as Audit Logger
    
    ONDC->>API: POST /api/on_confirm
    API->>Controller: Route request
    Controller->>Controller: Schema validation
    Controller->>Service: Process transaction
    Service->>DB: Store order data
    Service->>Audit: Log transaction
    Service->>Controller: Return response
    Controller->>API: Success response
    API->>ONDC: ACK/NACK response
```

### 2. Settlement Generation Flow

```mermaid
sequenceDiagram
    participant UI as Frontend UI
    participant API as Backend API
    participant Settlement as Settlement Service
    participant Order as Order Service
    participant User as User Service
    participant DB as MongoDB
    participant SA as Settlement Agency
    
    UI->>API: POST /ui/generate/{userId}/settle
    API->>Settlement: Generate settlement
    Settlement->>Order: Fetch ready orders
    Settlement->>User: Get user configuration
    Settlement->>Settlement: Calculate settlement amounts
    Settlement->>DB: Store settlement records
    Settlement->>SA: Send settlement request
    SA->>API: Settlement callback
    API->>Settlement: Update settlement status
    Settlement->>DB: Update status
    Settlement->>UI: Return settlement data
```

### 3. Reconciliation Workflow

```mermaid
sequenceDiagram
    participant UI as Frontend UI
    participant API as Backend API  
    participant Recon as Recon Service
    participant Settlement as Settlement Service
    participant Network as ONDC Network
    participant DB as MongoDB
    
    UI->>API: POST /ui/generate/{userId}/recon
    API->>Recon: Generate reconciliation
    Recon->>Settlement: Get settlement data
    Recon->>Recon: Prepare recon payload
    Recon->>DB: Store recon record
    Recon->>Network: Send recon request
    Network->>API: POST /api/on_recon
    API->>Recon: Process recon response
    Recon->>DB: Update recon status
    Recon->>UI: Return updated status
```

## Storage Architecture

### MongoDB Collection Design

```mermaid
erDiagram
    Users ||--o{ Orders : manages
    Users ||--o{ Settlements : owns
    Users ||--o{ Reconciliations : creates
    Orders ||--o{ Settlements : generates
    Orders ||--o{ Transactions : tracks
    Settlements ||--o{ Reconciliations : reconciles
    
    Users {
        string _id PK
        string title
        string role
        string subscriber_url
        string domain
        number np_tcs
        number np_tds
        boolean msn
        array provider_details
        array counterparty_infos
        string tcs_applicability
        string tds_applicability
        date createdAt
        date updatedAt
    }
    
    Orders {
        string _id PK
        string order_id UK
        string user_id FK
        string bap_id
        string bpp_id
        string domain
        string provider_id
        string state
        object quote
        string settle_status
        date due_date
        date created_at
        date updated_at
    }
    
    Settlements {
        string _id PK
        string order_id FK
        string user_id FK
        string settlement_id
        string collector_id
        string receiver_id
        number total_order_value
        number commission
        number collector_settlement
        number tds
        number tcs
        number withholding_amount
        string type
        string status
        array transaction_db_ids
        date due_date
        date createdAt
        date updatedAt
    }
    
    Reconciliations {
        string _id PK
        string user_id FK
        string order_id FK
        string collector_id
        string receiver_id
        string recon_status
        string settlement_id
        string payment_id
        array transaction_db_ids
        string transaction_id
        object breakdown
        date createdAt
        date updatedAt
    }
    
    Transactions {
        string _id PK
        object context
        string action
        string transaction_id
        string message_id
        object message
        object currency
        date createdAt
        date updatedAt
    }
```

### Database Configuration

#### Indexes for Performance
```typescript
interface DatabaseIndexes {
  orders: [
    { order_id: 1, user_id: 1 },    // Compound index for lookups
    { user_id: 1, state: 1 },       // Status filtering
    { due_date: 1 },                // Date range queries
    { settle_status: 1 },           // Settlement status
    { created_at: -1 }              // Time-based ordering
  ],
  settlements: [
    { user_id: 1, order_id: 1 },    // Primary lookup
    { settlement_id: 1 },           // Settlement tracking
    { status: 1 },                  // Status filtering
    { due_date: 1 },                // Payment due dates
    { type: 1 }                     // Settlement type filtering
  ],
  reconciliations: [
    { user_id: 1, order_id: 1 },    // Primary lookup
    { recon_status: 1 },            // Status filtering
    { settlement_id: 1 },           // Settlement correlation
    { transaction_id: 1 }           // Transaction tracking
  ],
  transactions: [
    { "context.transaction_id": 1 }, // Transaction correlation
    { "context.message_id": 1 },     // Message tracking
    { "context.action": 1 },         // Action filtering
    { createdAt: -1 }               // Time-based queries
  ]
}
```

#### Connection & Performance
- **Connection Pooling**: MongoDB driver with configurable pool size
- **Transaction Support**: Multi-document ACID transactions for complex operations
- **Schema Validation**: Mongoose schema validation with custom validators
- **Data Consistency**: Atomic operations for critical business workflows

## Integration Points

### External System Integration

#### 1. ONDC Network Integration
```typescript
interface ONDCIntegration {
  endpoints: {
    incoming: ["/api/on_confirm", "/api/on_status", "/api/on_update", "/api/on_cancel"],
    outgoing: ["Registry lookup", "Settlement requests", "Reconciliation"]
  },
  protocols: {
    validation: "ONDC schema compliance",
    authentication: "Digital signatures",
    correlation: "Transaction and Message IDs"
  },
  features: {
    retry: "Automatic retry with backoff",
    timeout: "Configurable request timeouts", 
    monitoring: "Request/response logging"
  }
}
```

#### 2. Settlement Agency Integration
```typescript
interface SettlementAgencyIntegration {
  communication: {
    protocol: "HTTPS REST API",
    format: "JSON payloads",
    authentication: "API keys and certificates"
  },
  operations: {
    settle: "Initiate settlement requests",
    callback: "Handle settlement status updates",
    query: "Settlement status inquiries"
  },
  reliability: {
    retry: "Failed request retry logic",
    correlation: "Settlement reference tracking",
    timeout: "Configurable API timeouts"
  }
}
```

### Internal System Communication

#### Frontend-Backend Communication
```typescript
interface FrontendBackendIntegration {
  protocol: "HTTPS REST API",
  authentication: "JWT Bearer tokens",
  endpoints: {
    admin: "/ui/users, /ui/auth/*",
    orders: "/ui/orders/{userId}",
    settlements: "/ui/settle/{userId}/*", 
    reconciliation: "/ui/recon/{userId}/*",
    triggers: "/ui/trigger/{userId}/{action}"
  },
  features: {
    caching: "React Query intelligent caching",
    realtime: "HTTP polling for status updates",
    offline: "Graceful degradation capabilities",
    validation: "Type-safe request/response handling"
  }
}
```

## Observability Stack

### Monitoring Architecture

```mermaid
graph TB
    subgraph "Application Metrics"
        App[Application Instances]
        Metrics[Prometheus Metrics]
        Logs[Structured Logs]
    end
    
    subgraph "Collection Layer"
        Prometheus[Prometheus Server]
        Loki[Grafana Loki]
        Agent[Collection Agents]
    end
    
    subgraph "Visualization Layer"
        Grafana[Grafana Dashboard]
        Alerts[Alert Manager]
    end
    
    subgraph "Storage Layer"
        PromDB[(Prometheus TSDB)]
        LokiDB[(Loki Storage)]
    end
    
    App --> Metrics
    App --> Logs
    Metrics --> Prometheus
    Logs --> Loki
    
    Prometheus --> PromDB
    Loki --> LokiDB
    
    PromDB --> Grafana
    LokiDB --> Grafana
    
    Grafana --> Alerts
```

### Observability Features

#### Metrics Collection
```typescript
interface MetricsCollection {
  application: {
    http_requests: "Request count and duration",
    database_queries: "Query performance metrics", 
    settlement_processing: "Settlement operation metrics",
    reconciliation_status: "Reconciliation workflow metrics"
  },
  system: {
    cpu_usage: "CPU utilization monitoring",
    memory_usage: "Memory consumption tracking",
    disk_io: "Disk read/write operations",
    network_io: "Network traffic monitoring"
  },
  business: {
    transaction_volume: "Daily transaction counts",
    settlement_amounts: "Settlement value tracking",
    error_rates: "Business logic error rates",
    sla_compliance: "Service level agreement metrics"
  }
}
```

#### Logging Strategy
```typescript
interface LoggingStrategy {
  structured: "JSON format for machine parsing",
  correlation: "Request correlation IDs",
  levels: ["debug", "info", "warn", "error"],
  transport: {
    development: "Console with colors",
    production: "Grafana Loki aggregation"
  },
  content: {
    request_response: "API call logging",
    business_events: "Settlement and reconciliation events",
    errors: "Detailed error context and stack traces",
    performance: "Operation timing and resource usage"
  }
}
```

#### Health Monitoring
- **Health Check Endpoints**: `/health` for application status
- **Database Connectivity**: MongoDB connection monitoring
- **External Service Status**: ONDC network and settlement agency availability
- **Resource Monitoring**: Memory, CPU, and disk usage tracking
- **Alert Configuration**: Threshold-based alerting for critical metrics

---

This architecture document provides the foundation for understanding RSF Utility's system design and serves as a reference for development, deployment, and maintenance activities.

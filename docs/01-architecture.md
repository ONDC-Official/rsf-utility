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

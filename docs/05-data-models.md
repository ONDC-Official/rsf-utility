# Data Models & Storage Architecture

## Overview

The RSF Utility employs a sophisticated MongoDB-based data architecture designed to handle ONDC network transactions, settlements, and reconciliations. The system uses domain-driven design principles with comprehensive schema validation, strategic indexing, and robust data lifecycle management.

**Database Technology**: MongoDB with Mongoose ODM
**Schema Validation**: Dual-layer validation (Mongoose + Zod/AJV)
**Collection Strategy**: Domain-segregated with optimized indexes
**Data Governance**: Audit logging, correlation tracking, and type safety

---

## Core Domain Entities

### 1. Order Entity

**Purpose**: Central entity for order lifecycle management and settlement tracking

#### Database Model
```typescript
// Collection: orders
interface OrderDocument {
  order_id: string;          // Business identifier (indexed)
  user_id: string;          // User reference (indexed)
  bap_id: string;           // Buyer app participant ID
  bpp_id: string;           // Seller app participant ID
  bap_uri: string;          // Buyer app URI
  bpp_uri: string;          // Seller app URI
  domain: string;           // ONDC domain (e.g., "ONDC:RET10")
  provider_id: string;      // Provider identifier
  state: OrderState;        // Order state enum
  
  // Financial Details
  total_order_value: number;        // Total order amount (rounded to 2 decimals)
  commission: number;               // Commission amount
  collector_settlement: number;     // Settlement for collector
  tds: number;                     // Tax deducted at source
  tcs: number;                     // Tax collected at source
  withholding_amount: number;      // Amount withheld
  inter_np_settlement: number;     // Inter-participant settlement
  
  // Settlement Configuration
  collected_by: "BAP" | "BPP";              // Payment collector
  settlement_counterparty: string;          // Settlement counterparty ID
  buyer_finder_fee_amount: number;          // Finder fee amount
  buyer_finder_fee_type: string;           // Finder fee type
  settlement_basis?: string;                // Settlement basis
  settlement_window?: string;               // Settlement window
  msn: boolean;                            // MSN vs ISN indicator
  
  // Lifecycle Management
  settle_status: SettleStatus;              // READY | RECON | SETTLED
  due_date?: Date;                         // Settlement due date
  quote: QuoteDetails;                     // Structured quote breakdown
  payment_transaction_id?: string;         // Payment reference
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
}

enum SettleStatus {
  READY = "READY",
  RECON = "RECON", 
  SETTLED = "SETTLED"
}

enum OrderState {
  CREATED = "Created",
  ACCEPTED = "Accepted",
  IN_PROGRESS = "In-progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled"
}
```

#### Schema Indexes
```typescript
// Primary Indexes
{ order_id: 1, user_id: 1 }    // Unique composite index
{ user_id: 1 }                 // User lookup
{ settle_status: 1 }           // Status filtering
{ due_date: 1 }               // Due date queries
{ domain: 1 }                 // Domain-based filtering
{ provider_id: 1 }            // Provider queries
```

#### Business Invariants
- **Uniqueness**: One order per (order_id, user_id) combination
- **Financial Precision**: All monetary fields rounded to 2 decimal places
- **State Transitions**: Order state follows ONDC lifecycle
- **Settlement Readiness**: Orders become settlement-ready only after completion
- **MSN/ISN Logic**: MSN flag determines settlement calculation logic

---

### 2. Settlement Entity

**Purpose**: Settlement preparation, tracking, and execution management  
**Implementation**: `src/db/models/settle-model.ts`

#### Database Model
```typescript
// Collection: settlements
interface SettlementDocument {
  // Core Identifiers
  order_id: string;             // Source order reference
  user_id: string;             // User reference (indexed)
  settlement_id: string;       // Unique settlement identifier (indexed)
  collector_id: string;        // Payment collector participant ID
  receiver_id: string;         // Payment receiver participant ID
  
  // Financial Breakdown
  total_order_value: number;    // Total transaction value
  commission: number;           // Commission amount (BFF + taxes)
  collector_settlement: number; // Net amount to collector
  tds: number;                 // Tax deducted at source
  tcs: number;                 // Tax collected at source  
  withholding_amount: number;   // Amount withheld from settlement
  inter_np_settlement: number;  // Net inter-participant settlement
  
  // Provider Details (for BPP participants)
  provider_id?: string;         // Provider identifier
  provider_settlement?: number; // Provider settlement amount
  
  // Settlement Processing
  due_date: Date;              // Settlement due date
  type: SettlementType;        // Settlement type enum
  status: SettlementStatus;     // Overall settlement status
  provider_status?: SettlementStatus;  // Provider-specific status
  self_status?: SettlementStatus;      // Self settlement status
  
  // Reference Tracking
  settlement_reference?: string;         // External settlement reference
  provider_settlement_reference?: string; // Provider settlement reference  
  self_settlement_reference?: string;     // Self settlement reference
  transaction_db_ids: string[];          // Related transaction IDs
  
  // Error Handling
  error?: string;              // Error message if settlement fails
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

enum SettlementType {
  SINGLE = "SINGLE",           // Single order settlement
  BATCH = "BATCH"              // Batch settlement (multiple orders)
}

enum SettlementStatus {
  INACTIVE = "INACTIVE",       // Settlement not yet active
  ERROR = "ERROR",             // Settlement processing error
  SENT_PENDING = "SENT_PENDING", // Sent to settlement agency, pending
  SENT_ACCEPTED = "SENT_ACCEPTED", // Accepted by settlement agency
  SENT_COMPLETED = "SENT_COMPLETED", // Completed by settlement agency
  SENT_REJECTED = "SENT_REJECTED"  // Rejected by settlement agency
}
```

#### Schema Indexes
```typescript
// Primary Indexes  
{ user_id: 1, order_id: 1 }    // Unique composite (prevents duplicates)
{ settlement_id: 1 }           // Settlement lookup
{ collector_id: 1 }           // Collector queries
{ receiver_id: 1 }            // Receiver queries
{ status: 1 }                 // Status filtering
{ due_date: 1 }              // Due date queries
{ type: 1 }                  // Settlement type filtering
```

#### Settlement Calculation Logic
```typescript
// BFF (Buyer Finder Fee) Calculation
const bffWithGST = bffAmount * 1.18; // 18% GST on BFF

// Net Settlement Calculation for MSN
if (order.msn) {
  collectorSettlement = totalOrderValue - bffWithGST - tcs + tds;
  interNpSettlement = bffWithGST + tcs - tds - withholdingAmount;
} else {
  // ISN calculation logic
  collectorSettlement = totalOrderValue - commission - tcs + tds;
  interNpSettlement = commission + tcs - tds - withholdingAmount;
}
```

#### Business Rules
- **Uniqueness**: One settlement per (user_id, order_id) combination
- **Status Progression**: INACTIVE → SENT_PENDING → SENT_ACCEPTED → SENT_COMPLETED
- **Financial Integrity**: Sum of all settlement amounts equals total order value
- **Batch Limits**: Maximum 100 orders per batch settlement
- **Due Date Enforcement**: Settlements must be processed by due date

---

### 3. Reconciliation Entity

**Purpose**: Cross-participant reconciliation tracking and financial breakdown management  
**Implementation**: `src/db/models/recon-model.ts`

#### Database Model
```typescript
// Collection: reconciliations
interface ReconciliationDocument {
  // Core Identifiers
  user_id: string;             // User reference (indexed)
  order_id: string;            // Source order reference (indexed)
  collector_id: string;        // Payment collector participant ID
  receiver_id: string;         // Payment receiver participant ID
  settlement_id: string;       // Related settlement ID (indexed)
  
  // Reconciliation Status
  recon_status: ReconStatus;   // Reconciliation status enum
  
  // Payment Reference
  payment_id?: string;         // Payment transaction reference
  
  // Financial Breakdown
  recon_breakdown: {
    amount: number;            // Total reconciliation amount
    commission: number;        // Commission breakdown
    withholding_amount: number; // Withholding breakdown
    tcs: number;              // TCS breakdown
    tds: number;              // TDS breakdown
  };
  
  // Transaction Correlation
  transaction_db_ids: string[]; // Related transaction document IDs
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

enum ReconStatus {
  INACTIVE = "INACTIVE",       // Reconciliation not initiated
  SENT_PENDING = "SENT_PENDING", // Sent to counterparty, awaiting response
  SENT_ACCEPTED = "SENT_ACCEPTED", // Accepted by counterparty
  SENT_REJECTED = "SENT_REJECTED", // Rejected by counterparty
  RECEIVED_PENDING = "RECEIVED_PENDING", // Received from counterparty
  RECEIVED_ACCEPTED = "RECEIVED_ACCEPTED", // Accepted received reconciliation
  RECEIVED_REJECTED = "RECEIVED_REJECTED", // Rejected received reconciliation
  ERROR = "ERROR"              // Reconciliation processing error
}
```

#### Schema Indexes
```typescript
// Primary Indexes
{ user_id: 1 }                // User-based queries
{ order_id: 1 }              // Order reconciliation lookup
{ settlement_id: 1 }         // Settlement-based reconciliation
{ recon_status: 1 }          // Status filtering
{ collector_id: 1, receiver_id: 1 } // Participant pair queries
```

#### Reconciliation Business Logic
```typescript
// Reconciliation Workflow States
const reconWorkflow = {
  // Outbound reconciliation (self-initiated)
  outbound: [
    "INACTIVE" → "SENT_PENDING" → ["SENT_ACCEPTED" | "SENT_REJECTED"]
  ],
  
  // Inbound reconciliation (received from counterparty)
  inbound: [
    "RECEIVED_PENDING" → ["RECEIVED_ACCEPTED" | "RECEIVED_REJECTED"]
  ]
};

// NACK Conditions
const nackConditions = [
  "Reconciliation already in SENT_PENDING state",
  "Reconciliation already in SENT_ACCEPTED state", 
  "Settlement not found for order",
  "Financial breakdown mismatch"
];
```

---

### 4. Transaction Entity

**Purpose**: Complete ONDC protocol message auditing and correlation tracking  
**Implementation**: `src/db/models/transaction-model.ts`

#### Database Model
```typescript
// Collection: rsf_transactions
interface TransactionDocument {
  // ONDC Protocol Context
  context: {
    domain: string;            // ONDC domain (e.g., "ONDC:NTS10")
    location: {
      country: { code: string }; // Country code (e.g., "IND")
      city: { code: string };    // City code (e.g., "std:080")
    };
    version: string;           // Protocol version (e.g., "2.0.0")
    action: string;            // Protocol action (indexed)
    transaction_id: string;    // ONDC transaction ID
    message_id: string;        // ONDC message ID  
    timestamp: string;         // ISO 8601 timestamp
    bap_id?: string;          // Buyer app participant ID
    bap_uri?: string;         // Buyer app URI
    bpp_id?: string;          // Seller app participant ID
    bpp_uri?: string;         // Seller app URI
    ttl?: string;             // Time to live
  };
  
  // Message Payload
  message: any;              // Full ONDC message payload (flexible schema)
  
  // Error Handling
  error?: {
    code: string;            // Error code
    message: string;         // Error description
  };
  
  // Correlation
  correlation_id?: string;   // Request correlation ID
  
  // Timestamps
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}
```

#### Schema Indexes  
```typescript
// Primary Indexes
{ "context.action": 1 }          // Action-based queries
{ "context.domain": 1 }          // Domain filtering
{ "context.transaction_id": 1 }  // Transaction correlation
{ "context.message_id": 1 }      // Message tracking
{ "context.bap_id": 1 }         // Buyer app queries
{ "context.bpp_id": 1 }         // Seller app queries
{ "correlation_id": 1 }         // Request correlation
{ "timestamps.createdAt": 1 }   // Time-based queries
```

#### Supported ONDC Actions
```typescript
const supportedActions = [
  // Transaction Actions
  "on_confirm",              // Order confirmation
  "on_status",               // Order status update
  "on_update",               // Order update
  "on_cancel",               // Order cancellation
  
  // Settlement Actions
  "settle",                  // Settlement request
  "on_settle",               // Settlement response
  
  // Reconciliation Actions
  "recon",                   // Reconciliation request
  "on_recon"                 // Reconciliation response
];
```

---

### 5. User Entity

**Purpose**: Network participant configuration and provider management  
**Implementation**: `src/db/models/user-model.ts`

#### Database Model
```typescript
// Collection: users
interface UserDocument {
  // Core Identity
  title: string;             // Display name (unique index)
  role: ParticipantRole;     // BAP | BPP role
  subscriber_url: string;    // ONDC subscriber URL
  domain: string;            // ONDC domain (e.g., "ONDC:RET10")
  
  // Tax Configuration
  np_tcs: number;           // Network participant TCS rate
  np_tds: number;           // Network participant TDS rate
  pr_tcs?: number;          // Provider TCS rate (for BPP)
  pr_tds?: number;          // Provider TDS rate (for BPP)
  
  // Network Configuration
  msn: boolean;             // MSN vs ISN indicator
  counterparty_ids: string[]; // List of counterparty participant IDs
  
  // Provider Details (for BPP participants)
  provider_details: Array<{
    provider_name: string;   // Provider display name
    provider_id: string;    // Unique provider identifier
    account_number: string; // Bank account number
    ifsc_code: string;      // Bank IFSC code
    bank_name: string;      // Bank name
  }>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

enum ParticipantRole {
  BAP = "BAP",              // Buyer App Provider
  BPP = "BPP"               // Seller App Provider  
}
```

#### Schema Indexes
```typescript
// Unique Indexes
{ role: 1, subscriber_url: 1, domain: 1 } // Unique composite
{ title: 1 }                              // Unique title

// Lookup Indexes
{ role: 1 }               // Role-based queries
{ domain: 1 }             // Domain filtering
{ msn: 1 }               // MSN/ISN filtering
```

#### User Configuration Validation
```typescript
// Business Rules
const userValidation = {
  // Provider details required for BPP
  bppRequirements: [
    "provider_details array must not be empty",
    "Each provider must have valid bank details",
    "Provider IDs must be unique within user"
  ],
  
  // Tax rates validation
  taxRates: [
    "TCS/TDS rates must be between 0 and 100",
    "Provider tax rates required only for BPP"
  ],
  
  // Network configuration
  networkRules: [
    "Counterparty IDs must be valid participant IDs",
    "MSN flag determines settlement calculation logic"
  ]
};
```  
interface SettlementDocument {
  order_id: string;              // Reference to order (indexed)
  user_id: string;              // User reference (indexed)
  settlement_id: string;        // Business settlement ID (indexed)
  collector_id: string;         // Collecting participant
  receiver_id: string;          // Receiving participant
  
  // Financial Breakdown
  total_order_value: number;     // Order total (2 decimal precision)
  commission: number;            // Commission amount
  collector_settlement: number;  // Amount for collector
  tds: number;                  // Tax deducted at source
  tcs: number;                  // Tax collected at source
  withholding_amount: number;   // Withheld amount
  inter_np_settlement: number;  // Inter-participant amount
  
  // Settlement Configuration
  type: SettlementType;          // Settlement type enum
  due_date?: Date;              // Settlement due date
  
  // Status Management
  status: SettlementStatus;                    // Overall status
  provider_status?: SettlementStatus;         // Provider-specific status
  self_status?: SettlementStatus;            // Self settlement status
  
  // Reference Management
  settlement_reference?: string;              // Settlement reference
  provider_settlement_reference?: string;     // Provider reference
  self_settlement_reference?: string;        // Self reference
  
  // Error Handling
  error?: string;                            // Error details
  
  // Transaction Correlation
  transaction_db_ids: string[];             // Related transaction IDs
  context?: OndcContext;                    // ONDC context for traceability
  
  // Lifecycle Timestamps
  initiated_date?: Date;        // Settlement initiation
  created_at: Date;
  updated_at: Date;
}

enum SettlementType {
  NP_NP = "np-np",
  MISC = "misc", 
  NIL = "nil"
}

enum SettlementStatus {
  PENDING = "PENDING",
  READY = "READY", 
  SETTLED = "SETTLED",
  NOT_SETTLED = "NOT-SETTLED"
}
```

#### Schema Indexes
```typescript
// Primary Indexes
{ user_id: 1, order_id: 1 }     // Unique composite index
{ settlement_id: 1 }            // Settlement lookup
{ status: 1 }                   // Status filtering
{ type: 1 }                     // Type-based queries
{ transaction_db_ids: 1 }       // Transaction correlation
{ "context.transaction_id": 1 } // ONDC transaction lookup
{ "context.message_id": 1 }     // Message correlation
{ due_date: 1 }                // Due date queries
```

#### Business Invariants
- **Uniqueness**: One settlement per (user_id, order_id) combination
- **Financial Consistency**: Sum of breakdowns equals total_order_value
- **Status Transitions**: PENDING → READY → SETTLED workflow
- **Reference Integrity**: transaction_db_ids must reference valid transactions
- **Temporal Consistency**: initiated_date ≤ updated_at

---

### 3. Reconciliation Entity

**Purpose**: Cross-participant reconciliation and discrepancy management

#### Database Model
```typescript
// Collection: recon_table
interface ReconciliationDocument {
  user_id: string;               // User reference (indexed)
  order_id: string;             // Order reference (indexed)
  collector_id: string;         // Collecting participant
  receiver_id: string;          // Receiving participant
  
  // Status Management
  recon_status: ReconStatus;     // Internal reconciliation status
  settlement_id: string;        // Associated settlement (indexed)
  payment_id?: string;          // Payment reference (indexed)
  
  // Transaction Correlation
  transaction_db_ids: string[]; // Related transaction IDs
  transaction_id: string;       // ONDC transaction ID
  
  // Financial Reconciliation
  recon_breakdown: BreakdownDetails;     // Our calculated breakdown
  on_recon_breakdown?: BreakdownDetails; // Counterparty breakdown
  
  // Error Management
  on_recon_error?: any;         // Reconciliation errors
  
  // Temporal Management
  due_date?: Date;              // Reconciliation due date (indexed)
  recon_date: Date;            // Reconciliation initiation date
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
}

interface BreakdownDetails {
  amount: number;               // Settlement amount
  commission: number;           // Commission calculation
  withholding_amount: number;   // Withheld amount
  tcs: number;                 // Tax collected at source
  tds: number;                 // Tax deducted at source
}

enum ReconStatus {
  SENT_PENDING = "SENT_PENDING",
  RECEIVED_PENDING = "RECEIVED_PENDING", 
  ACCORD = "ACCORD",
  DISCORD = "DISCORD",
  COMPLETED = "COMPLETED"
}
```

#### Schema Indexes
```typescript
// Primary Indexes
{ user_id: 1, order_id: 1 }     // Unique composite index
{ settlement_id: 1 }            // Settlement correlation
{ payment_id: 1 }              // Payment lookup
{ recon_status: 1 }            // Status filtering
{ transaction_db_ids: 1 }       // Transaction correlation
{ due_date: 1 }                // Due date queries
{ recon_date: 1 }              // Reconciliation timeline
```

#### Business Invariants
- **Uniqueness**: One reconciliation per (user_id, order_id) combination
- **Settlement Dependency**: settlement_id must reference valid settlement
- **Breakdown Consistency**: Financial breakdowns must be mathematically consistent
- **Status Progression**: SENT_PENDING → RECEIVED_PENDING → ACCORD/DISCORD → COMPLETED
- **Error Isolation**: on_recon_error populated only on reconciliation failures

---

### 4. Transaction Entity (RSF Transactions)

**Purpose**: ONDC protocol transaction tracking with discriminated schemas

#### Database Model
```typescript
// Collection: rsf_transactions
// Uses Mongoose discriminators for action-specific schemas

interface BaseTransactionDocument {
  context: OndcContext;          // ONDC context (indexed on multiple fields)
  message: any;                 // Action-specific message (discriminated)
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface OndcContext {
  domain: "ONDC:NTS10";         // Fixed domain (indexed)
  location: LocationDetails;     // Location information
  version: "2.0.0";            // Protocol version
  action: RsfAction;            // Action type (indexed)
  bap_id: string;              // Buyer app ID (indexed)
  bap_uri: string;             // Buyer app URI
  bpp_id: string;              // Seller app ID (indexed)
  bpp_uri: string;             // Seller app URI
  transaction_id: string;       // ONDC transaction ID (indexed)
  message_id: string;          // Message ID (indexed)
  timestamp: string;           // RFC3339 timestamp (indexed)
  ttl: string;                 // Time-to-live duration
}

type RsfAction = "recon" | "on_recon" | "settle" | "on_settle";

// Discriminated Models
interface ReconTransaction extends BaseTransactionDocument {
  context: OndcContext & { action: "recon" };
  message: ReconMessage;
}

interface OnReconTransaction extends BaseTransactionDocument {
  context: OndcContext & { action: "on_recon" };
  message?: OnReconMessage;
  error?: any;                 // Error details for failed responses
}

interface SettleTransaction extends BaseTransactionDocument {
  context: OndcContext & { action: "settle" };
  message: SettleMessage;
}

interface OnSettleTransaction extends BaseTransactionDocument {
  context: OndcContext & { action: "on_settle" };
  message?: OnSettleMessage;
  error?: any;                 // Error details for failed responses
}
```

#### Schema Indexes
```typescript
// Performance Indexes
{ "context.transaction_id": 1, "context.action": 1, "context.message_id": 1 }  // Unique composite
{ "context.domain": 1 }                    // Domain filtering
{ "context.action": 1 }                    // Action-based queries
{ "context.bap_id": 1 }                   // Participant queries
{ "context.bpp_id": 1 }                   // Participant queries
{ "context.timestamp": 1 }                // Temporal queries
{ createdAt: 1 }                          // Creation timeline
```

#### Business Invariants
- **Protocol Compliance**: All messages conform to ONDC v2.0.0 specification
- **Action Specificity**: Message schemas validated per action type
- **Unique Correlation**: (transaction_id, action, message_id) combination is unique
- **Error Segregation**: Error field populated only for failed responses
- **Temporal Ordering**: timestamp reflects business timeline

---

### 5. User Entity

**Purpose**: Network participant configuration and financial parameters

#### Database Model
```typescript
// Collection: users
interface UserDocument {
  title: string;                    // User display name (indexed)
  role: "BAP" | "BPP";             // Participant role
  subscriber_url: string;           // Network subscriber URL
  domain: string;                  // Operating domain
  
  // Tax Configuration
  np_tcs: number;                  // Network participant TCS rate
  np_tds: number;                  // Network participant TDS rate
  pr_tcs?: number;                 // Provider TCS rate (optional)
  pr_tds?: number;                 // Provider TDS rate (optional)
  tcs_applicability: ApplicabilityValue;  // TCS applicability rules
  tds_applicability: ApplicabilityValue;  // TDS applicability rules
  
  // Network Configuration
  msn: boolean;                    // MSN (true) vs ISN (false)
  
  // Banking Details
  provider_details: ProviderDetail[];     // Banking information
  
  // Relationship Management  
  counterparty_infos: CounterpartyInfo[]; // Configured counterparties
  counterparty_ids: string[];            // Legacy counterparty IDs
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
}

interface ProviderDetail {
  provider_name: string;          // Provider display name
  provider_id: string;           // Business provider ID
  account_number: string;        // Bank account number
  ifsc_code: string;            // Bank IFSC code
  bank_name: string;            // Bank name
}

interface CounterpartyInfo {
  id: string;                   // Counterparty ID
  nickName: string;            // Display nickname
}

enum ApplicabilityValue {
  ALWAYS = "ALWAYS",
  NEVER = "NEVER",
  CONDITIONAL = "CONDITIONAL"
}
```

#### Schema Indexes
```typescript
// Performance Indexes
{ role: 1, subscriber_url: 1, domain: 1 }  // Unique composite for participant lookup
{ title: 1 }                               // Unique title constraint
{ domain: 1 }                             // Domain-based filtering
{ "provider_details.provider_id": 1 }      // Provider lookup
{ counterparty_ids: 1 }                   // Counterparty queries
```

#### Business Invariants
- **Participant Uniqueness**: (role, subscriber_url, domain) combination is unique
- **Title Uniqueness**: Each user must have a unique title
- **Financial Precision**: All rate fields (TCS/TDS) rounded to appropriate precision
- **Banking Validation**: provider_details must contain valid banking information
- **MSN/ISN Rules**: MSN flag determines settlement calculation methodology

---

## MongoDB Collection Structure

### Collection Organization
```
MongoDB Database: rsf-utility
├── orders                    # Order lifecycle management
├── settlements              # Settlement tracking and execution  
├── recon_table             # Reconciliation management
├── rsf_transactions        # ONDC protocol transactions
├── users                   # Network participant configuration
└── system_collections      # MongoDB internal collections
```

### Index Strategy

#### Performance Optimization
- **Composite Indexes**: Multi-field indexes for common query patterns
- **Partial Indexes**: Conditional indexes for sparse fields
- **Text Indexes**: Full-text search capabilities where needed
- **TTL Indexes**: Automatic cleanup for temporary data

#### Index Maintenance
```typescript
// Automatic Index Creation via Mongoose
OrderSchema.index({ order_id: 1, user_id: 1 }, { unique: true });
SettleSchema.index({ user_id: 1, order_id: 1 }, { unique: true });
ReconSchema.index({ user_id: 1, order_id: 1 }, { unique: true });
TransactionSchema.index(
  { "context.transaction_id": 1, "context.action": 1, "context.message_id": 1 },
  { unique: true }
);
```

#### Query Optimization Patterns
```typescript
// Efficient Query Examples
// 1. User-specific order lookup
db.orders.find({ user_id: "user123", settle_status: "READY" })

// 2. Settlement correlation
db.settlements.find({ 
  user_id: "user123", 
  status: "PENDING",
  due_date: { $lte: new Date() }
})

// 3. Transaction correlation
db.rsf_transactions.find({
  "context.transaction_id": "txn-123",
  "context.action": "settle"
})

// 4. Reconciliation status tracking
db.recon_table.find({
  settlement_id: "settle-456",
  recon_status: { $in: ["SENT_PENDING", "RECEIVED_PENDING"] }
})
```

---

## Data Lifecycle Management

### 1. Order Lifecycle

#### State Transitions
```
Order Creation → ONDC Processing → Settlement Ready → Reconciliation → Settlement Complete
     ↓               ↓                    ↓               ↓                ↓
  order_id        state updates      settle_status     recon_status    final_status
   created          tracked           = READY          processing      = SETTLED
```

#### Lifecycle Events
- **Creation**: Order ingested from ONDC on_confirm
- **Updates**: State changes via on_status, on_update
- **Settlement Preparation**: Status changed to READY
- **Reconciliation**: Cross-participant verification
- **Completion**: Final settlement and archival

### 2. Settlement Lifecycle

#### Processing Flow
```
Settlement Request → Preparation → Validation → Execution → Confirmation
       ↓                ↓           ↓            ↓           ↓
   user_request    calculate     validate     external     update_status
                   breakdown     amounts      API_call     = SETTLED
```

#### State Management
- **PENDING**: Initial settlement creation
- **READY**: Validated and ready for execution
- **SETTLED**: Successfully completed
- **NOT_SETTLED**: Failed or rejected

### 3. Reconciliation Lifecycle

#### Workflow Stages
```
Recon Initiation → Data Exchange → Comparison → Resolution → Completion
       ↓              ↓            ↓           ↓            ↓
   SENT_PENDING  RECEIVED_PENDING  ACCORD/   update      COMPLETED
                                   DISCORD   records
```

#### Error Handling
- **DISCORD Resolution**: Manual intervention required
- **Error Logging**: Comprehensive error tracking in on_recon_error
- **Retry Logic**: Configurable retry mechanisms for transient failures

---

## Configuration & Audit Database Usage

### Configuration Management

#### Environment-Based Configuration
```typescript
interface ConfigurationData {
  // Database Configuration
  mongodb_uri: string;          // Connection string
  database_name: string;        // Target database
  
  // ONDC Protocol Configuration
  ondc_domain: string;          // Protocol domain
  protocol_version: string;     // ONDC version
  
  // Business Configuration
  default_settlement_window: string;    // ISO duration
  tax_calculation_rules: TaxRules;      // Tax computation
  rate_limiting_config: RateLimitConfig; // API limits
}
```

#### Dynamic Configuration
- **Runtime Updates**: Configuration changes without restart
- **Feature Flags**: Conditional feature enablement
- **A/B Testing**: Experimental configuration variants
- **Rollback Support**: Configuration version management

### Audit & Transaction Logging

#### Audit Trail Schema
```typescript
interface AuditLogEntry {
  // Correlation
  correlation_id: string;       // Request correlation
  session_id?: string;         // User session
  
  // Request Details
  method: string;              // HTTP method
  url: string;                // Request URL
  headers: Record<string, any>; // Request headers
  body: any;                  // Request payload
  query: Record<string, any>;  // Query parameters
  params: Record<string, any>; // Path parameters
  
  // Response Details
  status_code: number;         // HTTP status
  response_body?: any;         // Response payload
  response_time_ms: number;    // Processing duration
  
  // User Context
  user_id?: string;           // Authenticated user
  client_id?: string;         // API client
  ip_address: string;         // Source IP
  user_agent: string;         // Client information
  
  // Business Context
  action_type: string;        // Business action
  resource_type: string;      // Affected resource
  resource_id?: string;       // Resource identifier
  
  // Error Details
  error_code?: string;        // Application error code
  error_message?: string;     // Error description
  stack_trace?: string;       // Technical details
  
  // Metadata
  environment: string;        // Deployment environment
  service_version: string;    // Application version
  timestamp: Date;           // Event timestamp
}
```

#### RSF-Specific Audit Logging
```typescript
interface RsfAuditEntry {
  // ONDC Context
  ondc_action: RsfAction;      // ONDC action type
  transaction_id: string;      // ONDC transaction
  message_id: string;         // ONDC message
  participant_ids: {
    bap_id: string;
    bpp_id: string;
  };
  
  // Business Context
  order_id?: string;          // Related order
  settlement_id?: string;     // Related settlement
  user_id: string;           // System user
  
  // Processing Details
  processing_status: "SUCCESS" | "FAILURE" | "PARTIAL";
  processing_duration_ms: number;
  
  // Data Details
  payload_size_bytes: number;
  validation_results: ValidationResult[];
  transformation_applied: boolean;
  
  // Error Handling
  retry_count: number;
  final_status: boolean;
  error_recovery_applied: boolean;
  
  timestamp: Date;
}
```

---

## Performance Optimization

### Query Performance

#### Index Optimization Strategy
```typescript
interface IndexOptimization {
  // Compound Indexes
  multi_field_indexes: {
    user_order_lookup: { user_id: 1, order_id: 1 };     // Most frequent query
    status_filtering: { settle_status: 1, due_date: 1 }; // Dashboard queries
    transaction_correlation: { 
      "context.transaction_id": 1, 
      "context.action": 1 
    };
  };
  
  // Partial Indexes
  conditional_indexes: {
    active_settlements: { 
      status: { $ne: "SETTLED" } 
    };
    pending_reconciliations: { 
      recon_status: { $in: ["SENT_PENDING", "RECEIVED_PENDING"] }
    };
  };
  
  // Text Indexes
  search_capabilities: {
    order_search: { order_id: "text", settlement_id: "text" };
    user_search: { title: "text", domain: "text" };
  };
}
```

#### Query Optimization Patterns
```typescript
// Optimized Query Examples
interface OptimizedQueries {
  // 1. Paginated User Orders with Status Filter
  user_orders_paginated: {
    query: { user_id: "user123", settle_status: "READY" };
    sort: { created_at: -1 };
    limit: 20;
    skip: 0;
    projection: { // Only required fields
      order_id: 1,
      total_order_value: 1,
      settle_status: 1,
      due_date: 1
    };
  };
  
  // 2. Settlement Correlation with Transaction Lookup
  settlement_with_transactions: {
    pipeline: [
      { $match: { settlement_id: "settle-123" } },
      { $lookup: {
        from: "rsf_transactions",
        let: { txn_ids: "$transaction_db_ids" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$txn_ids"] } } }
        ],
        as: "transactions"
      }},
      { $project: { 
        settlement_details: 1,
        transaction_count: { $size: "$transactions" }
      }}
    ];
  };
}
```

### Connection Management

#### Connection Pool Configuration
```typescript
interface ConnectionPooling {
  // Pool Settings
  pool_configuration: {
    min_connections: 5;           // Minimum pool size
    max_connections: 20;          // Maximum pool size
    max_idle_time_ms: 30000;     // Connection timeout
    connection_timeout_ms: 5000;  // Connect timeout
  };
  
  // Health Monitoring
  health_checks: {
    ping_interval_ms: 30000;     // Health check frequency
    retry_attempts: 3;           // Connection retry count
    circuit_breaker_enabled: true; // Fault tolerance
  };
  
  // Performance Monitoring
  metrics_collection: {
    connection_usage_tracking: boolean;
    query_performance_monitoring: boolean;
    slow_query_logging: boolean;
    prometheus_integration: boolean;
  };
}
```

---

## Data Consistency & Integrity

### Consistency Models

#### Transaction Management
```typescript
interface TransactionManagement {
  // ACID Properties
  atomicity: {
    multi_document_transactions: boolean;  // MongoDB 4.0+ feature
    rollback_on_failure: boolean;         // Automatic rollback
    partial_update_prevention: boolean;    // All-or-nothing updates
  };
  
  // Consistency Levels
  read_consistency: {
    primary_read_preference: boolean;      // Read from primary
    secondary_read_tolerance: boolean;     // Read from secondary for analytics
    causal_consistency: boolean;          // Ordered read/write
  };
  
  // Isolation Levels
  transaction_isolation: {
    snapshot_isolation: boolean;          // Point-in-time consistency
    read_committed: boolean;              // Committed data only
    serializable_transactions: boolean;    // Full isolation
  };
}
```

#### Data Validation
```typescript
interface DataValidation {
  // Schema Validation
  mongoose_validation: {
    required_field_enforcement: boolean;
    type_validation: boolean;
    custom_validator_functions: ValidatorFunction[];
    pre_save_hooks: PreSaveHook[];
  };
  
  // Business Logic Validation
  domain_validation: {
    financial_calculation_verification: boolean;
    status_transition_validation: boolean;
    cross_reference_integrity: boolean;
    temporal_consistency_checks: boolean;
  };
  
  // External Validation
  ondc_protocol_validation: {
    schema_compliance_checking: boolean;
    message_format_validation: boolean;
    context_field_verification: boolean;
    signature_validation: boolean;
  };
}
```

---

## Monitoring & Observability

### Database Health Monitoring

#### Health Check Implementation
```typescript
interface DatabaseHealthMonitoring {
  // Connection Health
  connection_monitoring: {
    readiness_check: () => Promise<boolean>;
    liveness_check: () => Promise<boolean>;
    connection_pool_status: () => PoolStatus;
  };
  
  // Performance Metrics
  performance_tracking: {
    query_execution_time: Histogram;
    transaction_duration: Histogram;
    connection_usage: Gauge;
    error_rate: Counter;
  };
  
  // Prometheus Integration
  metrics_export: {
    db_health_status: Gauge;      // 1=healthy, 0=unhealthy
    db_latency_gauge: Gauge;      // Query latency
    active_connections: Gauge;     // Current connections
    failed_queries: Counter;       // Query failures
  };
}
```

#### Automated Monitoring
- **Health Checks**: 30-second intervals
- **Performance Baselines**: Query performance tracking
- **Alert Thresholds**: Configurable alert conditions
- **Dashboard Integration**: Grafana visualization

### Data Quality Monitoring

#### Quality Metrics
```typescript
interface DataQualityMetrics {
  // Completeness
  field_completeness: {
    required_field_coverage: number;    // % of required fields populated
    optional_field_usage: number;       // % of optional fields utilized
    null_value_percentage: number;      // % of null values
  };
  
  // Consistency
  referential_integrity: {
    foreign_key_violations: number;     // Broken references
    constraint_violations: number;      // Schema violations
    duplicate_detection: number;        // Duplicate records
  };
  
  // Accuracy
  business_rule_compliance: {
    financial_calculation_accuracy: number; // % correct calculations
    status_transition_validity: number;     // % valid transitions
    temporal_logic_compliance: number;      // % correct timestamps
  };
}
```

---

*This documentation provides comprehensive coverage of the RSF Utility data architecture, storage patterns, and lifecycle management. For implementation details and specific configuration examples, refer to the respective service documentation and database integration guides.*

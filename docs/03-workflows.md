# Workflow Documentation

## System Overview

This document provides end-to-end workflows with sequence diagrams and example payloads for the RSF Utility ONDC settlement and reconciliation system.

## Core Workflows

### 1. Order Confirmation Workflow (`/on_confirm`)

**Purpose**: Process order confirmation from ONDC network participants and store order data for settlement processing.

#### Sequence Diagram

```mermaid
sequenceDiagram
    participant Network as ONDC Network
    participant API as API Gateway
    participant Validation as Schema Validator
    participant Controller as Payload Controller
    participant Service as Order Service
    participant DB as MongoDB
    participant Logger as Audit Logger

    Network->>API: POST /api/on_confirm
    API->>Validation: Validate ONDC Schema
    
    alt Schema Valid
        Validation->>Controller: Forward payload
        Controller->>Controller: Extract order fields
        Controller->>Service: Check user URIs
        
        loop For each user URI
            Service->>DB: Check existing order
            alt Order exists
                Service->>Service: Compare timestamps
                alt Newer timestamp
                    Service->>DB: Update order
                    Service->>Logger: Log update
                else
                    Service->>Logger: Log duplicate (skip)
                end
            else
                Service->>DB: Create new order
                Service->>Logger: Log creation
            end
        end
        
        Service->>Controller: Return success
        Controller->>API: 200 ACK Response
        API->>Network: ACK
    else
        Validation->>API: 400 Validation Error
        API->>Logger: Log validation failure
        API->>Network: NACK
    end
```

#### Example Payload

```json
{
  "context": {
    "domain": "ONDC:RET14",
    "country": "IND", 
    "city": "std:080",
    "action": "on_confirm",
    "core_version": "1.2.0",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org/protocol/v1",
    "bpp_id": "seller-app.ondc.org", 
    "bpp_uri": "https://seller-app.ondc.org/protocol/v1",
    "transaction_id": "3937483r-75i6-4629-ba81-3e2f9c7c1234",
    "message_id": "bb579fb8-cb82-4824-be12-fcbc405b6608",
    "timestamp": "2023-02-03T08:00:30.000Z"
  },
  "message": {
    "order": {
      "id": "2023-02-03-876543",
      "state": "Created",
      "provider": {
        "id": "PROVIDER_001",
        "locations": [{"id": "L1"}]
      },
      "items": [
        {
          "id": "ITEM_001",
          "fulfillment_id": "F1",
          "quantity": {"count": 2}
        }
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": "372.00"
        },
        "breakup": [
          {
            "@ondc/org/item_id": "ITEM_001",
            "title": "Fresh Apples",
            "price": {"currency": "INR", "value": "340.00"}
          },
          {
            "@ondc/org/item_id": "ITEM_001", 
            "@ondc/org/title_type": "delivery",
            "title": "Delivery charges",
            "price": {"currency": "INR", "value": "32.00"}
          }
        ]
      },
      "payment": {
        "params": {
          "currency": "INR",
          "transaction_id": "txn_1234567890",
          "amount": "372.00"
        },
        "status": "PAID",
        "type": "ON-ORDER",
        "collected_by": "BAP",
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3.0",
        "@ondc/org/settlement_basis": "delivery",
        "@ondc/org/settlement_window": "P1D"
      },
      "created_at": "2023-02-03T08:00:30.000Z",
      "updated_at": "2023-02-03T08:00:30.000Z"
    }
  }
}
```

#### Error Handling

| Error Code | Condition | Response |
|------------|-----------|----------|
| 400 | Schema validation failure | NACK with field details |
| 422 | Invalid order data | NACK with validation errors |
| 500 | Database connection error | NACK with retry suggestion |
| 409 | Duplicate order (older timestamp) | ACK (ignored) |

---

### 2. Settlement Workflow (`/settle` ↔ `/on_settle`)

**Purpose**: Generate settlement payloads, trigger external settlement agency, and process settlement responses.

#### Sequence Diagram

```mermaid
sequenceDiagram
    participant UI as Frontend UI
    participant API as Backend API  
    participant Generate as Generate Service
    participant Trigger as Trigger Service
    participant Agency as Settlement Agency
    participant DB as MongoDB
    participant Callback as Callback Handler

    UI->>API: POST /ui/generate/{userId}/settle/np-np
    API->>Generate: Generate settlement payload
    Generate->>DB: Fetch orders & settlements
    Generate->>Generate: Calculate settlement amounts
    Generate->>DB: Update settlement status
    Generate->>API: Return settlement payload
    API->>UI: 201 Settlement payload

    UI->>API: POST /ui/trigger/{userId}/settle
    API->>Trigger: Process settlement trigger
    Trigger->>Trigger: Validate user config
    Trigger->>Trigger: Sign payload with private key
    Trigger->>Agency: POST /settle (External API)
    
    alt Agency ACK
        Agency->>Trigger: 200 ACK Response
        Trigger->>DB: Update settlements (PENDING)
        Trigger->>DB: Store transaction record
        Trigger->>API: 200 Success
        API->>UI: Success notification
        
        Note over Agency: Async processing...
        Agency->>Callback: POST /api/on_settle
        Callback->>Callback: Validate transaction context
        Callback->>DB: Update settlement status
        Callback->>Agency: 200 ACK
    else
        Agency->>Trigger: 400/500 Error
        Trigger->>DB: Update settlements (PREPARED)
        Trigger->>API: Error response
        API->>UI: Error notification
    end
```

#### Example Settlement Generation

**Request:**
```json
{
  "settle_data": [
    {
      "order_id": "2023-02-03-876543",
      "provider_value": 150.00,
      "self_value": 25.00
    }
  ]
}
```

**Generated Settlement Payload:**
```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "location": {"country": {"code": "IND"}, "city": {"code": "*"}},
    "version": "2.0.0",
    "action": "settle",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org/protocol/v1",
    "bpp_id": "settlement-agency.ondc.org",
    "bpp_uri": "https://settlement-agency.ondc.org/api",
    "transaction_id": "3937483r-75i6-4629-ba81-3e2f9c7c1234",
    "message_id": "bb579fb8-cb82-4824-be12-fcbc405b6608",
    "timestamp": "2023-02-03T09:00:30.000Z",
    "ttl": "P1D"
  },
  "message": {
    "collector_app_id": "buyer-app.ondc.org",
    "receiver_app_id": "seller-app.ondc.org",
    "settlement": {
      "type": "NP-NP",
      "id": "settlement_001",
      "orders": [
        {
          "id": "2023-02-03-876543",
          "inter_participant": {
            "settled_amount": {"currency": "INR", "value": "197.00"},
            "amount": {"currency": "INR", "value": "372.00"}
          },
          "collector": {
            "amount": {"currency": "INR", "value": "25.00"}
          },
          "provider": {
            "id": "PROVIDER_001",
            "name": "Fresh Fruits Store",
            "amount": {"currency": "INR", "value": "150.00"}
          },
          "self": {
            "amount": {"currency": "INR", "value": "25.00"}
          }
        }
      ]
    }
  }
}
```

#### Example on_settle Response

```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "action": "on_settle",
    "version": "2.0.0",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org/protocol/v1",
    "bpp_id": "settlement-agency.ondc.org",
    "bpp_uri": "https://settlement-agency.ondc.org/api",
    "transaction_id": "3937483r-75i6-4629-ba81-3e2f9c7c1234",
    "message_id": "bb579fb8-cb82-4824-be12-fcbc405b6608",
    "timestamp": "2023-02-03T09:30:30.000Z"
  },
  "message": {
    "settlement": {
      "id": "settlement_001",
      "orders": [
        {
          "id": "2023-02-03-876543",
          "inter_participant": {
            "status": "SETTLED",
            "reference_no": "SETT_REF_001"
          },
          "self": {
            "status": "SETTLED", 
            "reference_no": "SELF_REF_001"
          },
          "provider": {
            "status": "SETTLED",
            "reference_no": "PROV_REF_001"
          }
        }
      ]
    }
  }
}
```

---

### 3. Reconciliation Workflow (`/recon` ↔ `/on_recon`)

**Purpose**: Handle reconciliation requests and responses for settlement discrepancies.

#### Sequence Diagram

```mermaid
sequenceDiagram
    participant PartyA as Network Participant A
    participant API as RSF Utility API
    participant ReconService as Recon Service
    participant DB as MongoDB
    participant PartyB as Network Participant B
    participant OnReconService as OnRecon Service

    PartyA->>API: POST /api/recon
    API->>ReconService: Process recon payload
    ReconService->>ReconService: Validate payload structure
    
    loop For each order
        ReconService->>DB: Fetch user config
        ReconService->>DB: Check settlement exists
        ReconService->>ReconService: Validate settlement status
        ReconService->>DB: Extract recon details
    end
    
    alt All validations pass
        ReconService->>DB: Store transaction record
        
        loop Update settlements
            ReconService->>DB: Create/Update recon record
            ReconService->>DB: Update settlement status (IN_RECON)
        end
        
        ReconService->>API: ACK Response
        API->>PartyA: 200 ACK
        
        Note over API,PartyB: Forward to other participant
        API->>PartyB: Recon notification
        
        PartyB->>API: POST /api/on_recon  
        API->>OnReconService: Process response
        OnReconService->>OnReconService: Validate context
        OnReconService->>DB: Fetch original recon
        
        alt Recon accord = true
            OnReconService->>DB: Update status (RECEIVED_PENDING)
            OnReconService->>OnReconService: Generate accord response
        else
            OnReconService->>OnReconService: Calculate differences
            OnReconService->>DB: Update with difference data
            OnReconService->>OnReconService: Generate difference response
        end
        
        OnReconService->>API: Response payload
        API->>PartyB: 200 ACK
        
    else
        ReconService->>API: NACK with error
        API->>PartyA: 400/422 Error
    end
```

#### Example Recon Request

```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "location": {"country": {"code": "IND"}, "city": {"code": "*"}},
    "version": "2.0.0", 
    "action": "recon",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org/protocol/v1",
    "bpp_id": "seller-app.ondc.org",
    "bpp_uri": "https://seller-app.ondc.org/protocol/v1",
    "transaction_id": "recon_txn_001",
    "message_id": "recon_msg_001",
    "timestamp": "2023-02-03T10:00:30.000Z",
    "ttl": "P1D"
  },
  "message": {
    "orders": [
      {
        "id": "2023-02-03-876543",
        "amount": {"currency": "INR", "value": "372.00"},
        "settlements": [
          {
            "id": "settlement_001",
            "payment_id": "pymnt_001",
            "status": "PENDING",
            "amount": {"currency": "INR", "value": "197.00"},
            "commission": {"currency": "INR", "value": "11.16"},
            "withholding_amount": {"currency": "INR", "value": "37.20"},
            "tcs": {"currency": "INR", "value": "5.91"},
            "tds": {"currency": "INR", "value": "11.82"},
            "updated_at": "2023-02-03T09:30:30.000Z"
          }
        ]
      }
    ]
  }
}
```

#### Example on_recon Response (With Disagreement)

```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "action": "on_recon",
    "version": "2.0.0",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org/protocol/v1", 
    "bpp_id": "seller-app.ondc.org",
    "bpp_uri": "https://seller-app.ondc.org/protocol/v1",
    "transaction_id": "recon_txn_001",
    "message_id": "recon_msg_001",
    "timestamp": "2023-02-03T10:30:30.000Z"
  },
  "message": {
    "orders": [
      {
        "id": "2023-02-03-876543",
        "amount": {"currency": "INR", "value": "372.00"},
        "recon_accord": false,
        "settlements": [
          {
            "id": "settlement_001",
            "status": "PENDING",
            "amount": {
              "currency": "INR",
              "value": "200.00",
              "diff_value": "3.00"
            },
            "commission": {
              "currency": "INR", 
              "value": "12.00",
              "diff_value": "0.84"
            },
            "withholding_amount": {
              "currency": "INR",
              "value": "40.00", 
              "diff_value": "2.80"
            },
            "tcs": {
              "currency": "INR",
              "value": "6.00",
              "diff_value": "0.09"
            },
            "tds": {
              "currency": "INR",
              "value": "12.00",
              "diff_value": "0.18"
            },
            "updated_at": "2023-02-03T10:30:30.000Z"
          }
        ]
      }
    ]
  }
}
```

---

### 4. Order Status Update Workflow (`/on_status`, `/on_update`, `/on_cancel`)

**Purpose**: Process order lifecycle updates from ONDC network.

#### Sequence Diagram

```mermaid
sequenceDiagram
    participant Network as ONDC Network
    participant API as API Gateway  
    participant Validation as Schema Validator
    participant Controller as Payload Controller
    participant Service as Order Service
    participant DB as MongoDB

    Network->>API: POST /api/on_status|on_update|on_cancel
    API->>Validation: Validate schema
    
    alt Valid Schema
        Validation->>Controller: Forward payload
        Controller->>Controller: Extract order data
        Controller->>Service: Process order update
        
        Service->>DB: Find existing order
        alt Order found
            Service->>Service: Validate state transition
            alt Valid transition
                Service->>DB: Update order state
                Service->>Service: Update due dates
                Service->>Controller: Success
            else
                Service->>Controller: Invalid state error
            end
        else
            Service->>Controller: Order not found error
        end
        
        Controller->>API: Response
        API->>Network: ACK/NACK
    else
        Validation->>API: Schema error
        API->>Network: NACK
    end
```

#### Example on_status Payload

```json
{
  "context": {
    "domain": "ONDC:RET14",
    "action": "on_status", 
    "core_version": "1.2.0",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org/protocol/v1",
    "bpp_id": "seller-app.ondc.org",
    "bpp_uri": "https://seller-app.ondc.org/protocol/v1",
    "transaction_id": "3937483r-75i6-4629-ba81-3e2f9c7c1234",
    "message_id": "status_msg_001",
    "timestamp": "2023-02-03T12:00:30.000Z"
  },
  "message": {
    "order": {
      "id": "2023-02-03-876543",
      "state": "In-progress",
      "fulfillments": [
        {
          "id": "F1",
          "state": {
            "descriptor": {"code": "Order-picked-up"}
          },
          "tracking": true
        }
      ],
      "updated_at": "2023-02-03T12:00:30.000Z"
    }
  }
}
```

---

### 5. Admin Operations Workflow

**Purpose**: Administrative configuration, user management, and system maintenance.

#### Configuration Bootstrap Sequence

```mermaid
sequenceDiagram
    participant Admin as Admin User
    participant UI as Frontend UI
    participant API as Backend API
    participant UserService as User Service
    participant Validation as Config Validator
    participant DB as MongoDB

    Admin->>UI: Configure network participant
    UI->>UI: Validate form data
    UI->>API: POST /ui/users
    API->>UserService: Create user config
    UserService->>Validation: Validate ONDC compliance
    
    alt Valid Configuration
        Validation->>UserService: Validation passed
        UserService->>DB: Store user config
        UserService->>DB: Create provider details
        UserService->>API: Success response
        API->>UI: 201 Created
        UI->>Admin: Configuration saved
    else
        Validation->>UserService: Validation failed
        UserService->>API: Validation errors
        API->>UI: 422 Validation Error
        UI->>Admin: Show field errors
    end
```

#### Example User Configuration

```json
{
  "title": "FRESH_FRUITS_STORE",
  "role": "BPP",
  "domain": "ONDC:RET14", 
  "subscriber_url": "https://fresh-fruits.ondc.org/protocol/v1",
  "np_tcs": 3.0,
  "np_tds": 6.0,
  "pr_tcs": 9.0,
  "pr_tds": 3.0,
  "tcs_applicability": "BOTH",
  "tds_applicability": "BOTH",
  "msn": false,
  "provider_details": [
    {
      "provider_name": "Fresh Fruits Store",
      "provider_id": "PROVIDER_001", 
      "account_number": "1234567890",
      "ifsc_code": "ICIC0001234",
      "bank_name": "ICICI Bank"
    }
  ],
  "counterparty_infos": []
}
```

#### Schema Update Workflow

```mermaid
sequenceDiagram
    participant Admin as System Admin
    participant API as Backend API
    participant SchemaService as Schema Service
    participant Validator as AJV Validator
    participant Cache as Schema Cache
    participant DB as MongoDB

    Admin->>API: Upload new schema files
    API->>SchemaService: Process schema update
    SchemaService->>Validator: Validate schema syntax
    
    alt Valid Schema
        Validator->>SchemaService: Schema valid
        SchemaService->>Cache: Clear schema cache
        SchemaService->>DB: Update schema version
        SchemaService->>API: Success
        API->>Admin: Schema updated
    else
        Validator->>SchemaService: Schema invalid
        SchemaService->>API: Validation errors
        API->>Admin: Schema errors
    end
```

---

### 6. Async Transaction Processing & Idempotency

**Purpose**: Handle background transaction processing with idempotency guarantees.

#### Async Processing Sequence

```mermaid
sequenceDiagram
    participant Client as API Client
    participant API as API Gateway
    participant Queue as Background Queue
    participant Worker as Async Worker
    participant DB as MongoDB
    participant Cache as Redis Cache

    Client->>API: POST /api/on_confirm
    API->>API: Generate correlation ID
    API->>Cache: Check idempotency (transaction_id + message_id)
    
    alt Already processed
        Cache->>API: Found duplicate
        API->>Client: 200 ACK (idempotent)
    else
        Cache->>API: New request
        API->>Queue: Queue processing job
        API->>Client: 202 Accepted
        
        Queue->>Worker: Process payload
        Worker->>DB: Begin transaction
        Worker->>DB: Validate order data
        Worker->>DB: Update order status
        Worker->>DB: Create audit log
        Worker->>DB: Commit transaction
        Worker->>Cache: Mark as processed
        Worker->>Queue: Job complete
    end
```

#### Idempotency Implementation

**Key Components:**
- **Correlation ID**: `context.transaction_id + context.message_id`
- **Idempotency Window**: 24 hours (configurable)
- **Storage**: Redis cache with MongoDB fallback
- **Retry Logic**: Exponential backoff for failed jobs

**Example Implementation:**
```typescript
async function processWithIdempotency(payload: any) {
  const key = `${payload.context.transaction_id}_${payload.context.message_id}`;
  
  // Check if already processed
  const existing = await redis.get(key);
  if (existing) {
    return JSON.parse(existing); // Return cached result
  }
  
  // Process transaction
  const result = await processTransaction(payload);
  
  // Cache result for 24 hours
  await redis.setex(key, 86400, JSON.stringify(result));
  
  return result;
}
```

#### Error Handling & Retry Strategy

| Error Type | Retry Strategy | Max Attempts | Backoff |
|------------|----------------|--------------|---------|
| Network timeout | Exponential | 5 | 1s, 2s, 4s, 8s, 16s |
| Database deadlock | Linear | 3 | 1s, 2s, 3s |
| Schema validation | No retry | 1 | N/A |
| Business logic error | No retry | 1 | N/A |

---

## Integration Patterns

### Error Response Format

All API endpoints follow standardized error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Schema validation failed",
    "details": {
      "field": "message.order.id",
      "reason": "required field missing"
    }
  }
}
```

### Success Response Format

```json
{
  "success": true,
  "data": {
    // Payload data
  },
  "message": "Operation completed successfully"
}
```

### Correlation & Tracing

- **Request ID**: Generated for each API call
- **Transaction ID**: ONDC protocol transaction identifier  
- **Message ID**: ONDC protocol message identifier
- **User Context**: User ID and role for audit trails

### Monitoring Integration

- **Prometheus Metrics**: Request rates, error rates, processing times
- **Structured Logging**: JSON format with correlation IDs
- **Health Checks**: Database connectivity, external service status
- **Alerts**: Critical error thresholds, processing delays

### Security & Authentication

- **JWT Tokens**: Client-ID based authentication
- **Digital Signatures**: RSF payload signing for external APIs
- **Rate Limiting**: Per-client request throttling
- **Input Validation**: Schema validation for all payloads

This comprehensive workflow documentation provides the foundation for understanding, implementing, and troubleshooting the RSF Utility system operations.

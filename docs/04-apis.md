# API Documentation & Contracts

## Overview

The RSF Utility exposes comprehensive REST APIs for ONDC network settlement, reconciliation, and transaction management. This document provides the canonical reference for all external and internal API contracts, including authentication, rate limiting, versioning, and error handling specifications.

**Base API Information:**
- **OpenAPI Version**: 3.1.0
- **API Version**: 1.0.0
- **Base URL**: `/rsf-utility` (configurable via environment)
- **Documentation URL**: `/api-docs` (Swagger UI)
- **OpenAPI Spec**: `/api-docs.json`

## API Categories

### 1. External ONDC APIs (`/api/*`)
Network-facing webhook endpoints for ONDC protocol compliance:
- **Purpose**: Receive ONDC network payloads from external participants
- **Authentication**: Header-based validation (currently disabled in test mode)
- **Rate Limiting**: Global rate limiting applied
- **Schema Validation**: Strict ONDC protocol compliance

### 2. Internal UI APIs (`/ui/*`)
Frontend-facing management endpoints for dashboard operations:
- **Purpose**: Support frontend operations and administrative tasks
- **Authentication**: JWT Bearer token required
- **Rate Limiting**: Per-client rate limiting
- **Schema Validation**: Zod-based type validation

---

## Authentication & Authorization

### JWT Token Authentication
All `/ui/*` endpoints require JWT authentication via the `/ui/auth/sign-token` endpoint.

#### POST `/ui/auth/sign-token`
**Description**: Issue JWT token for client authentication

**Request Body**:
```json
{
  "client_id": "your-client-id",
  "expires": "7d"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token issued successfully"
}
```

**Error Responses**:
- `403 INVALID_CLIENT_ID`: Invalid client_id provided
- `400 INVALID_REQUEST_BODY`: Missing or invalid request format

#### Using Authentication
Include JWT token in Authorization header for all `/ui/*` requests:
```http
Authorization: Bearer <your-jwt-token>
```

---

## Rate Limiting

**Implementation**: Global rate limiting with configurable thresholds
- **Window**: 1 minute
- **Limit**: Configurable via `operationConfig.rateLimit`
- **Scope**: Global (all clients share limit)
- **Headers**: Standard `RateLimit-*` headers included
- **Error Response**: `429 TOO_MANY_REQUESTS`

**Rate Limit Headers**:
```http
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1640995200
```

**Rate Limit Error Response**:
```json
{
  "success": false,
  "errorCode": "GEN_001",
  "message": "Rate limit exceeded. Please try again after 1 minute(s)."
}
```

---

## Core API Endpoints

### External ONDC Webhook APIs

These endpoints handle incoming ONDC network payloads according to the ONDC protocol specifications.

#### POST `/api/on_confirm`
**Description**: Handle order confirmation payloads from ONDC network
**Implementation**: `src/controller/order-controller.ts`

**Request Headers**:
```http
Content-Type: application/json
Authorization: <network-auth-header>
```

**Request Body** (ONDC Protocol):
```json
{
  "context": {
    "domain": "ONDC:RET10",
    "location": {
      "country": { "code": "IND" },
      "city": { "code": "std:080" }
    },
    "action": "on_confirm",
    "version": "2.0.0",
    "transaction_id": "txn-123",
    "message_id": "msg-456",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "bap_id": "buyer-app.ondc.org",
    "bap_uri": "https://buyer-app.ondc.org",
    "bpp_id": "seller-app.ondc.org", 
    "bpp_uri": "https://seller-app.ondc.org"
  },
  "message": {
    "order": {
      "id": "order-123",
      "state": "Accepted",
      "provider": {
        "id": "provider-123"
      },
      "items": [...],
      "quote": {
        "price": {
          "currency": "INR",
          "value": "150.00"
        },
        "breakup": [...]
      },
      "payment": {...},
      "fulfillments": [...]
    }
  }
}
```

**Success Response**:
```json
{
  "message": {
    "ack": {
      "status": "ACK"
    }
  }
}
```

**Error Response (NACK)**:
```json
{
  "message": {
    "ack": {
      "status": "NACK"
    }
  },
  "error": {
    "code": "20000",
    "message": "Invalid request format"
  }
}
```

#### POST `/api/on_status`
**Description**: Handle order status updates from ONDC network
**Implementation**: `src/controller/order-controller.ts`

**Request Format**: Similar to `/api/on_confirm` with `action: "on_status"`

#### POST `/api/on_update`
**Description**: Handle order updates from ONDC network
**Implementation**: `src/controller/order-controller.ts`

**Request Format**: Similar to `/api/on_confirm` with `action: "on_update"`

#### POST `/api/on_cancel`
**Description**: Handle order cancellations from ONDC network
**Implementation**: `src/controller/order-controller.ts`

**Request Format**: Similar to `/api/on_confirm` with `action: "on_cancel"`

#### POST `/api/settle`
**Description**: Handle settlement requests from Settlement Agency
**Implementation**: `src/controller/settle-controller.ts`

**Request Body**:
```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "action": "settle",
    "version": "2.0.0",
    "transaction_id": "settlement-txn-123",
    "message_id": "settlement-msg-456",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "message": {
    "settlement": {
      "id": "settlement-123",
      "state": "ACTIVE",
      "transactions": [...]
    }
  }
}
```

#### POST `/api/on_settle`
**Description**: Handle settlement callbacks from Settlement Agency
**Implementation**: `src/controller/settle-controller.ts`

#### POST `/api/recon`
**Description**: Handle reconciliation requests from network participants
**Implementation**: `src/controller/recon-controller.ts`

**Request Body**:
```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "action": "recon",
    "version": "2.0.0",
    "transaction_id": "recon-txn-123",
    "message_id": "recon-msg-456",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "message": {
    "order_recon": {
      "id": "order-123",
      "orderbook": {...},
      "invoice": {...},
      "payments": [...]
    }
  }
}
```

#### POST `/api/on_recon` 
**Description**: Handle reconciliation responses from network participants
**Implementation**: `src/controller/recon-controller.ts`

**Validation Features**:
- **Schema Compliance**: All payloads validated against ONDC protocol schemas
- **Business Rules**: Order state transitions, settlement windows, tax calculations
- **Data Integrity**: Transaction correlation IDs, timestamp validation
- **Error Handling**: Comprehensive NACK responses with specific error codes

#### POST `/api/{action}`
**Description**: Generic ONDC network payload processor

**Path Parameters**:
- `action` (string): ONDC action type (e.g., `on_confirm`, `settle`, `recon`, `on_settle`, `on_recon`)

**Request Headers**:
```http
Content-Type: application/json
Authorization: <signature-based-auth>
```

**Request Body**:
```json
{
  "context": {
    "domain": "ONDC:NTS10",
    "action": "on_confirm",
    "bap_id": "buyer-app-id",
    "bap_uri": "https://buyer-app.com",
    "bpp_id": "seller-app-id", 
    "bpp_uri": "https://seller-app.com",
    "transaction_id": "txn-123",
    "message_id": "msg-456",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "2.0.0",
    "ttl": "PT30S"
  },
  "message": {
    // ONDC-specific payload based on action
  }
}
```

**Success Response** (200):
```json
{
  "message": {
    "ack": {
      "status": "ACK"
    }
  }
}
```

**Error Response** (200 with NACK):
```json
{
  "message": {
    "ack": {
      "status": "NACK" 
    }
  },
  "error": {
    "code": "70002",
    "message": "Invalid schema"
  }
}
```

### Internal Management APIs

#### User Management

##### GET `/ui/users`
**Description**: Retrieve all network participants

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "user-id-123",
      "title": "Network Participant",
      "role": "BAP",
      "subscriber_url": "https://participant.com",
      "domain": "ONDC:RET10",
      "np_tcs": 0.1,
      "np_tds": 0.1,
      "provider_details": [
        {
          "provider_id": "provider-123",
          "account_number": "1234567890",
          "ifsc_code": "HDFC0000001",
          "bank_name": "HDFC Bank",
          "provider_name": "Test Provider"
        }
      ],
      "counterparty_ids": ["counterparty-1", "counterparty-2"]
    }
  ],
  "message": "Users retrieved successfully"
}
```

##### POST `/ui/users`
**Description**: Create new network participant

**Request Body**:
```json
{
  "title": "New Participant",
  "role": "BPP",
  "subscriber_url": "https://new-participant.com",
  "domain": "ONDC:RET10",
  "np_tcs": 0.1,
  "np_tds": 0.1,
  "provider_details": [
    {
      "provider_id": "new-provider",
      "account_number": "9876543210",
      "ifsc_code": "ICICI0000001",
      "bank_name": "ICICI Bank",
      "provider_name": "New Provider"
    }
  ]
}
```

#### Order Management

##### GET `/ui/orders/{userId}`
**Description**: Retrieve orders for a specific user

**Path Parameters**:
- `userId` (string): MongoDB ObjectId of the user

**Query Parameters**:
- `status` (optional): Filter by settlement status (`READY`, `RECON`, `SETTLED`)
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "order-id-123",
      "order_id": "order-456",
      "user_id": "user-id-123",
      "bap_id": "buyer-app",
      "bpp_id": "seller-app",
      "domain": "ONDC:RET10",
      "quote": {
        "total_order_value": 1000.00,
        "breakup": [
          {
            "item_id": "item-1",
            "title": "Product Name",
            "price": {
              "currency": "INR",
              "value": "900.00"
            }
          }
        ]
      },
      "settle_status": "READY",
      "due_date": "2024-01-20T00:00:00.000Z",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Orders retrieved successfully"
}
```

##### PATCH `/ui/orders/{userId}`
**Description**: Update order due dates

**Request Body**:
```json
{
  "order_ids": ["order-id-1", "order-id-2"],
  "due_date": "2024-01-25T00:00:00.000Z"
}
```

#### Settlement Management

##### GET `/ui/settle/{userId}`
**Description**: Retrieve settlements for a user

**Query Parameters**:
- `status` (optional): Filter by settlement status
- `settlement_id` (optional): Filter by specific settlement ID

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "settle-id-123",
      "user_id": "user-id-123",
      "settlement_id": "settle-456",
      "order_id": "order-789",
      "collector_app_id": "buyer-app",
      "receiver_app_id": "seller-app",
      "settlement_amount": {
        "currency": "INR",
        "value": "950.00"
      },
      "settlement_status": "READY",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Settlements retrieved successfully"
}
```

##### POST `/ui/settle/{userId}/prepare`
**Description**: Prepare settlements for specific orders

**Request Body**:
```json
{
  "order_ids": ["order-id-1", "order-id-2"],
  "settlement_window": "PT24H",
  "settlement_basis": "shipment"
}
```

##### PATCH `/ui/settle/{userId}`
**Description**: Update settlement data

**Request Body**:
```json
{
  "settlement_id": "settle-456",
  "settlement_amount": {
    "currency": "INR", 
    "value": "980.00"
  },
  "settlement_status": "COMPLETED"
}
```

#### Generation APIs

##### POST `/ui/generate/{userId}/settle/misc`
**Description**: Generate miscellaneous settlement

**Request Body**:
```json
{
  "settlement_details": {
    "collector_app_id": "buyer-app",
    "receiver_app_id": "seller-app",
    "settlement_amount": {
      "currency": "INR",
      "value": "500.00"
    },
    "settlement_reason": "Adjustment"
  }
}
```

##### POST `/ui/generate/{userId}/settle/nil`
**Description**: Generate nil settlement

**Request Body**:
```json
{
  "settlement_details": {
    "collector_app_id": "buyer-app",
    "receiver_app_id": "seller-app",
    "settlement_reason": "No transactions"
  }
}
```

##### POST `/ui/generate/{userId}/recon`
**Description**: Generate reconciliation request

**Request Body**:
```json
{
  "recon_data": [
    {
      "order_id": "order-123",
      "settlement_amount": {
        "currency": "INR",
        "value": "950.00"
      },
      "commission_amount": {
        "currency": "INR", 
        "value": "50.00"
      }
    }
  ]
}
```

#### Reconciliation Management

##### GET `/ui/recon/{userId}`
**Description**: Retrieve reconciliation records

**Query Parameters**:
- `status` (optional): Filter by reconciliation status
- `order_id` (optional): Filter by specific order

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "recon-id-123",
      "user_id": "user-id-123", 
      "order_id": "order-456",
      "recon_status": "PENDING",
      "settlement_amount": {
        "currency": "INR",
        "value": "950.00"
      },
      "discrepancy": {
        "amount": {
          "currency": "INR",
          "value": "10.00"
        },
        "reason": "Commission difference"
      },
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Reconciliation records retrieved successfully"
}
```

##### POST `/ui/recon/{userId}/move-to-ready`
**Description**: Move reconciliation records to ready state

**Request Body**:
```json
{
  "recon_ids": ["recon-id-1", "recon-id-2"],
  "resolution_notes": "Discrepancies resolved"
}
```

#### Trigger APIs

##### POST `/ui/trigger/{userId}/{action}`
**Description**: Trigger external API calls

**Path Parameters**:
- `userId` (string): User ID
- `action` (string): Action to trigger (`settle`, `recon`, `on_recon`)

**Request Body**:
```json
{
  "payload": {
    // ONDC payload to send to external endpoint
  },
  "endpoint_url": "https://external-api.com/webhook"
}
```

---

## Request/Response Formats

### Standard Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Standard Error Response
```json
{
  "success": false,
  "errorCode": "ERROR_CODE",
  "message": "Error description",
  "details": {
    // Additional error context
  }
}
```

### ONDC Protocol Responses
```json
// ACK Response
{
  "message": {
    "ack": {
      "status": "ACK"
    }
  }
}

// NACK Response  
{
  "message": {
    "ack": {
      "status": "NACK"
    }
  },
  "error": {
    "code": "70002",
    "message": "Invalid schema"
  }
}
```

---

## Error Model & Codes

### HTTP Status Code Mapping
- **200**: Success (including ONDC ACK/NACK responses)
- **400**: Bad Request / Validation Failed
- **401**: Unauthorized / Invalid Token
- **403**: Forbidden / Invalid Client ID
- **404**: Resource Not Found
- **409**: Conflict / Duplicate Entry
- **422**: Schema Validation Failed
- **429**: Rate Limit Exceeded
- **500**: Internal Server Error
- **502**: Bad Gateway
- **503**: Service Unavailable

### Application Error Codes

#### General Errors
- `GEN_000`: Internal server error
- `GEN_001`: Too many requests
- `GEN_002`: Invalid query parameters
- `GEN_003`: Invalid request body
- `GEN_004`: Health check failed
- `GEN_502`: Bad gateway

#### Authentication Errors
- `AUTH_000`: Invalid or expired token
- `AUTH_001`: Invalid client ID

#### User Management Errors
- `USR_000`: User not found
- `USR_001`: Invalid user data

#### Validation Errors
- `VAL_000`: Validation failed
- `VAL_001`: Schema validation failed

#### Order Management Errors
- `ORD_000`: Failed to create order
- `ORD_404`: Order not found

#### Database Errors
- `DB_400`: Database query failed

#### ONDC Settlement Agency Errors
- `70000`: Invalid signature
- `70001`: Missing authorization header
- `70002`: Invalid schema
- `70003-70030`: Various settlement and reconciliation errors

### Error Response Examples

#### Validation Error
```json
{
  "success": false,
  "errorCode": "VAL_001", 
  "message": "Schema validation failed",
  "details": {
    "errors": [
      {
        "path": "context.action",
        "message": "Required field missing"
      }
    ]
  }
}
```

#### Rate Limit Error
```json
{
  "success": false,
  "errorCode": "GEN_001",
  "message": "Rate limit exceeded. Please try again after 1 minute(s)."
}
```

#### Authentication Error
```json
{
  "success": false,
  "errorCode": "AUTH_000", 
  "message": "Invalid or expired token"
}
```

### Retry Semantics
- **5xx Errors**: Exponential backoff retry recommended
- **4xx Errors**: Do not retry (client error)
- **Rate Limit (429)**: Retry after specified window
- **Network Timeouts**: Linear backoff retry with max attempts

### Correlation IDs
All requests include correlation IDs for tracing:
```http
X-Correlation-ID: abc-123-def-456
```

Error responses include correlation ID for debugging:
```json
{
  "success": false,
  "errorCode": "GEN_000",
  "message": "Internal server error",
  "correlationId": "abc-123-def-456"
}
```

---

## Schema Definitions

### Core Data Types

#### User Schema
```typescript
interface User {
  _id: string;
  title: string;
  role: "BAP" | "BPP" | "BOTH";
  subscriber_url: string;
  domain: string;
  np_tcs: number;
  np_tds: number;
  provider_details: ProviderDetail[];
  counterparty_ids: string[];
  created_at: string;
  updated_at: string;
}

interface ProviderDetail {
  provider_id: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
  provider_name: string;
}
```

#### Order Schema
```typescript
interface Order {
  _id: string;
  order_id: string;
  user_id: string;
  bap_id: string;
  bpp_id: string;
  domain: string;
  quote: {
    total_order_value: number;
    breakup: QuoteBreakup[];
  };
  settle_status: "READY" | "RECON" | "SETTLED";
  due_date?: string;
  created_at: string;
  updated_at: string;
}
```

#### Settlement Schema
```typescript
interface Settlement {
  _id: string;
  user_id: string;
  settlement_id: string;
  order_id: string;
  collector_app_id: string;
  receiver_app_id: string;
  settlement_amount: MonetaryValue;
  settlement_status: string;
  settlement_window?: string;
  settlement_basis?: string;
  created_at: string;
}

interface MonetaryValue {
  currency: "INR";
  value: string;
}
```

### ONDC Context Schema
```typescript
interface OndcContext {
  domain: string;
  action: string;
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: string; // RFC3339 format
  version: string;
  ttl: string; // ISO 8601 duration
}
```

---

## Versioning Strategy

### Current Versioning Approach
- **API Version**: 1.0.0 (defined in OpenAPI spec)
- **Versioning Method**: URL-based versioning via base path
- **Base Path**: `/rsf-utility` (configurable)
- **Backward Compatibility**: Maintained within major versions

### Version Management
- **Major Version Changes**: Breaking API changes, schema modifications
- **Minor Version Changes**: New endpoints, optional fields
- **Patch Version Changes**: Bug fixes, performance improvements

### Deprecation Policy

#### Deprecation Process
1. **Announcement**: Minimum 6 months advance notice
2. **Documentation**: Clear migration guide provided
3. **Headers**: Deprecation warnings in response headers
4. **Support**: Continued support during deprecation period

#### Deprecation Headers
```http
Deprecation: "2024-06-01"
Sunset: "2024-12-01"
Link: <https://docs.api.com/migration>; rel="successor-version"
```

#### Migration Support
- **Parallel API Support**: Old and new versions run simultaneously
- **Migration Tools**: Automated migration scripts provided
- **Documentation**: Detailed migration guides with examples
- **Support**: Technical support during migration period

### Version Compatibility Matrix
| API Version | ONDC Version | Status | Support Until |
|-------------|-------------|---------|---------------|
| 1.0.0 | 2.0.0 | Current | - |
| 0.9.x | 1.2.x | Deprecated | 2024-12-01 |

---

## Health Monitoring

### Health Check Endpoint

#### GET `/health`
**Description**: System health status

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 86400,
    "db": "connected",
    "version": "1.0.0"
  },
  "message": "OK"
}
```

**Error Response** (503):
```json
{
  "success": false,
  "errorCode": "GEN_004",
  "message": "Health check failed",
  "details": {
    "error": "Database connection failed"
  }
}
```

### Monitoring Metrics
- **Database Connectivity**: MongoDB connection status
- **API Response Times**: Average response times per endpoint
- **Error Rates**: 4xx/5xx error percentages
- **Rate Limit Metrics**: Request rates and throttling stats

---

## Security Features

### Content Validation
- **Content-Type**: Must be `application/json` for POST/PATCH requests
- **Request Size**: Limited to 3MB maximum
- **Schema Validation**: Strict Zod/AJV validation for all inputs

### Input Sanitization
- **XSS Prevention**: HTML/script tag filtering
- **SQL Injection**: MongoDB query sanitization
- **Path Traversal**: URL path validation

### Audit Logging
All API requests logged with:
- Request/response correlation IDs
- User identification (where applicable)
- Payload metadata (excluding sensitive data)
- Response status and timing

---

## Rate Limiting Details

### Rate Limiting Configuration
```typescript
interface RateLimitConfig {
  windowMs: 60000; // 1 minute window
  limit: number; // Configurable limit
  standardHeaders: "draft-8";
  legacyHeaders: false;
  keyGenerator: "global"; // Global rate limiting
}
```

### Rate Limit Response Headers
```http
RateLimit-Limit: 100
RateLimit-Remaining: 85
RateLimit-Reset: 1640995260
RateLimit-Policy: 100;w=60
```

### Bypass Mechanisms
- **Admin Endpoints**: Health checks bypass rate limiting
- **Internal Calls**: Service-to-service calls exempt
- **Emergency Override**: Manual rate limit suspension capability

---

## Integration Examples

### Frontend Integration Pattern
```typescript
// Axios configuration with token refresh
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// Request interceptor for auth
apiClient.interceptors.request.use(config => {
  const token = getStoredAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const newToken = await requestNewToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

### External ONDC Integration
```bash
# Example settlement webhook call
curl -X POST \
  https://rsf-utility.example.com/api/settle \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <signature>' \
  -d '{
    "context": {
      "domain": "ONDC:NTS10",
      "action": "settle",
      "bap_id": "buyer-app",
      "bpp_id": "seller-app",
      "transaction_id": "txn-123",
      "message_id": "msg-456",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    "message": {
      "settlement": {
        "settlement_id": "settle-789",
        "settlement_amount": {
          "currency": "INR",
          "value": "1000.00"
        }
      }
    }
  }'
```

---

## Developer Resources

### API Explorer
- **Swagger UI**: Available at `/api-docs` endpoint
- **Interactive Documentation**: Live API testing interface
- **Schema Browser**: Explore all data models and types
- **Example Requests**: Copy-paste ready request examples

### SDK & Libraries
- **Frontend**: React hooks and Axios interceptors provided
- **TypeScript Types**: Complete type definitions available
- **Validation**: Shared Zod schemas for client-side validation

### Testing Resources
- **Postman Collection**: Complete API collection available
- **Test Data**: Sample payloads for all endpoints
- **Mock Responses**: Development mock server configuration

### Support & Documentation
- **API Documentation**: This document (canonical reference)
- **Integration Guide**: Step-by-step integration walkthrough
- **Migration Guide**: Version migration instructions
- **Troubleshooting**: Common issues and solutions

---

## Change Log

### Version 1.0.0 (Current)
- Initial stable API release
- Complete ONDC protocol compliance
- JWT authentication implementation
- Rate limiting and security features
- Comprehensive error handling
- OpenAPI 3.1.0 documentation

### Planned Features
- **API Key Authentication**: Alternative to JWT for service-to-service calls
- **Webhook Subscriptions**: Event-driven notifications
- **GraphQL Endpoint**: Alternative query interface
- **API Analytics**: Usage metrics and reporting
- **Multi-tenant Support**: Organization-based API isolation

---

*This documentation is automatically generated and maintained. For the most up-to-date API specifications, refer to the live OpenAPI documentation at `/api-docs`.*

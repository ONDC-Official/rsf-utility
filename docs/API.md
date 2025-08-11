# API Documentation

This document provides detailed information about the RSF Utility API endpoints.

## Table of Contents
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Request/Response Formats](#request-response-formats)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Versioning](#versioning)

## Authentication

All API requests require authentication using JWT tokens.

### Getting a Token
```http
POST /auth/login
Content-Type: application/json

{
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret"
}
```

### Using the Token
```http
GET /api/orders
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Transaction Endpoints

#### 1. On Confirm
```http
POST /on_confirm
Content-Type: application/json

{
    "context": {
        "domain": "ONDC:NTS10",
        "action": "on_confirm",
        // ... other context fields
    },
    "message": {
        // ... message content
    }
}
```

#### 2. On Status
```http
POST /on_status
Content-Type: application/json

{
    "context": {
        "domain": "ONDC:NTS10",
        "action": "on_status",
        // ... other context fields
    },
    "message": {
        // ... message content
    }
}
```

### Settlement Endpoints

#### 1. Settle
```http
POST /settle
Content-Type: application/json

{
    "context": {
        "domain": "ONDC:NTS10",
        "action": "settle",
        // ... other context fields
    },
    "message": {
        "settlement": {
            // ... settlement details
        }
    }
}
```

#### 2. On Settle
```http
POST /on_settle
Content-Type: application/json

{
    "context": {
        "domain": "ONDC:NTS10",
        "action": "on_settle",
        // ... other context fields
    },
    "message": {
        // ... settlement response
    }
}
```

### Reconciliation Endpoints

#### 1. Recon
```http
POST /recon
Content-Type: application/json

{
    "context": {
        "domain": "ONDC:NTS10",
        "action": "recon",
        // ... other context fields
    },
    "message": {
        // ... reconciliation request
    }
}
```

#### 2. On Recon
```http
POST /on_recon
Content-Type: application/json

{
    "context": {
        "domain": "ONDC:NTS10",
        "action": "on_recon",
        // ... other context fields
    },
    "message": {
        // ... reconciliation response
    }
}
```

## Request/Response Formats

### Standard Response Format
```json
{
    "success": true,
    "data": {
        // Response data
    },
    "message": "Operation successful"
}
```

### Error Response Format
```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "Error description"
    }
}
```

### Pagination Format
```json
{
    "success": true,
    "data": {
        "items": [],
        "pagination": {
            "page": 1,
            "limit": 10,
            "totalPages": 5,
            "totalItems": 48
        }
    }
}
```

## Error Handling

### Error Codes
| Code | Description |
|------|-------------|
| INVALID_REQUEST | Request validation failed |
| UNAUTHORIZED | Authentication failed |
| FORBIDDEN | Insufficient permissions |
| NOT_FOUND | Resource not found |
| INTERNAL_ERROR | Internal server error |

### Validation Errors
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Validation failed",
        "details": [
            {
                "field": "amount",
                "message": "Amount must be greater than 0"
            }
        ]
    }
}
```

## Rate Limiting

API endpoints are rate-limited based on client ID:

- Default limit: 1000 requests per minute
- Headers provided:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

Example rate limit response:
```json
{
    "success": false,
    "error": {
        "code": "RATE_LIMIT_EXCEEDED",
        "message": "Too many requests",
        "retryAfter": 60
    }
}
```

## Versioning

### API Versioning
- API version is specified in the URL path
- Current version: v2.0
- Example: `/api/v2.0/orders`

### Version Support
- v2.0 (Current)
  - Full feature set
  - Recommended for new integrations

- v1.0 (Deprecated)
  - Basic features only
  - Will be discontinued on [date]

### Version Headers
```http
Accept-Version: 2.0
API-Version: 2.0
```

## Webhook Integration

### Webhook Registration
```http
POST /api/webhooks
Content-Type: application/json

{
    "url": "https://your-domain.com/webhook",
    "events": ["settlement.completed", "recon.completed"]
}
```

### Webhook Payload Format
```json
{
    "event": "settlement.completed",
    "timestamp": "2025-08-11T10:00:00Z",
    "data": {
        // Event specific data
    }
}
```

## API Status

Check API status and health:
```http
GET /health
```

Response:
```json
{
    "status": "healthy",
    "version": "2.0.0",
    "timestamp": "2025-08-11T10:00:00Z",
    "services": {
        "database": "connected",
        "cache": "connected"
    }
}
```

For detailed information about specific endpoints, request/response schemas, and examples, please refer to the OpenAPI documentation available at `/api-docs` when running the application.

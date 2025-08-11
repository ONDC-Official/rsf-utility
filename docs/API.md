# RSF Utility API Documentation

> For detailed API specifications, schemas, and examples, refer to the auto-generated OpenAPI documentation at `/api-docs` endpoint.

## Overview

RSF Utility exposes RESTful APIs for settlement, reconciliation, and transaction management in the ONDC network. This document provides a high-level overview of the API structure and features.

> Implementation: See `src/docs/open-apiSpec.ts` for complete OpenAPI definitions.

## API Categories

### Core APIs
- **Authentication**: JWT-based access control
- **Transaction Management**: Order processing and status updates
- **Settlement Operations**: Payment settlement flows
- **Reconciliation**: Transaction reconciliation endpoints

> Routes Implementation: See `src/routes/api-routes/` and `src/routes/ui-routes/`

## Authentication

All APIs require JWT authentication. Token management is handled via:
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

### Core API Groups

> Implementation: `src/controller/` contains the business logic for each endpoint

#### 1. Transaction APIs
- **Order Processing**: `/on_confirm`, `/on_status`
  - Handle order confirmations and status updates
  - Implementation: `src/controller/order-controller.ts`

#### 2. Settlement APIs
- **Settlement Flow**: `/settle`, `/on_settle`
  - Manage payment settlements between parties
  - Implementation: `src/controller/settle-controller.ts`

#### 3. Reconciliation APIs
- **Recon Operations**: `/recon`, `/on_recon`
  - Handle transaction reconciliation
  - Implementation: `src/controller/recon-controller.ts`
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

## Common Patterns

### Response Structure
> Implementation: See `src/utils/resUtils.ts`

All API responses follow standardized formats:
- Success responses include `success`, `data`, and `message` fields
- Error responses include `success`, `error.code`, and `error.message`
- Paginated responses include `pagination` metadata

### Request Validation
> Implementation: See `src/schema/` for Zod schemas

All requests are validated using:
- Zod schema validation
- OpenAPI specification compliance
- Automatic request parsing and type checking
```

## Error Handling

> Implementation: See `src/constants/error-codes.ts` for error definitions

The API uses standardized error handling:
- Consistent error codes across all endpoints
- Detailed validation error messages
- Proper HTTP status code mapping

Common error categories:
- Authentication errors (401, 403)
- Validation failures (400)
- Resource errors (404)
- Server errors (500)

> For detailed error codes and handling, refer to the OpenAPI documentation.
```

## API Protection

### Rate Limiting
> Implementation: `src/middlewares/rate-limiter.ts`

The API implements rate limiting:
- Per-client rate limits
- Standard rate limit headers
- Configurable thresholds

### API Versioning
> Implementation: See route configurations in `src/routes/`

Version management:
- URL-based versioning
- Current version: v2.0
- Version headers supported

### Security Features
> Implementation: `src/middlewares/`

- JWT Authentication
- Rate limiting
- Request validation
- Audit logging

## Additional Features

### Health Monitoring
> Implementation: `src/utils/health-monitor.ts`

- Health check endpoint: `/health`
- Service status monitoring
- Database connectivity checks

### Event System
> Implementation: `src/services/`

Supports event-based operations:
- Settlement notifications
- Reconciliation events
- Status updates

### API Documentation
> Implementation: `src/docs/`

- OpenAPI/Swagger documentation
- Auto-generated API specs
- Interactive API explorer at `/api-docs`

## Developer Resources

1. **API Explorer**
   - Available at `/api-docs` endpoint
   - Interactive documentation
   - Request/response examples

2. **Integration Guide**
   - Refer to OpenAPI documentation
   - Example requests in Swagger UI
   - Testing endpoints in dev environment

3. **Source References**
   - Controllers: `src/controller/`
   - Routes: `src/routes/`
   - Schemas: `src/schema/`
   - Middleware: `src/middlewares/`

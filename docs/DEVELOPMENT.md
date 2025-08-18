# Development Guide

This guide provides information for developers working on the RSF Utility project.

## Table of Contents
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Style and Standards](#code-style-and-standards)
- [API Development](#api-development)

## Development Setup

1. **Local Development Environment**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Watch mode for tests
npm run test:watch
```

2. **IDE Configuration**
- VS Code is recommended
- Install recommended extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

## Project Structure
```
rsf-utility/
├── docs/              # Documentation
├── src/               # Source code
│   ├── config/        # Configuration files
│   ├── constants/     # Constants and enums
│   ├── controller/    # Request handlers
│   ├── db/           # Database models and connection
│   ├── di/           # Dependency injection
│   ├── docs/         # API documentation
│   ├── middlewares/  # Express middlewares
│   ├── repositories/ # Data access layer
│   ├── routes/       # API routes
│   ├── schema/       # Data schemas
│   ├── services/     # Business logic
│   ├── strategies/   # Strategy patterns
│   ├── test/         # Test files
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── logs/             # Application logs
└── test/             # Test configuration
```

## Architecture Overview

### Core Components

1. **Controller Layer**
- Handles HTTP requests
- Input validation
- Response formatting

2. **Service Layer**
- Business logic
- Transaction management
- Error handling

3. **Repository Layer**
- Data access
- Database operations
- Query optimization

4. **Models**
- MongoDB schemas
- Data validation
- Type definitions

### Key Services

1. **Order Management**
```typescript
class OrderService {
    async createOrder(orderData: OrderType): Promise<Order>
    async updateOrder(orderId: string, data: Partial<OrderType>): Promise<Order>
    async getOrder(orderId: string): Promise<Order>
}
```

2. **Settlement Processing**
```typescript
class SettleDbManagementService {
    async getSingleSettlement(userId: string, orderId: string)
    async updateSettlementsViaResponse(userId: string, settlePayload: SettlePayload)
    async checkSettlementsForUser(userId: string, settlePayload: SettlePayload)
}
```

3. **Reconciliation**
```typescript
class ReconDbService {
    async createRecon(reconData: ReconType): Promise<Recon>
    async updateRecon(reconId: string, data: Partial<ReconType>): Promise<Recon>
    async getRecon(reconId: string): Promise<Recon>
}
```

## Development Workflow

1. **Feature Development**
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push changes
git push origin feature/feature-name
```

2. **Testing**
```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/test/specific.test.ts

# Run tests with coverage
npm run test:cov
```

3. **Code Quality**
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Testing

### Unit Tests
```typescript
// Example test file
import { OrderService } from '../services/order-service';

describe('OrderService', () => {
    let orderService: OrderService;

    beforeEach(() => {
        // Setup
    });

    it('should create an order', async () => {
        // Test implementation
    });
});
```

### Integration Tests
Located in `src/test/integration-tests/`

### Test Database Setup
```typescript
// src/test/setup.ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

beforeAll(async () => {
    // Setup test database
});

afterAll(async () => {
    // Cleanup
});
```

## Code Style and Standards

### TypeScript Guidelines
- Use strict type checking
- Avoid `any` type
- Document complex functions
- Use interfaces for type definitions

### Naming Conventions
- PascalCase for class names
- camelCase for variables and functions
- UPPER_CASE for constants
- kebab-case for file names

### Error Handling
```typescript
try {
    await someOperation();
} catch (error) {
    logger.error('Operation failed', {
        error,
        context: 'additional context'
    });
    throw new CustomError('Meaningful error message');
}
```

## API Development

### Route Definition
```typescript
// src/routes/api-routes/order-routes.ts
router.post('/orders', 
    validateSchema(orderSchema),
    orderController.createOrder
);
```

### Middleware Usage
```typescript
// src/middlewares/auth-handler.ts
export const authMiddleware = async (req, res, next) => {
    // Authentication logic
};
```

### Response Format
```typescript
// Success response
{
    success: true,
    data: { /* response data */ },
    message: "Operation successful"
}

// Error response
{
    success: false,
    error: {
        code: "ERROR_CODE",
        message: "Error description"
    }
}
```

### API Documentation
- OpenAPI/Swagger specs in `src/docs/`
- Generate API documentation using provided scripts
- Keep documentation in sync with code changes

For more detailed information about specific components or processes, refer to the respective documentation in the `docs/` directory.

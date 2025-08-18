# Contributing Guidelines

Thank you for your interest in contributing to the RSF Utility project! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Coding Standards](#coding-standards)

## Code of Conduct

This project follows the ONDC code of conduct. By participating, you are expected to uphold this code.

## How to Contribute

1. **Fork the Repository**
```bash
# Clone your fork
git clone https://github.com/your-username/rsf-utility.git

# Add upstream remote
git remote add upstream https://github.com/ONDC-Official/rsf-utility.git
```

2. **Keep Your Fork Updated**
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

3. **Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

## Development Process

1. **Setup Development Environment**
- Follow the [Installation Guide](./INSTALLATION.md)
- Set up development tools as per [Development Guide](./DEVELOPMENT.md)

2. **Make Your Changes**
- Write clean, maintainable code
- Follow the project's coding standards
- Add/update tests as needed
- Update documentation if required

3. **Test Your Changes**
```bash
# Run tests
npm test

# Check code coverage
npm run test:cov

# Run linter
npm run lint
```

## Pull Request Process

1. **Before Submitting**
- Update the README.md with details of changes if needed
- Update the documentation
- Add or update tests
- Ensure all tests pass
- Run code formatting

2. **Submitting a Pull Request**
- Fill in the pull request template
- Reference any related issues
- Provide a clear description of the changes
- Include screenshots for UI changes

3. **Review Process**
- Two maintainer approvals are required
- Address review comments
- Keep the PR updated with the main branch

## Commit Message Guidelines

Follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc)
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

Example:
```
feat(settlement): add new settlement validation logic

- Add validation for settlement amounts
- Update error handling
- Add unit tests

Closes #123
```

## Coding Standards

### TypeScript Guidelines

1. **Type Safety**
```typescript
// Good
function processOrder(order: Order): Promise<void>

// Avoid
function processOrder(order: any): Promise<void>
```

2. **Error Handling**
```typescript
try {
    await processSettlement(data);
} catch (error) {
    logger.error('Settlement processing failed', {
        error,
        settlementId: data.id
    });
    throw new SettlementError('Failed to process settlement');
}
```

3. **Async/Await**
```typescript
// Preferred
async function getOrder(id: string): Promise<Order> {
    const order = await OrderModel.findById(id);
    if (!order) throw new NotFoundError('Order not found');
    return order;
}

// Avoid
function getOrder(id: string): Promise<Order> {
    return OrderModel.findById(id)
        .then(order => {
            if (!order) throw new NotFoundError('Order not found');
            return order;
        });
}
```

### Code Organization

1. **File Structure**
```typescript
// Imports
import { ... } from '...';

// Types/Interfaces
interface Config { ... }

// Constants
const DEFAULT_TIMEOUT = 5000;

// Class/Function Implementation
export class Service { ... }

// Helper Functions
function helper() { ... }
```

2. **Naming Conventions**
```typescript
// Interfaces
interface ISettlement { ... }

// Types
type SettlementStatus = 'pending' | 'completed' | 'failed';

// Classes
class SettlementService { ... }

// Constants
const MAX_RETRIES = 3;
```

### Documentation

1. **Code Comments**
```typescript
/**
 * Processes a settlement request
 * @param settlementData - The settlement data to process
 * @returns Promise resolving to the processed settlement
 * @throws SettlementError if processing fails
 */
async function processSettlement(settlementData: SettlementData): Promise<Settlement> {
    // Implementation
}
```

2. **Inline Comments**
```typescript
// Only use inline comments for complex logic that needs explanation
function complexCalculation() {
    // Adjust for timezone differences
    const offset = calculateTimezoneOffset();
    
    // Apply business rules
    const result = applyRules(offset);
}
```

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Project Architecture Documentation](./ARCHITECTURE.md)

For any questions or clarifications, please reach out to the maintainers or create an issue in the repository.

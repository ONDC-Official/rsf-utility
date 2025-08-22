# Contributing Guidelines

Thank you for your interest in contributing to the RSF Utility project! This document provides comprehensive guidelines for contributing to this microservice architecture with git submodules.

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit and PR Conventions](#commit-and-pr-conventions)
- [Coding Standards](#coding-standards)
- [Documentation Standards](#documentation-standards)
- [Testing Guidelines](#testing-guidelines)
- [Deployment Process](#deployment-process)
- [Code Review Process](#code-review-process)
- [Changelog Maintenance](#changelog-maintenance)

## Project Structure

RSF Utility follows a **microservice architecture with git submodules**:

```
rsf-utility/ (parent repository)
├── .gitmodules                    # Submodule configuration
├── UNDERSTANDING.md               # Project overview (maintained by Copilot)
├── docs/                         # Comprehensive documentation hub
│   ├── 01-architecture.md        # System architecture
│   ├── 02-components.md          # Component details
│   ├── 03-workflows.md           # Business workflows
│   ├── 04-apis.md                # API documentation
│   ├── 05-data-models.md         # Data structures
│   ├── 06-deployment.md          # Deployment guide
│   ├── 07-operations-observability.md # Operations
│   ├── 08-security.md            # Security guidelines
│   ├── 09-troubleshooting.md     # Diagnostics
│   ├── 10-contributing.md        # This document
│   └── CHANGELOG.md              # Version history
├── rsf-utility-backend/          # Independent backend service
│   ├── .github/workflows/        # Backend CI/CD
│   ├── docs/                     # Backend-specific docs
│   ├── src/                      # Backend source code
│   └── package.json              # Backend dependencies
└── rsf-utility-frontend/         # Independent frontend service
    ├── .github/workflows/        # Frontend CI/CD
    ├── src/                      # Frontend source code
    └── package.json              # Frontend dependencies
```

### Repository Independence

**Each submodule is a fully independent repository:**
- **Backend**: `https://github.com/ONDC-Official/rsf-utility-backend`
- **Frontend**: `https://github.com/ONDC-Official/rsf-utility-frontend`
- **Parent**: Orchestrates documentation and submodule coordination

**Key Benefits:**
- ✅ Independent development cycles and deployment
- ✅ Technology stack flexibility per service
- ✅ Team autonomy with specialized expertise
- ✅ Separate CI/CD pipelines and versioning

## Getting Started

### 1. Repository Setup

**For Parent Repository Work:**
```bash
# Clone with submodules
git clone --recursive https://github.com/ONDC-Official/rsf-utility.git
cd rsf-utility

# If already cloned, initialize submodules
git submodule update --init --recursive

# Keep submodules updated
git submodule update --remote
```

**For Submodule Development:**
```bash
# Work directly in submodule repositories
git clone https://github.com/ONDC-Official/rsf-utility-backend.git
# OR
git clone https://github.com/ONDC-Official/rsf-utility-frontend.git
```

### 2. Environment Setup

**Backend Development:**
```bash
cd rsf-utility-backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

**Frontend Development:**
```bash
cd rsf-utility-frontend
npm install
# Configure REACT_APP_BACKEND_URL in .env
npm start
```

**Docker Development:**
```bash
# Full stack development
docker-compose up -d
```

### 3. Development Tools

**Required Extensions (VS Code):**
- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features
- GitLens
- Thunder Client (for API testing)

**Recommended Tools:**
- Node.js 18+ and npm 8+
- Docker and Docker Compose
- MongoDB Compass (for database inspection)
- Postman or Thunder Client (for API testing)

## Development Workflow

### 1. Feature Development Process

**For Submodule Changes:**
```bash
# 1. Create feature branch in respective submodule
cd rsf-utility-backend  # or rsf-utility-frontend
git checkout -b feature/feature-name

# 2. Make changes and commit following conventions
git add .
git commit -m "feat(component): description of changes"

# 3. Push and create PR in submodule repository
git push origin feature/feature-name
```

**For Parent Repository Updates:**
```bash
# 1. Create feature branch in parent repo
git checkout -b feat/update-submodules

# 2. Update submodule references
git submodule update --remote
git add rsf-utility-backend rsf-utility-frontend

# 3. Update documentation if needed
# Edit docs/ files as required

# 4. Commit changes
git commit -m "feat: update submodules and documentation"
```

### 2. Submodule Synchronization

**Updating Submodule References:**
```bash
# Update specific submodule to latest
git submodule update --remote rsf-utility-backend

# Update to specific commit
cd rsf-utility-backend
git checkout <specific-commit-hash>
cd ..
git add rsf-utility-backend
git commit -m "feat: update backend to version x.y.z"
```

**Coordinated Release Process:**
```bash
# 1. Ensure submodules are at desired commits
git submodule status

# 2. Tag coordinated release
git tag -a v1.0.0 -m "Release v1.0.0 with backend v1.2.3 and frontend v0.3.1"
git push origin v1.0.0
```

## Commit and PR Conventions

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat`: New feature implementation
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Code style changes (formatting, no logic changes)
- `refactor`: Code refactoring without feature changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build tools)
- `perf`: Performance improvements
- `ci`: CI/CD pipeline changes
- `build`: Build system changes
- `revert`: Revert previous changes

### Scope Examples

**Backend Scopes:**
- `auth`: Authentication/authorization
- `settlement`: Settlement processing
- `recon`: Reconciliation workflows
- `order`: Order management
- `api`: API endpoints
- `db`: Database operations
- `config`: Configuration changes

**Frontend Scopes:**
- `ui`: User interface components
- `api`: API integration
- `forms`: Form handling
- `routing`: Navigation/routing
- `auth`: Authentication flows
- `state`: State management

**Parent Repository Scopes:**
- `docs`: Documentation updates
- `deploy`: Deployment configurations
- `submodules`: Submodule updates

### Commit Message Examples

```bash
# Feature commits
feat(settlement): add new settlement validation logic
feat(ui): implement order filtering dashboard
feat(docs): add troubleshooting guide

# Bug fixes
fix(auth): resolve JWT token refresh issue
fix(api): handle missing order validation error
fix(deployment): correct Docker environment variables

# Documentation
docs(architecture): update system diagram
docs(contributing): add submodule workflow guide

# Chores
chore(deps): update dependencies to latest versions
chore(ci): improve deployment pipeline efficiency
```

### Pull Request Guidelines

**PR Title Format:**
```
<type>(<scope>): <description>
```

**PR Template Checklist:**
- [ ] **Code Quality**: Follows project coding standards
- [ ] **Testing**: All tests pass and new tests added if needed
- [ ] **Documentation**: Updated relevant documentation
- [ ] **Breaking Changes**: Documented in PR description
- [ ] **Dependencies**: No unnecessary dependency additions
- [ ] **Security**: No security vulnerabilities introduced
- [ ] **Performance**: No significant performance regressions

**PR Description Template:**
```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Documentation
- [ ] Code comments updated
- [ ] API documentation updated
- [ ] User documentation updated

## Related Issues
Closes #123
Related to #456
```

## Coding Standards

### TypeScript Guidelines

**Type Safety Standards:**
```typescript
// ✅ Good: Explicit typing
function processOrder(order: IOrder): Promise<ISettlement> {
    return settlementService.process(order);
}

// ❌ Avoid: Any types
function processOrder(order: any): Promise<any> {
    return settlementService.process(order);
}

// ✅ Good: Interface definitions
interface ISettlementRequest {
    orderId: string;
    amount: number;
    participantId: string;
}

// ✅ Good: Error handling with types
try {
    const result = await processSettlement(data);
    return result;
} catch (error) {
    logger.error('Settlement processing failed', {
        error: error as Error,
        settlementId: data.id
    });
    throw new SettlementError('Failed to process settlement');
}
```

### Code Organization Patterns

**File Structure Convention:**
```typescript
// Imports (external first, then internal)
import express from 'express';
import { Request, Response } from 'express';

import { IOrder } from '../types/order.types';
import { OrderService } from '../services/order.service';
import logger from '../utils/logger';

// Type definitions
interface ControllerOptions {
    timeout: number;
}

// Constants
const DEFAULT_TIMEOUT = 5000;

// Main implementation
export class OrderController {
    constructor(private orderService: OrderService) {}
    
    public async getOrders(req: Request, res: Response): Promise<void> {
        // Implementation
    }
}

// Helper functions (if needed)
function validateOrderId(id: string): boolean {
    return /^[a-zA-Z0-9-_]+$/.test(id);
}
```

**Naming Conventions:**
```typescript
// ✅ PascalCase for classes and interfaces
class SettlementService {}
interface IOrderData {}

// ✅ camelCase for variables and functions
const settlementAmount = 100;
function calculateTotal() {}

// ✅ UPPER_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT = 30000;

// ✅ kebab-case for file names
settlement-service.ts
order-controller.ts
```

### Code Formatting Standards

**Backend (TypeScript/Node.js):**
- **Prettier**: Automatic code formatting
- **ESLint**: Code quality and style enforcement
- **Tab Width**: 2 spaces (no tabs)
- **Line Length**: 120 characters maximum
- **Semicolons**: Required
- **Quotes**: Double quotes for strings
- **Trailing Commas**: Always

**Frontend (React/TypeScript):**
- **Prettier**: Consistent formatting
- **ESLint**: React-specific rules enabled
- **Tab Width**: 2 spaces
- **Line Length**: 120 characters
- **Semicolons**: Optional (configured via Prettier)
- **Quotes**: Single quotes
- **JSX**: Single quotes for JSX attributes

### Pre-commit Hooks

**Frontend Pre-commit Configuration:**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "./**/*.{ts,tsx,json}": [
      "prettier --write",
      "npm run lint"
    ]
  }
}
```

**Manual Pre-commit Checks:**
```bash
# Backend quality checks
cd rsf-utility-backend
npm run lint          # ESLint validation
npm run test          # Unit tests
npm run build         # TypeScript compilation

# Frontend quality checks
cd rsf-utility-frontend
npm run lint          # ESLint + Prettier
npm run test          # React tests
npm run build         # Production build
```

## Documentation Standards

### Documentation Maintenance by Copilot

The documentation system is **automatically maintained by GitHub Copilot**:

- **`/UNDERSTANDING.md`**: Continuously updated project overview
- **`/docs/*.md`**: Topic-specific documentation automatically refreshed
- **Submodule READMEs**: Point back to main documentation hub

**Human Responsibilities:**
- Update API documentation when endpoints change
- Document new features in appropriate doc sections
- Maintain changelog entries for releases
- Review and validate Copilot-generated documentation

### Documentation Structure

**Main Documentation (`/docs/`):**
- **01-architecture.md**: System design and component relationships
- **02-components.md**: Detailed component documentation
- **03-workflows.md**: Business process flows
- **04-apis.md**: API endpoints and contracts
- **05-data-models.md**: Database schemas and data structures
- **06-deployment.md**: Deployment procedures and configurations
- **07-operations-observability.md**: Monitoring and operations
- **08-security.md**: Security implementation and guidelines
- **09-troubleshooting.md**: Diagnostic procedures and solutions
- **10-contributing.md**: This contribution guide
- **CHANGELOG.md**: Version history and release notes

**Documentation Guidelines:**
```markdown
# Use clear, descriptive headings
## Include code examples with explanations
```bash
# Provide actual command examples
npm run dev
```

### API Documentation
- Include request/response examples
- Document error responses
- Provide authentication details
```

### Code Documentation

**TSDoc Comments:**
```typescript
/**
 * Processes a settlement request and updates order status
 * @param settlementData - The settlement data to process
 * @param options - Processing options (timeout, retries)
 * @returns Promise resolving to the processed settlement
 * @throws {SettlementError} When settlement processing fails
 * @throws {ValidationError} When settlement data is invalid
 * @example
 * ```typescript
 * const result = await processSettlement({
 *   orderId: "order-123",
 *   amount: 100.50,
 *   participantId: "participant-456"
 * });
 * ```
 */
async function processSettlement(
    settlementData: ISettlementData,
    options?: IProcessingOptions
): Promise<ISettlement> {
    // Implementation
}
```

## Testing Guidelines

### Testing Strategy

**Backend Testing:**
```bash
# Unit tests
npm test                           # All tests
npm test -- src/services/         # Specific directory
npm test -- --testNamePattern="Settlement"  # Pattern matching

# Coverage reports
npm run test:cov                   # Generate coverage

# Integration tests
npm run test:integration           # Full integration suite

# E2E tests
npm run test:e2e                   # End-to-end scenarios
```

**Frontend Testing:**
```bash
# Component tests
npm test                           # React Testing Library tests

# Component interaction tests
npm test -- --testNamePattern="OrderTable"  # Specific components

# Snapshot testing
npm test -- --updateSnapshot      # Update component snapshots
```

### Test Structure

**Backend Test Pattern:**
```typescript
// settlement.service.test.ts
describe('SettlementService', () => {
    let settlementService: SettlementService;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockOrderRepository = createMockRepository();
        settlementService = new SettlementService(mockOrderRepository);
    });

    describe('processSettlement', () => {
        it('should process valid settlement successfully', async () => {
            // Arrange
            const settlementData = createValidSettlementData();
            mockOrderRepository.findById.mockResolvedValue(mockOrder);

            // Act
            const result = await settlementService.processSettlement(settlementData);

            // Assert
            expect(result.status).toBe('completed');
            expect(mockOrderRepository.updateStatus).toHaveBeenCalledWith(
                settlementData.orderId,
                'settled'
            );
        });

        it('should throw SettlementError for invalid data', async () => {
            // Arrange
            const invalidData = createInvalidSettlementData();

            // Act & Assert
            await expect(
                settlementService.processSettlement(invalidData)
            ).rejects.toThrow(SettlementError);
        });
    });
});
```

**Frontend Test Pattern:**
```typescript
// OrderTable.test.tsx
describe('OrderTable', () => {
    const mockOrders = createMockOrders();

    it('should render order table with data', () => {
        render(<OrderTable orders={mockOrders} />);
        
        expect(screen.getByText('Order ID')).toBeInTheDocument();
        expect(screen.getByText(mockOrders[0].orderId)).toBeInTheDocument();
    });

    it('should handle order selection', async () => {
        const onOrderSelect = jest.fn();
        render(<OrderTable orders={mockOrders} onOrderSelect={onOrderSelect} />);
        
        fireEvent.click(screen.getByText(mockOrders[0].orderId));
        
        expect(onOrderSelect).toHaveBeenCalledWith(mockOrders[0]);
    });
});
```

### Testing Requirements

**For New Features:**
- [ ] Unit tests with >80% coverage
- [ ] Integration tests for API endpoints
- [ ] Component tests for React components
- [ ] Error path testing
- [ ] Performance testing for critical paths

**Test Data Management:**
```typescript
// Use factory functions for test data
function createMockOrder(overrides?: Partial<IOrder>): IOrder {
    return {
        id: 'test-order-1',
        orderId: 'ORDER123',
        amount: 100.50,
        status: 'pending',
        ...overrides
    };
}
```

## Deployment Process

### Environment Stages

**Development → Staging → Production**

**Backend Deployment:**
- **Development**: `npm run dev` (local)
- **Staging**: Docker deployment on develop branch
- **Production**: GitHub Actions on deployment branch

**Frontend Deployment:**
- **Development**: `npm start` (local)
- **Staging**: Auto-deployment on develop branch
- **Production**: Manual deployment trigger

### Deployment Checklist

**Pre-deployment:**
- [ ] All tests pass (unit, integration, e2e)
- [ ] Code review completed and approved
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Database migrations ready (if applicable)
- [ ] Environment variables configured
- [ ] Monitoring alerts configured

**Post-deployment:**
- [ ] Health checks pass
- [ ] Smoke tests completed
- [ ] Performance metrics validated
- [ ] Error rates within acceptable limits
- [ ] Rollback plan confirmed
- [ ] Team notified of deployment

### Release Coordination

**Coordinated Release Process:**
```bash
# 1. Prepare submodule releases
cd rsf-utility-backend
git tag v1.2.0
git push origin v1.2.0

cd ../rsf-utility-frontend
git tag v0.3.0
git push origin v0.3.0

# 2. Update parent repository
cd ..
git submodule update --remote
git add rsf-utility-backend rsf-utility-frontend
git commit -m "feat: release v1.5.0 with backend v1.2.0 and frontend v0.3.0"
git tag v1.5.0
git push origin v1.5.0

# 3. Update changelog
# Edit docs/CHANGELOG.md with release notes
```

## Code Review Process

### Review Criteria

**Code Quality:**
- [ ] **Functionality**: Code works as intended
- [ ] **Readability**: Clear, self-documenting code
- [ ] **Performance**: No obvious performance issues
- [ ] **Security**: No security vulnerabilities
- [ ] **Maintainability**: Easy to modify and extend

**Architecture Compliance:**
- [ ] **Patterns**: Follows established patterns
- [ ] **Dependencies**: Minimal, well-justified dependencies
- [ ] **APIs**: Consistent with existing API design
- [ ] **Error Handling**: Proper error handling and logging
- [ ] **Testing**: Adequate test coverage

### Review Process

**1. Author Responsibilities:**
- Write clear PR description
- Include test cases
- Update documentation
- Run all checks locally
- Address reviewer feedback promptly

**2. Reviewer Responsibilities:**
- Review within 24-48 hours
- Provide constructive feedback
- Test critical functionality
- Verify documentation updates
- Approve when standards are met

**3. Approval Requirements:**
- **Backend PRs**: 2 approvals from backend team
- **Frontend PRs**: 2 approvals from frontend team
- **Parent Repo PRs**: 1 approval from tech lead
- **Documentation PRs**: 1 approval from any team member

### Review Comments Guidelines

**Constructive Feedback Examples:**
```markdown
✅ Good: "Consider using a Map instead of an object for better performance with large datasets"
❌ Avoid: "This is wrong"

✅ Good: "Could you add a comment explaining the business logic here?"
❌ Avoid: "Needs comments"

✅ Good: "This error handling could be more specific - consider catching ValidationError separately"
❌ Avoid: "Fix error handling"
```

## Changelog Maintenance

### Changelog Format

We follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [Unreleased]
### Added
- New features in development

### Changed
- Changes to existing functionality

### Fixed
- Bug fixes

### Removed
- Removed features

## [1.5.0] - 2024-01-15
### Added
- Settlement validation with business rules
- Order filtering dashboard
- Prometheus metrics integration

### Changed
- Updated authentication flow to use JWT refresh tokens
- Improved error handling across all API endpoints

### Fixed
- Fixed memory leak in settlement processing
- Resolved CORS issues in production environment

## [1.4.0] - 2023-12-10
...
```

### Changelog Update Process

**During Development:**
```markdown
# Add to [Unreleased] section immediately
## [Unreleased]
### Added
- feat(settlement): new validation logic for business rules
```

**During Release:**
```bash
# 1. Move unreleased items to new version
# 2. Update version numbers and dates
# 3. Add version links at bottom
[1.5.0]: https://github.com/ONDC-Official/rsf-utility/compare/v1.4.0...v1.5.0
```

### Automated Changelog Generation

**For conventional commits:**
```bash
# Generate changelog from commits
npx conventional-changelog -p angular -i docs/CHANGELOG.md -s

# Generate release notes
npx conventional-github-releaser -p angular
```

---

## Quick Reference

### Essential Commands

```bash
# Setup
git clone --recursive https://github.com/ONDC-Official/rsf-utility.git
git submodule update --init --recursive

# Development
npm run dev                    # Start backend development
npm start                     # Start frontend development
npm test                      # Run tests
npm run lint                  # Check code quality

# Submodule management
git submodule update --remote # Update submodules
git submodule status          # Check submodule status

# Quality checks
npm run test:cov              # Backend coverage
npm run lint:fix              # Auto-fix lint issues
```

### Key Links

- **Backend Repository**: https://github.com/ONDC-Official/rsf-utility-backend
- **Frontend Repository**: https://github.com/ONDC-Official/rsf-utility-frontend
- **Conventional Commits**: https://www.conventionalcommits.org/
- **TypeScript Guidelines**: https://www.typescriptlang.org/docs/
- **Jest Testing**: https://jestjs.io/docs/getting-started
- **React Testing Library**: https://testing-library.com/docs/react-testing-library/intro/

### Contact

For questions or clarifications:
- Create an issue in the appropriate repository
- Contact the maintainers through GitHub
- Refer to existing documentation in `/docs/`

---

**This document is maintained alongside the codebase and should be updated when contribution processes change.**

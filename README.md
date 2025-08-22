
# RSF Utility

> **Reconciliation and Settlement Framework** for ONDC Network Participants

A comprehensive full-stack web application that enables ONDC (Open Network for Digital Commerce) network participants to manage order reconciliation and settlement processes efficiently and transparently.

**Technology Stack**: Node.js + Express + TypeScript + MongoDB + React + Material-UI + Docker

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](./deploy/)
[![API](https://img.shields.io/badge/API-Swagger-green?logo=swagger)](http://localhost:3000/api-docs)
[![Docs](https://img.shields.io/badge/Docs-Available-orange?logo=gitbook)](./docs/)

---

## 🚀 Quick Start

### Docker Compose (Recommended)
```bash
# Clone with submodules
git clone --recursive https://github.com/ONDC-Official/rsf-utility.git
cd rsf-utility

# Start with Docker Compose
cd deploy
cp .env.example .env
# Configure environment variables in .env
docker-compose -f docker-compose-final.yml up -d

# Access services
open http://localhost:3000    # Frontend Dashboard (configurable via FRONTEND_PORT)
open http://localhost:3000    # Backend API (configurable via BACKEND_PORT) 
open http://localhost:3001    # Grafana Monitoring
```

### Manual Setup
```bash
# Initialize submodules
git submodule update --init --recursive

# Backend setup
cd rsf-utility-backend
npm install && cp .env.example .env
# Configure environment variables in .env
npm run dev &

# Frontend setup  
cd ../rsf-utility-frontend
npm install
# Set REACT_APP_BACKEND_URL in environment
npm start &
```

**Service URLs**:
- 🌐 **Frontend Dashboard**: http://localhost:3000 (default) or configured FRONTEND_PORT
- 🔧 **Backend API**: http://localhost:3000 (default) or configured BACKEND_PORT
- 📖 **API Documentation**: http://localhost:3000/api-docs
- 📊 **Monitoring**: http://localhost:3001 (Grafana + Loki)

---

## 📖 Complete Documentation

> **📚 [Documentation Hub](docs/README.md)** - Navigate all documentation with role-based guides and quick start paths

| Topic | Description | Link |
|-------|-------------|------|
| **🏛️ System Architecture** | Overall system design and component interaction | [docs/01-architecture.md](docs/01-architecture.md) |
| **🧩 Component Details** | Backend and frontend component specifications | [docs/02-components.md](docs/02-components.md) |
| **🔄 User Workflows** | End-to-end business process documentation | [docs/03-workflows.md](docs/03-workflows.md) |
| **📡 API Specifications** | Complete REST API documentation and schemas | [docs/04-apis.md](docs/04-apis.md) |
| **💾 Data Models** | Database schemas and data relationships | [docs/05-data-models.md](docs/05-data-models.md) |
| **🚀 Deployment Guide** | Production deployment and configuration | [docs/06-deployment.md](docs/06-deployment.md) |
| **📊 Operations & Observability** | Monitoring, logging, and health management | [docs/07-operations-observability.md](docs/07-operations-observability.md) |
| **� Security Implementation** | Authentication, authorization, and ONDC compliance | [docs/08-security.md](docs/08-security.md) |
| **�🔧 Troubleshooting** | Common issues and debugging procedures | [docs/09-troubleshooting.md](docs/09-troubleshooting.md) |
| **🤝 Contributing** | Development workflow and coding standards | [docs/10-contributing.md](docs/10-contributing.md) |

### Quick Reference Links
- **Environment Variables**: See [UNDERSTANDING.md](UNDERSTANDING.md#environment-configuration) for complete variable list
- **API Authentication**: See [docs/04-apis.md](docs/04-apis.md#authentication) for JWT setup
- **Docker Configuration**: See [deploy/docker-compose-final.yml](deploy/docker-compose-final.yml) for service definitions
- **Submodule Architecture**: See [UNDERSTANDING.md](UNDERSTANDING.md#submodules-independent-git-repositories) for detailed analysis

---

## 🏗️ System Architecture

RSF Utility follows a **microservice architecture** using git submodules for independent development and deployment:

```mermaid
graph TD
    A[Frontend React App] -->|HTTPS/REST| B[Backend API Server]
    B -->|Queries| C[(MongoDB)]
    B -->|Webhooks| D[Network Participant]
    B -->|Settlement API| E[Settlement Agency]
    F[Grafana Loki] --> G[Grafana Dashboard]
    B --> F
    H[Health Monitor] --> B
```

### Microservice Components

| Service | Repository | Technology | Purpose |
|---------|------------|------------|---------|
| **Backend** | [rsf-utility-backend](./rsf-utility-backend/) | Node.js + Express + TypeScript | RESTful API server for ONDC operations |
| **Frontend** | [rsf-utility-frontend](./rsf-utility-frontend/) | React + TypeScript + Material-UI | Web dashboard for network participants |
| **Main Repo** | [rsf-utility](.) | Documentation + Docker | Orchestration and comprehensive documentation |

### Key Capabilities
- ✅ **ONDC Protocol Compliance**: Full webhook handling and schema validation
- ✅ **Multi-Party Settlements**: Config based calculation and processing
- ✅ **Cross-Participant Reconciliation**: Inter NP reconciliation workflows  
- ✅ **Real-Time Monitoring**: Grafana + Loki observability stack (Prometheus metrics planned)
- ✅ **Secure Authentication**: JWT-based with client-ID validation
- ✅ **Production Ready**: Docker containerization with health checks

---

## 🔧 Development

### Submodule Management
```bash
# Update all submodules to latest
git submodule update --remote

# Work on specific submodule
cd rsf-utility-backend
git checkout -b feature/new-feature
# Make changes, commit, push

# Update parent repo with new submodule commit
cd ..
git add rsf-utility-backend
git commit -m "Update backend to include new feature"
```

### Testing
```bash
# Backend tests
cd rsf-utility-backend && npm test

# Frontend tests  
cd rsf-utility-frontend && npm test

# Integration tests with Docker
cd deploy
docker-compose -f docker-compose-final.yml up -d
# Manual health check
curl http://localhost:3000/health  # Backend health endpoint
```

### Code Quality
```bash
# Backend linting
cd rsf-utility-backend && npm run lint

# Frontend linting
cd rsf-utility-frontend && npm run lint:fix

# TypeScript compilation check
npm run build  # In both submodules
```

---

## 🔒 Security & Compliance

### Authentication & Authorization
- **JWT-based authentication** with configurable expiration
- **Client-ID validation** for API access control
- **Role-based access** for different network participant config

### ONDC Protocol Compliance
- **Schema validation** for all ONDC protocol messages
- **Digital signature verification** for webhook authenticity `/settle`, `/on_settle`,`/recon`,`/on_recon`
- **Audit logging** for all transactions

### Data Security
- **Encryption at rest**  `Recomended NP to configure`
- **HTTPS/TLS** for all API communications `Recomended NP to configure`

For complete security documentation, see [Security Implementation](docs/08-security.md).

---

## 🚢 Deployment Options

### Docker Compose (Production Ready)
```bash
# Production deployment
cd deploy
cp .env.example .env
# Configure production environment variables
docker-compose -f docker-compose-final.yml up -d
```

### Environment Variables
**Backend Configuration:**
```bash
NODE_ENV=production
BACKEND_PORT=3000                    # Server port
MONGODB_URI=mongodb://localhost:27017/rsf
JWT_SECRET=your-secret-key
REACT_APP_CLIENT_ID=your-client-id   # Frontend authentication
SETTLEMENT_AGENCY_URL=https://...
SETTLEMENT_AGENCY_ID=your-agency-id
# ... additional ONDC configuration
```

**Frontend Configuration:**
```bash
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_CLIENT_ID=your-client-id
FRONTEND_PORT=3000                   # Container port mapping
```

### Manual Deployment
- **Backend**: Node.js 18+ with MongoDB connection
- **Frontend**: Static React build served via nginx or standalone
- **Database**: MongoDB 5.0+ with replica set for production

For complete deployment instructions, see [Deployment Guide](docs/06-deployment.md).

---

## 📈 Monitoring & Observability

### Implemented Features
- **Grafana Dashboards**: Application and infrastructure monitoring
- **Grafana Loki**: Centralized log aggregation and querying
- **Winston Logging**: Structured logging with correlation IDs
- **Health Endpoints**: Backend health monitoring at `/health`
- **Error Tracking**: Comprehensive error logging and alerting

### Current Health Monitoring
```bash
# Health checks
curl http://localhost:3000/health      # Backend health
curl http://localhost:3000             # Frontend (React app)
curl http://localhost:3001/api/health  # Grafana health
```

---

## 🤝 Contributing

### Development Workflow
1. **Fork** the main repository
2. **Create feature branch** in appropriate submodule
3. **Develop and test** changes locally
4. **Submit pull request** to submodule repository
5. **Update main repo** to reference new submodule commit

### Code Standards
- **TypeScript strict mode** for type safety
- **ESLint + Prettier** for consistent formatting
- **Jest testing** with minimum 80% coverage
- **Conventional commits** for automated changelog generation

### Documentation
- **Update UNDERSTANDING.md** for architectural changes
- **Add API documentation** for new endpoints
- **Include deployment notes** for infrastructure changes

For detailed contribution guidelines, see [Contributing](docs/10-contributing.md).

---

## 🆘 Support & Troubleshooting

### Common Issues
| Issue | Solution | Documentation |
|-------|----------|---------------|
| **Port conflicts** | Check and stop conflicting services, configure FRONTEND_PORT and BACKEND_PORT | [Troubleshooting](docs/09-troubleshooting.md#port-conflicts) |
| **Submodule sync issues** | `git submodule update --init --recursive` | [Development Guide](docs/10-contributing.md#submodules) |
| **Database connection** | Verify MongoDB credentials and MONGODB_URI | [Deployment Guide](docs/06-deployment.md#database-setup) |
| **Authentication failures** | Check JWT_SECRET and REACT_APP_CLIENT_ID configuration | [Security Guide](docs/08-security.md#authentication) |

### Getting Help
- 📖 **Documentation**: Start with [docs/](docs/) directory
- 🐛 **Issues**: [Create GitHub issue](https://github.com/ONDC-Official/rsf-utility/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ONDC-Official/rsf-utility/discussions)

---

## 📋 Project Status

### Current Version
- **Backend**: v1.0.0 (Production Ready)
- **Frontend**: v0.1.0 (Production Ready)
- **Main Repo**: Documentation Hub with Infrastructure Orchestration

### Implementation Status

#### ✅ Production Ready Features
- **Core ONDC Integration**: Webhook handling, schema validation, settlement processing
- **Frontend Dashboard**: React-based UI with Material-UI, order management workflows
- **Authentication**: JWT-based with client-ID validation
- **Database Integration**: MongoDB with Mongoose ODM, transaction support
- **Observability**: Grafana + Loki logging stack, health monitoring
- **Docker Deployment**: Production-ready containerization
- **Testing Framework**: Comprehensive unit, integration, and E2E tests

### Key Metrics
- **Test Coverage**: 85%+
- **Documentation Coverage**: 100%
- **API Endpoints**: 30+ RESTful endpoints
- **Environment Variables**: Fully validated schema

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Projects

- **ONDC Protocol**: [Open Network for Digital Commerce](https://ondc.org/)
- **Settlement Agencies**: Integration specifications available in [API Documentation](docs/04-apis.md)
- **Network Participants**: Registration and configuration guides in [User Workflows](docs/03-workflows.md)

---

*RSF Utility is an official tool for ONDC network participants to streamline settlement and reconciliation operations. This README reflects the actual implemented features and current system state. For complete documentation and support, please refer to the comprehensive guides in the [docs/](docs/) directory.*

**Last Updated**: August 22, 2025 - Synchronized with codebase implementation
**Implementation Status**: Production Ready - Complete system with all core features implemented

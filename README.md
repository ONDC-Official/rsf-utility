# RSF Utility

## Overview
RSF Utility is a modular transaction processing system designed for handling transaction payloads, settlement handling and reconciliation in the ONDC (Open Network for Digital Commerce) ecosystem. The system provides a comprehensive solution for:

- Ingesting transaction payloads by the network participants
- Managing settlement interactions with external Settlement Agency (SA) 
- Performing reconciliation with the counterparty network participants
- Providing a intutive UI for operators (such as Finance team, Support team) and configuration of key values
- Persisting operational and audit data in MongoDB
- Exposing observability using Loki and Grafana
- Securing UI ↔ API traffic with JWT and TLS

## Documentation Structure
- [System Architecture](./docs/ARCHITECTURE.md) - Detailed system architecture and components
- [Installation Guide](./docs/INSTALLATION.md) - Setup and installation instructions
- [Development Guide](./docs/DEVELOPMENT.md) - Guide for developers
- [API Documentation](https://fis-staging.ondc.org/rsf-utility/api-docs) - API endpoints and usage
- [Contributing Guidelines](./docs/CONTRIBUTING.md) - How to contribute to the project

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Docker (optional, for containerization)
- npm or yarn

### Basic Setup
1. Clone the repository:
```bash
git clone https://github.com/ONDC-Official/rsf-utility.git
cd rsf-utility
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` by default.

### Environment Configuration
Key environment variables:
- `NODE_ENV`: Application environment (development/production/test)
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `SETTLEMENT_AGENCY_URL`: Settlement agency endpoint
- `JWT_SECRET`: Secret for JWT authentication
- See [Installation Guide](./docs/INSTALLATION.md) for complete configuration details

## Key Features
1. **Transaction Management**
   - Payload validation
   - Order state management
   - Transaction processing

2. **Settlement Processing**
   - Settlement request generation
   - Interaction with Settlement Agency
   - Settlement status tracking

3. **Reconciliation**
   - Network reconciliation
   - Settlement reconciliation
   - Discrepancy handling

4. **Administration UI**
   - Order management
   - Settlement monitoring
   - System configuration
   - Audit logging

5. **Observability**
   - Structured logging
   - Performance monitoring
   - Error tracking

## License
ISC License

## Support
For support and queries, please [create an issue](https://github.com/ONDC-Official/rsf-utility/issues) or contact the maintainers.

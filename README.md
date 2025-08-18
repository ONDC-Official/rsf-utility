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
- Refer [RSF 2.0 Framework](https://docs.google.com/document/d/1Pj7e1MuObQeLczx_palbcliUPTkMRYA76esjrfAMT14/edit?usp=sharing) for understanding the settlement and reconciliation mechanics 

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

## Assumptions
- Single settlement file can be created at once, the user must only pass upto 100 orders for generation. If there are >100 orders to be settled, the utility shall throw an error
- Buyer Finder Fee (BFF) is tax exclusive and the utility calculates at 18% GST and shows Commission inclusive of GST on BFF
- A NACK will be provided if a /recon API call is received where a /recon call has been self triggered (PENDING, ACCEPTED states) for the respective order
- For calculations of BFF and Taxes, refer [ONDC Guidance](https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/ondc-website-media/downloads/governance-and-policies/CHAPTER-%5B3%5D-Commercial%2BModel.pdf)
- The amounts across all fields in the order transaction APIs should be upto 2 decimal digits
- Settlement Window (@ondc/org/settlement_window) and Settlement basis (@ondc/org/settlement_basis) are expected as mandatory attributes to calculate settlement due date for each order
- For settlement basis of return_window_expiry, settlement due date is can be entered in the Orders Ready section
- np_type is expected as a mandatory tag attribute

## Support
For support and queries, please [create an issue](https://github.com/ONDC-Official/rsf-utility/issues) or contact the maintainers.

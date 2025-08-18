# Database Integration Guide

This guide provides instructions for setting up and deploying RSF Utility with MongoDB.

## Table of Contents
- [Environment Setup](#environment-setup)
- [Deployment Configuration](#deployment-configuration)
- [Database Schema](#database-schema)
- [Health Monitoring](#health-monitoring)
- [Limitations](#limitations)

## Environment Setup

### Prerequisites
1. MongoDB (local or remote instance)
2. Node.js with npm installed
3. Docker and Docker Compose (for containerized deployment)

## Deployment Configuration

### Local Development
```bash
# 1. Set environment variables
export MONGODB_URI="mongodb://localhost:27017/rsf-utility"
export NODE_ENV="development"

# 2. Start MongoDB (if running locally)
mongod --dbpath /your/db/path
```

### Docker Deployment
```yaml
# docker-compose.yml
version: '3'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  rsf-utility:
    build: .
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/rsf-utility
      - NODE_ENV=production
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

### Connection Configuration
The application automatically handles MongoDB connection using environment variables:

```typescript
// Current implementation in src/db/config.ts
const config = {
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/rsf-utility",
};
```

## Database Schema

The application uses Mongoose schemas with automatic index creation:

### Reconciliation Model
```typescript
// Key indexes for reconciliation operations
{
    order_id: { type: String, index: true },
    user_id: { type: String, index: true },
    domain: { type: String, index: true },
    type: { type: String, index: true },
    status: { type: String, index: true },
    settlement_id: { type: String, index: true }
}
```

### Transaction Model
```typescript
// Key indexes for transaction tracking
{
    bap_id: { type: String, index: true },
    bpp_id: { type: String, index: true },
    transaction_id: { type: String, index: true },
    message_id: { type: String, index: true },
    timestamp: { type: String, index: true }
}
```

## Health Monitoring

Database health is automatically monitored and exposed through Prometheus metrics:

### Available Metrics
```typescript
// Database health metrics
dbHealthStatus: Gauge     // Connection status (1=up, 0=down)
dbLatencyGauge: Gauge    // Operation latency

// Access metrics via Prometheus endpoint
curl http://localhost:4000/metrics | grep db_health
```

### Monitoring Configuration
- Health checks run every 30 seconds
- Automatic reconnection handling
- Logs database state changes
- Metrics exposed for Grafana dashboards

### Environment Variables
```plaintext
# Required Configuration
MONGODB_URI="mongodb://localhost:27017/np-system"  # Connection string
NODE_ENV="production"                              # Environment (development/production)

# Optional Configuration
LOG_LEVEL="info"                                  # Logging verbosity
```

## Troubleshooting

### Common Issues
1. Connection Failures
```bash
# Check MongoDB status
docker-compose ps mongodb

# Verify connectivity
docker-compose exec mongodb mongosh --eval "db.runCommand({ping: 1})"
```

2. Performance Issues
```bash
# Check current operations
docker-compose exec mongodb mongosh --eval "db.currentOp()"

# View database stats
docker-compose exec mongodb mongosh --eval "db.stats()"
```

## Limitations

Current implementation has the following limitations:

1. Single MongoDB instance connection only (no built-in replica set support)
2. Basic connection configuration (no advanced options like poolSize)
3. Fixed health check interval (30 seconds)
4. No built-in backup/restore functionality
5. No direct support for MongoDB Atlas specific features

For specific integration requirements or questions about current limitations, please contact the RSF Utility team.

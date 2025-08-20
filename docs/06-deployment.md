# Deployment & Environment Guide

## Overview

This guide provides comprehensive instructions for deploying the RSF Utility in various environments, from local development to production. The RSF Utility employs a microservice architecture with independent backend and frontend services managed through git submodules.

**Deployment Options:**
- **Local Development**: Docker Compose with MongoDB
- **Production**: Independent service deployment with observability stack
- **Testing**: Multi-instance Docker environments for E2E testing

---
## Prerequisites

### System Requirements
- **Docker**: Version 20.10+ with Docker Compose v3.8+
- **Node.js**: Version 18+ (for local development)
- **Git**: Version 2.20+ (for submodule support)
- **Memory**: 8GB RAM recommended (4GB minimum)
- **Storage**: 20GB available disk space

### Required Software
```bash
# Verify prerequisites
docker --version          # Docker 20.10+
docker-compose --version  # 3.8+
node --version            # v18+
git --version             # 2.20+
```

---

## Submodule Initialization

### Initial Setup
The RSF Utility uses git submodules for backend and frontend services. Initialize them before deployment:

```bash
# Clone the parent repository
git clone https://github.com/ONDC-Official/rsf-utility.git
cd rsf-utility

# Initialize and update all submodules recursively
git submodule update --init --recursive

# Verify submodule status
git submodule status
```

**Expected Output:**
```
 3d6f75b6a68077f4cab93afcb95a1b33d89a8920 rsf-utility-backend (heads/main)
 0bb8e8f3104c32b65e085be2146909c36db6f574 rsf-utility-frontend (heads/main)
```

### Submodule Management
```bash
# Update submodules to latest commits
git submodule update --remote --merge

# Update specific submodule
git submodule update --remote rsf-utility-backend

# Reset submodule to parent repository's pinned commit
git submodule update --init rsf-utility-backend

# Work on submodule development
cd rsf-utility-backend
git checkout main
git pull origin main
cd ..
git add rsf-utility-backend
git commit -m "Update backend submodule to latest"
```

---

## Environment Configuration

### Environment Variables Overview

#### Backend Environment Variables
```bash
# ===========================================
# Core Server Configuration
# ===========================================
NODE_ENV=development                    # Environment mode (development/production/test)
PORT=3000                              # Server port (default: 3000)
MONGODB_URI=mongodb://localhost:27017/rsf-utility  # MongoDB connection string

# ===========================================
# Authentication & Security  
# ===========================================
JWT_SECRET=your-super-secret-jwt-key   # JWT signing key (required)
CLIENT_ID=your-client-id               # API client identifier (required)

# ===========================================
# ONDC Protocol Configuration
# ===========================================
ONDC_ENV=STAGING                       # ONDC environment (STAGING/PREPROD/PROD)

# ONDC Gateway URLs (environment-specific)
GATEWAY_STAGING=https://staging.gateway.proteantech.in/
GATEWAY_PREPROD=https://preprod.gateway.ondc.org/
GATEWAY_PROD=https://prod.gateway.ondc.org/

# ONDC Registry URLs (environment-specific)
REGISTRY_STAGING=https://staging.registry.ondc.org/v2.0/
REGISTRY_PREPROD=https://preprod.registry.ondc.org/v2.0/
REGISTRY_PROD=https://prod.registry.ondc.org/

# ===========================================
# Settlement Agency Configuration
# ===========================================
SETTLEMENT_AGENCY_URL=https://settlement-agency.example.com  # Settlement agency endpoint
SETTLEMENT_AGENCY_ID=your-agency-id                          # Agency identifier
SETTLEMENT_AGENCY_KEY=your-agency-key                        # Authentication key

# ===========================================
# Subscriber Configuration (ONDC)
# ===========================================
SUBSCRIBER_ID=your-subscriber-id               # ONDC subscriber identifier
SUBSCRIBER_UNIQUE_KEY=your-subscriber-key      # Unique subscriber key
SUBSCRIBER_PRIVATE_KEY=your-private-key        # Subscriber private key for signing

# ===========================================
# Observability & Monitoring
# ===========================================
LOG_LEVEL=info                                  # Log level (debug/info/warn/error)
LOKI_HOST=http://localhost:3100                # Grafana Loki host for logging
PROMETHEUS_ENABLED=true                         # Enable Prometheus metrics

# ===========================================
# Rate Limiting & Performance
# ===========================================
RATE_LIMIT=1000                                # API rate limit per minute
REQUEST_TIMEOUT=30000                          # Request timeout in milliseconds
```

#### Frontend Environment Variables
```bash
# ===========================================
# React App Configuration
# ===========================================
REACT_APP_BACKEND_URL=http://localhost:3000    # Backend API base URL
REACT_APP_ENV=development                       # Application environment
REACT_APP_API_TIMEOUT=30000                    # API request timeout

# ===========================================
# Build Configuration
# ===========================================
GENERATE_SOURCEMAP=false                       # Generate source maps in production
BUILD_PATH=build                               # Build output directory
```

### Environment Templates

#### Development Environment (`.env.development`)
```bash
# Backend Development Configuration
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rsf-utility-dev
JWT_SECRET=dev-jwt-secret-key
CLIENT_ID=dev-client-id
ONDC_ENV=STAGING
LOG_LEVEL=debug
LOKI_HOST=http://localhost:3100
RATE_LIMIT=1000

# Settlement Agency (Development)
SETTLEMENT_AGENCY_URL=https://staging-settlement.example.com
SETTLEMENT_AGENCY_ID=dev-agency-id
SETTLEMENT_AGENCY_KEY=dev-agency-key

# ONDC Subscriber (Development)
SUBSCRIBER_ID=dev-subscriber-id
SUBSCRIBER_UNIQUE_KEY=dev-subscriber-key
SUBSCRIBER_PRIVATE_KEY=dev-private-key
```

#### Production Environment (`.env.production`)
```bash
# Backend Production Configuration
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://prod-mongodb:27017/rsf-utility
JWT_SECRET=${JWT_SECRET}  # Injected from CI/CD secrets
CLIENT_ID=${CLIENT_ID}    # Injected from CI/CD secrets
ONDC_ENV=PROD
LOG_LEVEL=info
LOKI_HOST=https://loki.monitoring.example.com
RATE_LIMIT=5000

# Settlement Agency (Production)
SETTLEMENT_AGENCY_URL=${SETTLEMENT_AGENCY_URL}
SETTLEMENT_AGENCY_ID=${SETTLEMENT_AGENCY_ID}
SETTLEMENT_AGENCY_KEY=${SETTLEMENT_AGENCY_KEY}

# ONDC Subscriber (Production)
SUBSCRIBER_ID=${SUBSCRIBER_ID}
SUBSCRIBER_UNIQUE_KEY=${SUBSCRIBER_UNIQUE_KEY}
SUBSCRIBER_PRIVATE_KEY=${SUBSCRIBER_PRIVATE_KEY}
```

#### Testing Environment (`.env.test`)
```bash
# Backend Test Configuration
NODE_ENV=test
PORT=3001
MONGODB_URI=mongodb://localhost:27017/rsf-utility-test
JWT_SECRET=test-jwt-secret
CLIENT_ID=test-client-id
ONDC_ENV=STAGING
LOG_LEVEL=warn
RATE_LIMIT=100

# Minimal test configuration
SETTLEMENT_AGENCY_URL=http://localhost:3002
SETTLEMENT_AGENCY_ID=test-agency
SETTLEMENT_AGENCY_KEY=test-key
```
REGISTRY_PREPROD=https://preprod.registry.ondc.org/v2.0/
REGISTRY_PROD=https://prod.registry.ondc.org/

# Settlement Agency Integration
SETTLEMENT_AGENCY_URL=https://your-settlement-agency.com/api

# Observability (Optional)
LOG_LEVEL=info                         # Logging level
LOKI_HOST=http://localhost:3100        # Grafana Loki host
```

#### Frontend Environment Variables
```bash
# Backend Integration
REACT_APP_BACKEND_URL=http://localhost:3000  # Backend API base URL

# Build Configuration
GENERATE_SOURCEMAP=false               # Production source maps
BUILD_PATH=build                       # Build output directory
PUBLIC_URL=/rsf-sdk-utility           # Public URL prefix
```

### Environment Files Structure
```
/Users/shreyansh/Desktop/workspace/rsf-utility/
├── .env.example                       # Template with all variables
├── .env.local                        # Local development overrides
├── .env.production                   # Production configuration
├── rsf-utility-backend/
│   ├── .env                         # Backend-specific variables
│   └── .env.example                 # Backend template
└── rsf-utility-frontend/
    ├── .env                         # Frontend-specific variables
    └── .env.example                 # Frontend template
```

---

## Local Development Setup

### Quick Start with Docker Compose
The fastest way to run the complete stack locally:

```bash
# Navigate to project root
cd /Users/shreyansh/Desktop/workspace/rsf-utility

# Initialize submodules (if not done)
git submodule update --init --recursive

# Start the complete stack
docker-compose -f deploy/docker-compose.yml up -d

# View logs
docker-compose -f deploy/docker-compose.yml logs -f

# Health check
curl http://localhost:3000/health    # Backend health
curl http://localhost:6500           # Frontend health
```

### Manual Local Development

#### 1. Database Setup
```bash
# Start MongoDB
docker run -d \
  --name rsf-mongodb \
  -p 27017:27017 \
  -v rsf_mongo_data:/data/db \
  mongo:latest

# Verify MongoDB connection
docker exec rsf-mongodb mongosh --eval "db.adminCommand('ping')"
```

#### 2. Backend Setup
```bash
# Navigate to backend
cd rsf-utility-backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Alternative: Start with build
npm run build
npm start
```

#### 3. Frontend Setup
```bash
# Navigate to frontend (new terminal)
cd rsf-utility-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with backend URL

# Start development server
npm start

# Alternative: Production build
npm run build
npx serve -s build -l 3000
```

#### 4. Verification
```bash
# Backend health check
curl -X GET http://localhost:3000/health

# Backend API documentation
open http://localhost:3000/api-docs

# Frontend application
open http://localhost:3000

# MongoDB connection test
curl -X GET http://localhost:3000/ui/health/db
```

---

## Docker Deployment

### Production Docker Compose
Use the provided production-ready Docker Compose configuration:

```bash
# Production deployment
docker-compose -f deploy/docker-compose.yml up -d

# Scale services (if needed)
docker-compose -f deploy/docker-compose.yml up -d --scale rsf-backend=2

# Monitor deployment
docker-compose -f deploy/docker-compose.yml ps
docker-compose -f deploy/docker-compose.yml logs -f
```

### Individual Service Deployment

#### Backend Service
```bash
# Build backend image
cd rsf-utility-backend
docker build -t rsf-utility-backend:latest .

# Run backend container
docker run -d \
  --name rsf-backend \
  -p 3000:3000 \
  --env-file .env \
  --network rsf-network \
  rsf-utility-backend:latest
```

#### Frontend Service
```bash
# Build frontend image
cd rsf-utility-frontend
docker build -t rsf-utility-frontend:latest .

# Run frontend container
docker run -d \
  --name rsf-frontend \
  -p 6500:3000 \
  --network rsf-network \
  rsf-utility-frontend:latest
```

#### MongoDB Service
```bash
# Run MongoDB with persistence
docker run -d \
  --name rsf-mongodb \
  -p 27017:27017 \
  -v rsf_mongo_data:/data/db \
  --network rsf-network \
  mongo:latest
```

### Docker Network Management
```bash
# Create custom network
docker network create rsf-network

# Inspect network
docker network inspect rsf-network

# Connect existing containers
docker network connect rsf-network rsf-backend
docker network connect rsf-network rsf-frontend
docker network connect rsf-network rsf-mongodb
```

---

## Production Deployment

### Infrastructure Requirements

#### Minimum Resource Allocation
```yaml
Backend Service:
  CPU: 1 vCPU
  Memory: 2GB RAM
  Storage: 10GB SSD
  Network: 1Gbps

Frontend Service:
  CPU: 0.5 vCPU
  Memory: 1GB RAM
  Storage: 5GB SSD
  Network: 1Gbps

MongoDB Database:
  CPU: 2 vCPU
  Memory: 4GB RAM
  Storage: 50GB SSD (+ backup storage)
  Network: 1Gbps

Load Balancer:
  CPU: 0.5 vCPU
  Memory: 1GB RAM
  Network: 1Gbps
```

### Production Environment Variables
```bash
# Backend Production Configuration
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongo-primary:27017,mongo-secondary:27017/rsf-utility?replicaSet=rs0
JWT_SECRET=production-super-secret-key-256-bits
CLIENT_ID=production-client-id
ONDC_ENV=PROD
SETTLEMENT_AGENCY_URL=https://production-settlement-agency.com/api
LOG_LEVEL=warn
LOKI_HOST=http://loki:3100

# Frontend Production Configuration
REACT_APP_BACKEND_URL=https://api.your-domain.com
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://rsf.your-domain.com
```

### SSL/TLS Configuration
```nginx
# NGINX configuration for RSF Utility
server {
    listen 443 ssl http2;
    server_name rsf.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/rsf.your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rsf.your-domain.com/privkey.pem;
    
    # Frontend static files
    location / {
        proxy_pass http://rsf-frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://rsf-backend:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend UI routes
    location /ui/ {
        proxy_pass http://rsf-backend:3000/ui/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Deployment Verification
```bash
# Post-deployment health checks
#!/bin/bash

# Backend health
curl -f http://localhost:3000/health || exit 1

# Database connectivity
curl -f http://localhost:3000/ui/health/db || exit 1

# Frontend availability
curl -f http://localhost:6500/ || exit 1

# API documentation
curl -f http://localhost:3000/api-docs || exit 1

# Metrics endpoint
curl -f http://localhost:3000/metrics || exit 1

echo "All health checks passed!"
```

---

## Environment-Specific Configurations

### Development Environment
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  rsf-backend:
    build: ./rsf-utility-backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - LOG_LEVEL=debug
    volumes:
      - ./rsf-utility-backend:/app
      - /app/node_modules
    depends_on:
      - mongodb
  
  rsf-frontend:
    build: ./rsf-utility-frontend
    ports:
      - "6500:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:3000
    volumes:
      - ./rsf-utility-frontend:/app
      - /app/node_modules
  
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_dev_data:/data/db

volumes:
  mongo_dev_data:
```

### Testing Environment
```yaml
# docker-compose.test.yml
version: '3.8'
services:
  rsf-backend-test:
    build: ./rsf-utility-backend
    environment:
      - NODE_ENV=test
      - MONGODB_URI=mongodb://mongodb-test:27017/rsf-utility-test
    depends_on:
      - mongodb-test
  
  mongodb-test:
    image: mongo:latest
    tmpfs:
      - /data/db
    ports:
      - "27018:27017"
```

### Production Environment
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  rsf-backend:
    image: rsf-utility-backend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=warn
    restart: unless-stopped
    depends_on:
      - mongodb
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
  
  rsf-frontend:
    image: rsf-utility-frontend:latest
    ports:
      - "6500:3000"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
  
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_prod_data:/data/db
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  mongo_prod_data:
    external: true
```

---

## Monitoring & Observability (Optional)

### Health Monitoring Setup
```bash
# Prometheus configuration for RSF Utility
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'rsf-backend'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'rsf-mongodb'
    static_configs:
      - targets: ['localhost:9216']

  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']
```

### Logging Configuration
```yaml
# Grafana Loki configuration
# docker-compose.observability.yml
version: '3.8'
services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - loki_data:/loki

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

volumes:
  loki_data:
  grafana_data:
  prometheus_data:
```

### Monitoring Dashboards
```bash
# Import RSF Utility Grafana dashboards
curl -X POST \
  http://admin:admin@localhost:3000/api/dashboards/db \
  -H 'Content-Type: application/json' \
  -d @rsf-utility-dashboard.json
```

---

## Troubleshooting

### Common Issues

#### Submodule Issues
```bash
# Problem: Submodules not initialized
git submodule status
# Shows empty or missing submodules

# Solution:
git submodule update --init --recursive

# Problem: Submodule pointing to wrong commit
git submodule status
# Shows commit mismatch

# Solution:
git submodule update --remote
git add .
git commit -m "Update submodules"
```

#### Docker Issues
```bash
# Problem: Port conflicts
docker-compose up
# Error: Port 3000 already in use

# Solution:
docker-compose down
lsof -ti:3000 | xargs kill -9
docker-compose up

# Problem: MongoDB connection issues
docker logs rsf_utility_container
# Error: MongoNetworkError

# Solution:
docker-compose restart mongodb
docker-compose logs mongodb
```

#### Environment Variable Issues
```bash
# Problem: Missing environment variables
curl http://localhost:3000/health
# Error: JWT_SECRET not defined

# Solution:
cp .env.example .env
# Edit .env with required values
docker-compose restart
```

### Debug Commands
```bash
# Container inspection
docker-compose ps
docker-compose logs -f service-name
docker exec -it container-name /bin/bash

# Network debugging
docker network ls
docker network inspect rsf-utility

# Volume debugging
docker volume ls
docker volume inspect rsf_mongo_data

# Database debugging
docker exec -it mongo_container mongosh
# use rsf-utility
# db.users.find()
```

### Performance Optimization
```bash
# MongoDB optimization
# Add indexes for better performance
docker exec -it mongo_container mongosh rsf-utility
# db.orders.createIndex({ "user_id": 1, "order_id": 1 })
# db.settlements.createIndex({ "user_id": 1, "status": 1 })

# Docker optimization
# Limit container resources
docker-compose up -d --scale rsf-backend=1 --cpus=1 --memory=2g
```

---

## Security Considerations

### Production Security Checklist
```bash
# 1. Environment variables security
# ✅ Use secrets management (Docker Secrets, Kubernetes Secrets)
# ✅ Rotate JWT secrets regularly
# ✅ Use strong database passwords
# ✅ Disable debug logging in production

# 2. Network security
# ✅ Use reverse proxy (NGINX, HAProxy)
# ✅ Enable HTTPS/TLS
# ✅ Implement rate limiting
# ✅ Configure CORS properly

# 3. Database security
# ✅ Enable MongoDB authentication
# ✅ Use encrypted connections
# ✅ Regular security updates
# ✅ Database access auditing

# 4. Container security
# ✅ Use non-root users in containers
# ✅ Scan images for vulnerabilities
# ✅ Keep base images updated
# ✅ Implement resource limits
```

### Security Configuration
```yaml
# Secure Docker Compose configuration
version: '3.8'
services:
  rsf-backend:
    build: ./rsf-utility-backend
    user: "1001:1001"  # Non-root user
    read_only: true
    tmpfs:
      - /tmp
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
```

---

## Backup & Recovery

### Database Backup Strategy
```bash
# Automated MongoDB backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
CONTAINER_NAME="rsf_mongodb"

# Create backup
docker exec $CONTAINER_NAME mongodump \
  --db rsf-utility \
  --out /tmp/backup_$DATE

# Extract backup from container
docker cp $CONTAINER_NAME:/tmp/backup_$DATE $BACKUP_DIR/

# Compress backup
tar -czf $BACKUP_DIR/rsf_backup_$DATE.tar.gz -C $BACKUP_DIR backup_$DATE

# Cleanup
rm -rf $BACKUP_DIR/backup_$DATE
docker exec $CONTAINER_NAME rm -rf /tmp/backup_$DATE

# Retention policy (keep last 30 days)
find $BACKUP_DIR -name "rsf_backup_*.tar.gz" -mtime +30 -delete
```

### Disaster Recovery
```bash
# Database restoration
#!/bin/bash
BACKUP_FILE="rsf_backup_20240101_120000.tar.gz"
CONTAINER_NAME="rsf_mongodb"

# Extract backup
tar -xzf $BACKUP_FILE

# Copy to container
docker cp backup_*/rsf-utility $CONTAINER_NAME:/tmp/restore

# Restore database
docker exec $CONTAINER_NAME mongorestore \
  --db rsf-utility \
  --drop \
  /tmp/restore

# Verify restoration
docker exec $CONTAINER_NAME mongosh \
  --eval "db.users.countDocuments()"
```

---

*This deployment guide provides comprehensive instructions for setting up RSF Utility across all environments. For specific configuration examples and troubleshooting, refer to the individual service documentation in the respective submodules.*
# Installation Guide

This guide provides detailed instructions for setting up the RSF Utility in different environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation Steps](#installation-steps)
- [Configuration](#configuration)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
1. Node.js (v16 or higher)
2. MongoDB (v4.4 or higher)
3. npm or yarn
4. Git
5. Docker (optional)

### System Requirements
- Memory: 4GB RAM (minimum)
- Storage: 20GB available space
- CPU: 2 cores (recommended)

## Environment Setup

1. **Clone the Repository**
```bash
git clone https://github.com/ONDC-Official/rsf-utility.git
cd rsf-utility
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory:
```bash
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rsf-utility

# Settlement Agency Configuration
SETTLEMENT_AGENCY_URL=<settlement-agency-url>
SETTLEMENT_AGENCY_ID=<agency-id>
SETTLEMENT_AGENCY_KEY=<agency-key>

# Subscriber Configuration
SUBSCRIBER_ID=<subscriber-id>
SUBSCRIBER_UNIQUE_KEY=<subscriber-key>
SUBSCRIBER_PRIVATE_KEY=<private-key>

# Authentication
JWT_SECRET=<your-jwt-secret>
CLIENT_ID=<your-client-id>

# ONDC Configuration
ONDC_ENV=STAGING  # STAGING/PREPROD/PROD
```

## Installation Steps

1. **Database Setup**
```bash
# Start MongoDB service
sudo systemctl start mongodb

# Verify MongoDB is running
mongosh
```

2. **Build the Application**
```bash
npm run build
```

3. **Start the Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Configuration

### MongoDB Configuration
The application uses MongoDB for data storage. Configure the connection in `.env`:
```bash
MONGODB_URI=mongodb://username:password@host:port/database
```

### Security Configuration
Configure authentication and security parameters:
```bash
JWT_SECRET=your_secure_jwt_secret
CLIENT_ID=your_client_id
```

### ONDC Environment
Configure the ONDC environment:
```bash
ONDC_ENV=STAGING  # Options: STAGING, PREPROD, PROD
```

## Docker Setup

1. **Build Docker Image**
```bash
docker build -t rsf-utility .
```

2. **Run with Docker**
```bash
docker run -d \
  --name rsf-utility \
  -p 3000:3000 \
  --env-file .env \
  rsf-utility
```

3. **Docker Compose (Optional)**
Create a `docker-compose.yml` file:
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - mongodb
  
  mongodb:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Run with Docker Compose:
```bash
docker-compose up -d
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
- Verify MongoDB is running
- Check connection string in .env
- Ensure network connectivity
- Check MongoDB logs

2. **Build Errors**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

3. **Port Conflicts**
- Check if port 3000 is already in use
- Change port in .env if needed

### Verification Steps

1. **Check Application Status**
```bash
# Check running processes
ps aux | grep node

# Check logs
tail -f logs/development.log
```

2. **Verify API Access**
```bash
curl http://localhost:3000/health
```

3. **Monitor System**
- Access Grafana dashboards for monitoring
- Check application logs for errors
- Monitor MongoDB performance

For additional support, please refer to the [troubleshooting guide](./TROUBLESHOOTING.md) or create an issue in the GitHub repository.

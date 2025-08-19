# RSF Utility Deployment

This directory contains deployment configurations and scripts for the RSF Utility project.

## Quick Start

```bash
# Initialize submodules
git submodule update --init --recursive

# Start the complete stack
docker-compose up -d

# View logs
docker-compose logs -f

# Health checks
curl http://localhost:3000/health    # Backend
curl http://localhost:6500           # Frontend
```

## Files Overview

- **docker-compose.yml**: Main production-ready Docker Compose configuration
- **docker-compose.dev.yml**: Development environment with hot reload
- **docker-compose.test.yml**: Testing environment configuration
- **.env.example**: Template for environment variables
- **nginx.conf**: NGINX reverse proxy configuration
- **scripts/**: Deployment automation scripts

## Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure variables:**
   Edit `.env` with your specific configuration values

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

## Service URLs

- **Frontend**: http://localhost:6500
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs
- **MongoDB**: localhost:27017
- **Metrics**: http://localhost:3000/metrics

## Troubleshooting

### Common Issues

1. **Port conflicts**: Check if ports 3000, 6500, or 27017 are in use
2. **Submodule issues**: Run `git submodule update --init --recursive`
3. **Environment variables**: Ensure `.env` file is properly configured
4. **Database connection**: Check MongoDB container logs

### Debug Commands

```bash
# Check container status
docker-compose ps

# View service logs
docker-compose logs -f [service-name]

# Access container shell
docker-compose exec [service-name] /bin/bash

# Restart specific service
docker-compose restart [service-name]
```

## Documentation

For detailed deployment instructions, see:
- [Deployment Guide](../docs/06-deployment.md)
- [Backend Documentation](../rsf-utility-backend/docs/)
- [Frontend Documentation](../rsf-utility-frontend/README.md)

## Support

For deployment issues:
1. Check the [Troubleshooting](../docs/06-deployment.md#troubleshooting) section
2. Review service logs using `docker-compose logs`
3. Verify environment configuration
4. Consult individual service documentation

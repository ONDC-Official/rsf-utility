# Observability Stack Integration Guide

This guide provides instructions for setting up observability in RSF Utility using Prometheus for metrics and Grafana Loki for logging.

## Table of Contents
- [Environment Configuration](#environment-configuration)
- [Metrics Setup](#metrics-setup)
- [Logging Setup](#logging-setup)
- [Docker Deployment](#docker-deployment)

## Environment Configuration

The following environment variables control observability features:

```plaintext
# Required Environment Variables
NODE_ENV=development                    # Environment mode (development/production)
LOG_LEVEL=info                          # Log level (debug, info, warn, error)
LOKI_HOST=http://localhost:3100         # Grafana Loki host URL
PORT=4000                              # Application port

# Optional Variables
MONGODB_URI=mongodb://localhost:27017/np-system  # For database metrics
```

These variables can be configured through your deployment environment or docker-compose file.

## Metrics Setup

RSF Utility exposes metrics through Prometheus client at the `/metrics` endpoint.

### Available Metrics
```typescript
// System Metrics
systemCpuUsage: Gauge     // CPU usage
systemMemoryUsage: Gauge  // Memory usage
systemDiskUsage: Gauge    // Disk usage
networkConnections: Gauge // Network connections

// Database Metrics
dbHealthStatus: Gauge    // MongoDB connection status
dbLatencyGauge: Gauge   // Database operation latency
```

### Prometheus Configuration
Add the following to your Prometheus configuration to scrape metrics:

```yaml
scrape_configs:
  - job_name: 'rsf-utility'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['rsf-utility:4000']  # Use your configured PORT
```

## Logging Setup

The application uses Winston logger with Grafana Loki integration for centralized logging in production.

### Development Mode
In development, logs are formatted for readability and output to console:
- Colorized output
- Detailed error stacks
- Timestamp and log level information

### Production Mode
In production, logs are:
- Sent to Grafana Loki for centralized storage
- JSON formatted for machine parsing
- Automatically batched and retried on failure

### Log Levels
Configure logging detail with `LOG_LEVEL`:
```plaintext
debug   # Detailed debugging information
info    # Default, general operational logs
warn    # Warning conditions
error   # Error conditions
```

### Audit Logging
The application includes built-in audit logging for API requests:
- Request/response details
- Timestamp and correlation IDs
- User and authentication information

## Docker Deployment

The application can be deployed using Docker Compose with observability stack configuration. Here's an example deployment workflow:

1. Configure Environment Variables:
```bash
# Required variables for observability
NODE_ENV=production
LOG_LEVEL=info
LOKI_HOST=http://loki:3100   # Loki service in Docker network
```

2. Deploy with Docker Compose:
```yaml
version: '3'
services:
  rsf-utility:
    build: .
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=info
      - LOKI_HOST=http://loki:3100
    ports:
      - "4000:4000"
    depends_on:
      - loki

  loki:
    image: grafana/loki
    ports:
      - "3100:3100"

3. Verify Deployment:
```bash
# Check if metrics are accessible
curl http://localhost:4000/metrics

# Verify Loki connection
curl http://localhost:3100/ready
```

4. Monitor Logs in Grafana:
- Add Loki as a data source in Grafana
- Use the following query to view RSF Utility logs:
```
{job="rsf-utility"}
```

## Troubleshooting

### Common Issues

1. Metrics Not Available
```bash
# Check metrics endpoint
curl http://localhost:4000/metrics

# Verify process is running
docker-compose ps rsf-utility
```

2. Logs Not Appearing in Loki
```bash
# Check Loki connection
curl http://loki:3100/ready

# Verify environment variables
docker-compose exec rsf-utility env | grep LOKI
```

For additional support or custom integration needs, please contact the RSF Utility team.

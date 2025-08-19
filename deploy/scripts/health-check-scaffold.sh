#!/bin/bash

# RSF Utility Health Check Script
# This script checks the health of all services in the Docker Compose scaffold

set -e

COMPOSE_FILE="docker-compose-scaffold.yml"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🏥 RSF Utility Health Check"
echo "=========================="
echo

# Function to check if a service is healthy
check_service_health() {
    local service_name=$1
    local health_url=$2
    local expected_status=${3:-200}
    
    echo -n "Checking $service_name... "
    
    if curl -s -o /dev/null -w "%{http_code}" "$health_url" | grep -q "$expected_status"; then
        echo -e "${GREEN}✓ Healthy${NC}"
        return 0
    else
        echo -e "${RED}✗ Unhealthy${NC}"
        return 1
    fi
}

# Function to check if a container is running
check_container_status() {
    local container_name=$1
    
    echo -n "Checking container $container_name... "
    
    if docker-compose -f "$COMPOSE_FILE" ps -q "$container_name" | xargs docker inspect --format='{{.State.Status}}' | grep -q "running"; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not running${NC}"
        return 1
    fi
}

# Change to project directory
cd "$PROJECT_DIR"

echo "📋 Container Status Check"
echo "------------------------"

# Check container status
check_container_status "mongo" || exit 1
check_container_status "backend" || exit 1  
check_container_status "frontend" || exit 1
check_container_status "loki" || exit 1
check_container_status "grafana" || exit 1

echo
echo "🌐 Service Health Check"
echo "----------------------"

# Check service health endpoints
check_service_health "Backend API" "http://localhost:3000/health" 200 || exit 1
check_service_health "Frontend" "http://localhost:6500" 200 || exit 1
check_service_health "Loki" "http://localhost:3100/ready" 200 || exit 1
check_service_health "Grafana" "http://localhost:3001/api/health" 200 || exit 1

echo
echo "💾 Database Connectivity"
echo "-----------------------"

# Check MongoDB connectivity
echo -n "Checking MongoDB connection... "
if docker-compose -f "$COMPOSE_FILE" exec -T mongo mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Connected${NC}"
else
    echo -e "${RED}✗ Connection failed${NC}"
    exit 1
fi

echo
echo "📊 Service URLs"
echo "--------------"
echo "Frontend:     http://localhost:6500"
echo "Backend API:  http://localhost:3000"
echo "API Docs:     http://localhost:3000/api-docs"
echo "Grafana:      http://localhost:3001 (admin/admin)"
echo "Loki API:     http://localhost:3100"
echo "MongoDB:      localhost:27017"

echo
echo -e "${GREEN}🎉 All services are healthy!${NC}"

# Optional: Show resource usage
echo
echo "📈 Resource Usage"
echo "----------------"
docker-compose -f "$COMPOSE_FILE" exec -T backend sh -c 'echo "Backend CPU/Memory:"; ps aux | head -2'
echo
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" $(docker-compose -f "$COMPOSE_FILE" ps -q) | head -6

echo
echo "✅ Health check completed successfully!"

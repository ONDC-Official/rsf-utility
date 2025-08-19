#!/bin/bash

# RSF Utility Scaffold Quick Start Script
# This script helps you get the RSF Utility stack running quickly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="docker-compose-scaffold.yml"

echo -e "${BLUE}🚀 RSF Utility Scaffold Quick Start${NC}"
echo "=================================="
echo

# Change to project directory
cd "$PROJECT_DIR"

# Step 1: Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are available${NC}"

# Step 2: Initialize submodules
echo -e "${YELLOW}📦 Initializing git submodules...${NC}"
if git submodule update --init --recursive; then
    echo -e "${GREEN}✅ Submodules initialized${NC}"
else
    echo -e "${RED}❌ Failed to initialize submodules${NC}"
    exit 1
fi

# Step 3: Setup environment
echo -e "${YELLOW}⚙️  Setting up environment configuration...${NC}"
if [ ! -f .env ]; then
    if [ -f .env.scaffold.example ]; then
        cp .env.scaffold.example .env
        echo -e "${GREEN}✅ Created .env from .env.scaffold.example${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env file with your configuration values${NC}"
        echo -e "   Required variables:"
        echo -e "   - MONGO_ROOT_PASSWORD"
        echo -e "   - JWT_SECRET"
        echo -e "   - CLIENT_ID"
        echo -e "   - GRAFANA_ADMIN_PASSWORD"
        echo
        read -p "Press Enter when you've configured the .env file..."
    else
        echo -e "${RED}❌ .env.scaffold.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Step 4: Check if ports are available
echo -e "${YELLOW}🔍 Checking port availability...${NC}"
PORTS=(3000 6500 27017 3001 3100)
OCCUPIED_PORTS=()

for port in "${PORTS[@]}"; do
    if lsof -i ":$port" &> /dev/null; then
        OCCUPIED_PORTS+=($port)
    fi
done

if [ ${#OCCUPIED_PORTS[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠️  The following ports are occupied: ${OCCUPIED_PORTS[*]}${NC}"
    echo -e "   You may need to stop other services or change port mappings in $COMPOSE_FILE"
    read -p "Continue anyway? (y/N): " continue_choice
    if [[ ! $continue_choice =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Step 5: Build and start services
echo -e "${YELLOW}🏗️  Building and starting services...${NC}"
echo "This may take a few minutes for the first run..."
echo

if docker-compose -f "$COMPOSE_FILE" up -d --build; then
    echo -e "${GREEN}✅ Services started successfully${NC}"
else
    echo -e "${RED}❌ Failed to start services${NC}"
    exit 1
fi

# Step 6: Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 30

# Step 7: Run health check
echo -e "${YELLOW}🏥 Running health check...${NC}"
if ./scripts/health-check-scaffold.sh; then
    echo -e "${GREEN}🎉 All services are healthy!${NC}"
else
    echo -e "${RED}❌ Some services are not healthy. Check logs with:${NC}"
    echo "   docker-compose -f $COMPOSE_FILE logs -f"
    exit 1
fi

# Step 8: Show access information
echo
echo -e "${BLUE}🌐 Service Access Information${NC}"
echo "============================="
echo -e "${GREEN}Frontend Dashboard:${NC}  http://localhost:6500"
echo -e "${GREEN}Backend API:${NC}        http://localhost:3000"
echo -e "${GREEN}API Documentation:${NC}  http://localhost:3000/api-docs"
echo -e "${GREEN}Grafana Dashboard:${NC}  http://localhost:3001 (admin/[your-password])"
echo -e "${GREEN}Health Check:${NC}       curl http://localhost:3000/health"
echo

echo -e "${BLUE}🛠️  Useful Commands${NC}"
echo "=================="
echo -e "${GREEN}View logs:${NC}           docker-compose -f $COMPOSE_FILE logs -f"
echo -e "${GREEN}Stop services:${NC}       docker-compose -f $COMPOSE_FILE down"
echo -e "${GREEN}Restart service:${NC}     docker-compose -f $COMPOSE_FILE restart [service-name]"
echo -e "${GREEN}Health check:${NC}        ./scripts/health-check-scaffold.sh"
echo

echo -e "${GREEN}✨ RSF Utility is now running! Happy coding! ✨${NC}"

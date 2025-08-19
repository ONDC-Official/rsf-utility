#!/bin/bash

# RSF Utility Deployment Script
# This script automates the deployment process for RSF Utility

set -euo pipefail

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DEPLOY_DIR="$PROJECT_ROOT/deploy"
LOG_FILE="$DEPLOY_DIR/deployment.log"
ENVIRONMENT="${ENVIRONMENT:-production}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Function to check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed or not in PATH"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed or not in PATH"
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        error "Git is not installed or not in PATH"
    fi
    
    # Check if running as root (not recommended)
    if [[ $EUID -eq 0 ]]; then
        warning "Running as root is not recommended for security reasons"
    fi
    
    log "Prerequisites check completed"
}

# Function to initialize submodules
init_submodules() {
    log "Initializing git submodules..."
    
    cd "$PROJECT_ROOT"
    
    # Check if .gitmodules exists
    if [[ ! -f .gitmodules ]]; then
        error ".gitmodules not found. This doesn't appear to be the RSF Utility repository."
    fi
    
    # Initialize and update submodules
    git submodule update --init --recursive
    
    # Verify submodules are properly initialized
    if [[ ! -d "rsf-utility-backend" ]] || [[ ! -d "rsf-utility-frontend" ]]; then
        error "Submodules not properly initialized"
    fi
    
    log "Submodules initialized successfully"
}

# Function to setup environment
setup_environment() {
    log "Setting up environment configuration..."
    
    cd "$DEPLOY_DIR"
    
    # Copy environment template if .env doesn't exist
    if [[ ! -f .env ]]; then
        if [[ -f .env.example ]]; then
            cp .env.example .env
            warning "Created .env from template. Please configure it before continuing."
            echo "Edit $DEPLOY_DIR/.env with your configuration and run this script again."
            exit 1
        else
            error ".env.example not found"
        fi
    fi
    
    # Validate required environment variables
    source .env
    
    if [[ -z "${JWT_SECRET:-}" ]]; then
        error "JWT_SECRET is not set in .env file"
    fi
    
    if [[ -z "${CLIENT_ID:-}" ]]; then
        error "CLIENT_ID is not set in .env file"
    fi
    
    log "Environment configuration validated"
}

# Function to build images
build_images() {
    log "Building Docker images..."
    
    cd "$DEPLOY_DIR"
    
    # Build images
    docker-compose build --no-cache
    
    log "Docker images built successfully"
}

# Function to start services
start_services() {
    log "Starting RSF Utility services..."
    
    cd "$DEPLOY_DIR"
    
    # Start services
    docker-compose up -d
    
    # Wait for services to be healthy
    log "Waiting for services to be healthy..."
    sleep 30
    
    # Check service health
    check_service_health
    
    log "Services started successfully"
}

# Function to check service health
check_service_health() {
    log "Checking service health..."
    
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        log "Health check attempt $attempt/$max_attempts"
        
        # Check backend health
        if curl -f http://localhost:3000/health &>/dev/null; then
            log "Backend service is healthy"
            break
        fi
        
        if [[ $attempt -eq $max_attempts ]]; then
            error "Backend service failed to become healthy"
        fi
        
        sleep 10
        ((attempt++))
    done
    
    # Check frontend accessibility
    if curl -f http://localhost:6500 &>/dev/null; then
        log "Frontend service is accessible"
    else
        warning "Frontend service may not be fully ready"
    fi
    
    # Check database connectivity
    if docker-compose exec -T rsf-backend curl -f http://localhost:3000/ui/health/db &>/dev/null; then
        log "Database connectivity verified"
    else
        warning "Database connectivity check failed"
    fi
}

# Function to display deployment summary
show_deployment_summary() {
    log "Deployment completed successfully!"
    
    echo ""
    echo "=== RSF Utility Deployment Summary ==="
    echo "Environment: $ENVIRONMENT"
    echo "Frontend URL: http://localhost:6500"
    echo "Backend API: http://localhost:3000"
    echo "API Documentation: http://localhost:3000/api-docs"
    echo "MongoDB: localhost:27017"
    echo "Metrics: http://localhost:3000/metrics"
    echo ""
    echo "Logs: docker-compose -f $DEPLOY_DIR/docker-compose.yml logs -f"
    echo "Stop: docker-compose -f $DEPLOY_DIR/docker-compose.yml down"
    echo ""
    
    # Show running containers
    echo "Running containers:"
    docker-compose -f "$DEPLOY_DIR/docker-compose.yml" ps
}

# Function to cleanup on failure
cleanup_on_failure() {
    log "Deployment failed. Cleaning up..."
    
    cd "$DEPLOY_DIR"
    docker-compose down --remove-orphans
    
    error "Deployment failed. Check logs for details."
}

# Main deployment function
main() {
    log "Starting RSF Utility deployment..."
    
    # Set trap for cleanup on failure
    trap cleanup_on_failure ERR
    
    check_prerequisites
    init_submodules
    setup_environment
    build_images
    start_services
    show_deployment_summary
    
    log "RSF Utility deployment completed successfully!"
}

# Script usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -e, --environment ENVIRONMENT  Set deployment environment (default: production)"
    echo "  -h, --help                     Show this help message"
    echo ""
    echo "Environment variables:"
    echo "  ENVIRONMENT  Deployment environment (production, development, staging)"
    echo ""
    echo "Examples:"
    echo "  $0                           # Deploy in production mode"
    echo "  $0 -e development           # Deploy in development mode"
    echo "  ENVIRONMENT=staging $0      # Deploy in staging mode"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Run main function
main "$@"

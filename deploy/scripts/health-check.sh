#!/bin/bash

# RSF Utility Health Check Script
# Performs comprehensive health checks on all services

set -euo pipefail

# Configuration
BACKEND_URL="${BACKEND_URL:-http://localhost:3000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:6500}"
MONGODB_HOST="${MONGODB_HOST:-localhost:27017}"
TIMEOUT="${TIMEOUT:-30}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if a service is responsive
check_http_endpoint() {
    local url="$1"
    local name="$2"
    local expected_status="${3:-200}"
    
    log "Checking $name at $url..."
    
    if curl -f -s -m "$TIMEOUT" -o /dev/null -w "%{http_code}" "$url" | grep -q "$expected_status"; then
        log "✅ $name is healthy"
        return 0
    else
        error "❌ $name health check failed"
        return 1
    fi
}

# Function to check backend health
check_backend() {
    log "=== Backend Health Check ==="
    
    local backend_healthy=true
    
    # Basic health endpoint
    if ! check_http_endpoint "$BACKEND_URL/health" "Backend Health"; then
        backend_healthy=false
    fi
    
    # Database connectivity
    if ! check_http_endpoint "$BACKEND_URL/ui/health/db" "Database Connectivity"; then
        backend_healthy=false
    fi
    
    # Metrics endpoint
    if ! check_http_endpoint "$BACKEND_URL/metrics" "Metrics Endpoint"; then
        warning "Metrics endpoint not accessible (may be restricted)"
    fi
    
    # API documentation
    if ! check_http_endpoint "$BACKEND_URL/api-docs" "API Documentation"; then
        warning "API documentation not accessible"
    fi
    
    if [[ "$backend_healthy" == true ]]; then
        log "✅ Backend service is fully healthy"
    else
        error "❌ Backend service has issues"
        return 1
    fi
}

# Function to check frontend health
check_frontend() {
    log "=== Frontend Health Check ==="
    
    if check_http_endpoint "$FRONTEND_URL" "Frontend Application"; then
        log "✅ Frontend service is healthy"
    else
        error "❌ Frontend service is not accessible"
        return 1
    fi
}

# Function to check MongoDB
check_mongodb() {
    log "=== MongoDB Health Check ==="
    
    # Check if MongoDB port is accessible
    if command -v nc &> /dev/null; then
        if nc -z "${MONGODB_HOST%:*}" "${MONGODB_HOST#*:}" 2>/dev/null; then
            log "✅ MongoDB port is accessible"
        else
            error "❌ MongoDB port is not accessible"
            return 1
        fi
    else
        warning "netcat not available, skipping port check"
    fi
    
    # Check via backend health endpoint (already done in backend check)
    log "✅ MongoDB connectivity verified via backend"
}

# Function to check Docker containers
check_containers() {
    log "=== Container Health Check ==="
    
    if ! command -v docker &> /dev/null; then
        warning "Docker not available, skipping container checks"
        return 0
    fi
    
    local containers=(
        "rsf_backend"
        "rsf_frontend" 
        "rsf_mongodb"
    )
    
    local all_healthy=true
    
    for container in "${containers[@]}"; do
        if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container.*Up"; then
            log "✅ Container $container is running"
        else
            error "❌ Container $container is not running"
            all_healthy=false
        fi
    done
    
    if [[ "$all_healthy" == true ]]; then
        log "✅ All containers are running"
    else
        error "❌ Some containers are not running"
        return 1
    fi
}

# Function to check system resources
check_resources() {
    log "=== System Resources Check ==="
    
    # Check disk space
    local disk_usage
    disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [[ "$disk_usage" -lt 90 ]]; then
        log "✅ Disk usage: ${disk_usage}% (healthy)"
    else
        warning "⚠️  Disk usage: ${disk_usage}% (high)"
    fi
    
    # Check memory usage (if available)
    if command -v free &> /dev/null; then
        local mem_usage
        mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
        
        if [[ "$mem_usage" -lt 90 ]]; then
            log "✅ Memory usage: ${mem_usage}% (healthy)"
        else
            warning "⚠️  Memory usage: ${mem_usage}% (high)"
        fi
    else
        log "Memory usage check not available on this system"
    fi
}

# Function to perform API functionality test
check_api_functionality() {
    log "=== API Functionality Test ==="
    
    # Test authentication endpoint
    if curl -f -s -m "$TIMEOUT" -X POST \
        -H "Content-Type: application/json" \
        -d '{"clientId": "test-client"}' \
        "$BACKEND_URL/ui/auth/sign-token" > /dev/null; then
        log "✅ Authentication endpoint is functional"
    else
        warning "⚠️  Authentication endpoint test failed"
    fi
    
    # Test health endpoint with detailed response
    local health_response
    health_response=$(curl -f -s -m "$TIMEOUT" "$BACKEND_URL/health" 2>/dev/null || echo "failed")
    
    if [[ "$health_response" != "failed" ]]; then
        log "✅ Health endpoint returned: $health_response"
    else
        error "❌ Health endpoint request failed"
        return 1
    fi
}

# Function to display overall status
show_status_summary() {
    log "=== Health Check Summary ==="
    
    echo ""
    echo "Service Status:"
    echo "  Frontend: $FRONTEND_URL"
    echo "  Backend:  $BACKEND_URL" 
    echo "  MongoDB:  $MONGODB_HOST"
    echo ""
    
    if command -v docker &> /dev/null; then
        echo "Container Status:"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(rsf_|NAMES)"
        echo ""
    fi
    
    echo "For detailed logs:"
    echo "  Backend:  docker logs rsf_backend"
    echo "  Frontend: docker logs rsf_frontend"
    echo "  MongoDB:  docker logs rsf_mongodb"
}

# Main health check function
main() {
    log "Starting RSF Utility health check..."
    
    local overall_healthy=true
    
    # Run all health checks
    if ! check_backend; then
        overall_healthy=false
    fi
    
    if ! check_frontend; then
        overall_healthy=false
    fi
    
    if ! check_mongodb; then
        overall_healthy=false
    fi
    
    if ! check_containers; then
        overall_healthy=false
    fi
    
    check_resources
    
    if ! check_api_functionality; then
        overall_healthy=false
    fi
    
    show_status_summary
    
    if [[ "$overall_healthy" == true ]]; then
        log "✅ Overall health check passed - all services are healthy!"
        exit 0
    else
        error "❌ Overall health check failed - some services have issues!"
        exit 1
    fi
}

# Script usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -b, --backend URL      Backend URL (default: http://localhost:3000)"
    echo "  -f, --frontend URL     Frontend URL (default: http://localhost:6500)"
    echo "  -m, --mongodb HOST     MongoDB host (default: localhost:27017)"
    echo "  -t, --timeout SECONDS  Request timeout (default: 30)"
    echo "  -h, --help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Check with default URLs"
    echo "  $0 -b http://api.example.com         # Check custom backend"
    echo "  $0 -t 60                             # Use 60-second timeout"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -b|--backend)
            BACKEND_URL="$2"
            shift 2
            ;;
        -f|--frontend)
            FRONTEND_URL="$2"
            shift 2
            ;;
        -m|--mongodb)
            MONGODB_HOST="$2"
            shift 2
            ;;
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Run main function
main "$@"

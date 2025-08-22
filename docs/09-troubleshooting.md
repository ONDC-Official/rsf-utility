# Troubleshooting & Diagnostics Guide

*Comprehensive troubleshooting procedures, common failure scenarios, and diagnostic tools for RSF Utility*

---

## Table of Contents

1. [Quick Diagnostics](#quick-diagnostics)
2. [Common Backend Issues](#common-backend-issues)
3. [Frontend Issues](#frontend-issues)
4. [Database Problems](#database-problems)
5. [Authentication Failures](#authentication-failures)
6. [File Upload & Validation Issues](#file-upload--validation-issues)
7. [Network & API Communication](#network--api-communication)
8. [Docker & Deployment Issues](#docker--deployment-issues)
9. [Performance & Monitoring](#performance--monitoring)
10. [Emergency Procedures](#emergency-procedures)

---

## Quick Diagnostics

### Health Check Commands

```bash
# Backend health check
curl -s http://localhost:3000/health | jq

# Expected response:
{
  "success": true,
  "data": {
    "status": "ok",
    "uptime": 123.45,
    "timestamp": "2024-01-15T10:30:45.123Z",
    "environment": "development",
    "cpu": 15.2,
    "memory": {...},
    "db": {
      "healthy": true,
      "latencyMs": 5.2
    }
  },
  "message": "OK"
}

# Frontend connectivity check
curl -s http://localhost:3000/ | head -10

# Docker container status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check logs quickly
docker-compose logs --tail=50 rsf-utility
```

### Log Location Strategy

```bash
# Backend logs (development)
tail -f rsf-utility-backend/logs/development-$(date +%Y-%m-%d).log

# Backend logs (production/Docker)
docker-compose logs -f rsf-utility

# Frontend logs (browser)
# Open browser DevTools → Console tab

# Database logs
docker-compose logs -f mongodb

# System resource check
htop
df -h
free -m
```

### Immediate Status Verification

```bash
#!/bin/bash
# Quick health check script

echo "=== RSF Utility Health Check ==="

# Check if services are running
echo "1. Service Status:"
curl -s http://localhost:3000/health > /dev/null && echo "✅ Backend: UP" || echo "❌ Backend: DOWN"
curl -s http://localhost:3000/ > /dev/null && echo "✅ Frontend: UP" || echo "❌ Frontend: DOWN"

# Check database connectivity
echo -e "\n2. Database Status:"
docker-compose exec mongodb mongosh --eval "db.runCommand({ping: 1})" --quiet > /dev/null 2>&1 && echo "✅ MongoDB: UP" || echo "❌ MongoDB: DOWN"

# Check disk space
echo -e "\n3. Disk Space:"
df -h | grep -E '(Filesystem|/$)'

# Check memory usage
echo -e "\n4. Memory Usage:"
free -h | head -2

echo -e "\n=== End Health Check ==="
```

---

## Common Backend Issues

### 1. Server Startup Failures

#### Environment Variable Issues

**Symptoms:**
- Server fails to start with environment validation errors
- Error: "Failed to parse environment variables"

**Diagnostics:**
```bash
# Check environment variables
node -e "console.log(require('./src/utils/validate-env').validateEnv(process.env))"

# Verify required variables exist
grep -E "(JWT_SECRET|CLIENT_ID|MONGODB_URI)" .env

# Test environment loading
node -e "require('dotenv').config(); console.log(process.env.NODE_ENV)"
```

**Solutions:**
```bash
# 1. Create missing .env file
cp .env.example .env

# 2. Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 3. Validate all required environment variables
cat > check-env.js << 'EOF'
require('dotenv').config();
const required = ['JWT_SECRET', 'CLIENT_ID', 'MONGODB_URI'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error('Missing required environment variables:', missing);
  process.exit(1);
} else {
  console.log('✅ All required environment variables present');
}
EOF
node check-env.js
```

#### Port Binding Issues

**Symptoms:**
- Error: "EADDRINUSE: address already in use :::3000"

**Diagnostics:**
```bash
# Check what's using port 3000
lsof -i :3000
netstat -tulpn | grep :3000

# Check all Node.js processes
ps aux | grep node
```

**Solutions:**
```bash
# 1. Kill existing process
kill -9 $(lsof -ti:3000)

# 2. Use different port
export PORT=3001
npm start

# 3. Find and stop conflicting services
sudo systemctl stop nginx  # if using nginx
docker stop $(docker ps -q)  # stop all docker containers
```

### 2. Database Connection Failures

**Symptoms:**
- MongoDB connection timeout
- Error: "MongooseServerSelectionError"

**Diagnostics:**
```bash
# Test MongoDB connectivity directly
mongosh "mongodb://localhost:27017/rsf-utility" --eval "db.runCommand({ping: 1})"

# Check MongoDB service status
systemctl status mongod
docker-compose ps mongodb

# Verify MongoDB logs
docker-compose logs mongodb | tail -20

# Test connection from application context
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rsf-utility')
  .then(() => console.log('✅ Connected'))
  .catch(err => console.error('❌ Failed:', err.message));
"
```

**Solutions:**
```bash
# 1. Start MongoDB service
sudo systemctl start mongod
# OR with Docker
docker-compose up -d mongodb

# 2. Reset MongoDB data (CAUTION: deletes all data)
docker-compose down -v
docker-compose up -d mongodb

# 3. Check and fix MongoDB configuration
docker-compose exec mongodb mongosh --eval "
  try {
    db.runCommand({connectionStatus: 1});
    print('✅ MongoDB is accessible');
  } catch(e) {
    print('❌ MongoDB error:', e.message);
  }
"

# 4. Verify network connectivity (Docker)
docker network ls
docker-compose exec rsf-utility ping mongodb
```

### 3. API Route Issues

**Symptoms:**
- 404 errors for existing endpoints
- Routes not mounting correctly

**Diagnostics:**
```bash
# Test specific API endpoints
curl -v http://localhost:3000/health
curl -v http://localhost:3000/api-docs.json

# Check route registration in logs
grep -i "route" rsf-utility-backend/logs/development-*.log

# Test authentication endpoints
curl -X POST http://localhost:3000/ui/auth/sign-token \
  -H "Content-Type: application/json" \
  -d '{"client_id": "test-client", "expires": "1d"}'
```

**Solutions:**
```javascript
// Debug route registration
// Add to src/server.ts temporarily
app._router.stack.forEach(layer => {
  if (layer.route) {
    console.log(`Route: ${layer.route.methods} ${layer.route.path}`);
  } else if (layer.name === 'router') {
    layer.handle.stack.forEach(subLayer => {
      if (subLayer.route) {
        console.log(`Sub-route: ${subLayer.route.methods} ${subLayer.route.path}`);
      }
    });
  }
});
```

### 4. Memory & Performance Issues

**Symptoms:**
- High memory usage
- Slow response times
- Server crashes with OOM errors

**Diagnostics:**
```bash
# Monitor memory usage
node --expose-gc -e "
setInterval(() => {
  const used = process.memoryUsage();
  console.log(JSON.stringify({
    rss: Math.round(used.rss / 1024 / 1024) + 'MB',
    heapTotal: Math.round(used.heapTotal / 1024 / 1024) + 'MB',
    heapUsed: Math.round(used.heapUsed / 1024 / 1024) + 'MB',
    external: Math.round(used.external / 1024 / 1024) + 'MB'
  }, null, 2));
}, 5000);
"

# Check for memory leaks
npm install -g clinic
clinic doctor -- node dist/index.js

# Monitor with htop
htop -p $(pgrep -f "node.*rsf-utility")
```

**Solutions:**
```bash
# 1. Increase Node.js memory limit
node --max-old-space-size=4096 dist/index.js

# 2. Enable garbage collection logs
node --trace-gc dist/index.js

# 3. Profile with clinic.js
clinic doctor --on-port='curl http://localhost:3000/health' -- node dist/index.js
clinic flame -- node dist/index.js
```

### 5. Dependency & Build Issues

**Symptoms:**
- Module not found errors
- TypeScript compilation failures
- npm install issues

**Diagnostics:**
```bash
# Check Node.js and npm versions
node --version
npm --version

# Verify package.json integrity
npm ls
npm audit

# Check TypeScript compilation
npx tsc --noEmit

# Verify build output
ls -la dist/
```

**Solutions:**
```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# 2. Fix TypeScript errors
npx tsc --noEmit --listFiles

# 3. Update dependencies
npm outdated
npm update

# 4. Fix peer dependencies
npm install --legacy-peer-deps
```

---

## Frontend Issues

### 1. React Application Startup Failures

**Symptoms:**
- White screen on load
- JavaScript errors in console
- Build failures

**Diagnostics:**
```bash
# Check browser console
# Open DevTools → Console

# Check network requests
# Open DevTools → Network → Reload page

# Verify build output
ls -la build/
npm run build 2>&1 | tee build.log

# Check environment variables
echo $REACT_APP_BACKEND_URL
echo $REACT_APP_CLIENT_ID
```

**Solutions:**
```bash
# 1. Clear React build cache
rm -rf build/ node_modules/.cache/
npm start

# 2. Fix environment variables
cat > .env.local << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_CLIENT_ID=your-client-id
EOF

# 3. Debug React errors
npm install --save-dev @types/react @types/react-dom
npm start -- --verbose
```

### 2. API Connection Issues

**Symptoms:**
- Network errors in browser console
- API calls failing with CORS errors
- Authentication token errors

**Diagnostics:**
```javascript
// Browser console debugging
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Check stored auth token
console.log('Auth token:', localStorage.getItem('authToken'));

// Test API with manual token
fetch('http://localhost:3000/ui/users', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    'Content-Type': 'application/json'
  }
}).then(r => r.json()).then(console.log);
```

**Solutions:**

1. **CORS Issues:**
```javascript
// Add to backend server.ts if needed
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

2. **Authentication Issues:**
```bash
# Generate new token manually
curl -X POST http://localhost:3000/ui/auth/sign-token \
  -H "Content-Type: application/json" \
  -d '{"client_id": "your-client-id", "expires": "1d"}' | jq '.data.token'

# Set token in browser
# In browser console:
localStorage.setItem('authToken', 'your-token-here');
```

3. **Network Configuration:**
```javascript
// Check axios configuration in src/services/axiosInstance.ts
console.log('Base URL:', process.env.REACT_APP_BACKEND_URL);

// Test without token
fetch(`${process.env.REACT_APP_BACKEND_URL}/health`)
  .then(r => r.json())
  .then(console.log);
```

### 3. React Query Cache Issues

**Symptoms:**
- Stale data display
- Infinite loading states
- Query errors not clearing

**Diagnostics:**
```javascript
// Access React Query devtools in browser
// Install React Query DevTools if not already installed

// Clear all queries
import { useQueryClient } from 'react-query';
const queryClient = useQueryClient();
queryClient.clear();

// Check specific query status
queryClient.getQueryState(['users']);
queryClient.getQueryData(['users']);
```

**Solutions:**
```javascript
// 1. Force refetch data
queryClient.invalidateQueries(['users']);
queryClient.refetchQueries(['users']);

// 2. Reset specific query
queryClient.resetQueries(['users']);

// 3. Set proper error boundaries
// Add error boundary component around problematic areas
```

### 4. Material-UI Component Issues

**Symptoms:**
- Styling inconsistencies
- Theme not applying
- Component render errors

**Diagnostics:**
```javascript
// Check theme in browser console
import { useTheme } from '@mui/material/styles';
const theme = useTheme();
console.log(theme);

// Verify Material-UI setup
import { createTheme } from '@mui/material/styles';
console.log('Theme created:', createTheme());
```

**Solutions:**
```bash
# 1. Reinstall Material-UI
npm uninstall @mui/material @emotion/react @emotion/styled
npm install @mui/material @emotion/react @emotion/styled

# 2. Clear Material-UI cache
rm -rf node_modules/.cache/
npm start

# 3. Check for version conflicts
npm ls @mui/material
npm ls @emotion/react
```

---

## Database Problems

### 1. MongoDB Connection Issues

**Symptoms:**
- Connection timeouts
- Authentication failures
- Network unreachable errors

**Diagnostics:**
```bash
# Test MongoDB connectivity
mongosh --host localhost --port 27017 --eval "db.runCommand({ping: 1})"

# Check MongoDB logs
docker-compose logs mongodb | grep -E "(error|Error|ERROR)"

# Verify MongoDB process
ps aux | grep mongod
netstat -tlnp | grep :27017

# Test connection with different tools
telnet localhost 27017
nc -zv localhost 27017
```

**Solutions:**
```bash
# 1. Restart MongoDB
docker-compose restart mongodb
# OR
sudo systemctl restart mongod

# 2. Reset MongoDB data (CAUTION)
docker-compose down -v
docker volume prune -f
docker-compose up -d mongodb

# 3. Check MongoDB configuration
docker-compose exec mongodb cat /etc/mongod.conf

# 4. Verify MongoDB startup
docker-compose logs mongodb | tail -50
```

### 2. Data Corruption Issues

**Symptoms:**
- Unexpected query results
- Schema validation errors
- Index corruption

**Diagnostics:**
```bash
# Check database integrity
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.runCommand({validate: 'users'});
  db.runCommand({validate: 'orders'});
  db.runCommand({validate: 'settlements'});
"

# Check indexes
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.users.getIndexes();
  db.orders.getIndexes();
  db.settlements.getIndexes();
"

# Verify data consistency
docker-compose exec mongodb mongosh rsf-utility --eval "
  printjson(db.stats());
  print('User count:', db.users.countDocuments());
  print('Order count:', db.orders.countDocuments());
  print('Settlement count:', db.settlements.countDocuments());
"
```

**Solutions:**
```bash
# 1. Repair database
docker-compose exec mongodb mongosh rsf-utility --eval "db.repairDatabase()"

# 2. Rebuild indexes
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.users.dropIndexes();
  db.users.createIndex({title: 1}, {unique: true});
  db.orders.dropIndexes();
  db.orders.createIndex({order_id: 1, user_id: 1});
"

# 3. Backup and restore (if needed)
docker-compose exec mongodb mongodump --db rsf-utility --out /backup/
docker-compose exec mongodb mongorestore --db rsf-utility /backup/rsf-utility/
```

### 3. Performance Issues

**Symptoms:**
- Slow query responses
- High CPU usage
- Memory exhaustion

**Diagnostics:**
```bash
# Monitor MongoDB performance
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.enableFreeMonitoring();
  db.runCommand({serverStatus: 1});
"

# Check slow queries
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.setProfilingLevel(2);
  sleep(30000);
  db.system.profile.find().sort({ts: -1}).limit(10);
"

# Monitor real-time operations
docker-compose exec mongodb mongosh rsf-utility --eval "db.currentOp()"
```

**Solutions:**
```bash
# 1. Add missing indexes
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.orders.createIndex({user_id: 1, settle_status: 1});
  db.settlements.createIndex({user_id: 1, status: 1});
  db.orders.createIndex({due_date: 1});
"

# 2. Optimize queries
# Review slow query logs and add explain() to problematic queries

# 3. Increase MongoDB memory
# Add to docker-compose.yml:
# mongodb:
#   image: mongo:latest
#   command: mongod --wiredTigerCacheSizeGB 2
```

---

## Authentication Failures

### 1. JWT Token Issues

**Symptoms:**
- 401 Unauthorized errors
- Token expired messages
- Invalid token format

**Diagnostics:**
```bash
# Test token generation
curl -X POST http://localhost:3000/ui/auth/sign-token \
  -H "Content-Type: application/json" \
  -d '{"client_id": "test-client", "expires": "1d"}' \
  -v

# Decode JWT token (without verification)
node -e "
const token = 'your-jwt-token-here';
const [header, payload] = token.split('.').slice(0, 2);
console.log('Header:', JSON.parse(Buffer.from(header, 'base64')));
console.log('Payload:', JSON.parse(Buffer.from(payload, 'base64')));
"

# Verify JWT secret
node -e "
const jwt = require('jsonwebtoken');
const token = 'your-token';
const secret = process.env.JWT_SECRET;
try {
  const decoded = jwt.verify(token, secret);
  console.log('✅ Token valid:', decoded);
} catch (err) {
  console.log('❌ Token invalid:', err.message);
}
"
```

**Solutions:**
```bash
# 1. Check JWT secret configuration
grep JWT_SECRET .env
node -e "console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length)"

# 2. Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 3. Test with correct client ID
grep CLIENT_ID .env
curl -X POST http://localhost:3000/ui/auth/sign-token \
  -H "Content-Type: application/json" \
  -d "{\"client_id\": \"$(grep CLIENT_ID .env | cut -d= -f2)\", \"expires\": \"1d\"}"

# 4. Clear existing tokens and regenerate
# In browser console:
localStorage.removeItem('authToken');
# Then request new token through UI
```

### 2. Client ID Mismatches

**Symptoms:**
- "Invalid client credentials" errors
- Authentication works in one environment but not another

**Diagnostics:**
```bash
# Check backend CLIENT_ID
grep CLIENT_ID rsf-utility-backend/.env

# Check frontend CLIENT_ID
grep REACT_APP_CLIENT_ID rsf-utility-frontend/.env.local
grep REACT_APP_CLIENT_ID rsf-utility-frontend/.env

# Test with correct client ID
curl -X POST http://localhost:3000/ui/auth/sign-token \
  -H "Content-Type: application/json" \
  -d '{"client_id": "correct-client-id", "expires": "1d"}'
```

**Solutions:**
```bash
# 1. Synchronize client IDs
BACKEND_CLIENT_ID=$(grep CLIENT_ID rsf-utility-backend/.env | cut -d= -f2)
echo "REACT_APP_CLIENT_ID=${BACKEND_CLIENT_ID}" >> rsf-utility-frontend/.env.local

# 2. Use environment-specific client IDs
cat >> rsf-utility-backend/.env << 'EOF'
CLIENT_ID=development-client-id
EOF

cat >> rsf-utility-frontend/.env.local << 'EOF'
REACT_APP_CLIENT_ID=development-client-id
EOF

# 3. Test authentication flow
./test-auth.sh
```

### 3. Token Expiration Issues

**Symptoms:**
- Frequent re-authentication required
- Token refresh failures

**Diagnostics:**
```bash
# Check token expiration
node -e "
const token = 'your-jwt-token';
const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
const exp = new Date(payload.exp * 1000);
const now = new Date();
console.log('Token expires:', exp);
console.log('Current time:', now);
console.log('Expired:', now > exp);
console.log('Minutes remaining:', Math.round((exp - now) / 60000));
"
```

**Solutions:**
```bash
# 1. Increase token expiration time
curl -X POST http://localhost:3000/ui/auth/sign-token \
  -H "Content-Type: application/json" \
  -d '{"client_id": "your-client", "expires": "7d"}'

# 2. Implement automatic token refresh in frontend
# Check src/services/axiosInstance.ts for refresh logic

# 3. Set appropriate expiration for environment
# Development: longer expiration (7d)
# Production: shorter expiration (1h) with refresh
```

---

## File Upload & Validation Issues

### 1. CSV Upload Failures

**Symptoms:**
- "Only CSV file uploads are allowed"
- File parsing errors
- Validation failures

**Diagnostics:**
```bash
# Test CSV file format
file your-file.csv
head -5 your-file.csv

# Check CSV structure
csvlint your-file.csv  # if csvlint is installed
# OR
python3 -c "
import csv
with open('your-file.csv', 'r') as f:
    reader = csv.reader(f)
    headers = next(reader)
    print('Headers:', headers)
    for i, row in enumerate(reader):
        if i < 5:  # First 5 rows
            print(f'Row {i+1}:', row)
        if len(row) != len(headers):
            print(f'Row {i+1} has {len(row)} columns, expected {len(headers)}')
"

# Test file upload manually
curl -X PATCH http://localhost:3000/ui/settle/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "csvFile=@your-file.csv" \
  -v
```

**Solutions:**
```bash
# 1. Fix CSV format
# Ensure proper headers
echo "order_id,total_order_value,withholding_amount,tds,tcs,commission,collector_settlement" > fixed.csv
tail -n +2 your-file.csv >> fixed.csv

# 2. Validate CSV content
# Check for required fields
head -1 your-file.csv | tr ',' '\n' | nl

# 3. Test with minimal CSV
cat > test.csv << 'EOF'
order_id,total_order_value,withholding_amount,tds,tcs,commission,collector_settlement
ORDER123,1000.00,100.00,20.00,15.00,50.00,815.00
EOF

curl -X PATCH http://localhost:3000/ui/settle/YOUR_USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "csvFile=@test.csv"
```

### 2. JSON Schema Validation Errors

**Symptoms:**
- "Schema validation failed" errors
- ONDC protocol compliance issues
- Invalid payload structure

**Diagnostics:**
```bash
# Test JSON payload validation
curl -X POST http://localhost:3000/api/on_confirm \
  -H "Content-Type: application/json" \
  -d @test-payload.json \
  -v

# Validate JSON structure
jq . test-payload.json

# Check specific schema requirements
node -e "
const payload = require('./test-payload.json');
console.log('Has context:', !!payload.context);
console.log('Has action:', !!payload.context?.action);
console.log('Action value:', payload.context?.action);
console.log('Has message:', !!payload.message);
"
```

**Solutions:**
```bash
# 1. Use valid ONDC schema template
cat > valid-on-confirm.json << 'EOF'
{
  "context": {
    "domain": "ONDC:RET14",
    "action": "on_confirm",
    "version": "2.0.0",
    "bap_id": "test-bap",
    "bap_uri": "https://test.com",
    "bpp_id": "test-bpp", 
    "bpp_uri": "https://test.com",
    "transaction_id": "test-txn-id",
    "message_id": "test-msg-id",
    "timestamp": "2024-01-15T10:30:45.123Z",
    "ttl": "PT30S"
  },
  "message": {
    "order": {
      "id": "test-order-id",
      "state": "Accepted"
    }
  }
}
EOF

# 2. Test payload validation
curl -X POST http://localhost:3000/api/on_confirm \
  -H "Content-Type: application/json" \
  -d @valid-on-confirm.json

# 3. Check validation service
node -e "
const { validateSchemaForAction } = require('./dist/services/schema-service');
const payload = require('./valid-on-confirm.json');
const result = validateSchemaForAction(payload, 'on_confirm', {});
console.log('Valid:', result.valid);
if (!result.valid) console.log('Errors:', result.schemaErrors);
"
```

### 3. File Size & Type Restrictions

**Symptoms:**
- "File too large" errors
- Unsupported file type messages

**Diagnostics:**
```bash
# Check file size
ls -lh your-file.csv
stat --format="%s bytes" your-file.csv

# Check file MIME type
file --mime-type your-file.csv
```

**Solutions:**
```bash
# 1. Compress large CSV files
# Remove unnecessary whitespace
sed 's/[[:space:]]*,[[:space:]]*/,/g' large-file.csv > compressed.csv

# Split large files
split -l 1000 large-file.csv split-file-
# Add headers to each split
head -1 large-file.csv > header.csv
for file in split-file-*; do
  cat header.csv "$file" > "processed-$file.csv"
done

# 2. Convert file format if needed
# Convert Excel to CSV
python3 -c "
import pandas as pd
df = pd.read_excel('your-file.xlsx')
df.to_csv('converted.csv', index=False)
"

# 3. Check multer configuration limits
grep -A 10 "limits:" rsf-utility-backend/src/middlewares/csv-upload.ts
```

---

## Network & API Communication

### 1. Connection Timeouts

**Symptoms:**
- Request timeout errors
- "ECONNABORTED" errors
- Network unreachable messages

**Diagnostics:**
```bash
# Test basic connectivity
ping localhost
telnet localhost 3000

# Check network latency
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/health

# curl-format.txt content:
cat > curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF

# Test with increased timeout
curl --max-time 30 http://localhost:3000/health
```

**Solutions:**
```bash
# 1. Increase axios timeout in frontend
# Edit src/services/axiosInstance.ts
const instance = axios.create({ 
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000  // 30 seconds
});

# 2. Check firewall/proxy settings
sudo ufw status
sudo iptables -L
env | grep -i proxy

# 3. Test direct backend connection
curl -v http://localhost:3000/health
wget -O- http://localhost:3000/health
```

### 2. CORS (Cross-Origin) Issues

**Symptoms:**
- "CORS policy" errors in browser console
- Preflight request failures
- Origin not allowed errors

**Diagnostics:**
```bash
# Test CORS headers
curl -H "Origin: http://localhost:3001" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:3000/ui/users \
     -v

# Check current CORS configuration
grep -A 10 "cors" rsf-utility-backend/src/server.ts
```

**Solutions:**
```javascript
// 1. Update CORS configuration in server.ts
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'https://your-production-domain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 2. For development, allow all origins (INSECURE)
app.use(cors({
  origin: true,
  credentials: true
}));
```

### 3. Rate Limiting Issues

**Symptoms:**
- 429 "Too Many Requests" errors
- Sudden request blocking

**Diagnostics:**
```bash
# Check current rate limit settings
grep -A 5 "rateLimit" rsf-utility-backend/src/middlewares/rate-limiter.ts

# Test rate limiting
for i in {1..10}; do
  curl http://localhost:3000/health
  echo "Request $i"
  sleep 0.1
done

# Check rate limit headers
curl -I http://localhost:3000/health
```

**Solutions:**
```bash
# 1. Temporarily disable rate limiting for debugging
# Comment out rate limiting middleware in server.ts

# 2. Increase rate limits
# Edit src/middlewares/rate-limiter.ts
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  limit: 1000,              // Increase limit
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

# 3. Reset rate limit store
# Restart the application to clear in-memory rate limit data
npm run dev  # or docker-compose restart rsf-utility
```

### 4. API Response Format Issues

**Symptoms:**
- Unexpected response format
- JSON parsing errors
- Missing data fields

**Diagnostics:**
```bash
# Test API response format
curl -s http://localhost:3000/ui/users \
  -H "Authorization: Bearer YOUR_TOKEN" | jq

# Check response headers
curl -I http://localhost:3000/ui/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# Validate JSON structure
curl -s http://localhost:3000/ui/users \
  -H "Authorization: Bearer YOUR_TOKEN" | python3 -m json.tool
```

**Solutions:**
```javascript
// 1. Verify response utility usage
// Check that controllers use sendSuccess/sendError properly

// 2. Add response validation middleware
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log('Response:', {
      url: req.url,
      status: res.statusCode,
      data: typeof data === 'string' ? data.substring(0, 200) : data
    });
    return originalSend.call(this, data);
  };
  next();
});
```

---

## Docker & Deployment Issues

### 1. Container Startup Failures

**Symptoms:**
- Containers exit immediately
- "Container not found" errors
- Build failures

**Diagnostics:**
```bash
# Check container status
docker ps -a
docker-compose ps

# View container logs
docker-compose logs rsf-utility
docker-compose logs mongodb

# Check container resource usage
docker stats

# Inspect container configuration
docker inspect rsf_utility_container
```

**Solutions:**
```bash
# 1. Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 2. Check Dockerfile issues
docker build -t rsf-utility . --progress=plain

# 3. Fix permission issues
docker-compose exec rsf-utility whoami
docker-compose exec rsf-utility ls -la /app

# 4. Check environment variables in container
docker-compose exec rsf-utility env | grep -E "(NODE_ENV|MONGODB_URI|JWT_SECRET)"
```

### 2. Network Connectivity Issues

**Symptoms:**
- Services can't communicate
- DNS resolution failures
- Port binding conflicts

**Diagnostics:**
```bash
# Check Docker networks
docker network ls
docker-compose exec rsf-utility ping mongodb

# Test port accessibility
telnet localhost 3000
nc -zv localhost 3000

# Check port conflicts
lsof -i :3000
netstat -tulpn | grep :3000

# Inspect network configuration
docker network inspect rsf-utility_default
```

**Solutions:**
```bash
# 1. Recreate network
docker-compose down
docker network prune -f
docker-compose up -d

# 2. Fix port conflicts
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port

# 3. Test internal connectivity
docker-compose exec rsf-utility curl http://mongodb:27017
docker-compose exec rsf-utility nslookup mongodb
```

### 3. Volume & Data Persistence Issues

**Symptoms:**
- Data loss on container restart
- Permission denied errors
- Volume mount failures

**Diagnostics:**
```bash
# Check volumes
docker volume ls
docker-compose exec mongodb ls -la /data/db

# Check volume mounts
docker inspect $(docker-compose ps -q mongodb) | jq '.[].Mounts'

# Test data persistence
docker-compose exec mongodb mongosh --eval "db.test.insertOne({test: 'data'})"
docker-compose restart mongodb
docker-compose exec mongodb mongosh --eval "db.test.find()"
```

**Solutions:**
```bash
# 1. Fix volume permissions
docker-compose exec mongodb chown -R mongodb:mongodb /data/db

# 2. Recreate volumes with proper configuration
docker-compose down -v
docker volume create mongodb_data
# Update docker-compose.yml to use named volume

# 3. Backup and restore data
docker-compose exec mongodb mongodump --out /backup/
docker cp $(docker-compose ps -q mongodb):/backup/ ./mongodb-backup/
```

### 4. Resource Constraints

**Symptoms:**
- Out of memory errors
- Slow performance
- CPU throttling

**Diagnostics:**
```bash
# Monitor resource usage
docker stats --no-stream
docker-compose exec rsf-utility top

# Check memory limits
docker inspect $(docker-compose ps -q rsf-utility) | jq '.[].HostConfig.Memory'

# Check disk usage
docker system df
df -h
```

**Solutions:**
```bash
# 1. Increase memory limits
# Add to docker-compose.yml:
services:
  rsf-utility:
    mem_limit: 2g
    memswap_limit: 2g

# 2. Clean up Docker resources
docker system prune -a
docker volume prune
docker image prune -a

# 3. Optimize container resources
# Use multi-stage builds
# Remove development dependencies in production
```

---

## Performance & Monitoring

### 1. Slow Response Times

**Symptoms:**
- High response latency
- Timeout errors
- Poor user experience

**Diagnostics:**
```bash
# Measure API response times
curl -w "%{time_total}\n" -o /dev/null -s http://localhost:3000/health

# Load testing with Apache Bench
ab -n 100 -c 10 http://localhost:3000/health

# Monitor with htop
htop

# Check Node.js performance
node --prof dist/index.js
# Generate profile after running some requests
node --prof-process isolate-*.log > profile.txt
```

**Solutions:**
```bash
# 1. Enable Node.js performance monitoring
node --inspect dist/index.js
# Open chrome://inspect in Chrome

# 2. Add request timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });
  next();
});

# 3. Optimize database queries
# Add database indexes
# Use lean() for read operations
# Implement pagination
```

### 2. Memory Leaks

**Symptoms:**
- Gradually increasing memory usage
- Eventual out-of-memory crashes
- Slow garbage collection

**Diagnostics:**
```bash
# Monitor memory over time
while true; do
  docker stats --no-stream $(docker-compose ps -q rsf-utility) | grep -v CONTAINER
  sleep 10
done

# Generate heap dump
kill -USR2 $(pidof node)
# Or with clinic.js
clinic doctor -- node dist/index.js

# Analyze with Chrome DevTools
node --inspect dist/index.js
# Open chrome://inspect and take heap snapshots
```

**Solutions:**
```bash
# 1. Increase Node.js memory limit temporarily
node --max-old-space-size=4096 dist/index.js

# 2. Implement proper cleanup
// Add to application shutdown
process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

# 3. Monitor with PM2
npm install -g pm2
pm2 start dist/index.js --name rsf-utility --max-memory-restart 2G
pm2 monit
```

### 3. Database Performance Issues

**Symptoms:**
- Slow query execution
- High database CPU usage
- Connection pool exhaustion

**Diagnostics:**
```bash
# Enable MongoDB profiling
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.setProfilingLevel(2, { slowms: 100 });
"

# Check slow operations
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.system.profile.find().limit(5).sort({ ts: -1 }).pretty();
"

# Monitor real-time operations
docker-compose exec mongodb mongosh rsf-utility --eval "
  while(true) {
    printjson(db.currentOp());
    sleep(5000);
  }
"
```

**Solutions:**
```bash
# 1. Add proper indexes
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.orders.createIndex({ user_id: 1, settle_status: 1 });
  db.settlements.createIndex({ user_id: 1, status: 1 });
  db.orders.createIndex({ due_date: 1 });
"

# 2. Optimize queries
# Use explain() to analyze query plans
docker-compose exec mongodb mongosh rsf-utility --eval "
  db.orders.find({user_id: 'user123'}).explain('executionStats');
"

# 3. Increase connection pool
// In src/db/config.ts
mongoose.connect(mongoURI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});
```

### 4. Monitoring Setup Issues

**Symptoms:**
- Missing metrics data
- Grafana dashboard not loading
- Prometheus scraping failures

**Diagnostics:**
```bash
# Check metrics endpoint
curl http://localhost:3000/metrics

# Verify Prometheus targets
curl http://localhost:9090/api/v1/targets

# Check Grafana data sources
curl -u admin:admin http://localhost:3001/api/datasources

# Test log shipping to Loki
curl http://localhost:3100/ready
```

**Solutions:**
```bash
# 1. Fix Prometheus configuration
# Check prometheus.yml configuration
# Ensure RSF Utility metrics endpoint is accessible

# 2. Restart monitoring stack
docker-compose -f monitoring-compose.yml restart

# 3. Verify environment variables
grep LOKI_HOST .env
grep LOG_LEVEL .env
```

---

## Emergency Procedures

### 1. System Recovery

**Critical Service Failure:**
```bash
#!/bin/bash
# Emergency recovery script

echo "🚨 EMERGENCY RECOVERY STARTED 🚨"

# 1. Stop all services
echo "Stopping all services..."
docker-compose down
pkill -f "node.*rsf-utility"

# 2. Check system resources
echo "Checking system resources..."
df -h
free -h
docker system df

# 3. Clean up if needed
if [[ $(df / | tail -1 | awk '{print $5}' | sed 's/%//') -gt 90 ]]; then
  echo "Disk space critical, cleaning up..."
  docker system prune -a -f
  docker volume prune -f
fi

# 4. Restart with fresh state
echo "Restarting services..."
docker-compose up -d

# 5. Verify recovery
sleep 30
curl -s http://localhost:3000/health | jq '.' || echo "❌ Health check failed"

echo "🏥 EMERGENCY RECOVERY COMPLETED 🏥"
```

### 2. Data Backup & Restore

**Emergency Backup:**
```bash
#!/bin/bash
# Emergency data backup

BACKUP_DIR="/backup/emergency-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR

echo "📦 Creating emergency backup in $BACKUP_DIR"

# 1. Backup database
docker-compose exec -T mongodb mongodump --archive > $BACKUP_DIR/mongodb.archive

# 2. Backup application logs
cp -r rsf-utility-backend/logs/ $BACKUP_DIR/logs/ 2>/dev/null || true

# 3. Backup configuration
cp .env $BACKUP_DIR/env.backup
cp docker-compose.yml $BACKUP_DIR/

# 4. Create backup manifest
cat > $BACKUP_DIR/manifest.txt << EOF
Emergency Backup Created: $(date)
Database: mongodb.archive
Logs: logs/
Configuration: env.backup, docker-compose.yml
EOF

echo "✅ Emergency backup completed: $BACKUP_DIR"
```

**Emergency Restore:**
```bash
#!/bin/bash
# Emergency data restore

BACKUP_DIR=$1
if [[ -z "$BACKUP_DIR" ]]; then
  echo "Usage: restore.sh /path/to/backup"
  exit 1
fi

echo "🔄 Restoring from backup: $BACKUP_DIR"

# 1. Stop services
docker-compose down

# 2. Restore database
if [[ -f "$BACKUP_DIR/mongodb.archive" ]]; then
  docker-compose up -d mongodb
  sleep 10
  docker-compose exec -T mongodb mongorestore --archive < $BACKUP_DIR/mongodb.archive
  echo "✅ Database restored"
else
  echo "❌ No database backup found"
fi

# 3. Restore configuration
if [[ -f "$BACKUP_DIR/env.backup" ]]; then
  cp $BACKUP_DIR/env.backup .env
  echo "✅ Configuration restored"
fi

# 4. Start all services
docker-compose up -d

echo "🏁 Emergency restore completed"
```

### 3. Debug Bundle Generation

**Comprehensive Debug Information:**
```bash
#!/bin/bash
# Generate debug bundle for support

DEBUG_DIR="debug-bundle-$(date +%Y%m%d-%H%M%S)"
mkdir -p $DEBUG_DIR

echo "🔍 Generating debug bundle: $DEBUG_DIR"

# 1. System information
echo "=== SYSTEM INFO ===" > $DEBUG_DIR/system-info.txt
uname -a >> $DEBUG_DIR/system-info.txt
docker --version >> $DEBUG_DIR/system-info.txt
docker-compose --version >> $DEBUG_DIR/system-info.txt
node --version >> $DEBUG_DIR/system-info.txt
npm --version >> $DEBUG_DIR/system-info.txt

# 2. Docker status
docker ps -a > $DEBUG_DIR/docker-ps.txt
docker images > $DEBUG_DIR/docker-images.txt
docker-compose ps > $DEBUG_DIR/docker-compose-ps.txt

# 3. Logs
docker-compose logs --tail=500 rsf-utility > $DEBUG_DIR/backend-logs.txt 2>&1
docker-compose logs --tail=500 mongodb > $DEBUG_DIR/mongodb-logs.txt 2>&1

# 4. Configuration (sanitized)
cp docker-compose.yml $DEBUG_DIR/
sed 's/JWT_SECRET=.*/JWT_SECRET=[REDACTED]/' .env > $DEBUG_DIR/env-sanitized.txt

# 5. Network information
docker network ls > $DEBUG_DIR/docker-networks.txt
netstat -tulpn | grep -E "(3000|27017)" > $DEBUG_DIR/ports.txt

# 6. Resource usage
df -h > $DEBUG_DIR/disk-usage.txt
free -h > $DEBUG_DIR/memory-usage.txt
docker stats --no-stream > $DEBUG_DIR/docker-stats.txt

# 7. Health checks
curl -s http://localhost:3000/health > $DEBUG_DIR/health-check.json 2>&1
curl -s http://localhost:3000/metrics | head -50 > $DEBUG_DIR/metrics-sample.txt 2>&1

# 8. Database status
docker-compose exec -T mongodb mongosh --eval "
  print('=== DB STATUS ===');
  printjson(db.runCommand({serverStatus: 1}));
  print('=== COLLECTIONS ===');
  db.getMongo().getDBNames().forEach(dbName => {
    db.getSiblingDB(dbName).getCollectionNames().forEach(colName => {
      print(dbName + '.' + colName + ': ' + db.getSiblingDB(dbName).getCollection(colName).countDocuments());
    });
  });
" > $DEBUG_DIR/database-status.txt 2>&1

# 9. Create archive
tar -czf "${DEBUG_DIR}.tar.gz" $DEBUG_DIR/
rm -rf $DEBUG_DIR

echo "✅ Debug bundle created: ${DEBUG_DIR}.tar.gz"
echo "📧 Send this file to support for analysis"
```

### 4. Escalation Contacts

**Internal Escalation:**
```bash
# Create incident response runbook
cat > incident-response.md << 'EOF'
# Incident Response Runbook

## Severity Levels

### P0 - Critical (Complete Outage)
- **Response Time:** Immediate (15 minutes)
- **Contacts:** 
  - On-call Engineer: +1-xxx-xxx-xxxx
  - Engineering Manager: engineer-manager@company.com
  - CTO: cto@company.com

### P1 - High (Partial Outage)
- **Response Time:** 1 hour
- **Contacts:**
  - Engineering Team: engineering-team@company.com
  - DevOps: devops@company.com

### P2 - Medium (Performance Issues)
- **Response Time:** 4 hours
- **Contacts:**
  - Engineering Team: engineering-team@company.com

## Emergency Procedures

1. **Immediate Actions:**
   - Run health checks
   - Check system resources
   - Review recent deployments

2. **Escalation Path:**
   - Try automatic recovery
   - Contact on-call engineer
   - Engage engineering manager if needed

3. **Communication:**
   - Update status page
   - Notify stakeholders
   - Document incident timeline

## Recovery Verification
- [ ] Health endpoint responding
- [ ] Database connectivity verified
- [ ] Authentication working
- [ ] File uploads functional
- [ ] Performance metrics normal
EOF
```

**External Support:**
```bash
# Support ticket template
cat > support-ticket-template.md << 'EOF'
# Support Ticket Template

## Environment Information
- **Environment:** [Development/Staging/Production]
- **RSF Utility Version:** [Version Number]
- **Deployment Method:** [Docker/Native/Cloud]
- **Node.js Version:** [Version]
- **MongoDB Version:** [Version]

## Issue Description
- **Summary:** [Brief description]
- **Impact:** [User/business impact]
- **Started:** [When issue began]
- **Frequency:** [Always/Intermittent/Once]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected vs Actual Behavior
- **Expected:** [What should happen]
- **Actual:** [What actually happens]

## Troubleshooting Performed
- [ ] Health checks run
- [ ] Logs reviewed
- [ ] Configuration verified
- [ ] Debug bundle generated

## Attachments
- [ ] Debug bundle (debug-bundle-TIMESTAMP.tar.gz)
- [ ] Screenshots/videos
- [ ] Log excerpts
- [ ] Configuration files (sanitized)
EOF
```

---

*This troubleshooting guide provides comprehensive diagnostic procedures and solutions for common RSF Utility issues. Keep it updated as new issues are discovered and resolved. For complex issues not covered here, generate a debug bundle and contact the support team.*

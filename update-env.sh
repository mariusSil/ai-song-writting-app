#!/bin/bash
set -e

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Updating Environment Variables for Local Supabase ===${NC}"

# Get Supabase details
SUPABASE_URL="http://127.0.0.1:54321"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

# Update server .env
echo -e "${YELLOW}Updating server/.env with local Supabase settings...${NC}"
if [ -f "./server/.env" ]; then
    # Use temporary file for sed on macOS
    sed -i '' "s|SUPABASE_URL=.*|SUPABASE_URL=${SUPABASE_URL}|g" ./server/.env
    sed -i '' "s|SUPABASE_SERVICE_KEY=.*|SUPABASE_SERVICE_KEY=${SERVICE_ROLE_KEY}|g" ./server/.env
    echo -e "${GREEN}Updated server/.env successfully${NC}"
else
    echo -e "${RED}server/.env not found!${NC}"
    exit 1
fi

# Update or create client .env
echo -e "${YELLOW}Updating client/.env with local Supabase settings...${NC}"
if [ -f "./client/.env" ]; then
    # Use temporary file for sed on macOS
    sed -i '' "s|VITE_SUPABASE_URL=.*|VITE_SUPABASE_URL=${SUPABASE_URL}|g" ./client/.env
    sed -i '' "s|VITE_SUPABASE_ANON_KEY=.*|VITE_SUPABASE_ANON_KEY=${ANON_KEY}|g" ./client/.env
    echo -e "${GREEN}Updated client/.env successfully${NC}"
else
    echo -e "${YELLOW}Creating client/.env file...${NC}"
    cat > ./client/.env << EOF
VITE_SUPABASE_URL=${SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${ANON_KEY}
VITE_API_URL=http://localhost:3000/api
EOF
    echo -e "${GREEN}Created client/.env successfully${NC}"
fi

# Install axios package
echo -e "${YELLOW}Installing axios package for MailerLite integration...${NC}"
(cd server && npm install)

echo -e "${GREEN}All environment variables updated successfully!${NC}"
echo -e "${BLUE}You can now run ./run-dev.sh to start the project${NC}"

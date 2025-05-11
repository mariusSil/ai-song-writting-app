#!/bin/bash
set -e

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== SiloTech AI Song Writing App Development Setup ===${NC}"

# Check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Docker is not installed. Docker is required for running Supabase locally.${NC}"
        echo -e "Please install Docker Desktop from https://www.docker.com/products/docker-desktop/"
        return 1
    fi
    
    # Check if Docker is running
    if ! docker info &> /dev/null; then
        echo -e "${RED}Docker is not running. Please start Docker Desktop and try again.${NC}"
        return 1
    fi
    
    return 0
}

# Function to install Supabase CLI non-interactively
install_supabase_cli() {
    echo -e "${BLUE}Installing Supabase CLI...${NC}"
    
    if command -v brew &> /dev/null; then
        brew install supabase/tap/supabase
    else
        echo -e "${RED}Homebrew not found. Please install Supabase CLI manually:${NC}"
        echo -e "npm install -g supabase"
        echo -e "Or install Homebrew first with: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        echo -e "and then: brew install supabase/tap/supabase"
        return 1
    fi
    
    return 0
}

# Setup environment files
setup_env_files() {
    # Server .env
    if [ ! -f "./server/.env" ]; then
        echo -e "${YELLOW}Server .env file not found. Creating from example...${NC}"
        cp ./server/.env.example ./server/.env
        
        # Generate random JWT secret
        random_jwt=$(openssl rand -base64 32)
        
        # Update .env with local Supabase values and JWT secret
        sed -i '' "s|SUPABASE_URL=.*|SUPABASE_URL=http://localhost:54321|g" ./server/.env
        sed -i '' "s|SUPABASE_SERVICE_KEY=.*|SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU|g" ./server/.env
        sed -i '' "s|JWT_SECRET=.*|JWT_SECRET=$random_jwt|g" ./server/.env
        
        echo -e "${GREEN}Created and configured server/.env file with local Supabase settings.${NC}"
    fi
    
    # Client environment
    if [ ! -f "./client/.env" ]; then
        echo -e "${BLUE}Creating client environment file...${NC}"
        cat > ./client/.env << EOF
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
VITE_API_URL=http://localhost:3000/api
EOF
        echo -e "${GREEN}Created client environment file.${NC}"
    fi
}

# Install dependencies if needed
install_dependencies() {
    echo -e "${YELLOW}Checking and installing dependencies...${NC}"
    
    if [ ! -d "./client/node_modules" ]; then
        echo -e "${BLUE}Installing client dependencies...${NC}"
        (cd client && yarn install)
    else
        echo -e "${GREEN}Client dependencies already installed.${NC}"
    fi
    
    if [ ! -d "./server/node_modules" ]; then
        echo -e "${BLUE}Installing server dependencies...${NC}"
        (cd server && yarn install)
    else
        echo -e "${GREEN}Server dependencies already installed.${NC}"
    fi
}

# Initialize Supabase
initialize_supabase() {
    if [ -f "./supabase/config.toml" ]; then
        echo -e "${GREEN}Supabase project already initialized.${NC}"
        return 0
    fi
    
    # If .supabase directory exists but config doesn't, use force flag
    if [ -d "./.supabase" ]; then
        echo -e "${BLUE}Reinitializing Supabase project...${NC}"
        echo "n" | supabase init --force
    else
        echo -e "${BLUE}Initializing Supabase project...${NC}"
        # Non-interactive initialization
        echo "n" | supabase init
    fi
    
    return 0
}

# Start Supabase
start_supabase() {
    echo -e "${BLUE}Starting Supabase...${NC}"
    
    # Check if Supabase is already running
    if supabase status &> /dev/null; then
        echo -e "${GREEN}Supabase is already running.${NC}"
    else
        # Start Supabase with detached mode
        supabase start
        
        # Wait for Supabase to fully start
        echo -e "${YELLOW}Waiting for Supabase to start...${NC}"
        sleep 10
        
        # Check if started successfully
        if ! supabase status &> /dev/null; then
            echo -e "${RED}Failed to start Supabase. Check Docker status and try again.${NC}"
            return 1
        fi
        
        echo -e "${GREEN}Supabase started successfully.${NC}"
    fi
    
    return 0
}

# Main execution flow
main() {
    local use_supabase=false
    
    # Check Docker first, but don't require it
    if check_docker; then
        echo -e "${GREEN}Docker is running. Checking for Supabase CLI...${NC}"
        
        # Install Supabase CLI if needed
        if ! command -v supabase &> /dev/null; then
            echo -e "${YELLOW}Would you like to install Supabase CLI for local development? (y/n)${NC}"
            read -r install_supabase
            
            if [[ $install_supabase =~ ^[Yy]$ ]]; then
                if install_supabase_cli; then
                    use_supabase=true
                else
                    echo -e "${YELLOW}Will continue without local Supabase.${NC}"
                fi
            else
                echo -e "${YELLOW}Continuing without local Supabase.${NC}"
            fi
        else
            use_supabase=true
        fi
        
        # Initialize and start Supabase if CLI is available and we want to use it
        if $use_supabase; then
            initialize_supabase
            if start_supabase; then
                echo -e "${GREEN}Successfully started Supabase services.${NC}"
            else
                use_supabase=false
                echo -e "${YELLOW}Continuing without Supabase services.${NC}"
            fi
        fi
    else
        echo -e "${YELLOW}Docker is not running. Continuing without local Supabase.${NC}"
        echo -e "${BLUE}NOTE: The app will use the API credentials in your .env files instead.${NC}"
        echo
    fi
    
    # Setup environment files
    setup_env_files
    
    # Install dependencies
    install_dependencies
    
    # Start the client and server
    echo -e "${BLUE}Starting development servers...${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
    
    # Get absolute paths for client and server
    PROJECT_ROOT="$(pwd)"
    CLIENT_DIR="${PROJECT_ROOT}/client"
    SERVER_DIR="${PROJECT_ROOT}/server"
    
    # Verify directories exist
    if [ ! -d "$CLIENT_DIR" ]; then
        echo -e "${RED}Client directory not found at $CLIENT_DIR. Cannot start client.${NC}"
        exit 1
    fi
    
    if [ ! -d "$SERVER_DIR" ]; then
        echo -e "${RED}Server directory not found at $SERVER_DIR. Cannot start server.${NC}"
        exit 1
    fi
    
    # Kill any existing Vite dev servers first
    echo -e "${YELLOW}Checking for existing Vite dev servers...${NC}"
    pkill -f "vite" || true
    
    # Wait a moment to ensure processes are terminated
    sleep 2
    
    # Start client
    echo -e "${BLUE}Starting client on http://localhost:5173${NC}"
    (cd "$CLIENT_DIR" && yarn dev) &
    client_pid=$!
    
    # Wait a moment to ensure the process starts correctly
    sleep 2
    
    # Check if client started successfully
    if ! ps -p $client_pid > /dev/null; then
        echo -e "${RED}Failed to start client.${NC}"
        exit 1
    fi
    
    # Start server
    echo -e "${BLUE}Starting server on http://localhost:3001${NC}"
    (cd "$SERVER_DIR" && yarn dev) &
    server_pid=$!
    
    # Wait a moment to ensure the process starts correctly
    sleep 2
    
    # Check if server started successfully
    if ! ps -p $server_pid > /dev/null; then
        echo -e "${RED}Failed to start server.${NC}"
        kill $client_pid 2>/dev/null
        exit 1
    fi
    
    echo -e "${GREEN}All services are running successfully!${NC}"
    echo -e "${BLUE}Client: http://localhost:5173${NC}"
    echo -e "${BLUE}Server: http://localhost:3001${NC}"
    
    # Display Supabase info if available
    if command -v supabase &> /dev/null && supabase status &> /dev/null; then
        echo -e "${BLUE}Supabase Studio: http://localhost:54323${NC}"
        echo -e "\n${YELLOW}Local Supabase Details:${NC}"
        echo -e "Supabase URL: ${GREEN}http://localhost:54321${NC}"
        echo -e "Anon Key: ${GREEN}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0${NC}"
        echo -e "Service Role Key: ${GREEN}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU${NC}"
        echo -e "Studio URL: ${GREEN}http://localhost:54323${NC}"
        echo -e "Default email: ${GREEN}admin@example.com${NC}"
        echo -e "Default password: ${GREEN}admin${NC}"
    fi
    
    echo -e "\n${YELLOW}Press Ctrl+C to stop all servers${NC}"
    
    # Clean up resources when script is terminated
    trap 'cleanup' EXIT INT TERM
    
    # Keep script running
    wait
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    
    # Kill running processes
    kill $(jobs -p) 2>/dev/null
    
    # Stop Supabase if it's running
    if command -v supabase &> /dev/null && supabase status &> /dev/null; then
        echo -e "${BLUE}Stopping Supabase...${NC}"
        supabase stop
    fi
    
    echo -e "${GREEN}All services stopped.${NC}"
}

# Run the main function
main

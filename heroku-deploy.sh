#!/bin/bash

# ANSI color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script to deploy the application to Heroku

echo -e "${BLUE}=== AI Song Writing App Heroku Deployment Helper ===${NC}"
echo

# Check if heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo -e "${RED}Heroku CLI not found. Please install Heroku CLI first:${NC}"
    echo "brew tap heroku/brew && brew install heroku"
    exit 1
fi

# Check if user is logged in to Heroku
heroku_logged_in=$(heroku whoami 2>/dev/null)
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}You are not logged in to Heroku. Please login first:${NC}"
    heroku login
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to login to Heroku. Exiting.${NC}"
        exit 1
    fi
fi

# Function to check if app exists
app_exists() {
    heroku apps:info "$1" &>/dev/null
    return $?
}

# Ask for app name if not provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter your Heroku app name (or press Enter to create a new app):${NC}"
    read -r APP_NAME
else
    APP_NAME="$1"
fi

# Create app if it doesn't exist
if [ -z "$APP_NAME" ]; then
    echo -e "${BLUE}Creating new Heroku app...${NC}"
    APP_NAME=$(heroku create --json | grep -o '"name":"[^"]*' | grep -o '[^"]*$')
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to create Heroku app. Exiting.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Created new Heroku app: ${APP_NAME}${NC}"
elif ! app_exists "$APP_NAME"; then
    echo -e "${BLUE}App '$APP_NAME' doesn't exist. Creating it...${NC}"
    heroku create "$APP_NAME"
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to create Heroku app. Exiting.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Created Heroku app: ${APP_NAME}${NC}"
else
    echo -e "${GREEN}Using existing Heroku app: ${APP_NAME}${NC}"
fi

# Setting buildpacks
echo -e "${BLUE}Setting up buildpacks...${NC}"
heroku buildpacks:clear -a "$APP_NAME"
heroku buildpacks:add heroku/nodejs -a "$APP_NAME"

# Set necessary environment variables
echo -e "${BLUE}Setting up environment variables...${NC}"
echo -e "${YELLOW}Setting NODE_ENV=production${NC}"
heroku config:set NODE_ENV=production -a "$APP_NAME"

# Get app-specific environment variables from .env file
if [ -f "./server/.env" ]; then
    echo -e "${BLUE}Setting environment variables from .env file...${NC}"
    
    # Read and set each variable from .env, except NODE_ENV which we set above
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ $key == \#* ]] && continue
        [[ -z "$key" ]] && continue
        
        # Trim whitespace
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        
        # Skip NODE_ENV since we set it above
        [[ "$key" == "NODE_ENV" ]] && continue
        
        # Skip PORT as Heroku assigns it dynamically
        [[ "$key" == "PORT" ]] && continue
        
        # Set the env var
        echo -e "${YELLOW}Setting $key${NC}"
        heroku config:set "$key"="$value" -a "$APP_NAME"
    done < "./server/.env"
else
    echo -e "${YELLOW}No .env file found. Please set environment variables manually:${NC}"
    echo "heroku config:set KEY=VALUE -a $APP_NAME"
fi

# Ask for Supabase and MailerLite configuration if not already set
echo -e "${YELLOW}Do you want to set up Supabase and MailerLite configuration now? (y/n)${NC}"
read -r SETUP_CONFIG
if [[ "$SETUP_CONFIG" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Enter Supabase URL:${NC}"
    read -r SUPABASE_URL
    if [ -n "$SUPABASE_URL" ]; then
        heroku config:set SUPABASE_URL="$SUPABASE_URL" -a "$APP_NAME"
    fi
    
    echo -e "${YELLOW}Enter Supabase Service Key:${NC}"
    read -r SUPABASE_SERVICE_KEY
    if [ -n "$SUPABASE_SERVICE_KEY" ]; then
        heroku config:set SUPABASE_SERVICE_KEY="$SUPABASE_SERVICE_KEY" -a "$APP_NAME"
    fi
    
    echo -e "${YELLOW}Enter MailerLite API Key:${NC}"
    read -r MAILERLITE_API_KEY
    if [ -n "$MAILERLITE_API_KEY" ]; then
        heroku config:set MAILERLITE_API_KEY="$MAILERLITE_API_KEY" -a "$APP_NAME"
    fi
    
    echo -e "${YELLOW}Enter MailerLite Newsletter Group ID:${NC}"
    read -r MAILERLITE_NEWSLETTER_GROUP_ID
    if [ -n "$MAILERLITE_NEWSLETTER_GROUP_ID" ]; then
        heroku config:set MAILERLITE_NEWSLETTER_GROUP_ID="$MAILERLITE_NEWSLETTER_GROUP_ID" -a "$APP_NAME"
    fi
fi

# Check if git is already initialized
if [ ! -d ".git" ]; then
    echo -e "${BLUE}Initializing git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit for Heroku deployment"
fi

# Set Heroku remote
echo -e "${BLUE}Setting Heroku git remote...${NC}"
heroku_remote=$(git remote | grep heroku)
if [ -z "$heroku_remote" ]; then
    heroku git:remote -a "$APP_NAME"
else
    echo -e "${GREEN}Heroku remote already exists.${NC}"
fi

# Deploy to Heroku
echo -e "${BLUE}Deploying to Heroku...${NC}"
echo -e "${YELLOW}This may take several minutes.${NC}"
git push heroku master || git push heroku main

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy to Heroku. Try committing your changes first:${NC}"
    echo "git add . && git commit -m 'Update for Heroku deployment' && ./heroku-deploy.sh $APP_NAME"
    exit 1
fi

echo
echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${BLUE}Your app is now running at: ${GREEN}https://$APP_NAME.herokuapp.com${NC}"

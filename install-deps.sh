#!/bin/bash

# ANSI color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script to install all dependencies for both client and server

echo -e "${BLUE}=== AI Song Writing App Dependencies Installer ===${NC}"
echo

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}Yarn is not installed. Installing yarn...${NC}"
    npm install -g yarn
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install yarn. Please install it manually:${NC}"
        echo "npm install -g yarn"
        exit 1
    fi
    echo -e "${GREEN}Yarn installed successfully.${NC}"
else
    echo -e "${GREEN}Yarn is already installed.${NC}"
fi

# Install server dependencies
echo
echo -e "${BLUE}Installing server dependencies...${NC}"
cd "$(dirname "$0")/server" || exit
rm -rf node_modules yarn.lock package-lock.json
yarn install

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install server dependencies.${NC}"
    exit 1
fi
echo -e "${GREEN}Server dependencies installed successfully.${NC}"

# Install client dependencies
echo
echo -e "${BLUE}Installing client dependencies...${NC}"
cd "../client" || exit
rm -rf node_modules yarn.lock package-lock.json
yarn install

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install client dependencies.${NC}"
    exit 1
fi
echo -e "${GREEN}Client dependencies installed successfully.${NC}"

echo
echo -e "${GREEN}All dependencies installed successfully!${NC}"
echo -e "${YELLOW}You can now run the application using ./run-dev.sh${NC}"

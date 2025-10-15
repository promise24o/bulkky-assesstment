#!/bin/bash

# E-Commerce Platform Setup Script
# This script sets up both backend and frontend

set -e  # Exit on error

echo "🚀 E-Commerce Platform Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"
echo ""

# Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Setup environment file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Generate Prisma client
echo "Generating Prisma client..."
npm run prisma:generate

# Run migrations
echo "Running database migrations..."
npm run prisma:migrate

# Seed database
echo "Seeding database with sample data..."
npm run prisma:seed

echo -e "${GREEN}✅ Backend setup complete!${NC}"
echo ""

# Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Setup environment file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}✅ Frontend setup complete!${NC}"
echo ""

# Final instructions
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "Demo Credentials:"
echo "  Admin: admin@ecommerce.com / admin123"
echo "  User:  user@example.com / user123"
echo ""
echo -e "${BLUE}Happy coding! 🚀${NC}"

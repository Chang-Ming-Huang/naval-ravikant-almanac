#!/bin/bash

# Naval Ravikant Almanac Website - Setup Script
# This script helps you set up the development environment

set -e  # Exit on any error

echo "🚀 Setting up Naval Ravikant Almanac Website..."
echo "=================================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
else
    echo "✅ Python 3 found: $(python3 --version)"
fi

# Check if Node.js is installed (optional)
if command -v node &> /dev/null; then
    echo "✅ Node.js found: $(node --version)"
    NODE_AVAILABLE=true
else
    echo "⚠️  Node.js not found. Playwright features will not be available."
    NODE_AVAILABLE=false
fi

# Check if npm is installed (optional)
if command -v npm &> /dev/null && [ "$NODE_AVAILABLE" = true ]; then
    echo "✅ npm found: $(npm --version)"
    NPM_AVAILABLE=true
else
    echo "⚠️  npm not found. Playwright features will not be available."
    NPM_AVAILABLE=false
fi

echo ""
echo "📦 Setting up project..."

# Make Python server executable
chmod +x server.py

# If Node.js is available, offer to install dependencies
if [ "$NPM_AVAILABLE" = true ]; then
    echo ""
    read -p "🤔 Do you want to install Playwright for testing? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📥 Installing Playwright dependencies..."
        npm install
        
        echo "🌐 Installing Playwright browsers..."
        npx playwright install
        
        echo "✅ Playwright setup complete!"
    else
        echo "⏭️  Skipping Playwright setup."
    fi
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   python3 server.py"
echo ""

if [ "$NPM_AVAILABLE" = true ]; then
    echo "🧪 To run tests:"
    echo "   npm run test-website"
    echo ""
fi

echo "📚 For more information, see README.md"
echo ""
echo "Happy coding! 🎯"
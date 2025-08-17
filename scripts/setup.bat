@echo off
REM Naval Ravikant Almanac Website - Setup Script for Windows
REM This script helps you set up the development environment on Windows

echo 🚀 Setting up Naval Ravikant Almanac Website...
echo ==================================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3 first.
    echo 💡 Download from: https://python.org
    pause
    exit /b 1
) else (
    echo ✅ Python found
    python --version
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Node.js not found. Playwright features will not be available.
    echo 💡 Download from: https://nodejs.org
    set NODE_AVAILABLE=false
) else (
    echo ✅ Node.js found
    node --version
    set NODE_AVAILABLE=true
)

REM Check if npm is installed
if "%NODE_AVAILABLE%"=="true" (
    npm --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ⚠️  npm not found. Playwright features will not be available.
        set NPM_AVAILABLE=false
    ) else (
        echo ✅ npm found
        npm --version
        set NPM_AVAILABLE=true
    )
) else (
    set NPM_AVAILABLE=false
)

echo.
echo 📦 Setting up project...

REM If Node.js is available, offer to install dependencies
if "%NPM_AVAILABLE%"=="true" (
    echo.
    set /p "INSTALL_PLAYWRIGHT=🤔 Do you want to install Playwright for testing? (y/n): "
    if /i "%INSTALL_PLAYWRIGHT%"=="y" (
        echo 📥 Installing Playwright dependencies...
        npm install
        
        echo 🌐 Installing Playwright browsers...
        npx playwright install
        
        echo ✅ Playwright setup complete!
    ) else (
        echo ⏭️  Skipping Playwright setup.
    )
)

echo.
echo 🎉 Setup complete!
echo.
echo 🚀 To start the development server:
echo    python server.py
echo.

if "%NPM_AVAILABLE%"=="true" (
    echo 🧪 To run tests:
    echo    npm run test-website
    echo.
)

echo 📚 For more information, see README.md
echo.
echo Happy coding! 🎯
echo.
pause
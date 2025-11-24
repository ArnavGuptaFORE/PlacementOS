@echo off
REM PlacementOS Setup Script for Windows
REM This script automates the setup process

echo.
echo 🚀 PlacementOS Setup Script
echo ==============================
echo.

REM Check Node.js
echo ✓ Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)
echo    Node.js detected ✓

REM Check npm
echo ✓ Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed.
    exit /b 1
)
echo    npm detected ✓

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Check for .env file
echo.
echo 🔧 Setting up environment...
if not exist .env (
    copy .env.example .env
    echo    Created .env file from .env.example
    echo.
    echo ⚠️  IMPORTANT: Please add your GROQ_API_KEY to the .env file
    echo    Edit .env and add: GROQ_API_KEY=your_actual_key
    echo.
) else (
    echo    .env file already exists ✓
)

REM Check for logo
echo.
echo 🎨 Checking logo...
if not exist public\logo.png (
    echo    ⚠️  Logo not found at public\logo.png
    echo    Please add your logo image to public\logo.png
    echo    See public\logo-placeholder.txt for instructions
) else (
    echo    Logo found ✓
)

REM Generate Prisma Client
echo.
echo 🗄️  Setting up database...
call npx prisma generate

REM Run migrations
echo.
echo 📊 Running database migrations...
call npx prisma migrate dev --name init

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo    1. Add your GROQ_API_KEY to .env
echo    2. Add your logo to public\logo.png (if not already done)
echo    3. Run: npm run dev
echo    4. Open: http://localhost:3000
echo.
echo 🎉 Happy coding with PlacementOS!
pause



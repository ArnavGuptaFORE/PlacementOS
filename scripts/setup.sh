#!/bin/bash

# PlacementOS Setup Script
# This script automates the setup process

set -e

echo "🚀 PlacementOS Setup Script"
echo "=============================="
echo ""

# Check Node.js
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18+."
    exit 1
fi
echo "   Node.js $(node -v) detected ✓"

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "   npm $(npm -v) detected ✓"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check for .env file
echo ""
echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "   Created .env file from .env.example"
    echo ""
    echo "⚠️  IMPORTANT: Please add your GROQ_API_KEY to the .env file"
    echo "   Edit .env and add: GROQ_API_KEY=your_actual_key"
    echo ""
else
    echo "   .env file already exists ✓"
fi

# Check for logo
echo ""
echo "🎨 Checking logo..."
if [ ! -f public/logo.png ]; then
    echo "   ⚠️  Logo not found at public/logo.png"
    echo "   Please add your logo image to public/logo.png"
    echo "   See public/logo-placeholder.txt for instructions"
else
    echo "   Logo found ✓"
fi

# Generate Prisma Client
echo ""
echo "🗄️  Setting up database..."
npx prisma generate

# Run migrations
echo ""
echo "📊 Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Add your GROQ_API_KEY to .env"
echo "   2. Add your logo to public/logo.png (if not already done)"
echo "   3. Run: npm run dev"
echo "   4. Open: http://localhost:3000"
echo ""
echo "🎉 Happy coding with PlacementOS!"



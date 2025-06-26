#!/bin/bash

echo "🔍 Checking Node.js version..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed."
  exit 1
fi

echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
  echo "❌ npm install failed."
  exit 1
fi

echo "🏗️ Building the project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed."
  exit 1
fi

echo "✅ Setup completed successfully!"

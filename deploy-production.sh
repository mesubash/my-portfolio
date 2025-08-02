#!/bin/bash

# Production deployment script
echo "🚀 Starting production deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "💡 Please create a .env file with your API keys"
    exit 1
fi

# Load environment variables
set -a
source .env
set +a

# Display loaded environment (without showing the actual key values)
echo "✅ Environment variables loaded:"
echo "   - VITE_REACT_APP_ABSTRACT_API_KEY: ${VITE_REACT_APP_ABSTRACT_API_KEY:0:8}..."
echo "   - REACT_APP_ABSTRACT_API_KEY: ${REACT_APP_ABSTRACT_API_KEY:0:8}..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build the project with environment variables
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Copy CNAME file to dist directory for GitHub Pages
if [ -f CNAME ]; then
    echo "📄 Copying CNAME file to dist directory..."
    cp CNAME dist/
    echo "✅ CNAME file copied successfully"
else
    echo "⚠️  Warning: CNAME file not found"
fi

echo "✅ Build successful!"

# Display build info
echo "📊 Build information:"
echo "   - Output directory: dist/"
echo "   - Environment variables included in build"

# Ask user if they want to deploy
echo ""
read -p "🚀 Deploy to GitHub Pages? (y/N): " deploy_confirm

if [[ $deploy_confirm =~ ^[Yy]$ ]]; then
    echo "🌐 Deploying to GitHub Pages..."
    
    # Deploy only the dist directory contents
    npx gh-pages -d dist
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "🌐 Your site is available at:"
        echo "   - GitHub Pages: https://mesubash.github.io/my-portfolio/"
        echo "   - Custom Domain: https://subashsdhami.com.np"
        echo ""
        echo "⏱️  Note: It may take a few minutes for changes to be visible"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "⏸️  Deployment skipped. Build files are ready in dist/ folder"
fi

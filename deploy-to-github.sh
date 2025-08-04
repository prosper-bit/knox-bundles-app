#!/bin/bash

# Knox Bundles - Automated GitHub Pages Deployment Script
# This script helps you deploy Knox Bundles to GitHub Pages quickly

echo "🚀 Knox Bundles - GitHub Pages Deployment"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"

# Get GitHub username
echo ""
read -p "📝 Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

echo "✅ GitHub username: $GITHUB_USERNAME"

# Repository name
REPO_NAME="knox-bundles"
echo "✅ Repository name: $REPO_NAME"

# Check if github-pages-ready directory exists
if [ ! -d "github-pages-ready" ]; then
    echo "❌ github-pages-ready directory not found"
    echo "   Please run this script from the telegram_mini_app directory"
    exit 1
fi

echo "✅ Files are ready for deployment"

# Navigate to the github-pages-ready directory
cd github-pages-ready

# Initialize git repository
echo ""
echo "🔧 Initializing Git repository..."
git init

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit files
echo "💾 Committing files..."
git commit -m "Add Knox Bundles - Professional Data Bundle App

✨ Features:
- Professional white & green mobile interface
- Multi-network support (MTN, AirtelTigo, Telecel)
- Complete admin panel with bundle management
- Bottom navigation (Home, Bundles, Orders, Support)
- Order tracking and management
- Mobile-optimized design
- Secure admin access

🎯 Ready for Telegram Mini App integration
🔧 Admin password: knox2024
⚡ Knox Bundles - Fast. Reliable. Affordable."

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Add remote origin
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

echo ""
echo "🎉 Git repository is ready!"
echo ""
echo "📋 NEXT STEPS:"
echo "=============="
echo ""
echo "1. 🌐 Go to GitHub.com and create a new repository:"
echo "   - Repository name: knox-bundles"
echo "   - Make it PUBLIC (required for free GitHub Pages)"
echo "   - DON'T initialize with README (we already have files)"
echo ""
echo "2. 🚀 Push your code to GitHub:"
echo "   Run this command in the github-pages-ready directory:"
echo "   git push -u origin main"
echo ""
echo "3. ⚙️ Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Click Settings tab"
echo "   - Click Pages in sidebar"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo "   - Click Save"
echo ""
echo "4. 🔗 Your Knox Bundles will be live at:"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "5. 🤖 Set in Telegram @BotFather:"
echo "   - /mybots → Select your bot"
echo "   - Bot Settings → Menu Button"
echo "   - URL: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo "   - Text: Open Knox Bundles"
echo ""
echo "✨ Your professional Knox Bundles app will be ready!"
echo ""

# Create a quick reference file
cat > ../DEPLOYMENT_COMMANDS.txt << EOF
Knox Bundles - GitHub Pages Deployment Commands
==============================================

Your GitHub username: $GITHUB_USERNAME
Repository name: $REPO_NAME
Your live URL: https://$GITHUB_USERNAME.github.io/$REPO_NAME/

Commands to run:
1. Create repository on GitHub.com (name: knox-bundles, public)
2. cd github-pages-ready
3. git push -u origin main
4. Enable Pages in GitHub repository settings
5. Set URL in @BotFather menu button

That's it! Knox Bundles will be live! 🚀
EOF

echo "📄 Deployment commands saved to: DEPLOYMENT_COMMANDS.txt"
echo ""
echo "🎯 Ready to deploy! Follow the steps above."
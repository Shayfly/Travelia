#!/bin/bash

# Deploy built frontend to GitHub Pages
set -e

# Build the project
cd frontend
npm run build

# Initialize a git repo inside the build directory
cd dist
git init
git checkout -b gh-pages
# Configure the correct remote
git remote add origin https://github.com/Shayfly/Travelia.git

# Commit and push the contents
git add -A
git commit -m "Deploy to GitHub Pages"

git push -f origin gh-pages

# Clean up the temporary git directory
cd ..
rm -rf dist/.git
cd ..

echo "Deployment complete."

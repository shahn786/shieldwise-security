# GitHub Setup for ShieldWise Security

## Step 1: Create a GitHub Account
1. Go to https://github.com/signup
2. Create a free account (no credit card needed)
3. Choose your username and verify your email

## Step 2: Create a New Repository
1. Log in to GitHub
2. Click the "+" icon in top right → "New repository"
3. Repository name: `shieldwise-security`
4. Description: "Professional security guard services website for California"
5. Choose **Public** (helps with SEO)
6. Click "Create repository"

## Step 3: Get Your Repository URL
After creating, you'll see a URL like:
```
https://github.com/YOUR-USERNAME/shieldwise-security.git
```

## Step 4: Push Code from Replit to GitHub

Run these commands in your Replit terminal:

```bash
# Configure git (use your GitHub email and username)
git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"

# Initialize git in the project (if not already done)
cd /home/runner/workspace
git init

# Add remote repository (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/shieldwise-security.git

# Add all files
git add .

# Create first commit
git commit -m "Initial ShieldWise Security website - 182 California cities with SEO optimization"

# Push to GitHub (you'll be prompted for credentials)
git branch -M main
git push -u origin main
```

When prompted for credentials:
- Username: your GitHub username
- Password: Create a Personal Access Token (recommended for security)

## Step 5: Create a Personal Access Token (for authentication)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Set scope: check `repo` and `workflow`
4. Click "Generate token"
5. **Copy the token immediately** (you won't see it again)
6. Use this token as your password when pushing

## Step 6: Deploy to VPS

Once code is on GitHub, on your VPS run:

```bash
cd /var/www/
git clone https://github.com/YOUR-USERNAME/shieldwise-security.git shieldwisesecurity.com
cd shieldwisesecurity.com
npm install
pm2 restart shieldwise
```

## Summary

Your code will be:
- Backed up on GitHub
- Easy to pull updates to your VPS
- Version controlled with full history
- Ready for CI/CD if needed in the future

Let me know once you've created your GitHub account and I can help with the next steps!

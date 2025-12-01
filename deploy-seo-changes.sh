#!/bin/bash
# ===========================================
# ShieldWise SEO Optimization VPS Deployment
# Generated: 2025-12-01T06:12:42.945Z
# ===========================================

echo "🚀 Starting SEO Optimization Deployment..."

# Navigate to project directory
cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com

# Create backup
echo "📦 Creating backup..."
cp -r views/cities views/cities.backup.$(date +%Y%m%d%H%M%S)

# Sync updated city files from Replit (run this from your local machine or use rsync)
echo "📂 Ready to receive updated city files..."
# rsync -avz --progress user@replit:workspace/views/cities/ ./views/cities/

# Create data directory if not exists
mkdir -p data

# Sync data files
# rsync -avz user@replit:workspace/data/ ./data/

# Sync scripts
# rsync -avz user@replit:workspace/scripts/ ./scripts/

# Validate SEO after deployment
echo "🔍 Running SEO validation..."
node scripts/validate-seo.js || echo "⚠️ Some validations failed - check output"

# Restart application
echo "🔄 Restarting PM2..."
pm2 restart shieldwise
sleep 3
pm2 status

echo "✅ Deployment complete!"
echo ""
echo "📊 Next steps:"
echo "1. Verify site at https://shieldwisesecurity.com"
echo "2. Check structured data at https://validator.schema.org"
echo "3. Request re-indexing in Google Search Console"
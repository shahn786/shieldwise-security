#!/bin/bash
# Fix Duplicate FAQ Schema Errors
# Run: bash DEPLOY-FAQ-FIX.sh

echo "🔧 Deploying FAQ Schema Fixes to Production..."
echo "Fixing: Duplicate FAQPage schemas causing 'unnamed item' errors"
echo ""

ssh shieldwisesecurity@31.220.57.141 << 'ENDSSH'
cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com

echo "📝 Removing duplicate FAQ schema #1 from index.ejs head section..."
# Remove first FAQ schema (lines 464-520)
sed -i '/<!-- Enhanced FAQ Schema -->/,/<!-- Breadcrumb Schema -->/c\    <!-- Breadcrumb Schema -->' views/index.ejs

echo "📝 Removing duplicate FAQ schema #2 from index.ejs body section..."
# Remove second FAQ schema (around line 1228)
sed -i '/<!-- JSON-LD Structured Data for FAQ -->/,/<!--     new section    -->/c\ <!--     new section    -->' views/index.ejs

echo "✅ Now only ONE FAQ schema remains (in comprehensive-faq partial)"
echo ""
echo "🔄 Restarting PM2 application..."
pm2 restart shieldwise && pm2 save

echo ""
echo "✅ FAQ schema fixes deployed!"
echo ""
echo "Next steps:"
echo "1. Test at https://search.google.com/test/rich-results"
echo "2. Verify only 5 FAQ items show (not duplicates)"
echo "3. Click 'VALIDATE FIX' in Google Search Console"
ENDSSH

echo ""
echo "✅ Deployment complete!"

#!/bin/bash
echo "Checking production server schema status..."

ssh -o StrictHostKeyChecking=no shieldwisesecurity@31.220.57.141 << 'REMOTE'
cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com

echo "=== Checking how many FAQ schemas exist ==="
grep -c "@type.*FAQPage" views/index.ejs || echo "0"

echo ""
echo "=== Checking video embedUrl ==="
grep -A1 "embedUrl" views/index.ejs | head -2

echo ""
echo "=== Showing all JSON-LD script blocks ==="
grep -n "application/ld+json" views/index.ejs

REMOTE

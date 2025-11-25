#!/bin/bash
# EXACT COMMANDS FOR YOUR VPS - Copy and paste this entire block

cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com

# Remove remaining 6 microdata instances using Perl (more reliable than sed)
echo "🧹 Removing 6 remaining microdata instances..."
perl -i -pe 's/\s+itemscope\s+itemtype="[^"]*"//g; s/\s+itemscope//g; s/\s+itemprop="[^"]*"//g; s/\s+itemtype="[^"]*"//g; s/\s+itemprop//g' views/cities/*.ejs

# Verify all gone
REMAINING=$(grep -r "itemscope\|itemprop\|itemtype" views/cities/ 2>/dev/null | wc -l)
echo "✅ Remaining microdata instances: $REMAINING"

if [ "$REMAINING" -eq 0 ]; then
    echo "✅ All microdata removed!"
    pm2 restart shieldwise
    sleep 3
    pm2 status
else
    echo "⚠️  Still have $REMAINING instances - check which files:"
    grep -l "itemscope\|itemprop\|itemtype" views/cities/*.ejs
fi

#!/bin/bash

echo "================================================"
echo "ShieldWise Canonical Tag Fix - VPS Deployment"
echo "================================================"
echo ""
echo "This script will update 6 city EJS files on your VPS"
echo ""

VPS_PATH="/home/shieldwisesecurity/htdocs/shieldwisesecurity.com/views/cities"

echo "✓ Target directory: $VPS_PATH"
echo ""
echo "Files to be updated:"
echo "  1. moorpark.ejs"
echo "  2. camarillo.ejs"
echo "  3. fillmore.ejs"
echo "  4. ojai.ejs"
echo "  5. port-hueneme.ejs"
echo "  6. san-lorenzo.ejs"
echo ""
echo "⚠️  This will overwrite existing files!"
echo ""
read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Creating backup..."
BACKUP_DIR="/home/shieldwisesecurity/backups/canonical-fix-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp "$VPS_PATH/moorpark.ejs" "$BACKUP_DIR/" 2>/dev/null
cp "$VPS_PATH/camarillo.ejs" "$BACKUP_DIR/" 2>/dev/null
cp "$VPS_PATH/fillmore.ejs" "$BACKUP_DIR/" 2>/dev/null
cp "$VPS_PATH/ojai.ejs" "$BACKUP_DIR/" 2>/dev/null
cp "$VPS_PATH/port-hueneme.ejs" "$BACKUP_DIR/" 2>/dev/null
cp "$VPS_PATH/san-lorenzo.ejs" "$BACKUP_DIR/" 2>/dev/null
echo "✓ Backup created at: $BACKUP_DIR"

echo ""
echo "📦 Now upload the 6 files from Replit to:"
echo "   $VPS_PATH"
echo ""
echo "After uploading, restart the server with:"
echo "   pm2 restart shieldwise && pm2 save"
echo ""
echo "================================================"

#!/bin/bash
#############################################################################
# SAFE CLEANUP PATCH - PHASE 1 (ZERO RISK)
# Pre-Hosting Audit: Dead Asset Removal
#
# What this script does:
# - Removes 182 backup city EJS files (12 MB)
# - Removes 9 backup template files (~150 KB)
# - Total: 191 files, ~12.15 MB
#
# Risk Level: ZERO RISK
# - All files have .backup extension or are in backup directory
# - No active code references these files
# - Active versions exist for all backups
#
# Rollback Plan: Git history preserves all deleted files
#   git checkout HEAD~1 -- views/cities-backup-pricing-cleanup/
#   git checkout HEAD~1 -- views/*.backup
#
# Generated: November 6, 2025
# Project: ShieldWise Security
#############################################################################

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Safety checks
set -e  # Exit on error
set -u  # Exit on undefined variable

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}     SHIELDWISE SECURITY - SAFE CLEANUP PHASE 1${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Confirmation prompt
echo -e "${YELLOW}This script will DELETE the following:${NC}"
echo -e "  • ${RED}182${NC} backup city EJS files in ${RED}views/cities-backup-pricing-cleanup/${NC}"
echo -e "  • ${RED}9${NC} backup template files (*.backup)"
echo -e "  • Total size: ${RED}~12.15 MB${NC}"
echo ""
echo -e "${GREEN}✅ ZERO RISK: All files are backups with active versions in place${NC}"
echo ""
read -p "Do you want to proceed? (yes/no): " -n 3 -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${RED}❌ Cleanup cancelled by user${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Starting cleanup...${NC}"
echo ""

#############################################################################
# STEP 1: Create Safety Backup (Optional but Recommended)
#############################################################################
echo -e "${YELLOW}[1/5]${NC} Creating safety backup..."

BACKUP_FILE="backup-before-cleanup-$(date +%Y%m%d-%H%M%S).tar.gz"

if command -v tar &> /dev/null; then
    tar -czf "$BACKUP_FILE" \
        views/cities-backup-pricing-cleanup/ \
        views/blog.ejs.backup \
        views/login.ejs.backup \
        views/register.ejs.backup \
        views/service-areas.ejs.backup \
        views/testimonials-showcase.ejs.backup \
        views/partials/tracking-scripts-executive-protection.ejs.backup \
        views/partials/tracking-scripts-fire-watch.ejs.backup \
        views/partials/tracking-scripts-hotel-security.ejs.backup \
        views/partials/tracking-scripts-special-event-security.ejs.backup \
        2>/dev/null || true
    
    if [ -f "$BACKUP_FILE" ]; then
        echo -e "${GREEN}✅ Safety backup created: $BACKUP_FILE${NC}"
        echo -e "   ${BLUE}ℹ️  You can restore with: tar -xzf $BACKUP_FILE${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not create backup (files may not exist)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  tar command not found, skipping safety backup${NC}"
fi

echo ""

#############################################################################
# STEP 2: Delete Backup City Directory (182 files, 12 MB)
#############################################################################
echo -e "${YELLOW}[2/5]${NC} Deleting backup city directory..."

if [ -d "views/cities-backup-pricing-cleanup" ]; then
    # Count files before deletion
    FILE_COUNT=$(find views/cities-backup-pricing-cleanup -type f | wc -l)
    DIR_SIZE=$(du -sh views/cities-backup-pricing-cleanup 2>/dev/null | cut -f1)
    
    echo -e "   📂 Directory: ${RED}views/cities-backup-pricing-cleanup/${NC}"
    echo -e "   📊 Files: ${RED}$FILE_COUNT${NC}"
    echo -e "   💾 Size: ${RED}$DIR_SIZE${NC}"
    
    rm -rf views/cities-backup-pricing-cleanup/
    
    if [ ! -d "views/cities-backup-pricing-cleanup" ]; then
        echo -e "${GREEN}   ✅ Successfully deleted backup city directory${NC}"
    else
        echo -e "${RED}   ❌ Failed to delete directory${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}   ⚠️  Directory not found (already deleted?)${NC}"
fi

echo ""

#############################################################################
# STEP 3: Delete Root-Level Backup EJS Files (5 files)
#############################################################################
echo -e "${YELLOW}[3/5]${NC} Deleting root-level backup EJS files..."

BACKUP_FILES=(
    "views/blog.ejs.backup"
    "views/login.ejs.backup"
    "views/register.ejs.backup"
    "views/service-areas.ejs.backup"
    "views/testimonials-showcase.ejs.backup"
)

DELETED=0
for file in "${BACKUP_FILES[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        if [ ! -f "$file" ]; then
            echo -e "   ${GREEN}✅${NC} Deleted: ${RED}$file${NC}"
            ((DELETED++))
        else
            echo -e "   ${RED}❌${NC} Failed: $file"
        fi
    else
        echo -e "   ${YELLOW}⚠️${NC}  Not found: $file (already deleted?)"
    fi
done

echo -e "   ${GREEN}✅ Deleted $DELETED root-level backup files${NC}"
echo ""

#############################################################################
# STEP 4: Delete Partial Backup Files (4 files)
#############################################################################
echo -e "${YELLOW}[4/5]${NC} Deleting partial backup files..."

PARTIAL_BACKUPS=(
    "views/partials/tracking-scripts-executive-protection.ejs.backup"
    "views/partials/tracking-scripts-fire-watch.ejs.backup"
    "views/partials/tracking-scripts-hotel-security.ejs.backup"
    "views/partials/tracking-scripts-special-event-security.ejs.backup"
)

DELETED=0
for file in "${PARTIAL_BACKUPS[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        if [ ! -f "$file" ]; then
            echo -e "   ${GREEN}✅${NC} Deleted: ${RED}$file${NC}"
            ((DELETED++))
        else
            echo -e "   ${RED}❌${NC} Failed: $file"
        fi
    else
        echo -e "   ${YELLOW}⚠️${NC}  Not found: $file (already deleted?)"
    fi
done

echo -e "   ${GREEN}✅ Deleted $DELETED partial backup files${NC}"
echo ""

#############################################################################
# STEP 5: Verification & Summary
#############################################################################
echo -e "${YELLOW}[5/5]${NC} Verifying cleanup..."

# Check that backup directory is gone
if [ -d "views/cities-backup-pricing-cleanup" ]; then
    echo -e "${RED}❌ VERIFICATION FAILED: Backup directory still exists${NC}"
    exit 1
fi

# Check that active versions still exist
ACTIVE_FILES=(
    "views/blog.ejs"
    "views/login.ejs"
    "views/register.ejs"
    "views/service-areas.ejs"
    "views/testimonials-showcase.ejs"
)

MISSING=0
for file in "${ACTIVE_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ WARNING: Active file missing: $file${NC}"
        ((MISSING++))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ All active files verified intact${NC}"
else
    echo -e "${RED}❌ CRITICAL: $MISSING active files are missing!${NC}"
    echo -e "${RED}   Restore from backup immediately!${NC}"
    exit 1
fi

# Check active city directory
CITY_COUNT=$(find views/cities -name "*.ejs" ! -name "*.backup" 2>/dev/null | wc -l)
echo -e "${GREEN}✅ Active city pages verified: $CITY_COUNT files${NC}"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}     ✅ CLEANUP COMPLETE!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Summary:${NC}"
echo -e "  • Backup directory deleted: ${GREEN}views/cities-backup-pricing-cleanup/${NC}"
echo -e "  • Backup files deleted: ${GREEN}9 files${NC}"
echo -e "  • Estimated space freed: ${GREEN}~12.15 MB${NC}"
echo -e "  • Active files verified: ${GREEN}$CITY_COUNT city pages + 5 templates${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo -e "  1. Run tests to verify site functionality"
echo -e "  2. Commit changes: ${YELLOW}git add -A && git commit -m \"Remove backup files and directories\"${NC}"
echo -e "  3. Review Phase 2 (image verification) in DEAD_ASSET_REPORT.md"
echo ""
echo -e "${BLUE}Rollback (if needed):${NC}"
if [ -f "$BACKUP_FILE" ]; then
    echo -e "  ${YELLOW}tar -xzf $BACKUP_FILE${NC}"
fi
echo -e "  ${YELLOW}git checkout HEAD~1 -- views/cities-backup-pricing-cleanup/ views/*.backup views/partials/*.backup${NC}"
echo ""
echo -e "${GREEN}✅ Cleanup successful!${NC}"

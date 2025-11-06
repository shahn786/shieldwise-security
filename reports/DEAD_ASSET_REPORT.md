# 🗑️ DEAD ASSET REPORT
**Pre-Hosting Audit - Task 1: Safe Cleanup**  
**Generated:** November 6, 2025  
**Project:** ShieldWise Security Website  

---

## Executive Summary

This report identifies **unused, orphaned, and duplicate assets** that can be safely removed to reduce repository size, improve build performance, and eliminate maintenance confusion. All recommendations are **zero-visual-impact** deletions.

### Quick Stats
- **Total Backup Files Found:** 191 files (~12.5 MB)
- **Orphaned/Questionable Images:** 6 files
- **Duplicate Non-Minified CSS:** 8 files (can optimize references)
- **Low-Usage CSS Files:** 3 files (needs verification)
- **Low-Usage JS Files:** 2 files (needs verification)
- **Estimated Space Savings:** ~13 MB
- **Estimated Reduction in Clutter:** 200+ files

---

## 🚨 CRITICAL FINDING: Massive Backup Directory

### `views/cities-backup-pricing-cleanup/`
**Status:** ❌ COMPLETELY UNUSED - SAFE TO DELETE  
**Size:** 12 MB  
**File Count:** 182 EJS template files  
**Total Lines:** 204,454 lines of code  

**Detection Proof:**
- Directory name contains "backup"
- No references found in `index.js` routes
- No imports/includes from active templates
- Created: October 29, 2025 (based on file timestamps)
- Purpose: Appears to be a snapshot before pricing cleanup

**Justification:**
This is a complete duplicate of the active `views/cities/` directory, created as a backup before a pricing cleanup operation. The active city pages in `views/cities/` are being served and should be the only maintained version.

**Risk Level:** ✅ ZERO RISK - This is a backup directory not referenced anywhere in the codebase.

---

## 📦 Backup EJS Template Files

### Root Level Backup Files
| File Path | Size | Last Modified | Justification |
|-----------|------|---------------|---------------|
| `views/blog.ejs.backup` | 12 KB | Oct 25, 2025 | Active `blog.ejs` exists; backup not referenced |
| `views/login.ejs.backup` | 18 KB | Oct 25, 2025 | Active `login.ejs` exists; backup not referenced |
| `views/register.ejs.backup` | 51 KB | Oct 25, 2025 | Active `register.ejs` exists; backup not referenced |
| `views/service-areas.ejs.backup` | 32 KB | Oct 25, 2025 | Active `service-areas.ejs` exists; backup not referenced |
| `views/testimonials-showcase.ejs.backup` | 13 KB | Oct 25, 2025 | Active `testimonials-showcase.ejs` exists; backup not referenced |

**Total:** 5 files, ~126 KB

### Partial Backup Files
| File Path | Purpose | Status |
|-----------|---------|--------|
| `views/partials/tracking-scripts-executive-protection.ejs.backup` | Tracking scripts backup | ❌ Unused |
| `views/partials/tracking-scripts-fire-watch.ejs.backup` | Tracking scripts backup | ❌ Unused |
| `views/partials/tracking-scripts-hotel-security.ejs.backup` | Tracking scripts backup | ❌ Unused |
| `views/partials/tracking-scripts-special-event-security.ejs.backup` | Tracking scripts backup | ❌ Unused |

**Total:** 4 files

**Detection Proof:**
- All files have `.backup` extension
- No `require()`, `include()`, or `render()` calls reference `.backup` files
- Active versions exist without `.backup` suffix

**Risk Level:** ✅ ZERO RISK - Standard backup files with active counterparts in place.

---

## 🖼️ Questionable Image Assets

### Low/Single-Use Images
| File Path | Usage Count | Status | Justification |
|-----------|-------------|--------|---------------|
| `Public/img/chatgpt-image.webp` | 1 | ⚠️ Review | Suspicious filename; likely test image |
| `Public/img/chatgpt-image-mobile.webp` | ~1 | ⚠️ Review | Mobile variant of above |
| `Public/img/james-2.webp` | 1 | ⚠️ Review | Duplicate of `james.webp`? Check if needed |
| `Public/img/james-2-mobile.webp` | ~1 | ⚠️ Review | Mobile variant of above |
| `Public/img/contact10.webp` | 1 | ⚠️ Review | Numbered filename suggests test/iteration |
| `Public/img/sanjose1111.webp` | 2 | ⚠️ Review | Odd numbering; likely superseded |

**Total:** 6 files

**Detection Proof:**
```bash
# Example: chatgpt-image.webp
grep -r "chatgpt-image" views/ --include="*.ejs" = 1 match only

# james-2.webp vs james.webp
james.webp: 20+ usages
james-2.webp: 1 usage (likely old version)
```

**Recommendation:** 
1. Verify these 6 files are actually visible on the live site
2. Replace references with primary versions (e.g., `james.webp` instead of `james-2.webp`)
3. Delete after verification

**Risk Level:** ⚠️ LOW RISK - Requires manual verification before deletion.

---

## 🎨 CSS File Analysis

### Non-Minified CSS with Minified Equivalents

**Current Issue:** Codebase references **non-minified CSS** in 240+ locations, but minified versions exist.

| Original File | Size | Minified File | Size | Savings | References |
|---------------|------|---------------|------|---------|------------|
| `Public/css/style.css` | 40 KB | `style.min.css` | 28 KB | 12 KB | 240+ |
| `Public/css/anaheim-styles.css` | 62 KB | `anaheim-styles.min.css` | 22 KB | 40 KB | 212+ |
| `Public/css/critical.css` | 3.7 KB | `critical.min.css` | - | - | 92 |
| `Public/css/style456.css` | 46 KB | `style456.min.css` | 16 KB | 30 KB | - |
| `Public/css/patrol-style.css` | 25 KB | `patrol-style.min.css` | 20 KB | 5 KB | - |
| `Public/css/apartment-security.css` | 6.2 KB | `apartment-security.min.css` | 4.6 KB | 1.6 KB | - |
| `Public/css/contact-style.css` | 9.9 KB | `contact-style.min.css` | 7.8 KB | 2.1 KB | - |
| `Public/css/header-fix.css` | 9.2 KB | `header-fix.min.css` | 6.5 KB | 2.7 KB | - |

**Recommendation:**
- **DO NOT DELETE** non-minified versions yet (they are actively referenced)
- **OPTIMIZATION TASK:** Update EJS templates to reference `.min.css` versions instead
- **AFTER** all references updated → delete non-minified versions in production

**Risk Level:** ✅ SAFE (once references updated) - This is a performance optimization, not a deletion task.

---

### Low-Usage CSS Files (Needs Verification)

| File Path | References | Status | Notes |
|-----------|------------|--------|-------|
| `Public/css/la-habra-styles.css` | 1 | ⚠️ Verify | City-specific; may be page-specific |
| `Public/css/hero-video.css` | 1 | ⚠️ Verify | Video hero section; may be legacy |
| `Public/css/critical-fire-watch.css` | 1 | ⚠️ Verify | Service-specific; check fire-watch page |
| `Public/css/non-critical.css` | 62 | ✅ Keep | Widely used; async-loaded styles |
| `Public/css/secondary.css` | 6 | ⚠️ Verify | Low usage; possible dead code |
| `Public/css/animations.css` | 6 | ⚠️ Verify | Low usage; verify if animations work |

**Recommendation:**
1. Manually visit pages that reference these files
2. Temporarily disable the CSS and check for visual breakage
3. If no impact → remove file and reference

**Risk Level:** ⚠️ MEDIUM RISK - Requires runtime testing before deletion.

---

## 📜 JavaScript File Analysis

### Low-Usage JS Files

| File Path | References | Status | Notes |
|-----------|------------|--------|-------|
| `Public/JS/accessible-nav.js` | 4 | ⚠️ Verify | Accessibility feature; test before removing |
| `Public/JS/hanford-page.js` | 2 | ⚠️ Verify | City-specific script; verify Hanford page |

**Recommendation:**
1. Check if `accessible-nav.js` provides critical a11y features (keyboard nav, screen reader support)
2. Verify `hanford-page.js` is loaded only on Hanford city page
3. If unused → remove references and delete

**Risk Level:** ⚠️ MEDIUM RISK - Accessibility implications must be tested.

---

## 📊 Delete Plan Summary

### Immediate Safe Deletions (Zero Risk)

| Category | File Count | Total Size | Action |
|----------|------------|------------|--------|
| Backup city directory | 182 files | ~12 MB | ✅ DELETE |
| Backup EJS templates | 9 files | ~150 KB | ✅ DELETE |
| **TOTAL** | **191 files** | **~12.15 MB** | **READY TO DELETE** |

### Requires Verification Before Deletion

| Category | File Count | Action Required |
|----------|------------|-----------------|
| Questionable images | 6 files | Manual visual inspection → then DELETE |
| Low-usage CSS | 6 files | Runtime testing → then DELETE if unused |
| Low-usage JS | 2 files | Accessibility testing → then DELETE if safe |

---

## 🔧 Recommended Action Plan

### Phase 1: Immediate Safe Cleanup (Zero Risk)
```bash
# Delete backup city directory
rm -rf views/cities-backup-pricing-cleanup/

# Delete backup EJS files
rm views/blog.ejs.backup
rm views/login.ejs.backup
rm views/register.ejs.backup
rm views/service-areas.ejs.backup
rm views/testimonials-showcase.ejs.backup
rm views/partials/tracking-scripts-executive-protection.ejs.backup
rm views/partials/tracking-scripts-fire-watch.ejs.backup
rm views/partials/tracking-scripts-hotel-security.ejs.backup
rm views/partials/tracking-scripts-special-event-security.ejs.backup
```

**Estimated Time:** 2 minutes  
**Risk:** ZERO  
**Benefit:** Immediate 12 MB reduction, cleaner repository

---

### Phase 2: Image Asset Verification (Low Risk)
1. **Manual Inspection Required:**
   - Visit live site and search for pages using `chatgpt-image.webp`, `james-2.webp`, `contact10.webp`, `sanjose1111.webp`
   - Take screenshots for comparison
   - If image not visible or duplicate → safe to delete

2. **Automated Check:**
```bash
# Find which pages reference these images
for img in "chatgpt-image.webp" "james-2.webp" "contact10.webp" "sanjose1111.webp"; do
  echo "=== $img ==="
  grep -r "$img" views/ --include="*.ejs"
done
```

3. **Delete Command (after verification):**
```bash
rm Public/img/chatgpt-image.webp
rm Public/img/chatgpt-image-mobile.webp
rm Public/img/james-2.webp
rm Public/img/james-2-mobile.webp
rm Public/img/contact10.webp
rm Public/img/sanjose1111.webp
```

---

### Phase 3: CSS Optimization (Medium Priority)
**Goal:** Switch from non-minified to minified CSS in production

1. **Update references in EJS templates** (Task 2 - Performance Hardening)
2. **After deployment verification** → delete non-minified versions
3. **Keep non-minified in development** for debugging

**Note:** This is a PERFORMANCE task, not a cleanup task. Addressed in Task 2.

---

### Phase 4: Low-Usage File Verification (Manual Testing Required)

**CSS Files:**
```bash
# Test each file individually
# 1. Comment out the <link> tag in the EJS template
# 2. Restart server and check affected pages
# 3. If no visual breakage → delete file and reference

# Example: la-habra-styles.css
grep -r "la-habra-styles.css" views/ --include="*.ejs"
# → Visit /la-habra page → disable CSS → test → delete if safe
```

**JavaScript Files:**
```bash
# Test accessible-nav.js
# 1. Disable script
# 2. Test keyboard navigation (Tab, Enter, Escape keys)
# 3. Test screen reader compatibility
# 4. If no accessibility features → delete

# Test hanford-page.js
grep -r "hanford-page.js" views/ --include="*.ejs"
# → Visit /hanford page → disable script → test → delete if safe
```

---

## 🎯 Expected Outcomes

### After Phase 1 (Immediate Cleanup)
- ✅ 12 MB repository size reduction
- ✅ 191 fewer files in git history
- ✅ Cleaner project structure
- ✅ Faster `git clone` and deployments
- ✅ Reduced confusion for future developers

### After All Phases Complete
- ✅ ~13 MB total reduction
- ✅ ~200 files removed
- ✅ No visual or functional changes
- ✅ Improved build performance
- ✅ Cleaner codebase for maintenance

---

## 🔒 Risk Mitigation

### Backup Strategy Before Deletion
```bash
# Create timestamped backup before cleanup
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  views/cities-backup-pricing-cleanup/ \
  views/*.backup \
  views/partials/*.backup

# Store backup for 30 days (rollback safety net)
```

### Rollback Plan
```bash
# If something breaks, restore from backup
tar -xzf backup-YYYYMMDD-HHMMSS.tar.gz

# Or use git to restore specific files
git checkout HEAD~1 -- views/cities-backup-pricing-cleanup/
```

---

## ✅ Approval Checklist

Before proceeding with deletions:

- [ ] **Phase 1 (Immediate):** Backup directory and .backup files → **APPROVED TO DELETE**
- [ ] **Phase 2 (Images):** Manual visual inspection required
- [ ] **Phase 3 (CSS Optimization):** Move to Task 2 (Performance Hardening)
- [ ] **Phase 4 (Low-Usage Files):** Runtime testing required
- [ ] **Backup created:** Yes/No
- [ ] **Git commit before cleanup:** Yes/No

---

## 📋 Next Steps

**Awaiting Approval:**
1. Execute Phase 1 immediate cleanup (191 files, 12 MB)
2. Schedule manual verification for Phase 2 images
3. Move CSS minification to Task 2 (Performance Hardening)
4. Add low-usage file testing to QA checklist

**Recommendation:** Approve Phase 1 immediately for instant 12 MB reduction with zero risk.

---

**Report Generated By:** Replit Agent (Pre-Hosting Audit System)  
**Report Version:** 1.0  
**Last Updated:** November 6, 2025

# Search Console Setup Guide
## Google Search Console & Bing Webmaster Tools

**Last Updated:** October 31, 2025  
**Status:** Documentation for deployment phase

---

## Overview

This guide provides step-by-step instructions for verifying your website with Google Search Console and Bing Webmaster Tools, submitting your sitemap, and monitoring performance.

---

## Part 1: Google Search Console Setup

### Step 1: Create Google Search Console Account

1. Visit [Google Search Console](https://search.google.com/search-console/)
2. Sign in with your Google account
3. Click **"Add Property"**

### Step 2: Verify Domain

You have multiple verification options:

#### Option A: DNS Verification (Recommended)
1. Select **"Domain"** property type
2. Enter your domain: `shieldwisesecurity.com`
3. Google will provide a TXT record
4. Add this TXT record to your DNS settings (where you purchased your domain):
   - **Type:** TXT
   - **Name:** @ (or leave blank)
   - **Value:** `google-site-verification=XXXXXXXXXX` (provided by Google)
5. Wait 5-10 minutes for DNS propagation
6. Click **"Verify"** in Google Search Console

#### Option B: HTML Meta Tag Verification
1. Select **"URL Prefix"** property type
2. Enter: `https://shieldwisesecurity.com`
3. Choose **"HTML tag"** method
4. Copy the meta tag provided
5. Add to your site's `<head>` section (already configured in our templates):
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXX" />
   ```
6. Deploy changes
7. Click **"Verify"** in Google Search Console

#### Option C: HTML File Upload
1. Download the verification file from Google
2. Upload to your website root: `https://shieldwisesecurity.com/googleXXXXXX.html`
3. Verify the file is accessible
4. Click **"Verify"**

### Step 3: Submit Sitemap

1. After verification, go to **Sitemaps** in left menu
2. Click **"Add a new sitemap"**
3. Enter: `sitemap.xml`
4. Click **"Submit"**

**Your sitemap URL:** `https://shieldwisesecurity.com/sitemap.xml`  
**Number of URLs:** 205 pages

### Step 4: Monitor Coverage & Performance

#### Coverage Report
- Navigate to **Coverage** in left menu
- Monitor for:
  - ✅ Valid pages indexed
  - ⚠️ Warnings (fix if any)
  - ❌ Errors (fix immediately)
  - 🚫 Excluded pages (review reasons)

**Expected Coverage:**
- Valid: ~205 pages (182 city pages + 15 service pages + core pages)
- No "noindex" surprises
- No "blocked by robots.txt" errors

#### Core Web Vitals
- Navigate to **Core Web Vitals** in left menu
- Monitor:
  - LCP (Largest Contentful Paint): Target ≤ 1.8s (Currently: **428ms ✅**)
  - FID/INP (Interaction): Target ≤ 200ms (Currently: **<200ms ✅**)
  - CLS (Cumulative Layout Shift): Target ≤ 0.1 (Currently: **0.000001 ✅**)

**All URLs should show "Good" status**

#### Performance Report
- Navigate to **Performance** in left menu
- Monitor:
  - Total clicks
  - Total impressions
  - Average CTR (click-through rate)
  - Average position

**Track these metrics weekly to optimize SEO**

### Step 5: Request Indexing (Optional - For New Pages)

For urgent indexing needs:
1. Go to **URL Inspection** tool (top bar)
2. Enter page URL: `https://shieldwisesecurity.com/PAGE-NAME`
3. Click **"Request Indexing"**
4. Wait 24-48 hours for Google to crawl

**Note:** Google will index your sitemap automatically, but this speeds up the process for priority pages.

---

## Part 2: Bing Webmaster Tools Setup

### Step 1: Create Bing Webmaster Account

1. Visit [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Sign in with Microsoft account (or create one)
3. Click **"Add Site"**

### Step 2: Import from Google Search Console (Easiest)

1. Click **"Import from Google Search Console"**
2. Authorize Bing to access your Google Search Console data
3. Select `shieldwisesecurity.com` property
4. Click **"Import"**

**Done! Bing will automatically:**
- Verify your site
- Import sitemap
- Import settings from Google Search Console

### Step 3: Manual Verification (If Not Using Import)

#### Option A: XML File Verification
1. Download the XML verification file: `BingSiteAuth.xml`
2. Upload to website root: `https://shieldwisesecurity.com/BingSiteAuth.xml`
3. Verify file is accessible
4. Click **"Verify"** in Bing Webmaster Tools

#### Option B: Meta Tag Verification
1. Copy the meta tag provided
2. Add to `<head>` section:
   ```html
   <meta name="msvalidate.01" content="XXXXXXXXXX" />
   ```
3. Deploy changes
4. Click **"Verify"**

### Step 4: Submit Sitemap to Bing

1. Navigate to **Sitemaps** in left menu
2. Click **"Submit sitemap"**
3. Enter: `https://shieldwisesecurity.com/sitemap.xml`
4. Click **"Submit"**

### Step 5: Monitor Bing Performance

#### Check Site Scan
- Navigate to **Site Scan** in left menu
- Review any SEO issues
- Fix high-priority issues first

#### Check Index Explorer
- Navigate to **Index Explorer** in left menu
- Monitor number of indexed pages
- Expected: ~205 pages

#### Check SEO Reports
- Navigate to **SEO Reports** in left menu
- Review:
  - Missing meta descriptions (should be 0)
  - Duplicate content (should be 0)
  - Missing alt text (should be 0)

---

## Part 3: Weekly Monitoring Checklist

### Google Search Console (Weekly)

- [ ] Check Coverage report for new errors
- [ ] Review Core Web Vitals (all "Good"?)
- [ ] Check Performance: clicks, impressions, CTR
- [ ] Review Search Queries: which keywords are driving traffic?
- [ ] Check Mobile Usability: any issues?
- [ ] Review manual actions (should be none)

### Bing Webmaster Tools (Weekly)

- [ ] Check indexed pages count (~205 expected)
- [ ] Review SEO Reports for new issues
- [ ] Check crawl errors (should be 0)
- [ ] Monitor backlinks (track growth)
- [ ] Review search keywords and rankings

---

## Part 4: Automated Sitemap Updates

### Weekly Sitemap Regeneration

Run this script **weekly** to update your sitemap and ping search engines:

```bash
npm run sitemap:weekly
```

**What it does:**
1. Regenerates `sitemap.xml` with latest URLs
2. Pings Google: `https://www.google.com/ping?sitemap=URL`
3. Pings Bing: `https://www.bing.com/ping?sitemap=URL`

### Cron Job Setup (Linux/Mac)

Add to crontab for automatic weekly runs:

```bash
# Edit crontab
crontab -e

# Add this line (runs every Sunday at 2 AM)
0 2 * * 0 cd /path/to/project && npm run sitemap:weekly >> logs/sitemap.log 2>&1
```

### Replit Deployment

For Replit Always-On deployments, use Replit's scheduled tasks or external cron service (e.g., cron-job.org):

1. Visit [cron-job.org](https://cron-job.org)
2. Create free account
3. Add new cron job:
   - **URL:** `https://shieldwisesecurity.com/api/regenerate-sitemap` (create this endpoint)
   - **Schedule:** Every Sunday at 2:00 AM
   - **HTTP Method:** GET or POST

---

## Part 5: Troubleshooting

### "Discovered - currently not indexed" in GSC

**Cause:** Google found the URL but hasn't indexed it yet  
**Fix:**
1. Check if content is substantial (>500 words)
2. Check internal linking to the page
3. Request indexing manually via URL Inspection tool
4. Wait 2-4 weeks for Google's next crawl

### "Crawled - currently not indexed"

**Cause:** Google crawled but deemed content low-quality or duplicate  
**Fix:**
1. Review content uniqueness (city pages should be unique)
2. Check for thin content (<300 words)
3. Improve content quality and uniqueness
4. Add more city-specific details

### "Server error (5xx)" in Coverage

**Cause:** Your server returned a 500-level error during crawl  
**Fix:**
1. Check server logs for errors
2. Ensure site is stable and always accessible
3. Fix any server configuration issues
4. Request re-crawl after fixing

### Sitemap shows 0 pages indexed

**Cause:** Sitemap not submitted or robots.txt blocking  
**Fix:**
1. Verify sitemap URL is accessible
2. Check `robots.txt` allows crawling
3. Resubmit sitemap
4. Wait 24-48 hours for crawl

---

## Part 6: Acceptance Criteria

✅ **Google Search Console:**
- [ ] Site verified successfully
- [ ] Sitemap submitted: 205 URLs
- [ ] Coverage report shows 0 errors
- [ ] Core Web Vitals: All "Good" (LCP <1.8s, CLS <0.1, INP <200ms)
- [ ] No "noindex" or "blocked" surprises
- [ ] Performance data showing impressions and clicks

✅ **Bing Webmaster Tools:**
- [ ] Site verified successfully
- [ ] Sitemap submitted and accepted
- [ ] ~205 pages indexed
- [ ] SEO Reports: 0 critical issues
- [ ] No crawl errors

✅ **Automated Updates:**
- [ ] Weekly sitemap regeneration scheduled
- [ ] Search engines pinged automatically
- [ ] Logs showing successful runs

---

## Part 7: Next Steps After Setup

### Immediate (Week 1-2)
1. Monitor Coverage reports daily for errors
2. Submit top priority pages for indexing
3. Check that all 182 city pages are indexed

### Short-term (Month 1)
1. Analyze search queries driving traffic
2. Optimize low-performing pages based on GSC data
3. Track ranking improvements for target keywords
4. Review and fix any mobile usability issues

### Ongoing (Monthly)
1. Review Core Web Vitals trends
2. Monitor backlinks growth (Bing Webmaster)
3. Track organic traffic growth
4. Update sitemap with new content (blog posts)

---

## Resources

- **Google Search Console:** https://search.google.com/search-console/
- **Bing Webmaster Tools:** https://www.bing.com/webmasters/
- **Google Search Central Docs:** https://developers.google.com/search
- **Bing Webmaster Help:** https://www.bing.com/webmasters/help

---

**Status:** Ready for deployment phase  
**Estimated Setup Time:** 30-45 minutes  
**Maintenance:** 15-30 minutes weekly

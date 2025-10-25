# SEO Implementation Guide
## How to Integrate SEO Partials into ShieldWise Security Pages

**Date:** October 25, 2025  
**Status:** Ready for Integration

---

## Overview

Comprehensive SEO infrastructure has been created including canonical tags, Open Graph/Twitter Cards, LocalBusiness schema, FAQPage schema, and Google Analytics. This guide explains how to integrate these components into your pages.

---

## 📁 Files Created

### SEO Partials (views/partials/)
1. **seo-head.ejs** - Comprehensive SEO partial (canonical + social meta + schemas + analytics)
2. canonical.ejs - Standalone canonical tag (deprecated - use seo-head.ejs)
3. social-meta.ejs - Standalone social tags (deprecated - use seo-head.ejs)
4. local-business-schema.ejs - Standalone LocalBusiness schema (deprecated - use seo-head.ejs)
5. faq-schema.ejs - Standalone FAQ schema (deprecated - use seo-head.ejs)
6. google-analytics.ejs - Standalone GA4 (deprecated - use seo-head.ejs)

### Infrastructure Files
- **robots.txt** - Search engine crawler instructions (root directory)
- **sitemap.xml** - Complete site map with 214 URLs (root directory)

### Documentation
- **reports/seo-audit.md** - Comprehensive SEO analysis and recommendations

---

## 🚀 Quick Start: Using seo-head.ejs

The **seo-head.ejs** partial combines all SEO elements into one reusable component.

### Step 1: Add to <head> Section

In any EJS template, add this line in the `<head>` section:

```ejs
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page-specific title and meta description -->
    <title>Your Page Title Here</title>
    <meta name="description" content="Your page description here">
    
    <!-- SEO Head Partial - Canonical, Social Meta, Schemas, Analytics -->
    <%- include('partials/seo-head', { 
      canonicalPath: '/services/armed-security',
      pageTitle: 'Armed Security Guards California | ShieldWise',
      pageDescription: 'Professional armed security guards in California. Licensed, trained, and insured guards providing 24/7 protection.',
      pageImage: 'https://shieldwisesecurity.com/img/armsecurity.webp',
      includeFAQ: false
    }) %>
    
    <!-- Rest of your head content -->
</head>
```

### Step 2: Configure Variables

The seo-head partial accepts these variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `canonicalPath` | **Yes** | `/` | Page path (e.g., `/services/armed-security`) |
| `pageTitle` | No | Default title | Title for social sharing (55-60 chars) |
| `pageDescription` | No | Default desc | Description for social sharing (150-160 chars) |
| `pageImage` | No | Default image | Full URL to page's social share image (1200x630px) |
| `includeFAQ` | No | `false` | Set to `true` to include FAQPage schema |

---

## 📋 Implementation Examples

### Example 1: Homepage

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>California's #1 Security Company | ShieldWise Security</title>
    <meta name="description" content="California's top security company. Licensed armed & unarmed guards, 24/7 protection across Los Angeles, Orange County & all CA.">
    
    <%- include('partials/seo-head', { 
      canonicalPath: '/',
      pageTitle: 'California\'s #1 Security Company | ShieldWise Security',
      pageDescription: 'California\'s top security company. Licensed armed & unarmed guards, 24/7 protection across Los Angeles, Orange County & all CA.',
      pageImage: 'https://shieldwisesecurity.com/img/California_SecurityGuards.webp',
      includeFAQ: true
    }) %>
    
    <!-- Other head content -->
</head>
<body>
    <!-- Page content -->
</body>
</html>
```

**Result:**
- ✅ Canonical: `https://shieldwisesecurity.com/`
- ✅ Open Graph & Twitter Cards with custom title, description, image
- ✅ LocalBusiness JSON-LD schema
- ✅ FAQPage JSON-LD schema
- ✅ Google Analytics (if GA4 ID configured)

---

### Example 2: Service Page (Armed Security)

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Armed Security Guards California | ShieldWise</title>
    <meta name="description" content="Professional armed security guards in California. Licensed, insured, and highly trained for maximum protection.">
    
    <%- include('partials/seo-head', { 
      canonicalPath: '/services/armed-security',
      pageTitle: 'Armed Security Guards California | ShieldWise',
      pageDescription: 'Professional armed security guards in California. Licensed, insured, and highly trained for maximum protection.',
      pageImage: 'https://shieldwisesecurity.com/img/armsecurity.webp',
      includeFAQ: false
    }) %>
</head>
<body>
    <%- include('partials/Header') %>
    
    <!-- Page content -->
    
    <%- include('partials/Footer') %>
</body>
</html>
```

**Result:**
- ✅ Canonical: `https://shieldwisesecurity.com/services/armed-security`
- ✅ Custom social meta tags for this service
- ✅ LocalBusiness schema
- ✅ No FAQ schema (not needed on service pages)

---

### Example 3: City Page (Los Angeles)

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Security Guards Los Angeles CA | ShieldWise</title>
    <meta name="description" content="Professional security guards serving Los Angeles, CA. Armed & unarmed guards, 24/7 mobile patrol, event security. Fast deployment.">
    
    <%- include('partials/seo-head', { 
      canonicalPath: '/los-angeles',
      pageTitle: 'Security Guards Los Angeles CA | ShieldWise',
      pageDescription: 'Professional security guards serving Los Angeles, CA. Armed & unarmed guards, 24/7 mobile patrol, event security.',
      pageImage: 'https://shieldwisesecurity.com/img/California_SecurityGuards.webp',
      includeFAQ: false
    }) %>
</head>
<body>
    <!-- Content -->
</body>
</html>
```

**Result:**
- ✅ Canonical: `https://shieldwisesecurity.com/los-angeles`
- ✅ Location-specific social meta
- ✅ LocalBusiness schema (service area includes LA)

---

## 🔧 Backend Integration (Express Routes)

If you want to pass dynamic variables from your Express routes:

```javascript
// In your route handler
app.get('/services/armed-security', (req, res) => {
  res.render('services/armed-security', {
    canonicalPath: '/services/armed-security',
    pageTitle: 'Armed Security Guards California | ShieldWise',
    pageDescription: 'Professional armed security guards in California...',
    pageImage: 'https://shieldwisesecurity.com/img/armsecurity.webp',
    includeFAQ: false
  });
});
```

Then in your EJS template:

```ejs
<%- include('partials/seo-head', { 
  canonicalPath,
  pageTitle,
  pageDescription,
  pageImage,
  includeFAQ
}) %>
```

---

## 📝 Variable Guidelines

### canonicalPath
- **Format:** `/path/to/page` (leading slash, no trailing slash)
- **Homepage:** `/`
- **Service pages:** `/services/service-name`
- **City pages:** `/city-name` or `/county/city-name`
- **Never include:** Domain, query parameters, hash fragments

✅ Good: `/services/armed-security`  
❌ Bad: `https://shieldwisesecurity.com/services/armed-security/`  
❌ Bad: `/services/armed-security?utm_source=google`  

### pageTitle
- **Length:** 50-60 characters (including brand name)
- **Format:** `Primary Keyword | ShieldWise` or `Keyword | Service | ShieldWise`
- **Keywords:** Front-loaded
- **Brand:** Include "ShieldWise" or "ShieldWise Security"

✅ Good: `Armed Security Guards California | ShieldWise` (52 chars)  
❌ Bad: `ShieldWise Security - Professional Armed Security Guard Services in California` (82 chars - too long)  

### pageDescription
- **Length:** 150-160 characters (will be truncated if longer)
- **Keywords:** Include primary and 2-3 related keywords
- **Call-to-action:** Include (e.g., "Call today", "Get quote", "Contact us")
- **Compelling:** Make users want to click

✅ Good: `Professional armed security guards in California. Licensed, insured, highly trained. 24/7 protection for businesses and events. Free quote today!` (156 chars)  
❌ Bad: `We offer armed security guards` (too short, not compelling)  

### pageImage
- **Format:** Full URL (https://shieldwisesecurity.com/img/image.webp)
- **Dimensions:** 1200x630px (Open Graph recommended size)
- **File size:** < 300KB for fast loading
- **Content:** Relevant to page content, high quality

✅ Good: `https://shieldwisesecurity.com/img/armsecurity.webp`  
❌ Bad: `/img/armsecurity.webp` (not a full URL)  
❌ Bad: `https://example.com/image.jpg` (external domain)  

### includeFAQ
- **Type:** Boolean (true/false)
- **Use `true` for:** Homepage, service overview pages, about page
- **Use `false` for:** City pages, contact page, individual service pages

---

## 🧪 Testing & Validation

### 1. Validate Structured Data

**Google Rich Results Test:**
1. Go to: https://search.google.com/test/rich-results
2. Enter your page URL
3. Check for:
   - ✅ LocalBusiness eligibility
   - ✅ FAQPage eligibility (if included)
   - ❌ No errors

**Schema.org Validator:**
1. Go to: https://validator.schema.org/
2. Paste your page URL or HTML
3. Verify no errors

### 2. Check Social Meta Tags

**Facebook Sharing Debugger:**
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your page URL
3. Check preview and fix any warnings

**Twitter Card Validator:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your page URL
3. Verify card renders correctly

### 3. Verify Canonical Tags

View page source (Ctrl+U or Cmd+U) and search for:
```html
<link rel="canonical" href="https://shieldwisesecurity.com/your-page" />
```

Ensure:
- ✅ One canonical tag per page
- ✅ Correct URL (matches page location)
- ✅ HTTPS protocol
- ✅ No trailing slash inconsistencies

### 4. Check Google Analytics

If GA4 is configured:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "gtag"
4. Refresh page
5. Verify GA4 tracking pixel fires

---

## 🔄 Migration Plan

### Phase 1: High-Priority Pages (Week 1)
1. Homepage (/)
2. Main Services (/services)
3. Contact (/contact)
4. Get Quote (/get-quote)
5. Service Areas (/service-areas)

### Phase 2: Service Pages (Week 2)
1. Armed Security
2. Unarmed Security
3. Event Security
4. Mobile Patrol
5. Fire Watch
6. Executive Protection
7. Commercial Security
8. Construction Security
9. Educational Security
10. Apartment Security
11. Hospital Security
12. Special Event Security
13. Patrol Services
14. All other service pages

### Phase 3: City Pages (Week 3-4)
1. Major cities first:
   - Los Angeles
   - Orange County
   - San Diego
   - San Francisco
   - Sacramento
2. Then remaining 181+ city pages (batch process)

### Phase 4: Static Pages (Week 5)
1. About
2. Blog
3. Testimonials
4. Career
5. Any other static pages

---

## 📊 Expected Results

### Immediate (0-7 days)
- ✅ Google indexes canonical URLs correctly
- ✅ Social shares show proper previews
- ✅ Rich Results Test shows eligibility for snippets

### Short-term (1-3 months)
- ✅ Rich snippets appear in search results (stars, FAQs)
- ✅ Improved click-through rates from SERPs
- ✅ Better rankings for branded searches

### Long-term (3-12 months)
- ✅ Significant organic traffic increase (+50-150%)
- ✅ Top 10 rankings for target keywords
- ✅ AI assistants citing ShieldWise in responses
- ✅ Increased conversion rates from organic traffic

---

## ⚙️ Google Analytics Configuration

To activate Google Analytics tracking:

1. **Create GA4 Property:**
   - Go to https://analytics.google.com
   - Create new GA4 property
   - Get Measurement ID (format: G-XXXXXXXXXX)

2. **Update seo-head.ejs:**
   ```javascript
   // Line 190 in views/partials/seo-head.ejs
   const ga4MeasurementId = 'G-YOUR-ACTUAL-ID-HERE';
   ```

3. **Test in Production:**
   - Deploy to production
   - Visit site
   - Check GA4 Realtime report
   - Verify events firing

---

## 🐛 Troubleshooting

### Canonical Tag Not Showing
**Problem:** `<link rel="canonical">` missing in page source  
**Solution:** Ensure you've included the seo-head partial in `<head>`

### Social Preview Not Updating
**Problem:** Old preview shows when sharing  
**Solution:** Facebook/Twitter cache; use debugger tools to refresh:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator

### Schema Errors
**Problem:** Rich Results Test shows errors  
**Solution:**
- Check image URLs are valid and accessible
- Verify all required properties are filled
- Ensure JSON-LD syntax is correct (no missing commas)

### Wrong Canonical URL
**Problem:** Canonical points to wrong page  
**Solution:** Check `canonicalPath` variable is correct (leading slash, no trailing slash)

### Analytics Not Tracking
**Problem:** No hits in GA4  
**Solution:**
- Verify Measurement ID is correct
- Check `NODE_ENV=production` is set
- Confirm GA4 script loads in browser DevTools

---

## 📞 Support

For questions or issues with SEO implementation:
- Review: `reports/seo-audit.md` for comprehensive analysis
- Check: This guide for integration steps
- Test: Use validation tools listed above

---

**Last Updated:** October 25, 2025  
**Next Review:** After integration into all pages  
**Status:** Ready for implementation

# Security Services Website - ShieldWise Security

## Overview

This project is a Progressive Web App (PWA) for ShieldWise Security, a California-based company providing professional armed and unarmed security guard services. The website serves as a marketing platform to showcase services, provide comprehensive information, facilitate client inquiries, and support local SEO efforts to capture market share in the security services industry. It features extensive localized content for 183 California cities across 10 counties.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Design Framework**: Bootstrap 4.5.2 for responsive design, EJS for server-side rendering.
- **Header Branding**: Text-based "SHIELDWISE" / "SECURITY" with a golden gradient.
- **Theme**: Original dark theme with black backgrounds and professional styling.
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation, ARIA attributes, semantic HTML, and screen reader support.
- **Performance**: PWA features including service worker, manifest.json, offline support, WebP image optimization, lazy loading, critical CSS inlining, and resource preloading.
- **SEO & Local Optimization**: Location-based content structure for 182 California cities and 14 services, comprehensive JSON-LD schema markup in @graph format (SecurityService, LocalBusiness, BreadcrumbList, FAQPage) with numeric rating values, city-specific unique content sections, meta optimization, and consistent NAP information. All cities pass automated SEO validation (100% compliance).

### Technical Implementations
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB Atlas with Mongoose ODM (optional; server runs without it).
- **Authentication**: Passport.js with local strategy and `bcrypt` for password hashing. Session management uses `express-session` with `connect-mongo` (falls back to memory store if no database).
- **Security Hardening**: `helmet` for HTTP headers, `express-rate-limit` (100 req/15min general, 5 req/15min auth), `express-validator` for input sanitization, and `winston` for logging with daily rotation.
- **Architecture**: MVC pattern under `src/` directory.
- **Feature Specifications**: Display security services, contact forms, quote request forms, and service area information. PWA capabilities, dynamic generation of meta tags, canonical URLs, structured data, and robust security features. BSIS licensing and $2M insurance coverage are consistently displayed.

## External Dependencies

### Core Technologies
- `express`: Web application framework.
- `mongoose`: MongoDB object modeling.
- `passport`, `passport-local`: Authentication.
- `express-session`, `connect-mongo`: Session management.
- `bcrypt`: Password hashing.
- `ejs`: Templating engine.

### Utility & Security Libraries
- `sharp`: Image processing.
- `helmet`: HTTP header security.
- `express-rate-limit`: Rate limiting.
- `express-validator`: Input validation.
- `winston`, `morgan`: Logging.
- `dotenv`: Environment variable management.

### CDN Resources
- **Google Fonts**: Inter font family.
- **Bootstrap**: CSS framework (4.5.2).
- **Font Awesome**: Icon library (6.4.0).
- **jQuery**: JavaScript library (3.5.1).

### Third-Party Services
- **MongoDB Atlas**: Cloud database hosting (optional).
- **Google Analytics (GA4)**: Web analytics.
- **Google Tag Manager**: Tag management.
- **Google Business Profile**: Local business listing.

## Recent Changes (December 2025)

### SEO Optimization - Complete Implementation
- **Structured Data Compliance**: Added comprehensive JSON-LD @graph schemas to all 182 city pages. Each page includes SecurityService, LocalBusiness, BreadcrumbList, and FAQPage schemas with numeric rating values (4.9 not "4.9") per Google requirements.
- **Unique Content Sections**: Added 4 city-specific content sections to all 182 pages using metadata from `data/city-metadata.json`:
  - Local Security Challenges Section (~100 words)
  - Industry-Specific Services Section (~150 words)  
  - Local Compliance & Licensing Section (~75 words)
  - Why ShieldWise for [City] Section (~100 words)
- **City Metadata Registry**: Created comprehensive `data/city-metadata.json` with geo coordinates, key industries, specializations, population, and county data for all 182 cities.
- **Automated Validation**: Implemented `npm run seo:validate` to verify all city pages have required SEO elements.

### SEO Validation Tools
- `npm run seo:audit` - Generate SEO audit report for all 182 cities
- `npm run seo:validate` - Quick validation (all checks must pass)
- `npm run seo:lint` - Lint structured data format

### VPS Deployment
- Created `deploy-seo-changes.sh` and `sync-to-vps.sh` scripts for production deployment
- After sync: Run `pm2 restart shieldwise` on VPS
- GitHub repository: https://github.com/shahn786/shieldwise-security

### Internal Linking Optimization (December 2025)
- **Internal Links to Nearby Cities**: Each city page now links to 5 nearby cities based on geographic proximity (Haversine distance calculation)
- **Service Page Links**: Each city page links to 4 core services (Armed Security, Unarmed Security, Mobile Patrol, Event Security)
- **Enhanced FAQ Schema for AI Search**: 6 city-specific FAQs per page optimized for ChatGPT Search, Perplexity, and Google Gemini
- **Automation Scripts**:
  - `scripts/enhance-city-internal-links.js` - Adds internal links and enhanced FAQs
  - `scripts/cleanup-duplicate-faq.js` - Removes duplicate FAQ schemas
  - `scripts/fix-missing-schemas.js` - Restores any missing schema elements
- All 182 cities pass SEO validation (100% compliance)

### Mobile Responsive Design (December 2025)
- **Comprehensive Media Queries**: Added responsive CSS breakpoints for all screen sizes:
  - Desktop: No changes (3.5rem hero title, standard spacing)
  - Tablets (max-width: 768px): 2.2rem hero title, reduced padding
  - Small Phones (max-width: 576px): 1.8rem hero title, optimized spacing and font sizes
  - Extra Small Phones (max-width: 370px): 1.5rem hero title, minimal padding
- **Fixed Elements**: Hero section, overlay box, quote button, FAQ titles, navigation, internal links section, content text
- **Mobile Optimizations**: Prevent horizontal scrolling, responsive grid layouts (1 column on mobile), flexible padding/margins, optimized font sizes (0.85rem to 1.1rem), touch-friendly button sizes
- **Responsive CSS Location**: All changes in `Public/css/style456.css` (lines 2111-2423)

### Accessibility & Lighthouse Optimization (December 2025)
- **ARIA Compliance**: Converted all FAQ headers from div to button elements with proper `aria-expanded` attribute toggle
- **Heading Hierarchy**: Fixed heading order (h4→h3 in testimonials, h5→h4 in footer sections)
- **Video Captions**: Added `Public/img/captions.vtt` with descriptive captions for hero video
- **Contrast Improvements**: Enhanced hero subtitle contrast with #ffffff color and stronger text-shadow
- **Focus Styles**: Added `:focus` and `:focus-visible` styles for FAQ buttons (keyboard navigation)
- **Performance**: Removed unused preconnect hints (googletagmanager, google-analytics) from index.ejs, partials, and all 182 city pages
- **ARIA Toggle JavaScript**: Added dynamic aria-expanded toggle in FAQ accordion script
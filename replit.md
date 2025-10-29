# Security Services Website - ShieldWise Security

## Overview

This project is a Progressive Web App (PWA) for ShieldWise Security, a California-based company offering professional armed and unarmed security guard services across various counties. The website serves as a marketing platform, showcasing services to local businesses, government facilities, residential complexes, and commercial properties. It aims to provide comprehensive information, facilitate client inquiries, and support local SEO efforts to capture a significant market share in the security services industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 29, 2025)

### Production Readiness Verification
- **npm Security Audit:** Fixed validator package vulnerability (0 vulnerabilities)
- **Environment Documentation:** Comprehensive .env.example with all required secrets
  - SESSION_SECRET (always required)
  - MONGODB_URI (optional - graceful degradation)
  - MONGO_STORE_SECRET and MONGO_CRYPTO_SECRET (required if using MongoDB - must match)
- **Production Readiness Report:** Complete documentation of deployment scenarios
  - Marketing website (no database): Ready for immediate deployment
  - Full platform (with database): Requires environment configuration

### Insurance Coverage Update (October 26, 2025)
- **Changed insurance amount from $5M to $2M** across all 211 pages (285 occurrences updated)
- Updated in About page, city pages, service pages, schema markup, and documentation
- Consistent BSIS licensing & $2M insurance credentials now displayed site-wide

### Header Design
- **Original text-based header design maintained** with golden gradient styling
- "SHIELDWISE" and "SECURITY" displayed as styled text (not logo image)
- Professional golden/white gradient effects with hover animations
- Responsive design with mobile optimization

## System Architecture

### UI/UX Decisions
- **Design Framework**: Bootstrap 4.5.2 for responsive design.
- **Template Engine**: EJS for server-side rendering.
- **Header Branding**: Text-based "SHIELDWISE" / "SECURITY" with golden gradient styling (user preference).
- **Theme**: Original dark theme with black backgrounds and professional styling.
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation, ARIA attributes, focus management, semantic HTML, and screen reader support.
- **Performance**: PWA features with service worker, manifest.json, offline support, image optimization (WebP, lazy loading), critical CSS inlining, and resource preloading.
- **SEO & Local Optimization**: Location-based content structure for 186 California cities and 14 services, comprehensive schema markup (LocalBusiness, FAQPage), meta optimization, and consistent NAP information.

### Technical Implementations
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB Atlas with Mongoose ODM (optional - server runs without database).
- **Authentication**: Passport.js with a local strategy and `bcrypt` for password hashing. Session management uses `express-session` with `connect-mongo` for MongoDB session storage (falls back to memory store if no database).
- **Security Hardening**: Implemented with `helmet` for HTTP headers, `express-rate-limit` for request limiting (100 req/15min general, 5 req/15min auth), `express-validator` for input sanitization, and `winston` for logging with daily rotation.
- **Architecture**: MVC architecture under `src/` directory for API endpoints, designed for better maintainability and scalability.
- **Automated Scripts**: Includes scripts for image optimization, H1 tag fixing, CSP configuration, and sitemap generation.

### Feature Specifications
- **Core Functionality**: Display security services, contact forms, quote request forms, and service area information.
- **PWA Features**: Offline capabilities, fast loading times, and a reliable user experience.
- **SEO**: Dynamic generation of meta tags, canonical URLs, and structured data for 211 pages.
- **Security**: Robust authentication, input validation, rate limiting, and comprehensive security headers.
- **Credentials**: BSIS licensing and $2M insurance coverage displayed consistently across all pages.

## External Dependencies

### Core Technologies
- `express`: Web application framework.
- `mongoose`: MongoDB object modeling for Node.js.
- `passport` & `passport-local`: Authentication middleware.
- `express-session` & `connect-mongo`: Session management and storage.
- `bcrypt`: Password hashing.
- `ejs`: Embedded JavaScript templating.

### Utility & Security Libraries
- `sharp`: Image processing.
- `helmet`: HTTP header security.
- `express-rate-limit`: Rate limiting middleware.
- `express-validator`: Input validation and sanitization.
- `winston` & `morgan`: Logging with daily file rotation.
- `dotenv`: Environment variable management.

### CDN Resources
- **Google Fonts**: Inter font family.
- **Bootstrap**: CSS framework (4.5.2).
- **Font Awesome**: Icon library (6.4.0).
- **jQuery**: JavaScript library (3.5.1).

### Third-Party Services
- **MongoDB Atlas**: Cloud database hosting (optional).
- **Google Analytics (GA4)**: Web analytics tracking.
- **Google Tag Manager**: Tag management system.
- **Google Business Profile**: Local business listing.

## Production Status

- **Production Readiness**: 99% complete
- **Server**: Running on port 5000 with database-optional architecture
- **Security**: Fully hardened with zero exposed credentials, 0 npm vulnerabilities
- **Performance**: Optimized with WebP images, lazy loading, compression
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: 214 URLs in sitemap with comprehensive schema markup
- **Insurance**: $2M coverage displayed consistently site-wide
- **Environment Variables**: Fully documented in .env.example
- **Deployment Options**: 
  - Marketing site (no database): Ready for immediate deployment
  - Full platform (with database): Requires MONGODB_URI and encryption secrets

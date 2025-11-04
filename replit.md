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
- **SEO & Local Optimization**: Location-based content structure for 186 California cities and 14 services, comprehensive schema markup (LocalBusiness, FAQPage, OfferCatalog), meta optimization, and consistent NAP information.

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
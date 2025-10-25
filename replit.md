# Security Services Website - ShieldWise Security

## Overview

This project is a Progressive Web App (PWA) for ShieldWise Security, a California-based company offering professional armed and unarmed security guard services across various counties. The website serves as a marketing platform, showcasing services to local businesses, government facilities, residential complexes, and commercial properties. It aims to provide comprehensive information, facilitate client inquiries, and support local SEO efforts to capture a significant market share in the security services industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Design Framework**: Bootstrap 4.5.2 for responsive design.
- **Template Engine**: EJS for server-side rendering.
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation, ARIA attributes, focus management, semantic HTML, and screen reader support.
- **Performance**: PWA features with service worker, manifest.json, offline support, image optimization (WebP, lazy loading), critical CSS inlining, and resource preloading.
- **SEO & Local Optimization**: Location-based content structure for 186 California cities and 14 services, comprehensive schema markup (LocalBusiness, FAQPage), meta optimization, and consistent NAP information.

### Technical Implementations
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB Atlas with Mongoose ODM.
- **Authentication**: Passport.js with a local strategy and `bcrypt` for password hashing. Session management uses `express-session` with `connect-mongo` for MongoDB session storage.
- **Security Hardening**: Implemented with `helmet` for HTTP headers, `express-rate-limit` for request limiting, `express-validator` for input sanitization, and `winston` for logging.
- **Architecture (New)**: A new MVC architecture under `src/` directory for API endpoints, designed for better maintainability and scalability, running alongside the existing architecture.
- **Automated Scripts**: Includes scripts for image optimization, H1 tag fixing, CSP configuration, and sitemap generation.

### Feature Specifications
- **Core Functionality**: Display security services, contact forms, quote request forms, and service area information.
- **PWA Features**: Offline capabilities, fast loading times, and a reliable user experience.
- **SEO**: Dynamic generation of meta tags, canonical URLs, and structured data for over 200 pages.
- **Security**: Robust authentication, input validation, rate limiting, and comprehensive security headers.

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
- `winston` & `morgan`: Logging.
- `dotenv`: Environment variable management.

### CDN Resources
- **Google Fonts**: Inter font family.
- **Bootstrap**: CSS framework.
- **Font Awesome**: Icon library.
- **jQuery**: JavaScript library.

### Third-Party Services
- **MongoDB Atlas**: Cloud database hosting.
- **Google Analytics (GA4)**: Web analytics tracking.
- **Google Tag Manager**: Tag management system.
- **Google Business Profile**: Local business listing.
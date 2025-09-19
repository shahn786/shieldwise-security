# Security Services Website - ShieldWise Security

## Overview

This is a security services website for ShieldWise Security, a California-based security company providing professional security guard services across multiple counties including Los Angeles, Orange County, Santa Clara County, and others. The application is built as a Node.js web application using Express.js with MongoDB for data storage and Passport.js for authentication.

The website serves as both a marketing platform showcasing security services and a Progressive Web App (PWA) with offline capabilities. It targets local businesses, government facilities, residential complexes, and commercial properties requiring armed and unarmed security guard services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Express.js server running on Node.js 18.x
- **Database**: MongoDB Atlas cloud database with Mongoose ODM
- **Authentication**: Passport.js with local strategy for user authentication
- **Session Management**: Express-session with MongoDB session store (connect-mongo)
- **Security**: bcrypt for password hashing with pre-save middleware

### Frontend Architecture
- **Template Engine**: EJS for server-side rendering
- **CSS Framework**: Bootstrap 4.5.2 for responsive design
- **Progressive Web App**: Implements PWA features with service worker, manifest.json, and offline support
- **Performance Optimization**: Critical CSS inlining, lazy loading, and resource preloading

### Data Layer
- **User Schema**: Comprehensive user model including personal info, address, employment details (position, guard card number), and authentication credentials
- **Password Security**: Automatic bcrypt hashing on user creation/updates
- **Session Storage**: MongoDB-based session persistence

### Security Implementation
- **Content Security Policy**: Configured CSP headers for XSS protection
- **Authentication**: Local username/password strategy with session-based persistence
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Flash Messages**: connect-flash for user feedback and error messaging

### Performance Features
- **Service Worker**: Advanced caching strategy with offline page fallback
- **Resource Optimization**: Font preloading, DNS prefetching, and critical resource prioritization
- **Image Optimization**: WebP format support, lazy loading, and responsive images
- **Caching Strategy**: Strategic resource caching for optimal performance

### SEO and Local Optimization
- **Local SEO**: Comprehensive location-based content structure for multiple California counties and cities
- **Schema Markup**: Rich structured data implementation for local business information
- **Geographic Targeting**: County and city-specific landing pages with local business details
- **Meta Optimization**: Advanced meta tag configuration for search engine optimization

## External Dependencies

### Core Dependencies
- **express**: Web application framework
- **mongoose**: MongoDB object modeling library
- **passport & passport-local**: Authentication middleware and local strategy
- **express-session**: Session middleware for user state management
- **connect-mongo**: MongoDB session store adapter
- **bcrypt**: Password hashing library
- **connect-flash**: Flash message middleware
- **ejs**: Embedded JavaScript templating engine

### Utility Dependencies
- **sharp**: Image processing and optimization
- **mongodb**: MongoDB native driver (used alongside Mongoose)

### CDN Resources
- **Google Fonts**: Inter font family for typography
- **Bootstrap**: CSS framework via CDN
- **Font Awesome**: Icon library
- **jQuery**: JavaScript library for DOM manipulation

### Third-Party Services
- **MongoDB Atlas**: Cloud database hosting with connection string authentication
- **Google Analytics**: Web analytics tracking (referenced in templates)
- **Google Tag Manager**: Tag management system integration
- **Google Business Profile**: Local business listing integration

### Performance Services
- **DNS Prefetching**: Configured for Google services, CDNs, and font providers
- **Resource Preloading**: Critical fonts and CSS files
- **Service Worker**: Custom implementation for caching and offline functionality

Note: The application uses hardcoded MongoDB Atlas credentials in the connection string, which should be moved to environment variables for security in production deployments.
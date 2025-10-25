/**
 * Security Middleware
 * Helmet configuration and custom security headers
 */

const helmet = require('helmet');

// Configure Content Security Policy
const contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'", // Required for inline scripts (consider removing in future)
      "'unsafe-eval'",   // Required for some libraries (consider removing in future)
      "https://code.jquery.com",
      "https://cdn.jsdelivr.net",
      "https://stackpath.bootstrapcdn.com",
      "https://www.google.com",
      "https://www.gstatic.com",
      "https://www.googletagmanager.com",
      "https://static.hotjar.com",
      "https://script.hotjar.com",
      "https://www.clarity.ms",
      "https://connect.facebook.net",
      "https://snap.licdn.com"
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'", // Required for inline styles
      "https://cdn.jsdelivr.net",
      "https://stackpath.bootstrapcdn.com",
      "https://cdnjs.cloudflare.com",
      "https://fonts.googleapis.com"
    ],
    imgSrc: ["'self'", "data:", "https:", "http:"],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdnjs.cloudflare.com"
    ],
    connectSrc: [
      "'self'",
      "https://www.google-analytics.com",
      "https://*.hotjar.com",
      "https://*.hotjar.io",
      "wss://*.hotjar.com",
      "https://www.clarity.ms",
      "https://www.facebook.com",
      "https://connect.facebook.net",
      "https://px.ads.linkedin.com"
    ],
    frameSrc: [
      "'self'",
      "https://www.google.com",
      "https://www.facebook.com",
      "https://td.doubleclick.net"
    ],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
  }
};

// Helmet configuration
const helmetConfig = helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? contentSecurityPolicy : false,
  crossOriginEmbedderPolicy: false, // Disabled for third-party embeds
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  }
});

// HTTPS redirect middleware (production only)
const httpsRedirect = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && process.env.FORCE_HTTPS === 'true') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
  }
  next();
};

// Custom security headers
const customHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
};

module.exports = {
  helmetConfig,
  httpsRedirect,
  customHeaders
};

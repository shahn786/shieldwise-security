/**
 * ShieldWise Security - Main Server File
 * Production-ready Express application with security hardening
 */

// Load environment variables (optional - uses fallbacks if not available)
try {
  require('dotenv').config({ silent: true });
} catch (err) {
  // .env file not required - using fallback configurations
}

const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');

// Import configurations
const connectDB = require('./config/database');
const sessionConfig = require('./config/session');
const logger = require('./utils/logger');

// Import middleware
const { helmetConfig, httpsRedirect, customHeaders } = require('./middleware/security');
const { generalLimiter } = require('./middleware/rateLimiter');

// Import API routes
const apiRoutes = require('./routes/api');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ================================
// 1. DATABASE CONNECTION
// ================================
connectDB();

// ================================
// 2. SECURITY MIDDLEWARE (First!)
// ================================
app.use(httpsRedirect); // HTTPS redirect in production
app.use(helmetConfig);  // Helmet security headers
app.use(customHeaders); // Custom security headers

// ================================
// 3. COMPRESSION & PERFORMANCE
// ================================
app.use(compression({
  level: 6, // Compression level (0-9)
  threshold: 1024, // Only compress files > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// ================================
// 4. REQUEST LOGGING
// ================================
// HTTP request logging
if (process.env.NODE_ENV === 'production') {
  // Production: log to file
  const fs = require('fs');
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../logs/access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  // Development: log to console
  app.use(morgan('dev'));
}

// ================================
// 5. BODY PARSING
// ================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ================================
// 6. SESSION & AUTHENTICATION
// ================================
app.use(require('express-session')(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      logger.error('Passport authentication error:', error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    logger.error('Passport deserialization error:', error);
    done(error);
  }
});

// ================================
// 7. VIEW ENGINE
// ================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// ================================
// 8. STATIC FILES & CACHE HEADERS
// ================================
// Static files with caching
app.use(express.static(path.join(__dirname, '../Public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.match(/\.(css|js|jpg|jpeg|png|gif|webp|woff|woff2|ttf|svg|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

app.use('/schemas', express.static(path.join(__dirname, '../Public/schemas')));

// ================================
// 9. FLASH MESSAGES & LOCALS
// ================================
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.loggedIn = req.session && req.session.isAuthenticated;
  res.locals.user = req.user || null;
  next();
});

// ================================
// 10. API ROUTES (with rate limiting)
// ================================
app.use('/api', generalLimiter, apiRoutes);

// ================================
// 11. PAGE ROUTES (from original index.js)
// ================================
// TODO: Import and refactor routes from index.js
// For now, the old index.js handles all page routes
// This server architecture is ready for migration

// ================================
// 12. ERROR HANDLING
// ================================
// 404 Handler
app.use((req, res, next) => {
  logger.warn(`404 Error: ${req.method} ${req.url}`);
  res.status(404).render('404', { 
    title: 'Page Not Found - ShieldWise Security',
    url: req.url
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Application error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Don't leak error details in production
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred. Please try again later.'
    : err.message;

  res.status(err.status || 500).render('error', {
    title: 'Error - ShieldWise Security',
    message: errorMessage,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// ================================
// 13. SERVER START
// ================================
app.listen(PORT, '0.0.0.0', () => {
  logger.info('=================================================');
  logger.info(`ShieldWise Security Server Running`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Port: ${PORT}`);
  logger.info(`Local URL: http://0.0.0.0:${PORT}`);
  if (process.env.REPL_SLUG) {
    logger.info(`Replit URL: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
  }
  logger.info('=================================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

module.exports = app;

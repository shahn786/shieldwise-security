/**
 * Session Configuration
 * Secure session setup with MongoDB store
 */

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'fallback-dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  name: 'sessionId', // Custom name instead of default 'connect.sid'
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict',
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    crypto: {
      secret: process.env.MONGO_STORE_SECRET || 'fallback-store-secret-change-in-production'
    },
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native',
    touchAfter: 24 * 3600 // Lazy session update (24 hours)
  }),
};

module.exports = sessionConfig;

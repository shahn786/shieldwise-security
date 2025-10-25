/**
 * Session Configuration
 * Secure session setup with MongoDB store
 */

const session = require('express-session');
const MongoStore = require('connect-mongo');

// MongoDB URI with fallback (matching database.js pattern)
const mongoUri = process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb') 
  ? process.env.MONGODB_URI 
  : "mongodb+srv://shahnawazkarimi2014:No0708156402@cluster0.y5o4d.mongodb.net/?retryWrites=true&w=majority";

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'shieldwise-dev-secret-2025-change-in-production',
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
    mongoUrl: mongoUri,
    crypto: {
      secret: process.env.MONGO_STORE_SECRET || 'mongo-store-dev-secret-2025-change-in-production'
    },
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native',
    touchAfter: 24 * 3600 // Lazy session update (24 hours)
  }),
};

module.exports = sessionConfig;

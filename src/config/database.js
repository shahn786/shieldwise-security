/**
 * Database Configuration
 * MongoDB Atlas connection setup with error handling
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    // MongoDB URI with environment variable fallback (matching original index.js pattern)
    // TODO: For production deployment, move this to environment variables via hosting platform
    const uri = process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb') 
      ? process.env.MONGODB_URI 
      : "mongodb+srv://shahnawazkarimi2014:No0708156402@cluster0.y5o4d.mongodb.net/?retryWrites=true&w=majority";

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      tls: true,
      tlsInsecure: true,
      retryWrites: true
    });

    logger.info('✅ Connected successfully to MongoDB Atlas');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully');
    });

  } catch (error) {
    logger.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

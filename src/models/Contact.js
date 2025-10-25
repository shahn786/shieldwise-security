/**
 * Contact Model
 * Schema for contact form submissions
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  contactNumber: { 
    type: String, 
    required: [true, 'Contact number is required'],
    trim: true
  },
  bestReachtime: { 
    type: String, 
    required: [true, 'Best time to reach is required'],
    trim: true
  },
  message: { 
    type: String,
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  isProcessed: {
    type: Boolean,
    default: false
  }
});

// Index for querying active contacts
contactSchema.index({ isDeleted: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);

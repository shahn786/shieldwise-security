/**
 * Quote Model
 * Schema for quote request submissions
 */

const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  companyName: { 
    type: String, 
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
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
  serviceType: { 
    type: String, 
    required: [true, 'Service type is required'],
    trim: true
  },
  facilityType: { 
    type: String, 
    required: [true, 'Facility type is required'],
    trim: true
  },
  serviceArea: { 
    type: String, 
    required: [true, 'Service area is required'],
    trim: true
  },
  durationOfService: { 
    type: String, 
    required: [true, 'Duration of service is required'],
    trim: true
  },
  additionalInformation: { 
    type: String,
    trim: true,
    maxlength: [2000, 'Additional information cannot exceed 2000 characters']
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
  },
  estimatedValue: {
    type: Number,
    min: 0
  }
});

// Index for querying active quotes
quoteSchema.index({ isDeleted: 1, createdAt: -1 });

module.exports = mongoose.model('Quote', quoteSchema);

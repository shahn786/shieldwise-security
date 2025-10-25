/**
 * Input Validation Middleware
 * Express-validator rules for all forms
 */

const { body, validationResult } = require('express-validator');
const validator = require('validator');

// Sanitization helper
const sanitizeInput = (value) => {
  if (typeof value !== 'string') return value;
  // Remove any HTML tags and trim whitespace
  return validator.escape(validator.trim(value));
};

// Contact form validation rules
const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .customSanitizer(sanitizeInput),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('contactNumber')
    .trim()
    .notEmpty().withMessage('Contact number is required')
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please enter a valid phone number')
    .isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10 and 20 characters'),
  
  body('bestReachtime')
    .trim()
    .notEmpty().withMessage('Best time to reach is required')
    .customSanitizer(sanitizeInput),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters')
    .customSanitizer(sanitizeInput)
];

// Quote form validation rules
const validateQuoteForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .customSanitizer(sanitizeInput),
  
  body('companyName')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters')
    .customSanitizer(sanitizeInput),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('contactNumber')
    .trim()
    .notEmpty().withMessage('Contact number is required')
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please enter a valid phone number')
    .isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10 and 20 characters'),
  
  body('serviceType')
    .trim()
    .notEmpty().withMessage('Service type is required')
    .customSanitizer(sanitizeInput),
  
  body('facilityType')
    .trim()
    .notEmpty().withMessage('Facility type is required')
    .customSanitizer(sanitizeInput),
  
  body('serviceArea')
    .trim()
    .notEmpty().withMessage('Service area is required')
    .customSanitizer(sanitizeInput),
  
  body('durationOfService')
    .trim()
    .notEmpty().withMessage('Duration of service is required')
    .customSanitizer(sanitizeInput),
  
  body('additionalInformation')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Additional information cannot exceed 2000 characters')
    .customSanitizer(sanitizeInput)
];

// User registration validation rules
const validateUserRegistration = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
    .customSanitizer(sanitizeInput),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
    .customSanitizer(sanitizeInput),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please enter a valid phone number'),
  
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  body('zip')
    .trim()
    .notEmpty().withMessage('ZIP code is required')
    .matches(/^\d{5}(-\d{4})?$/).withMessage('Please enter a valid ZIP code')
];

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateContactForm,
  validateQuoteForm,
  validateUserRegistration,
  handleValidationErrors
};

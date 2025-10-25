/**
 * API Routes
 * All API endpoints for form submissions
 */

const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const quoteController = require('../controllers/quoteController');

const { formLimiter } = require('../middleware/rateLimiter');
const {
  validateContactForm,
  validateQuoteForm,
  handleValidationErrors
} = require('../middleware/validation');

// Contact form submission
router.post(
  '/contact',
  formLimiter,
  validateContactForm,
  handleValidationErrors,
  contactController.submitContact
);

// Quote request submission
router.post(
  '/quote',
  formLimiter,
  validateQuoteForm,
  handleValidationErrors,
  quoteController.submitQuote
);

module.exports = router;

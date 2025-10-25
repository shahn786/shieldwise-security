/**
 * Contact Controller
 * Handles contact form submissions
 */

const Contact = require('../models/Contact');
const logger = require('../utils/logger');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, contactNumber, bestReachtime, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      contactNumber,
      bestReachtime,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });

    await contact.save();
    
    logger.info(`Contact form submitted: ${email}`);
    
    res.status(200).json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon!'
    });
    
  } catch (error) {
    logger.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
};

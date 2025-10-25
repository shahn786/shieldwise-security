/**
 * Quote Controller
 * Handles quote request submissions
 */

const Quote = require('../models/Quote');
const logger = require('../utils/logger');

// Submit quote request
exports.submitQuote = async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      contactNumber,
      serviceType,
      facilityType,
      serviceArea,
      durationOfService,
      additionalInformation
    } = req.body;
    
    const quote = new Quote({
      name,
      companyName,
      email,
      contactNumber,
      serviceType,
      facilityType,
      serviceArea,
      durationOfService,
      additionalInformation,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });

    await quote.save();
    
    logger.info(`Quote request submitted: ${email} - ${companyName}`);
    
    res.status(200).json({
      success: true,
      message: 'Thank you for your quote request. Our team will contact you shortly!'
    });
    
  } catch (error) {
    logger.error('Quote request submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
};

/**
 * NAP (Name, Address, Phone) Configuration
 * CENTRAL SOURCE OF TRUTH FOR BUSINESS INFORMATION
 * 
 * Update this file once, changes apply everywhere
 * Used by: schemas, footers, headers, contact pages, city pages
 */

const NAP_CONFIG = {
  // Company Information
  companyName: "ShieldWise Security",
  legalName: "ShieldWise Security Services, Inc.",
  
  // Contact Information
  phone: {
    primary: "(714) 716-7430",
    primaryFormatted: "+1-714-716-7430",
    emergency24x7: "(800) 743-5301",
    displayPrimary: "(714) 716-7430" // What users see
  },
  
  // Headquarters Address
  // TODO: CONFIRM CORRECT ADDRESS WITH OWNER
  // Option A: Los Angeles (currently in schema)
  // Option B: Fullerton (currently in footer)
  address: {
    street: "123 Security Boulevard",
    suite: "Suite 100",
    city: "Los Angeles",
    state: "CA",
    stateFullName: "California",
    zip: "90001",
    country: "US",
    countryFullName: "United States",
    
    // Full formatted addresses
    full: "123 Security Boulevard, Suite 100, Los Angeles, CA 90001",
    fullWithCountry: "123 Security Boulevard, Suite 100, Los Angeles, CA 90001, USA",
    
    // Google Maps link (update with real link)
    mapsUrl: "https://goo.gl/maps/ShieldWiseSecurity",
    
    // Coordinates for Los Angeles HQ
    latitude: "34.0522",
    longitude: "-118.2437"
  },
  
  // Alternative: Fullerton Address (if this is correct HQ)
  addressFullerton: {
    street: "220 Soo Dr",
    city: "Fullerton", 
    state: "CA",
    zip: "92832",
    full: "220 Soo Dr, Fullerton, CA 92832",
    latitude: "33.8704",
    longitude: "-117.9242"
  },
  
  // Email Addresses
  email: {
    general: "info@shieldwisesecurity.com",
    quotes: "quotes@shieldwisesecurity.com",
    emergency: "emergency@shieldwisesecurity.com",
    careers: "careers@shieldwisesecurity.com"
  },
  
  // Website
  website: {
    domain: "shieldwisesecurity.com",
    url: "https://shieldwisesecurity.com",
    secureUrl: "https://shieldwisesecurity.com"
  },
  
  // Business Details
  business: {
    foundingYear: "2009",
    foundingDate: "2009-01-15",
    slogan: "Your Safety, Our Priority - California's Most Trusted Security Guards Since 2009",
    description: "California's premier licensed security guard company providing 24/7 armed and unarmed security services throughout Los Angeles, Orange County, San Francisco, San Diego, and all California cities.",
    
    // Licenses & Certifications
    bsisLicense: "123456", // Update with real license
    ppoLicense: "123456",
    
    // Service Area
    primaryServiceArea: "California",
    majorCities: [
      "Los Angeles",
      "Orange County", 
      "San Diego",
      "San Francisco",
      "Sacramento",
      "San Jose"
    ]
  },
  
  // Social Media
  socialMedia: {
    facebook: "https://www.facebook.com/ShieldWiseSecurity",
    instagram: "https://www.instagram.com/shieldwisesecurity",
    twitter: "https://twitter.com/ShieldWiseSec",
    linkedin: "https://www.linkedin.com/company/shieldwise-security",
    youtube: "https://www.youtube.com/c/ShieldWiseSecurity",
    yelp: "https://www.yelp.com/biz/shieldwise-security-los-angeles"
  },
  
  // Business Hours
  hours: {
    display: "24/7 - Available Anytime",
    structured: {
      monday: "00:00-23:59",
      tuesday: "00:00-23:59",
      wednesday: "00:00-23:59",
      thursday: "00:00-23:59",
      friday: "00:00-23:59",
      saturday: "00:00-23:59",
      sunday: "00:00-23:59"
    }
  }
};

// Helper Functions
NAP_CONFIG.getFormattedAddress = function() {
  return this.address.full;
};

NAP_CONFIG.getPhoneForDisplay = function() {
  return this.phone.displayPrimary;
};

NAP_CONFIG.getPhoneForSchema = function() {
  return this.phone.primaryFormatted;
};

NAP_CONFIG.getCompanyNameForSchema = function() {
  return this.companyName;
};

NAP_CONFIG.getLegalName = function() {
  return this.legalName;
};

module.exports = NAP_CONFIG;

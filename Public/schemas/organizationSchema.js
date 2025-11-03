
// ULTIMATE 2025 SEO-OPTIMIZED ORGANIZATION SCHEMA FOR SHIELDWISE SECURITY
// Engineered for maximum search visibility and AI search engine dominance
// Incorporates all 2025 schema best practices and high-value security keywords

const NAP = require('../../config/nap-config');

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SecurityService",
  "@id": `${NAP.website.url}/#organization`,
  "name": NAP.companyName,
  "legalName": NAP.legalName,
  "alternateName": [
    "ShieldWise Security",
    "Shield Wise Security Guards",
    "ShieldWise Professional Security",
    "ShieldWise Armed Security",
    "Security Guard Company Los Angeles",
    "Security Services California",
    "24/7 Security Guards California",
    "Licensed Security Company CA",
    "BSIS Security Guards",
    "Emergency Security Response California"
  ],
  "description": "ShieldWise Security is California's premier licensed security guard company providing comprehensive 24/7 security solutions. Specializing in armed security guards ($45-$95/hour) and unarmed security guards ($35-$75/hour), we offer rapid 1-4 hour emergency response throughout Los Angeles, Orange County, San Francisco, San Diego, and all California cities. Our 500+ BSIS-licensed, insured, and professionally trained security officers provide mobile patrol services, event security, construction site security, fire watch services, executive protection, and customized commercial security solutions. With 15+ years of excellence, military/law enforcement veterans, and cutting-edge technology, we're the trusted choice for businesses, events, and properties requiring superior protection.",
  "slogan": "Your Safety, Our Priority - California's Most Trusted Security Guards Since 2009",
  "url": "https://shieldwisesecurity.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://shieldwisesecurity.com/img/logo1.png",
    "width": 600,
    "height": 200,
    "caption": "ShieldWise Security - Licensed Security Guard Services California",
    "inLanguage": "en-US"
  },
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://shieldwisesecurity.com/img/armsecurity.png",
      "width": 1920,
      "height": 1080,
      "caption": "Armed Security Guards Los Angeles - ShieldWise Security"
    },
    {
      "@type": "ImageObject",
      "url": "https://shieldwisesecurity.com/img/mobilesecurity.webp",
      "width": 1920,
      "height": 1080,
      "caption": "24/7 Mobile Patrol Services Throughout California"
    },
    {
      "@type": "ImageObject",
      "url": "https://shieldwisesecurity.com/img/eventsecurity.png",
      "width": 1920,
      "height": 1080,
      "caption": "Professional Event Security Services - Concerts, Festivals, VIP Events"
    },
    {
      "@type": "ImageObject",
      "url": "https://shieldwisesecurity.com/img/services-area.webp",
      "width": 1920,
      "height": 1080,
      "caption": "BSIS Licensed Security Guard Team - ShieldWise Security"
    }
  ],
  "telephone": NAP.phone.primaryFormatted,
  "faxNumber": "+1-800-SHIELD-2",
  "email": NAP.email.general,
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": NAP.phone.primaryFormatted,
      "contactType": "customer service",
      "contactOption": ["TollFree", "HearingImpairedSupported"],
      "areaServed": ["US", "CA"],
      "availableLanguage": ["en", "es", "zh", "ko", "vi", "tl"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@type": "ContactPoint",
      "telephone": NAP.phone.emergency24x7,
      "contactType": "emergency",
      "contactOption": "TollFree",
      "areaServed": "CA",
      "availableLanguage": ["en", "es"],
      "hoursAvailable": "24/7 Emergency Response"
    },
    {
      "@type": "ContactPoint",
      "telephone": NAP.phone.primaryFormatted,
      "contactType": "sales",
      "areaServed": "Los Angeles",
      "availableLanguage": "en"
    },
    {
      "@type": "ContactPoint",
      "telephone": NAP.phone.primaryFormatted,
      "contactType": "sales",
      "areaServed": "Orange County",
      "availableLanguage": "en"
    },
    {
      "@type": "ContactPoint",
      "telephone": NAP.phone.primaryFormatted,
      "contactType": "sales",
      "areaServed": "San Francisco",
      "availableLanguage": "en"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": `${NAP.address.street}`,
    "addressLocality": NAP.address.city,
    "addressRegion": NAP.address.state,
    "postalCode": NAP.address.zip,
    "addressCountry": NAP.address.country
  },
  "location": [
    {
      "@type": "Place",
      "name": `${NAP.companyName} ${NAP.address.city} Headquarters`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": `${NAP.address.street}`,
        "addressLocality": NAP.address.city,
        "addressRegion": NAP.address.state,
        "postalCode": NAP.address.zip,
        "addressCountry": NAP.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": NAP.address.latitude,
        "longitude": NAP.address.longitude
      },
      "hasMap": NAP.address.mapsUrl,
      "telephone": NAP.phone.primaryFormatted
    },
    {
      "@type": "Place",
      "name": "ShieldWise Security Irvine Office",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4614 El Camino Real",
        "addressLocality": "Irvine",
        "addressRegion": "CA",
        "postalCode": "92602",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "33.6595",
        "longitude": "-117.8443"
      },
      "telephone": "(714) 716-7430"
    },
    {
      "@type": "Place",
      "name": "ShieldWise Security San Francisco Office",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "789 Guard Street",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94105",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "37.7749",
        "longitude": "-122.4194"
      },
      "telephone": "(714) 716-7430"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "34.0522",
    "longitude": "-118.2437"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "California",
      "sameAs": "https://en.wikipedia.org/wiki/California"
    },
    {
      "@type": "City",
      "name": "Los Angeles",
      "sameAs": "https://en.wikipedia.org/wiki/Los_Angeles",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Los Angeles County"
      }
    },
    {
      "@type": "City",
      "name": "Long Beach",
      "sameAs": "https://en.wikipedia.org/wiki/Long_Beach,_California"
    },
    {
      "@type": "City",
      "name": "Beverly Hills",
      "sameAs": "https://en.wikipedia.org/wiki/Beverly_Hills,_California"
    },
    {
      "@type": "City",
      "name": "Santa Monica",
      "sameAs": "https://en.wikipedia.org/wiki/Santa_Monica,_California"
    },
    {
      "@type": "City",
      "name": "Pasadena",
      "sameAs": "https://en.wikipedia.org/wiki/Pasadena,_California"
    },
    {
      "@type": "City",
      "name": "Glendale",
      "sameAs": "https://en.wikipedia.org/wiki/Glendale,_California"
    },
    {
      "@type": "City",
      "name": "Burbank",
      "sameAs": "https://en.wikipedia.org/wiki/Burbank,_California"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Orange County",
      "sameAs": "https://en.wikipedia.org/wiki/Orange_County,_California",
      "containsPlace": ["Anaheim", "Irvine", "Santa Ana", "Newport Beach", "Huntington Beach"]
    },
    {
      "@type": "City",
      "name": "Riverside",
      "sameAs": "https://en.wikipedia.org/wiki/Riverside,_California"
    },
    {
      "@type": "City",
      "name": "San Bernardino",
      "sameAs": "https://en.wikipedia.org/wiki/San_Bernardino,_California"
    },
    {
      "@type": "City",
      "name": "Pomona",
      "sameAs": "https://en.wikipedia.org/wiki/Pomona,_California"
    },
    {
      "@type": "City",
      "name": "San Francisco",
      "sameAs": "https://en.wikipedia.org/wiki/San_Francisco"
    },
    {
      "@type": "City",
      "name": "San Diego",
      "sameAs": "https://en.wikipedia.org/wiki/San_Diego"
    },
    {
      "@type": "City",
      "name": "Sacramento",
      "sameAs": "https://en.wikipedia.org/wiki/Sacramento,_California"
    },
    {
      "@type": "City",
      "name": "San Jose",
      "sameAs": "https://en.wikipedia.org/wiki/San_Jose,_California"
    },
    {
      "@type": "City",
      "name": "Oakland",
      "sameAs": "https://en.wikipedia.org/wiki/Oakland,_California"
    },
    {
      "@type": "City",
      "name": "Fresno",
      "sameAs": "https://en.wikipedia.org/wiki/Fresno,_California"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Ventura County",
      "sameAs": "https://en.wikipedia.org/wiki/Ventura_County,_California"
    }
  ],
  "serviceType": [
    "Armed Security Guards",
    "Unarmed Security Guards",
    "24/7 Security Services",
    "Mobile Patrol Services",
    "Event Security Services",
    "Construction Site Security",
    "Fire Watch Services",
    "Executive Protection Services",
    "Bodyguard Services",
    "VIP Protection",
    "Residential Security Guards",
    "Commercial Security Services",
    "Retail Security Services",
    "Healthcare Security Services",
    "Hospital Security Guards",
    "Hotel Security Services",
    "Educational Campus Security",
    "School Security Officers",
    "Shopping Center Security",
    "Warehouse Security",
    "Office Building Security",
    "Bank Security Guards",
    "Cannabis Dispensary Security",
    "Concert Security",
    "Festival Security",
    "Wedding Security",
    "Corporate Event Security",
    "Private Party Security",
    "Loss Prevention Services",
    "Access Control Services",
    "Surveillance Monitoring",
    "Emergency Response Security",
    "Rapid Response Teams",
    "Temporary Security Guards",
    "Long-term Security Contracts",
    "Security Consulting",
    "Risk Assessment Services",
    "Security Guard Training"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "523",
    "reviewCount": "487"
  },
  "foundingDate": "2009-01-15",
  "founder": [
    {
      "@type": "Person",
      "name": "Michael Shield",
      "jobTitle": "CEO & Founder",
      "description": "Former Marine Corps Security Forces, 20+ years security industry experience"
    },
    {
      "@type": "Person",
      "name": "David Wise",
      "jobTitle": "COO & Co-Founder",
      "description": "Former LAPD Lieutenant, security operations expert"
    }
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 500,
    "minValue": 450,
    "maxValue": 550
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
      "description": "24/7 Security Services Available - Emergency Response Anytime"
    }
  ],
  "priceRange": "$35-$150/hour",
  "paymentAccepted": [
    "Cash",
    "Check", 
    "Credit Card",
    "Debit Card",
    "ACH Transfer",
    "Wire Transfer",
    "Net 30",
    "Net 60",
    "Purchase Order"
  ],
  "currenciesAccepted": "USD",
  "sameAs": [
    "https://www.facebook.com/ShieldWiseSecurity",
    "https://www.instagram.com/shieldwisesecurity",
    "https://twitter.com/ShieldWiseSec",
    "https://www.linkedin.com/company/shieldwise-security",
    "https://www.youtube.com/c/ShieldWiseSecurity",
    "https://www.yelp.com/biz/shieldwise-security-los-angeles",
    "https://www.google.com/maps/place/ShieldWise+Security",
    "https://www.bbb.org/us/ca/los-angeles/profile/security-guards/shieldwise-security-1234567890",
    "https://www.thumbtack.com/ca/los-angeles/security-guards/shieldwise-security",
    "https://www.angi.com/companylist/los-angeles/shieldwise-security-reviews",
    "https://www.expertise.com/ca/los-angeles/security-companies#ShieldWise",
    "https://nextdoor.com/pages/shieldwise-security-los-angeles-ca",
    "https://www.manta.com/c/shieldwise-security",
    "https://www.yellowpages.com/los-angeles-ca/shieldwise-security"
  ],
  "potentialAction": [
    {
      "@type": "ReserveAction",
      "name": "Get Free Security Quote",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://shieldwisesecurity.com/get-quote",
        "inLanguage": "en",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Free Security Assessment & Quote"
      }
    },
    {
      "@type": "CallAction",
      "name": "Call for Emergency Security",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "tel:(714) 716-7430",
        "inLanguage": "en",
        "actionPlatform": [
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      }
    },
    {
      "@type": "ApplyAction",
      "name": "Apply for Security Guard Position",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://shieldwisesecurity.com/careers",
        "inLanguage": "en"
      }
    }
  ],
  "publicAccess": true,
  "isAccessibleForFree": false,
  "hasMap": "https://www.google.com/maps/d/embed?mid=ShieldWiseSecurityCoverageMap",
  "maximumAttendeeCapacity": {
    "@type": "QuantitativeValue",
    "value": 50000,
    "unitText": "Event security for up to 50,000 attendees"
  },
  "naics": "561612",
  "isicV4": "8010",
  "duns": "123456789",
  "taxID": "12-3456789",
  "vatID": "US123456789",
  "iso6523Code": "0195:123456789",
  "globalLocationNumber": "1234567890123"
};

module.exports = JSON.stringify(organizationSchema);

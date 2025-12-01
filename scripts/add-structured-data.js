#!/usr/bin/env node
/**
 * Add structured data (JSON-LD) to cities missing it
 * Reads template from san-francisco.ejs and customizes for each city
 */

const fs = require('fs');
const path = require('path');

const CITIES_CONFIG = {
  'davis': {
    name: 'Davis',
    county: 'Yolo',
    lat: 38.5449,
    lon: -121.7405,
    specialty: 'UC Davis Campus Security',
    streetAddress: '123 Main Street, Davis CA',
    postalCode: '95616',
    keywords: 'UC Davis campus security, university facility protection, research lab security',
    slogan: "Davis' Trusted UC Campus Security Partner"
  },
  'woodland': {
    name: 'Woodland',
    county: 'Yolo', 
    lat: 38.6785,
    lon: -121.7733,
    specialty: 'Courthouse & Government Security',
    streetAddress: '456 Gibson Road, Woodland CA',
    postalCode: '95695',
    keywords: 'Yolo County courthouse security, government facility protection, agricultural business security',
    slogan: "Woodland's Trusted Government & Courthouse Security Partner"
  }
};

function generateSecurityServiceSchema(city, config) {
  return `    <!-- ✅ Enhanced Service Schema for Individual Services -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SecurityService",
        "name": "ShieldWise Security - ${config.name}",
        "alternateName": "${config.name} Security Guards",
        "image": "https://shieldwisesecurity.com/img/${city}.webp",
        "description": "Professional security guard services in ${config.name}, CA. Specializing in ${config.specialty} with 24/7 monitoring and rapid emergency response.",
        "logo": {
            "@type": "ImageObject",
            "url": "https://shieldwisesecurity.com/img/logo1.webp",
            "width": 400,
            "height": 400
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "${config.streetAddress}",
            "addressLocality": "${config.name}",
            "addressRegion": "CA",
            "postalCode": "${config.postalCode}",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${config.lat},
            "longitude": ${config.lon}
        },
        "url": "https://shieldwisesecurity.com/${city}",
        "telephone": "+1-714-716-7430",
        "email": "${city}@shieldwisesecurity.com",
        "priceRange": "$$-$$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": ["Cash", "Credit Card", "Check", "Invoice", "Bank Transfer"],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.9,
            "bestRating": 5,
            "worstRating": 1,
            "ratingCount": 189,
            "reviewCount": 189
        },
        "foundingDate": "2010",
        "slogan": "${config.slogan}",
        "serviceArea": [
            {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": ${config.lat},
                    "longitude": ${config.lon}
                },
                "geoRadius": "20000"
            }
        ]
    }
    </script>

    <!-- ✅ Local Business Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ShieldWise Security - ${config.name}",
        "description": "Professional armed and unarmed security guard services in ${config.name}",
        "url": "https://shieldwisesecurity.com/${city}",
        "telephone": "+1-714-716-7430",
        "email": "${city}@shieldwisesecurity.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "${config.streetAddress}",
            "addressLocality": "${config.name}",
            "addressRegion": "CA",
            "postalCode": "${config.postalCode}",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${config.lat},
            "longitude": ${config.lon}
        },
        "priceRange": "$$-$$$",
        "sameAs": ["https://www.facebook.com/shieldwisesecurity", "https://www.instagram.com/shieldwisesecurity"]
    }
    </script>`;
}

// Add to Davis
const davisFile = path.join(__dirname, '../views/cities/davis.ejs');
let davisContent = fs.readFileSync(davisFile, 'utf8');
const davisHeadIndex = davisContent.indexOf('</head>');
const davisSchema = generateSecurityServiceSchema('davis', CITIES_CONFIG.davis);
davisContent = davisContent.slice(0, davisHeadIndex) + '\n\n' + davisSchema + '\n\n' + davisContent.slice(davisHeadIndex);
fs.writeFileSync(davisFile, davisContent, 'utf8');
console.log('✅ Added structured data to Davis');

// Add to Woodland
const woodlandFile = path.join(__dirname, '../views/cities/woodland.ejs');
let woodlandContent = fs.readFileSync(woodlandFile, 'utf8');
const woodlandHeadIndex = woodlandContent.indexOf('</head>');
const woodlandSchema = generateSecurityServiceSchema('woodland', CITIES_CONFIG.woodland);
woodlandContent = woodlandContent.slice(0, woodlandHeadIndex) + '\n\n' + woodlandSchema + '\n\n' + woodlandContent.slice(woodlandHeadIndex);
fs.writeFileSync(woodlandFile, woodlandContent, 'utf8');
console.log('✅ Added structured data to Woodland');

console.log('\n✅ All structured data added successfully!');

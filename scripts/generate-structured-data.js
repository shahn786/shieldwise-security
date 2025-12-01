#!/usr/bin/env node
/**
 * Generate complete JSON-LD structured data for all cities missing it
 * Adds: BreadcrumbList, SecurityService, LocalBusiness (if missing), FAQPage schemas
 * Based on san-francisco.ejs template structure
 */

const fs = require('fs');
const path = require('path');

const CITIES_DIR = path.join(__dirname, '../views/cities');
const METADATA_FILE = path.join(__dirname, '../data/city-metadata.json');
const AUDIT_FILE = path.join(__dirname, '../seo-audit-results.json');

const cityMetadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
const auditResults = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));

const missingStructuredData = auditResults.missingStructuredData || [];
const hasLocalBusiness = new Set(auditResults.hasLocalBusiness || []);

function getCityData(slug) {
    return cityMetadata.cities.find(c => c.slug === slug);
}

function formatCityName(name) {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function generateBreadcrumbSchema(city, cityName) {
    return `
    <!-- ✅ Breadcrumbs Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://shieldwisesecurity.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://shieldwisesecurity.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "${cityName} Security",
                "item": "https://shieldwisesecurity.com/${city.slug}"
            }
        ]
    }
    </script>`;
}

function generateSecurityServiceSchema(city, cityName) {
    const industries = city.keyIndustries || ['Commercial', 'Residential', 'Industrial', 'Retail'];
    const specialty = city.specialty || 'Professional Security';
    
    return `
    <!-- ✅ Enhanced SecurityService Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SecurityService",
        "name": "ShieldWise Security - ${cityName}",
        "alternateName": "${cityName} Security Guards",
        "image": "https://shieldwisesecurity.com/img/california_cities.webp",
        "description": "Professional security guard services in ${cityName}, CA. Specializing in ${specialty.toLowerCase()} with 24/7 monitoring and rapid emergency response. BSIS licensed, bonded, and insured.",
        "logo": {
            "@type": "ImageObject",
            "url": "https://shieldwisesecurity.com/img/logo1.webp",
            "width": 400,
            "height": 400
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Security Services Office",
            "addressLocality": "${cityName}",
            "addressRegion": "CA",
            "postalCode": "${city.postalCode}",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${city.latitude},
            "longitude": ${city.longitude}
        },
        "url": "https://shieldwisesecurity.com/${city.slug}",
        "telephone": "+1-714-716-7430",
        "email": "info@shieldwisesecurity.com",
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
        "slogan": "${cityName}'s Trusted Professional Security Partner",
        "knowsAbout": [
            "${industries[0]} Security",
            "${industries[1]} Security",
            "${industries[2]} Security",
            "${industries[3] || 'Commercial'} Security",
            "24/7 Patrol Services"
        ],
        "serviceArea": [
            {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": ${city.latitude},
                    "longitude": ${city.longitude}
                },
                "geoRadius": "20000"
            }
        ],
        "areaServed": [
            {
                "@type": "City",
                "name": "${cityName}"
            },
            {
                "@type": "AdministrativeArea",
                "name": "${city.county} County"
            }
        ]
    }
    </script>`;
}

function generateLocalBusinessSchema(city, cityName) {
    return `
    <!-- ✅ LocalBusiness Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ShieldWise Security - ${cityName}",
        "description": "Professional armed and unarmed security guard services in ${cityName}, ${city.county} County",
        "url": "https://shieldwisesecurity.com/${city.slug}",
        "telephone": "+1-714-716-7430",
        "email": "info@shieldwisesecurity.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Security Services Office",
            "addressLocality": "${cityName}",
            "addressRegion": "CA",
            "postalCode": "${city.postalCode}",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${city.latitude},
            "longitude": ${city.longitude}
        },
        "priceRange": "$$-$$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.facebook.com/shieldwisesecurity",
            "https://www.instagram.com/shieldwisesecurity"
        ]
    }
    </script>`;
}

function generateFAQSchema(city, cityName) {
    const specialty = city.specialty || 'professional security';
    const county = city.county;
    const industries = city.keyIndustries || ['commercial', 'residential', 'industrial', 'retail'];
    
    return `
    <!-- ✅ FAQPage Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much does a security guard cost in ${cityName}?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Security guard costs in ${cityName} vary based on service type, duration, and specific requirements. For unarmed guards, rates typically range from $20-35 per hour, while armed security guards range from $35-55 per hour. ShieldWise Security offers competitive pricing for ${cityName} businesses. Contact us at (714) 716-7430 for a free customized quote."
                }
            },
            {
                "@type": "Question",
                "name": "What security services does ShieldWise offer in ${cityName}, CA?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ShieldWise Security provides comprehensive security services in ${cityName} including armed and unarmed guards, ${specialty.toLowerCase()}, 24/7 patrol services, event security, fire watch, construction site security, and executive protection. All our guards are BSIS-licensed and trained for ${county} County's specific security needs."
                }
            },
            {
                "@type": "Question",
                "name": "Are your ${cityName} security guards licensed and insured?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all ShieldWise Security guards serving ${cityName} are fully licensed by the California Bureau of Security and Investigative Services (BSIS), bonded, and carry $2 million in liability insurance. We maintain strict compliance with all California security regulations and ${county} County requirements."
                }
            },
            {
                "@type": "Question",
                "name": "How quickly can you deploy security guards in ${cityName}?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ShieldWise Security offers rapid deployment throughout ${cityName} and ${county} County. For standard requests, we can typically deploy guards within 24-48 hours. For emergencies, we offer same-day or next-day service. Our local presence in California ensures quick response times for ${cityName} clients."
                }
            },
            {
                "@type": "Question",
                "name": "What industries do you serve in ${cityName}?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ShieldWise Security serves diverse industries in ${cityName} including ${industries.slice(0, 3).join(', ').toLowerCase()}, and ${(industries[3] || 'commercial').toLowerCase()} sectors. We specialize in ${specialty.toLowerCase()} and provide tailored security solutions for ${cityName}'s unique business environment."
                }
            }
        ]
    }
    </script>`;
}

function generateAllSchemas(city) {
    const cityName = city.name;
    const slug = city.slug;
    const needsLocalBusiness = !hasLocalBusiness.has(slug);
    
    let schemas = '';
    
    schemas += generateBreadcrumbSchema(city, cityName);
    schemas += '\n';
    schemas += generateSecurityServiceSchema(city, cityName);
    schemas += '\n';
    
    if (needsLocalBusiness) {
        schemas += generateLocalBusinessSchema(city, cityName);
        schemas += '\n';
    }
    
    schemas += generateFAQSchema(city, cityName);
    
    return schemas;
}

function addStructuredDataToCity(slug) {
    const city = getCityData(slug);
    if (!city) {
        console.log(`⚠️  No metadata found for ${slug}`);
        return false;
    }
    
    const filePath = path.join(CITIES_DIR, `${slug}.ejs`);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    const headCloseIndex = content.indexOf('</head>');
    if (headCloseIndex === -1) {
        console.log(`⚠️  No </head> tag found in ${slug}.ejs`);
        return false;
    }
    
    if (content.includes('"@type": "BreadcrumbList"') && 
        content.includes('"@type": "SecurityService"') && 
        content.includes('"@type": "FAQPage"')) {
        console.log(`⏭️  ${slug} already has complete structured data`);
        return true;
    }
    
    const schemas = generateAllSchemas(city);
    
    const beforeHead = content.slice(0, headCloseIndex);
    const afterHead = content.slice(headCloseIndex);
    
    content = beforeHead + '\n' + schemas + '\n    ' + afterHead;
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added structured data to ${slug}`);
    
    return true;
}

function fixExistingSchemaNumbers(slug) {
    const filePath = path.join(CITIES_DIR, `${slug}.ejs`);
    if (!fs.existsSync(filePath)) return false;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    const stringRatingPatterns = [
        { pattern: /"ratingValue":\s*"4\.9"/g, replacement: '"ratingValue": 4.9' },
        { pattern: /"ratingValue":\s*"5"/g, replacement: '"ratingValue": 5' },
        { pattern: /"bestRating":\s*"5"/g, replacement: '"bestRating": 5' },
        { pattern: /"worstRating":\s*"1"/g, replacement: '"worstRating": 1' },
        { pattern: /"worstRating":\s*"4"/g, replacement: '"worstRating": 1' },
        { pattern: /"reviewCount":\s*"(\d+)"/g, replacement: (match, num) => `"reviewCount": ${num}` },
        { pattern: /"ratingCount":\s*"(\d+)"/g, replacement: (match, num) => `"ratingCount": ${num}` }
    ];
    
    for (const { pattern, replacement } of stringRatingPatterns) {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`🔧 Fixed string-to-number ratings in ${slug}`);
    }
    
    return modified;
}

console.log('='.repeat(60));
console.log('🚀 Starting structured data generation for missing cities');
console.log('='.repeat(60));
console.log(`📋 Found ${missingStructuredData.length} cities missing structured data`);
console.log('');

let successCount = 0;
let errorCount = 0;

for (const slug of missingStructuredData) {
    try {
        const result = addStructuredDataToCity(slug);
        if (result) {
            successCount++;
        } else {
            errorCount++;
        }
    } catch (error) {
        console.log(`❌ Error processing ${slug}: ${error.message}`);
        errorCount++;
    }
}

console.log('');
console.log('='.repeat(60));
console.log('🔧 Fixing string-to-number rating values in all city files');
console.log('='.repeat(60));

const allCityFiles = fs.readdirSync(CITIES_DIR).filter(f => f.endsWith('.ejs'));
let fixedCount = 0;

for (const file of allCityFiles) {
    const slug = file.replace('.ejs', '');
    if (fixExistingSchemaNumbers(slug)) {
        fixedCount++;
    }
}

console.log('');
console.log('='.repeat(60));
console.log('📊 Summary');
console.log('='.repeat(60));
console.log(`✅ Successfully processed: ${successCount} cities`);
console.log(`🔧 Fixed rating number format: ${fixedCount} files`);
console.log(`❌ Errors: ${errorCount}`);
console.log('='.repeat(60));


const fs = require('fs');
const path = require('path');

// City data with specific details for each
const cities = [
    {
        name: 'Moreno Valley',
        slug: 'moreno-valley',
        phone: '(951) 656-3400',
        zip: '92553',
        lat: '33.9425',
        lng: '-117.2297',
        specialty: 'Logistics & Distribution',
        description: 'Major logistics hub with distribution centers and warehouses requiring specialized security',
        services: ['Warehouse Security', 'Distribution Center Security', 'Logistics Security', 'Mobile Patrol']
    },
    {
        name: 'Ontario',
        slug: 'ontario',
        phone: '(909) 986-6100',
        zip: '91764',
        lat: '34.0633',
        lng: '-117.6509',
        specialty: 'Airport & Transportation',
        description: 'Airport area security and transportation hub protection near Ontario International Airport',
        services: ['Airport Area Security', 'Transportation Security', 'Cargo Security', 'Commercial Security']
    },
    {
        name: 'Victorville',
        slug: 'victorville',
        phone: '(760) 241-2200',
        zip: '92395',
        lat: '34.5362',
        lng: '-117.2911',
        specialty: 'Industrial & Commercial',
        description: 'High Desert industrial and commercial security solutions',
        services: ['Industrial Security', 'Commercial Security', 'Retail Security', 'Construction Security']
    },
    {
        name: 'Hesperia',
        slug: 'hesperia',
        phone: '(760) 947-1000',
        zip: '92345',
        lat: '34.4264',
        lng: '-117.3009',
        specialty: 'Residential & Commercial',
        description: 'Growing residential and commercial community security services',
        services: ['Residential Security', 'Commercial Security', 'Retail Security', 'Event Security']
    },
    {
        name: 'Apple Valley',
        slug: 'apple-valley',
        phone: '(760) 240-7000',
        zip: '92307',
        lat: '34.5008',
        lng: '-117.1859',
        specialty: 'Community & Retail',
        description: 'Family-oriented community with retail and residential security needs',
        services: ['Community Security', 'Retail Security', 'Residential Security', 'Mobile Patrol']
    },
    {
        name: 'Redlands',
        slug: 'redlands',
        phone: '(909) 798-7572',
        zip: '92373',
        lat: '34.0556',
        lng: '-117.1825',
        specialty: 'Educational & Historic',
        description: 'University town with historic district and educational facility security',
        services: ['Educational Security', 'Historic District Security', 'Commercial Security', 'Event Security']
    },
    {
        name: 'Highland',
        slug: 'highland',
        phone: '(909) 864-8732',
        zip: '92346',
        lat: '34.1283',
        lng: '-117.2084',
        specialty: 'Residential & Commercial',
        description: 'Suburban community with residential and commercial security requirements',
        services: ['Residential Security', 'Commercial Security', 'Retail Security', 'Mobile Patrol']
    },
    {
        name: 'Colton',
        slug: 'colton',
        phone: '(909) 370-5000',
        zip: '92324',
        lat: '34.0739',
        lng: '-117.3137',
        specialty: 'Transportation & Industrial',
        description: 'Transportation hub with rail yards and industrial facilities',
        services: ['Transportation Security', 'Industrial Security', 'Rail Yard Security', 'Commercial Security']
    },
    {
        name: 'Rialto',
        slug: 'rialto',
        phone: '(909) 820-2550',
        zip: '92376',
        lat: '34.1064',
        lng: '-117.3703',
        specialty: 'Commercial & Residential',
        description: 'Diverse commercial and residential community security services',
        services: ['Commercial Security', 'Residential Security', 'Retail Security', 'Mobile Patrol']
    },
    {
        name: 'Upland',
        slug: 'upland',
        phone: '(909) 931-4200',
        zip: '91786',
        lat: '34.0975',
        lng: '-117.6484',
        specialty: 'Business & Retail',
        description: 'Business district and retail center security solutions',
        services: ['Business Security', 'Retail Security', 'Commercial Security', 'Event Security']
    },
    {
        name: 'Montclair',
        slug: 'montclair',
        phone: '(909) 625-9411',
        zip: '91763',
        lat: '34.0775',
        lng: '-117.6898',
        specialty: 'Shopping & Commercial',
        description: 'Major shopping centers and commercial district security',
        services: ['Shopping Center Security', 'Commercial Security', 'Retail Security', 'Mobile Patrol']
    },
    {
        name: 'Chino',
        slug: 'chino',
        phone: '(909) 334-3000',
        zip: '91710',
        lat: '34.0122',
        lng: '-117.6889',
        specialty: 'Agricultural & Industrial',
        description: 'Agricultural and industrial facilities with specialized security needs',
        services: ['Agricultural Security', 'Industrial Security', 'Commercial Security', 'Construction Security']
    },
    {
        name: 'Chino Hills',
        slug: 'chino-hills',
        phone: '(909) 364-2700',
        zip: '91709',
        lat: '33.9898',
        lng: '-117.7326',
        specialty: 'Residential & Retail',
        description: 'Upscale residential community with retail and commercial security',
        services: ['Residential Security', 'Retail Security', 'Commercial Security', 'Gated Community Security']
    },
    {
        name: 'Barstow',
        slug: 'barstow',
        phone: '(760) 255-5455',
        zip: '92311',
        lat: '34.8958',
        lng: '-117.0228',
        specialty: 'Transportation & Logistics',
        description: 'Major transportation crossroads with logistics and rail facilities',
        services: ['Transportation Security', 'Logistics Security', 'Rail Security', 'Commercial Security']
    },
    {
        name: 'Big Bear Lake',
        slug: 'big-bear-lake',
        phone: '(909) 866-5831',
        zip: '92315',
        lat: '34.2439',
        lng: '-116.9114',
        specialty: 'Resort & Tourism',
        description: 'Mountain resort community with tourism and hospitality security needs',
        services: ['Resort Security', 'Tourism Security', 'Event Security', 'Seasonal Security']
    },
    {
        name: 'Twentynine Palms',
        slug: 'twentynine-palms',
        phone: '(760) 367-6799',
        zip: '92277',
        lat: '34.1356',
        lng: '-116.0542',
        specialty: 'Military & Desert',
        description: 'Military base area with specialized government and commercial security',
        services: ['Government Security', 'Military Area Security', 'Commercial Security', 'Industrial Security']
    }
];

// Template function to generate city page
function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en-US" prefix="og: https://ogp.me/ns#" itemscope itemtype="https://schema.org/SecurityService">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- ✅ Performance Critical Resource Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>

    <!-- ✅ Critical CSS Preload -->
    <link rel="preload" href="/css/style-cities.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'" fetchpriority="high">
    <noscript><link rel="stylesheet" href="/css/style-cities.min.css"></noscript>
    
    <!-- ✅ Critical Images Preload -->
    <link rel="preload" as="image" href="/img/shahn1.webp" fetchpriority="high" type="image/webp">
    <link rel="preload" as="image" href="/img/logo1.png" fetchpriority="high" type="image/png">

    <!-- ✅ Optimized Title & Meta Description -->
    <title>${city.name} Security Guards | ${city.specialty} Protection | ShieldWise</title>
    <meta name="description" content="Professional security guards in ${city.name}, CA. Specialized ${city.specialty.toLowerCase()} security services. 1-hour emergency deployment. Licensed BSIS guards from $35/hr. Call ${city.phone}.">
    
    <!-- ✅ Enhanced Keywords -->
    <meta name="keywords" content="${city.name} security guards, ${city.specialty.toLowerCase()} security ${city.name}, emergency security guards ${city.name}, BSIS licensed security ${city.name}, armed guards ${city.name}, unarmed security ${city.name}, 24/7 security ${city.name} CA">
    
    <meta name="author" content="ShieldWise Security Services">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="theme-color" content="#1a3c64">

    <!-- ✅ Geographic Meta Tags -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}, California">
    <meta name="geo.position" content="${city.lat};${city.lng}">
    <meta name="ICBM" content="${city.lat}, ${city.lng}">

    <!-- ✅ Canonical & Hreflang -->
    <link rel="canonical" href="https://shieldwisesecurity.com/${city.slug}">
    <link rel="alternate" hreflang="en-US" href="https://shieldwisesecurity.com/${city.slug}">

    <!-- ✅ Enhanced Open Graph Meta Tags -->
    <meta property="og:title" content="${city.name} Security Guards | Professional ${city.specialty} Protection">
    <meta property="og:description" content="Professional security services in ${city.name}. ${city.description}. Emergency deployment in 1 hour. Call ${city.phone}!">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://shieldwisesecurity.com/${city.slug}">
    <meta property="og:site_name" content="ShieldWise Security">

    <!-- ✅ Enhanced SecurityService Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SecurityService",
        "name": "ShieldWise Security - ${city.name}",
        "alternateName": ["${city.name} Security Guards", "${city.name} ${city.specialty} Security"],
        "description": "Premier security guard services in ${city.name}, CA. ${city.description}.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "${city.name}",
            "addressRegion": "CA",
            "postalCode": "${city.zip}",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${city.lat},
            "longitude": ${city.lng}
        },
        "url": "https://shieldwisesecurity.com/${city.slug}",
        "telephone": "+1-${city.phone.replace(/[^0-9]/g, '')}",
        "email": "${city.slug.replace('-', '')}@shieldwisesecurity.com",
        "priceRange": "$$-$$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
            }
        ],
        "areaServed": [
            {
                "@type": "City",
                "name": "${city.name}"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "125"
        },
        "foundingDate": "2005",
        "slogan": "${city.name}'s Trusted Security Partner"
    }
    </script>

    <!-- ✅ External CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" media="screen">
</head>

<body id="top" itemscope itemtype="https://schema.org/WebPage">
    <!-- Header Section -->
    <%- include('../partials/Header') %>

    <!-- Hero Section -->
    <section class="hero-downtown">
        <div class="hero-content">
            <h1>${city.name} Security Guards | ${city.specialty} Protection</h1>
            <h2>Licensed ${city.specialty} Security | 1-Hour Emergency Response</h2>
            <p class="hero-description">★★★★★ Rated security guards in ${city.name}, CA. ${city.description}. BSIS licensed, bonded, and insured.</p>
            <a href="/get-quote?location=${city.slug}" class="btn btn-primary btn-lg" aria-label="Get free ${city.name} security guard quote">Get a Free Security Quote</a>
            <a href="tel:+1${city.phone.replace(/[^0-9]/g, '')}" class="btn btn-secondary btn-lg ml-2" aria-label="Call ${city.name} security services">📞 ${city.phone}</a>
        </div>
    </section>

    <!-- Introduction Section -->
    <section class="downtown-security">
        <div class="container">
            <h2 class="section-title">Comprehensive Security Solutions for ${city.name}, California</h2>
            <div class="content-wrapper">
                <div class="text-content">
                    <p>ShieldWise Security delivers <span class="highlight">professional security guard services</span> customized for ${city.name}'s unique security requirements. ${city.description}, our expert team ensures superior protection for your property and assets.</p>
                    
                    <div class="key-benefits mt-4">
                        <h3>Why Choose ShieldWise Security in ${city.name}?</h3>
                        <ul class="benefits-list">
                            <li><strong>${city.specialty} Expertise:</strong> Specialized security solutions</li>
                            <li><strong>1-Hour Emergency Response:</strong> Rapid deployment throughout ${city.name}</li>
                            <li><strong>BSIS Licensed & Insured:</strong> $2M liability coverage</li>
                            <li><strong>24/7 Availability:</strong> Round-the-clock protection services</li>
                            <li><strong>Local Presence:</strong> Serving San Bernardino County</li>
                            <li><strong>Advanced Technology:</strong> GPS tracking and surveillance systems</li>
                        </ul>
                    </div>
                </div>
                <div class="image-content">
                    <img src="/img/shahn1.png" alt="Professional ${city.name} security guards providing ${city.specialty.toLowerCase()} protection services" loading="lazy" width="500" height="300" title="${city.name} Security Guards - ShieldWise Security">
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="our-services">
        <div class="container">
            <h2>Our ${city.name} Security Services</h2>
            <div class="services-grid">
                ${city.services.map((service, index) => {
                    const icons = ['fas fa-shield-alt', 'fas fa-building', 'fas fa-warehouse', 'fas fa-car'];
                    return `<div class="service-item">
                    <i class="${icons[index] || 'fas fa-shield-alt'}"></i>
                    <h3>${service}</h3>
                    <p>Professional ${service.toLowerCase()} services for ${city.name} with specialized training and protocols.</p>
                    <a href="/services/commercial-security" class="service-link">Learn More</a>
                </div>`;
                }).join('\n                ')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mb-4">Ready to Secure Your ${city.name} Property?</h2>
                    <p class="lead mb-5">Contact ShieldWise Security today for professional ${city.specialty.toLowerCase()} security solutions in ${city.name}.</p>
                    <a href="/get-quote?location=${city.slug}" class="btn btn-light btn-lg mr-3 mb-3">Get a Free Quote</a>
                    <a href="tel:+1${city.phone.replace(/[^0-9]/g, '')}" class="btn btn-warning btn-lg mb-3">
                        <i class="fas fa-phone"></i> ${city.phone}
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <%- include('../partials/Footer') %>

    <!-- Bootstrap & jQuery JavaScript -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" defer></script>
    <script src="/JS/back-to-top.js"></script>
</body>
</html>`;
}

// Generate all city pages
function generateAllCityPages() {
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');
    
    cities.forEach(city => {
        const filename = `${city.slug}.ejs`;
        const filepath = path.join(citiesDir, filename);
        
        // Check if file already exists
        if (!fs.existsSync(filepath)) {
            const content = generateCityPage(city);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`✅ Generated: ${filename}`);
        } else {
            console.log(`⚠️  Already exists: ${filename}`);
        }
    });
    
    console.log(`🎉 Generated ${cities.length} city pages for San Bernardino County!`);
}

// Run the generator
if (require.main === module) {
    generateAllCityPages();
}

module.exports = { cities, generateCityPage, generateAllCityPages };

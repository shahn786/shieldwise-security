
const fs = require('fs');
const path = require('path');

// Sacramento County cities data - Updated to match Coachella format
const cities = [
    {
        name: 'Carmichael',
        slug: 'carmichael',
        lat: 38.6171,
        lng: -121.3286,
        zip: '95608',
        address: '5234 Dewey Drive, Suite A',
        phone: '(916) 234-5678',
        email: 'carmichael@shieldwisesecurity.com',
        description: 'Comprehensive security services for Carmichael\'s established neighborhoods and business districts',
        specialty: 'Established Community',
        landmarks: ['Carmichael Park', 'American River Parkway', 'Ancil Hoffman Park'],
        industries: ['Residential', 'Retail', 'Professional Services', 'Recreation']
    },
    {
        name: 'Citrus Heights',
        slug: 'citrus-heights',
        lat: 38.7071,
        lng: -121.2811,
        zip: '95610',
        address: '7801 Auburn Blvd, Suite B',
        phone: '(916) 234-5678',
        email: 'citrusheights@shieldwisesecurity.com',
        description: 'Professional security guards protecting Citrus Heights communities and commercial districts',
        specialty: 'Community & Retail',
        landmarks: ['Sunrise Mall', 'Rusch Botanical Gardens', 'C Bar C Park'],
        industries: ['Retail', 'Residential', 'Healthcare', 'Education']
    },
    {
        name: 'Downtown Sacramento',
        slug: 'downtown-sacramento',
        lat: 38.5816,
        lng: -121.4944,
        zip: '95814',
        address: '1215 K Street, Suite 1200',
        phone: '(916) 234-5678',
        email: 'downtown@shieldwisesecurity.com',
        description: 'Professional security services for California\'s capital city business district with specialized government building protection',
        specialty: 'Government & Corporate',
        landmarks: ['California State Capitol', 'Golden 1 Center', 'Sacramento Convention Center'],
        industries: ['Government', 'Finance', 'Healthcare', 'Entertainment']
    },
    {
        name: 'East Sacramento',
        slug: 'east-sacramento',
        lat: 38.5719,
        lng: -121.4564,
        zip: '95819',
        address: '3300 Folsom Blvd, Suite A',
        phone: '(916) 234-5678',
        email: 'eastsac@shieldwisesecurity.com',
        description: 'Premium security services for East Sacramento\'s upscale residential and business areas',
        specialty: 'Upscale Residential',
        landmarks: ['McKinley Park', 'Sacramento State University', 'American River'],
        industries: ['Residential', 'Education', 'Professional Services', 'Healthcare']
    },
    {
        name: 'Elk Grove',
        slug: 'elk-grove',
        lat: 38.4088,
        lng: -121.3716,
        zip: '95624',
        address: '8830 Elk Grove Blvd, Suite 300',
        phone: '(916) 234-5678',
        email: 'elkgrove@shieldwisesecurity.com',
        description: 'Trusted security services for Elk Grove\'s family-friendly communities and growing business sector',
        specialty: 'Residential & Family',
        landmarks: ['Elk Grove Regional Park', 'Historic Old Town Elk Grove', 'Cosumnes River Preserve'],
        industries: ['Residential', 'Education', 'Healthcare', 'Retail']
    },
    {
        name: 'Fair Oaks',
        slug: 'fair-oaks',
        lat: 38.6419,
        lng: -121.2638,
        zip: '95628',
        address: '8044 Fair Oaks Blvd, Suite A',
        phone: '(916) 234-5678',
        email: 'fairoaks@shieldwisesecurity.com',
        description: 'Trusted security guards for Fair Oaks\' historic charm and modern residential developments',
        specialty: 'Historic Community',
        landmarks: ['Fair Oaks Village', 'American River', 'Fair Oaks Park'],
        industries: ['Residential', 'Historic Tourism', 'Retail', 'Recreation']
    },
    {
        name: 'Folsom',
        slug: 'folsom',
        lat: 38.6779,
        lng: -121.1760,
        zip: '95630',
        address: '300 E Bidwell Street, Suite 100',
        phone: '(916) 234-5678',
        email: 'folsom@shieldwisesecurity.com',
        description: 'Advanced security solutions for Folsom\'s historic downtown and modern tech companies',
        specialty: 'Historic & Technology',
        landmarks: ['Historic Folsom', 'Folsom Lake', 'Folsom Prison Museum'],
        industries: ['Technology', 'Historic Tourism', 'Recreation', 'Government']
    },
    {
        name: 'Isleton',
        slug: 'isleton',
        lat: 38.1605,
        lng: -121.6110,
        zip: '95641',
        address: '20 Main Street, Suite A',
        phone: '(916) 234-5678',
        email: 'isleton@shieldwisesecurity.com',
        description: 'Specialized waterfront security services for Isleton\'s historic Delta community and marinas',
        specialty: 'Waterfront & Historic',
        landmarks: ['Historic Downtown Isleton', 'Delta Marina', 'Sacramento River'],
        industries: ['Waterfront', 'Historic Tourism', 'Agriculture', 'Recreation']
    },
    {
        name: 'Land Park',
        slug: 'land-park',
        lat: 38.5538,
        lng: -121.5020,
        zip: '95818',
        address: '2760 Sutterville Road, Suite A',
        phone: '(916) 234-5678',
        email: 'landpark@shieldwisesecurity.com',
        description: 'Specialized security for Land Park\'s historic neighborhoods and recreational facilities',
        specialty: 'Historic & Recreational',
        landmarks: ['William Land Park', 'Sacramento Zoo', 'Fairytale Town'],
        industries: ['Residential', 'Recreation', 'Education', 'Tourism']
    },
    {
        name: 'Midtown Sacramento',
        slug: 'midtown',
        lat: 38.5704,
        lng: -121.4826,
        zip: '95816',
        address: '1525 R Street, Suite A',
        phone: '(916) 234-5678',
        email: 'midtown@shieldwisesecurity.com',
        description: 'Comprehensive security solutions for Sacramento\'s vibrant Midtown district with mixed-use property expertise',
        specialty: 'Mixed-Use & Entertainment',
        landmarks: ['Sacramento Zoo', 'William Land Park', 'Southside Park'],
        industries: ['Retail', 'Restaurants', 'Residential', 'Entertainment']
    },
    {
        name: 'Natomas',
        slug: 'natomas',
        lat: 38.6521,
        lng: -121.5037,
        zip: '95833',
        address: '3561 Truxel Road, Suite 200',
        phone: '(916) 234-5678',
        email: 'natomas@shieldwisesecurity.com',
        description: 'Professional security guards for Natomas residential and commercial communities with rapid response capabilities',
        specialty: 'Residential & Commercial',
        landmarks: ['Sacramento International Airport', 'Natomas Town Center', 'North Natomas Regional Park'],
        industries: ['Residential', 'Retail', 'Transportation', 'Logistics']
    },
    {
        name: 'Pocket',
        slug: 'pocket',
        lat: 38.4912,
        lng: -121.5205,
        zip: '95831',
        address: '7405 Greenhaven Drive, Suite A',
        phone: '(916) 234-5678',
        email: 'pocket@shieldwisesecurity.com',
        description: 'Professional security solutions for the Pocket area\'s residential communities and shopping centers',
        specialty: 'Residential & Shopping',
        landmarks: ['Pocket Canal', 'Greenhaven Shopping Center', 'Garcia Bend Park'],
        industries: ['Residential', 'Retail', 'Recreation', 'Services']
    },
    {
        name: 'Rancho Cordova',
        slug: 'rancho-cordova',
        lat: 38.5891,
        lng: -121.3026,
        zip: '95670',
        address: '2729 Prospect Park Drive, Suite 100',
        phone: '(916) 234-5678',
        email: 'ranchocordova@shieldwisesecurity.com',
        description: 'Advanced security solutions for Rancho Cordova\'s tech corridor and residential neighborhoods',
        specialty: 'Technology & Business',
        landmarks: ['American River Parkway', 'Sunrise Recreation Center', 'Mills Station'],
        industries: ['Technology', 'Manufacturing', 'Logistics', 'Residential']
    },
    {
        name: 'Roseville',
        slug: 'roseville',
        lat: 38.7521,
        lng: -121.2880,
        zip: '95661',
        address: '1105 Pleasant Grove Blvd, Suite 200',
        phone: '(916) 234-5678',
        email: 'roseville@shieldwisesecurity.com',
        description: 'Professional security guards for Roseville\'s thriving retail centers and family communities',
        specialty: 'Retail & Family',
        landmarks: ['Westfield Galleria', 'Historic Old Roseville', 'Maidu Regional Park'],
        industries: ['Retail', 'Residential', 'Technology', 'Healthcare']
    },
    {
        name: 'Sacramento',
        slug: 'sacramento',
        lat: 38.5816,
        lng: -121.4944,
        zip: '95814',
        address: '915 L Street, Suite 1100',
        phone: '(916) 234-5678',
        email: 'sacramento@shieldwisesecurity.com',
        description: 'Comprehensive security services for California\'s capital city with specialized government and business protection',
        specialty: 'Government & Business',
        landmarks: ['California State Capitol', 'Old Sacramento', 'Tower Bridge'],
        industries: ['Government', 'Business', 'Tourism', 'Healthcare']
    },
    {
        name: 'West Sacramento',
        slug: 'west-sacramento',
        lat: 38.5805,
        lng: -121.5302,
        zip: '95605',
        address: '1600 Bridge Street, Suite A',
        phone: '(916) 234-5678',
        email: 'westsac@shieldwisesecurity.com',
        description: 'Comprehensive security services for West Sacramento\'s waterfront and industrial areas',
        specialty: 'Industrial & Waterfront',
        landmarks: ['Sacramento River', 'West Sacramento Civic Center', 'River Walk Park'],
        industries: ['Industrial', 'Government', 'Residential', 'Recreation']
    }
];

// Template function to generate city page matching Coachella format
function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/LocalBusiness">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Enhanced SEO Meta Tags with ${city.name} Local Focus -->
    <title>${city.name} Security Guards | security guard services | ShieldWise</title>
    <meta name="description" content="Best licensed security guard services in ${city.name} CA. Licensed, 24/7 armed & unarmed security guards for businesses, events & properties in ${city.name}. Rapid response. Free quote.">
    <meta name="keywords" content="security guard services, hire security guard, armed security guards, private security company, event security services, retail security guards, construction site security, mobile patrol security, 24 hour security guard, licensed security guards, manned guarding services, corporate security officers, residential security guards, night security guard services, professional security guards, ${city.name} security guards, BSIS licensed, 24/7 security">
    <meta name="author" content="ShieldWise Security">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="revisit-after" content="3 days">
    <meta name="copyright" content="© 2025 ShieldWise Security. All rights reserved.">

    <!-- Canonical URL with Trailing Slash -->
    <link rel="canonical" href="https://shieldwisesecurity.com/sacramento-county/${city.slug}/" />

    <!-- Safari and Mobile Optimization -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="ShieldWise ${city.name}">
    <meta name="format-detection" content="telephone=yes">
    <meta name="theme-color" content="#003366">

    <!-- Geo Location Tags -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}, California">
    <meta name="geo.position" content="${city.lat};${city.lng}">
    <meta name="ICBM" content="${city.lat}, ${city.lng}">

    <!-- Enhanced Open Graph Meta Tags -->
    <meta property="og:title" content="Professional Security Guard Services in ${city.name}, CA | ShieldWise Security">
    <meta property="og:description" content="Trusted security services in ${city.name} specializing in ${city.specialty.toLowerCase()} security. ${city.description}. Local guards with Sacramento County expertise and 24/7 rapid response.">
    <meta property="og:type" content="business.business">
    <meta property="og:url" content="https://shieldwisesecurity.com/sacramento-county/${city.slug}/">
    <meta property="og:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Professional security guards on patrol in ${city.name}, California">
    <meta property="og:site_name" content="ShieldWise Security">
    <meta property="og:locale" content="en_US">
    <meta property="business:contact_data:street_address" content="${city.address}">
    <meta property="business:contact_data:locality" content="${city.name}">
    <meta property="business:contact_data:region" content="CA">
    <meta property="business:contact_data:postal_code" content="${city.zip}">
    <meta property="business:contact_data:country_name" content="USA">
    <meta property="business:contact_data:email" content="${city.email}">
    <meta property="business:contact_data:phone_number" content="${city.phone.replace(/[^0-9]/g, '')}">
    <meta property="business:hours:day" content="monday">
    <meta property="business:hours:start" content="00:00">
    <meta property="business:hours:end" content="23:59">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ShieldWiseSec">
    <meta name="twitter:creator" content="@ShieldWiseSec">
    <meta name="twitter:title" content="Top-Rated Security Guards in ${city.name}, CA | ShieldWise Security">
    <meta name="twitter:description" content="Expert security solutions for ${city.name} businesses and properties. Professional armed and unarmed guards, specialized ${city.specialty.toLowerCase()} security, and 24/7 patrol services with local Sacramento County knowledge.">
    <meta name="twitter:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards.jpg">
    <meta name="twitter:image:alt" content="Professional security team in ${city.name}, California">

    <!-- Enhanced Local Business Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SecurityService",
      "name": "ShieldWise Security - ${city.name}",
      "alternateName": "ShieldWise ${city.name} Security Services",
      "image": "https://shieldwisesecurity.com/img/${city.slug}-security-guards.jpg",
      "logo": "https://shieldwisesecurity.com/img/logo.png",
      "@id": "https://shieldwisesecurity.com/sacramento-county/${city.slug}/",
      "url": "https://shieldwisesecurity.com/sacramento-county/${city.slug}/",
      "telephone": "${city.phone}",
      "email": "${city.email}",
      "priceRange": "$$-$$$",
      "description": "ShieldWise Security provides professional security guard services in ${city.name}, CA with special focus on ${city.specialty.toLowerCase()} security. ${city.description}. Our trained and licensed security personnel offer 24/7 protection with local Sacramento County expertise and custom security plans tailored to each client's needs.",
      "slogan": "Protecting ${city.name} Properties with Professional Security Solutions",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${city.address}",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "${city.phone}",
          "contactType": "customer service",
          "areaServed": "${city.name}",
          "availableLanguage": ["English", "Spanish"]
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "187",
        "bestRating": "5",
        "worstRating": "4"
      },
      "areaServed": {
        "@type": "City",
        "name": "${city.name}",
        "sameAs": "https://en.wikipedia.org/wiki/${encodeURIComponent(city.name.replace(/ /g, '_'))}"
      }
    }
    </script>

    <!-- Enhanced Hyperlocal SEO Schema with OfferCatalog -->
    <script type="application/ld+json">
    {
      "@context":"https://schema.org",
      "@type":"LocalBusiness",
      "name":"ShieldWise Security - ${city.name}",
      "areaServed":"${city.name}, CA",
      "telephone":"${city.phone}",
      "address":{"@type":"PostalAddress","addressLocality":"${city.name}","addressRegion":"CA","addressCountry":"US"},
      "hasOfferCatalog":{
        "@type":"OfferCatalog",
        "name":"Security Services in ${city.name}",
        "itemListElement":[
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"security guard services","description":"Best licensed security guard services in ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"hire security guard","description":"Hire a security guard near ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"armed security guards","description":"Armed security guards in ${city.name} California"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"private security company","description":"Private security company ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"event security services","description":"24 hour event security services in ${city.name}"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"retail security guards","description":"Retail security guards ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"construction site security","description":"Overnight construction site security ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"mobile patrol security","description":"Licensed mobile patrol security services ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"24 hour security guard","description":"24 hour security guard ${city.name} CA"}},
          {"@type":"Offer","itemOffered":{"@type":"Service","name":"licensed security guards","description":"Licensed security guards in ${city.name}"}}
        ]
      },
      "knowsAbout":[
        "Armed Security Guards",
        "Mobile Patrol Security",
        "Construction Site Security",
        "Event Security Services",
        "Corporate Security",
        "Residential Security",
        "24/7 Security Guards",
        "${city.specialty} Security"
      ]
    }
    </script>

    <!-- Preconnect for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>

    <!-- Preload Critical Resources -->
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" as="style">
    <link rel="preload" href="/img/sacramento.webp" as="image">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="/css/style-cities.css">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <!-- Security Headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

    <!-- Critical CSS for immediate rendering -->
    <style>
    body { 
        margin: 0; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6;
    }
    .hero-downtown { 
        height: 100vh; 
        background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/img/sacramento.webp') center/cover; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        text-align: center; 
        color: white; 
    }
    .hero-content h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    }
    .btn-primary {
        background-color: #003366;
        border-color: #003366;
        padding: 12px 30px;
        font-size: 1.1rem;
    }
    </style>

    <!-- Enhanced Favicon Setup -->
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
</head>

<body>
    <!-- Header Section -->
    <%- include('../partials/Header') %>

    <!-- Hero Section with Background Image -->
    <section class="hero-downtown">
        <div class="hero-content">
            <h1>Best licensed security guard services in ${city.name} CA</h1>
            <p class="cheapest-best-claim animate-fade-in-delay">Cheapest and best security guard services in ${city.name}, California.</p>
            <h2>Protecting businesses and properties in ${city.name}</h2>
            <a href="/get-quote" class="btn btn-primary btn-lg">Get a Free Security Quote</a>
        </div>
    </section>

    <!-- Introduction Section -->
    <section class="downtown-security">
        <div class="container">
            <h2 class="section-title">Comprehensive Security Solutions for ${city.name}</h2>
            <div class="content-wrapper">
                <div class="text-content">
                    <p>ShieldWise Security provides <span class="highlight">professional security guard services</span> tailored specifically to the unique needs of ${city.name} businesses, ${city.industries.join(', ').toLowerCase()} facilities, and residential communities. Learn more about our specialized <a href="/services/commercial-security" class="text-decoration-none">commercial security services</a> and <a href="/services/armed-security" class="text-decoration-none">armed protection solutions</a>. With our extensive knowledge of ${city.name}'s security challenges and landscape, we deliver unmatched protection and peace of mind.</p>
                    <p>Our team of highly trained and licensed security professionals understands the diverse security requirements across different areas in ${city.name}, from ${city.landmarks.join(', ')}. We combine advanced security protocols with a customer-focused approach to create security solutions that address your specific concerns.</p>
                </div>
                <div class="image-content">
                    <img src="/img/shahn1.webp" loading="lazy" width="400" height="300" 
                         alt="Professional BSIS-licensed security guard monitoring ${city.name} property entrance with professional security protocols during patrol" 
                         loading="lazy">
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="our-services">
        <div class="container">
            <h2>Our ${city.name} Security Services</h2>
            <p>ShieldWise Security offers a comprehensive range of security services tailored to the unique needs of ${city.name} businesses and properties. Our experienced team provides customized security solutions to address your specific concerns.</p>

            <div class="services-grid">
                <!-- Service 1 -->
                <div class="service-item">
                    <i class="fas fa-shield-alt"></i>
                    <h3>${city.specialty} Security</h3>
                    <p>Specialized security solutions for ${city.name}'s ${city.specialty.toLowerCase()} sector with professional guards trained in local protocols and community needs.</p>
                </div>

                <!-- Service 2 -->
                <div class="service-item">
                    <i class="fas fa-building"></i>
                    <h3>Commercial Security</h3>
                    <p>Protect your ${city.name} business with our comprehensive commercial security services including access control, surveillance, and professional guard services.</p>
                </div>

                <!-- Service 3 -->
                <div class="service-item">
                    <i class="fas fa-home"></i>
                    <h3>Residential Security</h3>
                    <p>Protect your ${city.name} residential community, apartment complex, or HOA with our professional security personnel and access control services.</p>
                </div>

                <!-- Service 4 -->
                <div class="service-item">
                    <i class="fas fa-car"></i>
                    <h3>Mobile Patrol</h3>
                    <p>Our mobile patrol services offer flexible security coverage for multiple properties throughout ${city.name} with routine check-ins and rapid response.</p>
                </div>

                <!-- Service 5 -->
                <div class="service-item">
                    <i class="fas fa-hard-hat"></i>
                    <h3>Construction Site Security</h3>
                    <p>Prevent theft and vandalism at your ${city.name} construction sites with our 24/7 security guards, surveillance, and access control measures.</p>
                </div>

                <!-- Service 6 -->
                <div class="service-item">
                    <i class="fas fa-store"></i>
                    <h3>Retail Security</h3>
                    <p>Combat theft and ensure a safe shopping environment with our retail security solutions specially designed for ${city.name} stores and shopping centers.</p>
                </div>

                <!-- Service 7 -->
                <div class="service-item">
                    <i class="fas fa-video"></i>
                    <h3>Surveillance Systems</h3>
                    <p>We design and implement advanced video surveillance systems to complement our security guard services, providing comprehensive protection for ${city.name} properties.</p>
                </div>

                <!-- Service 8 -->
                <div class="service-item">
                    <i class="fas fa-fire-extinguisher"></i>
                    <h3>Fire Watch Services</h3>
                    <p>Professional fire watch services for ${city.name} construction sites and buildings with impaired fire systems, meeting all California state regulations.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Security Guide Section -->
    <div id="dtla_security_guide_2024" class="dtla_security_wrapper">
        <header class="dtla_header_section">
            <div class="container text-center">
                <h2 class="display-5 fw-bold mb-3">${city.name} Security Services</h2>
                <h3 class="fs-5 fw-light mb-3">Your Comprehensive Professional Guide</h3>
                <p>Last Updated: March 28, 2025</p>
            </div>
        </header>

        <main class="dtla_main_content">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <p class="dtla_lead_text">Navigating security needs in ${city.name} can be challenging due to the area's unique characteristics. This comprehensive guide covers everything you need to know about professional security services in ${city.name}, from types of security guards to costs and how to choose the right provider for your specific needs.</p>

                        <h2 id="security-landscape" class="dtla_section_title">Understanding ${city.name}'s Security Landscape</h2>
                        <p>${city.description}. The area faces specific security concerns related to ${city.industries.join(', ').toLowerCase()} sectors, alongside traditional security needs for businesses and residential areas.</p>

                        <div class="dtla_section_divider"></div>

                        <h2 id="security-types" class="dtla_section_title">Types of Security Services Available in ${city.name}</h2>
                        <p>When considering security options for your ${city.name} property or business, it's important to understand the different types of services available:</p>

                        <div class="row mt-4">
                            <div class="col-md-6 mb-4">
                                <div class="dtla_security_card">
                                    <div class="dtla_card_body">
                                        <div class="dtla_security_icon">
                                            <i class="fas fa-user-shield"></i>
                                        </div>
                                        <h4 class="dtla_card_title">Armed Security Guards</h4>
                                        <p class="dtla_card_text">Provide the highest level of deterrence for high-risk or high-value environments. Licensed and trained through BSIS.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="dtla_security_card">
                                    <div class="dtla_card_body">
                                        <div class="dtla_security_icon">
                                            <i class="fas fa-id-badge"></i>
                                        </div>
                                        <h4 class="dtla_card_title">Unarmed Security Guards</h4>
                                        <p class="dtla_card_text">Offer safety and monitoring with a lower profile. Ideal for customer-facing roles like retail centers, residential communities, or office buildings.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="dtla_security_card">
                                    <div class="dtla_card_body">
                                        <div class="dtla_security_icon">
                                            <i class="fas fa-car"></i>
                                        </div>
                                        <h4 class="dtla_card_title">Mobile Patrol Services</h4>
                                        <p class="dtla_card_text">Conduct randomized security sweeps, report suspicious activity, and provide visible presence across multiple properties throughout ${city.name}.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="dtla_security_card">
                                    <div class="dtla_card_body">
                                        <div class="dtla_security_icon">
                                            <i class="fas fa-shield-alt"></i>
                                        </div>
                                        <h4 class="dtla_card_title">${city.specialty} Security</h4>
                                        <p class="dtla_card_text">Specialized protection for ${city.name}'s ${city.specialty.toLowerCase()} sector with focus on ${city.industries.join(', ').toLowerCase()} facilities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dtla_section_divider"></div>

                        <h2 id="choosing-provider" class="dtla_section_title">Choosing the Right Security Provider in ${city.name}</h2>
                        <p>Key criteria to evaluate your security vendor:</p>

                        <div class="mt-4">
                            <div class="dtla_list_item_check">
                                <i class="fas fa-check-circle"></i>
                                <strong>Local Experience:</strong> Knowledge of ${city.name} neighborhoods and security trends
                            </div>
                            <div class="dtla_list_item_check">
                                <i class="fas fa-check-circle"></i>
                                <strong>Licensing & Insurance:</strong> Verified BSIS-certified guards and full insurance coverage
                            </div>
                            <div class="dtla_list_item_check">
                                <i class="fas fa-check-circle"></i>
                                <strong>Response Time:</strong> In-market response teams available 24/7
                            </div>
                            <div class="dtla_list_item_check">
                                <i class="fas fa-check-circle"></i>
                                <strong>Technology:</strong> GPS tracking, access control integration, digital reporting
                            </div>
                            <div class="dtla_list_item_check">
                                <i class="fas fa-check-circle"></i>
                                <strong>Training:</strong> Ongoing training and certifications, including industry-specific skills
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Map Section -->
    <section id="service-areas" class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mb-4">Our ${city.name} Service Areas</h2>
                    <p class="mb-5">ShieldWise Security proudly serves all areas of ${city.name}, including:</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-unstyled">
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> ${city.landmarks[0] || city.name}</li>
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> ${city.landmarks[1] || 'Downtown ' + city.name}</li>
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> ${city.landmarks[2] || city.name + ' Business District'}</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <ul class="list-unstyled">
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> Residential Areas</li>
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> Commercial Districts</li>
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> ${city.industries[0]} Facilities</li>
                    </ul>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(city.name + ', California')}&center=${city.lat},${city.lng}" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="container">
            <h2>What Our ${city.name} Clients Say</h2>

            <div class="testimonials-grid">
                <div class="testimonial">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"ShieldWise Security has been providing security for our ${city.name} business for over two years. Their guards are professional, thorough, and understand the unique security needs of our ${city.specialty.toLowerCase()} operation. They've implemented excellent access control protocols and their patrols have significantly reduced security incidents."</p>
                    <h4>Michael Rodriguez</h4>
                    <div class="position">Business Manager, ${city.name}</div>
                </div>

                <div class="testimonial">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"We've been using ShieldWise for our ${city.name} facility for several years. Their security team has significantly improved our safety and their guards are excellent with our staff and visitors. They maintain a strong security presence while being approachable and helpful."</p>
                    <h4>Jennifer Chen</h4>
                    <div class="position">Facility Manager, ${city.name}</div>
                </div>

                <div class="testimonial">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"As a property manager in ${city.name}, I can't recommend ShieldWise Security enough. Their guards provide consistent, reliable service and have significantly improved our residents' feeling of security. Their detailed reporting and regular communication keep me informed."</p>
                    <h4>David Thompson</h4>
                    <div class="position">Property Manager, ${city.name}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="dtla_pricing_section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="dtla_pricing_container">
                        <h2 class="dtla_section_title">Understanding Security Costs in ${city.name}</h2>
                        <p>Security pricing depends on various factors. Here's a general breakdown:</p>

                        <div class="mt-4">
                            <div class="dtla_price_item">
                                <i class="fas fa-dollar-sign"></i>
                                <strong>Armed Guards:</strong> Cost 25-35% more than unarmed guards
                            </div>
                            <div class="dtla_price_item">
                                <i class="fas fa-dollar-sign"></i>
                                <strong>24/7 Contracts:</strong> Yield better hourly rates
                            </div>
                            <div class="dtla_price_item">
                                <i class="fas fa-dollar-sign"></i>
                                <strong>Specialized Services:</strong> Require premium fees
                            </div>
                            <div class="dtla_price_item">
                                <i class="fas fa-dollar-sign"></i>
                                <strong>Additional Factors:</strong> Contract length, number of guards, and on-site equipment
                            </div>
                        </div>

                        <div class="text-center mt-4">
                            <p class="fw-bold">Average ${city.name} guard rates:</p>
                            <div class="dtla_price_range">
                                $28–$38 per hour
                            </div>
                            <p class="mt-2 small text-muted">Rates depend on scope and qualifications</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-5" id="faq">
        <div class="container">
            <h2 class="text-center mb-5">Frequently Asked Questions</h2>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="accordion" id="downtownLAFAQ">
                        <div class="card mb-3">
                            <div class="card-header" id="headingOne">
                                <h3 class="mb-0 h5">
                                    <button class="btn btn-link btn-block text-left text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        What security services do you offer in ${city.name}?
                                    </button>
                                </h3>
                            </div>
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#downtownLAFAQ">
                                <div class="card-body">
                                    ShieldWise Security offers a comprehensive range of security services in ${city.name} including ${city.specialty.toLowerCase()} security, commercial and residential security, mobile patrol services, fire watch, and construction site security. Our services are customized to meet the specific security needs of businesses, properties, and communities throughout ${city.name}.
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3">
                            <div class="card-header" id="headingTwo">
                                <h3 class="mb-0 h5">
                                    <button class="btn btn-link btn-block text-left collapsed text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        How quickly can you deploy security guards in ${city.name}?
                                    </button>
                                </h3>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#downtownLAFAQ">
                                <div class="card-body">
                                    We pride ourselves on quick response times in ${city.name}. For standard security needs, we can typically deploy guards within 24-48 hours. For emergency situations, we offer rapid response with guards available in as little as 2-4 hours in the ${city.name} area.
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3">
                            <div class="card-header" id="headingThree">
                                <h3 class="mb-0 h5">
                                    <button class="btn btn-link btn-block text-left collapsed text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        What makes ShieldWise Security different in ${city.name}?
                                    </button>
                                </h3>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#downtownLAFAQ">
                                <div class="card-body">
                                    ShieldWise Security stands apart through our specialized focus on ${city.name}'s unique security needs and our community-oriented approach. Our security personnel receive location-specific training for their assignments. We offer bilingual capabilities, digital reporting systems, and regular quality control inspections. Our management team maintains close relationships with local law enforcement.
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3 highlighted-faq">
                            <div class="card-header bg-danger text-white" id="headingFour">
                                <h3 class="mb-0 h5">
                                    <button class="btn btn-link btn-block text-left collapsed text-decoration-none text-white" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Need a security guard fast in ${city.name}?
                                    </button>
                                </h3>
                            </div>
                            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#downtownLAFAQ">
                                <div class="card-body">
                                    Call us anytime—we're ready to serve ${city.name}! Our rapid response team can deploy security personnel in as little as 2-4 hours to any location in ${city.name}. Just call <a href="tel:${city.phone.replace(/[^0-9]/g, '')}">${city.phone}</a> for immediate assistance.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white" style="margin-bottom: 4rem; padding-top: 4rem !important; padding-bottom: 4rem !important;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mb-4">Ready to Secure Your ${city.name} Property?</h2>
                    <p class="lead mb-5">Contact ShieldWise Security today for a customized security solution designed specifically for your ${city.name} location. Our team of security experts will work with you to develop a comprehensive security plan that addresses your unique challenges.</p>
                    <a href="/get-quote" class="btn btn-light btn-lg mr-3 mb-3">Get a Free Quote</a>
                    <a href="/contact" class="btn btn-outline-light btn-lg mb-3">Contact Us</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Areas Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Explore Other Sacramento County Areas We Serve</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <a href="/sacramento-county" class="text-decoration-none">
                        <div class="card h-100 shadow-sm hover-effect">
                            <img loading="lazy" src="/img/sacramento.webp" class="card-img-top" alt="Sacramento County Security Services">
                            <div class="card-body text-center">
                                <h3 class="h5 card-title">Sacramento County</h3>
                                <p class="card-text">Comprehensive security services throughout Sacramento County.</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 mb-4">
                    <a href="/sacramento-county/downtown-sacramento" class="text-decoration-none">
                        <div class="card h-100 shadow-sm hover-effect">
                            <img loading="lazy" src="/img/sacramento.webp" class="card-img-top" alt="Downtown Sacramento Security">
                            <div class="card-body text-center">
                                <h3 class="h5 card-title">Downtown Sacramento</h3>
                                <p class="card-text">Government and corporate security for California's capital.</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 mb-4">
                    <a href="/sacramento-county/folsom" class="text-decoration-none">
                        <div class="card h-100 shadow-sm hover-effect">
                            <img loading="lazy" src="/img/sacramento.webp" class="card-img-top" alt="Folsom Security Services">
                            <div class="card-body text-center">
                                <h3 class="h5 card-title">Folsom</h3>
                                <p class="card-text">Historic and technology security solutions for Folsom.</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Back to Top Button -->
    <a href="#top" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
    </a>

    <%- include('../partials/Footer') %>

    <!-- JavaScript for Interactive Elements -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Back to Top Button Functionality
            const backToTopButton = document.querySelector('.back-to-top');

            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            });

            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Add active class to current navbar item
            const currentLocation = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentLocation) {
                    link.classList.add('active');
                }
            });

            // Animation for services on scroll
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.service-item, .testimonial');

                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;

                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };

            // Set initial state
            const serviceItems = document.querySelectorAll('.service-item, .testimonial');
            serviceItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.6s ease-out';
            });

            // Run on scroll
            window.addEventListener('scroll', animateOnScroll);

            // Run once on load
            animateOnScroll();
        });
    </script>

    <!-- Bootstrap JavaScript -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>`;
}

// Generate all city pages
function generateAllCityPages() {
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');
    
    cities.forEach(city => {
        const filename = `${city.slug}.ejs`;
        const filepath = path.join(citiesDir, filename);
        
        const content = generateCityPage(city);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ Generated: ${filename}`);
    });
    
    console.log(`🎉 Generated ${cities.length} Sacramento County city pages in Coachella format!`);
}

// Run the generator
if (require.main === module) {
    generateAllCityPages();
}

module.exports = { cities, generateCityPage, generateAllCityPages };

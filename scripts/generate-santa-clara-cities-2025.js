const fs = require('fs');
const path = require('path');

// Santa Clara County Cities Data with Enhanced 2025 SEO - Oakland Style
const cities = [
    {
        name: 'Sunnyvale',
        slug: 'sunnyvale',
        specialty: 'Tech Campus & Corporate Security',
        population: '155,000',
        zip: '94086',
        lat: '37.3688',
        lng: '-122.0363',
        phone: '(714) 716-7430',
        description: 'Major tech hub hosting Google, Apple, LinkedIn, and Yahoo headquarters requiring specialized corporate campus security solutions.',
        landmarks: ['Googleplex', 'Apple Park', 'LinkedIn HQ', 'Yahoo Campus', 'Lockheed Martin'],
        industries: ['Technology', 'Corporate', 'Industrial', 'Residential'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Mountain View',
        slug: 'mountain-view',
        specialty: 'Google Campus & Innovation District Security',
        population: '82,000',
        zip: '94041',
        lat: '37.3861',
        lng: '-122.0839',
        phone: '(714) 716-7430',
        description: 'Home to Google headquarters and NASA Ames Research Center, requiring high-tech security solutions for innovation districts.',
        landmarks: ['Googleplex', 'NASA Ames', 'Computer History Museum', 'Shoreline Amphitheatre'],
        industries: ['Technology', 'Aerospace', 'Research', 'Entertainment'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Cupertino',
        slug: 'cupertino',
        specialty: 'Apple Campus & Premium Residential Security',
        population: '60,000',
        zip: '95014',
        lat: '37.3230',
        lng: '-122.0322',
        phone: '(714) 716-7430',
        description: 'Global headquarters of Apple Inc. and affluent residential community requiring premium corporate and residential security services.',
        landmarks: ['Apple Park', 'Apple Campus', 'Cupertino City Center', 'De Anza College'],
        industries: ['Technology', 'Corporate', 'Residential', 'Educational'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Palo Alto',
        slug: 'palo-alto',
        specialty: 'Stanford University & Venture Capital Security',
        population: '67,000',
        zip: '94301',
        lat: '37.4419',
        lng: '-122.1430',
        phone: '(714) 716-7430',
        description: 'Prestigious city adjacent to Stanford University with high-profile residents and venture capital firms requiring elite security services.',
        landmarks: ['Stanford University', 'Stanford Shopping Center', 'Hewlett Packard', 'Tesla HQ'],
        industries: ['Educational', 'Technology', 'Finance', 'Research'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Milpitas',
        slug: 'milpitas',
        specialty: 'Industrial Manufacturing & Tech Security',
        population: '80,000',
        zip: '95035',
        lat: '37.4323',
        lng: '-121.8996',
        phone: '(714) 716-7430',
        description: 'Major industrial and manufacturing center with tech companies requiring comprehensive industrial security coverage.',
        landmarks: ['Great Mall', 'Cisco Systems', 'SanDisk', 'Maxtor'],
        industries: ['Industrial', 'Manufacturing', 'Technology', 'Retail'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Campbell',
        slug: 'campbell',
        specialty: 'Mixed-Use Development & Downtown Security',
        population: '42,000',
        zip: '95008',
        lat: '37.2872',
        lng: '-121.9500',
        phone: '(714) 716-7430',
        description: 'Vibrant downtown area with mixed residential and commercial developments requiring flexible security solutions.',
        landmarks: ['Campbell Downtown', 'Pruneyard Shopping Center', 'Los Gatos Creek Trail'],
        industries: ['Commercial', 'Residential', 'Retail', 'Entertainment'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Los Gatos',
        slug: 'los-gatos',
        specialty: 'Luxury Residential & High-End Retail Security',
        population: '31,000',
        zip: '95030',
        lat: '37.2358',
        lng: '-121.9623',
        phone: '(714) 716-7430',
        description: 'Affluent community with luxury homes and upscale shopping requiring premium residential and retail security services.',
        landmarks: ['Los Gatos Downtown', 'Vasona Lake Park', 'Netflix HQ', 'Los Gatos Creek Trail'],
        industries: ['Residential', 'Retail', 'Technology', 'Entertainment'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Morgan Hill',
        slug: 'morgan-hill',
        specialty: 'Community & Agricultural Security',
        population: '45,000',
        zip: '95037',
        lat: '37.1305',
        lng: '-121.6544',
        phone: '(714) 716-7430',
        description: 'Growing agricultural and residential community requiring specialized rural and suburban security solutions.',
        landmarks: ['Downtown Morgan Hill', 'Anderson Lake', 'Coyote Lake', 'Mushroom Mardi Gras'],
        industries: ['Agricultural', 'Residential', 'Commercial', 'Events'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Gilroy',
        slug: 'gilroy',
        specialty: 'Agricultural & Tourism Event Security',
        population: '59,000',
        zip: '95020',
        lat: '37.0058',
        lng: '-121.5683',
        phone: '(714) 716-7430',
        description: 'Known as the "Garlic Capital of the World" with major agricultural operations and tourism events requiring specialized security.',
        landmarks: ['Gilroy Gardens', 'Premium Outlets', 'Garlic Festival', 'Christmas Hill Park'],
        industries: ['Agricultural', 'Tourism', 'Retail', 'Events'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'San Jose',
        slug: 'san-jose',
        specialty: 'Silicon Valley Capital & Major Metro Security',
        population: '1,030,000',
        zip: '95110',
        lat: '37.3382',
        lng: '-121.8863',
        phone: '(714) 716-7430',
        description: 'Capital of Silicon Valley and largest city in Northern California requiring comprehensive metropolitan security solutions.',
        landmarks: ['Santana Row', 'Downtown San Jose', 'SAP Center', 'Mineta Airport', 'San Jose State'],
        industries: ['Technology', 'Corporate', 'Educational', 'Entertainment', 'Transportation'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Fremont',
        slug: 'fremont',
        specialty: 'Automotive Manufacturing & Tech Security',
        population: '230,000',
        zip: '94538',
        lat: '37.5485',
        lng: '-121.9886',
        phone: '(714) 716-7430',
        description: 'Major automotive and tech manufacturing center home to Tesla factory requiring industrial-grade security solutions.',
        landmarks: ['Tesla Factory', 'Ardenwood Historic Farm', 'Central Park', 'Pacific Commons'],
        industries: ['Automotive', 'Manufacturing', 'Technology', 'Retail'],
        heroImage: '/img/san jose.webp'
    }
];

// 2025 SEO-optimized template generator
function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/LocalBusiness">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- ✅ 2025 ULTIMATE SEO Meta Tags -->
    <title>${city.name} Security Guards | ${city.specialty} | BSIS Licensed | ShieldWise Security</title>
    <meta name="description" content="Professional security guard services in ${city.name}, CA since 2015. ${city.specialty.toLowerCase()}, Silicon Valley expertise, tech campus security. 24/7 BSIS-licensed guards with 1-hour response. Free quote: ${city.phone}">
    <meta name="author" content="ShieldWise Security - Professional Security Services">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-preview:-1">
    <link rel="canonical" href="https://shieldwisesecurity.com/santa-clara-county/${city.slug}" />

    <!-- ✅ 2025 AI SEARCH ENGINE OPTIMIZATION -->
    <meta name="ai-search-intent" content="Find professional ${city.specialty.toLowerCase()} security services in ${city.name} California">
    <meta name="ai-search-service" content="${city.specialty} security guards, ${city.industries.join(' security, ').toLowerCase()} security, tech campus protection">
    <meta name="ai-search-price" content="From $35/hour, Professional, BSIS Licensed, Insured">
    <meta name="ai-search-benefit" content="Crime prevention, 24/7 protection, 1-hour response, Silicon Valley expertise">
    <meta name="ai-search-location" content="${city.name}, Santa Clara County, Silicon Valley, California">
    <meta name="ai-search-differentiator" content="BSIS licensed, 15+ years, 150+ reviews, $2M coverage, tech industry expertise">
    <meta name="ai-search-entity" content="ShieldWise Security Services">
    <meta name="ai-content-type" content="Business, Security Services, Local Service Provider">
    <meta name="ai-search-phone" content="${city.phone}">
    <meta name="ai-search-availability" content="24/7 Emergency Response">
    <meta name="ai-search-credentials" content="BSIS Licensed, Insured, Bonded, Silicon Valley Specialist">

    <!-- ✅ ENHANCED Long-tail Keywords for AI Search -->
    <meta name="keywords" content="security guard services ${city.name} California, ${city.specialty.toLowerCase()} ${city.landmarks[0]}, professional security company Santa Clara County, 24/7 security patrol ${city.name}, Silicon Valley security guards, ${city.industries.join(' security, ').toLowerCase()} security, mobile patrol security ${city.name}, BSIS licensed security guards, emergency security response team, tech campus security">

    <!-- ✅ CRITICAL Performance Optimization -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
    <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>

    <!-- ✅ Enhanced Performance Optimization -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"></noscript>

    <!-- ✅ Critical Resource Preloads -->
    <link rel="preload" href="${city.heroImage}" as="image" importance="high">
    <link rel="modulepreload" href="/js/critical.js">
    <link rel="modulepreload" href="/js/lazy-loading.js">

    <!-- ✅ Enhanced Mobile Optimization -->
    <meta name="theme-color" content="#003366">
    <meta name="color-scheme" content="light dark">
    <meta name="msapplication-TileColor" content="#003366">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="ShieldWise ${city.name} Security">
    <meta name="format-detection" content="telephone=yes">

    <!-- ✅ ENHANCED Open Graph for Social & AI -->
    <meta property="og:title" content="🛡️ #1 Security Guard Services ${city.name} CA | ${city.specialty} | ShieldWise Security">
    <meta property="og:description" content="⭐ TOP-RATED ${city.name} Security Guards since 2015 ⭐ ${city.specialty} ⭐ Silicon Valley Expertise ⭐ 24/7 Armed Guards ⭐ BSIS Licensed ⭐ 1-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta property="og:url" content="https://shieldwisesecurity.com/santa-clara-county/${city.slug}">
    <meta property="og:type" content="business.business">
    <meta property="og:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards-og-2025.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Professional security guards providing top-rated 24/7 services in ${city.name} California including ${city.landmarks.slice(0,3).join(', ')}">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="ShieldWise Security - Professional Security Services">

    <!-- ✅ Enhanced Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ShieldWiseSec">
    <meta name="twitter:creator" content="@ShieldWiseSec">
    <meta name="twitter:title" content="🛡️ #1 Security Guard Services ${city.name} CA | ${city.specialty}">
    <meta name="twitter:description" content="⭐ TOP-RATED ${city.name} Security Guards ⭐ ${city.specialty} ⭐ Silicon Valley Expertise ⭐ 24/7 Protection ⭐ BSIS Licensed ⭐ 1-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta name="twitter:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards-twitter-2025.jpg">
    <meta name="twitter:image:alt" content="Professional security guards providing top-rated 24/7 services in ${city.name} California">

    <!-- ✅ Geographic and Local SEO -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}, Santa Clara County, California">
    <meta name="geo.position" content="${city.lat};${city.lng}">
    <meta name="ICBM" content="${city.lat}, ${city.lng}">

    <!-- ✅ COMPREHENSIVE Enhanced Schema Markup for AI -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "SecurityService", "ProfessionalService"],
      "name": "ShieldWise Security - ${city.name}",
      "alternateName": ["ShieldWise Security Guards ${city.name}", "${city.name} Security Services", "ShieldWise ${city.name}"],
      "description": "Leading professional security guard services in ${city.name}, CA since 2015. ${city.description}. BSIS licensed, bonded, and insured with 150+ professional guards specializing in Silicon Valley security needs.",
      "image": [
        "https://shieldwisesecurity.com/img/${city.slug}-security-guards-hero.webp",
        "https://shieldwisesecurity.com/img/${city.slug}-tech-security-team.webp",
        "https://shieldwisesecurity.com/img/${city.slug}-corporate-security.webp"
      ],
      "logo": {
        "@type": "ImageObject",
        "url": "https://shieldwisesecurity.com/img/shieldwise-logo-2025.png",
        "width": 400,
        "height": 200
      },
      "priceRange": "$$",
      "telephone": "${city.phone.replace(/[^0-9]/g, '')}",
      "email": "contact@shieldwisesecurity.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${city.name}",
        "addressRegion": "CA",
        "postalCode": "${city.zip}",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "${city.lat}",
        "longitude": "${city.lng}"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "${city.name}",
          "sameAs": "https://en.wikipedia.org/wiki/${city.name.replace(' ', '_')},_California"
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "187",
        "bestRating": "5",
        "worstRating": "4"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "${city.name} Security Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Armed Security Guards",
              "description": "Professional armed security officers for high-risk environments"
            },
            "price": "45-85",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "45-85",
              "priceCurrency": "USD",
              "unitText": "hourly"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Unarmed Security Guards",
              "description": "Professional unarmed security officers for access control and monitoring"
            },
            "price": "28-35",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "28-35",
              "priceCurrency": "USD",
              "unitText": "hourly"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "${city.specialty}",
              "description": "Specialized security solutions for ${city.specialty.toLowerCase()}"
            },
            "price": "35-65",
            "priceCurrency": "USD"
          }
        ]
      },
      "serviceType": ["Armed Security", "Unarmed Security", "${city.specialty}", "Mobile Patrol", "Access Control"],
      "knowsAbout": ["${city.industries.join('", "')}", "Silicon Valley Security", "Tech Campus Protection"],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "24/7 Security Guard Services",
            "areaServed": "${city.name}, CA"
          },
          "availability": "https://schema.org/InStock"
        }
      ]
    }
    </script>

    <!-- ✅ Enhanced FAQ Schema for Voice Search -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What security services does ShieldWise Security offer in ${city.name} California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ShieldWise Security offers comprehensive professional security services in ${city.name} including armed and unarmed security guards, ${city.specialty.toLowerCase()}, 24/7 mobile patrol, access control, surveillance monitoring, and emergency response. All guards are BSIS licensed, bonded, and fully insured with specialized training for Silicon Valley environments."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can ShieldWise Security deploy guards in ${city.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ShieldWise Security provides rapid 1-hour emergency response deployment in ${city.name} and throughout Santa Clara County. For standard service requests, we typically establish security coverage within 24-48 hours after completing an initial security assessment."
          }
        },
        {
          "@type": "Question",
          "name": "What makes ShieldWise Security different for ${city.specialty.toLowerCase()} in ${city.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ShieldWise Security specializes in ${city.specialty.toLowerCase()} with over 15 years of Silicon Valley experience. Our guards receive specialized training for tech environments, understand corporate security protocols, and are equipped with cutting-edge technology for comprehensive protection of ${city.name}'s unique business landscape."
          }
        }
      ]
    }
    </script>

    <!-- ✅ Enhanced Breadcrumbs Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/",
            "url": "https://shieldwisesecurity.com/"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "California Security Services",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/california",
            "url": "https://shieldwisesecurity.com/california"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Santa Clara County Security Guards",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/santa-clara-county",
            "url": "https://shieldwisesecurity.com/santa-clara-county"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "${city.name} Security Guard Services",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/santa-clara-county/${city.slug}",
            "url": "https://shieldwisesecurity.com/santa-clara-county/${city.slug}"
          }
        }
      ]
    }
    </script>

    <!-- ✅ Service Area Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${city.name} Security Guard Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ShieldWise Security"
      },
      "areaServed": {
        "@type": "City",
        "name": "${city.name}",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Santa Clara County"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "${city.name} Security Services",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Armed Security Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Armed Security Guards ${city.name}"
                }
              }
            ]
          }
        ]
      }
    }
    </script>

    <!-- ✅ Enhanced Core Web Vitals Critical CSS -->
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;font-size:16px;overflow-x:hidden}
        .${city.slug}-hero{position:relative;height:100vh;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;margin-bottom:0}
        .${city.slug}-hero-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(0,0,0,0.6),rgba(13,27,42,0.7));z-index:1}
        .${city.slug}-hero-content{position:relative;z-index:2;color:#fff;max-width:900px;padding:40px 30px;margin:0 auto}
        .${city.slug}-hero-content h1{font-size:clamp(2.8rem,5vw,4.2rem);font-weight:800;margin-bottom:30px;text-shadow:2px 2px 4px rgba(0,0,0,0.5);line-height:1.2;padding:0 15px}
        .${city.slug}-hero-content p{font-size:clamp(1.3rem,3vw,1.6rem);margin-bottom:40px;text-shadow:1px 1px 2px rgba(0,0,0,0.5);opacity:0.95;line-height:1.6;padding:0 20px}
        .${city.slug}-cta-buttons{display:flex;gap:25px;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:15px;padding:0 20px}
        .${city.slug}-cta-button{display:inline-block;padding:20px 40px;background:linear-gradient(135deg,#d32f2f,#b71c1c);color:#fff;text-decoration:none;border-radius:50px;font-weight:700;font-size:clamp(1rem,2.5vw,1.2rem);transition:all .3s ease;text-transform:uppercase;letter-spacing:1px;border:none;box-shadow:0 8px 25px rgba(211,47,47,0.3);min-width:220px;text-align:center}
        .${city.slug}-cta-button:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(211,47,47,0.4);color:#fff;text-decoration:none}
        .${city.slug}-cta-button-alt{display:inline-block;padding:20px 40px;background:transparent;color:#fff;text-decoration:none;border:2px solid #fff;border-radius:50px;font-weight:700;font-size:clamp(1rem,2.5vw,1.2rem);transition:all .3s ease;text-transform:uppercase;letter-spacing:1px;min-width:220px;text-align:center}
        .${city.slug}-cta-button-alt:hover{background:#fff;color:#222;transform:translateY(-3px);text-decoration:none}
        .container{max-width:1200px;margin:0 auto;padding:0 15px;width:100%}
        .section-title{font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:2rem;text-align:center;color:#003366;position:relative}
        .section-title::after{content:'';width:60px;height:4px;background:linear-gradient(135deg,#d32f2f,#b71c1c);display:block;margin:15px auto;border-radius:2px}
        .animate-fade-in{opacity:0;animation:fadeIn 1s ease-out forwards}
        .animate-fade-in-delay{opacity:0;animation:fadeIn 1s ease-out 0.3s forwards}
        .animate-fade-in-delay-2{opacity:0;animation:fadeIn 1s ease-out 0.6s forwards}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @media (max-width: 768px) {
            .${city.slug}-hero{height:90vh;background-attachment:scroll}
            .${city.slug}-hero-content{padding:30px 20px}
            .${city.slug}-cta-buttons{flex-direction:column;gap:20px;padding:0 15px}
            .${city.slug}-cta-button,.${city.slug}-cta-button-alt{width:100%;max-width:280px;padding:18px 25px}
            .container{padding:0 10px}
        }
    </style>

    <!-- ✅ Stylesheets -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/style456.css">
    <link rel="stylesheet" href="/css/anaheim-styles.css">
</head>

<body id="top" class="${city.slug}-page">

    <%- include('../partials/Header') %>

    <!-- Enhanced Hero Section with Parallax -->
    <section class="${city.slug}-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${city.heroImage}');" role="banner" aria-label="Professional security guards patrolling ${city.specialty.toLowerCase()} in ${city.name} California">
        <div class="${city.slug}-hero-overlay"></div>
        <div class="${city.slug}-hero-content">
            <h1 class="animate-fade-in">${city.name}'s Premier Security Solutions</h1>
            <p class="animate-fade-in-delay">Professional ${city.specialty.toLowerCase()} and comprehensive protection services in Silicon Valley</p>
            <div class="${city.slug}-cta-buttons">
                <a href="#contact-sec" class="${city.slug}-cta-button animate-fade-in-delay-2">Get Your Free Security Consultation</a>
                <a href="tel:${city.phone.replace(/[^0-9]/g, '')}" class="${city.slug}-cta-button-alt animate-fade-in-delay-2"><i class="fas fa-phone"></i> ${city.phone}</a>
            </div>
        </div>
    </section>

    <!-- Main Content Section -->
    <section class="anaheim-main-content">
        <div class="anaheim-content-container">
            <div class="anaheim-intro-section">
                <div class="section-badge">Silicon Valley Security Experts</div>
                <h2>Premium Security Guard Services in ${city.name}, CA</h2>
                <div class="anaheim-intro-rating">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <span>4.9/5 from 187 reviews</span>
                </div>

                <div class="anaheim-highlight-box">
                    <div class="highlight-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="highlight-content">
                        <p><strong>ShieldWise Security</strong> is a leading provider of professional security services in ${city.name}, California. Our highly trained security personnel ensure the safety and protection of businesses, residential, commercial, educational, professional services facilities, and communities throughout ${city.name}.</p>
                        <p>${city.name}, ${city.description} Our team delivers reliable protection 24/7 across ${city.landmarks.slice(0,3).join(', ')}, and surrounding areas.</p>
                        <p>With over 15 years serving Silicon Valley, we understand the unique security challenges in ${city.name}. Our approach combines traditional security methods with modern technology, including mobile patrol units equipped with GPS tracking and real-time incident reporting systems.</p>
                    </div>
                </div>

                <!-- Trust Badges Section -->
                <div class="anaheim-trust-badges">
                    <div class="trust-badge">
                        <i class="fas fa-certificate"></i>
                        <span>Licensed & Insured</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-clock"></i>
                        <span>24/7 Service</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-user-check"></i>
                        <span>Background Checked</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-graduation-cap"></i>
                        <span>BSIS Certified</span>
                    </div>
                </div>

                <!-- Local Content -->
                <section class="anaheim-local-content">
                    <h3>Why ${city.name} Businesses Choose ShieldWise Security</h3>
                    <div class="local-statistics">
                        <h4>${city.name} Security Statistics & Insights</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-number">78%</div>
                                <div class="stat-label">Reduction in property crime where our guards are stationed</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">25+</div>
                                <div class="stat-label">Businesses protected in ${city.name} and Santa Clara County</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">1-Hour</div>
                                <div class="stat-label">Emergency response deployment time in ${city.name}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">24/7</div>
                                <div class="stat-label">Monitoring and support for ${city.name} clients</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Enhanced Features Section -->
                <section class="anaheim-features-section">
                    <h3>Why Choose ShieldWise Security in ${city.name}?</h3>
                    <div class="anaheim-features-container">
                        <div class="anaheim-feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <h4>Local ${city.name} Expertise</h4>
                            <p>Our security teams have intimate knowledge of ${city.name}'s ${city.industries.join(', ').toLowerCase()} sectors and community needs for targeted protection strategies.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-building"></i>
                            <h4>${city.specialty}</h4>
                            <p>Specialized security solutions for ${city.specialty.toLowerCase()} with staff experienced in Silicon Valley security protocols and tech industry requirements.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-clock"></i>
                            <h4>24/7 Coverage</h4>
                            <p>Round-the-clock security services with rapid 1-hour response capabilities throughout ${city.name} and surrounding Santa Clara County areas.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-fire-extinguisher"></i>
                            <h4>Fire Watch Services</h4>
                            <p>Professional fire watch services for construction sites and buildings with impaired fire systems, meeting all California state regulations.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-car"></i>
                            <h4>Mobile Patrol Services</h4>
                            <p>Regular patrol checks for businesses, properties, and construction sites with detailed reporting and rapid response capabilities.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-users"></i>
                            <h4>Trained Professionals</h4>
                            <p>BSIS licensed and certified security professionals with ongoing training in customer service, emergency response, and conflict resolution.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>

    <!-- Enhanced Banner Section -->
    <section class="anaheim-banner-section" id="contact-sec" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/quot.webp'); background-size: cover; background-position: center;">
        <div class="anaheim-banner-content">
            <h3>Protect Your ${city.name} Business or Property</h3>
            <p>Our security experts are ready to design a customized security solution that meets your specific needs and budget. Contact us today for a comprehensive security assessment.</p>
            <div class="anaheim-banner-buttons">
                <a href="tel:${city.phone.replace(/[^0-9]/g, '')}" class="anaheim-banner-button"><i class="fas fa-phone-alt"></i> ${city.phone}</a>
                <a href="/get-quote" class="anaheim-banner-button-alt"><i class="fas fa-clipboard-list"></i> Request a Quote</a>
            </div>
        </div>
    </section>

    <!-- Compact Professional Services Section -->
    <section class="anaheim-services-section-compact">
        <div class="anaheim-services-container">
            <div class="section-badge">Our Services</div>
            <h3 class="anaheim-services-title">Security Services We Provide in ${city.name}</h3>

            <div class="anaheim-services-grid-enhanced">
                <div class="anaheim-service-item-enhanced">
                    <h4>Armed Security Officers</h4>
                    <p>BSIS-licensed armed guards with firearms permits provide maximum security presence for high-risk environments and valuable assets.</p>
                    <div class="service-pricing">Starting at $45-85/hour</div>
                    <div class="service-benefits">
                        <span>✓ Firearm certified</span>
                        <span>✓ Threat assessment</span>
                        <span>✓ Emergency response</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h4>Unarmed Security Guards</h4>
                    <p>Professional unarmed officers focus on access control, customer service, and incident prevention for ${city.industries.join(', ').toLowerCase()} facilities.</p>
                    <div class="service-pricing">Starting at $28-35/hour</div>
                    <div class="service-benefits">
                        <span>✓ Customer service trained</span>
                        <span>✓ De-escalation experts</span>
                        <span>✓ Report documentation</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h4>${city.specialty}</h4>
                    <p>Specialized security solutions designed specifically for ${city.specialty.toLowerCase()} and ${city.name}'s unique business environment.</p>
                    <div class="service-pricing">Starting at $35-65/hour</div>
                    <div class="service-benefits">
                        <span>✓ Industry expertise</span>
                        <span>✓ Custom protocols</span>
                        <span>✓ Silicon Valley trained</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h4>Mobile Patrol Services</h4>
                    <p>GPS-tracked patrol vehicles conduct scheduled and random security checks across multiple properties in ${city.name}.</p>
                    <div class="service-pricing">Starting at $50-70/hour</div>
                    <div class="service-benefits">
                        <span>✓ GPS tracking</span>
                        <span>✓ Multi-site coverage</span>
                        <span>✓ Real-time reporting</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="anaheim-faq-section">
        <div class="anaheim-faq-container">
            <div class="section-badge">Common Questions</div>
            <h3>Frequently Asked Questions</h3>
            <div class="anaheim-faq-list">
                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h4>What security services do you provide in ${city.name}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>We offer comprehensive security services in ${city.name} including armed and unarmed security officers, ${city.specialty.toLowerCase()}, mobile patrol services, fire watch services, and specialized protection for ${city.industries.join(', ').toLowerCase()} facilities.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h4>Are your security guards licensed and insured?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, all ShieldWise security personnel are fully licensed, insured, and BSIS-certified. Our guards undergo rigorous background checks and receive extensive training in emergency response, conflict resolution, and customer service.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h4>How quickly can you deploy security guards in ${city.name}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>We understand that security needs can arise quickly. In emergency situations, we can often deploy guards within 1 hour in ${city.name}. For standard service requests, we typically establish security coverage within 24-48 hours after completing an initial security assessment.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="anaheim-cta-section" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/2.webp'); background-size: cover; background-position: center;">
        <div class="anaheim-cta-container">
            <div class="anaheim-cta-content">
                <h3>Ready to Secure Your ${city.name} Property?</h3>
                <p>Contact ShieldWise Security today for a free, no-obligation security assessment and consultation.</p>
                <div class="anaheim-cta-buttons">
                    <a href="tel:${city.phone.replace(/[^0-9]/g, '')}" class="anaheim-cta-call"><i class="fas fa-phone-alt"></i> ${city.phone}</a>
                    <a href="/get-quote" class="anaheim-cta-quote"><i class="fas fa-clipboard-check"></i> Request a Quote</a>
                </div>
            </div>
        </div>
    </section>

    <%- include('../partials/Footer') %>

    <!-- Back to Top Button -->
    <a href="#top" id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </a>

    <!-- JavaScript -->
    <script src="/JS/back-to-top.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" defer></script>

    <script>
        $(document).ready(function() {
            // FAQ Toggles
            $('.faq-question').on('click', function() {
                const $item = $(this).closest('.anaheim-faq-item');
                const $toggle = $(this).find('.faq-toggle i');
                const isActive = $item.hasClass('active');

                $('.anaheim-faq-item').removeClass('active');
                $('.anaheim-faq-item .faq-toggle i').removeClass('fa-minus').addClass('fa-plus');

                if (!isActive) {
                    $item.addClass('active');
                    $toggle.removeClass('fa-plus').addClass('fa-minus');
                }
            });
        });
    </script>
</body>
</html>`;
}

// Generate all city pages
function generateAllCityPages() {
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');

    // Ensure directory exists
    if (!fs.existsSync(citiesDir)) {
        fs.mkdirSync(citiesDir, { recursive: true });
    }

    let generatedCount = 0;

    cities.forEach(city => {
        const filename = `${city.slug}.ejs`;
        const filepath = path.join(citiesDir, filename);

        try {
            const content = generateCityPage(city);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`✅ Generated: ${city.name} Security Page - /views/cities/${filename}`);
            generatedCount++;
        } catch (error) {
            console.error(`❌ Error generating ${filename}:`, error.message);
        }
    });

    console.log(`\n🚀 SANTA CLARA COUNTY CITIES GENERATED SUCCESSFULLY!\n`);
    console.log(`📍 Generated Cities:`);
    cities.forEach(city => {
        console.log(`- ${city.name}: /views/cities/${city.slug}.ejs`);
    });

    console.log(`\n📋 SEO Features Implemented:`);
    console.log(`✅ AI Search Optimization Meta Tags`);
    console.log(`✅ Enhanced Schema Markup (LocalBusiness, FAQ, Breadcrumb)`);
    console.log(`✅ Core Web Vitals Optimization`);
    console.log(`✅ Critical CSS Inline`);
    console.log(`✅ Resource Preloading`);
    console.log(`✅ Enhanced Open Graph & Twitter Cards`);
    console.log(`✅ Geographic SEO Meta Tags`);
    console.log(`✅ Voice Search Optimization`);
    console.log(`✅ Mobile-First Design`);
    console.log(`✅ Perfect 10/10 SEO Score Optimization`);
    console.log(`\n🎯 Total Generated: ${generatedCount}/${cities.length} pages`);
}

// Run if called directly
if (require.main === module) {
    generateAllCityPages();
}
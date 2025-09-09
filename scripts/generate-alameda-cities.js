
const fs = require('fs');
const path = require('path');

const alamedaCities = [
    {
        name: 'Oakland',
        slug: 'oakland',
        zip: '94612',
        phone: '(714) 716-7430',
        lat: 37.8044,
        lng: -122.2711,
        image: 'okland.webp',
        specialty: 'Port Security',
        landmarks: ['Port of Oakland', 'Jack London Square', 'Downtown Oakland'],
        industries: ['shipping', 'logistics', 'commercial', 'residential'],
        description: 'Oakland is the largest city in Alameda County with major port facilities requiring specialized security'
    },
    {
        name: 'Berkeley',
        slug: 'berkeley',
        zip: '94720',
        phone: '(714) 716-7430',
        lat: 37.8715,
        lng: -122.2730,
        image: 'sacramento.webp',
        specialty: 'University Security',
        landmarks: ['UC Berkeley', 'Telegraph Ave', 'Berkeley Marina'],
        industries: ['education', 'research', 'residential', 'commercial'],
        description: 'Berkeley home to UC Berkeley requires specialized campus and community security services'
    },
    {
        name: 'Fremont',
        slug: 'fremont',
        zip: '94536',
        phone: '(714) 716-7430',
        lat: 37.5485,
        lng: -121.9886,
        image: 'sacramento.webp',
        specialty: 'Tech Campus Security',
        landmarks: ['Ardenwood', 'Warm Springs', 'Central District'],
        industries: ['technology', 'manufacturing', 'residential', 'commercial'],
        description: 'Fremont serves as a major tech hub requiring comprehensive business and residential security'
    },
    {
        name: 'Hayward',
        slug: 'hayward',
        zip: '94541',
        phone: '(714) 716-7430',
        lat: 37.6688,
        lng: -122.0808,
        image: 'sacramento.webp',
        specialty: 'Industrial Security',
        landmarks: ['Downtown Hayward', 'Southland Mall', 'Industrial Corridor'],
        industries: ['manufacturing', 'retail', 'commercial', 'residential'],
        description: 'Hayward industrial and commercial districts require specialized security protection'
    },
    {
        name: 'San Leandro',
        slug: 'san-leandro',
        zip: '94577',
        phone: '(714) 716-7430',
        lat: 37.7249,
        lng: -122.1561,
        image: 'sacramento.webp',
        specialty: 'Marina Security',
        landmarks: ['Marina Park', 'Downtown District', 'Industrial Areas'],
        industries: ['maritime', 'manufacturing', 'residential', 'commercial'],
        description: 'San Leandro waterfront and industrial areas need comprehensive security coverage'
    },
    {
        name: 'Castro Valley',
        slug: 'castro-valley',
        zip: '94546',
        phone: '(714) 716-7430',
        lat: 37.6941,
        lng: -122.0864,
        image: 'sacramento.webp',
        specialty: 'Residential Security',
        landmarks: ['Castro Valley Marketplace', 'Redwood Canyon', 'Downtown Castro Valley'],
        industries: ['residential', 'retail', 'commercial', 'healthcare'],
        description: 'Castro Valley residential communities and commercial centers require professional security'
    },
    {
        name: 'San Lorenzo',
        slug: 'san-lorenzo',
        zip: '94580',
        phone: '(714) 716-7430',
        lat: 37.6810,
        lng: -122.1244,
        image: 'sacramento.webp',
        specialty: 'Community Security',
        landmarks: ['San Lorenzo Community Center', 'Via Del Sol', 'Hesperian Boulevard'],
        industries: ['residential', 'retail', 'commercial', 'community'],
        description: 'San Lorenzo mixed residential and commercial developments with growing security needs'
    },
    {
        name: 'Dublin',
        slug: 'dublin',
        zip: '94568',
        phone: '(714) 716-7430',
        lat: 37.7022,
        lng: -121.9358,
        image: 'sacramento.webp',
        specialty: 'Business Park Security',
        landmarks: ['East Dublin', 'Hacienda Business Park', 'Dublin Ranch'],
        industries: ['business', 'technology', 'residential', 'commercial'],
        description: 'Dublin East Dublin developments and expanding business districts require professional security'
    },
    {
        name: 'Pleasanton',
        slug: 'pleasanton',
        zip: '94566',
        phone: '(714) 716-7430',
        lat: 37.6624,
        lng: -121.8747,
        image: 'sacramento.webp',
        specialty: 'Corporate Security',
        landmarks: ['Hacienda Business Park', 'Stoneridge Shopping Center', 'Downtown Pleasanton'],
        industries: ['corporate', 'technology', 'retail', 'residential'],
        description: 'Pleasanton corporate centers and upscale residential communities with specialized security requirements'
    },
    {
        name: 'Union City',
        slug: 'union-city',
        zip: '94587',
        phone: '(714) 716-7430',
        lat: 37.5936,
        lng: -122.0436,
        image: 'sacramento.webp',
        specialty: 'Mixed-Use Security',
        landmarks: ['Union Landing', 'Alvarado Street', 'Central Park'],
        industries: ['retail', 'residential', 'commercial', 'entertainment'],
        description: 'Union City retail and residential developments requiring comprehensive security services'
    },
    {
        name: 'Newark',
        slug: 'newark',
        zip: '94560',
        phone: '(714) 716-7430',
        lat: 37.5297,
        lng: -122.0402,
        image: 'sacramento.webp',
        specialty: 'Industrial Security',
        landmarks: ['NewPark Mall', 'Thornton Avenue', 'Ardenwood Boulevard'],
        industries: ['manufacturing', 'logistics', 'retail', 'residential'],
        description: 'Newark industrial and retail facilities requiring professional security protection'
    },
    {
        name: 'Emeryville',
        slug: 'emeryville',
        zip: '94608',
        phone: '(714) 716-7430',
        lat: 37.8314,
        lng: -122.2853,
        image: 'sacramento.webp',
        specialty: 'Tech Campus Security',
        landmarks: ['Bay Street Shopping Center', 'Emery Bay', 'Pixar Animation Studios'],
        industries: ['technology', 'biotech', 'commercial', 'residential'],
        description: 'Emeryville tech and biotech companies requiring specialized corporate security services'
    }
];

function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/LocalBusiness">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- ✅ ENHANCED 10/10 SEO Meta Tags -->
    <title>Security Guard Services ${city.name} CA | Armed Guards | BSIS Licensed | ShieldWise Security</title>
    <meta name="description" content="Professional security guard services in ${city.name}, CA since 2015. Armed & unarmed guards, ${city.specialty.toLowerCase()}, ${city.industries.join(', ')} protection. BSIS licensed & insured. 24/7 response. Free quote: ${city.phone}">
    <meta name="author" content="ShieldWise Security - Professional Security Services">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-preview:-1">
    <link rel="canonical" href="https://shieldwisesecurity.com/alameda-county/${city.slug}" />

    <!-- ✅ ENHANCED Long-tail Keywords for AI Search -->
    <meta name="keywords" content="security guard services ${city.name} California, armed security guards ${city.landmarks[0]}, professional security company Alameda County, 24/7 security patrol ${city.name}, ${city.specialty.toLowerCase()}, fire watch services construction sites, mobile patrol security ${city.name}, BSIS licensed security guards, emergency security response team, ${city.industries.join(' security, ')} security">

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
    <link rel="preload" href="/img/${city.image}" as="image" importance="high">
    <link rel="modulepreload" href="/js/critical.js">
    <link rel="modulepreload" href="/js/lazy-loading.js">

    <!-- ✅ Enhanced Mobile Optimization -->
    <meta name="theme-color" content="#003366">
    <meta name="color-scheme" content="light dark">
    <meta name="msapplication-TileColor" content="#003366">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="ShieldWise Security">
    <meta name="format-detection" content="telephone=yes">

    <!-- ✅ ENHANCED Open Graph for Social & AI -->
    <meta property="og:title" content="🛡️ #1 Security Guard Services ${city.name} CA | Armed Guards 24/7 | ShieldWise Security">
    <meta property="og:description" content="⭐ TOP-RATED ${city.name} Security Guards since 2015 ⭐ Armed & Unarmed Guards ⭐ ${city.specialty} ⭐ 24/7 Fire Watch ⭐ BSIS Licensed ⭐ 2-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta property="og:url" content="https://shieldwisesecurity.com/alameda-county/${city.slug}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards-og-2024.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Professional armed security guards providing top-rated 24/7 services in ${city.name} California including ${city.landmarks.join(' and ')}">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="ShieldWise Security - Professional Security Services">

    <!-- ✅ Enhanced Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ShieldWiseSec">
    <meta name="twitter:creator" content="@ShieldWiseSec">
    <meta name="twitter:title" content="🛡️ #1 Security Guard Services ${city.name} CA | Armed Guards 24/7">
    <meta name="twitter:description" content="⭐ TOP-RATED ${city.name} Security Guards ⭐ Armed & Unarmed ⭐ ${city.specialty} ⭐ 24/7 Fire Watch ⭐ BSIS Licensed ⭐ 2-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta name="twitter:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards-twitter-2024.jpg">
    <meta name="twitter:image:alt" content="Professional security guards providing top-rated 24/7 services in ${city.name} California">

    <!-- ✅ Geographic and Local SEO -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}, Alameda County, California">
    <meta name="geo.position" content="${city.lat};${city.lng}">
    <meta name="ICBM" content="${city.lat}, ${city.lng}">

    <!-- ✅ COMPREHENSIVE Enhanced Schema Markup for AI -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "SecurityService", "ProfessionalService"],
      "name": "ShieldWise Security - ${city.name}",
      "alternateName": ["ShieldWise Security Guards ${city.name}", "${city.name} Security Services", "ShieldWise ${city.name}"],
      "description": "Leading professional security guard services in ${city.name}, CA since 2015. Specializing in armed and unarmed security guards, ${city.specialty.toLowerCase()}, ${city.industries.join(', ')} protection, 24/7 mobile patrol, and emergency response. BSIS licensed, bonded, and insured with 150+ professional guards.",
      "image": [
        "https://shieldwisesecurity.com/img/${city.slug}-security-guards-hero.webp",
        "https://shieldwisesecurity.com/img/${city.slug}-armed-security-team.webp",
        "https://shieldwisesecurity.com/img/${city.slug}-security-patrol.webp"
      ],
      "logo": {
        "@type": "ImageObject",
        "url": "https://shieldwisesecurity.com/img/shieldwise-logo-2024.png",
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
      }
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
            "text": "ShieldWise Security offers comprehensive professional security services in ${city.name} including armed and unarmed security guards, ${city.specialty.toLowerCase()}, 24/7 fire watch services, mobile patrol, access control, surveillance monitoring, and emergency response. All guards are BSIS licensed, bonded, and fully insured with ongoing training programs."
          }
        },
        {
          "@type": "Question",
          "name": "Are your security guards licensed and insured?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all ShieldWise security personnel are fully licensed, insured, and BSIS-certified. Our guards undergo rigorous background checks and receive extensive training in emergency response, conflict resolution, and customer service."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can you deploy security guards in ${city.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We understand that security needs can arise quickly. In emergency situations, we can often deploy guards within hours. For standard service requests, we typically establish security coverage within 24-48 hours after completing an initial security assessment."
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
          "name": "Alameda County Security Guards",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/alameda-county",
            "url": "https://shieldwisesecurity.com/alameda-county"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "${city.name} Security Guard Services",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/alameda-county/${city.slug}",
            "url": "https://shieldwisesecurity.com/alameda-county/${city.slug}"
          }
        }
      ]
    }
    </script>

    <!-- ✅ Stylesheets -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/style456.css">
    <link rel="stylesheet" href="/css/anaheim-styles.css">
</head>

<body id="top" class="anaheim-page">

    <%- include('../partials/Header') %>

    <!-- Enhanced Hero Section with Parallax -->
    <section class="anaheim-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/img/${city.image}');" role="banner" aria-label="Professional security guards patrolling commercial property in ${city.name} California">
        <div class="anaheim-hero-overlay"></div>
        <div class="anaheim-hero-content">
            <h1 class="animate-fade-in">${city.name}'s Premier Security Solutions</h1>
            <p class="animate-fade-in-delay">Professional ${city.specialty.toLowerCase()} services protecting ${city.name}'s businesses and communities</p>
            <div class="anaheim-cta-buttons">
                <a href="#contact-sec" class="anaheim-cta-button animate-fade-in-delay-2">Get Your Free Security Consultation</a>
                <a href="tel:${city.phone.replace(/[^0-9]/g, '')}" class="anaheim-cta-button-alt animate-fade-in-delay-2"><i class="fas fa-phone"></i> ${city.phone}</a>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section" style="background: #f8f9fa; padding: 40px 0;">
        <div class="stats-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div class="stat-item" style="text-align: center; background: white; padding: 30px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <span class="stat-number" style="display: block; font-size: 3rem; font-weight: 800; color: #1a3c64; margin-bottom: 10px; line-height: 1;">25+</span>
                <span class="stat-label" style="display: block; font-size: 1rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 1px;">Licensed Guards</span>
            </div>
            <div class="stat-item" style="text-align: center; background: white; padding: 30px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <span class="stat-number" style="display: block; font-size: 3rem; font-weight: 800; color: #1a3c64; margin-bottom: 10px; line-height: 1;">24/7</span>
                <span class="stat-label" style="display: block; font-size: 1rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 1px;">Emergency Response</span>
            </div>
            <div class="stat-item" style="text-align: center; background: white; padding: 30px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <span class="stat-number" style="display: block; font-size: 3rem; font-weight: 800; color: #1a3c64; margin-bottom: 10px; line-height: 1;">$2M</span>
                <span class="stat-label" style="display: block; font-size: 1rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 1px;">Insurance Coverage</span>
            </div>
            <div class="stat-item" style="text-align: center; background: white; padding: 30px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <span class="stat-number" style="display: block; font-size: 3rem; font-weight: 800; color: #1a3c64; margin-bottom: 10px; line-height: 1;">10+</span>
                <span class="stat-label" style="display: block; font-size: 1rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 1px;">Years Experience</span>
            </div>
        </div>
    </section>

    <!-- Main Content Section -->
    <section class="anaheim-main-content">
        <div class="anaheim-content-container">
            <div class="anaheim-intro-section">
                <div class="section-badge">Local Security Experts</div>
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
                        <p><strong>ShieldWise Security</strong> is a leading provider of professional security services in ${city.name}, California. Our highly trained security personnel ensure the safety and protection of ${city.industries.join(', ')} facilities and vibrant communities throughout ${city.name}.</p>
                        <p>${city.name}, ${city.description}. Our team delivers reliable protection 24/7 across ${city.landmarks.join(', ')}, and surrounding areas.</p>
                        <p>With over 8 years serving Alameda County, we understand the unique security challenges in ${city.name}'s dynamic environment. Our approach combines traditional security methods with modern technology, including mobile patrol units equipped with GPS tracking, real-time incident reporting systems, and specialized equipment for ${city.specialty.toLowerCase()} protection.</p>
                        <p>From protecting ${city.industries[0]} facilities to securing ${city.industries[1]} properties, our comprehensive security solutions are tailored to meet ${city.name}'s specific needs as a thriving community.</p>
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

                <!-- Enhanced Features Section -->
                <section class="anaheim-features-section">
                    <h3>Why Choose ShieldWise Security in ${city.name}?</h3>
                    <div class="anaheim-features-container">
                        <div class="anaheim-feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <h4>Local ${city.name} Expertise</h4>
                            <p>Our security teams have intimate knowledge of ${city.name}'s ${city.industries.join(', ')} sectors for targeted protection strategies.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-building"></i>
                            <h4>${city.specialty} Specialists</h4>
                            <p>Specialized security solutions for ${city.landmarks[0]} and surrounding areas with staff experienced in ${city.specialty.toLowerCase()} protocols.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-clock"></i>
                            <h4>24/7 Coverage</h4>
                            <p>Round-the-clock security services with rapid response capabilities throughout ${city.name} and surrounding areas.</p>
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

    <!-- Free Security Consultation Banner -->
    <section id="security-consultation" class="consultation-banner">
        <div class="consultation-content" style="color: #1a3c64;">
            <h2 style="color: #1a3c64;">Protect Your ${city.name} Property<br>— Get Your Free Security Consultation Now!</h2>
            <div class="underline"></div>
            <div class="consultation-buttons">
                <a href="tel:${city.phone.replace(/[^0-9]/g, '')}" class="phone-button">${city.phone}</a>
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
                    <p>Professional unarmed officers focus on access control, customer service, and incident prevention for facilities.</p>
                    <div class="service-pricing">Starting at $28-35/hour</div>
                    <div class="service-benefits">
                        <span>✓ Customer service trained</span>
                        <span>✓ De-escalation experts</span>
                        <span>✓ Report documentation</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h4>Fire Watch Services</h4>
                    <p>OSHA-certified fire watch personnel ensure compliance during construction, maintenance, or when fire systems are compromised.</p>
                    <div class="service-pricing">Starting at $28-35/hour</div>
                    <div class="service-benefits">
                        <span>✓ OSHA compliant</span>
                        <span>✓ 24/7 coverage</span>
                        <span>✓ Detailed logs</span>
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

    <!-- FAQ Section -->
    <section class="anaheim-faq-section">
        <div class="anaheim-faq-container">
            <div class="section-badge">Common Questions</div>
            <h3>Frequently Asked Questions</h3>
            <div class="anaheim-faq-list">
                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h4>What security services does ShieldWise Security offer in ${city.name}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>We offer comprehensive security services in ${city.name} including armed and unarmed security officers, ${city.specialty.toLowerCase()}, mobile patrol services, fire watch services, and specialized protection for ${city.industries.join(', ')} facilities.</p>
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
                        <p>We understand that security needs can arise quickly. In emergency situations, we can often deploy guards within hours. For standard service requests, we typically establish security coverage within 24-48 hours after completing an initial security assessment.</p>
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

// Generate all city files
alamedaCities.forEach(city => {
    const fileName = `views/cities/${city.slug}.ejs`;
    const content = generateCityPage(city);
    
    try {
        fs.writeFileSync(fileName, content, 'utf8');
        console.log(`✅ Created ${fileName}`);
    } catch (error) {
        console.error(`❌ Error creating ${fileName}:`, error.message);
    }
});

console.log(`\n🎉 Successfully generated ${alamedaCities.length} Alameda County city files!`);
console.log('\nGenerated files:');
alamedaCities.forEach(city => {
    console.log(`- views/cities/${city.slug}.ejs`);
});

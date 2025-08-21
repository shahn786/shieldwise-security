
const fs = require('fs');
const path = require('path');

// Sacramento County cities data
const cities = [
    {
        name: 'Downtown Sacramento',
        slug: 'downtown-sacramento',
        description: 'Professional security services for California\'s capital city business district with specialized government building protection',
        specialty: 'Government & Corporate',
        phone: '(916) 234-5678',
        zipCodes: ['95814', '95816', '95811'],
        landmarks: ['California State Capitol', 'Golden 1 Center', 'Sacramento Convention Center'],
        industries: ['Government', 'Finance', 'Healthcare', 'Entertainment']
    },
    {
        name: 'Midtown Sacramento',
        slug: 'midtown',
        description: 'Comprehensive security solutions for Sacramento\'s vibrant Midtown district with mixed-use property expertise',
        specialty: 'Mixed-Use & Entertainment',
        phone: '(916) 234-5678',
        zipCodes: ['95816', '95817', '95818'],
        landmarks: ['Sacramento Zoo', 'William Land Park', 'Southside Park'],
        industries: ['Retail', 'Restaurants', 'Residential', 'Entertainment']
    },
    {
        name: 'Natomas',
        slug: 'natomas',
        description: 'Professional security guards for Natomas residential and commercial communities with rapid response capabilities',
        specialty: 'Residential & Commercial',
        phone: '(916) 234-5678',
        zipCodes: ['95833', '95834', '95835'],
        landmarks: ['Sacramento International Airport', 'Natomas Town Center', 'North Natomas Regional Park'],
        industries: ['Residential', 'Retail', 'Transportation', 'Logistics']
    },
    {
        name: 'Elk Grove',
        slug: 'elk-grove',
        description: 'Trusted security services for Elk Grove\'s family-friendly communities and growing business sector',
        specialty: 'Residential & Family',
        phone: '(916) 234-5678',
        zipCodes: ['95624', '95757', '95758'],
        landmarks: ['Elk Grove Regional Park', 'Historic Old Town Elk Grove', 'Cosumnes River Preserve'],
        industries: ['Residential', 'Education', 'Healthcare', 'Retail']
    },
    {
        name: 'Rancho Cordova',
        slug: 'rancho-cordova',
        description: 'Advanced security solutions for Rancho Cordova\'s tech corridor and residential neighborhoods',
        specialty: 'Technology & Business',
        phone: '(916) 234-5678',
        zipCodes: ['95670', '95742', '95655'],
        landmarks: ['American River Parkway', 'Sunrise Recreation Center', 'Mills Station'],
        industries: ['Technology', 'Manufacturing', 'Logistics', 'Residential']
    },
    {
        name: 'Citrus Heights',
        slug: 'citrus-heights',
        description: 'Professional security guards protecting Citrus Heights communities and commercial districts',
        specialty: 'Community & Retail',
        phone: '(916) 234-5678',
        zipCodes: ['95610', '95621', '95628'],
        landmarks: ['Sunrise Mall', 'Rusch Botanical Gardens', 'C Bar C Park'],
        industries: ['Retail', 'Residential', 'Healthcare', 'Education']
    },
    {
        name: 'West Sacramento',
        slug: 'west-sacramento',
        description: 'Comprehensive security services for West Sacramento\'s waterfront and industrial areas',
        specialty: 'Industrial & Waterfront',
        phone: '(916) 234-5678',
        zipCodes: ['95605', '95691', '95799'],
        landmarks: ['Sacramento River', 'West Sacramento Civic Center', 'River Walk Park'],
        industries: ['Industrial', 'Government', 'Residential', 'Recreation']
    },
    {
        name: 'Land Park',
        slug: 'land-park',
        description: 'Specialized security for Land Park\'s historic neighborhoods and recreational facilities',
        specialty: 'Historic & Recreational',
        phone: '(916) 234-5678',
        zipCodes: ['95818', '95819', '95820'],
        landmarks: ['William Land Park', 'Sacramento Zoo', 'Fairytale Town'],
        industries: ['Residential', 'Recreation', 'Education', 'Tourism']
    },
    {
        name: 'East Sacramento',
        slug: 'east-sacramento',
        description: 'Premium security services for East Sacramento\'s upscale residential and business areas',
        specialty: 'Upscale Residential',
        phone: '(916) 234-5678',
        zipCodes: ['95816', '95819', '95820'],
        landmarks: ['McKinley Park', 'Sacramento State University', 'American River'],
        industries: ['Residential', 'Education', 'Professional Services', 'Healthcare']
    },
    {
        name: 'Pocket',
        slug: 'pocket',
        description: 'Professional security solutions for the Pocket area\'s residential communities and shopping centers',
        specialty: 'Residential & Shopping',
        phone: '(916) 234-5678',
        zipCodes: ['95831', '95832'],
        landmarks: ['Pocket Canal', 'Greenhaven Shopping Center', 'Garcia Bend Park'],
        industries: ['Residential', 'Retail', 'Recreation', 'Services']
    },
    {
        name: 'Fair Oaks',
        slug: 'fair-oaks',
        description: 'Trusted security guards for Fair Oaks\' historic charm and modern residential developments',
        specialty: 'Historic Community',
        phone: '(916) 234-5678',
        zipCodes: ['95628'],
        landmarks: ['Fair Oaks Village', 'American River', 'Fair Oaks Park'],
        industries: ['Residential', 'Historic Tourism', 'Retail', 'Recreation']
    },
    {
        name: 'Carmichael',
        slug: 'carmichael',
        description: 'Comprehensive security services for Carmichael\'s established neighborhoods and business districts',
        specialty: 'Established Community',
        phone: '(916) 234-5678',
        zipCodes: ['95608'],
        landmarks: ['Carmichael Park', 'American River Parkway', 'Ancil Hoffman Park'],
        industries: ['Residential', 'Retail', 'Professional Services', 'Recreation']
    },
    {
        name: 'Folsom',
        slug: 'folsom',
        description: 'Advanced security solutions for Folsom\'s historic downtown and modern tech companies',
        specialty: 'Historic & Technology',
        phone: '(916) 234-5678',
        zipCodes: ['95630', '95763'],
        landmarks: ['Historic Folsom', 'Folsom Lake', 'Folsom State Prison'],
        industries: ['Technology', 'Historic Tourism', 'Recreation', 'Government']
    },
    {
        name: 'Roseville',
        slug: 'roseville',
        description: 'Professional security guards for Roseville\'s thriving retail centers and family communities',
        specialty: 'Retail & Family',
        phone: '(916) 234-5678',
        zipCodes: ['95661', '95678', '95747'],
        landmarks: ['Westfield Galleria', 'Historic Old Roseville', 'Maidu Regional Park'],
        industries: ['Retail', 'Residential', 'Technology', 'Healthcare']
    },
    {
        name: 'Davis',
        slug: 'davis',
        description: 'Specialized security services for Davis\' university campus and bicycle-friendly community',
        specialty: 'University & Education',
        phone: '(916) 234-5678',
        zipCodes: ['95616', '95617', '95618'],
        landmarks: ['UC Davis Campus', 'Davis Downtown', 'Arboretum'],
        industries: ['Education', 'Research', 'Healthcare', 'Agriculture']
    },
    {
        name: 'Woodland',
        slug: 'woodland',
        description: 'Reliable security solutions for Woodland\'s agricultural heritage and growing business sector',
        specialty: 'Agricultural & Business',
        phone: '(916) 234-5678',
        zipCodes: ['95695', '95776'],
        landmarks: ['Historic Downtown Woodland', 'Woodland Opera House', 'Reiff Park'],
        industries: ['Agriculture', 'Manufacturing', 'Retail', 'Government']
    }
];

// Template function to generate city page
function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/LocalBusiness">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- ✅ ENHANCED 10/10 SEO Meta Tags -->
    <title>Security Guard Services ${city.name} CA | Armed Guards | BSIS Licensed | ShieldWise Security</title>
    <meta name="description" content="Professional security guard services in ${city.name}, CA since 2015. Armed & unarmed guards, ${city.specialty.toLowerCase()} security, ${city.industries.join(', ').toLowerCase()} protection. BSIS licensed & insured. 24/7 response. Free quote: ${city.phone}">
    <meta name="author" content="ShieldWise Security - Professional Security Services">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-preview:-1">
    <link rel="canonical" href="https://shieldwisesecurity.com/sacramento-county/${city.slug}" />

    <!-- ✅ ENHANCED Long-tail Keywords for AI Search -->
    <meta name="keywords" content="security guard services ${city.name} California, armed security guards ${city.landmarks[0] || city.name}, professional security company Sacramento County, 24/7 security patrol ${city.name}, ${city.specialty.toLowerCase()} security ${city.landmarks.join(', ')}, fire watch services construction sites, mobile patrol security ${city.name}, BSIS licensed security guards, emergency security response team, ${city.industries.join(' security, ').toLowerCase()} security">

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
    <link rel="preload" href="/img/sacramento.webp" as="image" importance="high">
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
    <meta property="og:description" content="⭐ TOP-RATED ${city.name} Security Guards since 2015 ⭐ Armed & Unarmed Guards ⭐ ${city.specialty} Security ⭐ 24/7 Fire Watch ⭐ BSIS Licensed ⭐ 2-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta property="og:url" content="https://shieldwisesecurity.com/sacramento-county/${city.slug}">
    <meta property="og:type" content="business.business">
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
    <meta name="twitter:description" content="⭐ TOP-RATED ${city.name} Security Guards ⭐ Armed & Unarmed ⭐ ${city.specialty} Security ⭐ 24/7 Fire Watch ⭐ BSIS Licensed ⭐ 2-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta name="twitter:image" content="https://shieldwisesecurity.com/img/${city.slug}-security-guards-twitter-2024.jpg">
    <meta name="twitter:image:alt" content="Professional security guards providing top-rated 24/7 services in ${city.name} California">

    <!-- ✅ Geographic and Local SEO -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}, Sacramento County, California">
    <meta name="geo.position" content="38.5767;-121.4934">
    <meta name="ICBM" content="38.5767, -121.4934">

    <!-- ✅ COMPREHENSIVE Enhanced Schema Markup for AI -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "SecurityService", "ProfessionalService"],
      "name": "ShieldWise Security - ${city.name}",
      "alternateName": ["ShieldWise Security Guards ${city.name}", "${city.name} Security Services", "ShieldWise ${city.name}"],
      "description": "Leading professional security guard services in ${city.name}, CA since 2015. Specializing in armed and unarmed security guards, ${city.specialty.toLowerCase()} security, ${city.industries.join(', ').toLowerCase()} protection, 24/7 mobile patrol, and emergency response. BSIS licensed, bonded, and insured with 150+ professional guards.",
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
        "postalCode": "${city.zipCodes[0]}",
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "${city.name}",
          "sameAs": "https://en.wikipedia.org/wiki/${city.name.replace(/ /g, '_')}"
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
            "text": "ShieldWise Security offers comprehensive professional security services in ${city.name} including armed and unarmed security guards, ${city.specialty.toLowerCase()} security, 24/7 fire watch services, mobile patrol, access control, surveillance monitoring, and emergency response. All guards are BSIS licensed, bonded, and fully insured with ongoing training programs."
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
          "name": "Sacramento County Security Guards",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/sacramento-county",
            "url": "https://shieldwisesecurity.com/sacramento-county"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "${city.name} Security Guard Services",
          "item": {
            "@type": "WebPage",
            "@id": "https://shieldwisesecurity.com/sacramento-county/${city.slug}",
            "url": "https://shieldwisesecurity.com/sacramento-county/${city.slug}"
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
    <section class="anaheim-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/img/sacramento.webp');" role="banner" aria-label="Professional security guards patrolling commercial property in ${city.name} California">
        <div class="anaheim-hero-overlay"></div>
        <div class="anaheim-hero-content">
            <h1 class="animate-fade-in">${city.name}'s Premier Security Solutions</h1>
            <p class="animate-fade-in-delay">Professional ${city.specialty.toLowerCase()} security services protecting ${city.name}'s businesses and communities</p>
            <div class="anaheim-cta-buttons">
                <a href="#contact-sec" class="anaheim-cta-button animate-fade-in-delay-2">Get Your Free Security Consultation</a>
                <a href="tel:${city.phone.replace(/[^0-9]/g, '')}" class="anaheim-cta-button-alt animate-fade-in-delay-2"><i class="fas fa-phone"></i> ${city.phone}</a>
            </div>
        </div>
    </section>

    <!-- Main Content Section -->
    <section class="anaheim-main-content">
        <div class="anaheim-content-container">
            <div class="anaheim-intro-section">
                <div class="section-badge">Local Security Experts</div>
                <h1>Premium Security Guard Services in ${city.name}, CA</h1>
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
                        <p><strong>ShieldWise Security</strong> is a leading provider of professional security services in ${city.name}, California. Our highly trained security personnel ensure the safety and protection of businesses, ${city.industries.join(', ').toLowerCase()} facilities, and communities throughout ${city.name}.</p>
                        <p>${city.name}, ${city.description}. Our team delivers reliable protection 24/7 across ${city.landmarks.join(', ')}, and surrounding areas.</p>
                        <p>With over 8 years serving Sacramento County, we understand the unique security challenges in ${city.name}. Our approach combines traditional security methods with modern technology, including mobile patrol units equipped with GPS tracking and real-time incident reporting systems.</p>
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
                    <h2>Why ${city.name} Businesses Choose ShieldWise Security</h2>
                    <div class="local-statistics">
                        <h3>${city.name} Security Statistics & Insights</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-number">78%</div>
                                <div class="stat-label">Reduction in property crime where our guards are stationed</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">35+</div>
                                <div class="stat-label">Businesses protected in ${city.name} and Sacramento County</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">2-Hour</div>
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
                    <h2>Why Choose ShieldWise Security in ${city.name}?</h2>
                    <div class="anaheim-features-container">
                        <div class="anaheim-feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <h3>Local ${city.name} Expertise</h3>
                            <p>Our security teams have intimate knowledge of ${city.name}'s ${city.industries.join(', ').toLowerCase()} sectors and community needs for targeted protection strategies.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-building"></i>
                            <h3>${city.specialty} Specialists</h3>
                            <p>Specialized security solutions for ${city.landmarks.join(', ')} with staff experienced in ${city.specialty.toLowerCase()} security protocols.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-clock"></i>
                            <h3>24/7 Coverage</h3>
                            <p>Round-the-clock security services with rapid response capabilities throughout ${city.name} and surrounding areas.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-fire-extinguisher"></i>
                            <h3>Fire Watch Services</h3>
                            <p>Professional fire watch services for construction sites and buildings with impaired fire systems, meeting all California state regulations.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-car"></i>
                            <h3>Mobile Patrol Services</h3>
                            <p>Regular patrol checks for businesses, properties, and construction sites with detailed reporting and rapid response capabilities.</p>
                        </div>

                        <div class="anaheim-feature-item">
                            <i class="fas fa-users"></i>
                            <h3>Trained Professionals</h3>
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
            <h2>Protect Your ${city.name} Business or Property</h2>
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
            <h2 class="anaheim-services-title">Security Services We Provide in ${city.name}</h2>

            <div class="anaheim-services-grid-enhanced">
                <div class="anaheim-service-item-enhanced">
                    <h3>Armed Security Officers</h3>
                    <p>BSIS-licensed armed guards with firearms permits provide maximum security presence for high-risk environments and valuable assets.</p>
                    <div class="service-pricing">Starting at $45-85/hour</div>
                    <div class="service-benefits">
                        <span>✓ Firearm certified</span>
                        <span>✓ Threat assessment</span>
                        <span>✓ Emergency response</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h3>Unarmed Security Guards</h3>
                    <p>Professional unarmed officers focus on access control, customer service, and incident prevention for ${city.industries.join(', ').toLowerCase()} facilities.</p>
                    <div class="service-pricing">Starting at $28-35/hour</div>
                    <div class="service-benefits">
                        <span>✓ Customer service trained</span>
                        <span>✓ De-escalation experts</span>
                        <span>✓ Report documentation</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h3>Fire Watch Services</h3>
                    <p>OSHA-certified fire watch personnel ensure compliance during construction, maintenance, or when fire systems are compromised.</p>
                    <div class="service-pricing">Starting at $28-35/hour</div>
                    <div class="service-benefits">
                        <span>✓ OSHA compliant</span>
                        <span>✓ 24/7 coverage</span>
                        <span>✓ Detailed logs</span>
                    </div>
                </div>
                <div class="anaheim-service-item-enhanced">
                    <h3>Mobile Patrol Services</h3>
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
            <h2>Frequently Asked Questions</h2>
            <div class="anaheim-faq-list">
                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h3>What security services do you provide in ${city.name}?</h3>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>We offer comprehensive security services in ${city.name} including armed and unarmed security officers, ${city.specialty.toLowerCase()} security, mobile patrol services, fire watch services, and specialized protection for ${city.industries.join(', ').toLowerCase()} facilities.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h3>Are your security guards licensed and insured?</h3>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, all ShieldWise security personnel are fully licensed, insured, and BSIS-certified. Our guards undergo rigorous background checks and receive extensive training in emergency response, conflict resolution, and customer service.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h3>How quickly can you deploy security guards in ${city.name}?</h3>
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
                <h2>Ready to Secure Your ${city.name} Property?</h2>
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
    
    cities.forEach(city => {
        const filename = `${city.slug}.ejs`;
        const filepath = path.join(citiesDir, filename);
        
        const content = generateCityPage(city);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ Generated: ${filename}`);
    });
    
    console.log(`🎉 Generated ${cities.length} Sacramento County city pages!`);
}

// Run the generator
if (require.main === module) {
    generateAllCityPages();
}

module.exports = { cities, generateCityPage, generateAllCityPages };

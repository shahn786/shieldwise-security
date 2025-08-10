
const fs = require('fs');
const path = require('path');

// San Diego County cities data
const cities = [
    {
        name: 'Chula Vista',
        slug: 'chula-vista',
        description: 'California\'s second-largest city with diverse business and residential communities',
        specialty: 'Commercial Business',
        phone: '(714) 716-7430',
        email: 'chulavista@shieldwisesecurity.com',
        lat: 32.6401,
        lng: -117.0842,
        zip: '91910',
        address: '275 H St, Suite 200',
        heroTitle: 'Chula Vista\'s Premier Security Solutions',
        heroSubtitle: 'Protecting businesses, residential communities, and manufacturing facilities in California\'s second-largest city',
        badge: 'South Bay Security Experts',
        features: [
            { icon: 'building', title: 'Commercial Business Security', desc: 'Comprehensive security solutions for Chula Vista\'s diverse commercial sector' },
            { icon: 'home', title: 'Residential Community Protection', desc: 'Specialized security for residential communities and gated neighborhoods' },
            { icon: 'industry', title: 'Manufacturing Facility Security', desc: 'Advanced security protocols for manufacturing and industrial facilities' }
        ]
    },
    {
        name: 'Oceanside',
        slug: 'oceanside',
        description: 'Premier coastal city with thriving beachfront business and tourism industry',
        specialty: 'Beachfront Business',
        phone: '(714) 716-7430',
        email: 'oceanside@shieldwisesecurity.com',
        lat: 33.1959,
        lng: -117.3795,
        zip: '92058',
        address: '1956 Mission Ave, Suite 100',
        heroTitle: 'Oceanside\'s Premier Coastal Security Solutions',
        heroSubtitle: 'Protecting beachfront businesses, coastal properties, and resort facilities in California\'s premier beach city',
        badge: 'Coastal Security Experts',
        features: [
            { icon: 'umbrella-beach', title: 'Beachfront Property Security', desc: 'Specialized security for oceanfront properties and coastal businesses' },
            { icon: 'hotel', title: 'Resort & Hospitality Security', desc: 'Comprehensive security for hotels, resorts, and hospitality venues' },
            { icon: 'anchor', title: 'Marina & Harbor Security', desc: 'Professional security for marinas, harbors, and waterfront facilities' }
        ]
    },
    {
        name: 'Escondido',
        slug: 'escondido',
        description: 'Vibrant inland city with growing business districts and residential communities',
        specialty: 'Business District',
        phone: '(714) 716-7430',
        email: 'escondido@shieldwisesecurity.com',
        lat: 33.1192,
        lng: -117.0864,
        zip: '92025',
        address: '515 W Grand Ave, Suite 200',
        heroTitle: 'Escondido\'s Premier Security Solutions',
        heroSubtitle: 'Protecting growing business districts and residential communities in North County\'s economic hub',
        badge: 'North County Security Experts',
        features: [
            { icon: 'building', title: 'Business District Security', desc: 'Professional security for Escondido\'s expanding commercial areas' },
            { icon: 'home', title: 'Residential Security', desc: 'Comprehensive protection for residential communities and neighborhoods' },
            { icon: 'shopping-cart', title: 'Retail Security', desc: 'Specialized security for shopping centers and retail establishments' }
        ]
    },
    {
        name: 'Carlsbad',
        slug: 'carlsbad',
        description: 'Upscale coastal city with luxury resorts and high-tech business parks',
        specialty: 'Luxury Property',
        phone: '(714) 716-7430',
        email: 'carlsbad@shieldwisesecurity.com',
        lat: 33.1581,
        lng: -117.3506,
        zip: '92008',
        address: '2975 Roosevelt St, Suite 150',
        heroTitle: 'Carlsbad\'s Premier Luxury Security Solutions',
        heroSubtitle: 'Protecting luxury resorts, high-tech facilities, and upscale communities in North County\'s premier coastal city',
        badge: 'Luxury Security Specialists',
        features: [
            { icon: 'gem', title: 'Luxury Resort Security', desc: 'Elite security services for luxury resorts and high-end hospitality' },
            { icon: 'microchip', title: 'Tech Business Security', desc: 'Specialized security for high-tech companies and research facilities' },
            { icon: 'crown', title: 'Upscale Community Security', desc: 'Premium security for exclusive residential communities' }
        ]
    },
    {
        name: 'El Cajon',
        slug: 'el-cajon',
        description: 'Diverse business center with growing commercial and residential areas',
        specialty: 'Commercial Center',
        phone: '(714) 716-7430',
        email: 'elcajon@shieldwisesecurity.com',
        lat: 32.7948,
        lng: -116.9625,
        zip: '92020',
        address: '201 E Main St, Suite 300',
        heroTitle: 'El Cajon\'s Premier Security Solutions',
        heroSubtitle: 'Protecting diverse business centers and growing communities in East County\'s commercial hub',
        badge: 'East County Security Experts',
        features: [
            { icon: 'building', title: 'Commercial Security', desc: 'Comprehensive security for El Cajon\'s diverse business districts' },
            { icon: 'users', title: 'Community Security', desc: 'Professional security for residential and mixed-use developments' },
            { icon: 'car', title: 'Mobile Patrol Services', desc: 'Flexible patrol services for multiple properties and large areas' }
        ]
    },
    {
        name: 'Vista',
        slug: 'vista',
        description: 'Growing city with expanding business parks and family-friendly communities',
        specialty: 'Business Park',
        phone: '(714) 716-7430',
        email: 'vista@shieldwisesecurity.com',
        lat: 33.2000,
        lng: -117.2425,
        zip: '92084',
        address: '325 S Melrose Dr, Suite 200',
        heroTitle: 'Vista\'s Premier Security Solutions',
        heroSubtitle: 'Protecting expanding business parks and family communities in North County\'s fastest-growing city',
        badge: 'Growth-Focused Security',
        features: [
            { icon: 'briefcase', title: 'Business Park Security', desc: 'Professional security for Vista\'s expanding business and office parks' },
            { icon: 'home', title: 'Family Community Security', desc: 'Comprehensive security for family-oriented residential areas' },
            { icon: 'shield-alt', title: 'Corporate Security', desc: 'Specialized security for corporate offices and business facilities' }
        ]
    },
    {
        name: 'San Marcos',
        slug: 'san-marcos',
        description: 'University city with vibrant student community and growing tech sector',
        specialty: 'University Security',
        phone: '(714) 716-7430',
        email: 'sanmarcos@shieldwisesecurity.com',
        lat: 33.1434,
        lng: -117.1661,
        zip: '92078',
        address: '1 University Dr, Suite 100',
        heroTitle: 'San Marcos\'s Premier University Security Solutions',
        heroSubtitle: 'Protecting university facilities, student communities, and emerging tech businesses in North County\'s education hub',
        badge: 'University Security Specialists',
        features: [
            { icon: 'graduation-cap', title: 'Campus Security', desc: 'Specialized security for university facilities and student housing' },
            { icon: 'users', title: 'Student Community Security', desc: 'Professional security for student-oriented residential complexes' },
            { icon: 'laptop', title: 'Tech Sector Security', desc: 'Advanced security for emerging technology companies' }
        ]
    },
    {
        name: 'Encinitas',
        slug: 'encinitas',
        description: 'Artistic coastal community with unique businesses and beachfront properties',
        specialty: 'Coastal Community',
        phone: '(714) 716-7430',
        email: 'encinitas@shieldwisesecurity.com',
        lat: 33.0370,
        lng: -117.2920,
        zip: '92024',
        address: '505 S Coast Hwy, Suite 150',
        heroTitle: 'Encinitas\'s Premier Coastal Security Solutions',
        heroSubtitle: 'Protecting artistic communities, unique businesses, and beachfront properties in North County\'s creative coastal city',
        badge: 'Coastal Community Specialists',
        features: [
            { icon: 'palette', title: 'Arts District Security', desc: 'Specialized security for galleries, studios, and creative businesses' },
            { icon: 'water', title: 'Beachfront Security', desc: 'Professional security for coastal properties and beach businesses' },
            { icon: 'store', title: 'Unique Business Security', desc: 'Tailored security for Encinitas\'s distinctive local businesses' }
        ]
    },
    {
        name: 'National City',
        slug: 'national-city',
        description: 'Historic waterfront city with industrial areas and growing residential districts',
        specialty: 'Industrial Security',
        phone: '(714) 716-7430',
        email: 'nationalcity@shieldwisesecurity.com',
        lat: 32.6781,
        lng: -117.0992,
        zip: '91950',
        address: '1243 National City Blvd, Suite 200',
        heroTitle: 'National City\'s Premier Industrial Security Solutions',
        heroSubtitle: 'Protecting waterfront industries, historic districts, and growing residential areas in South Bay\'s gateway city',
        badge: 'Industrial Security Specialists',
        features: [
            { icon: 'industry', title: 'Industrial Security', desc: 'Specialized security for waterfront industrial facilities and ports' },
            { icon: 'landmark', title: 'Historic District Security', desc: 'Professional security for historic areas and cultural properties' },
            { icon: 'ship', title: 'Waterfront Security', desc: 'Advanced security for marine facilities and waterfront businesses' }
        ]
    },
    {
        name: 'La Mesa',
        slug: 'la-mesa',
        description: 'Family-oriented city with charming downtown and established residential areas',
        specialty: 'Community Security',
        phone: '(714) 716-7430',
        email: 'lamesa@shieldwisesecurity.com',
        lat: 32.7678,
        lng: -117.0231,
        zip: '91942',
        address: '8130 La Mesa Blvd, Suite 150',
        heroTitle: 'La Mesa\'s Premier Community Security Solutions',
        heroSubtitle: 'Protecting family neighborhoods, charming downtown, and established communities in East County\'s heart',
        badge: 'Family Community Specialists',
        features: [
            { icon: 'home', title: 'Residential Security', desc: 'Comprehensive security for La Mesa\'s family-friendly neighborhoods' },
            { icon: 'store', title: 'Downtown Security', desc: 'Professional security for the charming downtown district' },
            { icon: 'users', title: 'Community Events Security', desc: 'Specialized security for local events and community gatherings' }
        ]
    },
    {
        name: 'Santee',
        slug: 'santee',
        description: 'Suburban family community with recreational facilities and growing commercial areas',
        specialty: 'Suburban Security',
        phone: '(714) 716-7430',
        email: 'santee@shieldwisesecurity.com',
        lat: 32.8383,
        lng: -116.9739,
        zip: '92071',
        address: '10601 Magnolia Ave, Suite 200',
        heroTitle: 'Santee\'s Premier Suburban Security Solutions',
        heroSubtitle: 'Protecting family communities, recreational facilities, and growing commercial areas in East County\'s suburban heart',
        badge: 'Suburban Family Specialists',
        features: [
            { icon: 'home', title: 'Family Community Security', desc: 'Professional security for Santee\'s suburban residential areas' },
            { icon: 'futbol', title: 'Recreation Facility Security', desc: 'Specialized security for parks, sports facilities, and recreation centers' },
            { icon: 'shopping-cart', title: 'Commercial Area Security', desc: 'Comprehensive security for growing shopping and business districts' }
        ]
    },
    {
        name: 'Poway',
        slug: 'poway',
        description: 'Upscale suburban city with excellent schools and family-oriented communities',
        specialty: 'Upscale Suburban',
        phone: '(714) 716-7430',
        email: 'poway@shieldwisesecurity.com',
        lat: 32.9628,
        lng: -117.0359,
        zip: '92064',
        address: '13325 Civic Center Dr, Suite 150',
        heroTitle: 'Poway\'s Premier Upscale Security Solutions',
        heroSubtitle: 'Protecting quality communities, excellent schools, and upscale residential areas in North County\'s family paradise',
        badge: 'Upscale Community Specialists',
        features: [
            { icon: 'graduation-cap', title: 'School Security', desc: 'Professional security for Poway\'s highly-rated educational facilities' },
            { icon: 'gem', title: 'Upscale Residential Security', desc: 'Premium security for Poway\'s quality residential communities' },
            { icon: 'shield-alt', title: 'Community Safety Programs', desc: 'Comprehensive safety programs for family-oriented neighborhoods' }
        ]
    },
    {
        name: 'Coronado',
        slug: 'coronado',
        description: 'Exclusive island community with luxury resorts and pristine beaches',
        specialty: 'Luxury Resort',
        phone: '(714) 716-7430',
        email: 'coronado@shieldwisesecurity.com',
        lat: 32.6859,
        lng: -117.1831,
        zip: '92118',
        address: '1000 Orange Ave, Suite 100',
        heroTitle: 'Coronado\'s Premier Luxury Security Solutions',
        heroSubtitle: 'Protecting exclusive resorts, pristine beaches, and luxury properties on San Diego\'s crown jewel island',
        badge: 'Luxury Island Specialists',
        features: [
            { icon: 'crown', title: 'Luxury Resort Security', desc: 'Elite security for Coronado\'s world-class resort properties' },
            { icon: 'umbrella-beach', title: 'Beach Security', desc: 'Professional security for pristine beaches and waterfront areas' },
            { icon: 'gem', title: 'Exclusive Property Security', desc: 'Premium security for high-end residential and commercial properties' }
        ]
    },
    {
        name: 'Imperial Beach',
        slug: 'imperial-beach',
        description: 'Southernmost beach city with growing residential and commercial areas',
        specialty: 'Beach Community',
        phone: '(714) 716-7430',
        email: 'imperialbeach@shieldwisesecurity.com',
        lat: 32.5840,
        lng: -117.1131,
        zip: '91932',
        address: '825 Imperial Beach Blvd, Suite 150',
        heroTitle: 'Imperial Beach\'s Premier Coastal Security Solutions',
        heroSubtitle: 'Protecting beach communities, growing residential areas, and coastal businesses in California\'s southernmost beach city',
        badge: 'Southern Beach Specialists',
        features: [
            { icon: 'umbrella-beach', title: 'Beach Community Security', desc: 'Specialized security for Imperial Beach\'s coastal residential areas' },
            { icon: 'waves', title: 'Waterfront Security', desc: 'Professional security for beachfront properties and pier area' },
            { icon: 'home', title: 'Growing Community Security', desc: 'Comprehensive security for expanding residential developments' }
        ]
    },
    {
        name: 'Lemon Grove',
        slug: 'lemon-grove',
        description: 'Historic community with diverse neighborhoods and growing business district',
        specialty: 'Community Security',
        phone: '(714) 716-7430',
        email: 'lemongrove@shieldwisesecurity.com',
        lat: 32.7428,
        lng: -117.0317,
        zip: '91945',
        address: '3232 Main St, Suite 200',
        heroTitle: 'Lemon Grove\'s Premier Community Security Solutions',
        heroSubtitle: 'Protecting historic neighborhoods, diverse communities, and local businesses in East County\'s established city',
        badge: 'Historic Community Specialists',
        features: [
            { icon: 'landmark', title: 'Historic Area Security', desc: 'Professional security for Lemon Grove\'s historic districts' },
            { icon: 'users', title: 'Diverse Community Security', desc: 'Culturally-sensitive security for diverse neighborhood communities' },
            { icon: 'store', title: 'Local Business Security', desc: 'Comprehensive security for Main Street and local business areas' }
        ]
    },
    {
        name: 'Solana Beach',
        slug: 'solana-beach',
        description: 'Upscale coastal community with luxury homes and boutique businesses',
        specialty: 'Luxury Coastal',
        phone: '(714) 716-7430',
        email: 'solanabeach@shieldwisesecurity.com',
        lat: 32.9911,
        lng: -117.2712,
        zip: '92075',
        address: '635 S Hwy 101, Suite 100',
        heroTitle: 'Solana Beach\'s Premier Luxury Coastal Security Solutions',
        heroSubtitle: 'Protecting luxury homes, boutique businesses, and exclusive beachfront properties in North County\'s premier coastal enclave',
        badge: 'Luxury Coastal Specialists',
        features: [
            { icon: 'gem', title: 'Luxury Home Security', desc: 'Elite security for Solana Beach\'s premium residential properties' },
            { icon: 'store', title: 'Boutique Business Security', desc: 'Professional security for upscale retail and dining establishments' },
            { icon: 'water', title: 'Beachfront Security', desc: 'Specialized security for exclusive beachfront properties and clubs' }
        ]
    },
    {
        name: 'Del Mar',
        slug: 'del-mar',
        description: 'Exclusive seaside village with luxury properties and world-class venues',
        specialty: 'Exclusive Seaside',
        phone: '(714) 716-7430',
        email: 'delmar@shieldwisesecurity.com',
        lat: 32.9595,
        lng: -117.2653,
        zip: '92014',
        address: '1050 Camino Del Mar, Suite 100',
        heroTitle: 'Del Mar\'s Premier Exclusive Security Solutions',
        heroSubtitle: 'Protecting luxury estates, world-class venues, and exclusive seaside properties in San Diego\'s most prestigious coastal village',
        badge: 'Exclusive Village Specialists',
        features: [
            { icon: 'crown', title: 'Luxury Estate Security', desc: 'Premium security for Del Mar\'s exclusive residential estates' },
            { icon: 'horse', title: 'Venue Security', desc: 'Specialized security for Del Mar\'s world-famous racetrack and fairgrounds' },
            { icon: 'gem', title: 'High-End Property Security', desc: 'Elite security for prestigious commercial and residential properties' }
        ]
    }
];

// Template function to generate city page
function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/SecurityService">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- ✅ ENHANCED 2025 SEO META TAGS - 10/10 OPTIMIZATION -->
    <title>${city.name} Security Guards | ${city.specialty} Protection | BSIS Licensed | ShieldWise Security</title>
    <meta name="description" content="Professional security guard services in ${city.name}, CA since 2015. ${city.description}. 24/7 BSIS-licensed guards with 2-hour response. Free quote: ${city.phone}">
    <meta name="keywords" content="${city.name} security guards, ${city.specialty.toLowerCase()} security, San Diego County security, professional security guards ${city.name} CA, BSIS licensed security, 24/7 security ${city.name}">
    <meta name="author" content="ShieldWise Security - Professional Security Services">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://shieldwisesecurity.com/california/${city.slug}">

    <!-- ✅ Geographic and Local SEO -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}, San Diego County, California">
    <meta name="geo.position" content="${city.lat};${city.lng}">
    <meta name="ICBM" content="${city.lat}, ${city.lng}">

    <!-- ✅ Enhanced Open Graph -->
    <meta property="og:title" content="🛡️ #1 ${city.name} Security Guards | ${city.specialty} Protection | ShieldWise Security">
    <meta property="og:description" content="⭐ TOP-RATED ${city.name} Security since 2015 ⭐ ${city.specialty} Security ⭐ 24/7 BSIS Licensed ⭐ 2-Hr Response ⭐ FREE Quote ${city.phone}">
    <meta property="og:url" content="https://shieldwisesecurity.com/california/${city.slug}">
    <meta property="og:type" content="business.business">

    <!-- ✅ Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "SecurityService", "ProfessionalService"],
      "name": "ShieldWise Security - ${city.name}",
      "description": "Leading professional security guard services in ${city.name}, CA since 2015. ${city.description}. BSIS licensed, bonded, and insured serving San Diego County.",
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
      "telephone": "+1-714-716-7430",
      "email": "${city.email}",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150",
        "bestRating": "5"
      }
    }
    </script>

    <!-- ✅ Stylesheets -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/anaheim-styles.css">
    <link rel="stylesheet" href="/css/back-to.css">
</head>

<body id="top" class="chula-vista-page">
    <%- include('../partials/Header') %>

    <!-- Hero Section -->
    <section class="chula-vista-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/img/2.webp');">
        <div class="chula-vista-hero-overlay"></div>
        <div class="chula-vista-hero-content">
            <h1 class="animate-fade-in">${city.heroTitle}</h1>
            <p class="animate-fade-in-delay">${city.heroSubtitle}</p>
            <div class="chula-vista-cta-buttons">
                <a href="#contact-sec" class="chula-vista-cta-button animate-fade-in-delay-2">Get Your Free Security Assessment</a>
                <a href="tel:7147167430" class="chula-vista-cta-button-alt animate-fade-in-delay-2"><i class="fas fa-phone"></i> ${city.phone}</a>
            </div>
        </div>
    </section>

    <!-- Main Content Section -->
    <section class="anaheim-main-content">
        <div class="anaheim-content-container">
            <div class="anaheim-intro-section">
                <div class="section-badge">${city.badge}</div>
                <h1>Professional Security Guard Services in ${city.name}, CA</h1>
                
                <div class="anaheim-intro-rating">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <span>4.9/5 from 150+ reviews</span>
                </div>

                <div class="anaheim-highlight-box">
                    <div class="highlight-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="highlight-content">
                        <p><strong>ShieldWise Security</strong> is ${city.name}'s leading provider of comprehensive security solutions. ${city.description}. Our highly trained security professionals deliver specialized protection services throughout San Diego County.</p>
                        <p>With over 9 years serving San Diego County, we understand the unique security challenges in ${city.name}. Our approach combines traditional security excellence with modern technology integration, providing comprehensive protection tailored to your specific needs.</p>
                    </div>
                </div>

                <!-- Trust Badges Section -->
                <div class="anaheim-trust-badges">
                    <div class="trust-badge">
                        <i class="fas fa-certificate"></i>
                        <span>BSIS Licensed & Insured</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-clock"></i>
                        <span>24/7 ${city.name} Service</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-user-check"></i>
                        <span>Background Checked</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-award"></i>
                        <span>Top Rated Security</span>
                    </div>
                </div>

                <!-- Features Section -->
                <section class="anaheim-features-section">
                    <h2>Why Choose ShieldWise Security for ${city.name} Protection?</h2>
                    <div class="anaheim-features-container">
                        ${city.features.map(feature => `
                        <div class="anaheim-feature-item">
                            <i class="fas fa-${feature.icon}"></i>
                            <h3>${feature.title}</h3>
                            <p>${feature.desc}</p>
                        </div>`).join('')}
                    </div>
                </section>
            </div>
        </div>
    </section>

    <!-- Banner Section -->
    <section class="anaheim-banner-section" id="contact-sec" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/quot.webp');">
        <div class="anaheim-banner-content">
            <h2>Protect Your ${city.name} Property</h2>
            <p>Our security experts are ready to design a customized security solution for your ${city.name} protection needs.</p>
            <div class="anaheim-banner-buttons">
                <a href="tel:7147167430" class="anaheim-banner-button"><i class="fas fa-phone-alt"></i> ${city.phone}</a>
                <a href="/get-quote" class="anaheim-banner-button-alt"><i class="fas fa-clipboard-list"></i> Request a Quote</a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="anaheim-services-section-compact">
        <div class="anaheim-services-container">
            <div class="section-badge">Our ${city.name} Services</div>
            <h2>Specialized Security Services for ${city.name}</h2>
            
            <div class="anaheim-services-grid-enhanced">
                <div class="anaheim-service-item-enhanced">
                    <h3>${city.specialty} Security</h3>
                    <p>Professional security services specialized for ${city.name}'s unique environment and business needs.</p>
                    <div class="service-pricing">Starting at $25-50/hour</div>
                </div>
                
                <div class="anaheim-service-item-enhanced">
                    <h3>Mobile Patrol Services</h3>
                    <p>GPS-tracked patrol services providing flexible security coverage throughout ${city.name}.</p>
                    <div class="service-pricing">Starting at $45-65/hour</div>
                </div>

                <div class="anaheim-service-item-enhanced">
                    <h3>Event Security</h3>
                    <p>Professional security for events and gatherings with experience in ${city.name} venues and protocols.</p>
                    <div class="service-pricing">Starting at $35-55/hour</div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="anaheim-faq-section">
        <div class="anaheim-faq-container">
            <h2>Frequently Asked Questions</h2>
            <div class="anaheim-faq-list">
                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h3>What security services do you provide in ${city.name}?</h3>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>ShieldWise Security offers comprehensive security services in ${city.name} including ${city.specialty.toLowerCase()} security, mobile patrol services, event security, and emergency response. All guards are BSIS licensed with specialized training for ${city.name}'s unique environment.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item">
                    <div class="faq-question">
                        <h3>How quickly can you deploy security guards in ${city.name}?</h3>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>We offer rapid deployment in ${city.name} with emergency response in 2-4 hours and standard deployment within 24-48 hours. Our local team ensures quick response times throughout San Diego County.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="anaheim-cta-section" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/2.webp');">
        <div class="anaheim-cta-container">
            <div class="anaheim-cta-content">
                <h2>Ready to Secure Your ${city.name} Property?</h2>
                <p>Contact ShieldWise Security today for a free, no-obligation security assessment.</p>
                <div class="anaheim-cta-buttons">
                    <a href="tel:7147167430" class="anaheim-cta-call"><i class="fas fa-phone-alt"></i> ${city.phone}</a>
                    <a href="/get-quote" class="anaheim-cta-quote"><i class="fas fa-clipboard-check"></i> Request a Quote</a>
                </div>
            </div>
        </div>
    </section>

    <%- include('../partials/Footer') %>
    
    <a href="#top" id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </a>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" defer></script>
    <script src="/JS/back-to-top.js"></script>

    <script>
        $(document).ready(function() {
            // FAQ Toggle functionality
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

            // Smooth scrolling
            $('a[href^="#"]').on('click', function(event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 100
                }, 800);
            });
        });

        // Initialize back to top
        if (typeof initBackToTop === 'function') {
            initBackToTop();
        }
    </script>
</body>
</html>`;
}

// Generate all city pages
function generateAllCityPages() {
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');
    
    // Ensure cities directory exists
    if (!fs.existsSync(citiesDir)) {
        fs.mkdirSync(citiesDir, { recursive: true });
    }
    
    cities.forEach(city => {
        const filename = `${city.slug}.ejs`;
        const filepath = path.join(citiesDir, filename);
        
        // Generate content for each city
        const content = generateCityPage(city);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ Generated: ${filename}`);
    });
    
    console.log(`🎉 Generated ${cities.length} city pages for San Diego County!`);
}

// Run the generator
if (require.main === module) {
    generateAllCityPages();
}

module.exports = { cities, generateCityPage, generateAllCityPages };

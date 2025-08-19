
const fs = require('fs');
const path = require('path');

// Ventura County cities data
const cities = [
    {
        name: 'Simi Valley',
        slug: 'simi-valley',
        description: 'Professional security guard services in Simi Valley, CA. Licensed armed/unarmed guards for businesses, residential communities, and retail properties. 24/7 protection from $38/hour.',
        keywords: 'Simi Valley security guards, business security Simi Valley, residential security guards, retail security Simi Valley, BSIS licensed guards, Ventura County security, professional security services Simi Valley',
        coordinates: { lat: 34.2694, lng: -118.7815 },
        specialty: 'Residential and Business Security',
        areas: ['Ronald Reagan Presidential Library Area', 'Simi Valley Town Center', 'Wood Ranch', 'Alamos', 'Valley View']
    },
    {
        name: 'Ventura',
        slug: 'ventura',
        description: 'Expert security guard services in Ventura, CA. Licensed protection for businesses, coastal properties, government facilities, and events. 24/7 coverage from $38/hour.',
        keywords: 'Ventura security guards, coastal security Ventura, government security, downtown Ventura security, pier security, BSIS licensed guards, Ventura County security services',
        coordinates: { lat: 34.2741, lng: -119.2287 },
        specialty: 'Coastal and Government Security',
        areas: ['Downtown Ventura', 'Ventura Harbor', 'Midtown', 'Ventura Avenue', 'Pierpont Bay']
    },
    {
        name: 'Camarillo',
        slug: 'camarillo',
        description: 'Professional security guard services in Camarillo, CA. Licensed armed/unarmed guards for premium outlets, corporate facilities, and residential properties. 24/7 protection.',
        keywords: 'Camarillo security guards, premium outlets security, corporate security Camarillo, residential security, BSIS licensed guards, Ventura County security, business protection Camarillo',
        coordinates: { lat: 34.2164, lng: -119.0376 },
        specialty: 'Corporate and Retail Security',
        areas: ['Camarillo Premium Outlets', 'Old Town Camarillo', 'Spanish Hills', 'Village at the Park', 'Las Posas']
    },
    {
        name: 'Moorpark',
        slug: 'moorpark',
        description: 'Expert security guard services in Moorpark, CA. Licensed protection for residential communities, businesses, and educational facilities. 24/7 coverage from $38/hour.',
        keywords: 'Moorpark security guards, residential security Moorpark, business security, educational security, BSIS licensed guards, Ventura County security services, community protection',
        coordinates: { lat: 34.2855, lng: -118.8826 },
        specialty: 'Community and Educational Security',
        areas: ['Moorpark College Area', 'Peach Hill', 'Mountain Meadows', 'Groves at Moorpark', 'Campus Park']
    },
    {
        name: 'Fillmore',
        slug: 'fillmore',
        description: 'Professional security guard services in Fillmore, CA. Licensed armed/unarmed guards for agricultural facilities, businesses, and residential properties. 24/7 protection.',
        keywords: 'Fillmore security guards, agricultural security, business security Fillmore, residential security, BSIS licensed guards, Ventura County security, rural property protection',
        coordinates: { lat: 34.3989, lng: -118.9179 },
        specialty: 'Agricultural and Rural Security',
        areas: ['Downtown Fillmore', 'Heritage Valley', 'Fillmore Industrial Area', 'Sespe Creek', 'Mountain View']
    },
    {
        name: 'Santa Paula',
        slug: 'santa-paula',
        description: 'Expert security guard services in Santa Paula, CA. Licensed protection for businesses, agricultural facilities, and residential properties. 24/7 coverage from $38/hour.',
        keywords: 'Santa Paula security guards, agricultural security, business security Santa Paula, residential security, BSIS licensed guards, Ventura County security, community protection',
        coordinates: { lat: 34.3542, lng: -119.0593 },
        specialty: 'Agricultural and Business Security',
        areas: ['Downtown Santa Paula', 'East Area', 'West Side', 'Saticoy', 'Telegraph Road Corridor']
    },
    {
        name: 'Port Hueneme',
        slug: 'port-hueneme',
        description: 'Professional security guard services in Port Hueneme, CA. Licensed armed/unarmed guards for port facilities, naval base, and businesses. 24/7 maritime security protection.',
        keywords: 'Port Hueneme security guards, port security, naval base security, maritime security, BSIS licensed guards, Ventura County security, coastal protection',
        coordinates: { lat: 34.1478, lng: -119.1951 },
        specialty: 'Maritime and Port Security',
        areas: ['Port of Hueneme', 'Naval Base Ventura County', 'Surfside Drive', 'Ponoma Street', 'Channel Islands Boulevard']
    },
    {
        name: 'Ojai',
        slug: 'ojai',
        description: 'Expert security guard services in Ojai, CA. Licensed protection for resorts, wellness centers, residential properties, and events. 24/7 coverage from $38/hour.',
        keywords: 'Ojai security guards, resort security, wellness center security, residential security Ojai, event security, BSIS licensed guards, Ventura County security',
        coordinates: { lat: 34.4482, lng: -119.2429 },
        specialty: 'Resort and Wellness Security',
        areas: ['Downtown Ojai', 'Ojai Valley', 'Meiners Oaks', 'East End', 'Ojai Meadows']
    }
];

// Template function to generate city page
function generateCityPage(city) {
    return `<!DOCTYPE html>
<html lang="en-US" itemscope itemtype="https://schema.org/LocalBusiness">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Enhanced SEO Meta Tags -->
    <title>${city.specialty} ${city.name} CA | ShieldWise BSIS Licensed Security Guards</title>
    <meta name="description" content="${city.description}">
    <meta name="keywords" content="${city.keywords}">
    <meta name="author" content="ShieldWise Security Services">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    <!-- Geographic Meta Tags -->
    <meta name="geo.region" content="US-CA">
    <meta name="geo.placename" content="${city.name}">
    <meta name="geo.position" content="${city.coordinates.lat};${city.coordinates.lng}">
    <meta name="ICBM" content="${city.coordinates.lat}, ${city.coordinates.lng}">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://shieldwisesecurity.com/ventura-county/${city.slug}" />

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${city.specialty} ${city.name} CA | ShieldWise Security">
    <meta property="og:description" content="${city.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://shieldwisesecurity.com/ventura-county/${city.slug}">
    <meta property="og:image" content="https://shieldwisesecurity.com/img/${city.slug}-security.jpg">

    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style-cities.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ShieldWise Security - ${city.name} Security Guard Services",
        "description": "${city.description}",
        "url": "https://shieldwisesecurity.com/ventura-county/${city.slug}",
        "telephone": "(714) 716-7430",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "${city.name}",
            "addressRegion": "CA",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${city.coordinates.lat},
            "longitude": ${city.coordinates.lng}
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "$38-$95 per hour",
        "areaServed": "${city.name}, CA"
    }
    </script>
</head>

<body id="top">
    <!-- Header Section -->
    <%- include('../partials/Header') %>

    <!-- Hero Section -->
    <section class="hero-downtown">
        <div class="hero-content">
            <h1>${city.name} Security Services</h1>
            <h2>Professional Security Guard Solutions for ${city.specialty}</h2>
            <a href="/get-quote" class="btn btn-primary btn-lg">Get a Free Security Quote</a>
            <p class="mt-3"><a href="tel:+17147167430" class="text-white"><i class="fas fa-phone-alt mr-2"></i>(714) 716-7430</a> - Available 24/7</p>
        </div>
    </section>

    <!-- Introduction Section -->
    <main id="main-content">
    <section class="downtown-security">
        <div class="container">
            <h2 class="section-title">Trusted Security Guard Services in ${city.name}</h2>
            <div class="content-wrapper">
                <div class="text-content">
                    <p>ShieldWise Security provides <span class="highlight">professional security guard services</span> tailored specifically to the unique needs of ${city.name} businesses and properties. With our extensive knowledge of ${city.name}'s community and business landscape, we deliver unmatched protection and peace of mind.</p>
                    <p>Our team of highly trained, licensed and insured security professionals understands the diverse security requirements across different sectors in ${city.name}. We combine advanced security protocols with a customer-focused approach to create security solutions that address your specific concerns.</p>
                    <p>Whether you need <a href="/services/armed-security">armed guards</a>, <a href="/services/unarmed-security">unarmed security personnel</a>, or <a href="/services/patrol">mobile patrols</a> throughout ${city.name}, our team is ready to develop a comprehensive security plan for your business or property.</p>
                </div>
                <div class="image-content">
                    <img src="/img/shahn1.png" alt="Professional security guard providing protection services in ${city.name}, California" loading="lazy" width="500" height="333">
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="our-services" id="${city.slug}-security-services">
        <div class="container">
            <h2>Our ${city.name} Security Services</h2>
            <p>ShieldWise Security offers a comprehensive range of security services tailored to the unique needs of ${city.name} businesses and properties.</p>

            <div class="services-grid">
                <div class="service-item">
                    <i class="fas fa-building"></i>
                    <h3>Commercial Security ${city.name}</h3>
                    <p>Professional security solutions for businesses and commercial properties throughout ${city.name} with 24/7 protection and monitoring.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-home"></i>
                    <h3>Residential Security</h3>
                    <p>Protect residential communities, apartment complexes, and private properties in ${city.name} with our experienced security personnel.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-calendar-alt"></i>
                    <h3>Event Security Services</h3>
                    <p>Professional event security for corporate functions, private parties, and community events throughout ${city.name}.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-car"></i>
                    <h3>Mobile Patrol Services</h3>
                    <p>Flexible mobile patrol coverage for multiple properties throughout ${city.name} with regular check-ins and rapid response.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-video"></i>
                    <h3>Surveillance Systems</h3>
                    <p>Advanced video surveillance systems to complement our security guard services, providing comprehensive protection.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Custom Security Solutions</h3>
                    <p>Tailored security plans designed specifically for the unique needs of ${city.name} businesses and properties.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-hard-hat"></i>
                    <h3>Construction Site Security</h3>
                    <p>Prevent theft and vandalism at construction sites throughout ${city.name} with our 24/7 security solutions.</p>
                </div>

                <div class="service-item">
                    <i class="fas fa-store"></i>
                    <h3>Retail Security</h3>
                    <p>Combat theft and ensure a safe shopping environment with our retail security solutions for ${city.name} businesses.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Why Choose ShieldWise Security in ${city.name}?</h2>
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-certificate text-primary mr-3" style="font-size: 1.8rem;"></i>
                                <h3 class="h5 m-0">Licensed & Insured Guards</h3>
                            </div>
                            <p class="card-text">All ShieldWise security personnel are fully licensed by the California Bureau of Security and Investigative Services, providing ${city.name} clients with professional protection.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-clock text-primary mr-3" style="font-size: 1.8rem;"></i>
                                <h3 class="h5 m-0">24/7 Availability</h3>
                            </div>
                            <p class="card-text">Our ${city.name} security teams are available around the clock, providing continuous protection when you need it most.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-map-marked-alt text-primary mr-3" style="font-size: 1.8rem;"></i>
                                <h3 class="h5 m-0">Local Area Knowledge</h3>
                            </div>
                            <p class="card-text">Our security teams understand ${city.name}'s unique characteristics and security requirements, ensuring effective protection.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-shield-alt text-primary mr-3" style="font-size: 1.8rem;"></i>
                                <h3 class="h5 m-0">Custom Security Plans</h3>
                            </div>
                            <p class="card-text">Every ${city.name} business has unique security needs. We create custom security plans based on detailed risk assessments.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Service Areas Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mb-4">Our ${city.name} Service Areas</h2>
                    <p class="mb-5">ShieldWise Security proudly serves all areas of ${city.name}, California, including:</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-unstyled text-center">
                        ${city.areas.map(area => `<li class="mb-3"><i class="fas fa-map-marker-alt text-danger mr-2"></i> ${area}</li>`).join('\n                        ')}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mb-4">Ready to Secure Your ${city.name} Property?</h2>
                    <p class="lead mb-5">Contact ShieldWise Security today for professional security solutions designed specifically for ${city.name} businesses and properties.</p>
                    <a href="/get-quote" class="btn btn-light btn-lg mr-3 mb-3">Get a Free Quote</a>
                    <a href="tel:+17147167430" class="btn btn-outline-light btn-lg mb-3"><i class="fas fa-phone-alt mr-2"></i>Call (714) 716-7430</a>
                </div>
            </div>
        </div>
    </section>

    </main>
    
    <!-- Footer -->
    <%- include('../partials/Footer') %>

    <!-- JavaScript -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" defer></script>
    <script src="/JS/back-to-top.js" defer></script>
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
    
    console.log(`🎉 Generated ${cities.length} Ventura County city pages!`);
}

// Run the generator
if (require.main === module) {
    generateAllCityPages();
}

module.exports = { cities, generateCityPage };

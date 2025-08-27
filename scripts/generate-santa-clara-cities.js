
const fs = require('fs');
const path = require('path');

// Santa Clara County cities data
const cities = [
    {
        name: 'Cupertino',
        slug: 'cupertino',
        specialty: 'Apple Campus & Tech Company Security',
        population: '60,000',
        description: 'Home to Apple Park and numerous tech companies, requiring specialized corporate security solutions.',
        features: ['Apple Campus Security', 'Corporate Protection', 'Tech Innovation Security', 'Executive Protection'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Palo Alto',
        slug: 'palo-alto',
        specialty: 'Stanford Area & Venture Capital Security',
        population: '67,000',
        description: 'Prestigious city near Stanford University with high-profile residents and businesses requiring premium security services.',
        features: ['Stanford Area Security', 'Venture Capital Protection', 'High-End Residential', 'Executive Protection'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Milpitas',
        slug: 'milpitas',
        specialty: 'Industrial & Manufacturing Security',
        population: '80,000',
        description: 'Major industrial hub with manufacturing facilities and tech companies requiring comprehensive security coverage.',
        features: ['Industrial Security', 'Manufacturing Protection', 'Corporate Campus Security', '24/7 Patrol Services'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Campbell',
        slug: 'campbell',
        specialty: 'Mixed-Use Development Security',
        population: '42,000',
        description: 'Vibrant community with mixed residential and commercial areas requiring flexible security solutions.',
        features: ['Mixed-Use Security', 'Retail Protection', 'Residential Security', 'Event Security'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Los Gatos',
        slug: 'los-gatos',
        specialty: 'Upscale Residential & Business Security',
        population: '31,000',
        description: 'Affluent community requiring premium security services for high-value properties and businesses.',
        features: ['Luxury Residential Security', 'High-End Retail Protection', 'Executive Protection', 'Private Event Security'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Morgan Hill',
        slug: 'morgan-hill',
        specialty: 'Community & Business District Security',
        population: '45,000',
        description: 'Growing community with diverse security needs for residential areas and business districts.',
        features: ['Community Security', 'Business District Protection', 'Residential Patrol', 'Mobile Security Services'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Gilroy',
        slug: 'gilroy',
        specialty: 'Agricultural & Tourism Security',
        population: '59,000',
        description: 'Known for agriculture and tourism, requiring specialized security for events and seasonal activities.',
        features: ['Event Security', 'Agricultural Security', 'Tourism Protection', 'Seasonal Security Services'],
        heroImage: '/img/san jose.webp'
    },
    {
        name: 'Fremont',
        slug: 'fremont',
        specialty: 'Tech Manufacturing & Automotive Security',
        population: '230,000',
        description: 'Major tech and automotive manufacturing center requiring industrial-grade security solutions.',
        features: ['Manufacturing Security', 'Automotive Protection', 'Tech Facility Security', 'Industrial Patrol'],
        heroImage: '/img/san jose.webp'
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

    <!-- SEO Meta Tags -->
    <title>${city.name} Security Guards | ${city.specialty} | BSIS Licensed | ShieldWise Security</title>
    <meta name="description" content="Professional security guard services in ${city.name}, CA since 2015. ${city.specialty.toLowerCase()}, corporate campus security, Silicon Valley expertise. 24/7 BSIS-licensed guards with 2-hour response. Free quote: (714) 716-7430">
    <meta name="keywords" content="${city.name} security guards, ${city.specialty.toLowerCase()}, Silicon Valley security services, tech company security, corporate campus protection, Santa Clara County security, professional security guards ${city.name} CA">
    <meta name="author" content="ShieldWise Security - Professional Security Services">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://shieldwisesecurity.com/california/${city.slug}">

    <!-- Performance Optimization -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>

    <!-- Critical CSS -->
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

    <!-- Enhanced Performance -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"></noscript>

    <!-- Mobile Optimization -->
    <meta name="theme-color" content="#003366">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="ShieldWise ${city.name} Security">
    <meta name="format-detection" content="telephone=yes">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/anaheim-styles.css">

    <!-- Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ABCD123456"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ABCD123456');
    </script>
</head>

<body id="top" class="${city.slug}-page">

    <!-- Header -->
    <%- include('../partials/Header') %>

    <!-- Hero Section -->
    <section class="${city.slug}-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${city.heroImage}');" role="banner">
        <div class="${city.slug}-hero-overlay"></div>
        <div class="${city.slug}-hero-content">
            <h1 class="animate-fade-in">${city.name}'s Premier Security Solutions</h1>
            <p class="animate-fade-in-delay">Professional ${city.specialty.toLowerCase()} and comprehensive protection services in Santa Clara County</p>
            <div class="${city.slug}-cta-buttons">
                <a href="#contact-sec" class="${city.slug}-cta-button animate-fade-in-delay-2">Get Your Free Security Assessment</a>
                <a href="tel:7147167430" class="${city.slug}-cta-button-alt animate-fade-in-delay-2"><i class="fas fa-phone"></i> (714) 716-7430</a>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <section class="anaheim-main-content py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-badge">${city.specialty}</div>
                    <h2 class="section-title">Professional Security Guard Services in ${city.name}, CA</h2>
                    <div class="anaheim-intro-rating text-center mb-4">
                        <div class="stars">
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                        </div>
                        <span>4.9/5 from 150+ reviews</span>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="anaheim-highlight-box bg-light p-4 mb-4">
                                <div class="highlight-content">
                                    <p><strong>ShieldWise Security</strong> provides premier security services in ${city.name}, a dynamic Santa Clara County community with approximately ${city.population} residents. ${city.description}</p>
                                    <p>Our specialized security professionals understand the unique requirements of ${city.name}'s business environment, delivering comprehensive protection that addresses the specific challenges and opportunities in this growing Silicon Valley community.</p>
                                </div>
                            </div>

                            <h3>Why ${city.name} Businesses Choose ShieldWise Security</h3>
                            <div class="row">
                                ${city.features.map((feature, index) => {
                                    const icons = ['fas fa-shield-alt', 'fas fa-building', 'fas fa-users', 'fas fa-clock'];
                                    return `<div class="col-md-6 mb-3">
                                        <div class="feature-item p-3 border-left border-primary">
                                            <h5><i class="${icons[index] || 'fas fa-check'} text-primary mr-2"></i>${feature}</h5>
                                            <p>Professional security solutions tailored to ${city.name}'s unique needs.</p>
                                        </div>
                                    </div>`;
                                }).join('')}
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="card border-0 shadow">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Get A Free Quote</h5>
                                    <p class="card-text">Customized security solutions for your ${city.name} business or property.</p>
                                    <a href="/get-quote" class="btn btn-primary btn-block mb-2">Request Quote</a>
                                    <a href="tel:7147167430" class="btn btn-outline-primary btn-block">
                                        <i class="fas fa-phone mr-2"></i>(714) 716-7430
                                    </a>
                                </div>
                            </div>

                            <div class="mt-4">
                                <h5>Our ${city.name} Services</h5>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check text-success mr-2"></i>Armed Security Guards</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Unarmed Security Guards</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Mobile Patrol Services</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Corporate Security</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Event Security</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Access Control</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Emergency Response</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title">Security Services in ${city.name}</h2>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-body text-center">
                            <i class="fas fa-user-shield fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Professional Security Guards</h5>
                            <p class="card-text">BSIS-licensed security professionals trained for ${city.name}'s specific security needs.</p>
                            <small class="text-muted">Starting at $35-55/hour</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-body text-center">
                            <i class="fas fa-building fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Corporate Security</h5>
                            <p class="card-text">Comprehensive protection for businesses and corporate facilities in ${city.name}.</p>
                            <small class="text-muted">Starting at $30-50/hour</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-body text-center">
                            <i class="fas fa-car fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Mobile Patrol</h5>
                            <p class="card-text">GPS-tracked mobile security patrols for comprehensive area coverage.</p>
                            <small class="text-muted">Starting at $45-65/hour</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white" id="contact-sec">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mb-4">Ready to Secure Your ${city.name} Property?</h2>
                    <p class="lead mb-5">Contact ShieldWise Security today for professional security solutions designed specifically for ${city.name} businesses and properties.</p>
                    <a href="tel:7147167430" class="btn btn-light btn-lg mr-3 mb-3"><i class="fas fa-phone-alt"></i> (714) 716-7430</a>
                    <a href="/get-quote" class="btn btn-outline-light btn-lg mb-3"><i class="fas fa-clipboard-check"></i> Request a Quote</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <%- include('../partials/Footer') %>

    <!-- Back to Top Button -->
    <a href="#top" id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </a>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" defer></script>
    <script src="/JS/back-to-top.js"></script>
    <script>
        $(document).ready(function() {
            // Initialize back to top
            if (typeof initBackToTop === 'function') {
                initBackToTop();
            }
            
            // Smooth scrolling
            $('a[href^="#"]').on('click', function(event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 100
                }, 800);
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
    
    console.log(`🎉 Generated ${cities.length} Santa Clara County city pages!`);
}

// Run the generator
if (require.main === module) {
    generateAllCityPages();
}

module.exports = { cities, generateCityPage, generateAllCityPages };

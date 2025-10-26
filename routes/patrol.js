const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Mobile Patrol Security Services',
        serviceTitle: 'Mobile Patrol Security Services California',
        serviceDescription: 'Professional mobile patrol security services across California. 24/7 random patrols, alarm response, and property monitoring. Licensed & insured patrol officers.',
        serviceKeywords: 'mobile patrol security California, security patrol services, alarm response, property monitoring, random patrols, mobile security guards, patrol officers California, vehicle patrol security, parking lot patrol, property inspection services',
        serviceImage: 'mobilesecurity.webp',
        serviceUrl: 'patrol',
        serviceType: 'mobile_patrol',
        serviceBenefit: 'comprehensive mobile security coverage and visible deterrence',
        propertyType: 'commercial and residential properties',

        // Pricing Information
        priceRange: { 
            low: 45, 
            mid: 65, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Mobile Security Patrol Services',
        serviceOutput: 'Enhanced Property Protection with Professional Mobile Security Patrols',
        audienceType: 'Property Managers, Business Owners, HOAs, Commercial Facilities, Retail Centers',

        // Page-specific Meta Data
        pageTitle: 'Mobile Patrol Security Services California | 24/7 Random Patrols | ShieldWise Security',
        metaDescription: 'Professional mobile patrol security in California. 24/7 random patrols, alarm response, property inspections. Licensed patrol officers serving LA, Orange County & San Diego. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/patrol/',
        
        // AI-Friendly Summary (2-3 sentences for AI Overviews)
        aiSummary: 'ShieldWise Security provides professional mobile patrol security services throughout California with licensed patrol officers conducting random patrols, alarm response, and comprehensive property inspections. Our mobile security patrols offer cost-effective 24/7 protection with visible marked vehicles, unpredictable patrol patterns, and detailed reporting for businesses, residential communities, and multi-location properties across Los Angeles, Orange County, San Diego, and statewide.',
        
        // Service Overview (2-4 paragraphs with CA coverage)
        overview: 'ShieldWise Security delivers California\'s most reliable mobile patrol security services, providing cost-effective property protection through random security patrols, alarm response, and comprehensive property inspections. Our marked patrol vehicles create a highly visible security presence that deters criminal activity while covering multiple properties efficiently. With over 10 years of experience and a fleet of patrol vehicles throughout California, we serve clients across Los Angeles, Orange County, San Diego, San Francisco Bay Area, Sacramento, and all major metropolitan regions.<br><br>Our licensed mobile patrol officers conduct unpredictable patrol patterns at varying times, making it difficult for criminals to anticipate coverage gaps. Each patrol includes thorough property inspections checking doors, windows, lighting, parking areas, and potential security vulnerabilities. Our officers document findings through detailed patrol reports with photo evidence, GPS tracking, and timestamps accessible through our online client portal 24/7.<br><br>Whether you need mobile patrols for commercial properties, residential communities, construction sites, vacant buildings, or multi-location coverage, ShieldWise Security provides customized patrol schedules with rapid alarm response throughout California. Our 24/7 dispatch center ensures immediate coordination for any security situation requiring attention.',

        // Use Cases (3-6 scenarios)
        useCases: [
            {
                icon: 'fas fa-building',
                title: 'Multi-Location Commercial Properties',
                description: 'Mobile patrols for businesses with multiple locations, office complexes, or properties spread across regions requiring efficient, cost-effective security coverage.'
            },
            {
                icon: 'fas fa-home',
                title: 'HOA & Gated Communities',
                description: 'Residential community patrols for homeowners associations, gated communities, and neighborhood watch programs enhancing resident safety.'
            },
            {
                icon: 'fas fa-store',
                title: 'Retail & Shopping Centers',
                description: 'Parking lot patrols, property perimeter checks, and after-hours security for shopping centers, strip malls, and standalone retail locations.'
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Vacant & Construction Sites',
                description: 'Regular patrols for vacant properties, construction sites, and buildings under renovation preventing trespassing, vandalism, and theft.'
            },
            {
                icon: 'fas fa-bell',
                title: 'Alarm Response Services',
                description: 'Immediate mobile response to alarm activations, security system alerts, and emergency notifications with professional assessment and law enforcement coordination.'
            },
            {
                icon: 'fas fa-moon',
                title: 'After-Hours Property Monitoring',
                description: 'Night patrols and weekend coverage for businesses, facilities, and properties requiring security presence outside normal operating hours.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise mobile patrol officers hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and undergo comprehensive background checks including LiveScan fingerprinting, criminal history verification, and driving record review. Our patrol officers complete specialized training in vehicle patrol operations, property inspection procedures, alarm response protocols, report writing, emergency coordination, and customer service. Each officer is trained in threat recognition, incident documentation, GPS tracking systems, and proper escalation procedures. Our patrol vehicles are fully insured, maintained to highest safety standards, and equipped with GPS tracking, two-way communication systems, emergency lighting, and reporting technology. We maintain comprehensive general liability insurance, commercial auto insurance, and workers\' compensation coverage exceeding California state requirements, providing complete protection for our clients.',
        
        // Pricing Models (Flexible Engagement Options)
        pricingModels: [
            {
                icon: 'fas fa-clock',
                title: 'Hourly Patrol Services',
                description: 'Flexible hourly mobile patrol security starting at $45/hour',
                features: [
                    'Random patrol patterns',
                    'No long-term contracts required',
                    'Customizable patrol schedules',
                    'Detailed patrol reports with photos'
                ]
            },
            {
                icon: 'fas fa-calendar-week',
                title: 'Contract Patrol Programs',
                description: 'Scheduled patrol contracts with preferred pricing',
                features: [
                    'Weekly or monthly patrol schedules',
                    'Dedicated patrol routes',
                    'Volume pricing discounts',
                    'Priority alarm response'
                ]
            },
            {
                icon: 'fas fa-bell',
                title: 'Alarm Response Packages',
                description: 'On-call patrol services for alarm verification and response',
                features: [
                    '24/7 alarm response availability',
                    'Rapid deployment under 15 minutes',
                    'Police coordination services',
                    'Video verification support'
                ]
            }
        ],

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-car',
                title: 'Random Mobile Patrols',
                description: 'Unpredictable patrol patterns maximize deterrence and coverage across your property or multiple locations throughout California.'
            },
            {
                icon: 'fas fa-bell',
                title: 'Alarm Response Services',
                description: 'Immediate response to alarm activations with professional assessment, property checks, and coordination with authorities.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Property Inspections',
                description: 'Comprehensive checks including doors, windows, lighting, parking areas, and potential security vulnerabilities with photo documentation.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Visible Deterrent Presence',
                description: 'Marked patrol vehicles with professional identification provide highly visible security presence deterring criminal activity.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Patrol Coverage',
                description: 'Round-the-clock mobile patrol services available seven days a week with customizable schedules meeting your specific needs.'
            },
            {
                icon: 'fas fa-file-alt',
                title: 'Detailed Reporting & GPS Tracking',
                description: 'Comprehensive patrol logs with timestamps, GPS verification, photos, and incident documentation accessible through online portal.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Property Assessment',
                description: 'Evaluation of property layout, access points, vulnerabilities, and specific security concerns requiring mobile patrol attention.'
            },
            {
                number: 2,
                title: 'Custom Patrol Schedule',
                description: 'Development of tailored patrol routes, timing patterns, and checkpoint procedures designed for your property requirements.'
            },
            {
                number: 3,
                title: 'Officer Deployment',
                description: 'Assignment of licensed patrol officers with appropriate training and equipped patrol vehicles for your security coverage.'
            },
            {
                number: 4,
                title: 'Ongoing Patrol Operations',
                description: 'Continuous mobile security patrols with regular reporting, adjustments based on findings, and 24/7 dispatch support.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-dollar-sign',
                title: 'Cost-Effective Security',
                description: 'Mobile patrols provide comprehensive coverage at significantly lower cost than stationary guards, ideal for large or multiple properties.'
            },
            {
                icon: 'fas fa-route',
                title: 'Multi-Location Coverage',
                description: 'Single patrol unit can cover multiple properties or extensive areas efficiently, maximizing security budget effectiveness.'
            },
            {
                icon: 'fas fa-eye',
                title: 'Visible Crime Deterrent',
                description: 'Marked patrol vehicles and uniformed officers create strong visual deterrent effect reducing vandalism, theft, and trespassing.'
            },
            {
                icon: 'fas fa-bolt',
                title: 'Rapid Response Capability',
                description: 'Mobile units respond quickly to alarms, incidents, or suspicious activity anywhere within their patrol territory.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Detailed Documentation',
                description: 'GPS-tracked patrols with photo evidence and comprehensive reports provide accountability and security trend analysis.'
            },
            {
                icon: 'fas fa-shield-virus',
                title: 'Flexible Scheduling',
                description: 'Patrol frequency and timing can be adjusted based on risk assessment, budget, and changing security requirements.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Commercial Patrol',
                features: [
                    'Office Complex Security Patrols',
                    'Shopping Center Parking Lot Patrols',
                    'Industrial Site Perimeter Checks',
                    'Multi-Location Property Coverage'
                ]
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Patrol',
                features: [
                    'HOA Community Security Patrols',
                    'Gated Community Overnight Patrols',
                    'Vacation Home Regular Checks',
                    'Neighborhood Watch Patrol Support'
                ]
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Construction & Vacant Sites',
                features: [
                    'Construction Site Security Patrols',
                    'Vacant Property Monitoring Checks',
                    'Equipment & Material Protection',
                    'Trespasser Detection & Prevention'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '24/7', label: 'Patrol Availability' },
            { number: '500+', label: 'Properties Served' },
            { number: '<15min', label: 'Average Response Time' },
            { number: '10+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Robert Martinez',
                title: 'Property Manager',
                image: 'james.webp',
                quote: 'ShieldWise mobile patrols have been instrumental in reducing incidents at our commercial properties. Their random patrol patterns and detailed reporting give us complete peace of mind.'
            },
            {
                name: 'Lisa Chen',
                title: 'HOA President',
                image: 'jassica.webp',
                quote: 'The mobile patrol service has transformed our community security. Residents feel safer knowing professional patrol officers check the property multiple times nightly.'
            },
            {
                name: 'David Thompson',
                title: 'Facility Director',
                image: 'samanta.webp',
                quote: 'Professional, reliable, and thorough. The GPS-tracked patrol reports are excellent and their alarm response time is outstanding for our multi-location facilities.'
            }
        ],
        
        // California Cities Coverage
        cities: [
            { name: 'Los Angeles', url: '/los-angeles' },
            { name: 'Orange County', url: '/orange-county/irvine' },
            { name: 'San Diego', url: '/san-diego' },
            { name: 'San Jose', url: '/san-jose' },
            { name: 'San Francisco', url: '/san-francisco' },
            { name: 'Sacramento', url: '/sacramento' },
            { name: 'Fresno', url: '/fresno' },
            { name: 'Long Beach', url: '/long-beach' },
            { name: 'Oakland', url: '/oakland' },
            { name: 'Bakersfield', url: '/bakersfield' },
            { name: 'Anaheim', url: '/anaheim' },
            { name: 'Santa Ana', url: '/santa-ana' },
            { name: 'Riverside', url: '/riverside' },
            { name: 'Irvine', url: '/orange-county/irvine' },
            { name: 'Stockton', url: '/stockton' },
            { name: 'Chula Vista', url: '/chula-vista' }
        ],
        
        // FAQs (5-8 questions specific to mobile patrol)
        faqs: [
            {
                question: 'What is mobile patrol security and how does it work?',
                answer: 'Mobile patrol security involves licensed security officers in marked vehicles conducting random patrols of your property or multiple locations. Officers perform property inspections, check access points, monitor for suspicious activity, and respond to alarms. Patrol schedules are unpredictable to maximize deterrent effect, and all patrols are GPS-tracked with detailed reports provided to clients.'
            },
            {
                question: 'How much does mobile patrol security cost in California?',
                answer: 'Mobile patrol security services in California typically range from $45-$85 per hour depending on patrol frequency, coverage area, response requirements, and contract duration. Mobile patrols are significantly more cost-effective than stationary guards for large properties or multi-location coverage. We offer flexible hourly rates and discounted contract pricing for scheduled patrol programs. Contact us for a customized quote.'
            },
            {
                question: 'How often will mobile patrols visit my property?',
                answer: 'Patrol frequency is customized to your security needs and budget. Common schedules include hourly patrols, patrols every 2-4 hours, multiple nightly patrols, or specific time-based visits. We create random patrol patterns rather than predictable schedules to maximize security effectiveness and prevent criminals from timing gaps in coverage.'
            },
            {
                question: 'Do mobile patrol officers respond to alarms?',
                answer: 'Yes, ShieldWise mobile patrol officers provide alarm response services throughout California. When your alarm activates, our nearest patrol unit responds immediately, typically arriving within 15 minutes. Officers conduct thorough property inspections, verify the alarm cause, coordinate with law enforcement if needed, and provide detailed incident reports with photo documentation.'
            },
            {
                question: 'What areas do mobile patrols check during property visits?',
                answer: 'During each patrol, our officers conduct comprehensive inspections including all building perimeters, doors and windows, parking areas and gates, lighting systems, access control points, and any specific areas of concern. Officers check for signs of break-ins, vandalism, trespassing, fire hazards, and maintenance issues. All findings are documented with photos and GPS timestamps.'
            },
            {
                question: 'Can mobile patrols cover multiple properties or locations?',
                answer: 'Yes, mobile patrol is ideal for businesses or organizations with multiple properties. A single patrol route can efficiently cover several nearby locations, providing cost-effective security for property portfolios, retail chains, storage facilities, or distributed commercial properties throughout California. We customize multi-location patrol routes based on your property locations and security priorities.'
            },
            {
                question: 'Are mobile patrol services available 24/7 in California?',
                answer: 'Yes, ShieldWise provides 24/7 mobile patrol security services throughout California, including nights, weekends, and holidays. Our patrol officers are available around the clock for scheduled patrols, on-call alarm response, and emergency security situations. Our dispatch center operates 24/7 to coordinate patrol activities and respond to client needs.'
            },
            {
                question: 'What reports do you provide for mobile patrol services?',
                answer: 'We provide comprehensive digital patrol reports after each visit including GPS-verified patrol times and routes, property inspection findings with photos, any incidents or concerns discovered, weather conditions, and officer observations. Reports are accessible 24/7 through our secure online client portal and can be customized to include specific checkpoints or documentation your property requires.'
            }
        ],
        
        // Related Services (Internal Linking)
        relatedServices: [
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'BSIS-licensed armed security personnel for high-risk properties',
                url: '/services/armed-security'
            },
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security guards for general protection',
                url: '/services/unarmed-security'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Complete security solutions for businesses and commercial properties',
                url: '/services/commercial-security'
            },
            {
                name: 'Apartment Security',
                icon: 'fas fa-home',
                description: 'Residential security services for apartment complexes and communities',
                url: '/services/apartment-security'
            },
            {
                name: 'Construction Security',
                icon: 'fas fa-hard-hat',
                description: 'Specialized security for construction sites and equipment protection',
                url: '/services/construction-security'
            },
            {
                name: 'Fire Watch Services',
                icon: 'fas fa-fire-extinguisher',
                description: '24/7 fire watch guards for properties with non-functional fire systems',
                url: '/services/fire-watch'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/patrol'
    });
});

module.exports = router;

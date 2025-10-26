const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Apartment Security',
        serviceTitle: 'Professional Apartment Security Guards California',
        serviceDescription: 'Professional apartment and residential complex security guards in California providing 24/7 protection, access control, and community safety for apartment buildings, condos, and multifamily properties.',
        serviceKeywords: 'apartment security guards California, residential security services, condo security, apartment complex security, HOA security guards, residential patrol, community security officers',
        serviceImage: 'apartment-security-california.webp',
        serviceUrl: 'apartment-security',
        serviceType: 'apartment_security',
        serviceBenefit: 'safe residential communities with professional security presence',
        propertyType: 'apartments, condos, townhomes, and multifamily residential complexes',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 50, 
            high: 70 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Residential Complex Security Services',
        serviceOutput: 'Safe, Secure Residential Communities',
        audienceType: 'Property Managers, HOA Boards, Apartment Owners, Residential Developers, Community Associations',

        // Page-specific Meta Data
        pageTitle: 'Apartment Security Guards California | Residential Complex Security | ShieldWise Security',
        metaDescription: 'Professional apartment security guards in California. 24/7 protection for residential complexes, condos, HOAs. Licensed officers, patrol services. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/apartment-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional apartment and residential complex security guard services throughout California for multifamily properties, condos, HOAs, and gated communities. Our BSIS-licensed security officers offer 24/7 protection, access control, patrol services, guest management, and community safety, serving property managers and HOAs in Los Angeles, Orange County, San Diego, and statewide with customized residential security programs.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most trusted apartment and residential complex security services, protecting multifamily properties, condos, townhome communities, HOAs, and gated communities throughout the state. With over 15 years of experience securing residential properties from small 50-unit complexes to large communities exceeding 500 units, we provide professional security officers who combine effective protection with excellent resident service and community engagement.<br><br>Our residential security guards are BSIS-licensed professionals trained specifically in residential security operations, customer service excellence, conflict de-escalation, emergency response, and community relations. They understand the unique needs of residential environments, balancing security effectiveness with the friendly, approachable demeanor residents expect in their home communities. Services include lobby/gate security, access control and visitor management, regular property patrols, parking enforcement, package acceptance, emergency response coordination, and incident documentation.<br><br>Whether you need full-time security for apartment lobbies, evening/overnight patrol services, weekend coverage, or special event security for community gatherings, ShieldWise Security provides flexible residential security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California cities. Our programs are designed to enhance resident safety, reduce property crime, and create peaceful living environments.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-building',
                title: 'Large Apartment Complexes',
                description: 'Security for apartment communities with 100+ units requiring lobby security, access control, and 24/7 protection.'
            },
            {
                icon: 'fas fa-home',
                title: 'Gated Communities',
                description: 'Security officers for gated residential communities, condos, and townhome developments with controlled access.'
            },
            {
                icon: 'fas fa-users',
                title: 'HOA Communities',
                description: 'Professional security services for homeowners associations and residential community associations.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'High-Crime Areas',
                description: 'Enhanced security for residential properties in areas experiencing elevated crime, vandalism, or safety concerns.'
            },
            {
                icon: 'fas fa-car',
                title: 'Parking & Vehicle Security',
                description: 'Parking lot patrols, vehicle monitoring, parking enforcement, and protection against theft and vandalism.'
            },
            {
                icon: 'fas fa-moon',
                title: 'Overnight Security',
                description: 'Evening and overnight security coverage (6 PM - 6 AM) when most residential crimes occur.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise residential security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and complete comprehensive background checks including LiveScan fingerprinting, criminal history verification, and employment verification. Our apartment security officers receive specialized training in residential security operations and best practices, customer service and community relations, conflict resolution and de-escalation, trespassing laws and procedures, emergency response and 911 coordination, incident documentation and reporting, and property-specific protocols. Many guards have long-term assignments at specific properties, developing familiarity with residents, layouts, and community needs. We maintain comprehensive general liability insurance, workers\' compensation coverage, and provide detailed shift reports, incident logs, and management communications.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-door-open',
                title: 'Lobby/Gate Security',
                description: 'Stationed security officers at lobbies or entry gates starting at $35/hour',
                features: [
                    'Access control and visitor screening',
                    'Package acceptance and management',
                    'Resident assistance and service',
                    'Flexible shift scheduling'
                ]
            },
            {
                icon: 'fas fa-walking',
                title: 'Patrol Services',
                description: 'Regular property patrols for apartments and complexes',
                features: [
                    'Scheduled or random patrols',
                    'Common area monitoring',
                    'Parking lot security',
                    'Incident response and reporting'
                ]
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Full-Time Security Programs',
                description: 'Dedicated security coverage with preferred pricing',
                features: [
                    '24/7 or custom hour coverage',
                    'Consistent officer assignments',
                    'Reduced long-term rates',
                    'Supervisor support included'
                ]
            }
        ],
        
        // California Cities
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
        
        // FAQs
        faqs: [
            {
                question: 'How much does apartment security cost in California?',
                answer: 'Apartment security guard services in California typically cost $35-$70 per hour per guard, depending on whether guards are stationed (lobby/gate) or mobile (patrol), shift times (day/evening/overnight), and contract length. Full-time dedicated coverage and long-term contracts receive discounted rates. Most apartment complexes budget $3,000-$8,000 per month for professional security coverage.'
            },
            {
                question: 'What services do apartment security guards provide?',
                answer: 'Apartment security guards provide lobby or gate access control, visitor screening and guest management, resident assistance and customer service, regular property and parking patrols, package acceptance and logging, emergency response and 911 coordination, incident documentation and reporting, parking enforcement, and community safety presence.'
            },
            {
                question: 'Do security guards help reduce apartment insurance costs?',
                answer: 'Yes, many property insurance providers offer premium discounts for apartment complexes with professional security services. The presence of licensed security guards demonstrates risk mitigation and can result in 5-15% insurance savings. Additionally, security reduces theft, vandalism, and liability claims, further lowering long-term insurance costs.'
            },
            {
                question: 'Can apartment security guards enforce parking rules?',
                answer: 'Yes, apartment security guards can enforce parking rules and HOA regulations by issuing violation notices, documenting unauthorized vehicles, coordinating with towing companies for repeat violators, and maintaining parking logs. However, guards cannot physically tow vehicles themselves and must work with licensed towing services.'
            },
            {
                question: 'What is the difference between security guards and courtesy officers?',
                answer: 'Security guards are professional BSIS-licensed security officers employed by licensed security companies with comprehensive training, insurance, and oversight. Courtesy officers are typically residents (often retired law enforcement) who receive reduced rent in exchange for informal security presence. Professional security guards provide more reliable, accountable, and legally compliant security services.'
            },
            {
                question: 'Do you provide armed security for apartments?',
                answer: 'Yes, ShieldWise Security provides armed security guards for apartment complexes and residential communities experiencing elevated crime, gang activity, or safety concerns requiring enhanced protection. Armed guards are BSIS-licensed with firearms permits and specialized training. Most residential properties use unarmed guards for cost-effectiveness and approachability.'
            },
            {
                question: 'How quickly can you provide apartment security guards?',
                answer: 'We can typically deploy apartment security guards within 24-48 hours for Los Angeles, Orange County, and San Diego properties, and within 48-72 hours statewide. Emergency same-day deployment may be available for urgent situations. Long-term contracts allow us to assign dedicated officers who learn your property and community.'
            },
            {
                question: 'Are your security guards insured and bonded?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance, workers\' compensation coverage for all guards, professional liability insurance, and surety bonds as required by California law. We provide certificates of insurance to property managers and HOAs upon request for insurance and compliance purposes.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security officers for residential properties',
                url: '/services/unarmed-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for apartment complexes and communities',
                url: '/services/patrol'
            },
            {
                name: 'HOA Security',
                icon: 'fas fa-home',
                description: 'Security solutions for homeowners associations and gated communities',
                url: '/services/residential-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security for community events, HOA meetings, and resident gatherings',
                url: '/services/event-security'
            },
            {
                name: 'Armed Security',
                icon: 'fas fa-shield-alt',
                description: 'Armed guards for high-crime residential areas requiring enhanced protection',
                url: '/services/armed-security'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Security solutions for mixed-use developments and commercial properties',
                url: '/services/commercial-security'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-door-open',
                title: 'Access Control',
                description: 'Professional lobby and gate security with visitor screening and resident assistance.'
            },
            {
                icon: 'fas fa-walking',
                title: 'Property Patrols',
                description: 'Regular patrols of buildings, grounds, parking areas, and common spaces.'
            },
            {
                icon: 'fas fa-users',
                title: 'Community Relations',
                description: 'Friendly, professional interaction creating positive resident relationships.'
            },
            {
                icon: 'fas fa-car',
                title: 'Parking Management',
                description: 'Parking enforcement, vehicle monitoring, and unauthorized vehicle documentation.'
            },
            {
                icon: 'fas fa-first-aid',
                title: 'Emergency Response',
                description: 'Rapid response to incidents with emergency service coordination.'
            },
            {
                icon: 'fas fa-clipboard-list',
                title: 'Incident Reporting',
                description: 'Detailed shift reports and incident documentation for property management.'
            }
        ],

        // Statistics
        statistics: [
            { number: '300+', label: 'Properties Secured' },
            { number: '99.7%', label: 'Resident Satisfaction' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Maria Gonzalez',
                title: 'Property Manager',
                image: 'maria-gonzalez.jpg',
                quote: 'ShieldWise security has transformed our apartment community. Residents feel safer, and we\'ve seen a 70% reduction in property crimes since implementing their services.'
            },
            {
                name: 'David Patterson',
                title: 'HOA President',
                image: 'david-patterson.jpg',
                quote: 'The security officers are professional, friendly, and know our residents by name. They provide excellent service while maintaining effective security for our gated community.'
            },
            {
                name: 'Susan Lee',
                title: 'Residential Developer',
                image: 'susan-lee.jpg',
                quote: 'We use ShieldWise at all our multifamily properties. Their consistent quality, professionalism, and responsive management make them our exclusive security partner.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/apartment-security'
    });
});

module.exports = router;

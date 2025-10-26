const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Commercial Security',
        serviceTitle: 'Commercial Security Guards California',
        serviceDescription: 'Professional commercial security guard services in California for businesses, office buildings, retail stores, warehouses, and commercial properties with customized protection solutions.',
        serviceKeywords: 'commercial security guards California, business security services, office building security, retail security guards, warehouse security, corporate security officers, commercial property protection',
        serviceImage: 'commercial-security-california.webp',
        serviceUrl: 'commercial-security',
        serviceType: 'commercial_security',
        serviceBenefit: 'comprehensive business protection and asset security',
        propertyType: 'offices, retail stores, warehouses, and commercial facilities',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 55, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Business Security Services',
        serviceOutput: 'Professional Business Protection and Asset Security',
        audienceType: 'Business Owners, Property Managers, Corporate Executives, Retail Managers, Facility Directors',

        // Page-specific Meta Data
        pageTitle: 'Commercial Security Guards California | Business Security Services | ShieldWise Security',
        metaDescription: 'Professional commercial security guards in California for businesses, offices, retail, warehouses. Licensed officers, 24/7 protection, custom solutions. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/commercial-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides comprehensive commercial security guard services throughout California for businesses, office buildings, retail stores, warehouses, industrial facilities, and commercial properties. Our BSIS-licensed security officers offer customized protection including access control, asset protection, employee safety, loss prevention, and emergency response, serving commercial clients in Los Angeles, Orange County, San Diego, and statewide with flexible armed and unarmed security solutions.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most comprehensive commercial security guard services, protecting businesses, office buildings, retail stores, warehouses, industrial facilities, and commercial properties throughout the state. With over 15 years of experience securing commercial enterprises from small businesses to Fortune 500 corporations, we provide customized security solutions that address each client\'s unique operational needs, risk profile, and budget requirements.<br><br>Our commercial security officers are BSIS-licensed professionals with extensive training in business security operations, access control systems, emergency response procedures, loss prevention techniques, workplace safety protocols, and professional customer service. We understand that commercial security requires balancing effective protection with positive customer experiences and productive work environments. Our guards become valued members of your team, learning your business operations, personnel, and security requirements.<br><br>Whether you need full-time lobby security for office buildings, loss prevention for retail operations, overnight warehouse protection, construction site security, or specialized security for banking, healthcare, or technology facilities, ShieldWise Security provides scalable commercial security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California business centers. Our 24/7 operations support ensures rapid response and continuous protection for your commercial enterprise.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-building',
                title: 'Office Buildings',
                description: 'Security for corporate offices, business parks, and multi-tenant commercial buildings with lobby security and access control.'
            },
            {
                icon: 'fas fa-store',
                title: 'Retail Security',
                description: 'Loss prevention and security for retail stores, shopping centers, and commercial retail operations.'
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Warehouses & Distribution',
                description: 'Security for warehouses, distribution centers, logistics facilities, and inventory storage operations.'
            },
            {
                icon: 'fas fa-industry',
                title: 'Industrial Facilities',
                description: 'Security officers for manufacturing plants, industrial complexes, and production facilities.'
            },
            {
                icon: 'fas fa-hospital',
                title: 'Healthcare & Medical',
                description: 'Professional security for medical offices, clinics, healthcare facilities, and medical buildings.'
            },
            {
                icon: 'fas fa-university',
                title: 'Financial & Banking',
                description: 'Armed and unarmed security for banks, credit unions, financial centers, and money handling operations.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise commercial security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards, with armed officers maintaining Exposed Firearms Permits when required. Our commercial security personnel undergo extensive background checks including LiveScan fingerprinting, criminal history verification, employment history validation, and professional reference checks. Each officer completes comprehensive training in commercial security operations and best practices, access control systems and procedures, emergency response and evacuation, workplace violence prevention, loss prevention techniques, customer service and professionalism, incident documentation and reporting, and industry-specific security protocols. We maintain comprehensive general liability insurance exceeding $2 million, workers\' compensation coverage for all guards, professional liability insurance, and surety bonds as required. We provide certificates of insurance and detailed security reports to all commercial clients.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-clock',
                title: 'Flexible Hourly Guards',
                description: 'Hourly commercial security starting at $35/hour',
                features: [
                    'BSIS-licensed professional officers',
                    'Armed or unarmed options',
                    'Flexible scheduling (day/evening/overnight)',
                    'No long-term contracts required'
                ]
            },
            {
                icon: 'fas fa-calendar-week',
                title: 'Part-Time Security Programs',
                description: 'Scheduled coverage for specific business hours or days',
                features: [
                    'Consistent officer assignments',
                    'Custom scheduling to match operations',
                    'Perfect for retail and office hours',
                    'Month-to-month flexibility'
                ]
            },
            {
                icon: 'fas fa-handshake',
                title: 'Full-Time Security Contracts',
                description: 'Dedicated 24/7 or business-hour security with preferred pricing',
                features: [
                    'Dedicated security officer teams',
                    'Significant contract discounts',
                    'Site-specific training included',
                    'Account manager and supervisor support'
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
                question: 'How much do commercial security guards cost in California?',
                answer: 'Commercial security guard services in California typically range from $35-$85 per hour per guard, depending on whether guards are armed or unarmed, shift type (day/evening/overnight), location, and contract length. Unarmed guards start at $35-$55/hour, while armed guards cost $65-$85/hour. Full-time contracts and long-term agreements receive discounted rates. Most businesses budget $4,000-$15,000 monthly for professional security coverage.'
            },
            {
                question: 'What services do commercial security guards provide?',
                answer: 'Commercial security guards provide access control and visitor management, employee and customer safety, asset and inventory protection, loss prevention and theft deterrence, regular property patrols (interior/exterior), parking lot and vehicle monitoring, emergency response and coordination, incident documentation and reporting, alarm response, and professional representation of your business.'
            },
            {
                question: 'Do I need armed or unarmed security for my business?',
                answer: 'Unarmed security is appropriate for most commercial businesses including offices, retail stores, warehouses, and low-risk environments. Armed security is recommended for banks and financial institutions, high-value retail (jewelry, electronics), cash-intensive businesses, properties with previous armed incidents, and businesses in high-crime areas. We provide free security assessments to determine appropriate protection levels.'
            },
            {
                question: 'Can security guards help reduce business insurance costs?',
                answer: 'Yes, many commercial insurance providers offer premium discounts for businesses with professional security services. Licensed security guards demonstrate risk mitigation and can result in 5-20% insurance savings depending on your industry and coverage. Security also reduces theft, vandalism, liability claims, and workers\' compensation incidents, lowering overall insurance costs.'
            },
            {
                question: 'Do you provide security for retail stores and loss prevention?',
                answer: 'Yes, ShieldWise Security specializes in retail security and loss prevention services throughout California. Our retail security officers provide visible theft deterrence, customer service, shoplifting prevention and apprehension, inventory protection, employee theft monitoring, fitting room monitoring, and comprehensive incident reporting for retail stores, boutiques, shopping centers, and commercial retail operations.'
            },
            {
                question: 'How quickly can you deploy commercial security guards?',
                answer: 'We offer same-day commercial security deployment for emergency situations in Los Angeles, Orange County, and San Diego areas. For planned security needs, we can typically deploy guards within 24-48 hours statewide across California. Long-term contracts allow dedicated officer assignments who learn your business, employees, and security requirements.'
            },
            {
                question: 'Are your commercial security guards insured and bonded?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance exceeding $2 million in coverage, workers\' compensation insurance for all guards, professional liability coverage, and surety bonds as required by California law. We provide certificates of insurance to all commercial clients upon request for lease agreements, insurance compliance, and vendor requirements.'
            },
            {
                question: 'What training do commercial security guards receive?',
                answer: 'Our commercial security guards complete BSIS-required Guard Card training plus specialized commercial security training including business security operations, access control and visitor management, emergency response and evacuation procedures, workplace violence prevention, professional customer service, conflict de-escalation, loss prevention techniques, incident documentation, and industry-specific protocols for your business type (retail, office, warehouse, healthcare, etc.).'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for commercial businesses and offices',
                url: '/services/unarmed-security'
            },
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed protection for high-risk commercial operations',
                url: '/services/armed-security'
            },
            {
                name: 'Retail Security',
                icon: 'fas fa-shopping-cart',
                description: 'Loss prevention and security services for retail stores',
                url: '/services/shopping-center-security'
            },
            {
                name: 'Construction Security',
                icon: 'fas fa-hard-hat',
                description: 'Security solutions for construction sites and development projects',
                url: '/services/construction-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for commercial properties and business parks',
                url: '/services/patrol'
            },
            {
                name: 'Fire Watch',
                icon: 'fas fa-fire-extinguisher',
                description: 'Fire watch services for commercial buildings and construction projects',
                url: '/services/fire-watch'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-door-open',
                title: 'Access Control',
                description: 'Professional entry management, visitor screening, and employee verification.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Asset Protection',
                description: 'Protection of inventory, equipment, intellectual property, and business assets.'
            },
            {
                icon: 'fas fa-users',
                title: 'Employee Safety',
                description: 'Safe work environments with workplace violence prevention and emergency response.'
            },
            {
                icon: 'fas fa-eye',
                title: 'Loss Prevention',
                description: 'Theft deterrence, inventory protection, and shrinkage reduction strategies.'
            },
            {
                icon: 'fas fa-walking',
                title: 'Property Patrols',
                description: 'Regular interior and exterior patrols of facilities, parking areas, and grounds.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Professional Reporting',
                description: 'Detailed shift reports, incident documentation, and management communications.'
            }
        ],

        // Statistics
        statistics: [
            { number: '500+', label: 'Businesses Secured' },
            { number: '99.6%', label: 'Client Retention' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Richard Taylor',
                title: 'Corporate Security Director',
                image: 'richard-taylor.jpg',
                quote: 'ShieldWise provides outstanding commercial security for our corporate campus. Their officers are professional, reliable, and integrate seamlessly with our operations.'
            },
            {
                name: 'Patricia Wong',
                title: 'Retail Operations Manager',
                image: 'patricia-wong.jpg',
                quote: 'Since implementing ShieldWise security at our retail locations, we\'ve reduced theft by 65% while improving customer experiences. Highly recommended.'
            },
            {
                name: 'Michael Brown',
                title: 'Warehouse Manager',
                image: 'michael-brown.jpg',
                quote: 'The overnight security coverage has eliminated inventory loss and vandalism at our distribution center. Professional, reliable, and cost-effective service.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/commercial-security'
    });
});

module.exports = router;

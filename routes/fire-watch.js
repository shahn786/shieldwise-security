const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Fire Watch Services',
        serviceTitle: 'Professional Fire Watch Services California',
        serviceDescription: '24/7 fire watch guards in California for non-functional fire alarm systems, hot work operations, construction sites, and buildings requiring continuous fire safety monitoring and compliance.',
        serviceKeywords: 'fire watch services California, fire watch guards, 24/7 fire watch, fire safety patrol, construction fire watch, hot work fire watch, fire alarm monitoring, NFPA fire watch compliance',
        serviceImage: 'fire-watch-services-california.webp',
        serviceUrl: 'fire-watch',
        serviceType: 'fire_watch',
        serviceBenefit: 'continuous fire safety monitoring and compliance',
        propertyType: 'construction sites, buildings with impaired fire systems, and hot work operations',

        // Pricing Information
        priceRange: { 
            low: 40, 
            mid: 55, 
            high: 75 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Fire Safety Watch Services',
        serviceOutput: 'Continuous Fire Safety Monitoring and Code Compliance',
        audienceType: 'Property Managers, Construction Managers, Facility Directors, Building Owners, Contractors',

        // Page-specific Meta Data
        pageTitle: 'Fire Watch Services California | 24/7 Fire Safety Guards | ShieldWise Security',
        metaDescription: 'Professional 24/7 fire watch services in California. NFPA-compliant fire safety guards for impaired fire systems, construction sites & hot work. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/fire-watch/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides 24/7 professional fire watch services throughout California for buildings with impaired or non-functional fire alarm systems, construction sites, renovation projects, and hot work operations. Our trained fire watch guards conduct continuous patrols, monitor for fire hazards, ensure code compliance, and provide immediate fire emergency response in accordance with NFPA 101 and California fire safety regulations, serving clients in Los Angeles, Orange County, San Diego, and statewide with same-day emergency deployment.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most reliable fire watch services, providing trained fire safety guards for buildings, construction sites, and facilities requiring continuous fire monitoring due to impaired fire protection systems, renovation work, or special operations. When fire alarm systems are offline, under repair, or non-functional, California fire codes require continuous fire watch patrols to ensure occupant safety and maintain code compliance.<br><br>Our fire watch guards are specially trained in fire prevention, fire hazard identification, emergency evacuation procedures, fire extinguisher use, emergency communication protocols, and NFPA 101 Life Safety Code requirements. Each fire watch guard conducts regular patrols (typically every 30-60 minutes as required by code), monitors for smoke, fire hazards, and unsafe conditions, maintains detailed patrol logs, and ensures fire exits and egress paths remain clear and accessible.<br><br>Whether you need emergency fire watch for alarm system failures, scheduled fire watch for construction or renovation projects, hot work fire watch for welding and cutting operations, or long-term fire watch for buildings awaiting system repairs, ShieldWise Security provides immediate deployment throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California locations. Our 24/7 operations center ensures rapid response for emergency fire watch needs.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-bell-slash',
                title: 'Impaired Fire Alarm Systems',
                description: 'Fire watch guards for buildings with non-functional, offline, or impaired fire detection and alarm systems undergoing repairs or replacement.'
            },
            {
                icon: 'fas fa-hard-hat',
                title: 'Construction & Renovation',
                description: 'Continuous fire safety monitoring for construction sites, renovation projects, and buildings undergoing tenant improvements with active work.'
            },
            {
                icon: 'fas fa-fire',
                title: 'Hot Work Operations',
                description: 'Fire watch for welding, cutting, grinding, torch operations, and other hot work activities creating fire hazards or sparks.'
            },
            {
                icon: 'fas fa-wrench',
                title: 'Sprinkler System Shutdowns',
                description: 'Fire watch during planned or emergency sprinkler system shutdowns, maintenance, testing, or repairs requiring system impairment.'
            },
            {
                icon: 'fas fa-building',
                title: 'Occupied Buildings',
                description: 'Fire watch for occupied commercial buildings, residential complexes, hotels, and facilities requiring continuous fire safety monitoring.'
            },
            {
                icon: 'fas fa-calendar-check',
                title: 'Special Events & Temporary Structures',
                description: 'Fire watch for events, temporary structures, tents, and venues requiring fire safety monitoring per fire marshal requirements.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise fire watch guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and complete specialized fire watch training in NFPA 101 Life Safety Code requirements, fire prevention and hazard identification, emergency evacuation procedures and assembly points, fire extinguisher types and proper use, emergency notification and 911 communication, patrol log documentation and timekeeping, smoke and fire detection recognition, and California fire code compliance. Guards receive site-specific training on building layout, fire system locations, evacuation routes, assembly areas, and emergency contacts. We maintain comprehensive general liability insurance, workers\' compensation coverage, and provide detailed patrol logs, incident reports, and compliance documentation to property managers, fire marshals, and building departments as required.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-clock',
                title: 'Hourly Fire Watch',
                description: 'Flexible hourly fire watch services starting at $40/hour',
                features: [
                    'Same-day emergency deployment',
                    'Trained fire watch guards',
                    'Patrol logs and documentation',
                    'NFPA-compliant patrols'
                ]
            },
            {
                icon: 'fas fa-calendar-day',
                title: '24/7 Fire Watch Coverage',
                description: 'Round-the-clock fire safety monitoring',
                features: [
                    'Continuous 24-hour coverage',
                    'Shift-based guard rotation',
                    'Supervisor oversight',
                    'Detailed daily reports'
                ]
            },
            {
                icon: 'fas fa-handshake',
                title: 'Extended Fire Watch Contracts',
                description: 'Long-term fire watch for major construction/renovation projects',
                features: [
                    'Dedicated guard assignments',
                    'Preferred contract pricing',
                    'Custom patrol schedules',
                    'Project-specific training'
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
                question: 'What is fire watch and when is it required?',
                answer: 'Fire watch is continuous monitoring for fire hazards when a building\'s fire protection systems are impaired or non-functional. California fire code requires fire watch when fire alarm systems are offline, sprinkler systems are shut down, during hot work operations (welding/cutting), construction/renovation when systems are impaired, and when ordered by fire marshals. Fire watch guards patrol regularly (every 30-60 minutes) to detect fires, hazards, and ensure safe evacuation routes.'
            },
            {
                question: 'How much does fire watch service cost in California?',
                answer: 'Fire watch services in California typically cost $40-$75 per hour per guard, depending on location, shift type (day/night/weekend), duration of assignment, and number of guards required. 24/7 continuous fire watch coverage and long-term project contracts often qualify for discounted rates. Contact us for a customized quote based on your specific fire watch needs.'
            },
            {
                question: 'How quickly can you provide fire watch guards?',
                answer: 'ShieldWise Security provides same-day emergency fire watch deployment for critical situations throughout Los Angeles, Orange County, and San Diego areas, typically within 2-4 hours of request. For scheduled fire watch needs (planned maintenance, construction projects), we can deploy guards within 24 hours statewide across California.'
            },
            {
                question: 'What does a fire watch guard do?',
                answer: 'Fire watch guards conduct regular patrols (every 30-60 minutes as required by code), monitor for smoke, fire, and hazardous conditions, ensure fire exits and egress paths remain clear, verify fire extinguishers are accessible, maintain detailed patrol logs with timestamps, notify emergency services immediately if fire detected, assist with evacuations if necessary, and document all observations and incidents for compliance reporting.'
            },
            {
                question: 'Is fire watch required during construction in California?',
                answer: 'Yes, fire watch is typically required during construction and renovation projects when fire alarm or sprinkler systems are impaired, disabled, or under installation. California building and fire codes require continuous fire watch monitoring during active construction hours and often after-hours when systems remain offline. Requirements vary by jurisdiction and should be verified with local fire marshals.'
            },
            {
                question: 'What is hot work fire watch?',
                answer: 'Hot work fire watch is specialized monitoring required during welding, cutting, grinding, torch work, and other operations creating sparks, flames, or heat. California fire code requires a dedicated fire watch guard to be present during hot work and for 30-60 minutes after work completion to monitor for smoldering fires. The fire watch guard must have fire extinguishers readily available and authority to stop unsafe work.'
            },
            {
                question: 'Do fire watch guards need special training?',
                answer: 'Yes, fire watch guards must be trained in fire prevention and fire hazard recognition, proper use of fire extinguishers, building evacuation procedures and routes, emergency notification procedures (calling 911), patrol documentation requirements, and NFPA 101 Life Safety Code standards. ShieldWise fire watch guards complete comprehensive training and site-specific instruction for each assignment.'
            },
            {
                question: 'Can you provide 24/7 fire watch coverage?',
                answer: 'Yes, ShieldWise Security provides continuous 24/7 fire watch coverage for buildings, construction sites, and facilities requiring round-the-clock fire safety monitoring. We deploy multiple guards in rotating shifts to ensure uninterrupted coverage with supervisor oversight and quality assurance.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Construction Security',
                icon: 'fas fa-hard-hat',
                description: 'Complete security solutions for construction sites and projects',
                url: '/services/construction-security'
            },
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for ongoing property protection',
                url: '/services/unarmed-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for property monitoring and safety checks',
                url: '/services/patrol'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Comprehensive security for commercial buildings and facilities',
                url: '/services/commercial-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security and fire watch for special events and temporary structures',
                url: '/services/event-security'
            },
            {
                name: 'Industrial Security',
                icon: 'fas fa-industry',
                description: 'Security solutions for industrial facilities and warehouses',
                url: '/services/warehouse-security'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-route',
                title: 'Regular Patrols',
                description: 'NFPA-compliant patrols every 30-60 minutes monitoring for fire hazards.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Detailed Documentation',
                description: 'Comprehensive patrol logs with timestamps for code compliance verification.'
            },
            {
                icon: 'fas fa-fire-extinguisher',
                title: 'Fire Safety Equipment',
                description: 'Guards trained in proper fire extinguisher use and emergency response.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Communication',
                description: 'Immediate 911 notification and emergency service coordination.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Hazard Identification',
                description: 'Professional identification and reporting of fire hazards and unsafe conditions.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Egress Monitoring',
                description: 'Ensuring fire exits, evacuation routes, and assembly areas remain clear.'
            }
        ],

        // Statistics
        statistics: [
            { number: '24/7', label: 'Emergency Availability' },
            { number: '2-4hr', label: 'Emergency Response' },
            { number: '100%', label: 'Code Compliant' },
            { number: '10+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Tom Rodriguez',
                title: 'Construction Manager',
                image: 'tom-rodriguez.jpg',
                quote: 'ShieldWise fire watch services kept our major renovation project compliant and safe. Their guards are professional, reliable, and understand fire safety requirements.'
            },
            {
                name: 'Karen White',
                title: 'Property Manager',
                image: 'karen-white.jpg',
                quote: 'When our fire alarm system failed, ShieldWise provided same-day fire watch coverage. Their professionalism and detailed documentation were exactly what we needed.'
            },
            {
                name: 'James Park',
                title: 'Facilities Director',
                image: 'james-park.jpg',
                quote: 'For our scheduled sprinkler system replacement, ShieldWise provided 24/7 fire watch for three weeks. Excellent service, detailed reports, zero issues.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/fire-watch'
    });
});

module.exports = router;

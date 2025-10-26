const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Special Event Security',
        serviceTitle: 'Special Event Security Services California',
        serviceDescription: 'Professional special event security services in California for concerts, festivals, corporate events, private parties, weddings, and gatherings with experienced event security specialists.',
        serviceKeywords: 'special event security California, concert security guards, festival security services, private party security, wedding security, corporate event protection, VIP event security',
        serviceImage: 'special-event-security-california.webp',
        serviceUrl: 'special-event-security',
        serviceType: 'special_event_security',
        serviceBenefit: 'safe, successful special events with professional security',
        propertyType: 'concerts, festivals, weddings, corporate events, and special gatherings',

        // Pricing Information
        priceRange: { 
            low: 40, 
            mid: 65, 
            high: 95 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Event Security Guard Services',
        serviceOutput: 'Memorable, Safe Special Events',
        audienceType: 'Event Planners, Venue Managers, Private Clients, Corporate Event Directors, Wedding Planners',

        // Page-specific Meta Data
        pageTitle: 'Special Event Security Services California | Concert & Festival Security | ShieldWise Security',
        metaDescription: 'Professional special event security in California for concerts, festivals, weddings, corporate events. Experienced guards, crowd control, VIP protection. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/special-event-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional special event security services throughout California for concerts, music festivals, corporate events, weddings, private parties, and special gatherings of all sizes. Our BSIS-licensed event security specialists offer crowd management, access control, VIP protection, emergency response, event safety planning, and professional security presence, serving event planners and clients in Los Angeles, Orange County, San Diego, and statewide with scalable security teams from intimate gatherings to large-scale festivals.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most comprehensive special event security services, protecting concerts, music festivals, corporate gatherings, weddings, private parties, fundraisers, and special events throughout the state. With extensive experience securing events from intimate 50-person weddings to massive 50,000+ attendee music festivals, we provide expert event security planning, professional guard staffing, crowd management, access control, and emergency coordination tailored to each event\'s unique requirements and risk profile.<br><br>Our special event security teams include BSIS-licensed armed and unarmed security officers with specialized training in event security operations and crowd psychology, concert and festival security management, de-escalation techniques and conflict resolution, emergency medical response coordination, VIP and performer protection, customer service excellence for events, and alcohol-related incident management. We work collaboratively with event planners, venue managers, and clients during all event phases from initial planning through post-event teardown, developing customized security plans that address venue layout, crowd flow, entry/exit points, VIP areas, stage security, vendor management, parking control, and emergency evacuation procedures.<br><br>Whether you need security for outdoor music festivals, indoor concert venues, corporate conferences and trade shows, elegant weddings and receptions, celebrity appearances, political rallies, sporting events, community festivals, or exclusive private parties, ShieldWise Security provides scalable event security solutions with rapid deployment throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California venues. Our 24/7 operations center ensures seamless coordination and immediate response for any special event security need.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-music',
                title: 'Concerts & Music Festivals',
                description: 'Security for music concerts, festivals, outdoor shows, and entertainment venues with crowd control and artist protection.'
            },
            {
                icon: 'fas fa-glass-cheers',
                title: 'Weddings & Private Celebrations',
                description: 'Discreet security for weddings, birthday parties, anniversaries, and exclusive private celebrations and gatherings.'
            },
            {
                icon: 'fas fa-briefcase',
                title: 'Corporate Events & Conferences',
                description: 'Professional security for corporate meetings, trade shows, product launches, conferences, and business events.'
            },
            {
                icon: 'fas fa-star',
                title: 'VIP & Celebrity Events',
                description: 'High-profile security for celebrity events, VIP gatherings, red carpet occasions, and entertainment industry functions.'
            },
            {
                icon: 'fas fa-landmark',
                title: 'Community & Public Events',
                description: 'Security for parades, street festivals, farmers markets, community gatherings, and public celebrations.'
            },
            {
                icon: 'fas fa-trophy',
                title: 'Fundraisers & Galas',
                description: 'Security for charity events, fundraising galas, nonprofit functions, and formal special occasions.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise special event security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards, with armed guards maintaining Exposed Firearms Permits when required for high-profile events. Our event security personnel complete specialized training in event security operations and crowd dynamics, crowd management and flow control, conflict de-escalation and resolution, emergency medical response (CPR/First Aid), alcohol-related incident management, VIP and performer protection, access control and credentialing systems, evacuation procedures and emergency planning, communication protocols and radio operations, and customer service excellence in event environments. Many team leaders have extensive backgrounds in law enforcement, military service, or professional event security management. We maintain comprehensive general liability insurance, workers\' compensation coverage, and event-specific insurance policies as required by venues. All event security plans comply with California fire codes, occupancy regulations, venue requirements, and local jurisdiction safety standards.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-calendar-day',
                title: 'Single Event Security',
                description: 'One-time event security from $40-$95/hour per guard',
                features: [
                    'Custom security planning included',
                    'Armed or unarmed security officers',
                    'Scalable teams (1-100+ guards)',
                    'Post-event reports provided'
                ]
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Multi-Event Packages',
                description: 'Discounted rates for recurring events or event series',
                features: [
                    'Consistent security teams',
                    'Preferred client pricing',
                    'Flexible scheduling options',
                    'Dedicated account management'
                ]
            },
            {
                icon: 'fas fa-users',
                title: 'Large-Scale Festival Security',
                description: 'Comprehensive security for major concerts and festivals',
                features: [
                    'Site assessments and planning',
                    'Command center operations',
                    'Supervisor and guard teams',
                    'Emergency coordination services'
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
            { name: 'Palm Springs', url: '/palm-springs' },
            { name: 'Santa Barbara', url: '/santa-barbara' }
        ],
        
        // FAQs
        faqs: [
            {
                question: 'How much does special event security cost in California?',
                answer: 'Special event security costs in California typically range from $40-$95 per hour per security guard, depending on whether guards are armed or unarmed, event complexity and risk level, location and venue, event date/time (weekends cost more), and number of guards required. Small events (50-200 people) may need 2-4 guards ($320-$760 for 4 hours), while larger festivals scale accordingly. We provide free security assessments and quotes for all events.'
            },
            {
                question: 'How many security guards do I need for my special event?',
                answer: 'Security staffing depends on attendance, venue size, event type, alcohol service, and risk factors. General guidelines: 1 guard per 50-75 attendees for low-risk events (weddings, corporate dinners), 1 guard per 25-50 attendees for moderate-risk events (concerts, festivals with alcohol), and 1 guard per 10-25 attendees for high-risk events (VIP gatherings, controversial speakers). We provide customized staffing recommendations based on your specific event during security planning.'
            },
            {
                question: 'Do you provide security for outdoor festivals and concerts?',
                answer: 'Yes, ShieldWise Security specializes in outdoor festival and concert security throughout California. We provide comprehensive security planning, perimeter control, stage and backstage security, crowd management and flow control, VIP and artist protection, parking enforcement, vendor area security, and emergency coordination for festivals and concerts from 500 to 50,000+ attendees.'
            },
            {
                question: 'Can you provide armed security for special events?',
                answer: 'Yes, we provide BSIS-licensed armed security guards for special events requiring enhanced protection such as high-profile celebrity events, VIP gatherings, political events, large cash handling operations, events with valuable assets, or events with elevated threat levels. Armed event security is commonly used for celebrity appearances, political rallies, jewelry shows, and high-risk venues.'
            },
            {
                question: 'How far in advance should I book special event security?',
                answer: 'For best availability and planning, book special event security 2-4 weeks in advance for small private events and 4-8 weeks for large festivals or concerts. However, we offer emergency event security deployment for last-minute needs and can often provide guards with 48-72 hours notice for most California locations depending on event size and requirements.'
            },
            {
                question: 'Do you provide security for weddings and private parties?',
                answer: 'Yes, ShieldWise Security provides professional, discreet security for weddings, birthday parties, anniversaries, private celebrations, and exclusive gatherings throughout California. Our event security officers are trained in customer service excellence and blend seamlessly into private events while ensuring guest safety, gift protection, unauthorized guest prevention, and property security.'
            },
            {
                question: 'What does special event security planning include?',
                answer: 'Special event security planning includes venue site assessments and walkthroughs, security staffing recommendations based on attendance and risk, access control and credentialing systems design, crowd flow and management planning, VIP and backstage security protocols, emergency evacuation procedures and assembly areas, coordination with local law enforcement and fire departments, radio communication systems setup, and comprehensive post-event incident reporting.'
            },
            {
                question: 'Are special event security guards insured?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance, workers\' compensation coverage for all guards, and can provide event-specific insurance certificates as required by venues, event planners, and insurance carriers. We provide certificates of insurance to all clients and venues upon request, typically within 24 hours of request for contract and insurance compliance purposes.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'General event security for all event types and sizes',
                url: '/services/event-security'
            },
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed security for high-profile and VIP special events',
                url: '/services/armed-security'
            },
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for private events and gatherings',
                url: '/services/unarmed-security'
            },
            {
                name: 'Executive Protection',
                icon: 'fas fa-user-tie',
                description: 'Close protection for VIPs and high-profile event attendees',
                url: '/services/executive-protection'
            },
            {
                name: 'Hotel Security',
                icon: 'fas fa-hotel',
                description: 'Security for events hosted at hotels and resorts',
                url: '/services/hotel-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Patrol services for event perimeters and parking areas',
                url: '/services/patrol'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-users',
                title: 'Crowd Management',
                description: 'Professional crowd control, flow management, and de-escalation expertise.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Access Control',
                description: 'Entry/exit monitoring, credential verification, and unauthorized access prevention.'
            },
            {
                icon: 'fas fa-user-shield',
                title: 'VIP Protection',
                description: 'Dedicated security for VIP areas, performers, speakers, and special guests.'
            },
            {
                icon: 'fas fa-first-aid',
                title: 'Emergency Response',
                description: 'Rapid incident response, medical coordination, and emergency procedures.'
            },
            {
                icon: 'fas fa-parking',
                title: 'Parking & Transportation',
                description: 'Parking lot security, traffic control, and vehicle monitoring services.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Event Planning Support',
                description: 'Security assessments, planning consultation, and comprehensive coordination.'
            }
        ],

        // Statistics
        statistics: [
            { number: '6000+', label: 'Events Secured' },
            { number: '99.9%', label: 'Incident-Free Rate' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Christina Foster',
                title: 'Event Planner',
                image: 'christina-foster.jpg',
                quote: 'ShieldWise Security made our 6,000-person music festival completely stress-free. Their planning, professionalism, and flawless execution ensured a safe, successful event. Highly recommended.'
            },
            {
                name: 'David Park',
                title: 'Venue Manager',
                image: 'david-park.jpg',
                quote: 'We use ShieldWise for all special events at our venue. Their security teams are professional, reliable, and excel at crowd management and customer service. True event security experts.'
            },
            {
                name: 'Emily Rodriguez',
                title: 'Wedding Planner',
                image: 'emily-rodriguez.jpg',
                quote: 'For high-end weddings and private events, ShieldWise provides discreet, professional security that enhances the event experience. Guests feel safe without feeling watched. Perfect service.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/special-event-security'
    });
});

module.exports = router;

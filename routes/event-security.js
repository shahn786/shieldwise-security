const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Event Security',
        serviceTitle: 'Professional Event Security Services California',
        serviceDescription: 'Professional event security services in California for concerts, festivals, corporate events, private parties, and gatherings of all sizes with experienced guards and comprehensive planning.',
        serviceKeywords: 'event security California, concert security, festival security guards, corporate event security, private event protection, crowd control services, VIP security, special event security',
        serviceImage: 'event-security-california.webp',
        serviceUrl: 'event-security',
        serviceType: 'event_security',
        serviceBenefit: 'safe, successful events with professional security management',
        propertyType: 'concerts, festivals, corporate events, private parties, and gatherings',

        // Pricing Information
        priceRange: { 
            low: 40, 
            mid: 65, 
            high: 95 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Special Event Security Services',
        serviceOutput: 'Safe, Secure, Successful Events',
        audienceType: 'Event Planners, Venue Managers, Corporate Executives, Private Clients, Festival Organizers',

        // Page-specific Meta Data
        pageTitle: 'Event Security Services California | Concerts, Festivals & More | ShieldWise Security',
        metaDescription: 'Professional event security in California for concerts, festivals, corporate events & private parties. Licensed guards, crowd control, VIP protection. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/event-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides comprehensive event security services throughout California for concerts, festivals, corporate events, weddings, private parties, and gatherings of all sizes. Our BSIS-licensed security personnel specialize in crowd management, access control, VIP protection, emergency response, and event safety planning, serving venues and clients in Los Angeles, Orange County, San Diego, San Francisco, and statewide with scalable teams from intimate gatherings to large-scale festivals.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most professional event security services, protecting concerts, festivals, corporate events, weddings, private parties, fundraisers, and special gatherings throughout the state. With over 15 years of experience securing events from intimate gatherings of 50 people to large festivals exceeding 50,000 attendees, we provide comprehensive security planning, professional guard staffing, crowd management, access control, and emergency coordination for any event type or size.<br><br>Our event security teams include BSIS-licensed armed and unarmed security personnel trained specifically in event management, crowd psychology, de-escalation techniques, emergency medical response, and customer service excellence. We work closely with event planners, venue managers, and clients to develop customized security plans addressing venue layout, crowd flow, access points, VIP areas, backstage security, parking management, and emergency evacuation procedures.<br><br>Whether you\'re hosting a corporate conference, music festival, wedding, celebrity appearance, political rally, sporting event, or private party, ShieldWise Security provides scalable event security solutions with rapid deployment throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California venues. Our 24/7 operations center ensures seamless coordination and immediate response for any event security need.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-music',
                title: 'Concerts & Festivals',
                description: 'Security for music concerts, festivals, outdoor events, and entertainment venues with crowd control, stage security, and artist protection.'
            },
            {
                icon: 'fas fa-briefcase',
                title: 'Corporate Events',
                description: 'Professional security for conferences, trade shows, product launches, corporate meetings, and business gatherings.'
            },
            {
                icon: 'fas fa-glass-cheers',
                title: 'Private Events & Weddings',
                description: 'Discreet security for weddings, birthday parties, anniversaries, fundraisers, and exclusive private celebrations.'
            },
            {
                icon: 'fas fa-user-tie',
                title: 'VIP & Celebrity Events',
                description: 'High-profile event security for celebrity appearances, political events, VIP gatherings, and red-carpet occasions.'
            },
            {
                icon: 'fas fa-futbol',
                title: 'Sporting Events',
                description: 'Security for amateur and professional sports events, tournaments, races, and athletic competitions.'
            },
            {
                icon: 'fas fa-landmark',
                title: 'Community & Public Events',
                description: 'Security for parades, street festivals, farmers markets, community gatherings, and public celebrations.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise event security personnel hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards, with armed guards maintaining Exposed Firearms Permits when required. Our event security teams complete specialized training in crowd management and psychology, conflict de-escalation and resolution, emergency medical response (CPR/First Aid), alcohol-related incident management, access control and credentialing, evacuation procedures and emergency planning, communication protocols and radio procedures, and customer service for event environments. Many team leaders have extensive backgrounds in law enforcement, military service, or professional event management. We maintain comprehensive general liability insurance, workers\' compensation coverage, and event-specific insurance policies as required by venues. All event security plans comply with California fire codes, occupancy regulations, and local jurisdiction requirements.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-calendar-day',
                title: 'Single Event Security',
                description: 'One-time event security services from $40-$95/hour per guard',
                features: [
                    'Custom security planning included',
                    'BSIS-licensed armed or unarmed guards',
                    'Scalable team sizes (1-100+ guards)',
                    'Post-event reports provided'
                ]
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Multi-Event Packages',
                description: 'Discounted rates for multiple events or recurring functions',
                features: [
                    'Consistent security teams',
                    'Preferred client pricing',
                    'Flexible scheduling',
                    'Dedicated account management'
                ]
            },
            {
                icon: 'fas fa-users',
                title: 'Large-Scale Event Security',
                description: 'Comprehensive security for festivals and major events',
                features: [
                    'Site assessments and planning',
                    'Command center setup',
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
            { name: 'Stockton', url: '/stockton' },
            { name: 'Chula Vista', url: '/chula-vista' }
        ],
        
        // FAQs
        faqs: [
            {
                question: 'How much does event security cost in California?',
                answer: 'Event security costs in California typically range from $40-$95 per hour per security guard, depending on whether guards are armed or unarmed, event complexity, location, date/time, and number of guards required. Small events (50-200 people) may need 2-4 guards ($320-$760 for a 4-hour event), while larger events scale accordingly. We provide free quotes and security assessments for all events.'
            },
            {
                question: 'How many security guards do I need for my event?',
                answer: 'Security staffing depends on attendance, venue size, event type, alcohol service, and risk factors. General guidelines: 1 guard per 50-75 attendees for low-risk events (weddings, corporate meetings), 1 guard per 25-50 attendees for moderate-risk events (concerts, festivals), and 1 guard per 10-25 attendees for high-risk events (VIP gatherings, controversial speakers). We provide customized staffing recommendations during security planning.'
            },
            {
                question: 'Do you provide security for outdoor festivals and concerts?',
                answer: 'Yes, ShieldWise Security specializes in outdoor festival and concert security throughout California. We provide comprehensive security planning, perimeter control, stage security, crowd management, VIP protection, parking enforcement, vendor area security, and emergency coordination for festivals and concerts of all sizes from 500 to 50,000+ attendees.'
            },
            {
                question: 'Can you provide armed security for events?',
                answer: 'Yes, we provide BSIS-licensed armed security guards for events requiring enhanced protection such as high-profile gatherings, VIP events, large cash handling, valuable assets, or events with elevated threat levels. Armed security is commonly used for celebrity events, political gatherings, jewelry shows, and high-risk venues.'
            },
            {
                question: 'How far in advance should I book event security?',
                answer: 'For best availability and planning, book event security 2-4 weeks in advance for small events and 4-8 weeks for large events or festivals. However, we offer emergency event security deployment for last-minute needs and can often provide guards with 48-72 hours notice for most California locations.'
            },
            {
                question: 'Do you provide security for weddings and private parties?',
                answer: 'Yes, ShieldWise Security provides professional, discreet security for weddings, birthday parties, anniversaries, private celebrations, and exclusive gatherings throughout California. Our event security officers are trained in customer service excellence and blend seamlessly into private events while ensuring guest safety and property protection.'
            },
            {
                question: 'What does event security planning include?',
                answer: 'Our event security planning includes site assessments and venue walkthroughs, security staffing recommendations, access control and credentialing systems, crowd flow and management planning, VIP and backstage security protocols, emergency evacuation procedures, coordination with local law enforcement/fire departments, radio communication systems, and post-event incident reporting.'
            },
            {
                question: 'Are your event security guards insured?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance, workers\' compensation coverage for all guards, and can provide event-specific insurance certificates as required by venues. We provide certificates of insurance to all clients and venues upon request, typically within 24 hours.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed security for high-profile events and enhanced protection',
                url: '/services/armed-security'
            },
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for lower-risk events',
                url: '/services/unarmed-security'
            },
            {
                name: 'Executive Protection',
                icon: 'fas fa-user-tie',
                description: 'Close protection for VIPs and high-profile attendees',
                url: '/services/executive-protection'
            },
            {
                name: 'Concert & Festival Security',
                icon: 'fas fa-music',
                description: 'Specialized security for music events and entertainment venues',
                url: '/services/special-event-security'
            },
            {
                name: 'Corporate Security',
                icon: 'fas fa-building',
                description: 'Security solutions for corporate meetings and conferences',
                url: '/services/commercial-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Patrol services for event perimeter and parking areas',
                url: '/services/patrol'
            }
        ],

        // Features (existing - keep concise versions)
        features: [
            {
                icon: 'fas fa-users',
                title: 'Crowd Management',
                description: 'Professional crowd control, flow management, and de-escalation techniques.'
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
                icon: 'fas fa-camera',
                title: 'Surveillance',
                description: 'Real-time monitoring, CCTV oversight, and security awareness.'
            },
            {
                icon: 'fas fa-parking',
                title: 'Parking Management',
                description: 'Parking lot security, traffic control, and vehicle monitoring.'
            }
        ],

        // Statistics
        statistics: [
            { number: '5000+', label: 'Events Secured' },
            { number: '99.9%', label: 'Incident-Free Rate' },
            { number: '24/7', label: 'Availability' },
            { number: '10+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Amanda Foster',
                title: 'Event Planner',
                image: 'amanda-foster.jpg',
                quote: 'ShieldWise Security made our 5,000-person outdoor festival completely stress-free. Their planning, professionalism, and execution were flawless.'
            },
            {
                name: 'Marcus Johnson',
                title: 'Venue Manager',
                image: 'marcus-johnson.jpg',
                quote: 'We use ShieldWise for all major events at our venue. Their security teams are professional, reliable, and excellent with crowd management.'
            },
            {
                name: 'Rebecca Wu',
                title: 'Corporate Events Director',
                image: 'rebecca-wu.jpg',
                quote: 'For our annual company conferences and VIP events, ShieldWise provides discreet, professional security that blends perfectly with the event atmosphere.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/event-security'
    });
});

module.exports = router;

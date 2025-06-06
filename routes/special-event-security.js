
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        serviceTitle: 'Professional Special Event Security Services',
        serviceDescription: 'Ensuring the safety and success of your special events with comprehensive security solutions',
        serviceKeywords: 'special event security services, concert security, festival security, wedding security, corporate event security, crowd control',
        serviceImage: 'eventsecurity.png',
        serviceUrl: 'special-event-security',
        serviceType: 'special_event_security',
        serviceBenefit: 'ensuring safe and successful events',
        propertyType: 'event venue',
        priceRange: { low: 40, mid: 65, high: 95 },
        serviceAltName: 'Event Protection Services',
        serviceOutput: 'Complete event security protection',
        audienceType: 'Event Planners and Venue Managers',
        relatedProperty: 'events and venues',
        specializedServices: 'crowd control, VIP protection, emergency response, access control, venue security',
        industryType: 'entertainment',
        clientType: 'event organizers and venue owners',
        managerType: 'event managers',
        assessmentSpecifics: 'event risk assessment, crowd capacity evaluation, security perimeter planning',
        canonicalUrl: 'https://shieldwisesecurity.com/services/special-event-security/',
        
        // Features
        features: [
            {
                icon: 'fas fa-shield-alt',
                title: '24/7 On-Site Security Personnel',
                description: 'Professional security officers stationed throughout your event to provide immediate response and maintain visible security presence.'
            },
            {
                icon: 'fas fa-key',
                title: 'Advanced Access Control',
                description: 'Sophisticated entry management systems with credential verification, guest lists, and restricted area protection.'
            },
            {
                icon: 'fas fa-video',
                title: 'Real-Time Surveillance',
                description: 'Strategically placed cameras and monitoring systems providing comprehensive oversight of all event areas.'
            },
            {
                icon: 'fas fa-users-cog',
                title: 'Visitor Management',
                description: 'Comprehensive guest screening, registration, and escort services for restricted areas and VIP zones.'
            },
            {
                icon: 'fas fa-ambulance',
                title: 'Emergency Response',
                description: 'Trained personnel ready for medical emergencies, fire evacuations, and active threat situations with rapid response protocols.'
            },
            {
                icon: 'fas fa-laptop-code',
                title: 'Cybersecurity Services',
                description: 'Digital security measures to protect sensitive information and ensure compliance with relevant regulations.'
            },
            {
                icon: 'fas fa-route',
                title: 'Mobile Patrol Services',
                description: 'Regular security patrols of event perimeter, parking areas, and surrounding zones for enhanced protection.'
            },
            {
                icon: 'fas fa-clipboard-list',
                title: 'Incident Documentation',
                description: 'Detailed incident reporting, security logs, and real-time communication with event organizers and emergency services.'
            }
        ],

        // Process Steps
        processSteps: [
            {
                number: '1',
                title: 'Event Assessment',
                description: 'Comprehensive evaluation of your event\'s security needs, venue layout, guest demographics, and potential risks.'
            },
            {
                number: '2',
                title: 'Custom Security Plan',
                description: 'Development of tailored security protocols specific to your event type, size, and unique requirements.'
            },
            {
                number: '3',
                title: 'Team Deployment',
                description: 'Strategic deployment of trained security personnel and implementation of surveillance and access control systems.'
            },
            {
                number: '4',
                title: 'Real-Time Monitoring',
                description: 'Continuous security coverage with real-time communication, incident response, and post-event reporting.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-users-shield',
                title: 'Crowd Management',
                features: [
                    'Entrance & Exit Control',
                    'Queue Management',
                    'Capacity Monitoring',
                    'Emergency Evacuation'
                ]
            },
            {
                icon: 'fas fa-user-secret',
                title: 'VIP Protection Services',
                features: [
                    'Executive Protection',
                    'Close Protection Officers',
                    'Secure Transportation',
                    'Personal Security Details'
                ]
            },
            {
                icon: 'fas fa-search',
                title: 'Security Screening',
                features: [
                    'Bag Inspections',
                    'Metal Detection',
                    'ID Verification',
                    'Prohibited Items Control'
                ]
            }
        ],

        // Benefits
        benefits: [
            {
                icon: 'fas fa-clock',
                title: '24/7 Event Coverage',
                description: 'Round-the-clock protection during your event with professional security personnel and monitoring systems.'
            },
            {
                icon: 'fas fa-certificate',
                title: 'Licensed & Trained Specialists',
                description: 'All security personnel are licensed, bonded, and specially trained in event security protocols and emergency response.'
            },
            {
                icon: 'fas fa-cogs',
                title: 'Customized Solutions',
                description: 'Tailored security plans designed specifically for your event type, venue, and unique requirements.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Seamless Integration',
                description: 'Professional coordination with event planners, vendors, and venue staff for smooth security operations.'
            },
            {
                icon: 'fas fa-shield-virus',
                title: 'Comprehensive Protection',
                description: 'Physical and digital security integration protecting both your event and sensitive information.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Response Ready',
                description: 'Immediate response capabilities for all emergency situations with direct coordination with local emergency services.'
            }
        ],

        // Statistics
        statistics: [
            { number: '1000+', label: 'Events Secured' },
            { number: '99%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Emergency Response' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Jessica Martinez',
                title: 'Event Coordinator',
                image: 'james.png',
                quote: 'ShieldWise Security made our corporate conference flawless. Their team was professional, discrete, and handled every security concern perfectly.'
            },
            {
                name: 'Robert Thompson',
                title: 'Wedding Planner',
                image: 'samanta.png',
                quote: 'Exceptional service for our high-profile wedding. The security team was invisible to guests but provided comprehensive protection throughout the event.'
            },
            {
                name: 'Amanda Foster',
                title: 'Festival Director',
                image: 'shahn1.png',
                quote: 'Outstanding crowd management and emergency response. ShieldWise Security\'s expertise ensured our festival was safe and successful for all 10,000 attendees.'
            }
        ]
    };

    res.render('services/special-event-security', { 
        serviceData,
        pageUrl: '/services/special-event-security'
    });
});

module.exports = router;

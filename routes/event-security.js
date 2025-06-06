
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        serviceTitle: 'Professional Event Security Services',
        serviceDescription: 'Ensuring the safety and success of your events with comprehensive security solutions',
        serviceKeywords: 'event security services, concert security, festival security, wedding security, corporate event security, crowd control',
        serviceImage: 'eventsecurity.png',
        serviceUrl: 'event-security',
        serviceType: 'event_security',
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
        canonicalUrl: 'https://shieldwisesecurity.com/services/event-security/',
        
        // Features
        features: [
            {
                icon: 'fas fa-briefcase',
                title: 'Corporate Events',
                description: 'Board meetings, conferences, product launches, trade shows, and annual general meetings with professional security presence.'
            },
            {
                icon: 'fas fa-music',
                title: 'Concerts & Festivals',
                description: 'Large-scale music events, outdoor festivals, and entertainment venues requiring crowd control and artist protection.'
            },
            {
                icon: 'fas fa-ring',
                title: 'Weddings & Private Parties',
                description: 'Discrete security for weddings, anniversaries, birthdays, and exclusive private celebrations.'
            },
            {
                icon: 'fas fa-football-ball',
                title: 'Sporting Events',
                description: 'Stadium security, marathons, tournaments, and athletic competitions with specialized crowd management.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Academic Events',
                description: 'Graduations, school functions, university events, and educational conferences with appropriate security measures.'
            },
            {
                icon: 'fas fa-star',
                title: 'Award Shows & Galas',
                description: 'Red carpet events, award ceremonies, charity galas, and high-profile gatherings with VIP protection.'
            }
        ],

        // Process Steps
        processSteps: [
            {
                number: '1',
                title: 'Event Assessment',
                description: 'Comprehensive evaluation of your event security needs, venue layout, and risk factors.'
            },
            {
                number: '2',
                title: 'Security Planning',
                description: 'Development of customized security protocols specific to your event type and requirements.'
            },
            {
                number: '3',
                title: 'Team Deployment',
                description: 'Strategic placement of trained security personnel and coordination with event staff.'
            },
            {
                number: '4',
                title: 'Real-time Monitoring',
                description: 'Continuous security coverage with incident response and emergency coordination capabilities.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-shield-alt',
                title: 'Event Protection',
                features: [
                    'Crowd Control Management',
                    'Access Point Security',
                    'Emergency Response Plans',
                    'Risk Assessment'
                ]
            },
            {
                icon: 'fas fa-user-shield',
                title: 'VIP Security',
                features: [
                    'Executive Protection',
                    'Close Protection Officers',
                    'Secure Transportation',
                    'Threat Assessment'
                ]
            },
            {
                icon: 'fas fa-video',
                title: 'Surveillance',
                features: [
                    'CCTV Monitoring',
                    'Mobile Patrols',
                    'Real-time Reporting',
                    'Incident Documentation'
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
                icon: 'fas fa-graduation-cap',
                title: 'Event Security Specialists',
                description: 'Security guards specifically trained in event protocols, crowd psychology, and emergency response.'
            },
            {
                icon: 'fas fa-dollar-sign',
                title: 'Flexible Pricing',
                description: 'Competitive rates with customizable packages that fit your event budget and security requirements.'
            },
            {
                icon: 'fas fa-heart',
                title: 'Guest Experience',
                description: 'Professional security that enhances rather than detracts from your guests\' event experience.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Event Success',
                description: 'Proven track record of securing successful events with zero major incidents.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Response',
                description: 'Immediate response capabilities with coordination with local emergency services and law enforcement.'
            }
        ],

        // Statistics
        statistics: [
            { number: '500+', label: 'Events Secured' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Available' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'James Wilson',
                title: 'Event Coordinator',
                image: 'james.png',
                quote: 'Their team\'s professionalism and attention to detail made our corporate event a success.'
            },
            {
                name: 'Samantha Lee',
                title: 'Festival Director',
                image: 'samanta.png',
                quote: 'Exceptional crowd management and security services for our music festival.'
            },
            {
                name: 'Robert Chen',
                title: 'Conference Manager',
                image: 'shahn1.png',
                quote: 'Professional, reliable, and thorough in their approach to event security.'
            }
        ]
    };

    res.render('services/event-security', { 
        serviceData,
        pageUrl: '/services/event-security'
    });
});

module.exports = router;

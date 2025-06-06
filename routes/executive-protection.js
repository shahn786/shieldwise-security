
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Executive Protection Services California',
        serviceDescription: 'California\'s premier executive protection company with military & law enforcement trained professionals. Close protection, threat assessment, secure transportation & VIP security. 4.9★ rating from 200+ executives.',
        serviceKeywords: 'executive protection services California, bodyguard services, VIP security, close protection officers, personal security guards, threat assessment, secure transportation, celebrity protection, corporate executive security, dignitary protection',
        serviceImage: 'excutivesecurity.png',
        serviceUrl: 'executive-protection',
        serviceType: 'executive_protection',
        serviceBenefit: 'enhanced personal safety and security for high-profile individuals',
        propertyType: 'executive and VIP clients',

        // Pricing Information
        priceRange: { 
            low: 85, 
            mid: 125, 
            high: 195 
        },

        // Alternative Names and Outputs
        serviceAltName: 'VIP Protection Services',
        serviceOutput: 'Complete Executive and Personal Protection',
        audienceType: 'Executives, Celebrities, High-Net-Worth Individuals, Corporate Leaders, Government Officials',

        // Page-specific Meta Data
        pageTitle: 'Executive Protection Services California | VIP Bodyguards | Close Protection | ShieldWise Security',
        pageDescription: 'California\'s premier executive protection company. Military & law enforcement trained professionals. Close protection, threat assessment, secure transportation & VIP security. 4.9★ rating from 200+ executives. Free consultation - Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/executive-protection/',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-user-shield',
                title: 'Close Protection Officers',
                description: 'Elite personal protection specialists with military and law enforcement backgrounds providing discrete close protection services.'
            },
            {
                icon: 'fas fa-car',
                title: 'Secure Transportation',
                description: 'Armored vehicle services and secure transportation with trained drivers and advance route planning for maximum safety.'
            },
            {
                icon: 'fas fa-search',
                title: 'Threat Assessment',
                description: 'Comprehensive risk evaluation and threat analysis to identify potential security risks and develop mitigation strategies.'
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Security',
                description: 'Estate protection services including perimeter security, staff screening, and 24/7 residential monitoring systems.'
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Event Security',
                description: 'VIP protection for public appearances, corporate events, social gatherings, and high-profile occasions.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Travel Security',
                description: 'International and domestic travel protection including advance teams, secure accommodations, and logistics coordination.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Risk Assessment',
                description: 'Comprehensive evaluation of personal security risks, lifestyle analysis, and threat identification specific to the client.'
            },
            {
                number: 2,
                title: 'Security Plan Development',
                description: 'Creation of customized protection protocols including personnel assignment, transportation, and emergency procedures.'
            },
            {
                number: 3,
                title: 'Team Assignment',
                description: 'Selection and deployment of specialized protection officers matched to client requirements and threat level.'
            },
            {
                number: 4,
                title: 'Ongoing Protection',
                description: 'Continuous security coverage with regular threat assessments, plan updates, and 24/7 emergency response capabilities.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-medal',
                title: 'Elite Training Standards',
                description: 'Protection specialists with military, law enforcement, or special operations backgrounds and advanced tactical training.'
            },
            {
                icon: 'fas fa-eye-slash',
                title: 'Discrete Protection',
                description: 'Professional, low-profile security that maintains client privacy while providing maximum protection effectiveness.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Availability',
                description: 'Round-the-clock protection services with immediate response capabilities and emergency coordination protocols.'
            },
            {
                icon: 'fas fa-globe',
                title: 'Global Coverage',
                description: 'International protection capabilities with worldwide network of vetted security professionals and local contacts.'
            },
            {
                icon: 'fas fa-microchip',
                title: 'Advanced Technology',
                description: 'State-of-the-art security technology including GPS tracking, communication systems, and threat monitoring tools.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Proven Track Record',
                description: '99.9% client satisfaction with zero security incidents in over 15 years of executive protection services.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-user-tie',
                title: 'Personal Protection',
                features: [
                    'Close Protection Officers',
                    'Personal Bodyguard Services',
                    'Lifestyle Security Assessment',
                    'Emergency Response Planning'
                ]
            },
            {
                icon: 'fas fa-building',
                title: 'Corporate Security',
                features: [
                    'Executive Protection Programs',
                    'Board Meeting Security',
                    'Corporate Travel Security',
                    'Threat Intelligence Services'
                ]
            },
            {
                icon: 'fas fa-star',
                title: 'VIP Services',
                features: [
                    'Celebrity Protection',
                    'Red Carpet Security',
                    'Private Event Security',
                    'Media Management Support'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '200+', label: 'Executives Protected' },
            { number: '99.9%', label: 'Success Rate' },
            { number: '24/7', label: 'Protection Available' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Michael Thompson',
                title: 'Fortune 500 CEO',
                image: 'james.png',
                quote: 'ShieldWise\'s executive protection team provides unparalleled professionalism and security. Their discrete approach allows me to conduct business confidently.'
            },
            {
                name: 'Sarah Martinez',
                title: 'Entertainment Executive',
                image: 'samanta.png',
                quote: 'Outstanding protection services for high-profile events. Their team seamlessly integrates with our operations while maintaining the highest security standards.'
            },
            {
                name: 'Robert Chen',
                title: 'Tech Industry Leader',
                image: 'shahn1.png',
                quote: 'Professional, reliable, and highly skilled protection officers. ShieldWise understands the unique security challenges facing today\'s executives.'
            }
        ]
    };

    res.render('services/executive-protection', { 
        serviceData,
        pageUrl: '/services/executive-protection'
    });
});

module.exports = router;

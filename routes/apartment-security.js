
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Professional Apartment Security Services',
        serviceDescription: 'Comprehensive apartment security services with 24/7 guards, access control, CCTV monitoring, and emergency response for residential communities.',
        serviceKeywords: 'apartment security, residential security guards, access control systems, 24/7 security monitoring, property protection',
        serviceImage: 'apartmentsecurity.webp',
        serviceUrl: 'apartment-security',
        serviceType: 'apartment',
        serviceBenefit: 'enhanced residential safety and peace of mind',
        propertyType: 'apartment complex',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 55, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Residential Security Services',
        serviceOutput: 'Complete apartment complex protection',
        audienceType: 'Property Managers and Residents',

        // Page-specific Meta Data
        pageTitle: 'Apartment Security Services California | 24/7 Guards | ShieldWise Security',
        pageDescription: 'Professional apartment security services with 24/7 guards, access control, CCTV monitoring, and emergency response for residential communities in California.',
        canonicalUrl: 'https://shieldwisesecurity.com/services/apartment-security/',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-user-shield',
                title: '24/7 Security Guards',
                description: 'Professional security personnel providing round-the-clock protection for your apartment complex.'
            },
            {
                icon: 'fas fa-key',
                title: 'Access Control Systems',
                description: 'Advanced entry systems to control and monitor who enters your residential property.'
            },
            {
                icon: 'fas fa-video',
                title: 'CCTV Monitoring',
                description: 'Comprehensive surveillance system with live monitoring and recorded footage for security.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Response',
                description: 'Immediate response to security incidents and coordination with local law enforcement.'
            },
            {
                icon: 'fas fa-car',
                title: 'Parking Area Security',
                description: 'Dedicated security coverage for parking garages and outdoor parking areas.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Visitor Management',
                description: 'Professional visitor screening and registration to maintain community safety.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Property Assessment',
                description: 'Comprehensive evaluation of your apartment complex security needs and vulnerabilities.'
            },
            {
                number: 2,
                title: 'Custom Security Plan',
                description: 'Development of tailored security protocols designed for your specific residential community.'
            },
            {
                number: 3,
                title: 'Guard Deployment',
                description: 'Assignment of trained security personnel with residential security experience.'
            },
            {
                number: 4,
                title: 'Ongoing Protection',
                description: 'Continuous security coverage with regular reports and service adjustments as needed.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-shield-alt',
                title: 'Crime Deterrence',
                description: 'Visible security presence significantly reduces crime and unwanted activity in residential areas.'
            },
            {
                icon: 'fas fa-home',
                title: 'Resident Peace of Mind',
                description: 'Residents feel safer knowing professional security is protecting their home community.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Property Value Protection',
                description: 'Security services help maintain and enhance property values through improved safety.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Coverage',
                description: 'Round-the-clock security ensures protection during all hours of the day and night.'
            },
            {
                icon: 'fas fa-users',
                title: 'Community Safety',
                description: 'Professional security creates a safer environment for all residents and their families.'
            },
            {
                icon: 'fas fa-file-alt',
                title: 'Detailed Reporting',
                description: 'Regular security reports keep property management informed of all activities and incidents.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Lobby & Common Area Security',
                features: [
                    'Front Desk Security Personnel',
                    'Common Area Monitoring',
                    'Visitor Access Control',
                    'Package Reception Security'
                ]
            },
            {
                icon: 'fas fa-car-side',
                title: 'Parking & Perimeter Security',
                features: [
                    'Parking Garage Patrols',
                    'Vehicle Access Control',
                    'Perimeter Fence Monitoring',
                    'Emergency Gate Response'
                ]
            },
            {
                icon: 'fas fa-route',
                title: 'Mobile Patrol Services',
                features: [
                    'Property Perimeter Checks',
                    'Parking Area Inspections',
                    'After-Hours Security Rounds',
                    'Incident Response Patrols'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '300+', label: 'Apartment Complexes Secured' },
            { number: '99.5%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Security Coverage' },
            { number: '12+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Maria Rodriguez',
                title: 'Property Manager',
                image: 'maria-rodriguez.jpg',
                quote: 'ShieldWise Security has transformed our apartment complex. Residents feel much safer and we\'ve seen a significant reduction in incidents.'
            },
            {
                name: 'James Wilson',
                title: 'Resident Council President',
                image: 'james-wilson.jpg',
                quote: 'The security guards are professional and courteous. They know all the residents and really care about our community safety.'
            },
            {
                name: 'Linda Chen',
                title: 'HOA Board Member',
                image: 'linda-chen.jpg',
                quote: 'Excellent service with detailed reporting. The security team responds quickly to any concerns and maintains great communication.'
            }
        ]
    };

    res.render('services/apartment-security', { 
        serviceData,
        pageUrl: '/services/apartment-security'
    });
});

module.exports = router;


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        serviceTitle: 'Professional Unarmed Security Services',
        serviceDescription: 'Strategic and approachable security solutions providing effective deterrence and peace of mind without the complexities of armed personnel.',
        serviceType: 'unarmed_security',
        canonicalUrl: 'https://shieldwisesecurity.com/services/unarmed-security',
        priceRange: { low: 35, high: 75 },

        // Features
        features: [
            {
                icon: 'fas fa-eye',
                title: 'Surveillance & Monitoring',
                description: 'Professional monitoring of premises using CCTV systems, regular patrols, and real-time threat assessment to maintain security awareness.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Access Control Management',
                description: 'Controlling entry and exit points, visitor verification, ID checking, and ensuring only authorized personnel access restricted areas.'
            },
            {
                icon: 'fas fa-users',
                title: 'Customer Service Excellence',
                description: 'Friendly, professional interaction with visitors, providing assistance and information while maintaining security protocols.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Emergency Response',
                description: 'Rapid response to incidents, coordination with emergency services, evacuation procedures, and crisis management protocols.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'De-escalation Techniques',
                description: 'Advanced conflict resolution skills to manage tense situations peacefully, reducing the need for physical intervention.'
            },
            {
                icon: 'fas fa-clipboard-list',
                title: 'Incident Documentation',
                description: 'Detailed reporting of all security incidents, maintaining accurate logs, and providing comprehensive documentation for management.'
            },
            {
                icon: 'fas fa-route',
                title: 'Mobile Patrol Services',
                description: 'Regular foot and vehicle patrols of designated areas, perimeter checks, and proactive security presence throughout the facility.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Loss Prevention',
                description: 'Theft deterrence through visible presence, monitoring suspicious activities, and implementing security protocols to prevent losses.'
            }
        ],

        // Process Steps
        processSteps: [
            {
                number: '1',
                title: 'Security Assessment',
                description: 'Comprehensive evaluation of your facility\'s security needs, risk factors, and operational requirements.'
            },
            {
                number: '2',
                title: 'Officer Selection',
                description: 'Careful selection of trained, licensed security officers who match your specific environment and needs.'
            },
            {
                number: '3',
                title: 'Custom Training',
                description: 'Site-specific training on your policies, procedures, and unique security requirements for optimal performance.'
            },
            {
                number: '4',
                title: 'Ongoing Support',
                description: 'Continuous supervision, performance monitoring, and service adjustments to maintain excellence.'
            }
        ],

        // Benefits
        benefits: [
            {
                icon: 'fas fa-dollar-sign',
                title: 'Cost-Effective Solution',
                description: 'Lower costs compared to armed security while maintaining professional protection and deterrence capabilities.'
            },
            {
                icon: 'fas fa-heart',
                title: 'Non-Intimidating Presence',
                description: 'Approachable security officers who provide protection without creating an intimidating atmosphere for visitors and staff.'
            },
            {
                icon: 'fas fa-balance-scale',
                title: 'Reduced Liability',
                description: 'Lower insurance costs and reduced legal liability associated with firearms on the premises.'
            },
            {
                icon: 'fas fa-cogs',
                title: 'Flexible Service Options',
                description: 'Customizable security solutions that can be tailored to meet specific operational needs and schedules.'
            },
            {
                icon: 'fas fa-comments',
                title: 'Enhanced Communication',
                description: 'Officers trained in customer service and communication skills to interact positively with the public.'
            },
            {
                icon: 'fas fa-clock',
                title: 'Quick Deployment',
                description: 'Faster implementation and deployment compared to armed security services with simplified licensing requirements.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-shield-alt',
                title: 'General Security Services',
                features: [
                    'Lobby Reception Services',
                    'Access Point Monitoring',
                    'Visitor Management',
                    'Patrol Services'
                ]
            },
            {
                icon: 'fas fa-video',
                title: 'Surveillance & Monitoring',
                features: [
                    'CCTV System Operation',
                    'Real-time Monitoring',
                    'Incident Detection',
                    'Security Reporting'
                ]
            },
            {
                icon: 'fas fa-users',
                title: 'Customer Service Security',
                features: [
                    'Friendly Reception Services',
                    'Information Assistance',
                    'Crowd Management',
                    'Event Security'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '1000+', label: 'Trained Officers' },
            { number: '99%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Available Coverage' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Sarah Johnson',
                title: 'Retail Operations Manager',
                image: 'james.png',
                quote: 'ShieldWise\'s unarmed security team has been exceptional in maintaining security at our retail locations. Their professionalism and customer service approach are outstanding.'
            },
            {
                name: 'Michael Chen',
                title: 'Property Manager',
                image: 'samanta.png',
                quote: 'We\'ve been impressed with the quality of service provided by ShieldWise\'s unarmed officers. They\'re always professional, alert, and courteous with our tenants.'
            },
            {
                name: 'Dr. Emily Rodriguez',
                title: 'Healthcare Administrator',
                image: 'shahn1.png',
                quote: 'The unarmed security services have created a safe, welcoming environment for our patients and staff. Their de-escalation skills are particularly valuable.'
            }
        ]
    };

    res.render('services/unarmed-security', { 
        serviceData,
        pageUrl: '/services/unarmed-security'
    });
});

module.exports = router;

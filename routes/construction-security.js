
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Construction Security Guards California',
        serviceDescription: 'California\'s premier construction security company with BSIS-licensed guards. 24/7 site protection, fire watch services, equipment theft prevention & rapid emergency response. 4.9★ rating from 500+ construction sites.',
        serviceKeywords: 'construction security services California, construction site guards, 24/7 construction protection, licensed construction security guards, building site security, construction equipment theft prevention, fire watch services, night watchman construction sites, construction site patrol, emergency response construction, BSIS licensed guards',
        serviceImage: 'construction-security-california.jpg',
        serviceUrl: 'construction-security',
        serviceType: 'construction_security',
        serviceBenefit: 'comprehensive site protection and equipment security',
        propertyType: 'construction sites and building projects',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 55, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Construction Site Security Services',
        serviceOutput: 'Complete Construction Site Protection and Peace of Mind',
        audienceType: 'Construction Companies, General Contractors, Property Developers, Site Managers, Construction Supervisors',

        // Page-specific Meta Data
        pageTitle: 'Construction Security Guards California | 24/7 Site Protection | Fire Watch | Equipment Theft Prevention | ShieldWise Security',
        pageDescription: 'California\'s premier construction security company. Licensed guards, 24/7 site protection, fire watch services, equipment theft prevention & rapid emergency response. 4.9★ rating from 500+ construction sites. Free security assessment - Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/construction-security/',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-hard-hat',
                title: '24/7 On-Site Security',
                description: 'Dedicated security guards stationed at your construction site providing continuous protection and immediate response to security incidents.'
            },
            {
                icon: 'fas fa-tools',
                title: 'Equipment Protection',
                description: 'Specialized protection for heavy machinery, tools, and construction materials with advanced monitoring and theft prevention systems.'
            },
            {
                icon: 'fas fa-car',
                title: 'Mobile Patrol Services',
                description: 'Regular vehicle and foot patrols covering your entire construction site perimeter with detailed checkpoint monitoring and reporting.'
            },
            {
                icon: 'fas fa-key',
                title: 'Access Control Management',
                description: 'Strict entry point management with visitor verification, contractor credentialing, and authorized personnel tracking systems.'
            },
            {
                icon: 'fas fa-video',
                title: 'CCTV Surveillance',
                description: 'High-definition camera systems with 24/7 monitoring, night vision capabilities, and real-time incident detection and recording.'
            },
            {
                icon: 'fas fa-fire',
                title: 'Fire Watch Services',
                description: 'Hot work monitoring, fire safety compliance, and emergency response protocols for construction activities involving welding and cutting.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Site Assessment',
                description: 'Comprehensive evaluation of your construction site\'s security vulnerabilities, access points, and protection requirements.'
            },
            {
                number: 2,
                title: 'Security Plan Development',
                description: 'Creation of customized security protocols specific to your project type, timeline, and risk factors.'
            },
            {
                number: 3,
                title: 'Deployment & Setup',
                description: 'Implementation of security personnel, surveillance systems, and coordination with project management teams.'
            },
            {
                number: 4,
                title: 'Continuous Monitoring',
                description: 'Ongoing security coverage with regular assessments, adjustments, and updates as construction phases progress.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-clock',
                title: '24/7 Security Coverage',
                description: 'Round-the-clock protection with professional security personnel ensuring constant site surveillance and protection.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Construction-Trained Guards',
                description: 'Security professionals specifically trained in construction site protocols, safety regulations, and industry requirements.'
            },
            {
                icon: 'fas fa-shield-virus',
                title: 'Theft & Vandalism Prevention',
                description: 'Proven track record of preventing equipment theft, material loss, and site vandalism through proactive security measures.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Project Timeline Protection',
                description: 'Security measures that prevent delays caused by theft, vandalism, or unauthorized access, keeping projects on schedule.'
            },
            {
                icon: 'fas fa-dollar-sign',
                title: 'Cost-Effective Protection',
                description: 'Competitive pricing that reduces theft losses, insurance claims, and project delays, providing excellent ROI.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Response',
                description: 'Immediate response capabilities for security incidents with direct coordination with law enforcement and emergency services.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-user-shield',
                title: 'On-Site Security Guards',
                features: [
                    'Licensed Security Officers',
                    'Armed & Unarmed Options',
                    'Gate House Operations',
                    'Visitor Management'
                ]
            },
            {
                icon: 'fas fa-eye',
                title: 'Surveillance & Monitoring',
                features: [
                    'CCTV Installation & Monitoring',
                    'Motion Detection Systems',
                    'Remote Monitoring Services',
                    'Real-time Alert Systems'
                ]
            },
            {
                icon: 'fas fa-route',
                title: 'Patrol & Response',
                features: [
                    'Mobile Security Patrols',
                    'Perimeter Inspections',
                    'Emergency Response',
                    'Incident Documentation'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '300+', label: 'Sites Secured' },
            { number: '90%', label: 'Theft Reduction' },
            { number: '24/7', label: 'Security Coverage' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'David Martinez',
                title: 'Project Manager',
                image: 'james.png',
                quote: 'ShieldWise\'s construction security team has eliminated theft at our sites. Their 24/7 coverage and professional approach are exceptional.'
            },
            {
                name: 'Lisa Thompson',
                title: 'Construction Supervisor',
                image: 'samanta.png',
                quote: 'Professional guards who understand construction environments. They\'ve prevented multiple incidents and keep our sites secure.'
            },
            {
                name: 'Robert Wilson',
                title: 'Site Foreman',
                image: 'shahn1.png',
                quote: 'Excellent mobile patrol services and incident reporting. ShieldWise has become an essential part of our construction security strategy.'
            }
        ]
    };

    res.render('services/construction-security', { 
        serviceData,
        pageUrl: '/services/construction-security'
    });
});

module.exports = router;


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Professional Shopping Center Security Services',
        serviceDescription: 'Comprehensive security solutions tailored for retail establishments, ensuring safety for shoppers, staff, and tenants with 24/7 guards and surveillance.',
        serviceKeywords: 'shopping center security, mall security guards, retail security services, parking lot security, CCTV monitoring, loss prevention',
        serviceImage: 'shoppingsecurity.webp',
        serviceUrl: 'shopping-center-security',
        serviceType: 'shopping-center',
        serviceBenefit: 'enhanced retail security and customer safety',
        propertyType: 'shopping center',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 55, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Retail Security Services',
        serviceOutput: 'Complete shopping center protection',
        audienceType: 'Property Managers and Retailers',

        // Page-specific Meta Data
        pageTitle: 'Shopping Center Security Services California | Retail Guards | ShieldWise Security',
        pageDescription: 'Professional shopping center security services with 24/7 guards, CCTV monitoring, retail loss prevention, and parking lot security for California retail establishments.',
        canonicalUrl: 'https://shieldwisesecurity.com/services/shopping-center-security/',

        // Service Features
        features: [
            {
                icon: 'fas fa-store',
                title: 'Retail Loss Prevention',
                description: 'Specialized anti-theft strategies, shoplifting deterrence, inventory protection, and coordinated response with store management teams.'
            },
            {
                icon: 'fas fa-car',
                title: 'Parking Lot Security',
                description: 'Comprehensive surveillance and patrol of parking areas, vehicle protection, customer safety escorts, and theft prevention measures.'
            },
            {
                icon: 'fas fa-users',
                title: 'Crowd Management',
                description: 'Expert handling of high-traffic periods, special events, holiday rushes, and emergency evacuation procedures for large crowds.'
            },
            {
                icon: 'fas fa-video',
                title: '24/7 CCTV Monitoring',
                description: 'Real-time surveillance of all common areas, entrances, corridors, food courts, and critical zones with advanced monitoring technology.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Access Control Management',
                description: 'Restricted area security, tenant access management, delivery coordination, and after-hours entry control systems.'
            },
            {
                icon: 'fas fa-phone',
                title: 'Emergency Response',
                description: 'Rapid response protocols for medical emergencies, security incidents, fire situations, and coordination with local emergency services.'
            },
            {
                icon: 'fas fa-id-card',
                title: 'Tenant & Visitor Management',
                description: 'Comprehensive visitor screening, contractor management, delivery coordination, and tenant security support services.'
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Special Event Security',
                description: 'Customized security for promotional events, seasonal celebrations, grand openings, and high-profile retail activities.'
            }
        ],

        // Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Comprehensive Assessment',
                description: 'Detailed evaluation of your shopping center\'s layout, tenant mix, traffic patterns, and specific security vulnerabilities.'
            },
            {
                number: 2,
                title: 'Customized Security Plan',
                description: 'Development of tailored security protocols specific to retail environments, tenant needs, and customer safety requirements.'
            },
            {
                number: 3,
                title: 'Strategic Implementation',
                description: 'Deployment of trained retail security personnel, installation of surveillance systems, and integration with existing operations.'
            },
            {
                number: 4,
                title: 'Continuous Monitoring',
                description: 'Ongoing security coverage with regular assessments, performance reviews, and adjustments to maintain optimal protection.'
            }
        ],

        // Benefits
        benefits: [
            {
                icon: 'fas fa-shopping-cart',
                title: 'Retail Security Expertise',
                description: 'Specialized knowledge in retail security challenges, loss prevention strategies, and customer-focused security approaches.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Security Coverage',
                description: 'Round-the-clock protection during operating hours and after-hours security to protect against break-ins and vandalism.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Enhanced Property Value',
                description: 'Professional security presence increases tenant retention, attracts quality retailers, and improves overall property value.'
            },
            {
                icon: 'fas fa-smile',
                title: 'Customer Confidence',
                description: 'Visible security presence creates a safe shopping environment, encouraging customer visits and extended shopping times.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Retail-Trained Personnel',
                description: 'Security officers specifically trained in retail environments, customer service, and de-escalation techniques.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Tenant Relationship Management',
                description: 'Collaborative approach with tenants, providing security support while maintaining positive business relationships.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Mall & Center Security',
                features: [
                    'Common Area Monitoring',
                    'Food Court Security',
                    'Restroom Area Patrols',
                    'Maintenance Area Access'
                ]
            },
            {
                icon: 'fas fa-truck',
                title: 'Loading Dock & Delivery',
                features: [
                    'Delivery Verification',
                    'Loading Dock Security',
                    'Vendor Management',
                    'Inventory Protection'
                ]
            },
            {
                icon: 'fas fa-route',
                title: 'Mobile Patrol Services',
                features: [
                    'Perimeter Security Checks',
                    'Parking Lot Inspections',
                    'External Area Monitoring',
                    'Incident Response'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '150+', label: 'Shopping Centers Secured' },
            { number: '96%', label: 'Tenant Satisfaction' },
            { number: '24/7', label: 'Security Coverage' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Robert Chen',
                title: 'Mall Operations Director',
                image: 'james.png',
                quote: 'ShieldWise\'s security team has significantly improved the safety at our shopping center. Their professional approach and customer service are outstanding.'
            },
            {
                name: 'Sarah Thompson',
                title: 'Property Manager',
                image: 'samanta.png',
                quote: 'Since partnering with ShieldWise, we\'ve seen a dramatic reduction in security incidents. Their team\'s responsiveness is exceptional.'
            },
            {
                name: 'Lisa Martinez',
                title: 'Retail Store Manager',
                image: 'shahn1.png',
                quote: 'The security presence has made our customers feel safer and has helped reduce theft incidents significantly. Highly professional service.'
            }
        ]
    };

    res.render('services/shopping-center-security', { 
        serviceData,
        pageUrl: '/services/shopping-center-security'
    });
});

module.exports = router;

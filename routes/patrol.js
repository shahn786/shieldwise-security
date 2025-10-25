
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Mobile Patrol Security Services California',
        serviceDescription: 'Professional mobile patrol security services across California. 24/7 random patrols, alarm response, and property monitoring. Licensed & insured patrol officers.',
        serviceKeywords: 'mobile patrol security, security patrol services, alarm response, property monitoring, random patrols, California security patrol',
        serviceImage: 'mobilesecurity.webp',
        serviceUrl: 'patrol',
        serviceType: 'mobile_patrol',
        serviceBenefit: 'comprehensive mobile security coverage',
        propertyType: 'commercial and residential properties',

        // Pricing Information
        priceRange: { 
            low: 45, 
            mid: 65, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Mobile Patrol Security Services',
        serviceOutput: 'Enhanced Property Protection with Mobile Security Patrols',
        audienceType: 'Property Managers, Business Owners, HOAs, Commercial Facilities',

        // Page-specific Meta Data
        pageTitle: 'Mobile Patrol Security Services California | 24/7 Random Patrols | ShieldWise Security',
        pageDescription: 'Professional mobile patrol security services across California. 24/7 random patrols, alarm response, and property monitoring. Licensed & insured patrol officers serving LA, OC & San Diego. Call (800) 744-3531',
        canonicalUrl: 'https://shieldwisesecurity.com/services/patrol/',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-car',
                title: 'Random Mobile Patrols',
                description: 'Unpredictable patrol patterns to maximize deterrence and coverage across your property or multiple locations.'
            },
            {
                icon: 'fas fa-bell',
                title: 'Alarm Response Services',
                description: 'Immediate response to alarm activations with professional assessment and coordination with authorities.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Property Inspections',
                description: 'Comprehensive property checks including doors, windows, lighting, and potential security vulnerabilities.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Visible Deterrent',
                description: 'Marked patrol vehicles provide highly visible security presence to deter criminal activity.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Coverage',
                description: 'Round-the-clock mobile patrol services with customizable schedules to meet your specific needs.'
            },
            {
                icon: 'fas fa-file-alt',
                title: 'Detailed Reporting',
                description: 'Comprehensive incident reports and patrol logs accessible through our online portal.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Commercial Patrol',
                features: [
                    'Office Complex Patrols',
                    'Shopping Center Security',
                    'Industrial Site Monitoring',
                    'Multi-Location Coverage'
                ]
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Patrol',
                features: [
                    'HOA Community Patrols',
                    'Gated Community Security',
                    'Vacation Home Checks',
                    'Neighborhood Watch Support'
                ]
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Construction & Vacant',
                features: [
                    'Construction Site Patrols',
                    'Vacant Property Monitoring',
                    'Equipment Protection',
                    'Trespasser Prevention'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '24/7', label: 'Patrol Coverage' },
            { number: '500+', label: 'Locations Served' },
            { number: '15', label: 'Minute Response Time' },
            { number: '99.8%', label: 'Client Satisfaction' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Robert Martinez',
                title: 'Property Manager',
                image: 'james.webp',
                quote: 'ShieldWise mobile patrols have been instrumental in reducing incidents at our commercial properties. Their random patrol patterns and detailed reporting give us peace of mind.'
            },
            {
                name: 'Lisa Chen',
                title: 'HOA President',
                image: 'jassica.webp',
                quote: 'The mobile patrol service has transformed our community security. Residents feel safer and we\'ve seen a significant decrease in property crimes.'
            },
            {
                name: 'David Thompson',
                title: 'Facility Director',
                image: 'samanta.webp',
                quote: 'Professional, reliable, and thorough. The patrol reports are excellent and their response time to alarms is outstanding.'
            }
        ]
    };

    res.render('services/patrol', { 
        serviceData,
        pageUrl: '/services/patrol'
    });
});

module.exports = router;

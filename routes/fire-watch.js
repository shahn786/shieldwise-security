
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceType: 'fire_watch',
        serviceTitle: 'Professional Fire Watch Security Services',
        serviceDescription: '24/7 fire watch protection ensuring complete compliance and safety during system outages',
        
        // Pricing Information
        priceRange: {
            low: 35,
            mid: 50,
            high: 65
        },
        
        // Alternative Names and Outputs
        serviceAltName: 'Fire Watch Security Services',
        serviceOutput: 'Complete Fire Safety Compliance and Protection',
        audienceType: 'Construction Companies, Property Managers, Facility Managers, Building Owners, Contractors, Maintenance Companies',

        // Page-specific Meta Data
        pageTitle: 'Fire Watch Security Services California | 24/7 Licensed Guards from $35/hr | ShieldWise',
        pageDescription: 'California\'s #1 fire watch security company. BSIS-licensed guards, 24/7 fire patrols, safety inspections & emergency response. 4.9★ rating, 287+ reviews. Free quote in 2 hours.',
        canonicalUrl: 'https://shieldwisesecurity.com/services/fire-watch-security',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-fire-extinguisher',
                title: '24/7 Fire Watch Patrols',
                description: 'Continuous on-site monitoring with licensed guards conducting regular patrols to identify and prevent fire hazards during system outages.'
            },
            {
                icon: 'fas fa-hard-hat',
                title: 'Construction Site Fire Watch',
                description: 'Specialized protection for construction sites during vulnerable phases, hot work operations, and when fire suppression systems are offline.'
            },
            {
                icon: 'fas fa-tools',
                title: 'Hot Work Supervision',
                description: 'Expert supervision during welding, cutting, grinding, and other hot work operations with immediate fire suppression capabilities.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Emergency Response',
                description: 'Rapid fire incident response with immediate notification protocols and coordination with local fire departments.'
            },
            {
                icon: 'fas fa-cogs',
                title: 'System Impairment Coverage',
                description: 'Complete protection during sprinkler system maintenance, fire alarm repairs, or other fire protection system outages.'
            },
            {
                icon: 'fas fa-clipboard-list',
                title: 'Detailed Documentation',
                description: 'Comprehensive activity logs, incident reports, and compliance documentation for insurance and regulatory requirements.'
            },
            {
                icon: 'fas fa-mobile-alt',
                title: 'Mobile Patrol Units',
                description: 'Advanced mobile units with communication equipment and fire suppression tools for perimeter and equipment monitoring.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Code Compliance Assurance',
                description: 'Expert knowledge of local fire codes and regulations ensuring your property maintains full compliance during outages.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Risk Assessment',
                description: 'Comprehensive evaluation of fire hazards, system status, and regulatory requirements specific to your property.'
            },
            {
                number: 2,
                title: 'Deployment Planning',
                description: 'Strategic positioning of fire watch personnel and equipment based on property layout and risk factors.'
            },
            {
                number: 3,
                title: 'Active Monitoring',
                description: 'Continuous surveillance with regular patrols, hazard identification, and real-time documentation of all activities.'
            },
            {
                number: 4,
                title: 'Compliance Reporting',
                description: 'Detailed reports and documentation ensuring regulatory compliance and providing audit trails for authorities.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-phone-alt',
                title: 'Immediate Deployment',
                description: 'Rapid response teams available 24/7 with 1-2 hour deployment for emergency fire watch coverage throughout California.'
            },
            {
                icon: 'fas fa-certificate',
                title: 'Certified Fire Watch Guards',
                description: 'OSHA-trained personnel with specialized fire watch certifications and extensive knowledge of fire safety protocols.'
            },
            {
                icon: 'fas fa-truck',
                title: 'Fully Equipped Units',
                description: 'Mobile units with fire extinguishers, communication devices, safety equipment, and emergency response tools.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Fire Department Coordination',
                description: 'Established relationships with local fire departments ensuring seamless emergency response and communication.'
            },
            {
                icon: 'fas fa-file-alt',
                title: 'Insurance Compliance',
                description: 'Documentation and reporting that meets insurance company requirements and helps maintain coverage during outages.'
            },
            {
                icon: 'fas fa-clock',
                title: 'Flexible Coverage Options',
                description: 'Short-term and long-term fire watch services with customizable schedules to meet specific operational needs.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Commercial Fire Watch',
                features: [
                    'Office Building Coverage',
                    'Retail Center Protection',
                    'Warehouse Monitoring',
                    'Industrial Site Safety'
                ]
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Fire Watch',
                features: [
                    'Apartment Complex Coverage',
                    'HOA Community Protection',
                    'Senior Living Facilities',
                    'Multi-Family Properties'
                ]
            },
            {
                icon: 'fas fa-hammer',
                title: 'Construction Fire Watch',
                features: [
                    'Active Construction Sites',
                    'Renovation Projects',
                    'Hot Work Operations',
                    'Demolition Activities'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '500+', label: 'Fire Watch Assignments' },
            { number: '100%', label: 'Code Compliance' },
            { number: '24/7', label: 'Emergency Response' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Client Testimonials
        testimonials: [
            {
                name: 'Robert Chen',
                title: 'Facility Manager',
                image: 'james.png',
                quote: 'ShieldWise\'s fire watch team provided excellent service during our sprinkler system maintenance. Their professionalism and attention to detail were outstanding.'
            },
            {
                name: 'Maria Rodriguez',
                title: 'Project Manager',
                image: 'samanta.png',
                quote: 'We rely on ShieldWise for all our construction site fire watch needs. Their team\'s knowledge of fire safety regulations is impressive.'
            },
            {
                name: 'David Thompson',
                title: 'Property Manager',
                image: 'shahn1.png',
                quote: 'Professional, reliable, and thorough fire watch services. They helped us maintain compliance during our fire system upgrades.'
            }
        ],

        // Contact and Service Information
        emergencyPhone: '+1-800-744-3531',
        serviceEmail: 'firewatch@shieldwisesecurity.com',
        responseTime: 'Within 1-2 hours',
        coverage: 'California Statewide',
        
        // SEO and Marketing Data
        focusKeywords: ['fire watch security', 'fire watch guards', 'construction fire watch', 'fire safety compliance'],
        serviceArea: 'California',
        businessHours: '24/7',
        emergencyAvailable: true
    };

    res.render('services/fire-watch', { 
        serviceData,
        pageUrl: '/services/fire-watch'
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Armed Security Guards California',
        serviceDescription: 'California\'s premier armed security service with BSIS-licensed guards. Military & law enforcement trained professionals. 24/7 emergency response under 15 minutes.',
        serviceKeywords: 'armed security guards California, licensed security services, 24/7 security protection, armed patrol services, executive protection, event security, emergency response, BSIS licensed guards, military trained security, law enforcement security',
        serviceImage: 'armed-security-guards-california.jpg',
        serviceUrl: 'armed-security',
        serviceType: 'armed_security',
        serviceBenefit: 'enhanced protection with armed response capability',
        propertyType: 'high-risk properties and businesses',

        // Pricing Information
        priceRange: { 
            low: 75, 
            mid: 95, 
            high: 125 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Armed Security Guard Services',
        serviceOutput: 'Enhanced Security and Peace of Mind with Armed Protection',
        audienceType: 'Business Owners, Property Managers, Event Organizers, Executives, High-Net-Worth Individuals',

        // Page-specific Meta Data
        pageTitle: 'Armed Security Guards California | 24/7 Licensed Protection | ShieldWise Security',
        pageDescription: 'California\'s premier armed security service with BSIS-licensed guards. Military & law enforcement trained professionals. 24/7 emergency response under 15 minutes. Serving LA, Orange County & San Diego. Free security assessment - Call (800) 744-3531',
        canonicalUrl: 'https://shieldwisesecurity.com/services/armed-security/',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-shield-alt',
                title: 'BSIS Licensed Armed Guards',
                description: 'Fully licensed armed security personnel with current firearms permits and extensive background checks.'
            },
            {
                icon: 'fas fa-user-tie',
                title: 'Military & Law Enforcement Veterans',
                description: 'Professional guards with proven military or law enforcement experience and advanced tactical training.'
            },
            {
                icon: 'fas fa-clock',
                title: '15-Minute Emergency Response',
                description: 'Guaranteed rapid response times under 15 minutes throughout Los Angeles, Orange County, and San Diego.'
            },
            {
                icon: 'fas fa-certificate',
                title: 'Advanced Training Programs',
                description: '80+ hours of specialized training including firearms proficiency, de-escalation, and emergency response protocols.'
            },
            {
                icon: 'fas fa-eye',
                title: 'Threat Assessment & Prevention',
                description: 'Proactive threat identification and prevention strategies tailored to your specific security requirements.'
            },
            {
                icon: 'fas fa-headset',
                title: '24/7 Command Center Support',
                description: 'Round-the-clock coordination and backup support through our professional security operations center.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Security Risk Assessment',
                description: 'Comprehensive evaluation of threats, vulnerabilities, and security requirements specific to your property or event.'
            },
            {
                number: 2,
                title: 'Custom Protection Plan',
                description: 'Development of tailored armed security protocols designed to address identified risks and security objectives.'
            },
            {
                number: 3,
                title: 'Guard Selection & Deployment',
                description: 'Assignment of specifically qualified armed personnel with relevant experience for your security needs.'
            },
            {
                number: 4,
                title: 'Ongoing Security Operations',
                description: 'Continuous armed protection with regular assessments, adjustments, and performance monitoring.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-shield-virus',
                title: 'Maximum Deterrent Effect',
                description: 'Visible armed presence provides the strongest possible deterrent against criminal activity and security threats.'
            },
            {
                icon: 'fas fa-bolt',
                title: 'Immediate Response Capability',
                description: 'Armed guards can respond immediately to threats without waiting for law enforcement backup.'
            },
            {
                icon: 'fas fa-medal',
                title: 'Elite Professional Standards',
                description: 'Highest level of training, certification, and professional conduct in the security industry.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Client Confidence & Peace of Mind',
                description: 'Complete confidence knowing you have the highest level of professional armed protection available.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Proven Track Record',
                description: '99.8% client satisfaction rate with documented success in preventing security incidents.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Coordination',
                description: 'Direct coordination with local law enforcement and emergency services when incidents occur.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Executive & Corporate Protection',
                features: [
                    'Personal Armed Security Details',
                    'Corporate Facility Protection',
                    'VIP Event Security',
                    'Threat Assessment Services'
                ]
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'High-Risk Event Security',
                features: [
                    'Concert & Festival Security',
                    'Political Event Protection',
                    'Celebrity Event Security',
                    'Corporate Gathering Security'
                ]
            },
            {
                icon: 'fas fa-route',
                title: 'Armed Mobile Patrol',
                features: [
                    'Marked Armed Patrol Vehicles',
                    'Random Security Checks',
                    'Alarm Response Services',
                    'Property Perimeter Security'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '500+', label: 'Armed Guards Available' },
            { number: '99.8%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Emergency Response' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'David Thompson',
                title: 'Branch Security Manager',
                image: 'david-thompson.jpg',
                quote: 'ShieldWise Security has provided exceptional armed security services for our downtown Los Angeles bank branch for the past three years. Their guards demonstrate outstanding professionalism.'
            },
            {
                name: 'Sarah Martinez',
                title: 'Event Director',
                image: 'sarah-martinez.jpg',
                quote: 'For high-profile events requiring armed security, ShieldWise is our only choice. Their team\'s expertise and professionalism are unmatched in the industry.'
            },
            {
                name: 'Michael Chen',
                title: 'Corporate Security Director',
                image: 'michael-chen.jpg',
                quote: 'The armed security team from ShieldWise provides our executives with the highest level of protection. Their military backgrounds show in their attention to detail.'
            }
        ]
    };

    res.render('services/armed-security', { 
        serviceData,
        pageUrl: '/services/armed-security'
    });
});

module.exports = router;
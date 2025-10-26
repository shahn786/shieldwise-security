const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Armed Security Guards',
        serviceTitle: 'Armed Security Guards California',
        serviceDescription: 'California\'s premier armed security service with BSIS-licensed guards. Military & law enforcement trained professionals. 24/7 emergency response under 15 minutes.',
        serviceKeywords: 'armed security guards California, licensed security services, 24/7 security protection, armed patrol services, executive protection, event security, emergency response, BSIS licensed guards, military trained security, law enforcement security',
        serviceImage: 'armed-security-guards-california.webp',
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
        metaDescription: 'BSIS-licensed armed security guards in California. Military-trained professionals, 24/7 emergency response under 15 minutes. Serving LA, Orange County & San Diego. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/armed-security/',
        
        // AI-Friendly Summary (2-3 sentences for AI Overviews)
        aiSummary: 'ShieldWise Security provides BSIS-licensed armed security guards throughout California with military and law enforcement-trained professionals. Our armed guards offer enhanced protection for high-risk properties, executive protection, events, and businesses requiring immediate armed response capability with guaranteed 24/7 availability and sub-15-minute emergency response times across Los Angeles, Orange County, San Diego, and statewide.',
        
        // Service Overview (2-4 paragraphs with CA coverage)
        overview: 'ShieldWise Security delivers California\'s most trusted armed security guard services, featuring BSIS-licensed armed personnel with military and law enforcement backgrounds. Our armed guards provide the highest level of protection for businesses, properties, events, and individuals requiring enhanced security with immediate armed response capability. With over 15 years of experience and 500+ armed guards available statewide, we serve clients throughout California including Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all major metropolitan areas.<br><br>Our armed security officers undergo rigorous background checks, 80+ hours of specialized training, and maintain current firearms permits in compliance with California Bureau of Security and Investigative Services (BSIS) regulations. Every armed guard is insured, bonded, and trained in threat assessment, de-escalation techniques, emergency response protocols, and tactical security operations.<br><br>Whether you need armed security for corporate facilities, high-value asset protection, executive protection, special events, or high-risk environments, ShieldWise Security provides customized armed guard solutions with rapid deployment throughout California. Our 24/7 command center ensures immediate response and coordination for any security situation.',

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
            { number: '10+', label: 'Years Experience' }
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
        ],
        
        // Use Cases (3-6 scenarios)
        useCases: [
            {
                icon: 'fas fa-university',
                title: 'Financial Institutions',
                description: 'Armed guards for banks, credit unions, and financial centers requiring high-security protection for cash handling, ATMs, and customer safety.'
            },
            {
                icon: 'fas fa-gem',
                title: 'High-Value Retail',
                description: 'Armed security for jewelry stores, luxury retailers, and high-end boutiques protecting valuable merchandise and preventing theft.'
            },
            {
                icon: 'fas fa-building',
                title: 'Corporate Facilities',
                description: 'Armed protection for corporate headquarters, data centers, and facilities with sensitive assets or high-profile executives.'
            },
            {
                icon: 'fas fa-calendar-check',
                title: 'High-Profile Events',
                description: 'Armed security for concerts, festivals, political events, celebrity appearances, and VIP gatherings requiring enhanced protection.'
            },
            {
                icon: 'fas fa-user-shield',
                title: 'Executive Protection',
                description: 'Personal armed security details for executives, high-net-worth individuals, celebrities, and dignitaries requiring close protection.'
            },
            {
                icon: 'fas fa-warehouse',
                title: 'High-Risk Properties',
                description: 'Armed guards for cannabis facilities, warehouses with valuable inventory, construction sites, and properties in high-crime areas.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise armed security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and Exposed Firearms Permits, ensuring full compliance with state regulations. Our armed personnel undergo extensive background checks including LiveScan fingerprinting, criminal history verification, and employment history validation. Each armed guard completes a minimum of 80 hours of specialized training covering firearms proficiency, use of force laws, threat assessment, de-escalation techniques, emergency medical response, and tactical security operations. Many of our armed guards are military veterans or former law enforcement officers with real-world tactical experience. We maintain comprehensive liability insurance, workers\' compensation coverage, and surety bonds exceeding state requirements, providing our clients with complete peace of mind.',
        
        // Pricing Models (Flexible Engagement Options)
        pricingModels: [
            {
                icon: 'fas fa-clock',
                title: 'Hourly Armed Guards',
                description: 'Flexible hourly armed security guard services starting at $75/hour',
                features: [
                    'BSIS-licensed armed personnel',
                    'Minimum 4-hour shifts',
                    'No long-term contracts required',
                    'Same-day deployment available'
                ]
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Event Security Packages',
                description: 'Customized armed security for events of any size',
                features: [
                    'Event risk assessments',
                    'Scalable armed guard teams',
                    'Crowd management & VIP protection',
                    'Emergency response planning'
                ]
            },
            {
                icon: 'fas fa-handshake',
                title: 'Contract Security Programs',
                description: 'Long-term armed security contracts with dedicated personnel',
                features: [
                    'Dedicated armed guard assignments',
                    'Preferred client pricing',
                    'Custom post orders & protocols',
                    '24/7 supervisor support'
                ]
            }
        ],
        
        // California Cities Coverage
        cities: [
            { name: 'Los Angeles', url: '/los-angeles' },
            { name: 'Orange County', url: '/orange-county/irvine' },
            { name: 'San Diego', url: '/san-diego' },
            { name: 'San Jose', url: '/san-jose' },
            { name: 'San Francisco', url: '/san-francisco' },
            { name: 'Sacramento', url: '/sacramento' },
            { name: 'Fresno', url: '/fresno' },
            { name: 'Long Beach', url: '/long-beach' },
            { name: 'Oakland', url: '/oakland' },
            { name: 'Bakersfield', url: '/bakersfield' },
            { name: 'Anaheim', url: '/anaheim' },
            { name: 'Santa Ana', url: '/santa-ana' },
            { name: 'Riverside', url: '/riverside' },
            { name: 'Irvine', url: '/orange-county/irvine' },
            { name: 'Stockton', url: '/stockton' },
            { name: 'Chula Vista', url: '/chula-vista' }
        ],
        
        // FAQs (5-8 questions specific to armed security)
        faqs: [
            {
                question: 'Are your armed security guards licensed in California?',
                answer: 'Yes, all our armed security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and Exposed Firearms Permits. Every armed guard completes extensive background checks, firearms training, and maintains current licensing as required by California law.'
            },
            {
                question: 'What is the cost of armed security guards in California?',
                answer: 'Armed security guard services typically range from $75-$125 per hour depending on the assignment complexity, location, number of guards required, and shift duration. We offer flexible hourly rates, event packages, and discounted contract pricing for long-term engagements. Contact us for a customized quote.'
            },
            {
                question: 'How quickly can you deploy armed security guards?',
                answer: 'We offer same-day armed security deployment for emergency situations throughout Los Angeles, Orange County, and San Diego with guaranteed response times under 15 minutes. For planned security needs, we can deploy armed guards within 24-48 hours statewide across California.'
            },
            {
                question: 'What training do your armed guards receive?',
                answer: 'Our armed security personnel complete 80+ hours of specialized training including firearms proficiency and qualification, California use of force laws, threat assessment and response, de-escalation techniques, emergency medical response (CPR/First Aid), tactical operations, and security report writing. Many guards have military or law enforcement backgrounds.'
            },
            {
                question: 'Do you provide armed security for events in California?',
                answer: 'Yes, ShieldWise Security provides armed security guard services for concerts, festivals, corporate events, political gatherings, VIP appearances, and high-profile private events throughout California. We conduct event risk assessments and deploy appropriate armed security teams based on venue size, attendance, and threat level.'
            },
            {
                question: 'What types of businesses need armed security guards?',
                answer: 'Armed security is commonly required for banks and financial institutions, jewelry stores and high-value retail, cannabis dispensaries and cultivation facilities, corporate headquarters and data centers, construction sites with valuable equipment, warehouses and distribution centers, and properties in high-crime areas.'
            },
            {
                question: 'Are your armed security services insured and bonded?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance, professional liability coverage, workers\' compensation insurance for all guards, and surety bonds exceeding California state requirements. We provide certificates of insurance to all clients upon request.'
            },
            {
                question: 'Can armed security guards make arrests in California?',
                answer: 'Armed security guards in California have the same arrest authority as private citizens under California Penal Code 837. Guards can detain individuals for felonies committed in their presence and must immediately notify law enforcement. Our guards are trained in proper detention procedures, use of force limitations, and legal liability.'
            }
        ],
        
        // Related Services (Internal Linking)
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security personnel for lower-risk environments',
                url: '/services/unarmed-security'
            },
            {
                name: 'Executive Protection',
                icon: 'fas fa-user-tie',
                description: 'Close protection services for executives and high-profile individuals',
                url: '/services/executive-protection'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Comprehensive security solutions for events of all sizes',
                url: '/services/event-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular armed or unarmed patrol services for properties',
                url: '/services/patrol'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Complete security solutions for businesses and commercial properties',
                url: '/services/commercial-security'
            },
            {
                name: 'Fire Watch Services',
                icon: 'fas fa-fire-extinguisher',
                description: '24/7 fire watch guards for properties with non-functional fire systems',
                url: '/services/fire-watch'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/armed-security'
    });
});

module.exports = router;
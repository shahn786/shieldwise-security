const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Unarmed Security Guards',
        serviceTitle: 'Professional Unarmed Security Guards California',
        serviceDescription: 'Professional unarmed security guards in California providing effective deterrence, customer service, and peace of mind for businesses and properties statewide.',
        serviceKeywords: 'unarmed security guards California, professional security services, security officers, retail security, property security, commercial security guards, licensed security personnel, customer service security',
        serviceImage: 'unarmed-security-guards-california.webp',
        serviceUrl: 'unarmed-security',
        serviceType: 'unarmed_security',
        serviceBenefit: 'professional security presence with excellent customer service',
        propertyType: 'businesses, retail, offices, and residential properties',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 50, 
            high: 75 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Unarmed Security Officer Services',
        serviceOutput: 'Professional Security Presence and Customer Service',
        audienceType: 'Business Owners, Property Managers, Retail Managers, Office Administrators, HOAs',

        // Page-specific Meta Data
        pageTitle: 'Unarmed Security Guards California | Professional Officers | ShieldWise Security',
        metaDescription: 'BSIS-licensed unarmed security guards in California. Professional, customer-focused officers for retail, offices, events & properties. Serving statewide. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/unarmed-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional BSIS-licensed unarmed security guards throughout California for businesses, retail stores, office buildings, residential properties, and events. Our unarmed security officers offer cost-effective protection with excellent customer service, access control, monitoring, and incident response without the complexity of armed personnel, serving clients in Los Angeles, Orange County, San Diego, and statewide.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most professional unarmed security guard services, providing cost-effective protection with exceptional customer service for businesses, retail stores, office buildings, residential communities, and properties throughout the state. Our BSIS-licensed unarmed security officers combine professional security expertise with approachable customer service, creating a safe environment while maintaining a welcoming atmosphere for employees, residents, and visitors.<br><br>Our unarmed security guards undergo comprehensive background checks, professional training in access control, surveillance, emergency response, de-escalation techniques, and customer service excellence. Every officer is licensed, insured, and trained to handle security responsibilities professionally while providing outstanding service to your organization.<br><br>Whether you need unarmed security for retail loss prevention, office building security, residential community protection, event security, or general property protection, ShieldWise Security provides customized unarmed guard solutions with flexible scheduling and rapid deployment across Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California cities.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-store',
                title: 'Retail Security',
                description: 'Unarmed security for stores, shopping centers, and retail environments providing loss prevention, customer assistance, and theft deterrence.'
            },
            {
                icon: 'fas fa-building',
                title: 'Office Buildings',
                description: 'Professional security officers for corporate offices, business parks, and commercial buildings managing access control and visitor screening.'
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Communities',
                description: 'Unarmed guards for apartments, condos, gated communities, and HOAs ensuring resident safety and property protection.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Educational Facilities',
                description: 'Security officers for schools, colleges, and educational campuses creating safe learning environments with friendly, professional presence.'
            },
            {
                icon: 'fas fa-hospital',
                title: 'Healthcare Facilities',
                description: 'Unarmed security for medical offices, clinics, and healthcare facilities ensuring patient safety and staff protection.'
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Events & Venues',
                description: 'Professional event security for conferences, trade shows, corporate events, and gatherings requiring crowd management and access control.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise unarmed security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards, ensuring full compliance with state licensing requirements. Our unarmed security officers complete extensive background checks including LiveScan fingerprinting, criminal history verification, employment verification, and reference checks. Each guard receives professional training in access control procedures, surveillance and monitoring techniques, emergency response protocols, fire safety, medical first aid, conflict de-escalation, customer service excellence, and incident documentation. We maintain comprehensive general liability insurance, workers\' compensation coverage for all guards, and surety bonds as required by California law, providing our clients with complete protection and peace of mind.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-clock',
                title: 'Hourly Security Officers',
                description: 'Flexible hourly unarmed security starting at $35/hour',
                features: [
                    'BSIS-licensed professional officers',
                    'Minimum 4-hour shifts',
                    'No long-term contracts',
                    'Same-day availability'
                ]
            },
            {
                icon: 'fas fa-calendar-week',
                title: 'Part-Time Coverage',
                description: 'Scheduled part-time security for specific days/times',
                features: [
                    'Consistent officer assignments',
                    'Custom scheduling (days/evenings/weekends)',
                    'Perfect for retail and offices',
                    'Flexible month-to-month terms'
                ]
            },
            {
                icon: 'fas fa-handshake',
                title: 'Full-Time Security Programs',
                description: 'Dedicated full-time officers with preferred pricing',
                features: [
                    'Dedicated officer assignments',
                    'Reduced rates for long-term contracts',
                    'Site-specific training included',
                    '24/7 supervisor support'
                ]
            }
        ],
        
        // California Cities
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
        
        // FAQs
        faqs: [
            {
                question: 'What is the difference between armed and unarmed security guards?',
                answer: 'Unarmed security guards provide professional security services without firearms, focusing on deterrence through visible presence, access control, monitoring, customer service, and incident reporting. They are ideal for lower-risk environments like retail stores, office buildings, residential properties, and events where a professional, approachable security presence is needed without the complexity and cost of armed personnel.'
            },
            {
                question: 'How much do unarmed security guards cost in California?',
                answer: 'Unarmed security guard services in California typically range from $35-$75 per hour depending on location, shift type (day/night/weekend), number of guards needed, and contract length. Part-time and full-time contract programs offer discounted rates. Contact us for a customized quote based on your specific security needs.'
            },
            {
                question: 'Are your unarmed security guards licensed?',
                answer: 'Yes, all ShieldWise unarmed security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards as required by state law. Every guard completes background checks, professional training, and maintains current licensing and insurance.'
            },
            {
                question: 'What services do unarmed security guards provide?',
                answer: 'Unarmed security guards provide access control and visitor screening, surveillance and property monitoring, regular patrols (foot and vehicle), incident response and reporting, customer service and assistance, loss prevention and theft deterrence, emergency coordination with law enforcement/fire, parking enforcement, and detailed activity logs.'
            },
            {
                question: 'Can unarmed security guards detain or arrest people?',
                answer: 'Unarmed security guards in California have the same citizen\'s arrest authority as any private citizen under California Penal Code 837. They can detain individuals for felonies committed in their presence but must immediately contact law enforcement. Our guards are trained in proper detention procedures, legal limitations, and de-escalation techniques to handle situations professionally and lawfully.'
            },
            {
                question: 'Do you provide unarmed security for events in California?',
                answer: 'Yes, ShieldWise Security provides unarmed security guard services for corporate events, conferences, trade shows, weddings, private parties, community events, and gatherings throughout California. We offer event planning consultation, customized security staffing, crowd management, access control, and professional service.'
            },
            {
                question: 'How quickly can you deploy unarmed security guards?',
                answer: 'We offer same-day unarmed security deployment for emergency needs in Los Angeles, Orange County, and San Diego areas. For scheduled security services, we can typically deploy guards within 24-48 hours statewide across California, depending on the number of officers needed and specific requirements.'
            },
            {
                question: 'What industries commonly use unarmed security guards?',
                answer: 'Unarmed security is commonly used in retail stores and shopping centers, office buildings and business parks, residential apartments and condos, schools and educational facilities, healthcare clinics and medical offices, warehouses and distribution centers, hotels and hospitality, manufacturing facilities, corporate events and conferences, and government buildings.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed security personnel for high-risk environments and enhanced protection',
                url: '/services/armed-security'
            },
            {
                name: 'Retail Security',
                icon: 'fas fa-shopping-cart',
                description: 'Specialized loss prevention and security services for retail stores',
                url: '/services/shopping-center-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Professional security solutions for events, conferences, and gatherings',
                url: '/services/event-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for properties and business complexes',
                url: '/services/patrol'
            },
            {
                name: 'Apartment Security',
                icon: 'fas fa-building',
                description: 'Residential community security for apartments and condos',
                url: '/services/apartment-security'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-briefcase',
                description: 'Complete security solutions for businesses and commercial properties',
                url: '/services/commercial-security'
            }
        ],

        // Features (existing)
        features: [
            {
                icon: 'fas fa-eye',
                title: 'Surveillance & Monitoring',
                description: 'Professional monitoring of premises using CCTV systems, regular patrols, and real-time threat assessment.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Access Control Management',
                description: 'Entry/exit control, visitor verification, ID checking, and authorized personnel management.'
            },
            {
                icon: 'fas fa-users',
                title: 'Customer Service Excellence',
                description: 'Friendly, professional interaction with visitors while maintaining security protocols.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Emergency Response',
                description: 'Rapid incident response, emergency service coordination, and crisis management.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'De-escalation Techniques',
                description: 'Advanced conflict resolution to manage situations peacefully without physical intervention.'
            },
            {
                icon: 'fas fa-clipboard-list',
                title: 'Incident Documentation',
                description: 'Detailed reporting, accurate logs, and comprehensive incident documentation.'
            }
        ],

        // Process Steps (existing)
        processSteps: [
            {
                number: 1,
                title: 'Security Assessment',
                description: 'Comprehensive evaluation of facility security needs and operational requirements.'
            },
            {
                number: 2,
                title: 'Officer Selection',
                description: 'Careful selection of trained, licensed officers matching your specific environment.'
            },
            {
                number: 3,
                title: 'Custom Training',
                description: 'Site-specific training on policies, procedures, and unique security requirements.'
            },
            {
                number: 4,
                title: 'Deployment & Support',
                description: 'Professional officer deployment with ongoing supervision and quality assurance.'
            }
        ],

        // Benefits (existing)
        benefits: [
            {
                icon: 'fas fa-dollar-sign',
                title: 'Cost-Effective Solution',
                description: 'Professional security at lower cost than armed guards while maintaining effectiveness.'
            },
            {
                icon: 'fas fa-smile',
                title: 'Approachable Presence',
                description: 'Friendly, professional officers creating safe yet welcoming environments.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Professional Deterrence',
                description: 'Visible security presence effectively deters criminal activity and misconduct.'
            },
            {
                icon: 'fas fa-clock',
                title: 'Flexible Scheduling',
                description: 'Custom coverage options from hourly to 24/7 with part-time or full-time officers.'
            },
            {
                icon: 'fas fa-certificate',
                title: 'Licensed & Insured',
                description: 'All officers BSIS-licensed with full insurance and workers\' compensation coverage.'
            },
            {
                icon: 'fas fa-headset',
                title: '24/7 Support',
                description: 'Round-the-clock supervisor support and emergency coordination.'
            }
        ],

        // Statistics (existing)
        statistics: [
            { number: '800+', label: 'Security Officers' },
            { number: '99.5%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials (existing)
        testimonials: [
            {
                name: 'Jennifer Martinez',
                title: 'Retail Manager',
                image: 'jennifer-martinez.jpg',
                quote: 'ShieldWise unarmed security guards have significantly reduced theft and created a safer shopping environment. Their professional yet friendly approach is perfect for our store.'
            },
            {
                name: 'Robert Kim',
                title: 'Property Manager',
                image: 'robert-kim.jpg',
                quote: 'The unarmed security officers provide excellent service to our residential community. Residents feel safe and appreciate the professional, approachable security presence.'
            },
            {
                name: 'Lisa Chen',
                title: 'Office Administrator',
                image: 'lisa-chen.jpg',
                quote: 'Our office building security has improved dramatically. The guards are professional, courteous, and handle access control and visitor management perfectly.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/unarmed-security'
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Construction Security',
        serviceTitle: 'Construction Site Security Guards California',
        serviceDescription: 'Professional construction site security guards in California protecting equipment, materials, and job sites from theft, vandalism, and trespassing with 24/7 armed and unarmed security solutions.',
        serviceKeywords: 'construction site security California, job site security guards, construction security services, equipment protection, construction theft prevention, site security patrols, development security',
        serviceImage: 'construction-site-security-california.webp',
        serviceUrl: 'construction-security',
        serviceType: 'construction_security',
        serviceBenefit: 'comprehensive job site protection and theft prevention',
        propertyType: 'construction sites, development projects, and job sites',

        // Pricing Information
        priceRange: { 
            low: 40, 
            mid: 60, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Construction Site Security Services',
        serviceOutput: 'Protected Job Sites and Equipment Security',
        audienceType: 'General Contractors, Developers, Construction Managers, Project Managers, Property Owners',

        // Page-specific Meta Data
        pageTitle: 'Construction Site Security Guards California | Job Site Protection | ShieldWise Security',
        metaDescription: 'Professional construction site security guards in California. 24/7 job site protection, equipment security, theft prevention. Licensed guards. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/construction-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional construction site security guard services throughout California protecting job sites, equipment, materials, and development projects from theft, vandalism, and trespassing. Our BSIS-licensed armed and unarmed security guards offer 24/7 site protection, access control, perimeter security, equipment monitoring, and fire watch services for construction projects of all sizes, serving contractors and developers in Los Angeles, Orange County, San Diego, and statewide with specialized construction security expertise.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most comprehensive construction site security services, protecting job sites, equipment, building materials, and development projects from the significant threats of theft, vandalism, trespassing, and liability throughout all construction phases. Construction sites face unique security challenges with valuable equipment, copper and material theft, unauthorized access, safety hazards, and liability concerns requiring specialized security solutions and trained personnel who understand construction environments.<br><br>Our construction security guards are BSIS-licensed professionals with extensive training in construction site security operations, equipment and material identification, OSHA safety awareness and hazard recognition, trespassing and liability prevention, fire watch and fire safety compliance, access control for contractors and workers, incident documentation and reporting, and emergency response coordination. Guards conduct regular perimeter patrols, monitor access points, document contractor activity, and maintain detailed security logs for project managers and insurance compliance.<br><br>Whether you need overnight security for residential developments, 24/7 protection for commercial construction projects, equipment security for infrastructure work, fire watch services during construction, or security during all construction phases from groundbreaking to completion, ShieldWise Security provides customized construction security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California construction markets. Our rapid deployment ensures immediate protection for emergency needs and project startups.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-building',
                title: 'Commercial Construction',
                description: 'Security for office buildings, retail centers, commercial developments, and mixed-use construction projects.'
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Development',
                description: 'Protection for housing developments, apartment construction, subdivision projects, and residential building sites.'
            },
            {
                icon: 'fas fa-road',
                title: 'Infrastructure Projects',
                description: 'Security for roads, bridges, utilities, transportation projects, and civil engineering construction sites.'
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Industrial Construction',
                description: 'Job site security for warehouses, manufacturing facilities, distribution centers, and industrial developments.'
            },
            {
                icon: 'fas fa-tools',
                title: 'Equipment & Material Protection',
                description: 'Dedicated security for high-value equipment, copper, lumber, tools, and construction materials vulnerable to theft.'
            },
            {
                icon: 'fas fa-fire-extinguisher',
                title: 'Construction Fire Watch',
                description: 'Fire watch services during construction when fire protection systems are impaired or under installation.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise construction security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards, with armed guards maintaining Exposed Firearms Permits when required for high-risk sites. Our construction site security personnel undergo comprehensive background checks including LiveScan fingerprinting, criminal history verification, and employment verification. Each guard receives specialized training in construction site security best practices, OSHA safety awareness and hazard recognition, equipment and material identification for theft prevention, trespassing laws and contractor verification, fire watch requirements and NFPA compliance, incident documentation and project reporting, and emergency response coordination with fire/police. Guards are trained to work safely around active construction operations, understand construction schedules and phasing, and coordinate professionally with contractors, project managers, and workers. We maintain comprehensive general liability insurance, workers\' compensation coverage, and provide detailed security reports, shift logs, and incident documentation for project managers, owners, and insurance carriers.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-moon',
                title: 'Overnight Security',
                description: 'After-hours site protection starting at $40-$60/hour',
                features: [
                    'Evening and overnight coverage',
                    'Perimeter patrols and monitoring',
                    'Equipment and material security',
                    'Perfect for active job sites'
                ]
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Site Security',
                description: 'Round-the-clock protection for construction projects',
                features: [
                    'Continuous day and night coverage',
                    'Access control and contractor verification',
                    'Multiple shifts with guard rotation',
                    'Comprehensive security presence'
                ]
            },
            {
                icon: 'fas fa-handshake',
                title: 'Project-Length Contracts',
                description: 'Long-term security from groundbreaking to completion',
                features: [
                    'Dedicated guards throughout construction',
                    'Preferred contract pricing',
                    'Scalable coverage as project progresses',
                    'Project-specific training and protocols'
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
                question: 'How much does construction site security cost in California?',
                answer: 'Construction site security in California typically costs $40-$85 per hour per guard, depending on whether guards are armed or unarmed, coverage hours (overnight vs 24/7), site location and risk level, and contract length. Unarmed overnight security starts at $40-$60/hour, while armed 24/7 coverage costs $65-$85/hour. Project-length contracts receive discounted rates. Most construction projects budget $5,000-$20,000 monthly for professional site security.'
            },
            {
                question: 'What are the biggest security threats to construction sites?',
                answer: 'Construction sites face equipment theft (excavators, generators, tools), material theft (copper wiring, lumber, appliances, fixtures), metal theft (copper, brass, aluminum, steel), vandalism and property damage, trespassing and liability risks, unauthorized access, arson and fire hazards, and OSHA violations. Professional security guards deter theft, prevent trespassing, and protect against these common construction site threats.'
            },
            {
                question: 'Do you provide 24/7 construction site security?',
                answer: 'Yes, ShieldWise Security provides 24/7 continuous construction site security with multiple guards rotating through day, evening, and overnight shifts. Round-the-clock coverage ensures constant protection during active construction hours and after-hours when most theft and vandalism occur. We also offer flexible overnight-only or custom-hour security based on project needs and budgets.'
            },
            {
                question: 'Can construction security guards prevent copper theft?',
                answer: 'Yes, construction security guards significantly reduce copper and metal theft through visible deterrence, regular patrols of storage areas and building interiors, monitoring of access points and delivery areas, contractor verification and documentation, and immediate response to suspicious activity. Copper theft is one of the most common construction crimes, and professional security effectively prevents these costly losses.'
            },
            {
                question: 'Do you provide fire watch during construction?',
                answer: 'Yes, ShieldWise Security provides fire watch services during construction when fire protection systems are under installation, impaired, or not yet functional. Our guards conduct NFPA-compliant fire watch patrols, monitor for fire hazards, ensure egress routes remain clear, and provide immediate fire emergency response. Fire watch is often required by building codes during construction phases.'
            },
            {
                question: 'How quickly can you deploy construction site security?',
                answer: 'We can deploy construction site security guards within 24-48 hours for most California locations, with same-day emergency deployment available in Los Angeles, Orange County, and San Diego for critical situations. For planned construction projects, we recommend contacting us 1-2 weeks before project start to arrange guards, conduct site assessments, and establish security protocols.'
            },
            {
                question: 'What do construction security guards do?',
                answer: 'Construction security guards perform perimeter patrols and access control, equipment and material monitoring, contractor verification and sign-in/out logs, trespassing prevention and removal, incident response and documentation, coordination with police/fire for emergencies, fire watch patrols if required, safety hazard reporting, and detailed shift reports for project managers. Guards adapt to construction schedules and project phases.'
            },
            {
                question: 'Are construction security guards insured?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance, workers\' compensation coverage for all guards, professional liability insurance, and contractors\' insurance for construction environments. We provide certificates of insurance to general contractors, developers, and property owners for contract compliance and builder\'s risk insurance requirements.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Fire Watch Services',
                icon: 'fas fa-fire-extinguisher',
                description: 'Fire watch guards for construction sites with impaired fire systems',
                url: '/services/fire-watch'
            },
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for construction site protection',
                url: '/services/unarmed-security'
            },
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed guards for high-risk construction sites and equipment protection',
                url: '/services/armed-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for multiple construction sites',
                url: '/services/patrol'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Security for completed commercial construction projects',
                url: '/services/commercial-security'
            },
            {
                name: 'Warehouse Security',
                icon: 'fas fa-warehouse',
                description: 'Security for completed industrial and warehouse facilities',
                url: '/services/warehouse-security'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-shield-alt',
                title: 'Perimeter Security',
                description: 'Regular patrols of site perimeters, fencing, and access points to prevent unauthorized entry.'
            },
            {
                icon: 'fas fa-tools',
                title: 'Equipment Protection',
                description: 'Monitoring and protection of valuable construction equipment, machinery, and tools.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Access Control',
                description: 'Contractor verification, visitor management, and documentation of all site access.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Trespassing Prevention',
                description: 'Detection and removal of unauthorized individuals, vandals, and trespassers.'
            },
            {
                icon: 'fas fa-clipboard-list',
                title: 'Incident Documentation',
                description: 'Detailed shift reports, security logs, and incident documentation for project management.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Emergency Coordination',
                description: 'Rapid response and coordination with police, fire, and emergency services.'
            }
        ],

        // Statistics
        statistics: [
            { number: '1000+', label: 'Sites Secured' },
            { number: '95%', label: 'Theft Reduction' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'John Williams',
                title: 'General Contractor',
                image: 'john-williams.jpg',
                quote: 'ShieldWise security eliminated equipment theft at our construction sites. Their guards understand construction operations and provide excellent protection without disrupting our work.'
            },
            {
                name: 'Angela Martinez',
                title: 'Development Manager',
                image: 'angela-martinez.jpg',
                quote: 'We use ShieldWise for all our residential development projects. Professional, reliable security from groundbreaking to completion. Zero theft incidents in three years.'
            },
            {
                name: 'Robert Chen',
                title: 'Project Manager',
                image: 'robert-chen.jpg',
                quote: 'The construction security team prevented over $150,000 in copper theft on our commercial project. Best investment we made - professional, punctual, and effective.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/construction-security'
    });
});

module.exports = router;

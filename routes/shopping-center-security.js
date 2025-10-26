const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Shopping Center Security',
        serviceTitle: 'Shopping Center Security Guards California',
        serviceDescription: 'Professional shopping center and retail security guards in California for malls, shopping centers, retail complexes providing loss prevention, customer safety, and property protection.',
        serviceKeywords: 'shopping center security California, retail security guards, mall security services, shopping complex security, loss prevention officers, retail theft prevention, store security guards',
        serviceImage: 'shopping-center-security-california.webp',
        serviceUrl: 'shopping-center-security',
        serviceType: 'shopping_center_security',
        serviceBenefit: 'safe shopping environments with effective loss prevention',
        propertyType: 'shopping centers, malls, retail complexes, and stores',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 50, 
            high: 70 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Retail Security Services',
        serviceOutput: 'Safe Shopping Experiences and Loss Prevention',
        audienceType: 'Shopping Center Managers, Retail Operators, Property Managers, Store Owners, Mall Directors',

        // Page-specific Meta Data
        pageTitle: 'Shopping Center Security Guards California | Retail Security | ShieldWise Security',
        metaDescription: 'Professional shopping center & retail security guards in California. Loss prevention, mall security, customer safety. Licensed officers statewide. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/shopping-center-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional shopping center and retail security guard services throughout California for malls, shopping complexes, retail stores, and commercial retail properties. Our BSIS-licensed security officers offer loss prevention, theft deterrence, customer safety, parking security, emergency response, and professional customer service, serving retail clients in Los Angeles, Orange County, San Diego, and statewide with expertise in retail security operations and loss prevention techniques.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most effective shopping center and retail security services, protecting malls, shopping complexes, retail stores, and commercial retail properties from theft, vandalism, and safety incidents while creating welcoming shopping environments for customers. Retail properties face unique security challenges including shoplifting, organized retail theft, parking lot crimes, customer conflicts, loitering, and the need to balance effective loss prevention with positive customer experiences that encourage shopping and return visits.<br><br>Our retail security guards are BSIS-licensed professionals with specialized training in retail security operations and loss prevention techniques, shoplifting detection and theft prevention, customer service in retail environments, conflict resolution and de-escalation, organized retail crime recognition, parking lot and vehicle security, emergency response and crowd management, and professional representation of retail brands. Officers understand retail operations and are trained to provide visible deterrence while maintaining the friendly, approachable presence shoppers expect.<br><br>Whether you need security for large regional malls, community shopping centers, strip malls and retail plazas, individual retail stores, luxury boutiques, or outlet shopping complexes, ShieldWise Security provides customized retail security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California retail markets. Our retail security programs reduce shrinkage, prevent theft, and create safe shopping experiences.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-shopping-bag',
                title: 'Regional Shopping Malls',
                description: 'Comprehensive security for large enclosed malls with multiple tenants, food courts, and high customer traffic.'
            },
            {
                icon: 'fas fa-store',
                title: 'Community Shopping Centers',
                description: 'Security for strip malls, retail plazas, and community shopping centers with multiple stores and parking areas.'
            },
            {
                icon: 'fas fa-gem',
                title: 'Luxury Retail & Boutiques',
                description: 'Specialized security for high-end retail stores, luxury boutiques, jewelry stores, and designer shops.'
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Big Box Retail',
                description: 'Security for large format retailers, department stores, and warehouse stores requiring loss prevention.'
            },
            {
                icon: 'fas fa-parking',
                title: 'Parking & Common Areas',
                description: 'Parking lot patrols, vehicle security, and monitoring of common areas and public spaces.'
            },
            {
                icon: 'fas fa-utensils',
                title: 'Food Courts & Entertainment',
                description: 'Security for food courts, restaurants, movie theaters, and entertainment venues within shopping centers.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise retail security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and complete comprehensive background checks including LiveScan fingerprinting, criminal history verification, and employment verification. Our shopping center security officers receive specialized training in retail security operations and loss prevention, shoplifting detection and theft prevention techniques, customer service excellence in retail environments, conflict resolution and de-escalation, organized retail crime (ORC) awareness, surveillance and monitoring techniques, trespassing enforcement and loitering prevention, emergency response and evacuation procedures, and professional interaction with customers and tenants. Officers are trained to balance effective security with positive customer service that encourages shopping and repeat visits. We maintain comprehensive general liability insurance, workers\' compensation coverage, and provide detailed shift reports, incident logs, and theft prevention statistics for retail management.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-user-shield',
                title: 'Store Security Officers',
                description: 'Individual store security starting at $35-$50/hour',
                features: [
                    'Loss prevention and theft deterrence',
                    'Customer service and assistance',
                    'Shoplifting detection and response',
                    'Flexible scheduling for retail hours'
                ]
            },
            {
                icon: 'fas fa-walking',
                title: 'Shopping Center Patrols',
                description: 'Mobile security patrols for shopping complexes',
                features: [
                    'Parking lot and common area patrols',
                    'Multiple tenant monitoring',
                    'Vehicle and property security',
                    'Incident response and reporting'
                ]
            },
            {
                icon: 'fas fa-building',
                title: 'Full Mall Security Programs',
                description: 'Comprehensive security for shopping centers and malls',
                features: [
                    'Multiple officers and supervisors',
                    'Control room monitoring',
                    'Tenant coordination',
                    'Preferred contract pricing'
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
                question: 'How much does shopping center security cost in California?',
                answer: 'Shopping center and retail security services in California typically cost $35-$70 per hour per security officer, depending on whether guards are stationed (store/entrance) or mobile (patrol), mall size and complexity, shift type and hours, and contract length. Individual store security starts at $35-$50/hour, while full mall security programs with multiple officers cost more. Most retail properties budget $4,000-$12,000 monthly for professional security coverage.'
            },
            {
                question: 'What is the difference between loss prevention and security guards?',
                answer: 'Loss prevention officers focus specifically on theft detection, shoplifting prevention, and internal theft monitoring within stores, often working in plain clothes. Security guards provide broader property protection including parking security, customer safety, emergency response, access control, and general security presence, typically in uniform. Many retail security officers perform both loss prevention and general security functions.'
            },
            {
                question: 'Can shopping center security guards detain shoplifters?',
                answer: 'Yes, retail security guards can detain shoplifters under California shopkeeper\'s privilege laws (Penal Code 490.5) when they have probable cause that theft occurred. Guards must witness the shoplifting, maintain continuous observation, make the detention promptly, use reasonable force, and immediately contact law enforcement. Our guards are trained in proper shoplifting detention procedures, legal limitations, and evidence preservation for prosecution.'
            },
            {
                question: 'Do you provide security for individual retail stores?',
                answer: 'Yes, ShieldWise Security provides security guards for individual retail stores, boutiques, supermarkets, department stores, and specialty retailers throughout California. Store security services include loss prevention and shoplifting deterrence, customer assistance and service, fitting room monitoring, emergency response, theft detection and apprehension, and professional security presence. We serve independent retailers and national chains.'
            },
            {
                question: 'What are the most common retail security threats?',
                answer: 'Retail properties commonly face shoplifting and organized retail theft, employee theft and internal shrinkage, return fraud and gift card fraud, parking lot vehicle break-ins and theft, customer conflicts and disturbances, vandalism and property damage, robbery and armed theft, and loitering and trespassing. Professional security guards effectively prevent and manage these common retail security challenges.'
            },
            {
                question: 'How does retail security reduce shoplifting?',
                answer: 'Professional retail security reduces shoplifting through visible deterrence (uniformed presence discourages theft), active monitoring and surveillance of customers and merchandise, shoplifting detection and rapid response, customer service interactions that reduce opportunity, coordination with loss prevention systems, prosecution of shoplifters as deterrent, and documentation of theft trends for targeted prevention strategies.'
            },
            {
                question: 'Do shopping centers need security for special events?',
                answer: 'Yes, shopping centers often require enhanced security for special events like holiday shopping seasons, grand openings, celebrity appearances, seasonal sales (Black Friday), community events and entertainment, and promotional activities. Event security manages increased crowds, prevents theft during busy periods, provides customer safety, controls access, and ensures smooth operations during high-traffic events.'
            },
            {
                question: 'How quickly can you provide retail security guards?',
                answer: 'ShieldWise Security can deploy retail security guards within 24-48 hours for most California shopping centers and stores, with same-day deployment available in Los Angeles, Orange County, and San Diego for emergency needs. For planned retail security programs, we recommend 1 week advance notice to provide retail-specific training and property orientation.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for retail stores and shopping centers',
                url: '/services/unarmed-security'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Security for commercial retail properties and business complexes',
                url: '/services/commercial-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security for retail events, grand openings, and promotional activities',
                url: '/services/event-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for parking lots and retail property',
                url: '/services/patrol'
            },
            {
                name: 'Armed Security',
                icon: 'fas fa-shield-alt',
                description: 'Armed security for high-value retail and jewelry stores',
                url: '/services/armed-security'
            },
            {
                name: 'Hotel Security',
                icon: 'fas fa-hotel',
                description: 'Security for hotel retail shops and boutiques',
                url: '/services/hotel-security'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-shield-alt',
                title: 'Loss Prevention',
                description: 'Shoplifting detection, theft prevention, and inventory shrinkage reduction.'
            },
            {
                icon: 'fas fa-users',
                title: 'Customer Service',
                description: 'Friendly security presence providing customer assistance and information.'
            },
            {
                icon: 'fas fa-walking',
                title: 'Property Patrols',
                description: 'Regular patrols of stores, common areas, food courts, and parking lots.'
            },
            {
                icon: 'fas fa-parking',
                title: 'Parking Security',
                description: 'Vehicle monitoring, parking enforcement, and customer vehicle protection.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Conflict Resolution',
                description: 'Professional de-escalation of customer conflicts and disturbances.'
            },
            {
                icon: 'fas fa-eye',
                title: 'Surveillance Monitoring',
                description: 'CCTV monitoring, suspicious activity detection, and security awareness.'
            }
        ],

        // Statistics
        statistics: [
            { number: '200+', label: 'Retail Locations' },
            { number: '40%', label: 'Average Theft Reduction' },
            { number: '24/7', label: 'Availability' },
            { number: '10+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Brian Thompson',
                title: 'Shopping Center Manager',
                image: 'brian-thompson.jpg',
                quote: 'ShieldWise security transformed our mall\'s safety and reduced shoplifting significantly. Their officers are professional, vigilant, and excellent with customer service. Highly recommended.'
            },
            {
                name: 'Diana Rodriguez',
                title: 'Retail Store Owner',
                image: 'diana-rodriguez.jpg',
                quote: 'Since adding ShieldWise security to our store, shrinkage has dropped by 60%. The guards are friendly to customers while effectively deterring theft. Worth every penny.'
            },
            {
                name: 'Kevin Park',
                title: 'Property Manager',
                image: 'kevin-park.jpg',
                quote: 'Our retail plaza security has improved dramatically. The guards patrol parking lots, prevent loitering, and create a safe shopping environment. Tenants and customers feel much safer.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/shopping-center-security'
    });
});

module.exports = router;

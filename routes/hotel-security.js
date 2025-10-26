const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Hotel Security',
        serviceTitle: 'Hotel Security Guards California',
        serviceDescription: 'Professional hotel security guards in California for hotels, resorts, motels, and hospitality properties providing guest safety, property protection, and exceptional customer service.',
        serviceKeywords: 'hotel security guards California, resort security services, hospitality security, hotel property protection, guest safety officers, lodging security, motel security guards',
        serviceImage: 'hotel-security-california.webp',
        serviceUrl: 'hotel-security',
        serviceType: 'hotel_security',
        serviceBenefit: 'safe hospitality environments with excellent guest service',
        propertyType: 'hotels, resorts, motels, and hospitality properties',

        // Pricing Information
        priceRange: { 
            low: 35, 
            mid: 55, 
            high: 75 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Hospitality Security Services',
        serviceOutput: 'Safe, Welcoming Guest Experiences',
        audienceType: 'Hotel Managers, Resort Operators, Property Managers, Hospitality Directors',

        // Page-specific Meta Data
        pageTitle: 'Hotel Security Guards California | Resort & Hospitality Security | ShieldWise Security',
        metaDescription: 'Professional hotel security guards in California. Guest safety, property protection, hospitality security services for hotels & resorts. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/hotel-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional hotel and resort security guard services throughout California for hotels, motels, resorts, and hospitality properties. Our BSIS-licensed security officers offer guest safety, property protection, parking security, loss prevention, emergency response, and exceptional customer service, serving hospitality clients in Los Angeles, Orange County, San Diego, and statewide with officers trained in hospitality environment operations and guest relations.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most professional hotel and hospitality security services, protecting guests, staff, property, and brand reputation for hotels, resorts, motels, and lodging properties throughout the state. Hospitality security requires a unique balance of effective protection with warm, welcoming customer service that enhances rather than detracts from the guest experience. Our security officers understand they are part of the hospitality team, representing your property\'s commitment to guest safety and exceptional service.<br><br>Our hotel security guards are BSIS-licensed professionals with specialized training in hospitality security operations and guest service, hotel property protection and loss prevention, guest conflict resolution and de-escalation, parking and vehicle security management, emergency response and evacuation procedures, intoxication management and alcohol-related incidents, trespassing prevention and unauthorized guest removal, and professional customer service excellence. Officers are trained to provide security services with discretion, professionalism, and the hospitality mindset your guests expect.<br><br>Whether you need lobby security for luxury hotels, overnight patrol for extended-stay properties, special event security for hotel conferences and weddings, pool and amenity area security, or comprehensive security for resort complexes, ShieldWise Security provides customized hospitality security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California tourism and business travel destinations.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-hotel',
                title: 'Full-Service Hotels',
                description: 'Security for full-service hotels, business hotels, and luxury properties with lobby security and property patrols.'
            },
            {
                icon: 'fas fa-umbrella-beach',
                title: 'Resorts & Destination Properties',
                description: 'Comprehensive security for resorts, destination hotels, and vacation properties with amenities and recreation areas.'
            },
            {
                icon: 'fas fa-bed',
                title: 'Extended Stay & Budget Hotels',
                description: 'Security for extended-stay hotels, motels, and budget lodging properties requiring property protection and guest safety.'
            },
            {
                icon: 'fas fa-swimming-pool',
                title: 'Pool & Amenity Areas',
                description: 'Security for hotel pools, fitness centers, spas, and guest amenity areas monitoring safety and access.'
            },
            {
                icon: 'fas fa-parking',
                title: 'Hotel Parking & Valet',
                description: 'Parking lot and garage security, vehicle monitoring, valet operations support, and guest vehicle protection.'
            },
            {
                icon: 'fas fa-glass-cheers',
                title: 'Hotel Events & Functions',
                description: 'Security for weddings, conferences, banquets, and special events hosted at hotel venues and ballrooms.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise hotel security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and complete comprehensive background checks including LiveScan fingerprinting, criminal history verification, and employment verification. Our hospitality security officers receive specialized training in hotel security operations and hospitality service, guest relations and exceptional customer service, conflict resolution and de-escalation, loss prevention and theft deterrence, alcohol-related incident management, trespassing laws and unauthorized guest removal, emergency response and evacuation procedures, and property-specific protocols and policies. Officers understand the hospitality industry and are trained to blend security effectiveness with the warm, welcoming service hotel guests expect. We maintain comprehensive general liability insurance, workers\' compensation coverage, and provide detailed shift reports, incident logs, and management communications tailored to hospitality operations.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-door-open',
                title: 'Lobby Security',
                description: 'Stationed security officers at hotel lobbies starting at $35-$55/hour',
                features: [
                    'Guest assistance and concierge support',
                    'Access control and guest verification',
                    'Lobby monitoring and presence',
                    'Professional hospitality service'
                ]
            },
            {
                icon: 'fas fa-walking',
                title: 'Property Patrol',
                description: 'Regular patrols of hotel grounds, parking, and buildings',
                features: [
                    'Interior and exterior patrols',
                    'Parking and vehicle security',
                    'Amenity area monitoring',
                    'Incident response and reporting'
                ]
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Full Hotel Security Programs',
                description: 'Comprehensive 24/7 security for hotel properties',
                features: [
                    'Multiple shifts with coverage',
                    'Dedicated hotel security team',
                    'Preferred contract pricing',
                    'Customized protocols and training'
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
            { name: 'Newport Beach', url: '/newport-beach' },
            { name: 'Santa Monica', url: '/santa-monica' }
        ],
        
        // FAQs
        faqs: [
            {
                question: 'How much does hotel security cost in California?',
                answer: 'Hotel security services in California typically cost $35-$75 per hour per security officer, depending on whether guards are stationed (lobby) or mobile (patrol), shift type (day/evening/overnight), hotel size and property type, and contract length. Lobby security starts at $35-$55/hour, while specialized services like event security or armed guards cost $55-$75/hour. Most hotels budget $5,000-$15,000 monthly for professional security coverage.'
            },
            {
                question: 'What do hotel security guards do?',
                answer: 'Hotel security guards provide lobby security and guest assistance, property patrols (interior/exterior), parking lot and vehicle security, guest conflict resolution and de-escalation, unauthorized guest and trespassing prevention, loss prevention and theft deterrence, emergency response and coordination, pool and amenity area monitoring, incident documentation and reporting, and excellent customer service that enhances guest experiences.'
            },
            {
                question: 'Do hotel security guards help with guest service?',
                answer: 'Yes, professional hotel security guards are trained in hospitality customer service and often assist guests with directions, information, door assistance, luggage help, and general concierge-style support. Security officers understand they represent your hotel brand and provide services that enhance guest satisfaction while maintaining property protection. This dual role of security and service is essential in hospitality environments.'
            },
            {
                question: 'Can hotel security guards remove unauthorized guests or trespassers?',
                answer: 'Yes, hotel security guards can identify and remove unauthorized individuals, trespassers, loiterers, and non-guests from hotel property. Guards are trained in trespassing laws, proper removal procedures, conflict de-escalation, and coordination with law enforcement when necessary. Professional security effectively prevents unauthorized access while maintaining a welcoming atmosphere for legitimate guests.'
            },
            {
                question: 'Do hotels need security for events and weddings?',
                answer: 'Yes, many hotels provide security for weddings, conferences, banquets, and special events hosted in hotel ballrooms and venues. Event security ensures guest safety, manages access control, prevents unauthorized attendance, handles conflicts or intoxication issues, protects event property and gifts, and provides emergency response. Event security enhances guest experiences and protects hotel liability.'
            },
            {
                question: 'What are the most common security issues hotels face?',
                answer: 'Hotels commonly face theft and property crimes, unauthorized guests and trespassing, parking lot vehicle theft and break-ins, guest conflicts and disturbances, intoxication and alcohol-related incidents, pool and amenity area safety issues, vandalism and property damage, and liability from guest injuries or incidents. Professional security guards effectively prevent and manage these common hospitality security challenges.'
            },
            {
                question: 'How quickly can you provide hotel security guards?',
                answer: 'ShieldWise Security can deploy hotel security guards within 24-48 hours for most California hotels, with same-day emergency deployment available in Los Angeles, Orange County, and San Diego for urgent situations. For planned hotel security programs, we recommend 1 week advance notice to provide hospitality-specific training and property orientation for guards.'
            },
            {
                question: 'Are hotel security guards insured?',
                answer: 'Yes, ShieldWise Security maintains comprehensive general liability insurance, workers\' compensation coverage for all guards, and professional liability insurance for hospitality operations. We provide certificates of insurance to hotel management, property owners, and corporate hotel brands for insurance compliance and vendor requirements.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security officers for hotel properties',
                url: '/services/unarmed-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security for hotel weddings, conferences, and special events',
                url: '/services/event-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for hotel grounds and parking areas',
                url: '/services/patrol'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Security for commercial hotel properties and business hotels',
                url: '/services/commercial-security'
            },
            {
                name: 'Retail Security',
                icon: 'fas fa-shopping-cart',
                description: 'Security for hotel shops, boutiques, and retail areas',
                url: '/services/shopping-center-security'
            },
            {
                name: 'Armed Security',
                icon: 'fas fa-shield-alt',
                description: 'Armed security for luxury hotels and high-risk properties',
                url: '/services/armed-security'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-concierge-bell',
                title: 'Guest Service Excellence',
                description: 'Hospitality-trained officers providing security with exceptional customer service.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Lobby & Access Control',
                description: 'Professional lobby security with guest assistance and access management.'
            },
            {
                icon: 'fas fa-walking',
                title: 'Property Patrols',
                description: 'Regular patrols of hotel buildings, grounds, parking, and amenity areas.'
            },
            {
                icon: 'fas fa-car',
                title: 'Parking Security',
                description: 'Vehicle monitoring, parking enforcement, and guest vehicle protection.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Conflict Resolution',
                description: 'Professional de-escalation of guest conflicts and disturbances.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Loss Prevention',
                description: 'Theft deterrence, property protection, and unauthorized access prevention.'
            }
        ],

        // Statistics
        statistics: [
            { number: '100+', label: 'Hotels Secured' },
            { number: '99.4%', label: 'Guest Satisfaction' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Jennifer Adams',
                title: 'Hotel General Manager',
                image: 'jennifer-adams.jpg',
                quote: 'ShieldWise security officers are true hospitality professionals. They provide excellent protection while maintaining the welcoming atmosphere our guests expect. Guest satisfaction scores have improved since implementing their services.'
            },
            {
                name: 'Carlos Rivera',
                title: 'Resort Director of Security',
                image: 'carlos-rivera.jpg',
                quote: 'Our resort property has benefited tremendously from ShieldWise security. Their officers understand hospitality and provide outstanding service to our guests while keeping the property safe and secure.'
            },
            {
                name: 'Michelle Wong',
                title: 'Hotel Operations Manager',
                image: 'michelle-wong.jpg',
                quote: 'The security team has eliminated parking lot incidents and guest disturbances at our property. Professional, reliable, and always focused on guest experience. Highly recommended.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/hotel-security'
    });
});

module.exports = router;


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Add super aggressive cache-busting headers
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate, private, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '-1',
        'Last-Modified': new Date().toUTCString(),
        'ETag': Math.random().toString(),
        'X-Debug-Route': 'hotel-security-router'
    });
    
    // Debug log to confirm route is being hit
    console.log('🏨 Hotel Security Route Hit - Timestamp:', new Date().toISOString());
    
    const serviceData = {
        serviceType: 'hotel_security',
        serviceTitle: 'Professional Hotel Security Services in California',
        serviceDescription: '24/7 Guest Protection & Hospitality Security Solutions',
        priceRange: { low: 35, mid: 55, high: 85 },
        features: [
            {
                icon: 'fas fa-hotel',
                title: 'Lobby Security',
                description: 'Professional security presence in hotel lobbies ensuring guest safety while maintaining a welcoming environment for visitors and guests.'
            },
            {
                icon: 'fas fa-users-shield',
                title: 'Guest Protection',
                description: 'Comprehensive guest safety services including escort services, room security checks, and rapid response to guest concerns or emergencies.'
            },
            {
                icon: 'fas fa-phone-volume',
                title: 'Emergency Response',
                description: '24/7 emergency response capabilities including medical emergencies, security incidents, fire safety, and coordination with local emergency services.'
            },
            {
                icon: 'fas fa-car-side',
                title: 'Parking Security',
                description: 'Hotel parking lot and garage security including vehicle patrols, theft prevention, guest assistance, and unauthorized access prevention.'
            },
            {
                icon: 'fas fa-key',
                title: 'Access Control',
                description: 'Monitoring and controlling access to restricted areas, managing key card systems, and ensuring only authorized personnel enter secure zones.'
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Event Security',
                description: 'Specialized security for hotel events, conferences, weddings, and special occasions ensuring guest safety during large gatherings.'
            }
        ],
        processSteps: [
            {
                number: 1,
                title: 'Property Assessment',
                description: 'Comprehensive evaluation of your hotel property security needs, vulnerabilities, and guest safety requirements.'
            },
            {
                number: 2,
                title: 'Custom Security Plan',
                description: 'Development of tailored security protocols specific to your hotel layout, guest demographics, and hospitality standards.'
            },
            {
                number: 3,
                title: 'Implementation',
                description: 'Deployment of security personnel, installation of systems, and integration with existing hotel management protocols.'
            },
            {
                number: 4,
                title: 'Ongoing Monitoring',
                description: 'Continuous security coverage with regular reviews, updates, and adjustments to maintain optimal guest protection levels.'
            }
        ],
        benefits: [
            {
                icon: 'fas fa-clock',
                title: '24/7 Security Coverage',
                description: 'Round-the-clock protection with professional security personnel ensuring constant guest safety and property protection.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Hospitality-Trained Guards',
                description: 'Security guards specifically trained in hospitality protocols, guest relations, and maintaining welcoming atmosphere.'
            },
            {
                icon: 'fas fa-dollar-sign',
                title: 'Cost-Effective Solutions',
                description: 'Competitive pricing with flexible service packages that enhance guest experience while protecting your investment.'
            },
            {
                icon: 'fas fa-star',
                title: 'Guest Satisfaction',
                description: 'Enhanced guest experience through improved safety, peace of mind, and professional security presence.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Property Value Enhancement',
                description: 'Professional security services increase property desirability and can positively impact occupancy rates and reputation.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: '24/7 Emergency Support',
                description: 'Immediate response capabilities for emergencies with direct coordination with local emergency services and hotel management.'
            }
        ],
        serviceOfferings: [
            {
                icon: 'fas fa-building',
                title: 'Lobby & Reception Security',
                features: [
                    'Front Desk Security Support',
                    'Guest Check-in Assistance',
                    'Visitor Management',
                    'Concierge Security Services'
                ]
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Guest Protection Services',
                features: [
                    'Personal Safety Escorts',
                    'Room Security Checks',
                    'Guest Assistance Programs',
                    'VIP Protection Services'
                ]
            },
            {
                icon: 'fas fa-route',
                title: 'Property Patrol Services',
                features: [
                    'Hotel Perimeter Patrols',
                    'Parking Area Security',
                    'Common Area Monitoring',
                    'Emergency Response'
                ]
            }
        ],
        statistics: [
            { number: '150+', label: 'Hotels Protected' },
            { number: '99%', label: 'Guest Satisfaction' },
            { number: '24/7', label: 'Security Coverage' },
            { number: '15+', label: 'Years Experience' }
        ],
        testimonials: [
            {
                name: 'Sarah Johnson',
                title: 'Hotel Manager',
                image: 'james.png',
                quote: 'ShieldWise transformed our hotel security. Guest satisfaction scores have increased significantly since their implementation.'
            },
            {
                name: 'Michael Chen',
                title: 'Resort Director',
                image: 'samanta.png',
                quote: 'Professional, courteous security staff who understand the hospitality industry. Our guests feel much safer.'
            },
            {
                name: 'Emily Rodriguez',
                title: 'Hospitality Manager',
                image: 'shahn1.png',
                quote: 'The security team maintains our welcoming atmosphere while providing excellent protection. Perfect balance for hospitality.'
            }
        ],
        canonicalUrl: 'https://shieldwisesecurity.com/services/hotel-security'
    };

    // Add consistent data structure
serviceData.serviceType = 'hotel-security';
serviceData.priceRange = { low: 25, high: 45 };
res.render('services/hotel-security', { serviceData });
});

module.exports = router;

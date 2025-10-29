
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Best & Cheapest Mobile Patrol Security Services in Southern California',
        serviceDescription: 'Cheapest and best mobile patrol security services in California, especially Riverside, San Bernardino, and Southern California. 24/7 random patrols, alarm response, and property monitoring. Licensed & insured patrol officers.',
        serviceKeywords: 'cheapest mobile patrol security, best patrol services riverside, affordable security patrol southern california, mobile patrol riverside county, san bernardino patrol security, best security patrol california, cheap mobile security, 24/7 patrol services, alarm response riverside, property monitoring southern california',
        serviceImage: 'mobilesecurity.webp',
        serviceUrl: 'patrol',
        serviceType: 'mobile_patrol',
        serviceBenefit: 'comprehensive mobile security coverage with best rates in Southern California',
        propertyType: 'commercial and residential properties',
        targetRegion: 'Southern California - Riverside, San Bernardino, Orange County, Los Angeles',

        // Pricing Information (best and cheapest in Southern CA)
        priceRange: { 
            low: 45, 
            mid: 65, 
            high: 85 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Mobile Patrol Security Services - Best Value in Riverside Area',
        serviceOutput: 'Enhanced Property Protection with Mobile Security Patrols - Cheapest Rates Guaranteed',
        audienceType: 'Property Managers, Business Owners, HOAs, Commercial Facilities in Southern California',

        // Page-specific Meta Data
        pageTitle: 'Best & Cheapest Mobile Patrol Security Riverside CA | Southern California 24/7 Patrols',
        pageDescription: 'Cheapest and best mobile patrol security services in Southern California. Special focus on Riverside, San Bernardino, Orange County. 24/7 random patrols, fastest alarm response, property monitoring. Licensed & insured patrol officers. Call (800) 744-3531',
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
                title: 'Property Manager, Riverside',
                image: 'james.webp',
                quote: 'ShieldWise mobile patrols have been instrumental in reducing incidents at our commercial properties in Riverside. Their random patrol patterns and detailed reporting give us peace of mind, and their rates are the best we found in Southern California.',
                rating: 5
            },
            {
                name: 'Lisa Chen',
                title: 'HOA President, San Bernardino',
                image: 'jassica.webp',
                quote: 'The mobile patrol service has transformed our community security. Residents feel safer and we\'ve seen a significant decrease in property crimes. Best value for money in the area!',
                rating: 5
            },
            {
                name: 'David Thompson',
                title: 'Facility Director, Orange County',
                image: 'samanta.webp',
                quote: 'Professional, reliable, and thorough. The patrol reports are excellent and their response time to alarms is outstanding. Most affordable patrol service we\'ve used.',
                rating: 5
            }
        ],

        // Southern California Cities (focus areas)
        southernCaliforniaCities: [
            { 
                name: 'Riverside', 
                county: 'Riverside County',
                description: 'Premier mobile patrol security for Riverside businesses and communities. Best rates in Riverside County with 24/7 coverage.',
                features: ['Downtown Riverside Patrols', 'Riverside County Coverage', 'Industrial Site Security', 'Residential Community Patrols']
            },
            { 
                name: 'San Bernardino', 
                county: 'San Bernardino County',
                description: 'Affordable mobile patrol services across San Bernardino. Cheapest rates with uncompromised quality.',
                features: ['San Bernardino Valley Patrols', 'Commercial Property Security', 'Alarm Response Services', 'Construction Site Monitoring']
            },
            { 
                name: 'Corona', 
                county: 'Riverside County',
                description: 'Best mobile patrol security in Corona with rapid response times and competitive pricing.',
                features: ['Corona Business District Patrols', 'HOA Community Security', 'Shopping Center Patrols', 'Emergency Response']
            },
            { 
                name: 'Moreno Valley', 
                county: 'Riverside County',
                description: 'Comprehensive patrol services for Moreno Valley at the best prices in the region.',
                features: ['Moreno Valley Mall Area', 'Residential Patrols', 'Warehouse Security', 'Property Inspections']
            },
            { 
                name: 'Fontana', 
                county: 'San Bernardino County',
                description: 'Cheapest mobile patrol security in Fontana without sacrificing quality or reliability.',
                features: ['Fontana Industrial Areas', 'Logistics Center Security', 'Multi-Site Patrols', 'Rapid Deployment']
            },
            { 
                name: 'Ontario', 
                county: 'San Bernardino County',
                description: 'Best value mobile patrol services for Ontario businesses and residential areas.',
                features: ['Ontario Airport Area', 'Commercial District Patrols', 'Shopping Center Security', 'Vehicle Patrols']
            }
        ],

        // FAQs for Schema
        faqs: [
            {
                question: 'What areas do you cover in Southern California?',
                answer: 'We provide the best and cheapest mobile patrol security services throughout Southern California, with special focus on Riverside County, San Bernardino County, Orange County, and Los Angeles County. Our primary coverage includes Riverside, San Bernardino, Corona, Moreno Valley, Fontana, Ontario, Rancho Cucamonga, and surrounding cities.'
            },
            {
                question: 'Why is your mobile patrol service the cheapest in Riverside?',
                answer: 'We offer the most competitive rates in Riverside and Southern California by optimizing our patrol routes, utilizing advanced GPS technology, and maintaining efficient operations. Despite being the cheapest option, we never compromise on quality - all our patrol officers are licensed, insured, and professionally trained.'
            },
            {
                question: 'How quickly can you respond to alarms in the Riverside area?',
                answer: 'Our mobile patrol units in Riverside and San Bernardino typically respond within 5-15 minutes to alarm activations. We strategically position our patrol vehicles throughout Southern California to ensure the fastest possible response times while maintaining the best pricing in the region.'
            },
            {
                question: 'What makes your patrol service the best in Southern California?',
                answer: 'We combine the cheapest rates with the best quality service. Our patrol officers undergo rigorous training, all vehicles have GPS tracking and dashcams, you receive real-time digital reports, and we maintain the highest customer satisfaction ratings in Southern California. We are fully licensed, bonded, and carry $2M in insurance coverage.'
            }
        ]
    };

    res.render('services/patrol', { 
        serviceData,
        pageUrl: '/services/patrol'
    });
});

module.exports = router;

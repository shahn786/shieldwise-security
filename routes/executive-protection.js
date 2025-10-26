const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Executive Protection',
        serviceTitle: 'Executive Protection Services California',
        serviceDescription: 'Professional executive protection and bodyguard services in California for executives, VIPs, celebrities, and high-net-worth individuals with discreet, highly-trained close protection specialists.',
        serviceKeywords: 'executive protection California, bodyguard services, VIP security, celebrity protection, close protection officers, personal security detail, dignitary protection, high-net-worth security',
        serviceImage: 'executive-protection-california.webp',
        serviceUrl: 'executive-protection',
        serviceType: 'executive_protection',
        serviceBenefit: 'discreet personal security and threat protection',
        propertyType: 'executives, VIPs, celebrities, and high-profile individuals',

        // Pricing Information
        priceRange: { 
            low: 85, 
            mid: 125, 
            high: 200 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Close Protection Services',
        serviceOutput: 'Discreet Personal Security and Peace of Mind',
        audienceType: 'Corporate Executives, High-Net-Worth Individuals, Celebrities, Public Figures, Dignitaries',

        // Page-specific Meta Data
        pageTitle: 'Executive Protection Services California | VIP Bodyguard Security | ShieldWise Security',
        metaDescription: 'Professional executive protection and bodyguard services in California. Discreet VIP security, celebrity protection, close protection officers. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/executive-protection/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional executive protection and bodyguard services throughout California for corporate executives, high-net-worth individuals, celebrities, public figures, and VIPs requiring personal security. Our BSIS-licensed close protection officers offer discreet armed and unarmed protection, threat assessment, advance security planning, residential security, travel security, and event protection, serving high-profile clients in Los Angeles, Orange County, San Diego, and worldwide with military and law enforcement-trained specialists.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most professional executive protection and close protection services, providing discreet, highly-trained bodyguards and security specialists for corporate executives, high-net-worth individuals, celebrities, entertainers, athletes, politicians, and public figures requiring personal security. With extensive experience protecting C-suite executives, Fortune 500 leadership, entertainment industry clients, and international dignitaries, we provide comprehensive protection that balances security effectiveness with discretion and professionalism.<br><br>Our executive protection officers are elite security professionals with backgrounds in military special operations, law enforcement tactical units, federal protective services, and international security operations. Each close protection specialist undergoes rigorous training in threat assessment and analysis, defensive driving and tactical vehicle operations, close quarters protection techniques, emergency medical response (EMT/tactical medic), firearms proficiency and tactical shooting, advance security planning and route analysis, counter-surveillance and counter-assault tactics, and executive protection protocols. Our teams operate with the highest levels of professionalism, discretion, and situational awareness.<br><br>Whether you need full-time residential security, business travel protection, event security for public appearances, temporary protection during elevated threats, or comprehensive 24/7 security details, ShieldWise Security provides customized executive protection solutions throughout Los Angeles, Orange County, San Diego, San Francisco, and internationally. Our command center provides 24/7 coordination, intelligence monitoring, and rapid response for any security situation.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-user-tie',
                title: 'Corporate Executives',
                description: 'Close protection for CEOs, C-suite executives, and corporate leadership during business travel, public events, and daily activities.'
            },
            {
                icon: 'fas fa-star',
                title: 'Celebrities & Entertainers',
                description: 'Discreet protection for actors, musicians, athletes, and entertainment industry figures during events, appearances, and personal time.'
            },
            {
                icon: 'fas fa-gem',
                title: 'High-Net-Worth Individuals',
                description: 'Comprehensive security for wealthy individuals and families requiring residential, travel, and lifestyle protection.'
            },
            {
                icon: 'fas fa-landmark',
                title: 'Politicians & Dignitaries',
                description: 'Security details for elected officials, political candidates, government officials, and visiting dignitaries.'
            },
            {
                icon: 'fas fa-plane',
                title: 'Travel Security',
                description: 'Protection during domestic and international travel including airport security, ground transportation, and hotel security.'
            },
            {
                icon: 'fas fa-home',
                title: 'Residential Security',
                description: 'Armed security for private residences, estates, and family protection with 24/7 coverage.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise executive protection officers hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and Exposed Firearms Permits, with additional specialized certifications in executive protection operations. Our close protection specialists undergo the most rigorous background investigations including federal-level clearances, financial history verification, psychological evaluations, and extensive reference checks. Each officer has military special operations backgrounds (Navy SEALs, Army Rangers, Marine Force Recon), federal law enforcement experience (Secret Service, FBI, ATF, US Marshals), or international protective operations experience. Training includes executive protection academy certification, tactical firearms and defensive tactics, emergency driving and vehicle operations, medical trauma response (EMT/tactical medic), threat assessment and intelligence analysis, and counter-surveillance operations. We maintain comprehensive liability insurance exceeding $5 million, provide armored vehicle options, and ensure complete confidentiality and non-disclosure agreements for all assignments.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-user',
                title: 'Single Agent Details',
                description: 'One executive protection officer starting at $85-$125/hour',
                features: [
                    'BSIS-licensed armed protection',
                    'Low-profile or uniformed presence',
                    'Perfect for business travel or events',
                    'Flexible scheduling'
                ]
            },
            {
                icon: 'fas fa-users',
                title: 'Multi-Agent Security Teams',
                description: 'Two or more agents for comprehensive protection',
                features: [
                    'Lead agent and support team',
                    'Advance security and route planning',
                    'Vehicle and perimeter security',
                    'Event and travel coordination'
                ]
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Full-Service Security Programs',
                description: '24/7 comprehensive protection with intelligence support',
                features: [
                    'Dedicated protection team',
                    'Residential and travel security',
                    'Threat intelligence monitoring',
                    'Command center coordination'
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
            { name: 'Beverly Hills', url: '/beverly-hills' },
            { name: 'Newport Beach', url: '/newport-beach' }
        ],
        
        // FAQs
        faqs: [
            {
                question: 'How much does executive protection cost in California?',
                answer: 'Executive protection services in California typically range from $85-$200+ per hour per agent, depending on the agent\'s experience level, whether services are armed or unarmed, number of agents required, and assignment complexity. Single agent details start at $85-$125/hour. Multi-agent teams and 24/7 security programs are quoted based on specific requirements. Most executive protection clients budget $15,000-$50,000+ monthly for comprehensive protection.'
            },
            {
                question: 'What is the difference between bodyguards and executive protection?',
                answer: 'Executive protection (close protection) is a comprehensive security discipline involving threat assessment, advance planning, intelligence gathering, route analysis, and coordinated security operations by highly-trained specialists. "Bodyguards" typically refers to individual security personnel. Professional executive protection includes strategic planning, risk mitigation, and proactive threat prevention, not just physical presence.'
            },
            {
                question: 'Are your executive protection officers armed?',
                answer: 'Yes, most executive protection officers carry firearms and hold California BSIS Exposed Firearms Permits. Armed protection is standard for high-profile clients, elevated threat environments, and situations requiring immediate response capability. We also provide unarmed close protection for lower-risk situations or locations where firearms are prohibited. All protective operations are customized to client needs and risk levels.'
            },
            {
                question: 'What qualifications do executive protection officers have?',
                answer: 'Our executive protection officers have military special operations backgrounds (SEALs, Rangers, Force Recon), federal law enforcement experience (Secret Service, FBI, US Marshals), or international protective operations credentials. All hold BSIS licenses, firearms permits, executive protection certifications, emergency medical training (EMT/tactical medic), defensive driving qualifications, and complete ongoing tactical training. Average experience exceeds 10 years in protective operations.'
            },
            {
                question: 'Do you provide executive protection for travel?',
                answer: 'Yes, ShieldWise Security provides comprehensive travel security for domestic and international travel including advance security planning and route analysis, airport security and ground transportation, hotel security assessments and room sweeps, meeting and event security, emergency medical support, and 24/7 protective coverage. Our agents are experienced in international operations and hold valid passports for overseas assignments.'
            },
            {
                question: 'How discreet is executive protection service?',
                answer: 'Our executive protection officers are trained in low-profile, discreet protection methods that provide comprehensive security without drawing attention. Agents dress appropriately for environments (business attire for corporate settings, casual for personal time), maintain professional distance while ensuring protection, use covert communication systems, and operate with situational awareness that doesn\'t disrupt client activities. Discretion and professionalism are core competencies.'
            },
            {
                question: 'Can you provide residential security for executives and families?',
                answer: 'Yes, we provide comprehensive residential security for executives, high-net-worth individuals, and families including armed security officers at residences and estates, perimeter security and access control, family protection and secure transportation, threat monitoring and intelligence analysis, and emergency response protocols. Residential security can be combined with executive protection for complete coverage.'
            },
            {
                question: 'How quickly can you deploy executive protection?',
                answer: 'ShieldWise Security can deploy executive protection officers within 2-4 hours for emergency situations in Los Angeles, Orange County, and San Diego areas. For planned assignments requiring advance security assessments and team coordination, we recommend 24-48 hours notice. International assignments typically require 3-5 days for planning, logistics, and agent positioning.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed security for residential estates and high-profile properties',
                url: '/services/armed-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security for VIP events, appearances, and public gatherings',
                url: '/services/event-security'
            },
            {
                name: 'Residential Security',
                icon: 'fas fa-home',
                description: 'Armed security for private residences and family protection',
                url: '/services/residential-security'
            },
            {
                name: 'Corporate Security',
                icon: 'fas fa-building',
                description: 'Security solutions for corporate facilities and offices',
                url: '/services/commercial-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Patrol services for property and residential security',
                url: '/services/patrol'
            },
            {
                name: 'Threat Assessment',
                icon: 'fas fa-exclamation-triangle',
                description: 'Professional security assessments and risk analysis',
                url: '/services/security-consulting'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-user-secret',
                title: 'Close Protection',
                description: 'Elite bodyguards providing immediate personal security and threat response.'
            },
            {
                icon: 'fas fa-search',
                title: 'Threat Assessment',
                description: 'Comprehensive risk analysis, intelligence gathering, and threat monitoring.'
            },
            {
                icon: 'fas fa-route',
                title: 'Advance Planning',
                description: 'Security route analysis, venue assessments, and proactive planning.'
            },
            {
                icon: 'fas fa-car-side',
                title: 'Secure Transportation',
                description: 'Tactical driving, vehicle security, and safe ground transportation.'
            },
            {
                icon: 'fas fa-first-aid',
                title: 'Medical Response',
                description: 'EMT-trained agents with tactical medical and emergency response capabilities.'
            },
            {
                icon: 'fas fa-user-lock',
                title: 'Discretion & Privacy',
                description: 'Confidential operations with NDAs and complete client privacy protection.'
            }
        ],

        // Statistics
        statistics: [
            { number: '100%', label: 'Client Safety Record' },
            { number: '24/7', label: 'Global Availability' },
            { number: '50+', label: 'Elite Agents' },
            { number: '10+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Confidential Client',
                title: 'Fortune 500 CEO',
                image: 'confidential-executive.jpg',
                quote: 'ShieldWise executive protection provides the highest level of professionalism and discretion. Their team\'s experience and capabilities give me complete peace of mind during travel and public events.'
            },
            {
                name: 'Anonymous',
                title: 'Entertainment Industry Client',
                image: 'confidential-celebrity.jpg',
                quote: 'The protection team is incredibly professional and discreet. They allow me to maintain my privacy and personal life while ensuring my safety and my family\'s security.'
            },
            {
                name: 'Private Client',
                title: 'High-Net-Worth Individual',
                image: 'confidential-client.jpg',
                quote: 'ShieldWise provides comprehensive security for our family including residential protection and international travel. Their agents are the best in the industry - true professionals.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/executive-protection'
    });
});

module.exports = router;

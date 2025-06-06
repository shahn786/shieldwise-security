
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceTitle: 'Educational Campus Security Services California',
        serviceDescription: 'California\'s premier educational security company. Licensed campus guards, student safety programs, emergency response, threat assessment & event security for K-12 schools, colleges & universities.',
        serviceKeywords: 'campus security services California, educational security guards, school security services, college campus security, university protection, K-12 school safety, student protection services, campus emergency response, educational institution security, school security guards California',
        serviceImage: 'schoolsecurity.webp',
        serviceUrl: 'educational-campus-security',
        serviceType: 'educational_security',
        serviceBenefit: 'enhanced educational institution protection with specialized campus security',
        propertyType: 'educational institutions and campuses',

        // Pricing Information
        priceRange: { 
            low: 45, 
            mid: 65, 
            high: 95 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Campus Security Services',
        serviceOutput: 'Complete Educational Institution Protection',
        audienceType: 'School Administrators, College Presidents, University Officials, Education Directors, Safety Coordinators',

        // Page-specific Meta Data
        pageTitle: 'Educational Campus Security Services California | K-12 Schools, College & University Protection | ShieldWise Security',
        pageDescription: 'California\'s premier educational security company. Licensed campus guards, student safety programs, emergency response, threat assessment & event security for K-12 schools, colleges & universities. 4.9★ rating from 300+ educational institutions. Free campus security assessment - Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/educational-campus-security/',

        // Service-specific Features
        features: [
            {
                icon: 'fas fa-graduation-cap',
                title: 'Campus Patrol Services',
                description: 'Dedicated foot and vehicle patrols covering all campus areas including dormitories, academic buildings, parking lots, and common areas with 24/7 coverage.'
            },
            {
                icon: 'fas fa-id-card',
                title: 'Access Control Systems',
                description: 'Biometric and mobile-credential systems for secure building access, visitor management, and restricted area protection including research facilities.'
            },
            {
                icon: 'fas fa-video',
                title: '24/7 Video Surveillance',
                description: 'Comprehensive CCTV monitoring of all campus areas with real-time threat detection, facial recognition, and incident response capabilities.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Emergency Response',
                description: 'Rapid crisis response protocols aligned with Clery Act requirements and coordinated with local law enforcement and emergency services.'
            },
            {
                icon: 'fas fa-home',
                title: 'Dormitory Security',
                description: 'Specialized residential security for student housing including smart key card systems, visitor verification, and after-hours monitoring.'
            },
            {
                icon: 'fas fa-calendar-alt',
                title: 'Event Security',
                description: 'Professional security for campus events including graduations, sporting events, conferences, and special celebrations with crowd management.'
            }
        ],

        // Service Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Campus Assessment',
                description: 'Comprehensive evaluation of campus layout, security vulnerabilities, student population demographics, and institutional specific risks and requirements.'
            },
            {
                number: 2,
                title: 'Custom Security Plan',
                description: 'Development of tailored security protocols specific to your institution\'s needs, federal regulatory requirements, and campus culture and values.'
            },
            {
                number: 3,
                title: 'Training & Deployment',
                description: 'Specialized training for security personnel in educational environments followed by seamless integration with existing campus operations and staff.'
            },
            {
                number: 4,
                title: 'Ongoing Monitoring',
                description: 'Continuous security coverage with regular assessments, performance reviews, and strategic adjustments to maintain optimal protection levels.'
            }
        ],

        // Service Benefits
        benefits: [
            {
                icon: 'fas fa-certificate',
                title: 'Educational Security Expertise',
                description: 'Specialized training in campus environments, student interaction protocols, crisis de-escalation, and educational institution regulations and requirements.'
            },
            {
                icon: 'fas fa-balance-scale',
                title: 'Clery Act Compliance',
                description: 'Full compliance with federal campus safety reporting requirements, crime statistics documentation, transparency obligations, and regulatory standards.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Campus Coverage',
                description: 'Round-the-clock security presence with specialized night patrol services for dormitories, libraries, laboratories, and campus facilities.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Student-Focused Approach',
                description: 'Security services designed to protect while maintaining an open, welcoming campus environment conducive to learning, research, and academic freedom.'
            },
            {
                icon: 'fas fa-microchip',
                title: 'Advanced Technology Integration',
                description: 'State-of-the-art security systems including biometric access, mobile credentials, AI-powered surveillance monitoring, and integrated campus safety apps.'
            },
            {
                icon: 'fas fa-phone-alt',
                title: 'Crisis Response Coordination',
                description: 'Immediate emergency response with seamless coordination between campus officials, law enforcement, emergency services, and family notification systems.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-shield-alt',
                title: 'Campus Patrol & Monitoring',
                features: [
                    '24/7 Campus Patrol Services',
                    'Building Access Monitoring',
                    'Dormitory Security Coverage',
                    'Emergency Response Coordination',
                    'Late Night Safety Escorts'
                ]
            },
            {
                icon: 'fas fa-users',
                title: 'Student & Staff Protection',
                features: [
                    'Personal Safety Escort Services',
                    'Crisis Intervention Support',
                    'Visitor Management Systems',
                    'Special Event Security',
                    'Mental Health Crisis Response'
                ]
            },
            {
                icon: 'fas fa-cog',
                title: 'Technology & Compliance',
                features: [
                    'Smart Access Control Systems',
                    'CCTV Surveillance Networks',
                    'Clery Act Compliance Support',
                    'Incident Documentation',
                    'Campus Safety Mobile Apps'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '75+', label: 'Campuses Secured' },
            { number: '100%', label: 'Clery Compliance' },
            { number: '24/7', label: 'Emergency Response' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Dr. Patricia Williams',
                title: 'Campus Safety Director',
                image: 'james.png',
                quote: 'ShieldWise\'s campus security team understands the unique challenges of educational environments. Their officers are professional yet approachable, creating a safe atmosphere without compromising our open campus culture.'
            },
            {
                name: 'Mark Rodriguez',
                title: 'University Administrator',
                image: 'samanta.png',
                quote: 'Excellent emergency response capabilities and seamless coordination with our campus operations. Students and parents feel much more secure, and our Clery Act compliance has never been stronger.'
            },
            {
                name: 'Jennifer Chen',
                title: 'Dean of Students',
                image: 'shahn1.png',
                quote: 'Their technology integration and crisis management training has been invaluable. Professional service that enhances our campus community while maintaining the academic freedom our students need.'
            }
        ]
    };

    res.render('services/educational-campus-security', { 
        serviceData,
        pageUrl: '/services/educational-campus-security'
    });
});

module.exports = router;

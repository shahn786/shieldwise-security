
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        serviceTitle: 'Professional Hospital Security Services',
        serviceDescription: 'Comprehensive healthcare facility security ensuring patient safety and HIPAA compliance with 24/7 licensed guards.',
        serviceKeywords: 'hospital security services, healthcare security guards, medical center security, BSIS licensed security, patient safety',
        serviceImage: 'hospitalsecurity.png',
        serviceUrl: 'hospital-security',
        serviceType: 'hospital',
        serviceBenefit: 'enhanced patient safety and healthcare facility protection',
        propertyType: 'healthcare facility',
        priceRange: { low: 35, mid: 55, high: 85 },
        serviceAltName: 'Healthcare Security Services',
        serviceOutput: 'Complete hospital security protection',
        audienceType: 'Hospital Administrators and Healthcare Managers',
        relatedProperty: 'hospitals and medical centers',
        specializedServices: 'HIPAA compliance, emergency response, access control, visitor management, patient safety protocols',
        industryType: 'healthcare',
        clientType: 'hospital administrators and healthcare managers',
        managerType: 'hospital administrators',
        assessmentSpecifics: 'healthcare risk assessment, HIPAA compliance review, patient safety evaluation',
        
        // Features
        features: [
            {
                icon: 'fas fa-user-md',
                title: 'Emergency Department Security',
                description: 'Specialized security for high-stress areas with trained personnel who understand medical emergencies and de-escalation techniques.'
            },
            {
                icon: 'fas fa-shield-virus',
                title: 'ICU & Critical Care Protection',
                description: 'Restricted access monitoring for intensive care units, ensuring only authorized medical staff and approved visitors enter sensitive areas.'
            },
            {
                icon: 'fas fa-clipboard-check',
                title: 'Visitor Management System',
                description: 'Comprehensive visitor screening, badge issuance, and escort services to maintain controlled access throughout the facility.'
            },
            {
                icon: 'fas fa-lock',
                title: 'HIPAA-Compliant Security',
                description: 'Advanced cybersecurity protocols protecting electronic health information with data encryption and secure access controls.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Emergency Response Training',
                description: 'Security officers trained in active shooter protocols, fire evacuations, and medical emergency procedures for swift response.'
            },
            {
                icon: 'fas fa-pills',
                title: 'Pharmacy & Medical Supply Security',
                description: 'Specialized protection for pharmaceutical storage areas and medical equipment to prevent theft and ensure regulatory compliance.'
            }
        ],

        // Process Steps
        processSteps: [
            {
                number: 1,
                title: 'Healthcare Risk Assessment',
                description: 'Comprehensive evaluation of your hospital\'s unique security vulnerabilities, patient flow patterns, and regulatory requirements.'
            },
            {
                number: 2,
                title: 'Custom Security Design',
                description: 'Development of tailored security protocols specific to healthcare environments, including HIPAA compliance and emergency procedures.'
            },
            {
                number: 3,
                title: 'Staff Training & Deployment',
                description: 'Specialized training for healthcare security personnel on medical protocols, patient interactions, and emergency response procedures.'
            },
            {
                number: 4,
                title: 'Continuous Monitoring',
                description: 'Ongoing security coverage with regular audits, compliance reviews, and adjustments to maintain optimal protection levels.'
            }
        ],

        // Benefits
        benefits: [
            {
                icon: 'fas fa-graduation-cap',
                title: 'Healthcare-Specialized Training',
                description: 'Security personnel trained specifically in healthcare environments, medical protocols, and patient interaction best practices.'
            },
            {
                icon: 'fas fa-balance-scale',
                title: 'Regulatory Compliance',
                description: 'Full HIPAA compliance with additional adherence to healthcare safety regulations and accreditation standards.'
            },
            {
                icon: 'fas fa-heartbeat',
                title: 'Medical Emergency Response',
                description: 'Officers trained to assist during medical emergencies while maintaining security protocols and patient dignity.'
            },
            {
                icon: 'fas fa-users',
                title: 'Patient & Family Focused',
                description: 'Compassionate security approach that considers the emotional state of patients and families during difficult times.'
            },
            {
                icon: 'fas fa-database',
                title: 'Advanced Cybersecurity',
                description: 'Comprehensive protection of electronic health records and medical systems against cyber threats and data breaches.'
            },
            {
                icon: 'fas fa-clock',
                title: '24/7 Coverage',
                description: 'Round-the-clock security presence ensuring continuous protection during all shifts and emergency situations.'
            }
        ],

        // Service Offerings
        serviceOfferings: [
            {
                icon: 'fas fa-door-open',
                title: 'Access Control & Monitoring',
                features: [
                    'Electronic Badge Systems',
                    'Biometric Access Control',
                    'Visitor Authentication',
                    'Restricted Area Management'
                ]
            },
            {
                icon: 'fas fa-ambulance',
                title: 'Emergency Response Services',
                features: [
                    'Code Team Assistance',
                    'Fire Evacuation Support',
                    'Active Threat Response',
                    'Medical Emergency Aid'
                ]
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Comprehensive Protection',
                features: [
                    'Perimeter Security',
                    'Parking Area Patrols',
                    'Asset Protection',
                    'Incident Documentation'
                ]
            }
        ],

        // Statistics
        statistics: [
            { number: '50+', label: 'Hospitals Secured' },
            { number: '100%', label: 'HIPAA Compliant' },
            { number: '24/7', label: 'Security Coverage' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Dr. Sarah Williams',
                title: 'Chief Medical Officer',
                image: 'james.png',
                quote: 'ShieldWise\'s understanding of healthcare security is exceptional. They\'ve significantly improved our facility\'s safety while maintaining patient care standards.'
            },
            {
                name: 'Michael Thompson',
                title: 'Hospital Administrator',
                image: 'samanta.png',
                quote: 'Their HIPAA-compliant security solutions and emergency response training have been invaluable for our hospital operations.'
            },
            {
                name: 'Lisa Rodriguez',
                title: 'Director of Nursing',
                image: 'shahn1.png',
                quote: 'The security team\'s professionalism and understanding of patient needs creates a safer environment for everyone.'
            }
        ]
    };

    res.render('services/hospital-security', { 
        serviceData,
        pageUrl: '/services/hospital-security'
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Hospital Security',
        serviceTitle: 'Hospital Security Guards California',
        serviceDescription: 'Professional hospital and healthcare security guards in California providing patient safety, staff protection, emergency department security, and medical facility protection with trained healthcare security specialists.',
        serviceKeywords: 'hospital security guards California, healthcare security services, medical facility security, emergency room security, patient safety officers, healthcare protection, medical center security',
        serviceImage: 'hospital-security-california.webp',
        serviceUrl: 'hospital-security',
        serviceType: 'hospital_security',
        serviceBenefit: 'safe healthcare environments with specialized medical security',
        propertyType: 'hospitals, medical centers, clinics, and healthcare facilities',

        // Pricing Information
        priceRange: { 
            low: 40, 
            mid: 60, 
            high: 80 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Healthcare Security Services',
        serviceOutput: 'Safe Medical Environments and Patient Protection',
        audienceType: 'Hospital Administrators, Healthcare Facility Managers, Medical Directors, Clinic Operators',

        // Page-specific Meta Data
        pageTitle: 'Hospital Security Guards California | Healthcare Security Services | ShieldWise Security',
        metaDescription: 'Professional hospital security guards in California. Healthcare facility protection, emergency department security, patient safety. Trained officers. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/hospital-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional hospital and healthcare security guard services throughout California for medical facilities, emergency departments, clinics, and healthcare campuses. Our specially-trained BSIS-licensed security officers offer patient safety, staff protection, emergency department security, visitor management, crisis intervention, and medical environment security, serving hospitals and healthcare providers in Los Angeles, Orange County, San Diego, and statewide with expertise in healthcare security operations and HIPAA compliance.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most specialized hospital and healthcare security services, protecting patients, staff, visitors, and medical facilities with security officers trained specifically for healthcare environments. Hospitals and medical facilities face unique security challenges including emergency department violence, behavioral health incidents, patient elopement, drug diversion, visitor conflicts, and the need to balance security effectiveness with compassionate patient care and HIPAA privacy requirements.<br><br>Our healthcare security guards are BSIS-licensed professionals with extensive specialized training in healthcare security operations and medical environment protocols, crisis intervention and de-escalation with patients and visitors, patient rights and HIPAA privacy compliance, emergency department security and violence prevention, behavioral health and psychiatric patient management, infant abduction prevention (Code Pink protocols), medical emergency response and coordination, and compassionate customer service in healthcare settings. Guards understand the sensitive nature of healthcare environments and are trained to provide effective security while maintaining the healing atmosphere patients and families require.<br><br>Whether you need emergency department security, behavioral health unit protection, general hospital security officers, medical office building security, urgent care clinic protection, or comprehensive hospital campus security, ShieldWise Security provides customized healthcare security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California medical centers. Our 24/7 operations ensure immediate response for medical facility security needs.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-hospital',
                title: 'Hospital Emergency Departments',
                description: 'Specialized security for hospital ERs managing violence, intoxication, psychiatric crises, and high-stress situations.'
            },
            {
                icon: 'fas fa-brain',
                title: 'Behavioral Health Units',
                description: 'Security for psychiatric units, mental health facilities, and behavioral health departments requiring specialized crisis intervention.'
            },
            {
                icon: 'fas fa-clinic-medical',
                title: 'Medical Office Buildings',
                description: 'Security for medical office buildings, physician practices, surgery centers, and outpatient facilities.'
            },
            {
                icon: 'fas fa-baby',
                title: 'Maternity & Pediatric Units',
                description: 'Specialized security for maternity wards, pediatric units, and NICUs with infant abduction prevention protocols.'
            },
            {
                icon: 'fas fa-procedures',
                title: 'Urgent Care & Clinics',
                description: 'Security for urgent care centers, walk-in clinics, and community health facilities.'
            },
            {
                icon: 'fas fa-university',
                title: 'Medical Campuses',
                description: 'Comprehensive security for hospital campuses, medical centers, and multi-building healthcare complexes.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise healthcare security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and undergo the most comprehensive background checks in the industry including LiveScan fingerprinting, criminal history verification with special attention to patient-related crimes, healthcare employment verification, and tuberculosis testing as required by healthcare facilities. Our hospital security officers complete specialized healthcare security training including healthcare environment operations and HIPAA compliance, crisis intervention and verbal de-escalation techniques, patient rights and compassionate care, emergency department security and violence prevention, behavioral health and psychiatric patient safety, medical emergency recognition and response, infant abduction prevention (Code Pink), active shooter response in healthcare settings, and customer service excellence in medical environments. Many officers have backgrounds in emergency medical services, military medical operations, or previous healthcare security experience. We maintain comprehensive professional liability insurance, workers\' compensation coverage, and provide detailed incident reports meeting healthcare documentation standards and Joint Commission requirements.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-user-shield',
                title: 'Unarmed Hospital Security',
                description: 'Professional unarmed security officers starting at $40-$60/hour',
                features: [
                    'Healthcare-trained security officers',
                    'Patient-centered approach',
                    'Crisis intervention capabilities',
                    'HIPAA compliant operations'
                ]
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Emergency Department Security',
                description: 'Specialized ER security with enhanced training',
                features: [
                    'Violence prevention expertise',
                    'Intoxication and psychiatric crisis management',
                    'Rapid response capabilities',
                    'De-escalation specialists'
                ]
            },
            {
                icon: 'fas fa-hospital',
                title: 'Full Hospital Security Programs',
                description: '24/7 comprehensive hospital campus security',
                features: [
                    'Multiple units and departments covered',
                    'Supervisor oversight included',
                    'Preferred contract pricing',
                    'Customized post orders and protocols'
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
                question: 'Why do hospitals need security guards?',
                answer: 'Hospitals require security guards for emergency department violence prevention (assault, intoxication, psychiatric crises), patient and visitor conflicts and de-escalation, behavioral health patient management, infant abduction prevention, drug diversion and theft prevention, patient elopement prevention, staff safety and workplace violence prevention, and access control and visitor management. Healthcare facilities experience higher rates of workplace violence than most industries, making professional security essential.'
            },
            {
                question: 'How much does hospital security cost in California?',
                answer: 'Hospital security services in California typically cost $40-$80 per hour per security officer, depending on specialized training requirements, shift type (day/evening/overnight), department assignment (general vs ER/behavioral health), and contract length. Emergency department security and behavioral health security often cost more ($55-$80/hour) due to specialized training. Most hospitals budget $10,000-$40,000+ monthly for comprehensive security coverage.'
            },
            {
                question: 'What training do hospital security guards receive?',
                answer: 'Hospital security guards complete specialized healthcare security training including crisis intervention and verbal de-escalation, patient rights and HIPAA privacy compliance, medical emergency recognition and response, behavioral health and psychiatric patient safety, infant abduction prevention protocols, violence prevention in healthcare settings, compassionate care and customer service, and healthcare environment operations. Officers also receive site-specific training on hospital policies, codes (Code Pink, Code Gray, Code Silver), and department-specific protocols.'
            },
            {
                question: 'Can hospital security guards restrain patients?',
                answer: 'Hospital security guards assist clinical staff with patient restraints only when requested by medical personnel and in accordance with hospital policies, patient rights laws, and medical restraint protocols. Security officers are trained in safe physical intervention techniques and de-escalation to minimize use of physical restraint. All patient interactions must comply with patient rights, HIPAA, and hospital policies, with clinical staff maintaining primary responsibility for patient care decisions.'
            },
            {
                question: 'Do you provide armed security for hospitals?',
                answer: 'While most California hospitals utilize unarmed security to maintain a healing environment, we can provide armed security officers for specific high-risk situations, hospital campuses in high-crime areas, emergency departments experiencing elevated violence, behavioral health facilities, or when specifically requested. Armed hospital security requires additional specialized training and coordination with hospital administration.'
            },
            {
                question: 'What is emergency department security?',
                answer: 'Emergency department security involves specialized security officers stationed in hospital ERs to manage violence, intoxication, psychiatric crises, agitated patients and visitors, gang-related incidents, and the high-stress environment of emergency medicine. ER security officers require advanced de-escalation training, crisis intervention skills, and the ability to respond rapidly to violent situations while maintaining patient care and HIPAA compliance.'
            },
            {
                question: 'How quickly can you deploy hospital security guards?',
                answer: 'ShieldWise Security can deploy hospital security guards within 24-48 hours for most California healthcare facilities, with same-day emergency deployment available in Los Angeles, Orange County, and San Diego for critical situations. For planned hospital security programs, we recommend 1-2 weeks to complete healthcare-specific training, credentialing, and orientation to hospital policies and procedures.'
            },
            {
                question: 'Are hospital security guards HIPAA compliant?',
                answer: 'Yes, all ShieldWise hospital security guards are trained in HIPAA privacy and confidentiality requirements for healthcare environments. Officers understand patient privacy protections, proper handling of protected health information (PHI), visitor management in compliance with patient privacy, and confidentiality requirements. We provide HIPAA compliance training and maintain confidentiality agreements with all healthcare security personnel.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for medical facilities and clinics',
                url: '/services/unarmed-security'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Security for medical office buildings and healthcare complexes',
                url: '/services/commercial-security'
            },
            {
                name: 'Educational Security',
                icon: 'fas fa-school',
                description: 'Security for medical schools and university healthcare facilities',
                url: '/services/educational-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security for medical conferences, healthcare events, and seminars',
                url: '/services/event-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Patrol services for hospital campuses and parking structures',
                url: '/services/patrol'
            },
            {
                name: 'Armed Security',
                icon: 'fas fa-shield-alt',
                description: 'Armed security for high-risk healthcare facilities',
                url: '/services/armed-security'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-user-md',
                title: 'Patient Safety',
                description: 'Compassionate security focused on patient safety, rights, and healing environment.'
            },
            {
                icon: 'fas fa-comments',
                title: 'Crisis De-Escalation',
                description: 'Advanced verbal de-escalation and crisis intervention training for healthcare conflicts.'
            },
            {
                icon: 'fas fa-baby',
                title: 'Infant Protection',
                description: 'Code Pink protocols and infant abduction prevention for maternity and pediatric units.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Access Control',
                description: 'Visitor management, access control, and HIPAA-compliant patient privacy protection.'
            },
            {
                icon: 'fas fa-brain',
                title: 'Behavioral Health',
                description: 'Specialized training for psychiatric units and behavioral health patient management.'
            },
            {
                icon: 'fas fa-first-aid',
                title: 'Medical Emergency Response',
                description: 'Recognition and response to medical emergencies with coordination to clinical staff.'
            }
        ],

        // Statistics
        statistics: [
            { number: '50+', label: 'Healthcare Facilities' },
            { number: '99.5%', label: 'Patient Satisfaction' },
            { number: '24/7', label: 'Availability' },
            { number: '15+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Dr. Sarah Johnson',
                title: 'Emergency Department Director',
                image: 'dr-sarah-johnson.jpg',
                quote: 'ShieldWise security has transformed our ER safety. Their officers are trained professionals who handle difficult situations with compassion and effectiveness. Staff feel safer and violence incidents have decreased significantly.'
            },
            {
                name: 'Mark Davidson',
                title: 'Hospital Administrator',
                image: 'mark-davidson.jpg',
                quote: 'The healthcare security team understands the unique environment of hospitals. They provide excellent protection while maintaining the healing atmosphere our patients need. Highly professional service.'
            },
            {
                name: 'Linda Martinez',
                title: 'Behavioral Health Manager',
                image: 'linda-martinez.jpg',
                quote: 'Our psychiatric unit security has improved dramatically. The guards are trained in crisis intervention and work seamlessly with our clinical staff to ensure patient and staff safety.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/hospital-security'
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const serviceData = {
        // Core Service Information
        serviceName: 'Educational Campus Security',
        serviceTitle: 'School & Campus Security Guards California',
        serviceDescription: 'Professional school and educational campus security guards in California for K-12 schools, colleges, universities providing student safety, campus protection, and emergency response.',
        serviceKeywords: 'school security guards California, campus security services, educational security, K-12 school security, university security, college security guards, student safety officers',
        serviceImage: 'educational-campus-security-california.webp',
        serviceUrl: 'educational-security',
        serviceType: 'educational_security',
        serviceBenefit: 'safe learning environments with professional campus security',
        propertyType: 'schools, colleges, universities, and educational campuses',

        // Pricing Information
        priceRange: { 
            low: 40, 
            mid: 60, 
            high: 80 
        },

        // Alternative Names and Outputs
        serviceAltName: 'Campus Security Services',
        serviceOutput: 'Safe Educational Environments for Learning',
        audienceType: 'School Administrators, University Officials, Campus Directors, Educational Facility Managers',

        // Page-specific Meta Data
        pageTitle: 'School & Campus Security Guards California | Educational Security | ShieldWise Security',
        metaDescription: 'Professional school & campus security guards in California. K-12 school security, university protection, student safety. Trained officers. Call (714) 716-7430',
        canonicalUrl: 'https://shieldwisesecurity.com/services/educational-security/',
        
        // AI-Friendly Summary
        aiSummary: 'ShieldWise Security provides professional school and educational campus security guard services throughout California for K-12 schools, colleges, universities, and educational facilities. Our BSIS-licensed security officers offer student safety, campus protection, access control, visitor management, emergency response, and active shooter preparedness, serving educational institutions in Los Angeles, Orange County, San Diego, and statewide with officers trained in educational environment security and student interaction.',
        
        // Service Overview
        overview: 'ShieldWise Security delivers California\'s most specialized educational campus security services, protecting students, faculty, staff, and educational facilities for K-12 schools, community colleges, universities, and educational campuses throughout the state. Educational environments face unique security challenges including unauthorized visitors, campus intruders, student safety threats, active shooter preparedness, bullying and violence prevention, and the critical need to balance effective security with welcoming learning environments that support education rather than creating fear or prison-like atmospheres.<br><br>Our educational security guards are BSIS-licensed professionals with extensive specialized training in school and campus security operations, student interaction and positive youth engagement, visitor management and access control, emergency response and active shooter protocols, threat assessment and reporting, crisis intervention and conflict de-escalation, bullying and violence prevention awareness, and working within educational environments. Officers understand the unique dynamics of schools and campuses, balancing security effectiveness with supportive, positive interactions that contribute to safe learning environments.<br><br>Whether you need armed School Resource Officers (SROs) for K-12 schools, campus security for colleges and universities, special event security for graduations and athletic events, visitor management for elementary schools, or comprehensive campus safety programs, ShieldWise Security provides customized educational security solutions throughout Los Angeles, Orange County, San Diego, San Francisco, Sacramento, and all California school districts and universities. Our commitment is creating safe environments where students can focus on learning.',

        // Use Cases
        useCases: [
            {
                icon: 'fas fa-school',
                title: 'K-12 Schools',
                description: 'Security for elementary, middle, and high schools including SROs, visitor management, and campus protection.'
            },
            {
                icon: 'fas fa-university',
                title: 'Colleges & Universities',
                description: 'Campus security for community colleges, universities, and higher education institutions with large campuses.'
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Private & Charter Schools',
                description: 'Professional security for private schools, charter schools, and specialized educational facilities.'
            },
            {
                icon: 'fas fa-futbol',
                title: 'Athletic Events & Activities',
                description: 'Security for school athletic events, games, competitions, and extracurricular activities.'
            },
            {
                icon: 'fas fa-calendar-check',
                title: 'School Events & Functions',
                description: 'Security for graduations, dances, assemblies, parent events, and special school functions.'
            },
            {
                icon: 'fas fa-building',
                title: 'Educational Facilities',
                description: 'Security for administrative buildings, research facilities, dormitories, and campus buildings.'
            }
        ],
        
        // Credentials & Vetting
        credentials: 'All ShieldWise educational security guards hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and undergo the most comprehensive background checks in the industry including LiveScan fingerprinting, criminal history verification with special attention to crimes against children, Department of Justice clearances, TB testing as required by schools, and reference checks with educational institutions. Our school security officers complete specialized educational security training including school and campus security best practices, positive student interaction and youth engagement, visitor management and access control systems, active shooter response and emergency lockdown procedures, threat assessment and reporting protocols, crisis intervention and conflict de-escalation, bullying prevention awareness, trauma-informed security practices, and child safety and protection. Many officers have backgrounds in education, youth services, or school resource officer programs. We maintain comprehensive professional liability insurance, workers\' compensation coverage, child safety insurance, and provide detailed incident reports meeting educational institution documentation requirements.',
        
        // Pricing Models
        pricingModels: [
            {
                icon: 'fas fa-user-shield',
                title: 'School Resource Officers',
                description: 'Dedicated SROs for schools starting at $40-$60/hour',
                features: [
                    'Student-focused security approach',
                    'Visitor management and access control',
                    'Emergency response capabilities',
                    'Positive campus presence'
                ]
            },
            {
                icon: 'fas fa-walking',
                title: 'Campus Security Patrols',
                description: 'Mobile security for college and university campuses',
                features: [
                    'Campus patrols and monitoring',
                    'Building and facility security',
                    'Emergency response and coordination',
                    'Student safety escort services'
                ]
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Full Campus Security Programs',
                description: 'Comprehensive security for educational institutions',
                features: [
                    'Multiple officers and supervisors',
                    'Armed or unarmed options',
                    'Custom security protocols',
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
                question: 'How much does school security cost in California?',
                answer: 'School and campus security services in California typically cost $40-$80 per hour per security officer, depending on whether officers are armed or unarmed, educational level (K-12 vs college), security role (stationed vs patrol), and contract length. School Resource Officers (SROs) for K-12 schools cost $40-$60/hour for unarmed and $65-$80/hour for armed. Most schools budget $6,000-$20,000 monthly for professional security coverage.'
            },
            {
                question: 'What is a School Resource Officer (SRO)?',
                answer: 'A School Resource Officer (SRO) is a trained security officer or law enforcement professional assigned to work in schools to provide campus security, student safety, emergency response, and positive interactions with students. SROs perform access control, visitor management, campus patrols, threat assessment, emergency response, and serve as positive role models and mentors for students. Professional SROs balance security effectiveness with supportive youth engagement.'
            },
            {
                question: 'Do schools need armed or unarmed security?',
                answer: 'Most K-12 schools utilize unarmed security guards or SROs to maintain a welcoming learning environment while providing effective security. Armed security may be appropriate for schools with history of violence, schools in high-crime areas, large high schools, or specific threat situations. Many districts prefer unarmed security complemented by strong visitor management, access control, and coordination with local law enforcement. We provide security assessments to determine appropriate security levels.'
            },
            {
                question: 'What training do school security guards receive?',
                answer: 'School security guards complete specialized training in educational environment security, positive student interaction and youth development, visitor management and access control, active shooter response and lockdown procedures, emergency evacuation and crisis response, threat assessment and reporting, conflict de-escalation with students, bullying and violence prevention, trauma-informed security practices, and child safety protocols. Officers also receive school-specific training on campus layout, policies, and emergency procedures.'
            },
            {
                question: 'How do security guards prevent school shootings?',
                answer: 'Security guards help prevent school violence through visible deterrence discouraging attackers, access control preventing unauthorized entry, threat identification and reporting to administration, relationship building with students who may report concerns, rapid emergency response and lockdown coordination, and monitoring of campus areas and visitors. While no security measure is 100% guaranteed, professional security significantly reduces risk and provides rapid response capabilities.'
            },
            {
                question: 'Do you provide security for college and university campuses?',
                answer: 'Yes, ShieldWise Security provides comprehensive campus security for community colleges, universities, and higher education institutions throughout California including campus patrols and building security, residence hall and dormitory security, parking structure and lot security, library and facility access control, athletic event security, student safety escort services, emergency response and coordination, and special event security for campus functions.'
            },
            {
                question: 'Can security guards help with student discipline?',
                answer: 'Security guards support school administration and staff with safety and security issues but do not handle student discipline, which remains the responsibility of school administrators and teachers. Security officers can assist with safety concerns, de-escalate conflicts, separate students in fights, remove unauthorized individuals, and coordinate with administration during incidents, but school staff maintain authority over student discipline decisions and consequences.'
            },
            {
                question: 'How quickly can you deploy school security guards?',
                answer: 'ShieldWise Security can deploy school security guards within 1-2 weeks for most California schools and campuses to allow time for comprehensive background checks (DOJ clearances, LiveScan), TB testing as required, school-specific training and orientation, and coordination with school administration. Emergency deployment may be available faster for urgent situations. We recommend planning 2-3 weeks in advance for new school security programs.'
            }
        ],
        
        // Related Services
        relatedServices: [
            {
                name: 'Unarmed Security Guards',
                icon: 'fas fa-user-shield',
                description: 'Professional unarmed security for schools and educational facilities',
                url: '/services/unarmed-security'
            },
            {
                name: 'Armed Security Guards',
                icon: 'fas fa-shield-alt',
                description: 'Armed SROs and security for schools requiring enhanced protection',
                url: '/services/armed-security'
            },
            {
                name: 'Event Security',
                icon: 'fas fa-calendar-check',
                description: 'Security for graduations, school events, and athletic competitions',
                url: '/services/event-security'
            },
            {
                name: 'Commercial Security',
                icon: 'fas fa-building',
                description: 'Security for educational administrative buildings and facilities',
                url: '/services/commercial-security'
            },
            {
                name: 'Mobile Patrol',
                icon: 'fas fa-car',
                description: 'Regular patrol services for large campus grounds and parking',
                url: '/services/patrol'
            },
            {
                name: 'Fire Watch',
                icon: 'fas fa-fire-extinguisher',
                description: 'Fire watch during campus construction and renovations',
                url: '/services/fire-watch'
            }
        ],

        // Features
        features: [
            {
                icon: 'fas fa-child',
                title: 'Student Safety',
                description: 'Professional security focused on creating safe environments for learning and development.'
            },
            {
                icon: 'fas fa-door-open',
                title: 'Access Control',
                description: 'Visitor management, check-in systems, and unauthorized entry prevention.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Emergency Response',
                description: 'Active shooter training, lockdown coordination, and rapid emergency response.'
            },
            {
                icon: 'fas fa-walking',
                title: 'Campus Patrols',
                description: 'Regular patrols of buildings, grounds, parking areas, and campus facilities.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Positive Engagement',
                description: 'Supportive interaction with students creating trust and positive relationships.'
            },
            {
                icon: 'fas fa-search',
                title: 'Threat Assessment',
                description: 'Identification and reporting of potential threats, concerning behavior, and safety issues.'
            }
        ],

        // Statistics
        statistics: [
            { number: '75+', label: 'Schools Secured' },
            { number: '99.8%', label: 'Safety Record' },
            { number: '24/7', label: 'Availability' },
            { number: '10+', label: 'Years Experience' }
        ],

        // Testimonials
        testimonials: [
            {
                name: 'Dr. Patricia Anderson',
                title: 'School Principal',
                image: 'dr-patricia-anderson.jpg',
                quote: 'ShieldWise SROs have transformed our campus safety while maintaining a positive learning environment. The officers are wonderful with students and parents feel much more confident about school safety.'
            },
            {
                name: 'James Rodriguez',
                title: 'University Security Director',
                image: 'james-rodriguez.jpg',
                quote: 'Our campus security partnership with ShieldWise has been outstanding. Their officers are professional, well-trained, and understand the unique dynamics of university environments. Highly recommended.'
            },
            {
                name: 'Michelle Thompson',
                title: 'School District Administrator',
                image: 'michelle-thompson.jpg',
                quote: 'We use ShieldWise security at multiple schools in our district. Consistent quality, excellent training, and positive interactions with students. They truly understand educational security.'
            }
        ]
    };

    res.render('services/_service-layout', { 
        data: serviceData,
        pageUrl: '/services/educational-security'
    });
});

module.exports = router;

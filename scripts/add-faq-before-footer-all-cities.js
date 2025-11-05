const fs = require('fs');
const path = require('path');

const faqTemplate = (cityName) => `
    <!-- FAQ Section -->
    <section class="anaheim-section">
        <div class="container">
            <h3>Frequently Asked Questions</h3>
            <div class="anaheim-faq-list" itemscope itemtype="https://schema.org/FAQPage">
                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">What security services does ShieldWise Security offer in ${cityName} California?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">ShieldWise Security offers comprehensive security services in ${cityName} including armed and unarmed security guards, mobile patrol services, fire watch, construction site security, event security, and executive protection. All services available 24/7 with rapid deployment throughout ${cityName}.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">How quickly can ShieldWise Security deploy guards in ${cityName}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">For emergency situations, our licensed security guards can deploy within 1-2 hours anywhere in ${cityName}. Standard service deployments occur within 24 hours or less. We maintain rapid response capabilities for urgent security needs throughout ${cityName}.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">Are ShieldWise Security guards licensed and insured in ${cityName}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Yes, all ShieldWise security personnel are fully licensed, insured, and certified. Our guards undergo rigorous background checks and receive comprehensive training. We maintain a $2 million general liability insurance policy, and all armed security officers hold valid firearms permits.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">Does ShieldWise provide commercial security in ${cityName}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Yes, ShieldWise Security specializes in commercial security throughout ${cityName}. Our security teams provide warehouse protection, retail security, office building security, and industrial facility protection with comprehensive coverage and professional service.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">What makes ShieldWise different from other security companies in ${cityName}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">ShieldWise Security stands apart through our specialized expertise and deep understanding of ${cityName}'s unique security needs. We provide personalized service tailored to local businesses and communities. We maintain strong relationships with local law enforcement and provide advanced reporting systems.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">How much do security guard services cost in ${cityName} California?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Security guard costs in ${cityName} vary based on service type, hours required, and specific needs. Contact us at (714) 716-7430 for a customized quote tailored to your ${cityName} security requirements. We offer competitive rates with flexible pricing options.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">Do you offer 24/7 security coverage in ${cityName}?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Absolutely. We provide round-the-clock security coverage for businesses and properties throughout ${cityName}. Our services include overnight security, weekend coverage, holiday protection, and continuous monitoring with dedicated teams familiar with ${cityName}'s unique security landscape.</p>
                    </div>
                </div>

                <div class="anaheim-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="faq-question">
                        <h4 itemprop="name">What technology do your ${cityName} security guards use?</h4>
                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                    </div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Our ${cityName} security teams utilize advanced technology including GPS tracking systems, real-time reporting apps, body cameras, two-way communication devices, mobile check-in systems, and integration capabilities with existing facility security platforms. We leverage technology to enhance security effectiveness while maintaining human oversight and decision-making.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const cities = [
    { slug: 'apple-valley', name: 'Apple Valley' },
    { slug: 'barstow', name: 'Barstow' },
    { slug: 'big-bear-lake', name: 'Big Bear Lake' },
    { slug: 'chino', name: 'Chino' },
    { slug: 'chino-hills', name: 'Chino Hills' },
    { slug: 'colton', name: 'Colton' },
    { slug: 'fontana', name: 'Fontana' },
    { slug: 'hesperia', name: 'Hesperia' },
    { slug: 'highland', name: 'Highland' },
    { slug: 'montclair', name: 'Montclair' },
    { slug: 'ontario', name: 'Ontario' },
    { slug: 'rancho-cucamonga', name: 'Rancho Cucamonga' },
    { slug: 'redlands', name: 'Redlands' },
    { slug: 'rialto', name: 'Rialto' },
    { slug: 'san-bernardino', name: 'San Bernardino' },
    { slug: 'twentynine-palms', name: 'Twentynine Palms' },
    { slug: 'upland', name: 'Upland' },
    { slug: 'victorville', name: 'Victorville' }
];

cities.forEach(({ slug, name }) => {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${slug}.ejs`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${slug} - file not found`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove any existing FAQ sections first
    content = content.replace(/<!-- FAQ Section -->[\s\S]*?<section class="anaheim-section">[\s\S]*?<h3>Frequently Asked Questions<\/h3>[\s\S]*?<\/section>/g, '');
    
    // Find the footer include and insert FAQ before it
    const footerPattern = /(\s*)<%- include\('\.\.\/partials\/Footer'\) %>/;
    const footerMatch = content.match(footerPattern);
    
    if (footerMatch) {
        content = content.replace(footerPattern, `${faqTemplate(name)}\n\n$1<%- include('../partials/Footer') %>`);
        console.log(`✅ Added FAQ section before footer in ${slug}`);
    } else {
        console.log(`⚠️  Could not find footer include in ${slug}`);
    }
    
    fs.writeFileSync(filePath, content);
});

console.log('\n🎉 All FAQ sections added in correct position (before footer)!');

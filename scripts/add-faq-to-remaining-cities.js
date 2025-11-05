const fs = require('fs');
const path = require('path');

const faqTemplate = (cityName, citySlug) => `
    <!-- FAQ Section - Enhanced -->
    <section class="anaheim-faq-section">
        <div class="anaheim-faq-container">
            <h2>Frequently Asked Questions</h2>
            
            <div class="anaheim-faq-navigation">
                <button class="faq-nav-btn faq-nav-prev" aria-label="Previous FAQs">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="faq-nav-btn faq-nav-next" aria-label="Next FAQs">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <div class="anaheim-faq-carousel">
                <div class="anaheim-faq-list">
                    <div class="anaheim-faq-item">
                        <div class="faq-question">
                            <h3>What security services does ShieldWise Security offer in ${cityName} California?</h3>
                            <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="faq-answer">
                            <p>ShieldWise Security offers comprehensive security services in ${cityName} including armed and unarmed security guards, mobile patrol services, fire watch, construction site security, event security, and executive protection. All services available 24/7 with rapid deployment throughout ${cityName}.</p>
                        </div>
                    </div>

                    <div class="anaheim-faq-item">
                        <div class="faq-question">
                            <h3>How quickly can ShieldWise Security deploy guards in ${cityName}?</h3>
                            <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="faq-answer">
                            <p>For emergency situations, our licensed security guards can deploy within 1-2 hours anywhere in ${cityName}. Standard service deployments occur within 24 hours or less. We maintain rapid response capabilities for urgent security needs throughout ${cityName}.</p>
                        </div>
                    </div>

                    <div class="anaheim-faq-item">
                        <div class="faq-question">
                            <h3>Are ShieldWise Security guards licensed and insured in ${cityName}?</h3>
                            <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="faq-answer">
                            <p>Yes, all ShieldWise security personnel are fully licensed, insured, and certified. Our guards undergo rigorous background checks and receive comprehensive training. We maintain a $2 million general liability insurance policy, and all armed security officers hold valid firearms permits.</p>
                        </div>
                    </div>

                    <div class="anaheim-faq-item">
                        <div class="faq-question">
                            <h3>Does ShieldWise provide commercial security in ${cityName}?</h3>
                            <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="faq-answer">
                            <p>Yes, ShieldWise Security specializes in commercial security throughout ${cityName}. Our security teams provide warehouse protection, retail security, office building security, and industrial facility protection with comprehensive coverage and professional service.</p>
                        </div>
                    </div>

                    <div class="anaheim-faq-item">
                        <div class="faq-question">
                            <h3>What makes ShieldWise different from other security companies in ${cityName}?</h3>
                            <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="faq-answer">
                            <p>ShieldWise Security stands apart through our specialized expertise and deep understanding of ${cityName}'s unique security needs. We provide personalized service tailored to local businesses and communities. We maintain strong relationships with local law enforcement and provide advanced reporting systems.</p>
                        </div>
                    </div>

                    <div class="anaheim-faq-item">
                        <div class="faq-question">
                            <h3>How much do security guard services cost in ${cityName} California?</h3>
                            <div class="faq-toggle"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="faq-answer">
                            <p>Security guard costs in ${cityName} vary based on service type, hours required, and specific needs. Contact us at (714) 716-7430 for a customized quote tailored to your ${cityName} security requirements. We offer competitive rates with flexible pricing options.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const faqScript = `
    <!-- FAQ Carousel & Accordion JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // FAQ Accordion functionality
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const item = this.closest('.anaheim-faq-item');
                    const toggle = this.querySelector('.faq-toggle i');
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    document.querySelectorAll('.anaheim-faq-item').forEach(faqItem => {
                        faqItem.classList.remove('active');
                        const faqToggle = faqItem.querySelector('.faq-toggle i');
                        if (faqToggle) {
                            faqToggle.classList.remove('fa-minus');
                            faqToggle.classList.add('fa-plus');
                        }
                    });
                    
                    // If this item wasn't active, open it
                    if (!isActive) {
                        item.classList.add('active');
                        toggle.classList.remove('fa-plus');
                        toggle.classList.add('fa-minus');
                    }
                });
            });

            // FAQ Carousel functionality
            const faqList = document.querySelector('.anaheim-faq-list');
            const faqItems = document.querySelectorAll('.anaheim-faq-item');
            const prevBtn = document.querySelector('.faq-nav-prev');
            const nextBtn = document.querySelector('.faq-nav-next');
            
            if (faqList && faqItems.length > 0 && prevBtn && nextBtn) {
                let currentIndex = 0;
                const itemsPerView = window.innerWidth > 768 ? 3 : 1;
                const maxIndex = Math.max(0, faqItems.length - itemsPerView);
                
                function updateCarousel() {
                    const itemWidth = faqItems[0].offsetWidth;
                    const gap = 30;
                    const offset = currentIndex * (itemWidth + gap);
                    faqList.style.transform = \`translateX(-\${offset}px)\`;
                    
                    // Update button states
                    prevBtn.disabled = currentIndex === 0;
                    nextBtn.disabled = currentIndex >= maxIndex;
                    
                    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
                }
                
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                });
                
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        updateCarousel();
                    }
                });
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    currentIndex = 0;
                    updateCarousel();
                });
                
                // Initialize
                updateCarousel();
            }
        });
    </script>`;

const cities = [
    { slug: 'san-bernardino', name: 'San Bernardino' },
    { slug: 'twentynine-palms', name: 'Twentynine Palms' }
];

cities.forEach(({ slug, name }) => {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${slug}.ejs`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${slug} - file not found`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove old FAQ section
    content = content.replace(/<section class="enhanced-faq-section">[\s\S]*?<\/section>[\s]*<!-- (Call to Action|CTA|Enhanced Banner|Footer)/g, 
        `${faqTemplate(name, slug)}\n\n    <!-- $1`);
    
    // Add FAQ script before footer if not already there
    if (!content.includes('FAQ Carousel & Accordion JavaScript')) {
        const insertPosition = content.indexOf('<%- include(\'../partials/Footer\') %>');
        if (insertPosition !== -1) {
            content = content.slice(0, insertPosition) + faqScript + '\n\n    ' + content.slice(insertPosition);
        }
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${slug} with new FAQ section`);
});

console.log('\n🎉 FAQ sections updated for remaining cities!');

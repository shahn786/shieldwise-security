const fs = require('fs');
const path = require('path');

const cities = [
    'apple-valley',
    'barstow',
    'big-bear-lake',
    'chino',
    'chino-hills',
    'colton',
    'fontana',
    'hesperia',
    'highland',
    'montclair',
    'ontario',
    'rancho-cucamonga',
    'redlands',
    'rialto',
    'san-bernardino',
    'twentynine-palms',
    'upland',
    'victorville'
];

const faqCarouselScript = `
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

cities.forEach(citySlug => {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${citySlug} - file not found`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if FAQ section exists
    if (!content.includes('anaheim-faq-section')) {
        console.log(`⚠️  Skipping ${citySlug} - no FAQ section found`);
        return;
    }
    
    // Step 1: Add carousel navigation buttons to FAQ section
    const faqNavigationHTML = `
            <div class="anaheim-faq-navigation">
                <button class="faq-nav-btn faq-nav-prev" aria-label="Previous FAQs">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="faq-nav-btn faq-nav-next" aria-label="Next FAQs">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>`;
    
    // Add navigation buttons after the h2 if not already there
    if (!content.includes('faq-nav-btn')) {
        content = content.replace(
            /(<h2>Frequently Asked Questions<\/h2>)/,
            `$1${faqNavigationHTML}`
        );
    }
    
    // Step 2: Make FAQ list a carousel container
    if (!content.includes('anaheim-faq-carousel')) {
        content = content.replace(
            /<div class="anaheim-faq-list">/,
            '<div class="anaheim-faq-carousel">\n            <div class="anaheim-faq-list">'
        );
        
        // Close the carousel wrapper
        const faqSectionEndRegex = /([\s]*)<\/div>\s*<\/div>\s*<\/section>[\s]*<!-- (Call to Action|CTA|Enhanced Banner)/;
        content = content.replace(
            faqSectionEndRegex,
            '$1    </div>\n$1</div>\n$1</section>\n\n    <!-- $2'
        );
    }
    
    // Step 3: Add or update the FAQ carousel script
    // Remove old FAQ script if exists
    content = content.replace(/<!-- FAQ Carousel & Accordion JavaScript -->[\s\S]*?<\/script>/g, '');
    
    // Add new script before the closing body tag or before footer
    if (!content.includes('FAQ Carousel & Accordion JavaScript')) {
        const insertPosition = content.indexOf('<%- include(\'../partials/Footer\') %>');
        if (insertPosition !== -1) {
            content = content.slice(0, insertPosition) + faqCarouselScript + '\n\n    ' + content.slice(insertPosition);
        }
    }
    
    // Write the updated content
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${citySlug}`);
});

console.log('\n🎉 FAQ carousel and accordion functionality added to all cities!');

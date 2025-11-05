
const fs = require('fs');
const path = require('path');

const cities = [
    'apple-valley', 'barstow', 'big-bear-lake', 'chino', 'chino-hills', 'colton',
    'fontana', 'hesperia', 'highland', 'montclair', 'ontario',
    'rancho-cucamonga', 'redlands', 'rialto', 'san-bernardino',
    'twentynine-palms', 'upland', 'victorville'
];

cities.forEach(citySlug => {
    const filepath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
    
    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  File not found: ${citySlug}.ejs`);
        return;
    }

    let content = fs.readFileSync(filepath, 'utf8');
    
    // Get city name for display
    const cityName = citySlug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    // Fix FAQ questions - ensure onclick handlers are present
    content = content.replace(
        /<div class="faq-question"(?![^>]*onclick)[^>]*>/g,
        '<div class="faq-question" onclick="toggleFAQ(this)">'
    );

    // Ensure FAQ toggle icons exist - add if missing
    if (!content.includes('class="faq-toggle"')) {
        content = content.replace(
            /<\/h3>\s*<\/div>\s*<div class="faq-answer">/g,
            '</h3>\n                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>\n                    </div>\n                    <div class="faq-answer">'
        );
    }

    // Fix testimonial slider buttons
    content = content.replace(
        /<button class="slider-prev"[^>]*>/g,
        '<button class="slider-prev" onclick="moveTestimonialSlide(-1)" aria-label="Previous testimonial">'
    );
    
    content = content.replace(
        /<button class="slider-next"[^>]*>/g,
        '<button class="slider-next" onclick="moveTestimonialSlide(1)" aria-label="Next testimonial">'
    );

    // Fix indicators with onclick handlers
    content = content.replace(
        /<span class="indicator active"[^>]*data-slide="0"[^>]*>/g,
        '<span class="indicator active" data-slide="0" onclick="setTestimonialSlide(0)"></span>'
    );
    
    content = content.replace(
        /<span class="indicator"[^>]*data-slide="1"[^>]*>/g,
        '<span class="indicator" data-slide="1" onclick="setTestimonialSlide(1)"></span>'
    );
    
    content = content.replace(
        /<span class="indicator"[^>]*data-slide="2"[^>]*>/g,
        '<span class="indicator" data-slide="2" onclick="setTestimonialSlide(2)"></span>'
    );

    // Remove any existing script section to avoid duplicates
    content = content.replace(/<script>[\s\S]*?\/\/ FAQ Toggle Functionality[\s\S]*?<\/script>\s*<\/body>/g, '</body>');

    // Add comprehensive FAQ and Testimonials JavaScript before </body>
    const completeScript = `
<script>
// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.closest('.anaheim-faq-item');
    if (!faqItem) return;
    
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const toggleIcon = faqItem.querySelector('.faq-toggle i');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.anaheim-faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        if (answer) answer.style.maxHeight = null;
        if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        if (faqAnswer) {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        }
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-plus');
            toggleIcon.classList.add('fa-minus');
        }
    }
}

// Testimonials Slider Functionality
let currentTestimonialSlide = 0;
let testimonialSlides = [];
let testimonialIndicators = [];
let autoSlideInterval = null;

function initTestimonials() {
    testimonialSlides = document.querySelectorAll('.anaheim-testimonial-item');
    testimonialIndicators = document.querySelectorAll('.slider-indicators .indicator');
    
    if (testimonialSlides.length > 0) {
        showTestimonialSlide(currentTestimonialSlide);
        startAutoSlide();
    }
}

function showTestimonialSlide(n) {
    if (testimonialSlides.length === 0) return;
    
    if (n >= testimonialSlides.length) { 
        currentTestimonialSlide = 0; 
    } else if (n < 0) { 
        currentTestimonialSlide = testimonialSlides.length - 1; 
    } else {
        currentTestimonialSlide = n;
    }
    
    testimonialSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentTestimonialSlide) {
            slide.classList.add('active');
        }
    });
    
    testimonialIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentTestimonialSlide) {
            indicator.classList.add('active');
        }
    });
}

function moveTestimonialSlide(direction) {
    showTestimonialSlide(currentTestimonialSlide + direction);
    resetAutoSlide();
}

function setTestimonialSlide(n) {
    showTestimonialSlide(n);
    resetAutoSlide();
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        moveTestimonialSlide(1);
    }, 5000);
}

function resetAutoSlide() {
    startAutoSlide();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
    initTestimonials();
}
</script>

</body>
</html>`;

    content = content.replace('</body>\n</html>', completeScript);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed FAQ and testimonials for ${cityName}`);
});

console.log('\n🎉 All San Bernardino County city FAQ and testimonials fixed!');

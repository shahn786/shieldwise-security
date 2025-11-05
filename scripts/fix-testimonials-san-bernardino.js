
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

    // Fix FAQ questions to have proper onclick handlers
    content = content.replace(
        /<div class="faq-question">\s*<h3>/g,
        '<div class="faq-question" onclick="toggleFAQ(this)">\n                        <h3>'
    );

    // Ensure FAQ toggle icons exist
    if (!content.includes('faq-toggle')) {
        content = content.replace(
            /<\/h3>\s*<\/div>\s*<div class="faq-answer">/g,
            '</h3>\n                        <div class="faq-toggle"><i class="fas fa-plus"></i></div>\n                    </div>\n                    <div class="faq-answer">'
        );
    }

    // Add FAQ JavaScript if not present
    if (!content.includes('function toggleFAQ')) {
        const faqScript = `
<script>
// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.closest('.anaheim-faq-item');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const toggleIcon = faqItem.querySelector('.faq-toggle i');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.anaheim-faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.faq-toggle i');
        if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-plus');
            toggleIcon.classList.add('fa-minus');
        }
    }
}

// Testimonials Slider Functionality
let currentTestimonialSlide = 0;
const testimonialSlides = document.querySelectorAll('.anaheim-testimonial-item');
const testimonialIndicators = document.querySelectorAll('.slider-indicators .indicator');

function showTestimonialSlide(n) {
    if (testimonialSlides.length === 0) return;
    
    if (n >= testimonialSlides.length) { currentTestimonialSlide = 0; }
    if (n < 0) { currentTestimonialSlide = testimonialSlides.length - 1; }
    
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    testimonialSlides[currentTestimonialSlide].classList.add('active');
    testimonialIndicators[currentTestimonialSlide].classList.add('active');
}

function moveTestimonialSlide(direction) {
    currentTestimonialSlide += direction;
    showTestimonialSlide(currentTestimonialSlide);
}

function setTestimonialSlide(n) {
    currentTestimonialSlide = n;
    showTestimonialSlide(currentTestimonialSlide);
}

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    moveTestimonialSlide(1);
}, 5000);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showTestimonialSlide(currentTestimonialSlide);
});
</script>

</body>
</html>`;

        content = content.replace('</body>\n</html>', faqScript);
    } else {
        // Update existing FAQ function
        content = content.replace(
            /function toggleFAQ\(element\) \{[\s\S]*?\n\}/,
            `function toggleFAQ(element) {
    const faqItem = element.closest('.anaheim-faq-item');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const toggleIcon = faqItem.querySelector('.faq-toggle i');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.anaheim-faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.faq-toggle i');
        if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-plus');
            toggleIcon.classList.add('fa-minus');
        }
    }
}`
        );
    }

    // Fix testimonial slider buttons with onclick handlers
    content = content.replace(
        /<button class="slider-prev"[^>]*>/g,
        '<button class="slider-prev" onclick="moveTestimonialSlide(-1)" aria-label="Previous testimonial">'
    );
    
    content = content.replace(
        /<button class="slider-next"[^>]*>/g,
        '<button class="slider-next" onclick="moveTestimonialSlide(1)" aria-label="Next testimonial">'
    );

    // Fix the indicators with onclick handlers
    content = content.replace(
        /<span class="indicator active" data-slide="0"[^>]*><\/span>/g,
        '<span class="indicator active" data-slide="0" onclick="setTestimonialSlide(0)"></span>'
    );
    
    content = content.replace(
        /<span class="indicator" data-slide="1"[^>]*><\/span>/g,
        '<span class="indicator" data-slide="1" onclick="setTestimonialSlide(1)"></span>'
    );
    
    content = content.replace(
        /<span class="indicator" data-slide="2"[^>]*><\/span>/g,
        '<span class="indicator" data-slide="2" onclick="setTestimonialSlide(2)"></span>'
    );

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed FAQ and testimonials for ${cityName}`);
});

console.log('\n🎉 All San Bernardino County city FAQ and testimonials fixed!');

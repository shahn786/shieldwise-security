
const fs = require('fs');
const path = require('path');

const cities = [
    'barstow', 'big-bear-lake', 'chino', 'chino-hills', 'colton',
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

    // Fix the slider buttons with onclick handlers
    content = content.replace(
        /<button class="slider-prev" aria-label="Previous testimonial">/g,
        '<button class="slider-prev" onclick="moveTestimonialSlide(-1)" aria-label="Previous testimonial">'
    );
    
    content = content.replace(
        /<button class="slider-next" aria-label="Next testimonial">/g,
        '<button class="slider-next" onclick="moveTestimonialSlide(1)" aria-label="Next testimonial">'
    );

    // Fix the indicators with onclick handlers
    content = content.replace(
        /<span class="indicator active" data-slide="0"><\/span>/g,
        '<span class="indicator active" data-slide="0" onclick="setTestimonialSlide(0)"></span>'
    );
    
    content = content.replace(
        /<span class="indicator" data-slide="1"><\/span>/g,
        '<span class="indicator" data-slide="1" onclick="setTestimonialSlide(1)"></span>'
    );
    
    content = content.replace(
        /<span class="indicator" data-slide="2"><\/span>/g,
        '<span class="indicator" data-slide="2" onclick="setTestimonialSlide(2)"></span>'
    );

    // Add the JavaScript if not already present
    if (!content.includes('function showTestimonialSlide')) {
        const scriptToAdd = `
<script>
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

// Initialize first slide
showTestimonialSlide(currentTestimonialSlide);
</script>

</body>
</html>`;

        content = content.replace('</body>\n</html>', scriptToAdd);
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed testimonials slider for ${cityName}`);
});

console.log('\n🎉 All San Bernardino County city testimonials sliders fixed!');

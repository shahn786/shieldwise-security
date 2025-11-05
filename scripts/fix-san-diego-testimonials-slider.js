
const fs = require('fs');
const path = require('path');

const cities = [
    'carlsbad', 'chula-vista', 'coronado', 'del-mar', 'el-cajon',
    'encinitas', 'escondido', 'imperial-beach', 'la-mesa', 'lemon-grove',
    'national-city', 'oceanside', 'poway', 'san-diego', 'san-marcos',
    'santee', 'solana-beach', 'vista'
];

console.log('Starting testimonials slider fix for San Diego County cities...');

cities.forEach(citySlug => {
    const filepath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
    
    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  File not found: ${citySlug}.ejs`);
        return;
    }

    let content = fs.readFileSync(filepath, 'utf8');
    const cityName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Add onclick handlers to slider buttons if not already present
    if (!content.includes('onclick="moveTestimonialSlide(-1)"')) {
        content = content.replace(
            /<button class="slider-prev" aria-label="Previous testimonial">/g,
            '<button class="slider-prev" onclick="moveTestimonialSlide(-1)" aria-label="Previous testimonial">'
        );
    }

    if (!content.includes('onclick="moveTestimonialSlide(1)"')) {
        content = content.replace(
            /<button class="slider-next" aria-label="Next testimonial">/g,
            '<button class="slider-next" onclick="moveTestimonialSlide(1)" aria-label="Next testimonial">'
        );
    }

    // Add onclick handlers to indicators if not already present
    if (!content.includes('onclick="setTestimonialSlide(')) {
        content = content.replace(
            /<span class="indicator active" data-slide="0"><\/span>/g,
            '<span class="indicator active" onclick="setTestimonialSlide(0)" data-slide="0"></span>'
        );
        content = content.replace(
            /<span class="indicator" data-slide="1"><\/span>/g,
            '<span class="indicator" onclick="setTestimonialSlide(1)" data-slide="1"></span>'
        );
        content = content.replace(
            /<span class="indicator" data-slide="2"><\/span>/g,
            '<span class="indicator" onclick="setTestimonialSlide(2)" data-slide="2"></span>'
        );
    }

    // Add the slider script if not already present
    if (!content.includes('function moveTestimonialSlide(')) {
        const scriptToAdd = `
<script>
// Testimonials Slider Functionality
const testimonialSlides = document.querySelectorAll('.anaheim-testimonial-item');
const testimonialIndicators = document.querySelectorAll('.slider-indicators .indicator');
let currentTestimonialSlide = 0;

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

console.log('\n🎉 All San Diego County city testimonials sliders have been updated!');

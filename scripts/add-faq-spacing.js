const fs = require('fs');
const path = require('path');

const cities = [
    'apple-valley', 'barstow', 'big-bear-lake', 'chino', 'chino-hills', 
    'colton', 'fontana', 'hesperia', 'highland', 'montclair', 'ontario', 
    'rancho-cucamonga', 'redlands', 'rialto', 'san-bernardino', 
    'twentynine-palms', 'upland', 'victorville'
];

cities.forEach(city => {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${city}.ejs`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${city} - file not found`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the FAQ section and add inline CSS for margin and padding
    const oldFaqSectionTag = /<section class="anaheim-section">\s*<div class="container">\s*<h3>Frequently Asked Questions<\/h3>/;
    const newFaqSectionTag = `<section class="anaheim-section" style="margin-top: 60px; margin-bottom: 60px; padding-top: 40px; padding-bottom: 40px;">
        <div class="container">
            <h3>Frequently Asked Questions</h3>`;
    
    if (content.match(oldFaqSectionTag)) {
        content = content.replace(oldFaqSectionTag, newFaqSectionTag);
        console.log(`✅ Added FAQ spacing for ${city}`);
    } else {
        console.log(`⚠️  FAQ section not found in ${city}`);
    }
    
    fs.writeFileSync(filePath, content);
});

console.log('\n🎉 FAQ spacing added for all San Bernardino County cities!');

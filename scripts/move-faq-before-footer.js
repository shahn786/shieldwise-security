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
    
    // Find and extract the FAQ section
    const faqPattern = /<!-- FAQ Section -->\s*<section class="anaheim-section">[\s\S]*?<h3>Frequently Asked Questions<\/h3>[\s\S]*?<\/section>/;
    const faqMatch = content.match(faqPattern);
    
    if (!faqMatch) {
        console.log(`⚠️  No FAQ section found in ${city}`);
        return;
    }
    
    const faqSection = faqMatch[0];
    
    // Remove FAQ from current position
    content = content.replace(faqPattern, '');
    
    // Find the footer include and insert FAQ before it
    const footerPattern = /<%- include\('\.\.\/partials\/Footer'\) %>/;
    
    if (content.match(footerPattern)) {
        content = content.replace(footerPattern, `${faqSection}\n\n    <%- include('../partials/Footer') %>`);
        console.log(`✅ Moved FAQ section to before footer in ${city}`);
    } else {
        console.log(`⚠️  Could not find footer include in ${city}`);
    }
    
    fs.writeFileSync(filePath, content);
});

console.log('\n🎉 All FAQ sections moved to correct position!');

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
    
    // First, remove the misplaced FAQ section (anywhere in the file)
    const faqPattern = /<!-- FAQ Section -->[\s\S]*?<section class="anaheim-section">[\s\S]*?<h3>Frequently Asked Questions<\/h3>[\s\S]*?<\/section>/;
    const faqMatch = content.match(faqPattern);
    
    if (faqMatch) {
        const faqSection = faqMatch[0];
        content = content.replace(faqPattern, '');
        
        // Now insert it before the footer (or CTA section)
        const footerPattern = /<!-- (Footer|Call-to-Action Section|CTA Section) -->/;
        const insertMatch = content.match(footerPattern);
        
        if (insertMatch) {
            const insertPosition = content.indexOf(insertMatch[0]);
            content = content.slice(0, insertPosition) + '\n    ' + faqSection + '\n\n    ' + content.slice(insertPosition);
            console.log(`✅ Fixed FAQ positioning for ${city}`);
        } else {
            console.log(`⚠️  Could not find insertion point for ${city}`);
        }
    } else {
        console.log(`⚠️  No FAQ section found in ${city}`);
    }
    
    fs.writeFileSync(filePath, content);
});

console.log('\n🎉 FAQ positioning fixed for all cities!');

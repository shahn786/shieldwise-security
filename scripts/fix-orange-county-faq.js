const fs = require('fs');
const path = require('path');

// Orange County cities
const orangeCountyCities = [
    'aliso-viejo', 'anaheim', 'buena-park', 'costa-mesa', 'cypress',
    'dana-point', 'fountain-valley', 'fullerton', 'garden-grove',
    'huntington-beach', 'irvine', 'la-habra', 'laguna-beach',
    'laguna-hills', 'laguna-niguel', 'lake-forest', 'mission-viejo',
    'newport-beach', 'orange', 'orange-county', 'brea', 'placentia',
    'san-clemente', 'santa-ana', 'tustin', 'westminster', 'yorba-linda'
];

console.log('Fixing jQuery defer attribute for Orange County cities...\n');

let fixedCount = 0;
let alreadyFixedCount = 0;

for (const city of orangeCountyCities) {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${city}.ejs`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${city}: File not found`);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const beforeChange = content;
    
    // Remove defer from jQuery script tag
    content = content.replace(
        /<script src="https:\/\/code\.jquery\.com\/jquery-3\.[0-9]+\.[0-9]+\.slim\.min\.js" defer><\/script>/g,
        '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>'
    );
    
    // Also try the non-slim version
    content = content.replace(
        /<script src="https:\/\/code\.jquery\.com\/jquery-3\.[0-9]+\.[0-9]+\.min\.js" defer><\/script>/g,
        '<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>'
    );
    
    if (content !== beforeChange) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${city}: Removed defer from jQuery`);
        fixedCount++;
    } else {
        console.log(`⏭️  ${city}: Already fixed or no defer attribute`);
        alreadyFixedCount++;
    }
}

console.log(`\n🎉 Orange County FAQ fix complete!`);
console.log(`   ✅ Fixed: ${fixedCount} cities`);
console.log(`   ⏭️  Already OK: ${alreadyFixedCount} cities`);
console.log(`   📋 Total: ${orangeCountyCities.length} cities processed`);

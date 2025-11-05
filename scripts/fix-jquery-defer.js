const fs = require('fs');
const path = require('path');

// San Diego County cities
const sanDiegoCountyCities = [
    'carlsbad', 'chula-vista', 'coronado', 'del-mar', 'el-cajon',
    'encinitas', 'escondido', 'imperial-beach', 'la-mesa', 'lemon-grove',
    'national-city', 'oceanside', 'poway', 'san-diego', 'san-marcos',
    'santee', 'solana-beach', 'vista'
];

console.log('Fixing jQuery defer attribute for San Diego County cities...\n');

let fixedCount = 0;

for (const city of sanDiegoCountyCities) {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${city}.ejs`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${city}: File not found`);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove defer from jQuery script tag
    const beforeChange = content;
    content = content.replace(
        /<script src="https:\/\/code\.jquery\.com\/jquery-3\.[0-9]+\.[0-9]+\.slim\.min\.js" defer><\/script>/g,
        '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>'
    );
    
    if (content !== beforeChange) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${city}: Removed defer from jQuery`);
        fixedCount++;
    } else {
        console.log(`⏭️  ${city}: No defer found or already fixed`);
    }
}

console.log(`\n🎉 jQuery defer fix complete!`);
console.log(`   ✅ Fixed: ${fixedCount} files`);
console.log(`   Total: ${sanDiegoCountyCities.length} cities processed`);

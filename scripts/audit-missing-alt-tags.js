
const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, '../views');
const results = [];

function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            scanDirectory(filePath);
        } else if (file.endsWith('.ejs')) {
            const content = fs.readFileSync(filePath, 'utf8');
            const imgTags = content.match(/<img[^>]+>/g) || [];
            
            imgTags.forEach((tag, index) => {
                if (!tag.includes('alt=')) {
                    results.push({
                        file: filePath.replace(__dirname + '/../', ''),
                        line: content.substring(0, content.indexOf(tag)).split('\n').length,
                        tag: tag.substring(0, 100) + '...'
                    });
                }
            });
        }
    });
}

console.log('🔍 Scanning for images missing alt attributes...\n');
scanDirectory(viewsDir);

if (results.length === 0) {
    console.log('✅ All images have alt attributes!');
} else {
    console.log(`❌ Found ${results.length} images missing alt attributes:\n`);
    results.forEach(r => {
        console.log(`📄 ${r.file}:${r.line}`);
        console.log(`   ${r.tag}\n`);
    });
}

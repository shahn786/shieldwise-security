
const fs = require('fs');
const path = require('path');

const serviceFiles = [
    'views/services/apartment-security.ejs',
    'views/services/armed-security.ejs',
    'views/services/commercial-security.ejs',
    'views/services/construction-security.ejs',
    'views/services/educational-campus-security.ejs',
    'views/services/event-security.ejs',
    'views/services/executive-protection.ejs',
    'views/services/fire-watch.ejs',
    'views/services/hospital-security.ejs',
    'views/services/hotel-security.ejs',
    'views/services/patrol.ejs',
    'views/services/shopping-center-security.ejs',
    'views/services/special-event-security.ejs',
    'views/services/unarmed-security.ejs'
];

function fixBackToTop(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Fix 1: Add id="top" to body tag if not present
        if (!content.includes('id="top"') && content.includes('<body')) {
            content = content.replace(/<body([^>]*)>/g, '<body id="top"$1>');
            modified = true;
            console.log(`✓ Added id="top" to body in ${filePath}`);
        }

        // Fix 2: Update back-to-top button href from #main-content to #top
        if (content.includes('href="#main-content" id="backToTop"')) {
            content = content.replace(
                /href="#main-content" id="backToTop"/g,
                'href="#top" id="backToTop"'
            );
            modified = true;
            console.log(`✓ Fixed back-to-top href in ${filePath}`);
        }

        if (modified) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Updated: ${filePath}\n`);
        } else {
            console.log(`ℹ️  No changes needed: ${filePath}\n`);
        }

    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

console.log('Fixing back-to-top button in all service files...\n');
serviceFiles.forEach(fixBackToTop);
console.log('Done!');

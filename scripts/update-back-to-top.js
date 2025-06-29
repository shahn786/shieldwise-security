
const fs = require('fs');
const path = require('path');

const cityFiles = [
    'views/cities/los-angeles.ejs',
    'views/cities/hollywood.ejs',
    'views/cities/beverly-hills.ejs',
    'views/cities/santa-monica.ejs',
    'views/cities/pasadena.ejs',
    'views/cities/glendale.ejs',
    'views/cities/burbank.ejs',
    'views/cities/west-hollywood.ejs',
    'views/cities/long-beach.ejs',
    'views/cities/torrance.ejs',
    'views/cities/culver-city.ejs',
    'views/cities/malibu.ejs',
    'views/cities/san-fernando.ejs',
    'views/cities/van-nuys.ejs',
    'views/cities/inglewood.ejs',
    'views/cities/compton.ejs',
    'views/cities/palmdale.ejs',
    'views/cities/lancaster.ejs',
    'views/cities/pomona.ejs',
    'views/cities/whittier.ejs',
    'views/cities/el-monte.ejs',
    'views/cities/hawthorne.ejs',
    'views/cities/south-gate.ejs',
    'views/cities/arcadia.ejs',
    'views/cities/azusa.ejs',
    'views/cities/baldwin-park.ejs',
    'views/cities/bellflower.ejs',
    'views/cities/calabasas.ejs',
    'views/cities/carson.ejs',
    'views/cities/cypress.ejs',
    'views/cities/downey.ejs',
    'views/cities/gardena.ejs',
    'views/cities/hermosa-beach.ejs',
    'views/cities/huntington-park.ejs',
    'views/cities/la-mirada.ejs',
    'views/cities/manhattan-beach.ejs',
    'views/cities/norwalk.ejs',
    'views/cities/redondo-beach.ejs'
];

function updateBackToTopInFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add id="top" to body tag if not present
        if (!content.includes('id="top"') && content.includes('<body')) {
            content = content.replace(/<body([^>]*)>/g, '<body id="top"$1>');
        }
        
        // Update back-to-top button structure
        const oldBackToTopPattern = /<a\s+href="#"\s+class="back-to-top"[^>]*>\s*<i\s+class="fas\s+fa-arrow-up"><\/i>\s*<\/a>/g;
        const newBackToTop = `<a href="#top" id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </a>`;
        
        if (oldBackToTopPattern.test(content)) {
            content = content.replace(oldBackToTopPattern, newBackToTop);
        }
        
        // Add standardized JavaScript if not present
        if (!content.includes('src="/JS/back-to-top.js"')) {
            // Remove any inline back-to-top JavaScript
            content = content.replace(/\/\* Back to Top Button Functionality[\s\S]*?}\);/g, '');
            content = content.replace(/\/\/ Back to Top Button Functionality[\s\S]*?}\);/g, '');
            
            // Add the standardized scripts before closing body tag
            const scriptSection = `
    <!-- JavaScript for Interactive Elements -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- Back to Top and Common Functionality -->
    <script src="/JS/back-to-top.js"></script>`;
            
            content = content.replace('</body>', `${scriptSection}\n</body>`);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated: ${filePath}`);
        
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

console.log('Updating back-to-top functionality in LA city files...');
cityFiles.forEach(updateBackToTopInFile);
console.log('Update complete!');

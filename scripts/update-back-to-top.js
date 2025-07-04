
const fs = require('fs');
const path = require('path');

// All files that need back-to-top updates
const filesToUpdate = [
    // City files
    'views/cities/alhambra.ejs',
    'views/cities/aliso-viejo.ejs',
    'views/cities/anaheim.ejs',
    'views/cities/arcadia.ejs',
    'views/cities/azusa.ejs',
    'views/cities/baldwin-park.ejs',
    'views/cities/bellflower.ejs',
    'views/cities/beverly-hills.ejs',
    'views/cities/buena-park.ejs',
    'views/cities/burbank.ejs',
    'views/cities/calabasas.ejs',
    'views/cities/carson.ejs',
    'views/cities/cathedral-city.ejs',
    'views/cities/cerritos.ejs',
    'views/cities/coachella.ejs',
    'views/cities/compton.ejs',
    'views/cities/corona.ejs',
    'views/cities/costa-mesa.ejs',
    'views/cities/culver-city.ejs',
    'views/cities/cypress.ejs',
    'views/cities/dana-point.ejs',
    'views/cities/downey.ejs',
    'views/cities/downtown-los-Angeles.ejs',
    'views/cities/el-monte.ejs',
    'views/cities/el-segundo.ejs',
    'views/cities/fountain-valley.ejs',
    'views/cities/fullerton.ejs',
    'views/cities/garden-grove.ejs',
    'views/cities/gardena.ejs',
    'views/cities/glendale.ejs',
    'views/cities/hawthorne.ejs',
    'views/cities/hemet.ejs',
    'views/cities/hermosa-beach.ejs',
    'views/cities/hollywood.ejs',
    'views/cities/huntington-beach.ejs',
    'views/cities/huntington-park.ejs',
    'views/cities/indio.ejs',
    'views/cities/inglewood.ejs',
    'views/cities/irvine.ejs',
    'views/cities/la-habra.ejs',
    'views/cities/la-mirada.ejs',
    'views/cities/la-quinta.ejs',
    'views/cities/laguna-beach.ejs',
    'views/cities/laguna-hills.ejs',
    'views/cities/laguna-niguel.ejs',
    'views/cities/lake-forest.ejs',
    'views/cities/lancaster.ejs',
    'views/cities/long-beach.ejs',
    'views/cities/los-angeles.ejs',
    'views/cities/malibu.ejs',
    'views/cities/manhattan-beach.ejs',
    'views/cities/mission-viejo.ejs',
    'views/cities/moreno-valley.ejs',
    'views/cities/murrieta.ejs',
    'views/cities/newport-beach.ejs',
    'views/cities/norwalk.ejs',
    'views/cities/orange-county.ejs',
    'views/cities/palm-springs.ejs',
    'views/cities/palmdale.ejs',
    'views/cities/pasadena.ejs',
    'views/cities/perris.ejs',
    'views/cities/placentia.ejs',
    'views/cities/pomona.ejs',
    'views/cities/redondo-beach.ejs',
    'views/cities/riverside-county.ejs',
    'views/cities/riverside.ejs',
    'views/cities/san-clemente.ejs',
    'views/cities/san-fernando.ejs',
    'views/cities/san-pedro.ejs',
    'views/cities/santa-ana.ejs',
    'views/cities/santa-monica.ejs',
    'views/cities/south-gate.ejs',
    'views/cities/temecula.ejs',
    'views/cities/torrance.ejs',
    'views/cities/tustin.ejs',
    'views/cities/van-nuys.ejs',
    'views/cities/west-hollywood.ejs',
    'views/cities/westminster.ejs',
    'views/cities/whittier.ejs',
    'views/cities/yorba-linda.ejs',
    // Service files
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
    'views/services/unarmed-security.ejs',
    // Main pages
    'views/contact.ejs',
    'views/get-quote.ejs',
    'views/index.ejs',
    'views/login.ejs',
    'views/register.ejs',
    'views/service-areas.ejs',
    'views/services.ejs',
    'views/testimonials-showcase.ejs'
];

function updateBackToTopInFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add id="top" to body tag if not present and body tag exists
        if (!content.includes('id="top"') && content.includes('<body')) {
            content = content.replace(/<body([^>]*)>/g, '<body id="top"$1>');
        }
        
        // Remove any existing back-to-top buttons
        const oldBackToTopPatterns = [
            /<a\s+href="#"\s+class="back-to-top"[^>]*>\s*<i\s+class="fas\s+fa-arrow-up"><\/i>\s*<\/a>/g,
            /<a\s+href="#"\s+class="back-to-top"[^>]*>\s*<i\s+class="fas\s+fa-chevron-up"><\/i>\s*<\/a>/g,
            /<a[^>]*class="back-to-top"[^>]*>[\s\S]*?<\/a>/g
        ];
        
        oldBackToTopPatterns.forEach(pattern => {
            content = content.replace(pattern, '');
        });
        
        // Add standardized back-to-top button before closing body tag if not present
        const standardBackToTop = `    <!-- Back to Top Button -->
    <a href="#top" id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </a>`;
        
        if (!content.includes('id="backToTop"')) {
            content = content.replace('</body>', `${standardBackToTop}\n</body>`);
        }
        
        // Remove any inline back-to-top JavaScript
        content = content.replace(/\/\*[\s\S]*?Back[\s\S]*?to[\s\S]*?Top[\s\S]*?\*\/[\s\S]*?}\);/g, '');
        content = content.replace(/\/\/[\s\S]*?Back[\s\S]*?to[\s\S]*?Top[\s\S]*?}\);/g, '');
        
        // Add external CSS and JS references if not present in head section
        if (content.includes('<head>') && !content.includes('back-to.css')) {
            content = content.replace(
                /(<link[^>]*href="\/css\/style\.css"[^>]*>)/,
                '$1\n    <link rel="stylesheet" href="/css/back-to.css">'
            );
        }
        
        // Add JavaScript reference before closing body tag if not present
        if (!content.includes('back-to-top.js')) {
            const scriptSection = `    <!-- Back to Top JavaScript -->
    <script src="/JS/back-to-top.js"></script>`;
            
            content = content.replace('</body>', `${scriptSection}\n</body>`);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated: ${filePath}`);
        
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

console.log('Updating back-to-top functionality across all files...');
filesToUpdate.forEach(updateBackToTopInFile);
console.log('Update complete!');

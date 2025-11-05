const fs = require('fs');
const path = require('path');

const faqJavaScript = `
    <!-- FAQ Accordion JavaScript -->
    <script>
        $(document).ready(function() {
            // Enhanced FAQ Toggles with smooth animations
            $('.faq-question').on('click', function() {
                const $item = $(this).closest('.anaheim-faq-item');
                const $toggle = $(this).find('.faq-toggle i');
                const $answer = $item.find('.faq-answer');
                const isActive = $item.hasClass('active');

                // Close all FAQ items first
                $('.anaheim-faq-item').removeClass('active');
                $('.anaheim-faq-item .faq-toggle i').removeClass('fa-minus').addClass('fa-plus');

                // If this item wasn't active, open it
                if (!isActive) {
                    $item.addClass('active');
                    $toggle.removeClass('fa-plus').addClass('fa-minus');
                }
            });
        });
    </script>
`;

function addFaqJavaScript() {
    // Find all city EJS files
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');
    const cityFiles = fs.readdirSync(citiesDir)
        .filter(file => file.endsWith('.ejs'))
        .map(file => path.join(citiesDir, file));
    
    console.log(`Found ${cityFiles.length} city files to process...\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const filePath of cityFiles) {
        const cityName = path.basename(filePath, '.ejs');
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if FAQ JavaScript already exists
        if (content.includes('FAQ Accordion JavaScript') || content.includes("$('.faq-question').on('click'")) {
            console.log(`⏭️  Skipped ${cityName} - FAQ JavaScript already exists`);
            skippedCount++;
            continue;
        }
        
        // Find the location to insert the FAQ JavaScript
        // We'll insert it right after the back-to-top.js script and before any other inline scripts
        const backToTopPattern = /<script src="\/JS\/back-to-top\.js"[^>]*><\/script>/;
        
        if (backToTopPattern.test(content)) {
            // Insert after back-to-top.js
            content = content.replace(
                backToTopPattern,
                (match) => match + faqJavaScript
            );
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Added FAQ JavaScript to ${cityName}`);
            updatedCount++;
        } else {
            // Try alternative location - before closing body tag
            const bodyClosePattern = /<\/body>/;
            if (bodyClosePattern.test(content)) {
                content = content.replace(bodyClosePattern, faqJavaScript + '\n</body>');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Added FAQ JavaScript to ${cityName} (before </body>)`);
                updatedCount++;
            } else {
                console.log(`⚠️  Could not find insertion point for ${cityName}`);
            }
        }
    }
    
    console.log(`\n🎉 FAQ JavaScript update complete!`);
    console.log(`   ✅ Updated: ${updatedCount} files`);
    console.log(`   ⏭️  Skipped: ${skippedCount} files`);
}

addFaqJavaScript();

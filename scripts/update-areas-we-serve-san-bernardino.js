const fs = require('fs');
const path = require('path');

// Import the city areas data from the add script
const { cityAreasData } = require('./add-areas-we-serve-san-bernardino.js');

// Function to update areas section in a city file
function updateAreasInCity(citySlug) {
    const filepath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  File not found: ${citySlug}.ejs`);
        return false;
    }

    const cityData = cityAreasData[citySlug];
    if (!cityData) {
        console.log(`⚠️  No area data for ${citySlug}`);
        return false;
    }

    // Read the file
    let content = fs.readFileSync(filepath, 'utf8');

    // Check if areas section exists
    if (!content.includes('Areas We Serve in')) {
        console.log(`⚠️  ${citySlug}.ejs does not have Areas We Serve section`);
        return false;
    }

    // Find the areas grid section
    const gridStartPattern = '<div class="anaheim-areas-grid">';
    const gridEndPattern = '</div>\n        </div>\n\n        <div class="anaheim-nearby-cities">';
    
    const gridStartIndex = content.indexOf(gridStartPattern);
    const gridEndIndex = content.indexOf(gridEndPattern);

    if (gridStartIndex === -1 || gridEndIndex === -1) {
        console.log(`⚠️  Could not find areas grid section in ${citySlug}.ejs`);
        return false;
    }

    // Generate new areas grid content
    const newAreasGrid = `<div class="anaheim-areas-grid">
                ${cityData.areas.map(area => `<div class="anaheim-area-item">
                    <h3>${area.title}</h3>
                    <p>${area.description}</p>
                </div>`).join('\n                ')}
            </div>`;

    // Replace the old areas grid with new one
    const updatedContent = 
        content.slice(0, gridStartIndex) + 
        newAreasGrid + 
        '\n        ' +
        content.slice(gridEndIndex);

    // Write back to file
    fs.writeFileSync(filepath, updatedContent, 'utf8');
    console.log(`✅ Updated Areas We Serve section in ${citySlug}.ejs with ${cityData.areas.length} neighborhoods`);
    return true;
}

// Main execution
function main() {
    console.log('🚀 Starting to update Areas We Serve sections with specific neighborhood data...\n');

    const citiesToUpdate = Object.keys(cityAreasData);
    let successCount = 0;

    citiesToUpdate.forEach(citySlug => {
        if (updateAreasInCity(citySlug)) {
            successCount++;
        }
    });

    console.log(`\n🎉 Completed! Successfully updated ${successCount} out of ${citiesToUpdate.length} city pages with research-based neighborhood data.`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { updateAreasInCity };

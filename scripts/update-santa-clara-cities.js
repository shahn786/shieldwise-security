const fs = require('fs');
const path = require('path');

// Cities to update (Campbell already done, San Jose already done)
const citiesToUpdate = [
    'cupertino',
    'gilroy',
    'los-gatos',
    'milpitas',
    'morgan-hill',
    'mountain-view',
    'palo-alto',
    'sunnyvale'
];

const citiesDir = path.join(__dirname, '..', 'views', 'cities');

function updateCity(cityFileName) {
    const filePath = path.join(citiesDir, `${cityFileName}.ejs`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Add intro-box wrapper around intro paragraphs
    // Find pattern: <div class="landscape-main">\n followed by paragraphs
    const introBoxRegex = /(<div class="landscape-main">)\s*(<p class="landscape-intro">)(.*?<\/p>)\s*(<p>.*?<\/p>)\s*(<p>.*?<\/p>)\s*(<div class="security-considerations">)/s;
    
    content = content.replace(introBoxRegex, (match, mainDiv, introP, introContent, p2, p3, secDiv) => {
        // Make first paragraph bold intro
        const firstPara = introP + introContent.replace(/^(.*?)(\s+presents|\s+is|\s+requires)/, '<strong>$1</strong>$2');
        
        return `${mainDiv}
                                <div class="landscape-intro-box">
                                    <div class="intro-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="intro-content">
                                        ${firstPara}
                                        
                                        ${p2}
                                        
                                        ${p3}
                                    </div>
                                </div>

                                ${secDiv}`;
    });
    
    // Step 2: Add consideration-highlight spans to each consideration-item
    // Find pattern: </div>\n</div>\n</div> at end of consideration-item
    const highlightData = {
        // Generic highlights that work for most cities
        0: 'Specialized Protection',
        1: 'Advanced Security',
        2: 'Safety First Approach',
        3: 'Flexible Scheduling',
        4: 'Expert Coordination',
        5: 'Critical Infrastructure'
    };
    
    // Add highlights to consideration items
    let itemCount = 0;
    content = content.replace(/(<div class="consideration-text">[\s\S]*?<p>.*?<\/p>)\s*(<\/div>\s*<\/div>\s*<div class="consideration-item">|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/g, 
        (match, textContent, closingTags) => {
            const highlightText = highlightData[itemCount % 6] || 'Professional Service';
            itemCount++;
            
            return `${textContent}
                                                <div class="consideration-highlight">
                                                    <span><i class="fas fa-check"></i> ${highlightText}</span>
                                                </div>
                                            ${closingTags}`;
        }
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${cityFileName}.ejs`);
}

// Update all cities
citiesToUpdate.forEach(city => {
    try {
        updateCity(city);
    } catch (error) {
        console.error(`❌ Error updating ${city}:`, error.message);
    }
});

console.log('\n🎉 All Santa Clara County cities updated successfully!');

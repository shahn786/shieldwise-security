const fs = require('fs');
const path = require('path');

// Complete list of cities from user's requirement organized by county
const cityData = {
    'Los Angeles County': [
        'alhambra', 'arcadia', 'azusa', 'baldwin-park', 'bellflower', 'beverly-hills',
        'burbank', 'calabasas', 'carson', 'cerritos', 'compton', 'culver-city', 'downey',
        'downtown-los-Angeles', 'el-monte', 'gardena', 'glendale', 'hawthorne',
        'hermosa-beach', 'hollywood', 'inglewood', 'la-mirada', 'lancaster', 'long-beach',
        'los-angeles', 'malibu', 'manhattan-beach', 'norwalk', 'palmdale', 'pasadena',
        'pomona', 'redondo-beach', 'santa-monica', 'torrance', 'west-hollywood'
    ],
    'Orange County': [
        'aliso-viejo', 'anaheim', 'buena-park', 'costa-mesa', 'cypress', 'dana-point',
        'fountain-valley', 'fullerton', 'garden-grove', 'huntington-beach', 'irvine',
        'la-habra', 'laguna-beach', 'laguna-hills', 'laguna-niguel', 'lake-forest',
        'mission-viejo', 'newport-beach', 'orange', 'orange-county', 'placentia',
        'san-clemente', 'santa-ana', 'tustin', 'westminster', 'yorba-linda', 'brea'
    ],
    'San Diego County': [
        'carlsbad', 'chula-vista', 'coronado', 'del-mar', 'el-cajon', 'encinitas',
        'escondido', 'imperial-beach', 'la-mesa', 'lemon-grove', 'national-city',
        'oceanside', 'poway', 'san-diego', 'san-marcos', 'santee', 'solana-beach', 'vista'
    ],
    'Sacramento County': [
        'carmichael', 'citrus-heights', 'downtown-sacramento', 'east-sacramento', 'elk-grove',
        'fair-oaks', 'folsom', 'isleton', 'land-park', 'midtown', 'midtown-sacramento',
        'natomas', 'pocket', 'rancho-cordova', 'roseville', 'sacramento', 'west-sacramento'
    ],
    'Riverside County': [
        'cathedral-city', 'coachella', 'corona', 'hemet', 'indio', 'la-quinta',
        'moreno-valley', 'murrieta', 'palm-springs', 'perris', 'riverside',
        'riverside-county', 'temecula'
    ],
    'San Bernardino County': [
        'apple-valley', 'barstow', 'big-bear-lake', 'chino', 'chino-hills', 'colton',
        'fontana', 'hesperia', 'highland', 'montclair', 'ontario', 'rancho-cucamonga',
        'redlands', 'rialto', 'san-bernardino', 'twentynine-palms', 'upland', 'victorville'
    ],
    'Santa Clara County': [
        'campbell', 'cupertino', 'gilroy', 'los-gatos', 'milpitas', 'morgan-hill',
        'mountain-view', 'palo-alto', 'san-jose', 'santa-clara', 'sunnyvale'
    ],
    'Alameda County': [
        'alameda', 'berkeley', 'castro-valley', 'dublin', 'emeryville', 'fremont',
        'hayward', 'newark', 'oakland', 'pleasanton', 'san-leandro', 'san-lorenzo', 'union-city'
    ],
    'Ventura County': [
        'camarillo', 'fillmore', 'moorpark', 'ojai', 'oxnard', 'port-hueneme',
        'santa-paula', 'simi-valley', 'thousand-oaks', 'ventura'
    ],
    'Central Valley Counties': [
        'bakersfield', 'clovis', 'davis', 'delano', 'fresno', 'hanford', 'lemoore',
        'madera', 'merced', 'modesto', 'porterville', 'stockton', 'tulare', 'visalia', 'woodland'
    ],
    'Bay Area & Other': [
        'san-fernando', 'san-francisco', 'south-gate', 'van-nuys', 'whittier', 'huntington-park'
    ]
};

// Helper function to format city names
function formatCityName(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Check which city page files exist
function checkCityFiles() {
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');
    const missingFiles = [];
    const existingFiles = [];
    
    Object.keys(cityData).forEach(county => {
        cityData[county].forEach(city => {
            const filePath = path.join(citiesDir, `${city}.ejs`);
            if (fs.existsSync(filePath)) {
                existingFiles.push(city);
            } else {
                missingFiles.push({ city, county });
            }
        });
    });
    
    return { existingFiles, missingFiles };
}

// Generate the routing code for all cities
function generateRoutingCode() {
    let routingCode = '\n// ========================================\n';
    routingCode += '// COMPREHENSIVE CITY ROUTING - Auto-Generated\n';
    routingCode += '// ========================================\n\n';
    
    // Los Angeles County
    routingCode += '// Los Angeles County cities routes\n';
    routingCode += 'const losAngelesCountyCities = [\n';
    routingCode += cityData['Los Angeles County'].map(city => `    '${city}'`).join(',\n');
    routingCode += '\n];\n\n';
    routingCode += `losAngelesCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Route with /los-angeles/ prefix
    app.get(\`/los-angeles/\${city}\`, (req, res) => {
        try {
            res.render(\`cities/\${city}\`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: \`/los-angeles/\${city}\`
            });
        } catch (error) {
            console.error(\`Error rendering \${city} page:\`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Direct route without prefix
    app.get(\`/\${city}\`, (req, res) => {
        try {
            res.render(\`cities/\${city}\`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: \`/\${city}\`
            });
        } catch (error) {
            console.error(\`Error rendering \${city} page:\`, error);
            res.status(500).send('Page not found');
        }
    });
});\n\n`;

    // Orange County
    routingCode += '// Orange County cities routes\n';
    routingCode += 'const orangeCountyCities = [\n';
    routingCode += cityData['Orange County'].map(city => `    '${city}'`).join(',\n');
    routingCode += '\n];\n\n';
    routingCode += `orangeCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Orange County prefix route
    app.get(\`/orange-county/\${city}\`, (req, res) => {
        try {
            res.render(\`cities/\${city}\`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: \`/orange-county/\${city}\`
            });
        } catch (error) {
            console.error(\`Error rendering \${city} page:\`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Direct route without county prefix
    app.get(\`/\${city}\`, (req, res) => {
        try {
            res.render(\`cities/\${city}\`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: \`/\${city}\`
            });
        } catch (error) {
            console.error(\`Error rendering \${city} page:\`, error);
            res.status(500).send('Page not found');
        }
    });
});\n\n`;

    // Continue for all other counties...
    return routingCode;
}

// Main verification function
function verifyRouting() {
    console.log('🔍 Verifying city routing configuration...\n');
    
    const { existingFiles, missingFiles } = checkCityFiles();
    
    console.log('✅ Existing city page files:', existingFiles.length);
    
    if (missingFiles.length > 0) {
        console.log('\n⚠️  Missing city page files:', missingFiles.length);
        console.log('\nMissing files:');
        missingFiles.forEach(({ city, county }) => {
            console.log(`  - ${city}.ejs (${county})`);
        });
    } else {
        console.log('\n✅ All city page files exist!');
    }
    
    // Summary by county
    console.log('\n📊 Summary by County:');
    Object.keys(cityData).forEach(county => {
        const countyCount = cityData[county].length;
        const existingCount = cityData[county].filter(city => 
            existingFiles.includes(city)
        ).length;
        console.log(`  ${county}: ${existingCount}/${countyCount} cities`);
    });
    
    return { existingFiles, missingFiles };
}

// Run verification if this script is executed directly
if (require.main === module) {
    verifyRouting();
}

module.exports = { cityData, verifyRouting, formatCityName };

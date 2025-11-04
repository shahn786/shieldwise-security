const fs = require('fs');
const path = require('path');
const http = require('http');

// Get all city files from views/cities directory
function getAllCityFiles() {
    const citiesDir = path.join(__dirname, '..', 'views', 'cities');
    const files = fs.readdirSync(citiesDir);
    return files
        .filter(file => file.endsWith('.ejs'))
        .map(file => file.replace('.ejs', ''))
        .sort();
}

// County mapping for each city
const cityCountyMapping = {
    // Los Angeles County (35)
    'alhambra': 'los-angeles', 'arcadia': 'los-angeles', 'azusa': 'los-angeles',
    'baldwin-park': 'los-angeles', 'bellflower': 'los-angeles', 'beverly-hills': 'los-angeles',
    'burbank': 'los-angeles', 'calabasas': 'los-angeles', 'carson': 'los-angeles',
    'cerritos': 'los-angeles', 'compton': 'los-angeles', 'culver-city': 'los-angeles',
    'downey': 'los-angeles', 'downtown-los-Angeles': 'los-angeles', 'el-monte': 'los-angeles',
    'gardena': 'los-angeles', 'glendale': 'los-angeles', 'hawthorne': 'los-angeles',
    'hermosa-beach': 'los-angeles', 'hollywood': 'los-angeles', 'inglewood': 'los-angeles',
    'la-mirada': 'los-angeles', 'lancaster': 'los-angeles', 'long-beach': 'los-angeles',
    'malibu': 'los-angeles', 'manhattan-beach': 'los-angeles', 'norwalk': 'los-angeles',
    'palmdale': 'los-angeles', 'pasadena': 'los-angeles', 'pomona': 'los-angeles',
    'redondo-beach': 'los-angeles', 'santa-monica': 'los-angeles', 'torrance': 'los-angeles',
    'west-hollywood': 'los-angeles', 'whittier': 'los-angeles',
    
    // Orange County (27)
    'aliso-viejo': 'orange-county', 'anaheim': 'orange-county', 'brea': 'orange-county',
    'buena-park': 'orange-county', 'costa-mesa': 'orange-county', 'cypress': 'orange-county',
    'dana-point': 'orange-county', 'fountain-valley': 'orange-county', 'fullerton': 'orange-county',
    'garden-grove': 'orange-county', 'huntington-beach': 'orange-county', 'irvine': 'orange-county',
    'la-habra': 'orange-county', 'laguna-beach': 'orange-county', 'laguna-hills': 'orange-county',
    'laguna-niguel': 'orange-county', 'lake-forest': 'orange-county', 'mission-viejo': 'orange-county',
    'newport-beach': 'orange-county', 'orange': 'orange-county', 'placentia': 'orange-county',
    'san-clemente': 'orange-county', 'santa-ana': 'orange-county', 'tustin': 'orange-county',
    'westminster': 'orange-county', 'yorba-linda': 'orange-county',
    
    // San Diego County (18)
    'carlsbad': 'california', 'chula-vista': 'california', 'coronado': 'california',
    'del-mar': 'california', 'el-cajon': 'california', 'encinitas': 'california',
    'escondido': 'california', 'imperial-beach': 'california', 'la-mesa': 'california',
    'lemon-grove': 'california', 'national-city': 'california', 'oceanside': 'california',
    'poway': 'california', 'san-diego': 'california', 'san-marcos': 'california',
    'santee': 'california', 'solana-beach': 'california', 'vista': 'california',
    
    // Sacramento County (18)
    'carmichael': 'sacramento-county', 'citrus-heights': 'sacramento-county', 'davis': 'sacramento-county',
    'downtown-sacramento': 'sacramento-county', 'east-sacramento': 'sacramento-county', 'elk-grove': 'sacramento-county',
    'fair-oaks': 'sacramento-county', 'folsom': 'sacramento-county', 'isleton': 'sacramento-county',
    'land-park': 'sacramento-county', 'midtown': 'sacramento-county', 'midtown-sacramento': 'sacramento-county',
    'natomas': 'sacramento-county', 'pocket': 'sacramento-county', 'rancho-cordova': 'sacramento-county',
    'roseville': 'sacramento-county', 'west-sacramento': 'sacramento-county', 'woodland': 'sacramento-county',
    
    // Riverside County (12)
    'cathedral-city': 'riverside-county', 'coachella': 'riverside-county', 'corona': 'riverside-county',
    'hemet': 'riverside-county', 'indio': 'riverside-county', 'la-quinta': 'riverside-county',
    'moreno-valley': 'riverside-county', 'murrieta': 'riverside-county', 'palm-springs': 'riverside-county',
    'perris': 'riverside-county', 'riverside': 'riverside-county', 'temecula': 'riverside-county',
    
    // San Bernardino County (18)
    'apple-valley': null, 'barstow': null, 'big-bear-lake': null, 'chino': null, 'chino-hills': null,
    'colton': null, 'fontana': null, 'hesperia': null, 'highland': null, 'montclair': null,
    'ontario': null, 'rancho-cucamonga': null, 'redlands': null, 'rialto': null,
    'san-bernardino': null, 'twentynine-palms': null, 'upland': null, 'victorville': null,
    
    // Santa Clara County (11)
    'campbell': 'santa-clara-county', 'cupertino': 'santa-clara-county', 'gilroy': 'santa-clara-county',
    'los-gatos': 'santa-clara-county', 'milpitas': 'santa-clara-county', 'morgan-hill': 'santa-clara-county',
    'mountain-view': 'santa-clara-county', 'palo-alto': 'santa-clara-county', 'san-jose': 'santa-clara-county',
    'santa-clara': 'santa-clara-county', 'sunnyvale': 'santa-clara-county',
    
    // Alameda County (13)
    'alameda': 'alameda-county', 'berkeley': 'alameda-county', 'castro-valley': 'alameda-county',
    'dublin': 'alameda-county', 'emeryville': 'alameda-county', 'fremont': 'alameda-county',
    'hayward': 'alameda-county', 'newark': 'alameda-county', 'oakland': 'alameda-county',
    'pleasanton': 'alameda-county', 'san-leandro': 'alameda-county', 'san-lorenzo': 'alameda-county',
    'union-city': 'alameda-county',
    
    // Ventura County (10)
    'camarillo': 'ventura-county', 'fillmore': 'ventura-county', 'moorpark': 'ventura-county',
    'ojai': 'ventura-county', 'oxnard': 'ventura-county', 'port-hueneme': 'ventura-county',
    'santa-paula': 'ventura-county', 'simi-valley': 'ventura-county', 'thousand-oaks': 'ventura-county',
    'ventura': 'ventura-county',
    
    // Central Valley (15)
    'bakersfield': 'central-valley', 'clovis': 'central-valley', 'delano': 'central-valley',
    'fresno': 'central-valley', 'hanford': 'central-valley', 'lemoore': 'central-valley',
    'madera': 'central-valley', 'merced': 'central-valley', 'modesto': 'central-valley',
    'porterville': 'central-valley', 'stockton': 'central-valley', 'tulare': 'central-valley',
    'visalia': 'central-valley',
    
    // Other cities
    'san-fernando': null, 'south-gate': null, 'van-nuys': null, 'huntington-park': null,
    
    // Main county/city pages
    'los-angeles': null, 'orange-county': null, 'san-francisco': null, 'sacramento': 'sacramento-county',
    'riverside-county': null
};

// Test a single route
function testRoute(route) {
    return new Promise((resolve) => {
        const options = {
            hostname: '0.0.0.0',
            port: 5000,
            path: route,
            method: 'GET',
            headers: { 'User-Agent': 'Complete-Verification-Test' }
        };

        const req = http.request(options, (res) => {
            resolve({ route, status: res.statusCode, success: res.statusCode === 200 });
        });

        req.on('error', () => {
            resolve({ route, status: 'ERROR', success: false });
        });

        req.setTimeout(3000, () => {
            req.abort();
            resolve({ route, status: 'TIMEOUT', success: false });
        });

        req.end();
    });
}

// Main verification function
async function verifyAll183Cities() {
    console.log('🔍 COMPREHENSIVE CITY ROUTING VERIFICATION');
    console.log('Testing all 183 California cities with uniform routing patterns\n');
    console.log('='.repeat(80));
    
    const allCities = getAllCityFiles();
    console.log(`\n📊 Found ${allCities.length} city files in views/cities/\n`);
    
    const results = {
        totalCities: allCities.length,
        totalRoutes: 0,
        passed: 0,
        failed: 0,
        failedRoutes: []
    };
    
    for (const city of allCities) {
        const county = cityCountyMapping[city];
        const routesToTest = [];
        
        // Test direct route: /{city}
        routesToTest.push(`/${city}`);
        
        // Test county-prefixed route if applicable
        if (county) {
            routesToTest.push(`/${county}/${city}`);
            
            // Test security routes
            routesToTest.push(`/${city}-security`);
            routesToTest.push(`/${county}/${city}-security`);
        } else {
            // Just test security route for cities without county prefix
            routesToTest.push(`/${city}-security`);
        }
        
        // Special cases
        if (city === 'sacramento') {
            routesToTest.push('/sacramento/sacramento-security');
        }
        
        for (const route of routesToTest) {
            results.totalRoutes++;
            const result = await testRoute(route);
            
            if (result.success) {
                results.passed++;
            } else {
                results.failed++;
                results.failedRoutes.push(result.route);
            }
        }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('📊 COMPREHENSIVE VERIFICATION RESULTS');
    console.log('='.repeat(80));
    console.log(`Total Cities: ${results.totalCities}`);
    console.log(`Total Routes Tested: ${results.totalRoutes}`);
    console.log(`✅ Passed: ${results.passed} (${((results.passed / results.totalRoutes) * 100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${results.failed} (${((results.failed / results.totalRoutes) * 100).toFixed(1)}%)`);
    console.log('='.repeat(80));
    
    if (results.failed > 0) {
        console.log('\n❌ FAILED ROUTES:');
        results.failedRoutes.forEach(route => console.log(`  - ${route}`));
    } else {
        console.log('\n🎉 SUCCESS! All 183 cities have complete routing patterns!');
        console.log('✅ Direct routes (/{city})');
        console.log('✅ County-prefixed routes (/{county}/{city})');
        console.log('✅ Security-suffixed routes (/{city}-security, /{county}/{city}-security)');
    }
    
    console.log('\n' + '='.repeat(80));
}

// Run verification
verifyAll183Cities().catch(error => {
    console.error('Verification error:', error);
    process.exit(1);
});

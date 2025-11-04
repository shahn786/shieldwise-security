const http = require('http');

// Test security suffix routes for all counties
const securityTestRoutes = {
    'Los Angeles County': [
        '/hollywood-security',
        '/los-angeles/hollywood-security',
        '/pasadena-security',
        '/los-angeles/pasadena-security'
    ],
    'Orange County': [
        '/anaheim-security',
        '/orange-county/anaheim-security',
        '/irvine-security',
        '/orange-county/irvine-security'
    ],
    'San Diego County': [
        '/san-diego-security',
        '/california/san-diego-security',
        '/chula-vista-security',
        '/california/chula-vista-security'
    ],
    'Sacramento County': [
        '/sacramento-security',
        '/sacramento-county/sacramento-security',
        '/sacramento/sacramento-security',
        '/elk-grove-security',
        '/sacramento-county/elk-grove-security'
    ],
    'Riverside County': [
        '/riverside-security',
        '/riverside-county/riverside-security',
        '/palm-springs-security',
        '/riverside-county/palm-springs-security'
    ],
    'San Bernardino County': [
        '/san-bernardino-security',
        '/fontana-security',
        '/rancho-cucamonga-security'
    ],
    'Santa Clara County': [
        '/san-jose-security',
        '/santa-clara-county/san-jose-security',
        '/sunnyvale-security',
        '/santa-clara-county/sunnyvale-security'
    ],
    'Alameda County': [
        '/oakland-security',
        '/alameda-county/oakland-security',
        '/berkeley-security',
        '/alameda-county/berkeley-security'
    ],
    'Ventura County': [
        '/ventura-security',
        '/ventura-county/ventura-security',
        '/oxnard-security',
        '/ventura-county/oxnard-security'
    ],
    'Central Valley': [
        '/fresno-security',
        '/central-valley/fresno-security',
        '/bakersfield-security',
        '/central-valley/bakersfield-security'
    ],
    'Other Cities': [
        '/whittier-security',
        '/van-nuys-security'
    ]
};

// Test a single route
function testRoute(route) {
    return new Promise((resolve) => {
        const options = {
            hostname: '0.0.0.0',
            port: 5000,
            path: route,
            method: 'GET',
            headers: {
                'User-Agent': 'Security-Route-Tester'
            }
        };

        const req = http.request(options, (res) => {
            resolve({
                route,
                status: res.statusCode,
                success: res.statusCode === 200
            });
        });

        req.on('error', () => {
            resolve({
                route,
                status: 'ERROR',
                success: false
            });
        });

        req.setTimeout(3000, () => {
            req.abort();
            resolve({
                route,
                status: 'TIMEOUT',
                success: false
            });
        });

        req.end();
    });
}

// Main testing function
async function runTests() {
    console.log('🔒 Testing Security Route Patterns\n');
    console.log('=' .repeat(60));
    
    const results = {
        total: 0,
        passed: 0,
        failed: 0
    };

    for (const [county, routes] of Object.entries(securityTestRoutes)) {
        console.log(`\n📍 ${county}`);
        console.log('-'.repeat(60));
        
        for (const route of routes) {
            const result = await testRoute(route);
            results.total++;
            
            if (result.success) {
                results.passed++;
                console.log(`  ✅ ${route} → ${result.status}`);
            } else {
                results.failed++;
                console.log(`  ❌ ${route} → ${result.status}`);
            }
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Security Routes Test Summary');
    console.log('='.repeat(60));
    console.log(`Total Security Routes Tested: ${results.total}`);
    console.log(`✅ Passed: ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);
    console.log('='.repeat(60));
    
    if (results.failed === 0) {
        console.log('\n🎉 All security routes are working correctly!');
        console.log('✅ Uniform security routing pattern implemented across all counties.');
    } else {
        console.log('\n⚠️  Some security routes failed. Please check the failed routes above.');
    }
}

// Run tests
runTests().catch(error => {
    console.error('Test execution error:', error);
    process.exit(1);
});

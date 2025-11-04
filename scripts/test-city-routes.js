const http = require('http');

// Comprehensive list of test routes for all counties
const testRoutes = {
    'Los Angeles County': [
        '/alhambra', '/arcadia', '/beverly-hills', '/burbank', '/downtown-los-Angeles',
        '/glendale', '/hollywood', '/long-beach', '/pasadena', '/santa-monica',
        '/los-angeles/hollywood', '/los-angeles/downtown'
    ],
    'Orange County': [
        '/anaheim', '/irvine', '/huntington-beach', '/costa-mesa', '/newport-beach',
        '/orange-county/anaheim', '/orange-county/irvine'
    ],
    'San Diego County': [
        '/san-diego', '/chula-vista', '/oceanside', '/carlsbad', '/escondido',
        '/california/chula-vista', '/california/oceanside'
    ],
    'Sacramento County': [
        '/sacramento', '/downtown-sacramento', '/elk-grove', '/roseville', '/folsom',
        '/sacramento/downtown-sacramento', '/sacramento-county/elk-grove'
    ],
    'Riverside County': [
        '/riverside', '/corona', '/palm-springs', '/temecula', '/murrieta',
        '/riverside-county/palm-springs'
    ],
    'San Bernardino County': [
        '/san-bernardino', '/fontana', '/rancho-cucamonga', '/ontario', '/victorville'
    ],
    'Santa Clara County': [
        '/san-jose', '/sunnyvale', '/mountain-view', '/palo-alto', '/cupertino',
        '/santa-clara-county/san-jose'
    ],
    'Alameda County': [
        '/oakland', '/berkeley', '/fremont', '/hayward', '/pleasanton',
        '/alameda-county/oakland', '/oakland-security'
    ],
    'Ventura County': [
        '/ventura', '/oxnard', '/thousand-oaks', '/simi-valley', '/camarillo',
        '/ventura-county/oxnard'
    ],
    'Central Valley': [
        '/fresno', '/bakersfield', '/stockton', '/modesto', '/visalia',
        '/central-valley/fresno'
    ],
    'Other Cities': [
        '/san-fernando', '/van-nuys', '/whittier', '/south-gate', '/huntington-park'
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
                'User-Agent': 'Route-Tester'
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
    console.log('🔍 Testing City Routes Connectivity\n');
    console.log('=' .repeat(60));
    
    const results = {
        total: 0,
        passed: 0,
        failed: 0
    };

    for (const [county, routes] of Object.entries(testRoutes)) {
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
    console.log('📊 Test Results Summary');
    console.log('='.repeat(60));
    console.log(`Total Routes Tested: ${results.total}`);
    console.log(`✅ Passed: ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);
    console.log('='.repeat(60));
    
    if (results.failed === 0) {
        console.log('\n🎉 All city routes are working correctly!');
        console.log('✅ All cities are properly connected to their pages.');
    } else {
        console.log('\n⚠️  Some routes failed. Please check the failed routes above.');
    }
}

// Run tests
runTests().catch(error => {
    console.error('Test execution error:', error);
    process.exit(1);
});

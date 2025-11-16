/**
 * Comprehensive Sitemap Generator for ShieldWise Security
 * Generates sitemap matching actual route structure in index.js
 */

const fs = require('fs');
const path = require('path');

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Service pages (must match routes in index.js)
const servicePages = [
  'apartment-security',
  'armed-security',
  'commercial-security',
  'construction-security',
  'educational-campus-security',
  'event-security',
  'executive-protection',
  'fire-watch',
  'hospital-security',
  'hotel-security',
  'patrol',
  'mobile-patrol-security',
  'shopping-center-security',
  'special-event-security',
  'unarmed-security'
];

// City arrays matching index.js routing structure
const cityRoutes = {
  losAngeles: {
    prefix: 'los-angeles',
    cities: [
      'alhambra', 'arcadia', 'azusa', 'baldwin-park', 'bellflower', 'beverly-hills',
      'burbank', 'calabasas', 'carson', 'cerritos', 'compton', 'culver-city', 'downey',
      'downtown-los-Angeles', 'el-monte', 'gardena', 'glendale', 'hawthorne',
      'hermosa-beach', 'hollywood', 'inglewood', 'la-mirada', 'lancaster', 'long-beach',
      'malibu', 'manhattan-beach', 'norwalk', 'palmdale', 'pasadena',
      'pomona', 'redondo-beach', 'santa-monica', 'torrance', 'west-hollywood', 'whittier'
    ]
  },
  orangeCounty: {
    prefix: 'orange-county',
    cities: [
      'aliso-viejo', 'anaheim', 'brea', 'buena-park', 'costa-mesa', 'cypress', 'dana-point',
      'fountain-valley', 'fullerton', 'garden-grove', 'huntington-beach', 'irvine',
      'la-habra', 'laguna-beach', 'laguna-hills', 'laguna-niguel', 'lake-forest',
      'mission-viejo', 'newport-beach', 'orange', 'placentia',
      'san-clemente', 'santa-ana', 'tustin', 'westminster', 'yorba-linda'
    ]
  },
  sanDiego: {
    prefix: 'california',
    cities: [
      'carlsbad', 'chula-vista', 'coronado', 'del-mar', 'el-cajon', 'encinitas',
      'escondido', 'imperial-beach', 'la-mesa', 'lemon-grove', 'national-city',
      'oceanside', 'poway', 'san-diego', 'san-marcos', 'santee', 'solana-beach', 'vista'
    ]
  },
  sacramento: {
    prefix: 'sacramento-county',
    altPrefixes: ['sacramento'],
    cities: [
      'carmichael', 'citrus-heights', 'davis', 'downtown-sacramento', 'east-sacramento', 'elk-grove',
      'fair-oaks', 'folsom', 'isleton', 'land-park', 'midtown', 'midtown-sacramento',
      'natomas', 'pocket', 'rancho-cordova', 'roseville', 'west-sacramento', 'woodland'
    ]
  },
  riverside: {
    prefix: 'riverside-county',
    cities: [
      'cathedral-city', 'coachella', 'corona', 'hemet', 'indio', 'la-quinta',
      'moreno-valley', 'murrieta', 'palm-springs', 'perris', 'riverside', 'temecula'
    ]
  },
  sanBernardino: {
    prefix: null,
    cities: [
      'apple-valley', 'barstow', 'big-bear-lake', 'chino', 'chino-hills', 'colton',
      'fontana', 'hesperia', 'highland', 'montclair', 'ontario', 'rancho-cucamonga',
      'redlands', 'rialto', 'san-bernardino', 'twentynine-palms', 'upland', 'victorville'
    ]
  },
  santaClara: {
    prefix: 'santa-clara-county',
    cities: [
      'campbell', 'cupertino', 'gilroy', 'los-gatos', 'milpitas', 'morgan-hill',
      'mountain-view', 'palo-alto', 'san-jose', 'santa-clara', 'sunnyvale'
    ]
  },
  alameda: {
    prefix: 'alameda-county',
    cities: [
      'alameda', 'berkeley', 'castro-valley', 'dublin', 'emeryville', 'fremont',
      'hayward', 'newark', 'oakland', 'pleasanton', 'san-leandro', 'san-lorenzo', 'union-city'
    ]
  },
  ventura: {
    prefix: 'ventura-county',
    cities: [
      'camarillo', 'fillmore', 'moorpark', 'ojai', 'oxnard', 'port-hueneme',
      'santa-paula', 'simi-valley', 'thousand-oaks', 'ventura'
    ]
  },
  centralValley: {
    prefix: 'central-valley',
    cities: [
      'bakersfield', 'clovis', 'davis', 'delano', 'fresno', 'hanford', 'lemoore',
      'madera', 'merced', 'modesto', 'porterville', 'stockton', 'tulare', 'visalia', 'woodland'
    ]
  }
};

// Special major cities with higher priority
const majorCities = [
  'los-angeles', 'san-francisco', 'san-diego', 'san-jose', 'sacramento',
  'fresno', 'long-beach', 'oakland', 'bakersfield', 'anaheim',
  'santa-ana', 'riverside', 'stockton', 'irvine', 'san-bernardino'
];

// Start sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Homepage -->
    <url>
        <loc>https://shieldwisesecurity.com/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Main Pages -->
    <url>
        <loc>https://shieldwisesecurity.com/services</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/locations</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/service-areas</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/contact</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/about</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/get-quote</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/testimonials</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/career</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    
    <!-- Service Pages (High Priority) -->
`;

// Add service pages
servicePages.forEach(service => {
  sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/services/${service}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
`;
});

sitemap += `    
    <!-- Major Cities (High Priority) -->
`;

// Add major cities first
majorCities.forEach(city => {
  sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
`;
});

// Add top-level county pages
sitemap += `    
    <!-- County Pages -->
    <url>
        <loc>https://shieldwisesecurity.com/orange-county</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/riverside-county</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/orange-county-security</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/riverside-county-security</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/san-francisco</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/san-francisco-security</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://shieldwisesecurity.com/sacramento-security</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- City Pages by County -->
`;

let totalCityUrls = 0;

// Generate URLs for each county
Object.keys(cityRoutes).forEach(countyKey => {
  const county = cityRoutes[countyKey];
  
  sitemap += `    
    <!-- ${countyKey.replace(/([A-Z])/g, ' $1').trim()} Cities -->
`;
  
  county.cities.forEach(city => {
    const isMajor = majorCities.includes(city);
    const priority = isMajor ? '0.9' : '0.7';
    
    // Add county-prefixed URL (if prefix exists)
    if (county.prefix) {
      sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/${county.prefix}/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>
`;
      totalCityUrls++;
    }
    
    // Add alternative prefix for Sacramento
    if (county.altPrefixes) {
      county.altPrefixes.forEach(altPrefix => {
        sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/${altPrefix}/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>
`;
        totalCityUrls++;
      });
    }
    
    // Add direct URL (without prefix) if not already added as major city
    if (!isMajor && county.prefix !== null) {
      sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>
`;
      totalCityUrls++;
    }
    
    // For San Bernardino (no prefix), only add direct URL if not major
    if (county.prefix === null && !isMajor) {
      sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>
`;
      totalCityUrls++;
    }
  });
});

sitemap += `
</urlset>`;

// Write sitemap
const sitemapPath = path.join(__dirname, '../Public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

const totalUrls = 9 + servicePages.length + majorCities.length + 7 + totalCityUrls;

console.log(`✅ Sitemap generated successfully!`);
console.log(`📍 Location: ${sitemapPath}`);
console.log(`📊 Total URLs: ${totalUrls}`);
console.log(`   - Main pages: 9`);
console.log(`   - Service pages: ${servicePages.length}`);
console.log(`   - Major cities: ${majorCities.length}`);
console.log(`   - County pages: 7`);
console.log(`   - City routes: ${totalCityUrls}`);
console.log(`\n🎯 Submit to:`);
console.log(`   - Google Search Console: https://search.google.com/search-console`);
console.log(`   - Bing Webmaster Tools: https://www.bing.com/webmasters`);

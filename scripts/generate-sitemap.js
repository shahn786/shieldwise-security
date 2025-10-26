/**
 * Comprehensive Sitemap Generator for ShieldWise Security
 * Generates sitemap with all 200+ pages for optimal SEO
 */

const fs = require('fs');
const path = require('path');

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Get all city page files
const citiesDir = path.join(__dirname, '../views/cities');
const cityFiles = fs.readdirSync(citiesDir)
  .filter(file => file.endsWith('.ejs'))
  .map(file => file.replace('.ejs', ''));

console.log(`Found ${cityFiles.length} city pages`);

// Service pages
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
  'mobile-patrol-security',
  'shopping-center-security',
  'special-event-security',
  'unarmed-security'
];

// Blog posts
const blogPosts = [
  'security-guard-training-california',
  'armed-vs-unarmed-security',
  'retail-security-best-practices',
  'construction-site-security',
  'event-security-planning',
  'commercial-security-systems'
];

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    
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
        <loc>https://shieldwisesecurity.com/blog</loc>
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
    <!-- City Pages - Major Cities (186 total) -->
`;

// Define major cities with higher priority
const majorCities = [
  'los-angeles', 'san-francisco', 'san-diego', 'san-jose', 'sacramento',
  'fresno', 'long-beach', 'oakland', 'bakersfield', 'anaheim',
  'santa-ana', 'riverside', 'stockton', 'irvine', 'san-bernardino'
];

// Add major city pages with priority 0.9
majorCities.forEach(city => {
  if (cityFiles.includes(city)) {
    sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/cities/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
`;
  }
});

sitemap += `    
    <!-- Other City Pages -->
`;

// Add remaining city pages with priority 0.7-0.8
cityFiles.forEach(city => {
  if (!majorCities.includes(city)) {
    const priority = city.includes('county') ? '0.8' : '0.7';
    sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/cities/${city}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>
`;
  }
});

sitemap += `    
    <!-- Blog Posts -->
`;

// Add blog posts
blogPosts.forEach(post => {
  sitemap += `    <url>
        <loc>https://shieldwisesecurity.com/blog/${post}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
`;
});

sitemap += `
</urlset>`;

// Write sitemap
const sitemapPath = path.join(__dirname, '../Public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap generated successfully!`);
console.log(`📍 Location: ${sitemapPath}`);
console.log(`📊 Total URLs: ${servicePages.length + cityFiles.length + blogPosts.length + 8}`);
console.log(`   - Main pages: 8`);
console.log(`   - Service pages: ${servicePages.length}`);
console.log(`   - City pages: ${cityFiles.length}`);
console.log(`   - Blog posts: ${blogPosts.length}`);
console.log(`\n🎯 Submit to:`);
console.log(`   - Google Search Console: https://search.google.com/search-console`);
console.log(`   - Bing Webmaster Tools: https://www.bing.com/webmasters`);

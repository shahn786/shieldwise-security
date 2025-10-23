
const fs = require('fs');
const path = require('path');

console.log('🚀 SHIELDWISE SECURITY - FINAL PRODUCTION AUDIT\n');
console.log('=' .repeat(60) + '\n');

const checks = {
    images: { pass: 0, fail: 0, total: 0 },
    pages: { pass: 0, fail: 0, total: 0 },
    security: { pass: 0, fail: 0, total: 0 },
    seo: { pass: 0, fail: 0, total: 0 }
};

// 1. Check for unoptimized images
console.log('📸 IMAGE OPTIMIZATION CHECK');
const imgDir = path.join(__dirname, '../Public/img');
const images = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
checks.images.total = images.length;
checks.images.fail = images.length;
console.log(`   ⚠️  Found ${images.length} unoptimized images (should be WebP)`);
if (images.length === 0) checks.images.pass = 1;

// 2. Check sitemap exists
console.log('\n🗺️  SITEMAP CHECK');
const sitemapExists = fs.existsSync(path.join(__dirname, '../Public/sitemap.xml'));
if (sitemapExists) {
    checks.seo.pass++;
    console.log('   ✅ sitemap.xml exists');
} else {
    checks.seo.fail++;
    console.log('   ❌ sitemap.xml missing');
}
checks.seo.total++;

// 3. Check robots.txt
console.log('\n🤖 ROBOTS.TXT CHECK');
const robotsExists = fs.existsSync(path.join(__dirname, '../Public/robots.txt'));
if (robotsExists) {
    checks.security.pass++;
    console.log('   ✅ robots.txt exists');
} else {
    checks.security.fail++;
    console.log('   ❌ robots.txt missing');
}
checks.security.total++;

// 4. Check for HTTPS in index.js
console.log('\n🔒 SECURITY HEADERS CHECK');
const indexContent = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
if (indexContent.includes('Content-Security-Policy')) {
    checks.security.pass++;
    console.log('   ✅ CSP headers configured');
} else {
    checks.security.fail++;
    console.log('   ❌ CSP headers missing');
}
checks.security.total++;

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 FINAL AUDIT SUMMARY\n');

const categories = [
    { name: 'Images', data: checks.images },
    { name: 'Pages', data: checks.pages },
    { name: 'Security', data: checks.security },
    { name: 'SEO', data: checks.seo }
];

categories.forEach(cat => {
    const score = cat.data.total > 0 
        ? Math.round((cat.data.pass / cat.data.total) * 100) 
        : 100;
    const emoji = score >= 90 ? '✅' : score >= 70 ? '⚠️' : '❌';
    console.log(`${emoji} ${cat.name}: ${score}% (${cat.data.pass}/${cat.data.total})`);
});

const overallPass = Object.values(checks).reduce((sum, c) => sum + c.pass, 0);
const overallTotal = Object.values(checks).reduce((sum, c) => sum + c.total, 0);
const overallScore = Math.round((overallPass / overallTotal) * 100);

console.log('\n' + '='.repeat(60));
console.log(`🎯 OVERALL PRODUCTION READINESS: ${overallScore}%`);
console.log('='.repeat(60) + '\n');

if (overallScore >= 95) {
    console.log('🚀 READY FOR DEPLOYMENT!');
} else if (overallScore >= 80) {
    console.log('⚠️  Almost ready - fix critical issues above');
} else {
    console.log('❌ NOT READY - significant work needed');
}

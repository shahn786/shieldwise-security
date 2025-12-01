#!/usr/bin/env node
/**
 * SEO Validation Script - Checks all city pages for SEO compliance
 * Run with: npm run seo:validate
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_CHECKS = {
  title: /<title>[^<]+<\/title>/,
  metaDescription: /<meta name="description" content="[^"]{50,}/,
  canonical: /<link rel="canonical"/,
  h1: /<h1[^>]*>[^<]+<\/h1>/,
  securityServiceSchema: /"@type":\s*"SecurityService"/,
  localBusinessSchema: /"@type":\s*"LocalBusiness"/,
  breadcrumbSchema: /"@type":\s*"BreadcrumbList"/,
  faqSchema: /"@type":\s*"FAQPage"/,
  openGraph: /<meta property="og:title"/,
  geoCoords: /"latitude":\s*[\d.-]+/,
  ratingAsNumber: /"ratingValue":\s*[\d.]+[^"]/  // Number, not string
};

function validateCity(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cityName = path.basename(filePath, '.ejs');
  const results = { city: cityName, passed: 0, failed: 0, issues: [] };

  for (const [check, regex] of Object.entries(REQUIRED_CHECKS)) {
    if (regex.test(content)) {
      results.passed++;
    } else {
      results.failed++;
      results.issues.push(check);
    }
  }

  return results;
}

// Run validation
const citiesDir = 'views/cities';
const files = fs.readdirSync(citiesDir).filter(f => f.endsWith('.ejs'));
const results = files.map(f => validateCity(path.join(citiesDir, f)));

// Summary
const totalChecks = Object.keys(REQUIRED_CHECKS).length;
const perfectScore = results.filter(r => r.failed === 0).length;
const needsWork = results.filter(r => r.failed > 0);

console.log('\n🔍 SEO VALIDATION REPORT');
console.log('========================');
console.log(`Total cities validated: ${results.length}`);
console.log(`Perfect score (all checks passed): ${perfectScore}/${results.length}`);
console.log(`Cities needing work: ${needsWork.length}`);

if (needsWork.length > 0 && needsWork.length <= 20) {
  console.log('\n⚠️ Cities with issues:');
  needsWork.forEach(r => {
    console.log(`  ${r.city}: Missing ${r.issues.join(', ')}`);
  });
}

// Exit code for CI
if (needsWork.length > 10) {
  console.log('\n❌ Validation failed: Too many cities with issues');
  process.exit(1);
} else {
  console.log('\n✅ Validation passed!');
  process.exit(0);
}

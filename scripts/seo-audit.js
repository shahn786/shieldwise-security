#!/usr/bin/env node
/**
 * SEO AUDIT TOOL - Test all California cities
 * Generates ranking report showing which cities need SEO improvements
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CITIES_DIR = path.join(__dirname, '../views/cities');
const REPORT_FILE = path.join(__dirname, '../public/seo-audit-report.html');

// Get all city files
function getCityFiles() {
  const files = fs.readdirSync(CITIES_DIR).filter(f => f.endsWith('.ejs'));
  return files.map(f => ({
    filename: f,
    city: f.replace('.ejs', ''),
    url: `https://shieldwisesecurity.com/${f.replace('.ejs', '')}`
  }));
}

// Extract SEO data from EJS file
function analyzeCityFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const metrics = {
    hasTitle: /<title>/.test(content),
    hasMeta: /<meta name="description"/.test(content),
    hasH1: /<h1/.test(content),
    hasStructuredData: /<script type="application\/ld\+json"/.test(content),
    hasImageAlt: /alt=/.test(content),
    hasOpenGraph: /<meta property="og:/.test(content),
    hasCanonical: /<link rel="canonical"/.test(content),
    wordCount: content.split(/\s+/).length,
    hasServiceKeywords: /security|guard|service/i.test(content),
    hasLocalKeywords: /San Francisco|Los Angeles|California|CA|Bay Area/i.test(content)
  };

  // Calculate score (0-100)
  const checks = Object.values(metrics).filter(v => typeof v === 'boolean').length;
  const passed = Object.values(metrics).filter(v => v === true).length;
  const score = Math.round((passed / checks) * 100);

  return { ...metrics, score };
}

// Test page with Google PageSpeed Insights API (free tier)
async function testPageSpeed(url) {
  return new Promise((resolve) => {
    const testUrl = `https://www.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(url)}&key=NO_KEY`;
    
    // For now, return simulated data (you can integrate real API later)
    resolve({
      mobile: Math.round(Math.random() * 40 + 30),
      desktop: Math.round(Math.random() * 50 + 40)
    });
  });
}

// Generate HTML report
async function generateReport() {
  console.log('🔍 Starting SEO Audit for all California cities...\n');
  
  const cityFiles = getCityFiles();
  const results = [];

  // Analyze each city
  for (const city of cityFiles) {
    const filePath = path.join(CITIES_DIR, city.filename);
    const analysis = analyzeCityFile(filePath);
    
    results.push({
      ...city,
      ...analysis
    });
    
    process.stdout.write('.');
  }

  console.log('\n\n✅ Analysis complete! Generating report...\n');

  // Sort by score (worst first)
  results.sort((a, b) => a.score - b.score);

  // Generate HTML
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ShieldWise SEO Audit Report - All California Cities</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    header { background: linear-gradient(135deg, #d4af37, #ffd700); color: #000; padding: 40px 20px; text-align: center; border-radius: 8px; margin-bottom: 40px; }
    header h1 { font-size: 2.5em; margin-bottom: 10px; }
    header p { font-size: 1.1em; opacity: 0.9; }
    
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .summary-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    .summary-card h3 { color: #666; font-size: 0.9em; margin-bottom: 10px; }
    .summary-card .value { font-size: 2em; font-weight: bold; color: #d4af37; }
    
    table { width: 100%; background: white; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    th { background: #333; color: #d4af37; padding: 15px; text-align: left; font-weight: 600; }
    td { padding: 12px 15px; border-bottom: 1px solid #eee; }
    tr:hover { background: #f9f9f9; }
    
    .score { font-weight: bold; border-radius: 4px; padding: 4px 8px; }
    .score.excellent { background: #d4f1d4; color: #2d5e2d; }
    .score.good { background: #fff3cd; color: #856404; }
    .score.poor { background: #f8d7da; color: #721c24; }
    
    .city-name { color: #d4af37; font-weight: 600; }
    .check { text-align: center; font-size: 1.2em; }
    .check.yes { color: #28a745; }
    .check.no { color: #dc3545; }
    
    .issues { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
    .issue-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #dc3545; }
    .issue-card h3 { color: #dc3545; margin-bottom: 10px; }
    .issue-card p { color: #666; font-size: 0.9em; line-height: 1.6; }
    
    .footer { text-align: center; color: #666; margin-top: 40px; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 ShieldWise SEO Audit Report</h1>
      <p>California Cities Performance Analysis - ${new Date().toLocaleDateString()}</p>
    </header>

    <div class="summary">
      <div class="summary-card">
        <h3>Total Cities Tested</h3>
        <div class="value">${results.length}</div>
      </div>
      <div class="summary-card">
        <h3>Average SEO Score</h3>
        <div class="value">${Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)}/100</div>
      </div>
      <div class="summary-card">
        <h3>Pages Needing Fixes</h3>
        <div class="value">${results.filter(r => r.score < 70).length}</div>
      </div>
      <div class="summary-card">
        <h3>Optimization Opportunity</h3>
        <div class="value">${Math.round(((100 - (results.reduce((a, b) => a + b.score, 0) / results.length)) / 100) * results.length)} cities</div>
      </div>
    </div>

    <h2 style="margin: 30px 0 20px; color: #333;">📊 All Cities Ranked by SEO Score</h2>
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>SEO Score</th>
          <th style="text-align: center;">Title</th>
          <th style="text-align: center;">Meta</th>
          <th style="text-align: center;">H1</th>
          <th style="text-align: center;">Structured Data</th>
          <th style="text-align: center;">Keywords</th>
          <th style="text-align: center;">Canonical</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(r => `
          <tr>
            <td class="city-name">${r.city}</td>
            <td>
              <span class="score ${r.score >= 80 ? 'excellent' : r.score >= 60 ? 'good' : 'poor'}">
                ${r.score}/100
              </span>
            </td>
            <td class="check ${r.hasTitle ? 'yes' : 'no'}">${r.hasTitle ? '✓' : '✗'}</td>
            <td class="check ${r.hasMeta ? 'yes' : 'no'}">${r.hasMeta ? '✓' : '✗'}</td>
            <td class="check ${r.hasH1 ? 'yes' : 'no'}">${r.hasH1 ? '✓' : '✗'}</td>
            <td class="check ${r.hasStructuredData ? 'yes' : 'no'}">${r.hasStructuredData ? '✓' : '✗'}</td>
            <td class="check ${r.hasServiceKeywords && r.hasLocalKeywords ? 'yes' : 'no'}">${r.hasServiceKeywords && r.hasLocalKeywords ? '✓' : '✗'}</td>
            <td class="check ${r.hasCanonical ? 'yes' : 'no'}">${r.hasCanonical ? '✓' : '✗'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2 style="margin: 40px 0 20px; color: #333;">⚠️ Pages Needing Immediate Fixes</h2>
    <div class="issues">
      ${results.filter(r => r.score < 70).map(r => `
        <div class="issue-card">
          <h3>${r.city}</h3>
          <p><strong>Score: ${r.score}/100</strong></p>
          <ul style="margin-left: 20px; margin-top: 10px;">
            ${!r.hasTitle ? '<li>❌ Missing or incomplete title tag</li>' : ''}
            ${!r.hasMeta ? '<li>❌ Missing meta description</li>' : ''}
            ${!r.hasH1 ? '<li>❌ No H1 heading found</li>' : ''}
            ${!r.hasStructuredData ? '<li>❌ Missing structured data (JSON-LD)</li>' : ''}
            ${!r.hasCanonical ? '<li>❌ No canonical URL tag</li>' : ''}
            ${!(r.hasServiceKeywords && r.hasLocalKeywords) ? '<li>❌ Missing local/service keywords</li>' : ''}
          </ul>
        </div>
      `).join('')}
    </div>

    <div class="footer">
      <p>Generated: ${new Date().toLocaleString()}</p>
      <p>Run this audit regularly to monitor SEO improvements across all 186+ California cities</p>
    </div>
  </div>
</body>
</html>
  `;

  fs.writeFileSync(REPORT_FILE, html, 'utf8');
  console.log(`✅ Report generated: ${REPORT_FILE}\n`);
  console.log(`📊 SUMMARY:`);
  console.log(`   Total Cities: ${results.length}`);
  console.log(`   Average Score: ${Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)}/100`);
  console.log(`   Cities needing fixes: ${results.filter(r => r.score < 70).length}`);
  console.log(`\n🔗 View full report: http://localhost:3000/seo-audit-report.html`);
}

generateReport().catch(console.error);

#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CITY_SPECS = {
  davis: 'UC Davis campus, university facilities, research labs',
  woodland: 'courthouse, government buildings, agricultural businesses',
  alameda: 'port facilities, industrial security, municipal offices',
};

const citiesDir = 'views/cities';
const files = fs.readdirSync(citiesDir).filter(f => f.endsWith('.ejs'));
let updated = 0;

for (const file of files) {
  const cityName = file.replace('.ejs', '');
  const filePath = path.join(citiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('<meta name="description"')) {
    const specialization = CITY_SPECS[cityName] || 'professional security services';
    const newMeta = `Professional security guard services in ${cityName.replace(/-/g, ' ')}, CA. ${specialization}. BSIS licensed, $2M insured, 24/7 guards. Free quote.`;
    
    content = content.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${newMeta}"`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
  }
}
console.log(`✅ Improved meta descriptions for ${updated} cities`);

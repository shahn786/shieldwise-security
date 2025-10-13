#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function updateTemplateToWebP(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Pattern 1: Simple img tags with png/jpg - convert to picture tag with WebP + fallback
  const imgPattern = /<img\s+([^>]*?)src=["']([^"']*?)\.(png|jpg|jpeg)["']([^>]*?)>/gi;
  
  content = content.replace(imgPattern, (match, beforeSrc, imagePath, extension, afterSrc) => {
    updated = true;
    
    // Extract other attributes
    const classMatch = match.match(/class=["']([^"']*)["']/i);
    const altMatch = match.match(/alt=["']([^"']*)["']/i);
    const loadingMatch = match.match(/loading=["']([^"']*)["']/i);
    
    const className = classMatch ? classMatch[1] : '';
    const altText = altMatch ? altMatch[1] : '';
    const loading = loadingMatch ? loadingMatch[1] : 'lazy';
    
    // Check if mobile version exists
    const webpPath = `${imagePath}.webp`;
    const webpMobilePath = `${imagePath}-mobile.webp`;
    
    // Build responsive picture tag
    return `<picture>
      <source media="(max-width: 768px)" srcset="${webpMobilePath}" type="image/webp">
      <source media="(min-width: 769px)" srcset="${webpPath}" type="image/webp">
      <source media="(max-width: 768px)" srcset="${imagePath}-mobile.${extension}" type="image/${extension}">
      <img src="${imagePath}.${extension}" alt="${altText}" class="${className}" loading="${loading}">
    </picture>`;
  });

  // Pattern 2: Background images in style attributes - convert to WebP
  const bgPattern = /url\(['"]?([^'"()]*?)\.(png|jpg|jpeg)['"]?\)/gi;
  
  content = content.replace(bgPattern, (match, imagePath, extension) => {
    updated = true;
    return `url('${imagePath}.webp')`;
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function findAllTemplates(dir) {
  const templates = [];
  
  function scan(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scan(filePath);
      } else if (file.endsWith('.ejs')) {
        templates.push(filePath);
      }
    }
  }
  
  scan(dir);
  return templates;
}

console.log('🔄 Starting WebP template update...\n');

const viewsDir = path.join(__dirname, '..', 'views');
const templates = findAllTemplates(viewsDir);

console.log(`📁 Found ${templates.length} EJS templates\n`);

let updatedCount = 0;
const updatedFiles = [];

for (const template of templates) {
  if (updateTemplateToWebP(template)) {
    updatedCount++;
    updatedFiles.push(template);
    console.log(`✅ Updated: ${path.relative(viewsDir, template)}`);
  }
}

console.log(`\n✨ Complete! Updated ${updatedCount} templates with WebP images`);

if (updatedFiles.length > 0) {
  console.log('\n📋 Updated files:');
  updatedFiles.forEach(file => {
    console.log(`   - ${path.relative(viewsDir, file)}`);
  });
}

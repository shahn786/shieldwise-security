/**
 * Helper Script: Add lazy loading to images
 * 
 * This script shows how many images need lazy loading optimization
 * across all EJS files.
 * 
 * Usage: node scripts/add-lazy-loading.js
 * 
 * Note: Manual review recommended before bulk changes to 271+ files
 */

const fs = require('fs');
const path = require('path');

function findEJSFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findEJSFiles(filePath));
    } else if (file.endsWith('.ejs')) {
      results.push(filePath);
    }
  }
  
  return results;
}

function analyzeImages(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imgTagPattern = /<img[^>]*>/g;
  const imgTags = content.match(imgTagPattern) || [];
  
  const analysis = {
    total: imgTags.length,
    withLazy: 0,
    withoutLazy: 0,
    withDimensions: 0,
    withoutDimensions: 0
  };
  
  imgTags.forEach(tag => {
    if (tag.includes('loading="lazy"') || tag.includes("loading='lazy'")) {
      analysis.withLazy++;
    } else {
      analysis.withoutLazy++;
    }
    
    if (tag.includes('width=') && tag.includes('height=')) {
      analysis.withDimensions++;
    } else {
      analysis.withoutDimensions++;
    }
  });
  
  return analysis;
}

// Main execution
const viewsDir = path.join(__dirname, '../views');
const ejsFiles = findEJSFiles(viewsDir);

console.log(`\n📊 Image Optimization Analysis`);
console.log(`${'='.repeat(50)}\n`);
console.log(`Total EJS files found: ${ejsFiles.length}\n`);

let totalStats = {
  files: ejsFiles.length,
  totalImages: 0,
  withLazy: 0,
  withoutLazy: 0,
  withDimensions: 0,
  withoutDimensions: 0
};

let filesNeedingWork = [];

ejsFiles.forEach(file => {
  const analysis = analyzeImages(file);
  totalStats.totalImages += analysis.total;
  totalStats.withLazy += analysis.withLazy;
  totalStats.withoutLazy += analysis.withoutLazy;
  totalStats.withDimensions += analysis.withDimensions;
  totalStats.withoutDimensions += analysis.withoutDimensions;
  
  if (analysis.withoutLazy > 0 || analysis.withoutDimensions > 0) {
    filesNeedingWork.push({
      file: file.replace(viewsDir + '/', ''),
      ...analysis
    });
  }
});

console.log(`📸 Total Images: ${totalStats.totalImages}`);
console.log(`✅ With loading="lazy": ${totalStats.withLazy} (${Math.round(totalStats.withLazy/totalStats.totalImages*100)}%)`);
console.log(`❌ Without lazy loading: ${totalStats.withoutLazy} (${Math.round(totalStats.withoutLazy/totalStats.totalImages*100)}%)`);
console.log(`✅ With dimensions: ${totalStats.withDimensions} (${Math.round(totalStats.withDimensions/totalStats.totalImages*100)}%)`);
console.log(`❌ Without dimensions: ${totalStats.withoutDimensions} (${Math.round(totalStats.withoutDimensions/totalStats.totalImages*100)}%)\n`);

console.log(`📁 Files needing optimization: ${filesNeedingWork.length}/${ejsFiles.length}\n`);

console.log(`\n💡 Recommendation:`);
console.log(`To optimize all images, a bulk find-and-replace approach is needed:`);
console.log(`1. Add loading="lazy" to all <img> tags`);
console.log(`2. Add explicit width/height based on actual image dimensions`);
console.log(`3. Test thoroughly to ensure no layout shifts\n`);

// Show sample of files needing work
console.log(`📋 Sample files needing optimization (first 10):`);
filesNeedingWork.slice(0, 10).forEach(item => {
  console.log(`  - ${item.file}: ${item.total} images, ${item.withoutLazy} need lazy, ${item.withoutDimensions} need dimensions`);
});

if (filesNeedingWork.length > 10) {
  console.log(`  ... and ${filesNeedingWork.length - 10} more files\n`);
}

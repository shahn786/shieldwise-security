/**
 * Update Image References to WebP Format
 * Converts PNG/JPG references to WebP with picture tag fallback
 * Target: 10/10 Image Performance Score
 */

const fs = require('fs');
const path = require('path');

const stats = {
  filesProcessed: 0,
  imagesUpdated: 0,
  errors: []
};

/**
 * Check if WebP version exists for an image
 */
function webpExists(imgPath) {
  const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const fullPath = path.join(__dirname, '../Public', webpPath.replace(/^\//, ''));
  return fs.existsSync(fullPath);
}

/**
 * Convert simple img tag to picture tag with WebP
 */
function convertToWebP(content) {
  let updatedContent = content;
  let updateCount = 0;
  
  // Pattern to match img tags with .png or .jpg
  const imgPattern = /<img([^>]*?)src=["']([^"']*?\.(png|jpg|jpeg))["']([^>]*?)>/gi;
  
  updatedContent = updatedContent.replace(imgPattern, (match, before, src, ext, after) => {
    // Skip if already has webp or if it's in a picture tag
    if (match.includes('.webp') || content.includes(`<picture[^>]*>${match}`)) {
      return match;
    }
    
    const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    // Check if WebP version exists
    if (!webpExists(src)) {
      console.log(`   ⚠️  WebP not found for: ${src}`);
      return match;
    }
    
    // Extract alt text and other attributes
    const altMatch = (before + after).match(/alt=["']([^"']*)["']/);
    const classMatch = (before + after).match(/class=["']([^"']*)["']/);
    const loadingMatch = (before + after).match(/loading=["']([^"']*)["']/);
    
    const alt = altMatch ? altMatch[1] : '';
    const className = classMatch ? ` class="${classMatch[1]}"` : '';
    const loading = loadingMatch ? ` loading="${loadingMatch[1]}"` : ' loading="lazy"';
    
    updateCount++;
    
    // Create picture tag with WebP and fallback
    return `<picture>
      <source srcset="${webpSrc}" type="image/webp">
      <img src="${src}" alt="${alt}"${className}${loading}>
    </picture>`;
  });
  
  return { content: updatedContent, count: updateCount };
}

/**
 * Process a single EJS file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: updatedContent, count } = convertToWebP(content);
    
    if (count > 0) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ ${path.relative(process.cwd(), filePath)}: Updated ${count} images`);
      stats.imagesUpdated += count;
    } else {
      console.log(`⏭️  ${path.relative(process.cwd(), filePath)}: No changes needed`);
    }
    
    stats.filesProcessed++;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    stats.errors.push({ file: filePath, error: error.message });
  }
}

/**
 * Recursively process all EJS files
 */
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.ejs')) {
      processFile(fullPath);
    }
  }
}

// Main execution
console.log('🚀 ShieldWise Security - Image to WebP Converter');
console.log('Converting all PNG/JPG references to WebP format\n');
console.log('─'.repeat(70));

const viewsDir = path.join(__dirname, '../views');
processDirectory(viewsDir);

console.log('\n' + '─'.repeat(70));
console.log('📈 CONVERSION COMPLETE!');
console.log('─'.repeat(70));
console.log(`✅ Files Processed: ${stats.filesProcessed}`);
console.log(`✅ Images Updated: ${stats.imagesUpdated}`);
console.log(`❌ Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\n⚠️ Errors:');
  stats.errors.forEach(err => {
    console.log(`   - ${err.file}: ${err.error}`);
  });
}

console.log('\n🎯 Next Steps:');
console.log('   1. Test website to ensure images load correctly');
console.log('   2. Check browser console for any 404 errors');
console.log('   3. Run Lighthouse test to verify improvement');
console.log('   4. Add mobile-responsive srcset for additional optimization');

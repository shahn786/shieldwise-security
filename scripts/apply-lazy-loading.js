/**
 * Apply lazy loading and dimensions to all images
 * This script modifies EJS files to add loading="lazy" and width/height
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Track statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  lazyAdded: 0,
  dimensionsAdded: 0,
  errors: []
};

async function getImageDimensions(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', imagePath.replace(/^\//, ''));
    if (fs.existsSync(fullPath)) {
      const metadata = await sharp(fullPath).metadata();
      return { width: metadata.width, height: metadata.height };
    }
  } catch (e) {
    // Image not found or can't be read, skip
  }
  return null;
}

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

async function processImageTag(imgTag, filePath) {
  let modified = imgTag;
  let changes = { lazy: false, dimensions: false };
  
  // Add loading="lazy" if not present
  if (!imgTag.includes('loading=')) {
    // Insert loading="lazy" after <img
    modified = modified.replace(/<img\s/, '<img loading="lazy" ');
    changes.lazy = true;
  }
  
  // Try to add dimensions if not present
  if (!imgTag.includes('width=') && !imgTag.includes('height=')) {
    // Extract src attribute
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      const imageSrc = srcMatch[1];
      
      // Only process local images (not external URLs)
      if (imageSrc.startsWith('/img/') || imageSrc.startsWith('img/')) {
        const dimensions = await getImageDimensions(imageSrc);
        if (dimensions) {
          // Add width and height attributes
          modified = modified.replace(/<img\s/, `<img width="${dimensions.width}" height="${dimensions.height}" `);
          changes.dimensions = true;
        }
      }
    }
  }
  
  return { modified, changes };
}

async function processFile(filePath) {
  stats.filesProcessed++;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imgTagPattern = /<img[^>]*>/g;
    const imgTags = content.match(imgTagPattern);
    
    if (!imgTags || imgTags.length === 0) {
      return; // No images in this file
    }
    
    let newContent = content;
    let fileModified = false;
    
    for (const imgTag of imgTags) {
      const { modified, changes } = await processImageTag(imgTag, filePath);
      
      if (modified !== imgTag) {
        newContent = newContent.replace(imgTag, modified);
        fileModified = true;
        
        if (changes.lazy) stats.lazyAdded++;
        if (changes.dimensions) stats.dimensionsAdded++;
      }
    }
    
    if (fileModified) {
      // Create backup
      const backupPath = filePath + '.backup';
      fs.copyFileSync(filePath, backupPath);
      
      // Write modified content
      fs.writeFileSync(filePath, newContent, 'utf8');
      stats.filesModified++;
      
      const relativePath = filePath.replace(path.join(__dirname, '../views/'), '');
      console.log(`✅ Modified: ${relativePath} (backup created)`);
    }
    
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
    console.error(`❌ Error processing ${filePath}: ${error.message}`);
  }
}

async function main() {
  console.log('\n🚀 Starting Image Optimization\n');
  console.log('This will:');
  console.log('1. Add loading="lazy" to all <img> tags without it');
  console.log('2. Add width/height dimensions where possible');
  console.log('3. Create .backup files for all modified files\n');
  
  const viewsDir = path.join(__dirname, '../views');
  const ejsFiles = findEJSFiles(viewsDir);
  
  console.log(`Found ${ejsFiles.length} EJS files\n`);
  console.log('Processing files...\n');
  
  // Process files sequentially (to avoid overwhelming sharp)
  for (const file of ejsFiles) {
    await processFile(file);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION COMPLETE');
  console.log('='.repeat(50));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Images with loading="lazy" added: ${stats.lazyAdded}`);
  console.log(`Images with dimensions added: ${stats.dimensionsAdded}`);
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️ Errors encountered: ${stats.errors.length}`);
    stats.errors.forEach(e => {
      console.log(`  - ${e.file}: ${e.error}`);
    });
  }
  
  console.log('\n💡 Backup files created with .backup extension');
  console.log('To restore: remove .backup extension from backup files\n');
}

main().catch(console.error);

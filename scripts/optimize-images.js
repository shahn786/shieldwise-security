const sharp = require('sharp');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

// Statistics tracking
const stats = {
  processed: 0,
  optimized: 0,
  skipped: 0,
  errors: 0,
  savedBytes: 0,
  originalBytes: 0
};

async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

async function optimizeImages() {
  try {
    const imgDir = path.join(process.cwd(), 'Public', 'img');
    const backupDir = path.join(imgDir, 'originals-backup');
    
    // Create backup directory
    if (!fsSync.existsSync(backupDir)) {
      await fs.mkdir(backupDir, { recursive: true });
      console.log('✅ Created backup directory\n');
    }
    
    console.log('🚀 ShieldWise Security - Comprehensive Image Optimization');
    console.log('Target: 10/10 Page Speed & Image Scores');
    console.log('─'.repeat(70));
    console.log(`📁 Processing images in: ${imgDir}\n`);
    
    const files = await fs.readdir(imgDir);
    const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png)$/i));
    
    console.log(`📊 Found ${imageFiles.length} images to optimize\n`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(imgDir, file);
      const originalSize = await getFileSize(inputPath);
      const originalMB = (originalSize / 1024 / 1024).toFixed(2);
      
      console.log(`🔧 Processing: ${file} (${originalMB}MB)`);
      
      try {
        // Backup original if not already backed up
        const backupPath = path.join(backupDir, file);
        if (!fsSync.existsSync(backupPath)) {
          await fs.copyFile(inputPath, backupPath);
          console.log(`   💾 Backed up to: originals-backup/${file}`);
        }
        
        // Get image metadata
        const metadata = await sharp(inputPath).metadata();
        const { width, height } = metadata;
        
        // Desktop WebP (max 1920px, quality 75)
        const outputPath = path.join(imgDir, `${path.parse(file).name}.webp`);
        await sharp(inputPath)
          .webp({ quality: 75, effort: 6 })
          .resize({
            width: 1920,
            height: undefined,
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFile(outputPath);
        
        const desktopSize = await getFileSize(outputPath);
        
        // Mobile WebP (max 768px, quality 70)
        const mobileOutputPath = path.join(imgDir, `${path.parse(file).name}-mobile.webp`);
        await sharp(inputPath)
          .webp({ quality: 70, effort: 6 })
          .resize({
            width: 768,
            height: undefined,
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFile(mobileOutputPath);
        
        const mobileSize = await getFileSize(mobileOutputPath);
        const totalNewSize = desktopSize + mobileSize;
        const saved = originalSize - totalNewSize;
        const savedMB = (saved / 1024 / 1024).toFixed(2);
        const percentSaved = ((saved / originalSize) * 100).toFixed(1);
        
        stats.originalBytes += originalSize;
        stats.savedBytes += saved;
        stats.optimized++;
        
        console.log(`   ✅ Desktop: ${(desktopSize / 1024 / 1024).toFixed(2)}MB | Mobile: ${(mobileSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   💰 Saved: ${savedMB}MB (${percentSaved}% reduction)\n`);
        
      } catch (err) {
        console.error(`   ❌ Error: ${err.message}\n`);
        stats.errors++;
      }
      
      stats.processed++;
    }
    
    // Final report
    console.log('─'.repeat(70));
    console.log('📈 OPTIMIZATION COMPLETE!');
    console.log('─'.repeat(70));
    console.log(`✅ Images Processed: ${stats.processed}`);
    console.log(`✅ Images Optimized: ${stats.optimized}`);
    console.log(`❌ Errors: ${stats.errors}`);
    console.log(`💰 Total Saved: ${(stats.savedBytes / 1024 / 1024).toFixed(2)}MB`);
    console.log(`📊 Original Size: ${(stats.originalBytes / 1024 / 1024).toFixed(2)}MB`);
    console.log(`📊 Reduction: ${((stats.savedBytes / stats.originalBytes) * 100).toFixed(1)}%`);
    console.log(`\n🎯 Next Steps:`);
    console.log(`   1. Update templates to use .webp versions`);
    console.log(`   2. Add responsive <picture> tags for mobile/desktop`);
    console.log(`   3. Implement lazy loading for below-fold images`);
    console.log(`   4. Run Lighthouse to verify 10/10 scores`);
    
  } catch (err) {
    console.error('❌ Failed to process images:', err);
    process.exit(1);
  }
}

optimizeImages().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

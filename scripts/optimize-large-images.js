const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to optimize (over 250KB)
const imagesToOptimize = [
  { file: 'sanbardino12.webp', currentSize: '717KB', targetQuality: 65 },
  { file: '1.webp', currentSize: '426KB', targetQuality: 70 },
  { file: 'services-area.webp', currentSize: '374KB', targetQuality: 72 },
  { file: 'hsecurity.webp', currentSize: '369KB', targetQuality: 72 },
  { file: 'mobilesecurity.webp', currentSize: '368KB', targetQuality: 72 },
  { file: '4.webp', currentSize: '319KB', targetQuality: 75 },
  { file: 'firewatch.webp', currentSize: '314KB', targetQuality: 75 },
  { file: 'career1.webp', currentSize: '305KB', targetQuality: 75 }
];

const imgDir = path.join(__dirname, '../Public/img');
const backupDir = path.join(__dirname, '../Public/img/backup-originals');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('✅ Created backup directory:', backupDir);
}

async function optimizeImage(fileName, targetQuality) {
  const inputPath = path.join(imgDir, fileName);
  const backupPath = path.join(backupDir, fileName);
  const tempPath = path.join(imgDir, `temp_${fileName}`);

  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);

    // Create backup if it doesn't exist
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`📦 Backed up: ${fileName}`);
    }

    // Optimize the image
    await sharp(inputPath)
      .webp({ quality: targetQuality, effort: 6 })
      .toFile(tempPath);

    // Get new file size
    const newStats = fs.statSync(tempPath);
    const newSizeKB = (newStats.size / 1024).toFixed(2);

    // If still over 250KB and quality > 50, try lower quality
    if (newStats.size > 250 * 1024 && targetQuality > 50) {
      console.log(`⚠️  ${fileName}: ${newSizeKB}KB still over 250KB, reducing quality...`);
      
      // Try progressively lower quality until under 250KB
      let quality = targetQuality - 5;
      while (quality >= 50 && newStats.size > 250 * 1024) {
        await sharp(inputPath)
          .webp({ quality: quality, effort: 6 })
          .toFile(tempPath);
        
        const checkStats = fs.statSync(tempPath);
        if (checkStats.size <= 250 * 1024) {
          const finalSizeKB = (checkStats.size / 1024).toFixed(2);
          console.log(`✅ ${fileName}: ${originalSizeKB}KB → ${finalSizeKB}KB (quality: ${quality})`);
          fs.renameSync(tempPath, inputPath);
          return;
        }
        quality -= 5;
      }
    }

    // Replace original with optimized version
    fs.renameSync(tempPath, inputPath);

    const reduction = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`✅ ${fileName}: ${originalSizeKB}KB → ${newSizeKB}KB (-${reduction}%) [quality: ${targetQuality}]`);

  } catch (error) {
    console.error(`❌ Error optimizing ${fileName}:`, error.message);
    
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  console.log(`Target: Reduce 8 images to under 250KB each\n`);

  for (const image of imagesToOptimize) {
    await optimizeImage(image.file, image.targetQuality);
  }

  console.log('\n✅ Image optimization complete!');
  console.log('\n📊 Verifying final sizes...\n');

  // Verify all images are now under 250KB
  let allUnder250 = true;
  for (const image of imagesToOptimize) {
    const filePath = path.join(imgDir, image.file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const under250 = stats.size <= 250 * 1024;
    
    console.log(`${under250 ? '✅' : '❌'} ${image.file}: ${sizeKB}KB ${under250 ? '' : '(STILL OVER 250KB!)'}`);
    
    if (!under250) {
      allUnder250 = false;
    }
  }

  console.log('\n' + (allUnder250 ? '🎉 All images are now under 250KB!' : '⚠️  Some images are still over 250KB'));
  console.log('\n💾 Original images backed up to: Public/img/backup-originals/');
}

main().catch(console.error);

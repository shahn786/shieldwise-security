const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '../Public/img');
const QUALITY = 85;
const MAX_WIDTH = 1920;

async function convertImageToWebP(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = fileName.replace(/\.(png|jpg|jpeg)$/i, '');
    const webpPath = path.join(path.dirname(filePath), `${fileNameWithoutExt}.webp`);
    
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping ${fileName} (WebP already exists)`);
      return { skipped: true };
    }

    const stats = fs.statSync(filePath);
    const originalSizeKB = (stats.size / 1024).toFixed(2);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    await image
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);
    const savings = ((1 - webpStats.size / stats.size) * 100).toFixed(1);

    console.log(`✅ ${fileName}`);
    console.log(`   Original: ${originalSizeKB}KB → WebP: ${webpSizeKB}KB (${savings}% smaller)`);
    
    return {
      original: filePath,
      webp: webpPath,
      originalSize: stats.size,
      webpSize: webpStats.size,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
    return { error: true };
  }
}

async function convertAllImages() {
  console.log('🔄 Starting WebP conversion...\n');
  
  const files = fs.readdirSync(IMG_DIR)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .filter(file => !file.includes('originals-backup'))
    .map(file => path.join(IMG_DIR, file));

  if (files.length === 0) {
    console.log('No PNG/JPG images found to convert.');
    return;
  }

  console.log(`Found ${files.length} images to convert\n`);

  const results = [];
  for (const file of files) {
    const result = await convertImageToWebP(file);
    if (!result.skipped && !result.error) {
      results.push(result);
    }
  }

  const successful = results.filter(r => !r.error && !r.skipped);
  
  if (successful.length > 0) {
    const totalOriginal = successful.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebP = successful.reduce((sum, r) => sum + r.webpSize, 0);
    const totalSavings = ((1 - totalWebP / totalOriginal) * 100).toFixed(1);

    console.log('\n📊 Conversion Summary:');
    console.log(`   Images converted: ${successful.length}`);
    console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   WebP size: ${(totalWebP / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total savings: ${totalSavings}%`);
    console.log(`\n✅ WebP conversion complete!`);
  }
}

convertAllImages().catch(console.error);


const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const imgDir = path.join(__dirname, '../Public/img');
  const files = await fs.readdir(imgDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(imgDir, file);
      const outputPath = path.join(imgDir, `${path.parse(file).name}.webp`);
      
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .resize({
          width: 1920,
          height: undefined,
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputPath);
      
      // Create mobile version
      const mobileOutputPath = path.join(imgDir, `${path.parse(file).name}-mobile.webp`);
      await sharp(inputPath)
        .webp({ quality: 75, effort: 6 })
        .resize({
          width: 768,
          height: undefined,
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(mobileOutputPath);
    }
  }
  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);


const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  try {
    const imgDir = path.join(process.cwd(), 'Public', 'img');
    console.log('Processing images in:', imgDir);
    
    const files = await fs.readdir(imgDir);
    console.log('Found files:', files.length);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        console.log('Processing:', file);
        const inputPath = path.join(imgDir, file);
        const outputPath = path.join(imgDir, `${path.parse(file).name}.webp`);
        
        try {
          await sharp(inputPath)
            .webp({ quality: 80, effort: 6 })
            .resize({
              width: 1920,
              height: undefined,
              withoutEnlargement: true,
              fit: 'inside'
            })
            .toFile(outputPath);
          
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
            
          console.log('Successfully processed:', file);
        } catch (err) {
          console.error('Error processing file:', file, err);
        }
      }
    }
    console.log('Image optimization complete!');
  } catch (err) {
    console.error('Failed to process images:', err);
  }
}

optimizeImages().catch(console.error);

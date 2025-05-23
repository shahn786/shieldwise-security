
const fs = require('fs').promises;
const path = require('path');

async function organizeAssets() {
  const assetsDir = path.join(process.cwd(), 'attached_assets');
  const categories = {
    images: ['png', 'webp', 'jpg', 'jpeg'],
    documents: ['txt', 'md', 'doc'],
    backups: ['bak', 'backup']
  };

  // Create category folders
  for (const category of Object.keys(categories)) {
    await fs.mkdir(path.join(assetsDir, category), { recursive: true });
  }

  // Get all files
  const files = await fs.readdir(assetsDir);

  // Move files to appropriate folders
  for (const file of files) {
    const ext = file.split('.').pop().toLowerCase();
    for (const [category, extensions] of Object.entries(categories)) {
      if (extensions.includes(ext)) {
        const oldPath = path.join(assetsDir, file);
        const newPath = path.join(assetsDir, category, file);
        try {
          await fs.rename(oldPath, newPath);
          console.log(`Moved ${file} to ${category}`);
        } catch (err) {
          console.error(`Error moving ${file}:`, err);
        }
        break;
      }
    }
  }
}

organizeAssets().catch(console.error);

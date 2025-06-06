
const fs = require('fs').promises;
const path = require('path');

async function cleanupCSS() {
  try {
    const cssDir = path.join(process.cwd(), 'Public', 'css');
    
    console.log('🧹 Starting CSS cleanup...');
    
    // Files to remove (redundant or outdated)
    const filesToRemove = [
      'style-contact.css',     // Duplicate of contact-style.css
      'style-contact.min.css',
      'style456.css',          // Outdated/unclear purpose
      'style456.min.css'
    ];
    
    // Remove redundant files
    for (const file of filesToRemove) {
      const filePath = path.join(cssDir, file);
      try {
        await fs.unlink(filePath);
        console.log(`✅ Removed: ${file}`);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.log(`⚠️ Could not remove ${file}:`, err.message);
        }
      }
    }
    
    console.log('🎉 CSS cleanup complete!');
    
    // Show remaining files
    const remainingFiles = await fs.readdir(cssDir);
    const cssFiles = remainingFiles.filter(f => f.endsWith('.css'));
    
    console.log('\n📋 Remaining CSS files:');
    cssFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
    
  } catch (error) {
    console.error('❌ CSS cleanup failed:', error);
    process.exit(1);
  }
}

cleanupCSS();

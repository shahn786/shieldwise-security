
const fs = require('fs').promises;
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove space around specific characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

// Simple JS minifier
function minifyJS(js) {
  return js
    // Remove single-line comments (but preserve URLs)
    .replace(/\/\/(?![^\r\n]*["'`]).*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove space around operators and punctuation
    .replace(/\s*([{}();,])\s*/g, '$1')
    // Remove trailing semicolons where safe
    .replace(/;\s*}/g, '}')
    .trim();
}

async function minifyAssets() {
  try {
    const cssDir = path.join(process.cwd(), 'Public', 'css');
    const jsDir = path.join(process.cwd(), 'Public', 'JS');
    
    console.log('🎯 Starting CSS/JS minification...');
    
    // Minify CSS files
    const cssFiles = await fs.readdir(cssDir);
    for (const file of cssFiles) {
      if (file.endsWith('.css') && !file.includes('.min.')) {
        const inputPath = path.join(cssDir, file);
        const outputPath = path.join(cssDir, file.replace('.css', '.min.css'));
        
        const cssContent = await fs.readFile(inputPath, 'utf8');
        const minifiedCSS = minifyCSS(cssContent);
        
        await fs.writeFile(outputPath, minifiedCSS);
        
        const originalSize = Buffer.byteLength(cssContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedCSS, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ CSS: ${file} → ${file.replace('.css', '.min.css')} (${savings}% smaller)`);
      }
    }
    
    // Minify JS files
    const jsFiles = await fs.readdir(jsDir);
    for (const file of jsFiles) {
      if (file.endsWith('.js') && !file.includes('.min.')) {
        const inputPath = path.join(jsDir, file);
        const outputPath = path.join(jsDir, file.replace('.js', '.min.js'));
        
        const jsContent = await fs.readFile(inputPath, 'utf8');
        const minifiedJS = minifyJS(jsContent);
        
        await fs.writeFile(outputPath, minifiedJS);
        
        const originalSize = Buffer.byteLength(jsContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedJS, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ JS: ${file} → ${file.replace('.js', '.min.js')} (${savings}% smaller)`);
      }
    }
    
    console.log('🎉 Asset minification complete!');
    
  } catch (error) {
    console.error('❌ Minification failed:', error);
    process.exit(1);
  }
}

minifyAssets();

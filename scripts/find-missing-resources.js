const { globby } = require('globby');
const fs = require('fs');
const path = require('path');

async function findMissingResources() {
  console.log('\n📊 Scanning for referenced resources...\n');

  const files = await globby(['views/**/*.ejs']);
  const cssReferences = new Set();
  const jsReferences = new Set();
  const imageReferences = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // Find CSS references
    const cssMatches = content.match(/(?:href|url)\s*=\s*["']([^"']*\.css[^"']*)["']/gi);
    if (cssMatches) {
      cssMatches.forEach(match => {
        const url = match.match(/["']([^"']*\.css[^"']*)["']/)[1];
        if (url.startsWith('/css/') || url.startsWith('css/')) {
          cssReferences.add(url.replace(/^\//, ''));
        }
      });
    }

    // Find JS references
    const jsMatches = content.match(/(?:src)\s*=\s*["']([^"']*\.js[^"']*)["']/gi);
    if (jsMatches) {
      jsMatches.forEach(match => {
        const url = match.match(/["']([^"']*\.js[^"']*)["']/)[1];
        if ((url.startsWith('/JS/') || url.startsWith('JS/') || url.startsWith('/js/') || url.startsWith('js/')) && !url.includes('http')) {
          jsReferences.add(url.replace(/^\//, ''));
        }
      });
    }
  }

  console.log('CSS Files Referenced:', cssReferences.size);
  console.log('JS Files Referenced:', jsReferences.size);

  // Check which files are missing
  const missingCSS = [];
  const missingJS = [];

  for (const cssFile of cssReferences) {
    const publicPath = path.join('Public', cssFile);
    if (!fs.existsSync(publicPath)) {
      missingCSS.push(cssFile);
    }
  }

  for (const jsFile of jsReferences) {
    const publicPath = path.join('Public', jsFile);
    if (!fs.existsSync(publicPath)) {
      missingJS.push(jsFile);
    }
  }

  if (missingCSS.length > 0) {
    console.log('\n⚠️  Missing CSS files:');
    missingCSS.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log('\n✅ All referenced CSS files exist');
  }

  if (missingJS.length > 0) {
    console.log('\n⚠️  Missing JS files:');
    missingJS.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log('\n✅ All referenced JS files exist');
  }

  console.log('\n');
}

findMissingResources().catch(console.error);

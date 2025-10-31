const { globby } = require('globby');
const fs = require('fs');

async function checkPartialsUsage() {
  console.log('\n📊 Checking Header/Footer/Nav Partials Usage...\n');

  const files = await globby(['views/**/*.ejs', '!views/partials/**']);
  const results = {
    withHeader: [],
    withoutHeader: [],
    withFooter: [],
    withoutFooter: []
  };

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // Check for Header partial
    if (content.includes("include('partials/Header')") || 
        content.includes('include("partials/Header")') ||
        content.includes("include('../partials/Header')") || 
        content.includes('include("../partials/Header")')) {
      results.withHeader.push(file);
    } else {
      results.withoutHeader.push(file);
    }

    // Check for Footer partial
    if (content.includes("include('partials/Footer')") || 
        content.includes('include("partials/Footer")') ||
        content.includes("include('../partials/Footer')") || 
        content.includes('include("../partials/Footer")')) {
      results.withFooter.push(file);
    } else {
      results.withoutFooter.push(file);
    }
  }

  console.log(`Total files scanned: ${files.length}\n`);

  console.log(`✅ Files using Header partial: ${results.withHeader.length}`);
  console.log(`⚠️  Files WITHOUT Header partial: ${results.withoutHeader.length}`);
  if (results.withoutHeader.length > 0) {
    results.withoutHeader.slice(0, 10).forEach(file => {
      console.log(`  - ${file}`);
    });
    if (results.withoutHeader.length > 10) {
      console.log(`  ... and ${results.withoutHeader.length - 10} more`);
    }
  }

  console.log(`\n✅ Files using Footer partial: ${results.withFooter.length}`);
  console.log(`⚠️  Files WITHOUT Footer partial: ${results.withoutFooter.length}`);
  if (results.withoutFooter.length > 0) {
    results.withoutFooter.slice(0, 10).forEach(file => {
      console.log(`  - ${file}`);
    });
    if (results.withoutFooter.length > 10) {
      console.log(`  ... and ${results.withoutFooter.length - 10} more`);
    }
  }

  console.log('\n✅ Partials check complete!\n');
}

checkPartialsUsage().catch(console.error);

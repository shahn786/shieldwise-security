const cheerio = require('cheerio');
const { globby } = require('globby');
const fs = require('fs');

async function auditAltText() {
  console.log('\n📊 Starting Alt Text Audit...\n');

  const files = await globby(['views/**/*.ejs', '!views/partials/**']);
  const issues = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);

    $('img').each((i, elem) => {
      const $img = $(elem);
      const src = $img.attr('src');
      const alt = $img.attr('alt');

      if (!alt && alt !== '') {
        issues.push({
          file,
          src: src || 'unknown',
          line: 'N/A'
        });
      }
    });
  }

  // Report
  if (issues.length === 0) {
    console.log('✅ All images have alt attributes!');
  } else {
    console.log(`\n⚠️  Found ${issues.length} images without alt attributes:\n`);
    issues.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    src: ${issue.src}\n`);
    });
  }

  return issues;
}

auditAltText().catch(console.error);

const cheerio = require('cheerio');
const { globby } = require('globby');
const fs = require('fs');

async function auditMetaTags() {
  console.log('\n📊 Starting Meta Tags Audit...\n');

  const files = await globby(['views/**/*.ejs', '!views/partials/**']);
  const report = {
    missingCharset: [],
    missingViewport: [],
    missingTitle: [],
    missingDescription: [],
    missingCanonical: [],
    missingRobots: [],
    titleTooLong: [],
    titleTooShort: [],
    descTooLong: [],
    descTooShort: []
  };

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);

    // Check charset
    if (!content.includes('charset="UTF-8"') && !content.includes("charset='UTF-8'")) {
      report.missingCharset.push(file);
    }

    // Check viewport
    if (!content.includes('name="viewport"')) {
      report.missingViewport.push(file);
    }

    // Check title
    const title = $('title').text();
    if (!title) {
      report.missingTitle.push(file);
    } else {
      if (title.length > 60) report.titleTooLong.push({ file, length: title.length, title: title.substring(0, 80) });
      if (title.length < 30) report.titleTooShort.push({ file, length: title.length, title });
    }

    // Check description
    const desc = $('meta[name="description"]').attr('content');
    if (!desc) {
      report.missingDescription.push(file);
    } else {
      if (desc.length > 160) report.descTooLong.push({ file, length: desc.length });
      if (desc.length < 120) report.descTooShort.push({ file, length: desc.length });
    }

    // Check canonical
    if (!content.includes('rel="canonical"')) {
      report.missingCanonical.push(file);
    }

    // Check robots
    if (!content.includes('name="robots"')) {
      report.missingRobots.push(file);
    }
  }

  // Print report
  console.log(`\n📈 AUDIT RESULTS (${files.length} files scanned)\n`);

  Object.keys(report).forEach(key => {
    const items = report[key];
    if (items.length > 0) {
      console.log(`\n${key.toUpperCase()}: ${items.length} issues`);
      items.slice(0, 5).forEach(item => {
        if (typeof item === 'string') {
          console.log(`  - ${item}`);
        } else {
          console.log(`  - ${item.file} (${item.length} chars)`);
        }
      });
      if (items.length > 5) {
        console.log(`  ... and ${items.length - 5} more`);
      }
    }
  });

  console.log('\n✅ Audit complete!\n');
}

auditMetaTags().catch(console.error);

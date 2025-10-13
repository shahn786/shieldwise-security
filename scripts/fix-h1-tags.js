/**
 * Automated H1 Tag Fixer for ShieldWise Security
 * Converts multiple H1 tags to single H1 per page (SEO best practice)
 * 
 * Strategy:
 * 1. Keep FIRST H1 (hero section) - most descriptive
 * 2. Convert 2nd and 3rd H1s to H2
 * 3. Validate only ONE H1 remains per page
 */

const fs = require('fs');
const path = require('path');

// Directories to process
const directories = [
  path.join(__dirname, '../views/cities'),
  path.join(__dirname, '../views/services')
];

// Statistics
let stats = {
  filesProcessed: 0,
  filesFixed: 0,
  h1sConverted: 0,
  errors: []
};

/**
 * Fix H1 tags in a single file
 */
function fixH1Tags(filePath) {
  try {
    // Read file
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Count H1 tags
    const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
    const h1Count = h1Matches ? h1Matches.length : 0;
    
    if (h1Count <= 1) {
      console.log(`✅ ${path.basename(filePath)}: Already has ${h1Count} H1 (OK)`);
      stats.filesProcessed++;
      return;
    }
    
    console.log(`🔧 ${path.basename(filePath)}: Found ${h1Count} H1 tags, fixing...`);
    
    // Strategy: Keep first H1, convert others to H2
    let h1Counter = 0;
    content = content.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, (match, attributes, innerContent) => {
      h1Counter++;
      
      if (h1Counter === 1) {
        // Keep first H1 as is
        return match;
      } else {
        // Convert to H2
        stats.h1sConverted++;
        return `<h2${attributes}>${innerContent}</h2>`;
      }
    });
    
    // Verify fix
    const newH1Count = (content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    
    if (newH1Count === 1) {
      // Write fixed content
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Fixed: ${h1Count} → 1 H1 (converted ${h1Count - 1} to H2)`);
      stats.filesFixed++;
    } else {
      console.log(`   ⚠️ Warning: Still has ${newH1Count} H1 tags after fix`);
      stats.errors.push({
        file: path.basename(filePath),
        issue: `Still ${newH1Count} H1s after fix`
      });
    }
    
    stats.filesProcessed++;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    stats.errors.push({
      file: path.basename(filePath),
      issue: error.message
    });
  }
}

/**
 * Process all files in a directory
 */
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.ejs'))
    .map(file => path.join(dirPath, file));
  
  console.log(`\n📁 Processing ${files.length} files in ${path.basename(dirPath)}/`);
  console.log('─'.repeat(60));
  
  files.forEach(fixH1Tags);
}

/**
 * Validate all pages after fixes
 */
function validatePages() {
  console.log('\n📊 VALIDATION REPORT');
  console.log('─'.repeat(60));
  
  let validationErrors = [];
  
  directories.forEach(dir => {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ejs'));
    
    files.forEach(file => {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const h1Count = (content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
      
      if (h1Count !== 1) {
        validationErrors.push({
          file: file,
          h1Count: h1Count
        });
      }
    });
  });
  
  if (validationErrors.length === 0) {
    console.log('✅ All pages have exactly ONE H1 tag!');
  } else {
    console.log('⚠️ Pages still with issues:');
    validationErrors.forEach(err => {
      console.log(`   - ${err.file}: ${err.h1Count} H1 tags`);
    });
  }
}

// Main execution
console.log('🚀 ShieldWise Security - H1 Tag Fixer');
console.log('Converting multiple H1s to single H1 per page for SEO optimization\n');

// Process all directories
directories.forEach(processDirectory);

// Validation
validatePages();

// Final report
console.log('\n📈 FINAL STATISTICS');
console.log('─'.repeat(60));
console.log(`Files Processed: ${stats.filesProcessed}`);
console.log(`Files Fixed: ${stats.filesFixed}`);
console.log(`H1 Tags Converted to H2: ${stats.h1sConverted}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\n⚠️ ERRORS ENCOUNTERED:');
  stats.errors.forEach(err => {
    console.log(`   - ${err.file}: ${err.issue}`);
  });
}

console.log('\n✅ H1 optimization complete!');
console.log('🎯 Next steps:');
console.log('   1. Review changes with git diff');
console.log('   2. Test affected pages');
console.log('   3. Validate with Lighthouse/SEO tools');

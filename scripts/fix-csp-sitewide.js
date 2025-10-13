#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting Site-Wide CSP Fix...\n');

let totalFiles = 0;
let fixedFiles = 0;
let errors = 0;

function fixCSPInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Pattern 1: Remove standalone CSP meta tags
    const cspPattern = /<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi;
    if (cspPattern.test(content)) {
      content = content.replace(cspPattern, '<!-- CSP managed via HTTP headers in index.js -->');
      modified = true;
    }
    
    // Pattern 2: Remove CSP-Report-Only meta tags
    const cspReportPattern = /<meta\s+http-equiv=["']Content-Security-Policy-Report-Only["'][^>]*>/gi;
    if (cspReportPattern.test(content)) {
      content = content.replace(cspReportPattern, '<!-- CSP managed via HTTP headers in index.js -->');
      modified = true;
    }
    
    // Pattern 3: Comment out Hotjar tracking code
    const hotjarPattern = /<!-- Hotjar Tracking Code -->\s*<script>[\s\S]*?hotjar[\s\S]*?<\/script>/gi;
    if (hotjarPattern.test(content)) {
      content = content.replace(hotjarPattern, '<!-- Hotjar tracking disabled (CSP compliance) -->');
      modified = true;
    }
    
    // Pattern 4: Comment out Clarity tracking code
    const clarityPattern = /<!-- Microsoft Clarity -->\s*<script[^>]*>[\s\S]*?clarity[\s\S]*?<\/script>/gi;
    if (clarityPattern.test(content)) {
      content = content.replace(clarityPattern, '<!-- Microsoft Clarity disabled (CSP compliance) -->');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixedFiles++;
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    errors++;
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function scanDirectory(dir, extensions = ['.ejs']) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, extensions);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      totalFiles++;
      fixCSPInFile(filePath);
    }
  }
}

// Scan views directory
const viewsDir = path.join(__dirname, '..', 'views');
console.log(`📁 Scanning: ${viewsDir}\n`);
scanDirectory(viewsDir);

console.log('\n' + '='.repeat(50));
console.log('✨ CSP Fix Complete!');
console.log('='.repeat(50));
console.log(`📊 Total files scanned: ${totalFiles}`);
console.log(`✅ Files fixed: ${fixedFiles}`);
console.log(`❌ Errors: ${errors}`);
console.log('\n💡 All pages now use CSP from HTTP headers (index.js)');
console.log('💡 Hotjar and Clarity tracking disabled for CSP compliance');

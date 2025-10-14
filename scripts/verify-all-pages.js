const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

function getAllEJSFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip node_modules and partials
            if (!filePath.includes('node_modules') && !filePath.includes('partials')) {
                getAllEJSFiles(filePath, fileList);
            }
        } else if (file.endsWith('.ejs') && !filePath.includes('partials')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function checkPageStructure(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = filePath.replace(process.cwd() + '/', '');
    
    const hasHeader = content.includes("include('partials/Header')") || 
                      content.includes('include("partials/Header")') ||
                      content.includes("include('../partials/Header')") ||
                      content.includes('include("../partials/Header")');
    
    const hasFooter = content.includes("include('partials/Footer')") || 
                      content.includes('include("partials/Footer")') ||
                      content.includes("include('../partials/Footer')") ||
                      content.includes('include("../partials/Footer")');
    
    const hasDoctype = content.trim().startsWith('<!DOCTYPE html>');
    const hasHeroImage = content.includes('hero-section') || 
                         content.includes('hero') || 
                         content.includes('banner') ||
                         content.includes('jumbotron') ||
                         content.includes('default-hero-image');
    
    return {
        path: relativePath,
        hasHeader,
        hasFooter,
        hasDoctype,
        hasHeroImage,
        isComplete: hasHeader && hasFooter && hasDoctype
    };
}

// Main execution
console.log(`${colors.bold}${colors.cyan}
╔═══════════════════════════════════════════════════════════════╗
║     ShieldWise Security - Page Structure Verification        ║
╚═══════════════════════════════════════════════════════════════╝
${colors.reset}`);

const viewsDir = path.join(process.cwd(), 'views');
const allEJSFiles = getAllEJSFiles(viewsDir);

console.log(`\n${colors.blue}📊 Scanning ${allEJSFiles.length} EJS pages...${colors.reset}\n`);

const results = allEJSFiles.map(checkPageStructure);

// Categorize results
const complete = results.filter(r => r.isComplete);
const missingHeader = results.filter(r => !r.hasHeader);
const missingFooter = results.filter(r => !r.hasFooter);
const missingDoctype = results.filter(r => !r.hasDoctype);
const missingHeroImage = results.filter(r => !r.hasHeroImage);

// Display summary
console.log(`${colors.bold}${colors.green}✅ SUMMARY REPORT${colors.reset}\n`);
console.log(`${colors.green}✓ Complete pages (Header + Footer + DOCTYPE): ${complete.length}${colors.reset}`);
console.log(`${colors.red}✗ Missing Header: ${missingHeader.length}${colors.reset}`);
console.log(`${colors.red}✗ Missing Footer: ${missingFooter.length}${colors.reset}`);
console.log(`${colors.yellow}⚠ Missing DOCTYPE: ${missingDoctype.length}${colors.reset}`);
console.log(`${colors.yellow}⚠ Missing Hero Image: ${missingHeroImage.length}${colors.reset}\n`);

// Display issues
if (missingHeader.length > 0) {
    console.log(`${colors.red}${colors.bold}MISSING HEADER:${colors.reset}`);
    missingHeader.forEach(r => console.log(`  ${colors.red}✗${colors.reset} ${r.path}`));
    console.log();
}

if (missingFooter.length > 0) {
    console.log(`${colors.red}${colors.bold}MISSING FOOTER:${colors.reset}`);
    missingFooter.forEach(r => console.log(`  ${colors.red}✗${colors.reset} ${r.path}`));
    console.log();
}

if (missingDoctype.length > 0) {
    console.log(`${colors.yellow}${colors.bold}MISSING DOCTYPE:${colors.reset}`);
    missingDoctype.forEach(r => console.log(`  ${colors.yellow}⚠${colors.reset} ${r.path}`));
    console.log();
}

if (missingHeroImage.length > 0 && missingHeroImage.length < 20) {
    console.log(`${colors.yellow}${colors.bold}MISSING HERO IMAGE (showing first 20):${colors.reset}`);
    missingHeroImage.slice(0, 20).forEach(r => console.log(`  ${colors.yellow}⚠${colors.reset} ${r.path}`));
    if (missingHeroImage.length > 20) {
        console.log(`  ${colors.yellow}... and ${missingHeroImage.length - 20} more${colors.reset}`);
    }
    console.log();
}

// Overall status
const overallScore = Math.round((complete.length / results.length) * 100);
console.log(`${colors.bold}${colors.cyan}
╔═══════════════════════════════════════════════════════════════╗
║  OVERALL PAGE HEALTH: ${overallScore}% (${complete.length}/${results.length} pages complete)          ║
╚═══════════════════════════════════════════════════════════════╝
${colors.reset}`);

// Exit with appropriate code
process.exit(missingHeader.length > 0 || missingFooter.length > 0 ? 1 : 0);

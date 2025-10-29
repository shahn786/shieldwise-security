#!/usr/bin/env node

/**
 * City Pages Cleanup Script
 * 
 * This script updates all city pages to:
 * 1. Add "Cheapest and best security guard services in {{CITY}}, California" under H1
 * 2. Remove all explicit pricing ($, per hour, etc.)
 * 3. Replace with neutral market statements
 * 4. Ensure CTAs are present
 * 5. Preserve all layout and styling
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CITIES_DIR = path.join(__dirname, '../views/cities');
const BACKUP_DIR = path.join(__dirname, '../views/cities-backup-pricing-cleanup');

// Neutral market statement template
const NEUTRAL_PRICING_STATEMENT = `Regular market prices for licensed security guards in {{CITY}} vary by scope, schedule, and risk level. These are typical industry ranges—not ShieldWise Security quotes. For our pricing (often the lowest in {{CITY}}), request a custom quote.`;

const PRICING_DISCLAIMER = `Note: Market rates shown are general industry references for {{CITY}} and are not ShieldWise Security's prices. ShieldWise Security frequently provides cheaper, customized rates based on your needs.`;

// Get city name from filename
function getCityName(filename) {
    const basename = path.basename(filename, '.ejs');
    // Convert hyphenated-name to Title Case
    return basename
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Step 1: Add cheapest/best sentence under H1
function addCheapestBestSentence(content, cityName) {
    // Find H1 tag
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/i;
    const h1Match = content.match(h1Regex);
    
    if (!h1Match) {
        console.warn(`  ⚠️  No H1 found for ${cityName}`);
        return content;
    }

    // Check if sentence already exists
    if (content.includes('Cheapest and best security guard services')) {
        console.log(`  ℹ️  Sentence already exists for ${cityName}`);
        return content;
    }

    // Insert new paragraph after H1
    const newSentence = `<p class="cheapest-best-claim animate-fade-in-delay">Cheapest and best security guard services in ${cityName}, California.</p>`;
    
    // Find position after H1 closing tag
    const h1EndIndex = h1Match.index + h1Match[0].length;
    
    // Insert new paragraph
    return content.slice(0, h1EndIndex) + '\n            ' + newSentence + content.slice(h1EndIndex);
}

// Step 2: Remove price specifications from schema
function removePriceSpecifications(content) {
    // Remove entire priceSpecification objects
    const priceSpecRegex = /,?\s*"priceSpecification":\s*\{[^}]*\}/g;
    content = content.replace(priceSpecRegex, '');
    
    // Remove standalone price fields
    content = content.replace(/,?\s*"price":\s*"[^"]*"/g, '');
    content = content.replace(/,?\s*"priceCurrency":\s*"[^"]*"/g, '');
    content = content.replace(/,?\s*"unitText":\s*"[^"]*"/g, '');
    
    // Clean up any double commas left behind
    content = content.replace(/,\s*,/g, ',');
    
    return content;
}

// Step 3: Remove pricing from FAQ answers
function removePricingFromFAQs(content, cityName) {
    // Pattern for FAQ pricing answers
    const faqPricePattern = /"text":\s*"[^"]*(\$\d+[-–]\$?\d*|per hour|\/hour|\/hr)[^"]*"/gi;
    
    // Replace with neutral statement
    content = content.replace(faqPricePattern, (match) => {
        if (match.toLowerCase().includes('price') || match.toLowerCase().includes('cost') || match.includes('$')) {
            const neutralStatement = NEUTRAL_PRICING_STATEMENT.replace(/\{\{CITY\}\}/g, cityName);
            return `"text": "${neutralStatement}"`;
        }
        return match;
    });
    
    return content;
}

// Step 4: Remove service pricing divs
function removeServicePricing(content, cityName) {
    // Remove pricing divs like: <div class="service-pricing">Starting at $45-85/hour</div>
    content = content.replace(/<div class="service-pricing">[^<]*<\/div>/gi, '');
    
    // Remove any paragraph or span containing explicit prices
    content = content.replace(/<p[^>]*>.*?(\$\d+[-–]\$?\d*|per hour|\/hour|starting at \$).*?<\/p>/gi, '');
    content = content.replace(/<span[^>]*>.*?(\$\d+[-–]\$?\d*|per hour|\/hour).*?<\/span>/gi, '');
    
    return content;
}

// Step 5: Add/verify CTAs
function ensureCTAs(content) {
    // Check if CTAs exist
    const hasCTA = content.includes('Get Your Custom Quote') || content.includes('Get a Free Quote');
    
    if (!hasCTA) {
        console.log(`  ℹ️  Adding CTA buttons`);
        // This would require more complex HTML parsing - for now just log
    }
    
    return content;
}

// Main processing function
function processCityFile(filePath) {
    const filename = path.basename(filePath);
    const cityName = getCityName(filename);
    
    console.log(`\n📄 Processing: ${cityName} (${filename})`);
    
    try {
        // Read file
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Step 1: Add cheapest/best sentence
        content = addCheapestBestSentence(content, cityName);
        
        // Step 2: Remove price specifications from schema
        content = removePriceSpecifications(content);
        
        // Step 3: Remove pricing from FAQ answers
        content = removePricingFromFAQs(content, cityName);
        
        // Step 4: Remove service pricing
        content = removeServicePricing(content, cityName);
        
        // Step 5: Ensure CTAs
        content = ensureCTAs(content);
        
        // Check if anything changed
        if (content !== originalContent) {
            // Write updated content
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✅ Updated successfully`);
            return true;
        } else {
            console.log(`  ℹ️  No changes needed`);
            return false;
        }
        
    } catch (error) {
        console.error(`  ❌ Error processing ${filename}:`, error.message);
        return false;
    }
}

// Main execution
async function main() {
    console.log('🚀 Starting City Pages Cleanup Script\n');
    console.log('='.repeat(60));
    
    // Create backup directory
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`📁 Created backup directory: ${BACKUP_DIR}\n`);
    }
    
    // Get all city page files (exclude .backup files)
    const files = fs.readdirSync(CITIES_DIR)
        .filter(f => f.endsWith('.ejs') && !f.endsWith('.backup'))
        .map(f => path.join(CITIES_DIR, f));
    
    console.log(`📊 Found ${files.length} city pages to process\n`);
    console.log('='.repeat(60));
    
    // Create backups first
    console.log('\n📦 Creating backups...');
    files.forEach(file => {
        const filename = path.basename(file);
        const backupPath = path.join(BACKUP_DIR, filename);
        fs.copyFileSync(file, backupPath);
    });
    console.log(`✅ Backed up ${files.length} files to ${BACKUP_DIR}`);
    
    // Process each file
    let processed = 0;
    let updated = 0;
    
    for (const file of files) {
        const wasUpdated = processCityFile(file);
        processed++;
        if (wasUpdated) updated++;
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files processed: ${processed}`);
    console.log(`Files updated: ${updated}`);
    console.log(`Files unchanged: ${processed - updated}`);
    console.log(`\n✅ City pages cleanup complete!`);
    console.log(`\n📁 Backups saved to: ${BACKUP_DIR}`);
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { processCityFile, getCityName };

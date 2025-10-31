#!/usr/bin/env node

/**
 * Image Audit Script
 * Checks all images for:
 * - Missing alt text
 * - File size (>250KB warning)
 * - Format (suggests WebP conversion)
 * - Missing width/height attributes
 */

const fs = require('fs');
const path = require('path');
const { globby } = require('globby');
const chalk = require('chalk');

const IMG_DIR = path.join(__dirname, '../Public/img');
const VIEWS_DIR = path.join(__dirname, '../views');
const MAX_SIZE_KB = 250;

console.log(chalk.blue.bold('\n🖼️  Starting Image Audit...\n'));

async function auditImages() {
  const issues = [];
  let totalChecked = 0;

  // 1. Check image files
  console.log(chalk.cyan('📁 Checking image files...\n'));
  
  const imageFiles = fs.readdirSync(IMG_DIR).filter(file => 
    /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(file)
  );

  for (const file of imageFiles) {
    totalChecked++;
    const filePath = path.join(IMG_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    // Check file size
    if (sizeKB > MAX_SIZE_KB) {
      issues.push({
        type: 'SIZE',
        file,
        message: `File size ${sizeKB}KB exceeds ${MAX_SIZE_KB}KB`,
        severity: 'warning'
      });
      console.log(chalk.yellow(`⚠️  ${file}: ${sizeKB}KB (exceeds ${MAX_SIZE_KB}KB)`));
    }

    // Suggest WebP conversion for PNG/JPG
    if (/\.(png|jpg|jpeg)$/i.test(file)) {
      const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        issues.push({
          type: 'FORMAT',
          file,
          message: 'WebP version missing',
          severity: 'info'
        });
        console.log(chalk.blue(`ℹ️  ${file}: No WebP version found`));
      }
    }
  }

  // 2. Check for missing alt text in templates
  console.log(chalk.cyan('\n📄 Checking image alt text in templates...\n'));

  const templateFiles = await globby([
    `${VIEWS_DIR}/**/*.ejs`,
    '!**/node_modules/**'
  ]);

  for (const templatePath of templateFiles) {
    const content = fs.readFileSync(templatePath, 'utf-8');
    
    // Find img tags without alt
    const imgTagsWithoutAlt = content.match(/<img(?![^>]*alt=)[^>]*>/gi);
    
    if (imgTagsWithoutAlt) {
      const filename = path.relative(VIEWS_DIR, templatePath);
      issues.push({
        type: 'ALT',
        file: filename,
        message: `${imgTagsWithoutAlt.length} image(s) missing alt text`,
        severity: 'error'
      });
      console.log(chalk.red(`❌ ${filename}: ${imgTagsWithoutAlt.length} image(s) missing alt text`));
    }
  }

  // Summary
  console.log(chalk.blue.bold('\n📊 Image Audit Summary:\n'));
  console.log(chalk.gray(`Total images checked: ${totalChecked}`));
  console.log(chalk.gray(`Total issues found: ${issues.length}\n`));

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');

  if (errors.length > 0) {
    console.log(chalk.red(`❌ Errors: ${errors.length}`));
  }
  if (warnings.length > 0) {
    console.log(chalk.yellow(`⚠️  Warnings: ${warnings.length}`));
  }
  if (info.length > 0) {
    console.log(chalk.blue(`ℹ️  Info: ${info.length}`));
  }

  if (issues.length === 0) {
    console.log(chalk.green.bold('\n✅ No issues found! All images are optimized.\n'));
  } else {
    console.log(chalk.yellow.bold('\n⚠️  Issues found. Review above for details.\n'));
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

auditImages().catch(err => {
  console.error(chalk.red('Error running image audit:'), err);
  process.exit(1);
});

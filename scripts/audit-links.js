#!/usr/bin/env node

/**
 * Link Audit Script
 * Checks all internal and external links for broken links
 * Uses broken-link-checker-local package
 */

const { SiteChecker } = require('broken-link-checker-local');
const chalk = require('chalk');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

console.log(chalk.blue.bold('\n🔗 Starting Link Audit...\n'));
console.log(chalk.gray(`Base URL: ${BASE_URL}\n`));

const options = {
  excludeExternalLinks: false,
  excludeInternalLinks: false,
  filterLevel: 3,
  honorRobotExclusions: false,
  maxSocketsPerHost: 10,
  userAgent: 'ShieldWise-LinkChecker/1.0'
};

const siteChecker = new SiteChecker(options, {
  link: (result) => {
    if (result.broken) {
      console.log(chalk.red(`✗ BROKEN: ${result.url.original}`));
      console.log(chalk.gray(`  From: ${result.base.original}`));
      console.log(chalk.gray(`  Reason: ${result.brokenReason}\n`));
    } else if (result.excluded) {
      // Skip excluded links (quiet)
    } else {
      // Valid link (quiet unless verbose)
      if (process.argv.includes('--verbose')) {
        console.log(chalk.green(`✓ OK: ${result.url.original}`));
      }
    }
  },
  page: (error, pageUrl) => {
    if (error) {
      console.log(chalk.red(`✗ PAGE ERROR: ${pageUrl}`));
      console.log(chalk.gray(`  Error: ${error}\n`));
    } else {
      console.log(chalk.cyan(`📄 Scanning: ${pageUrl}`));
    }
  },
  end: () => {
    console.log(chalk.green.bold('\n✅ Link audit complete!\n'));
    process.exit(0);
  }
});

siteChecker.enqueue(BASE_URL);

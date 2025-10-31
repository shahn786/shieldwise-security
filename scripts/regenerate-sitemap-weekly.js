#!/usr/bin/env node

/**
 * Weekly Sitemap Regeneration Script
 * Regenerates sitemap.xml and pings search engines
 * Run this weekly via cron or CI/CD
 */

const { execSync } = require('child_process');
const chalk = require('chalk');
const https = require('https');

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://shieldwisesecurity.com/sitemap.xml';

console.log(chalk.blue.bold('\n🗺️  Starting Weekly Sitemap Regeneration...\n'));

// 1. Regenerate sitemap
console.log(chalk.cyan('📝 Regenerating sitemap.xml...\n'));

try {
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
  console.log(chalk.green('✅ Sitemap regenerated successfully!\n'));
} catch (error) {
  console.error(chalk.red('❌ Error regenerating sitemap:'), error.message);
  process.exit(1);
}

// 2. Ping search engines
console.log(chalk.cyan('📡 Pinging search engines...\n'));

const searchEngines = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  }
];

async function pingSearchEngine(engine) {
  return new Promise((resolve, reject) => {
    https.get(engine.url, (res) => {
      if (res.statusCode === 200) {
        console.log(chalk.green(`✅ ${engine.name}: Pinged successfully`));
        resolve();
      } else {
        console.log(chalk.yellow(`⚠️  ${engine.name}: Received status ${res.statusCode}`));
        resolve(); // Don't fail on ping errors
      }
    }).on('error', (error) => {
      console.log(chalk.red(`❌ ${engine.name}: ${error.message}`));
      resolve(); // Don't fail on ping errors
    });
  });
}

async function pingAll() {
  for (const engine of searchEngines) {
    await pingSearchEngine(engine);
  }
  
  console.log(chalk.green.bold('\n✅ Sitemap regeneration and search engine ping complete!\n'));
  console.log(chalk.gray(`Next run: Schedule this weekly via cron or CI/CD\n`));
}

pingAll();

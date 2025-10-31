#!/usr/bin/env node

/**
 * Lighthouse Audit Script
 * Runs Lighthouse tests on key pages
 * Checks Performance, Accessibility, Best Practices, SEO
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const PAGES_TO_TEST = [
  { url: BASE_URL, name: 'Homepage' },
  { url: `${BASE_URL}/los-angeles`, name: 'Los Angeles City Page' },
  { url: `${BASE_URL}/services`, name: 'Services Page' },
  { url: `${BASE_URL}/contact`, name: 'Contact Page' }
];

const THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 95
};

console.log(chalk.blue.bold('\n🚨 Starting Lighthouse Audit...\n'));
console.log(chalk.gray(`Base URL: ${BASE_URL}\n`));

async function runLighthouse(url, name) {
  console.log(chalk.cyan(`\n📊 Testing: ${name} (${url})\n`));

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  try {
    const runnerResult = await lighthouse(url, options);
    await chrome.kill();

    const scores = {
      performance: runnerResult.lhr.categories.performance.score * 100,
      accessibility: runnerResult.lhr.categories.accessibility.score * 100,
      'best-practices': runnerResult.lhr.categories['best-practices'].score * 100,
      seo: runnerResult.lhr.categories.seo.score * 100
    };

    // Display results
    Object.entries(scores).forEach(([category, score]) => {
      const threshold = THRESHOLDS[category];
      const status = score >= threshold ? chalk.green('✓') : chalk.red('✗');
      const scoreColor = score >= threshold ? chalk.green : chalk.yellow;
      
      console.log(`${status} ${category.padEnd(20)}: ${scoreColor(score.toFixed(0))}/100 (threshold: ${threshold})`);
    });

    return { name, url, scores, passed: Object.entries(scores).every(([cat, score]) => score >= THRESHOLDS[cat]) };
  } catch (error) {
    await chrome.kill();
    console.error(chalk.red(`Error testing ${name}:`), error.message);
    return { name, url, error: error.message, passed: false };
  }
}

async function runAllTests() {
  const results = [];

  for (const page of PAGES_TO_TEST) {
    const result = await runLighthouse(page.url, page.name);
    results.push(result);
  }

  // Summary
  console.log(chalk.blue.bold('\n\n📊 Lighthouse Audit Summary:\n'));
  
  const passedPages = results.filter(r => r.passed).length;
  const totalPages = results.length;

  console.log(chalk.gray(`Pages tested: ${totalPages}`));
  console.log(chalk.gray(`Pages passed: ${passedPages}\n`));

  if (passedPages === totalPages) {
    console.log(chalk.green.bold('✅ All pages meet Lighthouse thresholds!\n'));
    process.exit(0);
  } else {
    console.log(chalk.yellow.bold('⚠️  Some pages need improvement. Review scores above.\n'));
    process.exit(1);
  }
}

runAllTests().catch(err => {
  console.error(chalk.red('Error running Lighthouse audit:'), err);
  process.exit(1);
});

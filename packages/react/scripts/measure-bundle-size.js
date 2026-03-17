#!/usr/bin/env node
/**
 * Bundle Size Measurement Script
 *
 * Measures the size of built JavaScript and CSS bundles and compares
 * against performance budgets defined in performance.budgets.json.
 *
 * Usage:
 *   npm run build
 *   npm run measure:bundle-size
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load performance budgets
function loadBudgets() {
  const budgetsPath = path.join(__dirname, '../performance.budgets.json');
  if (!fs.existsSync(budgetsPath)) {
    console.warn('⚠️  performance.budgets.json not found');
    return { bundle: { maxJsSize: 204800, maxCssSize: 51200 } };
  }
  return JSON.parse(fs.readFileSync(budgetsPath, 'utf-8')).budgets;
}

// Get file size in bytes
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Recursively find all files in directory
function findFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];

  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findFiles(fullPath, ext));
    } else if (fullPath.endsWith(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

// Measure bundle sizes
function measureBundles() {
  const distDir = path.join(__dirname, '../dist');

  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ directory not found. Run `npm run build` first.');
  }

  // Find all JS and CSS files (including .cjs, .mjs, .js)
  const jsExtensions = ['.js', '.cjs', '.mjs'];
  let jsFiles = [];
  for (const ext of jsExtensions) {
    jsFiles.push(...findFiles(distDir, ext));
  }
  jsFiles = jsFiles.filter(f => !f.includes('.map'));
  const cssFiles = findFiles(distDir, '.css');

  const files = [];
  let totalJs = 0;
  let totalCss = 0;

  // Measure JS files
  for (const file of jsFiles) {
    const size = getFileSize(file);
    totalJs += size;
    files.push({
      file: path.relative(distDir, file),
      size,
      sizeKB: Math.round(size / 1024 * 100) / 100,
    });
  }

  // Measure CSS files
  for (const file of cssFiles) {
    const size = getFileSize(file);
    totalCss += size;
    files.push({
      file: path.relative(distDir, file),
      size,
      sizeKB: Math.round(size / 1024 * 100) / 100,
    });
  }

  const budgets = loadBudgets().bundle;
  const withinBudget = totalJs <= budgets.maxJsSize && totalCss <= budgets.maxCssSize;

  return {
    totalJs,
    totalJsKB: Math.round(totalJs / 1024 * 100) / 100,
    totalCss,
    totalCssKB: Math.round(totalCss / 1024 * 100) / 100,
    files: files.sort((a, b) => b.size - a.size), // Sort by size descending
    timestamp: new Date().toISOString(),
    withinBudget,
  };
}

// Format bytes to human-readable
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024 * 100) / 100}KB`;
  return `${Math.round(bytes / 1024 / 1024 * 100) / 100}MB`;
}

// Print report
function printReport(summary, budgets) {
  console.log('\n📊 Bundle Size Report\n');
  console.log('═'.repeat(60));

  // Total sizes
  console.log('\n📦 Total Bundle Sizes:');
  console.log(`  JavaScript: ${formatBytes(summary.totalJs)} (${summary.totalJsKB}KB)`);
  console.log(`  CSS:        ${formatBytes(summary.totalCss)} (${summary.totalCssKB}KB)`);

  // Budget comparison
  console.log('\n📏 Performance Budgets:');
  const jsBudgetKB = Math.round(budgets.bundle.maxJsSize / 1024);
  const cssBudgetKB = Math.round(budgets.bundle.maxCssSize / 1024);

  const jsStatus = summary.totalJs <= budgets.bundle.maxJsSize ? '✅' : '❌';
  const cssStatus = summary.totalCss <= budgets.bundle.maxCssSize ? '✅' : '❌';

  console.log(`  ${jsStatus} JavaScript: ${summary.totalJsKB}KB / ${jsBudgetKB}KB`);
  console.log(`  ${cssStatus} CSS:        ${summary.totalCssKB}KB / ${cssBudgetKB}KB`);

  // Largest files
  console.log('\n📁 Largest Files (Top 5):');
  summary.files.slice(0, 5).forEach((file, i) => {
    console.log(`  ${i + 1}. ${file.file} - ${formatBytes(file.size)}`);
  });

  console.log('\n' + '═'.repeat(60));

  if (summary.withinBudget) {
    console.log('✅ All bundles within budget!\n');
  } else {
    console.error('❌ Bundle size exceeds budget!\n');
    process.exit(1);
  }
}

// Main execution
try {
  const budgets = loadBudgets();
  const summary = measureBundles();

  printReport(summary, budgets);

  // Save report to file
  const reportPath = path.join(__dirname, '../bundle-size-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(`📄 Report saved to: bundle-size-report.json\n`);

} catch (error) {
  console.error('❌ Error measuring bundle size:', error.message);
  process.exit(1);
}

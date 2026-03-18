#!/usr/bin/env node

/**
 * Add Theme Switcher to Testing Projects
 * Automatically injects theme switcher CSS and JS to all testing project HTML files
 */

const fs = require('fs');
const path = require('path');

const testingProjectsDir = path.join(__dirname, '../testing-projects');

// Find all HTML files in testing projects
function findHtmlFiles(dir) {
  let htmlFiles = [];

  function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach(file => {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip node_modules and hidden directories
        if (!file.startsWith('.') && file !== 'node_modules') {
          walkDir(filePath);
        }
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }

  walkDir(dir);
  return htmlFiles;
}

// Calculate relative path from HTML file to assets
function getRelativePath(htmlPath) {
  const htmlDir = path.dirname(htmlPath);
  const assetsDir = path.join(__dirname, '../assets');
  return path.relative(htmlDir, assetsDir);
}

// Inject theme switcher into HTML
function injectThemeSwitcher(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relativePath = getRelativePath(filePath);

  // Check if already has theme switcher
  if (content.includes('theme-switcher')) {
    console.log(`✓ ${filePath.split('testing-projects')[1]} (already has switcher)`);
    return false;
  }

  // Find </head> tag and inject CSS before it
  const headRegex = /<\/head>/i;
  if (!headRegex.test(content)) {
    console.log(`✗ ${filePath.split('testing-projects')[1]} (no </head> tag found)`);
    return false;
  }

  const cssLink = `    <link rel="stylesheet" href="${relativePath}/theme-switcher.css">\n`;
  content = content.replace(/<\/head>/i, cssLink + '</head>');

  // Find </body> tag and inject JS before it
  const bodyRegex = /<\/body>/i;
  if (!bodyRegex.test(content)) {
    console.log(`✗ ${filePath.split('testing-projects')[1]} (no </body> tag found)`);
    return false;
  }

  const jsScript = `    <script src="${relativePath}/theme-switcher.js" defer><\/script>\n`;
  content = content.replace(/<\/body>/i, jsScript + '</body>');

  // Write back
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

// Main execution
console.log('🔍 Finding HTML files in testing-projects...\n');

const htmlFiles = findHtmlFiles(testingProjectsDir);
console.log(`Found ${htmlFiles.length} HTML files\n`);

let added = 0;
let skipped = 0;
let failed = 0;

htmlFiles.forEach(filePath => {
  if (injectThemeSwitcher(filePath)) {
    added++;
    console.log(`✓ ${filePath.split('testing-projects')[1]}`);
  } else if (filePath.includes('theme-switcher')) {
    skipped++;
  } else {
    failed++;
  }
});

console.log(`\n✅ Added theme switcher to ${added} files`);
if (skipped > 0) console.log(`⏭️  Skipped ${skipped} files (already have switcher)`);
if (failed > 0) console.log(`❌ Failed to add to ${failed} files`);

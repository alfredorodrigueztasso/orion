#!/usr/bin/env node

/**
 * Validation Script - Orion Design System Documentation
 *
 * Tests that all documented CSS variables actually exist in theme.css
 * and that documentation is consistent across files.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.bold}${colors.cyan}${'='.repeat(60)}${colors.reset}`),
  header: (msg) => console.log(`${colors.bold}${colors.cyan}${msg}${colors.reset}`),
};

// Paths
const ROOT = path.join(__dirname, '..');
const THEME_CSS = path.join(ROOT, 'packages/core/dist/theme.css');
const TOKENS_INDEX = path.join(ROOT, 'tokens/index.json');
const AI_MANIFEST = path.join(ROOT, 'tokens/ai-manifest.json');

// Statistics
const stats = {
  totalTests: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
};

/**
 * Extract all CSS variables from theme.css
 */
function extractCSSVariables(cssContent) {
  const regex = /--[\w-]+(?=:)/g;
  const matches = cssContent.match(regex) || [];
  return new Set(matches);
}

/**
 * Read and parse JSON file
 */
function readJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log.error(`Failed to read ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Test 1: Validate JSON files
 */
function testJSONValidity() {
  log.section();
  log.header('TEST 1: JSON File Validity');

  const jsonFiles = [
    { path: TOKENS_INDEX, name: 'tokens/index.json' },
    { path: AI_MANIFEST, name: 'tokens/ai-manifest.json' },
  ];

  jsonFiles.forEach(({ path, name }) => {
    stats.totalTests++;
    const data = readJSON(path);
    if (data) {
      log.success(`${name} is valid JSON`);
      stats.passed++;
    } else {
      log.error(`${name} has invalid JSON`);
      stats.failed++;
    }
  });
}

/**
 * Test 2: Validate documented CSS variables exist
 */
function testCSSVariablesExist() {
  log.section();
  log.header('TEST 2: Documented CSS Variables Exist in theme.css');

  // Read theme.css
  if (!fs.existsSync(THEME_CSS)) {
    log.error(`theme.css not found at ${THEME_CSS}`);
    log.info('Run: cd packages/core && pnpm run build');
    return;
  }

  const cssContent = fs.readFileSync(THEME_CSS, 'utf8');
  const existingVars = extractCSSVariables(cssContent);

  log.info(`Found ${existingVars.size} unique CSS variables in theme.css`);

  // Read tokens/index.json
  const tokensIndex = readJSON(TOKENS_INDEX);
  if (!tokensIndex || !tokensIndex.css_variables) {
    log.error('tokens/index.json missing css_variables section');
    return;
  }

  const cssVars = tokensIndex.css_variables;
  let totalDocumented = 0;
  let foundCount = 0;
  let missingVars = [];

  // Check typography variables
  if (cssVars.typography) {
    log.info('\nChecking Typography variables:');

    ['family', 'size', 'weight', 'lineHeight'].forEach(category => {
      if (cssVars.typography[category]) {
        cssVars.typography[category].forEach(varName => {
          stats.totalTests++;
          totalDocumented++;

          if (existingVars.has(varName)) {
            foundCount++;
            stats.passed++;
            // log.success(`  ${varName} exists`);
          } else {
            stats.failed++;
            missingVars.push(varName);
            log.error(`  ${varName} NOT FOUND in theme.css`);
          }
        });
      }
    });

    log.info(`  Typography: ${foundCount}/${totalDocumented} variables found`);
  }

  // Check spacing variables
  if (cssVars.spacing) {
    log.info('\nChecking Spacing variables:');
    totalDocumented = 0;
    foundCount = 0;

    cssVars.spacing.forEach(varName => {
      stats.totalTests++;
      totalDocumented++;

      if (existingVars.has(varName)) {
        foundCount++;
        stats.passed++;
      } else {
        stats.failed++;
        missingVars.push(varName);
        log.error(`  ${varName} NOT FOUND in theme.css`);
      }
    });

    log.info(`  Spacing: ${foundCount}/${totalDocumented} variables found`);
  }

  // Check other sections
  ['surface', 'text', 'border', 'interactive', 'status', 'geometry', 'shadow'].forEach(section => {
    if (cssVars[section]) {
      log.info(`\nChecking ${section} variables:`);
      totalDocumented = 0;
      foundCount = 0;

      cssVars[section].forEach(varName => {
        stats.totalTests++;
        totalDocumented++;

        if (existingVars.has(varName)) {
          foundCount++;
          stats.passed++;
        } else {
          stats.failed++;
          missingVars.push(varName);
          log.error(`  ${varName} NOT FOUND in theme.css`);
        }
      });

      log.info(`  ${section}: ${foundCount}/${totalDocumented} variables found`);
    }
  });

  if (missingVars.length > 0) {
    log.warning(`\nMissing variables (${missingVars.length}):`);
    missingVars.forEach(v => console.log(`  - ${v}`));
  }
}

/**
 * Test 3: Check for common mistakes
 */
function testCommonMistakes() {
  log.section();
  log.header('TEST 3: Check for Common Mistakes');

  const cssContent = fs.readFileSync(THEME_CSS, 'utf8');
  const existingVars = extractCSSVariables(cssContent);

  const commonMistakes = [
    '--font-sans',
    '--font-body',
    '--brand-accent-vivid',
    '--gradient-primary',
    '--text-base',
    '--text-lg',
  ];

  log.info('Checking that incorrect variables do NOT exist:');

  commonMistakes.forEach(varName => {
    stats.totalTests++;
    if (!existingVars.has(varName)) {
      log.success(`  ${varName} correctly does NOT exist`);
      stats.passed++;
    } else {
      log.error(`  ${varName} exists but should NOT (documented as common mistake)`);
      stats.failed++;
    }
  });
}

/**
 * Test 4: Validate ai-manifest.json counts
 */
function testAIManifestCounts() {
  log.section();
  log.header('TEST 4: Validate ai-manifest.json Variable Counts');

  const tokensIndex = readJSON(TOKENS_INDEX);
  const aiManifest = readJSON(AI_MANIFEST);

  if (!tokensIndex || !aiManifest) {
    log.error('Failed to read required JSON files');
    return;
  }

  // Count variables in tokens/index.json
  let actualTypographyCount = 0;
  let actualSpacingCount = 0;

  if (tokensIndex.css_variables.typography) {
    ['family', 'size', 'weight', 'lineHeight'].forEach(category => {
      if (tokensIndex.css_variables.typography[category]) {
        actualTypographyCount += tokensIndex.css_variables.typography[category].length;
      }
    });
  }

  if (tokensIndex.css_variables.spacing) {
    actualSpacingCount = tokensIndex.css_variables.spacing.length;
  }

  // Compare with ai-manifest.json
  stats.totalTests++;
  const manifestTypographyCount = aiManifest.token_coverage?.typography?.css_variables_count || 0;
  if (actualTypographyCount === manifestTypographyCount) {
    log.success(`Typography count matches: ${actualTypographyCount} variables`);
    stats.passed++;
  } else {
    log.error(`Typography count mismatch: index.json=${actualTypographyCount}, ai-manifest.json=${manifestTypographyCount}`);
    stats.failed++;
  }

  stats.totalTests++;
  const manifestSpacingCount = aiManifest.token_coverage?.spacing?.css_variables_count || 0;
  if (actualSpacingCount === manifestSpacingCount) {
    log.success(`Spacing count matches: ${actualSpacingCount} variables`);
    stats.passed++;
  } else {
    log.error(`Spacing count mismatch: index.json=${actualSpacingCount}, ai-manifest.json=${manifestSpacingCount}`);
    stats.failed++;
  }

  stats.totalTests++;
  const totalDocumented = Object.values(tokensIndex.css_variables).reduce((sum, section) => {
    if (Array.isArray(section)) {
      return sum + section.length;
    } else if (typeof section === 'object') {
      return sum + Object.values(section).reduce((s, arr) => s + (arr?.length || 0), 0);
    }
    return sum;
  }, 0);

  const manifestTotalDocumented = aiManifest.system_stats?.tokens?.css_variables_documented || 0;
  if (totalDocumented === manifestTotalDocumented) {
    log.success(`Total documented count matches: ${totalDocumented} variables`);
    stats.passed++;
  } else {
    log.error(`Total count mismatch: index.json=${totalDocumented}, ai-manifest.json=${manifestTotalDocumented}`);
    stats.failed++;
  }
}

/**
 * Test 5: Check documentation files exist
 */
function testDocumentationFilesExist() {
  log.section();
  log.header('TEST 5: Documentation Files Exist');

  const requiredFiles = [
    'CLAUDE.md',
    'AGENTS.md',
    'TYPESCRIPT.md',
    'DOCUMENTATION-INDEX.md',
    'rules.md',
    'tokens/index.json',
    'tokens/ai-manifest.json',
  ];

  requiredFiles.forEach(file => {
    stats.totalTests++;
    const filePath = path.join(ROOT, file);
    if (fs.existsSync(filePath)) {
      log.success(`${file} exists`);
      stats.passed++;
    } else {
      log.error(`${file} NOT FOUND`);
      stats.failed++;
    }
  });
}

/**
 * Test 6: Check obsolete files were removed
 */
function testObsoleteFilesRemoved() {
  log.section();
  log.header('TEST 6: Obsolete Files Removed');

  const obsoleteFiles = [
    'TYPESCRIPT_SETUP.md',
    'TYPESCRIPT_MIGRATION_README.md',
    'COMPONENTS_ADDED.md',
    'COMPONENT_LIBRARY_COMPLETE.md',
    'IMPLEMENTATION_CHECKLIST.md',
  ];

  obsoleteFiles.forEach(file => {
    stats.totalTests++;
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) {
      log.success(`${file} correctly removed`);
      stats.passed++;
    } else {
      log.warning(`${file} still exists (should be removed)`);
      stats.warnings++;
      stats.failed++;
    }
  });
}

/**
 * Test 7: Check React components build
 */
function testReactPackageBuild() {
  log.section();
  log.header('TEST 7: React Package Build Artifacts');

  const reactDistFiles = [
    'packages/react/dist/index.mjs',
    'packages/react/dist/index.cjs',
    'packages/react/dist/index.d.ts',
    'packages/react/dist/react.css',
  ];

  reactDistFiles.forEach(file => {
    stats.totalTests++;
    const filePath = path.join(ROOT, file);
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      log.success(`${file} exists (${(stat.size / 1024).toFixed(2)} KB)`);
      stats.passed++;
    } else {
      log.error(`${file} NOT FOUND`);
      log.info('  Run: cd packages/react && pnpm run build');
      stats.failed++;
    }
  });
}

/**
 * Print final report
 */
function printReport() {
  log.section();
  log.header('VALIDATION REPORT');
  console.log('');

  const passRate = ((stats.passed / stats.totalTests) * 100).toFixed(1);

  console.log(`Total Tests:  ${stats.totalTests}`);
  console.log(`${colors.green}Passed:       ${stats.passed}${colors.reset}`);
  console.log(`${colors.red}Failed:       ${stats.failed}${colors.reset}`);
  console.log(`${colors.yellow}Warnings:     ${stats.warnings}${colors.reset}`);
  console.log(`Pass Rate:    ${passRate}%`);
  console.log('');

  if (stats.failed === 0) {
    log.success('ALL TESTS PASSED! 🎉');
    console.log('');
    console.log('The Orion Design System documentation is fully validated:');
    console.log('  ✅ All documented CSS variables exist in theme.css');
    console.log('  ✅ No common mistakes (like --font-sans) are present');
    console.log('  ✅ ai-manifest.json counts are accurate');
    console.log('  ✅ All required documentation files exist');
    console.log('  ✅ Obsolete files have been removed');
    console.log('  ✅ React package builds successfully');
    console.log('');
  } else {
    log.error(`${stats.failed} TESTS FAILED`);
    console.log('');
    console.log('Please review the errors above and fix them.');
    process.exit(1);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('');
  log.header('🔍 Orion Design System - Documentation Validation');
  log.info(`Running from: ${ROOT}`);

  testJSONValidity();
  testCSSVariablesExist();
  testCommonMistakes();
  testAIManifestCounts();
  testDocumentationFilesExist();
  testObsoleteFilesRemoved();
  testReactPackageBuild();
  printReport();
}

// Run tests
main();

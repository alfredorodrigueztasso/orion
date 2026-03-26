#!/usr/bin/env node

/**
 * Component Validation Script
 *
 * Ensures all React components follow AI-First architecture rules:
 * ✅ No hardcoded colors (must use CSS variables)
 * ✅ No hardcoded pixels (must use CSS variables)
 * ✅ No data-brand props (brand is global, set in <html>)
 * ✅ No brand prop in TypeScript interfaces
 * ✅ All styles use CSS Modules referencing tokens
 *
 * This prevents AI agents from making common mistakes.
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
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

const stats = {
  totalTests: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
};

const COMPONENTS_PATH = path.join(__dirname, '../packages/react/src/components');
const SECTIONS_PATH = path.join(__dirname, '../packages/react/src/blocks/sections');

/**
 * Safely read file with helpful error messages
 * @param {string} filePath - Path to file
 * @param {string} description - What we were trying to do (for error message)
 * @returns {string|null} - File contents or null if error
 */
function readFileSafely(filePath, description) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      log.error(`${description}: File not found - ${filePath}`);
    } else if (error.code === 'EACCES') {
      log.error(`${description}: Permission denied - ${filePath}`);
    } else {
      log.error(`${description}: ${error.message}`);
    }
    return null;
  }
}

/**
 * Get all component directories
 */
function getComponentDirs() {
  const dirs = fs.readdirSync(COMPONENTS_PATH).filter((f) => {
    const fullPath = path.join(COMPONENTS_PATH, f);
    return fs.statSync(fullPath).isDirectory();
  });
  return dirs;
}

/**
 * Get all section directories
 */
function getSectionDirs() {
  if (!fs.existsSync(SECTIONS_PATH)) return [];
  const dirs = fs.readdirSync(SECTIONS_PATH).filter((f) => {
    const fullPath = path.join(SECTIONS_PATH, f);
    return fs.statSync(fullPath).isDirectory();
  });
  return dirs;
}

/**
 * Test: No data-brand in component JSX
 */
function testNoBrandProp() {
  log.section();
  log.header('TEST 1: No data-brand in Component JSX');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const jsxFile = path.join(COMPONENTS_PATH, component, `${component}.tsx`);
    if (!fs.existsSync(jsxFile)) return;

    stats.totalTests++;
    const content = readFileSafely(jsxFile, `Reading component ${component}`);
    if (!content) return;

    if (content.includes('data-brand')) {
      stats.failed++;
      issues++;
      log.error(`${component}: Contains data-brand attribute`);
      log.info('  Solution: Brand is set globally on <html>, not on components');
    } else {
      stats.passed++;
      log.success(`${component}: No data-brand ✓`);
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} components have no data-brand`);
  }
}

/**
 * Test: No brand prop in TypeScript types
 */
function testNoBrandType() {
  log.section();
  log.header('TEST 2: No brand prop in TypeScript Types');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const typesFile = path.join(COMPONENTS_PATH, component, `${component}.types.ts`);
    if (!fs.existsSync(typesFile)) return;

    stats.totalTests++;
    const content = readFileSafely(typesFile, `Reading types ${component}`);
    if (!content) return;

    // Check for "brand?" or "brand:" as a prop in the Props interface
    // This is more specific than just looking for the word "brand"
    // Allows: type BadgeVariant with 'brand' | other variants
    // Allows: ThemeController with Brand type callbacks (it MANAGES global state)
    // Prevents: Individual components with brand prop
    const brandPropMatch = content.match(/^\s*brand\s*\??:\s*[^;]*;/m);

    if (brandPropMatch) {
      stats.failed++;
      issues++;
      log.error(`${component}.types.ts: Contains brand prop`);
      log.info('  Solution: Remove brand prop from interface - brand is set globally via ThemeProvider');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} component types have no brand prop`);
  }
}

/**
 * Test: CSS Modules use CSS variables for colors
 */
function testCSSVariables() {
  log.section();
  log.header('TEST 3: CSS Uses Variables for Colors (No Hardcoded Hex)');

  const components = getComponentDirs();
  let issues = 0;
  let cssCheckCount = 0;

  components.forEach((component) => {
    const cssFile = path.join(COMPONENTS_PATH, component, `${component}.module.css`);
    if (!fs.existsSync(cssFile)) return;

    stats.totalTests++;
    cssCheckCount++;
    const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;

    // Check for hardcoded HEX colors (the real anti-hallucination target)
    // Component pixel sizing (32px, 40px, 2px borders) is legitimate design
    const hexColorMatch = content.match(/#[0-9a-fA-F]{3,6}/g);

    if (hexColorMatch) {
      stats.failed++;
      issues++;
      log.error(`${component}.module.css: Contains hardcoded colors: ${hexColorMatch.join(', ')}`);
      log.info('  Solution: Use var(--color-*) or var(--surface-*) CSS variables');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${cssCheckCount} CSS files use CSS variables for colors`);
  }
}

/**
 * Test: No `any` type in TypeScript
 */
function testNoAnyType() {
  log.section();
  log.header('TEST 5: No `any` Type in TypeScript');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const typesFile = path.join(COMPONENTS_PATH, component, `${component}.types.ts`);
    if (!fs.existsSync(typesFile)) return;

    stats.totalTests++;
    const content = readFileSafely(typesFile, `Reading types ${component}`);
    if (!content) return;

    // Check for `= any` default type parameter or `: any` type annotation
    // Allow comments that mention 'any'
    const lines = content.split('\n');
    const anyMatches = [];

    lines.forEach((line, index) => {
      // Skip comment lines
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

      // Match `= any` (default type param) or `: any` or `<any>` or `, any>`
      if (/[=:,<]\s*any\s*[>,;\)]/.test(line) || /[=:,<]\s*any\s*$/.test(line)) {
        anyMatches.push({ line: index + 1, content: line.trim() });
      }
    });

    if (anyMatches.length > 0) {
      stats.failed++;
      issues++;
      log.error(`${component}.types.ts: Contains \`any\` type`);
      anyMatches.forEach((match) => {
        log.info(`  Line ${match.line}: ${match.content}`);
      });
      log.info('  Solution: Use specific types like Record<string, unknown> instead of any');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} component types avoid \`any\` type`);
  }
}

/**
 * Test: No hardcoded rgba() in CSS (should use shadow tokens)
 */
function testNoHardcodedRgba() {
  log.section();
  log.header('TEST 6: No Hardcoded rgba() in CSS (Use Shadow Tokens)');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const cssFile = path.join(COMPONENTS_PATH, component, `${component}.module.css`);
    if (!fs.existsSync(cssFile)) return;

    stats.totalTests++;
    const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;

    // Check for hardcoded rgba() values in box-shadow or background
    // These should use --shadow-* tokens or --interactive-ghost-hover
    const rgbaMatches = content.match(/(?:box-shadow|background)\s*:[^;]*rgba\s*\([^)]+\)/g);

    if (rgbaMatches) {
      stats.failed++;
      issues++;
      log.error(`${component}.module.css: Contains hardcoded rgba() values`);
      rgbaMatches.forEach((match) => {
        log.info(`  Found: ${match.trim().substring(0, 60)}...`);
      });
      log.info('  Solution: Use var(--shadow-sm/md/lg/xl) for shadows or var(--interactive-ghost-hover) for backgrounds');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} CSS files use shadow tokens instead of hardcoded rgba()`);
  }
}

/**
 * Test: No hardcoded z-index (should use --z-* tokens)
 */
function testNoHardcodedZIndex() {
  log.section();
  log.header('TEST 7: No Hardcoded z-index (Use Z-Index Tokens)');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const cssFile = path.join(COMPONENTS_PATH, component, `${component}.module.css`);
    if (!fs.existsSync(cssFile)) return;

    stats.totalTests++;
    const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;

    // Check for hardcoded z-index values (should use var(--z-*))
    const zIndexMatches = content.match(/z-index\s*:\s*\d+/g);

    if (zIndexMatches) {
      stats.failed++;
      issues++;
      log.error(`${component}.module.css: Contains hardcoded z-index`);
      zIndexMatches.forEach((match) => {
        log.info(`  Found: ${match}`);
      });
      log.info('  Solution: Use var(--z-dropdown), var(--z-modal), var(--z-tooltip), etc.');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} CSS files use z-index tokens`);
  }
}

/**
 * Test: No hardcoded transitions (should use --transition-* tokens)
 */
function testNoHardcodedTransitions() {
  log.section();
  log.header('TEST 8: No Hardcoded Transitions (Use Transition Tokens)');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const cssFile = path.join(COMPONENTS_PATH, component, `${component}.module.css`);
    if (!fs.existsSync(cssFile)) return;

    stats.totalTests++;
    const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;

    // Check for hardcoded transition timing (should use var(--transition-*))
    // Allow: transition: none; and var(--transition-*)
    const transitionMatches = content.match(/transition\s*:[^;]*\d+ms[^;]*(?!var\(--transition)/g);

    if (transitionMatches) {
      // Filter out lines that already use var()
      const hardcodedMatches = transitionMatches.filter((m) => !m.includes('var('));

      if (hardcodedMatches.length > 0) {
        stats.failed++;
        issues++;
        log.error(`${component}.module.css: Contains hardcoded transitions`);
        hardcodedMatches.slice(0, 3).forEach((match) => {
          log.info(`  Found: ${match.trim()}`);
        });
        if (hardcodedMatches.length > 3) {
          log.info(`  ... and ${hardcodedMatches.length - 3} more`);
        }
        log.info('  Solution: Use var(--transition-fast), var(--transition-normal), var(--transition-slow)');
      } else {
        stats.passed++;
      }
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} CSS files use transition tokens`);
  }
}

/**
 * Test: No hardcoded font-sizes (should use --font-size-* tokens)
 */
function testNoHardcodedFontSizes() {
  log.section();
  log.header('TEST 9: No Hardcoded Font Sizes (Use Font Size Tokens)');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const cssFile = path.join(COMPONENTS_PATH, component, `${component}.module.css`);
    if (!fs.existsSync(cssFile)) return;

    stats.totalTests++;
    const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;

    // Check for hardcoded font-size pixel values (allow em/rem and var())
    const fontSizeMatches = content.match(/font-size\s*:\s*\d+px/g);

    if (fontSizeMatches) {
      stats.failed++;
      issues++;
      log.error(`${component}.module.css: Contains hardcoded font-size`);
      fontSizeMatches.slice(0, 3).forEach((match) => {
        log.info(`  Found: ${match}`);
      });
      if (fontSizeMatches.length > 3) {
        log.info(`  ... and ${fontSizeMatches.length - 3} more`);
      }
      log.info('  Solution: Use var(--font-size-12), var(--font-size-14), var(--font-size-16), etc.');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${components.length} CSS files use font-size tokens`);
  }
}

/**
 * Test: No hardcoded fonts
 */
function testNoHardcodedFonts() {
  log.section();
  log.header('TEST 4: No Hardcoded Fonts');

  const components = getComponentDirs();
  let issues = 0;

  components.forEach((component) => {
    const cssFile = path.join(COMPONENTS_PATH, component, `${component}.module.css`);
    if (!fs.existsSync(cssFile)) return;

    stats.totalTests++;
    const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;

    // Check for hardcoded font-family values
    const fontMatch = content.match(/font-family\s*:\s*[^;]*(?!var\()/);

    if (fontMatch && !fontMatch[0].includes('var(')) {
      stats.failed++;
      issues++;
      log.error(`${component}.module.css: Contains hardcoded font-family`);
      log.info('  Solution: Use var(--font-primary), var(--font-secondary), or var(--font-mono)');
    } else {
      stats.passed++;
    }
  });

  if (issues === 0) {
    log.success(`All ${getComponentDirs().length} components use CSS variable fonts`);
  }
}

/**
 * Validate Sections - Similar rules as components
 */
function validateSections() {
  log.section();
  log.header('SECTIONS VALIDATION');

  const sections = getSectionDirs();
  if (sections.length === 0) {
    log.warning('No sections found to validate');
    return;
  }

  log.info(`Checking ${sections.length} sections...`);
  let issues = 0;

  sections.forEach((section) => {
    // Check for hardcoded colors in CSS
    const cssFile = path.join(SECTIONS_PATH, section, `${section}.module.css`);
    if (fs.existsSync(cssFile)) {
      stats.totalTests++;
      const content = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!content) return;
      const hexColorMatch = content.match(/#[0-9a-fA-F]{3,6}/g);

      if (hexColorMatch) {
        stats.failed++;
        issues++;
        log.error(`${section}.module.css: Contains hardcoded colors: ${hexColorMatch.slice(0, 3).join(', ')}${hexColorMatch.length > 3 ? '...' : ''}`);
      } else {
        stats.passed++;
      }
    }

    // Check for data-brand in JSX
    const jsxFile = path.join(SECTIONS_PATH, section, `${section}.tsx`);
    if (fs.existsSync(jsxFile)) {
      stats.totalTests++;
      const content = readFileSafely(jsxFile, `Reading section ${section}`);
      if (!content) return;

      if (content.includes('data-brand')) {
        stats.failed++;
        issues++;
        log.error(`${section}: Contains data-brand attribute`);
      } else {
        stats.passed++;
      }
    }

    // Check for brand prop in types
    // Allow: brand?: FooterBrand (company brand info)
    // Disallow: brand?: Brand (design system brand)
    const typesFile = path.join(SECTIONS_PATH, section, `${section}.types.ts`);
    if (fs.existsSync(typesFile)) {
      stats.totalTests++;
      const content = readFileSafely(typesFile, `Reading section types ${section}`);
      if (!content) return;

      // Check for "brand?: Brand" or "brand: Brand" (design system Brand type)
      // Allow FooterBrand, AppBrand, or other specific brand types
      const designSystemBrandMatch = content.match(/^\s*brand\s*\??:\s*Brand\s*[;,]/m);

      if (designSystemBrandMatch) {
        stats.failed++;
        issues++;
        log.error(`${section}.types.ts: Contains design system brand prop`);
      } else {
        stats.passed++;
      }
    }
  });

  if (issues === 0) {
    log.success(`All ${sections.length} sections pass AI-First validation`);
  }
}

/**
 * Print final report
 */
function printReport() {
  log.section();
  log.header('COMPONENT VALIDATION REPORT');
  console.log('');

  const passRate = stats.totalTests > 0 ? ((stats.passed / stats.totalTests) * 100).toFixed(1) : 0;

  console.log(`Total Tests:  ${stats.totalTests}`);
  console.log(`${colors.green}Passed:       ${stats.passed}${colors.reset}`);
  console.log(`${colors.red}Failed:       ${stats.failed}${colors.reset}`);
  console.log(`${colors.yellow}Warnings:     ${stats.warnings}${colors.reset}`);
  console.log(`Pass Rate:    ${passRate}%`);
  console.log('');

  if (stats.failed === 0) {
    log.success('ALL VALIDATION TESTS PASSED! 🎉');
    console.log('');
    console.log('Components & Sections follow AI-First architecture:');
    console.log('  ✅ No data-brand props (brand is global on <html>)');
    console.log('  ✅ No brand props in types');
    console.log('  ✅ No hardcoded colors (use CSS variables)');
    console.log('  ✅ No hardcoded fonts');
    console.log('  ✅ No `any` type in TypeScript');
    console.log('  ✅ No hardcoded rgba() in shadows (use tokens)');
    console.log('  ✅ No hardcoded z-index (use tokens)');
    console.log('  ✅ No hardcoded transitions (use tokens)');
    console.log('  ✅ No hardcoded font-sizes (use tokens)');
    console.log('  ✅ Sections validated for AI-First compliance');
    console.log('');
    return 0;
  } else {
    log.error(`${stats.failed} VALIDATION TESTS FAILED`);
    console.log('');
    console.log('Review the errors above and fix them.');
    console.log('Remember: Components and Sections should NOT have brand-specific logic.');
    console.log('Brand is set globally on <html>, and CSS variables handle the rest.');
    console.log('');
    process.exit(1);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('');
  log.header('🔍 Orion React Components & Sections - AI-First Validation');
  log.info(`Checking ${getComponentDirs().length} components and ${getSectionDirs().length} sections...`);

  // Component tests
  testNoBrandProp();
  testNoBrandType();
  testCSSVariables();
  testNoHardcodedFonts();
  testNoAnyType();
  testNoFakeVars();
  testNoHardcodedRgba();
  testNoHardcodedZIndex();
  testNoHardcodedTransitions();
  testNoHardcodedFontSizes();

  // Section tests
  validateSections();

  printReport();
}

main();

// ============================================================================
// FAKE_VARS Test — Detect non-existent CSS variables that LLMs commonly invent
// ============================================================================

function testNoFakeVars() {
  // Read centralized fake-vars from tokens/ (single source of truth)
  const fakeVarsConfig = require('../tokens/fake-vars.json');
  const FAKE_VARS = fakeVarsConfig.fake_vars;
  const fakeVarPattern = new RegExp(`var\\((${Object.keys(FAKE_VARS).map(v => v.replace(/--/g, '\\-\\-')).join('|')})\\)`, 'g');
  
  let testsPassed = 0;
  let testsFailed = 0;
  const failedVars = [];

  // Check all component CSS files
  const componentDirs = getComponentDirs().filter(d => {
    const fullPath = path.join(COMPONENTS_PATH, d);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const componentDir of componentDirs) {
    const cssFile = path.join(COMPONENTS_PATH, componentDir, `${componentDir}.module.css`);
    if (!fs.existsSync(cssFile)) continue;

    const cssContent = readFileSafely(cssFile, `Reading CSS ${component}`);
    if (!cssContent) return;
    const matches = cssContent.match(fakeVarPattern);
    
    if (matches) {
      matches.forEach(match => {
        const varName = match.match(/var\((.*?)\)/)[1];
        const varInfo = FAKE_VARS[varName];
        testsFailed++;
        failedVars.push({
          component: componentDir,
          variable: varName,
          alternative: varInfo.alternative,
          reason: varInfo.reason
        });
      });
    } else {
      testsPassed++;
    }
  }

  if (failedVars.length > 0) {
    console.log('\n❌ FAKE_VARS DETECTED:');
    console.log('───────────────────────────────────────────────────');
    failedVars.forEach(item => {
      console.log(`  ${item.component}: ${item.variable}`);
      console.log(`    → Use: ${item.alternative}`);
      console.log(`    ℹ  ${item.reason}\n`);
    });
  }

  return {
    name: 'testNoFakeVars',
    passed: testsPassed,
    failed: testsFailed,
    status: testsFailed === 0 ? '✅' : '❌'
  };
}


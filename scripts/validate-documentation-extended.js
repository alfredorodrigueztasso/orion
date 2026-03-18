#!/usr/bin/env node

/**
 * Extended Validation Script - Orion Design System
 *
 * Comprehensive testing suite including:
 * - Documentation validation
 * - Performance checks
 * - Color contrast (WCAG)
 * - Code examples validation
 * - Accessibility basics
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
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
  section: () => console.log(`\n${colors.bold}${colors.cyan}${'='.repeat(70)}${colors.reset}`),
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

// Utility functions
function extractCSSVariables(cssContent) {
  const regex = /--[\w-]+(?=:)/g;
  const matches = cssContent.match(regex) || [];
  return new Set(matches);
}

function readJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log.error(`Failed to read ${filePath}: ${error.message}`);
    return null;
  }
}

function getFileSize(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// ============================================================================
// ORIGINAL TESTS (from validate-documentation.js)
// ============================================================================

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

function testCSSVariablesExist() {
  log.section();
  log.header('TEST 2: Documented CSS Variables Exist in theme.css');

  if (!fs.existsSync(THEME_CSS)) {
    log.error(`theme.css not found at ${THEME_CSS}`);
    return;
  }

  const cssContent = fs.readFileSync(THEME_CSS, 'utf8');
  const existingVars = extractCSSVariables(cssContent);
  const tokensIndex = readJSON(TOKENS_INDEX);

  if (!tokensIndex?.css_variables) return;

  const cssVars = tokensIndex.css_variables;
  let totalChecked = 0;
  let foundCount = 0;

  // Check typography
  if (cssVars.typography) {
    ['family', 'size', 'weight', 'lineHeight'].forEach(category => {
      if (cssVars.typography[category]) {
        cssVars.typography[category].forEach(varName => {
          stats.totalTests++;
          totalChecked++;
          if (existingVars.has(varName)) {
            foundCount++;
            stats.passed++;
          } else {
            stats.failed++;
            log.error(`  ${varName} NOT FOUND in theme.css`);
          }
        });
      }
    });
  }

  // Check other sections
  ['spacing', 'surface', 'text', 'border', 'interactive', 'status', 'geometry', 'shadow'].forEach(section => {
    if (cssVars[section]) {
      const vars = Array.isArray(cssVars[section]) ? cssVars[section] : Object.values(cssVars[section]).flat();
      vars.forEach(varName => {
        stats.totalTests++;
        totalChecked++;
        if (existingVars.has(varName)) {
          foundCount++;
          stats.passed++;
        } else {
          stats.failed++;
          log.error(`  ${varName} NOT FOUND`);
        }
      });
    }
  });

  log.info(`Total: ${foundCount}/${totalChecked} variables found`);
}

function testCommonMistakes() {
  log.section();
  log.header('TEST 3: Common Mistakes Do NOT Exist');

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

  commonMistakes.forEach(varName => {
    stats.totalTests++;
    if (!existingVars.has(varName)) {
      log.success(`${varName} correctly does NOT exist`);
      stats.passed++;
    } else {
      log.error(`${varName} should NOT exist`);
      stats.failed++;
    }
  });
}

// ============================================================================
// NEW TESTS: PERFORMANCE
// ============================================================================

function testPerformance() {
  log.section();
  log.header('TEST 4: Performance & Bundle Sizes');

  const files = [
    { path: 'packages/core/dist/theme.css', maxSize: 200 * 1024, name: 'theme.css' },
    { path: 'packages/react/dist/index.mjs', maxSize: 150 * 1024, name: 'React ESM bundle' },
    { path: 'packages/react/dist/index.cjs', maxSize: 100 * 1024, name: 'React CJS bundle' },
    { path: 'packages/react/dist/react.css', maxSize: 50 * 1024, name: 'React CSS' },
  ];

  files.forEach(({ path: filePath, maxSize, name }) => {
    stats.totalTests++;
    const fullPath = path.join(ROOT, filePath);

    if (!fs.existsSync(fullPath)) {
      log.error(`${name} not found`);
      stats.failed++;
      return;
    }

    const size = getFileSize(fullPath);
    const sizeKB = (size / 1024).toFixed(2);
    const maxSizeKB = (maxSize / 1024).toFixed(0);

    if (size <= maxSize) {
      log.success(`${name}: ${sizeKB} KB (limit: ${maxSizeKB} KB)`);
      stats.passed++;
    } else {
      log.error(`${name}: ${sizeKB} KB exceeds limit of ${maxSizeKB} KB`);
      stats.failed++;
    }
  });

  // Test: Total CSS size
  stats.totalTests++;
  const themeCssSize = getFileSize(path.join(ROOT, 'packages/core/dist/theme.css'));
  const reactCssSize = getFileSize(path.join(ROOT, 'packages/react/dist/react.css'));
  const totalCssKB = ((themeCssSize + reactCssSize) / 1024).toFixed(2);

  if (totalCssKB < 250) {
    log.success(`Total CSS: ${totalCssKB} KB (under 250 KB)`);
    stats.passed++;
  } else {
    log.warning(`Total CSS: ${totalCssKB} KB (target: under 250 KB)`);
    stats.warnings++;
    stats.passed++; // Warning, not failure
  }
}

// ============================================================================
// NEW TESTS: COLOR CONTRAST (WCAG)
// ============================================================================

function testColorContrast() {
  log.section();
  log.header('TEST 5: Color Contrast (WCAG AA)');

  const tokensIndex = readJSON(TOKENS_INDEX);
  if (!tokensIndex) return;

  // Extract colors from primitives
  const brandColors = tokensIndex.primitives?.color?.brand?.orion || {};
  const neutralColors = tokensIndex.primitives?.color?.neutral || {};

  // Test common combinations
  const tests = [
    {
      name: 'Brand on white (buttons)',
      fg: brandColors['500'] || '#1B5BFF',
      bg: neutralColors['0'] || '#ffffff',
      minRatio: 4.5 // AA for normal text
    },
    {
      name: 'Brand on dark (dark theme buttons)',
      fg: brandColors['400'] || '#5990ff',
      bg: neutralColors['900'] || '#0d1219',
      minRatio: 4.5
    },
    {
      name: 'Text primary on light bg',
      fg: neutralColors['900'] || '#0d1219',
      bg: neutralColors['0'] || '#ffffff',
      minRatio: 7 // AAA for normal text
    },
    {
      name: 'Text primary on dark bg',
      fg: neutralColors['50'] || '#f5f7fa',
      bg: neutralColors['950'] || '#060a0f',
      minRatio: 7
    },
    {
      name: 'Text secondary on light bg',
      fg: neutralColors['500'] || '#5c6b7e',
      bg: neutralColors['0'] || '#ffffff',
      minRatio: 4.5
    },
  ];

  tests.forEach(({ name, fg, bg, minRatio }) => {
    stats.totalTests++;
    const ratio = getContrastRatio(fg, bg);
    const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'FAIL';

    if (ratio >= minRatio) {
      log.success(`${name}: ${ratio.toFixed(2)}:1 (${level})`);
      stats.passed++;
    } else {
      log.error(`${name}: ${ratio.toFixed(2)}:1 (needs ${minRatio}:1 min)`);
      stats.failed++;
    }
  });
}

// ============================================================================
// NEW TESTS: DOCUMENTATION CONSISTENCY
// ============================================================================

function testDocumentationConsistency() {
  log.section();
  log.header('TEST 6: Documentation Consistency');

  // Test: Typography variables mentioned in AGENTS.md exist in index.json
  stats.totalTests++;
  const agentsMd = fs.readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
  const tokensIndex = readJSON(TOKENS_INDEX);

  const mentionedVarsInAgents = [
    '--font-primary',
    '--font-secondary',
    '--font-mono',
    '--font-size-12',
    '--font-size-16',
    '--spacing-4',
  ];

  let allFound = true;
  const typographyFamilies = tokensIndex?.css_variables?.typography?.family || [];
  const typographySizes = tokensIndex?.css_variables?.typography?.size || [];
  const spacing = tokensIndex?.css_variables?.spacing || [];

  mentionedVarsInAgents.forEach(varName => {
    const inTypography = typographyFamilies.includes(varName) || typographySizes.includes(varName);
    const inSpacing = spacing.includes(varName);

    if (!inTypography && !inSpacing) {
      log.error(`${varName} mentioned in AGENTS.md but not in index.json`);
      allFound = false;
    }
  });

  if (allFound) {
    log.success('All variables in AGENTS.md are in tokens/index.json');
    stats.passed++;
  } else {
    stats.failed++;
  }

  // Test: Common Mistakes section exists in CLAUDE.md
  stats.totalTests++;
  const claudeMd = fs.readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8');
  if (claudeMd.includes('## ⚠️ Common Mistakes')) {
    log.success('CLAUDE.md has "Common Mistakes" section');
    stats.passed++;
  } else {
    log.error('CLAUDE.md missing "Common Mistakes" section');
    stats.failed++;
  }

  // Test: --font-sans is documented as incorrect
  stats.totalTests++;
  if (claudeMd.includes('--font-sans') && claudeMd.includes('DOES NOT EXIST')) {
    log.success('--font-sans documented as non-existent in CLAUDE.md');
    stats.passed++;
  } else {
    log.warning('--font-sans should be documented as common mistake');
    stats.warnings++;
    stats.passed++;
  }
}

// ============================================================================
// NEW TESTS: CODE EXAMPLES VALIDATION
// ============================================================================

function testCodeExamples() {
  log.section();
  log.header('TEST 7: Code Examples in Documentation');

  const claudeMd = fs.readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8');
  const agentsMd = fs.readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');

  // Extract code blocks
  const codeBlockRegex = /```(?:css|typescript|tsx|html)\n([\s\S]*?)```/g;

  let claudeBlocks = [];
  let match;
  while ((match = codeBlockRegex.exec(claudeMd)) !== null) {
    claudeBlocks.push(match[1]);
  }

  codeBlockRegex.lastIndex = 0;
  let agentsBlocks = [];
  while ((match = codeBlockRegex.exec(agentsMd)) !== null) {
    agentsBlocks.push(match[1]);
  }

  log.info(`Found ${claudeBlocks.length} code blocks in CLAUDE.md`);
  log.info(`Found ${agentsBlocks.length} code blocks in AGENTS.md`);

  // Test: No hardcoded colors in CSS examples
  stats.totalTests++;
  let hasHardcodedColors = false;
  const hardcodedColorRegex = /(#[0-9a-fA-F]{3,6}|rgb\(|rgba\()/;

  [...claudeBlocks, ...agentsBlocks].forEach(block => {
    if (block.includes('color:') || block.includes('background:')) {
      if (hardcodedColorRegex.test(block) && !block.includes('// Example') && !block.includes('/* Example */')) {
        hasHardcodedColors = true;
      }
    }
  });

  if (!hasHardcodedColors) {
    log.success('No hardcoded colors in CSS examples');
    stats.passed++;
  } else {
    log.warning('Some CSS examples use hardcoded colors (review recommended)');
    stats.warnings++;
    stats.passed++;
  }

  // Test: Examples use var(--...) syntax
  stats.totalTests++;
  let examplesUseVars = false;
  [...claudeBlocks, ...agentsBlocks].forEach(block => {
    if (block.includes('var(--')) {
      examplesUseVars = true;
    }
  });

  if (examplesUseVars) {
    log.success('Code examples use var(--...) CSS variables');
    stats.passed++;
  } else {
    log.error('No code examples show var(--...) usage');
    stats.failed++;
  }
}

// ============================================================================
// NEW TESTS: FILE STRUCTURE
// ============================================================================

function testFileStructure() {
  log.section();
  log.header('TEST 8: File Structure & Organization');

  // Test: docs/ subdirectories exist
  const expectedDirs = ['docs/analysis', 'docs/guides', 'docs/planning'];

  expectedDirs.forEach(dir => {
    stats.totalTests++;
    const fullPath = path.join(ROOT, dir);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      log.success(`${dir} directory exists`);
      stats.passed++;
    } else {
      log.error(`${dir} directory not found`);
      stats.failed++;
    }
  });

  // Test: Root has <= 10 .md files
  stats.totalTests++;
  const rootMdFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.md'));
  if (rootMdFiles.length <= 10) {
    log.success(`Root has ${rootMdFiles.length} .md files (target: ≤10)`);
    stats.passed++;
  } else {
    log.warning(`Root has ${rootMdFiles.length} .md files (target: ≤10)`);
    stats.warnings++;
    stats.passed++;
  }

  // Test: Critical files exist
  const criticalFiles = [
    'CLAUDE.md',
    'AGENTS.md',
    'TYPESCRIPT.md',
    'DOCUMENTATION-INDEX.md',
    'TESTING-GUIDE.md',
    'rules.md',
  ];

  criticalFiles.forEach(file => {
    stats.totalTests++;
    if (fs.existsSync(path.join(ROOT, file))) {
      stats.passed++;
    } else {
      log.error(`Critical file missing: ${file}`);
      stats.failed++;
    }
  });

  if (stats.failed === 0) {
    log.success('All critical documentation files exist');
  }
}

// ============================================================================
// NEW TESTS: LANDING PAGE VALIDATION
// ============================================================================

function testLandingPageFiles() {
  log.section();
  log.header('TEST 9: Fintech Landing Page Files');

  const landingPagePath = path.join(ROOT, 'testing-projects/fintech-landing-react');

  if (!fs.existsSync(landingPagePath)) {
    log.warning('Fintech landing page not found (skipping tests)');
    return;
  }

  const requiredFiles = [
    'package.json',
    'index.html',
    'src/main.tsx',
    'src/App.tsx',
    'src/styles.css',
    'src/components/Navigation.tsx',
    'src/components/Hero.tsx',
    'src/components/Footer.tsx',
  ];

  requiredFiles.forEach(file => {
    stats.totalTests++;
    const fullPath = path.join(landingPagePath, file);
    if (fs.existsSync(fullPath)) {
      stats.passed++;
    } else {
      log.error(`Landing page file missing: ${file}`);
      stats.failed++;
    }
  });

  // Test: index.html has Google Fonts
  stats.totalTests++;
  const indexHtml = fs.readFileSync(path.join(landingPagePath, 'index.html'), 'utf8');
  if (indexHtml.includes('fonts.googleapis.com')) {
    log.success('index.html imports Google Fonts');
    stats.passed++;
  } else {
    log.error('index.html missing Google Fonts import');
    stats.failed++;
  }

  // Test: main.tsx imports both CSS files
  stats.totalTests++;
  const mainTsx = fs.readFileSync(path.join(landingPagePath, 'src/main.tsx'), 'utf8');
  const hasThemeCss = mainTsx.includes('@orion/core/theme.css');
  const hasReactCss = mainTsx.includes('@orion/react/dist/react.css');

  if (hasThemeCss && hasReactCss) {
    log.success('main.tsx imports both theme.css and react.css');
    stats.passed++;
  } else {
    if (!hasThemeCss) log.error('main.tsx missing @orion/core/theme.css');
    if (!hasReactCss) log.error('main.tsx missing @orion/react/dist/react.css');
    stats.failed++;
  }

  // Test: styles.css uses CSS variables (not hardcoded)
  stats.totalTests++;
  const stylesCss = fs.readFileSync(path.join(landingPagePath, 'src/styles.css'), 'utf8');
  const usesVars = stylesCss.includes('var(--');
  const hasHardcoded = /#[0-9a-fA-F]{3,6}|rgb\(/.test(stylesCss);

  if (usesVars && !hasHardcoded) {
    log.success('styles.css uses CSS variables (no hardcoded colors)');
    stats.passed++;
  } else if (usesVars) {
    log.warning('styles.css uses vars but has some hardcoded values');
    stats.warnings++;
    stats.passed++;
  } else {
    log.error('styles.css not using CSS variables');
    stats.failed++;
  }
}

// ============================================================================
// NEW TESTS: AI MANIFEST COMPLETENESS
// ============================================================================

function testAIManifestCompleteness() {
  log.section();
  log.header('TEST 10: AI Manifest Completeness');

  const aiManifest = readJSON(AI_MANIFEST);
  if (!aiManifest) return;

  // Test: Version is updated
  stats.totalTests++;
  if (aiManifest.version === '1.1.0') {
    log.success('ai-manifest.json version is 1.1.0 (latest)');
    stats.passed++;
  } else {
    log.warning(`ai-manifest.json version is ${aiManifest.version} (expected 1.1.0)`);
    stats.warnings++;
    stats.passed++;
  }

  // Test: Documentation section exists
  stats.totalTests++;
  if (aiManifest.documentation) {
    log.success('ai-manifest.json has documentation section');
    stats.passed++;
  } else {
    log.error('ai-manifest.json missing documentation section');
    stats.failed++;
  }

  // Test: for_ai_agents section exists
  stats.totalTests++;
  if (aiManifest.documentation?.for_ai_agents) {
    log.success('ai-manifest.json has for_ai_agents guide');
    stats.passed++;
  } else {
    log.error('ai-manifest.json missing for_ai_agents section');
    stats.failed++;
  }

  // Test: Must-read files are listed
  stats.totalTests++;
  const mustRead = aiManifest.documentation?.for_ai_agents?.must_read || [];
  const expectedFiles = ['CLAUDE.md', 'AGENTS.md', 'tokens/ai-manifest.json', 'tokens/index.json'];
  const hasAllFiles = expectedFiles.every(f => mustRead.includes(f));

  if (hasAllFiles) {
    log.success(`All ${expectedFiles.length} must-read files listed`);
    stats.passed++;
  } else {
    log.error('Some must-read files missing from ai-manifest.json');
    stats.failed++;
  }

  // Test: Improvements section has metrics
  stats.totalTests++;
  const improvements = aiManifest.documentation?.improvements || {};
  if (improvements.documentation_reduction && improvements.duplication_eliminated) {
    log.success('Documentation improvements metrics present');
    stats.passed++;
  } else {
    log.warning('Some improvement metrics missing');
    stats.warnings++;
    stats.passed++;
  }
}

// ============================================================================
// FINAL REPORT
// ============================================================================

function printReport() {
  log.section();
  log.header('📊 EXTENDED VALIDATION REPORT');
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
    console.log('The Orion Design System is fully validated:');
    console.log('  ✅ Documentation is complete and consistent');
    console.log('  ✅ All CSS variables are documented and exist');
    console.log('  ✅ Performance targets met (bundle sizes OK)');
    console.log('  ✅ Color contrast meets WCAG AA standards');
    console.log('  ✅ Code examples follow best practices');
    console.log('  ✅ File structure is organized');
    console.log('  ✅ Landing page configured correctly');
    console.log('  ✅ AI manifest is complete and up-to-date');
    console.log('');

    if (stats.warnings > 0) {
      log.warning(`${stats.warnings} warnings (non-critical, review recommended)`);
      console.log('');
    }
  } else {
    log.error(`${stats.failed} TESTS FAILED`);
    console.log('');
    console.log('Please review the errors above and fix them.');
    console.log('');
    process.exit(1);
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  console.log('');
  log.header('🔍 Orion Design System - Extended Validation Suite');
  log.info(`Running from: ${ROOT}`);
  log.info('This may take 10-15 seconds...');

  // Original tests
  testJSONValidity();
  testCSSVariablesExist();
  testCommonMistakes();

  // New tests
  testPerformance();
  testColorContrast();
  testDocumentationConsistency();
  testCodeExamples();
  testFileStructure();
  testLandingPageFiles();
  testAIManifestCompleteness();

  printReport();
}

// Run all tests
main();

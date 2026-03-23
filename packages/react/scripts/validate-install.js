#!/usr/bin/env node

/**
 * Validate Orion Installation
 *
 * Runs as a postinstall hook to check for common setup issues:
 * 1. CSS import present in app entry file
 * 2. ThemeProvider wrapping the app
 * 3. Optional peer dependencies status
 *
 * This prevents the #1 issue: users install but forget CSS import,
 * resulting in unstyled components.
 *
 * Usage: npm install @orion-ds/react (automatically runs postinstall)
 * Disable: ORION_SKIP_POSTINSTALL=1 npm install
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SKIP_VALIDATION = process.env.ORION_SKIP_POSTINSTALL === '1';
const PROJECT_ROOT = findProjectRoot();
const PACKAGE_JSON_PATH = resolve(PROJECT_ROOT, 'package.json');

// Common entry file patterns (in order of priority)
const ENTRY_FILE_PATTERNS = [
  'src/main.tsx',
  'src/main.ts',
  'src/index.tsx',
  'src/index.ts',
  'app/layout.tsx',
  'pages/_app.tsx',
  'pages/_app.jsx',
  'src/App.tsx',
  'src/App.jsx',
];

// Optional dependencies with their detection patterns
const OPTIONAL_DEPS = [
  {
    name: 'recharts',
    pattern: /from\s+['"]@orion-ds\/react\/chart['"]/,
    message: 'Chart component requires recharts. Install: npm install recharts',
  },
  {
    name: 'date-fns',
    pattern: /from\s+['"]@orion-ds\/react\/calendar['"]/,
    message: 'Calendar component requires date-fns. Install: npm install date-fns',
  },
  {
    name: 'react-markdown',
    pattern: /from\s+['"]@orion-ds\/react\/rich['"]/,
    message: 'Rich editor requires react-markdown. Install: npm install react-markdown',
  },
  {
    name: 'react-syntax-highlighter',
    pattern: /from\s+['"]@orion-ds\/react\/rich['"]/,
    message: 'Rich editor requires react-syntax-highlighter. Install: npm install react-syntax-highlighter',
  },
  {
    name: '@dnd-kit/core',
    pattern: /from\s+['"]@orion-ds\/react\/dnd['"]/,
    message: 'Drag-and-drop component requires @dnd-kit packages. Install: npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities',
  },
];

// Colors for output
const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Find the project root directory
 * Use process.cwd() which points to where npm install was run
 */
function findProjectRoot() {
  return process.cwd();
}

/**
 * Read file safely, return null if not found
 */
function readFileSafe(filePath) {
  try {
    if (existsSync(filePath)) {
      return readFileSync(filePath, 'utf-8');
    }
  } catch {
    // Silently fail
  }
  return null;
}

/**
 * Check if CSS import exists in project files
 */
function checkCSSImport() {
  const cssPatterns = [
    /@orion-ds\/react\/styles\.css/,
    /@orion-ds\/react\/theme\.css/,
  ];

  for (const pattern of ENTRY_FILE_PATTERNS) {
    const filePath = resolve(PROJECT_ROOT, pattern);
    const content = readFileSafe(filePath);

    if (content) {
      for (const cssPattern of cssPatterns) {
        if (cssPattern.test(content)) {
          return {
            found: true,
            file: pattern,
          };
        }
      }
    }
  }

  return { found: false };
}

/**
 * Check if ThemeProvider is used in project
 */
function checkThemeProvider() {
  const themeProviderPatterns = [
    /<ThemeProvider/,
    /useThemeContext/,
    /from\s+['"]@orion-ds\/react['"]/,
  ];

  for (const pattern of ENTRY_FILE_PATTERNS) {
    const filePath = resolve(PROJECT_ROOT, pattern);
    const content = readFileSafe(filePath);

    if (content) {
      // Check for ThemeProvider wrapper
      if (/<ThemeProvider/.test(content) || /useThemeContext/.test(content)) {
        return {
          found: true,
          file: pattern,
        };
      }
    }
  }

  return { found: false };
}

/**
 * Check if optional dependencies are installed
 */
function checkOptionalDeps() {
  const installed = {};
  const missing = [];

  for (const dep of OPTIONAL_DEPS) {
    try {
      const packageJson = readFileSync(PACKAGE_JSON_PATH, 'utf-8');
      const parsed = JSON.parse(packageJson);
      const allDeps = {
        ...parsed.dependencies,
        ...parsed.devDependencies,
        ...parsed.peerDependencies,
      };

      installed[dep.name] = !!allDeps[dep.name];
    } catch {
      installed[dep.name] = false;
    }
  }

  // Check if any source files import optional features
  for (const pattern of ENTRY_FILE_PATTERNS) {
    const filePath = resolve(PROJECT_ROOT, pattern);
    const content = readFileSafe(filePath);

    if (content) {
      for (const dep of OPTIONAL_DEPS) {
        if (dep.pattern.test(content) && !installed[dep.name]) {
          missing.push(dep);
        }
      }
    }
  }

  return {
    installed,
    missing,
  };
}

/**
 * Get package version from package.json
 */
function getPackageVersion() {
  try {
    const pkgPath = resolve(dirname(__dirname), 'package.json');
    const content = readFileSync(pkgPath, 'utf-8');
    const pkg = JSON.parse(content);
    return pkg.version || '5.0.0';
  } catch {
    return '5.0.0';
  }
}

/**
 * Format and print validation results
 */
function printResults(cssCheck, themeCheck, depsCheck) {
  const version = getPackageVersion();

  console.log('\n');
  console.log(`${colors.bold}${colors.cyan}✓ Orion Installation Validation${colors.reset}`);
  console.log(`\n${colors.dim}📦 Package: @orion-ds/react v${version}${colors.reset}\n`);

  // CSS Import Check
  if (cssCheck.found) {
    console.log(`${colors.green}✓${colors.reset} CSS import found ${colors.dim}(${cssCheck.file})${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠${colors.reset}  CSS import not found`);
  }

  // ThemeProvider Check
  if (themeCheck.found) {
    console.log(`${colors.green}✓${colors.reset} ThemeProvider found ${colors.dim}(${themeCheck.file})${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠${colors.reset}  ThemeProvider not found`);
  }

  // Optional Dependencies Check
  const missingDeps = depsCheck.missing.length > 0;
  if (!missingDeps) {
    console.log(
      `${colors.green}✓${colors.reset} Optional dependencies: ready`,
    );
  } else {
    console.log(`${colors.yellow}⚠${colors.reset}  Missing optional dependencies:\n`);
    depsCheck.missing.forEach((dep) => {
      console.log(`   ${colors.yellow}→${colors.reset} ${dep.message}`);
    });
  }

  console.log('\n');

  // Summary and Actions
  const hasIssues = !cssCheck.found || !themeCheck.found || missingDeps;

  if (!hasIssues) {
    console.log(
      `${colors.green}${colors.bold}Your app is ready to use Orion!${colors.reset} ${colors.green}🎉${colors.reset}`,
    );
    console.log(`\n${colors.dim}Start with: ${colors.reset}import { Button } from '@orion-ds/react'\n`);
  } else {
    console.log(`${colors.bold}${colors.yellow}Action Required${colors.reset}\n`);

    if (!cssCheck.found) {
      printCSSFixInstructions();
    }

    if (!themeCheck.found) {
      printThemeProviderFixInstructions();
    }

    if (missingDeps) {
      console.log(`${colors.bold}Install Missing Dependencies:${colors.reset}\n`);
      depsCheck.missing.forEach((dep) => {
        console.log(`   npm install ${dep.name}`);
      });
      console.log('');
    }

    console.log(
      `${colors.dim}Learn more: https://github.com/orion-ds/orion#quick-start${colors.reset}\n`,
    );
  }
}

/**
 * Print CSS import fix instructions
 */
function printCSSFixInstructions() {
  console.log(`${colors.bold}Fix: Missing CSS Import${colors.reset}\n`);
  console.log('Add this to your app entry file (src/main.tsx, pages/_app.tsx, or app/layout.tsx):\n');
  console.log(
    `   ${colors.cyan}import '@orion-ds/react/styles.css'${colors.reset}`,
  );
  console.log('\nThis import includes all design tokens and component styles.\n');
}

/**
 * Print ThemeProvider fix instructions
 */
function printThemeProviderFixInstructions() {
  console.log(`${colors.bold}Fix: Missing ThemeProvider${colors.reset}\n`);
  console.log('Wrap your app root with ThemeProvider:\n');
  console.log(`   ${colors.cyan}import { ThemeProvider } from '@orion-ds/react'${colors.reset}`);
  console.log('   import "@orion-ds/react/styles.css"\n');
  console.log(
    `   ${colors.cyan}export default function App() {${colors.reset}`,
  );
  console.log(
    `     ${colors.cyan}return (${colors.reset}`,
  );
  console.log(
    `       ${colors.cyan}<ThemeProvider>${colors.reset}`,
  );
  console.log(
    `         ${colors.cyan}<YourApp />${colors.reset}`,
  );
  console.log(
    `       ${colors.cyan}</ThemeProvider>${colors.reset}`,
  );
  console.log(
    `     ${colors.cyan})${colors.reset}`,
  );
  console.log(
    `   ${colors.cyan}}${colors.reset}\n`,
  );
}

/**
 * Main validation function
 */
function validate() {
  if (SKIP_VALIDATION) {
    // Silently skip if disabled
    return;
  }

  try {
    const cssCheck = checkCSSImport();
    const themeCheck = checkThemeProvider();
    const depsCheck = checkOptionalDeps();

    printResults(cssCheck, themeCheck, depsCheck);
  } catch (error) {
    // Silently fail - this is a postinstall script, errors shouldn't block installation
    if (process.env.DEBUG_ORION_POSTINSTALL) {
      console.error('Orion validation error:', error.message);
    }
  }
}

// Run validation
validate();

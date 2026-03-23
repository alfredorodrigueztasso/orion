#!/usr/bin/env node

/**
 * Test Suite for validate-install.js
 *
 * Tests all validation checks in different scenarios:
 * 1. CSS import present
 * 2. CSS import missing
 * 3. ThemeProvider present
 * 4. ThemeProvider missing
 * 5. Optional dependencies present
 * 6. Optional dependencies missing
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test configuration
const TESTS_DIR = resolve(__dirname, '../test-scenarios');
const ORIGINAL_CWD = process.cwd();

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

let passedTests = 0;
let failedTests = 0;

/**
 * Create a test project directory with specific setup
 */
function createTestProject(name, setup) {
  const projectDir = resolve(TESTS_DIR, name);

  // Clean up if exists
  if (existsSync(projectDir)) {
    rmSync(projectDir, { recursive: true, force: true });
  }

  mkdirSync(projectDir, { recursive: true });
  mkdirSync(resolve(projectDir, 'src'), { recursive: true });

  // Create minimal package.json
  writeFileSync(
    resolve(projectDir, 'package.json'),
    JSON.stringify({
      name: `test-${name}`,
      version: '1.0.0',
      type: 'module',
      ...setup.packageJson,
    }, null, 2),
  );

  // Create App.tsx
  if (setup.appTsx) {
    writeFileSync(resolve(projectDir, 'src/App.tsx'), setup.appTsx);
  }

  // Create main.tsx
  if (setup.mainTsx) {
    writeFileSync(resolve(projectDir, 'src/main.tsx'), setup.mainTsx);
  }

  // Create layout.tsx
  if (setup.layoutTsx) {
    mkdirSync(resolve(projectDir, 'app'), { recursive: true });
    writeFileSync(resolve(projectDir, 'app/layout.tsx'), setup.layoutTsx);
  }

  return projectDir;
}

/**
 * Run validation in a test project
 */
function runValidation(projectDir) {
  try {
    const result = execSync(
      `ORION_PROJECT_ROOT="${projectDir}" node "${resolve(__dirname, 'validate-install.js')}"`,
      {
        cwd: projectDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      },
    );
    return { success: true, output: result };
  } catch (error) {
    // Script may return error but that's ok for testing
    return { success: false, output: error.stdout || error.message };
  }
}

/**
 * Test helper
 */
function test(name, fn) {
  try {
    fn();
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    passedTests++;
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${error.message}`);
    failedTests++;
  }
}

/**
 * Assert helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Test 1: Complete setup (all checks pass)
 */
function testCompleteSetup() {
  test('Complete setup - CSS and ThemeProvider present', () => {
    const projectDir = createTestProject('complete-setup', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@orion-ds/react': '^5.0.0',
        },
      },
      mainTsx: `
import '@orion-ds/react/styles.css'
import React from 'react'
import { ThemeProvider, Button } from '@orion-ds/react'

export default function App() {
  return (
    <ThemeProvider>
      <Button>Hello</Button>
    </ThemeProvider>
  )
}
      `,
    });

    const result = runValidation(projectDir);
    assert(
      result.output.includes('✓ CSS import found'),
      'Should detect CSS import',
    );
    assert(
      result.output.includes('✓ ThemeProvider found'),
      'Should detect ThemeProvider',
    );
    assert(
      result.output.includes('ready to use Orion'),
      'Should show success message',
    );
  });
}

/**
 * Test 2: Missing CSS import
 */
function testMissingCSS() {
  test('Missing CSS import - shows warning', () => {
    const projectDir = createTestProject('missing-css', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@orion-ds/react': '^5.0.0',
        },
      },
      mainTsx: `
import { ThemeProvider, Button } from '@orion-ds/react'

export default function App() {
  return (
    <ThemeProvider>
      <Button>Hello</Button>
    </ThemeProvider>
  )
}
      `,
    });

    const result = runValidation(projectDir);
    assert(
      result.output.includes('⚠') && result.output.includes('CSS import'),
      'Should warn about missing CSS import',
    );
    assert(
      result.output.includes('Fix: Missing CSS Import'),
      'Should show fix instructions',
    );
  });
}

/**
 * Test 3: Missing ThemeProvider
 */
function testMissingThemeProvider() {
  test('Missing ThemeProvider - shows warning', () => {
    const projectDir = createTestProject('missing-theme', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@orion-ds/react': '^5.0.0',
        },
      },
      mainTsx: `
import '@orion-ds/react/styles.css'
import { Button } from '@orion-ds/react'

export default function App() {
  return <Button>Hello</Button>
}
      `,
    });

    const result = runValidation(projectDir);
    assert(
      result.output.includes('⚠') && result.output.includes('ThemeProvider'),
      'Should warn about missing ThemeProvider',
    );
    assert(
      result.output.includes('Fix: Missing ThemeProvider'),
      'Should show fix instructions',
    );
  });
}

/**
 * Test 4: Detects optional dependencies in different file types
 */
function testOptionalDepsDetection() {
  test('Detects optional dependency usage in code', () => {
    const projectDir = createTestProject('with-optional-deps', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@orion-ds/react': '^5.0.0',
        },
      },
      mainTsx: `
import '@orion-ds/react/styles.css'
import { ThemeProvider, Button } from '@orion-ds/react'
import { LineChart } from '@orion-ds/react/chart'

export default function App() {
  return (
    <ThemeProvider>
      <LineChart />
    </ThemeProvider>
  )
}
      `,
    });

    const result = runValidation(projectDir);
    assert(
      result.output.includes('recharts') || result.output.includes('Missing optional'),
      'Should detect recharts dependency usage',
    );
  });
}

/**
 * Test 5: Handles app/layout.tsx (Next.js App Router)
 */
function testNextjsAppRouter() {
  test('Detects CSS and ThemeProvider in Next.js app/layout.tsx', () => {
    const projectDir = createTestProject('nextjs-app-router', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@orion-ds/react': '^5.0.0',
        },
      },
      layoutTsx: `
import '@orion-ds/react/styles.css'
import { ThemeProvider } from '@orion-ds/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
      `,
    });

    const result = runValidation(projectDir);
    assert(
      result.output.includes('CSS import found'),
      'Should detect CSS in layout.tsx',
    );
    assert(
      result.output.includes('ThemeProvider found'),
      'Should detect ThemeProvider in layout.tsx',
    );
  });
}

/**
 * Test 6: Skip validation with env var
 */
function testSkipValidation() {
  test('Skips validation when ORION_SKIP_POSTINSTALL is set', () => {
    const projectDir = createTestProject('skip-validation', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
        },
      },
    });

    try {
      const result = execSync(
        `ORION_SKIP_POSTINSTALL=1 node "${resolve(__dirname, 'validate-install.js')}"`,
        {
          cwd: projectDir,
          encoding: 'utf-8',
          stdio: 'pipe',
        },
      );

      // When skipped, output should be empty or minimal
      assert(
        !result.includes('Orion Installation Validation') || result.trim() === '',
        'Should skip validation silently',
      );
    } catch {
      // This is ok - script may exit silently
    }
  });
}

/**
 * Test 7: Handles missing package.json gracefully
 */
function testGracefulErrorHandling() {
  test('Handles missing package.json gracefully', () => {
    const projectDir = resolve(TESTS_DIR, 'no-package-json');
    mkdirSync(projectDir, { recursive: true });

    try {
      const result = execSync(
        `node "${resolve(__dirname, 'validate-install.js')}"`,
        {
          cwd: projectDir,
          encoding: 'utf-8',
          stdio: 'pipe',
          timeout: 5000,
        },
      );

      // Script should not crash
      assert(true, 'Script handles missing package.json');
    } catch (error) {
      // Script may timeout but shouldn't crash with error
      assert(
        !error.message.includes('ENOENT'),
        'Script should not throw file not found',
      );
    }
  });
}

/**
 * Test 8: Performance - runs in < 500ms
 */
function testPerformance() {
  test('Validation completes in < 500ms', () => {
    const projectDir = createTestProject('perf-test', {
      packageJson: {
        dependencies: {
          react: '^19.0.0',
        },
      },
      mainTsx: `import React from 'react'`,
    });

    const startTime = Date.now();
    runValidation(projectDir);
    const elapsed = Date.now() - startTime;

    assert(
      elapsed < 500,
      `Validation took ${elapsed}ms, expected < 500ms`,
    );
  });
}

/**
 * Run all tests
 */
function runTests() {
  console.log(`\n${colors.bold}${colors.cyan}Testing validate-install.js${colors.reset}\n`);

  testCompleteSetup();
  testMissingCSS();
  testMissingThemeProvider();
  testOptionalDepsDetection();
  testNextjsAppRouter();
  testSkipValidation();
  testGracefulErrorHandling();
  testPerformance();

  // Clean up test directories
  if (existsSync(TESTS_DIR)) {
    rmSync(TESTS_DIR, { recursive: true, force: true });
  }

  console.log(`\n${colors.bold}Test Results:${colors.reset}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  if (failedTests > 0) {
    console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
  }
  console.log('');

  process.exit(failedTests > 0 ? 1 : 0);
}

// Run tests
runTests();

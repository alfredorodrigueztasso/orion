---
name: test-full
description: Run full test suite (unit, E2E, visual regression). Auto-triggers when user says "run all tests", "full test suite", "test everything", or before releases. Complete testing in ~5-10 minutes.
allowed-tools: ["Bash"]
---

# Full Test Suite

Runs the complete test suite: unit tests (Vitest), E2E tests (Playwright), and visual regression (Percy).

## What This Runs

1. **Unit Tests** (Vitest) - Component logic, accessibility, snapshots
2. **E2E Tests** (Playwright) - Critical user flows across browsers
3. **Visual Tests** (Percy) - Visual regression detection via Storybook

**Runtime**: ~5-10 minutes
- Unit tests: ~30 seconds
- E2E tests: ~2-3 minutes
- Visual tests: ~3-5 minutes (depends on Percy upload)

**Purpose**: Comprehensive validation before releases

## Usage

```bash
/test-full
/test-full --skip-visual  # Skip Percy (faster)
/test-full --headed       # Run E2E with visible browser (debugging)
```

## Execution Steps

1. Navigate to Orion root directory
2. **Step 1**: Run unit tests with coverage
3. **Step 2**: Build Storybook (required for E2E and Percy)
4. **Step 3**: Run E2E tests (Playwright)
5. **Step 4**: Run visual regression tests (Percy)
6. **Step 5**: Generate test reports with links

**Why build Storybook?** E2E tests run against Storybook at `http://localhost:6006`, and Percy snapshots Storybook stories.

## Commands (Run Sequentially)

```bash
# Step 1: Unit tests with coverage
cd "/Users/alfredo/Documents/AI First DS Library/packages/react" && npm run test:coverage

# Step 2: Build Storybook
cd "/Users/alfredo/Documents/AI First DS Library/packages/react" && npm run build-storybook

# Step 3: E2E tests (Playwright)
cd "/Users/alfredo/Documents/AI First DS Library/packages/react" && npm run test:e2e

# Step 4: Visual tests (Percy)
cd "/Users/alfredo/Documents/AI First DS Library/packages/react" && npm run percy
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "run all tests"
- "full test suite"
- "test everything"
- "complete testing"
- Before running `/pre-release`

## Success Output Format

```
🧪 Full Test Suite

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Unit Tests (Vitest)
   145/145 tests passed (100%)

   Coverage:
   - Statements: 85%
   - Branches: 78%
   - Functions: 87%
   - Lines: 84%

   Report: packages/react/coverage/index.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ E2E Tests (Playwright)
   24/24 tests passed

   Browsers:
   - Chromium: 8/8 passed
   - Firefox: 8/8 passed
   - WebKit: 8/8 passed

   Report: packages/react/playwright-report/index.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Visual Tests (Percy)
   No visual changes detected

   Snapshots:
   - 52 stories captured
   - 0 visual differences
   - 0 regressions

   Percy Dashboard:
   https://percy.io/orion-ds/orion-react/builds/12345

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 ALL TESTS PASSED!

   Test Summary:
   - Unit: 145/145 (100%)
   - E2E: 24/24 (100%)
   - Visual: 0 regressions

   System is fully tested and ready for release

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🧪 Full Test Suite

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Unit Tests (Vitest)
   145/145 tests passed ✓

✅ Build Storybook
   Built successfully ✓

❌ E2E Tests (Playwright) FAILED
   22/24 tests passed (2 failed)

   Failed Tests:

   1. Button.spec.ts: "should toggle theme on click"
      Browser: Chromium
      Error: Timeout waiting for theme to change
      File: packages/react/e2e/Button.spec.ts:45

   2. Modal.spec.ts: "should trap focus inside modal"
      Browser: Firefox
      Error: Focus escaped modal container
      File: packages/react/e2e/Modal.spec.ts:67

   Debug:
   cd packages/react && npm run test:e2e:debug

   Reports:
   packages/react/playwright-report/index.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Percy skipped (E2E tests failed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ TEST SUITE FAILED

   2 E2E tests failed
   Fix failing tests and run /test-full again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Test Types Explained

### Unit Tests (Vitest)

**What**: Tests individual component logic and behavior

**Examples**:
- Button renders correctly
- State updates work
- Props are passed correctly
- Accessibility attributes present
- Snapshot tests match

**Location**: `packages/react/src/components/*/ComponentName.test.tsx`

**Coverage thresholds**:
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

**Run individually**:
```bash
cd packages/react && npm test Button
```

### E2E Tests (Playwright)

**What**: Tests critical user flows across real browsers

**Examples**:
- Theme switching works end-to-end
- Modal opens and closes correctly
- Form submission works
- Navigation flows work
- Keyboard accessibility works

**Location**: `packages/react/e2e/*.spec.ts`

**Browsers**:
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)
- Mobile Chrome
- Mobile Safari

**Run in debug mode**:
```bash
cd packages/react && npm run test:e2e:debug
```

### Visual Tests (Percy)

**What**: Detects unintended visual changes

**How it works**:
1. Percy captures screenshots of all Storybook stories
2. Compares against baseline (previous build)
3. Flags visual differences
4. Human reviews changes (approve or reject)

**Examples**:
- Button color changed unintentionally
- Spacing shifted
- Font rendering different
- Layout broken

**Percy Dashboard**: https://percy.io/orion-ds/orion-react

**Manual review required**: If visual changes detected, review in Percy dashboard

## Skip Visual Tests

For faster test runs during development:

```bash
/test-full --skip-visual
```

**Skips**:
- Percy snapshot upload
- Visual comparison

**When to use**:
- Local development
- Rapid iteration
- When visual changes are expected
- CI/CD dry runs

**When NOT to use**:
- Final release validation
- PR merge validation
- When components were visually changed

## Debug Mode

Run E2E tests with visible browser:

```bash
/test-full --headed
```

**Benefits**:
- See tests execute in real-time
- Debug failures visually
- Understand test behavior
- Inspect element states

**Use for**:
- Debugging failing E2E tests
- Understanding test flow
- Developing new E2E tests

## Test Reports

After running tests, view detailed reports:

### Unit Test Report
```bash
open packages/react/coverage/index.html
```

**Shows**:
- Line-by-line coverage
- Untested code highlighted
- Coverage percentages per file

### E2E Test Report
```bash
open packages/react/playwright-report/index.html
```

**Shows**:
- Test results per browser
- Screenshots on failure
- Execution timeline
- Error stack traces

### Percy Dashboard
```
https://percy.io/orion-ds/orion-react/builds/<build-id>
```

**Shows**:
- Side-by-side visual comparisons
- Highlighted differences
- Approval/rejection interface
- Baseline history

## Common Issues & Fixes

### Unit Tests Failing

**Issue**: Component logic tests fail

**Solution**:
1. Run specific test: `cd packages/react && npm test ComponentName`
2. Check error message
3. Fix component logic or test expectations
4. Re-run `/test-full`

### E2E Tests Timeout

**Issue**: Tests timeout waiting for elements

**Solution**:
1. Run in debug mode: `npm run test:e2e:debug`
2. Watch test execution
3. Check if element selectors are correct
4. Increase timeout if needed (slow CI)
5. Fix race conditions in component

### E2E Tests Flaky

**Issue**: Tests pass sometimes, fail sometimes

**Solution**:
1. Add proper wait conditions (`page.waitForSelector`)
2. Avoid arbitrary timeouts (`page.waitForTimeout`)
3. Use Playwright's auto-waiting features
4. Check for race conditions
5. Ensure Storybook is fully loaded

### Percy Visual Differences

**Issue**: Percy detects unintended visual changes

**Solution**:
1. Review changes in Percy dashboard
2. If changes are intentional: Approve in Percy
3. If changes are bugs: Fix component CSS
4. Re-run `/test-full` to verify

### Storybook Build Failing

**Issue**: Storybook doesn't build (blocks E2E and Percy)

**Solution**:
1. Run manually: `cd packages/react && npm run build-storybook`
2. Check error messages
3. Fix story files or Storybook config
4. Re-run `/test-full`

## Integration with CI/CD

This skill integrates with GitHub Actions:

**Unit + E2E** (on every PR):
```yaml
- name: Run tests
  run: npm run test-full -- --skip-visual
```

**Visual regression** (on push to main):
```yaml
- name: Visual tests
  run: npm run percy
  env:
    PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

**Benefits**:
- Automated testing on every PR
- Prevents regressions from merging
- Visual changes require approval

## Test Coverage Goals

**Current coverage** (as of latest run):
- Statements: 85%
- Branches: 78%
- Functions: 87%
- Lines: 84%

**Target coverage** (goal):
- Statements: 90%
- Branches: 85%
- Functions: 90%
- Lines: 90%

**Focus areas** for improvement:
- Error handling branches
- Edge case scenarios
- Accessibility features

## Exit Codes

- **All pass** = Exit code 0 (100% tests passed)
- **Any fail** = Exit code 1 (at least one test failed)

## References

- Unit tests: Vitest (vitest.dev)
- E2E tests: Playwright (playwright.dev)
- Visual tests: Percy (percy.io)
- Test config: `packages/react/vitest.config.ts`, `packages/react/playwright.config.ts`
- Percy config: `packages/react/.percy.yml`
- CI/CD: `.github/workflows/e2e.yml`, `.github/workflows/visual-regression.yml`

# E2E Testing with Playwright

End-to-end tests for critical user flows in Orion Design System.

## Overview

E2E tests verify complete user flows across browsers and devices using Playwright. Tests run against Storybook to ensure components work correctly in real browser environments.

## Setup

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Or install specific browsers
npx playwright install chromium firefox webkit
```

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npm run test:e2e -- theme-switching.spec.ts

# Run tests in specific browser
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit

# Run tests in debug mode
npm run test:e2e:debug

# Generate HTML report
npm run test:e2e:report
```

## Test Coverage

### 1. Theme Switching (`theme-switching.spec.ts`)

- Switch between light/dark themes
- Switch between brands (orion, red, deepblue, orange)
- Theme persistence in localStorage
- Theme applies to all components

### 2. Form Submission (`form-submission.spec.ts`)

- Fill and submit forms
- Validation errors
- Clear input values
- Disabled state handling
- Keyboard navigation between fields

### 3. Modal Navigation (`modal-navigation.spec.ts`)

- Open and close modals
- Close with Escape key
- Focus trap inside modal
- Close on overlay click
- Body scroll prevention

### 4. Dropdown Interactions (`dropdown-interactions.spec.ts`)

- Open and close dropdowns
- Select dropdown items
- Keyboard navigation (Arrow keys)
- Select with Enter key

### 5. Tabs Navigation (`tabs-navigation.spec.ts`)

- Switch tabs on click
- Arrow key navigation
- Focus wrapping at ends
- Correct tab panel display

### 6. Button Interactions (`button-interactions.spec.ts`)

- Click buttons
- Disabled state
- Loading state
- Icon buttons
- Hover styles
- Keyboard activation (Enter/Space)

### 7. Accessibility (`accessibility.spec.ts`)

- Landmark roles (main, nav)
- Form label associations
- Heading hierarchy
- Skip links
- ARIA attributes
- Reduced motion support
- Color contrast

## Test Configuration

Configured in `playwright.config.ts`:

- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Tablet**: iPad Pro
- **Timeout**: 30s per test
- **Retries**: 2 retries on CI
- **Base URL**: http://localhost:6006 (Storybook)

## CI Integration

Tests run automatically in CI:

```yaml
# .github/workflows/e2e.yml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Writing E2E Tests

### Basic Structure

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-button--default");
    await page.waitForLoadState("networkidle");
  });

  test("should do something", async ({ page }) => {
    const button = page.getByRole("button", { name: /click me/i });
    await button.click();
    await expect(button).toBeVisible();
  });
});
```

### Best Practices

1. **Use semantic locators**

   ```typescript
   // ✅ Good - uses ARIA roles
   page.getByRole("button", { name: /submit/i });
   page.getByRole("textbox", { name: /email/i });

   // ❌ Avoid - brittle selectors
   page.locator(".btn-primary");
   page.locator("#submit-btn");
   ```

2. **Wait for states**

   ```typescript
   // ✅ Good - waits for network
   await page.waitForLoadState("networkidle");

   // ✅ Good - waits for element
   await expect(element).toBeVisible();

   // ❌ Avoid - arbitrary timeouts
   await page.waitForTimeout(1000);
   ```

3. **Test user flows, not implementation**

   ```typescript
   // ✅ Good - tests user perspective
   await page.getByLabel("Email").fill("test@example.com");
   await page.getByRole("button", { name: /submit/i }).click();
   await expect(page.getByText(/success/i)).toBeVisible();

   // ❌ Avoid - tests implementation details
   await page.locator(".email-input").type("test@example.com");
   await page.evaluate(() => form.submit());
   ```

4. **Clean up after tests**

   ```typescript
   test.afterEach(async ({ page }) => {
     // Close any open modals
     await page.keyboard.press("Escape");

     // Reset localStorage
     await page.evaluate(() => localStorage.clear());
   });
   ```

## Debugging Tests

### Debug Mode

```bash
# Opens Playwright Inspector
npm run test:e2e:debug
```

### Visual Debugging

```bash
# Run in headed mode to see browser
npm run test:e2e:headed

# Record video on failure (already enabled)
# Videos saved to test-results/
```

### Trace Viewer

```bash
# Traces captured on first retry
# View with:
npx playwright show-trace test-results/trace.zip
```

### Screenshots

Screenshots are automatically captured on failure and saved to `test-results/`.

## Performance Considerations

- Tests run in parallel by default
- Use `test.describe.serial()` for dependent tests
- Set `workers: 1` in CI to avoid flaky tests
- Use `waitForLoadState('networkidle')` sparingly

## Troubleshooting

### Storybook not starting

```bash
# Manually start Storybook first
npm run storybook

# Then run tests in another terminal
npm run test:e2e -- --no-server
```

### Tests timing out

```bash
# Increase timeout
npm run test:e2e -- --timeout=60000
```

### Flaky tests

```bash
# Run test multiple times
npm run test:e2e -- --repeat-each=10 theme-switching.spec.ts
```

### Browser not found

```bash
# Reinstall browsers
npx playwright install --force
```

## Reports

### HTML Report

```bash
npm run test:e2e:report
```

Opens interactive HTML report with:

- Test results by browser
- Screenshots and videos
- Trace viewer links
- Detailed error messages

### JSON Report

Generated at `test-results/e2e-results.json` for CI integration.

---

**Last Updated:** 2026-02-13
**Test Count:** 35 tests across 7 critical flows
**Browser Coverage:** Chromium, Firefox, WebKit, Mobile (2 devices), Tablet

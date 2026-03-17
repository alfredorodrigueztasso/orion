import { test, expect } from "@playwright/test";

/**
 * E2E Test: Button Interactions
 *
 * Tests button clicks, states, and variants across themes/brands.
 */
test.describe("Button Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-button--all-variants");
    await page.waitForLoadState("networkidle");
  });

  test("should click buttons", async ({ page }) => {
    const primaryButton = page
      .getByRole("button", { name: /primary/i })
      .first();

    // Button should be visible and enabled
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toBeEnabled();

    // Click button
    await primaryButton.click();

    // Verify button received click (it should still be visible)
    await expect(primaryButton).toBeVisible();
  });

  test("should show disabled state", async ({ page }) => {
    // Navigate to disabled button story
    await page.goto("/iframe.html?id=components-button--disabled");
    await page.waitForLoadState("networkidle");

    const button = page.getByRole("button").first();

    // Button should be disabled
    await expect(button).toBeDisabled();

    // Click should not work
    await button.click({ force: true });
    // Verify button is still disabled (no state change)
    await expect(button).toBeDisabled();
  });

  test("should show loading state", async ({ page }) => {
    // Navigate to loading button story
    await page.goto("/iframe.html?id=components-button--loading");
    await page.waitForLoadState("networkidle");

    const button = page.getByRole("button").first();

    // Button should be disabled when loading
    await expect(button).toBeDisabled();

    // Should show loading indicator
    const spinner = button.locator('[data-loading], .spinner, [role="status"]');
    await expect(spinner).toBeVisible();
  });

  test("should render icon buttons", async ({ page }) => {
    // Navigate to icon button story
    await page.goto("/iframe.html?id=components-button--with-icon");
    await page.waitForLoadState("networkidle");

    const button = page.getByRole("button").first();

    // Icon should be present
    const icon = button.locator("[data-icon], svg, [data-lucide]");
    await expect(icon).toBeVisible();

    // Button should be clickable
    await button.click();
    await expect(button).toBeVisible();
  });

  test("should apply hover styles", async ({ page }) => {
    const button = page.getByRole("button", { name: /primary/i }).first();

    // Get initial background color
    const initialBg = await button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Hover button
    await button.hover();

    // Background should change on hover (wait a bit for transition)
    await page.waitForTimeout(100);

    const hoverBg = await button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Hover color should be different (darker/lighter)
    expect(hoverBg).not.toBe(initialBg);
  });

  test("should work with keyboard", async ({ page }) => {
    const button = page.getByRole("button", { name: /primary/i }).first();

    // Focus button with Tab
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();

    // Activate with Enter
    await page.keyboard.press("Enter");

    // Button should still be visible (action triggered)
    await expect(button).toBeVisible();

    // Activate with Space
    await page.keyboard.press("Space");
    await expect(button).toBeVisible();
  });
});

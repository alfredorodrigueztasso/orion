import { test, expect } from "@playwright/test";

/**
 * E2E Test: Theme Switching
 *
 * Verifies that theme and brand switching works correctly across components.
 * Critical for multi-brand design system.
 */
test.describe("Theme Switching", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to ThemeController story
    await page.goto("/iframe.html?id=components-themecontroller--default");
    await page.waitForLoadState("networkidle");
  });

  test("should switch between light and dark themes", async ({ page }) => {
    // Get html element
    const html = page.locator("html");

    // Initially should be light theme
    await expect(html).toHaveAttribute("data-theme", "light");

    // Click dark theme button
    await page.getByRole("button", { name: /dark/i }).click();

    // Verify theme changed
    await expect(html).toHaveAttribute("data-theme", "dark");

    // Click light theme button
    await page.getByRole("button", { name: /light/i }).click();

    // Verify theme changed back
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("should switch between brands", async ({ page }) => {
    const html = page.locator("html");

    // Initially should be orion brand
    await expect(html).toHaveAttribute("data-brand", "orion");

    // Click red brand button
    await page.getByRole("button", { name: /red/i }).click();

    // Verify brand changed
    await expect(html).toHaveAttribute("data-brand", "red");

    // Verify brand color applied (red brand uses red accent)
    const button = page.getByRole("button", { name: /primary/i }).first();
    const bgColor = await button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Red brand should have reddish background (not blue)
    expect(bgColor).not.toContain("27, 91, 255"); // Not orion blue
  });

  test("should persist theme in localStorage", async ({ page }) => {
    // Switch to dark theme
    await page.getByRole("button", { name: /dark/i }).click();

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Theme should still be dark
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
  });

  test("should apply theme to all components", async ({ page }) => {
    // Navigate to a page with multiple components
    await page.goto("/iframe.html?id=templates-app-dashboardtemplate--default");
    await page.waitForLoadState("networkidle");

    const html = page.locator("html");

    // Switch to dark theme
    await expect(html).toHaveAttribute("data-theme", "light");
    // Note: ThemeController might not be present on this page
    // So we'll use the data-theme attribute directly via evaluate
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    });

    // Verify background color changed (dark theme has dark background)
    const body = page.locator("body");
    const bgColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Dark theme should have dark background (not white)
    expect(bgColor).not.toBe("rgb(255, 255, 255)");
  });
});

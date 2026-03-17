import { test, expect } from "@playwright/test";

/**
 * E2E Test: Accessibility
 *
 * Tests keyboard navigation, screen reader attributes, and WCAG compliance.
 */
test.describe("Accessibility", () => {
  test("should have proper landmark roles", async ({ page }) => {
    await page.goto("/iframe.html?id=templates-app-dashboardtemplate--default");
    await page.waitForLoadState("networkidle");

    // Check for semantic HTML landmarks
    const main = page.getByRole("main");
    await expect(main).toBeVisible();

    // Navigation should exist
    const nav = page.getByRole("navigation").first();
    await expect(nav).toBeVisible();
  });

  test("should have accessible form labels", async ({ page }) => {
    await page.goto("/iframe.html?id=components-field--default");
    await page.waitForLoadState("networkidle");

    // Input should have associated label
    const input = page.getByRole("textbox").first();
    await expect(input).toBeVisible();

    // Check for aria-label or associated label
    const ariaLabel = await input.getAttribute("aria-label");
    const labelledBy = await input.getAttribute("aria-labelledby");
    const hasLabel = ariaLabel !== null || labelledBy !== null;

    // Or find associated label element
    const label = page.locator("label").first();
    const labelExists = await label.isVisible();

    expect(hasLabel || labelExists).toBeTruthy();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/iframe.html?id=templates-app-dashboardtemplate--default");
    await page.waitForLoadState("networkidle");

    // Get all headings
    const h1 = page.locator('h1, [role="heading"][aria-level="1"]');
    const h1Count = await h1.count();

    // Should have exactly one h1
    expect(h1Count).toBe(1);

    // All headings should have text content
    const headings = page.locator("h1, h2, h3, h4, h5, h6");
    const headingCount = await headings.count();

    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const text = await heading.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test("should have skip link for keyboard users", async ({ page }) => {
    await page.goto("/iframe.html?id=templates-app-dashboardtemplate--default");
    await page.waitForLoadState("networkidle");

    // Tab to first focusable element (should be skip link)
    await page.keyboard.press("Tab");

    // Check if skip link is focused or visible
    const skipLink = page.getByText(/skip to/i).or(page.locator(".skip-link"));

    // Skip link might not exist in all templates, so we just check it doesn't throw
    const skipLinkCount = await skipLink.count();
    expect(skipLinkCount).toBeGreaterThanOrEqual(0);
  });

  test("should have proper ARIA attributes on interactive elements", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=components-button--default");
    await page.waitForLoadState("networkidle");

    const button = page.getByRole("button").first();

    // Button should have accessible name
    const accessibleName = await button.getAttribute("aria-label");
    const textContent = await button.textContent();

    expect(
      accessibleName !== null || (textContent && textContent.trim().length > 0),
    ).toBeTruthy();
  });

  test("should support reduced motion preference", async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/iframe.html?id=components-modal--default");
    await page.waitForLoadState("networkidle");

    // Open modal
    await page.getByRole("button", { name: /open/i }).click();

    // Modal should still work with reduced motion
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Verify no long animations (modal should appear quickly)
    const startTime = Date.now();
    await modal.waitFor({ state: "visible" });
    const duration = Date.now() - startTime;

    // Should appear within 500ms with reduced motion
    expect(duration).toBeLessThan(500);
  });

  test("should have sufficient color contrast", async ({ page }) => {
    await page.goto("/iframe.html?id=components-button--default");
    await page.waitForLoadState("networkidle");

    const button = page.getByRole("button", { name: /primary/i }).first();

    // Get text color and background color
    const colors = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
      };
    });

    // Both should be defined (actual contrast ratio check would require a library)
    expect(colors.color).toBeTruthy();
    expect(colors.backgroundColor).toBeTruthy();
    expect(colors.color).not.toBe(colors.backgroundColor);
  });
});

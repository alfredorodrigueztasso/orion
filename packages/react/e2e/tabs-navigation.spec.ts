import { test, expect } from "@playwright/test";

/**
 * E2E Test: Tabs Navigation
 *
 * Tests tab switching via click and keyboard.
 */
test.describe("Tabs Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-tabs--default");
    await page.waitForLoadState("networkidle");
  });

  test("should switch tabs on click", async ({ page }) => {
    // First tab should be active by default
    const tab1 = page.getByRole("tab", { name: /tab 1/i });
    await expect(tab1).toHaveAttribute("aria-selected", "true");

    // Click second tab
    const tab2 = page.getByRole("tab", { name: /tab 2/i });
    await tab2.click();

    // Second tab should now be active
    await expect(tab2).toHaveAttribute("aria-selected", "true");
    await expect(tab1).toHaveAttribute("aria-selected", "false");

    // Verify content changed
    const panel2 = page.getByRole("tabpanel", { name: /tab 2/i });
    await expect(panel2).toBeVisible();
  });

  test("should navigate tabs with arrow keys", async ({ page }) => {
    const tab1 = page.getByRole("tab", { name: /tab 1/i });
    const tab2 = page.getByRole("tab", { name: /tab 2/i });

    // Focus first tab
    await tab1.focus();
    await expect(tab1).toBeFocused();

    // Arrow right to next tab
    await page.keyboard.press("ArrowRight");
    await expect(tab2).toBeFocused();

    // Arrow left back to first tab
    await page.keyboard.press("ArrowLeft");
    await expect(tab1).toBeFocused();
  });

  test("should wrap focus at ends", async ({ page }) => {
    // Get all tabs
    const tabs = page.getByRole("tab");
    const tabCount = await tabs.count();
    const lastTab = tabs.nth(tabCount - 1);
    const firstTab = tabs.first();

    // Focus last tab
    await lastTab.focus();

    // Arrow right should wrap to first tab
    await page.keyboard.press("ArrowRight");
    await expect(firstTab).toBeFocused();

    // Arrow left should wrap to last tab
    await page.keyboard.press("ArrowLeft");
    await expect(lastTab).toBeFocused();
  });

  test("should show correct tab panel", async ({ page }) => {
    // Click tab 2
    const tab2 = page.getByRole("tab", { name: /tab 2/i });
    await tab2.click();

    // Verify panel 2 is visible and panel 1 is hidden
    const panel1 = page.getByRole("tabpanel").first();
    const panel2 = page.getByRole("tabpanel").nth(1);

    await expect(panel2).toBeVisible();
    await expect(panel1).toBeHidden();
  });
});

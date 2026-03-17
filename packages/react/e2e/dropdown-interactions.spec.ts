import { test, expect } from "@playwright/test";

/**
 * E2E Test: Dropdown Interactions
 *
 * Tests dropdown open/close, item selection, and keyboard navigation.
 */
test.describe("Dropdown Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-dropdown--default");
    await page.waitForLoadState("networkidle");
  });

  test("should open and close dropdown", async ({ page }) => {
    // Dropdown menu should be hidden initially
    const menu = page.getByRole("menu");
    await expect(menu).toBeHidden();

    // Click trigger
    await page.getByRole("button", { name: /menu/i }).click();

    // Menu should be visible
    await expect(menu).toBeVisible();

    // Click outside to close
    await page.mouse.click(10, 10);

    // Menu should be hidden
    await expect(menu).toBeHidden();
  });

  test("should select dropdown item", async ({ page }) => {
    // Open dropdown
    await page.getByRole("button", { name: /menu/i }).click();
    await expect(page.getByRole("menu")).toBeVisible();

    // Click first menu item
    const firstItem = page.getByRole("menuitem").first();
    await firstItem.click();

    // Menu should close after selection
    await expect(page.getByRole("menu")).toBeHidden();
  });

  test("should navigate dropdown with keyboard", async ({ page }) => {
    // Open dropdown with Enter key
    const trigger = page.getByRole("button", { name: /menu/i });
    await trigger.focus();
    await page.keyboard.press("Enter");

    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    // First item should be focused
    const firstItem = page.getByRole("menuitem").first();
    await expect(firstItem).toBeFocused();

    // Arrow down to next item
    await page.keyboard.press("ArrowDown");
    const secondItem = page.getByRole("menuitem").nth(1);
    await expect(secondItem).toBeFocused();

    // Arrow up back to first
    await page.keyboard.press("ArrowUp");
    await expect(firstItem).toBeFocused();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("should select item with Enter key", async ({ page }) => {
    // Open dropdown
    const trigger = page.getByRole("button", { name: /menu/i });
    await trigger.click();
    await expect(page.getByRole("menu")).toBeVisible();

    // Navigate to first item
    const firstItem = page.getByRole("menuitem").first();
    await firstItem.focus();

    // Press Enter to select
    await page.keyboard.press("Enter");

    // Menu should close
    await expect(page.getByRole("menu")).toBeHidden();
  });
});

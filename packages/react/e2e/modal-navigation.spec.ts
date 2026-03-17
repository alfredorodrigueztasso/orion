import { test, expect } from "@playwright/test";

/**
 * E2E Test: Modal Navigation
 *
 * Tests modal open/close, focus trap, and keyboard navigation.
 * Critical for accessibility and UX.
 */
test.describe("Modal Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--default");
    await page.waitForLoadState("networkidle");
  });

  test("should open and close modal", async ({ page }) => {
    // Modal should be closed initially
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Click trigger button
    await page.getByRole("button", { name: /open modal/i }).click();

    // Modal should be visible
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Click close button
    await page.getByRole("button", { name: /close/i }).first().click();

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test("should close modal with Escape key", async ({ page }) => {
    // Open modal
    await page.getByRole("button", { name: /open modal/i }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test("should trap focus inside modal", async ({ page }) => {
    // Open modal
    await page.getByRole("button", { name: /open modal/i }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Get focusable elements inside modal
    const closeButton = modal.getByRole("button", { name: /close/i }).first();
    const confirmButton = modal
      .getByRole("button", { name: /confirm/i })
      .first();

    // Close button should be focused initially
    await expect(closeButton).toBeFocused();

    // Tab forward
    await page.keyboard.press("Tab");
    await expect(confirmButton).toBeFocused();

    // Tab forward again should wrap to first focusable element
    await page.keyboard.press("Tab");
    await expect(closeButton).toBeFocused();

    // Shift+Tab should go backwards
    await page.keyboard.press("Shift+Tab");
    await expect(confirmButton).toBeFocused();
  });

  test("should close modal when clicking overlay", async ({ page }) => {
    // Open modal
    await page.getByRole("button", { name: /open modal/i }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Click overlay (outside modal content)
    // Get the modal's parent (overlay)
    const overlay = page
      .locator("[data-overlay]")
      .or(page.locator(".modal-overlay"))
      .first();

    // Click at a position outside the modal but inside the overlay
    await page.mouse.click(10, 10);

    // Wait a bit for the close animation
    await page.waitForTimeout(300);

    // Modal should be closed (or closing)
    // Use toBeHidden which waits for element to be gone
    await expect(modal).toBeHidden();
  });

  test("should prevent body scroll when modal is open", async ({ page }) => {
    // Get initial body overflow
    const initialOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });

    // Open modal
    await page.getByRole("button", { name: /open modal/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Body should have overflow hidden
    const modalOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(modalOverflow).toBe("hidden");

    // Close modal
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Body overflow should be restored
    const finalOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(finalOverflow).toBe(initialOverflow);
  });
});

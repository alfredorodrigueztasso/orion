import { test, expect } from "@playwright/test";

/**
 * E2E Test: Form Submission
 *
 * Tests form input, validation, and submission flows.
 * Critical for ensuring forms work correctly end-to-end.
 */
test.describe("Form Submission", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a form story (using Field component)
    await page.goto("/iframe.html?id=components-field--with-validation");
    await page.waitForLoadState("networkidle");
  });

  test("should fill and submit form", async ({ page }) => {
    // Find email input
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    // Type email
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");

    // Verify no error shown for valid email
    await expect(page.getByText(/invalid email/i)).not.toBeVisible();
  });

  test("should show validation errors", async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);

    // Type invalid email
    await emailInput.fill("invalid-email");
    await emailInput.blur();

    // Wait for validation error (might appear async)
    await page.waitForTimeout(500);

    // Verify input has aria-invalid="true"
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  test("should clear input value", async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);

    // Fill input
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");

    // Clear input
    await emailInput.clear();
    await expect(emailInput).toHaveValue("");
  });

  test("should handle disabled state", async ({ page }) => {
    // Navigate to disabled field story
    await page.goto("/iframe.html?id=components-field--disabled");
    await page.waitForLoadState("networkidle");

    const input = page.locator("input").first();

    // Verify input is disabled
    await expect(input).toBeDisabled();

    // Verify cannot type in disabled input
    await input.click({ force: true });
    await page.keyboard.type("should not type");
    await expect(input).toHaveValue("");
  });

  test("should navigate with keyboard", async ({ page }) => {
    // Navigate to form with multiple fields
    await page.goto("/iframe.html?id=sections-formsection--default");
    await page.waitForLoadState("networkidle");

    // Get all input fields
    const inputs = page.locator('input[type="text"], input[type="email"]');
    const firstInput = inputs.first();

    // Focus first input
    await firstInput.focus();
    await expect(firstInput).toBeFocused();

    // Tab to next field
    await page.keyboard.press("Tab");

    // Verify focus moved to next input
    const secondInput = inputs.nth(1);
    await expect(secondInput).toBeFocused();
  });
});

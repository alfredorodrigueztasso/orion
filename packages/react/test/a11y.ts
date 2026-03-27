/**
 * Accessibility (a11y) Testing Utilities
 *
 * Provides helpers for testing WCAG compliance using axe-core via vitest-axe.
 * All components should pass these accessibility checks.
 */

import { axe } from "vitest-axe";
import { expect } from "vitest";

/**
 * Check a DOM container for accessibility violations
 *
 * @param container - The DOM element or container to test
 * @param options - Optional axe configuration
 * @throws If accessibility violations are found
 *
 * @example
 * ```tsx
 * const { container } = render(<Button>Click me</Button>);
 * await expectNoA11yViolations(container);
 * ```
 */
export async function expectNoA11yViolations(
  container: Element | Document,
  options?: { runOnly?: string[] },
): Promise<void> {
  const results = await axe(container, options);

  // Check if there are any violations
  if (results.violations.length > 0) {
    // Format violations for better error messages
    const violationMessages = results.violations.map(
      (violation: any) =>
        `${violation.id}: ${violation.description}\n  ${violation.nodes
          .map((node: any) => node.html)
          .join("\n  ")}`,
    );
    throw new Error(
      `Accessibility violations found:\n${violationMessages.join("\n\n")}`,
    );
  }
}

/**
 * Check a DOM container and return violations for manual inspection
 *
 * Useful for debugging or when violations are expected and need to be addressed.
 *
 * @param container - The DOM element or container to test
 * @param options - Optional axe configuration
 * @returns Array of accessibility violations
 *
 * @example
 * ```tsx
 * const { container } = render(<ComplexComponent />);
 * const violations = await checkA11y(container);
 * console.log(violations);
 * ```
 */
export async function checkA11y(
  container: Element | Document,
  options?: { runOnly?: string[] },
): Promise<any[]> {
  const results = await axe(container, options);
  return results.violations;
}

/**
 * Test accessibility for a specific rule only
 *
 * @param container - The DOM element or container to test
 * @param ruleId - The axe rule ID to test (e.g., "color-contrast", "button-name")
 * @returns True if the rule passes, false otherwise
 *
 * @example
 * ```tsx
 * const { container } = render(<Button>Click me</Button>);
 * const hasGoodContrast = await testA11yRule(container, "color-contrast");
 * expect(hasGoodContrast).toBe(true);
 * ```
 */
export async function testA11yRule(
  container: Element | Document,
  ruleId: string,
): Promise<boolean> {
  const results = await axe(container, { runOnly: [ruleId] });
  return results.violations.length === 0;
}

/**
 * Configure vitest-axe for this test suite (if needed)
 *
 * Should be called in a describe block's beforeAll or setup.
 * Note: This is optional since expectNoA11yViolations works without it.
 */
export function setupA11y(): void {
  // vitest-axe matchers are registered in src/test/setup.ts
  // This function is kept for backward compatibility
}

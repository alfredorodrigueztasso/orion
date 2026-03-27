import { axe } from "vitest-axe";
import { expect } from "vitest";
import type { RenderResult } from "@testing-library/react";

/**
 * Run axe accessibility checks on a rendered component.
 * Usage: await expectNoA11yViolations(container); or await expectNoA11yViolations(renderResult);
 */
export async function expectNoA11yViolations(
  containerOrRenderResult: Element | Pick<RenderResult, "container">
) {
  // Handle both container directly and RenderResult object
  const container =
    "container" in containerOrRenderResult
      ? containerOrRenderResult.container
      : containerOrRenderResult;

  const results = await axe(container);
  // Check if there are any violations
  expect(results.violations).toEqual([]);
  // If violations exist, format them for better error messages
  if (results.violations.length > 0) {
    const violationMessages = results.violations.map(
      (v) =>
        `${v.id}: ${v.description}\n  ${v.nodes.map((n) => n.html).join("\n  ")}`,
    );
    throw new Error(
      `Accessibility violations found:\n${violationMessages.join("\n\n")}`,
    );
  }
}

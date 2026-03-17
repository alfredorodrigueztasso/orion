import { describe, it, expect } from "vitest";
import { DashboardTemplate } from "./DashboardTemplate";

describe("DashboardTemplate", () => {
  it("exports DashboardTemplate component", () => {
    expect(DashboardTemplate).toBeDefined();
  });

  it("has correct component name", () => {
    expect(DashboardTemplate.displayName || DashboardTemplate.name).toBe(
      "DashboardTemplate",
    );
  });

  it("is a forwardRef component", () => {
    expect(DashboardTemplate.$$typeof).toBeDefined();
  });
});

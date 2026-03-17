import { describe, it, expect } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("exports Breadcrumbs component", () => {
    expect(Breadcrumbs).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Breadcrumbs.displayName || Breadcrumbs.name).toBe("Breadcrumbs");
  });

  it("is a forwardRef component", () => {
    expect(Breadcrumbs.$$typeof).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { CTA } from "./CTA";

describe("CTA", () => {
  it("exports CTA component", () => {
    expect(CTA).toBeDefined();
  });

  it("has correct component name", () => {
    expect(CTA.displayName || CTA.name).toBe("CTA");
  });

  it("is a forwardRef component", () => {
    expect(CTA.$$typeof).toBeDefined();
  });
});

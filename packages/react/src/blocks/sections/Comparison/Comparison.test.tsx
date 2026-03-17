import { describe, it, expect } from "vitest";
import { Comparison } from "./Comparison";

describe("Comparison", () => {
  it("exports Comparison component", () => {
    expect(Comparison).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Comparison.displayName || Comparison.name).toBe("Comparison");
  });

  it("is a forwardRef component", () => {
    expect(Comparison.$$typeof).toBeDefined();
  });
});

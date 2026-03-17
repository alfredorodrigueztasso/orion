import { describe, it, expect } from "vitest";
import { Newsletter } from "./Newsletter";

describe("Newsletter", () => {
  it("exports Newsletter component", () => {
    expect(Newsletter).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Newsletter.displayName || Newsletter.name).toBe("Newsletter");
  });

  it("is a forwardRef component", () => {
    expect(Newsletter.$$typeof).toBeDefined();
  });
});

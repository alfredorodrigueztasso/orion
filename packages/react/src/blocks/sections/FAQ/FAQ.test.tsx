import { describe, it, expect } from "vitest";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("exports FAQ component", () => {
    expect(FAQ).toBeDefined();
  });

  it("has correct component name", () => {
    expect(FAQ.displayName || FAQ.name).toBe("FAQ");
  });

  it("is a forwardRef component", () => {
    expect(FAQ.$$typeof).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { Stats } from "./Stats";

describe("Stats", () => {
  it("exports Stats component", () => {
    expect(Stats).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Stats.displayName || Stats.name).toBe("Stats");
  });

  it("is a forwardRef component", () => {
    expect(Stats.$$typeof).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { Testimonials } from "./Testimonials";

describe("Testimonials", () => {
  it("exports Testimonials component", () => {
    expect(Testimonials).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Testimonials.displayName || Testimonials.name).toBe("Testimonials");
  });

  it("is a forwardRef component", () => {
    expect(Testimonials.$$typeof).toBeDefined();
  });
});

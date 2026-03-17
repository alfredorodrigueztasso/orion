import { describe, it, expect } from "vitest";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  it("exports Stepper component", () => {
    expect(Stepper).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Stepper.displayName || Stepper.name).toBe("Stepper");
  });

  it("is a forwardRef component", () => {
    expect(Stepper.$$typeof).toBeDefined();
  });
});

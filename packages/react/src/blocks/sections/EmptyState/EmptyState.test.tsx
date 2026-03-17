import { describe, it, expect } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("exports EmptyState component", () => {
    expect(EmptyState).toBeDefined();
  });

  it("has correct component name", () => {
    expect(EmptyState.displayName || EmptyState.name).toBe("EmptyState");
  });

  it("is a forwardRef component", () => {
    expect(EmptyState.$$typeof).toBeDefined();
  });
});

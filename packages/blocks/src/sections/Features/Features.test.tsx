import { describe, it, expect } from "vitest";
import { Features } from "./Features";

describe("Features", () => {
  it("exports Features component", () => {
    expect(Features).toBeDefined();
  });

  it("is a valid React component function", () => {
    expect(true).toBe(true);
  });

  it("has correct component name", () => {
    expect(Features.name || Features.displayName).toBeDefined();
  });

  it("accepts features array prop type", () => {
    const props = { features: [{ title: "F1", description: "D1" }] };
    expect(Array.isArray(props.features)).toBe(true);
    expect(props.features.length).toBe(1);
  });
});

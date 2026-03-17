import { describe, it, expect } from "vitest";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("exports Gallery component", () => {
    expect(Gallery).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Gallery.displayName || Gallery.name).toBe("Gallery");
  });

  it("is a forwardRef component", () => {
    expect(Gallery.$$typeof).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { CarouselSection } from "./CarouselSection";

describe("CarouselSection", () => {
  it("exports CarouselSection component", () => {
    expect(CarouselSection).toBeDefined();
  });

  it("has correct component name", () => {
    expect(CarouselSection.displayName || CarouselSection.name).toBe(
      "CarouselSection",
    );
  });

  it("is a forwardRef component", () => {
    expect(CarouselSection.$$typeof).toBeDefined();
  });
});

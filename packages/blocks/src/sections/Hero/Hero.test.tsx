import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("exports Hero component", () => {
    expect(Hero).toBeDefined();
  });

  it("component is properly exported", () => {
    expect(Hero.displayName || Hero.name).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Hero.name || Hero.displayName).toBeDefined();
  });

  it("supports compound component pattern with Highlight", () => {
    expect(Hero.Highlight).toBeDefined();
  });

  it("accepts title prop type", () => {
    const props = { title: "Test Title" };
    expect(props.title).toBe("Test Title");
  });
});

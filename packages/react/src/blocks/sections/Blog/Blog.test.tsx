import { describe, it, expect } from "vitest";
import { Blog } from "./Blog";

describe("Blog", () => {
  it("exports Blog component", () => {
    expect(Blog).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Blog.displayName || Blog.name).toBe("Blog");
  });

  it("is a forwardRef component", () => {
    expect(Blog.$$typeof).toBeDefined();
  });
});

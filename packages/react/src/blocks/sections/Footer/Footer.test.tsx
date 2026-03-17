import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("exports Footer component", () => {
    expect(Footer).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Footer.displayName || Footer.name).toBe("Footer");
  });

  it("is a forwardRef component", () => {
    expect(Footer.$$typeof).toBeDefined();
  });
});

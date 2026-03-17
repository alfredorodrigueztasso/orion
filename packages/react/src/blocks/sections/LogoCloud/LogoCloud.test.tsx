import { describe, it, expect } from "vitest";
import { LogoCloud } from "./LogoCloud";

describe("LogoCloud", () => {
  it("exports LogoCloud component", () => {
    expect(LogoCloud).toBeDefined();
  });

  it("has correct component name", () => {
    expect(LogoCloud.displayName || LogoCloud.name).toBe("LogoCloud");
  });

  it("is a forwardRef component", () => {
    expect(LogoCloud.$$typeof).toBeDefined();
  });
});

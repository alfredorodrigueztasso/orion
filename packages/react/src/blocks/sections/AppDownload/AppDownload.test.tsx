import { describe, it, expect } from "vitest";
import { AppDownload } from "./AppDownload";

describe("AppDownload", () => {
  it("exports AppDownload component", () => {
    expect(AppDownload).toBeDefined();
  });

  it("has correct component name", () => {
    expect(AppDownload.displayName || AppDownload.name).toBe("AppDownload");
  });

  it("is a forwardRef component", () => {
    expect(AppDownload.$$typeof).toBeDefined();
  });
});

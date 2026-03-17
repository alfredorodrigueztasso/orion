import { describe, it, expect } from "vitest";
import { LoginTemplate } from "./LoginTemplate";

describe("LoginTemplate", () => {
  it("exports LoginTemplate component", () => {
    expect(LoginTemplate).toBeDefined();
  });

  it("has correct component name", () => {
    expect(LoginTemplate.displayName || LoginTemplate.name).toBe(
      "LoginTemplate",
    );
  });

  it("is a forwardRef component", () => {
    expect(LoginTemplate.$$typeof).toBeDefined();
  });
});

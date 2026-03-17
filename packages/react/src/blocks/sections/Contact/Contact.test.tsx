import { describe, it, expect } from "vitest";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("exports Contact component", () => {
    expect(Contact).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Contact.displayName || Contact.name).toBe("Contact");
  });

  it("is a forwardRef component", () => {
    expect(Contact.$$typeof).toBeDefined();
  });
});

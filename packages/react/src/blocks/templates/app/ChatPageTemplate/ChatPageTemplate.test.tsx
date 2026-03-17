import { describe, it, expect } from "vitest";
import { ChatPageTemplate } from "./ChatPageTemplate";

describe("ChatPageTemplate", () => {
  it("exports ChatPageTemplate component", () => {
    expect(ChatPageTemplate).toBeDefined();
  });

  it("has correct component name", () => {
    expect(ChatPageTemplate.displayName || ChatPageTemplate.name).toBe(
      "ChatPageTemplate",
    );
  });

  it("is a forwardRef component", () => {
    expect(ChatPageTemplate.$$typeof).toBeDefined();
  });
});

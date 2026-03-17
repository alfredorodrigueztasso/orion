import { describe, it, expect } from "vitest";
import { KanbanPageTemplate } from "./KanbanPageTemplate";

describe("KanbanPageTemplate", () => {
  it("exports KanbanPageTemplate component", () => {
    expect(KanbanPageTemplate).toBeDefined();
  });

  it("has correct component name", () => {
    expect(KanbanPageTemplate.displayName || KanbanPageTemplate.name).toBe(
      "KanbanPageTemplate",
    );
  });

  it("is a forwardRef component", () => {
    expect(KanbanPageTemplate.$$typeof).toBeDefined();
  });
});

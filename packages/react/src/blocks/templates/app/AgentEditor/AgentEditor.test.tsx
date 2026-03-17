import { describe, it, expect } from "vitest";
import { AgentEditor } from "./AgentEditor";

describe("AgentEditor", () => {
  it("exports AgentEditor component", () => {
    expect(AgentEditor).toBeDefined();
  });

  it("has correct component name", () => {
    expect(AgentEditor.displayName || AgentEditor.name).toBe("AgentEditor");
  });

  it("is a forwardRef component", () => {
    expect(AgentEditor.$$typeof).toBeDefined();
  });
});

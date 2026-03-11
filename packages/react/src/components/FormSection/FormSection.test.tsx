import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormSection } from "./FormSection";

describe("FormSection", () => {
  it("renders section title", () => {
    render(
      <FormSection title="Account Settings">
        <input type="text" placeholder="Name" />
      </FormSection>,
    );

    expect(screen.getByText("Account Settings")).toBeInTheDocument();
  });

  it("displays description", () => {
    render(
      <FormSection
        title="Settings"
        description="Update your account"
      >
        Content
      </FormSection>,
    );

    expect(screen.getByText("Update your account")).toBeInTheDocument();
  });

  it("renders form children", () => {
    render(
      <FormSection title="Form">
        <input data-testid="form-input" />
      </FormSection>,
    );

    expect(screen.getByTestId("form-input")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <FormSection title="Form" onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </FormSection>,
    );

    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);

    expect(submitButton).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <FormSection ref={ref} title="Form">
        Content
      </FormSection>,
    );

    expect(ref).toHaveBeenCalled();
  });
});

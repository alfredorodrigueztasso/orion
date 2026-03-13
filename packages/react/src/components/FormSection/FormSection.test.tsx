import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormSection } from "./FormSection";
import { Settings, AlertCircle } from "lucide-react";

describe("FormSection", () => {
  describe("rendering", () => {
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
        <FormSection title="Settings" description="Update your account">
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

    it("renders with icon prop", () => {
      render(
        <FormSection title="Form" icon={<Settings size={20} />}>
          Content
        </FormSection>,
      );

      expect(screen.getByText("Form")).toBeInTheDocument();
    });

    it("renders actions when provided", () => {
      render(
        <FormSection title="Form" actions={<button>Save</button>}>
          Content
        </FormSection>,
      );

      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  describe("variants", () => {
    it("applies default variant", () => {
      const { container } = render(
        <FormSection title="Form">Content</FormSection>,
      );

      const section = container.firstChild as HTMLElement;
      expect(section.className).toMatch(/formSection/);
    });

    it("applies divider class when prop is true", () => {
      const { container } = render(
        <FormSection title="Form" divider>
          Content
        </FormSection>,
      );

      const section = container.firstChild as HTMLElement;
      expect(section.className).toMatch(/divider/);
    });

    it("applies disabled class when prop is true", () => {
      const { container } = render(
        <FormSection title="Form" disabled>
          Content
        </FormSection>,
      );

      const section = container.firstChild as HTMLElement;
      expect(section.className).toMatch(/disabled/);
    });
  });

  describe("collapsible", () => {
    it("does not show collapse icon by default", () => {
      const { container } = render(
        <FormSection title="Form">Content</FormSection>,
      );

      const svg = container.querySelector("svg");
      expect(svg).not.toBeInTheDocument();
    });

    it("renders as button when collapsible is true", () => {
      const { container } = render(
        <FormSection title="Form" collapsible>
          Content
        </FormSection>,
      );

      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "button");
    });

    it("renders as div when not collapsible", () => {
      const { container } = render(
        <FormSection title="Form">Content</FormSection>,
      );

      const header = container.querySelector("[class*='header']");
      expect(header?.tagName).toBe("DIV");
    });

    it("toggles collapsed state on header click", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <FormSection title="Form" collapsible defaultCollapsed={false}>
          <div>Content</div>
        </FormSection>,
      );

      const button = container.querySelector("button");
      expect(screen.getByText("Content")).toBeInTheDocument();

      await user.click(button!);
      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      await user.click(button!);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("starts collapsed when defaultCollapsed is true", () => {
      render(
        <FormSection title="Form" collapsible defaultCollapsed={true}>
          <div>Content</div>
        </FormSection>,
      );

      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("starts expanded when defaultCollapsed is false", () => {
      render(
        <FormSection title="Form" collapsible defaultCollapsed={false}>
          <div>Content</div>
        </FormSection>,
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("sets aria-expanded correctly", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <FormSection title="Form" collapsible defaultCollapsed={false}>
          Content
        </FormSection>,
      );

      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-expanded", "true");

      await user.click(button!);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("FormSection.Group", () => {
    it("renders group with single column", () => {
      render(
        <FormSection title="Form">
          <FormSection.Group label="Personal Info">
            <input type="text" placeholder="Name" />
          </FormSection.Group>
        </FormSection>,
      );

      expect(screen.getByText("Personal Info")).toBeInTheDocument();
    });

    it("renders group label", () => {
      render(
        <FormSection title="Form">
          <FormSection.Group label="Contact">Content</FormSection.Group>
        </FormSection>,
      );

      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders group help text", () => {
      render(
        <FormSection title="Form">
          <FormSection.Group
            label="Settings"
            helpText="Configure your preferences"
          >
            Content
          </FormSection.Group>
        </FormSection>,
      );

      expect(
        screen.getByText("Configure your preferences"),
      ).toBeInTheDocument();
    });

    it("applies column classes", () => {
      const { container } = render(
        <FormSection title="Form">
          <FormSection.Group columns={2}>Content</FormSection.Group>
        </FormSection>,
      );

      const group = container.querySelector("[class*='columns-2']");
      expect(group).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <FormSection title="Form">
          <FormSection.Group ref={ref} label="Test">
            Content
          </FormSection.Group>
        </FormSection>,
      );

      expect(ref).toHaveBeenCalled();
    });

    it("supports different column configurations", () => {
      const { container } = render(
        <FormSection title="Form">
          <FormSection.Group columns={3}>Content</FormSection.Group>
        </FormSection>,
      );

      const group = container.querySelector("[class*='columns-3']");
      expect(group).toBeInTheDocument();
    });
  });

  describe("FormSection.Actions", () => {
    it("renders actions container", () => {
      render(
        <FormSection
          title="Form"
          actions={
            <FormSection.Actions>
              <button>Save</button>
            </FormSection.Actions>
          }
        >
          Content
        </FormSection>,
      );

      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("applies default alignment (end)", () => {
      const { container } = render(
        <FormSection
          title="Form"
          actions={
            <FormSection.Actions>
              <button>Save</button>
            </FormSection.Actions>
          }
        >
          Content
        </FormSection>,
      );

      const actions = container.querySelector("[class*='align-end']");
      expect(actions).toBeInTheDocument();
    });

    it("applies custom alignment", () => {
      const { container } = render(
        <FormSection
          title="Form"
          actions={
            <FormSection.Actions align="start">
              <button>Cancel</button>
            </FormSection.Actions>
          }
        >
          Content
        </FormSection>,
      );

      const actions = container.querySelector("[class*='align-start']");
      expect(actions).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <FormSection title="Form">
          <FormSection.Actions ref={ref}>
            <button>Save</button>
          </FormSection.Actions>
        </FormSection>,
      );

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("complex layouts", () => {
    it("renders with multiple groups and actions", () => {
      render(
        <FormSection
          title="Account Settings"
          description="Update your profile"
          actions={<button>Save Changes</button>}
        >
          <FormSection.Group label="Basic Info" columns={2}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </FormSection.Group>
          <FormSection.Group label="Contact" helpText="How to reach you">
            <input type="email" placeholder="Email" />
          </FormSection.Group>
        </FormSection>,
      );

      expect(screen.getByText("Account Settings")).toBeInTheDocument();
      expect(screen.getByText("Basic Info")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
      expect(screen.getByText("Save Changes")).toBeInTheDocument();
    });

    it("renders collapsible with icon and actions", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <FormSection
          title="Advanced Settings"
          icon={<Settings size={20} />}
          collapsible
          defaultCollapsed={false}
          actions={<button>Apply</button>}
        >
          <input type="checkbox" />
        </FormSection>,
      );

      expect(screen.getByText("Advanced Settings")).toBeInTheDocument();
      expect(screen.getByText("Apply")).toBeInTheDocument();

      const buttons = container.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);

      const headerButton = buttons[0];
      await user.click(headerButton);

      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref correctly on FormSection", () => {
      const ref = vi.fn();
      render(
        <FormSection ref={ref} title="Form">
          Content
        </FormSection>,
      );

      expect(ref).toHaveBeenCalled();
    });

    it("applies custom className", () => {
      const { container } = render(
        <FormSection title="Form" className="custom-class">
          Content
        </FormSection>,
      );

      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("custom-class");
    });
  });

  describe("edge cases", () => {
    it("renders without description", () => {
      render(<FormSection title="Form">Content</FormSection>);

      expect(screen.getByText("Form")).toBeInTheDocument();
      expect(screen.queryByText("undefined")).not.toBeInTheDocument();
    });

    it("renders without icon", () => {
      const { container } = render(
        <FormSection title="Form">Content</FormSection>,
      );

      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBe(0);
    });

    it("renders without actions", () => {
      render(<FormSection title="Form">Content</FormSection>);

      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });

    it("handles empty children gracefully", () => {
      const { container } = render(<FormSection title="Form" />);

      expect(screen.getByText("Form")).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles Group without label", () => {
      render(
        <FormSection title="Form">
          <FormSection.Group>
            <input type="text" />
          </FormSection.Group>
        </FormSection>,
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("handles Group without helpText", () => {
      render(
        <FormSection title="Form">
          <FormSection.Group label="Info">Content</FormSection.Group>
        </FormSection>,
      );

      expect(screen.getByText("Info")).toBeInTheDocument();
    });
  });
});

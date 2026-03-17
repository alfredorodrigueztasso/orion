/**
 * Component Render Performance Benchmarks
 *
 * Measures render performance of critical components to ensure they meet
 * performance budgets (< 16ms for initial render, < 8ms for re-render).
 *
 * Usage:
 *   npm run bench
 */

import { bench, describe } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Dropdown } from "../components/Dropdown";
import { Tabs } from "../components/Tabs";

describe("Component Render Performance", () => {
  describe("Button", () => {
    bench("renders primary button", () => {
      render(<Button variant="primary">Click me</Button>);
    });

    bench("renders with icon", () => {
      render(
        <Button variant="primary" icon={<span>🔍</span>}>
          Search
        </Button>,
      );
    });

    bench("renders all variants", () => {
      render(
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </>,
      );
    });
  });

  describe("Field", () => {
    bench("renders text input", () => {
      render(<Field label="Email" type="email" placeholder="Enter email" />);
    });

    bench("renders with error", () => {
      render(<Field label="Email" type="email" error="Invalid email" />);
    });

    bench("renders with icon", () => {
      render(<Field label="Search" leftIcon={<span>🔍</span>} />);
    });
  });

  describe("Card", () => {
    bench("renders simple card", () => {
      render(
        <Card>
          <Card.Header>Title</Card.Header>
          <Card.Body>Content</Card.Body>
        </Card>,
      );
    });

    bench("renders full card with footer", () => {
      render(
        <Card>
          <Card.Header>Title</Card.Header>
          <Card.Body>
            <p>This is card content with multiple elements.</p>
            <Button>Action</Button>
          </Card.Body>
          <Card.Footer>Footer text</Card.Footer>
        </Card>,
      );
    });
  });

  describe("Modal", () => {
    bench("renders closed modal", () => {
      render(
        <Modal open={false} onClose={() => {}}>
          <Modal.Header>Title</Modal.Header>
          <Modal.Body>Content</Modal.Body>
        </Modal>,
      );
    });

    bench("renders open modal", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header>Title</Modal.Header>
          <Modal.Body>Content</Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Confirm</Button>
            <Button variant="secondary">Cancel</Button>
          </Modal.Footer>
        </Modal>,
      );
    });
  });

  describe("Dropdown", () => {
    bench("renders closed dropdown", () => {
      render(
        <Dropdown
          trigger={<Button variant="secondary">Menu</Button>}
          items={[
            { id: "1", label: "Item 1", onClick: () => {} },
            { id: "2", label: "Item 2", onClick: () => {} },
          ]}
        />,
      );
    });
  });

  describe("Tabs", () => {
    bench("renders tabs with 3 items", () => {
      render(
        <Tabs
          tabs={[
            { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
            { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
            { id: "tab3", label: "Tab 3", content: <div>Content 3</div> },
          ]}
          defaultTab="tab1"
        />,
      );
    });

    bench("renders tabs with 10 items", () => {
      render(
        <Tabs
          tabs={Array.from({ length: 10 }, (_, i) => ({
            id: `tab${i + 1}`,
            label: `Tab ${i + 1}`,
            content: <div>Content {i + 1}</div>,
          }))}
          defaultTab="tab1"
        />,
      );
    });
  });

  describe("Multiple Components", () => {
    bench("renders complex form", () => {
      render(
        <Card>
          <Card.Header>Login Form</Card.Header>
          <Card.Body>
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />
            <Button variant="primary">Submit</Button>
          </Card.Body>
        </Card>,
      );
    });

    bench("renders list of 20 cards", () => {
      render(
        <>
          {Array.from({ length: 20 }, (_, i) => (
            <Card key={i}>
              <Card.Header>Card {i + 1}</Card.Header>
              <Card.Body>Content for card {i + 1}</Card.Body>
            </Card>
          ))}
        </>,
      );
    });
  });
});

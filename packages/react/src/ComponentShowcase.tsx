/**
 * Component Showcase
 *
 * Demonstration page showing all Orion React components.
 */

import React, { useState } from "react";
import { Button } from "./components/Button";
import { Field } from "./components/Field";
import { Select } from "./components/Select";
import { Switch } from "./components/Switch";
import { Checkbox } from "./components/Checkbox";
import { Radio } from "./components/Radio";
import { Textarea } from "./components/Textarea";
import { Card } from "./components/Card";
import { Badge } from "./components/Badge";
import { Alert } from "./components/Alert";
import { Spinner } from "./components/Spinner";
import { ProgressBar } from "./components/ProgressBar";
import { Tooltip } from "./components/Tooltip";
import { Avatar } from "./components/Avatar";
import { Table } from "./components/Table";
import { Tabs } from "./components/Tabs";
import { Breadcrumb } from "./components/Breadcrumb";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";
import { ThemeController } from "./components/ThemeController";
import { useTheme } from "./hooks";
import type { TableColumn } from "./components/Table";

// Sample data for Table
interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
  },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "active" },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@example.com",
    status: "inactive",
  },
];

const tableColumns: TableColumn<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "status",
    header: "Status",
    cell: (user) => (
      <Badge variant={user.status === "active" ? "success" : "secondary"}>
        {user.status}
      </Badge>
    ),
    align: "center",
  },
];

export const ComponentShowcase: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-base)" }}>
      {/* Navbar */}
      <Navbar sticky bordered>
        <Navbar.Brand>
          <span style={{ fontSize: "24px" }}>⚡</span>
          Orion Design System
        </Navbar.Brand>

        <Navbar.Nav>
          <Navbar.Link href="#components" active>
            Components
          </Navbar.Link>
          <Navbar.Link href="#docs">Documentation</Navbar.Link>
          <Navbar.Link href="#examples">Examples</Navbar.Link>
        </Navbar.Nav>

        <Navbar.Actions>
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
          <Button size="sm">Get Started</Button>
        </Navbar.Actions>
      </Navbar>

      {/* Main Content */}
      <div
        style={{
          padding: "var(--spacing-8) var(--spacing-4)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-8)" }}>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--text-primary)",
              marginBottom: "var(--spacing-2)",
            }}
          >
            Component Showcase
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
            }}
          >
            All 21 React components from the Orion Design System
          </p>

          {/* Breadcrumb */}
          <div style={{ marginTop: "var(--spacing-4)" }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Components", href: "/components" },
                { label: "Showcase" },
              ]}
              showHomeIcon
            />
          </div>
        </div>

        {/* Theme & Brand Controls */}
        <ThemeController
          showBrandSelector
          showThemeToggle
          showSummary
          style={{ marginBottom: "var(--spacing-6)" }}
        />

        {/* 1. BUTTONS */}
        <Section
          title="Buttons"
          description="Action triggers with multiple variants and sizes"
        >
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-3)",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        {/* 2. FORM CONTROLS */}
        <Section
          title="Form Controls"
          description="Input fields and selection components"
        >
          <div
            style={{
              display: "grid",
              gap: "var(--spacing-4)",
              maxWidth: "600px",
            }}
          >
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              helperText="We'll never share your email"
            />
            <Field
              label="Password"
              type="password"
              error="Password must be at least 8 characters"
            />
            <Select
              label="Country"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { label: "United States", value: "us" },
                { label: "Canada", value: "ca" },
                { label: "Mexico", value: "mx" },
              ]}
            />
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              maxLength={200}
              showCounter
              helperText="Maximum 200 characters"
            />
          </div>
        </Section>

        {/* 3. CHECKBOX & RADIO */}
        <Section title="Checkbox & Radio" description="Selection controls">
          <div style={{ display: "grid", gap: "var(--spacing-4)" }}>
            <div>
              <h4
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--text-primary)",
                  marginBottom: "var(--spacing-2)",
                }}
              >
                Checkbox
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-2)",
                }}
              >
                <Checkbox
                  label="Accept terms and conditions"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
                <Checkbox label="Subscribe to newsletter" />
                <Checkbox label="Disabled option" disabled />
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--text-primary)",
                  marginBottom: "var(--spacing-2)",
                }}
              >
                Radio
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-2)",
                }}
              >
                <Radio
                  name="plan"
                  value="option1"
                  label="Free Plan"
                  checked={radioValue === "option1"}
                  onChange={(e) => setRadioValue(e.target.value)}
                />
                <Radio
                  name="plan"
                  value="option2"
                  label="Pro Plan ($9/mo)"
                  checked={radioValue === "option2"}
                  onChange={(e) => setRadioValue(e.target.value)}
                />
                <Radio
                  name="plan"
                  value="option3"
                  label="Enterprise Plan"
                  checked={radioValue === "option3"}
                  onChange={(e) => setRadioValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. SWITCH */}
        <Section title="Switch" description="Toggle control">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-3)",
            }}
          >
            <Switch
              label="Enable notifications"
              checked={switchChecked}
              onChange={(e) => setSwitchChecked(e.target.checked)}
            />
            <Switch label="Auto-save" defaultChecked />
            <Switch label="Disabled" disabled />
          </div>
        </Section>

        {/* 5. CARDS */}
        <Section title="Cards" description="Container components with variants">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--spacing-4)",
            }}
          >
            <Card>
              <Card.Header>Base Card</Card.Header>
              <Card.Body>This is a base card with default styling.</Card.Body>
              <Card.Footer>
                <Button size="sm" variant="secondary">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </Card.Footer>
            </Card>

            <Card variant="glass">
              <Card.Header>Glass Card</Card.Header>
              <Card.Body>
                Semi-transparent card with backdrop blur effect.
              </Card.Body>
            </Card>

            <Card variant="elevated">
              <Card.Header>Elevated Card</Card.Header>
              <Card.Body>Card with shadow elevation for depth.</Card.Body>
            </Card>
          </div>
        </Section>

        {/* 6. BADGES */}
        <Section title="Badges" description="Status indicators and labels">
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-3)",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="secondary">Neutral</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="lg">Large</Badge>
            <Badge dot>With Dot</Badge>
          </div>
        </Section>

        {/* 7. ALERTS */}
        <Section title="Alerts" description="Feedback messages">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-3)",
            }}
          >
            <Alert variant="info" title="Information">
              This is an informational message for the user.
            </Alert>
            <Alert variant="success" title="Success">
              Your changes have been saved successfully!
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review your information before proceeding.
            </Alert>
            <Alert variant="error" title="Error" dismissible>
              An error occurred while processing your request.
            </Alert>
          </div>
        </Section>

        {/* 8. SPINNERS */}
        <Section title="Spinners" description="Loading indicators">
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              alignItems: "center",
            }}
          >
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
            <Spinner variant="secondary" />
            <Spinner showLabel label="Loading..." />
          </div>
        </Section>

        {/* 9. PROGRESS BARS */}
        <Section title="Progress Bars" description="Progress indicators">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-4)",
            }}
          >
            <ProgressBar value={30} />
            <ProgressBar value={60} variant="success" showLabel />
            <ProgressBar value={85} variant="warning" showLabel />
            <ProgressBar value={100} variant="error" />
            <ProgressBar indeterminate />
          </div>
        </Section>

        {/* 10. AVATARS */}
        <Section title="Avatars" description="User profile images">
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              alignItems: "center",
            }}
          >
            <Avatar initials="AB" />
            <Avatar initials="CD" size="sm" />
            <Avatar initials="EF" size="lg" />
            <Avatar initials="GH" size="xl" status="online" />
            <Avatar initials="IJ" status="away" />
            <Avatar initials="KL" status="busy" />
          </div>
        </Section>

        {/* 11. TOOLTIPS */}
        <Section title="Tooltips" description="Contextual information on hover">
          <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
            <Tooltip content="Tooltip on top" placement="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" placement="right">
              <Button variant="secondary">Right</Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" placement="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" placement="left">
              <Button variant="secondary">Left</Button>
            </Tooltip>
          </div>
        </Section>

        {/* 12. TABS */}
        <Section title="Tabs" description="Content organization">
          <Tabs
            tabs={[
              {
                id: "tab1",
                label: "Overview",
                content: (
                  <div style={{ padding: "var(--spacing-4)" }}>
                    <h3
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--text-primary)",
                        marginBottom: "var(--spacing-2)",
                      }}
                    >
                      Overview
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      This is the overview tab content.
                    </p>
                  </div>
                ),
              },
              {
                id: "tab2",
                label: "Details",
                badge: "5",
                content: (
                  <div style={{ padding: "var(--spacing-4)" }}>
                    <h3
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--text-primary)",
                        marginBottom: "var(--spacing-2)",
                      }}
                    >
                      Details
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      This is the details tab with a badge indicator.
                    </p>
                  </div>
                ),
              },
              {
                id: "tab3",
                label: "Settings",
                content: (
                  <div style={{ padding: "var(--spacing-4)" }}>
                    <h3
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--text-primary)",
                        marginBottom: "var(--spacing-2)",
                      }}
                    >
                      Settings
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      This is the settings tab content.
                    </p>
                  </div>
                ),
              },
            ]}
            activeTab={selectedTab}
            onChange={setSelectedTab}
          />
        </Section>

        {/* 13. TABLE */}
        <Section title="Table" description="Data display with sorting">
          <Table
            columns={tableColumns}
            data={sampleUsers}
            striped
            hoverable
            onRowClick={(user) => alert(`Clicked: ${user.name}`)}
          />
        </Section>

        {/* 14. MODAL */}
        <Section title="Modal" description="Dialog overlay">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
            <Modal.Header>Modal Title</Modal.Header>
            <Modal.Body>
              <p style={{ color: "var(--text-primary)" }}>
                This is a modal dialog with a header, body, and footer. You can
                close it by clicking the X button, pressing Escape, or clicking
                the backdrop.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </Modal.Footer>
          </Modal>
        </Section>
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: "var(--spacing-8) var(--spacing-4)",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
          color: "var(--text-secondary)",
        }}
      >
        <p>Orion Design System • Built with Chain of Truth Architecture</p>
        <p
          style={{ fontSize: "var(--text-sm)", marginTop: "var(--spacing-2)" }}
        >
          21 Components • TypeScript • CSS Modules • Token-Based
        </p>
      </footer>
    </div>
  );
};

// Helper Section Component
interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => {
  return (
    <section style={{ marginBottom: "var(--spacing-8)" }}>
      <div style={{ marginBottom: "var(--spacing-4)" }}>
        <h2
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-1)",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--text-secondary)",
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          padding: "var(--spacing-6)",
          background: "var(--surface-subtle)",
          borderRadius: "var(--radius-container)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {children}
      </div>
    </section>
  );
};

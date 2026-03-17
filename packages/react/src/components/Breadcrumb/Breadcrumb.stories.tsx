import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";
import { Button } from "../Button/Button";
import type { BreadcrumbItem } from "./Breadcrumb.types";
import {
  Home,
  Settings,
  User,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Users,
} from "lucide-react";

const meta = {
  title: "Components/Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    separator: {
      control: "select",
      options: ["chevron", "slash", "custom"],
      description: "Separator type between breadcrumb items",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Breadcrumb size",
    },
    showHomeIcon: {
      control: "boolean",
      description: "Show home icon for first item",
    },
    maxItems: {
      control: "number",
      description: "Maximum items to display before collapsing",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Laptop", href: "/products/laptop" },
  { label: "MacBook Pro" },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithHomeIcon: Story = {
  args: {
    items: basicItems,
    showHomeIcon: true,
  },
};

export const SlashSeparator: Story = {
  args: {
    items: basicItems,
    separator: "slash",
  },
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: "custom",
    customSeparator: (
      <ChevronRight size={14} style={{ color: "var(--text-tertiary)" }} />
    ),
  },
};

export const SmallSize: Story = {
  args: {
    items: basicItems,
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    items: basicItems,
    size: "lg",
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Home", href: "/", icon: <Home size={16} /> },
      { label: "Settings", href: "/settings", icon: <Settings size={16} /> },
      { label: "Profile", icon: <User size={16} /> },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Electronics", href: "/electronics" },
      { label: "Computers", href: "/electronics/computers" },
      { label: "Laptops", href: "/electronics/computers/laptops" },
      { label: "Gaming", href: "/electronics/computers/laptops/gaming" },
      {
        label: "High Performance",
        href: "/electronics/computers/laptops/gaming/high-performance",
      },
      { label: "MSI GT77 Titan" },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CollapsedPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Electronics", href: "/electronics" },
      { label: "Computers", href: "/electronics/computers" },
      { label: "Laptops", href: "/electronics/computers/laptops" },
      { label: "Gaming", href: "/electronics/computers/laptops/gaming" },
      {
        label: "High Performance",
        href: "/electronics/computers/laptops/gaming/high-performance",
      },
      { label: "MSI GT77 Titan" },
    ],
    maxItems: 4,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <h4
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Collapsed to 4 items (shows first, last 3, and ellipsis)
        </h4>
        <Story />
      </div>
    ),
  ],
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "Dashboard" }],
  },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const ECommerceProduct: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Men", href: "/men" },
      { label: "Clothing", href: "/men/clothing" },
      { label: "T-Shirts", href: "/men/clothing/tshirts" },
      { label: "Vintage Band T-Shirt" },
    ],
    showHomeIcon: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "700px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
        }}
      >
        <Story />
        <div style={{ marginTop: "var(--spacing-8)" }}>
          <h1
            style={{
              margin: "0 0 var(--spacing-2) 0",
              fontSize: "var(--font-size-24)",
              fontWeight: "var(--font-weight-bold)",
            }}
          >
            Vintage Band T-Shirt
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-size-18)",
              color: "var(--text-brand)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            $29.99
          </p>
        </div>
      </div>
    ),
  ],
};

export const Documentation: Story = {
  args: {
    items: [
      { label: "Docs", href: "/docs" },
      { label: "Components", href: "/docs/components" },
      { label: "Navigation", href: "/docs/components/navigation" },
      { label: "Breadcrumb" },
    ],
    separator: "slash",
    size: "sm",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "800px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
        }}
      >
        <Story />
        <div style={{ marginTop: "var(--spacing-8)" }}>
          <h1
            style={{
              margin: "0 0 var(--spacing-4) 0",
              fontSize: "var(--font-size-24)",
              fontWeight: "var(--font-weight-bold)",
            }}
          >
            Breadcrumb
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-size-16)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Navigation breadcrumbs showing current page location in site
            hierarchy.
          </p>
        </div>
      </div>
    ),
  ],
};

export const Dashboard: Story = {
  args: { items: basicItems },
  render: () => {
    const dashboardItems: BreadcrumbItem[] = [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard size={16} />,
      },
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: <TrendingUp size={16} />,
      },
      { label: "Revenue Report", icon: <DollarSign size={16} /> },
    ];

    return (
      <div
        style={{
          width: "900px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
        }}
      >
        <Breadcrumb items={dashboardItems} />
        <div style={{ marginTop: "var(--spacing-8)" }}>
          <h2
            style={{
              margin: "0 0 var(--spacing-6) 0",
              fontSize: "var(--font-size-24)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Revenue Report
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--spacing-4)",
            }}
          >
            {["Total Revenue", "Monthly Growth", "Active Users"].map(
              (metric) => (
                <div
                  key={metric}
                  style={{
                    padding: "var(--spacing-6)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--surface-subtle)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--font-size-24)",
                      fontWeight: "var(--font-weight-bold)",
                      marginBottom: "var(--spacing-2)",
                    }}
                  >
                    {Math.floor(Math.random() * 10000)}
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-14)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {metric}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  args: { items: basicItems },
  render: () => (
    <div
      style={{
        width: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Small
        </p>
        <Breadcrumb items={basicItems} size="sm" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Medium (Default)
        </p>
        <Breadcrumb items={basicItems} size="md" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Large
        </p>
        <Breadcrumb items={basicItems} size="lg" />
      </div>
    </div>
  ),
};

export const AllSeparators: Story = {
  args: { items: basicItems },
  render: () => (
    <div
      style={{
        width: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Chevron (Default)
        </p>
        <Breadcrumb items={basicItems} separator="chevron" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Slash
        </p>
        <Breadcrumb items={basicItems} separator="slash" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Custom (Arrow)
        </p>
        <Breadcrumb
          items={basicItems}
          separator="custom"
          customSeparator={
            <span style={{ color: "var(--text-tertiary)" }}>→</span>
          }
        />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Custom (Dot)
        </p>
        <Breadcrumb
          items={basicItems}
          separator="custom"
          customSeparator={
            <span style={{ color: "var(--text-tertiary)" }}>•</span>
          }
        />
      </div>
    </div>
  ),
};

export const FileExplorer: Story = {
  args: { items: basicItems },
  render: () => {
    const fileItems: BreadcrumbItem[] = [
      { label: "Documents", href: "/documents" },
      { label: "Projects", href: "/documents/projects" },
      { label: "Design System", href: "/documents/projects/design-system" },
      {
        label: "Components",
        href: "/documents/projects/design-system/components",
      },
      { label: "Breadcrumb.tsx" },
    ];

    return (
      <div
        style={{
          width: "800px",
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
        }}
      >
        <Breadcrumb items={fileItems} separator="slash" size="sm" />
        <div
          style={{
            marginTop: "var(--spacing-6)",
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface-subtle)",
            fontFamily: "monospace",
            fontSize: "var(--font-size-14)",
          }}
        >
          <div style={{ color: "var(--text-secondary)" }}>
            // Breadcrumb.tsx
          </div>
          <div style={{ marginTop: "var(--spacing-2)" }}>
            export const Breadcrumb = ...
          </div>
        </div>
      </div>
    );
  },
};

export const AdminPanel: Story = {
  args: { items: basicItems },
  render: () => {
    const adminItems: BreadcrumbItem[] = [
      { label: "Admin", href: "/admin", icon: <ShieldCheck size={16} /> },
      { label: "Users", href: "/admin/users", icon: <Users size={16} /> },
      { label: "User Details", icon: <User size={16} /> },
    ];

    return (
      <div
        style={{
          width: "700px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
        }}
      >
        <Breadcrumb items={adminItems} size="lg" />
        <div style={{ marginTop: "var(--spacing-8)" }}>
          <h2
            style={{
              margin: "0 0 var(--spacing-4) 0",
              fontSize: "var(--font-size-24)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            John Doe (#12345)
          </h2>
          <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
            <Button variant="secondary">Edit User</Button>
            <Button variant="danger">Delete User</Button>
          </div>
        </div>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  args: {
    items: basicItems,
    className: "custom-breadcrumb",
  },
};

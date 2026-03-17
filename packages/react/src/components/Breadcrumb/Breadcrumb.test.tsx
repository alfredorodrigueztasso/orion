import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";
import type { BreadcrumbItem } from "./Breadcrumb.types";

const mockItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Laptop", href: "/products/laptop" },
  { label: "MacBook Pro" }, // Last item (current page, no href)
];

describe("Breadcrumb", () => {
  it("renders all breadcrumb items", () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByText("Home").closest("a");
    const productsLink = screen.getByText("Products").closest("a");
    const laptopLink = screen.getByText("Laptop").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(productsLink).toHaveAttribute("href", "/products");
    expect(laptopLink).toHaveAttribute("href", "/products/laptop");
  });

  it("renders last item as non-clickable", () => {
    render(<Breadcrumb items={mockItems} />);
    const lastItem = screen.getByText("MacBook Pro");
    expect(lastItem.closest("a")).not.toBeInTheDocument();
    expect(lastItem.tagName).toBe("SPAN");
  });

  it('marks last item with aria-current="page"', () => {
    render(<Breadcrumb items={mockItems} />);
    const lastItem = screen.getByText("MacBook Pro").closest("li");
    expect(lastItem).toHaveAttribute("aria-current", "page");
  });

  it('has nav with aria-label="Breadcrumb"', () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Breadcrumb",
    );
  });

  it("renders separators between items", () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const separators = container.querySelectorAll('[class*="separator"]');
    // Should have 3 separators for 4 items
    expect(separators).toHaveLength(3);
  });

  it("uses chevron separator by default", () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const separators = container.querySelectorAll('[class*="separator"]');
    expect(separators[0].className).toMatch(/chevron/);
  });

  it("uses slash separator when specified", () => {
    const { container } = render(
      <Breadcrumb items={mockItems} separator="slash" />,
    );
    const separators = container.querySelectorAll('[class*="separator"]');
    expect(separators[0].className).toMatch(/slash/);
  });

  it("uses custom separator when provided", () => {
    const customSep = <span data-testid="custom-sep">→</span>;
    render(
      <Breadcrumb
        items={mockItems}
        separator="custom"
        customSeparator={customSep}
      />,
    );
    const customSeparators = screen.getAllByTestId("custom-sep");
    expect(customSeparators).toHaveLength(3); // 4 items = 3 separators
  });

  it("shows home icon when showHomeIcon is true", () => {
    render(<Breadcrumb items={mockItems} showHomeIcon />);
    const homeIcon = screen.getByLabelText("Home");
    expect(homeIcon).toBeInTheDocument();
  });

  it("does not show home icon by default", () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.queryByLabelText("Home")).not.toBeInTheDocument();
  });

  it("renders item icons", () => {
    const itemsWithIcons: BreadcrumbItem[] = [
      {
        label: "Home",
        href: "/",
        icon: <span data-testid="home-icon">🏠</span>,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: <span data-testid="settings-icon">⚙️</span>,
      },
      { label: "Profile", icon: <span data-testid="profile-icon">👤</span> },
    ];

    render(<Breadcrumb items={itemsWithIcons} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
    expect(screen.getByTestId("profile-icon")).toBeInTheDocument();
  });

  it("collapses items when maxItems is exceeded", () => {
    const manyItems: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Subcategory", href: "/category/sub" },
      { label: "Product Type", href: "/category/sub/type" },
      { label: "Product" },
    ];

    render(<Breadcrumb items={manyItems} maxItems={3} />);

    // Should show: Home, ..., Product Type, Product
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("More items")).toBeInTheDocument();
    expect(screen.getByText("Product Type")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();

    // Middle items should be hidden
    expect(screen.queryByText("Category")).not.toBeInTheDocument();
    expect(screen.queryByText("Subcategory")).not.toBeInTheDocument();
  });

  it("does not collapse when items <= maxItems", () => {
    render(<Breadcrumb items={mockItems} maxItems={5} />);
    // All items should be visible
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.queryByLabelText("More items")).not.toBeInTheDocument();
  });

  it("applies sm size class", () => {
    const { container } = render(<Breadcrumb items={mockItems} size="sm" />);
    const breadcrumb = container.querySelector('[class*="breadcrumb"]');
    expect(breadcrumb?.className).toMatch(/sm/);
  });

  it("applies md size class by default", () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const breadcrumb = container.querySelector('[class*="breadcrumb"]');
    expect(breadcrumb?.className).toMatch(/md/);
  });

  it("applies lg size class", () => {
    const { container } = render(<Breadcrumb items={mockItems} size="lg" />);
    const breadcrumb = container.querySelector('[class*="breadcrumb"]');
    expect(breadcrumb?.className).toMatch(/lg/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Breadcrumb items={mockItems} className="custom-breadcrumb" />,
    );
    const breadcrumb = container.querySelector('[class*="breadcrumb"]');
    expect(breadcrumb).toHaveClass("custom-breadcrumb");
  });

  it("passes linkProps to all anchor elements", () => {
    render(
      <Breadcrumb
        items={mockItems}
        linkProps={{ target: "_blank", rel: "noopener" }}
      />,
    );

    const homeLink = screen.getByText("Home").closest("a");
    const productsLink = screen.getByText("Products").closest("a");

    expect(homeLink).toHaveAttribute("target", "_blank");
    expect(homeLink).toHaveAttribute("rel", "noopener");
    expect(productsLink).toHaveAttribute("target", "_blank");
    expect(productsLink).toHaveAttribute("rel", "noopener");
  });

  it("handles single item", () => {
    const singleItem: BreadcrumbItem[] = [{ label: "Home" }];
    render(<Breadcrumb items={singleItem} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    const { container } = render(<Breadcrumb items={singleItem} />);
    const separators = container.querySelectorAll('[class*="separator"]');
    expect(separators).toHaveLength(0);
  });

  it("handles two items", () => {
    const twoItems: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Current" },
    ];

    const { container } = render(<Breadcrumb items={twoItems} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();

    const separators = container.querySelectorAll('[class*="separator"]');
    expect(separators).toHaveLength(1);
  });

  it("handles item without href as non-clickable", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Non-clickable" }, // No href
      { label: "Current" },
    ];

    render(<Breadcrumb items={items} />);

    const nonClickable = screen.getByText("Non-clickable");
    expect(nonClickable.closest("a")).not.toBeInTheDocument();
    expect(nonClickable.tagName).toBe("SPAN");
  });

  describe("Accessibility", () => {
    it("has proper navigation structure", () => {
      render(<Breadcrumb items={mockItems} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("aria-label", "Breadcrumb");

      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
    });

    it("marks current page with aria-current", () => {
      render(<Breadcrumb items={mockItems} />);
      const currentPage = screen.getByText("MacBook Pro").closest("li");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("has aria-hidden on separators", () => {
      const { container } = render(<Breadcrumb items={mockItems} />);
      const separators = container.querySelectorAll('[class*="separator"]');
      separators.forEach((separator) => {
        expect(separator).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("has aria-label on ellipsis", () => {
      const manyItems: BreadcrumbItem[] = [
        { label: "A", href: "/a" },
        { label: "B", href: "/b" },
        { label: "C", href: "/c" },
        { label: "D", href: "/d" },
        { label: "E" },
      ];

      render(<Breadcrumb items={manyItems} maxItems={3} />);
      const ellipsis = screen.getByLabelText("More items");
      expect(ellipsis).toBeInTheDocument();
    });
  });

  describe("All Sizes", () => {
    it("renders small size", () => {
      const { container } = render(<Breadcrumb items={mockItems} size="sm" />);
      const breadcrumb = container.querySelector('[class*="breadcrumb"]');
      expect(breadcrumb?.className).toMatch(/sm/);
    });

    it("renders medium size", () => {
      const { container } = render(<Breadcrumb items={mockItems} size="md" />);
      const breadcrumb = container.querySelector('[class*="breadcrumb"]');
      expect(breadcrumb?.className).toMatch(/md/);
    });

    it("renders large size", () => {
      const { container } = render(<Breadcrumb items={mockItems} size="lg" />);
      const breadcrumb = container.querySelector('[class*="breadcrumb"]');
      expect(breadcrumb?.className).toMatch(/lg/);
    });
  });

  describe("All Separators", () => {
    it("renders chevron separator", () => {
      const { container } = render(
        <Breadcrumb items={mockItems} separator="chevron" />,
      );
      const separators = container.querySelectorAll('[class*="separator"]');
      expect(separators[0].className).toMatch(/chevron/);
    });

    it("renders slash separator", () => {
      const { container } = render(
        <Breadcrumb items={mockItems} separator="slash" />,
      );
      const separators = container.querySelectorAll('[class*="separator"]');
      expect(separators[0].className).toMatch(/slash/);
    });

    it("renders custom separator", () => {
      render(
        <Breadcrumb
          items={mockItems}
          separator="custom"
          customSeparator={<span data-testid="arrow">→</span>}
        />,
      );
      expect(screen.getAllByTestId("arrow")).toHaveLength(3);
    });
  });
});

"use client";

/**
 * Navbar Component
 *
 * Application navigation header with brand, links, and actions.
 * Includes responsive mobile menu with Toggle and Collapse.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Navbar sticky bordered>
 *   <Navbar.Brand href="/">MyApp</Navbar.Brand>
 *   <Navbar.Nav>
 *     <Navbar.Link href="/" active>Home</Navbar.Link>
 *     <Navbar.Link href="/about">About</Navbar.Link>
 *   </Navbar.Nav>
 *   <Navbar.Actions>
 *     <Button>Get Started</Button>
 *   </Navbar.Actions>
 * </Navbar>
 *
 * // With responsive mobile menu
 * function ResponsiveNavbar() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   return (
 *     <Navbar>
 *       <Navbar.Brand href="/">MyApp</Navbar.Brand>
 *       <Navbar.Nav>...</Navbar.Nav>
 *       <Navbar.Actions>...</Navbar.Actions>
 *       <Navbar.Toggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
 *       <Navbar.Collapse isOpen={isOpen}>
 *         <Navbar.Link href="/">Home</Navbar.Link>
 *         <Navbar.Link href="/about">About</Navbar.Link>
 *       </Navbar.Collapse>
 *     </Navbar>
 *   );
 * }
 * ```
 */

import React from "react";
import type {
  NavbarProps,
  NavbarBrandProps,
  NavbarNavProps,
  NavbarLinkProps,
  NavbarActionsProps,
  NavbarToggleProps,
  NavbarCollapseProps,
} from "./Navbar.types";
import styles from "./Navbar.module.css";

// ============================================================================
// Brand Component
// ============================================================================

const NavbarBrand: React.FC<NavbarBrandProps> = ({
  children,
  href,
  className,
}) => {
  const brandClasses = [styles.brand, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a href={href} className={brandClasses}>
        {children}
      </a>
    );
  }

  return <div className={brandClasses}>{children}</div>;
};

NavbarBrand.displayName = "Navbar.Brand";

// ============================================================================
// Nav Component (Links Container)
// ============================================================================

const NavbarNav: React.FC<NavbarNavProps> = ({
  children,
  className,
  ...rest
}) => {
  const navClasses = [styles.nav, className].filter(Boolean).join(" ");

  return (
    <nav className={navClasses} {...rest}>
      {children}
    </nav>
  );
};

NavbarNav.displayName = "Navbar.Nav";

// ============================================================================
// Link Component
// ============================================================================

const NavbarLink: React.FC<NavbarLinkProps> = ({
  children,
  href,
  active = false,
  className,
  onClick,
  ...rest
}) => {
  const linkClasses = [styles.link, active && styles.active, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={linkClasses}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
};

NavbarLink.displayName = "Navbar.Link";

// ============================================================================
// Actions Component
// ============================================================================

const NavbarActions: React.FC<NavbarActionsProps> = ({
  children,
  className,
  ...rest
}) => {
  const actionsClasses = [styles.actions, className].filter(Boolean).join(" ");

  return (
    <div className={actionsClasses} {...rest}>
      {children}
    </div>
  );
};

NavbarActions.displayName = "Navbar.Actions";

// ============================================================================
// Toggle Component (Hamburger Button)
// ============================================================================

const NavbarToggle: React.FC<NavbarToggleProps> = ({
  isOpen,
  onToggle,
  className,
}) => {
  const toggleClasses = [styles.toggle, isOpen && styles.toggleOpen, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={toggleClasses}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className={styles.toggleIcon}>
        <span className={styles.toggleLine} />
        <span className={styles.toggleLine} />
        <span className={styles.toggleLine} />
      </span>
    </button>
  );
};

NavbarToggle.displayName = "Navbar.Toggle";

// ============================================================================
// Collapse Component (Mobile Menu Container)
// ============================================================================

const NavbarCollapse: React.FC<NavbarCollapseProps> = ({
  children,
  isOpen,
  className,
  ...rest
}) => {
  const collapseClasses = [
    styles.collapse,
    isOpen && styles.collapseOpen,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={collapseClasses} {...rest}>
      {children}
    </div>
  );
};

NavbarCollapse.displayName = "Navbar.Collapse";

// ============================================================================
// Collapse Actions (Actions inside mobile menu)
// ============================================================================

const NavbarCollapseActions: React.FC<NavbarActionsProps> = ({
  children,
  className,
  ...rest
}) => {
  const actionsClasses = [styles.collapseActions, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={actionsClasses} {...rest}>
      {children}
    </div>
  );
};

NavbarCollapseActions.displayName = "Navbar.CollapseActions";

// ============================================================================
// Main Navbar Component
// ============================================================================

export const Navbar: React.FC<NavbarProps> & {
  Brand: typeof NavbarBrand;
  Nav: typeof NavbarNav;
  Link: typeof NavbarLink;
  Actions: typeof NavbarActions;
  Toggle: typeof NavbarToggle;
  Collapse: typeof NavbarCollapse;
  CollapseActions: typeof NavbarCollapseActions;
} = ({
  children,
  height = "md",
  variant = "solid",
  colorScheme = "auto",
  sticky = false,
  bordered = true,
  className,
  ...rest
}) => {
  const navbarClasses = [
    styles.navbar,
    styles[height],
    styles[variant],
    colorScheme !== "auto" &&
      styles[
        `scheme${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`
      ],
    sticky && styles.sticky,
    bordered && styles.bordered,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navbarClasses} {...rest}>
      {children}
    </header>
  );
};

// Attach subcomponents
Navbar.Brand = NavbarBrand;
Navbar.Nav = NavbarNav;
Navbar.Link = NavbarLink;
Navbar.Actions = NavbarActions;
Navbar.Toggle = NavbarToggle;
Navbar.Collapse = NavbarCollapse;
Navbar.CollapseActions = NavbarCollapseActions;

Navbar.displayName = "Navbar";

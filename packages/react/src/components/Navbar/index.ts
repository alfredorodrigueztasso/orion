/**
 * Navbar Component - Site/app navigation header.
 *
 * @example
 * ```tsx
 * import { Navbar, Button } from '@orion-ds/react';
 *
 * <Navbar variant="solid" sticky>
 *   <Navbar.Brand href="/">
 *     <img src="/logo.svg" alt="Logo" height={32} />
 *   </Navbar.Brand>
 *   <Navbar.Nav>
 *     <Navbar.Link href="/features">Features</Navbar.Link>
 *     <Navbar.Link href="/pricing">Pricing</Navbar.Link>
 *   </Navbar.Nav>
 *   <Navbar.Actions>
 *     <Button variant="ghost">Sign In</Button>
 *     <Button>Get Started</Button>
 *   </Navbar.Actions>
 * </Navbar>
 * ```
 */
export { Navbar } from "./Navbar";
export type {
  NavbarProps,
  NavbarBrandProps,
  NavbarNavProps,
  NavbarLinkProps,
  NavbarActionsProps,
  NavbarHeight,
  NavbarVariant,
} from "./Navbar.types";

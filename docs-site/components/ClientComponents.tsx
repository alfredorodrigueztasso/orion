'use client';

/**
 * Client-side wrapper for Orion components
 * Re-exports Orion components as client components for use in Next.js
 *
 * Note: Manually re-attaches compound components to preserve them through Next.js boundaries
 */

import {
  PageHeader as PageHeaderBase,
  Sidebar as SidebarBase,
  Button as ButtonBase,
  Card as CardBase,
  Badge as BadgeBase,
  Tabs as TabsBase,
  Accordion as AccordionBase,
  Table as TableBase,
  Alert as AlertBase,
  Breadcrumb as BreadcrumbBase,
  Navbar as NavbarBase,
  Link as LinkBase,
  SearchInput as SearchInputBase,
  ThemeController as ThemeControllerBase,
  Field as FieldBase,
  Switch as SwitchBase,
  Radio as RadioBase,
  Checkbox as CheckboxBase,
  Spinner as SpinnerBase,
  ProgressBar as ProgressBarBase,
  Icon as IconBase,
  Avatar as AvatarBase,
  Tooltip as TooltipBase,
  Modal as ModalBase,
  Drawer as DrawerBase,
  Dropdown as DropdownBase,
  Stepper as StepperBase,
  Skeleton as SkeletonBase,
  Popover as PopoverBase,
  Chip as ChipBase,
} from '@orion-ds/react';

import {
  Hero as HeroBase,
  Features as FeaturesBase,
  CTA as CTABase,
  Pricing as PricingBase,
  Testimonials as TestimonialsBase,
  Stats as StatsBase,
  FAQ as FAQBase,
  Team as TeamBase,
  Contact as ContactBase,
  Newsletter as NewsletterBase,
  LogoCloud as LogoCloudBase,
  Timeline as TimelineBase,
} from '@orion-ds/react/blocks';

// Re-export components
export const Hero = HeroBase;
export const Features = FeaturesBase;
export const CTA = CTABase;
export const PageHeader = PageHeaderBase;
export const Button = ButtonBase;
export const Badge = BadgeBase;
export const Tabs = TabsBase;
export const Accordion = AccordionBase;
export const Table = TableBase;
export const Alert = AlertBase;
export const Breadcrumb = BreadcrumbBase;
export const Card = CardBase;
export const CardBody = CardBase.Body;
export const CardHeader = CardBase.Header;
export const CardFooter = CardBase.Footer;
export const Navbar = NavbarBase;
export const Sidebar = SidebarBase;
export const Link = LinkBase;
export const SearchInput = SearchInputBase;
export const ThemeController = ThemeControllerBase;
export const Field = FieldBase;
export const Switch = SwitchBase;
export const Radio = RadioBase;
export const Checkbox = CheckboxBase;
export const Spinner = SpinnerBase;
export const ProgressBar = ProgressBarBase;
export const Icon = IconBase;
export const Avatar = AvatarBase;
export const Tooltip = TooltipBase;
export const Modal = ModalBase;
export const Drawer = DrawerBase;
export const Dropdown = DropdownBase;
export const Stepper = StepperBase;
export const Skeleton = SkeletonBase;
export const Popover = PopoverBase;
export const Chip = ChipBase;
export const Pricing = PricingBase;
export const Testimonials = TestimonialsBase;
export const Stats = StatsBase;
export const FAQ = FAQBase;
export const Team = TeamBase;
export const Contact = ContactBase;
export const Newsletter = NewsletterBase;
export const LogoCloud = LogoCloudBase;
export const Timeline = TimelineBase;

// Re-attach compound components (explicitly listed subcomponents that exist)
// Card

// Tabs

// Accordion

// Modal

// Navbar

// Drawer

// Hero (from blocks)

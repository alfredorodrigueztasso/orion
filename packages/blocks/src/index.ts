/**
 * @orion-ds/blocks - Premium Sections & Templates
 *
 * Pre-built sections and full-page templates for Orion Design System.
 * Extends the core @orion-ds/react components with ready-to-use page blocks
 * and compositions optimized for marketing, SaaS, and app interfaces.
 *
 * @example
 * ```tsx
 * import { Hero, Features, CTA, Footer, DashboardTemplate } from '@orion-ds/blocks';
 *
 * export default function LandingPage() {
 *   return (
 *     <DashboardTemplate>
 *       <Hero />
 *       <Features />
 *       <CTA />
 *       <Footer />
 *     </DashboardTemplate>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// Import and re-export sections
export * from "./sections";

// Import and re-export templates
export * from "./templates";

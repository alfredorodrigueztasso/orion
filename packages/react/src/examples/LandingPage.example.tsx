/**
 * Landing Page Example
 *
 * For a complete, full-featured landing page example with pre-built sections
 * (Hero, Features, Pricing, Testimonials, FAQ, CTA, Footer), see @orion-ds/blocks.
 *
 * @example Using @orion-ds/blocks
 * ```tsx
 * // Install: npm install @orion-ds/blocks
 * import { LandingPageTemplate } from '@orion-ds/blocks/templates';
 *
 * function App() {
 *   return <LandingPageTemplate />;
 * }
 * ```
 *
 * @example Using free components (this package)
 * ```tsx
 * import { Section, Container } from '@orion/react/sections';
 * import { Button, Navbar } from '@orion/react';
 *
 * function LandingPage() {
 *   return (
 *     <>
 *       <Navbar />
 *       <Section>
 *         <Container>
 *           <h1>Welcome to Orion</h1>
 *           <p>Build faster with the AI-first design system</p>
 *           <Button variant="primary">Get Started</Button>
 *         </Container>
 *       </Section>
 *     </>
 *   );
 * }
 * ```
 *
 * @module examples
 */

import { ThemeProvider } from "../contexts";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Section, Container } from "../sections";

/**
 * Simple landing page example using free Orion components
 *
 * For a full-featured landing page with pre-built sections and templates,
 * install @orion-ds/blocks: `npm install @orion-ds/blocks`
 */
export function LandingPageExample() {
  return (
    <ThemeProvider>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0 24px",
            }}
          >
            <strong>Orion</strong>
            <div style={{ display: "flex", gap: "24px" }}>
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Docs</Button>
              <Button variant="primary">Get Started</Button>
            </div>
          </div>
        </Navbar>

        <Section>
          <Container>
            <div
              style={{
                textAlign: "center",
                paddingTop: "60px",
                paddingBottom: "60px",
              }}
            >
              <h1
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  fontWeight: "bold",
                }}
              >
                Welcome to Orion Design System
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "32px",
                  color: "var(--text-secondary)",
                }}
              >
                The AI-first design system for building beautiful, accessible
                interfaces
              </p>
              <Button variant="primary" size="lg">
                Start Building
              </Button>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: "32px",
                  marginBottom: "16px",
                  fontWeight: "bold",
                }}
              >
                Premium Sections Available
              </h2>
              <p
                style={{ marginBottom: "24px", color: "var(--text-secondary)" }}
              >
                For pre-built marketing and app sections, templates, and
                advanced components, install <strong>@orion-ds/blocks</strong>
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  window.open("https://github.com/anthropics/orion", "_blank")
                }
              >
                Learn More
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    </ThemeProvider>
  );
}

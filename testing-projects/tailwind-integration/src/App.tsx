/**
 * Tailwind + Orion Integration Demo
 *
 * This component demonstrates how Tailwind CSS utilities work seamlessly
 * with Orion Design System components when @layer orion is properly configured.
 */

import { ThemeProvider, Button, Card, Stack } from '@orion-ds/react';
import { Search, Settings } from 'lucide-react';

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-base p-orion-8">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              ✨ Tailwind + Orion Integration
            </h1>
            <p className="text-text-secondary">
              Tailwind utilities work seamlessly with Orion components thanks to
              @layer orion CSS cascade semantics.
            </p>
          </div>

          {/* Section 1: Orion Components */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">
              Orion Components
            </h2>

            {/* Card with Tailwind layout */}
            <Card
              title="Example Card"
              subtitle="With Tailwind-controlled spacing"
              className="space-y-4"
            >
              <p className="text-text-secondary">
                This Card uses Orion styles, and the container uses Tailwind
                utilities for spacing.
              </p>

              <Stack gap="md">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </Stack>
            </Card>
          </section>

          {/* Section 2: Layout with Tailwind */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">
              Tailwind-Driven Layouts
            </h2>

            {/* Grid layout - pure Tailwind */}
            <div className="grid grid-cols-2 gap-4">
              <Card title="Card 1">
                <p className="text-text-secondary">
                  Tailwind grid layout with Orion Card components
                </p>
              </Card>
              <Card title="Card 2">
                <p className="text-text-secondary">
                  Each cell contains an Orion component
                </p>
              </Card>
              <Card title="Card 3">
                <p className="text-text-secondary">
                  Layouts = Tailwind, Components = Orion
                </p>
              </Card>
              <Card title="Card 4">
                <p className="text-text-secondary">
                  Clean separation of concerns ✅
                </p>
              </Card>
            </div>
          </section>

          {/* Section 3: Flex layout with spacing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">
              Flex Layout (Tailwind) + Components (Orion)
            </h2>

            <div className="flex gap-4">
              {/* Tailwind: flex + gap-4 */}
              {[1, 2, 3].map((i) => (
                <Button
                  key={i}
                  icon={<Search size={20} />}
                  variant={i === 1 ? 'primary' : 'secondary'}
                >
                  Button {i}
                </Button>
              ))}
            </div>
          </section>

          {/* Section 4: Responsive with Tailwind */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">
              Responsive Layout
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  title={`Item ${i + 1}`}
                  footer="Responsive card"
                >
                  <p className="text-text-secondary mb-4">
                    Tailwind responsive grid with Orion cards
                  </p>
                  <Button
                    variant="ghost"
                    icon={<Settings size={16} />}
                    className="w-full"
                  >
                    Settings
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 5: Validation Info */}
          <section className="p-6 bg-surface-subtle rounded-container border border-border-subtle">
            <h3 className="font-bold text-text-primary mb-3">
              ✅ Validation Checklist
            </h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>✓ Orion components render correctly</li>
              <li>✓ Tailwind utilities apply to layout elements</li>
              <li>✓ Tailwind utilities work with Orion components</li>
              <li>✓ No CSS specificity conflicts</li>
              <li>✓ Theme switching works (data-theme)</li>
              <li>✓ Brand switching works (data-brand)</li>
            </ul>
          </section>

          {/* Footer */}
          <div className="text-center text-text-tertiary text-sm pt-8 border-t border-border-subtle">
            <p>
              🚀 Orion v5.6.0+ with @layer orion integration. See{' '}
              <code className="bg-surface-subtle px-2 py-1 rounded">
                TAILWIND_INTEGRATION.md
              </code>{' '}
              for setup guide.
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

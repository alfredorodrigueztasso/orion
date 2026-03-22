# CURSOR INSTRUCTIONS — orionui.dev
## Instrucciones completas para Claude Code

**Cómo usar este archivo:**
1. Abre el monorepo completo en Cursor: `/AI First DS Library/`
2. Abre el Composer de Cursor (Cmd+I)
3. Pega este archivo completo como prompt
4. Claude Code ejecutará las tareas en orden

---

## CONTEXTO INICIAL — leer primero

Eres el agente de desarrollo del proyecto Orion Design System. Antes de cualquier cambio:

1. Lee `CLAUDE.md` en la raíz del monorepo — contiene todas las reglas del sistema
2. Nunca hardcodees colores, pixels o fuentes — siempre usa CSS variables (`var(--surface-base)`, `var(--spacing-4)`, etc.)
3. Nunca agregues `brand` como prop a ningún componente — brand es global via `ThemeProvider`
4. Todos los imports de Orion en el docs-site van a través de `@/components/ClientComponents` (wrapper 'use client' para Next.js)
5. El docs-site vive en `docs-site/` dentro del monorepo. Trabaja siempre dentro de esa carpeta salvo que se indique lo contrario

**Stack del docs-site:**
- Next.js 15 App Router
- React 19
- TypeScript
- `@orion-ds/react` v4.9.0 (sections disponibles en `@orion-ds/react/blocks`)
- CSS variables de Orion (no Tailwind)

---

## LOGO — ✅ YA INTEGRADO

Los archivos SVG del logo de Orion ya están en `docs-site/public/`. **No necesitas preguntar nada al Director sobre el logo.**

| Archivo | Uso |
|---------|-----|
| `public/logo.svg` | Wordmark completo — modo claro (ícono azul + texto negro) |
| `public/logo-dark.svg` | Wordmark completo — modo oscuro (ícono outline + texto blanco) |
| `public/logo-icon.svg` | Solo el ícono 16×16 (azul #124CFA con diamante blanco) |
| `public/favicon.svg` | Favicon del browser tab (= logo-icon.svg) |

**Implementación del logo en Navbar (mode-aware):**

El docs-site usa `data-theme` en `<html>` para dark mode (no `prefers-color-scheme`). Usa dos `<img>` con CSS para switchear:

```tsx
// En DocsNavbar.tsx — dentro de Navbar.Brand:
<Navbar.Brand href="/">
  <img
    src="/logo.svg"
    alt="Orion"
    height={24}
    className={styles.logoLight}
    style={{ display: 'block' }}
  />
  <img
    src="/logo-dark.svg"
    alt=""
    aria-hidden="true"
    height={24}
    className={styles.logoDark}
    style={{ display: 'none' }}
  />
</Navbar.Brand>
```

Añade en el CSS del navbar (o en un `<style>` global en `layout.tsx`):
```css
[data-theme="dark"] .logo-light { display: none !important; }
[data-theme="dark"] .logo-dark  { display: block !important; }
```

Si el navbar usa CSS Modules, agrega las clases `logoLight` y `logoDark` al archivo `.module.css` correspondiente.

---

## TAREA 1 — Actualizar dependencias

**Archivo:** `docs-site/package.json`

Cambia:
```json
"@orion-ds/react": "^4.6.2"
```
Por:
```json
"@orion-ds/react": "^4.9.0"
```

Después ejecuta desde la raíz del monorepo:
```bash
npm install
```

Verifica que el build compile sin errores:
```bash
cd docs-site && npm run build
```

---

## TAREA 2 — Actualizar metadata y dominio

**Archivo:** `docs-site/app/layout.tsx`

Cambios a realizar:

**2a. Metadata:**
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Orion Design System',
    template: '%s | Orion Design System',
  },
  description: 'The design system your AI agent already knows. 72 components, MCP Server native, Chain of Truth architecture. Open source + Pro.',
  keywords: [
    'design system', 'react', 'components', 'ui', 'typescript',
    'ai-first', 'orion', 'mcp', 'claude code', 'cursor', 'ai-native',
    'agent', 'chain of truth',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orionui.dev',           // era orion-ds.dev
    title: 'Orion Design System',
    description: 'The design system your AI agent already knows.',
    siteName: 'Orion Design System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orion Design System',
    description: 'The design system your AI agent already knows.',
  },
};
```

**2b. Script de localStorage — añadir ember y lemon:**
```javascript
brands=['orion','red','deepblue','orange','ember','lemon']
```

**2c. Favicon en el `<head>`:**
Los archivos ya existen en `public/`. Agrega al metadata de Next.js:
```typescript
icons: {
  icon: [
    { url: '/favicon.svg', type: 'image/svg+xml' },
  ],
},
```
O directamente en el layout:
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```
No se necesita `.ico` porque el SVG es suficiente para navegadores modernos. `public/favicon.svg` es el ícono circular azul de Orion con el diamante blanco — se ve bien en cualquier tamaño.

---

## TAREA 3 — Nuevo Hero

**Archivo:** `docs-site/components/HomepageHero.tsx`

Reemplaza el contenido completo del componente por:

```tsx
'use client';

import { Hero, Badge, Button } from '@/components/ClientComponents';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

interface HomepageHeroProps {
  componentCount: number;
  sectionCount: number;
  templateCount: number;
}

export default function HomepageHero({
  componentCount,
  sectionCount,
  templateCount,
}: HomepageHeroProps) {
  return (
    <Hero
      layout="contained"
      size="lg"
      align="center"
      badge={
        <Badge variant="secondary" size="sm" icon={<Terminal size={12} />}>
          MCP Server included — Claude Code ready
        </Badge>
      }
      title={
        <>
          The design system
          <br />
          <Hero.Highlight>
            your AI agent already knows.
          </Hero.Highlight>
        </>
      }
      description="Install components with a single instruction to Claude Code. 72 components, 26 sections, 10 templates — governed by Chain of Truth to eliminate UI hallucination."
      primaryAction={
        <Link href="/docs/getting-started">
          <Button size="lg" variant="primary" iconRight={<ArrowRight size={20} />}>
            Get Started Free
          </Button>
        </Link>
      }
      secondaryAction={
        <Link href="/pricing">
          <Button size="lg" variant="secondary">
            Founding Member — $29/mo
          </Button>
        </Link>
      }
      trustIndicators={
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Badge variant="secondary" size="sm">↗ {componentCount} components</Badge>
          <Badge variant="secondary" size="sm">↗ MCP Server · 9 tools</Badge>
          <Badge variant="secondary" size="sm">↗ MIT License</Badge>
        </div>
      }
    />
  );
}
```

---

## TAREA 4 — Sección Install con MCP

**Archivo:** `docs-site/components/HomepageInstall.tsx`

Añade una segunda sección debajo del bloque de instalación actual que muestre el comando MCP:

```tsx
// Después del Card existente de npm install, añadir:
<div style={{ marginTop: 'var(--spacing-6)', textAlign: 'center' }}>
  <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: 'var(--spacing-3)' }}>
    Or let your AI agent do it
  </p>
  <Card variant="base">
    <Card.Body style={{ padding: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', userSelect: 'none' }}>
          $
        </span>
        <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
          npx @orion-ds/mcp
        </code>
        <CopyButton text="npx @orion-ds/mcp" />
      </div>
    </Card.Body>
  </Card>
  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)' }}>
    Claude Code can then install any Orion component directly from your conversation.
  </p>
</div>
```

Extrae el botón de copiar a un sub-componente `CopyButton` reutilizable dentro del mismo archivo.

---

## TAREA 5 — Logo Cloud actualizado

**Archivo:** `docs-site/components/HomepageLogoCloud.tsx`

Cambia el concepto de "Compatible with your stack" a "Built for AI-native workflows". Mantén React, Next.js y TypeScript. Agrega Claude Code, Cursor y Cline con sus logos SVG inline (diseño minimalista, monocromo).

```tsx
// Nuevo eyebrow y title:
eyebrow="Built for"
title="AI-native workflows"

// Nuevo array de logos — añadir al inicio:
{ name: 'Claude Code', logo: <ClaudeCodeLogo /> },
{ name: 'Cursor', logo: <CursorLogo /> },
{ name: 'Cline', logo: <ClineLogo /> },
// Mantener: React, Next.js, TypeScript
```

Para los logos de Claude Code, Cursor y Cline usa SVGs simples en monocromo (solo las iniciales estilizadas o el símbolo reconocible). Aplica `grayscale={true}` al componente `LogoCloud`.

---

## TAREA 6 — Features con MCP primero

**Archivo:** `docs-site/components/HomepageFeaturesSection.tsx`

Reemplaza el array `items` con este orden y copy actualizado:

```tsx
items={[
  {
    icon: <Bot size={24} />,
    title: 'MCP Server native',
    description: '9 tools for Claude Code, Cursor and Cline. Your AI agent discovers, searches and installs Orion components directly — without leaving the conversation.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Chain of Truth',
    description: 'Token-governed architecture that eliminates UI hallucination. Primitives, semantics, and components stay strictly separated — AI-generated code stays consistent.',
  },
  {
    icon: <Package size={24} />,
    title: `${componentCount} Components`,
    description: 'Production-ready React components with full TypeScript support, built-in accessibility, and AI-first validation on every commit.',
  },
  {
    icon: <Layers size={24} />,
    title: `${sectionCount} Sections`,
    description: 'Pre-built page blocks for hero sections, features grids, pricing tables, and more — ready to compose without writing layout code.',
  },
  {
    icon: <Palette size={24} />,
    title: '6 Brands',
    description: 'Multi-brand architecture via data-brand. Switch between orion, red, deepblue, orange, ember and lemon with a single attribute change.',
  },
  {
    icon: <Moon size={24} />,
    title: 'Dark Mode',
    description: 'Full light/dark theme support with semantic token mappings. No hardcoded colors anywhere — zero visual drift between themes.',
  },
]}
```

Importa `Bot` desde `lucide-react`. Actualiza el eyebrow a `"Why Orion"` y el title a `"Built different, from the ground up"`.

---

## TAREA 7 — Sección Pricing en homepage

**Crear archivo:** `docs-site/components/HomepagePricing.tsx`

Usa el componente `Pricing` de `@orion-ds/react/blocks` (ya disponible en `ClientComponents.tsx` como `Pricing`). Si aún no está en `ClientComponents.tsx`, agrégalo primero.

```tsx
'use client';

import { Pricing, Button, Badge } from '@/components/ClientComponents';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomepagePricing() {
  return (
    <section style={{ padding: 'var(--spacing-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <Pricing
        title="Start free. Go Pro when you're ready."
        description="All core components are open source and free forever. Pro unlocks agentic patterns, the Figma Kit and premium templates."
        plans={[
          {
            name: 'Free',
            price: '$0',
            period: '/ forever',
            description: 'Everything you need to start building.',
            features: [
              '72 base components',
              '26 sections',
              '10 templates',
              'CLI installer',
              'MCP Server — 9 tools',
              'Chain of Truth architecture',
              'Dark mode + 6 brands',
              'MIT License',
            ],
            action: (
              <Link href="/docs/getting-started" style={{ width: '100%' }}>
                <Button variant="secondary" size="md" style={{ width: '100%' }}>
                  Get Started Free
                </Button>
              </Link>
            ),
          },
          {
            name: 'Founding Member',
            price: '$29',
            period: '/ month',
            description: 'First 200 users. Price locks forever.',
            popular: true,
            features: [
              'Everything in Free',
              '10+ AI / Agentic components',
              'AgentThinking · StreamText · ToolCall',
              'ActionConfirmation · DiffViewer · ContextBar',
              '4 production-ready AI templates',
              'Figma Kit completo',
              'Extended docs — the "why" behind each pattern',
              'Private Slack channel',
              'Early access to new components',
            ],
            action: (
              <Link href="/pricing" style={{ width: '100%' }}>
                <Button variant="primary" size="md" iconRight={<ArrowRight size={16} />} style={{ width: '100%' }}>
                  Become a Founding Member
                </Button>
              </Link>
            ),
          },
          {
            name: 'Team',
            price: '$149',
            period: '/ month',
            description: 'Up to 5 people. With design guidance.',
            features: [
              'Everything in Pro',
              'Up to 5 seats',
              'Brand customization guidance',
              '1 design session / month (30 min)',
              'Priority support',
            ],
            action: (
              <a href="mailto:hello@orionui.dev" style={{ width: '100%' }}>
                <Button variant="ghost" size="md" style={{ width: '100%' }}>
                  Contact Us
                </Button>
              </a>
            ),
          },
        ]}
      />
      <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-6)' }}>
        Price increases to $49/month after the first 200 Founding Members.
      </p>
    </section>
  );
}
```

---

## TAREA 8 — Insertar Pricing en homepage

**Archivo:** `docs-site/app/page.tsx`

Importa `HomepagePricing` y añádelo en este orden:

```tsx
import HomepagePricing from '@/components/HomepagePricing';

// Orden en el return:
<HomepageHero ... />
<HomepageInstall />
<HomepageLogoCloud />
<ComponentShowcaseTabs />
<HomepageFeaturesSection ... />
<HomepagePricing />          {/* ← nuevo, antes de Stats */}
<HomepageStats ... />
<HomepageTestimonials />
<HomepageCTA />
```

---

## TAREA 9 — Reemplazar Testimoniales

**Archivo:** `docs-site/components/HomepageTestimonials.tsx`

Los testimoniales actuales son ficticios. Reemplaza la sección completa por una de Social Proof usando el componente `Stats` de Orion para mostrar métricas reales del proyecto:

```tsx
'use client';

import { Stats } from '@/components/ClientComponents';
import Link from 'next/link';

export default function HomepageSocialProof() {
  return (
    <Stats
      eyebrow="Community"
      title="Built with Orion"
      description="Open source since day one. Used in production by builders who ship fast."
      columns={3}
      variant="cards"
      background="subtle"
      centered={true}
      stats={[
        {
          value: 'Open Source',
          label: 'MIT License',
          description: 'Free to use, modify and distribute forever',
        },
        {
          value: '5',
          label: 'npm packages',
          description: '@orion-ds/react · cli · mcp · create · validate',
        },
        {
          value: 'Design Intelligence',
          label: 'Built with Orion',
          description: 'AI-powered UX reviewer — 100% Orion components',
        },
      ]}
    />
  );
}
```

Renombra el export y actualiza el import en `app/page.tsx` de `HomepageTestimonials` a `HomepageSocialProof`.

---

## TAREA 10 — Stats actualizado

**Archivo:** `docs-site/components/HomepageStats.tsx`

Añade un quinto stat de "Founding Member spots":

```tsx
stats={[
  { value: `${counts.components}`, label: 'Components', description: 'Production-ready React building blocks' },
  { value: `${counts.sections}`, label: 'Sections', description: 'Pre-composed page blocks' },
  { value: `${counts.templates}`, label: 'Templates', description: 'Full-page starter layouts' },
  { value: '9', label: 'MCP Tools', description: 'AI agent integrations built-in' },
  { value: '200', label: 'Founding Member spots', description: 'Limited early access pricing — $29/mo forever' },
]}
```

Cambia `columns={4}` a `columns={5}` o deja el auto-fit si el componente lo soporta.

---

## TAREA 11 — CTA y Footer

**Archivo:** `docs-site/components/HomepageCTA.tsx`

```tsx
// CTA section:
title="Start building with Orion today"
description="Join builders creating AI-native interfaces. Free, open source, and production-ready."

// Primary action → /pricing con copy de Founding Member:
<Link href="/pricing">
  <Button size="lg" variant="primary" iconRight={<ArrowRight size={20} />}>
    Become a Founding Member
  </Button>
</Link>

// Secondary → GitHub (URL corregida):
href="https://github.com/alfredorodrigueztasso/orion"

// Footnote:
"Open source · MIT License · Free forever for base components"

// Footer — corregir:
© 2026 Orion Design System     ← era 2024
GitHub: https://github.com/alfredorodrigueztasso/orion   ← corregir URL
Añadir link: <Link href="/pricing">Pricing</Link>
```

---

## TAREA 12 — Navbar

**Archivo:** `docs-site/components/DocsNavbar.tsx`

**12a. Añadir Pricing a los nav links:**
```typescript
const NAV_LINKS = [
  { label: 'Docs', href: '/docs/getting-started', match: '/docs' },
  { label: 'Components', href: '/components', match: '/components' },
  { label: 'Sections', href: '/sections', match: '/sections' },
  { label: 'Templates', href: '/templates', match: '/templates' },
  { label: 'Pricing', href: '/pricing', match: '/pricing' },
];
```

**12b. Añadir CTA "Founding Member" en Navbar.Actions** (antes del BrandPicker):
```tsx
<Link href="/pricing">
  <Button variant="primary" size="sm">
    Founding Member
  </Button>
</Link>
```

**12c. Corregir GitHub link:**
```
href="https://github.com/alfredorodrigueztasso/orion"
```

**12d. Logo en Navbar.Brand** — los archivos están en `public/`. Reemplaza el texto actual por la implementación mode-aware descrita en la sección LOGO al inicio de este archivo:
```tsx
<Navbar.Brand href="/">
  <img src="/logo.svg"      alt="Orion" height={24} className={styles.logoLight} />
  <img src="/logo-dark.svg" alt=""      height={24} className={styles.logoDark}  aria-hidden="true" />
</Navbar.Brand>
```
Y añade al CSS del navbar:
```css
.logoDark  { display: none; }
[data-theme="dark"] .logoLight { display: none; }
[data-theme="dark"] .logoDark  { display: block; }
```

---

## TAREA 13 — Componente AI en ComponentShowcaseTabs

**Archivo:** `docs-site/components/ComponentShowcaseTabs.tsx`

Añade una nueva pestaña al inicio del array de tabs:

```tsx
{ id: 'ai-agents', label: '✦ AI Agents', content: <AIAgentsShowcase /> },
```

Crea el componente `AIAgentsShowcase` dentro del mismo archivo:

```tsx
const AIAgentsShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
    {/* Thinking state */}
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 'var(--spacing-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Agent Thinking
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-control)', border: '1px solid var(--border-subtle)' }}>
        <Spinner size="sm" />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Analyzing your interface...
        </span>
      </div>
    </div>

    {/* Progress state */}
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 'var(--spacing-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Agent Progress
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Badge variant="success" size="sm">✓</Badge>
          <span style={{ fontSize: '0.875rem' }}>Capturing screenshot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Spinner size="sm" />
          <span style={{ fontSize: '0.875rem' }}>Analyzing UX patterns</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid var(--border-subtle)' }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Generating recommendations</span>
        </div>
      </div>
    </div>

    {/* Context bar */}
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 'var(--spacing-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Context Usage
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          <span>Context window</span>
          <span>68% used</span>
        </div>
        <ProgressBar value={68} />
      </div>
    </div>

    {/* Pro badge */}
    <div style={{ padding: 'var(--spacing-4)', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-control)', border: '1px dashed var(--border-subtle)', textAlign: 'center' }}>
      <Badge variant="primary" size="sm" style={{ marginBottom: 'var(--spacing-2)' }}>Pro</Badge>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
        Full AI component library in Founding Member plan →{' '}
        <a href="/pricing" style={{ color: 'var(--text-brand)' }}>AgentThinking · StreamText · ToolCall · ActionConfirmation</a>
      </p>
    </div>
  </div>
);
```

---

## TAREA 14 — PreviewBrandModeBar con 6 brands

**Archivo:** `docs-site/components/PreviewBrandModeBar.tsx`

Añade ember y lemon al array BRANDS:

```typescript
const BRANDS: Array<{ id: Brand; label: string; color: string }> = [
  { id: 'orion', label: 'Orion', color: '#1B5BFF' },
  { id: 'red', label: 'Red', color: '#D7282F' },
  { id: 'deepblue', label: 'Deep Blue', color: '#006FBA' },
  { id: 'orange', label: 'Orange', color: '#F15D22' },
  { id: 'ember', label: 'Ember', color: '#E8530A' },
  { id: 'lemon', label: 'Lemon', color: '#F5C800' },
];

// Actualizar el tipo:
type Brand = 'orion' | 'red' | 'deepblue' | 'orange' | 'ember' | 'lemon';
```

Verifica los colores hex exactos de ember y lemon en `tokens/brands.json` del monorepo antes de confirmarlos.

---

## TAREA 15 — Nueva página Pricing

**Crear:** `docs-site/app/pricing/page.tsx`

```tsx
import type { Metadata } from 'next';
import HomepagePricing from '@/components/HomepagePricing';
import { FAQ } from '@/components/ClientComponents';  // añadir FAQ a ClientComponents si no está

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Start free with 72 open source components. Upgrade to Founding Member for AI-native patterns, Figma Kit and Pro templates.',
};

export default function PricingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-8)' }}>

      {/* Hero de pricing */}
      <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0 var(--spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, marginBottom: 'var(--spacing-4)' }}>
          Simple, transparent pricing
        </h1>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
          Start building for free. Upgrade when you need AI-native components, the Figma Kit, and production templates.
        </p>
      </div>

      {/* Pricing cards — reutiliza HomepagePricing */}
      <HomepagePricing />

      {/* FAQ */}
      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <FAQ
          title="Frequently asked questions"
          items={[
            {
              id: 'free-forever',
              question: 'Can I use Orion for free forever?',
              answer: 'Yes. All 72 base components, 26 sections, 10 templates, the CLI and the MCP Server are open source under MIT License. Free forever, no credit card required.',
            },
            {
              id: 'founding-member',
              question: 'What happens when the 200 Founding Member spots are gone?',
              answer: 'The price increases to $49/month for new subscribers. Founding Members keep $29/month forever as long as their subscription is active.',
            },
            {
              id: 'mcp-free',
              question: 'Is the MCP Server included in the free plan?',
              answer: 'Yes. The MCP Server with all 9 tools is completely free and open source. Claude Code, Cursor and Cline can install Orion components in any plan.',
            },
            {
              id: 'pro-components',
              question: "What are the AI/Agentic components in Pro?",
              answer: 'Pro includes components specifically designed for AI-powered interfaces: AgentThinking (animated processing states), StreamText (live text streaming), ToolCall (tool invocation visualization), ActionConfirmation (safe action prompts), DiffViewer (change previews), ContextBar (context usage), and more.',
            },
            {
              id: 'team',
              question: 'How does the Team plan work?',
              answer: 'The Team plan gives up to 5 people access to all Pro features, plus a monthly 30-minute design session with the Orion designer to help customize the system for your brand.',
            },
            {
              id: 'refund',
              question: 'Is there a refund policy?',
              answer: 'Yes. If you are not satisfied within the first 14 days, we will give you a full refund — no questions asked.',
            },
          ]}
        />
      </div>

    </div>
  );
}
```

**Asegúrate de añadir `FAQ` a `ClientComponents.tsx` si no está ya:**
```typescript
import { FAQ as FAQBase } from '@orion-ds/react/blocks';
export const FAQ = FAQBase;
```

---

## TAREA 16 — Nueva página MCP Docs

**Crear:** `docs-site/content/docs/mcp.mdx`

```mdx
# MCP Server

The only design system with a native MCP Server.

## Why it matters

Most design systems assume you'll search the docs, copy the code, and paste it into your project. That workflow breaks when you're building with AI agents.

Orion's MCP Server changes this: Claude Code, Cursor, and Cline can discover, search, and install any Orion component directly from your conversation — without leaving the agent.

## Installation

```bash
npx @orion-ds/mcp
```

## Setup by tool

### Claude Code

Add to your `CLAUDE.md` or `.claude/settings.json`:

```json
{
  "mcpServers": {
    "orion": {
      "command": "npx",
      "args": ["@orion-ds/mcp"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "orion": {
      "command": "npx",
      "args": ["@orion-ds/mcp"]
    }
  }
}
```

### Cline / Continue

Add `npx @orion-ds/mcp` as an MCP server in your tool settings.

## Available tools (9)

| Tool | Description |
|------|-------------|
| `orion_list_components` | List all available components with metadata |
| `orion_get_component` | Get full details, props and examples for a component |
| `orion_search` | Search components by name, category or description |
| `orion_list_sections` | List all page sections (Hero, Features, Pricing...) |
| `orion_get_section` | Get a section with usage examples |
| `orion_list_templates` | List available full-page templates |
| `orion_get_template` | Get a template with setup instructions |
| `orion_install` | Install a component into your project via CLI |
| `orion_validate` | Validate that generated code follows Chain of Truth rules |

## Example conversation with Claude Code

```
You: Add a pricing section to this page using Orion

Claude Code: [calls orion_get_section("pricing")]
             [finds Pricing section with props and examples]
             [generates compliant code using @orion-ds/react/blocks]

Result: Production-ready Pricing section, zero hallucinated tokens.
```

## Troubleshooting

**MCP server not found:** Make sure you have Node.js 18+ installed and run `npx @orion-ds/mcp --version` to verify.

**Components not installing:** Run `npx @orion-ds/cli doctor` to check your project configuration.
```

**Crear:** `docs-site/app/docs/mcp/page.tsx`

```tsx
import { getItemByName } from '@/lib/registry';
import DocsMdxPage from '@/components/DocsMdxPage'; // reutiliza el pattern existente de las otras páginas de docs

// O bien, sigue el mismo patrón que app/docs/getting-started/page.tsx
```

Mira cómo está implementado `app/docs/getting-started/page.tsx` y replica el mismo patrón para la página MCP.

**Añadir al Sidebar** (`docs-site/components/DocsSidebar.tsx`):
```typescript
import { Bot } from 'lucide-react'; // añadir al import

// En la sección "Getting Started":
{ id: 'mcp', label: 'MCP Server', href: '/docs/mcp', icon: <Bot size={18} /> },
```

---

## TAREA 17 — Actualizar docs existentes

**Archivo:** `docs-site/content/docs/getting-started.mdx`

Busca y reemplaza:
- `"69+ components"` → `"72 components"`
- `"4 brands"` / `"4 built-in brands"` → `"6 brands"`
- `"orion, red, deepblue, and orange"` → `"orion, red, deepblue, orange, ember and lemon"`
- `orion-ds.vercel.app` → `orionui.dev` (en todas las URLs)

Haz lo mismo en todos los archivos `.mdx`:
- `docs-site/content/docs/installation.mdx`
- `docs-site/content/docs/cli.mdx`
- `docs-site/content/docs/theming.mdx`
- `docs-site/content/docs/tokens.mdx`

---

## TAREA 18 — Preview modules

**Directorio a crear:** `registry/preview-modules/`

Crea un archivo `registry/preview-modules/index.ts` que exporte los preview modules de los componentes más importantes para que `ComponentPreview.tsx` los pueda importar.

Primero revisa cómo está estructurado `ComponentPreview.tsx` en `docs-site/components/ComponentPreview.tsx` para entender exactamente qué formato espera el módulo (`{ title: string, render: React.ComponentType }`).

Luego crea preview modules para al menos estos 10 componentes prioritarios:
`button`, `card`, `badge`, `alert`, `field`, `modal`, `tabs`, `avatar`, `spinner`, `progressbar`

Cada preview module debe seguir las reglas del CLAUDE.md: sin colores hardcodeados, sin brand props, usando solo CSS variables.

---

## VERIFICACIÓN FINAL

Cuando hayas completado todas las tareas, ejecuta:

```bash
# Desde la raíz del monorepo:
npm run type-check
npm run validate

# Desde docs-site/:
npm run build
npm run lint
```

El build debe pasar sin errores de TypeScript ni violaciones de tokens.

Abre `http://localhost:3000` con `npm run dev` y verifica:
- [ ] Hero muestra el MCP badge y el nuevo copy
- [ ] Sección Pricing visible en homepage con 3 cards
- [ ] Navbar tiene link Pricing y botón Founding Member
- [ ] Página `/pricing` carga correctamente con FAQ
- [ ] Página `/docs/mcp` carga con contenido
- [ ] MCP aparece en el sidebar de docs
- [ ] Footer dice 2026 y GitHub link es correcto
- [ ] ComponentShowcaseTabs tiene pestaña "AI Agents"
- [ ] PreviewBrandModeBar muestra 6 brands
- [ ] Logo aparece en navbar (cuando el Director lo comparta)

---

## NOTA SOBRE EL LOGO — ✅ COMPLETO

Los 4 archivos SVG del logo están en `docs-site/public/` y listos para usar:

```
docs-site/public/
├── logo.svg         ← wordmark completo, light (72×24)
├── logo-dark.svg    ← wordmark completo, dark (72×24)
├── logo-icon.svg    ← solo ícono (16×16)
└── favicon.svg      ← favicon (= logo-icon.svg, azul #124CFA)
```

El ícono es un círculo azul `#124CFA` con un diamante blanco inscrito — el símbolo de Orion.
El wordmark incluye el texto "Orion" en negro (light) / blanco (dark).

No se necesita ningún archivo adicional. Implementa directamente con las rutas de arriba.

---

*Generado por Gang AI · 20 de marzo de 2026*
*Logos integrados: 20 de marzo de 2026*

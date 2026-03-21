# LANDING-BRIEF — orionui.dev

**Para usar en Cursor / Claude Code**
Abre el docs-site en Cursor y usa este brief como referencia para cada cambio.
Cada sección indica el archivo exacto a modificar.

fecha: 20 de marzo de 2026

---

## Contexto del producto

**Orion Design System** — el primer design system con MCP Server nativo.
**Dominio:** orionui.dev
**Modelo:** Open source (MIT) + Pro Founding Member $29/mes (primeros 200 usuarios, luego $49/mes)
**Diferenciador central:** Claude Code, Cursor y Cline pueden instalar componentes de Orion directamente sin que el developer salga del agente.
**Stack del sitio:** Next.js 15 · React 19 · TypeScript · @orion-ds/react v4.9.0

---

## Reglas de diseño para todo el sitio

- Una acción principal por sección — nunca dos CTAs del mismo peso
- Microcopy: nunca "plataforma", "solución", "potente", "revolucionario"
- Siempre hablar de lo que el usuario HACE, no de lo que el producto ES
- Tono: colega directo, no corporativo
- Urgencia del Founding Member: real (contador de spots), nunca falsa

---

## CAMBIO 1 — Hero (`components/HomepageHero.tsx`)

**Objetivo:** Que el MCP sea el gancho en las primeras 2 líneas. No "design system" primero.

**Copy actual:**
```
Title: The AI-first Design System
Description: Token-governed components that eliminate UI hallucination. Build consistent interfaces at scale — without visual drift.
Badge: ✨ Chain of Truth
```

**Copy nuevo:**
```
Badge: ✦ MCP Server included — Claude Code ready
Title: The design system your AI agent already knows.
Description: Install components with a single instruction to Claude Code. 72 components, 26 sections, 10 templates — governed by Chain of Truth.
```

**Acciones:**
- Primary: "Get Started Free" → `/docs/getting-started`
- Secondary: "View on GitHub" → `https://github.com/alfredorodrigueztasso/orion`

**Trust indicators (los 3 badges debajo de los botones):**
```
↗ 72 components    ↗ MCP Server    ↗ MIT License
```

**Nota de implementación:** El badge superior debe usar `variant="secondary"` pero con un estilo ligeramente diferenciado — usar el dot indicator o un ícono de terminal para reforzar el concepto de CLI/MCP.

---

## CAMBIO 2 — Sección Install (`components/HomepageInstall.tsx`)

**Objetivo:** Añadir el comando del MCP junto al de instalación del paquete.

Actualmente solo muestra `npm install @orion-ds/react`. Añadir una segunda tab o un bloque adicional que muestre:

```
# Claude Code / Cursor — add to your MCP config:
npx @orion-ds/mcp
```

Con una nota corta debajo: *"Claude Code can then install any Orion component directly from your conversation."*

**Referentes:** Cómo Vercel muestra múltiples formas de deploy en una sola sección — tabs limpias, sin abrumar.

---

## CAMBIO 3 — Logo Cloud (`components/HomepageLogoCloud.tsx`)

**Cambio de concepto:** Pasar de "Compatible with your stack" (frameworks) a "Built for AI-native workflows" (herramientas que usan el MCP).

**Logos nuevos a mostrar:**
- Claude Code
- Cursor
- Cline
- Continue
- React (mantener)
- Next.js (mantener)
- TypeScript (mantener)

**Eyebrow:** `"Works with"` → `"Built for AI-native workflows"`
**Title:** `"Works with your entire stack"` → `"Your AI agent can use Orion directly"`

---

## CAMBIO 4 — Features (`components/HomepageFeaturesSection.tsx`)

**Objetivo:** MCP al frente. Reordenar y reescribir para que el diferenciador esté en posición 1.

**Nuevo orden y copy:**

```
Feature 1 — MCP Server (era #6)
Icon: Bot o Terminal
Title: "MCP Server native"
Description: "9 tools for Claude Code, Cursor and Cline. Your AI agent discovers, searches and installs Orion components directly — without leaving the conversation."

Feature 2 — Chain of Truth (era #1)
Icon: Zap
Title: "Chain of Truth"
Description: "Token-governed architecture that eliminates UI hallucination. Primitives, semantics, and components stay strictly separated — AI-generated code stays consistent."

Feature 3 — Componentes (era #2)
Icon: Package
Title: "72 components"
Description: "Production-ready React components with full TypeScript support, built-in accessibility, and AI-first validation."

Feature 4 — Secciones
Icon: Layers
Title: "26 sections"
Description: "Pre-built page blocks for hero sections, features grids, pricing tables, and more — ready to compose."

Feature 5 — Multi-brand (actualizar de 4 a 6)
Icon: Palette
Title: "6 brands"
Description: "Multi-brand architecture via data-brand. Switch between orion, red, deepblue, orange, ember and lemon with a single attribute."

Feature 6 — Dark mode
Icon: Moon
Title: "Dark mode"
Description: "Full light/dark theme support with semantic token mappings. No hardcoded colors, zero visual drift."
```

---

## CAMBIO 5 — Nueva sección Pricing en homepage

**Crear:** `components/HomepagePricing.tsx`
**Posición en `app/page.tsx`:** Después de `HomepageStats`, antes de `HomepageTestimonials`

**Estructura de la sección:**

```
Eyebrow: "Pricing"
Title: "Start free. Go Pro when you're ready."
Description: "All core components are open source and free forever. Pro unlocks agentic patterns, templates and the Figma Kit."
```

**3 cards de pricing:**

**Free**
```
Price: $0 / forever
Subtitle: Open source · MIT License
Features:
✓ 72 base components
✓ 26 sections
✓ 10 templates
✓ CLI installer
✓ MCP Server (9 tools)
✓ Chain of Truth architecture
✓ Dark mode + 6 brands
CTA: "Get Started Free" (variant: secondary)
```

**Founding Member** ← card destacado / highlighted
```
Badge: "200 spots · X remaining"  ← contador real cuando esté Stripe
Price: $29 / month
Subtitle: Luego $49/mes — precio fijo para siempre si entras ahora
Features:
✓ Everything in Free
✓ 10+ AI/Agentic components (AgentThinking, StreamText, ToolCall, ActionConfirmation...)
✓ 4 production-ready templates
✓ Figma Kit completo
✓ Extended documentation — el "por qué" de cada patrón
✓ Private Slack channel
✓ Early access to new components
CTA: "Become a Founding Member" (variant: primary)
Urgency note: "Price increases to $49/month after first 200 members."
```

**Team**
```
Price: $149 / month
Subtitle: Up to 5 people
Features:
✓ Everything in Pro
✓ Up to 5 seats
✓ Brand customization guidance
✓ 1 design session / month (30 min)
CTA: "Contact us" (variant: ghost)
```

**Nota de diseño:** El card de Founding Member debe ser el más prominente visualmente — borde con color brand, badge de urgencia, background ligeramente diferente. Referente: cómo Linear presenta su card "Business" en pricing.

---

## CAMBIO 6 — Testimoniales (`components/HomepageTestimonials.tsx`)

**Problema:** Los testimoniales actuales son ficticios (Sarah Chen at Vercel, etc.). No se puede lanzar con testimoniales falsos.

**Opción A — reemplazar por Social Proof alternativo (recomendado para lanzamiento):**
Cambiar el componente `Testimonials` por una sección de tipo "Built with Orion" mostrando:
- GitHub stars counter (live desde API)
- npm downloads / semana
- "Design Intelligence — built entirely with Orion" con link

```
Eyebrow: "Community"
Title: "Built with Orion"
Stats: GitHub stars · npm downloads · Componentes en producción
```

**Opción B — conseguir testimoniales reales antes del 22 marzo:**
3 personas que hayan probado Orion. Con nombre real, rol real y empresa real. Sin esto, no usar testimoniales.

---

## CAMBIO 7 — Stats (`components/HomepageStats.tsx`)

**Actualizar números:**

```
Stat 1: componentCount (dinámico desde registry — ya funciona)
Stat 2: sectionCount (dinámico — ya funciona)
Stat 3: templateCount (dinámico — ya funciona)
Stat 4: "9 MCP Tools" → añadir descripción: "AI agent integrations built-in"
```

**Añadir stat 5:**
```
Value: "200"
Label: "Founding Member spots"
Description: "Limited early access pricing"
```

---

## CAMBIO 8 — CTA final + Footer (`components/HomepageCTA.tsx`)

**CTA section:**
```
Title: "Start building with Orion today"
Description: "Join builders creating AI-native interfaces. Free, open source, and ready to ship."
Primary CTA: "Become a Founding Member" → /pricing
Secondary CTA: "View on GitHub" → https://github.com/alfredorodrigueztasso/orion
Footnote: "Open source · MIT License · Free forever for base components"
```

**Footer — correcciones:**
```
© 2026 Orion Design System  ← cambiar de 2024 a 2026
GitHub link: https://github.com/alfredorodrigueztasso/orion  ← corregir
NPM link: https://npmjs.com/package/@orion-ds/react  ← mantener
Docs link: /docs/getting-started  ← mantener
Añadir: Pricing → /pricing
```

---

## CAMBIO 9 — Navbar (`components/DocsNavbar.tsx`)

**Nav links — añadir Pricing:**
```javascript
const NAV_LINKS = [
  { label: 'Docs', href: '/docs/getting-started', match: '/docs' },
  { label: 'Components', href: '/components', match: '/components' },
  { label: 'Sections', href: '/sections', match: '/sections' },
  { label: 'Templates', href: '/templates', match: '/templates' },
  { label: 'Pricing', href: '/pricing', match: '/pricing' },  // ← nuevo
];
```

**Navbar.Actions — añadir CTA de Founding Member:**
Antes del BrandPicker, añadir un `Button` pequeño:
```jsx
<Link href="/pricing">
  <Button variant="primary" size="sm">
    Founding Member
  </Button>
</Link>
```

**GitHub link — corregir:**
```
href: "https://github.com/alfredorodrigueztasso/orion"
```

---

## CAMBIO 10 — Metadata (`app/layout.tsx`)

```typescript
// Actualizar:
url: 'https://orionui.dev',           // era orion-ds.dev
siteName: 'Orion Design System',
title: 'Orion Design System',
description: 'The design system your AI agent already knows. 72 components, MCP Server native, Chain of Truth architecture.',
keywords: añadir: 'mcp', 'claude code', 'cursor', 'ai-native', 'agent'

// En el script de localStorage — añadir ember y lemon a los brands válidos:
brands=['orion','red','deepblue','orange','ember','lemon']
```

---

## CAMBIO 11 — ComponentShowcaseTabs (`components/ComponentShowcaseTabs.tsx`)

**Añadir pestaña "AI / Agents"** al final de la lista de tabs:

```jsx
{
  id: 'ai-agents',
  label: 'AI Agents',
  content: <AIAgentsShowcase />
}
```

**Crear `AIAgentsShowcase` component** dentro del mismo archivo. Por ahora puede mostrar los componentes que ya existen en Orion con comportamiento de agente (`Spinner` como `AgentThinking` placeholder, `ProgressBar` con estados, etc.) con copy que anticipa los componentes Pro:

```jsx
const AIAgentsShowcase = () => (
  <div>
    {/* Mostrar Spinner con label "Agent thinking..." */}
    {/* Mostrar ProgressBar con steps */}
    {/* Banner: "Full AI component library coming in Pro →" */}
  </div>
);
```

---

## NUEVA PÁGINA — Pricing (`app/pricing/page.tsx`)

Página full de pricing con:
- Hero simple: "Simple, transparent pricing"
- Los 3 cards (mismo contenido que la sección en homepage pero con más detalle)
- FAQ section (5-7 preguntas):
  - "¿Puedo usar Orion gratis para siempre?"
  - "¿Qué pasa si los 200 spots se acaban?"
  - "¿El MCP Server está incluido en Free?"
  - "¿Cómo funciona el plan Team?"
  - "¿Tienen descuento para startups o estudiantes?"
- CTA final hacia `/docs/getting-started`

---

## NUEVA PÁGINA — MCP Docs (`content/docs/mcp.mdx`)

Contenido mínimo para el lanzamiento:

```markdown
# MCP Server (@orion-ds/mcp)

El único design system con servidor MCP nativo.

## Por qué importa

[Explicación del problema que resuelve]

## Instalación

npx @orion-ds/mcp

## Configuración en Claude Code / Cursor / Cline

[Instrucciones por herramienta]

## Los 9 tools disponibles

[Tabla con nombre + descripción de cada tool]

## Ejemplo de uso

[Conversación real con Claude Code instalando un componente]
```

**Agregar al sidebar** (`components/DocsSidebar.tsx`):
```javascript
{ id: 'mcp', label: 'MCP Server', href: '/docs/mcp', icon: <Bot size={18} /> }
```

---

## CORRECCIONES MENORES

**`content/docs/getting-started.mdx`:**
- "69+ components" → "72 components"
- "44 pre-built sections" → "26 sections" (verificar número actual)
- "12 complete templates" → número actual del registry
- "4 brands" → "6 brands (orion, red, deepblue, orange, ember, lemon)"
- Todas las URLs `orion-ds.vercel.app` → `orionui.dev`

**`package.json`:**
- `"@orion-ds/react": "^4.6.2"` → `"^4.9.0"`

**`components/PreviewBrandModeBar.tsx`:**
- Añadir `ember` y `lemon` al array `BRANDS` con sus colores hex

---

## Orden de implementación en Cursor

1. `package.json` — bump a 4.9.0 y verificar que todo compila
2. `app/layout.tsx` — actualizar metadata y dominio
3. `components/HomepageHero.tsx` — nuevo copy
4. `components/HomepageFeaturesSection.tsx` — reordenar, MCP primero
5. `components/DocsNavbar.tsx` — Pricing link + CTA Founding Member + GitHub link
6. `components/HomepagePricing.tsx` — crear nuevo componente
7. `app/page.tsx` — insertar `<HomepagePricing />` en el orden correcto
8. `app/pricing/page.tsx` — crear página de pricing
9. `components/HomepageTestimonials.tsx` — reemplazar por social proof
10. `components/HomepageCTA.tsx` — nuevo copy + footer correcto
11. `components/ComponentShowcaseTabs.tsx` — añadir tab AI Agents
12. `content/docs/mcp.mdx` + `app/docs/mcp/page.tsx` — crear docs MCP
13. `components/DocsSidebar.tsx` — añadir MCP al sidebar
14. `components/PreviewBrandModeBar.tsx` — añadir ember y lemon
15. Archivos `.mdx` — actualizar conteos y URLs

---

## Decisión pendiente (fuera del scope de este brief)

**Arquitectura de previews:** `ComponentPreview.tsx` importa desde `../../registry/preview-modules/index`. Decidir si el docs-site entra al monorepo de Orion como `/apps/docs` o si los preview modules se mueven a `@orion-ds/react`. Esta decisión afecta el deploy en Vercel.

---

última actualización: 20 de marzo de 2026

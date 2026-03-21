# PRD — Orion Docs & Landing Site

versión: 1.0 | fecha: 20 de marzo de 2026 | estado: en desarrollo activo

---

## Objetivo

Convertir el docs-site existente de documentación interna en el sitio público de lanzamiento de Orion Design System — con landing page que convierte visitantes en usuarios Pro (Founding Member $29/mes) y documentación que convierte usuarios free en Pro.

---

## Usuarios

**Usuario A — el builder con agente IA**
Founder o developer que construye productos con Claude Code, Cursor o v0. Llega desde un post en X/Twitter, HN o Product Hunt. Necesita saber en 10 segundos si Orion es lo que busca y cómo instalarlo. Si ve el MCP demo, convierte.

**Usuario B — el product designer**
Designer de producto que trabaja en una startup con IA. Busca patrones para interfaces agenticas. No tiene los componentes todavía. Llega desde Google o recomendación. Necesita ver los componentes en acción antes de decidir.

**Usuario C — el vibe coder**
Founder no técnico que construye con herramientas de AI-first. Quiere que su producto se vea bien sin contratar un designer. El template "ready to deploy" es su punto de entrada.

---

## Jobs to be done por página

### Homepage (/)
- Comunicar el diferenciador del MCP en los primeros 3 segundos
- Demostrar que los componentes existen y son de calidad
- Capturar al Founding Member — botón prominente con urgencia real
- Guiar al primer paso: instalar o leer docs

### Docs (/docs/*)
- Llevar de cero a primer componente funcionando en < 5 minutos
- Documentar el MCP server con ejemplos reales de uso con Claude Code
- Explicar Chain of Truth para que el usuario entienda por qué Orion es distinto

### Componentes (/components/*)
- Preview interactivo con brand y mode switcher
- Código listo para copiar
- Props documentadas con tipos TypeScript

### Pricing (/pricing) — nueva página
- Comunicar los 3 tiers claramente: Free · Founding Member · Team
- Urgencia real: contador de 200 spots de Founding Member
- FAQ que resuelva las objeciones de precio

---

## Features a implementar (por prioridad)

### Crítico — semana del 21 marzo

| feature | archivo | acción |
|---------|---------|--------|
| Repositionar hero con MCP como gancho | `HomepageHero.tsx` | reescribir copy |
| Mover MCP a feature #1 | `HomepageFeaturesSection.tsx` | reordenar + expandir |
| Agregar sección Pricing en homepage | nuevo componente `HomepagePricing.tsx` | crear |
| Nueva página `/pricing` | `app/pricing/page.tsx` | crear |
| Agregar "Founding Member" al navbar | `DocsNavbar.tsx` | agregar CTA button |
| Agregar link Pricing al navbar | `DocsNavbar.tsx` | agregar nav link |
| Añadir pestaña "AI Components" al showcase | `ComponentShowcaseTabs.tsx` | agregar |
| Corregir testimoniales falsos | `HomepageTestimonials.tsx` | reemplazar o rediseñar sección |
| Actualizar footer year | `HomepageCTA.tsx` | 2024 → 2026 |
| Corregir link GitHub | `DocsNavbar.tsx` + `HomepageCTA.tsx` | actualizar repo URL |
| Actualizar dominio en metadata | `app/layout.tsx` | orion-ds.dev → orionui.dev |
| Actualizar @orion-ds/react a 4.9.0 | `package.json` | bump version |

### Importante — semana del 28 marzo

| feature | archivo | acción |
|---------|---------|--------|
| Nueva página `/docs/mcp` | `app/docs/mcp/page.tsx` + `content/docs/mcp.mdx` | crear |
| Agregar MCP al sidebar | `DocsSidebar.tsx` | agregar item |
| Agregar ember + lemon al PreviewBrandModeBar | `PreviewBrandModeBar.tsx` | agregar 2 brands |
| Actualizar copies en docs (versiones, conteos) | archivos .mdx | actualizar números |
| Decidir arquitectura de previews (monorepo vs standalone) | `ComponentPreview.tsx` | resolver import path |

### Deseable — mes 2

| feature | descripción |
|---------|-------------|
| Dark mode toggle en PreviewBrandModeBar | Actualmente no existe en el area de preview |
| Changelog page | `/changelog` para comunicar actualizaciones |
| Buscador en componentes | Filtrar por nombre/categoría en `/components` |
| OG images dinámicas | Para cada componente y página de docs |
| `/docs/mcp` con demo interactivo | Mostrar en vivo el MCP instalando un componente |

---

## Decisión arquitectural pendiente — IMPORTANTE

`ComponentPreview.tsx` importa desde `../../registry/preview-modules/index`. Esto requiere que el docs-site viva dentro del monorepo de Orion.

**Decisión necesaria antes del 22 marzo:**
- ¿El docs-site se integra al monorepo de Orion como `/apps/docs`?
- ¿O se hace standalone y los preview modules se importan desde `@orion-ds/react`?

Recomendación: integrar al monorepo. Es la arquitectura estándar de design systems (Shadcn, Radix, MUI) y elimina el problema de raíz.

---

## Métricas de éxito

| métrica | semana 1 post-lanzamiento | mes 1 |
|---------|--------------------------|-------|
| Visitas únicas | 2,000 | 10,000 |
| Tiempo en página (homepage) | >60 seg | >90 seg |
| Click en "Get Started" o "Founding Member" | >8% | >10% |
| Usuarios Founding Member | 20 | 100 |
| GitHub stars desde el sitio | 200 | 500 |

---

## Criterios de lanzamiento

El sitio está listo para lanzar cuando:
- [ ] Hero comunica el MCP en las primeras 3 líneas
- [ ] Sección Pricing con Founding Member $29/mes visible en homepage
- [ ] Página `/pricing` funcional con Stripe o Lemon Squeezy conectado
- [ ] `/docs/mcp` con al menos quickstart y los 9 tools documentados
- [ ] Testimoniales: reales o reemplazados por formato alternativo
- [ ] GitHub link correcto en navbar y footer
- [ ] Dominio orionui.dev apuntando al deploy en Vercel
- [ ] Copyright año 2026
- [ ] Versión 4.9.0 en package.json

---

última actualización: 20 de marzo de 2026

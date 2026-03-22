# PRODUCT REQUIREMENTS — Orion Launch (March 22, 2026)

**Audience:** Design Lead + Frontend Dev + UX Writer
**Timeline:** 48 hours (target: March 22)
**Domain:** orionui.dev
**Deployment:** Vercel (Next.js 15 + React 19)

---

## User Personas & Value Props

### 1. **Builder with AI Agent** (Founder/Dev)
- Uses Claude Code, Cursor, Cline daily
- **Pain:** Installing components requires leaving the editor
- **Value:** MCP Server lets them install Orion components in one instruction
- **Activation:** See "MCP Server included" in Hero → Install MCP → Use Claude Code

### 2. **Product Designer**
- Building design patterns for AI-native interfaces
- **Pain:** Existing design systems don't account for agent reasoning patterns
- **Value:** Agentic components (AgentThinking, StreamText, ToolCall, ActionConfirmation)
- **Activation:** Browse sections → See "Agentic patterns" → Read extended docs in Pro tier

### 3. **Vibe Coder** (Non-technical Founder)
- Wants ship-ready templates
- **Pain:** Can't code React but needs professional UI fast
- **Value:** 10 full-page templates + Figma Kit
- **Activation:** See "4 production-ready templates" in Pro → Click "Become Founding Member"

---

## THE 11 CHANGES + 2 NEW PAGES (13 Total Items)

---

## USER STORY 1 — Hero: MCP as Central Hook

**As:** Builder with AI Agent
**I need:** To understand in 2 seconds that Orion works with Claude Code
**So that:** I know this design system will save me time in my daily workflow

### Acceptance Criteria
- [ ] Hero badge shows "✦ MCP Server included — Claude Code ready" (use terminal/bot icon)
- [ ] Title: "The design system your AI agent already knows."
- [ ] Description: "Install components with a single instruction to Claude Code. 72 components, 26 sections, 10 templates — governed by Chain of Truth."
- [ ] Trust indicators below buttons: `↗ 72 components | ↗ MCP Server | ↗ MIT License`
- [ ] Primary CTA: "Get Started Free" → `/docs/getting-started`
- [ ] Secondary CTA: "View on GitHub" → `https://github.com/alfredorodrigueztasso/orion`

### Implementation Notes
- Badge uses `variant="secondary"` with visual distinction (dot indicator or terminal icon)
- Trust indicators use icon prefix (↗ = arrow symbol or custom icon)
- File: `components/HomepageHero.tsx`

### Owner: **UX Writer (copy) + Frontend Dev (implementation)**
**Priority:** 🔴 CRÍTICO — Launch differentiator

---

## USER STORY 2 — Install Section: Add MCP Command

**As:** Builder with AI Agent
**I need:** Clear instructions on how to set up the MCP Server
**So that:** I can activate Claude Code integration in 60 seconds

### Acceptance Criteria
- [ ] Two tabs in install section: "npm install" + "MCP Setup"
- [ ] Tab 1 (npm): `npm install @orion-ds/react` (existing)
- [ ] Tab 2 (MCP): `npx @orion-ds/mcp` with note: *"Claude Code can then install any Orion component directly from your conversation."*
- [ ] Copy is concise and action-oriented (no explanation of what MCP is)
- [ ] Visual style matches existing HomepageInstall design (tabs, copy-to-clipboard)

### Implementation Notes
- Reuse Tabs component from @orion-ds/react with `id="npm"` and `id="mcp"`
- MCP tab note uses secondary text color: `var(--text-secondary)`
- File: `components/HomepageInstall.tsx`

### Owner: **Frontend Dev**
**Priority:** 🔴 CRÍTICO — Unblocks MCP adoption

---

## USER STORY 3 — Logo Cloud: Rebrand as AI-Native Workflows

**As:** Builder with AI Agent
**I need:** To see that Orion is specifically designed for AI tools I already use
**So that:** I immediately recognize this is built for me

### Acceptance Criteria
- [ ] Eyebrow changes from "Works with" to "Built for AI-native workflows"
- [ ] Title changes to "Your AI agent can use Orion directly"
- [ ] Logos updated to: Claude Code, Cursor, Cline, Continue, React, Next.js, TypeScript
- [ ] Remove any non-AI tool logos (frameworks that don't integrate with MCP)
- [ ] Logo grid responsive: 4 cols on desktop, 2 cols on mobile

### Implementation Notes
- Find or create SVG logos for: Claude Code (can be Claude logo?), Cursor, Cline, Continue
- Keep existing react.svg, nextjs.svg, typescript.svg
- File: `components/HomepageLogoCloud.tsx`

### Owner: **Design Lead (logos) + Frontend Dev (layout)**
**Priority:** 🔴 CRÍTICO — Messaging alignment

---

## USER STORY 4 — Features Section: MCP First, Reorder All

**As:** Product Designer + Builder
**I need:** To see MCP capabilities before technical details
**So that:** I understand the primary value prop immediately

### Acceptance Criteria
- [ ] Feature 1 (NEW ORDER): MCP Server native
  - Icon: Bot or Terminal
  - Title: "MCP Server native"
  - Description: "9 tools for Claude Code, Cursor and Cline. Your AI agent discovers, searches and installs Orion components directly — without leaving the conversation."
- [ ] Feature 2: Chain of Truth (was #1)
  - Icon: Zap
  - Title: "Chain of Truth"
  - Description: "Token-governed architecture that eliminates UI hallucination. Primitives, semantics, and components stay strictly separated — AI-generated code stays consistent."
- [ ] Feature 3: 72 components (was #2)
  - Icon: Package
  - Title: "72 components"
  - Description: "Production-ready React components with full TypeScript support, built-in accessibility, and AI-first validation."
- [ ] Feature 4: 26 sections (new numbering)
  - Icon: Layers
  - Title: "26 sections"
  - Description: "Pre-built page blocks for hero sections, features grids, pricing tables, and more — ready to compose."
- [ ] Feature 5: 6 brands (update from 4)
  - Icon: Palette
  - Title: "6 brands"
  - Description: "Multi-brand architecture via data-brand. Switch between orion, red, deepblue, orange, ember and lemon with a single attribute."
- [ ] Feature 6: Dark mode (was #6)
  - Icon: Moon
  - Title: "Dark mode"
  - Description: "Full light/dark theme support with semantic token mappings. No hardcoded colors, zero visual drift."

### Implementation Notes
- Update icon imports from lucide-react: Bot, Zap, Package, Layers, Palette, Moon
- Reorder array elements in component state/props
- Update counts dynamically if possible (pull from registry for 72/26/10)
- File: `components/HomepageFeaturesSection.tsx`

### Owner: **UX Writer (copy) + Frontend Dev (reorder)**
**Priority:** 🔴 CRÍTICO — Message hierarchy

---

## USER STORY 5 — New Pricing Section on Homepage

**As:** Product Manager (internal)
**I need:** Pricing visible on homepage to drive Founding Member conversions
**So that:** Users see monetization model before leaving to docs

### Acceptance Criteria
- [ ] New component created: `components/HomepagePricing.tsx`
- [ ] Placed in `app/page.tsx` AFTER `<HomepageStats />`, BEFORE testimonials
- [ ] Eyebrow: "Pricing"
- [ ] Title: "Start free. Go Pro when you're ready."
- [ ] Description: "All core components are open source and free forever. Pro unlocks agentic patterns, templates and the Figma Kit."
- [ ] 3 pricing cards (see detailed spec below)

### Pricing Cards

#### **Card 1: Free**
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

#### **Card 2: Founding Member** (HIGHLIGHTED — prominent border, badge, background)
```
Badge: "200 spots available" (update count when Stripe integrated)
Price: $29 / month
Subtitle: Locked in. Then $49/mes — price fixed forever if you enter now.
Features:
  ✓ Everything in Free
  ✓ 10+ AI/Agentic components (AgentThinking, StreamText, ToolCall, ActionConfirmation...)
  ✓ 4 production-ready templates
  ✓ Figma Kit complete
  ✓ Extended documentation — "why" behind each pattern
  ✓ Private Slack channel
  ✓ Early access to new components
CTA: "Become a Founding Member" (variant: primary)
Urgency note: "Price increases to $49/month after first 200 members."
```

#### **Card 3: Team**
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

### Implementation Notes
- Founding Member card: Use `border-brand` (Orion blue), `background: surface-layer` (subtle), badge with `variant="secondary"` + urgent copy
- Use @orion-ds/react Card component with custom styling
- Cards responsive: 1 col on mobile, 3 cols on desktop
- File: `components/HomepagePricing.tsx`

### Owner: **Design Lead (visual hierarchy) + Frontend Dev (component) + UX Writer (copy)**
**Priority:** 🔴 CRÍTICO — Monetization visibility

---

## USER STORY 6 — New Pricing Page (/pricing)

**As:** Prospect interested in Pro tier
**I need:** Full pricing page with FAQ to make an informed decision
**So that:** I understand what I'm paying for before subscribing

### Acceptance Criteria
- [ ] Create `app/pricing/page.tsx`
- [ ] Page structure:
  - Simple hero: "Simple, transparent pricing"
  - Same 3 pricing cards (from Story 5) with MORE detail if desired
  - FAQ section (5-7 questions)
  - Final CTA: "Start Free" → `/docs/getting-started`
- [ ] FAQ questions:
  - "Can I use Orion free forever?"
  - "What happens when 200 spots run out?"
  - "Is MCP Server included in Free?"
  - "How does the Team plan work?"
  - "Do you offer discounts for startups or students?"
- [ ] SEO metadata: Include `og:title`, `og:description`, `og:image`

### Implementation Notes
- Reuse pricing card components from HomepagePricing (DRY)
- FAQ: Use Accordion component from @orion-ds/react
- Copy for FAQ written by UX Writer
- File: `app/pricing/page.tsx`

### Owner: **Frontend Dev (layout) + UX Writer (copy & FAQ)**
**Priority:** 🟡 ALTO — Supports conversion

---

## USER STORY 7 — Replace Testimonials (DECISION REQUIRED)

**As:** Product Manager
**I need:** Social proof that doesn't include fake testimonials
**So that:** Launch credibility is maintained

### Acceptance Criteria

**⚠️ DECISION POINT:** Two options. Choose ONE:

#### **OPTION A — Social Proof Alternative (Recommended for Launch)**
- [ ] Replace `HomepageTestimonials.tsx` component with new `HomepageSocialProof.tsx`
- [ ] Content:
  - Eyebrow: "Community"
  - Title: "Built with Orion"
  - Live GitHub star count (fetch from GitHub API)
  - Weekly npm downloads (fetch from npm registry API)
  - Banner: "Design Intelligence — built entirely with Orion" (with link to example)
- [ ] No fake testimonials
- [ ] Real metrics only

#### **OPTION B — Real Testimonials (If 3+ secured by March 21)**
- [ ] Get 3 real testimonials with real names, roles, companies
- [ ] Update `HomepageTestimonials.tsx` with real data
- [ ] If not secured by March 21, fall back to OPTION A

### Owner: **Product Manager (sourcing) + Frontend Dev (implementation)**
**Priority:** 🟡 ALTO — Credibility blocker
**Deadline:** March 21 11am (decide by EOD)

---

## USER STORY 8 — Update Stats Section

**As:** Visitor
**I need:** To see current metrics that reflect Orion's growth
**So that:** I trust this is a maintained, real project

### Acceptance Criteria
- [ ] Stat 1: Component count (dynamic from registry) — e.g., "72"
- [ ] Stat 2: Section count (dynamic from registry) — e.g., "26"
- [ ] Stat 3: Template count (dynamic from registry) — e.g., "10"
- [ ] Stat 4: "9 MCP Tools" (static) with description: "AI agent integrations built-in"
- [ ] **NEW Stat 5:** "200" with label: "Founding Member spots" and description: "Limited early access pricing"
- [ ] Update `HomepageStats.tsx` to include 5th stat

### Implementation Notes
- Stat 5 should be visually distinct (maybe different color or size) to convey urgency
- If Stripe integration added later, stat 5 can become dynamic: `200 - spotsRemaining`
- File: `components/HomepageStats.tsx`

### Owner: **Frontend Dev**
**Priority:** 🟡 ALTO — Messaging reinforcement

---

## USER STORY 9 — Final CTA Section + Footer Corrections

**As:** Visitor ready to commit
**I need:** Clear final call-to-action + footer with correct links
**So that:** I know where to go next and can find you

### Acceptance Criteria

#### CTA Section (`components/HomepageCTA.tsx`)
- [ ] Title: "Start building with Orion today"
- [ ] Description: "Join builders creating AI-native interfaces. Free, open source, and ready to ship."
- [ ] Primary CTA: "Become a Founding Member" → `/pricing`
- [ ] Secondary CTA: "View on GitHub" → `https://github.com/alfredorodrigueztasso/orion`
- [ ] Footnote: "Open source · MIT License · Free forever for base components"

#### Footer Corrections
- [ ] Year updated: "© 2026 Orion Design System" (was 2024)
- [ ] GitHub link: `https://github.com/alfredorodrigueztasso/orion` (correct)
- [ ] NPM link: `https://npmjs.com/package/@orion-ds/react` (maintain)
- [ ] Docs link: `/docs/getting-started` (maintain)
- [ ] **NEW Link:** Pricing → `/pricing`

### Implementation Notes
- CTA text tone: colega directo, no corporativo
- Footer: Use semantic HTML `<footer>` with proper link structure
- File: `components/HomepageCTA.tsx` + update footer in `app/layout.tsx` or shared component

### Owner: **UX Writer (copy) + Frontend Dev (implementation)**
**Priority:** 🔴 CRÍTICO — Conversion path

---

## USER STORY 10 — Navbar: Add Pricing Link + Founding Member CTA

**As:** Visitor anywhere on site
**I need:** Quick access to Pricing from navigation
**So that:** I can jump to pricing decision without searching

### Acceptance Criteria
- [ ] Add "Pricing" link to NAV_LINKS array in `DocsNavbar.tsx`
  ```javascript
  { label: 'Pricing', href: '/pricing', match: '/pricing' }
  ```
- [ ] Add Founding Member CTA button before BrandPicker in Navbar.Actions
  ```jsx
  <Link href="/pricing">
    <Button variant="primary" size="sm">
      Founding Member
    </Button>
  </Link>
  ```
- [ ] GitHub link corrected to: `https://github.com/alfredorodrigueztasso/orion`
- [ ] Navbar responsive: CTA button hidden on mobile (show nav item instead)

### Implementation Notes
- Button size: `sm` for compact navbar
- Active link: Pricing link highlights when on `/pricing/*`
- File: `components/DocsNavbar.tsx`

### Owner: **Frontend Dev**
**Priority:** 🔴 CRÍTICO — Conversion funnel

---

## USER STORY 11 — ComponentShowcaseTabs: Add "AI Agents" Tab

**As:** Product Designer exploring AI-native patterns
**I need:** To see a preview of agentic components
**So that:** I understand what Pro tier includes

### Acceptance Criteria
- [ ] New tab added to ComponentShowcaseTabs: `{ id: 'ai-agents', label: 'AI Agents' }`
- [ ] Tab shows 3 placeholder examples using existing Orion components:
  - Spinner with label: "Agent thinking..." (uses existing `Spinner` component)
  - ProgressBar with 3 steps (uses existing `ProgressBar`)
  - Banner: "Full AI component library coming in Pro →" with link to `/pricing`
- [ ] Components styled with semantic tokens (no hardcoded colors)
- [ ] Copy uses future tense: "Coming in Pro tier" (not "is available")

### Implementation Notes
- Create subcomponent `AIAgentsShowcase` inside `ComponentShowcaseTabs.tsx`
- Spinner: Use `<Spinner />` from @orion-ds/react with aria-label="Agent thinking"
- ProgressBar: Show state progression (step 1 → 2 → 3)
- Banner: Uses Card component with primary CTA button
- File: `components/ComponentShowcaseTabs.tsx`

### Owner: **Design Lead (visual treatment) + Frontend Dev (implementation)**
**Priority:** 🟡 ALTO — Future roadmap visibility

---

## NEW CONTENT — MCP Documentation Page

**As:** Developer interested in MCP Server
**I need:** Complete documentation on how to set up and use MCP with Orion
**So that:** I can activate Claude Code integration confidently

### Acceptance Criteria
- [ ] Create new doc page: `content/docs/mcp.mdx`
- [ ] Structure:
  1. **Hero section:** "MCP Server (@orion-ds/mcp) — The only design system with native MCP integration."
  2. **Why it matters:** Explain problem it solves (copy 3-4 paragraphs)
  3. **Installation:** `npx @orion-ds/mcp`
  4. **Setup by tool:**
     - Claude Code: [Instructions]
     - Cursor: [Instructions]
     - Cline: [Instructions]
     - Continue: [Instructions]
  5. **The 9 tools available:** Table with tool name + description:
     - `discover` — Search Orion components by name or description
     - `search-tokens` — Find design tokens by property
     - `get-component` — Fetch component code + variants
     - `get-section` — Fetch section code
     - `get-template` — Fetch template code
     - `list-components` — List all available components
     - `list-sections` — List all available sections
     - `list-templates` — List all available templates
     - `install` — Install component directly to user's project
  6. **Real usage example:** Conversation showing Claude Code discovering → installing a Button component
  7. **Troubleshooting:** FAQ for common setup issues
- [ ] Add sidebar link: `{ id: 'mcp', label: 'MCP Server', href: '/docs/mcp', icon: <Bot size={18} /> }`
- [ ] SEO: `og:title: "MCP Server Documentation — Orion Design System"`

### Implementation Notes
- MCP docs are THE story of why Orion is different
- Copy tone: Technical but not overly complex
- Example conversation should feel real (not marketing fluff)
- Use Code blocks with syntax highlighting for setup instructions
- File: `content/docs/mcp.mdx` + update `components/DocsSidebar.tsx`

### Owner: **UX Writer (copy & structure) + Frontend Dev (sidebar link)**
**Priority:** 🔴 CRÍTICO — Core differentiator story

---

## CORRECTIONS & MINOR UPDATES

### package.json
- [ ] Update `@orion-ds/react` from `^4.6.2` to `^4.9.0`
- [ ] Verify all dependencies resolve without errors
- [ ] Run `npm install` and `npm run build` to confirm

### app/layout.tsx (Metadata)
- [ ] Update metadata object:
  ```typescript
  url: 'https://orionui.dev',  // was orion-ds.dev
  siteName: 'Orion Design System',
  title: 'Orion Design System',
  description: 'The design system your AI agent already knows. 72 components, MCP Server native, Chain of Truth architecture.',
  keywords: ['design system', 'components', 'react', 'mcp', 'claude code', 'cursor', 'ai-native', 'agent'],
  ```
- [ ] Add to localStorage script:
  ```javascript
  brands=['orion','red','deepblue','orange','ember','lemon']
  ```

### components/PreviewBrandModeBar.tsx
- [ ] Add `ember` and `lemon` to BRANDS array with hex colors:
  ```typescript
  { label: 'Ember', value: 'ember', color: '#F15D22' },  // red-orange
  { label: 'Lemon', value: 'lemon', color: '#FFD700' },  // yellow
  ```

### content/docs/getting-started.mdx
- [ ] Update all counts to current registry:
  - "72 components" (was 69+)
  - "26 sections" (verify actual count)
  - "10 templates" (verify actual count)
  - "6 brands: orion, red, deepblue, orange, ember, lemon" (was 4)
- [ ] Replace all URLs `orion-ds.vercel.app` with `orionui.dev`

### Other .mdx docs
- [ ] Search for hardcoded counts: "69", "44", "12", "4 brands"
- [ ] Replace with current values from registry

### Owner: **Frontend Dev (code changes) + UX Writer (copy review)**
**Priority:** 🟡 ALTO — Consistency

---

## IMPLEMENTATION ORDER (Recommended for Cursor)

1. ✅ `package.json` — Bump to 4.9.0, verify build
2. ✅ `app/layout.tsx` — Update metadata, domains, brands array
3. ✅ `components/HomepageHero.tsx` — New copy (MCP hook)
4. ✅ `components/HomepageFeaturesSection.tsx` — Reorder features, MCP first
5. ✅ `components/HomepageLogoCloud.tsx` — AI tools, new messaging
6. ✅ `components/HomepageInstall.tsx` — Add MCP tab
7. ✅ `components/DocsNavbar.tsx` — Pricing link + Founding Member CTA + GitHub fix
8. ✅ Create `components/HomepagePricing.tsx` — New pricing section
9. ✅ `app/page.tsx` — Insert `<HomepagePricing />` after Stats
10. ✅ `components/HomepageStats.tsx` — Add 5th stat (200 Founding Member spots)
11. ✅ `components/HomepageTestimonials.tsx` OR create `HomepageSocialProof.tsx` — Testimonials decision
12. ✅ `components/HomepageCTA.tsx` — New copy + footer links
13. ✅ `components/ComponentShowcaseTabs.tsx` — Add AI Agents tab
14. ✅ Create `app/pricing/page.tsx` — Full pricing page + FAQ
15. ✅ Create `content/docs/mcp.mdx` — MCP documentation
16. ✅ `components/DocsSidebar.tsx` — Add MCP link
17. ✅ `components/PreviewBrandModeBar.tsx` — Add ember/lemon brands
18. ✅ Update all `.mdx` files — Counts, URLs, metadata

---

## OWNERSHIP MATRIX

| Role | Ownership | Tasks |
|------|-----------|-------|
| **UX Writer** | Copy, messaging, tone | Hero, Install, Features, Pricing (cards + copy), CTA, FAQ, MCP docs, Testimonials decision |
| **Frontend Dev** | Implementation, components, integration | Install tabs, Logo grid responsive, Features reorder, Pricing component, Pricing page, Stats, Navbar, CTA, AI Agents tab, Sidebar link, Brand colors, Metadata |
| **Design Lead** | Visual hierarchy, brand treatment, logos | Pricing card highlight (border/badge), Logo sourcing (Claude Code, Cursor, Cline, Continue), FAQ styling, AI Agents tab visuals |
| **Product Manager** | Strategy, testimonials sourcing, decision-making | Testimonials decision (Option A vs B), pricing validation, Founding Member spot count |

---

## CRITICAL PATH DEPENDENCIES

```
┌─ package.json (FIRST — blocks build)
├─ app/layout.tsx (SECOND — metadata, domains)
├─ Hero, Features, Install (PARALLEL — messaging core)
├─ HomepagePricing (DEPENDS ON Hero/Features complete)
├─ DocsNavbar (DEPENDS ON pricing page existence)
├─ app/pricing/page.tsx (DEPENDS ON HomepagePricing done)
├─ Testimonials decision (PARALLEL but URGENT — deadline March 21)
├─ MCP docs (DEPENDS ON Installation section clarity)
└─ Final review & corrections (LAST)
```

---

## LAUNCH CHECKLIST (Pre-Deploy)

- [ ] All 11 changes implemented
- [ ] Both new pages created (/pricing + /mcp)
- [ ] All URLs point to `orionui.dev` (not old domain)
- [ ] Metadata updated (title, description, keywords, og:*)
- [ ] Brand colors added (ember, lemon)
- [ ] `npm run build` successful (no errors/warnings)
- [ ] `npm run type-check` passes
- [ ] Preview on Vercel staging matches design
- [ ] GitHub link works
- [ ] MCP command tested locally: `npx @orion-ds/mcp`
- [ ] Pricing page loads without errors
- [ ] All CTAs link to correct routes
- [ ] Mobile responsive (test on 375px and 768px viewports)
- [ ] Accessibility: Run axe/WAVE on hero + pricing page
- [ ] Copy reviewed by founder/PO
- [ ] Testimonials finalized (real or social proof)
- [ ] Deploy to production

---

## BLOCKERS & DECISIONS

| Item | Status | Owner | Deadline |
|------|--------|-------|----------|
| Testimonials (real vs. social proof) | ⚠️ PENDING | Product Manager | March 21 11am |
| MCP tools list (9 tools finalized) | ✅ COMPLETE | MCP Dev | N/A |
| GitHub repo public + correct | ✅ VERIFY | DevOps/PO | Pre-launch |
| Stripe integration for spot counter | ❌ OUT OF SCOPE | Backend | Post-launch |
| Brand logo assets (Claude Code, Cursor, Cline, Continue) | ⚠️ PENDING | Design Lead | March 21 5pm |

---

## SUCCESS METRICS (Post-Launch)

- [ ] Conversion to Founding Member: > 5% of visitors
- [ ] MCP setup completion: > 40% of free signups
- [ ] GitHub stars: +50 in first week
- [ ] Testimonials collected: 3+ real ones by April 5
- [ ] Organic search traffic: MCP keywords ranking by April 15

---

**Last Updated:** March 21, 2026
**Status:** Ready for team distribution
**Questions?** Reach out to PO before starting Story 1

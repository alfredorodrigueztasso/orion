# Orion Landing Page — Copy Rewrite (MCP-First Strategy)

**Date**: March 21, 2026
**Audience**: Frontend Dev (implementation)
**Format**: Copy table + implementation notes
**Duration**: 3-4 hours

---

## Copy Rewrite Table

All changes follow the **MCP Server-first positioning** with emphasis on what users DO, not what the product IS.

| # | Sección | Elemento | Actual | NUEVO | Tipo | Notas |
|---|---------|----------|--------|-------|------|-------|
| **1** | **Hero** | Badge | ✨ Chain of Truth | 🔌 MCP Server included — Code-ready | Badge | MCP es el diferenciador |
| **1** | **Hero** | Title (highlight color) | The **AI-first** Design System | The design system your AI agent **already knows** | Title | Change "already" to highlight en Hero.Highlight |
| **1** | **Hero** | Description | Token-governed components that eliminate UI hallucination. Build consistent interfaces at scale — without visual drift. | Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and integrates Orion components directly. 9 tools built in. No API config needed. | Description | User-focused: what you do with AI agents |
| **1** | **Hero** | Primary CTA | Get Started | Get Started Free | Button | Reinforce "free" |
| **1** | **Hero** | Secondary CTA | GitHub | GitHub Repo | Button | Clearer call-to-action |
| **1** | **Hero** | Trust Indicator 1 | ↗ 72 components | ↗ 72 components | Badge | Keep as-is |
| **1** | **Hero** | Trust Indicator 2 | ↗ 41 sections | ↗ 41 sections | Badge | Keep as-is |
| **1** | **Hero** | Trust Indicator 3 | ↗ 10 templates | ↗ 10 templates | Badge | Keep as-is |
| | | | | | | |
| **2** | **Install** | Eyebrow | Install | Installation | Label | More formal |
| **2** | **Install** | Tab 1 | pnpm | pnpm (Recommended) | Tab | Emphasize pnpm |
| **2** | **Install** | Tab 2 | npm | npm | Tab | Keep |
| **2** | **Install** | Tab 3 | yarn | yarn | Tab | Keep |
| **2** | **Install** | NEW Tab 4 | (no existe) | Claude Code | Tab | NEW: Install guide for MCP Server setup |
| **2** | **Install** | Tab 4 Description | — | npx @orion-ds/mcp init — 9 tools for AI agents | Description | How to enable MCP in Claude Code |
| | | | | | | |
| **3** | **Logo Cloud** | Eyebrow | Compatible with | Built in | Eyebrow | Shift from "works with" to "built in" |
| **3** | **Logo Cloud** | Title | Works with your entire stack | Native support in React · Next.js · TypeScript · Claude Code | Title | Emphasize MCP native support |
| **3** | **Logo Cloud** | Logos | React, Next.js, TS, Vite, MCP, Remix | React, Next.js, TypeScript, Vite, Claude Code / Cursor / Cline, Remix | Logos | Add AI agents to MCP logo label |
| | | | | | | |
| **4** | **Features** | Eyebrow | Why Orion | Built for your workflow | Eyebrow | Focus on workflow, not philosophy |
| **4** | **Features** | Title | Built for the AI era | Components that ship with your AI tools | Title | User-centric: "your AI tools" |
| **4** | **Features** | Description | Every design decision in Orion is governed by tokens, validated by automation, and consumable by AI agents. | Start with components. Discover more via MCP. Integrate without friction. Every component is token-governed and AI-discoverable. | Description | Three-step user journey |
| **4** | **Features** | Feature 1 Icon & Title | 🤖 AI-Native | 🔌 MCP Server | Icon/Title | MOVED TO FEATURE 1 (was Feature 6) |
| **4** | **Features** | Feature 1 Description | MCP server, CLI installer, HTTP registry API, and validation tools purpose-built for AI-assisted development. | 9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components, searches patterns, and installs directly into your project. | Description | USER action focus: "your AI agent discovers..." |
| **4** | **Features** | Feature 2 Icon & Title | ⚡ Chain of Truth | ⚡ Chain of Truth | Icon/Title | Keep (now Feature 2) |
| **4** | **Features** | Feature 2 Description | Token-governed architecture eliminates UI hallucination. Primitives, semantics, and components stay strictly separated. | Token-governed architecture. No hardcoded values. Components reference semantic tokens. Your AI agent generates predictable styles. | Description | Emphasize prediction + consistency |
| **4** | **Features** | Feature 3 Icon & Title | 📦 72 Components | 📦 72 Components | Icon/Title | Reordered (Feature 3) |
| **4** | **Features** | Feature 3 Description | Production-ready React components with full TypeScript support, built-in accessibility, and Storybook coverage. | Production-ready React components. Full TypeScript. Accessibility built in. Deploy with confidence. | Description | Simplify: emphasize readiness |
| **4** | **Features** | Feature 4 Icon & Title | 🎨 4 Brands | 🎨 Multi-Brand | Icon/Title | Make more inclusive |
| **4** | **Features** | Feature 4 Description | Multi-brand architecture via data-brand. Switch between orion, red, deepblue, and orange with a single attribute. | Multi-brand support. Orion, Red, Deep Blue, Orange. Switch brands with one attribute. Zero refactoring. | Description | Emphasize zero refactoring |
| **4** | **Features** | Feature 5 Icon & Title | 🌙 Dark Mode | 🌙 Light & Dark | Icon/Title | Make more inclusive |
| **4** | **Features** | Feature 5 Description | Full light/dark theme support with semantic token mappings. No hardcoded colors, zero visual drift. | Full light/dark support. Semantic tokens handle the switch. No hardcoded values. Consistency across themes. | Description | Emphasize semantic consistency |
| **4** | **Features** | Feature 6 Icon & Title | 📄 41 Sections | 📄 41 Sections | Icon/Title | Reordered (Feature 6) |
| **4** | **Features** | Feature 6 Description | Pre-built page blocks for hero sections, features grids, pricing tables, and more — ready to compose. | Pre-built page blocks. Heroes, features, pricing, testimonials, footers. Compose pages in hours, not days. | Description | Emphasize speed (hours not days) |
| | | | | | | |
| **5** | **Pricing** | Section Title | Start free. Go Pro when you're ready. | Start free. Scale with Orion. | Title | Simplify value prop |
| **5** | **Pricing** | Section Description | All core components are open source and free forever. Pro unlocks agentic patterns, the Figma Kit and premium templates. | Core components: free forever. Founding Member: locks in $29/mo pricing. Includes MCP + AI components + Figma Kit. | Description | Emphasize pricing lock + benefits |
| **5** | **Pricing** | Plan 1 Name | Free | Free | Name | Keep |
| **5** | **Pricing** | Plan 1 Price | $0 | $0 | Price | Keep |
| **5** | **Pricing** | Plan 1 Period | / forever | forever | Period | Simplify text |
| **5** | **Pricing** | Plan 1 Description | Everything you need to start building. | Get building. No credit card. Everything free. | Description | More casual, direct |
| **5** | **Pricing** | Plan 1 Feature 1 | 72 base components | 72 components | Feature | Simplify "base" |
| **5** | **Pricing** | Plan 1 Feature 2 | 26 sections | 41 sections | Feature | Update to current count |
| **5** | **Pricing** | Plan 1 Feature 3 | 10 templates | 10 templates | Feature | Keep |
| **5** | **Pricing** | Plan 1 Feature 4 | CLI installer | CLI installer | Feature | Keep |
| **5** | **Pricing** | Plan 1 Feature 5 | MCP Server — 9 tools | MCP Server (9 tools) | Feature | Parentheses instead of em-dash |
| **5** | **Pricing** | Plan 1 Feature 6 | Chain of Truth architecture | Token-governed | Feature | Simplify terminology |
| **5** | **Pricing** | Plan 1 Feature 7 | Dark mode + 6 brands | Light/dark + 4 brands | Feature | Correct counts |
| **5** | **Pricing** | Plan 1 Feature 8 | MIT License | MIT License | Feature | Keep |
| **5** | **Pricing** | Plan 1 CTA | Get Started Free | Get Started Free | Button | Keep |
| **5** | **Pricing** | Plan 2 Name | Founding Member | Founding Member | Name | Keep |
| **5** | **Pricing** | Plan 2 Price | $29 | $29 | Price | Keep (lock-in value) |
| **5** | **Pricing** | Plan 2 Period | / month | /month | Period | Remove space |
| **5** | **Pricing** | Plan 2 Badge/Eyebrow | popular (implicit) | 200 spots · X remaining | Badge | Add scarcity signal |
| **5** | **Pricing** | Plan 2 Description | First 200 users. Price locks forever. | 200 spots total. Price locks in forever. Then $49/mo. | Description | Explicit countdown + scarcity |
| **5** | **Pricing** | Plan 2 Feature 1 | Everything in Free | Everything in Free | Feature | Keep |
| **5** | **Pricing** | Plan 2 Feature 2 | 10+ AI / Agentic components | 10 AI components | Feature | Simplify wording |
| **5** | **Pricing** | Plan 2 Feature 3 | AgentThinking · StreamText · ToolCall | AgentThinking, StreamText, ToolCall | Feature | Use commas (clearer) |
| **5** | **Pricing** | Plan 2 Feature 4 | ActionConfirmation · DiffViewer · ContextBar | ActionConfirmation, DiffViewer, ContextBar | Feature | Use commas |
| **5** | **Pricing** | Plan 2 Feature 5 | 4 production-ready AI templates | 4 AI templates | Feature | Simplify |
| **5** | **Pricing** | Plan 2 Feature 6 | Figma Kit completo | Figma Kit (complete) | Feature | Use parentheses |
| **5** | **Pricing** | Plan 2 Feature 7 | Extended docs — the "why" behind each pattern | Extended docs + design rationale | Feature | Simplify |
| **5** | **Pricing** | Plan 2 Feature 8 | Private Slack channel | Private Slack group | Feature | "group" more welcoming than "channel" |
| **5** | **Pricing** | Plan 2 Feature 9 | Early access to new components | Early access to features | Feature | Broader than just components |
| **5** | **Pricing** | Plan 2 CTA | Become a Founding Member | Become a Founding Member | Button | Keep |
| **5** | **Pricing** | Plan 3 Name | Team | Team | Name | Keep |
| **5** | **Pricing** | Plan 3 Price | $149 | $149 | Price | Keep |
| **5** | **Pricing** | Plan 3 Period | / month | /month | Period | Remove space |
| **5** | **Pricing** | Plan 3 Description | Up to 5 people. With design guidance. | 5 seats. 1 design session/month. Priority support. | Description | More specific benefits |
| **5** | **Pricing** | Plan 3 Feature 1 | Everything in Pro | Everything in Founding | Feature | Correct tier name |
| **5** | **Pricing** | Plan 3 Feature 2 | Up to 5 seats | 5 user seats | Feature | Simplify |
| **5** | **Pricing** | Plan 3 Feature 3 | Brand customization guidance | Brand customization | Feature | Simplify |
| **5** | **Pricing** | Plan 3 Feature 4 | 1 design session / month (30 min) | Monthly design session (30 min) | Feature | Reword |
| **5** | **Pricing** | Plan 3 Feature 5 | Priority support | Priority email support | Feature | Add specificity |
| **5** | **Pricing** | Plan 3 CTA | Contact Us | Get in Touch | Button | More friendly |
| **5** | **Pricing** | Footnote | Price increases to $49/month after the first 200 Founding Members. | Price increases to $49/mo after 200 Founding Members are locked. | Note | Emphasize "locked in" |
| | | | | | | |
| **6** | **Stats** | Eyebrow | The numbers | Built to scale | Eyebrow | Forward-looking |
| **6** | **Stats** | Title | Everything you need, nothing you don't | Shipping at scale, from day one | Title | Emphasize shipping capability |
| **6** | **Stats** | Description | Orion ships with a complete set of production-ready building blocks. | 72 components, 41 sections, 10 templates. 9 MCP tools. Built in. Ready to go. | Description | More direct, shorter |
| **6** | **Stats** | Stat 1 Value | 72 | 72 | Stat | Keep |
| **6** | **Stats** | Stat 1 Label | Components | Components | Label | Keep |
| **6** | **Stats** | Stat 1 Description | Ready-to-use React building blocks | Production-ready React | Description | Shorten |
| **6** | **Stats** | Stat 2 Value | 41 | 41 | Stat | Keep |
| **6** | **Stats** | Stat 2 Label | Sections | Sections | Label | Keep |
| **6** | **Stats** | Stat 2 Description | Pre-composed page blocks | Pre-built page blocks | Description | Simplify |
| **6** | **Stats** | Stat 3 Value | 10 | 10 | Stat | Keep |
| **6** | **Stats** | Stat 3 Label | Templates | Templates | Label | Keep |
| **6** | **Stats** | Stat 3 Description | Full-page starter layouts | Full-page layouts | Description | Shorten |
| **6** | **Stats** | Stat 4 Value | 9 | 9 | Stat | Keep |
| **6** | **Stats** | Stat 4 Label | MCP Tools | MCP Tools | Label | Keep (now prominent) |
| **6** | **Stats** | Stat 4 Description | AI agent integrations | AI agent integrations | Description | Keep |
| | | | | | | |
| **7** | **Social Proof** | Eyebrow | Community | Community & Trust | Eyebrow | Add trust signal |
| **7** | **Social Proof** | Title | Built with Orion | Used by builders who ship | Title | Focus on user action |
| **7** | **Social Proof** | Description | Open source since day one. Used in production by builders who ship fast. | MIT open source. 5 npm packages. Trusted by developers shipping AI-first products. | Description | Emphasize trust + speed |
| **7** | **Social Proof** | Proof 1 Value | Open Source | MIT Licensed | Label | Clearer |
| **7** | **Social Proof** | Proof 1 Label | MIT License | Open Source | Value | Clearer |
| **7** | **Social Proof** | Proof 1 Description | Free to use, modify and distribute forever | Free forever. Modify, distribute, use in production. | Description | More direct |
| **7** | **Social Proof** | Proof 2 Value | 5 | 5 | Value | Keep |
| **7** | **Social Proof** | Proof 2 Label | npm packages | npm packages | Label | Keep |
| **7** | **Social Proof** | Proof 2 Description | @orion-ds/react · cli · mcp · create · validate | @orion-ds/react (main), cli, mcp, create, validate | Description | Clarify @orion-ds/react is main |
| **7** | **Social Proof** | Proof 3 Value | Design Intelligence | Used in Production | Value | Change to shipping reality |
| **7** | **Social Proof** | Proof 3 Label | Built with Orion | Trusted by Builders | Label | Change to user trust |
| **7** | **Social Proof** | Proof 3 Description | AI-powered UX reviewer — 100% Orion components | Shipping products powered by Orion. Design & Code. | Description | Focus on shipping |
| | | | | | | |
| **8** | **CTA Section** | Title | Start building with Orion today | Ship AI-first products faster | Title | Emphasize speed + AI |
| **8** | **CTA Section** | Description | Join developers building AI-first interfaces. Free, open-source, and ready to ship. | Ship with components that work with Claude Code, Cursor, Cline. Free to start. Open source forever. | Description | Emphasize agent compatibility |
| **8** | **CTA Section** | Primary CTA | Get Started Free | Get Started Free | Button | Keep |
| **8** | **CTA Section** | Secondary CTA | View on GitHub | View on GitHub | Button | Keep |
| **8** | **CTA Section** | Footnote | Open source · MIT License · No credit card required | MIT Licensed · Open Source · No credit card | Footnote | Reorder, simplify |
| | | | | | | |
| **9** | **Footer** | Copyright | © 2024 Orion Design System. Built with AI-first principles. | © 2026 Orion Design System. Built for AI-first products. | Text | Update year, slightly soften |
| **9** | **Footer** | Link 1 | GitHub | GitHub | Link | Keep |
| **9** | **Footer** | Link 2 | NPM | NPM Registry | Link | Clarify |
| **9** | **Footer** | Link 3 | Docs | Documentation | Link | More formal |
| **9** | **Footer** | NEW Link 4 | (no existe) | Pricing | Link | Add Pricing link |
| **9** | **Footer** | NEW Link 5 | (no existe) | Privacy | Link | Add Privacy link (legal) |
| | | | | | | |
| **10** | **Navbar** | Logo | Orion DS | Orion | Logo | Simplify (remove "DS") |
| **10** | **Navbar** | Nav Link 1 | Docs | Docs | Link | Keep |
| **10** | **Navbar** | Nav Link 2 | Components | Components | Link | Keep |
| **10** | **Navbar** | Nav Link 3 | Sections | Sections | Link | Keep |
| **10** | **Navbar** | Nav Link 4 | Templates | Templates | Link | Keep |
| **10** | **Navbar** | NEW Nav Link 5 | (no existe) | Pricing | Link | Add Pricing link |
| **10** | **Navbar** | Brand Picker | (exists) | (exists) | Icon Button | Keep |
| **10** | **Navbar** | Theme Toggle | (exists) | (exists) | Icon Button | Keep |
| **10** | **Navbar** | GitHub Link | (exists) | (exists) | Icon Button | Keep |
| | | | | | | |
| **11** | **Component Showcase Tabs** | Section Title | Component Gallery | Interactive Components | Title | More descriptive |
| **11** | **Component Showcase Tabs** | Section Description | Explore all component variants and states. Every component is built with Orion's design tokens. | Every component. Every variant. Every state. Built with design tokens. Copy the code. Integrate with MCP. | Description | Add MCP mention + call to action |
| **11** | **Component Showcase Tabs** | Tab 1 | Buttons | Buttons | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 2 | Cards | Cards | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 3 | Badges | Badges | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 4 | Alerts | Alerts | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 5 | Forms | Forms | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 6 | Feedback | Feedback | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 7 | Navigation | Navigation | Tab | Keep |
| **11** | **Component Showcase Tabs** | Tab 8 | Avatars | Avatars | Tab | Keep |
| **11** | **Component Showcase Tabs** | NEW Tab 9 | (no existe) | AI Agents | Tab | NEW: Show MCP integrations |
| **11** | **Component Showcase Tabs** | Tab 9 Description | — | 9 tools. Search. Discover. Install. Components + Sections + Templates. One CLI. One MCP Server. One workflow. | Description | Explain MCP workflow |
| **11** | **Component Showcase Tabs** | Tab 9 Content | — | Show: MCP Logo · Claude Code icon · Cursor icon · Cline icon. Text: "npm install @orion-ds/mcp" · "npx @orion-ds/cli init" · Button: "View MCP Docs" | Content | Show integrations + commands |

---

## Implementation Notes

### Tone & Voice (Enforce Across All Copy)

- **No marketing fluff**: Remove "powerful", "revolutionary", "platform", "solution"
- **User-centric**: Always describe what the USER DOES, not what the PRODUCT IS
  - ❌ "AI-native components with agentic patterns"
  - ✅ "Your AI agent discovers, searches, and installs components"
- **Direct & collegial**: Speak like a dev to another dev
  - ❌ "Comprehensive component library ecosystem"
  - ✅ "72 components. Ready to go."
- **Action-first**: Every section should start with an action
  - ❌ "Orion has an MCP server"
  - ✅ "Your AI agent discovers components via MCP"

### MCP Server Positioning (Critical)

**Where MCP appears**:
1. **Hero Badge** (top-level differentiator)
2. **Hero Description** (what user does with it)
3. **Install section** (how to enable it — new tab)
4. **Logo Cloud** (shows MCP as native support)
5. **Features** (Feature 1, reordered)
6. **Pricing** (mentioned in Free plan)
7. **Stats** (9 MCP Tools metric)
8. **Component Showcase** (new "AI Agents" tab)
9. **CTA Section** (mentions agent compatibility)

**Messaging consistency**:
- "9 tools" (never "9 integrations" or "agentic capabilities")
- "Claude Code, Cursor, Cline" (the three agents we support)
- "Discover, search, install" (the three user actions enabled by MCP)
- "No API config needed" (differentiator vs. competitors)

### Pricing Scarcity Signal (Founding Member)

**New pattern for Plan 2 badge:**
```
200 spots · X remaining
```

This requires:
1. Stripe integration to track remaining spots
2. Dynamic counter (backend: `/api/founding-member-spots`)
3. Update badge daily via webhook

**Fallback if Stripe not ready by launch:**
```
200 spots (limited time)
```

### New Sections to Create

1. **Install Tab 4: "Claude Code"**
   - Show: `npx @orion-ds/mcp init`
   - Explain: "Enable MCP in Claude Code for component discovery"
   - CTA: "View MCP Setup Guide"

2. **Component Showcase Tab 9: "AI Agents"**
   - Icon row: Claude Code, Cursor, Cline logos
   - Commands: `npm install @orion-ds/mcp`, `npx @orion-ds/cli init`
   - CTA: "View MCP Documentation"
   - Layout: 3 columns (one tool per column)

### URL Updates (If Needed)

- **Hero secondary CTA**: Verify link is `https://github.com/alfredorodrigueztasso/orion`
- **Pricing contact**: Verify email is `hello@orionui.dev`
- **Footer privacy link**: Create `/privacy` page (legal requirement for Stripe)
- **MCP docs**: Link to `/docs/mcp` (create if doesn't exist)

### Visual Hierarchy (No Changes — Keep Current)

- Hero badge: secondary variant (gray accent)
- Primary CTA: 48px height, primary variant
- Secondary CTA: 48px height, ghost variant
- Feature icons: 24px (Lucide icons)
- Stats cards: 4-column grid (responsive)
- Pricing cards: 3-column grid, center card = "popular" (primary variant)

### Accessibility Notes

- All tabs require aria-label for new tabs (Install Tab 4, Showcase Tab 9)
- New CTA buttons need focus states (already in Orion Button)
- Footer links: add `rel="noopener noreferrer"` for external links
- Dark mode: test all copy contrast (heading, body, tertiary text)

---

## Measurement & KPIs

**What to track after launch**:

1. **Hero section engagement**
   - CTA click rate: "Get Started Free" vs. "GitHub Repo"
   - Average time on hero (scroll depth)

2. **Install section**
   - Which tab is clicked most? (pnpm, npm, yarn, Claude Code)
   - Copy-to-clipboard usage

3. **Pricing section**
   - Founding Member conversion rate
   - Effect of "X remaining" scarcity signal (A/B test with/without)

4. **Component Showcase**
   - New "AI Agents" tab: usage rate
   - Tab switching behavior (which tabs are stickiest?)

5. **Traffic source**
   - Organic (Google, social)
   - Referral (GitHub, Product Hunt, etc.)

**Success threshold**:
- Founding Member conversion: > 5% of landing page visits
- MCP section engagement: > 30% of users click Install Tab 4 or Showcase Tab 9
- Time on page: > 90 seconds (from current baseline)

---

## Files to Update (In Order)

### 1. Component Files

```bash
# Update Hero
docs-site/components/HomepageHero.tsx
- Line 25: Badge text
- Lines 28-36: Title with Hero.Highlight
- Line 38: Description
- Line 46: Primary CTA label
- Line 57: Secondary CTA label

# Update Install
docs-site/components/HomepageInstall.tsx
- Add Tab 4 for Claude Code
- Update Tab labels (pnpm with "(Recommended)")

# Update Features
docs-site/components/HomepageFeaturesSection.tsx
- Reorder items array (MCP first)
- Update all descriptions per table

# Update Pricing
docs-site/components/HomepagePricing.tsx
- Update all plan descriptions, features, CTAs
- Add "200 spots · X remaining" badge to Founding Member
- Add footnote about price increase

# Update Stats
docs-site/components/HomepageStats.tsx
- Update eyebrow, title, description
- Update stat descriptions

# Update Social Proof
docs-site/components/HomepageSocialProof.tsx
- Update eyebrow, title, description
- Update all three proof stats

# Update CTA
docs-site/components/HomepageCTA.tsx
- Update title, description
- Update CTA labels
- Update footnote

# Update Navbar
docs-site/components/DocsNavbar.tsx
- Update logo: remove "DS"
- Add "Pricing" nav link (after "Templates")

# Update Component Showcase
docs-site/components/ComponentShowcaseTabs.tsx
- Update section title
- Update section description
- Add new "AI Agents" tab with content

# Update Logo Cloud
docs-site/components/HomepageLogoCloud.tsx
- Update eyebrow, title
- Update MCPLogo label to "Claude Code / Cursor / Cline"
```

### 2. Footer

```bash
# Update CTA component (contains footer)
docs-site/components/HomepageCTA.tsx
- Update copyright year to 2026
- Update footer text
- Add "Pricing" and "Privacy" links
```

---

## Example: Before & After Snippet

### Hero Section

**BEFORE:**
```
✨ Chain of Truth
The AI-first Design System
Token-governed components that eliminate UI hallucination. Build consistent interfaces at scale — without visual drift.
[Get Started] [GitHub]
```

**AFTER:**
```
🔌 MCP Server included — Code-ready
The design system your AI agent already knows.
Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and integrates Orion components directly. 9 tools built in. No API config needed.
[Get Started Free] [GitHub Repo]
```

---

## Urgency & Scarcity Signals

**For Founding Member**:
1. **Price lock**: "$29/mo, then $49/mo" (emphasized in description)
2. **Spot counter**: "200 spots · 47 remaining" (dynamic via Stripe webhook)
3. **Early access**: "Early access to features" (in Feature 9)

**For General Audience**:
1. **Free forever**: "Free to start. Open source forever."
2. **No risk**: "No credit card required"
3. **Proof**: "Used by builders shipping AI-first products"

---

## Testing Checklist

- [ ] All copy tested in light/dark mode (contrast ≥ 4.5:1)
- [ ] Tab keyboard navigation (Install + Showcase)
- [ ] Mobile responsive (buttons, spacing, line breaks)
- [ ] Links work (GitHub, Pricing, Privacy, MCP docs)
- [ ] Copy doesn't exceed component width (test 1200px, 768px, 375px)
- [ ] CTA buttons have `:hover` and `:focus-visible` states
- [ ] Analytics tracking events added (CTA clicks, tab switches)
- [ ] Stripe webhook configured for spot counter (Founding Member)
- [ ] MCP docs page exists before launch (`/docs/mcp`)
- [ ] Privacy page exists before launch (`/privacy`)

---

**Status**: Ready for Frontend Dev implementation
**Estimated time**: 2-3 hours (copy + tab + links + testing)
**Deployed**: After testing complete


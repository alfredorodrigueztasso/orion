# Orion Landing Page — Copy Quick Reference

**For**: Frontend Dev (copy-paste during implementation)
**Date**: March 21, 2026
**Format**: Organized by component file

---

## 1. HomepageHero.tsx

```tsx
// LINE 25: Badge
ACTUAL:   ✨ Chain of Truth
NUEVO:    🔌 MCP Server included — Code-ready

// LINES 28-36: Title with Hero.Highlight
ACTUAL:   The <Hero.Highlight>AI-first</Hero.Highlight><br />Design System
NUEVO:    The design system your AI agent <Hero.Highlight>already knows</Hero.Highlight>

// LINE 38: Description
ACTUAL:   Token-governed components that eliminate UI hallucination. Build consistent interfaces at scale — without visual drift.
NUEVO:    Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and integrates Orion components directly. 9 tools built in. No API config needed.

// LINE 46: Primary CTA label
ACTUAL:   Get Started
NUEVO:    Get Started Free

// LINE 57: Secondary CTA label (in Link)
ACTUAL:   GitHub
NUEVO:    GitHub Repo

// LINES 70-78: Trust Indicators (Keep as-is — they're already correct)
```

---

## 2. HomepageInstall.tsx

```tsx
// ADD NEW TAB at line 62, in the map function, add this tab:
{
  pm: 'claude-code',
  label: 'Claude Code',
  command: 'npx @orion-ds/mcp init'
}

// ALTERNATIVE: Create a separate tabs array:
const INSTALL_TABS = [
  { id: 'pnpm', label: 'pnpm (Recommended)', command: 'pnpm add @orion-ds/react' },
  { id: 'npm', label: 'npm', command: 'npm install @orion-ds/react' },
  { id: 'yarn', label: 'yarn', command: 'yarn add @orion-ds/react' },
  { id: 'claude-code', label: 'Claude Code', command: 'npx @orion-ds/mcp init' },
];

// OPTIONAL: Change eyebrow text
ACTUAL:   Install
NUEVO:    Installation

// NOTE: Keep the description "npx @orion-ds/mcp init — 9 tools for AI agents" as a comment below the tab
```

---

## 3. HomepageFeaturesSection.tsx

```tsx
// REORDER AND UPDATE items array (line 24):

const features = [
  {
    icon: <Package size={24} />,  // OR: <Zap size={24} /> - either works
    title: 'MCP Server',
    description: '9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components, searches patterns, and installs directly into your project.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Chain of Truth',
    description: 'Token-governed architecture. No hardcoded values. Components reference semantic tokens. Your AI agent generates predictable styles.',
  },
  {
    icon: <Package size={24} />,
    title: '72 Components',
    description: 'Production-ready React components. Full TypeScript. Accessibility built in. Deploy with confidence.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Multi-Brand',
    description: 'Multi-brand support. Orion, Red, Deep Blue, Orange. Switch brands with one attribute. Zero refactoring.',
  },
  {
    icon: <Moon size={24} />,
    title: 'Light & Dark',
    description: 'Full light/dark support. Semantic tokens handle the switch. No hardcoded values. Consistency across themes.',
  },
  {
    icon: <Layers size={24} />,
    title: '41 Sections',
    description: 'Pre-built page blocks. Heroes, features, pricing, testimonials, footers. Compose pages in hours, not days.',
  },
];

// UPDATE eyebrow (line 17):
ACTUAL:   Why Orion
NUEVO:    Built for your workflow

// UPDATE title (line 18):
ACTUAL:   Built for the AI era
NUEVO:    Components that ship with your AI tools

// UPDATE description (line 19):
ACTUAL:   Every design decision in Orion is governed by tokens, validated by automation, and consumable by AI agents.
NUEVO:    Start with components. Discover more via MCP. Integrate without friction. Every component is token-governed and AI-discoverable.
```

---

## 4. HomepagePricing.tsx

```tsx
// Plan 1: Free

name: 'Free',
price: '$0',
period: 'forever',  // CHANGED from '/ forever'
description: 'Get building. No credit card. Everything free.',  // UPDATED
features: [
  '72 components',
  '41 sections',  // UPDATED from '26 sections'
  '10 templates',
  'CLI installer',
  'MCP Server (9 tools)',  // UPDATED: parentheses instead of em-dash
  'Token-governed',  // UPDATED: simplified
  'Light/dark + 4 brands',  // UPDATED
  'MIT License',
],
action: <Button variant="secondary">Get Started Free</Button>,

// Plan 2: Founding Member

name: 'Founding Member',
price: '$29',
period: '/month',
popular: true,
// ADD THIS (above description):
badge: '200 spots · X remaining',  // X = dynamic from /api/founding-member-spots
description: '200 spots total. Price locks in forever. Then $49/mo.',  // UPDATED
features: [
  'Everything in Free',
  '10 AI components',  // SIMPLIFIED from '10+ AI / Agentic components'
  'AgentThinking, StreamText, ToolCall',  // CHANGED: commas instead of dots
  'ActionConfirmation, DiffViewer, ContextBar',  // CHANGED: commas
  '4 AI templates',  // SIMPLIFIED
  'Figma Kit (complete)',  // CHANGED: parentheses
  'Extended docs + design rationale',  // SIMPLIFIED
  'Private Slack group',  // CHANGED: 'group' instead of 'channel'
  'Early access to features',  // CHANGED: broader than 'components'
],
action: <Button variant="primary">Become a Founding Member</Button>,

// Plan 3: Team

name: 'Team',
price: '$149',
period: '/month',  // CHANGED: remove space from '/ month'
description: '5 seats. 1 design session/month. Priority support.',  // UPDATED
features: [
  'Everything in Founding',  // CHANGED: 'Founding' not 'Pro'
  '5 user seats',  // SIMPLIFIED from 'Up to 5 seats'
  'Brand customization',  // SIMPLIFIED
  'Monthly design session (30 min)',  // REWORDED
  'Priority email support',  // ADDED: specificity
],
action: <Button variant="ghost">Get in Touch</Button>,  // CHANGED: 'Get in Touch' not 'Contact Us'

// FOOTNOTE (line 84-86):
ACTUAL:   Price increases to $49/month after the first 200 Founding Members.
NUEVO:    Price increases to $49/mo after 200 Founding Members are locked.
```

---

## 5. HomepageStats.tsx

```tsx
// eyebrow (line 16):
ACTUAL:   The numbers
NUEVO:    Built to scale

// title (line 17):
ACTUAL:   Everything you need, nothing you don't
NUEVO:    Shipping at scale, from day one

// description (line 18):
ACTUAL:   Orion ships with a complete set of production-ready building blocks.
NUEVO:    72 components, 41 sections, 10 templates. 9 MCP tools. Built in. Ready to go.

// stats array (lines 24-45) — Update descriptions ONLY:

stats={[
  {
    value: '72',
    label: 'Components',
    description: 'Production-ready React',  // CHANGED from 'Ready-to-use React building blocks'
  },
  {
    value: '41',
    label: 'Sections',
    description: 'Pre-built page blocks',  // CHANGED from 'Pre-composed page blocks'
  },
  {
    value: '10',
    label: 'Templates',
    description: 'Full-page layouts',  // CHANGED from 'Full-page starter layouts'
  },
  {
    value: '9',
    label: 'MCP Tools',
    description: 'AI agent integrations',  // KEEP as-is
  },
]}
```

---

## 6. HomepageSocialProof.tsx

```tsx
// eyebrow (line 8):
ACTUAL:   Community
NUEVO:    Community & Trust

// title (line 9):
ACTUAL:   Built with Orion
NUEVO:    Used by builders who ship

// description (line 10):
ACTUAL:   Open source since day one. Used in production by builders who ship fast.
NUEVO:    MIT open source. 5 npm packages. Trusted by developers shipping AI-first products.

// stats array (lines 15-31) — SWAP order and update:

stats={[
  {
    value: 'MIT Licensed',  // CHANGED from 'Open Source'
    label: 'Open Source',  // CHANGED from 'MIT License'
    description: 'Free forever. Modify, distribute, use in production.',  // UPDATED
  },
  {
    value: '5',
    label: 'npm packages',
    description: '@orion-ds/react (main), cli, mcp, create, validate',  // UPDATED: clarify main
  },
  {
    value: 'Used in Production',  // CHANGED from 'Design Intelligence'
    label: 'Trusted by Builders',  // CHANGED from 'Built with Orion'
    description: 'Shipping products powered by Orion. Design & Code.',  // UPDATED
  },
]}
```

---

## 7. HomepageCTA.tsx

```tsx
// title (line 11):
ACTUAL:   Start building with Orion today
NUEVO:    Ship AI-first products faster

// description (line 12):
ACTUAL:   Join developers building AI-first interfaces. Free, open-source, and ready to ship.
NUEVO:    Ship with components that work with Claude Code, Cursor, Cline. Free to start. Open source forever.

// PRIMARY CTA (line 31):
ACTUAL:   Get Started Free
NUEVO:    Get Started Free  // KEEP (no change)

// SECONDARY CTA (line 40):
ACTUAL:   View on GitHub
NUEVO:    View on GitHub  // KEEP (no change)

// footnote (line 46):
ACTUAL:   Open source · MIT License · No credit card required
NUEVO:    MIT Licensed · Open Source · No credit card  // SIMPLIFIED

// COPYRIGHT (line 62):
ACTUAL:   © 2024 Orion Design System. Built with AI-first principles.
NUEVO:    © 2026 Orion Design System. Built for AI-first products.

// FOOTER LINKS (lines 64-68) — ADD two new links:
<Link href="https://github.com/alfredorodrigueztasso/orion" style={{ color: 'var(--text-secondary)' }}>GitHub</Link>
<Link href="https://npmjs.com/package/@orion-ds/react" style={{ color: 'var(--text-secondary)' }}>NPM Registry</Link>  // CHANGED from 'NPM'
<Link href="/docs/getting-started" style={{ color: 'var(--text-secondary)' }}>Documentation</Link>  // CHANGED from 'Docs'
<Link href="/pricing" style={{ color: 'var(--text-secondary)' }}>Pricing</Link>  // NEW
<Link href="/privacy" style={{ color: 'var(--text-secondary)' }}>Privacy</Link>  // NEW
```

---

## 8. DocsNavbar.tsx

```tsx
// Logo brand text (line 137):
ACTUAL:   <span>Orion</span><span>DS</span>
NUEVO:    <span>Orion</span>
// (Remove the "DS" span entirely, or just set display: 'none')

// NAV_LINKS array (line 115) — ADD Pricing link:
const NAV_LINKS = [
  { label: 'Docs', href: '/docs/getting-started', match: '/docs' },
  { label: 'Components', href: '/components', match: '/components' },
  { label: 'Sections', href: '/sections', match: '/sections' },
  { label: 'Templates', href: '/templates', match: '/templates' },
  { label: 'Pricing', href: '/pricing', match: '/pricing' },  // NEW
];

// GitHub link (lines 168-186) — KEEP as-is (no change)
```

---

## 9. ComponentShowcaseTabs.tsx

```tsx
// Section heading (line 163):
ACTUAL:   <h2>Component Gallery</h2>
NUEVO:    <h2>Interactive Components</h2>

// Section description (lines 164-165):
ACTUAL:   Explore all component variants and states. Every component is built with Orion's design tokens.
NUEVO:    Every component. Every variant. Every state. Built with design tokens. Copy the code. Integrate with MCP.

// tabs array (lines 170-179) — ADD new tab at the end:

const AIAgentsShowcase = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-4)', textAlign: 'center' }}>
    <div>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>Claude Code</div>
      <code style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>npm run mcp</code>
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>Cursor</div>
      <code style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>@orion-ds/mcp</code>
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>Cline</div>
      <code style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>9 tools</code>
    </div>
  </div>
);

// ADD to tabs array (before closing ]):
{
  id: 'ai-agents',
  label: 'AI Agents',
  content: <AIAgentsShowcase />,
},

// Example of complete tabs array (should have 9 items now):
tabs={[
  { id: 'buttons', label: 'Buttons', content: <ButtonShowcase /> },
  { id: 'cards', label: 'Cards', content: <CardShowcase /> },
  { id: 'badges', label: 'Badges', content: <BadgeShowcase /> },
  { id: 'alerts', label: 'Alerts', content: <AlertShowcase /> },
  { id: 'forms', label: 'Forms', content: <FormShowcase /> },
  { id: 'feedback', label: 'Feedback', content: <FeedbackShowcase /> },
  { id: 'navigation', label: 'Navigation', content: <NavigationShowcase /> },
  { id: 'avatars', label: 'Avatars', content: <AvatarShowcase /> },
  { id: 'ai-agents', label: 'AI Agents', content: <AIAgentsShowcase /> },
]}
```

---

## 10. HomepageLogoCloud.tsx

```tsx
// eyebrow (line 64):
ACTUAL:   Compatible with
NUEVO:    Built in

// title (line 65):
ACTUAL:   Works with your entire stack
NUEVO:    Native support in React · Next.js · TypeScript · Claude Code

// MCP Logo label in logos array (line 57):
ACTUAL:   'MCP / Claude'
NUEVO:    'Claude Code / Cursor / Cline'
```

---

## 11. New Pages to Create

### `/pricing`
```
Redirect or full page with HomepagePricing component
(Already exists if you have docs-site/app/pricing/page.tsx)
```

### `/privacy`
```
Legal page with privacy policy
(Create minimum: "We use Stripe for payments. See Stripe Privacy Policy.")
```

### `/docs/mcp` (Optional but recommended)
```
MCP Server documentation
- Setup for Claude Code
- Setup for Cursor
- Setup for Cline
- 9 available tools
```

---

## 12. Key URLs to Verify

```
GitHub:         https://github.com/alfredorodrigueztasso/orion
NPM Registry:   https://npmjs.com/package/@orion-ds/react
Domain:         orionui.dev
Email:          hello@orionui.dev (contact for Team plan)
```

---

## 13. Dynamic Content (Backend Integration)

### Founding Member Spot Counter

**Endpoint**: `GET /api/founding-member-spots`

**Response**:
```json
{
  "total": 200,
  "claimed": 47,
  "remaining": 153
}
```

**Implementation**:
1. Create `/api/founding-member-spots.ts` in Next.js (pages/api/ or app/api/)
2. Query Stripe for Founding Member subscriptions
3. Calculate remaining = 200 - (number of active Founding Member subscriptions)
4. Cache for 1 hour (reduce Stripe API calls)
5. Return JSON

**In HomepagePricing.tsx**, fetch on mount:
```tsx
const [spots, setSpots] = useState<{ total: number; remaining: number } | null>(null);

useEffect(() => {
  fetch('/api/founding-member-spots')
    .then(res => res.json())
    .then(data => setSpots(data));
}, []);

// In Plan 2 badge:
badge={spots ? `200 spots · ${spots.remaining} remaining` : '200 spots'}
```

---

## Implementation Order (Recommended)

1. **Hero** (highest visibility) → 20 min
2. **Install** (adds tab) → 15 min
3. **Features** (reorder + update) → 20 min
4. **Pricing** (add badge, update plan details) → 25 min
5. **Stats** (update text) → 10 min
6. **Social Proof** (swap, update) → 10 min
7. **Navbar** (add link, remove "DS") → 5 min
8. **CTA + Footer** (update links) → 10 min
9. **Component Showcase** (add AI Agents tab) → 15 min
10. **Logo Cloud** (update title + logos) → 5 min
11. **Backend** (spot counter, privacy page) → 30 min
12. **Testing** (light/dark mode, mobile, links) → 20 min

**Total**: ~3-4 hours

---

## Testing Checklist

- [ ] All copy loads without errors (check browser console)
- [ ] Links work (GitHub, Pricing, Privacy, /docs/mcp)
- [ ] Install Tab 4 "Claude Code" appears and works
- [ ] Component Showcase "AI Agents" tab appears
- [ ] Founding Member spot counter loads (or shows fallback)
- [ ] Light mode: text contrast ≥ 4.5:1
- [ ] Dark mode: text contrast ≥ 4.5:1
- [ ] Mobile: buttons don't wrap, text readable at 375px width
- [ ] Navbar "Pricing" link navigates correctly
- [ ] Footer "Pricing" and "Privacy" links present
- [ ] Copy doesn't exceed component width (test 1200px, 768px, 375px)

---

**Ready for implementation!**
For questions on copy meaning or intent, refer to `LANDING_COPY_REWRITE_MCP_FIRST.md`.


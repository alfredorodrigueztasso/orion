# Orion Landing — Implementation Matrix

**Print this page and track your progress**

---

## Component-by-Component Checklist

### 1. HomepageHero.tsx (20 min)

| Element | Line(s) | Change | Status |
|---------|---------|--------|--------|
| Badge | 25 | `✨ Chain of Truth` → `🔌 MCP Server included — Code-ready` | ☐ |
| Title highlight | 28-36 | Move highlight to "already knows" | ☐ |
| Description | 38 | Full rewrite (user-action focus) | ☐ |
| Primary CTA | 46 | `Get Started` → `Get Started Free` | ☐ |
| Secondary CTA | 57 | `GitHub` → `GitHub Repo` | ☐ |
| **Test**: Light/dark mode, mobile | — | Verify contrast & fit | ☐ |

---

### 2. HomepageInstall.tsx (15 min)

| Element | Line(s) | Change | Status |
|---------|---------|--------|--------|
| Eyebrow | 45 | `Install` → `Installation` (optional) | ☐ |
| Tab 1 | 62+ | `pnpm` → `pnpm (Recommended)` | ☐ |
| NEW Tab 4 | +new | Add `Claude Code` tab with `npx @orion-ds/mcp init` | ☐ |
| **Test**: Tab switching, mobile | — | All tabs clickable & content shows | ☐ |

---

### 3. HomepageFeaturesSection.tsx (20 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Eyebrow | 17 | `Why Orion` → `Built for your workflow` | ☐ |
| Title | 18 | `Built for the AI era` → `Components that ship with your AI tools` | ☐ |
| Description | 19 | Full rewrite (user journey) | ☐ |
| **REORDER items array** | 24+ | Move AI-Native to Feature 1 (MCP Server) | ☐ |
| Feature 1 | — | MCP Server (was Feature 6) | ☐ |
| Feature 2 | — | Chain of Truth (was Feature 1) | ☐ |
| Feature 3 | — | 72 Components (was Feature 2) | ☐ |
| Feature 4 | — | Multi-Brand (was Feature 4) | ☐ |
| Feature 5 | — | Light & Dark (was Feature 5) | ☐ |
| Feature 6 | — | 41 Sections (was Feature 3) | ☐ |
| **Update descriptions**: All 6 | — | Each feature gets new copy | ☐ |
| **Test**: Mobile grid layout | — | Features responsive at 375px | ☐ |

---

### 4. HomepagePricing.tsx (25 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Section title | 11 | New pricing title | ☐ |
| Section description | 12 | New pricing description | ☐ |
| **Free Plan** | | | |
| - Description | — | Rewrite (more casual) | ☐ |
| - Feature 2 | — | `26` → `41` sections | ☐ |
| - Feature 5 | — | Format: `MCP Server (9 tools)` | ☐ |
| - Feature 7 | — | `6 brands` → `4 brands` | ☐ |
| **Founding Member Plan** | | | |
| - ADD Badge | — | `200 spots · X remaining` | ☐ |
| - Description | — | New: "200 spots total..." | ☐ |
| - All 9 Features | — | Update all descriptions | ☐ |
| - CTA | — | "Become a Founding Member" (keep) | ☐ |
| **Team Plan** | | | |
| - Description | — | New description | ☐ |
| - Feature 1 | — | `Pro` → `Founding` | ☐ |
| - CTA | — | "Contact Us" → "Get in Touch" | ☐ |
| Footnote | 84-86 | New text: "Price increases to $49/mo..." | ☐ |
| **Test**: Card layout, CTA buttons | — | Mobile responsive, CTAs work | ☐ |

---

### 5. HomepageStats.tsx (10 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Eyebrow | 16 | `The numbers` → `Built to scale` | ☐ |
| Title | 17 | `Everything you need...` → `Shipping at scale, from day one` | ☐ |
| Description | 18 | Rewrite (direct, specific) | ☐ |
| Stat 1 description | — | Shorten text | ☐ |
| Stat 2 description | — | Shorten text | ☐ |
| Stat 3 description | — | Shorten text | ☐ |
| Stat 4 | — | Keep (9 MCP Tools) | ☐ |
| **Test**: Grid layout (4 cols responsive) | — | Stats stack on mobile | ☐ |

---

### 6. HomepageSocialProof.tsx (10 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Eyebrow | 8 | `Community` → `Community & Trust` | ☐ |
| Title | 9 | `Built with Orion` → `Used by builders who ship` | ☐ |
| Description | 10 | Rewrite (trust angle) | ☐ |
| Proof 1 Value | — | Swap: `MIT Licensed` ↔ `Open Source` | ☐ |
| Proof 1 Label | — | Swap: `Open Source` ↔ `MIT License` | ☐ |
| Proof 1 Description | — | Update | ☐ |
| Proof 2 | — | Keep (5 npm packages) | ☐ |
| Proof 2 Description | — | Clarify: add "(main)" for @orion-ds/react | ☐ |
| Proof 3 Value | — | `Design Intelligence` → `Used in Production` | ☐ |
| Proof 3 Label | — | `Built with Orion` → `Trusted by Builders` | ☐ |
| Proof 3 Description | — | Update (shipping angle) | ☐ |
| **Test**: 3-column layout on mobile | — | Stats responsive | ☐ |

---

### 7. HomepageCTA.tsx (10 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| CTA Title | 11 | `Start building...` → `Ship AI-first products faster` | ☐ |
| CTA Description | 12 | Rewrite (agent compatibility) | ☐ |
| Primary CTA | 31 | Keep: "Get Started Free" | ☐ |
| Secondary CTA | 40 | Keep: "View on GitHub" | ☐ |
| Footnote | 46 | Reorder & simplify | ☐ |
| **Footer Copyright** | 62 | Update year: 2024 → 2026 | ☐ |
| **Footer Links** | 64-68 | Rewrite: Add "Pricing" + "Privacy" links | ☐ |
| **Test**: Footer links work | — | All 5 links navigate correctly | ☐ |

---

### 8. DocsNavbar.tsx (5 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Logo text | 137 | Remove "DS" (keep "Orion" only) | ☐ |
| Nav Links | 115+ | Add `{ label: 'Pricing', href: '/pricing' }` | ☐ |
| **Test**: Navbar layout on mobile | — | Links don't wrap, Pricing appears | ☐ |

---

### 9. ComponentShowcaseTabs.tsx (15 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Section title | 163 | `Component Gallery` → `Interactive Components` | ☐ |
| Section description | 164-165 | Rewrite (add MCP mention) | ☐ |
| NEW Tab 9 | +new | Add `AI Agents` tab (before closing bracket) | ☐ |
| Tab 9 Content | +new | Create `AIAgentsShowcase` component | ☐ |
| **Test**: 9 tabs render, Tab 9 content shows | — | All tabs clickable | ☐ |

---

### 10. HomepageLogoCloud.tsx (5 min)

| Element | Lines | Change | Status |
|---------|-------|--------|--------|
| Eyebrow | 64 | `Compatible with` → `Built in` | ☐ |
| Title | 65 | `Works with your entire stack` → `Native support in React · Next.js...` | ☐ |
| MCP Logo label | 57 | `MCP / Claude` → `Claude Code / Cursor / Cline` | ☐ |
| **Test**: Logo cloud responsive | — | Logos stack on mobile | ☐ |

---

## Testing Checklist

### Light Mode
- [ ] All text readable (contrast ≥ 4.5:1)
- [ ] Badge colors visible
- [ ] Buttons have hover states
- [ ] Feature icons visible

### Dark Mode
- [ ] All text readable (contrast ≥ 4.5:1)
- [ ] Badge colors visible
- [ ] Buttons have hover states
- [ ] Feature icons visible

### Mobile (375px)
- [ ] Copy doesn't overflow
- [ ] Buttons stack vertically
- [ ] Features grid responsive (1-2 cols)
- [ ] Pricing cards stack
- [ ] Tabs are clickable
- [ ] Footer links accessible

### Links
- [ ] GitHub URL correct
- [ ] Pricing link works
- [ ] Privacy link exists
- [ ] MCP docs link (if applicable)
- [ ] NPM link correct
- [ ] Email link works (Team plan)

### Copy
- [ ] No banned words (platform, solution, powerful, revolutionary)
- [ ] MCP mentioned 9 times total
- [ ] Agent names specific (Claude Code, Cursor, Cline)
- [ ] Numbers used (72, 41, 10, 9, 200)
- [ ] No vague language ("many", "lots")
- [ ] Voice consistent (user-action focused)

---

## Time Tracking

| Component | Estimate | Actual | Status |
|-----------|----------|--------|--------|
| 1. HomepageHero | 20 min | — | ☐ |
| 2. HomepageInstall | 15 min | — | ☐ |
| 3. HomepageFeaturesSection | 20 min | — | ☐ |
| 4. HomepagePricing | 25 min | — | ☐ |
| 5. HomepageStats | 10 min | — | ☐ |
| 6. HomepageSocialProof | 10 min | — | ☐ |
| 7. HomepageCTA | 10 min | — | ☐ |
| 8. DocsNavbar | 5 min | — | ☐ |
| 9. ComponentShowcaseTabs | 15 min | — | ☐ |
| 10. HomepageLogoCloud | 5 min | — | ☐ |
| **Testing & QA** | 20 min | — | ☐ |
| **TOTAL** | **155 min (2.5-3 hrs)** | — | ☐ |

---

## Critical Path (If Running Behind Schedule)

If you're behind, prioritize in this order:

### Priority 1 (MUST DO)
1. ☐ HomepageHero (Hero badge + title is critical)
2. ☐ HomepageFeaturesSection (Reorder + MCP first)
3. ☐ HomepagePricing (Founding Member positioning)

### Priority 2 (IMPORTANT)
4. ☐ HomepageFeaturesSection (All descriptions)
5. ☐ HomepageInstall (Claude Code tab)
6. ☐ ComponentShowcaseTabs (AI Agents tab)

### Priority 3 (NICE TO HAVE)
7. ☐ Everything else
8. ☐ Backend (spot counter, Privacy page)

---

## Sign-Off Checklist

**When all boxes are checked, you're done:**

- [ ] All 10 components updated with new copy
- [ ] New tabs created (Install + Showcase)
- [ ] New links added (Navbar Pricing + Footer Pricing/Privacy)
- [ ] Light mode tested (contrast OK)
- [ ] Dark mode tested (contrast OK)
- [ ] Mobile responsive (375px, 768px)
- [ ] No broken links
- [ ] No banned words
- [ ] MCP mentioned 9 times (Hero, Install, Features, Pricing, Stats, Social Proof, CTA, Showcase, Logo Cloud)
- [ ] All copy follows voice guidelines
- [ ] Final QA passed
- [ ] Ready for deployment

---

**Print this page. Track your progress.**
**Reference: LANDING_COPY_QUICK_REFERENCE.md**
**Tone guide: LANDING_TONE_VOICE_GUIDE.md**


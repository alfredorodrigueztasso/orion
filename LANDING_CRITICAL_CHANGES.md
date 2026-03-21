# Orion Landing — Critical Changes Only

**Print & Keep This at Your Desk**

---

## 🔴 MUST CHANGE (Blocking Issues)

### 1. Hero Badge
```
❌ BEFORE: ✨ Chain of Truth
✅ AFTER:  🔌 MCP Server included — Code-ready
```

### 2. Features Order
```
❌ BEFORE: 1. Chain, 2. Components, 3. Sections, 4. Brands, 5. Dark, 6. AI-Native
✅ AFTER:  1. MCP Server, 2. Chain, 3. Components, 4. Brands, 5. Dark, 6. Sections
```

### 3. Pricing Tier Name
```
❌ BEFORE: "Pro" tier
✅ AFTER:  "Founding Member" tier (with "200 spots · X remaining" badge)
```

### 4. Hero Title
```
❌ BEFORE: The AI-first Design System
✅ AFTER:  The design system your AI agent already knows
           (move highlight to "already knows")
```

### 5. Install Section
```
❌ BEFORE: 3 tabs (pnpm, npm, yarn)
✅ AFTER:  4 tabs (+ Claude Code tab with "npx @orion-ds/mcp init")
```

### 6. Component Showcase
```
❌ BEFORE: 8 tabs (Buttons, Cards, ..., Avatars)
✅ AFTER:  9 tabs (+ AI Agents tab at end)
```

### 7. Navbar
```
❌ BEFORE: "Orion DS" logo
✅ AFTER:  "Orion" logo (remove "DS")

❌ BEFORE: No Pricing link
✅ AFTER:  Add "Pricing" link (after Templates)
```

### 8. Footer
```
❌ BEFORE: 3 links (GitHub, NPM, Docs)
✅ AFTER:  5 links (+ Pricing, Privacy)
```

---

## 🟡 IMPORTANT (Content Changes)

### Hero Description
```
❌ Token-governed components that eliminate UI hallucination. Build consistent
   interfaces at scale — without visual drift.

✅ Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and
   integrates Orion components directly. 9 tools built in. No API config needed.
```

### Features — All 6 Descriptions Updated
```
MCP Server: "9 tools. Claude Code. Cursor. Cline. Your AI agent discovers..."
Chain: "Token-governed architecture. No hardcoded values..."
Components: "Production-ready React components. Full TypeScript..."
Brands: "Orion, Red, Deep Blue, Orange. Switch with one attribute..."
Dark: "Full light/dark support. Semantic tokens handle the switch..."
Sections: "Heroes, features, pricing, testimonials. Compose pages in hours..."
```

### Pricing Plans — All Details
```
Free:
- Change "26 sections" → "41 sections"
- Change "MCP Server — 9 tools" → "MCP Server (9 tools)"
- Change "Dark mode + 6 brands" → "Light/dark + 4 brands"

Founding Member:
- ADD BADGE: "200 spots · X remaining"
- Description: "200 spots total. Price locks in forever. Then $49/mo."
- Change all 9 features descriptions

Team:
- Change CTA "Contact Us" → "Get in Touch"
```

### Hero Description Updates
```
Stats Title:  "Built to scale" (was "The numbers")
CTA Title:    "Ship AI-first products faster" (was "Start building...")
```

---

## ⚪ NICE TO HAVE (Optional)

- [ ] Create `/privacy` page (legal for Stripe)
- [ ] Create `/docs/mcp` page (for Install tab reference)
- [ ] Dynamic spot counter: `/api/founding-member-spots` (nice but not critical)

---

## 🎯 Voice Rules (3 Rules)

1. **Start with user action** ("Your AI agent discovers..." not "Orion has...")
2. **Name agents** (Claude Code, Cursor, Cline — not "AI agents")
3. **Use numbers** (72, 41, 10, 9, 200 — not "many", "lots")

---

## 📋 Files to Change

```
docs-site/components/HomepageHero.tsx
docs-site/components/HomepageInstall.tsx
docs-site/components/HomepageFeaturesSection.tsx
docs-site/components/HomepagePricing.tsx
docs-site/components/HomepageStats.tsx
docs-site/components/HomepageSocialProof.tsx
docs-site/components/HomepageCTA.tsx
docs-site/components/DocsNavbar.tsx
docs-site/components/ComponentShowcaseTabs.tsx
docs-site/components/HomepageLogoCloud.tsx
```

---

## ✅ Final QA

- [ ] Hero badge changed to 🔌 MCP
- [ ] Features reordered (MCP first)
- [ ] Install has Claude Code tab
- [ ] Showcase has AI Agents tab
- [ ] Pricing has Founding Member tier
- [ ] All agent names (Claude Code, Cursor, Cline)
- [ ] No banned words (platform, solution, powerful, revolutionary)
- [ ] Navbar has Pricing link
- [ ] Footer has Pricing + Privacy links
- [ ] Light/dark mode contrast OK
- [ ] Mobile responsive

---

**Estimate**: 3-4 hours
**Status**: Ready to implement
**Next**: Use `LANDING_COPY_QUICK_REFERENCE.md` for exact copy


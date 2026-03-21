# Orion Landing Page Rewrite — One-Pager (Print This)

**Date**: March 21, 2026
**Time**: 3-4 hours for Frontend Dev
**Status**: Ready to implement

---

## What Changed (The Big Picture)

| Before | After |
|--------|-------|
| 🏷️ Badge: ✨ Chain of Truth | 🏷️ Badge: 🔌 MCP Server included — Code-ready |
| 👤 Voice: Feature-focused | 👤 Voice: User-action focused |
| 📋 Features order: Chain, Components, ... AI-Native (6th) | 📋 Features order: **MCP Server (1st)**, Chain, Components, ... Sections (6th) |
| 🆓 Free plan: Mentions components, sections | 🆓 Free plan: Emphasizes **MCP Server (9 tools)** |
| 💰 Pricing: "Pro" tier | 💰 Pricing: **"Founding Member"** tier with "200 spots · X remaining" |
| ❌ Install section: No MCP tab | ❌ Install section: **NEW Tab 4: "Claude Code"** with `npx @orion-ds/mcp init` |
| ❌ Component Showcase: 8 tabs | ❌ Component Showcase: **NEW Tab 9: "AI Agents"** |

---

## 11 Sections to Update

| # | Component | Main Change | Time |
|---|-----------|-------------|------|
| 1 | HomepageHero.tsx | Badge + Title + Description | 20 min |
| 2 | HomepageInstall.tsx | Add Claude Code tab | 15 min |
| 3 | HomepageFeaturesSection.tsx | Reorder (MCP first) + 6 descriptions | 20 min |
| 4 | HomepagePricing.tsx | All plan details + scarcity badge | 25 min |
| 5 | HomepageStats.tsx | Update title + descriptions | 10 min |
| 6 | HomepageSocialProof.tsx | Swap + update 3 stats | 10 min |
| 7 | HomepageCTA.tsx | Title + footer links | 10 min |
| 8 | DocsNavbar.tsx | Remove "DS" + add Pricing link | 5 min |
| 9 | ComponentShowcaseTabs.tsx | Add AI Agents tab | 15 min |
| 10 | HomepageLogoCloud.tsx | Update title + MCP logo label | 5 min |
| — | Create pages | Privacy (required), MCP docs (optional) | 30 min |

**Total**: ~3-4 hours

---

## Copy Golden Rules (Memorize These)

### ✅ ALWAYS

1. **Start with user action** ("Your AI agent discovers..." not "Orion has...")
2. **Name specific agents** (Claude Code, Cursor, Cline — not "AI agents")
3. **Use exact numbers** (72, 41, 10, 9, 200 — not "many", "lots")
4. **Keep sentences short** (2-3 sentences per feature, max)
5. **Mention MCP Server** in: Hero, Install, Features, Pricing Free, Stats, Showcase, CTA
6. **Scarcity for Founding Member** ("200 spots · X remaining" badge + "Price locks in forever")
7. **"Free" in CTAs** ("Get Started Free", not just "Get Started")

### ❌ NEVER

1. "Platform", "solution", "powerful", "revolutionary", "ecosystem", "leverage"
2. "AI-native", "agentic patterns", "capabilities" (use MCP tools + specific names instead)
3. Long sentences with em-dashes
4. Vague benefits ("Consistent interfaces at scale" → "Deploy with confidence")
5. Start sentences with "The", "This", "Orion" (start with actions)

---

## Hero Section (Critical — Sets Tone)

```
🏷️ Badge:       🔌 MCP Server included — Code-ready
🎯 Title:        The design system your AI agent **already knows**
📝 Description:  Your AI agent (Claude Code, Cursor, Cline) discovers,
                 installs, and integrates Orion components directly.
                 9 tools built in. No API config needed.
🔵 Primary CTA:  Get Started Free
⚪ Secondary:    GitHub Repo
```

---

## Pricing Tiers (Clearest Positioning)

### Free ($0 forever)
- 72 components, 41 sections, 10 templates
- **MCP Server (9 tools)** ← Now prominent
- CLI installer, Token-governed, Light/dark + 4 brands, MIT License

### ⭐ Founding Member ($29/mo → $49/mo)
- **Badge**: "200 spots · X remaining" (dynamic counter)
- **Description**: "200 spots total. Price locks in forever. Then $49/mo."
- **Features**: Everything in Free + 10 AI components + 4 AI templates + Figma Kit + Extended docs + Slack group + Early access

### Team ($149/mo)
- 5 seats, Monthly design session, Priority support
- **CTA changed**: "Contact Us" → "Get in Touch"

---

## New Tabs to Create

### Install Tab 4: Claude Code
```
Label:    Claude Code
Command:  npx @orion-ds/mcp init
Purpose:  Show MCP setup for Claude Code
```

### Component Showcase Tab 9: AI Agents
```
Label:       AI Agents
Content:     Logo row (Claude Code, Cursor, Cline)
             Commands: npm install @orion-ds/mcp, npx @orion-ds/cli init
             Button: View MCP Documentation
Description: "9 tools. Search. Discover. Install. One workflow."
```

---

## MCP Messaging Blueprint (Copy-Paste Ready)

### When Introducing MCP
```
9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components,
searches patterns, and installs directly into your project.
```

### When Listing as Benefit
```
Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and
integrates Orion components directly. 9 tools built in. No API config needed.
```

### As a Feature Callout
```
🔌 MCP Server
9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components,
searches patterns, and installs directly into your project.
```

### In Pricing
```
MCP Server (9 tools)
```

### In Stats
```
9 MCP Tools
AI agent integrations
```

---

## Banned Words Reference

| ❌ Don't Say | ✅ Say Instead |
|------------|-------------|
| Platform | Product, System, Library |
| Solution | Tool, System |
| Powerful | (omit; be specific) |
| Revolutionary | (omit) |
| Agentic patterns | MCP Server, AI components |
| Capabilities | Tools, Features |
| Ecosystem | Library, Collection |
| Leverage | Use, Enable |
| AI-native | MCP Server, Token-governed |

---

## QA Checklist (Before Submitting)

- [ ] Hero badge is 🔌 MCP Server (not ✨ Chain of Truth)
- [ ] Features: MCP Server is Feature 1 (not Feature 6)
- [ ] All copy mentions specific agents (Claude Code, Cursor, Cline)
- [ ] No banned words (platform, solution, powerful, revolutionary)
- [ ] Install section has new Tab 4: Claude Code
- [ ] Pricing Founding Member has badge: "200 spots · X remaining"
- [ ] Pricing Founding Member description: "Price locks in forever. Then $49/mo."
- [ ] Component Showcase has Tab 9: AI Agents
- [ ] Navbar has Pricing link (after Templates)
- [ ] Footer has Pricing + Privacy links
- [ ] All links work (GitHub, Pricing, Privacy, MCP docs)
- [ ] Light/dark mode text contrast ≥ 4.5:1
- [ ] Copy fits on mobile (375px width)

---

## Key URLs (Verify These)

| Link | URL |
|------|-----|
| GitHub | https://github.com/alfredorodrigueztasso/orion |
| NPM | https://npmjs.com/package/@orion-ds/react |
| Domain | orionui.dev |
| Email (Team plan) | hello@orionui.dev |

---

## Red Flags (If You See These, Fix Them)

🚩 **"AI-native"** → Replace with "MCP Server" or "9 tools"
🚩 **"Agentic patterns"** → Replace with specific components (AgentThinking, StreamText, ToolCall)
🚩 **"Powerful"** → Omit; list specifics instead
🚩 **"Platform"** → Replace with "System", "Product", or "Library"
🚩 **"The Orion..."** → Rewrite to start with action (Your AI agent..., Ship with...)
🚩 **"Lots of"**, **"Many"** → Use exact numbers (72, 41, 10, 9)
🚩 **Em-dashes** → Replace with periods
🚩 **2+ sentences per feature** → Break into shorter sentences
🚩 **"Get Started"** → Change to "Get Started Free"
🚩 **MCP not in Features** → Add as Feature 1
🚩 **MCP not in Pricing Free** → Add to features list

---

## Quick Copy Examples

### Features (New Order)
```
1️⃣ MCP Server
   9 tools. Claude Code. Cursor. Cline. Your AI agent discovers
   components, searches patterns, and installs directly.

2️⃣ Chain of Truth
   Token-governed architecture. No hardcoded values. Components
   reference semantic tokens. Your AI agent generates predictable styles.

3️⃣ 72 Components
   Production-ready React components. Full TypeScript. Accessibility
   built in. Deploy with confidence.

4️⃣ Multi-Brand
   Orion, Red, Deep Blue, Orange. Switch brands with one attribute.
   Zero refactoring.

5️⃣ Light & Dark
   Full light/dark support. Semantic tokens handle the switch.
   Consistency across themes.

6️⃣ 41 Sections
   Heroes, features, pricing, testimonials, footers. Compose pages
   in hours, not days.
```

### Pricing (Founding Member)

**Badge**: "200 spots · X remaining"

**Description**: "200 spots total. Price locks in forever. Then $49/mo."

**Features**:
- Everything in Free
- 10 AI components
- AgentThinking, StreamText, ToolCall
- ActionConfirmation, DiffViewer, ContextBar
- 4 AI templates
- Figma Kit (complete)
- Extended docs + design rationale
- Private Slack group
- Early access to features

---

## Files to Update (In Order)

1. **HomepageHero.tsx** (line 25, 28-36, 38, 46, 57)
2. **HomepageInstall.tsx** (add Tab 4)
3. **HomepageFeaturesSection.tsx** (reorder items, update descriptions)
4. **HomepagePricing.tsx** (all plans)
5. **HomepageStats.tsx** (title, descriptions)
6. **HomepageSocialProof.tsx** (swap order, update)
7. **HomepageCTA.tsx** (title, footer)
8. **DocsNavbar.tsx** (remove "DS", add Pricing link)
9. **ComponentShowcaseTabs.tsx** (add AI Agents tab)
10. **HomepageLogoCloud.tsx** (update title, MCP label)

---

## Backend Support (Optional)

- **Founding Member spot counter**: `GET /api/founding-member-spots` (returns `{ remaining: X }`)
- **Privacy page**: Create `/privacy` (legal requirement)
- **MCP docs**: Create `/docs/mcp` (recommended)

---

## Time Budget

| Task | Time |
|------|------|
| Copy updates (10 components) | 2-2.5 hrs |
| New tabs (Install + Showcase) | 30 min |
| Links + verification | 15 min |
| Testing (light/dark, mobile) | 20 min |
| Backend support (optional) | 30 min |
| **TOTAL** | **3-4 hours** |

---

## Success = This Checklist ✓

- ✅ MCP Server is prominent (Hero badge + Feature 1)
- ✅ All copy is user-action focused (starts with "Your...", "Ship...", "Discover...")
- ✅ Specific agents named (Claude Code, Cursor, Cline)
- ✅ Specific numbers used (72, 41, 10, 9, 200)
- ✅ Founding Member has scarcity signal ("200 spots · X remaining")
- ✅ New tabs created (Install: Claude Code, Showcase: AI Agents)
- ✅ No banned words (platform, solution, powerful, revolutionary)
- ✅ All links work
- ✅ Light/dark mode contrast OK
- ✅ Mobile responsive (375px+)

---

**Print this page. Refer to it while implementing.**
**For full copy text, use `LANDING_COPY_QUICK_REFERENCE.md`**
**For tone guidance, use `LANDING_TONE_VOICE_GUIDE.md`**


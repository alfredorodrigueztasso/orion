# Landing Page Component Map — Complete Index

**Three complementary documents for understanding the landing page architecture:**

---

## 📋 Document Guide

### 1. **LANDING_VISUAL_MAP.txt** — START HERE for Quick Visuals
   - **Best for**: Visual learners, quick reference, ASCII diagrams
   - **Format**: ASCII art with box drawings showing page flow
   - **Use when**: You need a bird's-eye view or want to quickly find where something is rendered
   - **Size**: ~400 lines
   - **Example**: Visual boxes showing each section, component layout, stats card grid

### 2. **LANDING_QUICK_REFERENCE.md** — Use for Fast Lookups
   - **Best for**: Developers editing specific sections, quick fact-checking
   - **Format**: Tables, short lists, file locations
   - **Use when**: "Which components are in section X?" or "Where is the install section?"
   - **Size**: ~200 lines
   - **Example**: Quick map table, component usage summary, file locations

### 3. **LANDING_COMPONENT_MAP.md** — Deep Dives (This is the Bible)
   - **Best for**: Understanding architecture, component relationships, props/variants
   - **Format**: Detailed hierarchies with full component lists, props, patterns
   - **Use when**: You need to understand HOW something works or WHY it's structured that way
   - **Size**: ~700 lines
   - **Example**: Full Hero component breakdown with all Badge/Button variants explained

---

## 🎯 Choose Your Weapon

### "I just want to see the pages top-to-bottom"
→ Read **LANDING_VISUAL_MAP.txt** (ASCII diagrams)

### "I need to find where component X is used"
→ Check **LANDING_QUICK_REFERENCE.md** (file locations table, section quick map)

### "I'm editing this component and need to understand its structure"
→ Study **LANDING_COMPONENT_MAP.md** (detailed breakdown with props/variants)

### "I need ALL the details for documentation/training"
→ Read all three in order: Visual → Quick Ref → Deep Dive

---

## 🗺️ Map at a Glance

```
LANDING PAGES (3 total)
├── / (Homepage)
│   ├── 1. Hero (72 components highlight)
│   ├── 2. Install (npm/npx commands)
│   ├── 3. LogoCloud (AI tool logos)
│   ├── 4. Showcase (All components demo)
│   ├── 5. Features (6 why-choose-orion cards)
│   ├── 6. Stats (5 metric cards)
│   ├── 7. Pricing (3 plans)
│   ├── 8. Testimonials (Social proof metrics)
│   └── 9. CTA + Footer (Call-to-action + links)
│
├── /pricing
│   ├── Custom hero (not Hero block)
│   ├── Pricing (same as homepage section 7)
│   └── FAQ (Accordion with 6 questions)
│
└── /docs/mcp
    ├── DocsPageHero with Badges
    ├── Feature Grid (6 MCP features)
    ├── Code Block (Quick start)
    ├── Accordion (9 tools with examples)
    └── Next Steps Grid (2 links)

GLOBAL (All Pages)
├── Navbar (sticky, with theme/brand controls)
└── Sidebar (docs pages only, collapsible)
```

---

## 📊 Component Frequency

| Component | Count | Notes |
|-----------|-------|-------|
| `Button` | 30+ | All variants: primary, secondary, ghost, danger |
| `Card` | 15+ | variants: base, outlined, elevated |
| `Badge` | 12+ | Used for highlights, social proof, pricing "popular" |
| **Block Components** | 10+ | Hero, Features, CTA, Pricing, Stats, LogoCloud, FAQ |
| `Alert` | 4 | Showcase component demo |
| `Accordion` | 2 | MCP tools, FAQ |
| `Tabs` | 2 | Install commands, Component showcase |
| `Field/Select/Switch` | 5+ | Form showcase |

---

## 🔍 Finding Things Fast

### By Page
- **Homepage (`/`)** → LANDING_QUICK_REFERENCE table + LANDING_VISUAL_MAP sections 1-9
- **Pricing (`/pricing`)** → LANDING_QUICK_REFERENCE file locations + LANDING_COMPONENT_MAP "Pricing Page" section
- **MCP Docs (`/docs/mcp`)** → LANDING_QUICK_REFERENCE + LANDING_COMPONENT_MAP "MCP Docs" section

### By Component
- **Button usage** → LANDING_QUICK_REFERENCE "Component Usage Summary" + search "Button" in LANDING_COMPONENT_MAP
- **Hero section** → LANDING_VISUAL_MAP "1️⃣ HERO" box + LANDING_COMPONENT_MAP "Section 1" detailed breakdown
- **Navbar** → LANDING_VISUAL_MAP "NAVBAR" box + LANDING_COMPONENT_MAP "ROOT LAYOUT"

### By File
- **HomepageHero.tsx** → LANDING_QUICK_REFERENCE "FILE LOCATIONS" table + LANDING_COMPONENT_MAP "Section 1"
- **DocsNavbar.tsx** → LANDING_QUICK_REFERENCE "FILE LOCATIONS" + LANDING_VISUAL_MAP "GLOBAL NAVBAR"
- **ComponentShowcaseTabs.tsx** → LANDING_QUICK_REFERENCE "Quick Map" + LANDING_COMPONENT_MAP "Section 4"

---

## 📝 What's in Each Document

### LANDING_VISUAL_MAP.txt
```
✓ Visual boxes for each section
✓ ASCII art showing component layout
✓ Icon placeholders (🤖, ⚡, 📦, etc)
✓ All 3 pages with visual hierarchy
✓ Component statistics table
✓ Key files quick lookup
✗ Detailed props/variants (see LANDING_COMPONENT_MAP)
```

### LANDING_QUICK_REFERENCE.md
```
✓ Quick map (sections with components)
✓ Component usage summary table
✓ File locations index
✓ Lucide icons used
✓ Theme/brand inheritance
✓ Import patterns
✓ Edit guide (where to change what)
✓ Validation checklist
✗ Full component hierarchies (see LANDING_COMPONENT_MAP)
✗ Detailed layouts (see LANDING_VISUAL_MAP)
```

### LANDING_COMPONENT_MAP.md
```
✓ ROOT LAYOUT with global structure
✓ Navbar detailed breakdown
✓ All 9 homepage sections in detail
✓ Pricing page structure
✓ MCP docs page structure
✓ All props and variants explained
✓ Component imports reference
✓ Summary tables
✓ Navigation flow diagram
✓ Responsive breakpoints
✓ Theme/brand context
✓ Custom component patterns
✓ Performance notes
✓ Testing guide
✗ ASCII diagrams (see LANDING_VISUAL_MAP)
```

---

## 🚀 Workflow Examples

### Scenario 1: "I need to change the Hero title"
1. Open **LANDING_VISUAL_MAP.txt** → Find "1️⃣ HERO" box
2. See it's in `HomepageHero.tsx`
3. Open **LANDING_QUICK_REFERENCE.md** → Check "FILE LOCATIONS" table
4. Navigate to `/docs-site/components/HomepageHero.tsx`
5. Open **LANDING_COMPONENT_MAP.md** → Find "SECTION 1: HERO" for detailed structure
6. Edit the component with understanding of Hero block, Badge, Button subcomponents

### Scenario 2: "Where are the pricing plans defined?"
1. Open **LANDING_QUICK_REFERENCE.md** → Find "QUICK MAP" section
2. See pricing is in `HomepagePricing.tsx`
3. Search "Pricing" in **LANDING_COMPONENT_MAP.md** → Read "SECTION 7: PRICING"
4. Understand the Pricing block structure with 3 plans
5. Open file and edit with full context

### Scenario 3: "What Orion components are used on the landing?"
1. Open **LANDING_QUICK_REFERENCE.md** → "Component Usage Summary" table
2. See: Button (30+), Card (15+), Badge (12+), Block components (10+)
3. Check "COMPONENT IMPORTS REFERENCE" section
4. Use **LANDING_COMPONENT_MAP.md** for details on any specific component

### Scenario 4: "I'm refactoring — where should I look?"
1. Open **LANDING_VISUAL_MAP.txt** for page structure overview
2. Use **LANDING_COMPONENT_MAP.md** "Custom Components" section to see which are wrappers vs Orion
3. Reference **LANDING_QUICK_REFERENCE.md** "Edit Guide" for impact analysis

---

## 📈 Document Maintenance

### When to Update These Documents
- ✅ New section added to homepage
- ✅ Component props/variants change
- ✅ File reorganization or rename
- ✅ New pages added (beyond /, /pricing, /docs/mcp)
- ✅ Navbar/Sidebar structure changes
- ✅ New Lucide icons introduced

### What NOT to Update (Changes too frequently)
- Component internal logic/CSS
- Individual component stories
- Build system changes
- Dependencies

---

## 🎓 Learning Path

**For new developers joining the project:**

1. **Day 1** → Read **LANDING_VISUAL_MAP.txt** (30 min)
   - Get visual understanding of what's on each page

2. **Day 1** → Skim **LANDING_QUICK_REFERENCE.md** (20 min)
   - Learn file locations, key patterns

3. **Day 2** → Study **LANDING_COMPONENT_MAP.md** sections for areas you'll edit (1-2 hours)
   - Deep dive on specific sections you'll touch

4. **Day 2+** → Reference as needed when editing
   - Use quick-lookup to find component locations
   - Use detailed map for understanding structures

---

## 🔗 Cross-Document References

### In Visual Map, if you see a component name
→ Search that component in Quick Reference's "QUICK MAP"

### In Quick Reference, if you see a filename
→ Find that section in Component Map

### In Component Map, if you need a visual
→ Check Visual Map for ASCII representation

---

## 📍 File Locations

All three documents are in the repository root or `.claude` directory:

```
/Users/alfredo/Documents/AI First DS Library/
├── LANDING_COMPONENT_MAP.md          ← Detailed breakdown (700 lines)
│
└── .claude/
    ├── LANDING_QUICK_REFERENCE.md    ← Fast lookup (200 lines)
    ├── LANDING_VISUAL_MAP.txt        ← ASCII diagrams (400 lines)
    └── LANDING_MAP_INDEX.md          ← This file (navigation guide)
```

---

## 💡 Pro Tips

1. **Bookmark the Quick Reference** — Most common questions answered there
2. **Print/Export the Visual Map** — Great for whiteboarding or sharing
3. **Use Ctrl+F in Component Map** — Search by component name, file name, or section
4. **Reference on code reviews** — Explain changes using these maps
5. **Update maps in PRs** — If adding sections, update all three docs

---

## 📞 Feedback & Questions

If these maps are unclear or missing information:

1. Check all three documents (might be in a different one)
2. Verify the docs are current (last updated: March 21, 2026)
3. Consider if the information would fit better in a different document
4. Update the maps if you discover gaps

---

**Last Updated**: March 21, 2026
**Scope**: Homepage (`/`), Pricing (`/pricing`), MCP Docs (`/docs/mcp`), Global Layout
**Status**: Complete and validated

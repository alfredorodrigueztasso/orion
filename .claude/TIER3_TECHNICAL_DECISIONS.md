# Tier 3: Technical Decision Points

This document outlines key technical decisions for Tier 3 that require architecture review and approval.

---

## DECISION 1: CLI Architecture & Complexity Management

### Context
The 10 CLI stories (us-3.1-3.10) introduce significant complexity:
- New commands: create, build, dev, docs, audit, export, config, update, upgrade
- Each command has multiple sub-commands and flags
- Potential for exponential complexity growth

### Decision: Start with Minimal Core, Expand Incrementally

**Proposed Approach**:

**Phase 1 Core (3 commands)**:
1. `orion create` — Scaffolding (us-3.1)
2. `orion build` — Production builds (us-3.3)
3. `orion add` + enhanced filtering (us-3.5)

**Phase 2 Additions (3 commands)**:
- `orion dev` (us-3.2) — dev server
- `orion docs` (us-3.4) — docs generation
- `orion audit` (us-3.10) — compliance

**Phase 3+ Complexity (4 commands)**:
- `orion config` (us-3.6) — configuration
- `orion update` (us-3.7) — component updates
- `orion upgrade` (us-3.8) — package upgrades
- `orion export` (us-3.9) — framework exports

**Rationale**:
- Validates CLI architecture before adding complexity
- Each phase can be tested independently
- Users benefit from core features quickly
- Advanced features don't block core adoption

**Questions for Architect**:
1. Should we split CLI into sub-commands like `orion component:add`, `orion project:create`?
2. Is BFS dependency walking (current approach in `resolver.ts`) efficient for large registries?
3. Should we cache registry index locally to speed up repeated CLI calls?

---

## DECISION 2: MCP Server Tool Expansion Strategy

### Context
Current MCP server has 9 tools. Tier 3 adds 8 more (us-3.11-3.17).

**Concern**: Server memory footprint, latency, maintainability

### Decision: Lazy-Load Tools, Profile Performance

**Proposed Approach**:

1. **Core Tools** (always loaded, <50ms response):
   - list-components
   - get-component
   - search-components
   - list-tokens
   - get-token

2. **Generation Tools** (lazy-loaded, on-demand):
   - generate-component (1.2MB, takes time)
   - generate-page (1.5MB, takes time)

3. **Validation Tools** (cached, periodic refresh):
   - validate-code
   - validate-design

4. **Discovery Tools** (lightweight, indexed):
   - list-sections
   - get-section
   - get-migration-guide
   - list-themes
   - get-accessibility-report

**Implementation**:
- Load tools only when first requested
- Cache generated code between requests
- Profile with registries of 100, 500, 1000+ items
- Alert if response time > 2s

**Questions for Architect**:
1. Should generation tools run in a worker thread to avoid blocking?
2. What's max payload size acceptable from MCP tools?
3. Should we implement tool versioning for backward compatibility?
4. How to handle rate limiting if users make too many requests?

---

## DECISION 3: Documentation Generation Strategy

### Context
Documentation stories (us-3.18-3.26) involve auto-generation vs manual content.

**Tension**:
- Full auto-generation reduces maintenance burden
- Manual content provides better examples and pedagogy
- Hybrid approach requires synchronization logic

### Decision: Hybrid Approach with Clear Boundaries

**Auto-Generated (source of truth)**:
- Component API documentation (props, types, defaults) — from JSDoc + TypeScript types
- Token reference (colors, spacing, fonts) — from tokens/*.json
- Registry metadata (categories, tags, related items) — from registry/*.json
- Changelog — from commit messages + PR metadata

**Manually Maintained (human-curated)**:
- Getting Started guide (us-3.18)
- Advanced patterns guide (us-3.20)
- Best practices documentation
- Framework-specific guides (us-3.44)
- Example projects (us-3.24)
- Video tutorials (us-3.25)

**Semi-Auto (templated with manual sections)**:
- CLI command reference (us-3.21) — template + custom examples
- Token system deep dive (us-3.22) — structure from schema + manual explanations
- Migration guides (us-3.23) — breaking changes detected, examples added manually

**Synchronization**:
- CI/CD validates that auto-generated content matches source
- Stale content detection (if JSDoc outdated relative to code)
- Automated regeneration on release

**Implementation**:
- Use Typedoc for API docs generation
- Custom scripts for token docs
- Markdown templates for hybrid content
- Git-based versioning for docs

**Questions for Architect**:
1. Should API docs be in Storybook (Typedoc + Storybook plugin) or separate markdown?
2. How to handle doc versioning for multiple Orion versions (v3, v4, v5)?
3. Should examples be tested (Vitest + doctest-style)?
4. Where should migration guides live (docs-site, changelog, separate docs-site section)?

---

## DECISION 4: Release & Versioning Strategy

### Context
us-3.27-3.29 introduce semantic versioning, automation, and CI/CD.

**Concern**: Need clear policy for:
- When to increment major/minor/patch
- Breaking changes in docs vs code
- Pre-release process (alpha, beta, RC)
- Backward compatibility guarantees

### Decision: Strict Semver with Clear Breaking Change Policy

**Version Policy**:
- **MAJOR** (breaking): Component prop removal, token deletion, new required dependencies
- **MINOR** (feature): New components, new token categories, new tokens, new features
- **PATCH** (fix): Bug fixes, type fixes, docs updates, performance improvements

**Detection**:
- Automated: Analyze git diff for breaking changes
- Manual: Review PR for breaking change labels
- Committee: Major version requires 2+ approvals

**Backward Compatibility**:
- **3 major versions** of deprecation warning before removal
- Tokens: Never delete (deprecate and alias)
- Components: Never remove props (deprecate and make optional)
- Types: Never remove from union (add instead)
- Example: v3.0 deprecates X, v4.0 warns, v5.0 removes ✗, v6.0 is safe

**Release Process**:
1. Merge to `main` → builds automatically
2. Create GitHub release → draft release notes
3. Manual approval → 2+ leads review
4. Publish → npm, docs, changelog, git tag
5. Announce → GitHub release, Discord, email list

**Pre-release**:
- Development: `@next` tag on npm (automatic from main)
- Release Candidate: `@rc` tag (manual promotion)
- Stable: `@latest` tag (automatic, only after RC stable)

**Rollback**:
- Last 3 releases kept on npm
- Older versions deprecated (security review)
- Hot-fixes published on `patch` branches

**Questions for Architect**:
1. Should we maintain multiple version branches (v3, v4, v5) for backports?
2. How aggressive should deprecation timeline be (3 majors vs 2 majors)?
3. Should breaking changes require RFCs or issue discussions first?
4. How to communicate breaking changes (email, in-CLI banner, docs site)?

---

## DECISION 5: Performance Tracking & Bundle Budget

### Context
us-3.33-3.35 track bundle size, visual regression, render performance.

**Concern**:
- Current bundle size unknown (need baseline)
- No threshold enforcement
- Risk of scope creep adding unnecessary dependencies

### Decision: Strict Bundle Budget with Staged Rollout

**Bundle Strategy**:

**Size Budget**:
```
├─ @orion-ds/react (full)        ≤ 150KB (gzipped)
├─ @orion-ds/react/client        ≤ 80KB (gzipped)  ← tree-shakeable
├─ @orion-ds/react/chart         ≤ 40KB (recharts)
├─ @orion-ds/react/calendar      ≤ 30KB (date-fns)
└─ @orion-ds/react/editor        ≤ 35KB (syntax-highlighter)
```

**Enforcement**:
- CI/CD: Blocks merge if bundle increases > 5%
- Manual override: Requires 2+ approvals + justification
- Quarterly review: Adjust budgets based on features added
- Tree-shaking: `preserveModules: true` enforces per-component bundling

**Monitoring**:
- Weekly reports: Track size trends over time
- Per-component impact: Size of each component in isolation
- Dependency analysis: Flag new external dependencies
- Comparison: vs shadcn, Material-UI, Chakra UI

**Tool**:
- `npm run measure:bundle-size` — local analysis
- CI: `esbuild --analyze` plugin for size visualization
- Dashboard: Public `bundle.orion-ds.com` with historical charts

**Handling Regressions**:
1. Identify offending commit/PR
2. Ask: Is size increase necessary?
3. Optimize: Remove dependencies, tree-shake unused code
4. Approve: If unavoidable, document in PR + release notes
5. Commit: Accept new budget level for next release

**Questions for Architect**:
1. Should external frameworks (React, TypeScript) be excluded from bundle size?
2. How to handle font bundles (should Google Fonts count toward budget)?
3. Should we benchmark against competitors monthly?
4. What's acceptable growth rate per release (0%, 1%, 2%)?

---

## DECISION 6: Visual Regression Testing Approach

### Context
us-3.35 implements visual regression testing across browsers/themes/brands.

**Options**:
1. **Percy.io**: Managed, $$ cost, integrates with GitHub
2. **Custom solution**: Free, self-hosted, requires maintenance
3. **Playwright visual tests**: Built into Playwright, low cost

### Decision: Playwright Visual Tests + Percy Integration

**Phase 1 (Weeks 1-6)**:
- Use Playwright visual comparison (built-in)
- Threshold: 1% pixel difference tolerance
- Baselines: Checked into git
- Runs: On every PR, optional approval for changes

**Phase 2 (Weeks 7+)**:
- Integrate Percy for managed solution
- Parallel test matrix (Chrome, Firefox, Safari)
- Historical regression tracking
- Public reports on PR

**Test Coverage**:
- All 72 components: 5+ variants each
- All 5 brands: orion, red, deepblue, orange, lemon
- All 2 themes: light, dark
- **Total**: 72 × 5 × 5 × 2 = 3,600 visual tests

**Execution Time**:
- Local: ~3min (full suite)
- CI: ~5min (parallel across machines)
- PR: ~2min (changed components only)

**Artifacts**:
- Screenshots in `git-lfs` (large binary storage)
- Diffs uploaded to PR comments
- Historical baselines versioned by release

**Questions for Architect**:
1. Should font baselines be separate from component baselines?
2. How to handle OS-specific rendering differences (font rendering, antialiasing)?
3. Should we test mobile viewports separately (Playwright supports device emulation)?
4. Percy cost acceptable? Or better to defer Phase 2?

---

## DECISION 7: Documentation Versioning & Deployment

### Context
us-3.31 sets up continuous docs deployment.

**Questions**:
- How to version docs for multiple Orion versions?
- Should old version docs remain accessible?
- How to prevent docs staleness?

### Decision: Docs-per-Version with Latest Default

**Structure**:
```
docs.orion-ds.com/
├─ / (latest, v4.5)
├─ /v4/ (stable version page)
├─ /v3/ (legacy support)
├─ /archive/v2/ (unsupported but accessible)
└─ /next/ (development, unreleased)
```

**Version Selection**:
- Docs auto-built on: `main` → `/next/`, release tags → `/v4.5/`, etc.
- Always 3 versions accessible: latest, prior major, prior prior major
- Older versions moved to `/archive/` (read-only)
- Sidebar shows available versions

**Deployment**:
- On release: Build docs for release branch
- On main: Build docs for `/next/`
- Automatic redirect: `/v3.9` → `/v3/`
- Cache: 1 week TTL (so docs update within a week)

**Staleness Prevention**:
- Each doc page shows "Updated: date" footer
- CI check: Doc modified < 90 days old?
- Flag: "This version is outdated, go to latest" banner

**Hosting**:
- Vercel (free tier, auto-deploys from git)
- Or Netlify (same)
- CDN: Cloudflare for distribution

**Questions for Architect**:
1. How many versions should we maintain actively (2, 3, or 5)?
2. Should we version npm packages and docs together (required)?
3. How to handle API changes between versions in examples?
4. Should we maintain version-specific guides (e.g., v3 migration to v4)?

---

## DECISION 8: Community & Ecosystem Growth

### Context
us-3.47-3.50 set up community infrastructure.

**Decision**: GitHub Discussions (free, integrated, low overhead) vs Discourse (paid, feature-rich)

### Decision: Start with GitHub Discussions, Scale to Discourse if Needed

**Phase 1: GitHub Discussions** (us-3.48)
- Free, integrated with GitHub
- Categories: Questions, Show & Tell, Ideas, Announcements
- Moderation: Volunteers + GitHub team
- Cost: $0/month
- Maintenance: ~5 hrs/week

**Phase 2: Community Manager** (if 1000+ monthly active users)
- Hire dedicated community manager
- Migrate to Discourse if needed
- Costs: Manager salary + Discourse hosting ($100/month)
- Expected: Weeks 20+

**Success Metrics**:
- 100+ discussions/month by end of year
- <24hr response time to questions
- 50%+ answers from community (not team)
- Featured showcase with 10+ projects

**Contribution Program** (us-3.47):
- Clear CONTRIBUTING.md
- Good first issues tagged
- Code review guide
- Contributor recognition (wall of fame, merch?)

**Partner Program** (us-3.50):
- Agency partners: Early access, featured in showcase
- Framework authors: React Router, Next.js integrations
- Tool vendors: IDE plugins, design tools

**Questions for Architect**:
1. Should we use GitHub Stars for recognition or separate program?
2. How to prevent negative interactions (Code of Conduct)?
3. Should we offer bounties for community contributions?
4. How to handle stale community questions?

---

## SUMMARY TABLE

| Decision | Key Trade-off | Recommended | Alternative |
|----------|---------------|-------------|-------------|
| **CLI Architecture** | Complexity vs Features | Minimal core → expand | Build all at once |
| **MCP Tool Expansion** | Performance vs Features | Lazy-load tools | Load all upfront |
| **Documentation** | Auto vs Manual | Hybrid approach | Fully auto or fully manual |
| **Release Versioning** | Stability vs Frequency | Strict semver, 3-version support | Rapid semver or LTS |
| **Bundle Budget** | Size vs Features | Strict 150KB with approvals | No enforcement |
| **Visual Regression** | Cost vs Quality | Playwright + Percy Phase 2 | Custom or skip |
| **Docs Versioning** | Maintenance vs Coverage | 3-version support | Single `/latest/` |
| **Community Platform** | Cost vs Features | GitHub Discussions → Discourse | Discourse immediately |

---

## ARCHITECT SIGN-OFF CHECKLIST

- [ ] CLI architecture: Approve minimal core + phased expansion
- [ ] MCP tools: Approve lazy-loading + performance profiling plan
- [ ] Documentation: Approve hybrid (auto + manual) approach
- [ ] Release process: Approve strict semver + 3-version support
- [ ] Bundle budget: Approve 150KB limit + 5% threshold
- [ ] Visual regression: Approve Playwright + Percy Phase 2 plan
- [ ] Docs versioning: Approve 3-version public + archive
- [ ] Community: Approve GitHub Discussions Phase 1

---

**Document**: TIER3_TECHNICAL_DECISIONS.md
**Created**: March 18, 2026
**Status**: Awaiting Architecture Review

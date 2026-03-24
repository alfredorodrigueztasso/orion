# Changelog

All notable changes to Orion Design System are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.3.0] — 2026-03-24

### Added
- Dynamic token type generation: `generate-types-dynamic.ts` now introspects JSON tokens and auto-generates TypeScript types
- Error handling for missing/malformed token files in `generate-types-dynamic.ts`
- TypeScript validation of generated `types.ts` immediately after creation
- Brand consistency validation between `brands.json` and `primary.json`

### Fixed
- **Critical**: Corrected JSON access paths in `generate-types-dynamic.ts` (removed erroneous `.primitives?.` wrapper from primaryTokens reads)
- Removed `[key: string]: any` from fixed-structure interfaces (`SemanticTokens`, `Primitives`, `ColorPrimitives`)
- Phantom "ember" brand no longer appears in generated types (only 5 real brands: orion, deepblue, red, orange, lemon)

### Changed
- `build:tokens` script now runs both `generate-types.ts` and `generate-types-dynamic.ts` in sequence
- Updated CLAUDE.md Mejora 4 status from DEFERRED to ACTIVE

## [5.2.0] — 2026-03-24

### Removed
- **BREAKING**: Chat component completely removed from `@orion-ds/react` main export
- Removed `@orion-ds/react/rich` subpath export (Chat previously accessed via this path)
- Removed ChatPageTemplate from templates list

### Added
- `MissingDependencyError` component for graceful handling of optional dependency failures in `@orion-ds/react`
- Postinstall script to validate optional dependencies and guide users on installation

### Fixed
- Postinstall distribution issues (v5.1.9-v5.1.11)

## [5.1.13] — 2026-03-23

### Added
- Chat component deprecated with console warnings
- `CHAT_MIGRATION_GUIDE.md` with migration options and alternatives

### Changed
- Chat functionality moved to deprecation notice (no longer recommended)
- Postinstall script improvements for dependency validation

### Fixed
- Distribution issues from v5.1.9-v5.1.11 postinstall crashes
- Smoke tests validation (27/28 passing in v5.1.13)

---

## Previous Versions

For changes in versions prior to v5.1.13, see `git log` history.

Each release tag corresponds to:
- `@orion-ds/react` npm package version
- Git tag format: `v{major}.{minor}.{patch}`
- All packages in the monorepo (`@orion-ds/blocks`, `@orion-ds/cli`, etc.) versioned together

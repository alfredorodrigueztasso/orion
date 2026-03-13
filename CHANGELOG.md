# Changelog

All notable changes to the Orion Design System are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [4.2.11] - 2026-03-13

### Fixed
- **FormSection**: Made `title` prop optional (`title?: string`) to support auth flows, modals, and layouts without visible section titles ([#team-feedback](https://example.com))
- **Button**: Added `loadingText?: string` prop to display custom text during loading state instead of hardcoding boilerplate ([#team-feedback](https://example.com))

### Changed
- **FormSection**: Header element now only renders if there is content to display (title, icon, or collapsible toggle). Enables cleaner layouts without unnecessary header dividers.

### Clarified
- **Field**: Confirmed `error?: string` prop has been available since v3.0.0 with full accessibility support (`role="alert"`, `aria-invalid`, auto-inserted error icon). Team feedback indicated this feature was underdocumented in prior versions.

---

## [4.2.10] - 2026-03-13

### Added
- Unit test coverage improvements for Command and CommandBar components
- FormSection and CommandBar branch coverage optimizations

### Fixed
- Command component test reliability in jsdom environment
- CommandBar overlay interaction testing

---

## Earlier Versions

See git history for details on versions prior to 4.2.10.

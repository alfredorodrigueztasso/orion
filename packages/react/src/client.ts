"use client";

/**
 * @orion-ds/react/client
 *
 * Client-only entry point for use in Next.js App Router and other frameworks
 * with React Server Components (RSC). This module is marked with the 'use client'
 * directive, which tells the framework that all imports from this path (and
 * re-exported modules) are Client Components.
 *
 * Usage:
 *   import { ThemeProvider, Button, useTheme } from '@orion-ds/react/client';
 *   import { ThemeController } from '@orion-ds/react/client';
 *
 * In Server Components, you can import types only:
 *   import type { ButtonProps } from '@orion-ds/react/client';
 *
 * Note: When importing from this path, the 'use client' directive propagates
 * to all modules transitively imported. This ensures the entire dependency
 * tree is understood by your framework as a client-side boundary.
 */

export * from "./index";

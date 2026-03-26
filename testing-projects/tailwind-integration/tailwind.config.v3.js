/**
 * Tailwind CSS v3 Configuration for Orion Testing
 *
 * This config uses the official Orion preset for seamless integration
 * with automatic dark mode and brand switching support.
 *
 * IMPORTANT: Import order matters!
 * In your CSS file, ensure:
 *   1. Declare @layer orion FIRST
 *   2. Import Tailwind
 *   3. Import Orion styles
 *
 * Example (src/styles.css):
 *   @layer orion;
 *   @tailwind base;
 *   @tailwind components;
 *   @tailwind utilities;
 *   @import '@orion-ds/react/styles.css';
 */

import { orionPreset } from '@orion-ds/react/integrations/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [orionPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
};

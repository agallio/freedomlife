/**
 * Tailwind Config for @repo/app Package
 *
 * This config is ONLY used for editor IntelliSense (VSCode, WebStorm, etc.)
 * and is NOT used during builds.
 *
 * At build time, the consuming apps (web/mobile) process Tailwind classes
 * from this package using their own configs located at:
 * - apps/web/tailwind.config.js
 * - apps/mobile/tailwind.config.js
 *
 * This config extends the shared base to ensure IntelliSense matches
 * the actual runtime behavior.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend shared base config
  ...require('@repo/tailwind-config'),

  // Content paths for files within this package
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './providers/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
  ],
}

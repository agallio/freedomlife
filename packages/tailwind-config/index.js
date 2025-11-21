/**
 * Shared Base Tailwind Configuration
 *
 * This config is extended by all apps and packages in the monorepo.
 * It contains the shared foundation: presets, theme extensions, and plugins.
 *
 * Platform-specific settings (like darkMode, important flags) are added
 * in the individual app configs that extend this base.
 *
 * @see apps/web/tailwind.config.js
 * @see apps/mobile/tailwind.config.js
 * @see packages/app/tailwind.config.js
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind preset enables React Native compatibility
  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      // Add custom theme extensions here (colors, fonts, spacing, etc.)
      // These will be available in all apps and packages
    },
  },

  plugins: [
    // Add Tailwind plugins here
    // They will be available in all apps and packages
  ],
}

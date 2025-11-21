/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend shared base config
  ...require('@repo/tailwind-config'),

  // Mobile-specific content paths
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/components/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/features/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/providers/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/utils/**/*.{js,jsx,ts,tsx}',
  ],
}

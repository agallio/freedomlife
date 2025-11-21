/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend shared base config
  ...require('@repo/tailwind-config'),

  // Web-specific: Enable class-based dark mode
  darkMode: 'class',

  // Web-specific: Make Tailwind classes important to override other styles
  important: true,

  // Web-specific content paths
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/components/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/features/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/providers/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/utils/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.700'),
              },
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.green.400'),
              '&:hover': {
                color: theme('colors.green.600'),
              },
              code: { color: theme('colors.green.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.600'),
              color: theme('colors.gray.200'),
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
            },
            hr: { borderColor: theme('colors.gray.600') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { fontWeight: '700', color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
}

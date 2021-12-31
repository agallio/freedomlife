const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        logo: ['Lato', 'sans-serif'],
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
            strong: { color: theme('colors.gray.300') },
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

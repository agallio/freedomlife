const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: ['text-2xl'],
    },
  },
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      screens: {
        landscape: { raw: '(orientation: landscape)' },
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark'],
      opacity: ['dark', 'disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

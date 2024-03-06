/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['inter'],
      },
    },
  },
  plugins: [],
}

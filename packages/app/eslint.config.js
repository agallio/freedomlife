const { defineConfig } = require('eslint/config')

const globals = require('globals')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    extends: compat.extends(
      'eslint:recommended',
      'prettier',
      'next/core-web-vitals',
    ),

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: true,
        JSX: true,
      },
    },

    rules: {
      '@next/next/no-html-link-for-pages': 'off',

      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
])

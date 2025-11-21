const { defineConfig } = require('eslint/config')
const js = require('@eslint/js')
const reactCompiler = require('eslint-plugin-react-compiler')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    ignores: [
      '.next/**',
      '.swc/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      '.turbo/**',
    ],
  },
  {
    extends: compat.extends(
      'eslint:recommended',
      'prettier',
      'next/core-web-vitals',
    ),

    settings: {
      next: {
        rootDir: 'apps/web/',
      },
    },

    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  reactCompiler.configs.recommended,
])

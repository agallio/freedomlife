module.exports = {
  extends: ['eslint:recommended', 'prettier', 'next/core-web-vitals'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}

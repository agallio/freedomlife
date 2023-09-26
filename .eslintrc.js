module.exports = {
  extends: ['eslint:recommended', 'next', 'prettier'],
  root: true,
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  globals: {
    React: true,
    JSX: true,
  },
}

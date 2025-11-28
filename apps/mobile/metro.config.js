const { getSentryExpoConfig } = require('@sentry/react-native/metro')
const { withNativeWind } = require('nativewind/metro')

// Find the project and workspace directories
const projectRoot = __dirname

const config = getSentryExpoConfig(projectRoot)

module.exports = withNativeWind(config, {
  input: './global.css',
  inlineRem: 16,
})

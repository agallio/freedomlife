const lightSplash = {
  image: './assets/splash.png',
  resizeMode: 'contain',
  backgroundColor: '#ffffff',
}

const darkSplash = {
  image: './assets/splash.png',
  resizeMode: 'contain',
  backgroundColor: '#374151',
}

const sharedSplash = {
  splash: {
    ...lightSplash,
    dark: darkSplash,
  },
}

export default {
  name: 'freedomlife',
  slug: 'freedomlife',
  scheme: 'freedomlife',
  version: '2.0.7',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  userInterfaceStyle: 'automatic',
  icon: './assets/icon.png',
  splash: lightSplash,
  assetBundlePatterns: ['**/*'],
  runtimeVersion: {
    policy: 'appVersion',
  },
  ios: {
    ...sharedSplash,
    supportsTablet: true,
    buildNumber: '2',
    bundleIdentifier: 'id.freedomlife.app',
    infoPlist: {
      LSMinimumSystemVersion: '12.0',
    },
  },
  android: {
    ...sharedSplash,
    versionCode: 14,
    package: 'id.freedomlife.android',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: [
    'expo-router',
    'expo-localization',
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.4',
        },
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/inter-bold.ttf',
          './assets/fonts/inter-light.ttf',
          './assets/fonts/inter-medium.ttf',
          './assets/fonts/inter-regular.ttf',
          './assets/fonts/inter-semibold.ttf',
        ],
      },
    ],
    [
      'expo-updates',
      {
        username: 'agallio',
      },
    ],
  ],
  updates: {
    url: 'https://u.expo.dev/816555cf-43fe-4a42-8199-65c263ddef54',
  },
  extra: {
    eas: {
      projectId: '816555cf-43fe-4a42-8199-65c263ddef54',
    },
  },
}

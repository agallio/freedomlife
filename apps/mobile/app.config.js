const lightSplash = {
  image: './assets/splash.png',
  resizeMode: 'contain',
  backgroundColor: '#ffffff',
}

const darkSplash = {
  image: './assets/splash.png',
  resizeMode: 'contain',
  backgroundColor: '#000000',
}

const sharedSplash = {
  splash: { ...lightSplash, dark: darkSplash },
}

export default {
  name: 'freedomlife',
  slug: 'freedomlife',
  scheme: 'freedomlife',
  version: '2.2.2',
  orientation: 'portrait',
  icon: './assets/ios-light.png',
  userInterfaceStyle: 'automatic',
  platforms: ['ios', 'android'],
  assetBundlePatterns: ['**/*'],
  runtimeVersion: {
    policy: 'appVersion',
  },
  ios: {
    ...sharedSplash,
    supportsTablet: true,
    bundleIdentifier: 'id.freedomlife.app',
    icon: {
      dark: './assets/ios-dark.png',
      light: './assets/ios-light.png',
      tinted: './assets/ios-tinted.png',
    },
    infoPlist: {
      LSMinimumSystemVersion: '13.0.0',
      ITSAppUsesNonExemptEncryption: false,
    },
    entitlements: {
      'aps-environment':
        process.env.NODE_ENV === 'development' ? 'development' : 'production',
    },
  },
  android: {
    ...sharedSplash,
    package: 'id.freedomlife.android',
    versionCode: 20,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: [
    'expo-router',
    'expo-sqlite',
    'expo-localization',
    'react-native-edge-to-edge',
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '15.1',
        },
        android: {
          usesCleartextTraffic: true,
        },
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
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
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

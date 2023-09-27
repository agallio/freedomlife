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

const config = {
  name: 'freedomlife',
  slug: 'freedomlife',
  scheme: 'freedomlife',
  version: '1.4.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  userInterfaceStyle: 'automatic',
  icon: './assets/icon.png',
  splash: lightSplash,
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  ios: {
    ...sharedSplash,
    bundleIdentifier: 'id.freedomlife.app',
  },
  android: {
    ...sharedSplash,
    package: 'id.freedomlife.app',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFF',
    },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.0',
        },
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
    // Run it via `yarn ios-local`
    apiEnv: process.env.API_ENV,
  },
}

export default config

import { Platform } from 'react-native'

const apiEnv = process.env.EXPO_PUBLIC_API_ENV || 'production'
export const apiUrl =
  Platform.OS === 'web'
    ? ''
    : apiEnv === 'local'
      ? 'http://192.168.1.1:2019'
      : 'https://freedomlife.id'

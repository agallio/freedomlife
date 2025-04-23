import { View } from 'react-native'
import Image from 'next/image'

// Components
import { Text } from '../../../components/text'

/**
 * Web only!
 */
export default function AppDownload() {
  return (
    <View className="mt-8 gap-2">
      <Text className="text-center text-gray-600 dark:text-gray-300">
        Dapatkan Aplikasi freedomlife
      </Text>

      <View className="flex-row items-center justify-center gap-2">
        <a
          href="https://apps.apple.com/us/app/freedomlife/id1643246287"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/app-store-badge.webp"
            alt="App Store Badge"
            width={120}
            height={39}
          />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=id.freedomlife.android"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/google-play-badge.webp"
            alt="Google Play Store Badge"
            width={130}
            height={39}
          />
        </a>
      </View>
    </View>
  )
}

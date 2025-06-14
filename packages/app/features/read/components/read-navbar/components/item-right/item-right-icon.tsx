import { Platform, useColorScheme } from 'react-native'
import { CogIcon } from 'react-native-heroicons/solid'

// Components
import { IconButton } from '../../../../../../components/button'

// Utils
import { getIconColor } from '../../../../../../utils/helpers'

type ItemRightIconProps = {
  onSettingClick: () => void
}

export default function ItemRightIcon({ onSettingClick }: ItemRightIconProps) {
  const colorScheme = useColorScheme()

  // Constant
  const color = getIconColor(colorScheme)

  return (
    <IconButton
      ariaLabel="Tombol pengaturan"
      variant="transparent"
      icon={
        <CogIcon
          size={28}
          className={
            Platform.OS === 'web'
              ? 'text-emerald-900 transition duration-200 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-500'
              : undefined
          }
          color={Platform.OS !== 'web' ? color : undefined}
        />
      }
      onClick={onSettingClick}
    />
  )
}

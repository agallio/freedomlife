import { useColorScheme } from 'react-native'

// Icon Components
import FreedomlifeIconLight from './light'
import FreedomlifeIconDark from './dark'

// Types
import type { IconProps } from '../../../types'

export default function FreedomlifeIcon(props: IconProps) {
  const colorScheme = useColorScheme()

  return colorScheme === 'light' ? (
    <FreedomlifeIconLight {...props} />
  ) : (
    <FreedomlifeIconDark {...props} />
  )
}

import type { StyleProp, ViewStyle } from 'react-native'

export * from './api'

export interface IconProps {
  className?: string
  style?: StyleProp<ViewStyle>
  outline?: boolean
  onClick?: () => void
  theme?: string
}

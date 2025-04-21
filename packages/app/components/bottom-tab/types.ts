import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'

export type BottomTabProps = {
  state?: BottomTabBarProps['state']
  descriptors?: BottomTabBarProps['descriptors']
  navigation?: BottomTabBarProps['navigation']
  pathname?: string
  webRouterPush?: (_path: string) => void
}

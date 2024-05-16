import { View, useColorScheme } from 'react-native'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as Burnt from 'burnt'

// Components
import { BottomTabItem } from './bottom-tab-item'

// Contexts
import { useNetworkConnectionContext } from '../../providers/network'

type BottomTabProps = {
  state?: BottomTabBarProps['state']
  descriptors?: BottomTabBarProps['descriptors']
  navigation?: BottomTabBarProps['navigation']
  pathname?: string
}

export default function BottomTab({
  state,
  descriptors,
  navigation,
}: BottomTabProps) {
  const { isOffline } = useNetworkConnectionContext()

  return (
    <View
      className="absolute flex flex-row items-center justify-center gap-3 bg-transparent"
      style={{ bottom: 30, left: 0, right: 0 }}
    >
      {state!.routes.map((route, index) => (
        <BottomTabContainer
          key={index}
          isFocused={state!.index === index}
          isOffline={isOffline}
          route={route}
          descriptors={descriptors!}
          navigation={navigation!}
        />
      ))}
    </View>
  )
}

function BottomTabContainer({
  isFocused,
  isOffline,
  route,
  descriptors,
  navigation,
}: {
  isFocused: boolean
  isOffline: boolean
  route: BottomTabBarProps['state']['routes'][0]
  descriptors: BottomTabBarProps['descriptors']
  navigation: BottomTabBarProps['navigation']
}) {
  const colorScheme = useColorScheme()

  // Constants
  const { options } = descriptors[route.key]!
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name

  // Methods
  const showOfflineToast = () => {
    Burnt.toast({
      preset: 'custom',
      duration: 1.5,
      title: 'Anda Sedang Offline',
      icon: {
        ios: {
          name: 'exclamationmark.icloud.fill',
          color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
        },
      },
    })
  }

  const onPress = () => {
    if (isOffline && route.name !== 'read') {
      showOfflineToast()
      return
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params)
    }
  }

  const onLongPress = () => {
    if (isOffline && route.name !== 'read') {
      showOfflineToast()
      return
    }

    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }

  return (
    <BottomTabItem
      isFocused={isFocused}
      label={label as string}
      options={{ tabBarAccessibilityLabel: options.tabBarAccessibilityLabel }}
      onPress={onPress}
      onLongPress={onLongPress}
    />
  )
}

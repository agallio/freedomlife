import { Platform, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Components
import { BottomTabItem } from './bottom-tab-item'

// Contexts
import { useReadPassageGeneralContext } from '../../features/read/contexts/read-passage.context'

// Types
import type { BottomTabProps } from './types'

type AvailableRoute = { label: string; path: string }

const availableRoutes: AvailableRoute[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Baca', path: '/read' },
  { label: 'Panduan', path: '/guide' },
]

export default function BottomTab({ pathname, webRouterPush }: BottomTabProps) {
  return (
    <View
      className="fixed flex flex-row items-center justify-center gap-1 bg-transparent min-[374px]:gap-3"
      style={{ bottom: 30, left: 0, right: 0 }}
    >
      {availableRoutes.map((route, index) => (
        <BottomTabContainer
          key={index}
          isFocused={pathname === route.path}
          route={route}
          webRouterPush={webRouterPush}
        />
      ))}
    </View>
  )
}

function BottomTabContainer({
  isFocused,
  route,
  webRouterPush,
}: {
  isFocused: boolean
  route: AvailableRoute
  webRouterPush?: BottomTabProps['webRouterPush']
}) {
  const resetSelectedText = useReadPassageGeneralContext(
    (state) => state.actions.resetSelectedText,
  )

  // Methods
  const onPress = async () => {
    if (Platform.OS === 'web' && !isFocused && webRouterPush) {
      resetSelectedText()

      if (route.label === 'Baca') {
        const storedWithGuide = await AsyncStorage.getItem('withGuide')
        const storedLastChapterRead = await AsyncStorage.getItem(
          'selectedBiblePassage',
        )

        const withGuide = storedWithGuide ? JSON.parse(storedWithGuide) : false
        const lastChapterRead = storedLastChapterRead
          ? `?chapter=${storedLastChapterRead}`
          : ''

        let newPath = withGuide
          ? route.path
          : `${route.path}/bible${lastChapterRead}`

        webRouterPush(newPath)
        return
      }

      webRouterPush(route.path)
    }
  }

  return (
    <BottomTabItem
      isFocused={isFocused}
      label={route.label}
      onPress={onPress}
    />
  )
}

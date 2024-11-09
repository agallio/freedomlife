import { Platform, View } from 'react-native'
import { useRouter } from 'solito/router'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Components
import { BottomTabItem } from './bottom-tab-item'

// Contexts
import { useReadPassageContext } from '../../features/read/contexts/read-passage.context'

type AvailableRoute = { label: string; path: string }

const availableRoutes: AvailableRoute[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Baca', path: '/read' },
  { label: 'Panduan', path: '/guide' },
]

export default function BottomTab({ pathname }: { pathname?: string }) {
  return (
    <View
      className="fixed flex flex-row items-center justify-center gap-3 bg-transparent"
      style={{ bottom: 30, left: 0, right: 0 }}
    >
      {availableRoutes.map((route, index) => (
        <BottomTabContainer
          key={index}
          isFocused={pathname === route.path}
          route={route}
        />
      ))}
    </View>
  )
}

function BottomTabContainer({
  isFocused,
  route,
}: {
  isFocused: boolean
  route: AvailableRoute
}) {
  const { push } = useRouter()
  const { resetHighlightedText } = useReadPassageContext()

  // Methods
  const onPress = async () => {
    if (Platform.OS === 'web' && !isFocused) {
      resetHighlightedText()

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

        push(newPath)
        return
      }

      push(route.path)
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

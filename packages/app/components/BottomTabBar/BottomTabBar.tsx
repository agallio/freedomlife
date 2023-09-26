import { useRouter } from 'solito/router'
import { View, useSx } from 'dripsy'
import {
  BookmarkIcon,
  BookOpenIcon,
  HomeIcon,
} from 'react-native-heroicons/solid'

// Components
import BottomTabBarItem from './BottomTabBarItem'

// Contexts
// import { useReadPassageContext } from 'app/features/read/contexts/ReadPassageContext'

// Types
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export default function BottomTabBar({
  state,
  descriptors,
}: BottomTabBarProps) {
  const sx = useSx()
  const { push } = useRouter()

  // Context
  // const {
  //   passage,
  //   setPassage,
  //   setInGuide,
  //   setBibleVersion,
  //   setGuideDate,
  //   setGuidePassage,
  //   setHighlightedText,
  // } = useReadPassageContext()

  return (
    <View
      sx={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]!
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          push(`/${route.name}`)
          // setHighlightedText([])

          // --- Commented for future use ---
          // if (route.name === 'read') {
          // setInGuide(false)
          // setGuideDate('')
          // if (passage === '') setPassage('kej-1')
          // setBibleVersion('tb')
          // setGuidePassage('')
          // }
        }

        const getIcon = () => {
          switch (label) {
            case 'Beranda':
              return (
                <HomeIcon
                  size={20}
                  style={sx({ color: isFocused ? 'tabTextActive' : 'tabText' })}
                />
              )
            case 'Baca':
              return (
                <BookOpenIcon
                  size={20}
                  style={sx({ color: isFocused ? 'tabTextActive' : 'tabText' })}
                />
              )
            case 'Panduan':
              return (
                <BookmarkIcon
                  size={20}
                  style={sx({ color: isFocused ? 'tabTextActive' : 'tabText' })}
                />
              )
            default:
              return
          }
        }

        return (
          <BottomTabBarItem
            key={index}
            icon={getIcon()}
            label={label as string}
            options={{
              tabBarAccessibilityLabel: options.tabBarAccessibilityLabel,
              tabBarTestID: options.tabBarTestID,
            }}
            isFocused={isFocused}
            onPress={onPress}
          />
        )
      })}
    </View>
  )
}

import { useState } from 'react'
import {
  ListRenderItemInfo,
  Platform,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native'
import { View, P, useSx, TextInput } from 'dripsy'
import { useRouter } from 'solito/router'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/solid'

// Utils
import { passageData } from 'app/utils/constants'

// Queries
import type { PassageItem } from 'app/types'

export default function WithoutGuide() {
  const sx = useSx()
  const colorScheme = useColorScheme()
  const { push } = useRouter()

  // States
  const [searchText, setSearchText] = useState('')

  return (
    <FlatList
      data={
        searchText !== ''
          ? [
              passageData[0],
              ...passageData.filter((i) =>
                i.name.toLowerCase().includes(searchText.toLowerCase())
              ),
            ]
          : passageData
      }
      style={{ flex: 1 }}
      scrollEventThrottle={16}
      contentContainerStyle={sx({ paddingY: 14, paddingX: ['md', '2xl'] })}
      keyExtractor={(_, index) => String(index)}
      initialNumToRender={10}
      renderItem={({ item, index }: ListRenderItemInfo<PassageItem>) => {
        if (index === 0) {
          return (
            <View
              sx={{
                flexDirection: 'row',
                backgroundColor: 'tab',
                boxShadow: 'container',
                borderRadius: 8,
                marginBottom: 'xs',
                flex: 1,
              }}
            >
              <View sx={{ padding: 12 }}>
                <MagnifyingGlassIcon size={20} style={sx({ color: 'text' })} />
              </View>
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                style={
                  Platform.OS === 'web'
                    ? sx({
                        width: '100%',
                        // @ts-ignore
                        // Web only.
                        outlineStyle: 'none',
                        color: 'text',
                      })
                    : sx({ flex: 1, color: 'text', fontSize: 'md' })
                }
                placeholder="Cari Kitab"
                placeholderTextColor={
                  colorScheme === 'light' ? '#4b5563' : '#d1d5db'
                }
              />
              {searchText !== '' && (
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => setSearchText('')}
                >
                  <XMarkIcon size={20} style={sx({ color: 'text' })} />
                </TouchableOpacity>
              )}
            </View>
          )
        }

        return (
          <TouchableOpacity
            style={sx({
              flex: 1,
              marginY: 'sm',
              paddingY: 14,
              paddingX: 'md',
              backgroundColor: 'tab',
              borderRadius: 8,
              boxShadow: 'container',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom:
                Platform.OS === 'ios' && item.abbr === 'why' ? 50 : 6,
            })}
            onPress={() => push(`/passageChapter/${item.name.toLowerCase()}`)}
          >
            <P>{item.name}</P>
            <ChevronRightIcon size={20} style={sx({ color: 'text' })} />
          </TouchableOpacity>
        )
      }}
    />
  )
}

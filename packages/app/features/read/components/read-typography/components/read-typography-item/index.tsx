import { memo, useMemo } from 'react'
import { Pressable, useColorScheme, View } from 'react-native'
// import { BookmarkIcon } from 'react-native-heroicons/solid'

// Components
import { Header, Text } from '../../../../../../components/text'

// Contexts
import { useReadSettingsContext } from '../../../../contexts/read-settings.context'

// Utils
import { cn } from '../../../../../../utils/helpers'

// Types
import type { VerseData } from '../../../../../../types'

export type ReadTypographyItemProps = {
  item: VerseData
  index: number
  isHighlighted?: boolean
  onClick: (_content: string, _verse: number) => void
}

/**
 * Native only!
 */
function ReadTypographyItem({
  item,
  index,
  isHighlighted,
  onClick,
}: ReadTypographyItemProps) {
  const colorScheme = useColorScheme()
  const {
    verseFontSize,
    headerFontSize,
    nativeVerseNumberFontSize,
    nativeVerseNumberLineHeight,
  } = useReadSettingsContext()

  // Memoized Values
  const cleanContent = useMemo(() => {
    // To remove any 'new lines' characters
    // Will break the layout in native (iOS & Android)
    return item.content.replace(/\r?\n|\r/, '')
  }, [item.content])

  const bookmarkIconColor = useMemo(() => {
    return colorScheme === 'light' ? '#047857' : '#10b981'
  }, [colorScheme])

  // Methods
  const renderIndentation = (index: string) => {
    switch (index.length) {
      case 1:
        return '   '
      case 2:
        return '    '
      case 3:
        return '     '
      default:
        return '   '
    }
  }

  if (item.type === 'title') {
    return (
      <Header
        className="p-4 text-center"
        // Manually set fontSize via style prop to handle font scaling on native.
        style={{ fontSize: headerFontSize as number }}
      >
        {item.content}
      </Header>
    )
  }

  return (
    <Pressable onPress={() => onClick(cleanContent, item.verse)}>
      <View
        className={cn(
          'relative flex-row',
          isHighlighted
            ? 'bg-gray-300/70 px-4 sm:rounded-lg dark:bg-gray-700'
            : 'px-4',
          index === 0 && 'pt-4',
        )}
      >
        <View className="relative flex-1 flex-row items-center">
          <Text
            customFontSize="custom"
            className="absolute top-[4px] mr-1 dark:text-emerald-200"
            style={{
              fontSize: nativeVerseNumberFontSize,
              lineHeight: nativeVerseNumberLineHeight,
            }}
          >
            {item.verse}
          </Text>

          <Text style={{ lineHeight: Number(verseFontSize) * 2 }}>
            {renderIndentation(String(item.verse))}
            <Text
              className={cn(
                'text-gray-900',
                // index === 2 ? 'bg-emerald-300 dark:bg-emerald-800' : '',
              )}
              style={{
                lineHeight: Number(verseFontSize) * 2,
                // Manually set fontSize via style prop to handle font scaling on native.
                fontSize: verseFontSize as number,
              }}
            >
              {cleanContent}
            </Text>
          </Text>
        </View>

        {/* {index === 3 && (
          <View className="mt-[9px] h-[16px] w-[16px] flex-shrink-0">
            <BookmarkIcon size={16} color={bookmarkIconColor} />
          </View>
        )} */}
      </View>
    </Pressable>
  )
}

export default memo(ReadTypographyItem)

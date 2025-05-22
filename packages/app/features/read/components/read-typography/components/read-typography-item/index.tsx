import { memo, useMemo } from 'react'
import { Pressable, View } from 'react-native'

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
          'relative flex-row items-center',
          isHighlighted
            ? 'bg-gray-300/70 px-4 sm:rounded-lg dark:bg-gray-700'
            : 'px-4',
          index === 0 && 'pt-4',
        )}
      >
        <Text
          customFontSize="custom"
          className={cn(
            'absolute top-[4px] mr-1 pl-4 dark:text-emerald-200',
            index === 0 && 'pt-4',
          )}
          style={{
            fontSize: nativeVerseNumberFontSize,
            lineHeight: nativeVerseNumberLineHeight,
          }}
        >
          {item.verse}
        </Text>

        <Text
          className="leading-loose text-gray-900"
          // Manually set fontSize via style prop to handle font scaling on native.
          style={{ fontSize: verseFontSize as number }}
        >
          {renderIndentation(String(item.verse))}
          {cleanContent}
        </Text>
      </View>
    </Pressable>
  )
}

export default memo(ReadTypographyItem)

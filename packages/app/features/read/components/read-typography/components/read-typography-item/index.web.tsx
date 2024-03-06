import { Pressable, View } from 'react-native'
import { memo } from 'react'

// Components
import {
  Header,
  Text,
  type CustomFontSizeType,
} from '../../../../../../components/text'

// Contexts
import { useReadSettingsContext } from '../../../../contexts/read-settings.context'

// Utils
import { cn } from '../../../../../../utils/helpers'

// Types
import type { ReadTypographyItemProps } from '.'

function ReadTypographyItem({
  item,
  index,
  isHighlighted,
  onClick,
}: ReadTypographyItemProps) {
  const { verseFontSize, headerFontSize } = useReadSettingsContext()

  if (item.type === 'title') {
    return (
      <Header
        customFontSize={headerFontSize as CustomFontSizeType}
        className="my-4 px-4 text-center leading-snug"
      >
        {item.content}
      </Header>
    )
  }

  return (
    <View
      className={cn(
        isHighlighted
          ? 'bg-gray-200 px-4 transition duration-200 sm:-mx-4 sm:my-0 sm:rounded-lg dark:bg-gray-700'
          : 'px-4 sm:px-0',
        index === 0 && 'pt-4',
      )}
    >
      <Pressable onPress={() => onClick(item.content, item.verse)}>
        <Text
          customFontSize={verseFontSize as CustomFontSizeType}
          className="leading-loose text-gray-900"
        >
          <sup className="relative -top-1 mr-2 text-xs text-emerald-800 dark:text-emerald-300">
            {item.verse}
          </sup>
          {item.content}
        </Text>
      </Pressable>
    </View>
  )
}

export default memo(ReadTypographyItem)

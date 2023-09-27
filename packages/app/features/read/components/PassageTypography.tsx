import { View, Text, Pressable } from 'dripsy'

// Types
import type { HighlightedText, VerseData } from 'app/types'
interface PassageTypographyProps {
  item: VerseData
  highlightedText: HighlightedText[]
  headerFontSize: string
  verseFontSize: string
  verseLineHeight: number
  verseNumberFontSize: number
  verseNumberLineHeight: number
  renderIndentation: (_: string) => string
  highlightText: (_verse: number, _content: string) => void
}

export default function PassageTypography({
  item,
  highlightedText,
  headerFontSize,
  verseFontSize,
  verseLineHeight,
  verseNumberFontSize,
  verseNumberLineHeight,
  renderIndentation,
  highlightText,
}: PassageTypographyProps) {
  if (item.type === 'title') {
    return (
      <Text
        sx={{
          marginTop: item.verse > 1 ? 'md' : undefined,
          marginBottom: 'md',
          textAlign: 'center',
          color: 'text',
          fontSize: headerFontSize,
          fontWeight: '800',
        }}
        // @ts-ignore
        // https://github.com/nandorojo/dripsy/issues/206
        style={{ fontWeight: '800' }}
      >
        {item.content.replace(/\n/g, '')}
      </Text>
    )
  }

  return (
    <Pressable onPress={() => highlightText(item.verse, item.content)}>
      <View key={item.verse}>
        {item.verse > 0 ? (
          <Text
            sx={{
              position: 'absolute',
              marginRight: 4,
              color: 'bibleSupText',
              fontSize: verseNumberFontSize,
              lineHeight: verseNumberLineHeight,
              fontWeight: '800',
            }}
            // @ts-ignore
            // https://github.com/nandorojo/dripsy/issues/206
            style={{ fontWeight: '800' }}
          >
            {item.verse}
          </Text>
        ) : null}
        <Text
          sx={{
            fontSize: verseFontSize,
            color: 'text',
            lineHeight: verseLineHeight,
            textDecorationLine: highlightedText.find(
              (i) => i.verse === item.verse
            )
              ? 'underline'
              : undefined,
          }}
        >
          {renderIndentation(String(item.verse + 1))}
          {item.content.replace(/\n/g, '')}
        </Text>
      </View>
    </Pressable>
  )
}

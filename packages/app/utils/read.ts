import { HighlightedText } from 'app/types'

export function generateTextToCopy(
  highlightedText: HighlightedText[],
  bibleVersion: string,
  passageTitle: string
) {
  let mapHighlightedContent
  let mapHighlightedVerse

  const sortedHighlightedText = highlightedText.sort(
    (a, b) => a.verse - b.verse
  )

  const highlightedContent = sortedHighlightedText.map((item) => item.content)
  const highlightedVerse = sortedHighlightedText.map((item) => item.verse)
  const checkDiffVerse = highlightedVerse
    .slice(1)
    .map((n, i) => n - highlightedVerse[i]!)
  const isIncreasingSequence = checkDiffVerse.every((value) => value === 1)

  if (highlightedVerse.length > 1) {
    if (isIncreasingSequence) {
      mapHighlightedVerse = `${highlightedVerse[0]}-${
        highlightedVerse[highlightedVerse.length - 1]
      }`
      mapHighlightedContent = highlightedContent.join(' ')
    } else {
      mapHighlightedVerse = highlightedVerse.join(',')
      mapHighlightedContent = highlightedContent
        .map((item, index) => `${highlightedVerse[index]}. ${item}`)
        .join('\n\n')
    }
  } else {
    mapHighlightedVerse = highlightedVerse[0]
    mapHighlightedContent = highlightedContent[0]
  }

  return `"${mapHighlightedContent}" - ${passageTitle}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
}

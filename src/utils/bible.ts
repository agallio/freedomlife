import toast from 'react-hot-toast'

// Types
import type { HighlightedText } from '~/types/component'

export const fontSizeName: { [key: string]: string } = {
  sm: 'Kecil',
  base: 'Normal',
  lg: 'Sedang',
  xl: 'Besar',
  '2xl': 'Lebih Besar',
  '3xl': 'Sangat Besar',
}

export const headerFontSize: { [key: string]: string } = {
  sm: 'base',
  base: 'lg',
  lg: 'xl',
  xl: '2xl',
  '2xl': '3xl',
  '3xl': '4xl',
}

export const handleMinusFontSize = (
  verseFontSize: string,
  setVerseFontSize: (_value: any) => void
) => {
  switch (verseFontSize) {
    case 'base':
      setVerseFontSize('sm')
      break
    case 'lg':
      setVerseFontSize('base')
      break
    case 'xl':
      setVerseFontSize('lg')
      break
    case '2xl':
      setVerseFontSize('xl')
      break
    case '3xl':
      setVerseFontSize('2xl')
      break
    default:
      return
  }
}

export const handlePlusFontSize = (
  verseFontSize: string,
  setVerseFontSize: (_value: any) => void
) => {
  switch (verseFontSize) {
    case 'sm':
      setVerseFontSize('base')
      break
    case 'base':
      setVerseFontSize('lg')
      break
    case 'lg':
      setVerseFontSize('xl')
      break
    case 'xl':
      setVerseFontSize('2xl')
      break
    case '2xl':
      setVerseFontSize('3xl')
      break
    default:
      return
  }
}

const fallbackCopyText = async (
  text: string,
  { theme, removeHighlight }: { theme?: string; removeHighlight: () => void }
) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    await document.execCommand('copy')
    textArea.style.display = 'none'
    toast.success('Ayat Tersalin!', {
      style:
        theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
    })
    removeHighlight()
  } catch (e) {
    console.error(e)
    toast.error('Terjadi kesalahan! Coba beberapa saat lagi.', {
      style:
        theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
    })
  }
}

export const copyText = async (
  highlightedText: HighlightedText[],
  {
    theme,
    bibleVersion,
    passageTitle,
    removeHighlight,
  }: {
    theme?: string
    bibleVersion: string
    passageTitle?: string
    removeHighlight: () => void
  }
) => {
  let mapHighlightedContent
  let mapHighlightedVerse

  const sortedHighlightedText = highlightedText.sort(
    (a, b) => a.verse - b.verse
  )

  const highlightedContent = sortedHighlightedText.map((item) => item.content)
  const highlightedVerse = sortedHighlightedText.map((item) => item.verse)
  const checkDiffVerse = highlightedVerse
    .slice(1)
    .map((n, i) => n - highlightedVerse[i])
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

  if (!navigator.clipboard) {
    fallbackCopyText(
      `"${mapHighlightedContent}" - ${passageTitle}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`,
      { theme, removeHighlight }
    )
    return
  }

  try {
    await navigator.clipboard.writeText(
      `"${mapHighlightedContent}" - ${passageTitle}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
    )
    toast.success('Ayat Tersalin!', {
      style:
        theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
    })
    removeHighlight()
  } catch (err) {
    console.error('Failed to copy: ', err)
    toast.error('Terjadi kesalahan! Coba beberapa saat lagi.', {
      style:
        theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
    })
  }
}

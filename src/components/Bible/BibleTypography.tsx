import { RefObject } from 'react'

// Utils
import { headerFontSize } from '~/utils/bible'

// Types
import type {
  BibleDataResponse,
  BibleGuideDataResponse,
  VerseData,
} from '~/types/api'
import type { HighlightedText } from '~/types/component'

interface BibleTypographyProps {
  bibleTypographyRef: RefObject<HTMLDivElement>
  inGuide: boolean
  passage?: string
  maintenance: boolean
  verseFontSize: string
  highlightedText: HighlightedText[]
  isGuideByDateLoading?: boolean
  isBibleByDateLoading?: boolean
  isBibleByPassageLoading?: boolean
  bibleByDateData?: BibleGuideDataResponse
  bibleByPassageData?: BibleDataResponse
  highlightText: (_verse: number, _content: string) => void
}

export default function BibleTypography({
  bibleTypographyRef,
  inGuide,
  passage,
  maintenance,
  verseFontSize,
  highlightedText,
  isGuideByDateLoading,
  isBibleByDateLoading,
  isBibleByPassageLoading,
  bibleByDateData,
  bibleByPassageData,
  highlightText,
}: BibleTypographyProps) {
  let passageArray: VerseData[] | undefined
  if (inGuide) {
    // Force TS to know that passage is exist.
    // `passage` is exist if the `inGuide` is true.
    if (passage!.includes('pl')) {
      passageArray =
        bibleByDateData?.pl?.find((item) => item.passagePlace === passage)
          ?.data || []
    } else if (passage!.includes('pb')) {
      passageArray =
        bibleByDateData?.pb?.find((item) => item.passagePlace === passage)
          ?.data || []
    } else {
      passageArray =
        bibleByDateData?.in?.find((item) => item.passagePlace === passage)
          ?.data || []
    }
  } else {
    passageArray = bibleByPassageData?.data
  }

  return (
    <div
      className={`mx-auto max-w-sm ${
        inGuide ? 'mt-28' : 'mt-[4.5rem]'
      } text-${verseFontSize} mb-[10rem] px-3 dark:text-white sm:max-w-md`}
      ref={bibleTypographyRef}
    >
      {maintenance ? (
        <p>Terjadi Kesalahan. Coba beberapa saat lagi.</p>
      ) : isGuideByDateLoading ||
        isBibleByDateLoading ||
        isBibleByPassageLoading ||
        !passageArray ? (
        <div className="flex animate-pulse flex-col items-center">
          {Array.from(Array(15).keys()).map((item) => {
            if (item === 0) {
              return (
                <div
                  key={item}
                  className="my-2 h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-600"
                />
              )
            } else {
              return (
                <div
                  key={item}
                  className="my-2 h-4 w-full rounded bg-gray-300 dark:bg-gray-600"
                />
              )
            }
          })}
        </div>
      ) : (
        passageArray!.map((item, index) => {
          if (item.type === 'title') {
            return (
              <h1
                key={index}
                className={`my-4 text-center font-bold leading-relaxed text-${headerFontSize[verseFontSize]}`}
              >
                {item.content || ''}
              </h1>
            )
          } else {
            return (
              <p
                key={index}
                className="cursor-pointer leading-loose"
                onClick={() => highlightText(item.verse, item.content)}
              >
                <sup className="relative -top-1 mr-3 text-xs font-light text-emerald-700 dark:text-emerald-300">
                  {item.verse || ''}
                </sup>
                <span
                  className={`text-${verseFontSize} ${
                    highlightedText.find((hl) => hl.verse === item.verse)
                      ? 'underline'
                      : ''
                  }`}
                >
                  {item.content || ''}
                </span>
              </p>
            )
          }
        })
      )}
    </div>
  )
}

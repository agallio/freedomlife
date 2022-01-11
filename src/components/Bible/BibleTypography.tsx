// Types
import type { VerseData } from '@/types/api'
import type { BibleTypographyProps } from '@/types/components'

const BibleTypography = ({
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
  getHeaderFontSize,
  highlightText,
}: BibleTypographyProps): JSX.Element => {
  let passageArray: VerseData[] | undefined
  if (inGuide) {
    if (passage.includes('pl')) {
      passageArray =
        bibleByDateData?.pl?.find((item) => item.passagePlace === passage)
          ?.data || []
    } else if (passage.includes('pb')) {
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
      className={`max-w-sm mx-auto ${
        inGuide ? 'mt-28' : 'mt-[4.5rem]'
      } text-${verseFontSize} mb-[10rem] px-3 sm:max-w-md dark:text-white`}
      ref={bibleTypographyRef}
    >
      {maintenance ? (
        <p>Terjadi Kesalahan. Coba beberapa saat lagi.</p>
      ) : isGuideByDateLoading ||
        isBibleByDateLoading ||
        isBibleByPassageLoading ||
        !passageArray ? (
        <div className="flex flex-col items-center animate-pulse">
          {Array.from(Array(15).keys()).map((item) => {
            if (item === 0) {
              return (
                <div
                  key={item}
                  className="w-2/3 h-4 my-2 rounded bg-gray-300 dark:bg-gray-600"
                />
              )
            } else {
              return (
                <div
                  key={item}
                  className="w-full h-4 my-2 rounded bg-gray-300 dark:bg-gray-600"
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
                className={`text-center font-bold my-4 leading-relaxed text-${getHeaderFontSize()}`}
              >
                {item.content || ''}
              </h1>
            )
          } else {
            return (
              <p
                key={index}
                className="cursor-pointer leading-[200%]"
                onClick={() => highlightText(item.verse, item.content)}
              >
                <sup className="mr-3 relative -top-1 font-light text-xs text-emerald-700 dark:text-emerald-300">
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

export default BibleTypography

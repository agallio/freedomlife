import type { BibleTypographyProps } from '@/types/components'

const BibleTypography = ({
  inGuide,
  verseFontSize,
  maintenance,
  data,
  bibleData,
  passageArray,
  highlightedText,
  getHeaderFontSize,
  highlightText,
}: BibleTypographyProps): JSX.Element => {
  return (
    <div
      className={`max-w-sm mx-auto ${
        inGuide ? 'mt-28' : 'mt-16'
      } text-${verseFontSize} mb-[10rem] px-3 sm:max-w-md dark:text-white`}
    >
      {maintenance ? (
        <p>Terjadi Kesalahan. Coba beberapa saat lagi.</p>
      ) : !data || !bibleData ? (
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
                <sup className="mr-3 relative -top-1 font-light text-xs text-green-700 dark:text-green-300">
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

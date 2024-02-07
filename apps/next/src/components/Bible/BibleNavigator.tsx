import clsx from 'clsx'

// Icon Components
import ChevronLeftIcon from '../Icons/ChevronLeftIcon'
import ChevronRightIcon from '../Icons/ChevronRightIcon'

interface BibleNavigatorProps {
  // chevronRef?: RefObject<HTMLElement>
  inGuide: boolean
  biblePassage?: string
  isFirstPassageInGuide?: boolean
  isLastPassageInGuide?: boolean
  isBibleByDateLoading?: boolean
  isBibleByPassageLoading?: boolean
  backPassage: () => void
  nextPassage: () => void
}

export default function BibleNavigator({
  // chevronRef,
  inGuide,
  biblePassage,
  isFirstPassageInGuide,
  isLastPassageInGuide,
  isBibleByDateLoading,
  isBibleByPassageLoading,
  backPassage,
  nextPassage,
}: BibleNavigatorProps) {
  return (
    <footer
      // ref={chevronRef}
      className="fixed bottom-24 left-0 w-full justify-between"
      style={{ transition: 'bottom 0.3s' }}
    >
      <div className="mx-7 flex max-w-sm items-center justify-between sm:mx-auto sm:max-w-md landscape:mx-auto">
        <button
          aria-label="Pasal Sebelumnya"
          className={clsx(
            'h-12 w-12 transform rounded-full bg-white p-3 shadow-md transition duration-300 focus:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
            isBibleByDateLoading ||
              isBibleByPassageLoading ||
              (inGuide
                ? isFirstPassageInGuide
                : biblePassage === 'kej-1' || !biblePassage)
              ? 'invisible'
              : '',
          )}
          onClick={(e) => {
            e.preventDefault()
            backPassage()
          }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          aria-label="Pasal Selanjutnya"
          className={clsx(
            'h-12 w-12 transform rounded-full bg-white p-3 shadow-md transition duration-300  hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
            isBibleByDateLoading ||
              isBibleByPassageLoading ||
              (inGuide ? isLastPassageInGuide : biblePassage === 'why-22')
              ? 'invisible'
              : '',
          )}
          onClick={nextPassage}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </footer>
  )
}

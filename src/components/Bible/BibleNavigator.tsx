// Icon Components
import ChevronLeftIcon from '../Icons/ChevronLeftIcon'
import ChevronRightIcon from '../Icons/ChevronRightIcon'

// Types
import type { BibleNavigatorProps } from '~/types/components'

const BibleNavigator = ({
  // chevronRef,
  inGuide,
  passage,
  biblePassage,
  isBibleByDateLoading,
  isBibleByPassageLoading,
  backPassage,
  nextPassage,
}: BibleNavigatorProps): JSX.Element => (
  <footer
    // ref={chevronRef}
    className="fixed justify-between bottom-24 left-0 w-full"
    style={{ transition: 'bottom 0.3s' }}
  >
    <div className="flex items-center justify-between max-w-sm mx-7 sm:max-w-md sm:mx-auto landscape:mx-auto">
      <button
        aria-label="Pasal Sebelumnya"
        className={`w-12 h-12 bg-white rounded-full p-3 shadow-md transition transform duration-300 focus:outline-none focus:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 ${
          isBibleByDateLoading ||
          isBibleByPassageLoading ||
          (inGuide
            ? passage === 'pl-1'
            : biblePassage === 'kej-1' || !biblePassage)
            ? 'invisible'
            : ''
        } ${
          inGuide
            ? 'umami--click--to-prev-passage'
            : 'umami--click--to-prev-chapter'
        }`}
        onClick={(e) => {
          e.preventDefault()
          backPassage()
        }}
      >
        <ChevronLeftIcon />
      </button>
      <button
        aria-label="Pasal Selanjutnya"
        className={`w-12 h-12 bg-white rounded-full p-3 shadow-md transition transform duration-300  hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 ${
          isBibleByDateLoading ||
          isBibleByPassageLoading ||
          (inGuide && passage === 'pb') ||
          biblePassage === 'why-22'
            ? 'invisible'
            : ''
        } ${
          inGuide
            ? 'umami--click--to-next-passage'
            : 'umami--click--to-next-chapter'
        }`}
        onClick={nextPassage}
      >
        <ChevronRightIcon />
      </button>
    </div>
  </footer>
)

export default BibleNavigator

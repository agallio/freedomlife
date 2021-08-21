import ChevronLeftIcon from '../Icons/ChevronLeftIcon'
import ChevronRightIcon from '../Icons/ChevronRightIcon'

import { useGuide } from '@/store/index'

import type { BibleNavigatorProps } from '@/types/components'

const BibleNavigator = ({
  // chevronRef,
  data,
  bibleData,
  inGuide,
  passage,
  backPassage,
  nextPassage,
}: BibleNavigatorProps): JSX.Element => {
  const { guidePassage } = useGuide()

  return (
    <footer
      // ref={chevronRef}
      className="fixed justify-between bottom-24 left-0 w-full"
      style={{ transition: 'bottom 0.3s' }}
    >
      <div className="flex items-center justify-between max-w-sm mx-7 sm:max-w-md sm:mx-auto landscape:mx-auto">
        <button
          aria-label="Pasal Sebelumnya"
          className={`w-12 h-12 bg-white rounded-full p-3 shadow-md transition transform duration-300 focus:outline-none focus:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 ${
            !data ||
            !bibleData ||
            (inGuide
              ? passage === 'pl-1'
              : guidePassage === 'kej-1' || !guidePassage)
              ? 'invisible'
              : ''
          } umami--click--to-prev-passage`}
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
            !data ||
            !bibleData ||
            (inGuide && passage === 'in-1') ||
            guidePassage === 'why-22'
              ? 'invisible'
              : ''
          } umami--click--to-next-passage`}
          onClick={nextPassage}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </footer>
  )
}

export default BibleNavigator

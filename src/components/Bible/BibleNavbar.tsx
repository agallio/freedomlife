import CloseIcon from '../Icons/CloseIcon'
import CopyIcon from '../Icons/CopyIcon'
import SettingIcon from '../Icons/SettingIcon'
import TranslateIcon from '../Icons/TranslateIcon'

import dayjs from '@/utils/dayjs'

import { useGuide } from '@/store/index'

import type { BibleNavbarProps } from '@/types/components'

const BibleNavbar: React.FC<BibleNavbarProps> = ({
  highlighted,
  highlightedText,
  inGuide,
  passageTitle,
  handleExitGuide,
  removeHighlight,
  copyText,
  handleOpenTranslate,
  handleOpenPassage,
  handleOpenSetting,
}) => {
  const { guideDate } = useGuide()

  return (
    <header
      className={`fixed top-0 left-0 w-full border-b bg-opacity-60 z-40 ${
        highlighted
          ? 'bg-green-600 border-green-600 text-white'
          : 'bg-white border-gray-100 dark:bg-gray-700 dark:border-gray-800 dark:bg-opacity-70'
      } ${inGuide ? 'h-24' : 'h-12 sm:h-14'}`}
      style={{
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      {inGuide && (
        <div className="bg-green-500 px-4">
          <div className="flex items-center justify-between max-w-sm sm:max-w-md sm:mx-auto">
            <p className="text-white py-1">
              Panduan Baca Aktif{' '}
              {guideDate
                ? `(${dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY')})`
                : ''}
            </p>
            <button
              className="text-white focus:outline-none"
              onClick={handleExitGuide}
            >
              <CloseIcon className="w-4" />
            </button>
          </div>
        </div>
      )}
      <div
        className={`flex items-center justify-between max-w-sm mx-6 ${
          inGuide ? 'py-4' : 'h-full'
        } sm:max-w-md sm:mx-auto landscape:mx-auto`}
      >
        {highlighted ? (
          <>
            <button
              className="w-5 h-5 focus:text-green-600 sm:w-6 sm:h-6 focus:outline-none"
              onClick={removeHighlight}
            >
              <CloseIcon />
            </button>
            <div className="py-1">{highlightedText.length} Ayat Disorot</div>
            <button
              className="w-5 h-5 focus:text-green-600 sm:w-6 sm:h-6 focus:outline-none"
              onClick={copyText}
            >
              <CopyIcon outline />
            </button>
          </>
        ) : (
          <>
            <button
              className="w-5 h-5 transition transform duration-300 hover:text-green-600 sm:w-6 sm:h-6 focus:outline-none dark:text-white dark:hover:text-gray-400"
              onClick={handleOpenTranslate}
            >
              <TranslateIcon />
            </button>
            <button
              className="bg-green-500 text-white py-1 px-5 rounded-full shadow-sm transition transform duration-300 hover:bg-green-600 focus:outline-none sm:py-2 sm:px-6"
              onClick={handleOpenPassage}
            >
              {passageTitle}
            </button>
            <button
              className="w-5 h-5 transition transform duration-300 hover:text-green-600 sm:w-6 sm:h-6 focus:outline-none dark:text-white dark:hover:text-gray-400"
              onClick={handleOpenSetting}
            >
              <SettingIcon />
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default BibleNavbar

// Icon Components
import CloseIcon from '../Icons/CloseIcon'
import CopyIcon from '../Icons/CopyIcon'
import SettingIcon from '../Icons/SettingIcon'
import TranslateIcon from '../Icons/TranslateIcon'

// Utils
import dayjs from '~/utils/dayjs'

// Types
import type { HighlightedText } from '~/types/component'

interface BibleNavbarProps {
  highlighted: boolean
  highlightedText: HighlightedText[]
  inGuide: boolean
  bibleVersion: string
  guideDate?: string
  passageTitle: () => string | undefined
  handleExitGuide?: () => void
  removeHighlight: () => void
  copyText: () => void
  handleOpenTranslate: () => void
  handleOpenPassage: () => void
  handleOpenSetting: () => void
}

export default function BibleNavbar({
  highlighted,
  highlightedText,
  inGuide,
  bibleVersion,
  guideDate,
  passageTitle,
  handleExitGuide,
  removeHighlight,
  copyText,
  handleOpenTranslate,
  handleOpenPassage,
  handleOpenSetting,
}: BibleNavbarProps) {
  return (
    <header
      className={`fixed left-0 top-0 z-40 w-full border-b bg-opacity-60 ${
        highlighted
          ? 'border-emerald-600 bg-emerald-600 text-white'
          : 'border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-700 dark:bg-opacity-70'
      } ${inGuide ? 'h-25' : 'h-12 sm:h-14'}`}
      style={{
        backdropFilter: 'saturate(180%) blur(12px)',
        WebkitBackdropFilter: 'saturate(180%) blur(12px)',
      }}
    >
      {inGuide && (
        <div className="bg-emerald-300 px-4 text-emerald-900 dark:bg-emerald-700 dark:text-white">
          <div className="flex max-w-sm items-center justify-between sm:mx-auto sm:max-w-md">
            <p className="py-1">
              Panduan Baca Aktif{' '}
              {guideDate
                ? `(${dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY')})`
                : ''}
            </p>
            <button
              aria-label="Tutup"
              className="focus:outline-none"
              onClick={handleExitGuide}
            >
              <CloseIcon className="w-4" />
            </button>
          </div>
        </div>
      )}
      <div
        className={`mx-6 flex max-w-sm items-center justify-between ${
          inGuide ? 'py-3' : 'h-full'
        } sm:mx-auto sm:max-w-md landscape:mx-auto`}
      >
        {highlighted ? (
          <>
            <button
              aria-label="Tutup"
              className="h-5 w-5 focus:text-emerald-600 focus:outline-none sm:h-6 sm:w-6"
              onClick={removeHighlight}
            >
              <CloseIcon />
            </button>
            <div className="py-1">{highlightedText.length} Ayat Disorot</div>
            <button
              aria-label="Salin Ayat"
              className="h-5 w-5 focus:text-emerald-600 focus:outline-none sm:h-6 sm:w-6"
              onClick={copyText}
            >
              <CopyIcon outline />
            </button>
          </>
        ) : (
          <>
            <button
              aria-label="Buka Dialog Versi"
              className="h-5 w-5 transform transition duration-300 hover:text-emerald-600 focus:outline-none dark:text-white dark:hover:text-gray-400 sm:h-6 sm:w-6"
              onClick={handleOpenTranslate}
            >
              <TranslateIcon />
            </button>
            <button
              aria-label="Buka Dialog Kitab"
              className="transform rounded-full bg-emerald-300 px-5 py-1 text-emerald-900 shadow-sm transition duration-300 hover:bg-emerald-400 focus:outline-none dark:bg-emerald-700 dark:text-white sm:px-6 sm:py-2"
              onClick={handleOpenPassage}
              style={{ minWidth: '8rem' }}
            >
              {passageTitle()}
              {passageTitle() !== 'Memuat'
                ? bibleVersion !== 'tb'
                  ? ` (${bibleVersion.toUpperCase()})`
                  : ''
                : ''}
            </button>
            <button
              aria-label="Buka Dialog Pengaturan"
              className="h-5 w-5 transform transition duration-300 hover:text-emerald-600 focus:outline-none dark:text-white dark:hover:text-gray-400 sm:h-6 sm:w-6"
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
